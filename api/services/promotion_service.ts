/**
 * Promotion service — lógica de promociones por plan.
 *
 * Determina si hay una promoción activa para un plan + ciclo + fecha.
 * Si hay promo, retorna el precio bloqueado y el ID de la promo.
 */

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

export interface ActivePromo {
  id:                    string;
  name:                  string;
  discounted_price_usd:  number;
  /** Flow plan ID to use instead of the regular plan */
  flow_plan_id_override: string;
}

/**
 * Returns the active promotion for (planCode, billingCycle) on a given date,
 * or null if none applies.
 */
export async function getActivePromo(
  db: SupabaseClient,
  planId: string,
  billingCycle: string,
  date: Date = new Date(),
): Promise<ActivePromo | null> {
  const today = date.toISOString().split("T")[0]; // yyyy-mm-dd

  const { data, error } = await db
    .from("plan_promotions")
    .select("id, name, discounted_price_usd, billing_cycle")
    .eq("plan_id", planId)
    .eq("is_active", true)
    .lte("valid_from", today)
    .gte("valid_until", today)
    .or(`billing_cycle.is.null,billing_cycle.eq.${billingCycle}`)
    .maybeSingle();

  if (error || !data) return null;

  // Build the Flow plan ID for this promo (sync_flow_plans.ts creates these)
  const planCode = await getPlanCodeById(db, planId);
  if (!planCode) return null;

  return {
    id:                   data.id,
    name:                 data.name,
    discounted_price_usd: Number(data.discounted_price_usd),
    flow_plan_id_override: `${planCode}_${billingCycle}_promo`,
  };
}

async function getPlanCodeById(db: SupabaseClient, planId: string): Promise<string | null> {
  const { data } = await db
    .from("membership_plans")
    .select("code")
    .eq("id", planId)
    .single();
  return data?.code ?? null;
}

/** Converts billing_cycle to period multiplier (how many months per charge). */
export function periodMultiplier(billingCycle: string): number {
  switch (billingCycle) {
    case "monthly":   return 1;
    case "quarterly": return 3;
    case "annual":    return 12;
    default:          throw new Error(`Unknown billing cycle: ${billingCycle}`);
  }
}

/** Returns the per-month USD price for a plan + cycle (no promo applied). */
export function regularPricePerMonth(
  plan: { price_monthly_usd: number; price_quarterly_usd: number; price_annual_usd: number },
  billingCycle: string,
): number {
  switch (billingCycle) {
    case "monthly":   return plan.price_monthly_usd;
    case "quarterly": return plan.price_quarterly_usd / 3;
    case "annual":    return plan.price_annual_usd / 12;
    default:          throw new Error(`Unknown billing cycle: ${billingCycle}`);
  }
}

/** Returns the total USD amount charged per billing period. */
export function periodAmountUsd(pricePerMonthUsd: number, billingCycle: string): number {
  return pricePerMonthUsd * periodMultiplier(billingCycle);
}
