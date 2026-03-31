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
import { PLAN_META, UF_PER_USD } from "../data/plan_meta.ts";

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
  monthly: "Mensual",
  annual:  "Anual",
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

  const currentSub = dashboard?.subscription;
  const plans      = plansData?.plans ?? [];

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
      setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
    }
    setPwdSaving(false);
  }

  /* ── Membresía ── */
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billing,      setBilling]      = useState<"monthly" | "annual">(
    currentSub?.billing_cycle === "annual" ? "annual" : "monthly"
  );
  const [planSaving, setPlanSaving] = useState(false);
  const [planMsg,    setPlanMsg]    = useState<{ ok: boolean; text: string } | null>(null);

  const effectivePlan  = selectedPlan ?? currentSub?.plan_code ?? null;
  const planChanged    = selectedPlan !== null && (selectedPlan !== currentSub?.plan_code || billing !== currentSub?.billing_cycle);
  const billingChanged = selectedPlan === null && billing !== currentSub?.billing_cycle;
  const canSavePlan    = planChanged || billingChanged;

  function getMonthlyPrice(plan: Plan): number {
    return billing === "monthly" ? plan.price_monthly_usd : plan.price_annual_usd / 12;
  }

  function splitPrice(price: number): [string, string] {
    return [Math.floor(price).toLocaleString("es-CL"), "99"];
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

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-8">
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
          <div className="flex items-start justify-between mb-5">
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

          {/* Billing toggle */}
          <div className="flex mb-5">
            <div className="inline-flex bg-stone-100 rounded-lg p-1 gap-1">
              <button
                onClick={() => { setBilling("monthly"); setPlanMsg(null); }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billing === "monthly" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => { setBilling("annual"); setPlanMsg(null); }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  billing === "annual" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Anual
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">−17%</span>
              </button>
            </div>
          </div>

          {/* Monthly notice */}
          {billing === "monthly" && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5 inline-block">
              Mínimo de contratación: 3 meses
            </p>
          )}

          {/* Downgrade warning */}
          {plans.some(p => p.max_ruts !== null && p.max_ruts < (dashboard?.rut_usage.active ?? 0)) && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Algunos planes requieren menos RUTs de los que tienes activos.{" "}
                <a href="/dashboard" className="font-medium underline underline-offset-2 hover:text-amber-200">
                  Gestiona tus contribuyentes
                </a>{" "}
                para habilitar esos planes.
              </span>
            </div>
          )}

          {/* Plan cards */}
          {plans.length === 0 ? (
            <div className="text-sm text-brand-400 py-4">Cargando planes…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-5">
              {plans.map((plan) => {
                const meta         = PLAN_META[plan.code];
                const monthlyPrice = getMonthlyPrice(plan);
                const [int, dec]   = splitPrice(monthlyPrice);
                const ufPrice      = (monthlyPrice * UF_PER_USD).toFixed(2).replace(".", ",");
                const isCurrent    = plan.code === currentSub?.plan_code && selectedPlan === null;
                const isSelected   = effectivePlan === plan.code;
                const isPopular    = meta?.popular ?? false;
                const activeRuts   = dashboard?.rut_usage.active ?? 0;
                const blocked      = plan.max_ruts !== null && plan.max_ruts < activeRuts;
                const excess       = blocked ? activeRuts - (plan.max_ruts ?? 0) : 0;

                return (
                  <button
                    key={plan.code}
                    disabled={blocked}
                    onClick={() => {
                      setSelectedPlan(plan.code === currentSub?.plan_code ? null : plan.code);
                      setPlanMsg(null);
                    }}
                    title={blocked ? `Desactiva ${excess} contribuyente${excess > 1 ? "s" : ""} antes de bajar a este plan` : undefined}
                    className={`relative text-left rounded-2xl border-2 p-5 flex flex-col transition-all ${
                      blocked
                        ? "opacity-40 cursor-not-allowed bg-stone-50 border-stone-100"
                        : isSelected
                          ? "bg-brand-900 border-brand-700 shadow-xl"
                          : isPopular
                            ? "bg-white border-gold-300 hover:shadow-md"
                            : "bg-white border-stone-200 hover:border-brand-300 hover:shadow-md"
                    }`}
                  >
                    {/* Popular badge */}
                    {isPopular && !blocked && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="bg-gold-300 text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Más Popular
                        </span>
                      </div>
                    )}

                    {/* Current badge */}
                    {isCurrent && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-brand-700 text-brand-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Actual
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="text-2xl mb-3">{meta?.icon}</div>

                    {/* Name */}
                    <div className={`text-xl font-bold mb-1 ${isSelected ? "text-white" : "text-stone-900"}`}>{plan.name}</div>

                    {/* Donation subtitle */}
                    {meta?.donation != null ? (
                      <div className={`text-[11px] leading-snug mb-3 ${isSelected ? "text-gold-300/80" : "text-stone-400"}`}>
                        Destinamos {meta.donation}% de la facturación a causas benéficas
                      </div>
                    ) : (
                      <div className="mb-3" />
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-0.5 mb-0.5">
                      <span className={`text-xs font-semibold mr-1 ${isSelected ? "text-brand-400" : "text-stone-400"}`}>USD</span>
                      <span className={`text-3xl font-bold ${isSelected ? "text-white" : "text-brand-900"}`}>{int}</span>
                      <span className={`text-base font-bold ${isSelected ? "text-white" : "text-brand-900"}`}>.{dec}</span>
                      <span className={`text-xs ml-0.5 ${isSelected ? "text-brand-400" : "text-stone-400"}`}>/mes</span>
                    </div>
                    <div className={`text-xs mb-4 ${isSelected ? "text-brand-400" : "text-stone-400"}`}>o {ufPrice} UF /mes</div>

                    {/* Divider */}
                    <div className={`h-px mb-4 ${isSelected ? "bg-brand-700/50" : "bg-stone-100"}`} />

                    {/* RUT indicator */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {(meta?.rutSquares ?? []).map((sq, i) => (
                          <div key={i} className={`w-3 h-3 rounded-sm ${sq}`} />
                        ))}
                      </div>
                      <span className={`text-sm font-semibold ${isSelected ? "text-white" : "text-stone-800"}`}>{meta?.rutLabel}</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 flex-1 mb-4">
                      {(meta?.features ?? []).map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <svg className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSelected ? "text-gold-300" : "text-brand-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-xs ${isSelected ? "text-brand-200" : "text-stone-600"}`}>{f}</span>
                        </li>
                      ))}
                      {blocked && (
                        <li className="text-[11px] text-amber-600 mt-1">
                          Desactiva {excess} contribuyente{excess > 1 ? "s" : ""} primero.
                        </li>
                      )}
                    </ul>

                  </button>
                );
              })}
            </div>
          )}

          {/* Notes */}
          <div className="text-center mb-5 space-y-1">
            <p className="text-xs text-stone-400">
              Todos los precios en USD · Equivalencia: 1 UF = 38,500 CLP, actualizada a mayo 2024 · Plan anual: 17% de descuento sobre el precio mensual
            </p>
            <p className="text-xs text-stone-400">
              Apertura a cargo de cliente – OC Global Services SpA · Santiago de Chile
            </p>
          </div>

          {planMsg && (
            <p className={`text-sm mb-3 ${planMsg.ok ? "text-success-600" : "text-danger-600"}`}>
              {planMsg.ok ? "✓ " : "✗ "}{planMsg.text}
            </p>
          )}

          <button
            onClick={handlePlanSave}
            disabled={!canSavePlan || planSaving}
            className="bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
              text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            {planSaving ? "Actualizando…" : "Cambiar plan"}
          </button>
          {!canSavePlan && (
            <p className="text-xs text-stone-400 mt-2">
              Selecciona un plan distinto o cambia el ciclo de facturación para continuar.
            </p>
          )}

          {/* Banner profesional */}
          <div className="bg-brand-50 border border-brand-100 rounded-xl px-5 py-4 text-center mt-5">
            <p className="text-sm text-brand-700">
              ¿Eres profesional contable?{" "}
              <a href="mailto:contacto@ocglobalservices.cl" className="text-brand-800 font-semibold underline underline-offset-2 hover:text-brand-900 transition-colors">
                Consúltanos por precios especiales
              </a>
            </p>
          </div>
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
