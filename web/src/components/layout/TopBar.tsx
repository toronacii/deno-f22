/**
 * Top navigation bar.
 * Contains: logo, variant selectors (regime + entity type), validation badge.
 */

import { useFormStore } from "../../store/form_store.ts";
import { useVariant } from "../../hooks/use_variant.ts";
import { Badge } from "../ui/Badge.tsx";
import type { TaxRegime, EntityType } from "@core/models/form.ts";

const TAX_REGIMES: { value: TaxRegime; label: string }[] = [
  { value: "14D8",       label: "14D8 — Pro-Pyme General" },
  { value: "M14A",       label: "M14A — Renta Atribuida" },
  { value: "14D1",       label: "14D1 — Semi-integrado" },
  { value: "14D3",       label: "14D3 — Pro-Pyme Transparente" },
  { value: "14G",        label: "14G — Renta Presunta Opcional" },
  { value: "14TT",       label: "14TT — Transición" },
  { value: "BHEP",       label: "BHEP — Base Honorarios Efectivos" },
  { value: "PRESUNTO",   label: "Renta Presunta" },
  { value: "SIMPLIFICADO", label: "Régimen Simplificado" },
];

const ENTITY_TYPES: { value: EntityType; label: string }[] = [
  { value: 1, label: "Persona Natural" },
  { value: 2, label: "Sociedad de Personas" },
  { value: 3, label: "Sociedad Anónima" },
  { value: 4, label: "SpA" },
  { value: 5, label: "EIRL" },
  { value: 6, label: "Soc. Profesionales" },
  { value: 7, label: "Comunidad" },
  { value: 8, label: "Otro" },
];

export function TopBar() {
  const context = useFormStore((s) => s.context);
  const setContext = useFormStore((s) => s.setContext);
  const violations = useFormStore((s) => s.violations);
  const { variant } = useVariant();

  const errorCount = violations.length;

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between gap-4 shrink-0">
      {/* Logo / title */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-7 h-7 bg-blue-700 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">SII</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold text-gray-900">Formulario 22</span>
          <span className="text-xs text-gray-400">Año Tributario 2026</span>
        </div>
      </div>

      {/* Variant selectors */}
      <div className="flex items-center gap-2 flex-1 max-w-lg">
        <select
          value={context.taxRegime}
          onChange={(e) => setContext({ taxRegime: e.target.value as TaxRegime })}
          className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5
            bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {TAX_REGIMES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>

        <select
          value={context.entityType}
          onChange={(e) => setContext({ entityType: parseInt(e.target.value) as EntityType })}
          className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5
            bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {ENTITY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <label className="flex items-center gap-1.5 text-sm text-gray-600 shrink-0 cursor-pointer">
          <input
            type="checkbox"
            checked={context.isRectificatoria}
            onChange={(e) => setContext({ isRectificatoria: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-300"
          />
          Rectificatoria
        </label>
      </div>

      {/* Variant label + validation badge */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-gray-400 hidden lg:block truncate max-w-36">
          {variant.id}
        </span>
        {errorCount === 0 ? (
          <Badge variant="ok">✓ Sin errores</Badge>
        ) : (
          <Badge variant="error">{errorCount} error{errorCount !== 1 ? "es" : ""}</Badge>
        )}
      </div>
    </header>
  );
}
