/**
 * Script: recreate_flow_plans.ts
 *
 * Elimina todos los planes existentes en Flow y los recrea con el urlCallback
 * actualizado. Usar cuando urlCallback apunta a una URL obsoleta.
 *
 * ADVERTENCIA: solo correr cuando no hay suscripciones activas en Flow.
 *
 * Run:
 *   cd api && deno run --allow-read --allow-net --allow-env --env-file=../.env scripts/recreate_flow_plans.ts
 */

import { createClient } from "npm:@supabase/supabase-js@2";
import {
  createPlan,
  getPlan,
  deletePlan,
  usdToClp,
  billingCycleToInterval,
  toFlowPlanId,
  FlowError,
} from "../services/flow_client.ts";
import { periodMultiplier, regularPricePerMonth, periodAmountUsd } from "../services/promotion_service.ts";

const SUPABASE_URL         = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FLOW_WEBHOOK_URL     = Deno.env.get("FLOW_WEBHOOK_URL")!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !FLOW_WEBHOOK_URL) {
  console.error("❌  Faltan env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, FLOW_WEBHOOK_URL");
  Deno.exit(1);
}

console.log(`\n🔗  Webhook URL: ${FLOW_WEBHOOK_URL}\n`);

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

const BILLING_CYCLES = ["monthly", "annual"] as const;

// ---------------------------------------------------------------------------
// Fetch data
// ---------------------------------------------------------------------------

const { data: plans, error: plansError } = await db
  .from("membership_plans")
  .select("id, code, name, price_monthly_usd, price_quarterly_usd, price_annual_usd")
  .eq("is_active", true)
  .order("price_monthly_usd", { ascending: true });

if (plansError || !plans) {
  console.error("❌  No se pudieron cargar los planes:", plansError?.message);
  Deno.exit(1);
}

const { data: promos } = await db
  .from("plan_promotions")
  .select("id, plan_id, name, billing_cycle, discounted_price_usd, valid_from, valid_until")
  .eq("is_active", true);

const today = new Date().toISOString().split("T")[0];

// Collect all planIds to process
const planIds: { planId: string; name: string; amountUsd: number; billingCycle: string }[] = [];

for (const plan of plans) {
  for (const cycle of BILLING_CYCLES) {
    planIds.push({
      planId:       toFlowPlanId(plan.code, cycle),
      name:         `${plan.name} — ${cycle}`,
      amountUsd:    periodAmountUsd(regularPricePerMonth(plan, cycle), cycle),
      billingCycle: cycle,
    });
  }
}

for (const promo of promos ?? []) {
  if (promo.valid_until < today) continue;
  const plan = plans.find((p) => p.id === promo.plan_id);
  if (!plan) continue;

  const cycles = promo.billing_cycle
    ? [promo.billing_cycle as typeof BILLING_CYCLES[number]]
    : [...BILLING_CYCLES];

  for (const cycle of cycles) {
    planIds.push({
      planId:       toFlowPlanId(plan.code, cycle, true),
      name:         `${plan.name} — ${cycle} (Promo)`,
      amountUsd:    Number(promo.discounted_price_usd) * periodMultiplier(cycle),
      billingCycle: cycle,
    });
  }
}

// ---------------------------------------------------------------------------
// Step 1: Delete all existing plans
// ---------------------------------------------------------------------------
console.log(`🗑   Eliminando ${planIds.length} planes...\n`);

for (const { planId } of planIds) {
  try {
    await getPlan(planId); // check it exists first
    await deletePlan(planId);
    console.log(`  ✓   ${planId} — eliminado`);
  } catch (e) {
    if (e instanceof FlowError && e.httpStatus === 400) {
      console.log(`  ⏭   ${planId} — no existía, saltando`);
    } else {
      console.error(`  ✖   ${planId} — error al eliminar:`, e);
    }
  }
}

// ---------------------------------------------------------------------------
// Step 2: Recreate all plans with correct urlCallback
// ---------------------------------------------------------------------------
console.log(`\n🔄  Recreando ${planIds.length} planes con webhook actualizado...\n`);

// Get a fresh exchange rate once for all plans
const { rate } = await usdToClp(1);
console.log(`  💱  Tasa actual: ${rate.toFixed(2)} CLP/USD\n`);

for (const { planId, name, amountUsd, billingCycle } of planIds) {
  const clp      = Math.round(amountUsd * rate);
  const interval = billingCycleToInterval(billingCycle as "monthly" | "quarterly" | "annual");

  try {
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
    console.log(`  ✓   ${planId} — creado a ${clp.toLocaleString("es-CL")} CLP`);
  } catch (e) {
    console.error(`  ✖   ${planId} — error al crear:`, e instanceof FlowError ? e.message : e);
  }
}

console.log("\n✅  Planes recreados con webhook actualizado.\n");
