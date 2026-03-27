/**
 * GET /api/v1/subscriptions/current — suscripción activa del usuario
 */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getUserClient } from "../db/supabase_client.ts";
import { getActiveSubscription, getRutUsage } from "../services/subscription_service.ts";

export const subscriptionsRouter = new Hono();

subscriptionsRouter.get("/current", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const [subscription, rutUsage] = await Promise.all([
    getActiveSubscription(db, userId),
    getRutUsage(db, userId),
  ]);

  if (!subscription) {
    return c.json({ subscription: null, ruts: null, onboarding_required: true });
  }

  return c.json({
    subscription,
    ruts: {
      used:       rutUsage.used,
      limit:      rutUsage.limit,
      canAddMore: rutUsage.canAddMore,
    },
  });
});
