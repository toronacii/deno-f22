/**
 * GET /api/v1/plans — catálogo de planes disponibles (público)
 * Incluye promo_price_monthly_usd y promo_price_annual_usd si hay promociones activas hoy.
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
      .select("id, code, name, max_ruts, price_monthly_usd, price_quarterly_usd, price_annual_usd, min_commitment_months")
      .eq("is_active", true)
      .order("price_monthly_usd", { ascending: true }),
    db
      .from("plan_promotions")
      .select("plan_id, billing_cycle, discounted_price_usd")
      .eq("is_active", true)
      .lte("valid_from", today)
      .gte("valid_until", today),
  ]);

  if (plansRes.error) return c.json({ error: plansRes.error.message }, 500);

  // Build map: plan_id → { monthly?: number; annual?: number }
  const promoMap = new Map<string, { monthly?: number; annual?: number }>();
  for (const promo of promosRes.data ?? []) {
    const entry = promoMap.get(promo.plan_id) ?? {};
    if (promo.billing_cycle === null) {
      entry.monthly = promo.discounted_price_usd;
      entry.annual  = promo.discounted_price_usd;
    } else if (promo.billing_cycle === "monthly") {
      entry.monthly = promo.discounted_price_usd;
    } else if (promo.billing_cycle === "annual") {
      entry.annual = promo.discounted_price_usd;
    }
    promoMap.set(promo.plan_id, entry);
  }

  const plans = (plansRes.data ?? []).map((plan) => ({
    ...plan,
    promo_price_monthly_usd: promoMap.get(plan.id)?.monthly ?? null,
    promo_price_annual_usd:  promoMap.get(plan.id)?.annual  ?? null,
  }));

  return c.json({ plans });
});
