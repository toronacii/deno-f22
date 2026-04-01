-- =============================================================================
-- Seeds iniciales — ejecutar DESPUÉS de schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- membership_plans
-- Prices in USD. CLP conversion happens at payment time via live exchange rate.
-- Annual price = monthly * 12 with ~17% discount applied.
-- All plans: min_commitment_months = 3 (first contract only).
-- ---------------------------------------------------------------------------
INSERT INTO public.membership_plans
  (code, name, max_ruts, price_monthly_usd, price_quarterly_usd, price_annual_usd, min_commitment_months)
VALUES
  ('f22digital', 'F22 Digital',   1,    119.00,   357.00,  1188.00, 3),
  ('genesis',    'Genesis',       1,    299.00,   897.00,  2988.00, 3),
  ('sinergy',    'Sinergy',       3,    560.00,  1680.00,  5604.00, 3),
  ('momentum',   'Momentum',      7,   2159.00,  6477.00, 21588.00, 3),
  ('horizon',    'Horizon',    NULL,   4199.00, 12597.00, 41988.00, 3)
ON CONFLICT (code) DO UPDATE SET
  name                  = EXCLUDED.name,
  max_ruts              = EXCLUDED.max_ruts,
  price_monthly_usd     = EXCLUDED.price_monthly_usd,
  price_quarterly_usd   = EXCLUDED.price_quarterly_usd,
  price_annual_usd      = EXCLUDED.price_annual_usd,
  min_commitment_months = EXCLUDED.min_commitment_months;

-- ---------------------------------------------------------------------------
-- plan_promotions
-- Sinergy: fixed $560 USD/month during April 2026 for new subscribers.
-- The locked price applies to every billing period of the contract.
-- ---------------------------------------------------------------------------
INSERT INTO public.plan_promotions
  (plan_id, name, billing_cycle, discounted_price_usd, valid_from, valid_until, new_subscribers_only)
SELECT
  id,
  'Promo Abril 2026 — Sinergy',
  NULL,      -- applies to all billing cycles
  560.00,    -- $560 USD/month locked for the full contract duration
  '2026-04-01',
  '2026-04-30',
  true
FROM public.membership_plans
WHERE code = 'sinergy'
ON CONFLICT DO NOTHING;

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
