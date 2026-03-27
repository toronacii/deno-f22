/**
 * GET  /api/v1/forms          — lista formularios del usuario
 * POST /api/v1/forms          — crea un formulario nuevo
 * GET  /api/v1/forms/:id      — detalle del formulario
 * PUT  /api/v1/forms/:id/data — guarda/actualiza el borrador JSONB
 */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getUserClient } from "../db/supabase_client.ts";

export const formsSaasRouter = new Hono();

formsSaasRouter.use("*", authMiddleware);

// GET /forms  (opcional: ?taxpayer_id=uuid)
formsSaasRouter.get("/", async (c) => {
  const userId     = c.get("userId") as string;
  const jwt        = c.get("userJwt") as string;
  const db         = getUserClient(jwt);
  const taxpayerId = c.req.query("taxpayer_id");

  let query = db
    .from("tax_forms")
    .select(`
      id, title, status, created_at, updated_at,
      taxpayer_entities ( id, rut, name ),
      form_types ( id, code, name, tax_year )
    `)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (taxpayerId) {
    query = query.eq("taxpayer_id", taxpayerId);
  }

  const { data, error } = await query;

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ forms: data });
});

// POST /forms
formsSaasRouter.post("/", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);

  const body = await c.req.json().catch(() => ({})) as {
    taxpayer_id?: string;
    form_type_code?: string;
    title?: string;
    initial_data?: Record<string, unknown>;
  };

  if (!body.taxpayer_id || !body.form_type_code) {
    return c.json({ error: "taxpayer_id y form_type_code son requeridos" }, 400);
  }

  // Verificar que el taxpayer pertenece al usuario
  const { data: taxpayer } = await db
    .from("taxpayer_entities")
    .select("id, rut, name")
    .eq("id", body.taxpayer_id)
    .eq("user_id", userId)
    .single();

  if (!taxpayer) return c.json({ error: "Contribuyente no encontrado" }, 404);

  // Obtener form_type
  const { data: formType } = await db
    .from("form_types")
    .select("id, code, name, tax_year")
    .eq("code", body.form_type_code)
    .eq("is_active", true)
    .single();

  if (!formType) return c.json({ error: "Tipo de formulario no encontrado o inactivo" }, 404);

  // Crear formulario
  const title = body.title ?? `${formType.code} ${formType.tax_year ?? ""} — ${taxpayer.name}`.trim();

  const { data: form, error: formError } = await db
    .from("tax_forms")
    .insert({
      user_id:      userId,
      taxpayer_id:  body.taxpayer_id,
      form_type_id: formType.id,
      title,
      status: "draft",
    })
    .select()
    .single();

  if (formError) return c.json({ error: formError.message }, 400);

  // Crear registro vacío de datos (o con datos iniciales)
  await db
    .from("tax_form_data")
    .insert({
      form_id: form.id,
      data:    body.initial_data ?? {},
      version: 1,
    });

  return c.json({ form }, 201);
});

// GET /forms/:id
formsSaasRouter.get("/:id", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);
  const id     = c.req.param("id");

  const { data, error } = await db
    .from("tax_forms")
    .select(`
      id, title, status, created_at, updated_at,
      taxpayer_entities ( id, rut, name, tax_regime, entity_type ),
      form_types ( id, code, name, tax_year ),
      tax_form_data ( data, version, updated_at )
    `)
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !data) return c.json({ error: "Formulario no encontrado" }, 404);
  return c.json({ form: data });
});

// PUT /forms/:id/data — guarda borrador JSONB
formsSaasRouter.put("/:id/data", async (c) => {
  const userId = c.get("userId") as string;
  const jwt    = c.get("userJwt") as string;
  const db     = getUserClient(jwt);
  const id     = c.req.param("id");

  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.data !== "object") {
    return c.json({ error: "Se requiere un objeto 'data'" }, 400);
  }

  // Verificar que el formulario pertenece al usuario
  const { data: form } = await db
    .from("tax_forms")
    .select("id, status")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!form) return c.json({ error: "Formulario no encontrado" }, 404);
  if (form.status === "submitted") {
    return c.json({ error: "No se puede editar un formulario ya enviado" }, 409);
  }

  // Upsert de los datos (solo hay un registro por formulario)
  const { data: formData, error: dataError } = await db
    .from("tax_form_data")
    .upsert(
      { form_id: id, data: body.data, version: (body.version ?? 1) },
      { onConflict: "form_id" },
    )
    .select()
    .single();

  if (dataError) return c.json({ error: dataError.message }, 400);

  // Actualizar status a 'draft' si estaba en otro estado editable
  if (form.status !== "draft") {
    await db
      .from("tax_forms")
      .update({ status: "draft" })
      .eq("id", id);
  }

  return c.json({ form_data: formData });
});
