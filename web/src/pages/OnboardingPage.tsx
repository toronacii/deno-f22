/**
 * OnboardingPage — wizard de 2 pasos post-registro.
 * Paso 1: confirmar nombre
 * Paso 2: elegir plan
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.ts";
import { supabase } from "../lib/supabase.ts";
import { useAuth } from "../lib/auth_context.tsx";

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

const PLAN_DESCRIPTIONS: Record<string, string> = {
  nucleo:       "Para contadores independientes.",
  estructura:   "Para estudios contables pequeños.",
  arquitectura: "Para empresas contables medianas.",
  expansion:    "Para grandes estudios tributarios.",
};

const BILLING_LABELS: Record<string, string> = {
  monthly:   "Mensual",
  quarterly: "Trimestral (10% dcto.)",
  annual:    "Anual (20% dcto.)",
};

export function OnboardingPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();

  const [step,         setStep]         = useState<1 | 2>(1);
  const [name,         setName]         = useState(user?.user_metadata?.full_name ?? "");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billing,      setBilling]      = useState<"monthly" | "quarterly" | "annual">("monthly");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn:  () => api.get<{ plans: Plan[] }>("/plans"),
  });
  const plans = plansData?.plans ?? [];

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    // Update display name in Supabase metadata
    await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setStep(2);
  }

  async function handleStep2() {
    if (!selectedPlan) return;
    setLoading(true);
    setError(null);

    try {
      // Upsert profile via API
      await api.post("/auth/register", { full_name: name });
      // Select plan
      await api.post("/auth/select-plan", {
        plan_code:    selectedPlan,
        billing_cycle: billing,
      });
      // Mark onboarding complete in Supabase metadata
      await supabase.auth.updateUser({
        data: { onboarding_completed: true },
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  function getPriceForBilling(plan: Plan): number {
    if (billing === "monthly")   return plan.price_monthly_usd;
    if (billing === "quarterly") return plan.price_quarterly_usd / 3;
    return plan.price_annual_usd / 12;
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo + progress */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">SII</span>
            </div>
            <span className="font-semibold text-stone-900">Plataforma Tributaria</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-400">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 1 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}>1</div>
            <div className="w-8 h-px bg-stone-200" />
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 2 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}>2</div>
          </div>
        </div>

        {/* Step 1: Nombre */}
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

        {/* Step 2: Plan */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-stone-900 mb-2">Elige tu plan</h1>
              <p className="text-stone-500">Puedes cambiarlo en cualquier momento.</p>
            </div>

            {/* Billing toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-stone-100 rounded-lg p-1 gap-1">
                {(["monthly", "quarterly", "annual"] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBilling(b)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      billing === b
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    {BILLING_LABELS[b]}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 px-3 py-2.5 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-600 text-center">
                {error}
              </div>
            )}

            {/* Plans grid */}
            {plans.length === 0 ? (
              <div className="text-center text-stone-400 py-8">Cargando planes…</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {plans.map((plan) => {
                  const price    = getPriceForBilling(plan);
                  const selected = selectedPlan === plan.code;
                  return (
                    <button
                      key={plan.code}
                      onClick={() => setSelectedPlan(plan.code)}
                      className={`text-left rounded-xl border-2 p-5 transition-all ${
                        selected
                          ? "border-brand-600 bg-brand-50 shadow-md"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <div className="font-semibold text-stone-900 mb-1">{plan.name}</div>
                      <div className="text-2xl font-bold text-brand-700 mb-0.5">
                        ${Math.round(price).toLocaleString("es-CL")}
                        <span className="text-sm font-normal text-stone-400">/mes</span>
                      </div>
                      <div className="text-xs text-stone-500 mb-3">USD</div>
                      <div className="text-xs text-stone-600 mb-3">
                        {PLAN_DESCRIPTIONS[plan.code]}
                      </div>
                      <div className={`text-xs font-medium ${selected ? "text-brand-700" : "text-stone-500"}`}>
                        {plan.max_ruts === null
                          ? "RUTs ilimitados"
                          : `${plan.max_ruts} RUT${plan.max_ruts > 1 ? "s" : ""}`}
                      </div>
                      {plan.min_commitment_months > 1 && (
                        <div className="text-[11px] text-stone-400 mt-1">
                          Mín. {plan.min_commitment_months} meses
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleStep2}
                disabled={!selectedPlan || loading}
                className="bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                  text-white font-medium px-8 py-3 rounded-xl text-sm transition-colors"
              >
                {loading ? "Configurando…" : "Comenzar con este plan"}
              </button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="block mx-auto mt-4 text-sm text-stone-400 hover:text-stone-600"
            >
              Atrás
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
