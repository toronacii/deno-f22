/**
 * Right panel — optimization suggestions fetched from POST /api/optimize.
 * Triggered manually (not on every keystroke).
 */

import { useState } from "react";
import { useFormStore } from "../../store/form_store.ts";
import { Badge } from "../ui/Badge.tsx";

interface SuggestionDTO {
  fieldCode: number;
  fieldName: string;
  legalBasis: string;
  strategy: string;
  conditions?: string;
  currentValue: number;
  suggestedValue: number;
  maxLegalValue: number;
  estimatedTaxSaving: number;
  alreadyOptimized: boolean;
  isInformational: boolean;
}

interface OptimizeResponse {
  suggestions: SuggestionDTO[];
  totalEstimatedSaving: number;
  currentTax: number;
  optimizedTax: number;
}

function formatPesos(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);
}

export function OptimizationPanel() {
  const fieldValues = useFormStore((s) => s.fieldValues);
  const context = useFormStore((s) => s.context);
  const setField = useFormStore((s) => s.setField);

  const [report, setReport] = useState<OptimizeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runOptimization() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldValues: Object.fromEntries(
            Object.entries(fieldValues).map(([k, v]) => [k, v]),
          ),
          taxRegime: context.taxRegime,
          entityType: context.entityType,
          isRectificatoria: context.isRectificatoria,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as OptimizeResponse;
      setReport(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  function applyAll() {
    if (!report) return;
    for (const s of report.suggestions) {
      if (!s.alreadyOptimized) {
        setField(s.fieldCode, s.suggestedValue);
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Optimización tributaria
        </span>
        {report && report.totalEstimatedSaving > 0 && (
          <Badge variant="warning">
            -{formatPesos(report.totalEstimatedSaving)}
          </Badge>
        )}
      </div>

      {!report && (
        <p className="text-xs text-gray-500 leading-relaxed">
          Analiza el formulario para encontrar deducciones legales que reduzcan
          tu carga tributaria.
        </p>
      )}

      <button
        onClick={runOptimization}
        disabled={loading}
        className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600
          disabled:opacity-50 text-white text-sm font-medium transition-colors"
      >
        {loading ? "Analizando…" : "Analizar oportunidades"}
      </button>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 rounded p-2">{error}</p>
      )}

      {report && (
        <div className="flex flex-col gap-2">
          {/* Summary */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Impuesto actual</span>
              <span className="font-mono font-medium">{formatPesos(report.currentTax)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Impuesto optimizado</span>
              <span className="font-mono font-medium text-green-700">{formatPesos(report.optimizedTax)}</span>
            </div>
            <div className="flex justify-between border-t border-amber-200 pt-1 mt-1">
              <span className="font-semibold text-gray-700">Ahorro estimado</span>
              <span className="font-mono font-bold text-amber-700">
                {formatPesos(report.totalEstimatedSaving)}
              </span>
            </div>
          </div>

          {/* Quantified suggestions */}
          {(() => {
            const actionable = report.suggestions.filter((s) => !s.alreadyOptimized && !s.isInformational);
            const informational = report.suggestions.filter((s) => !s.alreadyOptimized && s.isInformational);

            return (
              <>
                {actionable.length > 0 && (
                  <>
                    <ul className="flex flex-col gap-1.5">
                      {actionable.map((s) => (
                        <li key={s.fieldCode} className="rounded-lg border border-amber-200 bg-amber-50/60 p-2.5">
                          <div className="flex items-start justify-between gap-1">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-800 leading-snug">{s.fieldName}</p>
                              <p className="text-xs text-gray-500 mt-0.5 font-mono">
                                [{s.fieldCode}] actual: {formatPesos(s.currentValue)} → {formatPesos(s.suggestedValue)}
                              </p>
                            </div>
                            {s.estimatedTaxSaving > 0 && (
                              <span className="shrink-0 text-xs font-bold text-green-700 bg-green-100 rounded px-1.5 py-0.5">
                                -{formatPesos(s.estimatedTaxSaving)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1.5 leading-snug line-clamp-2">{s.strategy}</p>
                          {s.conditions && (
                            <p className="text-xs text-gray-400 mt-1 leading-snug line-clamp-1" title={s.conditions}>
                              👤 {s.conditions}
                            </p>
                          )}
                          <p className="text-xs text-blue-600 mt-1 line-clamp-1" title={s.legalBasis}>
                            {s.legalBasis}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={applyAll}
                      className="w-full py-1.5 px-3 rounded-lg border border-amber-400
                        text-amber-700 text-xs font-medium hover:bg-amber-50 transition-colors"
                    >
                      Aplicar todas las sugerencias
                    </button>
                  </>
                )}

                {/* Informational — no fixed limit, user must evaluate */}
                {informational.length > 0 && (
                  <details className="mt-1">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 select-none">
                      {informational.length} deducciones adicionales a evaluar
                    </summary>
                    <ul className="flex flex-col gap-1 mt-1.5">
                      {informational.map((s) => (
                        <li key={s.fieldCode} className="rounded-lg border border-gray-200 bg-gray-50 p-2">
                          <p className="text-xs font-medium text-gray-700">{s.fieldName}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">{s.strategy}</p>
                          {s.conditions && (
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1" title={s.conditions}>
                              👤 {s.conditions}
                            </p>
                          )}
                          <p className="text-xs text-blue-500 mt-0.5 line-clamp-1" title={s.legalBasis}>
                            {s.legalBasis}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {actionable.length === 0 && informational.length === 0 && (
                  <p className="text-xs text-green-700 text-center py-2">
                    ✓ Ya estás aprovechando todas las deducciones disponibles
                  </p>
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
