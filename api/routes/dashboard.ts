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

  const [profileResult, subscription, rutUsage, formsResult] = await Promise.all([
    db.from("profiles")
      .select("id, email, full_name, avatar_url, onboarding_completed")
      .eq("id", userId)
      .single(),

    getActiveSubscription(db, userId),
    getRutUsage(db, userId),

    db.from("tax_forms")
      .select(`
        id, title, status, updated_at,
        taxpayer_entities ( rut, name ),
        form_types ( code, name )
      `)
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(5),
  ]);

  return c.json({
    profile:      profileResult.data,
    subscription,
    ruts: {
      used:       rutUsage.used,
      limit:      rutUsage.limit,
      canAddMore: rutUsage.canAddMore,
    },
    recent_forms: formsResult.data ?? [],
  });
});
