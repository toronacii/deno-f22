/**
 * TaxpayerWorkspacePage — nivel RUT.
 * Muestra datos del contribuyente y lista de formularios.
 * Soporta modo solo lectura cuando el contribuyente está desactivado.
 */

import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api.ts";
import { AccountTopBar } from "../components/layout/AccountTopBar.tsx";

interface Taxpayer {
  id:          string;
  rut:         string;
  name:        string;
  tax_regime:  string | null;
  entity_type: number | null;
  is_active:   boolean;
}

interface TaxForm {
  id:          string;
  title:       string;
  status:      string;
  updated_at:  string;
  form_types:  { id: string; code: string; name: string; tax_year: number | null };
}

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  draft:     { label: "Borrador",  cls: "bg-stone-100 text-stone-500" },
  validated: { label: "Validado",  cls: "bg-success-500/15 text-success-500" },
  submitted: { label: "Enviado",   cls: "bg-brand-100 text-brand-700" },
  accepted:  { label: "Aceptado",  cls: "bg-success-500/15 text-success-500" },
  rejected:  { label: "Rechazado", cls: "bg-danger-500/15 text-danger-600" },
};

export function TaxpayerWorkspacePage() {
  const { rutId } = useParams<{ rutId: string }>();
  const navigate  = useNavigate();
  const qc        = useQueryClient();

  const [creating,         setCreating]         = useState(false);
  const [showDeactivate,   setShowDeactivate]   = useState(false);
  const [reactivateError,  setReactivateError]  = useState<string | null>(null);

  const { data: taxpayerData, isLoading: loadingTaxpayer } = useQuery({
    queryKey: ["taxpayer", rutId],
    queryFn:  () => api.get<{ taxpayer: Taxpayer }>(`/taxpayers/${rutId}`),
    enabled:  !!rutId,
  });

  const { data: formsData, isLoading: loadingForms } = useQuery({
    queryKey: ["forms", rutId],
    queryFn:  () => api.get<{ forms: TaxForm[] }>(`/forms?taxpayer_id=${rutId}`),
    enabled:  !!rutId,
  });

  const { data: allRutsData } = useQuery({
    queryKey: ["taxpayers"],
    queryFn:  () => api.get<{ taxpayers: { id: string; rut: string; name: string }[] }>("/taxpayers"),
  });

  const createForm = useMutation({
    mutationFn: () => api.post<{ form: TaxForm }>("/forms", {
      taxpayer_id:    rutId,
      form_type_code: "F22",
    }),
    onSuccess: ({ form }) => {
      qc.invalidateQueries({ queryKey: ["forms", rutId] });
      navigate(`/rut/${rutId}/forms/${form.id}`);
    },
  });

  const deactivate = useMutation({
    mutationFn: () => api.delete(`/taxpayers/${rutId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["taxpayer", rutId] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      setShowDeactivate(false);
    },
  });

  const reactivate = useMutation({
    mutationFn: () => api.patch(`/taxpayers/${rutId}/reactivate`, {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["taxpayer", rutId] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      setReactivateError(null);
    },
    onError: (err: Error) => {
      setReactivateError(err.message);
    },
  });

  const taxpayer  = taxpayerData?.taxpayer;
  const forms     = formsData?.forms ?? [];
  const otherRuts = (allRutsData?.taxpayers ?? []).filter((r) => r.id !== rutId);
  const isLoading = loadingTaxpayer || loadingForms;
  const readOnly  = taxpayer ? !taxpayer.is_active : false;

  if (isLoading || !taxpayer) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 flex flex-col">
      <AccountTopBar
        rutContext={{ id: taxpayer.id, rut: taxpayer.rut, name: taxpayer.name }}
        otherRuts={otherRuts}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
          <button onClick={() => navigate("/dashboard")} className="hover:text-stone-600 transition-colors">
            Mis contribuyentes
          </button>
          <span>/</span>
          <span className="text-stone-700 font-medium">{taxpayer.name}</span>
        </div>

        {/* Banner solo lectura */}
        {readOnly && (
          <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-2.5 text-sm text-amber-800">
              <svg className="w-4 h-4 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Contribuyente desactivado — los formularios son de <strong>solo lectura</strong>.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {reactivateError && (
                <span className="text-xs text-danger-600 max-w-[200px] text-right">{reactivateError}</span>
              )}
              {reactivateError?.includes("límite") || reactivateError?.includes("PLAN") ? (
                <Link
                  to="/account"
                  className="text-xs font-medium bg-brand-700 hover:bg-brand-800 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Actualizar plan
                </Link>
              ) : (
                <button
                  onClick={() => reactivate.mutate()}
                  disabled={reactivate.isPending}
                  className="text-xs font-medium bg-amber-700 hover:bg-amber-800 disabled:bg-amber-300 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  {reactivate.isPending ? "Reactivando…" : "Reactivar"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Taxpayer header */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-sm text-stone-400 mb-1">{taxpayer.rut}</div>
              <h1 className="text-xl font-semibold text-stone-900 mb-2">{taxpayer.name}</h1>
              <div className="flex flex-wrap gap-2">
                {taxpayer.tax_regime && (
                  <span className="text-xs bg-stone-100 text-stone-600 rounded-md px-2 py-1 font-medium">
                    {taxpayer.tax_regime}
                  </span>
                )}
                {!taxpayer.is_active && (
                  <span className="text-xs bg-stone-100 text-stone-400 rounded-md px-2 py-1 font-medium">
                    Inactivo
                  </span>
                )}
              </div>
            </div>
            {!readOnly && (
              <div className="flex items-center gap-2">
                <button className="text-sm text-stone-400 hover:text-stone-600 border border-stone-200 rounded-lg px-3 py-1.5 transition-colors">
                  Editar
                </button>
                <button
                  onClick={() => setShowDeactivate(true)}
                  className="text-sm text-danger-500 hover:text-danger-600 border border-danger-200 hover:border-danger-300 rounded-lg px-3 py-1.5 transition-colors"
                >
                  Desactivar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Formularios */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-stone-900">Formularios</h2>
          {!readOnly && (
            <button
              onClick={() => { setCreating(true); createForm.mutate(); }}
              disabled={creating || createForm.isPending}
              className="flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                text-white font-medium px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {creating || createForm.isPending ? "Creando…" : "Nuevo F22"}
            </button>
          )}
        </div>

        {forms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 border-dashed p-12 text-center">
            <p className="text-stone-600 font-medium mb-1">Sin formularios aún</p>
            {!readOnly && (
              <>
                <p className="text-sm text-stone-400 mb-5">Crea el primer formulario para este contribuyente.</p>
                <button
                  onClick={() => { setCreating(true); createForm.mutate(); }}
                  disabled={creating}
                  className="bg-brand-700 hover:bg-brand-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  + Crear F22 AT2026
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {forms.map((form) => (
              <FormRow
                key={form.id}
                form={form}
                readOnly={readOnly}
                onClick={() => navigate(`/rut/${rutId}/forms/${form.id}`)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal confirmación desactivar */}
      {showDeactivate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-stone-900 mb-2">
              ¿Desactivar {taxpayer.name}?
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              El contribuyente dejará de contar en tu cuota de RUTs activos.
              Podrás seguir viendo sus formularios en modo <strong>solo lectura</strong> y reactivarlo cuando quieras.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeactivate(false)}
                className="px-4 py-2 text-sm text-stone-600 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => deactivate.mutate()}
                disabled={deactivate.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-danger-500 hover:bg-danger-600
                  disabled:bg-danger-300 rounded-lg transition-colors"
              >
                {deactivate.isPending ? "Desactivando…" : "Sí, desactivar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormRow({ form, readOnly, onClick }: { form: TaxForm; readOnly: boolean; onClick: () => void }) {
  const st = STATUS_LABEL[form.status] ?? STATUS_LABEL.draft;
  const updatedDate = new Date(form.updated_at).toLocaleDateString("es-CL", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-stone-200 px-5 py-4
        hover:border-brand-300 hover:shadow-sm transition-all flex items-center gap-4 group"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${readOnly ? "bg-stone-100" : "bg-brand-50"}`}>
        <svg className={`w-5 h-5 ${readOnly ? "text-stone-400" : "text-brand-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-stone-900 truncate group-hover:text-brand-700 transition-colors">
          {form.title ?? `${form.form_types?.code} ${form.form_types?.tax_year ?? ""}`}
        </div>
        <div className="text-xs text-stone-400 mt-0.5 flex items-center gap-2">
          <span>Actualizado {updatedDate}</span>
          {readOnly && <span className="text-stone-300">· Solo lectura</span>}
        </div>
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-md ${st.cls}`}>{st.label}</span>
      <svg className="w-4 h-4 text-stone-300 group-hover:text-brand-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
