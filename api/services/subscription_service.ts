/**
 * Subscription service — lógica de negocio de membresías.
 *
 * La validación del límite de RUTs ocurre SOLO aquí (en backend),
 * nunca en el frontend.
 */

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

export interface PlanInfo {
  id: string;
  code: string;
  name: string;
  maxRuts: number | null; // null = ilimitado
  billingCycle: string;
  status: string;
  endsAt: string | null;
}

export interface RutUsage {
  used: number;
  limit: number | null; // null = ilimitado
  canAddMore: boolean;
}

/** Obtiene la suscripción activa del usuario con datos del plan. */
export async function getActiveSubscription(
  db: SupabaseClient,
  userId: string,
): Promise<PlanInfo | null> {
  const { data, error } = await db
    .from("subscriptions")
    .select(`
      id,
      billing_cycle,
      status,
      ends_at,
      membership_plans (
        id, code, name, max_ruts
      )
    `)
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) return null;

  const plan = data.membership_plans as {
    id: string; code: string; name: string; max_ruts: number | null;
  };

  return {
    id: plan.id,
    code: plan.code,
    name: plan.name,
    maxRuts: plan.max_ruts,
    billingCycle: data.billing_cycle,
    status: data.status,
    endsAt: data.ends_at ?? null,
  };
}

/** Cuenta RUTs activos del usuario y determina si puede agregar más. */
export async function getRutUsage(
  db: SupabaseClient,
  userId: string,
): Promise<RutUsage> {
  const [subscriptionResult, countResult] = await Promise.all([
    getActiveSubscription(db, userId),
    db
      .from("taxpayer_entities")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_active", true),
  ]);

  const used = countResult.count ?? 0;
  const limit = subscriptionResult?.maxRuts ?? null;
  const canAddMore = limit === null ? true : used < limit;

  return { used, limit, canAddMore };
}

/**
 * Verifica que el usuario puede agregar un RUT más.
 * Lanza un error descriptivo si alcanzó el límite.
 */
export async function assertCanAddRut(
  db: SupabaseClient,
  userId: string,
): Promise<void> {
  const usage = await getRutUsage(db, userId);

  if (!usage.canAddMore) {
    throw new Error(
      `Límite de RUTs alcanzado (${usage.used}/${usage.limit}). ` +
      `Actualiza tu plan para agregar más contribuyentes.`,
    );
  }
}
