/**
 * Types returned by the calculation and validation engine.
 */

import type { FormData } from "../models/form.ts";

export interface FieldResult {
  code: number;
  value: number;
  ruleId: string;
  /** Whether this value was computed (true) or carried from declared (false) */
  isComputed: boolean;
}

export interface CalculationResult {
  /** All field values after computation */
  fields: FormData;
  /** Individual computation results */
  fieldResults: FieldResult[];
  /** Rules that could not be evaluated (e.g. parse error or dependency missing) */
  skipped: Array<{ ruleId: string; reason: string }>;
  /** Total time in ms */
  durationMs: number;
}

export interface ValidationViolation {
  ruleId: string;
  targetField: number;
  message: string;
  declaredValue?: number;
  calculatedValue?: number;
  delta?: number;
  severity: "error" | "warning";
}

export interface ValidationReport {
  violations: ValidationViolation[];
  passedCount: number;
  failedCount: number;
  skippedCount: number;
}
