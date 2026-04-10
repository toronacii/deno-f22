-- =============================================================================
-- reset_test_data.sql
--
-- Borra TODA la data de usuario/transacciones para pruebas limpias.
-- Conserva tablas de configuración: membership_plans, plan_promotions, form_types.
--
-- ⚠️  IRREVERSIBLE. Solo usar en desarrollo / sandbox.
--
-- Ejecutar en Supabase SQL Editor:
--   Pegar y correr este script completo.
-- =============================================================================

-- Desactivar triggers durante la limpieza
SET session_replication_role = replica;

-- ---------------------------------------------------------------------------
-- 1. Transacciones y eventos de pago
-- ---------------------------------------------------------------------------
TRUNCATE TABLE public.one_time_purchases  RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.flow_events         RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.contact_intents     RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------------
-- 2. Suscripciones
-- ---------------------------------------------------------------------------
TRUNCATE TABLE public.subscriptions       RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------------
-- 3. Formularios y declaraciones
-- ---------------------------------------------------------------------------
TRUNCATE TABLE public.tax_form_data       RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.submissions         RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.tax_forms           RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------------
-- 4. RUTs / contribuyentes
-- ---------------------------------------------------------------------------
TRUNCATE TABLE public.taxpayer_entities   RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------------
-- 5. Logs
-- ---------------------------------------------------------------------------
TRUNCATE TABLE public.audit_logs          RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------------
-- 6. Perfiles de usuario
-- ---------------------------------------------------------------------------
TRUNCATE TABLE public.profiles            RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------------
-- 7. Usuarios de Supabase Auth
--    (borra cuentas de email/password, sesiones, tokens)
-- ---------------------------------------------------------------------------
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.mfa_factors;
DELETE FROM auth.identities;
DELETE FROM auth.users;

-- Reactivar triggers
SET session_replication_role = DEFAULT;

-- ---------------------------------------------------------------------------
-- Verificación
-- ---------------------------------------------------------------------------
SELECT 'one_time_purchases' AS tabla, COUNT(*) AS filas FROM public.one_time_purchases
UNION ALL SELECT 'flow_events',       COUNT(*) FROM public.flow_events
UNION ALL SELECT 'contact_intents',   COUNT(*) FROM public.contact_intents
UNION ALL SELECT 'subscriptions',     COUNT(*) FROM public.subscriptions
UNION ALL SELECT 'tax_form_data',     COUNT(*) FROM public.tax_form_data
UNION ALL SELECT 'tax_forms',         COUNT(*) FROM public.tax_forms
UNION ALL SELECT 'taxpayer_entities', COUNT(*) FROM public.taxpayer_entities
UNION ALL SELECT 'profiles',          COUNT(*) FROM public.profiles
UNION ALL SELECT 'auth.users',        COUNT(*) FROM auth.users
UNION ALL SELECT '--- CONSERVADAS ---', 0
UNION ALL SELECT 'membership_plans',  COUNT(*) FROM public.membership_plans
UNION ALL SELECT 'plan_promotions',   COUNT(*) FROM public.plan_promotions
UNION ALL SELECT 'form_types',        COUNT(*) FROM public.form_types;
