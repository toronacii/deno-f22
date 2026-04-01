# Plan de Integración de Pagos Recurrentes con Flow

**Fecha:** 2026-04-01  
**Estado:** En progreso — lógica base implementada, hay gaps críticos por corregir

---

## 1. Comportamiento Deseado

| Ciclo         | Primera suscripción                          | Cobros siguientes                          |
|---------------|----------------------------------------------|--------------------------------------------|
| **Mensual**   | Cobro inmediato de **3 meses por adelantado** | Mensual automático desde el mes 4 en adelante |
| **Anual**     | Cobro normal (Flow carga el primer año)      | Anual automático                           |

---

## 2. Arquitectura General

```
Usuario → POST /payments/checkout
  │
  ├─ ¿Tiene tarjeta?
  │    NO → Redirigir a Flow card registration
  │           └─ GET /payments/card-callback → (continúa flujo)
  │
  └─ SÍ → startSubscription()
            │
            ├─ cycle === "monthly"
            │    ├─ chargeCustomer(3 × precio_mensual_CLP)  ← cargo único
            │    └─ createSubscription(start = hoy + 3 meses) ← recurrente
            │
            └─ cycle === "annual"
                 └─ createSubscription(start = hoy) ← Flow maneja el primer cobro
```

---

## 3. Planes en Flow (`sync_flow_plans.ts`)

Los planes en Flow definen el monto y la frecuencia del cobro recurrente:

| planId (ejemplo)      | interval | interval_count | Descripción                          |
|-----------------------|----------|----------------|--------------------------------------|
| `sinergy_monthly`     | 3        | 1              | Mensual — cobra desde el mes 4       |
| `sinergy_monthly_promo` | 3      | 1              | Mensual con precio promocional       |
| `sinergy_annual`      | 4        | 1              | Anual — cobra 1 vez al año           |

**Importante:** El plan mensual en Flow cobra el precio mensual cada mes. Los 3 meses iniciales son un cargo directo (`/customer/charge`), no una suscripción.

**Crear/actualizar planes:**
```bash
cd api && deno run --allow-read --allow-net --allow-env --env-file=../.env scripts/sync_flow_plans.ts
```

---

## 4. Flujo Detallado — Plan Mensual (primera suscripción)

```
1. Usuario elige plan mensual y hace POST /payments/checkout
2. Se busca el plan en Supabase + promoción activa
3. Se obtiene o crea cliente en Flow (flow_customer_id en profiles)
4. ¿Tiene tarjeta registrada (flow_card_last4)?
   └─ NO → Flow card registration → callback → continúa desde paso 5
5. chargeCustomer(3 × precio_mensual_CLP)   — commerce order: "init_{userId}_{ts}"
   ├─ status 2 (pagado) → continúa
   ├─ status 1 (pendiente) → [VER GAP #1]
   └─ status 3/4 (rechazado/anulado) → [VER GAP #1] → lanzar error, NO crear suscripción
6. createSubscription(planId, customerId, subscription_start = hoy+3meses)
   └─ Si falla → [VER GAP #2] → el usuario fue cobrado pero no tiene suscripción
7. persistSubscription en Supabase:
   - status = "active"
   - earliest_cancel_at = started_at + min_commitment_months
8. Log en flow_events: event_type="initial_charge"
```

---

## 5. Flujo Detallado — Plan Anual (primera suscripción)

```
1. Usuario elige plan anual y hace POST /payments/checkout
2–4. Igual que mensual (cliente + tarjeta)
5. createSubscription(planId, customerId)  — sin subscription_start
   └─ Flow cobra el primer año al crear la suscripción
6. persistSubscription en Supabase
7. Flow enviará webhook cuando procese el primer cobro
```

---

## 6. Cobros Recurrentes (Webhook)

Flow llama a `POST /payments/webhook` con cada cobro de suscripción:

```
Flow → POST /payments/webhook { token }
  │
  ├─ getPaymentStatus(token)
  ├─ Buscar subscription por flow_subscription_id
  ├─ Actualizar status: pagado→active | rechazado→past_due | anulado→cancelled
  └─ Log en flow_events: event_type="subscription_payment"
```

**Importante:** El cargo inicial de 3 meses (chargeCustomer) es un pago directo (`/customer/charge`), **no** envía webhook de suscripción. Solo genera un `flowOrder` que se registra en flow_events.

---

## 7. Cancelación

```
POST /payments/cancel
  ├─ Verificar earliest_cancel_at (compromiso mínimo)
  ├─ cancelSubscription(at_period_end="1")  — no corta a mitad de período
  └─ Actualizar subscriptions.status = "cancelled"
```

---

## 8. Gaps y Problemas a Corregir

### GAP #1 — Cargo inicial sin validación de resultado (CRÍTICO)

**Problema:** `chargeCustomer` devuelve `status` pero el código actual ignora si el cobro fue rechazado. Si el cargo falla, de todas formas crea la suscripción en Flow y activa la cuenta.

**Estado actual en `payments.ts` línea 429–448:**
```typescript
const charge = await chargeCustomer({ ... });
// ← No se verifica charge.status antes de continuar
const flowSub = await createSubscription({ ... });
```

**Fix requerido en `startSubscription()`:**
```typescript
const charge = await chargeCustomer({ ... });
if (charge.status === 3 || charge.status === 4) {
  throw new Error(`Cargo inicial rechazado (status ${charge.status})`);
}
// status 1 (pendiente): Flow puede tardar en confirmar — ver GAP #1b
if (charge.status !== 2) {
  // Log y continuar con precaución, o esperar callback
}
```

### GAP #1b — Cargo pendiente (status=1) sin callback

**Problema:** `/customer/charge` puede devolver status=1 (pendiente). No hay webhook para este tipo de cargo — Flow envía callbacks para pagos de suscripción, pero no para cargos directos de la misma manera.

**Opciones:**
- **Opción A (simple):** Tratar pendiente como aceptado temporalmente. Si el cobro falla Flow no emite el pago a la cuenta del comercio, pero el usuario tiene acceso durante el período de cobro. Aceptable si el riesgo de fraude es bajo.
- **Opción B (robusta):** Implementar un endpoint de confirmación de cargo directo y pasar `urlConfirmation` a `chargeCustomer`. Flow llama a este endpoint cuando el cobro se confirma. Activar la suscripción solo al recibir confirmación.

**Recomendación:** Empezar con Opción A (tratar status 1 y 2 como OK), escalar a Opción B si hay problemas de morosidad.

### GAP #2 — Sin rollback si la suscripción falla tras cobrar

**Problema:** Si `chargeCustomer` tiene éxito pero `createSubscription` lanza error, el usuario fue cobrado pero no tiene suscripción activa.

**Fix requerido:**
```typescript
const charge = await chargeCustomer({ ... });
// Log del cargo inmediatamente
await db.from("flow_events").insert({ event_type: "initial_charge", ... });

try {
  const flowSub = await createSubscription({ ... });
  return { flowSub };
} catch (e) {
  // Alerta crítica: usuario cobrado sin suscripción
  console.error("[CRITICAL] Charge succeeded but subscription creation failed", {
    userId, chargeFlowOrder: charge.flowOrder, error: e
  });
  // Opcionalmente: marcar en flow_events con event_type="initial_charge_orphan"
  throw e; // Propagar para que el cliente reciba error
}
```

### GAP #3 — flow_events no vincula cargo inicial con suscripción

**Problema:** El `initial_charge` se loguea con `subscription_id: null` porque la suscripción aún no existe. Después de crear la suscripción, el registro queda sin vínculo.

**Fix:** Actualizar el registro tras crear la suscripción:
```typescript
const eventInsert = await db.from("flow_events").insert({ ..., subscription_id: null }).select("id").single();
const flowSub = await createSubscription({ ... });
await db.from("flow_events").update({ subscription_id: subRecord.id }).eq("id", eventInsert.data.id);
```

### GAP #4 — Doble llamada a `usdToClp` en monthly (menor)

**Problema:** En `startSubscription` se llama `usdToClp(lockedPricePerMonthUsd)` para el monto y luego `usdToClp(1)` para loguear la tasa — dos llamadas a la API externa cuando una alcanza.

**Fix:** Reusar la tasa de la primera llamada:
```typescript
const { clp: monthlyClp, rate } = await usdToClp(lockedPricePerMonthUsd);
// Usar `rate` directamente en el log, sin segunda llamada
```

---

## 9. Tareas de Implementación

### Fase 1 — Correcciones críticas (antes de producción)

- [ ] **GAP #1**: Validar `charge.status` en `startSubscription()` antes de llamar a `createSubscription()`
- [ ] **GAP #2**: Agregar try/catch con log de alerta crítica si `createSubscription` falla post-cobro
- [ ] **GAP #3**: Actualizar `flow_events.subscription_id` una vez persistida la suscripción en DB
- [ ] **GAP #4**: Reusar la tasa de cambio en el mismo bloque

### Fase 2 — Mejoras operacionales

- [ ] **Webhook signature validation**: Validar firma HMAC en `POST /payments/webhook` (actualmente acepta cualquier POST)
- [ ] **Re-suscripción de usuario existente**: Si el usuario ya tiene suscripción activa y hace checkout, ¿se le cobra 3 meses nuevamente? Decidir política y hacer explícito.
- [ ] **Portal mejorado**: Mostrar en `/payments/portal` la fecha del próximo cobro (`next_invoice_date` de Flow)
- [ ] **Manejo de `past_due`**: Definir qué pasa cuando el webhook reporta un pago rechazado (bloquear acceso, reintentos, notificación)

### Fase 3 — Operacional

- [ ] Ejecutar `sync_flow_plans.ts` en sandbox y verificar planes creados
- [ ] Probar flujo completo con tarjeta de prueba en Flow sandbox
- [ ] Ejecutar `sync_flow_plans.ts` en producción
- [ ] Configurar `FLOW_WEBHOOK_URL` apuntando al dominio de producción
- [ ] Verificar que Fly.io tiene todos los env vars (`FLOW_PROD_API_KEY`, `FLOW_PROD_SECRET_KEY`, etc.)

---

## 10. Variables de Entorno Requeridas

```env
# Flow
FLOW_ENV=prod                        # dev | prod
FLOW_DEV_API_KEY=...
FLOW_DEV_SECRET_KEY=...
FLOW_PROD_API_KEY=...
FLOW_PROD_SECRET_KEY=...
FLOW_WEBHOOK_URL=https://sii-f22.fly.dev/api/v1/payments/webhook
FLOW_PLAN_VERSION=v1                 # opcional — sufijo en planIds para versionar tasas

# API
API_BASE_URL=https://sii-f22.fly.dev  # usado en redirects del card-callback
```

---

## 11. Pruebas Mínimas antes de Producción

```
[ ] Suscripción mensual SIN tarjeta previa:
    → Redirige a Flow card registration
    → Callback registra tarjeta
    → Cobra 3 meses upfront
    → Crea suscripción con start=hoy+3meses
    → DB: subscriptions.status=active, earliest_cancel_at=hoy+min_commitment_months

[ ] Suscripción mensual CON tarjeta ya registrada:
    → Cobra directamente 3 meses upfront
    → Crea suscripción con start=hoy+3meses

[ ] Suscripción anual:
    → Crea suscripción inmediatamente
    → Flow procesa primer cobro anual
    → Webhook actualiza status a active

[ ] Cancelación antes de earliest_cancel_at:
    → Retorna 400 con fecha disponible

[ ] Cancelación después de earliest_cancel_at:
    → cancelSubscription en Flow at_period_end=1
    → subscriptions.status=cancelled

[ ] Webhook pago rechazado:
    → subscriptions.status=past_due

[ ] Cargo inicial rechazado (status=3):
    → No se crea suscripción
    → Error 400/402 al cliente
```

---

## 12. Estado Actual del Código

| Componente               | Archivo                            | Estado                                |
|--------------------------|------------------------------------|---------------------------------------|
| Flow API client          | `api/services/flow_client.ts`      | ✅ Completo                           |
| Checkout + card callback | `api/routes/payments.ts`           | ⚠️ Falta validación de cargo inicial |
| Webhook handler          | `api/routes/payments.ts`           | ✅ Funcional (falta firma HMAC)       |
| Cancel                   | `api/routes/payments.ts`           | ✅ Completo                           |
| Portal                   | `api/routes/payments.ts`           | ✅ Completo                           |
| Sync plans script        | `api/scripts/sync_flow_plans.ts`   | ✅ Completo                           |
| Recreate plans script    | `api/scripts/recreate_flow_plans.ts` | ✅ Completo (uso de emergencia)      |
| DB schema                | `api/db/schema.sql` + `migration_flow.sql` | ✅ Tablas + RLS definidas    |
