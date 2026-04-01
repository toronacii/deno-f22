/**
 * OnboardingPage — wizard de 2 pasos post-registro.
 * Paso 1: confirmar nombre
 * Paso 2: elegir plan
 */

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "../components/ui/Logo.tsx";
import { PLAN_META, UF_PER_USD } from "../data/plan_meta.ts";
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
  price_monthly_usd: number;
  price_quarterly_usd: number;
  price_annual_usd: number;
  min_commitment_months: number;
}

export function OnboardingPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [searchParams] = useSearchParams();

  const urlPlan    = searchParams.get("plan");
  const urlBilling = searchParams.get("billing");
  const preselectedPlan    = urlPlan    && VALID_PLANS.includes(urlPlan)    ? urlPlan    : null;
  const preselectedBilling = urlBilling && VALID_BILLING.includes(urlBilling as typeof VALID_BILLING[number])
    ? urlBilling as typeof VALID_BILLING[number] : null;

  const [step,         setStep]         = useState<1 | 2>(1);
  const [name,         setName]         = useState(user?.user_metadata?.full_name ?? "");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(preselectedPlan ?? "sinergy");
  const [billing,      setBilling]      = useState<"monthly" | "annual">(preselectedBilling ?? "monthly");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn:  () => api.get<{ plans: Plan[] }>("/plans"),
  });
  const plans = plansData?.plans ?? [];

  // Fallback to sinergy if preselected plan not found in API data
  const effectivePlan = plans.length > 0 && selectedPlan && !plans.some((p) => p.code === selectedPlan)
    ? "sinergy"
    : selectedPlan;

  async function handleStep1(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!name.trim()) return;
    await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setStep(2);
  }

  async function handleStep2() {
    if (!selectedPlan) return;
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/register", { full_name: name });

      const result = await api.post<{
        requiresCard?: boolean;
        redirectUrl?:  string;
        success?:      boolean;
      }>("/payments/checkout", {
        planCode:    selectedPlan,
        billingCycle: billing,
        returnTo:    "/dashboard",
      });

      if (result.requiresCard && result.redirectUrl) {
        // Redirect to Flow's card registration page — don't reset loading
        window.location.href = result.redirectUrl;
        return;
      }

      if (result.success) {
        // Card already registered (returning user changing plan)
        await supabase.auth.updateUser({ data: { onboarding_completed: true } });
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  function getMonthlyPrice(plan: Plan): number {
    return billing === "monthly" ? plan.price_monthly_usd : plan.price_annual_usd / 12;
  }

  /** Devuelve [parteEntera, "99"] — e.g. 99 → ["99","99"], 119 → ["119","99"] */
  function splitPrice(price: number): [string, string] {
    return [Math.floor(price).toLocaleString("es-CL"), "99"];
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">

        {/* Logo + progress */}
        <div className="flex items-center justify-between mb-8">
          <Logo className="h-8 w-auto" />
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 1 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}>1</div>
            <div className="w-8 h-px bg-stone-200" />
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 2 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}>2</div>
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
                <span className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase">OC Global Services</span>
                <div className="h-px w-16 bg-brand-300/40" />
              </div>
              <h1 className="text-3xl font-bold text-brand-900 mb-2">Tu estructura crece <em className="text-brand-700 not-italic">con vos</em></h1>
              <p className="text-stone-500 text-sm">Puedes cambiarlo en cualquier momento.</p>
            </div>

            {/* Toggle facturación */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-stone-100 rounded-lg p-1 gap-1">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    billing === "monthly" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    billing === "annual" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  Anual
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">−17%</span>
                </button>
              </div>
            </div>

            {/* Aviso mensual */}
            {billing === "monthly" && (
              <div className="flex justify-center mb-6">
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Mínimo de contratación: 3 meses
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 px-3 py-2.5 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-600 text-center">
                {error}
              </div>
            )}

            {/* Grid de planes */}
            {plans.length === 0 ? (
              <div className="text-center text-brand-400 py-8">Cargando planes…</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {plans.map((plan) => {
                  const meta         = PLAN_META[plan.code];
                  const monthlyPrice = getMonthlyPrice(plan);
                  const [int, dec]   = splitPrice(monthlyPrice);
                  const ufPrice      = (monthlyPrice * UF_PER_USD).toFixed(2).replace(".", ",");
                  const selected     = effectivePlan === plan.code;
                  const isPopular    = meta?.popular ?? false;

                  return (
                    <button
                      key={plan.code}
                      onClick={() => setSelectedPlan(plan.code)}
                      className={`relative text-left rounded-2xl border-2 p-5 flex flex-col transition-all ${
                        selected
                          ? "bg-brand-900 border-brand-700 shadow-xl"
                          : isPopular
                            ? "bg-white border-gold-300 hover:shadow-md"
                            : "bg-white border-stone-200 hover:border-brand-300 hover:shadow-md"
                      }`}
                    >
                      {/* Badge "Más Popular" */}
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <span className="bg-gold-300 text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Más Popular
                          </span>
                        </div>
                      )}

                      {/* Ícono */}
                      <div className="text-2xl mb-3">{meta?.icon}</div>

                      {/* Nombre */}
                      <div className={`text-xl font-bold mb-1 ${selected ? "text-white" : "text-stone-900"}`}>{plan.name}</div>

                      {/* Subtítulo donación */}
                      {meta?.donation != null ? (
                        <div className={`text-[11px] leading-snug mb-3 ${selected ? "text-gold-300/80" : "text-stone-400"}`}>
                          Destinamos {meta.donation}% de la facturación a causas benéficas
                        </div>
                      ) : (
                        <div className="mb-3" />
                      )}

                      {/* Precio */}
                      <div className="flex items-baseline gap-0.5 mb-0.5">
                        <span className={`text-xs font-semibold mr-1 ${selected ? "text-brand-400" : "text-stone-400"}`}>USD</span>
                        <span className={`text-3xl font-bold ${selected ? "text-white" : "text-brand-900"}`}>{int}</span>
                        <span className={`text-base font-bold ${selected ? "text-white" : "text-brand-900"}`}>.{dec}</span>
                        <span className={`text-xs ml-0.5 ${selected ? "text-brand-400" : "text-stone-400"}`}>/mes</span>
                      </div>
                      <div className={`text-xs mb-4 ${selected ? "text-brand-400" : "text-stone-400"}`}>o {ufPrice} UF /mes</div>

                      {/* Divider */}
                      <div className={`h-px mb-4 ${selected ? "bg-brand-700/50" : "bg-stone-100"}`} />

                      {/* Indicador de RUTs */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-0.5">
                          {(meta?.rutSquares ?? []).map((sq, i) => (
                            <div key={i} className={`w-3 h-3 rounded-sm ${sq}`} />
                          ))}
                        </div>
                        <span className={`text-sm font-semibold ${selected ? "text-white" : "text-stone-800"}`}>{meta?.rutLabel}</span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 flex-1 mb-5">
                        {(meta?.features ?? []).map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <svg className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${selected ? "text-gold-300" : "text-brand-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className={`text-xs ${selected ? "text-brand-200" : "text-stone-600"}`}>{f}</span>
                          </li>
                        ))}
                      </ul>

                    </button>
                  );
                })}
              </div>
            )}

            {/* Notas de precios */}
            <div className="text-center mb-6 space-y-1">
              <p className="text-xs text-stone-400">
                Todos los precios en USD · Equivalencia: 1 UF = 38,500 CLP, actualizada a mayo 2024 · Plan anual: 17% de descuento sobre el precio mensual
              </p>
              <p className="text-xs text-stone-400">
                Apertura a cargo de cliente – OC Global Services SpA · Santiago de Chile
              </p>
            </div>

            {/* Botón principal */}
            <div className="flex justify-center mb-5">
              <button
                onClick={handleStep2}
                disabled={!selectedPlan || loading}
                className="bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                  text-white font-bold px-10 py-3 rounded-xl text-sm transition-colors"
              >
                {loading ? "Redirigiendo al pago…" : "Comenzar con este plan"}
              </button>
            </div>

            {/* Banner profesional */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl px-5 py-4 text-center mb-4">
              <p className="text-sm text-brand-700">
                ¿Eres profesional contable?{" "}
                <a href="mailto:contacto@ocglobalservices.cl" className="text-brand-800 font-semibold underline underline-offset-2 hover:text-brand-900 transition-colors">
                  Consúltanos por precios especiales
                </a>
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="block mx-auto mt-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
            >
              Atrás
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
