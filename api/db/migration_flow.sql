-- =============================================================================
-- Migración: Integración Flow Payments
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================================================

-- ---------------------------------------------------------------------------
-- profiles — columnas de Flow (cliente + tarjeta registrada)
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS flow_customer_id  TEXT,
  ADD COLUMN IF NOT EXISTS flow_card_type    TEXT,   -- Visa | Mastercard | etc.
  ADD COLUMN IF NOT EXISTS flow_card_last4   TEXT;   -- últimos 4 dígitos

-- ---------------------------------------------------------------------------
-- plan_promotions — descuentos y promociones por plan
-- Created before subscriptions FK so the reference resolves
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.plan_promotions (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id              UUID        NOT NULL REFERENCES public.membership_plans(id) ON DELETE CASCADE,
  name                 TEXT        NOT NULL,
  -- Si billing_cycle es NULL, aplica a todos los ciclos
  billing_cycle        TEXT        CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  discounted_price_usd NUMERIC(10,2) NOT NULL,  -- precio final mensual con descuento
  valid_from           DATE        NOT NULL,
  valid_until          DATE        NOT NULL,
  new_subscribers_only BOOLEAN     NOT NULL DEFAULT true,
  is_active            BOOLEAN     NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_promo_dates CHECK (valid_until >= valid_from)
);

CREATE INDEX IF NOT EXISTS plan_promotions_plan_idx  ON public.plan_promotions (plan_id);
CREATE INDEX IF NOT EXISTS plan_promotions_dates_idx ON public.plan_promotions (valid_from, valid_until);

-- ---------------------------------------------------------------------------
-- subscriptions — Flow columns + minimum commitment
-- (after plan_promotions so the FK is resolvable)
-- ---------------------------------------------------------------------------
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS flow_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS flow_plan_id         TEXT,
  ADD COLUMN IF NOT EXISTS promotion_id         UUID REFERENCES public.plan_promotions(id),
  ADD COLUMN IF NOT EXISTS locked_price_usd     NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS earliest_cancel_at   TIMESTAMPTZ;

-- ---------------------------------------------------------------------------
-- flow_events — webhook audit log
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.flow_events (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type      TEXT        NOT NULL,  -- subscription_payment | card_registered | subscription_created | etc.
  flow_order      TEXT,                  -- flowOrder de Flow
  subscription_id UUID        REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  user_id         UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  status          INTEGER,               -- status del pago: 1=pagado, 2=rechazado, 3=pendiente
  amount_clp      INTEGER,               -- monto cobrado en CLP
  usd_to_clp_rate NUMERIC(10,4),         -- tipo de cambio usado en ese cobro
  raw_payload     JSONB,
  processed_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS flow_events_subscription_idx ON public.flow_events (subscription_id);
CREATE INDEX IF NOT EXISTS flow_events_user_idx         ON public.flow_events (user_id);
CREATE INDEX IF NOT EXISTS flow_events_type_idx         ON public.flow_events (event_type);

-- ---------------------------------------------------------------------------
-- RLS — plan_promotions (lectura pública para usuarios autenticados)
-- ---------------------------------------------------------------------------
ALTER TABLE public.plan_promotions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "promotions: select active" ON public.plan_promotions;
CREATE POLICY "promotions: select active" ON public.plan_promotions
  FOR SELECT USING (is_active = true);

-- ---------------------------------------------------------------------------
-- RLS — flow_events (solo backend con service_role puede escribir)
-- ---------------------------------------------------------------------------
ALTER TABLE public.flow_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "flow_events: select own" ON public.flow_events;
CREATE POLICY "flow_events: select own" ON public.flow_events
  FOR SELECT USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- RLS — subscriptions: agregar política de UPDATE para service_role
-- (Flow webhook actualiza subscriptions desde el backend)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "subscriptions: update own" ON public.subscriptions;

-- El usuario puede actualizar sus propias suscripciones Y el backend (service_role) siempre puede
CREATE POLICY "subscriptions: update own" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- ---------------------------------------------------------------------------
-- Seed: Promoción Abril 2026 — Sinergy a $560 USD/mes
-- ---------------------------------------------------------------------------
INSERT INTO public.plan_promotions
  (plan_id, name, billing_cycle, discounted_price_usd, valid_from, valid_until, new_subscribers_only)
SELECT
  id,
  'Promo Abril 2026 — Sinergy',
  NULL,          -- aplica a todos los ciclos de facturación
  560.00,        -- precio fijo: $560 USD/mes durante toda la contratación
  '2026-04-01',
  '2026-04-30',
  true           -- solo nuevos suscriptores
FROM public.membership_plans
WHERE code = 'sinergy'
ON CONFLICT DO NOTHING;
