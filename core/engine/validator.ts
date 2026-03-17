/**
 * Validates declared form values against computed values.
 * Tolerance: ±1 peso (rounding differences).
 */

import type { Rule } from "../models/rule.ts";
import type { FormData, FormContext } from "../models/form.ts";
import type { ParameterStore } from "../models/parameter.ts";
import type { ValidationReport, ValidationViolation } from "./engine_types.ts";
import { Calculator } from "./calculator.ts";
import { getField } from "../models/form.ts";

const TOLERANCE = 1; // ±1 peso

export class Validator {
  private readonly calculator: Calculator;

  constructor(
    private readonly rules: Rule[],
    params: ParameterStore,
  ) {
    this.calculator = new Calculator(rules, params);
  }

  validate(declared: FormData, context: FormContext): ValidationReport {
    const { fields: computed, skipped } = this.calculator.calculate(declared, context);
    const violations: ValidationViolation[] = [];
    let passedCount = 0;
    let failedCount = 0;

    // Check all "=" rules: computed value should match declared
    for (const rule of this.rules) {
      if (rule.operator !== "=") continue;
      if (!rule.formulaAst) continue;

      const calculatedValue = computed.get(rule.targetField);
      if (calculatedValue === undefined) continue;

      const declaredValue = getField(declared, rule.targetField);
      const delta = Math.abs(declaredValue - calculatedValue);

      if (declared.has(rule.targetField) && delta > TOLERANCE) {
        violations.push({
          ruleId: rule.ruleId,
          targetField: rule.targetField,
          message: `Campo [${rule.targetField}]: declarado=${declaredValue}, calculado=${calculatedValue}, diferencia=${delta}`,
          declaredValue,
          calculatedValue,
          delta,
          severity: "error",
        });
        failedCount++;
      } else {
        passedCount++;
      }
    }

    return {
      violations,
      passedCount,
      failedCount,
      skippedCount: skipped.length,
    };
  }
}
