/**
 * useCalculator — runs Calculator + Validator on every fieldValues change.
 * Debounced 300ms to avoid computing on every keystroke.
 * Writes results back to the Zustand store.
 */

import { useEffect, useRef } from "react";
import { useEngine } from "../engine/engine_context.tsx";
import { useFormStore } from "../store/form_store.ts";
import { createFormData, createFormContext } from "@core/models/form.ts";
import type { TaxRegime, EntityType } from "@core/models/form.ts";

const DEBOUNCE_MS = 300;

export function useCalculator() {
  const { calculator, validator } = useEngine();
  const fieldValues = useFormStore((s) => s.fieldValues);
  const context = useFormStore((s) => s.context);
  const setComputedValues = useFormStore((s) => s.setComputedValues);
  const setViolations = useFormStore((s) => s.setViolations);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // Build core FormData from store
      const formData = createFormData();
      for (const [code, value] of Object.entries(fieldValues)) {
        formData.set(Number(code), value);
      }

      const formContext = createFormContext({
        taxRegime: context.taxRegime as TaxRegime,
        entityType: context.entityType as EntityType,
        isRectificatoria: context.isRectificatoria,
      });

      // Run calculator
      const calcResult = calculator.calculate(formData, formContext);

      // Only store truly derived fields (from rules), not user-declared ones
      const computed: Record<number, number> = {};
      for (const result of calcResult.fieldResults) {
        computed[result.code] = result.value;
      }
      setComputedValues(computed);

      // Run validator against declared values only (skip fields not declared)
      const valReport = validator.validate(formData, formContext);
      setViolations(valReport.violations);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fieldValues, context, calculator, validator, setComputedValues, setViolations]);
}
