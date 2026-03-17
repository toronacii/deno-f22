/**
 * Unit tests for the formula evaluator.
 */

import { assertEquals } from "@std/assert";
import { parseFormula } from "../parser/parser.ts";
import { EvalContext } from "../evaluator/eval_context.ts";
import { evaluateExpr } from "../evaluator/evaluator.ts";
import { applyFunction } from "../evaluator/functions.ts";
import { buildParameterStore } from "../models/parameter.ts";
import { createFormData, createFormContext } from "../models/form.ts";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function makeCtx(
  fields: Record<number, number> = {},
  params: Record<number, number> = {},
  options: { entityType?: number; taxRegime?: string; isRectificatoria?: boolean } = {},
) {
  const data = createFormData();
  for (const [k, v] of Object.entries(fields)) data.set(parseInt(k), v);

  const paramList = Object.entries(params).map(([k, v]) => ({
    id: `P${k}`,
    num: parseInt(k),
    value: v,
    description: `P${k}`,
  }));
  const paramStore = buildParameterStore(paramList);

  const ctx = createFormContext({
    entityType: (options.entityType ?? 1) as 1,
    taxRegime: (options.taxRegime as any) ?? "14D8",
    isRectificatoria: options.isRectificatoria ?? false,
  });

  return new EvalContext(data, createFormData(), paramStore, ctx);
}

function evalFormula(formula: string, ctx: EvalContext): number {
  const { ast } = parseFormula(formula);
  if (!ast) throw new Error(`Parse failed: ${formula}`);
  return evaluateExpr(ast, ctx);
}

// ---------------------------------------------------------------------------
// Function tests
// ---------------------------------------------------------------------------

Deno.test("functions: POS returns max(0, x)", () => {
  assertEquals(applyFunction("POS", [5]), 5);
  assertEquals(applyFunction("POS", [-3]), 0);
  assertEquals(applyFunction("POS", [0]), 0);
});

Deno.test("functions: NEG returns abs(min(0, x))", () => {
  assertEquals(applyFunction("NEG", [-5]), 5);
  assertEquals(applyFunction("NEG", [3]), 0);
  assertEquals(applyFunction("NEG", [0]), 0);
});

Deno.test("functions: MIN returns minimum", () => {
  assertEquals(applyFunction("MIN", [3, 5]), 3);
  assertEquals(applyFunction("MIN", [5, 3]), 3);
});

Deno.test("functions: MAX returns maximum", () => {
  assertEquals(applyFunction("MAX", [3, 5]), 5);
  assertEquals(applyFunction("MAX", [5, 3]), 5);
});

Deno.test("functions: ABS returns absolute value", () => {
  assertEquals(applyFunction("ABS", [-7]), 7);
  assertEquals(applyFunction("ABS", [7]), 7);
});

Deno.test("functions: ROUND rounds to integer", () => {
  assertEquals(applyFunction("ROUND", [3.7]), 4);
  assertEquals(applyFunction("ROUND", [3.2]), 3);
});

Deno.test("functions: TIPO returns entity type", () => {
  assertEquals(applyFunction("TIPO", [1], 2), 2);  // context type, not arg
});

// ---------------------------------------------------------------------------
// Evaluator tests with field references
// ---------------------------------------------------------------------------

Deno.test("evaluator: simple field addition a.1 style", () => {
  const ctx = makeCtx({ 545: 8_000_000, 461: 500_000, 856: 0, 1650: 200_000 });
  const result = evalFormula("[545] + [461] + [856] + [1650]", ctx);
  assertEquals(result, 8_700_000);
});

Deno.test("evaluator: POS function (a.3 style)", () => {
  const ctx = makeCtx({ 547: 8_700_000, 550: 988_305 });
  const result = evalFormula("POS{[547] - [550]}", ctx);
  assertEquals(result, 7_711_695);
});

Deno.test("evaluator: MIN function (a.2 style)", () => {
  // MIN{[547]*P24; P42*P29} = MIN{8,700,000*0.30; 15*65887} = MIN{2,610,000; 988,305} = 988,305
  const ctx = makeCtx({ 547: 8_700_000 }, { 24: 0.30, 42: 15, 29: 65887 });
  const result = evalFormula("MIN{[547] * P24; P42 * P29}", ctx);
  assertEquals(result, 988_305);
});

Deno.test("evaluator: Si/entonces/Sino true branch", () => {
  const ctx = makeCtx({ 159: 5_000_000 }, { 12: 0.35 });
  const result = evalFormula("Si [159] > 0 entonces [159] * P12\nSino 0", ctx);
  assertEquals(result, 1_750_000);
});

Deno.test("evaluator: Si/entonces/Sino false branch", () => {
  const ctx = makeCtx({ 159: 0 }, { 12: 0.35 });
  const result = evalFormula("Si [159] > 0 entonces [159] * P12\nSino 0", ctx);
  assertEquals(result, 0);
});

Deno.test("evaluator: TIPO condition matches entity type", () => {
  const ctx = makeCtx({ 159: 9_000_000 }, {}, { entityType: 1 });
  const result = evalFormula("Si TIPO{[03]} = 1 entonces [159]\nSino 0", ctx);
  assertEquals(result, 9_000_000);
});

Deno.test("evaluator: TIPO condition does not match", () => {
  const ctx = makeCtx({ 159: 9_000_000 }, {}, { entityType: 2 });
  const result = evalFormula("Si TIPO{[03]} = 1 entonces [159]\nSino 0", ctx);
  assertEquals(result, 0);
});

Deno.test("evaluator: atributo condition matches regime", () => {
  const ctx = makeCtx({ 170: 5_000_000 }, { 8: 0.30, 9: 0.27 }, { taxRegime: "M14A" });
  const result = evalFormula("Si atributo = M14A entonces [170] * P08\nSino [170] * P09", ctx);
  assertEquals(result, 1_500_000);  // 5,000,000 * 0.30
});

Deno.test("evaluator: atributo condition falls to else", () => {
  const ctx = makeCtx({ 170: 5_000_000 }, { 8: 0.30, 9: 0.27 }, { taxRegime: "14D1" });
  const result = evalFormula("Si atributo = M14A entonces [170] * P08\nSino [170] * P09", ctx);
  assertEquals(result, 1_350_000);  // 5,000,000 * 0.27
});

Deno.test("evaluator: rectificatoria condition (not rectificatoria)", () => {
  const ctx = makeCtx({ 200: 1_000_000 }, {}, { isRectificatoria: false });
  const result = evalFormula("Si F22 NO es Rectificatoria entonces [200]\nSino 0", ctx);
  assertEquals(result, 1_000_000);
});

Deno.test("evaluator: rectificatoria condition (is rectificatoria)", () => {
  const ctx = makeCtx({ 200: 1_000_000 }, {}, { isRectificatoria: true });
  const result = evalFormula("Si F22 NO es Rectificatoria entonces [200]\nSino 0", ctx);
  assertEquals(result, 0);
});

Deno.test("evaluator: binding variable", () => {
  const ctx = makeCtx({ 159: 10_000_000, 547: 5_000_000 }, { 8: 0.30 });
  const result = evalFormula("Alfa = [159] * P08\n[547] + Alfa", ctx);
  // Alfa = 10,000,000 * 0.30 = 3,000,000
  // [547] + Alfa = 5,000,000 + 3,000,000 = 8,000,000
  assertEquals(result, 8_000_000);
});

Deno.test("evaluator: division by zero returns 0", () => {
  const ctx = makeCtx({ 547: 1_000_000 });
  const result = evalFormula("[547] / 0", ctx);
  assertEquals(result, 0);
});

Deno.test("evaluator: missing field returns 0", () => {
  const ctx = makeCtx({});
  const result = evalFormula("[999]", ctx);
  assertEquals(result, 0);
});

Deno.test("evaluator: unary minus", () => {
  const ctx = makeCtx({ 547: 5_000_000 });
  const result = evalFormula("-[547]", ctx);
  assertEquals(result, -5_000_000);
});

Deno.test("evaluator: compound .y. condition both true", () => {
  const ctx = makeCtx({ 547: 5_000_000, 550: 1_000_000, 553: 4_000_000 });
  const result = evalFormula("Si [547] > 0 .y. [550] > 0 entonces [553]\nSino 0", ctx);
  assertEquals(result, 4_000_000);
});

Deno.test("evaluator: compound .y. condition one false", () => {
  const ctx = makeCtx({ 547: 5_000_000, 550: 0, 553: 4_000_000 });
  const result = evalFormula("Si [547] > 0 .y. [550] > 0 entonces [553]\nSino 0", ctx);
  assertEquals(result, 0);
});
