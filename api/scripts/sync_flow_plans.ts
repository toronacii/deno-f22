/**
 * Script: sync_flow_plans.ts
 *
 * Creates (or skips if already existing) all Flow subscription plans based on
 * the membership_plans table + active plan_promotions.
 *
 * Run once per environment (sandbox + production):
 *   cd api && deno run --allow-read --allow-net --allow-env --env-file=../.env scripts/sync_flow_plans.ts
 *
 * Flow plans created:
 *   - Regular: {code}_{cycle}        — e.g. sinergy_monthly
 *   - Promo:   {code}_{cycle}_promo  — e.g. sinergy_monthly_promo
 *
 * Amounts use price_monthly_clp / price_annual_clp directly from DB (no USD conversion).
 * F22 Digital (is_one_time_payment = true) is skipped — it uses payment links, not plans.
 *
 * IMPORTANT: Flow locks plan amounts at creation time. To change a price, run
 * recreate_flow_plans.ts (increments FLOW_PLAN_VERSION in .env) so existing
 * subscribers are unaffected.
 */

import { createClient } from "npm:@supabase/supabase-js@2";
import {
  createPlan,
  getPlan,
  updatePlanCallback,
  billingCycleToInterval,
  toFlowPlanId,
  FlowError,
} from "../services/flow_client.ts";
import { periodMultiplier } from "../services/promotion_service.ts";

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const SUPABASE_URL         = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FLOW_WEBHOOK_URL     = Deno.env.get("FLOW_WEBHOOK_URL")!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !FLOW_WEBHOOK_URL) {
  console.error("❌  Missing env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, FLOW_WEBHOOK_URL");
  Deno.exit(1);
}

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

const BILLING_CYCLES = ["monthly", "annual"] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Creates a Flow plan if it doesn't exist yet, or updates its callback URL.
 * amountClp = total charged per billing period (not per month).
 *   Monthly → amountClp = price_monthly_clp
 *   Annual  → amountClp = price_annual_clp (total year)
 */
async function ensurePlan(params: {
  planId:       string;
  name:         string;
  amountClp:    number;
  billingCycle: string;
}): Promise<void> {
  const { planId, name, amountClp, billingCycle } = params;

  // Check if plan already exists in Flow
  try {
    const existing = await getPlan(planId);
    if (existing.status === 1) {
      try {
        await updatePlanCallback(planId, FLOW_WEBHOOK_URL);
        console.log(`  ↺   ${planId} — ya existe, urlCallback actualizado`);
      } catch (updateErr) {
        const msg = updateErr instanceof FlowError ? updateErr.message : String(updateErr);
        console.log(`  ⏭   ${planId} — ya existe (${existing.amount} CLP), callback no actualizable: ${msg}`);
      }
      return;
    }
  } catch (e) {
    if (!(e instanceof FlowError)) throw e;
    // FlowError (400/404) → plan not found → proceed to create
  }

  const interval = billingCycleToInterval(billingCycle as "monthly" | "quarterly" | "annual");

  await createPlan({
    planId,
    name,
    amount:                 String(amountClp),
    currency:               "CLP",
    interval:               interval.interval,
    interval_count:         interval.interval_count,
    urlCallback:            FLOW_WEBHOOK_URL,
    charges_retries_number: "3",
  });

  console.log(`  ✓   ${planId} — creado en ${amountClp.toLocaleString("es-CL")} CLP`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("\n🔄  Fetching plans from Supabase...\n");

const { data: plans, error: plansError } = await db
  .from("membership_plans")
  .select("id, code, name, price_monthly_clp, price_annual_clp, is_one_time_payment")
  .eq("is_active", true)
  .order("price_monthly_clp", { ascending: true });

if (plansError || !plans) {
  console.error("❌  Failed to fetch plans:", plansError?.message);
  Deno.exit(1);
}

const { data: promos, error: promosError } = await db
  .from("plan_promotions")
  .select("id, plan_id, name, billing_cycle, discounted_price_clp, valid_from, valid_until")
  .eq("is_active", true);

if (promosError) {
  console.error("❌  Failed to fetch promotions:", promosError?.message);
  Deno.exit(1);
}

const today = new Date().toISOString().split("T")[0];

// ---------------------------------------------------------------------------
// Create regular subscription plans (skip one-time payment plans)
// ---------------------------------------------------------------------------
console.log("📋  Regular plans:\n");

for (const plan of plans) {
  if (plan.is_one_time_payment) {
    console.log(`  ⏭   ${plan.name} (${plan.code}) — pago único, no requiere plan Flow`);
    console.log();
    continue;
  }

  if (!plan.price_monthly_clp || !plan.price_annual_clp) {
    console.warn(`  ⚠️   ${plan.name} (${plan.code}) — sin precios CLP, ejecuta migration_clp_pricing.sql primero`);
    console.log();
    continue;
  }

  console.log(`  Plan: ${plan.name} (${plan.code})`);

  for (const cycle of BILLING_CYCLES) {
    // Flow receives the total charged per period:
    //   monthly → price_monthly_clp  (cobrado cada mes)
    //   annual  → price_annual_clp   (cobrado cada año en un solo cargo)
    const amountClp  = cycle === "monthly" ? plan.price_monthly_clp : plan.price_annual_clp;
    const flowPlanId = toFlowPlanId(plan.code, cycle);
    const label      = `${plan.name} — ${cycle}`;

    await ensurePlan({ planId: flowPlanId, name: label, amountClp, billingCycle: cycle });
  }
  console.log();
}

// ---------------------------------------------------------------------------
// Create promotional plans (only for non-expired promos)
// ---------------------------------------------------------------------------
if ((promos ?? []).length > 0) {
  console.log("🎁  Promotional plans:\n");

  for (const promo of promos!) {
    const plan = plans.find((p) => p.id === promo.plan_id);
    if (!plan || plan.is_one_time_payment) continue;

    const isExpired = promo.valid_until < today;
    if (isExpired) {
      console.log(`  ⏭   Promo "${promo.name}" vencida (${promo.valid_from} → ${promo.valid_until})`);
      continue;
    }

    if (!promo.discounted_price_clp) {
      console.warn(`  ⚠️   Promo "${promo.name}" sin precio CLP — actualiza con migration_clp_pricing.sql`);
      continue;
    }

    const cycles = promo.billing_cycle
      ? [promo.billing_cycle as (typeof BILLING_CYCLES)[number]]
      : [...BILLING_CYCLES];

    console.log(`  Promo: ${promo.name} (${plan.code})`);
    for (const cycle of cycles) {
      // Promo amount = discounted_price_clp (per month) × months in period
      const amountClp  = Number(promo.discounted_price_clp) * periodMultiplier(cycle);
      const flowPlanId = toFlowPlanId(plan.code, cycle, true);
      const label      = `${plan.name} — ${cycle} (Promo)`;

      await ensurePlan({ planId: flowPlanId, name: label, amountClp, billingCycle: cycle });
    }
    console.log();
  }
}

console.log("✅  Flow plans sync complete.\n");
