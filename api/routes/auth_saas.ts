/**
 * POST /api/v1/auth/register   — completa el perfil tras el signup de Supabase
 * POST /api/v1/auth/select-plan — asocia un plan al usuario autenticado
 */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getUserClient } from "../db/supabase_client.ts";

export const authSaasRouter = new Hono();

// POST /auth/register — el trigger ya creó el profile; aquí completamos datos opcionales
authSaasRouter.post("/register", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const body = await c.req.json().catch(() => ({}));
  const { full_name, avatar_url } = body as { full_name?: string; avatar_url?: string };

  const { data, error } = await db
    .from("profiles")
    .update({
      ...(full_name   ? { full_name }   : {}),
      ...(avatar_url  ? { avatar_url }  : {}),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) return c.json({ error: error.message }, 400);
  return c.json({ profile: data }, 201);
});

// POST /auth/select-plan — crea o reemplaza la suscripción activa
authSaasRouter.post("/select-plan", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const body = await c.req.json().catch(() => ({}));
  const { plan_code, billing_cycle = "monthly" } = body as {
    plan_code?: string;
    billing_cycle?: "monthly" | "quarterly" | "annual";
  };

  if (!plan_code) {
    return c.json({ error: "plan_code es requerido" }, 400);
  }
  if (!["monthly", "quarterly", "annual"].includes(billing_cycle)) {
    return c.json({ error: "billing_cycle inválido" }, 400);
  }

  // Obtener el plan
  const { data: plan, error: planError } = await db
    .from("membership_plans")
    .select("id, code, name, max_ruts, min_commitment_months")
    .eq("code", plan_code)
    .eq("is_active", true)
    .single();

  if (planError || !plan) {
    return c.json({ error: "Plan no encontrado" }, 404);
  }

  // Cancelar suscripción activa anterior si existe
  await db
    .from("subscriptions")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("status", "active");

  // Crear nueva suscripción
  const { data: sub, error: subError } = await db
    .from("subscriptions")
    .insert({
      user_id: userId,
      plan_id: plan.id,
      billing_cycle,
      status: "active",
    })
    .select()
    .single();

  if (subError) return c.json({ error: subError.message }, 400);

  // Marcar onboarding completado
  await db
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", userId);

  return c.json({ subscription: sub, plan }, 201);
});
