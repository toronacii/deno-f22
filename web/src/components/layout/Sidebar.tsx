/**
 * Left sidebar — list of RECUADROS for the active variant.
 * Clicking a section navigates to it. Active section is highlighted.
 * Shows error count badge per section.
 */

import { useFormStore } from "../../store/form_store.ts";
import { useVariant } from "../../hooks/use_variant.ts";

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
              <span className="truncate">
                {section.id.replace("RECUADRO ", "Rec. ")}
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
