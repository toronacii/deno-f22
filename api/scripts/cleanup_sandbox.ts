/**
 * Script: cleanup_sandbox.ts
 *
 * Borra todos los usuarios EXCEPTO el de "abisaac" (buscado por email).
 * También cancela sus suscripciones en Flow sandbox.
 *
 * Tablas de configuración que NO se tocan:
 *   membership_plans, plan_promotions, form_types
 *
 * Uso:
 *   cd api && deno run --allow-read --allow-net --allow-env --env-file=../.env scripts/cleanup_sandbox.ts
 */

import { createClient } from "npm:@supabase/supabase-js@2";
import { cancelSubscription, FlowError } from "../services/flow_client.ts";

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const SUPABASE_URL         = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌  Faltan env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  Deno.exit(1);
}

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

// ---------------------------------------------------------------------------
// 1. Encontrar usuario abisaac
// ---------------------------------------------------------------------------

console.log("\n🔍  Buscando usuario abisaac...\n");

const { data: allProfiles, error: profilesErr } = await db
  .from("profiles")
  .select("id, email, flow_customer_id");

if (profilesErr || !allProfiles) {
  console.error("❌  Error fetching profiles:", profilesErr?.message);
  Deno.exit(1);
}

const abisaac = allProfiles.find((p) =>
  p.email?.toLowerCase().includes("abisaac")
);

if (!abisaac) {
  console.error("❌  No se encontró usuario con email que contenga 'abisaac'");
  console.log("Usuarios existentes:");
  allProfiles.forEach((p) => console.log(`  - ${p.email} (${p.id})`));
  Deno.exit(1);
}

console.log(`✅  Conservando: ${abisaac.email} (${abisaac.id})\n`);

const toDelete = allProfiles.filter((p) => p.id !== abisaac.id);

if (toDelete.length === 0) {
  console.log("ℹ️   No hay otros usuarios que borrar. Base de datos ya limpia.");
  Deno.exit(0);
}

console.log(`🗑️   Usuarios a borrar (${toDelete.length}):`);
toDelete.forEach((p) => console.log(`  - ${p.email} (${p.id})`));

// ---------------------------------------------------------------------------
// 2. Cancelar suscripciones en Flow para los usuarios a borrar
// ---------------------------------------------------------------------------

console.log("\n🔌  Cancelando suscripciones en Flow...\n");

const userIds = toDelete.map((p) => p.id);

const { data: subs } = await db
  .from("subscriptions")
  .select("id, flow_subscription_id, user_id")
  .in("user_id", userIds)
  .not("flow_subscription_id", "is", null);

for (const sub of subs ?? []) {
  if (!sub.flow_subscription_id) continue;
  try {
    await cancelSubscription({
      subscriptionId: sub.flow_subscription_id,
      at_period_end:  "0", // cancelación inmediata en sandbox
    });
    console.log(`  ✓  Suscripción cancelada en Flow: ${sub.flow_subscription_id}`);
  } catch (e) {
    const msg = e instanceof FlowError ? e.message : String(e);
    console.log(`  ⚠️   Flow error (ignorado): ${sub.flow_subscription_id} — ${msg}`);
  }
}

// ---------------------------------------------------------------------------
// 3. Borrar flow_events (ON DELETE SET NULL — los borramos explícitamente)
// ---------------------------------------------------------------------------

console.log("\n🗑️   Borrando flow_events...");
const { error: feErr } = await db
  .from("flow_events")
  .delete()
  .in("user_id", userIds);
if (feErr) console.warn("  ⚠️   flow_events:", feErr.message);
else console.log("  ✓  flow_events eliminados");

// ---------------------------------------------------------------------------
// 4. Borrar audit_logs (ON DELETE SET NULL — los borramos explícitamente)
// ---------------------------------------------------------------------------

console.log("🗑️   Borrando audit_logs...");
const { error: alErr } = await db
  .from("audit_logs")
  .delete()
  .in("user_id", userIds);
if (alErr) console.warn("  ⚠️   audit_logs:", alErr.message);
else console.log("  ✓  audit_logs eliminados");

// ---------------------------------------------------------------------------
// 5. Borrar usuarios en auth (cascade borra profiles, subscriptions,
//    taxpayer_entities, tax_forms, tax_form_data, submissions)
// ---------------------------------------------------------------------------

console.log("\n👤  Borrando usuarios en auth.users...\n");

for (const user of toDelete) {
  const { error } = await db.auth.admin.deleteUser(user.id);
  if (error) {
    console.error(`  ❌  ${user.email}: ${error.message}`);
  } else {
    console.log(`  ✓  ${user.email} eliminado`);
  }
}

// ---------------------------------------------------------------------------
// 6. Verificar estado final
// ---------------------------------------------------------------------------

console.log("\n📊  Estado final:\n");

const { data: remaining } = await db.from("profiles").select("id, email");
console.log(`  Usuarios restantes: ${remaining?.length ?? 0}`);
remaining?.forEach((p) => console.log(`    - ${p.email}`));

const { count: subCount } = await db
  .from("subscriptions")
  .select("id", { count: "exact", head: true });
console.log(`  Suscripciones restantes: ${subCount ?? 0}`);

const { count: feCount } = await db
  .from("flow_events")
  .select("id", { count: "exact", head: true });
console.log(`  Flow events restantes: ${feCount ?? 0}`);

const { count: teCount } = await db
  .from("taxpayer_entities")
  .select("id", { count: "exact", head: true });
console.log(`  RUTs restantes: ${teCount ?? 0}`);

console.log("\n✅  Limpieza completada.\n");
