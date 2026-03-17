/**
 * Unit tests for the formula parser.
 */

import { assertEquals, assertExists, assertStringIncludes } from "@std/assert";
import { normalizeFormula } from "../parser/normalizer.ts";
import { tokenize } from "../parser/tokenizer.ts";
import { TokenKind } from "../parser/token_types.ts";
import { parseFormula } from "../parser/parser.ts";
import { SAMPLE_RAW_RULES } from "./fixtures/sample_rules.ts";

// ---------------------------------------------------------------------------
// Normalizer tests
// ---------------------------------------------------------------------------

Deno.test("normalizer: replaces Unicode operators", () => {
  assertEquals(normalizeFormula("[547] ≤ [550]"), "[547] <= [550]");
  assertEquals(normalizeFormula("[547] ≥ [550]"), "[547] >= [550]");
  assertEquals(normalizeFormula("[547] ≠ 0"), "[547] != 0");
});

Deno.test("normalizer: fixes malformed brackets", () => {
  assertEquals(normalizeFormula("{547]"), "[547]");
  assertEquals(normalizeFormula("[547}"), "[547]");
});

Deno.test("normalizer: normalizes whitespace inside brackets", () => {
  assertEquals(normalizeFormula("[ 547 ]"), "[547]");
  assertEquals(normalizeFormula("[547 ]"), "[547]");
});

Deno.test("normalizer: normalizes logical operators", () => {
  assertEquals(normalizeFormula("[a] .Y. [b]"), "[a] .y. [b]");
  assertEquals(normalizeFormula("[a] .O. [b]"), "[a] .o. [b]");
});

Deno.test("normalizer: normalizes keywords", () => {
  const result = normalizeFormula("SI [547] > 0 ENTONCES [547] Sino 0");
  assertEquals(result, "Si [547] > 0 entonces [547] Sino 0");
});

// ---------------------------------------------------------------------------
// Tokenizer tests
// ---------------------------------------------------------------------------

Deno.test("tokenizer: tokenizes field references", () => {
  const tokens = tokenize("[547] + [550]");
  assertEquals(tokens[0].kind, TokenKind.FIELD_REF);
  assertEquals(tokens[0].value, "547");
  assertEquals(tokens[1].kind, TokenKind.PLUS);
  assertEquals(tokens[2].kind, TokenKind.FIELD_REF);
  assertEquals(tokens[2].value, "550");
});

Deno.test("tokenizer: tokenizes parameter references", () => {
  const tokens = tokenize("P08 + P647");
  assertEquals(tokens[0].kind, TokenKind.PARAM_REF);
  assertEquals(parseInt(tokens[0].value), 8);  // stripped "P", may have leading zero
  assertEquals(tokens[2].kind, TokenKind.PARAM_REF);
  assertEquals(parseInt(tokens[2].value), 647);
});

Deno.test("tokenizer: tokenizes function names", () => {
  const tokens = tokenize("POS{[547]}");
  assertEquals(tokens[0].kind, TokenKind.FUNC_POS);
  assertEquals(tokens[1].kind, TokenKind.LBRACE);
  assertEquals(tokens[2].kind, TokenKind.FIELD_REF);
  assertEquals(tokens[3].kind, TokenKind.RBRACE);
});

Deno.test("tokenizer: tokenizes Si/entonces/Sino keywords", () => {
  const tokens = tokenize("Si [547] > 0 entonces [547]\nSino 0");
  assertEquals(tokens[0].kind, TokenKind.KW_SI);
  // find entonces
  const entonces = tokens.find((t) => t.kind === TokenKind.KW_ENTONCES);
  assertExists(entonces);
  const sino = tokens.find((t) => t.kind === TokenKind.KW_SINO);
  assertExists(sino);
});

Deno.test("tokenizer: tokenizes logical operators", () => {
  const tokens = tokenize("[547] .y. [550] .o. [553]");
  const andTok = tokens.find((t) => t.kind === TokenKind.AND);
  assertExists(andTok);
  const orTok = tokens.find((t) => t.kind === TokenKind.OR);
  assertExists(orTok);
});

Deno.test("tokenizer: tokenizes regime identifiers", () => {
  const tokens = tokenize("atributo = M14A .o. 14D1");
  assertEquals(tokens[0].kind, TokenKind.KW_ATRIBUTO);
  const regime = tokens.find((t) => t.kind === TokenKind.REGIME_ID);
  assertExists(regime);
  assertEquals(regime.value, "M14A");
});

// ---------------------------------------------------------------------------
// Parser tests
// ---------------------------------------------------------------------------

Deno.test("parser: parses simple arithmetic", () => {
  const { ast, error } = parseFormula("[545] + [461] + [856] + [1650]");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "binary");
});

Deno.test("parser: parses POS function", () => {
  const { ast, error } = parseFormula("POS{[547] - [550]}");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "func");
  if (ast.kind === "func") {
    assertEquals(ast.name, "POS");
    assertEquals(ast.args.length, 1);
  }
});

Deno.test("parser: parses MIN function with two args", () => {
  const { ast, error } = parseFormula("MIN{[547] * P24; P42 * P29}");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "func");
  if (ast.kind === "func") {
    assertEquals(ast.name, "MIN");
    assertEquals(ast.args.length, 2);
  }
});

Deno.test("parser: parses Si/entonces/Sino", () => {
  const { ast, error } = parseFormula("Si [159] > 0 entonces [159] * P12\nSino 0");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "if");
  if (ast.kind === "if") {
    assertEquals(ast.condition.kind, "compare");
    assertEquals(ast.then.kind, "binary");
    assertEquals(ast.else.kind, "number");
  }
});

Deno.test("parser: parses TIPO condition", () => {
  const { ast, error } = parseFormula("Si TIPO{[03]} = 1 entonces [159]\nSino 0");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "if");
  if (ast.kind === "if") {
    assertEquals(ast.condition.kind, "tipo");
  }
});

Deno.test("parser: parses atributo condition", () => {
  const { ast, error } = parseFormula("Si atributo = M14A entonces [170] * P08\nSino [170] * P09");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "if");
  if (ast.kind === "if") {
    assertEquals(ast.condition.kind, "atributo_check");
    if (ast.condition.kind === "atributo_check") {
      assertEquals(ast.condition.values.includes("M14A"), true);
    }
  }
});

Deno.test("parser: parses rectificatoria condition", () => {
  const { ast, error } = parseFormula("Si F22 NO es Rectificatoria entonces [200]\nSino 0");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "if");
  if (ast.kind === "if") {
    assertEquals(ast.condition.kind, "rectificatoria");
    if (ast.condition.kind === "rectificatoria") {
      assertEquals(ast.condition.negated, true);
    }
  }
});

Deno.test("parser: parses binding variable", () => {
  const { ast, error } = parseFormula("Alfa = [159] * P08\n[547] + Alfa");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "binding");
  if (ast.kind === "binding") {
    assertEquals(ast.name, "Alfa");
  }
});

Deno.test("parser: parses .y. compound condition", () => {
  const { ast, error } = parseFormula("Si [547] > 0 .y. [550] > 0 entonces [553]\nSino 0");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "if");
  if (ast.kind === "if") {
    assertEquals(ast.condition.kind, "and");
  }
});

Deno.test("parser: handles NEG function", () => {
  const { ast, error } = parseFormula("NEG{[547] - [550]}");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "func");
  if (ast.kind === "func") assertEquals(ast.name, "NEG");
});

Deno.test("parser: handles negative numbers", () => {
  const { ast, error } = parseFormula("-[547]");
  assertEquals(error, undefined);
  assertExists(ast);
  assertEquals(ast.kind, "unary");
});

// ---------------------------------------------------------------------------
// Batch test on sample rules
// ---------------------------------------------------------------------------

Deno.test("parser: sample rules parse rate ≥ 80%", () => {
  let parsed = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const raw of SAMPLE_RAW_RULES) {
    if (!raw.formulaRaw) { parsed++; continue; }
    const { ast, error } = parseFormula(raw.formulaRaw);
    if (ast !== null) {
      parsed++;
    } else {
      failed++;
      failures.push(`${raw.ruleId}: ${error}`);
    }
  }

  const total = parsed + failed;
  const rate = parsed / total;
  console.log(`Parse rate: ${parsed}/${total} (${(rate * 100).toFixed(1)}%)`);
  if (failures.length > 0) {
    console.log("Failures:", failures);
  }

  // We expect at least 80% parse rate for sample rules
  assertEquals(rate >= 0.80, true, `Parse rate ${rate} < 80%`);
});
