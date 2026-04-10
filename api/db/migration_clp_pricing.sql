-- =============================================================================
-- Migración: Precios en CLP y UF
-- Agrega columnas CLP/UF a membership_plans y plan_promotions
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================================================

-- ---------------------------------------------------------------------------
-- membership_plans — agregar columnas CLP y UF
-- ---------------------------------------------------------------------------
ALTER TABLE public.membership_plans
  ADD COLUMN IF NOT EXISTS price_monthly_clp   INTEGER,
  ADD COLUMN IF NOT EXISTS price_annual_clp    INTEGER,       -- total anual = equiv_mensual * 12
  ADD COLUMN IF NOT EXISTS price_uf_monthly    NUMERIC(6,2),  -- equiv. UF del precio mensual
  ADD COLUMN IF NOT EXISTS price_uf_annual     NUMERIC(6,2),  -- equiv. UF mensual en ciclo anual
  ADD COLUMN IF NOT EXISTS is_one_time_payment BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS price_one_time_clp  INTEGER,       -- aplica solo si is_one_time_payment
  ADD COLUMN IF NOT EXISTS price_uf_one_time   NUMERIC(6,2);

-- ---------------------------------------------------------------------------
-- plan_promotions — agregar columnas CLP y UF para promos
-- ---------------------------------------------------------------------------
ALTER TABLE public.plan_promotions
  ADD COLUMN IF NOT EXISTS discounted_price_clp INTEGER,      -- precio promo por mes en CLP
  ADD COLUMN IF NOT EXISTS discounted_price_uf  NUMERIC(6,2); -- equiv. UF del precio promo

-- ---------------------------------------------------------------------------
-- Seed CLP: F22 Digital — pago único
-- ---------------------------------------------------------------------------
UPDATE public.membership_plans SET
  is_one_time_payment   = true,
  price_one_time_clp    = 9999,
  price_uf_one_time     = 0.26,
  min_commitment_months = 1
WHERE code = 'f22digital';

-- ---------------------------------------------------------------------------
-- Seed CLP: Genesis
-- Mensual: 279.000 CLP / 7 UF | Anual: 229.000 CLP/mes / 6 UF → total 2.748.000
-- ---------------------------------------------------------------------------
UPDATE public.membership_plans SET
  price_monthly_clp = 279000,
  price_annual_clp  = 2748000,
  price_uf_monthly  = 7.00,
  price_uf_annual   = 6.00
WHERE code = 'genesis';

-- ---------------------------------------------------------------------------
-- Seed CLP: Sinergy (precios base, sin promo)
-- Mensual base: 699.000 CLP / 18 UF | Anual base: 639.000 CLP/mes / 17 UF → total 7.668.000
-- Promo abril 2026: mensual → 499.000 / 13 UF; anual → 429.000 / 11 UF
-- ---------------------------------------------------------------------------
UPDATE public.membership_plans SET
  price_monthly_clp = 699000,
  price_annual_clp  = 7668000,
  price_uf_monthly  = 18.00,
  price_uf_annual   = 17.00
WHERE code = 'sinergy';

-- ---------------------------------------------------------------------------
-- Seed CLP: Momentum
-- Mensual: 1.999.000 CLP / 50 UF | Anual: 1.599.000 CLP/mes / 42 UF → total 19.188.000
-- ---------------------------------------------------------------------------
UPDATE public.membership_plans SET
  price_monthly_clp = 1999000,
  price_annual_clp  = 19188000,
  price_uf_monthly  = 50.00,
  price_uf_annual   = 42.00
WHERE code = 'momentum';

-- ---------------------------------------------------------------------------
-- Seed CLP: Horizon
-- Mensual: 3.799.000 CLP / 98 UF | Anual: 3.199.000 CLP/mes / 82 UF → total 38.388.000
-- ---------------------------------------------------------------------------
UPDATE public.membership_plans SET
  price_monthly_clp = 3799000,
  price_annual_clp  = 38388000,
  price_uf_monthly  = 98.00,
  price_uf_annual   = 82.00
WHERE code = 'horizon';

-- ---------------------------------------------------------------------------
-- Seed CLP: Promos Sinergy Abril 2026 — actualizar registros existentes
-- ---------------------------------------------------------------------------
UPDATE public.plan_promotions SET
  discounted_price_clp = 499000,
  discounted_price_uf  = 13.00
WHERE plan_id = (SELECT id FROM public.membership_plans WHERE code = 'sinergy')
  AND billing_cycle = 'monthly';

UPDATE public.plan_promotions SET
  discounted_price_clp = 429000,
  discounted_price_uf  = 11.00
WHERE plan_id = (SELECT id FROM public.membership_plans WHERE code = 'sinergy')
  AND billing_cycle = 'annual';

-- ---------------------------------------------------------------------------
-- subscriptions — agregar locked_price_clp (precio bloqueado en CLP)
-- ---------------------------------------------------------------------------
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS locked_price_clp INTEGER;

-- ---------------------------------------------------------------------------
-- one_time_purchases — pagos únicos (F22 Digital y futuros)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.one_time_purchases (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id        UUID        NOT NULL REFERENCES public.membership_plans(id),
  flow_order     TEXT,                    -- flowOrder devuelto por Flow
  commerce_order TEXT        UNIQUE,      -- nuestro ID de orden único
  status         TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'paid', 'rejected')),
  amount_clp     INTEGER     NOT NULL,
  paid_at        TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS one_time_purchases_user_idx  ON public.one_time_purchases (user_id);
CREATE INDEX IF NOT EXISTS one_time_purchases_order_idx ON public.one_time_purchases (flow_order);

-- RLS: usuario solo ve sus propias compras; backend con service_role puede escribir
ALTER TABLE public.one_time_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "one_time_purchases: select own" ON public.one_time_purchases;
CREATE POLICY "one_time_purchases: select own" ON public.one_time_purchases
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "one_time_purchases: insert service_role" ON public.one_time_purchases;
CREATE POLICY "one_time_purchases: insert service_role" ON public.one_time_purchases
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "one_time_purchases: update service_role" ON public.one_time_purchases;
CREATE POLICY "one_time_purchases: update service_role" ON public.one_time_purchases
  FOR UPDATE USING (auth.role() = 'service_role');
