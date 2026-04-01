/**
 * OnboardingPage — wizard de 2 pasos post-registro.
 * Paso 1: confirmar nombre
 * Paso 2: elegir plan → abre modal de intención de pago
 */

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "../components/ui/Logo.tsx";
import { PLAN_META, UF_PER_USD } from "../data/plan_meta.ts";
import { api } from "../lib/api.ts";
import { supabase } from "../lib/supabase.ts";
import { useAuth } from "../lib/auth_context.tsx";

const VALID_PLANS = ["f22digital", "genesis", "sinergy", "momentum", "horizon"];
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
  promo_price_monthly_usd: number | null;
  promo_price_annual_usd: number | null;
}

// ---------------------------------------------------------------------------
// Modal de intención de pago
// ---------------------------------------------------------------------------

interface ContactIntentModalProps {
  plan: Plan;
  billing: "monthly" | "annual";
  name: string;
  onClose: () => void;
  onSuccess: () => void;
}

function ContactIntentModal({
  plan,
  billing,
  name,
  onClose,
  onSuccess,
}: ContactIntentModalProps) {
  const cycleLabel = billing === "monthly" ? "mensual" : "anual";
  const defaultMsg = `Hola, soy ${name} y quiero contratar el plan ${plan.name} (${cycleLabel}). Me gustaría coordinar el pago con el equipo.`;

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(defaultMsg);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await api.post("/payments/contact-intent", {
        planCode: plan.code,
        planName: plan.name,
        billingCycle: billing,
        phone: phone.trim(),
        message,
      });
      onSuccess();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-2xl p-8">
        {/* Plan badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center">
            <PlanIcon name={PLAN_META[plan.code]?.icon} />
          </div>
          <div>
            <div className="font-semibold text-stone-900">{plan.name}</div>
            <div className="text-xs text-stone-400 capitalize">
              {cycleLabel}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-stone-900 mb-1">
          Coordinar pago con el equipo
        </h2>
        <p className="text-sm text-stone-500 mb-6">
          Déjanos tu teléfono y te contactamos para completar tu suscripción.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre (solo lectura) */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Nombre
            </label>
            <div className="w-full border border-stone-100 bg-stone-50 rounded-lg px-3 py-2.5 text-sm text-stone-500">
              {name}
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Teléfono <span className="text-danger-500">*</span>
            </label>
            <input
              type="tel"
              required
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+56 9 1234 5678"
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Mensaje
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm resize-none
                focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
            />
          </div>

          {error && (
            <div className="px-3 py-2.5 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!phone.trim() || loading}
            className="w-full bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
              text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? "Enviando…" : "Solicitar contacto"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-stone-400 hover:text-stone-600 transition-colors py-1"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Plan icons (SVG inline, Feather-style, 20×20)
// ---------------------------------------------------------------------------

function PlanIcon({ name }: { name?: string }) {
  const cls = "w-5 h-5 text-brand-700";
  const props = { className: cls, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };

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
// OnboardingPage
// ---------------------------------------------------------------------------

export function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlPlan = searchParams.get("plan");
  const urlBilling = searchParams.get("billing");
  const preselectedPlan =
    urlPlan && VALID_PLANS.includes(urlPlan) ? urlPlan : null;
  const preselectedBilling =
    urlBilling &&
    VALID_BILLING.includes(urlBilling as (typeof VALID_BILLING)[number])
      ? (urlBilling as (typeof VALID_BILLING)[number])
      : null;

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState(user?.user_metadata?.full_name ?? "");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    preselectedPlan ?? "sinergy",
  );
  const [billing, setBilling] = useState<"monthly" | "annual">(
    preselectedBilling ?? "annual",
  );
  const [showModal, setShowModal] = useState(false);

  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn: () => api.get<{ plans: Plan[] }>("/plans"),
  });
  const plans = plansData?.plans ?? [];

  const effectivePlan =
    plans.length > 0 &&
    selectedPlan &&
    !plans.some((p) => p.code === selectedPlan)
      ? "sinergy"
      : selectedPlan;

  const activePlan = plans.find((p) => p.code === effectivePlan) ?? null;

  async function handleStep1(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!name.trim()) return;
    await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setStep(2);
  }

  async function handleIntentSuccess() {
    await supabase.auth.updateUser({ data: { onboarding_completed: true } });
    navigate("/dashboard", { replace: true });
  }

  function getMonthlyPrice(plan: Plan): number {
    if (billing === "monthly") {
      return plan.promo_price_monthly_usd ?? plan.price_monthly_usd;
    }
    return plan.promo_price_annual_usd ?? plan.price_annual_usd / 12;
  }

  function getOriginalMonthlyPrice(plan: Plan): number | null {
    if (billing === "monthly" && plan.promo_price_monthly_usd != null) {
      return plan.price_monthly_usd;
    }
    if (billing === "annual" && plan.promo_price_annual_usd != null) {
      return plan.price_annual_usd / 12;
    }
    return null;
  }

  function splitPrice(price: number): [string, string] {
    const cents = Math.round(price * 100) % 100;
    return [
      Math.floor(price).toLocaleString("es-CL"),
      cents.toString().padStart(2, "0"),
    ];
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Logo + progress */}
        <div className="flex items-center justify-between mb-8">
          <Logo className="h-8 w-auto" />
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 1 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}
            >
              1
            </div>
            <div className="w-8 h-px bg-stone-200" />
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${step >= 2 ? "bg-brand-700 text-white" : "bg-stone-200 text-stone-500"}`}
            >
              2
            </div>
          </div>
        </div>

        {/* ── Paso 1: Nombre ── */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 max-w-sm mx-auto">
            <h1 className="text-xl font-semibold text-stone-900 mb-1">
              Bienvenido
            </h1>
            <p className="text-sm text-stone-500 mb-6">
              ¿Cómo te llamas o cómo se llama tu estudio?
            </p>
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
              <p className="text-stone-500 text-sm">
                Puedes cambiarlo en cualquier momento.
              </p>
            </div>

            {/* Toggle facturación */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <button
                onClick={() => setBilling("monthly")}
                className={`text-sm font-medium transition-colors ${
                  billing === "monthly" ? "text-stone-900" : "text-stone-400"
                }`}
              >
                Mensual
              </button>

              <button
                onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
                className="relative w-11 h-6 rounded-full transition-colors bg-stone-200 focus:outline-none"
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full shadow transition-all ${
                    billing === "annual"
                      ? "left-[22px] bg-gold-400"
                      : "left-0.5 bg-brand-700"
                  }`}
                />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setBilling("annual")}
                  className={`text-sm font-medium transition-colors ${
                    billing === "annual" ? "text-stone-900" : "text-stone-400"
                  }`}
                >
                  Anual
                </button>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                  −17%
                </span>
              </div>
            </div>

            {/* Grid de planes */}
            {plans.length === 0 ? (
              <div className="text-center text-brand-400 py-8">Cargando planes…</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {plans.map((plan) => {
                  const meta         = PLAN_META[plan.code];
                  const monthlyPrice = getMonthlyPrice(plan);
                  const originalPrice = getOriginalMonthlyPrice(plan);
                  const [int, dec]   = splitPrice(monthlyPrice);
                  const ufPrice      = (monthlyPrice * UF_PER_USD).toFixed(2).replace(".", ",");
                  const isPopular    = meta?.popular ?? false;

                  return (
                    <div
                      key={plan.code}
                      className={`relative bg-white text-left rounded-2xl flex flex-col transition-all ${
                        isPopular
                          ? "border-2 border-gold-300 shadow-lg"
                          : "border border-stone-200 shadow-sm"
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
                        {/* Icon */}
                        <div className="w-9 h-9 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center mb-4">
                          <PlanIcon name={meta?.icon} />
                        </div>

                        {/* Name */}
                        <div className="text-xl font-bold text-brand-900 mb-1">{plan.name}</div>

                        {/* Description — min-h keeps prices aligned across all cards */}
                        <div className="text-[11px] leading-snug text-stone-500 mb-5 min-h-[5.5rem]">{meta?.description}</div>

                        {/* Strikethrough price — always reserves space so prices align */}
                        <div className="text-xs line-through text-stone-400 mb-0.5 h-4">
                          {originalPrice != null
                            ? `USD ${Math.floor(originalPrice).toLocaleString("es-CL")} / mes`
                            : ""}
                        </div>

                        {/* Main price */}
                        <div className="flex items-baseline gap-0.5 mb-0.5">
                          <span className="text-sm font-medium text-stone-500 mr-0.5">USD</span>
                          <span className="text-4xl font-bold text-brand-900">{int}</span>
                          {dec !== "00" && (
                            <span className="text-xl font-bold text-brand-900">.{dec}</span>
                          )}
                          <span className="text-sm text-stone-400 ml-0.5">/mes</span>
                        </div>

                        {/* UF price */}
                        <div className="text-xs font-medium text-gold-600 mb-4">
                          o {ufPrice} UF /mes
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

                        {/* Donation */}
                        {meta?.donation != null ? (
                          <div className="text-[11px] text-gold-600 font-medium mb-4">
                            Destinamos {meta.donation}% de la facturación a causas benéficas
                          </div>
                        ) : (
                          <div className="mb-4" />
                        )}

                        {/* Conectar */}
                        <button
                          onClick={() => { setSelectedPlan(plan.code); setShowModal(true); }}
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isPopular
                              ? "bg-gold-400 hover:bg-gold-500 text-white"
                              : "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200"
                          }`}
                        >
                          Conectar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Notas de precios */}
            <div className="text-center mb-6 space-y-1">
              <p className="text-xs text-stone-400">
                Todos los precios en USD • Plan anual: 17% de descuento sobre el
                precio mensual.{" "}
              </p>
              <p className="text-xs text-stone-400">
                Apertura a cargo de cliente – OC Global Services SpA · Santiago
                de Chile
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
              className="block mx-auto mt-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
            >
              Atrás
            </button>
          </div>
        )}
      </div>

      {/* Modal de intención de pago */}
      {showModal && activePlan && (
        <ContactIntentModal
          plan={activePlan}
          billing={billing}
          name={name}
          onClose={() => setShowModal(false)}
          onSuccess={handleIntentSuccess}
        />
      )}
    </div>
  );
}
