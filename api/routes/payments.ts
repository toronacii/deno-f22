/**
 * Payments routes — Flow subscription lifecycle
 *
 * POST /api/v1/payments/checkout          — start subscription (creates Flow customer + subscription)
 * GET  /api/v1/payments/card-callback     — Flow redirects browser here after card registration (?token=)
 * POST /api/v1/payments/card-callback     — Legacy: Flow POSTs token in body (kept for compatibility)
 * POST /api/v1/payments/webhook           — Flow notifies each subscription payment (no auth)
 * POST /api/v1/payments/cancel            — cancel active subscription
 * GET  /api/v1/payments/portal            — current card + subscription info
 */

import { Hono, type Context } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getAdminClient } from "../db/supabase_client.ts";
import {
  createCustomer,
  registerCard,
  getRegisterStatus,
  createSubscription,
  cancelSubscription,
  getPaymentStatus,
  usdToClp,
  toFlowPlanId,
  FlowError,
} from "../services/flow_client.ts";
import {
  getActivePromo,
  regularPricePerMonth,
  periodAmountUsd,
} from "../services/promotion_service.ts";

export const paymentsRouter = new Hono();

// ---------------------------------------------------------------------------
// POST /payments/checkout
// Body: { planCode: string, billingCycle: "monthly" | "quarterly" | "annual" }
// ---------------------------------------------------------------------------
paymentsRouter.post("/checkout", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const body   = await c.req.json<{ planCode: string; billingCycle: string }>();
  const { planCode, billingCycle } = body;

  if (!planCode || !["monthly", "quarterly", "annual"].includes(billingCycle)) {
    return c.json({ error: "planCode y billingCycle son requeridos" }, 400);
  }

  const db = getAdminClient();

  // 1. Fetch plan
  const { data: plan, error: planErr } = await db
    .from("membership_plans")
    .select("id, code, name, price_monthly_usd, price_quarterly_usd, price_annual_usd, min_commitment_months")
    .eq("code", planCode)
    .eq("is_active", true)
    .single();

  if (planErr || !plan) return c.json({ error: "Plan no encontrado" }, 404);

  // 2. Fetch profile
  const { data: profile } = await db
    .from("profiles")
    .select("flow_customer_id, flow_card_last4, email, full_name")
    .eq("id", userId)
    .single();

  if (!profile) return c.json({ error: "Perfil no encontrado" }, 404);

  // 3. Check for active promotion
  const promo = await getActivePromo(db, plan.id, billingCycle);

  // 4. Determine locked price per month and total per period
  const lockedPricePerMonthUsd = promo
    ? promo.discounted_price_usd
    : regularPricePerMonth(plan, billingCycle);
  const periodUsd = periodAmountUsd(lockedPricePerMonthUsd, billingCycle);

  // 5. Convert to CLP
  const { clp: _amountClp, rate: _rate } = await usdToClp(periodUsd);

  // 6. Get or create Flow customer
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

  // 7. If no card registered → redirect to Flow card registration
  if (!profile.flow_card_last4) {
    const apiBase   = Deno.env.get("API_BASE_URL") ?? "http://localhost:8000";
    const returnTo  = (body as { returnTo?: string }).returnTo ?? "/account";
    const returnUrl = `${apiBase}/api/v1/payments/card-callback?plan=${planCode}&cycle=${billingCycle}&userId=${userId}&returnTo=${encodeURIComponent(returnTo)}`;
    const { url, token } = await registerCard({ customerId, url_return: returnUrl });

    return c.json({
      requiresCard: true,
      redirectUrl:  `${url}?token=${token}`,
    });
  }

  // 8. Card already registered → create Flow subscription directly
  const flowPlanId = promo
    ? toFlowPlanId(planCode, billingCycle, true)
    : toFlowPlanId(planCode, billingCycle);

  const flowSub = await createSubscription({ planId: flowPlanId, customerId });

  // 9. Persist subscription in DB
  await persistSubscription(db, {
    userId,
    plan,
    billingCycle,
    flowSubscriptionId: flowSub.subscriptionId,
    flowPlanId,
    promoId:            promo?.id ?? null,
    lockedPriceUsd:     lockedPricePerMonthUsd,
  });

  return c.json({ success: true, subscriptionId: flowSub.subscriptionId });
});

// ---------------------------------------------------------------------------
// Shared handler for GET and POST /payments/card-callback
// Flow redirects the browser here (GET) with ?token=XXX after card
// registration. The same handler also covers any legacy POST from Flow.
// ---------------------------------------------------------------------------
// deno-lint-ignore no-explicit-any
async function handleCardCallback(c: Context<any>, token: string | undefined) {
  const planCode = c.req.query("plan");
  const cycle    = c.req.query("cycle");
  const userId   = c.req.query("userId");
  const returnTo = c.req.query("returnTo") ?? "/account";

  // Use API_BASE_URL so relative paths resolve correctly on the tunnel domain,
  // which is the same origin that serves the frontend via the tunnel.
  const appBase         = Deno.env.get("API_BASE_URL") ?? "";
  const successRedirect = `${appBase}/payment-callback?status=success&returnTo=${encodeURIComponent(returnTo)}`;
  const errorBase       = `${appBase}/payment-callback?status=error&returnTo=${encodeURIComponent(returnTo)}`;

  if (!token || !planCode || !cycle || !userId) {
    return c.redirect(`${errorBase}&reason=missing_params`);
  }

  const db = getAdminClient();

  try {
    // 1. Get card registration result from Flow
    const regStatus = await getRegisterStatus(token);
    if (regStatus.status !== "1") {
      return c.redirect(`${errorBase}&reason=card_declined`);
    }

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
      .select("id, code, name, price_monthly_usd, price_quarterly_usd, price_annual_usd, min_commitment_months")
      .eq("code", planCode)
      .eq("is_active", true)
      .single();

    if (!plan) return c.redirect(`${errorBase}&reason=plan_not_found`);

    // 4. Check promo
    const promo = await getActivePromo(db, plan.id, cycle);
    const lockedPricePerMonthUsd = promo
      ? promo.discounted_price_usd
      : regularPricePerMonth(plan, cycle);

    // 5. Create Flow subscription
    const flowPlanId = promo
      ? toFlowPlanId(planCode, cycle, true)
      : toFlowPlanId(planCode, cycle);

    const flowSub = await createSubscription({
      planId:     flowPlanId,
      customerId: profile.flow_customer_id,
    });

    // 6. Persist in DB
    await persistSubscription(db, {
      userId,
      plan,
      billingCycle:       cycle,
      flowSubscriptionId: flowSub.subscriptionId,
      flowPlanId,
      promoId:            promo?.id ?? null,
      lockedPriceUsd:     lockedPricePerMonthUsd,
    });

    return c.redirect(successRedirect);
  } catch (e) {
    console.error("[card-callback] error:", e);
    const reason = e instanceof FlowError ? "flow_error" : "server_error";
    return c.redirect(`${errorBase}&reason=${reason}`);
  }
}

// ---------------------------------------------------------------------------
// GET /payments/card-callback
// Flow redirects the browser here after card registration with ?token=XXX
// appended as a query param (same url_return we provided).
// ---------------------------------------------------------------------------
paymentsRouter.get("/card-callback", async (c) => {
  const token = c.req.query("token");
  return handleCardCallback(c, token);
});

// ---------------------------------------------------------------------------
// POST /payments/card-callback
// Legacy: Flow may also POST token in body. Kept for compatibility.
// ---------------------------------------------------------------------------
paymentsRouter.post("/card-callback", async (c) => {
  const body  = await c.req.parseBody();
  const token = (body["token"] as string | undefined) ?? c.req.query("token");
  return handleCardCallback(c, token);
});

// ---------------------------------------------------------------------------
// POST /payments/webhook
// Flow POSTs here when a subscription payment is processed (no JWT auth).
// Body (urlencoded): token=<paymentToken>
// ---------------------------------------------------------------------------
paymentsRouter.post("/webhook", async (c) => {
  const body  = await c.req.parseBody();
  const token = body["token"] as string | undefined;

  if (!token) {
    console.warn("[webhook] Received call without token");
    return c.json({ ok: false }, 400);
  }

  const db = getAdminClient();

  try {
    // 1. Get payment status from Flow
    const payment = await getPaymentStatus(token);

    // status según spec Flow: 1=pendiente, 2=pagado, 3=rechazado, 4=anulado
    const subStatusMap: Record<number, string> = {
      1: "active",    // pendiente — cobro en proceso, suscripción sigue activa
      2: "active",    // pagado — confirma suscripción activa
      3: "past_due",  // rechazado — pago fallido
      4: "cancelled", // anulado
    };
    const newStatus = subStatusMap[payment.status] ?? "past_due";

    // 2. Find subscription — prefer paymentData.subscriptionId, fallback: log only
    const flowSubId = payment.paymentData?.subscriptionId ?? null;

    const { data: sub } = flowSubId
      ? await db.from("subscriptions")
          .select("id, user_id")
          .eq("flow_subscription_id", flowSubId)
          .maybeSingle()
      : { data: null };

    if (!flowSubId) {
      console.warn("[webhook] No subscriptionId in paymentData, commerceOrder:", payment.commerceOrder);
    }

    // 3. Update subscription status (skip status=1 pending — cobro aún en vuelo)
    if (sub && payment.status !== 1) {
      await db.from("subscriptions")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", sub.id);
    }

    // 4. Log event — Flow devuelve amount en CLP directamente (no centavos)
    const { rate } = await usdToClp(1); // solo para registrar la tasa del momento
    await db.from("flow_events").insert({
      event_type:      "subscription_payment",
      flow_order:      String(payment.flowOrder),
      subscription_id: sub?.id ?? null,
      user_id:         sub?.user_id ?? null,
      status:          payment.status,
      amount_clp:      payment.amount,
      usd_to_clp_rate: rate,
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

  // 1. Get active subscription
  const { data: sub } = await db
    .from("subscriptions")
    .select("id, flow_subscription_id, earliest_cancel_at, billing_cycle")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (!sub) return c.json({ error: "No tienes una suscripción activa" }, 404);
  if (!sub.flow_subscription_id) return c.json({ error: "Suscripción sin ID de Flow" }, 400);

  // 2. Enforce minimum commitment
  if (sub.earliest_cancel_at && new Date() < new Date(sub.earliest_cancel_at)) {
    const date = new Date(sub.earliest_cancel_at).toLocaleDateString("es-CL");
    return c.json({
      error: `Tu suscripción tiene un compromiso mínimo. Puedes cancelar a partir del ${date}.`,
      earliest_cancel_at: sub.earliest_cancel_at,
    }, 400);
  }

  // 3. Cancel in Flow (at period end to avoid mid-cycle charges)
  await cancelSubscription({
    subscriptionId: sub.flow_subscription_id,
    at_period_end: "1",
  });

  // 4. Update DB
  await db.from("subscriptions").update({
    status:       "cancelled",
    cancelled_at: new Date().toISOString(),
  }).eq("id", sub.id);

  return c.json({ success: true });
});

// ---------------------------------------------------------------------------
// GET /payments/portal
// Returns current card info + subscription status for the account page.
// ---------------------------------------------------------------------------
paymentsRouter.get("/portal", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const db     = getAdminClient();

  const [profileResult, subResult] = await Promise.all([
    db.from("profiles")
      .select("flow_card_type, flow_card_last4")
      .eq("id", userId)
      .single(),
    db.from("subscriptions")
      .select("id, status, billing_cycle, locked_price_usd, earliest_cancel_at, promotion_id, flow_subscription_id")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle(),
  ]);

  const card = profileResult.data;
  const sub  = subResult.data;

  const canCancel = sub?.earliest_cancel_at
    ? new Date() >= new Date(sub.earliest_cancel_at)
    : true;

  return c.json({
    card: card?.flow_card_last4
      ? { type: card.flow_card_type, last4: card.flow_card_last4 }
      : null,
    subscription: sub
      ? {
          status:            sub.status,
          billingCycle:      sub.billing_cycle,
          lockedPriceUsd:    sub.locked_price_usd,
          earliestCancelAt:  sub.earliest_cancel_at,
          hasPromo:          sub.promotion_id !== null,
          canCancel,
        }
      : null,
  });
});

// ---------------------------------------------------------------------------
// Helper: persist a new subscription record in Supabase
// ---------------------------------------------------------------------------
async function persistSubscription(
  db: ReturnType<typeof getAdminClient>,
  params: {
    userId:             string;
    plan:               { id: string; min_commitment_months: number };
    billingCycle:       string;
    flowSubscriptionId: string;
    flowPlanId:         string;
    promoId:            string | null;
    lockedPriceUsd:     number;
  },
) {
  const { userId, plan, billingCycle, flowSubscriptionId, flowPlanId, promoId, lockedPriceUsd } = params;

  // Cancel any existing active subscription first
  await db.from("subscriptions")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("status", "active");

  const startedAt       = new Date();
  const earliestCancel  = new Date(startedAt);
  earliestCancel.setMonth(earliestCancel.getMonth() + plan.min_commitment_months);

  await db.from("subscriptions").insert({
    user_id:             userId,
    plan_id:             plan.id,
    billing_cycle:       billingCycle,
    status:              "active",
    started_at:          startedAt.toISOString(),
    earliest_cancel_at:  earliestCancel.toISOString(),
    flow_subscription_id: flowSubscriptionId,
    flow_plan_id:        flowPlanId,
    promotion_id:        promoId,
    locked_price_usd:    lockedPriceUsd,
  });
}
