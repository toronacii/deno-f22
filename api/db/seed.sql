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
  -- Monthly = standalone rate. Annual total / 12 = annual monthly-equivalent (17% cheaper).
  -- e.g. F22 Digital: $119/mes standalone; $1,188/year → $99/mes equivalent.
  ('f22digital', 'F22 Digital',   1,    119.00,    357.00,  1188.00, 3),
  ('genesis',    'Genesis',       1,    299.00,    897.00,  2988.00, 3),
  -- Sinergy base: $759/mes standalone; $9,108/year → $759/mes equivalent.
  -- Promos (plan_promotions): monthly→$560, annual→$467/mes.
  ('sinergy',    'Sinergy',       3,    759.00,   2277.00,  9108.00, 3),
  ('momentum',   'Momentum',      7,   2159.00,   6477.00, 21588.00, 3),
  ('horizon',    'Horizon',    NULL,   4199.00,  12597.00, 41988.00, 3)
ON CONFLICT (code) DO UPDATE SET
  name                  = EXCLUDED.name,
  max_ruts              = EXCLUDED.max_ruts,
  price_monthly_usd     = EXCLUDED.price_monthly_usd,
  price_quarterly_usd   = EXCLUDED.price_quarterly_usd,
  price_annual_usd      = EXCLUDED.price_annual_usd,
  min_commitment_months = EXCLUDED.min_commitment_months;

-- ---------------------------------------------------------------------------
-- plan_promotions
-- Sinergy April 2026: base $759/mes → promo mensual $560, promo anual $467.
-- ---------------------------------------------------------------------------

-- Mensual: $759 → $560/mes
INSERT INTO public.plan_promotions
  (plan_id, name, billing_cycle, discounted_price_usd, valid_from, valid_until, new_subscribers_only)
SELECT
  id,
  'Promo Abril 2026 — Sinergy mensual',
  'monthly',
  560.00,
  '2026-04-01',
  '2026-04-30',
  true
FROM public.membership_plans
WHERE code = 'sinergy'
ON CONFLICT DO NOTHING;

-- Anual: $759 → $467/mes (= $5,604/año)
INSERT INTO public.plan_promotions
  (plan_id, name, billing_cycle, discounted_price_usd, valid_from, valid_until, new_subscribers_only)
SELECT
  id,
  'Promo Abril 2026 — Sinergy anual',
  'annual',
  467.00,
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
