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
 *   - Regular: {code}_{cycle}           — e.g. sinergy_monthly
 *   - Promo:   {code}_{cycle}_promo     — e.g. sinergy_monthly_promo
 *
 * Amount in Flow = USD amount per billing period converted to CLP at current rate.
 * IMPORTANT: The CLP amount is locked at creation time. Re-run this script if you
 * need to update the rate (creates a new plan version — existing subscribers unaffected).
 */

import { createClient } from "npm:@supabase/supabase-js@2";
import {
  createPlan,
  getPlan,
  updatePlanCallback,
  usdToClp,
  billingCycleToInterval,
  toFlowPlanId,
  FlowError,
} from "../services/flow_client.ts";
import { periodMultiplier, regularPricePerMonth, periodAmountUsd } from "../services/promotion_service.ts";

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

async function ensurePlan(params: {
  planId:        string;
  name:          string;
  amountUsd:     number;
  billingCycle:  string;
}): Promise<void> {
  const { planId, name, amountUsd, billingCycle } = params;

  // Check if plan already exists in Flow
  try {
    const existing = await getPlan(planId);
    if (existing.status === 1) {
      // Plan exists — update urlCallback in case it changed (only works if no active subscribers)
      try {
        await updatePlanCallback(planId, FLOW_WEBHOOK_URL);
        console.log(`  ↺   ${planId} — already exists, urlCallback updated`);
      } catch (updateErr) {
        const msg = updateErr instanceof FlowError ? updateErr.message : String(updateErr);
        console.log(`  ⏭   ${planId} — already exists (amount: ${existing.amount} CLP), urlCallback not updated: ${msg}`);
      }
      return;
    }
  } catch (e) {
    // 400/401 means not found — proceed to create
    if (!(e instanceof FlowError)) throw e;
  }

  // Convert USD → CLP
  const { clp, rate } = await usdToClp(amountUsd);
  const interval       = billingCycleToInterval(billingCycle as "monthly" | "quarterly" | "annual");

  await createPlan({
    planId,
    name,
    amount:         String(clp),
    currency:       "CLP",
    interval:       interval.interval,
    interval_count: interval.interval_count,
    urlCallback:    FLOW_WEBHOOK_URL,
    charges_retries_number: "3",
  });

  console.log(`  ✓   ${planId} — created at ${clp} CLP (${rate.toFixed(2)} CLP/USD)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("\n🔄  Fetching plans from Supabase...\n");

const { data: plans, error: plansError } = await db
  .from("membership_plans")
  .select("id, code, name, price_monthly_usd, price_quarterly_usd, price_annual_usd")
  .eq("is_active", true)
  .order("price_monthly_usd", { ascending: true });

if (plansError || !plans) {
  console.error("❌  Failed to fetch plans:", plansError?.message);
  Deno.exit(1);
}

const { data: promos, error: promosError } = await db
  .from("plan_promotions")
  .select("id, plan_id, name, billing_cycle, discounted_price_usd, valid_from, valid_until")
  .eq("is_active", true);

if (promosError) {
  console.error("❌  Failed to fetch promotions:", promosError?.message);
  Deno.exit(1);
}

const today = new Date().toISOString().split("T")[0];

// ---------------------------------------------------------------------------
// Create regular plans
// ---------------------------------------------------------------------------
console.log("📋  Regular plans:\n");

for (const plan of plans) {
  console.log(`  Plan: ${plan.name} (${plan.code})`);
  for (const cycle of BILLING_CYCLES) {
    const pricePerMonth = regularPricePerMonth(plan, cycle);
    const amountUsd     = periodAmountUsd(pricePerMonth, cycle);
    const flowPlanId    = toFlowPlanId(plan.code, cycle);
    const label         = `${plan.name} — ${cycle}`;

    await ensurePlan({ planId: flowPlanId, name: label, amountUsd, billingCycle: cycle });
  }
  console.log();
}

// ---------------------------------------------------------------------------
// Create promotional plans (only for currently-active promos)
// ---------------------------------------------------------------------------
if ((promos ?? []).length > 0) {
  console.log("🎁  Promotional plans:\n");

  for (const promo of promos!) {
    const plan = plans.find((p) => p.id === promo.plan_id);
    if (!plan) continue;

    // Skip only if already expired — create plans in advance for upcoming promos
    const isExpired = promo.valid_until < today;
    if (isExpired) {
      console.log(`  ⏭   Promo "${promo.name}" already expired (${promo.valid_from} → ${promo.valid_until})`);
      continue;
    }

    // If promo has a specific cycle, create only that. If null, create for all cycles.
    const cycles = promo.billing_cycle
      ? [promo.billing_cycle as typeof BILLING_CYCLES[number]]
      : [...BILLING_CYCLES];

    console.log(`  Promo: ${promo.name} (${plan.code})`);
    for (const cycle of cycles) {
      const amountUsd  = Number(promo.discounted_price_usd) * periodMultiplier(cycle);
      const flowPlanId = toFlowPlanId(plan.code, cycle, true);
      const label      = `${plan.name} — ${cycle} (Promo)`;

      await ensurePlan({ planId: flowPlanId, name: label, amountUsd, billingCycle: cycle });
    }
    console.log();
  }
}

console.log("✅  Flow plans sync complete.\n");
