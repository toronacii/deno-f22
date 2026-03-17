/**
 * useVariant — returns the active VariantConfig and filtered sections/fields
 * based on the current FormContext in the store.
 */

import { useMemo } from "react";
import { useFormStore } from "../store/form_store.ts";
import { useEngine } from "../engine/engine_context.tsx";
import {
  getVariant,
  filterSections,
  type VariantConfig,
} from "../variants/variant_config.ts";
import type { FieldDefinition, SectionInfo } from "@core/models/field.ts";

export interface VariantState {
  variant: VariantConfig;
  sections: SectionInfo[];
  fieldsBySection: Map<string, FieldDefinition[]>;
}

export function useVariant(): VariantState {
  const { entityType, taxRegime } = useFormStore((s) => s.context);
  const { fields, sections } = useEngine();

  return useMemo(() => {
    const variant = getVariant(entityType, taxRegime);
    const sectionIds = filterSections(
      sections.map((s) => s.id),
      variant,
    );

    // Keep only sections that exist in the loaded layout
    const filteredSections = sections.filter((s) => sectionIds.includes(s.id));

    // Group fields by section, filtering hidden fields
    const fieldsBySection = new Map<string, FieldDefinition[]>();
    for (const section of filteredSections) {
      const sectionFields = fields
        .filter(
          (f) =>
            f.section === section.id &&
            !variant.hiddenFields.includes(f.code),
        )
        .sort((a, b) => (a.sourceRow ?? 0) - (b.sourceRow ?? 0));

      if (sectionFields.length > 0) {
        fieldsBySection.set(section.id, sectionFields);
      }
    }

    // Only include sections that have fields
    const activeSections = filteredSections.filter((s) =>
      fieldsBySection.has(s.id),
    );

    return { variant, sections: activeSections, fieldsBySection };
  }, [entityType, taxRegime, fields, sections]);
}
