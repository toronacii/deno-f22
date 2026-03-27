/**
 * FormEditorPage — nivel formulario.
 * Carga los datos del formulario desde la API y envuelve AppShell.
 * También sincroniza los cambios del store al backend (autosave).
 */

import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.ts";
import { useFormStore } from "../store/form_store.ts";
import { AppShell } from "../components/layout/AppShell.tsx";
import type { TaxRegime, EntityType } from "@core/models/form.ts";

interface FormDetail {
  id:         string;
  title:      string;
  status:     string;
  taxpayer_entities: {
    id:          string;
    rut:         string;
    name:        string;
    tax_regime:  string | null;
    entity_type: number | null;
  };
  form_types: { id: string; code: string; name: string; tax_year: number | null };
  tax_form_data: { data: Record<string, number>; version: number } | null;
}

export function FormEditorPage() {
  const { rutId, formId } = useParams<{ rutId: string; formId: string }>();
  const navigate           = useNavigate();
  const loadedFormId       = useRef<string | null>(null);

  // Zustand store
  const setField   = useFormStore((s) => s.setField);
  const setContext = useFormStore((s) => s.setContext);
  const fieldValues = useFormStore((s) => s.fieldValues);

  const { data, isLoading } = useQuery({
    queryKey: ["form", formId],
    queryFn:  () => api.get<{ form: FormDetail }>(`/forms/${formId}`),
    enabled:  !!formId,
  });

  // Cargar datos del formulario en el store (solo una vez)
  useEffect(() => {
    if (!data?.form || loadedFormId.current === formId) return;
    const form = data.form;
    loadedFormId.current = formId ?? null;

    // Inicializar contexto con datos del contribuyente
    const tp = form.taxpayer_entities;
    if (tp.tax_regime) {
      setContext({ taxRegime: tp.tax_regime as TaxRegime });
    }
    if (tp.entity_type) {
      setContext({ entityType: tp.entity_type as EntityType });
    }

    // Cargar campos guardados
    const saved = form.tax_form_data?.data ?? {};
    for (const [code, value] of Object.entries(saved)) {
      setField(parseInt(code), value as number);
    }
  }, [data, formId, setField, setContext]);

  // Autosave: guarda al API cuando cambian los fieldValues (debounced)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const versionRef = useRef(1);

  useEffect(() => {
    if (!formId || loadedFormId.current !== formId) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        await api.put(`/forms/${formId}/data`, {
          data:    fieldValues,
          version: versionRef.current++,
        });
      } catch {
        // silent — no interrupt user
      }
    }, 2000); // 2s debounce para no saturar la API

    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [fieldValues, formId]);

  if (isLoading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data?.form) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Formulario no encontrado.</p>
          <button
            onClick={() => navigate(`/rut/${rutId}`)}
            className="text-brand-600 hover:text-brand-700 text-sm font-medium"
          >
            Volver al workspace
          </button>
        </div>
      </div>
    );
  }

  const form = data.form;
  const tp   = form.taxpayer_entities;

  // Pasa el contexto del RUT al AppShell a través de props adicionales
  return (
    <AppShell
      breadcrumb={{
        rutId:   rutId!,
        rutRut:  tp.rut,
        rutName: tp.name,
        formTitle: form.title ?? `${form.form_types.code} ${form.form_types.tax_year ?? ""}`,
      }}
    />
  );
}
