-- ============================================================
-- F22 SaaS — Setup completo (schema + seed + RLS)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================
-- =============================================================================
-- SaaS Tributario — Schema PostgreSQL/Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================================================

-- ---------------------------------------------------------------------------
-- profiles — extiende auth.users (creado automáticamente por trigger)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT        NOT NULL,
  full_name     TEXT,
  avatar_url    TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- membership_plans — catálogo de planes (no cambia por usuario)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.membership_plans (
  id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code                  TEXT        NOT NULL UNIQUE,  -- nucleo | estructura | arquitectura | expansion
  name                  TEXT        NOT NULL,
  max_ruts              INTEGER,                      -- NULL = ilimitado
  price_monthly_usd     NUMERIC(10,2) NOT NULL,
  price_quarterly_usd   NUMERIC(10,2) NOT NULL,
  price_annual_usd      NUMERIC(10,2) NOT NULL,
  min_commitment_months INTEGER     NOT NULL DEFAULT 1,
  is_active             BOOLEAN     NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- subscriptions — suscripción activa del usuario
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id       UUID        NOT NULL REFERENCES public.membership_plans(id),
  billing_cycle TEXT        NOT NULL CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  status        TEXT        NOT NULL DEFAULT 'active'
                            CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  started_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at       TIMESTAMPTZ,
  cancelled_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Un usuario solo puede tener una suscripción activa a la vez
CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_user_active_idx
  ON public.subscriptions (user_id)
  WHERE status = 'active';

-- ---------------------------------------------------------------------------
-- taxpayer_entities — RUTs gestionados por el usuario
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.taxpayer_entities (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rut           TEXT        NOT NULL,
  name          TEXT        NOT NULL,
  tax_regime    TEXT,                                 -- 14D8 | M14A | 14D1 | etc.
  entity_type   INTEGER     CHECK (entity_type BETWEEN 1 AND 8),
  is_active     BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, rut)
);

CREATE INDEX IF NOT EXISTS taxpayer_entities_user_idx ON public.taxpayer_entities (user_id);

-- ---------------------------------------------------------------------------
-- form_types — catálogo genérico de formularios (F22, F29, F50, etc.)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.form_types (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT    NOT NULL UNIQUE,               -- F22 | F29 | F50
  name        TEXT    NOT NULL,
  description TEXT,
  tax_year    INTEGER,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- tax_forms — instancias de formularios (un F22 por RUT por año)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tax_forms (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  taxpayer_id     UUID        NOT NULL REFERENCES public.taxpayer_entities(id) ON DELETE CASCADE,
  form_type_id    UUID        NOT NULL REFERENCES public.form_types(id),
  title           TEXT,
  status          TEXT        NOT NULL DEFAULT 'draft'
                              CHECK (status IN ('draft', 'validated', 'submitted', 'accepted', 'rejected')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tax_forms_user_idx       ON public.tax_forms (user_id);
CREATE INDEX IF NOT EXISTS tax_forms_taxpayer_idx   ON public.tax_forms (taxpayer_id);
CREATE INDEX IF NOT EXISTS tax_forms_status_idx     ON public.tax_forms (status);

-- ---------------------------------------------------------------------------
-- tax_form_data — datos JSONB del formulario (versioned)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tax_form_data (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id    UUID        NOT NULL REFERENCES public.tax_forms(id) ON DELETE CASCADE,
  data       JSONB       NOT NULL DEFAULT '{}',
  version    INTEGER     NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Solo una versión activa por formulario (la última)
CREATE UNIQUE INDEX IF NOT EXISTS tax_form_data_form_idx ON public.tax_form_data (form_id);

-- ---------------------------------------------------------------------------
-- submissions — envíos al SII
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.submissions (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id       UUID        NOT NULL REFERENCES public.tax_forms(id) ON DELETE CASCADE,
  user_id       UUID        NOT NULL REFERENCES public.profiles(id),
  folio         TEXT,
  status        TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'accepted', 'rejected')),
  response_data JSONB,
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS submissions_form_idx ON public.submissions (form_id);
CREATE INDEX IF NOT EXISTS submissions_user_idx ON public.submissions (user_id);

-- ---------------------------------------------------------------------------
-- audit_logs — auditoría de acciones
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  action      TEXT        NOT NULL,       -- created | updated | deleted | viewed
  entity_type TEXT        NOT NULL,       -- tax_form | taxpayer | subscription | etc.
  entity_id   UUID,
  details     JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_logs_user_idx    ON public.audit_logs (user_id);
CREATE INDEX IF NOT EXISTS audit_logs_entity_idx  ON public.audit_logs (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS audit_logs_created_idx ON public.audit_logs (created_at DESC);

-- ---------------------------------------------------------------------------
-- Trigger: crear profile automáticamente al registrarse
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER set_updated_at_subscriptions
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER set_updated_at_taxpayer_entities
  BEFORE UPDATE ON public.taxpayer_entities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER set_updated_at_tax_forms
  BEFORE UPDATE ON public.tax_forms
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER set_updated_at_tax_form_data
  BEFORE UPDATE ON public.tax_form_data
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
-- =============================================================================
-- Seeds iniciales — ejecutar DESPUÉS de schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- membership_plans
-- ---------------------------------------------------------------------------
INSERT INTO public.membership_plans
  (code, name, max_ruts, price_monthly_usd, price_quarterly_usd, price_annual_usd, min_commitment_months)
VALUES
  ('nucleo',       'Núcleo',       1,    500.00,  1350.00,  4800.00, 3),
  ('estructura',   'Estructura',   3,   1200.00,  3240.00, 11520.00, 1),
  ('arquitectura', 'Arquitectura', 7,   2500.00,  6750.00, 24000.00, 1),
  ('expansion',    'Expansión',    NULL, 6000.00, 16200.00, 57600.00, 1)
ON CONFLICT (code) DO UPDATE SET
  name                  = EXCLUDED.name,
  max_ruts              = EXCLUDED.max_ruts,
  price_monthly_usd     = EXCLUDED.price_monthly_usd,
  price_quarterly_usd   = EXCLUDED.price_quarterly_usd,
  price_annual_usd      = EXCLUDED.price_annual_usd,
  min_commitment_months = EXCLUDED.min_commitment_months;

-- ---------------------------------------------------------------------------
-- form_types
-- ---------------------------------------------------------------------------
INSERT INTO public.form_types
  (code, name, description, tax_year, is_active)
VALUES
  ('F22', 'Formulario 22',
   'Declaración Anual de Impuestos a la Renta',
   2026, true),
  ('F29', 'Formulario 29',
   'Declaración Mensual y Pago Simultáneo de Impuestos (IVA)',
   NULL, false),   -- disponible en futura fase
  ('F50', 'Formulario 50',
   'Declaración Mensual y Pago Simultáneo de Impuestos Varios',
   NULL, false)
ON CONFLICT (code) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  tax_year    = EXCLUDED.tax_year,
  is_active   = EXCLUDED.is_active;
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
