/**
 * TaxpayerWorkspacePage — nivel RUT.
 * Muestra datos del contribuyente y lista de formularios disponibles.
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  draft:     { label: "Borrador",    cls: "bg-stone-100 text-stone-500" },
  validated: { label: "Validado",    cls: "bg-success-500/15 text-success-500" },
  submitted: { label: "Enviado",     cls: "bg-brand-100 text-brand-700" },
  accepted:  { label: "Aceptado",    cls: "bg-success-500/15 text-success-500" },
  rejected:  { label: "Rechazado",   cls: "bg-danger-500/15 text-danger-600" },
};

export function TaxpayerWorkspacePage() {
  const { rutId }    = useParams<{ rutId: string }>();
  const navigate     = useNavigate();
  const qc           = useQueryClient();
  const [creating,   setCreating]   = useState(false);

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

  const taxpayer  = taxpayerData?.taxpayer;
  const forms     = formsData?.forms ?? [];
  const otherRuts = (allRutsData?.taxpayers ?? []).filter((r) => r.id !== rutId);
  const isLoading = loadingTaxpayer || loadingForms;

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
                {taxpayer.entity_type && (
                  <span className="text-xs bg-stone-100 text-stone-600 rounded-md px-2 py-1 font-medium">
                    Tipo {taxpayer.entity_type}
                  </span>
                )}
              </div>
            </div>
            <button className="text-sm text-stone-400 hover:text-stone-600 border border-stone-200 rounded-lg px-3 py-1.5 transition-colors">
              Editar
            </button>
          </div>
        </div>

        {/* Formularios */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-stone-900">Formularios</h2>
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
        </div>

        {forms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 border-dashed p-12 text-center">
            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-stone-600 font-medium mb-1">Sin formularios aún</p>
            <p className="text-sm text-stone-400 mb-5">Crea el primer formulario para este contribuyente.</p>
            <button
              onClick={() => { setCreating(true); createForm.mutate(); }}
              disabled={creating}
              className="bg-brand-700 hover:bg-brand-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              + Crear F22 AT2026
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {forms.map((form) => (
              <FormRow
                key={form.id}
                form={form}
                onClick={() => navigate(`/rut/${rutId}/forms/${form.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function FormRow({ form, onClick }: { form: TaxForm; onClick: () => void }) {
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
      {/* Icon */}
      <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-stone-900 truncate group-hover:text-brand-700 transition-colors">
          {form.title ?? `${form.form_types?.code} ${form.form_types?.tax_year ?? ""}`}
        </div>
        <div className="text-xs text-stone-400 mt-0.5">Actualizado {updatedDate}</div>
      </div>

      {/* Status */}
      <span className={`text-xs font-medium px-2 py-1 rounded-md ${st.cls}`}>
        {st.label}
      </span>

      <svg className="w-4 h-4 text-stone-300 group-hover:text-brand-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
