/**
 * AccountPage — "Mi cuenta"
 * Permite cambiar nombre, contraseña y plan de membresía.
 */

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../lib/auth_context.tsx";
import { api } from "../lib/api.ts";
import { supabase } from "../lib/supabase.ts";
import { AccountTopBar } from "../components/layout/AccountTopBar.tsx";

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


  /* ── Datos remotos ── */
  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn:  () => api.get<DashboardData>("/dashboard"),
  });
  const currentSub = dashboard?.subscription;

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
          <h2 className="text-base font-semibold text-stone-900 mb-4">Membresía</h2>

          {currentSub ? (
            <div className="flex items-center justify-between py-3 px-4 bg-stone-50 border border-stone-200 rounded-xl">
              <div>
                <div className="text-sm font-semibold text-stone-900">{currentSub.plan_name}</div>
                <div className="text-xs text-stone-400 mt-0.5">
                  {BILLING_LABELS[currentSub.billing_cycle] ?? currentSub.billing_cycle}
                  {" · "}
                  {dashboard?.rut_usage.active ?? 0}
                  {currentSub.max_ruts !== null ? ` / ${currentSub.max_ruts}` : ""} RUTs activos
                </div>
              </div>
              <span className="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full capitalize">
                {currentSub.status}
              </span>
            </div>
          ) : (
            <p className="text-sm text-stone-400">Sin plan activo.</p>
          )}

          <p className="text-xs text-stone-400 mt-4">
            Para cambiar de plan contacta a{" "}
            <a href="mailto:contacto@ocglobalservices.cl" className="text-brand-700 underline underline-offset-2 hover:text-brand-900">
              contacto@ocglobalservices.cl
            </a>
          </p>
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
