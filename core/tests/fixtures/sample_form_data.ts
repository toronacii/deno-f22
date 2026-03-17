/**
 * Sample form data for integration tests.
 * Represents a simple persona natural (freelancer) with honorarios.
 */

import type { FormData, FormContext } from "../../models/form.ts";
import { createFormData, createFormContext } from "../../models/form.ts";

/**
 * Persona natural con honorarios, régimen 14D8 (Pro-Pyme General).
 * AT2026 — año tributario 2026.
 */
export function createSampleFormData(): FormData {
  const data = createFormData();

  // RECUADRO 1 — Honorarios
  data.set(545, 8_000_000);    // Honorarios por servicios prestados a empresas
  data.set(461, 500_000);      // Honorarios emitidos directamente (boletas)
  data.set(856, 0);            // Honorarios de fuente extranjera
  data.set(1650, 200_000);     // Otros honorarios
  // [547] = 545 + 461 + 856 + 1650 = 8,700,000 (computed)

  // Gastos deducibles
  // [550] = MIN(547*0.30, 15 UTM) = MIN(2,610,000, 988,305) = 988,305 (computed)

  // Other income
  data.set(157, 1_200_000);    // Rentas de capitales mobiliarios

  // Field [03] — tipo contribuyente (Persona Natural = 1)
  data.set(3, 1);

  return data;
}

export function createSampleFormContext(): FormContext {
  return createFormContext({
    taxRegime: "14D8",
    entityType: 1,         // Persona Natural
    isRectificatoria: false,
    externalVars: new Map(),
  });
}

/**
 * Expected computed values for the sample form data.
 * Used to verify engine correctness.
 */
export const EXPECTED_COMPUTED: Record<number, number> = {
  547: 8_700_000,           // [545] + [461] + [856] + [1650]
  550: 988_305,             // MIN(8,700,000 * 0.30, 15 * 65887) = MIN(2,610,000, 988,305)
  553: 7_711_695,           // POS(8,700,000 - 988,305)
  159: 8_911_695,           // [553] + [157] = 7,711,695 + 1,200,000
};
