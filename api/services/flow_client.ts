/**
 * Flow.cl API client — Deno
 *
 * Documentación: https://developers.flow.cl/api
 *
 * Autenticación: todos los requests llevan apiKey + firma HMAC-SHA256.
 * Algoritmo de firma:
 *   1. Ordenar todos los params alfabéticamente (excepto 's')
 *   2. Concatenar como: name1value1name2value2...
 *   3. Firmar con HMAC-SHA256 usando secretKey
 *   4. Enviar hex digest como param 's'
 */

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const FLOW_ENV        = Deno.env.get("FLOW_ENV") ?? "sandbox";
const FLOW_API_KEY    = Deno.env.get("FLOW_API_KEY")!;
const FLOW_SECRET_KEY = Deno.env.get("FLOW_SECRET_KEY")!;

const BASE_URL = FLOW_ENV === "production"
  ? "https://www.flow.cl/api"
  : "https://sandbox.flow.cl/api";

if (!FLOW_API_KEY || !FLOW_SECRET_KEY) {
  throw new Error("Faltan variables de entorno: FLOW_API_KEY y/o FLOW_SECRET_KEY");
}

// ---------------------------------------------------------------------------
// HMAC-SHA256 signing
// ---------------------------------------------------------------------------

async function sign(params: Record<string, string>): Promise<string> {
  const sorted = Object.keys(params).sort();
  const toSign = sorted.map((k) => `${k}${params[k]}`).join("");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(FLOW_SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(toSign));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Agrega apiKey, firma todos los params y devuelve el objeto completo. */
async function buildParams(params: Record<string, string>): Promise<Record<string, string>> {
  const all = { ...params, apiKey: FLOW_API_KEY };
  const s   = await sign(all);
  return { ...all, s };
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

async function flowGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const signed = await buildParams(params);
  const qs     = new URLSearchParams(signed).toString();
  const res    = await fetch(`${BASE_URL}${path}?${qs}`);
  const body   = await res.json();
  if (!res.ok) throw new FlowError(res.status, body);
  return body as T;
}

async function flowPost<T>(path: string, params: Record<string, string>): Promise<T> {
  const signed = await buildParams(params);
  const res    = await fetch(`${BASE_URL}${path}`, {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    new URLSearchParams(signed).toString(),
  });
  const body = await res.json();
  if (!res.ok) throw new FlowError(res.status, body);
  return body as T;
}

export class FlowError extends Error {
  constructor(
    public readonly httpStatus: number,
    public readonly flowBody: unknown,
  ) {
    const msg = typeof flowBody === "object" && flowBody !== null && "message" in flowBody
      ? String((flowBody as Record<string, unknown>).message)
      : JSON.stringify(flowBody);
    super(`Flow API error ${httpStatus}: ${msg}`);
    this.name = "FlowError";
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FlowCustomer {
  customerId:      string;
  created:         string;
  email:           string;
  name:            string;
  creditCardType:  string | null;
  last4CardDigits: string | null;
  externalId:      string;
  status:          string;
  registerDate:    string | null;
}

export interface FlowRegisterResponse {
  url:   string;
  token: string;
}

export interface FlowRegisterStatus {
  status:          string; // "1" = ok
  customerId:      string;
  creditCardType:  string;
  last4CardDigits: string;
}

export interface FlowPlan {
  planId:         string;
  name:           string;
  currency:       string;
  amount:         number;
  interval:       number;
  interval_count: number;
  status:         number;
  urlCallback:    string;
}

export interface FlowSubscription {
  subscriptionId: string;
  planId:         string;
  customerId:     string;
  status:         number; // 1=active, 2=cancelled, 3=trialing
  created:        string;
  subscription_start: string;
  trial_period_days:  number;
  next_invoice_date:  string;
}

export interface FlowPaymentStatus {
  flowOrder:     number;
  commerceOrder: string;
  status:        number; // 1=pendiente, 2=pagado, 3=rechazado, 4=anulado
  amount:        number; // en CLP directamente (no centavos)
  currency:      string;
  subject:       string;
  payer:         string;
  requestDate:   string;
  paymentData?:  {
    subscriptionId?: string;
    date?:           string;
    media?:          string;
    cardLast4Digits?: string;
  };
}

// ---------------------------------------------------------------------------
// Customer
// ---------------------------------------------------------------------------

export async function createCustomer(params: {
  name:       string;
  email:      string;
  externalId: string;
}): Promise<FlowCustomer> {
  return flowPost("/customer/create", params);
}

export async function getCustomer(customerId: string): Promise<FlowCustomer> {
  return flowGet("/customer/get", { customerId });
}

/**
 * Inicia el flujo de registro de tarjeta.
 * Retorna { url, token } — redirigir al usuario a url + "?token=" + token.
 */
export async function registerCard(params: {
  customerId: string;
  url_return: string;
}): Promise<FlowRegisterResponse> {
  return flowPost("/customer/register", params);
}

/** Verifica el resultado del registro de tarjeta tras el callback. */
export async function getRegisterStatus(token: string): Promise<FlowRegisterStatus> {
  return flowGet("/customer/getRegisterStatus", { token });
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

export interface CreatePlanParams {
  planId:              string;
  name:                string;
  amount:              string; // number as string
  currency?:           string; // default CLP
  interval:            string; // "1"=daily "2"=weekly "3"=monthly "4"=annual
  interval_count?:     string; // default "1"
  trial_period_days?:  string;
  days_until_due?:     string;
  periods_number?:     string;
  urlCallback?:        string;
  charges_retries_number?: string;
}

export async function createPlan(params: CreatePlanParams): Promise<FlowPlan> {
  return flowPost("/plans/create", params as unknown as Record<string, string>);
}

export async function getPlan(planId: string): Promise<FlowPlan> {
  return flowGet("/plans/get", { planId });
}

// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------

export async function createSubscription(params: {
  planId:              string;
  customerId:          string;
  subscription_start?: string; // yyyy-mm-dd
  trial_period_days?:  string;
  periods_number?:     string;
}): Promise<FlowSubscription> {
  return flowPost("/subscription/create", params as Record<string, string>);
}

export async function getSubscription(subscriptionId: string): Promise<FlowSubscription> {
  return flowGet("/subscription/get", { subscriptionId });
}

export async function cancelSubscription(params: {
  subscriptionId: string;
  at_period_end?: string; // "0"=inmediato, "1"=al final del periodo
}): Promise<FlowSubscription> {
  return flowPost("/subscription/cancel", params as Record<string, string>);
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export async function getPaymentStatus(token: string): Promise<FlowPaymentStatus> {
  return flowGet("/payment/getStatus", { token });
}

// ---------------------------------------------------------------------------
// Currency conversion — USD → CLP (live rate)
// ---------------------------------------------------------------------------

const EXCHANGE_RATE_URL = "https://open.er-api.com/v6/latest/USD";

/** Fetches the live USD→CLP exchange rate from open.er-api.com (free, no key). */
export async function getUsdToClpRate(): Promise<number> {
  const res = await fetch(EXCHANGE_RATE_URL);
  if (!res.ok) throw new Error(`Exchange rate fetch failed: ${res.status}`);
  const data = await res.json() as { rates: Record<string, number> };
  const rate = data.rates["CLP"];
  if (!rate) throw new Error("CLP rate not found in exchange rate response");
  return rate;
}

/**
 * Converts a USD amount to CLP using the live rate.
 * Rounds to the nearest integer (CLP has no cents).
 */
export async function usdToClp(amountUsd: number): Promise<{ clp: number; rate: number }> {
  const rate = await getUsdToClpRate();
  return { clp: Math.round(amountUsd * rate), rate };
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/** Mapea billing_cycle a parámetros de intervalo para Flow. */
export function billingCycleToInterval(
  cycle: "monthly" | "quarterly" | "annual",
): { interval: string; interval_count: string } {
  switch (cycle) {
    case "monthly":   return { interval: "3", interval_count: "1" };
    case "quarterly": return { interval: "3", interval_count: "3" };
    case "annual":    return { interval: "4", interval_count: "1" };
  }
}

/** Construye el planId de Flow a partir del código del plan y el ciclo. */
export function toFlowPlanId(planCode: string, billingCycle: string, isPromo = false): string {
  return isPromo ? `${planCode}_${billingCycle}_promo` : `${planCode}_${billingCycle}`;
}
