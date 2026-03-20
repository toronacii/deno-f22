/**
 * The main form view — renders the currently active RECUADRO with prev/next navigation.
 * Uses RecuadroTable for faithful multi-column rendering of the Excel layout.
 */

import { useEffect, useMemo } from "react";
import { useFormStore } from "../../store/form_store.ts";
import { useVariant } from "../../hooks/use_variant.ts";
import { useCalculator } from "../../hooks/use_calculator.ts";
import { useEngine } from "../../engine/engine_context.tsx";
import { RecuadroTable } from "./RecuadroTable.tsx";

interface Props {
  optimizableFields?: Set<number>;
}

export function F22Form({ optimizableFields }: Props) {
  useCalculator();

  const { sections } = useVariant();
  const { layoutSections, fieldMetadata } = useEngine();
  const currentSection = useFormStore((s) => s.currentSection);
  const setCurrentSection = useFormStore((s) => s.setCurrentSection);
  const computedValues = useFormStore((s) => s.computedValues);

  // Set of computed field codes (for read-only rendering)
  const computedCodes = useMemo(
    () => new Set(Object.keys(computedValues).map(Number)),
    [computedValues],
  );

  useEffect(() => {
    if (!currentSection && sections.length > 0) {
      setCurrentSection(sections[0].id);
    }
  }, [sections, currentSection, setCurrentSection]);

  const currentIndex = sections.findIndex((s) => s.id === currentSection);
  const activeSection = sections[currentIndex] ?? sections[0];

  // Find the matching LayoutSection for the active RECUADRO
  const activeLayoutSection = activeSection
    ? layoutSections.find((ls) => ls.id === activeSection.id)
    : undefined;

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
        No hay secciones disponibles para esta variante.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Section navigator */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (currentIndex > 0) setCurrentSection(sections[currentIndex - 1].id);
            }}
            disabled={currentIndex <= 0}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200
              hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            ← Anterior
          </button>

          <span className="text-xs font-medium text-gray-400 tracking-wide">
            {currentIndex + 1} de {sections.length}
          </span>

          <button
            onClick={() => {
              if (currentIndex < sections.length - 1)
                setCurrentSection(sections[currentIndex + 1].id);
            }}
            disabled={currentIndex >= sections.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200
              hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            Siguiente →
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Active RECUADRO */}
      {activeLayoutSection ? (
        <RecuadroTable
          section={activeLayoutSection}
          computedCodes={computedCodes}
          optimizableFields={optimizableFields}
          fieldMetadata={fieldMetadata}
        />
      ) : activeSection ? (
        <div className="text-sm text-gray-400 text-center py-8">
          {activeSection.id} — layout no disponible
        </div>
      ) : null}
    </div>
  );
}
