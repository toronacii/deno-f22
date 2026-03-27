# SaaS Tributario Chileno — Documento de Arquitectura

**Proyecto**: Plataforma SaaS para gestión tributaria chilena (F22, F29, etc.)
**Fecha**: 2026-03-27
**Estado**: Diseño pre-implementación

---

## 1. Resumen Ejecutivo

### Qué es el sistema

Plataforma SaaS multi-tenant para contadores y empresas chilenas que necesitan preparar, validar y enviar formularios tributarios al SII. Envuelve el motor de reglas F22 AT2026 existente (`core/`) y lo expone como servicio escalable con autenticación, multitenancy por RUT, planes de membresía y auditoría.

### Objetivo

- Permitir a contadores gestionar múltiples RUTs desde un solo dashboard
- Validar formularios F22 en tiempo real usando el motor existente
- Escalar a F29, F50 y otros formularios en fases posteriores
- Monetizar mediante planes de suscripción mensual/trimestral/anual

### Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend API | Deno + Hono (mismo runtime que el motor) |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Base de datos | Supabase (PostgreSQL 15) |
| Motor de reglas | `core/` existente (Deno library) |
| Storage | Supabase Storage (PDFs, archivos XLSX) |
| Hosting API | Deno Deploy o Railway |
| Hosting Web | Vercel o Netlify |

---

## 2. Arquitectura General

### Diagrama de capas

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE                                   │
│                                                                  │
│   ┌──────────────────────────────────────────────────────┐      │
│   │              React + Vite + Tailwind                  │      │
│   │                                                       │      │
│   │  [Login/Reg]  [Onboarding]  [Dashboard]  [F22 Form]  │      │
│   └──────────────────────┬───────────────────────────────┘      │
└──────────────────────────┼──────────────────────────────────────┘
                           │ HTTPS / Bearer JWT
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                     SAAS API (Deno + Hono)                       │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐    │
│  │ middleware/ │  │   routes/   │  │     services/        │    │
│  │  auth.ts    │  │  auth.ts    │  │  subscription_svc    │    │
│  │  cors.ts    │  │  me.ts      │  │  taxpayer_svc        │    │
│  │  rate_limit │  │  dashboard  │  │  form_svc            │    │
│  └─────────────┘  │  plans.ts   │  └──────────────────────┘    │
│                   │  taxpayers  │                                │
│                   │  forms.ts   │  ┌──────────────────────┐    │
│                   └─────────────┘  │   Tax Engine (core/) │    │
│                                    │  Calculator          │    │
│                                    │  Validator           │    │
│                                    │  Optimizer           │    │
│                                    └──────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Service Role Key (nunca al frontend)
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      SUPABASE                                    │
│                                                                  │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │  Auth Service   │  │   PostgreSQL 15   │  │    Storage    │  │
│  │  (JWT tokens)   │  │   (con RLS)       │  │  (PDFs/XLSX)  │  │
│  └─────────────────┘  └──────────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Separación de responsabilidades

| Capa | Responsabilidad | NO hace |
|------|----------------|---------|
| Frontend | UI, UX, llamadas HTTP, estado local | Lógica de negocio, validación de límites |
| Backend API | Auth JWT, reglas de negocio, límites de plan, auditoría | Renderizado, lógica de presentación |
| Motor (core/) | Cálculo F22, validación de reglas tributarias | Auth, persistencia, multitenancy |
| Supabase | Persistencia, autenticación, RLS, storage | Lógica de negocio de planes |

---

## 3. Modelo de Datos Completo

### Entidades y relaciones (Diagrama ER textual)

```
auth.users (Supabase gestionado)
    │ 1
    │
    ▼ 1
profiles
    │ 1
    │
    ▼ 0..1
subscriptions ─────────── membership_plans
                                │ 1
                                │ (define max_ruts)
    
profiles
    │ 1
    │
    ▼ N
taxpayer_entities
    │ 1
    │
    ▼ N
tax_forms ──────────────── form_types
    │ 1                        (F22, F29...)
    │
    ├──▼ 1
    │  tax_form_data (JSONB blob)
    │
    └──▼ N
       submissions

profiles
    │ 1
    │
    ▼ N
audit_logs
```

### Descripción de tablas

**`profiles`** — Extiende auth.users. Datos del usuario: nombre, empresa, RUT personal, teléfono, plan UI preferences.

**`membership_plans`** — Catálogo estático de los 4 planes. Max_ruts = -1 para ilimitado.

**`subscriptions`** — Suscripción activa del usuario. Una por usuario. Incluye billing_cycle (monthly/quarterly/annual), fecha inicio, fecha próximo cobro, estado.

**`taxpayer_entities`** — RUTs tributarios que el usuario gestiona. Cada fila = un RUT. Contiene nombre_razon_social, rut (formato 12345678-9), tipo (persona_natural / empresa).

**`form_types`** — Catálogo de tipos de formulario. Genérico para soportar F22, F29, F50, etc. Incluye código, nombre, año tributario, versión del motor.

**`tax_forms`** — Instancia de un formulario para un taxpayer_entity específico. Incluye estado (borrador/listo/enviado), año tributario, referencia al form_type.

**`tax_form_data`** — Blob JSONB con los datos del formulario. Separado de tax_forms para evitar cargar datos pesados en listados.

**`submissions`** — Registro de cada envío al SII (o intento). Incluye timestamp, estado, respuesta del SII.

**`audit_logs`** — Registro inmutable de acciones del usuario: crear/editar/borrar RUTs, enviar formularios, cambiar plan.

---

## 4. SQL Completo

```sql
-- ============================================================
-- SCHEMA: SaaS Tributario Chileno
-- Base de datos: Supabase (PostgreSQL 15)
-- ============================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLA: profiles
-- Extiende auth.users de Supabase
-- ============================================================
CREATE TABLE public.profiles (
    id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email           TEXT NOT NULL,
    full_name       TEXT,
    company_name    TEXT,
    personal_rut    TEXT,                          -- RUT personal del contador (ej: 12345678-9)
    phone           TEXT,
    avatar_url      TEXT,
    onboarding_done BOOLEAN NOT NULL DEFAULT FALSE, -- FALSE = mostrar wizard de plan
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT profiles_personal_rut_format
        CHECK (personal_rut IS NULL OR personal_rut ~ '^[0-9]{7,8}-[0-9kK]$')
);

CREATE INDEX idx_profiles_email ON public.profiles(email);

-- ============================================================
-- TABLA: membership_plans
-- Catálogo estático de los 4 planes disponibles
-- ============================================================
CREATE TABLE public.membership_plans (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code                TEXT NOT NULL UNIQUE,       -- 'nucleo', 'estructura', 'arquitectura', 'expansion'
    name                TEXT NOT NULL,
    description         TEXT,
    max_ruts            INTEGER NOT NULL,           -- -1 = ilimitado
    price_monthly       NUMERIC(10, 2) NOT NULL,    -- USD
    price_quarterly     NUMERIC(10, 2) NOT NULL,    -- USD (3 meses)
    price_annual        NUMERIC(10, 2) NOT NULL,    -- USD (12 meses)
    min_billing_months  INTEGER NOT NULL DEFAULT 1, -- meses mínimos de contrato
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order          INTEGER NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT membership_plans_max_ruts_valid
        CHECK (max_ruts = -1 OR max_ruts > 0),
    CONSTRAINT membership_plans_prices_positive
        CHECK (price_monthly >= 0 AND price_quarterly >= 0 AND price_annual >= 0),
    CONSTRAINT membership_plans_min_billing_valid
        CHECK (min_billing_months IN (1, 3, 12))
);

-- ============================================================
-- TABLA: subscriptions
-- Suscripción activa del usuario (una por usuario)
-- ============================================================
CREATE TYPE public.subscription_status AS ENUM (
    'active',
    'past_due',
    'cancelled',
    'trialing',
    'pending'  -- pendiente de activación (recién seleccionó plan)
);

CREATE TYPE public.billing_cycle AS ENUM (
    'monthly',
    'quarterly',
    'annual'
);

CREATE TABLE public.subscriptions (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id             UUID NOT NULL REFERENCES public.membership_plans(id),
    status              public.subscription_status NOT NULL DEFAULT 'pending',
    billing_cycle       public.billing_cycle NOT NULL DEFAULT 'monthly',
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_end  TIMESTAMPTZ,
    cancelled_at        TIMESTAMPTZ,
    trial_ends_at       TIMESTAMPTZ,
    external_id         TEXT,                       -- ID en procesador de pagos (Stripe, etc.)
    metadata            JSONB NOT NULL DEFAULT '{}',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT subscriptions_one_per_user UNIQUE (user_id)
);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_plan_id ON public.subscriptions(plan_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);

-- ============================================================
-- TABLA: taxpayer_entities
-- RUTs tributarios gestionados por el usuario
-- ============================================================
CREATE TYPE public.entity_type AS ENUM (
    'persona_natural',
    'empresa',
    'sociedad_anonima',
    'sociedad_responsabilidad_limitada'
);

CREATE TABLE public.taxpayer_entities (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rut             TEXT NOT NULL,                  -- Formato: 12345678-9
    razon_social    TEXT NOT NULL,
    entity_type     public.entity_type NOT NULL DEFAULT 'empresa',
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT taxpayer_entities_rut_format
        CHECK (rut ~ '^[0-9]{7,8}-[0-9kK]$'),
    CONSTRAINT taxpayer_entities_unique_rut_per_user
        UNIQUE (user_id, rut)
);

CREATE INDEX idx_taxpayer_entities_user_id ON public.taxpayer_entities(user_id);
CREATE INDEX idx_taxpayer_entities_rut ON public.taxpayer_entities(rut);

-- ============================================================
-- TABLA: form_types
-- Catálogo genérico de tipos de formulario
-- ============================================================
CREATE TABLE public.form_types (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code            TEXT NOT NULL,                  -- 'F22', 'F29', 'F50'
    name            TEXT NOT NULL,                  -- 'Declaración de Renta AT2026'
    tax_year        INTEGER NOT NULL,               -- 2026
    engine_version  TEXT NOT NULL DEFAULT '1.0.0',  -- versión del motor de reglas
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    description     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT form_types_unique_code_year UNIQUE (code, tax_year),
    CONSTRAINT form_types_tax_year_valid CHECK (tax_year BETWEEN 2000 AND 2100)
);

CREATE INDEX idx_form_types_code ON public.form_types(code);

-- ============================================================
-- TABLA: tax_forms
-- Instancias de formularios por usuario/RUT
-- ============================================================
CREATE TYPE public.form_status AS ENUM (
    'draft',        -- borrador, datos incompletos
    'in_review',    -- datos completos, pendiente validación manual
    'ready',        -- validado, listo para enviar
    'submitted',    -- enviado al SII
    'accepted',     -- aceptado por el SII
    'rejected'      -- rechazado por el SII
);

CREATE TABLE public.tax_forms (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    taxpayer_id         UUID NOT NULL REFERENCES public.taxpayer_entities(id) ON DELETE RESTRICT,
    form_type_id        UUID NOT NULL REFERENCES public.form_types(id),
    status              public.form_status NOT NULL DEFAULT 'draft',
    tax_year            INTEGER NOT NULL,
    folio               TEXT,                       -- folio SII si fue enviado
    validation_errors   JSONB NOT NULL DEFAULT '[]',
    last_calculated_at  TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT tax_forms_unique_per_taxpayer_year
        UNIQUE (taxpayer_id, form_type_id, tax_year),
    CONSTRAINT tax_forms_tax_year_valid
        CHECK (tax_year BETWEEN 2000 AND 2100)
);

CREATE INDEX idx_tax_forms_user_id ON public.tax_forms(user_id);
CREATE INDEX idx_tax_forms_taxpayer_id ON public.tax_forms(taxpayer_id);
CREATE INDEX idx_tax_forms_status ON public.tax_forms(status);
CREATE INDEX idx_tax_forms_tax_year ON public.tax_forms(tax_year);

-- ============================================================
-- TABLA: tax_form_data
-- Blob JSONB con los campos del formulario (separado para performance)
-- ============================================================
CREATE TABLE public.tax_form_data (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id     UUID NOT NULL REFERENCES public.tax_forms(id) ON DELETE CASCADE,
    data        JSONB NOT NULL DEFAULT '{}',        -- Map<field_code, value>
    version     INTEGER NOT NULL DEFAULT 1,         -- para control de versiones optimista
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT tax_form_data_one_per_form UNIQUE (form_id)
);

CREATE INDEX idx_tax_form_data_form_id ON public.tax_form_data(form_id);

-- ============================================================
-- TABLA: submissions
-- Registro de envíos al SII
-- ============================================================
CREATE TYPE public.submission_status AS ENUM (
    'pending',
    'sent',
    'accepted',
    'rejected',
    'error'
);

CREATE TABLE public.submissions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id         UUID NOT NULL REFERENCES public.tax_forms(id) ON DELETE RESTRICT,
    user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    status          public.submission_status NOT NULL DEFAULT 'pending',
    submitted_at    TIMESTAMPTZ,
    response_code   TEXT,                           -- código de respuesta SII
    response_body   JSONB,                          -- respuesta completa SII
    folio           TEXT,                           -- folio asignado por SII
    error_message   TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_submissions_form_id ON public.submissions(form_id);
CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);

-- ============================================================
-- TABLA: audit_logs
-- Registro inmutable de acciones del usuario
-- ============================================================
CREATE TYPE public.audit_action AS ENUM (
    'profile_updated',
    'plan_selected',
    'plan_changed',
    'subscription_cancelled',
    'taxpayer_created',
    'taxpayer_updated',
    'taxpayer_deleted',
    'form_created',
    'form_updated',
    'form_data_saved',
    'form_submitted',
    'form_deleted'
);

CREATE TABLE public.audit_logs (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    action      public.audit_action NOT NULL,
    entity_type TEXT,                               -- 'taxpayer', 'form', 'subscription'
    entity_id   UUID,                               -- ID del objeto afectado
    metadata    JSONB NOT NULL DEFAULT '{}',        -- datos adicionales del evento
    ip_address  INET,
    user_agent  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- NO updated_at: audit_logs es inmutable
);

CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_entity_id ON public.audit_logs(entity_id) WHERE entity_id IS NOT NULL;

-- ============================================================
-- TRIGGERS: updated_at automático
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_taxpayer_entities_updated_at
    BEFORE UPDATE ON public.taxpayer_entities
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_tax_forms_updated_at
    BEFORE UPDATE ON public.tax_forms
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_tax_form_data_updated_at
    BEFORE UPDATE ON public.tax_form_data
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_submissions_updated_at
    BEFORE UPDATE ON public.submissions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- TRIGGER: Auto-crear profile cuando se registra un usuario
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 5. Seeds Iniciales

```sql
-- ============================================================
-- SEED: membership_plans
-- Precios en USD
-- ============================================================

INSERT INTO public.membership_plans
    (code, name, description, max_ruts, price_monthly, price_quarterly, price_annual, min_billing_months, sort_order)
VALUES
(
    'nucleo',
    'Núcleo',
    'Para contadores independientes. Gestiona 1 RUT con todas las funcionalidades.',
    1,
    500.00,
    1350.00,   -- 3 * 450 (10% descuento)
    4800.00,   -- 12 * 400 (20% descuento)
    3,         -- mínimo 3 meses
    1
),
(
    'estructura',
    'Estructura',
    'Para estudios contables pequeños. Hasta 3 RUTs simultáneos.',
    3,
    1200.00,
    3240.00,   -- 3 * 1080 (10% descuento)
    11520.00,  -- 12 * 960 (20% descuento)
    3,
    2
),
(
    'arquitectura',
    'Arquitectura',
    'Para empresas contables medianas. Hasta 7 RUTs simultáneos.',
    7,
    2500.00,
    6750.00,   -- 3 * 2250 (10% descuento)
    24000.00,  -- 12 * 2000 (20% descuento)
    3,
    3
),
(
    'expansion',
    'Expansión',
    'Para grandes estudios tributarios. RUTs ilimitados y soporte prioritario.',
    -1,        -- -1 = ilimitado
    6000.00,
    16200.00,  -- 3 * 5400 (10% descuento)
    57600.00,  -- 12 * 4800 (20% descuento)
    3,
    4
);

-- ============================================================
-- SEED: form_types
-- F22 y F29 para demostrar arquitectura genérica
-- ============================================================

INSERT INTO public.form_types
    (code, name, tax_year, engine_version, description)
VALUES
(
    'F22',
    'Declaración de Renta AT2026',
    2026,
    '1.0.0',
    'Formulario 22 para la Operación Renta AT2026. Incluye motor de 609 reglas con 80.5% de tasa de parseo.'
),
(
    'F29',
    'Declaración Mensual de IVA',
    2026,
    '1.0.0',
    'Formulario 29 para declaración y pago mensual de IVA. Motor de reglas en desarrollo.'
);
```

---

## 6. Políticas RLS (Row Level Security)

```sql
-- ============================================================
-- Habilitar RLS en todas las tablas
-- ============================================================
ALTER TABLE public.profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxpayer_entities    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_types           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_forms            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_form_data        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs           ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- profiles: usuario solo ve/edita su propio perfil
-- ============================================================
CREATE POLICY "profiles_select_own"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- INSERT lo maneja el trigger handle_new_user con SECURITY DEFINER
-- No permitir INSERT directo desde el cliente
CREATE POLICY "profiles_no_insert"
    ON public.profiles FOR INSERT
    WITH CHECK (FALSE);

-- ============================================================
-- membership_plans: lectura pública (catálogo de precios)
-- ============================================================
CREATE POLICY "plans_public_read"
    ON public.membership_plans FOR SELECT
    USING (TRUE);

-- Solo service_role puede modificar planes (no políticas para INSERT/UPDATE/DELETE)

-- ============================================================
-- subscriptions: usuario solo ve su suscripción
-- ============================================================
CREATE POLICY "subscriptions_select_own"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id);

-- INSERT/UPDATE solo desde service_role (backend con service_role key)
-- No políticas de INSERT/UPDATE para anon/authenticated

-- ============================================================
-- taxpayer_entities: usuario solo ve sus RUTs
-- ============================================================
CREATE POLICY "taxpayers_select_own"
    ON public.taxpayer_entities FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "taxpayers_insert_own"
    ON public.taxpayer_entities FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "taxpayers_update_own"
    ON public.taxpayer_entities FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "taxpayers_delete_own"
    ON public.taxpayer_entities FOR DELETE
    USING (auth.uid() = user_id);

-- NOTA: La validación de límite de RUTs NO se hace via RLS.
-- Se hace en el backend (subscription_service.ts) antes del INSERT.

-- ============================================================
-- form_types: lectura pública (catálogo de formularios)
-- ============================================================
CREATE POLICY "form_types_public_read"
    ON public.form_types FOR SELECT
    USING (TRUE);

-- ============================================================
-- tax_forms: usuario solo ve sus formularios
-- ============================================================
CREATE POLICY "tax_forms_select_own"
    ON public.tax_forms FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "tax_forms_insert_own"
    ON public.tax_forms FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tax_forms_update_own"
    ON public.tax_forms FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tax_forms_delete_own"
    ON public.tax_forms FOR DELETE
    USING (auth.uid() = user_id AND status = 'draft');  -- solo se puede borrar borradores

-- ============================================================
-- tax_form_data: acceso via form_id (usuario dueño del form)
-- ============================================================
CREATE POLICY "tax_form_data_select_own"
    ON public.tax_form_data FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.tax_forms tf
            WHERE tf.id = tax_form_data.form_id
            AND tf.user_id = auth.uid()
        )
    );

CREATE POLICY "tax_form_data_insert_own"
    ON public.tax_form_data FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.tax_forms tf
            WHERE tf.id = tax_form_data.form_id
            AND tf.user_id = auth.uid()
        )
    );

CREATE POLICY "tax_form_data_update_own"
    ON public.tax_form_data FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.tax_forms tf
            WHERE tf.id = tax_form_data.form_id
            AND tf.user_id = auth.uid()
        )
    );

-- ============================================================
-- submissions: usuario solo ve sus envíos
-- ============================================================
CREATE POLICY "submissions_select_own"
    ON public.submissions FOR SELECT
    USING (auth.uid() = user_id);

-- INSERT solo desde service_role (el backend gestiona el envío)

-- ============================================================
-- audit_logs: usuario solo ve sus propios logs (solo lectura)
-- ============================================================
CREATE POLICY "audit_logs_select_own"
    ON public.audit_logs FOR SELECT
    USING (auth.uid() = user_id);

-- INSERT solo desde service_role (nunca directamente desde el frontend)
```

---

## 7. Estructura de Carpetas Backend Deno

```
saas-api/
├── deno.json                          ← tasks: dev, test, check
├── deno.lock
├── main.ts                            ← Entry point Hono, registra rutas y middleware
├── middleware/
│   ├── auth.ts                        ← Valida Bearer JWT Supabase, extrae user_id
│   ├── cors.ts                        ← CORS dinámico desde ALLOWED_ORIGIN env
│   └── rate_limit.ts                  ← Rate limiting in-memory (Deno KV en prod)
├── routes/
│   ├── auth.ts                        ← POST /auth/register, POST /auth/select-plan
│   ├── me.ts                          ← GET /me (perfil + suscripción)
│   ├── dashboard.ts                   ← GET /dashboard (resumen completo)
│   ├── plans.ts                       ← GET /plans (catálogo público)
│   ├── subscriptions.ts               ← GET /subscriptions/current
│   ├── taxpayers.ts                   ← GET /taxpayers, POST /taxpayers
│   └── forms.ts                       ← GET /forms, POST /forms, GET/PUT /forms/:id/data
├── services/
│   ├── subscription_service.ts        ← canAddTaxpayer(), getCurrentPlan()
│   ├── taxpayer_service.ts            ← listTaxpayers(), createTaxpayer()
│   └── form_service.ts                ← createForm(), saveFormData(), calculateForm()
├── db/
│   └── supabase_client.ts             ← createClient con service_role (acceso total)
├── types/
│   └── api_types.ts                   ← DTOs de request/response TypeScript
└── tests/
    ├── auth.test.ts
    ├── taxpayers.test.ts
    └── forms.test.ts
```

**`deno.json` (configuración):**

```json
{
  "tasks": {
    "dev": "deno run --allow-net --allow-env --watch main.ts",
    "test": "deno test --allow-net --allow-env tests/",
    "check": "deno check main.ts"
  },
  "imports": {
    "hono": "npm:hono@^4.6.0",
    "@supabase/supabase-js": "npm:@supabase/supabase-js@^2.45.0"
  }
}
```

---

## 8. Código Base

### `db/supabase_client.ts`

```typescript
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// IMPORTANTE: Usar service_role key SOLO en backend.
// Nunca exponer al frontend. La service_role bypasea RLS.
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !key) {
    throw new Error(
      "Missing required env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  _client = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _client;
}

// Para validar JWTs del cliente (usa anon key, respeta RLS)
let _anonClient: SupabaseClient | null = null;

export function getSupabaseAnonClient(): SupabaseClient {
  if (_anonClient) return _anonClient;

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    throw new Error(
      "Missing required env vars: SUPABASE_URL, SUPABASE_ANON_KEY"
    );
  }

  _anonClient = createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _anonClient;
}
```

### `middleware/auth.ts`

```typescript
import { Context, Next } from "hono";
import { getSupabaseAnonClient } from "../db/supabase_client.ts";

export type AuthUser = {
  id: string;
  email: string;
};

declare module "hono" {
  interface ContextVariableMap {
    user: AuthUser;
  }
}

export async function authMiddleware(c: Context, next: Next): Promise<Response | void> {
  const authorization = c.req.header("Authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized", message: "Missing Bearer token" }, 401);
  }

  const token = authorization.slice(7);
  const supabase = getSupabaseAnonClient();

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return c.json({ error: "Unauthorized", message: "Invalid or expired token" }, 401);
  }

  c.set("user", { id: user.id, email: user.email ?? "" });
  await next();
}
```

### `routes/auth.ts`

```typescript
import { Hono } from "hono";
import { getSupabaseClient } from "../db/supabase_client.ts";
import { authMiddleware } from "../middleware/auth.ts";

const auth = new Hono();

// POST /auth/register
// Supabase Auth maneja el registro. Este endpoint es para
// completar el onboarding DESPUÉS del registro de Supabase.
// El trigger handle_new_user ya crea el profile automáticamente.
// Este endpoint confirma que el profile existe y retorna el estado.
auth.post("/register", authMiddleware, async (c) => {
  const user = c.get("user");
  const db = getSupabaseClient();

  const { data: profile, error } = await db
    .from("profiles")
    .select("id, email, full_name, onboarding_done")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    return c.json({ error: "Profile not found" }, 404);
  }

  return c.json({
    user_id: profile.id,
    email: profile.email,
    onboarding_done: profile.onboarding_done,
    message: profile.onboarding_done
      ? "Profile ready"
      : "Complete onboarding: select a plan",
  }, 200);
});

// POST /auth/select-plan
// Body: { plan_code: string, billing_cycle: 'monthly' | 'quarterly' | 'annual' }
auth.post("/select-plan", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{ plan_code: string; billing_cycle: string }>();

  if (!body.plan_code || !body.billing_cycle) {
    return c.json({ error: "plan_code and billing_cycle are required" }, 400);
  }

  const validCycles = ["monthly", "quarterly", "annual"];
  if (!validCycles.includes(body.billing_cycle)) {
    return c.json({ error: "billing_cycle must be monthly, quarterly, or annual" }, 400);
  }

  const db = getSupabaseClient();

  // Obtener el plan
  const { data: plan, error: planError } = await db
    .from("membership_plans")
    .select("id, code, name, max_ruts, min_billing_months")
    .eq("code", body.plan_code)
    .eq("is_active", true)
    .single();

  if (planError || !plan) {
    return c.json({ error: "Plan not found or inactive" }, 404);
  }

  // Validar min_billing_months vs billing_cycle
  const cycleMonths = { monthly: 1, quarterly: 3, annual: 12 };
  const selectedMonths = cycleMonths[body.billing_cycle as keyof typeof cycleMonths];

  if (selectedMonths < plan.min_billing_months) {
    return c.json({
      error: `Plan '${plan.code}' requires minimum ${plan.min_billing_months} months billing`,
    }, 400);
  }

  // Calcular period_end
  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + selectedMonths);

  // Upsert suscripción
  const { data: subscription, error: subError } = await db
    .from("subscriptions")
    .upsert({
      user_id: user.id,
      plan_id: plan.id,
      status: "active",
      billing_cycle: body.billing_cycle,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
    }, { onConflict: "user_id" })
    .select()
    .single();

  if (subError || !subscription) {
    console.error("Subscription upsert error:", subError);
    return c.json({ error: "Failed to create subscription" }, 500);
  }

  // Marcar onboarding como completado
  await db
    .from("profiles")
    .update({ onboarding_done: true })
    .eq("id", user.id);

  // Registrar en audit_log
  await db.from("audit_logs").insert({
    user_id: user.id,
    action: "plan_selected",
    entity_type: "subscription",
    entity_id: subscription.id,
    metadata: { plan_code: plan.code, billing_cycle: body.billing_cycle },
  });

  return c.json({
    subscription_id: subscription.id,
    plan: { code: plan.code, name: plan.name, max_ruts: plan.max_ruts },
    billing_cycle: body.billing_cycle,
    current_period_end: periodEnd.toISOString(),
    message: "Subscription activated",
  }, 201);
});

export default auth;
```

### `routes/dashboard.ts`

```typescript
import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getSupabaseClient } from "../db/supabase_client.ts";

const dashboard = new Hono();

// GET /dashboard
// Retorna resumen completo: plan, uso de RUTs, formularios recientes
dashboard.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const db = getSupabaseClient();

  // Ejecutar consultas en paralelo para performance
  const [profileResult, subscriptionResult, taxpayersResult, recentFormsResult] =
    await Promise.all([
      // Perfil
      db
        .from("profiles")
        .select("id, full_name, email, company_name, personal_rut")
        .eq("id", user.id)
        .single(),

      // Suscripción + plan
      db
        .from("subscriptions")
        .select(`
          id,
          status,
          billing_cycle,
          current_period_end,
          membership_plans (
            code,
            name,
            max_ruts,
            price_monthly,
            price_quarterly,
            price_annual
          )
        `)
        .eq("user_id", user.id)
        .single(),

      // RUTs activos (count)
      db
        .from("taxpayer_entities")
        .select("id, rut, razon_social, entity_type, created_at")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false }),

      // Formularios recientes (últimos 5)
      db
        .from("tax_forms")
        .select(`
          id,
          status,
          tax_year,
          updated_at,
          taxpayer_entities (rut, razon_social),
          form_types (code, name)
        `)
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(5),
    ]);

  const profile = profileResult.data;
  const subscription = subscriptionResult.data;
  const taxpayers = taxpayersResult.data ?? [];
  const recentForms = recentFormsResult.data ?? [];

  const plan = subscription?.membership_plans as Record<string, unknown> | undefined;
  const maxRuts = (plan?.max_ruts as number) ?? 0;
  const usedRuts = taxpayers.length;

  return c.json({
    profile: {
      id: profile?.id,
      full_name: profile?.full_name,
      email: profile?.email,
      company_name: profile?.company_name,
    },
    subscription: subscription
      ? {
          id: subscription.id,
          status: subscription.status,
          billing_cycle: subscription.billing_cycle,
          current_period_end: subscription.current_period_end,
          plan: plan,
        }
      : null,
    usage: {
      ruts_used: usedRuts,
      ruts_max: maxRuts,         // -1 = ilimitado
      ruts_available: maxRuts === -1 ? -1 : Math.max(0, maxRuts - usedRuts),
      can_add_rut: maxRuts === -1 || usedRuts < maxRuts,
    },
    taxpayers: taxpayers.slice(0, 3),  // preview de los primeros 3
    recent_forms: recentForms,
  });
});

export default dashboard;
```

### `routes/taxpayers.ts`

```typescript
import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.ts";
import { getSupabaseClient } from "../db/supabase_client.ts";
import { canAddTaxpayer } from "../services/subscription_service.ts";

const taxpayers = new Hono();

// GET /taxpayers
taxpayers.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const db = getSupabaseClient();

  const { data, error } = await db
    .from("taxpayer_entities")
    .select("id, rut, razon_social, entity_type, is_active, notes, created_at, updated_at")
    .eq("user_id", user.id)
    .order("razon_social", { ascending: true });

  if (error) {
    console.error("Error fetching taxpayers:", error);
    return c.json({ error: "Failed to fetch taxpayers" }, 500);
  }

  return c.json({ taxpayers: data ?? [], total: (data ?? []).length });
});

// POST /taxpayers
// Body: { rut: string, razon_social: string, entity_type?: string, notes?: string }
taxpayers.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{
    rut: string;
    razon_social: string;
    entity_type?: string;
    notes?: string;
  }>();

  // Validaciones básicas
  if (!body.rut || !body.razon_social) {
    return c.json({ error: "rut and razon_social are required" }, 400);
  }

  // Validar formato de RUT
  const rutRegex = /^[0-9]{7,8}-[0-9kK]$/;
  if (!rutRegex.test(body.rut)) {
    return c.json({
      error: "Invalid RUT format. Expected: 12345678-9 or 1234567-K",
    }, 400);
  }

  // VALIDACIÓN DE LÍMITE — siempre en backend, nunca confiar en el frontend
  const { canAdd, reason, currentCount, maxAllowed } = await canAddTaxpayer(user.id);

  if (!canAdd) {
    return c.json({
      error: "Plan limit reached",
      message: reason,
      current_count: currentCount,
      max_allowed: maxAllowed,
      upgrade_url: "/plans",
    }, 403);
  }

  const db = getSupabaseClient();

  const { data: taxpayer, error } = await db
    .from("taxpayer_entities")
    .insert({
      user_id: user.id,
      rut: body.rut,
      razon_social: body.razon_social.trim(),
      entity_type: body.entity_type ?? "empresa",
      notes: body.notes ?? null,
    })
    .select()
    .single();

  if (error) {
    // Manejar duplicado (unique constraint user_id + rut)
    if (error.code === "23505") {
      return c.json({ error: "RUT already exists in your account" }, 409);
    }
    console.error("Error creating taxpayer:", error);
    return c.json({ error: "Failed to create taxpayer" }, 500);
  }

  // Registrar en audit_log
  await db.from("audit_logs").insert({
    user_id: user.id,
    action: "taxpayer_created",
    entity_type: "taxpayer",
    entity_id: taxpayer.id,
    metadata: { rut: body.rut, razon_social: body.razon_social },
    ip_address: c.req.header("x-forwarded-for") ?? null,
  });

  return c.json({ taxpayer }, 201);
});

// DELETE /taxpayers/:id
taxpayers.delete("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const taxpayerId = c.req.param("id");
  const db = getSupabaseClient();

  // Verificar que pertenece al usuario (RLS también lo valida pero doble check)
  const { data: existing } = await db
    .from("taxpayer_entities")
    .select("id, rut, razon_social")
    .eq("id", taxpayerId)
    .eq("user_id", user.id)
    .single();

  if (!existing) {
    return c.json({ error: "Taxpayer not found" }, 404);
  }

  // Soft delete (marcar como inactivo)
  const { error } = await db
    .from("taxpayer_entities")
    .update({ is_active: false })
    .eq("id", taxpayerId)
    .eq("user_id", user.id);

  if (error) {
    return c.json({ error: "Failed to delete taxpayer" }, 500);
  }

  await db.from("audit_logs").insert({
    user_id: user.id,
    action: "taxpayer_deleted",
    entity_type: "taxpayer",
    entity_id: taxpayerId,
    metadata: { rut: existing.rut },
  });

  return c.json({ message: "Taxpayer deactivated" }, 200);
});

export default taxpayers;
```

### `services/subscription_service.ts`

```typescript
import { getSupabaseClient } from "../db/supabase_client.ts";

export type CanAddResult = {
  canAdd: boolean;
  reason: string;
  currentCount: number;
  maxAllowed: number;  // -1 = ilimitado
};

// Verifica si el usuario puede agregar más RUTs según su plan.
// Esta función es la fuente de verdad — siempre consulta la DB.
export async function canAddTaxpayer(userId: string): Promise<CanAddResult> {
  const db = getSupabaseClient();

  // Obtener suscripción activa + límite del plan
  const { data: subscription, error: subError } = await db
    .from("subscriptions")
    .select(`
      status,
      membership_plans (
        max_ruts,
        code
      )
    `)
    .eq("user_id", userId)
    .single();

  if (subError || !subscription) {
    return {
      canAdd: false,
      reason: "No active subscription found. Please select a plan.",
      currentCount: 0,
      maxAllowed: 0,
    };
  }

  if (subscription.status !== "active" && subscription.status !== "trialing") {
    return {
      canAdd: false,
      reason: `Subscription is ${subscription.status}. Please renew your plan.`,
      currentCount: 0,
      maxAllowed: 0,
    };
  }

  const plan = subscription.membership_plans as { max_ruts: number; code: string } | null;

  if (!plan) {
    return {
      canAdd: false,
      reason: "Plan information not found.",
      currentCount: 0,
      maxAllowed: 0,
    };
  }

  const maxRuts = plan.max_ruts;

  // Ilimitado
  if (maxRuts === -1) {
    const { count } = await db
      .from("taxpayer_entities")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_active", true);

    return {
      canAdd: true,
      reason: "Unlimited plan",
      currentCount: count ?? 0,
      maxAllowed: -1,
    };
  }

  // Contar RUTs activos actuales
  const { count, error: countError } = await db
    .from("taxpayer_entities")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_active", true);

  if (countError) {
    return {
      canAdd: false,
      reason: "Could not verify current RUT count.",
      currentCount: 0,
      maxAllowed: maxRuts,
    };
  }

  const currentCount = count ?? 0;

  if (currentCount >= maxRuts) {
    return {
      canAdd: false,
      reason: `Your plan '${plan.code}' allows a maximum of ${maxRuts} RUT(s). You currently have ${currentCount}. Please upgrade your plan.`,
      currentCount,
      maxAllowed: maxRuts,
    };
  }

  return {
    canAdd: true,
    reason: "Within plan limits",
    currentCount,
    maxAllowed: maxRuts,
  };
}

// Obtener el plan actual del usuario con todos sus detalles
export async function getCurrentPlan(userId: string) {
  const db = getSupabaseClient();

  const { data, error } = await db
    .from("subscriptions")
    .select(`
      id,
      status,
      billing_cycle,
      current_period_start,
      current_period_end,
      membership_plans (
        code,
        name,
        max_ruts,
        price_monthly,
        price_quarterly,
        price_annual,
        description
      )
    `)
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  return data;
}
```

### `main.ts`

```typescript
import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors.ts";
import { rateLimitMiddleware } from "./middleware/rate_limit.ts";
import authRoutes from "./routes/auth.ts";
import meRoutes from "./routes/me.ts";
import dashboardRoutes from "./routes/dashboard.ts";
import plansRoutes from "./routes/plans.ts";
import subscriptionsRoutes from "./routes/subscriptions.ts";
import taxpayersRoutes from "./routes/taxpayers.ts";
import formsRoutes from "./routes/forms.ts";

const app = new Hono();

// Middleware global
app.use("*", corsMiddleware);
app.use("/auth/*", rateLimitMiddleware);  // Rate limit solo en auth

// Rutas
app.route("/auth", authRoutes);
app.route("/me", meRoutes);
app.route("/dashboard", dashboardRoutes);
app.route("/plans", plansRoutes);
app.route("/subscriptions", subscriptionsRoutes);
app.route("/taxpayers", taxpayersRoutes);
app.route("/forms", formsRoutes);

// Health check
app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// 404 handler
app.notFound((c) => c.json({ error: "Not found" }, 404));

// Error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = parseInt(Deno.env.get("PORT") ?? "8001");
console.log(`SaaS API running on http://localhost:${port}`);

Deno.serve({ port }, app.fetch);
```

---

## 9. Flujo de Autenticación

### Flujo completo en texto

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGISTRO (Email/Password)                     │
│                                                                  │
│  1. Usuario llena form en React                                  │
│  2. React → supabase.auth.signUp(email, password)               │
│  3. Supabase Auth crea registro en auth.users                    │
│  4. TRIGGER handle_new_user → INSERT INTO profiles               │
│  5. Supabase envía email de confirmación                         │
│  6. Usuario confirma email → auth.users.email_confirmed = true   │
│  7. React recibe session con JWT                                 │
│  8. React → POST /auth/register (con Bearer JWT)                │
│  9. Backend verifica JWT, retorna { onboarding_done: false }     │
│ 10. React redirige a /onboarding (selección de plan)             │
│ 11. Usuario selecciona plan → POST /auth/select-plan             │
│ 12. Backend crea suscripción, marca onboarding_done = true       │
│ 13. React redirige a /dashboard                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    LOGIN (Email/Password)                        │
│                                                                  │
│  1. Usuario llena form en React                                  │
│  2. React → supabase.auth.signInWithPassword(email, password)   │
│  3. Supabase Auth valida credenciales                            │
│  4. Retorna { session: { access_token: "JWT...", ... } }         │
│  5. React almacena JWT en memory (no localStorage por seguridad) │
│  6. React → GET /me (con Bearer JWT)                            │
│  7. Backend valida JWT, retorna perfil + estado onboarding       │
│  8a. Si onboarding_done = false → redirige a /onboarding         │
│  8b. Si onboarding_done = true → redirige a /dashboard           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    LOGIN (Google OAuth)                          │
│                                                                  │
│  1. Usuario hace click en "Continuar con Google"                 │
│  2. React → supabase.auth.signInWithOAuth({ provider: "google" })│
│  3. Redirect a Google OAuth                                      │
│  4. Google autentica → redirect de vuelta a callback URL         │
│  5. Supabase Auth procesa callback, crea/actualiza auth.users    │
│  6. Si usuario nuevo: TRIGGER handle_new_user crea profile       │
│     (full_name y avatar_url vienen de Google metadata)           │
│  7. Supabase redirige a /auth/callback con session               │
│  8. React procesa callback → igual que login email paso 6-8b     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    USUARIO SIN PLAN                              │
│                                                                  │
│  Cualquier ruta protegida → GET /me → onboarding_done = false   │
│                           → React redirige a /onboarding        │
│                                                                  │
│  El backend también verifica: si algún endpoint requiere         │
│  suscripción activa y no existe → 403 con upgrade_url           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Endpoints Completos

### `POST /auth/register`

| Campo | Valor |
|-------|-------|
| Auth | Requerida (Bearer JWT) |
| Body | ninguno |
| Descripción | Verifica que el profile fue creado por el trigger y retorna estado de onboarding |

**Response 200:**
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "onboarding_done": false,
  "message": "Complete onboarding: select a plan"
}
```

**Errores:** `401 Unauthorized`, `404 Profile not found`

---

### `POST /auth/select-plan`

| Campo | Valor |
|-------|-------|
| Auth | Requerida (Bearer JWT) |
| Body | `{ "plan_code": "nucleo", "billing_cycle": "monthly" }` |

**Response 201:**
```json
{
  "subscription_id": "uuid",
  "plan": { "code": "nucleo", "name": "Núcleo", "max_ruts": 1 },
  "billing_cycle": "monthly",
  "current_period_end": "2026-04-27T00:00:00Z",
  "message": "Subscription activated"
}
```

**Errores:** `400 Invalid billing_cycle`, `400 Min billing months not met`, `404 Plan not found`, `401 Unauthorized`

---

### `GET /me`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |
| Body | ninguno |

**Response 200:**
```json
{
  "profile": {
    "id": "uuid",
    "full_name": "Juan Pérez",
    "email": "juan@example.com",
    "company_name": "Estudio Pérez",
    "personal_rut": "12345678-9",
    "onboarding_done": true
  },
  "subscription": {
    "status": "active",
    "plan": { "code": "estructura", "name": "Estructura", "max_ruts": 3 },
    "current_period_end": "2026-06-27T00:00:00Z"
  }
}
```

---

### `GET /dashboard`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |
| Body | ninguno |

**Response 200:**
```json
{
  "profile": { "id": "uuid", "full_name": "...", "email": "..." },
  "subscription": {
    "status": "active",
    "billing_cycle": "quarterly",
    "current_period_end": "2026-06-27T00:00:00Z",
    "plan": { "code": "estructura", "max_ruts": 3, "price_monthly": 1200 }
  },
  "usage": {
    "ruts_used": 2,
    "ruts_max": 3,
    "ruts_available": 1,
    "can_add_rut": true
  },
  "taxpayers": [
    { "id": "uuid", "rut": "76123456-7", "razon_social": "Empresa A SpA" }
  ],
  "recent_forms": [
    {
      "id": "uuid",
      "status": "draft",
      "tax_year": 2026,
      "updated_at": "2026-03-20T10:00:00Z",
      "taxpayer_entities": { "rut": "76123456-7", "razon_social": "Empresa A SpA" },
      "form_types": { "code": "F22", "name": "Declaración de Renta AT2026" }
    }
  ]
}
```

---

### `GET /plans`

| Campo | Valor |
|-------|-------|
| Auth | No requerida (pública) |

**Response 200:**
```json
{
  "plans": [
    {
      "id": "uuid",
      "code": "nucleo",
      "name": "Núcleo",
      "max_ruts": 1,
      "price_monthly": 500,
      "price_quarterly": 1350,
      "price_annual": 4800,
      "min_billing_months": 3
    }
  ]
}
```

---

### `GET /subscriptions/current`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |

**Response 200:** Objeto subscription completo con plan anidado.
**Errores:** `404` si no tiene suscripción.

---

### `GET /taxpayers`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |

**Response 200:**
```json
{
  "taxpayers": [
    {
      "id": "uuid",
      "rut": "76123456-7",
      "razon_social": "Empresa ABC SpA",
      "entity_type": "empresa",
      "is_active": true,
      "created_at": "2026-03-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

---

### `POST /taxpayers`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |
| Body | `{ "rut": "76123456-7", "razon_social": "Empresa ABC SpA", "entity_type": "empresa" }` |

**Response 201:** Objeto taxpayer creado.
**Errores:** `400 Invalid RUT format`, `403 Plan limit reached` (con `upgrade_url`), `409 RUT already exists`

---

### `GET /forms`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |
| Query params | `taxpayer_id` (opcional), `tax_year` (opcional), `status` (opcional) |

**Response 200:**
```json
{
  "forms": [
    {
      "id": "uuid",
      "status": "draft",
      "tax_year": 2026,
      "taxpayer": { "rut": "76123456-7", "razon_social": "Empresa ABC SpA" },
      "form_type": { "code": "F22", "name": "Declaración de Renta AT2026" },
      "updated_at": "2026-03-20T10:00:00Z"
    }
  ]
}
```

---

### `POST /forms`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |
| Body | `{ "taxpayer_id": "uuid", "form_type_id": "uuid", "tax_year": 2026 }` |

**Response 201:** Objeto form creado (con id para usar en `/forms/:id/data`).
**Errores:** `400 Missing fields`, `409 Form already exists for this taxpayer/year`, `404 Taxpayer not found`

---

### `GET /forms/:id`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |

**Response 200:** Objeto form completo con validation_errors y last_calculated_at.

---

### `PUT /forms/:id/data`

| Campo | Valor |
|-------|-------|
| Auth | Requerida |
| Body | `{ "data": { "1": 1500000, "2": 200000 }, "version": 1 }` |
| Descripción | Guarda datos y ejecuta cálculo/validación en tiempo real |

**Response 200:**
```json
{
  "form_id": "uuid",
  "version": 2,
  "data": { "1": 1500000, "2": 200000 },
  "calculation": {
    "computed_fields": { "30": 1700000 },
    "validation_errors": [],
    "status": "valid"
  }
}
```

**Errores:** `409 Version conflict (optimistic locking)`, `404 Form not found`, `403 Form is submitted, cannot edit`

---

## 11. Dashboard UI — Estructura Propuesta

### Layout principal

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (240px fijo)          MAIN CONTENT                 │
│  ┌──────────────────┐         ┌──────────────────────────┐  │
│  │ Logo / Brand     │         │  Header: "Dashboard"     │  │
│  │──────────────────│         │  sub: "Bienvenido, Juan" │  │
│  │ [Dashboard]      │         └──────────────────────────┘  │
│  │ [Mis RUTs]       │                                        │
│  │ [Formularios]    │         ┌──────────────────────────┐  │
│  │ [Historial]      │         │  TARJETA: Plan Actual    │  │
│  │──────────────────│         │  "Estructura — 2/3 RUTs" │  │
│  │ [Mi Plan]        │         │  Progreso visual         │  │
│  │ [Configuración]  │         │  Btn: "Administrar plan" │  │
│  │──────────────────│         └──────────────────────────┘  │
│  │ [Cerrar Sesión]  │                                        │
│  └──────────────────┘         ┌──────────────────────────┐  │
│                               │  GRID 2 cols:            │  │
│                               │  [RUTs Activos: 2/3]    │  │
│                               │  [F22 en borrador: 1]   │  │
│                               └──────────────────────────┘  │
│                                                             │
│                               ┌──────────────────────────┐  │
│                               │  Accesos Rápidos         │  │
│                               │  [+ Nuevo RUT]           │  │
│                               │  [+ Nuevo F22]           │  │
│                               └──────────────────────────┘  │
│                                                             │
│                               ┌──────────────────────────┐  │
│                               │  Formularios Recientes   │  │
│                               │  ─────────────────────  │  │
│                               │  F22 · Empresa A SpA     │  │
│                               │  Borrador · 20 Mar 2026  │  │
│                               │  ─────────────────────  │  │
│                               │  [Ver todos →]           │  │
│                               └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Datos por sección y su fuente en el API

| Sección UI | Datos mostrados | Endpoint |
|-----------|----------------|---------|
| Header bienvenida | `profile.full_name` | `GET /dashboard` |
| Tarjeta plan | `subscription.plan.name`, `usage.ruts_used`, `usage.ruts_max` | `GET /dashboard` |
| Barra progreso RUTs | `usage.ruts_used / usage.ruts_max` | `GET /dashboard` |
| Métricas rápidas | count de formularios por status | `GET /dashboard` (o `GET /forms` con query) |
| Acceso rápido "+ Nuevo RUT" | `usage.can_add_rut` (deshabilitar si false) | `GET /dashboard` |
| Formularios recientes | `recent_forms` array (últimos 5) | `GET /dashboard` |
| Lista completa de RUTs | array completo con paginación | `GET /taxpayers` |

---

## 12. Fases de Implementación

### Fase 0: Setup de infraestructura
**Duración estimada: 1 día**
- Crear proyecto Supabase (free tier para dev)
- Ejecutar schema SQL completo (tablas, tipos, triggers, índices)
- Ejecutar seeds (planes y tipos de formulario)
- Ejecutar políticas RLS
- Crear repositorio `saas-api/` con `deno.json`
- Configurar `.env` con variables de entorno
- Verificar trigger `handle_new_user` con test manual

### Fase 1: Autenticación
**Duración estimada: 2 días**
- Implementar `db/supabase_client.ts`
- Implementar `middleware/auth.ts`
- Implementar `routes/auth.ts` (register + select-plan)
- Configurar Google OAuth en Supabase Dashboard
- Implementar frontend: páginas Login y Register con Supabase SDK
- Implementar callback URL para OAuth
- Tests: registro, login email, login Google, token inválido

### Fase 2: Onboarding
**Duración estimada: 2 días**
- Implementar `routes/plans.ts` (GET /plans público)
- Implementar UI de selección de plan (pricing table)
- Integrar POST /auth/select-plan
- Guardia de ruta: si `onboarding_done = false` → /onboarding
- Tests: selección de plan, validación de billing_cycle mínimo

### Fase 3: Dashboard
**Duración estimada: 2 días**
- Implementar `routes/dashboard.ts`
- Implementar `routes/me.ts`
- Implementar `routes/subscriptions.ts`
- Implementar UI del dashboard con todas las secciones
- Tests: dashboard completo con datos reales

### Fase 4: Gestión de RUTs
**Duración estimada: 2 días**
- Implementar `services/subscription_service.ts` (canAddTaxpayer)
- Implementar `services/taxpayer_service.ts`
- Implementar `routes/taxpayers.ts` (GET, POST, DELETE)
- Implementar UI: lista de RUTs, modal de creación
- Deshabilitar botón "+ Nuevo RUT" si límite alcanzado
- Tests: límite de plan, RUT duplicado, formato inválido

### Fase 5: Gestión de Formularios
**Duración estimada: 3 días**
- Implementar `services/form_service.ts`
- Implementar `routes/forms.ts` (GET, POST, GET/:id, PUT/:id/data)
- Crear F22 vinculado a un RUT
- Cargar/guardar borrador con datos JSONB
- Listar formularios con filtros
- UI: lista de formularios, vista de detalle básica

### Fase 6: Integración con Motor F22
**Duración estimada: 3 días**
- Importar `core/` existente en el saas-api como dependencia local
- En `PUT /forms/:id/data`: tras guardar datos → ejecutar `Calculator.calculate()`
- Retornar `calculation_result` con errores de validación
- Actualizar `tax_forms.validation_errors` y `last_calculated_at`
- UI: mostrar errores de validación en tiempo real en el formulario
- Actualizar `tax_forms.status` según resultado (draft/ready)
- Tests de integración end-to-end: crear F22, cargar datos, ver resultado del motor

---

## 13. Consideraciones de Seguridad

### Service Role Key
- La `SUPABASE_SERVICE_ROLE_KEY` NUNCA se expone al frontend.
- Solo existe en variables de entorno del servidor backend.
- Toda operación sensible (upsert suscripciones, audit_logs) pasa por el backend con service_role.
- El frontend solo usa la `SUPABASE_ANON_KEY` para operaciones de auth directo con Supabase.

### Validación de JWT
- El `middleware/auth.ts` valida el Bearer token en CADA request al backend.
- Se usa `supabase.auth.getUser(token)` que verifica la firma y expiración.
- JWTs de Supabase expiran en 1 hora. El frontend debe manejar refresh con `onAuthStateChange`.

### Rate Limiting
- El middleware `rate_limit.ts` aplica límite estricto en `/auth/*`:
  - POST /auth/register: máximo 5 requests por IP por hora
  - POST /auth/select-plan: máximo 10 requests por usuario por hora
- En producción, usar Deno KV para estado distribuido si hay múltiples instancias.

### Validación de Límite de RUTs
- La validación de `canAddTaxpayer()` SIEMPRE se ejecuta en el backend.
- El frontend puede ocultar/deshabilitar botones basado en `usage.can_add_rut` (del /dashboard) pero esto es solo UX.
- Un usuario que manipule el frontend no puede bypassear el límite porque el POST /taxpayers siempre verifica.

### Auditoría
- Todas las acciones críticas se registran en `audit_logs`:
  - Creación/eliminación de RUTs
  - Selección/cambio de plan
  - Envíos de formularios
- Los logs son inmutables (no se permite UPDATE ni DELETE sobre audit_logs via RLS).
- Solo el propio usuario puede leer sus logs.

### CORS
- El backend solo acepta requests del dominio del frontend (variable `ALLOWED_ORIGIN`).
- En desarrollo: `http://localhost:5173` (Vite dev server).
- En producción: dominio real del frontend.

### Validación de inputs
- Formato de RUT validado con regex tanto en frontend (UX) como en backend (seguridad) como en DB (CHECK constraint).
- billing_cycle validado contra enum en backend antes de insertar.
- Todos los body JSON se parsean con tipos TypeScript explícitos.

---

## 14. Variables de Entorno

### Backend (`saas-api/.env`)

```dotenv
# ============================================================
# Supabase
# ============================================================

# URL del proyecto Supabase
# Ejemplo: https://xyzcompany.supabase.co
SUPABASE_URL=https://YOUR_PROJECT.supabase.co

# Clave anon (pública, para validar JWTs del cliente)
# Se encuentra en: Supabase Dashboard > Settings > API > anon public
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# SECRETO: Service role key (bypasea RLS, solo en backend)
# Se encuentra en: Supabase Dashboard > Settings > API > service_role secret
# NUNCA exponer al frontend ni commitear al repositorio
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================================
# Servidor
# ============================================================

# Puerto donde corre la API (default: 8001)
PORT=8001

# Origen permitido para CORS
# En desarrollo: http://localhost:5173
# En producción: https://tu-dominio.com
ALLOWED_ORIGIN=http://localhost:5173

# Entorno: development | staging | production
NODE_ENV=development

# ============================================================
# Motor F22 (opcional — si se separa en servicio propio)
# ============================================================

# Ruta al archivo XLSX de reglas F22
# Solo necesario si saas-api está separado del core/
F22_RULES_XLSX_PATH=../core/data/5_CSW_Set_1.0_AT2026.xlsx
F22_PARAMS_JSON_PATH=../core/data/params_AT2026.json

# ============================================================
# Rate Limiting (producción)
# ============================================================

# URL de Deno KV para rate limiting distribuido
# En desarrollo: omitir (usa in-memory)
# DENO_KV_URL=https://api.deno.com/databases/YOUR_DB_ID/connect
```

### Frontend (`web/.env`)

```dotenv
# URL del proyecto Supabase (mismo que backend)
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co

# Clave anon (pública — OK para el frontend)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# URL del backend SaaS API
VITE_SAAS_API_URL=http://localhost:8001

# URL de callback para OAuth de Google
# Debe estar registrada en Supabase Dashboard > Auth > URL Configuration
VITE_OAUTH_REDIRECT_URL=http://localhost:5173/auth/callback
```

### Variables de Supabase Dashboard a configurar

| Variable | Dónde configurar | Valor ejemplo |
|----------|----------------|---------------|
| Site URL | Auth > URL Configuration | `https://tu-dominio.com` |
| Redirect URLs | Auth > URL Configuration | `https://tu-dominio.com/auth/callback` |
| Google Client ID | Auth > Providers > Google | Desde Google Cloud Console |
| Google Client Secret | Auth > Providers > Google | Desde Google Cloud Console |
| SMTP (emails) | Auth > SMTP Settings | Resend, SendGrid, etc. |

---

*Fin del documento de arquitectura.*
*Versión: 1.0.0 — 2026-03-27*
```

---

No tengo acceso a herramientas de escritura de archivos en este modo de planificación. Para guardar el documento, ejecuta el siguiente comando en tu terminal:

```bash
pbpaste > /Users/toronacii/Documents/code/side-projects/SII/DSL4/SAAS_ARCHITECTURE.md