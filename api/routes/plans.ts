/**
 * GET /api/v1/plans — catálogo de planes disponibles (público)
 * Devuelve precios en CLP/UF (display).
 * Incluye promo_price_* si hay promociones activas hoy.
 */

import { Hono } from "hono";
import { getAdminClient } from "../db/supabase_client.ts";

export const plansRouter = new Hono();

plansRouter.get("/", async (c) => {
  const db    = getAdminClient();
  const today = new Date().toISOString().slice(0, 10);

  const [plansRes, promosRes] = await Promise.all([
    db
      .from("membership_plans")
      .select(`
        id, code, name, max_ruts,
        price_monthly_clp, price_annual_clp,
        price_uf_monthly, price_uf_annual,
        is_one_time_payment, price_one_time_clp, price_uf_one_time,
        min_commitment_months
      `)
      .eq("is_active", true)
      .order("price_monthly_clp", { ascending: true }),
    db
      .from("plan_promotions")
      .select("plan_id, billing_cycle, discounted_price_clp, discounted_price_uf")
      .eq("is_active", true)
      .lte("valid_from", today)
      .gte("valid_until", today),
  ]);

  if (plansRes.error) return c.json({ error: plansRes.error.message }, 500);

  // Build map: plan_id → promo fields per billing cycle
  const promoMap = new Map<string, {
    monthly_clp?: number; annual_clp?: number;
    monthly_uf?:  number; annual_uf?:  number;
  }>();

  for (const promo of promosRes.data ?? []) {
    const entry = promoMap.get(promo.plan_id) ?? {};
    const applyMonthly = promo.billing_cycle === null || promo.billing_cycle === "monthly";
    const applyAnnual  = promo.billing_cycle === null || promo.billing_cycle === "annual";

    if (applyMonthly) {
      entry.monthly_clp = promo.discounted_price_clp ?? undefined;
      entry.monthly_uf  = promo.discounted_price_uf  ?? undefined;
    }
    if (applyAnnual) {
      entry.annual_clp = promo.discounted_price_clp ?? undefined;
      entry.annual_uf  = promo.discounted_price_uf  ?? undefined;
    }
    promoMap.set(promo.plan_id, entry);
  }

  const plans = (plansRes.data ?? []).map((plan) => {
    const promo = promoMap.get(plan.id);
    return {
      ...plan,
      // CLP promo (display — per-month equivalent for annual)
      promo_price_monthly_clp: promo?.monthly_clp ?? null,
      promo_price_annual_clp:  promo?.annual_clp  ?? null,
      // UF promo (display)
      promo_uf_monthly:        promo?.monthly_uf  ?? null,
      promo_uf_annual:         promo?.annual_uf   ?? null,
    };
  });

  return c.json({ plans });
});
