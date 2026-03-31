/**
 * GET  /api/v1/taxpayers             — lista RUTs del usuario
 * GET  /api/v1/taxpayers/sii-lookup  — proxy hacia SII para obtener info del contribuyente
 * POST /api/v1/taxpayers             — agrega un RUT (con validación de límite)
 * PUT  /api/v1/taxpayers/:id         — actualiza datos del RUT
 * DELETE /api/v1/taxpayers/:id       — desactiva el RUT
 */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getUserClient } from "../db/supabase_client.ts";
import { assertCanAddRut } from "../services/subscription_service.ts";

export const taxpayersRouter = new Hono();

taxpayersRouter.use("*", authMiddleware);

// GET /taxpayers?inactive=true
taxpayersRouter.get("/", async (c) => {
  const userId   = c.get("userId") as string;
  const jwt      = c.get("userJwt") as string;
  const db       = getUserClient(jwt);
  const inactive = c.req.query("inactive") === "true";

  const { data, error } = await db
    .from("taxpayer_entities")
    .select("id, rut, name, tax_regime, entity_type, is_active, created_at")
    .eq("user_id", userId)
    .eq("is_active", !inactive)
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
    sii_data?: Record<string, unknown>;
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
      sii_data:    body.sii_data ?? null,
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

// GET /taxpayers/sii-lookup?rut=12345678&dv=9
// Proxy hacia el SII — evita CORS desde el browser
taxpayersRouter.get("/sii-lookup", async (c) => {
  const rut = c.req.query("rut");
  const dv  = c.req.query("dv");

  if (!rut || !dv) {
    return c.json({ error: "rut y dv son requeridos" }, 400);
  }

  try {
    const res = await fetch(
      "https://www2.sii.cl/app/stc/recurso/v1/consulta/getConsultaData/",
      {
        method: "POST",
        headers: {
          "Accept":       "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Origin":       "https://www2.sii.cl",
          "Referer":      "https://www2.sii.cl/stc/noauthz/consulta",
          "User-Agent":   "Mozilla/5.0 (compatible; F22App/1.0)",
        },
        body: JSON.stringify({ rut, dv, reAction: "consultaSTC", reToken: " " }),
      }
    );

    if (!res.ok) {
      return c.json({ error: "Error consultando el SII" }, 502);
    }

    const raw = await res.json() as {
      registrado?: boolean;
      nombre?: string;
      inicioActividades?: boolean;
      fechaInicioActividades?: string;
      cumpleObligacionTributaria?: string;
      girosNegocio?: { codigo: string; descripcion: string; categoriaTributaria: string; indicadorAfectoIva: string; fechaInicio: string }[];
      timbrajes?: { codigo: string; descripcion: string; fechaTimbraje: string }[];
    };

    // Devuelve solo los campos útiles
    return c.json({
      registrado:                raw.registrado ?? false,
      nombre:                    raw.nombre ?? null,
      inicioActividades:         raw.inicioActividades ?? false,
      fechaInicioActividades:    raw.fechaInicioActividades ?? null,
      cumpleObligacionTributaria: raw.cumpleObligacionTributaria ?? null,
      girosNegocio: (raw.girosNegocio ?? []).map((g) => ({
        codigo:             g.codigo,
        descripcion:        g.descripcion.trim(),
        categoriaTributaria: g.categoriaTributaria,
        indicadorAfectoIva: g.indicadorAfectoIva,
      })),
      timbrajes: (raw.timbrajes ?? []).map((t) => ({
        codigo:      t.codigo,
        descripcion: t.descripcion.trim(),
      })),
    });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 502);
  }
});

// GET /taxpayers/:id
taxpayersRouter.get("/:id", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);
  const id     = c.req.param("id");

  const { data, error } = await db
    .from("taxpayer_entities")
    .select("id, rut, name, tax_regime, entity_type, is_active, created_at")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !data) return c.json({ error: "Contribuyente no encontrado" }, 404);
  return c.json({ taxpayer: data });
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

// PATCH /taxpayers/:id/reactivate — reactiva si hay cupo en el plan
taxpayersRouter.patch("/:id/reactivate", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);
  const id     = c.req.param("id");

  // Verificar que el RUT pertenece al usuario y está inactivo
  const { data: taxpayer } = await db
    .from("taxpayer_entities")
    .select("id, is_active")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!taxpayer) return c.json({ error: "Contribuyente no encontrado" }, 404);
  if (taxpayer.is_active) return c.json({ error: "El contribuyente ya está activo" }, 400);

  // Verificar cupo en el plan (reutiliza la misma lógica que al agregar)
  try {
    await assertCanAddRut(db, userId);
  } catch (e) {
    return c.json({ error: (e as Error).message, code: "PLAN_LIMIT" }, 403);
  }

  const { error } = await db
    .from("taxpayer_entities")
    .update({ is_active: true })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return c.json({ error: error.message }, 400);
  return c.json({ success: true });
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
