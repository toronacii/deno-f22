/**
 * Global form state — Zustand store.
 *
 * Holds:
 *  - fieldValues: the user's declared field values
 *  - context: tax regime, entity type, rectificatoria flag
 *  - currentSection: which RECUADRO is currently visible
 *  - computedValues: last result from Calculator (updated by useCalculator hook)
 *  - violations: last result from Validator
 */

import { create } from "zustand";
import type { TaxRegime, EntityType } from "@core/models/form.ts";
import type { ValidationViolation } from "@core/engine/engine_types.ts";

export interface FormContext {
  taxRegime: TaxRegime;
  entityType: EntityType;
  isRectificatoria: boolean;
}

interface FormStore {
  // User-entered numeric values: fieldCode → amount (pesos)
  fieldValues: Record<number, number>;
  setField: (code: number, value: number) => void;
  clearField: (code: number) => void;

  // User-entered text values: fieldCode → string (for text fields)
  textValues: Record<number, string>;
  setTextField: (code: number, value: string) => void;

  // Form metadata
  context: FormContext;
  setContext: (ctx: Partial<FormContext>) => void;

  // Navigation
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // Computed state (written by useCalculator hook)
  computedValues: Record<number, number>;
  setComputedValues: (values: Record<number, number>) => void;

  violations: ValidationViolation[];
  setViolations: (v: ValidationViolation[]) => void;

  // Derived helpers
  getEffectiveValue: (code: number) => number | undefined;
}

export const useFormStore = create<FormStore>((set, get) => ({
  fieldValues: {},

  setField: (code, value) =>
    set((s) => ({ fieldValues: { ...s.fieldValues, [code]: value } })),

  clearField: (code) =>
    set((s) => {
      const next = { ...s.fieldValues };
      delete next[code];
      return { fieldValues: next };
    }),

  textValues: {},
  setTextField: (code, value) =>
    set((s) => ({ textValues: { ...s.textValues, [code]: value } })),

  context: {
    taxRegime: "14D8",
    entityType: 1,
    isRectificatoria: false,
  },

  setContext: (ctx) =>
    set((s) => ({ context: { ...s.context, ...ctx } })),

  currentSection: "",
  setCurrentSection: (section) => set({ currentSection: section }),

  computedValues: {},
  setComputedValues: (values) => set({ computedValues: values }),

  violations: [],
  setViolations: (violations) => set({ violations }),

  // Returns computed value if available, else declared value, else undefined
  getEffectiveValue: (code) => {
    const { computedValues, fieldValues } = get();
    if (computedValues[code] !== undefined) return computedValues[code];
    if (fieldValues[code] !== undefined) return fieldValues[code];
    return undefined;
  },
}));
