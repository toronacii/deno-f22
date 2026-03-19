/**
 * Tax optimizer: suggests legal deduction strategies to minimize tax liability.
 *
 * For each deductible field:
 * 1. Compute the maximum legal deduction
 * 2. Recalculate the effective tax (fields 90/305)
 * 3. Report the estimated savings and legal basis
 */

import type { FormData, FormContext } from "../models/form.ts";
import type { ParameterStore } from "../models/parameter.ts";
import type { Rule } from "../models/rule.ts";
import { Calculator } from "../engine/calculator.ts";
import { DEDUCTIBLE_FIELDS, type DeductibleField } from "./optimization_space_v2.ts";
import { getField, createFormData } from "../models/form.ts";

/** Main tax fields: IGC or IDPC */
const TAX_FIELDS = [
  90,   // Impuesto Global Complementario determinado
  305,  // Impuesto de Primera Categoría determinado
  63,   // Total impuesto anual a pagar (after credits)
];

export interface OptimizationSuggestion {
  fieldCode: number;
  fieldName: string;
  legalBasis: string;
  strategy: string;
  /** Who can use this deduction (null = everyone). */
  conditions?: string;
  currentValue: number;
  suggestedValue: number;
  maxLegalValue: number;
  estimatedTaxSaving: number;
  /** Is the current value already at the legal maximum? */
  alreadyOptimized: boolean;
  /** No fixed limit — user must determine the applicable amount. */
  isInformational: boolean;
}

export interface OptimizationReport {
  suggestions: OptimizationSuggestion[];
  /** Total estimated tax saving if all suggestions are applied */
  totalEstimatedSaving: number;
  currentTax: number;
  optimizedTax: number;
}

export class Optimizer {
  private readonly calculator: Calculator;

  constructor(
    rules: Rule[],
    private readonly params: ParameterStore,
  ) {
    this.calculator = new Calculator(rules, params);
  }

  optimize(declared: FormData, context: FormContext): OptimizationReport {
    // Baseline calculation
    const baseline = this.calculator.calculate(declared, context);
    const baselineTax = this.getTax(baseline.fields);

    const suggestions: OptimizationSuggestion[] = [];

    for (const deductible of DEDUCTIBLE_FIELDS) {
      const suggestion = this.evaluateDeductible(
        deductible,
        declared,
        baseline.fields,
        context,
      );
      if (suggestion) suggestions.push(suggestion);
    }

    // Deduplicate suggestions by fieldCode (keep the one with highest saving)
    const deduped = this.deduplicateSuggestions(suggestions);

    // Apply all suggestions and recalculate
    const optimizedForm = createFormData();
    for (const [k, v] of declared) optimizedForm.set(k, v);
    for (const s of deduped) {
      if (!s.alreadyOptimized) {
        optimizedForm.set(s.fieldCode, s.suggestedValue);
      }
    }

    const optimized = this.calculator.calculate(optimizedForm, context);
    const optimizedTax = this.getTax(optimized.fields);

    return {
      suggestions: deduped,
      totalEstimatedSaving: Math.max(0, baselineTax - optimizedTax),
      currentTax: baselineTax,
      optimizedTax,
    };
  }

  private evaluateDeductible(
    deductible: DeductibleField,
    declared: FormData,
    computed: FormData,
    context: FormContext,
  ): OptimizationSuggestion | null {
    const currentValue = getField(declared, deductible.fieldCode);
    const maxLegal = this.computeMaxLegal(deductible, computed, context);

    // Fields with no fixed limit: show as informational if user hasn't declared a value
    if (maxLegal <= 0) {
      if (deductible.limitType === "none" && currentValue === 0) {
        return {
          fieldCode: deductible.fieldCode,
          fieldName: deductible.name,
          legalBasis: deductible.legalBasis,
          strategy: deductible.strategy,
          conditions: deductible.conditions,
          currentValue: 0,
          suggestedValue: 0,
          maxLegalValue: 0,
          estimatedTaxSaving: 0,
          alreadyOptimized: false,
          isInformational: true,
        };
      }
      return null;
    }

    const suggestedValue = Math.min(maxLegal, Math.max(currentValue, maxLegal));
    const alreadyOptimized = currentValue >= maxLegal;

    if (alreadyOptimized) {
      return {
        fieldCode: deductible.fieldCode,
        fieldName: deductible.name,
        legalBasis: deductible.legalBasis,
        strategy: deductible.strategy,
        conditions: deductible.conditions,
        currentValue,
        suggestedValue: currentValue,
        maxLegalValue: maxLegal,
        estimatedTaxSaving: 0,
        alreadyOptimized: true,
        isInformational: false,
      };
    }

    const deductionIncrease = suggestedValue - currentValue;
    const estimatedMarginalRate = 0.35;
    const estimatedSaving = Math.round(deductionIncrease * estimatedMarginalRate);

    return {
      fieldCode: deductible.fieldCode,
      fieldName: deductible.name,
      legalBasis: deductible.legalBasis,
      strategy: deductible.strategy,
      conditions: deductible.conditions,
      currentValue,
      suggestedValue,
      maxLegalValue: maxLegal,
      estimatedTaxSaving: estimatedSaving,
      alreadyOptimized: false,
      isInformational: false,
    };
  }

  private computeMaxLegal(
    deductible: DeductibleField,
    computed: FormData,
    _context: FormContext,
  ): number {
    switch (deductible.limitType) {
      case "fixed_pesos":
        return deductible.limitValue ?? 0;

      case "fixed_utm": {
        const utmValue = this.params.get(deductible.paramId ?? 29)?.value ?? 65887;
        return Math.round((deductible.limitValue ?? 0) * utmValue);
      }

      case "percentage_of_income": {
        const referenceField = deductible.referenceField ?? 547;
        const income = getField(computed, referenceField);
        return Math.round(income * (deductible.limitValue ?? 0));
      }

      case "percentage_of_field": {
        const referenceField = deductible.referenceField ?? 547;
        const fieldValue = getField(computed, referenceField);
        return Math.round(fieldValue * (deductible.limitValue ?? 0));
      }

      default:
        return 0;
    }
  }

  private getTax(fields: FormData): number {
    for (const taxField of TAX_FIELDS) {
      const v = fields.get(taxField);
      if (v !== undefined && v > 0) return v;
    }
    return 0;
  }

  private deduplicateSuggestions(suggestions: OptimizationSuggestion[]): OptimizationSuggestion[] {
    const byField = new Map<number, OptimizationSuggestion>();
    for (const s of suggestions) {
      const existing = byField.get(s.fieldCode);
      if (!existing || s.estimatedTaxSaving > existing.estimatedTaxSaving) {
        byField.set(s.fieldCode, s);
      }
    }
    return Array.from(byField.values()).sort((a, b) => b.estimatedTaxSaving - a.estimatedTaxSaving);
  }
}
