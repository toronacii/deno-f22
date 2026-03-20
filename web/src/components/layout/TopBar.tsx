/**
 * Top navigation bar — responsive.
 * Mobile:  [☰ logo | badge]  then  [regime | entity] on second row.
 * Desktop: single row with everything inline.
 */

import { useFormStore } from "../../store/form_store.ts";
import { useVariant } from "../../hooks/use_variant.ts";
import { Badge } from "../ui/Badge.tsx";
import type { TaxRegime, EntityType } from "@core/models/form.ts";

const TAX_REGIMES: { value: TaxRegime; label: string }[] = [
  { value: "14D8",         label: "14D8 — Pro-Pyme General" },
  { value: "M14A",         label: "M14A — Renta Atribuida" },
  { value: "14D1",         label: "14D1 — Semi-integrado" },
  { value: "14D3",         label: "14D3 — Pro-Pyme Transparente" },
  { value: "14G",          label: "14G — Renta Presunta Opcional" },
  { value: "14TT",         label: "14TT — Transición" },
  { value: "BHEP",         label: "BHEP — Base Honorarios Efectivos" },
  { value: "PRESUNTO",     label: "Renta Presunta" },
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

interface Props {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: Props) {
  const context  = useFormStore((s) => s.context);
  const setCtx   = useFormStore((s) => s.setContext);
  const violations = useFormStore((s) => s.violations);
  const { variant } = useVariant();
  const errorCount = violations.length;

  const regimeSelect = (
    <select
      value={context.taxRegime}
      onChange={(e) => setCtx({ taxRegime: e.target.value as TaxRegime })}
      className="flex-1 min-w-0 text-sm border border-gray-200 rounded-lg px-2 py-1.5
        bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {TAX_REGIMES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
    </select>
  );

  const entitySelect = (
    <select
      value={context.entityType}
      onChange={(e) => setCtx({ entityType: parseInt(e.target.value) as EntityType })}
      className="flex-1 min-w-0 text-sm border border-gray-200 rounded-lg px-2 py-1.5
        bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {ENTITY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
    </select>
  );

  const rectCheck = (
    <label className="flex items-center gap-1.5 text-sm text-gray-600 shrink-0 cursor-pointer whitespace-nowrap">
      <input
        type="checkbox"
        checked={context.isRectificatoria}
        onChange={(e) => setCtx({ isRectificatoria: e.target.checked })}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-300"
      />
      Rectificatoria
    </label>
  );

  return (
    <header className="bg-white border-b border-gray-200 shrink-0 px-3 md:px-4">
      {/* Main row */}
      <div className="flex items-center gap-2 h-12">
        {/* Hamburger (mobile / tablet only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Secciones"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-blue-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">SII</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold text-gray-900">Formulario 22</span>
            <span className="text-[11px] text-gray-400 hidden sm:block">AT 2026</span>
          </div>
        </div>

        {/* Selects — hidden on mobile (shown below), visible on md+ */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl ml-2">
          {regimeSelect}
          {entitySelect}
          {rectCheck}
        </div>

        {/* Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-400 hidden xl:block truncate max-w-40">
            {variant.id}
          </span>
          {errorCount === 0 ? (
            <Badge variant="ok">✓</Badge>
          ) : (
            <Badge variant="error">{errorCount}</Badge>
          )}
        </div>
      </div>

      {/* Second row — mobile only: selects + rectificatoria */}
      <div className="flex md:hidden items-center gap-2 pb-2.5">
        {regimeSelect}
        {entitySelect}
        {rectCheck}
      </div>
    </header>
  );
}
