/**
 * AccountPage — "Mi cuenta"
 * Permite cambiar nombre, contraseña y plan de membresía.
 */

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../lib/auth_context.tsx";
import { api } from "../lib/api.ts";
import { supabase } from "../lib/supabase.ts";
import { AccountTopBar } from "../components/layout/AccountTopBar.tsx";

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

interface DashboardData {
  subscription: {
    plan_code:     string;
    plan_name:     string;
    max_ruts:      number | null;
    billing_cycle: string;
    status:        string;
  } | null;
  rut_usage: { active: number; max: number | null };
}

const BILLING_LABELS: Record<string, string> = {
  monthly:   "Mensual",
  quarterly: "Trimestral",
  annual:    "Anual",
};

const PLAN_DESCRIPTIONS: Record<string, string> = {
  nucleo:       "Para contadores independientes.",
  estructura:   "Para estudios contables pequeños.",
  arquitectura: "Para empresas contables medianas.",
  expansion:    "Para grandes estudios tributarios.",
};

export function AccountPage() {
  const { user }     = useAuth();
  const navigate     = useNavigate();
  const queryClient  = useQueryClient();

  /* ── Datos remotos ── */
  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn:  () => api.get<DashboardData>("/dashboard"),
  });
  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn:  () => api.get<{ plans: Plan[] }>("/plans"),
  });

  const currentSub   = dashboard?.subscription;
  const plans        = plansData?.plans ?? [];

  /* ── Nombre ── */
  const [name,       setName]       = useState(user?.user_metadata?.full_name ?? "");
  const [nameSaving, setNameSaving] = useState(false);
  const [nameMsg,    setNameMsg]    = useState<{ ok: boolean; text: string } | null>(null);

  async function handleNameSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setNameSaving(true);
    setNameMsg(null);
    try {
      await api.post("/auth/register", { full_name: name.trim() });
      await supabase.auth.updateUser({ data: { full_name: name.trim() } });
      setNameMsg({ ok: true, text: "Nombre actualizado." });
    } catch (err) {
      setNameMsg({ ok: false, text: (err as Error).message });
    } finally {
      setNameSaving(false);
    }
  }

  /* ── Contraseña ── */
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd,     setNewPwd]     = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdSaving,  setPwdSaving]  = useState(false);
  const [pwdMsg,     setPwdMsg]     = useState<{ ok: boolean; text: string } | null>(null);

  async function handlePwdSubmit(e: FormEvent) {
    e.preventDefault();
    if (newPwd.length < 8) {
      setPwdMsg({ ok: false, text: "La contraseña debe tener al menos 8 caracteres." });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ ok: false, text: "Las contraseñas no coinciden." });
      return;
    }
    setPwdSaving(true);
    setPwdMsg(null);

    // Re-autenticar con contraseña actual antes de cambiarla
    const email = user?.email ?? "";
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: currentPwd });
    if (signInError) {
      setPwdMsg({ ok: false, text: "La contraseña actual es incorrecta." });
      setPwdSaving(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPwd });
    if (error) {
      setPwdMsg({ ok: false, text: error.message });
    } else {
      setPwdMsg({ ok: true, text: "Contraseña actualizada." });
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
    }
    setPwdSaving(false);
  }

  /* ── Membresía ── */
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billing,      setBilling]      = useState<"monthly" | "quarterly" | "annual">(
    (currentSub?.billing_cycle as "monthly" | "quarterly" | "annual") ?? "monthly"
  );
  const [planSaving,   setPlanSaving]   = useState(false);
  const [planMsg,      setPlanMsg]      = useState<{ ok: boolean; text: string } | null>(null);

  const effectivePlan    = selectedPlan ?? currentSub?.plan_code ?? null;
  const planChanged      = selectedPlan !== null && (
    selectedPlan !== currentSub?.plan_code || billing !== currentSub?.billing_cycle
  );
  const billingChanged   = selectedPlan === null && billing !== currentSub?.billing_cycle;
  const canSavePlan      = planChanged || billingChanged;

  function getPriceForBilling(plan: Plan): number {
    if (billing === "monthly")   return plan.price_monthly_usd;
    if (billing === "quarterly") return plan.price_quarterly_usd / 3;
    return plan.price_annual_usd / 12;
  }

  async function handlePlanSave() {
    const code = selectedPlan ?? currentSub?.plan_code;
    if (!code) return;
    setPlanSaving(true);
    setPlanMsg(null);
    try {
      await api.post("/auth/select-plan", { plan_code: code, billing_cycle: billing });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setSelectedPlan(null);
      setPlanMsg({ ok: true, text: "Plan actualizado correctamente." });
    } catch (err) {
      setPlanMsg({ ok: false, text: (err as Error).message });
    } finally {
      setPlanSaving(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex flex-col">
      <AccountTopBar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <h1 className="text-xl font-semibold text-stone-900 mb-6">Mi cuenta</h1>

        {/* ── Información personal ── */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 mb-4">
          <h2 className="text-base font-semibold text-stone-900 mb-4">Información personal</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-500 mb-1">Correo electrónico</label>
            <div className="text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5">
              {user?.email}
            </div>
          </div>

          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Nombre completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => { setName(e.target.value); setNameMsg(null); }}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
              />
            </div>
            {nameMsg && (
              <p className={`text-sm ${nameMsg.ok ? "text-success-600" : "text-danger-600"}`}>
                {nameMsg.ok ? "✓ " : "✗ "}{nameMsg.text}
              </p>
            )}
            <button
              type="submit"
              disabled={nameSaving || !name.trim()}
              className="bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
            >
              {nameSaving ? "Guardando…" : "Guardar nombre"}
            </button>
          </form>
        </section>

        {/* ── Membresía ── */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-base font-semibold text-stone-900">Membresía</h2>
            {currentSub && (
              <div className="text-right text-xs text-stone-400">
                <span className="font-medium text-stone-600">{currentSub.plan_name}</span>
                {" · "}
                {BILLING_LABELS[currentSub.billing_cycle] ?? currentSub.billing_cycle}
                {" · "}
                {dashboard?.rut_usage.active ?? 0}
                {currentSub.max_ruts !== null ? ` / ${currentSub.max_ruts}` : ""} RUTs activos
              </div>
            )}
          </div>

          {/* Billing cycle toggle */}
          <div className="flex mb-5">
            <div className="inline-flex bg-stone-100 rounded-lg p-1 gap-1">
              {(["monthly", "quarterly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => { setBilling(b); setPlanMsg(null); }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    billing === b
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  {BILLING_LABELS[b]}
                  {b === "quarterly" && <span className="ml-1 text-success-600">−10%</span>}
                  {b === "annual"    && <span className="ml-1 text-success-600">−20%</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Plan cards */}
          {plans.length === 0 ? (
            <div className="text-sm text-stone-400 py-4">Cargando planes…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {plans.map((plan) => {
                const price      = getPriceForBilling(plan);
                const isCurrent  = plan.code === currentSub?.plan_code && selectedPlan === null;
                const isSelected = effectivePlan === plan.code;
                const activeRuts = dashboard?.rut_usage.active ?? 0;
                const blocked    = plan.max_ruts !== null && plan.max_ruts < activeRuts;
                const excess     = blocked ? activeRuts - (plan.max_ruts ?? 0) : 0;

                return (
                  <button
                    key={plan.code}
                    disabled={blocked}
                    onClick={() => {
                      setSelectedPlan(plan.code === currentSub?.plan_code ? null : plan.code);
                      setPlanMsg(null);
                    }}
                    title={blocked
                      ? `Debes desactivar ${excess} contribuyente${excess > 1 ? "s" : ""} antes de bajar a este plan`
                      : undefined
                    }
                    className={`text-left rounded-xl border-2 p-4 transition-all ${
                      blocked
                        ? "border-stone-100 bg-stone-50 opacity-50 cursor-not-allowed"
                        : isSelected
                          ? "border-brand-600 bg-brand-50"
                          : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-semibold text-stone-900 text-sm">{plan.name}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-medium bg-brand-100 text-brand-700 rounded-full px-2 py-0.5 shrink-0 ml-2">
                          Plan actual
                        </span>
                      )}
                      {blocked && (
                        <span className="text-[10px] font-medium bg-stone-100 text-stone-400 rounded-full px-2 py-0.5 shrink-0 ml-2">
                          No disponible
                        </span>
                      )}
                    </div>
                    <div className="text-xl font-bold text-brand-700 mb-0.5">
                      ${Math.round(price).toLocaleString("es-CL")}
                      <span className="text-xs font-normal text-stone-400">/mes USD</span>
                    </div>
                    <div className="text-xs text-stone-500 mb-2">
                      {PLAN_DESCRIPTIONS[plan.code]}
                    </div>
                    <div className={`text-xs font-medium ${isSelected ? "text-brand-700" : "text-stone-400"}`}>
                      {plan.max_ruts === null ? "RUTs ilimitados" : `${plan.max_ruts} RUT${plan.max_ruts > 1 ? "s" : ""}`}
                    </div>
                    {blocked && (
                      <p className="text-[11px] text-stone-400 mt-2 leading-snug">
                        Desactiva {excess} contribuyente{excess > 1 ? "s" : ""} primero.
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Aviso de downgrade bloqueado */}
          {plans.some(p => p.max_ruts !== null && p.max_ruts < (dashboard?.rut_usage.active ?? 0)) && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm text-amber-800">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Algunos planes requieren menos RUTs de los que tienes activos.{" "}
                <a href="/dashboard" className="font-medium underline underline-offset-2 hover:text-amber-900">
                  Gestiona tus contribuyentes
                </a>{" "}
                para habilitar esos planes.
              </span>
            </div>
          )}

          {planMsg && (
            <p className={`text-sm mb-3 ${planMsg.ok ? "text-success-600" : "text-danger-600"}`}>
              {planMsg.ok ? "✓ " : "✗ "}{planMsg.text}
            </p>
          )}

          <button
            onClick={handlePlanSave}
            disabled={!canSavePlan || planSaving}
            className="bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
              text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {planSaving ? "Actualizando…" : "Cambiar plan"}
          </button>
          {!canSavePlan && (
            <p className="text-xs text-stone-400 mt-2">
              Selecciona un plan distinto o cambia el ciclo de facturación para continuar.
            </p>
          )}
        </section>

        {/* ── Seguridad ── */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-4">Seguridad</h2>

          <form onSubmit={handlePwdSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Contraseña actual</label>
              <input
                type="password"
                required
                value={currentPwd}
                onChange={(e) => { setCurrentPwd(e.target.value); setPwdMsg(null); }}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                placeholder="Tu contraseña actual"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Nueva contraseña</label>
              <input
                type="password"
                minLength={8}
                required
                value={newPwd}
                onChange={(e) => { setNewPwd(e.target.value); setPwdMsg(null); }}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Confirmar contraseña</label>
              <input
                type="password"
                required
                value={confirmPwd}
                onChange={(e) => { setConfirmPwd(e.target.value); setPwdMsg(null); }}
                className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                placeholder="Repetir contraseña"
              />
            </div>
            {pwdMsg && (
              <p className={`text-sm ${pwdMsg.ok ? "text-success-600" : "text-danger-600"}`}>
                {pwdMsg.ok ? "✓ " : "✗ "}{pwdMsg.text}
              </p>
            )}
            <button
              type="submit"
              disabled={pwdSaving || !currentPwd || !newPwd || !confirmPwd}
              className="bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
            >
              {pwdSaving ? "Actualizando…" : "Cambiar contraseña"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
