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
