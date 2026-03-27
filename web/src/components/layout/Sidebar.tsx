/**
 * Left sidebar — list of RECUADROS for the active variant.
 * Clicking a section navigates to it. Active section is highlighted.
 * Shows error count badge per section.
 */

import { useFormStore } from "../../store/form_store.ts";
import { useVariant } from "../../hooks/use_variant.ts";

const SECTION_NAMES: Record<string, string> = {
  "RECUADRO 0":  "Info. Base",
  "RECUADRO 1":  "Honorarios",
  "RECUADRO 2":  "Bienes Raíces",
  "RECUADRO 3":  "Ahorro Art. 57 bis",
  "RECUADRO 4":  "Acciones y Fondos",
  "RECUADRO 5":  "Crédito Ingreso Diferido",
  "RECUADRO 6":  "Datos Informativos",
  "RECUADRO 7":  "Ingreso Diferido",
  "RECUADRO 8":  "Donaciones y Créditos",
  "RECUADRO 9":  "Registro FUR",
  "RECUADRO 10": "Depreciación",
  "RECUADRO 11": "Royalty Minero",
  "RECUADRO 12": "Base Imponible 1ª Cat.",
  "RECUADRO 13": "RAI (Art. 14A)",
  "RECUADRO 14": "CPT (Art. 14A/G)",
  "RECUADRO 15": "RTRE y STUT (14A)",
  "RECUADRO 16": "Registro SAC (14A)",
  "RECUADRO 17": "Base Imp. Pro Pyme",
  "RECUADRO 19": "CPTS Pro Pyme",
  "RECUADRO 20": "RTRE y STUT (14D3)",
  "RECUADRO 21": "Registro SAC (14D3)",
  "RECUADRO 22": "Base Imp. Transparencia",
  "RECUADRO 23": "CPTS Transparencia",
  "RECUADRO 24": "Préstamo Tasa 0%",
};

function getSectionShortName(sectionId: string): string {
  // Extract the numeric portion from IDs like "RECUADRO 0", "RECUADRO 10" etc.
  const match = sectionId.match(/RECUADRO\s+(\d+)/);
  if (match) {
    const key = `RECUADRO ${match[1]}`;
    if (SECTION_NAMES[key]) return SECTION_NAMES[key];
  }
  return sectionId.replace("RECUADRO ", "Rec. ");
}

interface Props {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: Props) {
  const { sections, fieldsBySection } = useVariant();
  const currentSection = useFormStore((s) => s.currentSection);
  const setCurrentSection = useFormStore((s) => s.setCurrentSection);
  const violations = useFormStore((s) => s.violations);

  function errorsInSection(sectionId: string): number {
    const fields = fieldsBySection.get(sectionId) ?? [];
    const codes = new Set(fields.map((f) => f.code));
    return violations.filter((v) => codes.has(v.targetField)).length;
  }

  return (
    <nav className="flex flex-col gap-0.5 py-2">
      {sections.map((section, i) => {
        const isActive = section.id === currentSection;
        const errors = errorsInSection(section.id);

        return (
          <button
            key={section.id}
            onClick={() => { setCurrentSection(section.id); onNavigate?.(); }}
            className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg
              text-sm transition-colors group
              ${
                isActive
                  ? "bg-brand-700 text-white font-medium"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
          >
            <span className="flex items-center gap-2 truncate">
              <span
                className={`text-xs font-mono shrink-0 ${
                  isActive ? "text-brand-200" : "text-stone-400"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate leading-tight">
                {getSectionShortName(section.id)}
              </span>
            </span>
            {errors > 0 && (
              <span
                className={`ml-1 shrink-0 rounded-full text-xs font-bold px-1.5 py-0.5
                  ${isActive ? "bg-brand-500 text-white" : "bg-danger-500/15 text-danger-600"}`}
              >
                {errors}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
