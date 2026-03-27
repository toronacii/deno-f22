# SaaS Tributario Chileno — Documento de Arquitectura

**Proyecto**: Plataforma SaaS para gestión tributaria chilena
**Fecha**: 2026-03-27
**Estado**: En implementación (Fase 3 — Frontend)

---

## 1. Recomendación Ejecutiva

El diseño correcto para este producto no es "una aplicación de formularios tributarios". Es una **plataforma de gestión tributaria por contribuyente**, donde el formulario es solo una de las operaciones que ocurren dentro del espacio de trabajo de un RUT.

Esta distinción no es cosmética. Afecta la arquitectura de navegación, el modelo de datos, los estados del sistema, la jerarquía de permisos y cómo el producto crece con nuevos formularios en el futuro.

### Principio rector

> La identidad fiscal es del RUT, no del usuario. El usuario es el operador. El RUT es el sujeto tributario.

Esto se traduce en:

- El usuario gestiona RUTs, no formula F22s directamente.
- El workspace es del RUT. El dashboard es del usuario.
- Un F22 existe *dentro* de un RUT, para un año tributario. No flota libre.
- Al agregar F29, F50 u otros formularios, simplemente aparecen en el workspace del RUT como nuevos módulos. Sin reestructurar nada.

### Por qué no acoplar el login al F22

Si el login manda directo al F22, el producto queda acoplado a un solo formulario. Cada nuevo formulario requiere rediseñar la navegación. Además, en un escenario multi-RUT, el usuario no sabe "¿el F22 de quién?". El contexto del contribuyente debe establecerse *antes* de entrar a cualquier formulario.

---

## 2. Flujo Ideal del Usuario

### 2.1 Registro (< 60 segundos)

```
Landing
  └─ CTA "Crear cuenta"
       └─ Email + Password (o Google OAuth)
            └─ Verificación de email (si aplica)
                 └─ → Onboarding
```

**Datos recolectados**: solo email y contraseña (o token OAuth).
**No se pide**: RUT, nombre de empresa, plan. Eso viene después.
**Por qué**: El registro debe ser lo más rápido posible. La fricción mínima maximiza conversión. Los datos tributarios son sensibles y el usuario debe sentirse "dentro" antes de entregarlos.

---

### 2.2 Onboarding Inicial (una sola vez)

```
Onboarding Step 1: "Bienvenido. ¿Cómo te llamas?"
  └─ Nombre completo (o nombre del estudio)
       └─ Onboarding Step 2: "Elige tu plan"
            └─ Selector de planes (Núcleo / Estructura / Arquitectura / Expansión)
                 └─ Confirmación
                      └─ → Dashboard Global (con estado vacío)
```

**Datos recolectados**: nombre para personalizar la UI, y plan seleccionado.
**No se pide aún**: RUTs.
**Estado del sistema después**: `profiles.onboarding_completed = true`, suscripción activa.

El onboarding termina en el **dashboard global vacío**, con un call-to-action prominente para agregar el primer RUT. Este es el estado cero del producto. Es normal y no debe verse como un error.

---

### 2.3 Alta del Primer RUT

El usuario llega al dashboard vacío y ve:

```
┌──────────────────────────────────────────────────────┐
│  No tienes contribuyentes registrados aún.            │
│                                                       │
│  [+ Agregar primer RUT]                              │
└──────────────────────────────────────────────────────┘
```

Al hacer click:

```
Modal "Agregar contribuyente"
  ├─ RUT (con validación de dígito verificador en tiempo real)
  ├─ Nombre o razón social
  ├─ Tipo (Persona Natural / Empresa)
  └─ Régimen tributario (opcional, puede completarse después)
       └─ → Guardar
            └─ → Workspace del RUT recién creado
```

El sistema valida:
1. Formato del RUT (12345678-9)
2. Dígito verificador correcto
3. RUT no duplicado para este usuario
4. Que el usuario no ha excedido el límite de RUTs de su plan

---

### 2.4 Selección de RUT Activo

A partir del segundo RUT, el usuario tiene que elegir contexto cada vez que entra a la app o quiere cambiar de contribuyente.

**Caso 1 — Plan Núcleo (1 RUT)**:
No hay selección. El sistema entra directamente al workspace del único RUT activo.

**Caso 2 — Plan multi-RUT (2+ RUTs)**:
El dashboard global muestra las tarjetas de todos los RUTs activos. El usuario hace click en uno para entrar a su workspace.

---

### 2.5 Entrada al Workspace del RUT

Al seleccionar un RUT, el sistema entra al workspace contextual:

```
Contexto activo: [RUT seleccionado] visible en el topbar
Sidebar cambia a navegación nivel-RUT:
  ├─ Resumen del contribuyente
  ├─ Formulario 22 AT2026
  ├─ (futuro) Formulario 29
  └─ (futuro) Historial de declaraciones
```

El cambio de contexto es explícito y visible. El usuario nunca pierde la referencia de qué contribuyente está gestionando.

---

### 2.6 Creación del Primer Formulario

Dentro del workspace del RUT:

```
Workspace vacío para el RUT:
  └─ "No hay formularios para este contribuyente."
       └─ [+ Nuevo formulario]
            └─ Selector de tipo de formulario
                 └─ F22 AT2026 → Año tributario 2026
                      └─ → Editor del formulario (RecuadroTable)
```

Si el formulario para ese RUT y año tributario ya existe, se abre el borrador existente en lugar de crear uno nuevo.

---

## 3. Arquitectura de Navegación

### 3.1 Los tres niveles

```
NIVEL 1 — CUENTA
  Ruta: /dashboard
  Componentes: DashboardGlobal, RUTSelector, ProfileSettings, BillingSettings
  ¿Qué vive aquí?
    - Resumen consolidado (todos los RUTs)
    - Lista y gestión de contribuyentes registrados
    - Estado de la suscripción y plan
    - Configuración del perfil del usuario
    - Historial de auditoría global

NIVEL 2 — RUT (Workspace)
  Ruta: /rut/:rutId
  Componentes: TaxpayerWorkspace, FormList, TaxpayerProfile
  ¿Qué vive aquí?
    - Datos del contribuyente (RUT, nombre, régimen, tipo)
    - Lista de formularios del contribuyente
    - Estado de cada formulario (borrador / validado / enviado)
    - Historial de declaraciones del contribuyente

NIVEL 3 — FORMULARIO
  Ruta: /rut/:rutId/forms/:formId
  Componentes: RecuadroTable, ValidationPanel, OptimizationPanel
  ¿Qué vive aquí?
    - Editor del formulario (campos, secciones)
    - Validación en tiempo real (reglas CSW)
    - Optimización tributaria
    - Vista previa / exportación
```

### 3.2 Por qué esta separación

| Criterio | Nivel Cuenta | Nivel RUT | Nivel Formulario |
|---|---|---|---|
| Sujeto | Usuario | Contribuyente | Declaración |
| Temporalidad | Permanente | Permanente | Anual / periódico |
| Afectado por el plan | Sí (límite de RUTs) | No | No |
| Escala con nuevos formularios | No | Sí (nuevo ítem en sidebar) | Sí (nuevo editor) |
| Requiere contexto de RUT | No | Sí | Sí |

La llave de diseño es que el **Nivel 2 (RUT)** actúa como contenedor escalable. Cuando agreguemos F29 o F50, simplemente aparecen como nuevos ítems dentro del workspace del RUT. No hay que reestructurar navegación ni mover formularios.

---

## 4. Dashboard Global vs Workspace por RUT

### 4.1 Dashboard Global — Nivel Cuenta

Es la vista de gestión, no de trabajo. El contador llega aquí para tomar decisiones sobre su cartera de contribuyentes.

**Contenido:**

```
┌─────────────────────────────────────────────────────┐
│  Bienvenido, [Nombre]. Plan: Estructura (3 RUTs)     │
│  RUTs activos: 2 / 3                                 │
│                                                      │
│  [+ Agregar contribuyente]                           │
├─────────────────────────────────────────────────────┤
│  MIS CONTRIBUYENTES                                  │
│                                                      │
│  ┌─────────────┐  ┌─────────────┐                   │
│  │ 76.543.210-K│  │ 12.345.678-9│                   │
│  │ Empresa SpA │  │ Juan Pérez  │                   │
│  │ F22: Borrador│  │ F22: Listo │                   │
│  │ [→ Entrar]  │  │ [→ Entrar]  │                   │
│  └─────────────┘  └─────────────┘                   │
└─────────────────────────────────────────────────────┘
```

**Lo que NO debe aparecer aquí:**
- Campos del F22
- Datos tributarios de un contribuyente específico
- Formularios individuales

**Lo que SÍ debe aparecer:**
- Estado consolidado de todos los RUTs (ej: "2 con borradores, 1 listo para enviar")
- Alertas de plazos SII que afectan a todos los contribuyentes
- Estado del plan y límites
- Acceso rápido a agregar nuevo RUT

---

### 4.2 Workspace del RUT — Nivel Contribuyente

Es la vista de trabajo. El contador llega aquí para operar sobre un contribuyente específico.

**Contenido:**

```
┌─────────────────────────────────────────────────────┐
│  [← Mis contribuyentes]  RUT activo: 76.543.210-K   │
│  Empresa SpA — Régimen: 14D8                         │
├─────────────────────────────────────────────────────┤
│  FORMULARIOS                                         │
│                                                      │
│  F22 AT2026  [Borrador]  Última edición: hace 2h    │
│  → Abrir formulario                                  │
│                                                      │
│  [+ Nuevo formulario]                                │
├─────────────────────────────────────────────────────┤
│  DATOS DEL CONTRIBUYENTE                             │
│  RUT: 76.543.210-K                                   │
│  Razón Social: Empresa SpA                           │
│  Régimen: 14D8 / Tipo: Empresa                       │
│  [Editar datos]                                      │
└─────────────────────────────────────────────────────┘
```

**Lo que NO debe aparecer aquí:**
- Información de otros contribuyentes
- Datos del plan o suscripción

---

## 5. UX del Selector de Contexto

### 5.1 Principio: el contexto siempre debe ser visible

Cuando el usuario está dentro del workspace de un RUT, nunca debe preguntarse "¿de qué contribuyente estoy viendo esto?". El RUT activo es siempre visible.

### 5.2 Diseño del topbar con contexto

**Nivel Cuenta (sin RUT activo):**
```
[Logo F22] ──────────────────────────────── [Plan: Estructura] [Avatar]
```

**Nivel RUT (con RUT activo):**
```
[Logo F22] [← Inicio] | 76.543.210-K — Empresa SpA ▼ | ──── [Avatar]
                         └─ selector de RUT activo
```

El selector desplegable al hacer click en el RUT activo muestra:
```
┌─────────────────────────────────┐
│  ● 76.543.210-K — Empresa SpA  │  ← activo
│    12.345.678-9 — Juan Pérez   │
│  ─────────────────────────────  │
│  + Agregar contribuyente        │
│    (RUTs: 2/3 en tu plan)       │
└─────────────────────────────────┘
```

### 5.3 Sidebar — navegación contextual

**Cuando no hay RUT activo (nivel cuenta):**
```
Sidebar:
  Dashboard
  Mis contribuyentes
  Plan y facturación
  Perfil
```

**Cuando hay RUT activo (nivel contribuyente):**
```
Sidebar:
  ← Todos los contribuyentes
  ─────────────────────────
  [Contexto: 76.543.210-K]
  ─────────────────────────
  Resumen del contribuyente
  Formulario 22
  (futuro) Formulario 29
  Historial
```

### 5.4 Cambio de contexto

El cambio de RUT activo se hace desde el selector del topbar. Al cambiar:
1. El sidebar actualiza su navegación
2. La ruta cambia a `/rut/:nuevoRutId`
3. Los datos del formulario anterior NO se pierden (guardado automático)
4. El usuario ve el workspace del nuevo RUT

**No hay "RUT activo" en localStorage o state global permanente**. El contexto está en la URL. Si el usuario comparte `/rut/abc123/forms/xyz`, otro usuario (con acceso) verá el mismo formulario. La URL es la fuente de verdad del contexto.

### 5.5 CTA para agregar nuevo RUT

El botón "+ Agregar contribuyente" aparece en tres lugares:
1. Dashboard global (estado vacío y estado con RUTs)
2. Selector desplegable del topbar (nivel RUT)
3. Panel de plan cuando el usuario está cerca del límite

Cuando el usuario ha alcanzado el límite de su plan, el CTA cambia a:
```
+ Agregar contribuyente (requiere upgrade)
```
Y al hacer click abre un modal de upgrade al siguiente plan, no un formulario de RUT.

---

## 6. Reglas de Negocio

### 6.1 Cuándo se permite crear un nuevo RUT

Un usuario puede crear un nuevo RUT si:
1. Tiene una suscripción activa (`subscriptions.status = 'active'`)
2. El número de `taxpayer_entities` activos es menor que `membership_plans.max_ruts`
3. `max_ruts IS NULL` (plan Expansión = ilimitado) también permite crear

```
assertCanAddRut(userId):
  subscription = getActiveSubscription(userId)
  if !subscription: throw "Sin suscripción activa"

  plan = subscription.membership_plan
  if plan.max_ruts IS NULL: return OK  // Expansión

  active_ruts = COUNT(taxpayer_entities WHERE user_id = userId AND is_active = true)
  if active_ruts >= plan.max_ruts: throw "Límite de RUTs alcanzado"

  return OK
```

Esta lógica vive **exclusivamente en el backend** (`api/services/subscription_service.ts`). El frontend puede mostrar el límite como orientación UI, pero nunca confiar en él como validación real.

### 6.2 Usuario sin RUT aún

Estado: `onboarding_completed = true` pero `COUNT(taxpayer_entities) = 0`

Comportamiento:
- El dashboard global muestra un estado vacío con CTA prominente
- La URL `/rut/*` redirige a `/dashboard`
- No se muestra error, se muestra una invitación a actuar

Este estado es válido y transitorio. No es un error del sistema.

### 6.3 Usuario con plan de 1 RUT (Núcleo)

- El selector de contexto en el topbar no se muestra (no hay contexto que elegir)
- El dashboard global, al detectar 1 solo RUT, puede redirigir automáticamente al workspace de ese RUT
- El CTA "Agregar contribuyente" lleva al modal de upgrade, no al formulario de RUT

Decisión de diseño: en plan Núcleo, la app se siente como "una aplicación de 1 RUT". La complejidad multi-RUT no contamina la experiencia de quien no la necesita.

### 6.4 Usuario con plan multi-RUT

- El selector de contexto en el topbar siempre visible
- El dashboard muestra tarjetas por cada RUT activo
- Se puede agregar hasta el límite del plan
- Al acercarse al límite (ej: 2/3 RUTs), el sistema puede mostrar una advertencia proactiva

### 6.5 Cómo evitar confusión entre contribuyentes

Reglas:
1. El RUT activo siempre visible en topbar — nunca oculto
2. Los datos de un contribuyente nunca se muestran en el contexto de otro
3. Los formularios usan el nombre y RUT del contribuyente en el encabezado, no el del usuario
4. El breadcrumb siempre muestra: `Dashboard > [RUT] > [Formulario]`
5. Al cambiar de RUT, animación o feedback visual que confirma el cambio de contexto

### 6.6 Baja de un RUT

Un RUT se da de baja con `is_active = false` (soft delete). No se borran sus formularios.
- El RUT inactivo no cuenta para el límite del plan
- Sus formularios quedan archivados y accesibles en modo lectura
- Si el usuario reactiva el RUT y sigue dentro del límite del plan, vuelve a estar activo

---

## 7. Modelo Conceptual de Datos

### 7.1 Jerarquía de entidades

```
auth.users (gestionado por Supabase)
    │
    │ 1:1 (trigger automático)
    ▼
profiles
    ├─ email, full_name, avatar_url
    ├─ onboarding_completed
    │
    │ 1:0..1
    ├─▶ subscriptions ──────── membership_plans
    │       billing_cycle           max_ruts
    │       status                  price_*
    │       ends_at
    │
    │ 1:N
    └─▶ taxpayer_entities  ← "el RUT"
            rut, name
            tax_regime, entity_type
            is_active
            │
            │ 1:N
            └─▶ tax_forms ──── form_types
                    status          code (F22, F29...)
                    title           tax_year
                    │               is_active
                    │ 1:1 (JSONB)
                    ├─▶ tax_form_data
                    │       data: { fieldCode: value }
                    │       version
                    │
                    │ 1:N
                    └─▶ submissions
                            folio, status
                            response_data

profiles
    │ 1:N
    └─▶ audit_logs (inmutable)
```

### 7.2 Invariantes del modelo

| Invariante | Descripción |
|---|---|
| Un usuario tiene exactamente una suscripción activa | Enforced por UNIQUE INDEX con WHERE status='active' |
| Un RUT por usuario es único | UNIQUE(user_id, rut) |
| Un formulario por RUT por tipo por año | UNIQUE(taxpayer_id, form_type_id) — un F22 AT2026 por contribuyente |
| Un blob de datos por formulario | UNIQUE(form_id) en tax_form_data |
| Los formularios pertenecen al RUT, no solo al usuario | taxpayer_id es FK, user_id es denormalización para RLS |
| La identidad del usuario (profiles) es independiente del contribuyente (taxpayer_entities) | Son entidades separadas con propósitos distintos |

### 7.3 Por qué user_id está en tax_forms

`tax_forms` tiene `user_id` por dos razones prácticas:
1. **RLS eficiente**: permite hacer `WHERE user_id = auth.uid()` sin join a taxpayer_entities
2. **Auditoría**: quien creó el formulario queda registrado aunque el RUT cambie de manos en el futuro

Es denormalización intencional, no un error de diseño.

### 7.4 Escalabilidad a nuevos formularios

Para agregar F29:
1. `INSERT INTO form_types (code='F29', tax_year=2026, is_active=true, ...)` — 1 fila en DB
2. Motor de reglas F29 en `core/` — nuevo módulo aislado
3. Ruta en API: `POST /api/v1/calculate/f29` — análogo al de F22
4. Componente de formulario F29 en `web/` — aparece en el workspace del RUT automáticamente

No hay que cambiar la estructura de `taxpayer_entities`, `tax_forms`, ni la navegación principal. El workspace del RUT simplemente detecta los `form_types` activos y los ofrece como opciones.

---

## 8. Arquitectura Técnica

### 8.1 Stack completo

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend API | Deno + Hono |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Base de datos | Supabase (PostgreSQL 15) |
| Motor de reglas | `core/` existente (Deno library) |
| Storage | Supabase Storage (PDFs exportados) |
| Hosting API | Deno Deploy |
| Hosting Web | Vercel o Netlify |

### 8.2 Diagrama de capas

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE                                   │
│   React + Vite + Tailwind                                        │
│   [Auth]  [Dashboard]  [RUT Selector]  [Workspace]  [F22 Form]  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / Bearer JWT
┌──────────────────────────▼──────────────────────────────────────┐
│                     API (Deno + Hono)                            │
│  auth.ts │ me.ts │ dashboard.ts │ taxpayers.ts │ forms_saas.ts  │
│  plans.ts │ subscriptions.ts                                     │
│  + subscription_service.ts (assertCanAddRut)                     │
│  + Tax Engine (core/): Calculator, Validator, Optimizer          │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Service Role Key (nunca al frontend)
┌──────────────────────────▼──────────────────────────────────────┐
│                      SUPABASE                                    │
│  Auth Service │ PostgreSQL 15 (con RLS) │ Storage (PDFs)        │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3 Separación de responsabilidades

| Capa | Responsabilidad | NO hace |
|------|----------------|---------|
| Frontend | UI, UX, llamadas HTTP, estado local | Validar límites de plan, lógica tributaria |
| Backend API | Auth JWT, límites de plan, auditoría | Renderizado, lógica de presentación |
| Motor (core/) | Cálculo F22, validación CSW | Auth, persistencia, multitenancy |
| Supabase | Persistencia, autenticación, RLS | Lógica de negocio de planes |

### 8.4 Rutas del frontend (React Router)

```
/                     → redirect a /dashboard (si auth) o /login
/login                → formulario de login
/register             → formulario de registro
/onboarding           → wizard post-registro (nombre + plan)

/dashboard            → dashboard global (nivel cuenta)
/dashboard/settings   → configuración del perfil
/dashboard/billing    → plan y facturación

/rut/:rutId           → workspace del contribuyente (nivel RUT)
/rut/:rutId/edit      → editar datos del contribuyente
/rut/:rutId/forms/:formId → editor del formulario (nivel formulario)
```

### 8.5 Endpoints de la API

```
# Auth y perfil
POST /api/v1/auth/register        — upsert profile tras OAuth
POST /api/v1/auth/select-plan     — asociar suscripción
GET  /api/v1/me                   — perfil del usuario autenticado

# Dashboard
GET  /api/v1/dashboard            — resumen: suscripción + RUTs + últimos forms

# Planes
GET  /api/v1/plans                — catálogo público de planes

# Suscripciones
GET  /api/v1/subscriptions/current

# Contribuyentes (RUTs)
GET  /api/v1/taxpayers            — lista RUTs del usuario
POST /api/v1/taxpayers            — crear (verifica límite de plan)
GET  /api/v1/taxpayers/:id        — detalle
PUT  /api/v1/taxpayers/:id        — actualizar
DELETE /api/v1/taxpayers/:id      — soft delete (is_active = false)

# Formularios
GET  /api/v1/forms                — lista forms del usuario (todos los RUTs)
POST /api/v1/forms                — crear form para un RUT
GET  /api/v1/forms/:id            — detalle con datos y RUT
PUT  /api/v1/forms/:id/data       — guardar borrador JSONB

# Motor tributario
POST /api/v1/calculate            — calcular campos derivados
POST /api/v1/validate             — validar reglas CSW
POST /api/v1/optimize             — sugerir optimizaciones
```

---

## 9. SQL del Schema

```sql
-- =============================================================================
-- SaaS Tributario — Schema PostgreSQL/Supabase
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id                   UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                TEXT        NOT NULL,
  full_name            TEXT,
  avatar_url           TEXT,
  onboarding_completed BOOLEAN     NOT NULL DEFAULT false,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.membership_plans (
  id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code                  TEXT        NOT NULL UNIQUE,
  name                  TEXT        NOT NULL,
  max_ruts              INTEGER,                      -- NULL = ilimitado
  price_monthly_usd     NUMERIC(10,2) NOT NULL,
  price_quarterly_usd   NUMERIC(10,2) NOT NULL,
  price_annual_usd      NUMERIC(10,2) NOT NULL,
  min_commitment_months INTEGER     NOT NULL DEFAULT 1,
  is_active             BOOLEAN     NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

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

CREATE TABLE IF NOT EXISTS public.taxpayer_entities (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rut           TEXT        NOT NULL,
  name          TEXT        NOT NULL,
  tax_regime    TEXT,
  entity_type   INTEGER     CHECK (entity_type BETWEEN 1 AND 8),
  is_active     BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, rut)
);

CREATE INDEX IF NOT EXISTS taxpayer_entities_user_idx ON public.taxpayer_entities (user_id);

CREATE TABLE IF NOT EXISTS public.form_types (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  description TEXT,
  tax_year    INTEGER,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

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

CREATE TABLE IF NOT EXISTS public.tax_form_data (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id    UUID        NOT NULL REFERENCES public.tax_forms(id) ON DELETE CASCADE,
  data       JSONB       NOT NULL DEFAULT '{}',
  version    INTEGER     NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS tax_form_data_form_idx ON public.tax_form_data (form_id);

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

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  action      TEXT        NOT NULL,
  entity_type TEXT        NOT NULL,
  entity_id   UUID,
  details     JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_logs_user_idx    ON public.audit_logs (user_id);
CREATE INDEX IF NOT EXISTS audit_logs_entity_idx  ON public.audit_logs (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS audit_logs_created_idx ON public.audit_logs (created_at DESC);

-- Trigger: crear profile al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: updated_at automático
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE OR REPLACE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE OR REPLACE TRIGGER set_updated_at_subscriptions
  BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE OR REPLACE TRIGGER set_updated_at_taxpayer_entities
  BEFORE UPDATE ON public.taxpayer_entities FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE OR REPLACE TRIGGER set_updated_at_tax_forms
  BEFORE UPDATE ON public.tax_forms FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE OR REPLACE TRIGGER set_updated_at_tax_form_data
  BEFORE UPDATE ON public.tax_form_data FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

---

## 10. Seeds Iniciales

```sql
-- membership_plans
INSERT INTO public.membership_plans
  (code, name, max_ruts, price_monthly_usd, price_quarterly_usd, price_annual_usd, min_commitment_months)
VALUES
  ('nucleo',       'Núcleo',       1,    500.00,  1350.00,  4800.00, 3),
  ('estructura',   'Estructura',   3,   1200.00,  3240.00, 11520.00, 1),
  ('arquitectura', 'Arquitectura', 7,   2500.00,  6750.00, 24000.00, 1),
  ('expansion',    'Expansión',    NULL, 6000.00, 16200.00, 57600.00, 1)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name, max_ruts = EXCLUDED.max_ruts,
  price_monthly_usd = EXCLUDED.price_monthly_usd,
  price_quarterly_usd = EXCLUDED.price_quarterly_usd,
  price_annual_usd = EXCLUDED.price_annual_usd,
  min_commitment_months = EXCLUDED.min_commitment_months;

-- form_types
INSERT INTO public.form_types (code, name, description, tax_year, is_active)
VALUES
  ('F22', 'Formulario 22', 'Declaración Anual de Impuestos a la Renta', 2026, true),
  ('F29', 'Formulario 29', 'Declaración Mensual IVA', NULL, false),
  ('F50', 'Formulario 50', 'Declaración Mensual Impuestos Varios', NULL, false)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  tax_year = EXCLUDED.tax_year, is_active = EXCLUDED.is_active;
```

---

## 11. Row Level Security

```sql
ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxpayer_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_types        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_forms         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_form_data     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs        ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles: select own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles: insert own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles: update own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- membership_plans (lectura pública)
CREATE POLICY "plans: select all" ON public.membership_plans FOR SELECT USING (true);

-- subscriptions
CREATE POLICY "subscriptions: select own" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "subscriptions: insert own" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "subscriptions: update own" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- taxpayer_entities
CREATE POLICY "taxpayers: select own" ON public.taxpayer_entities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "taxpayers: insert own" ON public.taxpayer_entities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "taxpayers: update own" ON public.taxpayer_entities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "taxpayers: delete own" ON public.taxpayer_entities FOR DELETE USING (auth.uid() = user_id);

-- form_types (activos, lectura pública)
CREATE POLICY "form_types: select active" ON public.form_types FOR SELECT USING (is_active = true);

-- tax_forms
CREATE POLICY "tax_forms: select own" ON public.tax_forms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tax_forms: insert own" ON public.tax_forms FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tax_forms: update own" ON public.tax_forms FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tax_forms: delete own" ON public.tax_forms FOR DELETE USING (auth.uid() = user_id);

-- tax_form_data (a través del form del usuario)
CREATE POLICY "tax_form_data: select own" ON public.tax_form_data FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tax_forms f WHERE f.id = form_id AND f.user_id = auth.uid())
);
CREATE POLICY "tax_form_data: insert own" ON public.tax_form_data FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tax_forms f WHERE f.id = form_id AND f.user_id = auth.uid())
);
CREATE POLICY "tax_form_data: update own" ON public.tax_form_data FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.tax_forms f WHERE f.id = form_id AND f.user_id = auth.uid())
);

-- submissions
CREATE POLICY "submissions: select own" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "submissions: insert own" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- audit_logs (solo lectura; escritura solo desde backend con service_role)
CREATE POLICY "audit_logs: select own" ON public.audit_logs FOR SELECT USING (auth.uid() = user_id);
```

---

## 12. Riesgos a Evitar

### 12.1 Confusión de identidades

**Riesgo**: mezclar el RUT del contador (persona que usa la app) con el RUT del contribuyente (sujeto tributario).
**Solución**: `profiles` nunca tiene un campo `rut` propio. Los RUTs viven exclusivamente en `taxpayer_entities`. Si el contador quiere gestionar su propio RUT, lo agrega como un `taxpayer_entity` más.

### 12.2 Estado activo en localStorage

**Riesgo**: guardar "el RUT activo" en localStorage hace que el estado sobreviva al logout, mezcle sesiones, y no sea bookmarkeable.
**Solución**: el RUT activo vive en la URL (`/rut/:rutId`). El estado de la app se deriva de la URL, no al revés.

### 12.3 Validación de límites solo en el frontend

**Riesgo**: el usuario puede manipular el frontend para crear más RUTs de los que permite su plan.
**Solución**: `assertCanAddRut()` en el backend valida el límite antes de cualquier INSERT. El frontend solo muestra el estado como orientación; nunca como barrera real.

### 12.4 Acoplamiento al F22

**Riesgo**: rutas, componentes o llamadas API que asumen que el único formulario es F22.
**Solución**: todos los formularios se identifican por `form_type_id` (UUID de la tabla `form_types`). El code `'F22'` es solo un valor de catálogo. Las rutas usan `formId`, no `f22`.

### 12.5 Onboarding que pide demasiado

**Riesgo**: un onboarding largo (RUT, régimen, tipo de contribuyente, todos los campos) antes de que el usuario haya visto el valor del producto.
**Solución**: el onboarding pide solo nombre y plan. Todo lo demás se completa más tarde, dentro del workspace del RUT, con contexto y motivación.

### 12.6 Borrado físico de datos fiscales

**Riesgo**: borrar un `taxpayer_entity` o `tax_form` elimina datos con implicaciones legales.
**Solución**: soft delete obligatorio (`is_active = false`). Los formularios nunca se borran físicamente. El borrado lógico de un RUT archiva sus formularios en modo lectura.

---

## 13. Recomendación Final de Implementación

### Fase 3 — Frontend (inmediata)

Implementar el shell completo de la app con los tres niveles de navegación. El objetivo de esta fase no es que el F22 funcione en producción, sino que la estructura de navegación y contexto quede correctamente establecida para escalar.

**Componentes prioritarios:**
1. `AppShell` — layout con topbar contextual y sidebar adaptativo
2. `DashboardPage` — nivel cuenta, tarjetas de RUTs activos
3. `RUTSelectorDropdown` — selector en topbar con CTA de upgrade
4. `TaxpayerWorkspacePage` — nivel RUT, lista de formularios disponibles
5. `OnboardingWizard` — flujo post-registro (nombre + plan)
6. `AddTaxpayerModal` — formulario de alta de RUT con validación
7. `FormEditorPage` — envuelve el `RecuadroTable` existente dentro del contexto de RUT

**Orden de implementación recomendado:**
1. Rutas y router (`/dashboard`, `/rut/:id`, `/rut/:id/forms/:formId`)
2. Contexto de autenticación (Supabase Auth hook)
3. Dashboard global vacío con CTA
4. Modal de alta de RUT
5. Workspace del RUT con lista de formularios
6. Integrar el editor F22 existente dentro del workspace
7. Topbar con selector de RUT activo
8. Onboarding wizard

### Criterio de "hecho"

La Fase 3 está completa cuando:
- Un usuario puede registrarse, elegir un plan, agregar un RUT y abrir un F22 para ese RUT, todo sin fricción innecesaria
- El RUT activo siempre es visible cuando el usuario está en el workspace
- El mismo código soporta un usuario con 1 RUT (Núcleo) y uno con 7 (Arquitectura) sin cambios de lógica
- Al agregar un segundo `form_type` activo en la DB, aparece automáticamente en el workspace sin cambios de código

---

*Última actualización: 2026-03-27*
