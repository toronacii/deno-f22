-- =============================================================================
-- Migración: Limpieza de columnas USD y tracking de fechas
-- Ejecutar en: Supabase Dashboard → SQL Editor
--
-- CAMBIOS:
--   DROP: columnas USD ya no usadas (precios en CLP/UF)
--   DROP: flow_plan_id de subscriptions (no se necesita post-creación)
--   DROP: onboarding_completed de profiles (reemplazado por portal check real)
--   RENAME: flow_events.processed_at → created_at (convención estándar)
--   ADD: updated_at a tablas que lo necesitan + triggers automáticos
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. membership_plans — DROP columnas USD + ADD updated_at
-- ---------------------------------------------------------------------------
ALTER TABLE public.membership_plans
  DROP COLUMN IF EXISTS price_monthly_usd,
  DROP COLUMN IF EXISTS price_quarterly_usd,
  DROP COLUMN IF EXISTS price_annual_usd,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE OR REPLACE TRIGGER set_updated_at_membership_plans
  BEFORE UPDATE ON public.membership_plans
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. plan_promotions — DROP discounted_price_usd + ADD updated_at
-- ---------------------------------------------------------------------------
ALTER TABLE public.plan_promotions
  DROP COLUMN IF EXISTS discounted_price_usd,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE OR REPLACE TRIGGER set_updated_at_plan_promotions
  BEFORE UPDATE ON public.plan_promotions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. subscriptions — DROP locked_price_usd + flow_plan_id
-- ---------------------------------------------------------------------------
ALTER TABLE public.subscriptions
  DROP COLUMN IF EXISTS locked_price_usd,
  DROP COLUMN IF EXISTS flow_plan_id;

-- ---------------------------------------------------------------------------
-- 4. flow_events — DROP usd_to_clp_rate + RENAME processed_at → created_at
-- ---------------------------------------------------------------------------
ALTER TABLE public.flow_events
  DROP COLUMN IF EXISTS usd_to_clp_rate;

-- Rename processed_at → created_at (convención estándar)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'flow_events'
      AND column_name  = 'processed_at'
  ) THEN
    ALTER TABLE public.flow_events RENAME COLUMN processed_at TO created_at;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 5. one_time_purchases — ADD updated_at
-- ---------------------------------------------------------------------------
ALTER TABLE public.one_time_purchases
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE OR REPLACE TRIGGER set_updated_at_one_time_purchases
  BEFORE UPDATE ON public.one_time_purchases
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 6. contact_intents — ADD updated_at
-- ---------------------------------------------------------------------------
ALTER TABLE public.contact_intents
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE OR REPLACE TRIGGER set_updated_at_contact_intents
  BEFORE UPDATE ON public.contact_intents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 7. form_types — ADD updated_at
-- ---------------------------------------------------------------------------
ALTER TABLE public.form_types
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE OR REPLACE TRIGGER set_updated_at_form_types
  BEFORE UPDATE ON public.form_types
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 8. profiles — DROP onboarding_completed (reemplazado por portal check)
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS onboarding_completed;
