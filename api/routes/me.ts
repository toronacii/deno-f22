/**
 * GET /api/v1/me — perfil del usuario autenticado
 */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getUserClient } from "../db/supabase_client.ts";

export const meRouter = new Hono();

meRouter.get("/", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const { data, error } = await db
    .from("profiles")
    .select("id, email, full_name, avatar_url, onboarding_completed, created_at")
    .eq("id", userId)
    .single();

  if (error) return c.json({ error: error.message }, 404);
  return c.json({ profile: data });
});
