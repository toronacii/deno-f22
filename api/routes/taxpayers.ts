/**
 * GET  /api/v1/taxpayers       — lista RUTs del usuario
 * POST /api/v1/taxpayers       — agrega un RUT (con validación de límite)
 * PUT  /api/v1/taxpayers/:id   — actualiza datos del RUT
 * DELETE /api/v1/taxpayers/:id — desactiva el RUT
 */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getUserClient } from "../db/supabase_client.ts";
import { assertCanAddRut } from "../services/subscription_service.ts";

export const taxpayersRouter = new Hono();

taxpayersRouter.use("*", authMiddleware);

// GET /taxpayers
taxpayersRouter.get("/", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const { data, error } = await db
    .from("taxpayer_entities")
    .select("id, rut, name, tax_regime, entity_type, is_active, created_at")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("name");

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ taxpayers: data });
});

// POST /taxpayers
taxpayersRouter.post("/", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const body = await c.req.json().catch(() => ({})) as {
    rut?: string;
    name?: string;
    tax_regime?: string;
    entity_type?: number;
  };

  if (!body.rut || !body.name) {
    return c.json({ error: "rut y name son requeridos" }, 400);
  }

  // Validar límite de RUTs en backend (nunca confiar en el frontend)
  try {
    await assertCanAddRut(db, userId);
  } catch (e) {
    return c.json({ error: (e as Error).message }, 403);
  }

  const { data, error } = await db
    .from("taxpayer_entities")
    .insert({
      user_id:     userId,
      rut:         body.rut.trim(),
      name:        body.name.trim(),
      tax_regime:  body.tax_regime ?? null,
      entity_type: body.entity_type ?? null,
    })
    .select()
    .single();

  if (error) {
    // RUT duplicado
    if (error.code === "23505") {
      return c.json({ error: "Este RUT ya está registrado en tu cuenta" }, 409);
    }
    return c.json({ error: error.message }, 400);
  }

  return c.json({ taxpayer: data }, 201);
});

// PUT /taxpayers/:id
taxpayersRouter.put("/:id", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);
  const id     = c.req.param("id");

  const body = await c.req.json().catch(() => ({})) as {
    name?: string;
    tax_regime?: string;
    entity_type?: number;
  };

  const { data, error } = await db
    .from("taxpayer_entities")
    .update({
      ...(body.name        !== undefined ? { name: body.name.trim() }     : {}),
      ...(body.tax_regime  !== undefined ? { tax_regime: body.tax_regime } : {}),
      ...(body.entity_type !== undefined ? { entity_type: body.entity_type } : {}),
    })
    .eq("id", id)
    .eq("user_id", userId) // RLS extra check
    .select()
    .single();

  if (error) return c.json({ error: error.message }, 400);
  if (!data) return c.json({ error: "RUT no encontrado" }, 404);

  return c.json({ taxpayer: data });
});

// DELETE /taxpayers/:id — soft delete
taxpayersRouter.delete("/:id", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);
  const id     = c.req.param("id");

  const { error } = await db
    .from("taxpayer_entities")
    .update({ is_active: false })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return c.json({ error: error.message }, 400);
  return c.json({ success: true });
});
