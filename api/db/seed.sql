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
