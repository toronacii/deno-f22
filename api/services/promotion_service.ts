/**
 * Promotion service — lógica de promociones por plan.
 *
 * Determina si hay una promoción activa para un plan + ciclo + fecha.
 * Si hay promo, retorna el precio bloqueado (USD y CLP) y el ID de la promo.
 */

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

export interface ActivePromo {
  id:                    string;
  name:                  string;
  discounted_price_clp:  number | null;
  /** Flow plan ID to use instead of the regular plan */
  flow_plan_id_override: string;
}

/**
 * Returns the active promotion for (planId, billingCycle) on a given date,
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
    .select("id, name, discounted_price_clp, billing_cycle")
    .eq("plan_id", planId)
    .eq("is_active", true)
    .lte("valid_from", today)
    .gte("valid_until", today)
    .or(`billing_cycle.is.null,billing_cycle.eq.${billingCycle}`)
    .maybeSingle();

  if (error || !data) return null;

  const planCode = await getPlanCodeById(db, planId);
  if (!planCode) return null;

  return {
    id:                    data.id,
    name:                  data.name,
    discounted_price_clp:  data.discounted_price_clp != null
      ? Number(data.discounted_price_clp)
      : null,
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
