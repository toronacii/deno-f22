/**
 * Left sidebar — list of RECUADROS for the active variant.
 * Clicking a section navigates to it. Active section is highlighted.
 * Shows error count badge per section.
 */

import { useFormStore } from "../../store/form_store.ts";
import { useVariant } from "../../hooks/use_variant.ts";

const SECTION_NAMES: Record<string, string> = {
  "N° 0":  "Info. Base",
  "N° 1":  "Honorarios",
  "N° 2":  "Bienes Raíces",
  "N° 3":  "Ahorro Art. 57 bis",
  "N° 4":  "Acciones y Fondos",
  "N° 5":  "Rentas del Capital",
  "N° 6":  "Rentas Empresariales",
  "N° 7":  "Rentas del Exterior",
  "N° 8":  "Créditos",
  "N° 9":  "Retenciones y PPM",
  "N° 10": "Reliquidación",
  "N° 11": "Datos Adicionales",
  "N° 12": "Determinación Impuesto",
};

function getSectionShortName(sectionId: string): string {
  for (const [key, name] of Object.entries(SECTION_NAMES)) {
    if (sectionId.includes(key)) return name;
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
                  ? "bg-blue-600 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
          >
            <span className="flex items-center gap-2 truncate">
              <span
                className={`text-xs font-mono shrink-0 ${
                  isActive ? "text-blue-200" : "text-gray-400"
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
                  ${isActive ? "bg-blue-400 text-white" : "bg-red-100 text-red-600"}`}
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
