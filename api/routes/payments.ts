/**
 * Payments routes — Flow payment lifecycle
 *
 * POST /api/v1/payments/checkout      — inicia suscripción (membresía)
 * GET  /api/v1/payments/card-callback — Flow redirige aquí tras registro de tarjeta
 * POST /api/v1/payments/card-callback — legacy POST del mismo callback
 * POST /api/v1/payments/f22-checkout  — inicia pago único F22 Digital (link de pago)
 * POST /api/v1/payments/webhook       — Flow notifica pagos de suscripción y únicos
 * POST /api/v1/payments/cancel        — cancela suscripción activa
 * GET  /api/v1/payments/portal        — info de tarjeta + suscripción actual
 * POST /api/v1/payments/contact-intent— intención de pago manual (email al equipo)
 */

import { Hono, type Context } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getAdminClient } from "../db/supabase_client.ts";
import {
  createCustomer,
  registerCard,
  getRegisterStatus,
  createSubscription,
  getSubscription,
  cancelSubscription,
  chargeCustomer,
  createPaymentLink,
  getPaymentStatus,
  toFlowPlanId,
  FlowError,
  verifyFlowSignature,
  type FlowSubscription,
} from "../services/flow_client.ts";
import { getActivePromo } from "../services/promotion_service.ts";
import { sendContactIntentEmail } from "../services/resend_client.ts";

export const paymentsRouter = new Hono();

// ---------------------------------------------------------------------------
// Helpers de precio CLP
// ---------------------------------------------------------------------------

type PlanRow = {
  id: string;
  code: string;
  name: string;
  max_ruts: number | null;
  price_monthly_clp: number | null;
  price_annual_clp: number | null;
  is_one_time_payment: boolean;
  min_commitment_months: number;
};

/**
 * Precio mensual en CLP para mostrar y cobrar (sin promo).
 * Para annual devuelve el total anual dividido en 12.
 */
function planPriceMonthlyClp(plan: PlanRow, billingCycle: string): number {
  if (billingCycle === "monthly") return plan.price_monthly_clp ?? 0;
  if (billingCycle === "annual")  return Math.round((plan.price_annual_clp ?? 0) / 12);
  throw new Error(`Unsupported billing cycle: ${billingCycle}`);
}

// ---------------------------------------------------------------------------
// POST /payments/checkout
// Inicia una suscripción de membresía (Genesis, Sinergy, Momentum, Horizon).
// Body: { planCode: string, billingCycle: "monthly" | "annual", returnTo?: string }
// ---------------------------------------------------------------------------
paymentsRouter.post("/checkout", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const body   = await c.req.json<{ planCode: string; billingCycle: string; returnTo?: string }>();
  const { planCode, billingCycle } = body;

  if (!planCode || !["monthly", "annual"].includes(billingCycle)) {
    return c.json({ error: "planCode y billingCycle (monthly|annual) son requeridos" }, 400);
  }

  const db = getAdminClient();

  // 1. Fetch plan (con precios CLP)
  const { data: plan, error: planErr } = await db
    .from("membership_plans")
    .select("id, code, name, price_monthly_clp, price_annual_clp, is_one_time_payment, min_commitment_months")
    .eq("code", planCode)
    .eq("is_active", true)
    .single();

  if (planErr || !plan) return c.json({ error: "Plan no encontrado" }, 404);
  if (plan.is_one_time_payment) {
    return c.json({ error: "Este plan es de pago único. Usa /payments/f22-checkout." }, 400);
  }

  // 2. Fetch profile
  const { data: profile } = await db
    .from("profiles")
    .select("flow_customer_id, flow_card_last4, email, full_name")
    .eq("id", userId)
    .single();

  if (!profile) return c.json({ error: "Perfil no encontrado" }, 404);

  // 3. Check for active promotion
  const promo = await getActivePromo(db, plan.id, billingCycle);

  // 4. Determine locked monthly CLP price (promo overrides base)
  const lockedPriceMonthlyClp = promo?.discounted_price_clp
    ?? planPriceMonthlyClp(plan, billingCycle);

  // 5. Get or create Flow customer
  let customerId = profile.flow_customer_id;
  if (!customerId) {
    const customer = await createCustomer({
      name:       profile.full_name ?? profile.email,
      email:      profile.email,
      externalId: userId,
    });
    customerId = customer.customerId;
    await db.from("profiles").update({ flow_customer_id: customerId }).eq("id", userId);
  }

  // 6. If no card registered → redirect to Flow card registration
  if (!profile.flow_card_last4) {
    const apiBase   = Deno.env.get("API_BASE_URL") ?? "http://localhost:8000";
    const returnTo  = body.returnTo ?? "/account";
    const returnUrl = `${apiBase}/api/v1/payments/card-callback?plan=${planCode}&cycle=${billingCycle}&userId=${userId}&returnTo=${encodeURIComponent(returnTo)}`;
    const { url, token } = await registerCard({ customerId, url_return: returnUrl });
    return c.json({ requiresCard: true, redirectUrl: `${url}?token=${token}` });
  }

  // 7. Block if user already has an active subscription
  const { data: existingSub } = await db
    .from("subscriptions")
    .select("id, billing_cycle")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (existingSub) {
    return c.json({
      error: "Ya tienes una suscripción activa. Cancela tu plan actual antes de suscribirte a uno nuevo.",
      currentBillingCycle: existingSub.billing_cycle,
    }, 409);
  }

  // 8. Card already registered → start subscription
  const flowPlanId = promo
    ? toFlowPlanId(planCode, billingCycle, true)
    : toFlowPlanId(planCode, billingCycle);

  const { flowSub, initialChargeEventId } = await startSubscription({
    db,
    billingCycle,
    flowPlanId,
    customerId,
    userId,
    lockedPriceMonthlyClp,
    planName: plan.name,
  });

  // 9. Persist subscription in DB
  const { id: subId } = await persistSubscription(db, {
    userId,
    plan,
    billingCycle,
    flowSubscriptionId: flowSub.subscriptionId,
    promoId:            promo?.id ?? null,
    lockedPriceClp:     lockedPriceMonthlyClp,
  });

  if (initialChargeEventId) {
    await db.from("flow_events").update({ subscription_id: subId }).eq("id", initialChargeEventId);
  }

  return c.json({ success: true, subscriptionId: flowSub.subscriptionId });
});

// ---------------------------------------------------------------------------
// Shared handler: GET + POST /payments/card-callback
// ---------------------------------------------------------------------------
// deno-lint-ignore no-explicit-any
async function handleCardCallback(c: Context<any>, token: string | undefined) {
  const planCode = c.req.query("plan");
  const cycle    = c.req.query("cycle");
  const userId   = c.req.query("userId");
  const returnTo = c.req.query("returnTo") ?? "/account";

  const appBase         = Deno.env.get("API_BASE_URL") ?? "";
  const successRedirect = `${appBase}/payment-callback?status=success&returnTo=${encodeURIComponent(returnTo)}`;
  const errorBase       = `${appBase}/payment-callback?status=error&returnTo=${encodeURIComponent(returnTo)}`;

  if (!token || !planCode || !cycle || !userId) {
    return c.redirect(`${errorBase}&reason=missing_params`);
  }

  const db = getAdminClient();

  try {
    // 1. Get card registration result
    const regStatus = await getRegisterStatus(token);
    if (regStatus.status !== "1") return c.redirect(`${errorBase}&reason=card_declined`);

    // 2. Update profile with card info
    const { data: profile } = await db
      .from("profiles")
      .select("flow_customer_id")
      .eq("id", userId)
      .single();

    if (!profile) return c.redirect(`${errorBase}&reason=profile_not_found`);

    await db.from("profiles").update({
      flow_card_type:  regStatus.creditCardType,
      flow_card_last4: regStatus.last4CardDigits,
    }).eq("id", userId);

    // 3. Fetch plan
    const { data: plan } = await db
      .from("membership_plans")
      .select("id, code, name, price_monthly_clp, price_annual_clp, is_one_time_payment, min_commitment_months")
      .eq("code", planCode)
      .eq("is_active", true)
      .single();

    if (!plan || plan.is_one_time_payment) return c.redirect(`${errorBase}&reason=plan_not_found`);

    // 4. Check promo
    const promo = await getActivePromo(db, plan.id, cycle);
    const lockedPriceMonthlyClp = promo?.discounted_price_clp
      ?? planPriceMonthlyClp(plan, cycle);

    // 5. Block if user already has an active subscription
    const { data: existingSubCb } = await db
      .from("subscriptions")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle();

    if (existingSubCb) return c.redirect(`${errorBase}&reason=already_subscribed`);

    // 6. Start subscription
    const flowPlanId = promo
      ? toFlowPlanId(planCode, cycle, true)
      : toFlowPlanId(planCode, cycle);

    const { flowSub, initialChargeEventId } = await startSubscription({
      db,
      billingCycle:         cycle,
      flowPlanId,
      customerId:           profile.flow_customer_id,
      userId,
      lockedPriceMonthlyClp,
      planName:             plan.name,
    });

    // 7. Persist in DB
    const { id: subId } = await persistSubscription(db, {
      userId,
      plan,
      billingCycle:       cycle,
      flowSubscriptionId: flowSub.subscriptionId,
      promoId:            promo?.id ?? null,
      lockedPriceClp:     lockedPriceMonthlyClp,
    });

    if (initialChargeEventId) {
      await db.from("flow_events").update({ subscription_id: subId }).eq("id", initialChargeEventId);
    }

    return c.redirect(successRedirect);
  } catch (e) {
    console.error("[card-callback] error:", e);
    const reason = e instanceof FlowError ? "flow_error" : "server_error";
    return c.redirect(`${errorBase}&reason=${reason}`);
  }
}

paymentsRouter.get("/card-callback", async (c) => {
  const token = c.req.query("token");
  return handleCardCallback(c, token);
});

paymentsRouter.post("/card-callback", async (c) => {
  const body  = await c.req.parseBody();
  const token = (body["token"] as string | undefined) ?? c.req.query("token");
  return handleCardCallback(c, token);
});

// ---------------------------------------------------------------------------
// POST /payments/f22-checkout
// Inicia un pago único para F22 Digital mediante link de pago Flow.
// No requiere tarjeta pre-registrada — el usuario paga directamente en Flow.
// ---------------------------------------------------------------------------
paymentsRouter.post("/f22-checkout", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const db     = getAdminClient();

  // 1. Fetch f22digital plan
  const { data: plan } = await db
    .from("membership_plans")
    .select("id, code, name, price_one_time_clp, is_one_time_payment")
    .eq("code", "f22digital")
    .eq("is_active", true)
    .eq("is_one_time_payment", true)
    .single();

  if (!plan?.price_one_time_clp) {
    return c.json({ error: "Plan F22 Digital no disponible" }, 404);
  }

  // 2. Prevenir doble pago
  const { data: existingPaid } = await db
    .from("one_time_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("plan_id", plan.id)
    .eq("status", "paid")
    .maybeSingle();

  if (existingPaid) {
    return c.json({ error: "Ya tienes una declaración F22 pagada para este año." }, 409);
  }

  // 3. Fetch profile para personalizar el subject
  const { data: profile } = await db
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
    .single();

  if (!profile) return c.json({ error: "Perfil no encontrado" }, 404);

  // 4. Generar commerce order único
  // Flow límite: 45 chars. UUID completo (36) + prefijo + timestamp lo supera.
  const commerceOrder = `f22_${userId.slice(0, 8)}_${Date.now()}`;

  // 5. URLs
  const apiBase    = Deno.env.get("API_BASE_URL") ?? "http://localhost:8000";
  const webhookUrl = Deno.env.get("FLOW_WEBHOOK_URL")!;
  const urlReturn  = `${apiBase}/payment-callback?status=success&type=f22`;

  // 6. Crear link de pago en Flow
  const paymentLink = await createPaymentLink({
    amount:          String(plan.price_one_time_clp),
    subject:         `Declaración F22 2026 — ${profile.full_name ?? profile.email}`,
    commerceOrder,
    urlConfirmation: webhookUrl,
    urlReturn,
    email:           profile.email,
    currency:        "CLP",
  });

  // 7. Registrar compra pendiente
  await db.from("one_time_purchases").insert({
    user_id:        userId,
    plan_id:        plan.id,
    flow_order:     String(paymentLink.flowOrder),
    commerce_order: commerceOrder,
    status:         "pending",
    amount_clp:     plan.price_one_time_clp,
  });

  return c.json({ redirectUrl: `${paymentLink.url}?token=${paymentLink.token}` });
});

// ---------------------------------------------------------------------------
// POST /payments/webhook
// Flow POSTs aquí cuando se confirma un pago (suscripción o pago único).
// ---------------------------------------------------------------------------
paymentsRouter.post("/webhook", async (c) => {
  const body  = await c.req.parseBody();
  const token = body["token"] as string | undefined;

  if (!token) {
    console.warn("[webhook] Llamada sin token");
    return c.json({ ok: false }, 400);
  }

  // Verify Flow HMAC signature
  const bodyRecord = Object.fromEntries(Object.entries(body).map(([k, v]) => [k, String(v)]));
  if (bodyRecord["s"]) {
    const valid = await verifyFlowSignature(bodyRecord);
    if (!valid) {
      console.warn("[webhook] Firma HMAC inválida — rechazado");
      return c.json({ ok: false }, 401);
    }
  }

  const db = getAdminClient();

  try {
    const payment      = await getPaymentStatus(token);
    const commerceOrder = payment.commerceOrder ?? "";

    // ── Tipo de pago por prefijo de commerceOrder ────────────────────────────
    // - "f22_*"  → compra única F22 (creada por nosotros)
    // - "init_*" → cargo inicial 3 meses mensual (creada por nosotros, ya logueada)
    // - otros    → cobro recurrente de suscripción (generado por Flow)
    //
    // NOTA: Flow NO incluye subscriptionId en PaymentStatus (no está en el spec).
    // Para cobros recurrentes usamos payment.payer (email) para encontrar la suscripción.

    let eventType     = "subscription_recurring";
    let subId: string | null   = null;
    let userId: string | null  = null;

    if (commerceOrder.startsWith("f22_")) {
      // ── Caso 1: pago único F22 ───────────────────────────────────────────
      eventType = "one_time_payment";

      const { data: purchase } = await db
        .from("one_time_purchases")
        .select("id, user_id")
        .eq("commerce_order", commerceOrder)
        .maybeSingle();

      if (purchase) {
        userId = purchase.user_id;
        if (payment.status === 2) {
          await db.from("one_time_purchases")
            .update({ status: "paid", paid_at: new Date().toISOString() })
            .eq("id", purchase.id);
        } else if (payment.status === 3 || payment.status === 4) {
          await db.from("one_time_purchases")
            .update({ status: "rejected" })
            .eq("id", purchase.id);
        }
      } else {
        console.warn("[webhook] Compra F22 no encontrada para commerceOrder:", commerceOrder);
      }

    } else if (commerceOrder.startsWith("init_")) {
      // ── Caso 2: cargo inicial mensual ────────────────────────────────────
      // Ya fue logueado en flow_events por startSubscription. Solo actualizamos el status.
      eventType = "initial_charge";

      const { data: existingEvent } = await db
        .from("flow_events")
        .select("id, user_id, subscription_id")
        .eq("flow_order", commerceOrder)
        .maybeSingle();

      if (existingEvent) {
        subId  = existingEvent.subscription_id;
        userId = existingEvent.user_id;
        await db.from("flow_events")
          .update({ status: payment.status, raw_payload: payment })
          .eq("id", existingEvent.id);
        // Ya actualizado — solo insertar log adicional si el estado cambió a rechazado
        if (payment.status !== 3 && payment.status !== 4) {
          return c.json({ ok: true }); // nada más que hacer
        }
      }

    } else {
      // ── Caso 3: cobro recurrente de suscripción (generado por Flow) ──────
      // Flow no incluye subscriptionId en PaymentStatus — buscamos por email del pagador.
      eventType = "subscription_recurring";

      const payerEmail = payment.payer;
      if (payerEmail) {
        const { data: profile } = await db
          .from("profiles")
          .select("id")
          .eq("email", payerEmail)
          .maybeSingle();

        if (profile) {
          userId = profile.id;
          const { data: sub } = await db
            .from("subscriptions")
            .select("id, status")
            .eq("user_id", profile.id)
            .in("status", ["active", "past_due"])
            .maybeSingle();

          if (sub) {
            subId = sub.id;
            // Actualizar status de la suscripción según el resultado del cobro
            if (payment.status === 2) {
              await db.from("subscriptions")
                .update({ status: "active", updated_at: new Date().toISOString() })
                .eq("id", sub.id);
            } else if (payment.status === 3 || payment.status === 4) {
              await db.from("subscriptions")
                .update({ status: "past_due", updated_at: new Date().toISOString() })
                .eq("id", sub.id);
            }
          } else {
            console.warn("[webhook] No se encontró suscripción activa para payer:", payerEmail);
          }
        } else {
          console.warn("[webhook] No se encontró perfil para payer:", payerEmail);
        }
      }
    }

    // ── Log de evento (solo para casos no-init o init rechazado) ────────────
    await db.from("flow_events").insert({
      event_type:      eventType,
      flow_order:      String(payment.flowOrder),
      subscription_id: subId,
      user_id:         userId,
      status:          payment.status,
      amount_clp:      payment.amount,
      raw_payload:     payment,
    });

    return c.json({ ok: true });
  } catch (e) {
    console.error("[webhook] error:", e);
    return c.json({ ok: false }, 500);
  }
});

// ---------------------------------------------------------------------------
// POST /payments/cancel
// ---------------------------------------------------------------------------
paymentsRouter.post("/cancel", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const db     = getAdminClient();

  const { data: sub } = await db
    .from("subscriptions")
    .select("id, flow_subscription_id, earliest_cancel_at, billing_cycle")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (!sub) return c.json({ error: "No tienes una suscripción activa" }, 404);
  if (!sub.flow_subscription_id) return c.json({ error: "Suscripción sin ID de Flow" }, 400);

  if (sub.earliest_cancel_at && new Date() < new Date(sub.earliest_cancel_at)) {
    const date = new Date(sub.earliest_cancel_at).toLocaleDateString("es-CL");
    return c.json({
      error: `Tu suscripción tiene un compromiso mínimo. Puedes cancelar a partir del ${date}.`,
      earliest_cancel_at: sub.earliest_cancel_at,
    }, 400);
  }

  await cancelSubscription({ subscriptionId: sub.flow_subscription_id, at_period_end: "1" });
  await db.from("subscriptions").update({
    status: "cancelled", cancelled_at: new Date().toISOString(),
  }).eq("id", sub.id);

  return c.json({ success: true });
});

// ---------------------------------------------------------------------------
// GET /payments/portal
// ---------------------------------------------------------------------------
paymentsRouter.get("/portal", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const db     = getAdminClient();

  const [profileResult, subResult, f22Result] = await Promise.all([
    db.from("profiles").select("flow_card_type, flow_card_last4").eq("id", userId).single(),
    db.from("subscriptions")
      .select("id, status, billing_cycle, locked_price_clp, earliest_cancel_at, promotion_id, flow_subscription_id")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle(),
    db.from("one_time_purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "paid")
      .maybeSingle(),
  ]);

  const card   = profileResult.data;
  const sub    = subResult.data;
  const hasF22 = f22Result.data !== null;

  const canCancel = sub?.earliest_cancel_at
    ? new Date() >= new Date(sub.earliest_cancel_at)
    : true;

  let nextInvoiceDate: string | null = null;
  if (sub?.flow_subscription_id) {
    try {
      const flowSubData = await getSubscription(sub.flow_subscription_id);
      nextInvoiceDate = flowSubData.next_invoice_date ?? null;
    } catch { /* non-critical */ }
  }

  return c.json({
    hasF22,
    card: card?.flow_card_last4
      ? { type: card.flow_card_type, last4: card.flow_card_last4 }
      : null,
    subscription: sub
      ? {
          status:           sub.status,
          billingCycle:     sub.billing_cycle,
          lockedPriceClp:   sub.locked_price_clp,
          earliestCancelAt: sub.earliest_cancel_at,
          hasPromo:         sub.promotion_id !== null,
          canCancel,
          nextInvoiceDate,
        }
      : null,
  });
});

// ---------------------------------------------------------------------------
// POST /payments/contact-intent
// ---------------------------------------------------------------------------
paymentsRouter.post("/contact-intent", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const body   = await c.req.json<{
    planCode:     string;
    planName:     string;
    billingCycle: string;
    phone:        string;
    message:      string;
  }>();

  const { planCode, planName, billingCycle, phone, message } = body;

  if (!planCode || !planName || !billingCycle || !phone?.trim()) {
    return c.json({ error: "planCode, planName, billingCycle y phone son requeridos" }, 400);
  }

  const db = getAdminClient();

  const { data: profile } = await db
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
    .single();

  if (!profile) return c.json({ error: "Perfil no encontrado" }, 404);

  await db.from("contact_intents").insert({
    user_id:       userId,
    plan_code:     planCode,
    plan_name:     planName,
    billing_cycle: billingCycle,
    phone:         phone.trim(),
    message:       message ?? "",
    status:        "pending",
  });

  try {
    await sendContactIntentEmail({
      userName:     profile.full_name ?? profile.email,
      userEmail:    profile.email,
      phone:        phone.trim(),
      planName,
      billingCycle,
      message:      message ?? "",
    });
  } catch (e) {
    console.error("[contact-intent] Email failed (intent already saved):", e);
  }

  return c.json({ success: true });
});

// ---------------------------------------------------------------------------
// Helper: inicia suscripción Flow
// Mensual  → cobra 3 meses upfront + crea suscripción que empieza en 3 meses
// Anual    → crea suscripción inmediatamente (Flow cobra el total anual)
// ---------------------------------------------------------------------------
async function startSubscription(params: {
  db:                    ReturnType<typeof getAdminClient>;
  billingCycle:          string;
  flowPlanId:            string;
  customerId:            string;
  userId:                string;
  lockedPriceMonthlyClp: number;  // precio mensual en CLP (ya con promo si aplica)
  planName:              string;
}): Promise<{ flowSub: FlowSubscription; initialChargeEventId?: string }> {
  const { db, billingCycle, flowPlanId, customerId, userId, lockedPriceMonthlyClp, planName } = params;

  if (billingCycle === "monthly") {
    // Cobro inicial: 3 × precio mensual en CLP
    const upfrontClp    = lockedPriceMonthlyClp * 3;
    // Flow límite: 45 chars. "init_"(5) + uuid8(8) + "_"(1) + timestamp(13) = 27.
    const commerceOrder = `init_${userId.slice(0, 8)}_${Date.now()}`;

    let charge;
    try {
      charge = await chargeCustomer({
        customerId,
        amount:        String(upfrontClp),
        subject:       `${planName} — 3 meses iniciales`,
        commerceOrder,
        currency:      "CLP",
      });
    } catch (chargeErr) {
      // Flow rechazó a nivel de API (ej. tarjeta inválida, parámetros) → loguear y relanzar
      await db.from("flow_events").insert({
        event_type:      "initial_charge_failed",
        flow_order:      commerceOrder,
        subscription_id: null,
        user_id:         userId,
        status:          -1,
        amount_clp:      upfrontClp,
        raw_payload:     { error: String(chargeErr) },
      });
      throw chargeErr;
    }

    // Log del cargo inicial
    const { data: eventRow } = await db.from("flow_events").insert({
      event_type:      "initial_charge",
      flow_order:      String(charge.flowOrder),
      subscription_id: null,       // se linkea en el caller tras persistSubscription
      user_id:         userId,
      status:          charge.status,
      amount_clp:      charge.amount,
      raw_payload:     charge,
    }).select("id").single();

    // Si el cargo fue rechazado o anulado → no crear suscripción
    if (charge.status === 3 || charge.status === 4) {
      throw new FlowError(402, {
        message: `Cargo inicial rechazado por Flow (status ${charge.status})`,
      });
    }

    // Suscripción empieza en 3 meses (Flow cobra mensual a partir de entonces)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 3);
    const subscriptionStart = startDate.toISOString().split("T")[0];

    let flowSub: FlowSubscription;
    try {
      flowSub = await createSubscription({
        planId:             flowPlanId,
        customerId,
        subscription_start: subscriptionStart,
      });
    } catch (e) {
      console.error("[CRITICAL] Cargo inicial exitoso pero fallo la creacion de suscripcion", {
        userId,
        chargeFlowOrder: charge.flowOrder,
        chargeStatus:    charge.status,
        error:           String(e),
      });
      throw e;
    }

    return { flowSub, initialChargeEventId: eventRow?.id };
  }

  // Anual: Flow cobra el total anual al crear la suscripción
  const flowSub = await createSubscription({ planId: flowPlanId, customerId });
  return { flowSub };
}

// ---------------------------------------------------------------------------
// Helper: persiste la suscripción en Supabase
// ---------------------------------------------------------------------------
async function persistSubscription(
  db: ReturnType<typeof getAdminClient>,
  params: {
    userId:             string;
    plan:               { id: string; min_commitment_months: number };
    billingCycle:       string;
    flowSubscriptionId: string;
    promoId:            string | null;
    lockedPriceClp:     number;   // precio real cobrado (CLP)
  },
): Promise<{ id: string }> {
  const { userId, plan, billingCycle, flowSubscriptionId, promoId, lockedPriceClp } = params;

  // Cancelar cualquier suscripción activa anterior (no debería existir, pero por seguridad)
  await db.from("subscriptions")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("status", "active");

  const startedAt      = new Date();
  const earliestCancel = new Date(startedAt);
  earliestCancel.setMonth(earliestCancel.getMonth() + plan.min_commitment_months);

  const { data, error } = await db.from("subscriptions").insert({
    user_id:              userId,
    plan_id:              plan.id,
    billing_cycle:        billingCycle,
    status:               "active",
    started_at:           startedAt.toISOString(),
    earliest_cancel_at:   earliestCancel.toISOString(),
    flow_subscription_id: flowSubscriptionId,
    promotion_id:         promoId,
    locked_price_clp:     lockedPriceClp,
  }).select("id").single();

  if (error || !data) throw new Error(`Failed to persist subscription: ${error?.message}`);
  return { id: data.id };
}
