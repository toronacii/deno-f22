-- =============================================================================
-- Row Level Security — ejecutar DESPUÉS de schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Habilitar RLS en todas las tablas
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxpayer_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_types        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_forms         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_form_data     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs        ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- profiles — cada usuario ve y edita solo su propio perfil
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "profiles: select own"  ON public.profiles;
DROP POLICY IF EXISTS "profiles: insert own"  ON public.profiles;
DROP POLICY IF EXISTS "profiles: update own"  ON public.profiles;

CREATE POLICY "profiles: select own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles: insert own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles: update own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- membership_plans — lectura pública (cualquier usuario autenticado)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "plans: select all" ON public.membership_plans;

CREATE POLICY "plans: select all" ON public.membership_plans
  FOR SELECT USING (true);

-- ---------------------------------------------------------------------------
-- subscriptions — solo el propio usuario
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "subscriptions: select own" ON public.subscriptions;
DROP POLICY IF EXISTS "subscriptions: insert own" ON public.subscriptions;
DROP POLICY IF EXISTS "subscriptions: update own" ON public.subscriptions;

CREATE POLICY "subscriptions: select own" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "subscriptions: insert own" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "subscriptions: update own" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- taxpayer_entities — solo el propio usuario
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "taxpayers: select own"  ON public.taxpayer_entities;
DROP POLICY IF EXISTS "taxpayers: insert own"  ON public.taxpayer_entities;
DROP POLICY IF EXISTS "taxpayers: update own"  ON public.taxpayer_entities;
DROP POLICY IF EXISTS "taxpayers: delete own"  ON public.taxpayer_entities;

CREATE POLICY "taxpayers: select own" ON public.taxpayer_entities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "taxpayers: insert own" ON public.taxpayer_entities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "taxpayers: update own" ON public.taxpayer_entities
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "taxpayers: delete own" ON public.taxpayer_entities
  FOR DELETE USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- form_types — lectura pública de los activos
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "form_types: select active" ON public.form_types;

CREATE POLICY "form_types: select active" ON public.form_types
  FOR SELECT USING (is_active = true);

-- ---------------------------------------------------------------------------
-- tax_forms — solo el propio usuario
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "tax_forms: select own"  ON public.tax_forms;
DROP POLICY IF EXISTS "tax_forms: insert own"  ON public.tax_forms;
DROP POLICY IF EXISTS "tax_forms: update own"  ON public.tax_forms;
DROP POLICY IF EXISTS "tax_forms: delete own"  ON public.tax_forms;

CREATE POLICY "tax_forms: select own" ON public.tax_forms
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "tax_forms: insert own" ON public.tax_forms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tax_forms: update own" ON public.tax_forms
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "tax_forms: delete own" ON public.tax_forms
  FOR DELETE USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- tax_form_data — acceso a través del formulario del propio usuario
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "tax_form_data: select own"  ON public.tax_form_data;
DROP POLICY IF EXISTS "tax_form_data: insert own"  ON public.tax_form_data;
DROP POLICY IF EXISTS "tax_form_data: update own"  ON public.tax_form_data;

CREATE POLICY "tax_form_data: select own" ON public.tax_form_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tax_forms f
      WHERE f.id = form_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "tax_form_data: insert own" ON public.tax_form_data
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tax_forms f
      WHERE f.id = form_id AND f.user_id = auth.uid()
    )
  );

CREATE POLICY "tax_form_data: update own" ON public.tax_form_data
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.tax_forms f
      WHERE f.id = form_id AND f.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- submissions — solo el propio usuario
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "submissions: select own"  ON public.submissions;
DROP POLICY IF EXISTS "submissions: insert own"  ON public.submissions;

CREATE POLICY "submissions: select own" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "submissions: insert own" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- audit_logs — solo lectura del propio usuario (escritura solo vía backend)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "audit_logs: select own" ON public.audit_logs;

CREATE POLICY "audit_logs: select own" ON public.audit_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Nota: INSERT a audit_logs solo se hace desde el backend con service_role key.
-- El frontend no puede escribir en audit_logs directamente.
