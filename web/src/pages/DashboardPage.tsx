/**
 * DashboardPage — nivel cuenta.
 * Muestra tarjetas de todos los RUTs activos del usuario.
 */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api.ts";
import { useAuth } from "../lib/auth_context.tsx";
import { AddTaxpayerModal } from "../components/dashboard/AddTaxpayerModal.tsx";
import { AccountTopBar } from "../components/layout/AccountTopBar.tsx";

interface Taxpayer {
  id:          string;
  rut:         string;
  name:        string;
  tax_regime:  string | null;
  entity_type: number | null;
  is_active:   boolean;
}

interface Subscription {
  plan_code:    string;
  plan_name:    string;
  max_ruts:     number | null;
  billing_cycle: string;
  status:       string;
}

interface DashboardData {
  profile:      { full_name: string; email: string };
  subscription: Subscription | null;
  taxpayers:    Taxpayer[];
  rut_usage:    { active: number; max: number | null };
}

export function DashboardPage() {
  const { user } = useAuth();
  const navigate      = useNavigate();
  const queryClient   = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [reactivateError, setReactivateError] = useState<{ id: string; msg: string } | null>(null);

  const reactivate = useMutation({
    mutationFn: (id: string) => api.patch(`/taxpayers/${id}/reactivate`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["taxpayers-inactive"] });
      setReactivateError(null);
    },
    onError: (err: Error, id: string) => {
      setReactivateError({ id, msg: err.message });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn:  () => api.get<DashboardData>("/dashboard"),
  });

  const { data: archivedData } = useQuery({
    queryKey: ["taxpayers-inactive"],
    queryFn:  () => api.get<{ taxpayers: Taxpayer[] }>("/taxpayers?inactive=true"),
  });
  const archivedTaxpayers = archivedData?.taxpayers ?? [];

  const taxpayers  = data?.taxpayers ?? [];
  const sub        = data?.subscription;
  const rutUsage   = data?.rut_usage;
  const canAddMore = rutUsage != null && (rutUsage.max === null || rutUsage.active < rutUsage.max);

  // Plan Núcleo con 1 RUT → ir directo al workspace
  useEffect(() => {
    if (!isLoading && sub?.max_ruts === 1 && taxpayers.length === 1) {
      navigate(`/rut/${taxpayers[0].id}`, { replace: true });
    }
  }, [isLoading, sub, taxpayers, navigate]);

  function handleTaxpayerAdded() {
    setShowAdd(false);
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  }

  if (isLoading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex flex-col">
      <AccountTopBar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-stone-900">
              Hola, {data?.profile?.full_name ?? user?.user_metadata?.full_name ?? ""}
            </h1>
            {sub && (
              <p className="text-sm text-stone-500 mt-0.5">
                Plan {sub.plan_name} · {rutUsage?.active ?? 0}
                {rutUsage != null && rutUsage.max !== null ? ` / ${rutUsage.max}` : ""} contribuyentes
              </p>
            )}
          </div>

          <button
            onClick={() => canAddMore ? setShowAdd(true) : null}
            disabled={!canAddMore}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              canAddMore
                ? "bg-brand-700 hover:bg-brand-800 text-white"
                : "bg-stone-100 text-stone-400 cursor-not-allowed"
            }`}
            title={!canAddMore && rutUsage ? `Límite de ${rutUsage.max} RUTs alcanzado` : undefined}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {canAddMore ? "Agregar contribuyente" : `Actualizar plan`}
          </button>
        </div>

        {/* Empty state */}
        {taxpayers.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 border-dashed p-16 text-center">
            <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-stone-600 font-medium mb-1">Sin contribuyentes aún</p>
            <p className="text-sm text-stone-400 mb-6">Agrega tu primer RUT para comenzar a gestionar sus formularios tributarios.</p>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-brand-700 hover:bg-brand-800 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              + Agregar primer RUT
            </button>
          </div>
        )}

        {/* Taxpayer cards */}
        {taxpayers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {taxpayers.map((t) => (
              <TaxpayerCard
                key={t.id}
                taxpayer={t}
                onClick={() => navigate(`/rut/${t.id}`)}
              />
            ))}

            {/* Add card (if can add more) */}
            {canAddMore && (
              <button
                onClick={() => setShowAdd(true)}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed
                  border-stone-200 bg-white hover:border-brand-300 hover:bg-brand-50 text-stone-400
                  hover:text-brand-600 transition-colors min-h-[140px] p-5"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm font-medium">Agregar contribuyente</span>
                {rutUsage != null && rutUsage.max !== null && (
                  <span className="text-xs text-stone-400">{rutUsage.active} / {rutUsage.max}</span>
                )}
              </button>
            )}
          </div>
        )}

        {/* Archivados */}
        {archivedTaxpayers.length > 0 && <div className="mt-8">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            <svg className={`w-4 h-4 transition-transform ${showArchived ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Contribuyentes archivados
            {archivedTaxpayers.length > 0 && (
              <span className="bg-stone-100 text-stone-500 text-xs rounded-full px-2 py-0.5">
                {archivedTaxpayers.length}
              </span>
            )}
          </button>

          {showArchived && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {archivedTaxpayers.length === 0 ? (
                <p className="text-sm text-stone-400 col-span-full py-2">Sin contribuyentes archivados.</p>
              ) : (
                archivedTaxpayers.map((t) => {
                  const isPending = reactivate.isPending && reactivate.variables === t.id;
                  const err = reactivateError?.id === t.id ? reactivateError.msg : null;
                  return (
                    <div
                      key={t.id}
                      className="rounded-xl border border-stone-200 bg-white p-5 flex flex-col gap-3"
                    >
                      <Link to={`/rut/${t.id}`} className="group flex-1">
                        <div className="font-mono text-xs text-stone-400 mb-1 tracking-wide">{t.rut}</div>
                        <div className="font-semibold text-stone-700 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                          {t.name}
                        </div>
                      </Link>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100">
                        <span className="text-[11px] bg-stone-100 text-stone-400 rounded-md px-2 py-0.5 font-medium">
                          Inactivo
                        </span>
                        <div className="flex flex-col items-end gap-1">
                          {err && (
                            <span className="text-[11px] text-danger-600 text-right max-w-[180px]">{err}</span>
                          )}
                          {err?.includes("límite") || err?.includes("PLAN") ? (
                            <Link
                              to="/account"
                              className="text-xs font-medium bg-brand-700 hover:bg-brand-800 text-white px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Actualizar plan
                            </Link>
                          ) : (
                            <button
                              onClick={() => reactivate.mutate(t.id)}
                              disabled={isPending}
                              className="text-xs font-medium bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300 text-white px-3 py-1.5 rounded-lg transition-colors"
                            >
                              {isPending ? "Activando…" : "Activar"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>}
      </main>

      {showAdd && (
        <AddTaxpayerModal
          onClose={() => setShowAdd(false)}
          onAdded={handleTaxpayerAdded}
        />
      )}
    </div>
  );
}

/* ── Taxpayer card ── */
const REGIME_LABEL: Record<string, string> = {
  "14D8":        "Pro-Pyme General",
  "M14A":        "Renta Atribuida",
  "14D1":        "Semi-integrado",
  "14D3":        "Pro-Pyme Transparente",
  "14G":         "Renta Presunta Opcional",
  "14TT":        "Transición",
  "BHEP":        "Base Honorarios",
  "PRESUNTO":    "Renta Presunta",
  "SIMPLIFICADO":"Simplificado",
};

function TaxpayerCard({ taxpayer, onClick }: { taxpayer: Taxpayer; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl border border-stone-200 bg-white p-5
        hover:border-brand-300 hover:shadow-sm transition-all group"
    >
      {/* RUT */}
      <div className="font-mono text-xs text-stone-400 mb-1 tracking-wide">{taxpayer.rut}</div>

      {/* Name */}
      <div className="font-semibold text-stone-900 mb-3 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
        {taxpayer.name}
      </div>

      {/* Regime badge */}
      {taxpayer.tax_regime && (
        <span className="inline-block text-[11px] bg-stone-100 text-stone-500 rounded-md px-2 py-0.5 font-medium mb-3">
          {REGIME_LABEL[taxpayer.tax_regime] ?? taxpayer.tax_regime}
        </span>
      )}

      {/* CTA */}
      <div className="flex items-center gap-1 text-xs font-medium text-brand-600 mt-auto pt-2 border-t border-stone-100">
        <span>Ver workspace</span>
        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
