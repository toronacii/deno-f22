/**
 * OnboardingPage — wizard de 2 pasos post-registro.
 * Paso 1: confirmar nombre
 * Paso 2: elegir plan → checkout directo con Flow
 *
 * F22 Digital → POST /payments/f22-checkout → redirect a link de pago Flow
 * Membresías  → POST /payments/checkout     → redirect a registro de tarjeta Flow (si no tiene)
 *                                           → suscripción creada si ya tiene tarjeta
 */

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Logo } from "../components/ui/Logo.tsx";
import { PLAN_META } from "../data/plan_meta.ts";
import { api } from "../lib/api.ts";
import { supabase } from "../lib/supabase.ts";
import { useAuth } from "../lib/auth_context.tsx";

const VALID_PLANS   = ["f22digital", "genesis", "sinergy", "momentum", "horizon"];
const VALID_BILLING = ["monthly", "annual"] as const;

interface Plan {
  id: string;
  code: string;
  name: string;
  max_ruts: number | null;
  price_monthly_clp: number | null;
  price_annual_clp: number | null;
  price_uf_monthly: number | null;
  price_uf_annual: number | null;
  is_one_time_payment: boolean;
  price_one_time_clp: number | null;
  price_uf_one_time: number | null;
  min_commitment_months: number;
  promo_price_monthly_clp: number | null;
  promo_price_annual_clp: number | null;
  promo_uf_monthly: number | null;
  promo_uf_annual: number | null;
}

// ---------------------------------------------------------------------------
// Helpers de precio CLP
// ---------------------------------------------------------------------------

function effectiveClpMonthly(plan: Plan, billing: "monthly" | "annual"): number {
  if (billing === "monthly") {
    return plan.promo_price_monthly_clp ?? plan.price_monthly_clp ?? 0;
  }
  if (plan.promo_price_annual_clp != null) return plan.promo_price_annual_clp;
  return Math.round((plan.price_annual_clp ?? 0) / 12);
}

function effectiveUf(plan: Plan, billing: "monthly" | "annual"): number | null {
  if (billing === "monthly") return plan.promo_uf_monthly ?? plan.price_uf_monthly;
  return plan.promo_uf_annual ?? plan.price_uf_annual;
}

function originalClpMonthly(plan: Plan, billing: "monthly" | "annual"): number | null {
  if (billing === "monthly" && plan.promo_price_monthly_clp != null) return plan.price_monthly_clp;
  if (billing === "annual"  && plan.promo_price_annual_clp  != null) return Math.round((plan.price_annual_clp ?? 0) / 12);
  return null;
}

function formatClp(amount: number): string {
  return amount.toLocaleString("es-CL");
}

function formatUf(uf: number): string {
  return uf % 1 === 0 ? String(uf) : uf.toFixed(2).replace(".", ",");
}

// ---------------------------------------------------------------------------
// Plan icons
// ---------------------------------------------------------------------------

function PlanIcon({ name }: { name?: string }) {
  const cls   = "w-5 h-5 text-brand-700";
  const props = {
    className: cls, fill: "none", stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
  switch (name) {
    case "clipboard": return (
      <svg {...props}>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="12" y2="16" />
      </svg>
    );
    case "invoice": return (
      <svg {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    );
    case "gift": return (
      <svg {...props}>
        <polyline points="20,12 20,22 4,22 4,12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    );
    case "trending": return (
      <svg {...props}>
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
        <polyline points="17,6 23,6 23,12" />
      </svg>
    );
    case "globe": return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
    default: return <svg {...props} />;
  }
}

// ---------------------------------------------------------------------------
// Tarjeta héroe F22 Digital (pago único)
// ---------------------------------------------------------------------------

interface F22HeroCardProps {
  plan:     Plan;
  loading:  boolean;
  onSelect: () => void;
}

function F22HeroCard({ plan, loading, onSelect }: F22HeroCardProps) {
  const meta     = PLAN_META[plan.code];
  const priceClp = plan.price_one_time_clp ?? 0;
  const priceUf  = plan.price_uf_one_time;

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-brand-200 shadow-sm mb-8">
      <div className="h-1 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400" />

      <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
              <PlanIcon name={meta?.icon} />
            </div>
            <span className="font-bold text-brand-900 text-lg">{plan.name}</span>
            <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Pago único
            </span>
          </div>

          <p className="text-sm text-stone-500 mb-4 max-w-md">{meta?.description}</p>

          <ul className="flex flex-col gap-1.5">
            {(meta?.features ?? []).map((f) => (
              <li key={f} className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-stone-600">{f}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 shrink-0 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
              <span className="text-xs font-medium text-gold-600">Plazo legal: 30 de abril de 2026</span>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
          <div className="sm:text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-medium text-stone-400">CLP</span>
              <span className="text-4xl font-bold text-brand-900">{formatClp(priceClp)}</span>
            </div>
            {priceUf != null && (
              <div className="text-xs text-gold-600 font-medium mt-0.5">o {formatUf(priceUf)} UF</div>
            )}
          </div>

          <button
            onClick={onSelect}
            disabled={loading}
            className="bg-brand-700 hover:bg-brand-800 disabled:opacity-60 disabled:cursor-wait
              text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            {loading ? "Redirigiendo…" : "Declarar F22 →"}
          </button>

          <p className="text-xs text-stone-400 sm:text-right">Solo 1 declaración · Sin membresía</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OnboardingPage
// ---------------------------------------------------------------------------

export function OnboardingPage() {
  const { user }       = useAuth();
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();

  const urlPlan    = searchParams.get("plan");
  const urlBilling = searchParams.get("billing");
  const preselectedPlan =
    urlPlan && VALID_PLANS.includes(urlPlan) ? urlPlan : null;
  const preselectedBilling =
    urlBilling && VALID_BILLING.includes(urlBilling as (typeof VALID_BILLING)[number])
      ? (urlBilling as (typeof VALID_BILLING)[number])
      : null;

  const [step,            setStep]           = useState<1 | 2>(1);
  const [name,            setName]           = useState(user?.user_metadata?.full_name ?? "");
  const [billing,         setBilling]        = useState<"monthly" | "annual">(preselectedBilling ?? "annual");
  const [selectedPlan,    setSelectedPlan]   = useState<string>(preselectedPlan ?? "sinergy");
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null); // plan code being processed

  const queryClient = useQueryClient();

  // If user already has an active plan, redirect to dashboard.
  // AuthGuard uses the same ["portal"] cache — no extra fetch needed.
  const { data: portalData } = useQuery({
    queryKey: ["portal"],
    queryFn:  () => api.get<{ subscription: unknown; hasF22: boolean }>("/payments/portal", { silent: true }),
    retry:    false,
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (!portalData) return;
    if (portalData.subscription || portalData.hasF22) {
      navigate("/dashboard", { replace: true });
    }
  }, [portalData, navigate]);

  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn:  () => api.get<{ plans: Plan[] }>("/plans"),
  });
  const allPlans        = plansData?.plans ?? [];
  const f22Plan         = allPlans.find((p) => p.is_one_time_payment) ?? null;
  const membershipPlans = allPlans.filter((p) => !p.is_one_time_payment);


  async function handleStep1(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!name.trim()) return;
    await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setStep(2);
  }

  /** Pago único F22 → link de pago Flow */
  async function handleF22Checkout() {
    setCheckoutLoading("f22digital");
    try {
      const result = await api.post<{ redirectUrl: string }>("/payments/f22-checkout", {});
      window.location.assign(result.redirectUrl);
    } catch {
      setCheckoutLoading(null);
    }
  }

  /** Membresía → registro de tarjeta Flow (si no tiene) o suscripción directa */
  async function handleMembershipCheckout(planCode: string) {
    setCheckoutLoading(planCode);
    try {
      const result = await api.post<{
        requiresCard?: boolean;
        redirectUrl?: string;
        success?: boolean;
        subscriptionId?: string;
      }>("/payments/checkout", {
        planCode,
        billingCycle: billing,
        returnTo: "/dashboard",
      });

      if (result.requiresCard && result.redirectUrl) {
        window.location.assign(result.redirectUrl);
      } else if (result.success) {
        // Invalidate portal cache so AuthGuard sees the new subscription immediately
        await queryClient.invalidateQueries({ queryKey: ["portal"] });
        navigate("/dashboard", { replace: true });
      }
    } catch {
      setCheckoutLoading(null);
    }
  }

  const isAnyLoading = checkoutLoading !== null;

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Logo + progress */}
        <div className="flex items-center justify-between mb-8">
          <Logo className="h-8 w-auto" />
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 1 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}>
              1
            </div>
            <div className="w-8 h-px bg-stone-200" />
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 2 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}>
              2
            </div>
          </div>
        </div>

        {/* ── Paso 1: Nombre ── */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 max-w-sm mx-auto">
            <h1 className="text-xl font-semibold text-stone-900 mb-1">Bienvenido</h1>
            <p className="text-sm text-stone-500 mb-6">¿Cómo te llamas o cómo se llama tu estudio?</p>
            <form onSubmit={handleStep1} className="space-y-4">
              <input
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                placeholder="Juan Pérez Contador"
              />
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                  text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
              >
                Continuar
              </button>
            </form>
          </div>
        )}

        {/* ── Paso 2: Plan ── */}
        {step === 2 && (
          <div>
            {/* Título */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="h-px w-16 bg-gold-400/40" />
                <span className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase">
                  OC Global Services
                </span>
                <div className="h-px w-16 bg-brand-300/40" />
              </div>
              <h1 className="text-3xl font-bold text-brand-900 mb-2">
                Tu estructura crece{" "}
                <em className="text-brand-700 not-italic">con vos</em>
              </h1>
              <p className="text-stone-500 text-sm">Puedes cambiarlo en cualquier momento.</p>
            </div>

            {allPlans.length === 0 ? (
              <div className="text-center text-brand-400 py-8">Cargando planes…</div>
            ) : (
              <>
                {/* ── F22 Digital ── */}
                {f22Plan && (
                  <F22HeroCard
                    plan={f22Plan}
                    loading={checkoutLoading === "f22digital"}
                    onSelect={handleF22Checkout}
                  />
                )}

                {/* Separador */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-stone-50 text-xs text-stone-400 uppercase tracking-widest">
                      O elige una membresía
                    </span>
                  </div>
                </div>

                {/* Toggle facturación */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <button
                    onClick={() => setBilling("monthly")}
                    disabled={isAnyLoading}
                    className={`text-sm font-medium transition-colors ${billing === "monthly" ? "text-stone-900" : "text-stone-400"}`}
                  >
                    Mensual
                  </button>

                  <button
                    onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
                    disabled={isAnyLoading}
                    className="relative w-11 h-6 rounded-full transition-colors bg-stone-200 focus:outline-none disabled:opacity-50"
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full shadow transition-all ${
                        billing === "annual" ? "left-[22px] bg-gold-400" : "left-0.5 bg-brand-700"
                      }`}
                    />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setBilling("annual")}
                      disabled={isAnyLoading}
                      className={`text-sm font-medium transition-colors ${billing === "annual" ? "text-stone-900" : "text-stone-400"}`}
                    >
                      Anual
                    </button>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                      −17%
                    </span>
                  </div>
                </div>

                {/* Grid membresías */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {membershipPlans.map((plan) => {
                    const meta        = PLAN_META[plan.code];
                    const monthlyClp  = effectiveClpMonthly(plan, billing);
                    const originalClp = originalClpMonthly(plan, billing);
                    const uf          = effectiveUf(plan, billing);
                    const isPopular   = meta?.popular ?? false;
                    const isLoading   = checkoutLoading === plan.code;
                    const isSelected  = selectedPlan === plan.code;

                    return (
                      <div
                        key={plan.code}
                        onClick={() => setSelectedPlan(plan.code)}
                        className={`relative bg-white text-left rounded-2xl flex flex-col transition-all cursor-pointer ${
                          isSelected && isPopular  ? "border-2 border-gold-400 shadow-xl ring-2 ring-brand-300 ring-offset-1" :
                          isSelected               ? "border-2 border-brand-500 shadow-md" :
                          isPopular                ? "border-2 border-gold-300 shadow-lg" :
                                                     "border border-stone-200 shadow-sm"
                        }`}
                      >
                        {isPopular && (
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className="bg-gold-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                              Más Popular
                            </span>
                          </div>
                        )}

                        <div className="p-5 flex flex-col flex-1">
                          <div className="w-9 h-9 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center mb-4">
                            <PlanIcon name={meta?.icon} />
                          </div>

                          <div className="text-xl font-bold text-brand-900 mb-1">{plan.name}</div>

                          <div className="text-[11px] leading-snug text-stone-500 mb-5 min-h-[5.5rem]">
                            {meta?.description}
                          </div>

                          {/* Precio tachado */}
                          <div className="text-xs line-through text-stone-400 mb-0.5 h-4">
                            {originalClp != null ? `CLP ${formatClp(originalClp)} / mes` : ""}
                          </div>

                          {/* Precio principal */}
                          <div className="flex items-baseline gap-0.5 mb-0.5">
                            <span className="text-sm font-medium text-stone-500 mr-0.5">CLP</span>
                            <span className="text-4xl font-bold text-brand-900">{formatClp(monthlyClp)}</span>
                          </div>

                          {/* UF */}
                          <div className="text-xs font-medium text-gold-600 mb-4">
                            {uf != null ? `o ${formatUf(uf)} UF /mes` : "\u00a0"}
                          </div>

                          <div className="h-px bg-stone-100 mb-4" />

                          {/* RUT */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className={`w-3 h-3 rounded-full shrink-0 ${meta?.rutDot ?? "bg-stone-400"}`} />
                            <span className="text-sm font-semibold text-stone-800">{meta?.rutLabel}</span>
                          </div>

                          {/* Features */}
                          <ul className="flex-1 mb-4">
                            {(meta?.features ?? []).map((f, i, arr) => (
                              <li
                                key={f}
                                className={`flex items-start gap-2 py-2 ${i < arr.length - 1 ? "border-b border-stone-100" : ""}`}
                              >
                                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs text-stone-600">{f}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Donación */}
                          {meta?.donation != null ? (
                            <div className="text-[11px] text-gold-600 font-medium mb-4">
                              Destinamos {meta.donation}% de la facturación a causas benéficas
                            </div>
                          ) : (
                            <div className="mb-4" />
                          )}

                          {/* CTA */}
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMembershipCheckout(plan.code); }}
                            disabled={isAnyLoading}
                            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-wait ${
                              isPopular || isSelected
                                ? "bg-brand-700 hover:bg-brand-800 text-white"
                                : "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200"
                            }`}
                          >
                            {isLoading ? "Procesando…" : "Conectar"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </>
            )}

            {/* Notas */}
            <div className="text-center mb-6 space-y-1">
              <p className="text-xs text-stone-400">
                Todos los precios en CLP · Membresías: primer cobro equivale a 3 meses, luego mes a mes.
              </p>
              <p className="text-xs text-stone-400">
                Apertura a cargo de cliente – OC Global Services SpA · Santiago de Chile
              </p>
            </div>

            {/* Banner profesional */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl px-5 py-4 text-center mb-4">
              <p className="text-sm text-brand-700">
                ¿Eres profesional contable?{" "}
                <a
                  href="mailto:contacto@ocglobalservices.cl"
                  className="text-brand-800 font-semibold underline underline-offset-2 hover:text-brand-900 transition-colors"
                >
                  Consúltanos por precios especiales
                </a>
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              disabled={isAnyLoading}
              className="block mx-auto mt-2 text-sm text-stone-400 hover:text-stone-600 disabled:opacity-50 transition-colors"
            >
              Atrás
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
