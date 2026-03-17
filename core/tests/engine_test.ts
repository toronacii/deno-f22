/**
 * Integration tests for the calculation engine.
 */

import { assertEquals, assert } from "@std/assert";
import { buildRuleRegistry } from "../registry/rule_registry.ts";
import { Calculator } from "../engine/calculator.ts";
import { Validator } from "../engine/validator.ts";
import { Optimizer } from "../optimizer/optimizer.ts";
import { buildParameterStore } from "../models/parameter.ts";
import { createFormData } from "../models/form.ts";
import {
  createSampleFormData,
  createSampleFormContext,
  EXPECTED_COMPUTED,
} from "./fixtures/sample_form_data.ts";
import { SAMPLE_RAW_RULES } from "./fixtures/sample_rules.ts";

// ---------------------------------------------------------------------------
// Helper: build test infrastructure
// ---------------------------------------------------------------------------

function buildTestParams() {
  return buildParameterStore([
    { id: "P08", num: 8, value: 0.30, description: "IDPC M14A" },
    { id: "P09", num: 9, value: 0.27, description: "IDPC 14D1" },
    { id: "P10", num: 10, value: 0.25, description: "IDPC 14D8" },
    { id: "P12", num: 12, value: 0.35, description: "Tasa max IGC" },
    { id: "P24", num: 24, value: 0.30, description: "Gastos presuntos %" },
    { id: "P29", num: 29, value: 65887, description: "UTM diciembre" },
    { id: "P42", num: 42, value: 15, description: "Limite gastos UTM" },
  ]);
}

// ---------------------------------------------------------------------------
// Rule registry tests
// ---------------------------------------------------------------------------

Deno.test("registry: builds rule registry from sample rules", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  assert(registry.rules.length > 0);
  assert(registry.parsedRules().length > 0);

  // Check specific rules
  const rule = registry.getById("a.1");
  assert(rule !== undefined);
  assertEquals(rule?.targetField, 547);
  assertEquals(rule?.operator, "=");
  assertEquals(rule?.formulaAst !== null, true);
});

Deno.test("registry: indexes rules by field", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const rules547 = registry.getByField(547);
  assert(rules547.length >= 1);
  assertEquals(rules547.some((r) => r.ruleId === "a.1"), true);
});

Deno.test("registry: collects field metadata", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const rule = registry.getById("a.1");
  assert(rule !== undefined);
  assert(rule!.metadata.referencedFields.length > 0);
  assert(rule!.metadata.referencedFields.includes(545));
});

// ---------------------------------------------------------------------------
// Execution plan tests
// ---------------------------------------------------------------------------

Deno.test("execution_plan: orders rules topologically", async () => {
  const { buildExecutionPlan } = await import("../engine/execution_plan.ts");
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const calcRules = registry.rules.filter((r) => r.operator === "=" && r.formulaAst !== null);
  const { orderedRules, cycleRules } = buildExecutionPlan(calcRules);

  assertEquals(cycleRules.length, 0, "No cycles in test rules");

  // a.1 (547) must come before a.3 (553) which references 547
  const idxA1 = orderedRules.findIndex((r) => r.ruleId === "a.1");
  const idxA3 = orderedRules.findIndex((r) => r.ruleId === "a.3");
  if (idxA1 !== -1 && idxA3 !== -1) {
    assert(idxA1 < idxA3, `a.1 (idx ${idxA1}) must come before a.3 (idx ${idxA3})`);
  }

  // a.3 (553) must come before a.4 (159) which references 553
  const idxA4 = orderedRules.findIndex((r) => r.ruleId === "a.4");
  if (idxA3 !== -1 && idxA4 !== -1) {
    assert(idxA3 < idxA4, `a.3 (idx ${idxA3}) must come before a.4 (idx ${idxA4})`);
  }
});

// ---------------------------------------------------------------------------
// Calculator tests
// ---------------------------------------------------------------------------

Deno.test("calculator: computes RECUADRO 1 fields correctly", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const params = buildTestParams();
  const calculator = new Calculator(registry.rules, params);

  const declared = createSampleFormData();
  const context = createSampleFormContext();

  const result = calculator.calculate(declared, context);

  // [547] = 8,700,000
  assertEquals(result.fields.get(547), EXPECTED_COMPUTED[547]);

  // [550] = MIN(8,700,000 * 0.30, 15 * 65887) = MIN(2,610,000, 988,305) = 988,305
  assertEquals(result.fields.get(550), EXPECTED_COMPUTED[550]);

  // [553] = POS(8,700,000 - 988,305) = 7,711,695
  assertEquals(result.fields.get(553), EXPECTED_COMPUTED[553]);

  // [159] = 7,711,695 + 1,200,000 = 8,911,695
  assertEquals(result.fields.get(159), EXPECTED_COMPUTED[159]);
});

Deno.test("calculator: runs within 50ms for sample rules", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const params = buildTestParams();
  const calculator = new Calculator(registry.rules, params);

  const declared = createSampleFormData();
  const context = createSampleFormContext();

  const result = calculator.calculate(declared, context);
  assert(
    result.durationMs < 50,
    `Calculation took ${result.durationMs.toFixed(2)}ms (expected <50ms)`,
  );
});

Deno.test("calculator: reports skipped rules for unparseable formulas", () => {
  const badRules = [{
    ruleId: "x.1",
    targetFieldRaw: "[999]",
    operatorRaw: "=",
    // Unclosed function brace triggers ParseError
    formulaRaw: "POS{[547]",
    guidanceText: "bad",
  }];
  const registry = buildRuleRegistry(badRules);
  const params = buildTestParams();
  const calculator = new Calculator(registry.rules, params);

  const result = calculator.calculate(createFormData(), createSampleFormContext());
  assertEquals(result.skipped.some((s) => s.ruleId === "x.1"), true);
});

// ---------------------------------------------------------------------------
// Validator tests
// ---------------------------------------------------------------------------

Deno.test("validator: no violations when declared values match computed", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const params = buildTestParams();
  const validator = new Validator(registry.rules, params);

  // Start with empty declared, let engine compute everything
  const declared = createSampleFormData();
  const context = createSampleFormContext();

  // First compute
  const calculator = new Calculator(registry.rules, params);
  const { fields: computed } = calculator.calculate(declared, context);

  // Copy computed values into declared
  const declaredWithComputed = createFormData();
  for (const [k, v] of declared) declaredWithComputed.set(k, v);
  for (const [k, v] of computed) declaredWithComputed.set(k, v);

  const report = validator.validate(declaredWithComputed, context);
  assertEquals(report.violations.length, 0, `Unexpected violations: ${JSON.stringify(report.violations)}`);
});

Deno.test("validator: detects violation when declared value is wrong", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const params = buildTestParams();
  const validator = new Validator(registry.rules, params);

  const declared = createSampleFormData();
  declared.set(547, 9_999_999);  // Wrong: should be 8,700,000

  const context = createSampleFormContext();
  const report = validator.validate(declared, context);

  const violation = report.violations.find((v) => v.targetField === 547);
  assert(violation !== undefined, "Expected violation on field 547");
  assertEquals(violation!.severity, "error");
});

// ---------------------------------------------------------------------------
// Optimizer tests
// ---------------------------------------------------------------------------

Deno.test("optimizer: returns suggestions for deductible fields", () => {
  const registry = buildRuleRegistry(SAMPLE_RAW_RULES);
  const params = buildTestParams();
  const optimizer = new Optimizer(registry.rules, params);

  const declared = createSampleFormData();
  // Set zero for deductible fields to maximize suggestions
  declared.set(765, 0);

  const context = createSampleFormContext();
  const report = optimizer.optimize(declared, context);

  assert(report.suggestions.length > 0, "Expected optimization suggestions");
  console.log(`Found ${report.suggestions.length} optimization suggestions`);
  console.log(`Estimated total saving: $${report.totalEstimatedSaving.toLocaleString()}`);
});
