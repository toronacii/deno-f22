-- =============================================================================
-- Seeds iniciales — ejecutar DESPUÉS de schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- membership_plans
-- USD: referencia interna / gateway Flow. CLP: precio mostrado al usuario.
-- UF: equivalente almacenado (1 UF ≈ 38.500 CLP aprox).
-- Ciclo anual: price_annual_clp = equiv_mensual * 12.
-- Membresías: min_commitment_months = 3 (primer contrato).
-- F22 Digital: pago único, min_commitment_months = 1.
-- ---------------------------------------------------------------------------
INSERT INTO public.membership_plans
  (code, name, max_ruts,
   price_monthly_usd, price_quarterly_usd, price_annual_usd,
   price_monthly_clp, price_annual_clp, price_uf_monthly, price_uf_annual,
   is_one_time_payment, price_one_time_clp, price_uf_one_time,
   min_commitment_months)
VALUES
  -- F22 Digital: pago único 9.999 CLP / 0,26 UF
  ('f22digital', 'F22 Digital',   1,   119.00,    357.00,  1188.00,
   NULL,     NULL,   NULL,  NULL, true,  9999, 0.26, 1),

  -- Genesis: mensual 279.000 CLP / 7 UF | anual 229.000 CLP/mes / 6 UF → total 2.748.000
  ('genesis',    'Genesis',       1,   299.00,    897.00,  2988.00,
   279000, 2748000,   7.00,  6.00, false, NULL, NULL, 3),

  -- Sinergy (base sin promo): mensual 699.000 CLP / 18 UF | anual 639.000/mes / 17 UF → 7.668.000
  -- Promo abril 2026: mensual → 499.000 / 13 UF; anual → 429.000 / 11 UF
  ('sinergy',    'Sinergy',       3,   759.00,   2277.00,  9108.00,
   699000, 7668000,  18.00, 17.00, false, NULL, NULL, 3),

  -- Momentum: mensual 1.999.000 CLP / 50 UF | anual 1.599.000/mes / 42 UF → 19.188.000
  ('momentum',   'Momentum',      7,  2159.00,   6477.00, 21588.00,
   1999000, 19188000, 50.00, 42.00, false, NULL, NULL, 3),

  -- Horizon: mensual 3.799.000 CLP / 98 UF | anual 3.199.000/mes / 82 UF → 38.388.000
  ('horizon',    'Horizon',    NULL,  4199.00,  12597.00, 41988.00,
   3799000, 38388000, 98.00, 82.00, false, NULL, NULL, 3)

ON CONFLICT (code) DO UPDATE SET
  name                  = EXCLUDED.name,
  max_ruts              = EXCLUDED.max_ruts,
  price_monthly_usd     = EXCLUDED.price_monthly_usd,
  price_quarterly_usd   = EXCLUDED.price_quarterly_usd,
  price_annual_usd      = EXCLUDED.price_annual_usd,
  price_monthly_clp     = EXCLUDED.price_monthly_clp,
  price_annual_clp      = EXCLUDED.price_annual_clp,
  price_uf_monthly      = EXCLUDED.price_uf_monthly,
  price_uf_annual       = EXCLUDED.price_uf_annual,
  is_one_time_payment   = EXCLUDED.is_one_time_payment,
  price_one_time_clp    = EXCLUDED.price_one_time_clp,
  price_uf_one_time     = EXCLUDED.price_uf_one_time,
  min_commitment_months = EXCLUDED.min_commitment_months;

-- ---------------------------------------------------------------------------
-- plan_promotions
-- Sinergy April 2026: base $759/mes → promo mensual $560, promo anual $467.
-- ---------------------------------------------------------------------------

-- Mensual: base 699.000 → promo 499.000 CLP / 13 UF
INSERT INTO public.plan_promotions
  (plan_id, name, billing_cycle,
   discounted_price_usd, discounted_price_clp, discounted_price_uf,
   valid_from, valid_until, new_subscribers_only)
SELECT
  id,
  'Promo Abril 2026 — Sinergy mensual',
  'monthly',
  560.00, 499000, 13.00,
  '2026-04-01',
  '2026-04-30',
  true
FROM public.membership_plans
WHERE code = 'sinergy'
ON CONFLICT DO NOTHING;

-- Anual: base 639.000/mes → promo 429.000 CLP/mes / 11 UF (total promo: 5.148.000)
INSERT INTO public.plan_promotions
  (plan_id, name, billing_cycle,
   discounted_price_usd, discounted_price_clp, discounted_price_uf,
   valid_from, valid_until, new_subscribers_only)
SELECT
  id,
  'Promo Abril 2026 — Sinergy anual',
  'annual',
  467.00, 429000, 11.00,
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
