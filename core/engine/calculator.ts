/**
 * Executes rules in topological order to compute all derived fields.
 */

import type { Rule, RuleBinding } from "../models/rule.ts";
import type { FormData, FormContext } from "../models/form.ts";
import type { ParameterStore } from "../models/parameter.ts";
import type { CalculationResult, FieldResult } from "./engine_types.ts";
import { buildExecutionPlan } from "./execution_plan.ts";
import { EvalContext } from "../evaluator/eval_context.ts";
import { evaluateExpr } from "../evaluator/evaluator.ts";
import { createFormData } from "../models/form.ts";

/** Evaluate each binding in order, returning a new context with all bindings set. */
function applyBindings(bindings: RuleBinding[], ctx: EvalContext): EvalContext {
  let current = ctx;
  for (const { name, ast } of bindings) {
    const value = evaluateExpr(ast, current);
    current = current.withBinding(name, value);
  }
  return current;
}

export class Calculator {
  constructor(
    private readonly rules: Rule[],
    private readonly params: ParameterStore,
  ) {}

  calculate(declared: FormData, context: FormContext): CalculationResult {
    const startTime = performance.now();

    const { orderedRules } = buildExecutionPlan(this.rules);
    const computed: FormData = createFormData();
    const fieldResults: FieldResult[] = [];
    const skipped: Array<{ ruleId: string; reason: string }> = [];

    // Seed computed with declared values
    for (const [code, value] of declared) {
      computed.set(code, value);
    }

    // Pre-collect parse failures from ALL rules (execution plan excludes them)
    for (const rule of this.rules) {
      if (rule.operator === "=" && !rule.formulaAst) {
        skipped.push({ ruleId: rule.ruleId, reason: rule.parseError ?? "Parse failed" });
      }
    }

    const evalCtx = new EvalContext(declared, computed, this.params, context);

    for (const rule of orderedRules) {
      if (!rule.formulaAst) {
        // Should not happen (execution plan filters these out), but guard anyway
        skipped.push({ ruleId: rule.ruleId, reason: rule.parseError ?? "Parse failed" });
        continue;
      }

      try {
        const ruleCtx = rule.bindings.length > 0 ? applyBindings(rule.bindings, evalCtx) : evalCtx;
        const value = evaluateExpr(rule.formulaAst, ruleCtx);
        const rounded = Math.round(value); // All F22 values are integers (pesos)

        computed.set(rule.targetField, rounded);
        fieldResults.push({
          code: rule.targetField,
          value: rounded,
          ruleId: rule.ruleId,
          isComputed: true,
        });
      } catch (e) {
        skipped.push({
          ruleId: rule.ruleId,
          reason: e instanceof Error ? e.message : String(e),
        });
      }
    }

    const durationMs = performance.now() - startTime;

    return { fields: computed, fieldResults, skipped, durationMs };
  }
}
