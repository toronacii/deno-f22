/**
 * GET /api/v1/dashboard — datos del dashboard inicial
 *
 * Retorna en una sola llamada:
 *  - perfil del usuario
 *  - plan/suscripción activa
 *  - uso de RUTs (usado / límite)
 *  - últimos 5 formularios
 */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getUserClient } from "../db/supabase_client.ts";
import { getActiveSubscription, getRutUsage } from "../services/subscription_service.ts";

export const dashboardRouter = new Hono();

dashboardRouter.get("/", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const [profileResult, subscription, rutUsage, taxpayersResult] = await Promise.all([
    db.from("profiles")
      .select("id, email, full_name, avatar_url, onboarding_completed")
      .eq("id", userId)
      .single(),

    getActiveSubscription(db, userId),
    getRutUsage(db, userId),

    db.from("taxpayer_entities")
      .select("id, rut, name, tax_regime, entity_type, is_active")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("name"),
  ]);

  return c.json({
    profile:      profileResult.data,
    subscription: subscription ? {
      plan_code:    subscription.code,
      plan_name:    subscription.name,
      max_ruts:     subscription.maxRuts,
      billing_cycle: subscription.billingCycle,
      status:       subscription.status,
    } : null,
    rut_usage: {
      active: rutUsage.used,
      max:    rutUsage.limit,
    },
    taxpayers: taxpayersResult.data ?? [],
  });
});
