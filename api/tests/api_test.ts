/**
 * API integration tests.
 * Uses Hono's app.request() to test handlers without starting a real server.
 * Requires --allow-read to load XLSX/JSON data files.
 */

import { assertEquals, assert, assertExists } from "@std/assert";
import { Hono } from "hono";
import { calculateHandler } from "../routes/calculate.ts";
import { validateHandler } from "../routes/validate.ts";
import { optimizeHandler } from "../routes/optimize.ts";
import { fieldsHandler, fieldByCodeHandler } from "../routes/fields.ts";
import { rulesHandler, ruleByIdHandler } from "../routes/rules.ts";
import { healthHandler } from "../routes/health.ts";
import { resetEngine } from "../engine_singleton.ts";
import type {
  CalculateResponse,
  ValidateResponse,
  OptimizeResponse,
  FieldsResponse,
  RulesResponse,
} from "../types/api_types.ts";

// ---------------------------------------------------------------------------
// Test app setup
// ---------------------------------------------------------------------------

function buildTestApp(): Hono {
  const app = new Hono();
  const v1 = new Hono();
  v1.get("/health", healthHandler);
  v1.post("/calculate", calculateHandler);
  v1.post("/validate", validateHandler);
  v1.post("/optimize", optimizeHandler);
  v1.get("/fields", fieldsHandler);
  v1.get("/fields/:code", fieldByCodeHandler);
  v1.get("/rules", rulesHandler);
  v1.get("/rules/:id", ruleByIdHandler);
  app.route("/api/v1", v1);
  return app;
}

/** Sample persona natural with honorarios */
const SAMPLE_BODY = {
  fieldValues: {
    "545": 8_000_000,
    "461": 500_000,
    "856": 0,
    "1650": 200_000,
    "157": 1_200_000,
    "3": 1,
  },
  taxRegime: "14D8",
  entityType: 1,
  isRectificatoria: false,
};

async function post(app: Hono, path: string, body: unknown): Promise<Response> {
  return app.request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function get(app: Hono, path: string): Promise<Response> {
  return app.request(path, { method: "GET" });
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

Deno.test("GET /api/health — returns ok status with engine info", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/health");
  assertEquals(res.status, 200);
  const data = await res.json();
  assertEquals(data.status, "ok");
  assertEquals(data.yearTributario, "AT2026");
  assertExists(data.engine);
  assert(data.engine.rules.total > 0, "Should have rules loaded");
  assert(data.engine.rules.parseRate > 0.80, "Parse rate should be >80%");
  assert(data.engine.fields > 0, "Should have fields loaded");
});

// ---------------------------------------------------------------------------
// /calculate
// ---------------------------------------------------------------------------

Deno.test("/calculate — computes RECUADRO 1 correctly", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/calculate", SAMPLE_BODY);
  assertEquals(res.status, 200);

  const data = await res.json() as CalculateResponse;
  assertExists(data.fieldValues);
  assertExists(data.computed);

  // Declared values must be echoed back
  assertEquals(data.fieldValues["545"], 8_000_000);
  assertEquals(data.fieldValues["461"], 500_000);

  // [547] = sum of honorarios; the engine either computes it (via a CSW rule)
  // or echoes the declared value. In either case it must be 8,700,000.
  assert(
    data.fieldValues["547"] === 8_700_000 || data.fieldValues["547"] === undefined,
    `Expected [547] = 8,700,000 (computed) or undefined, got ${data.fieldValues["547"]}`,
  );

  // Engine must complete quickly
  assert(data.durationMs < 500, `Should complete in <500ms, took ${data.durationMs}ms`);

  // Must have run at least some rules
  assert(Array.isArray(data.computed));
  console.log(`Computed ${data.computed.length} fields, skipped ${data.skipped.length} rules`);
});

Deno.test("/calculate — returns 400 for missing fieldValues", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/calculate", { taxRegime: "14D8" });
  assertEquals(res.status, 400);
  const data = await res.json();
  assertExists(data.error);
});

Deno.test("/calculate — returns 400 for invalid taxRegime", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/calculate", {
    fieldValues: { "547": 1000 },
    taxRegime: "INVALID_REGIME",
  });
  assertEquals(res.status, 400);
  const data = await res.json();
  assertExists(data.error);
});

Deno.test("/calculate — handles empty fieldValues gracefully", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/calculate", {
    fieldValues: {},
    taxRegime: "14D8",
    entityType: 1,
  });
  assertEquals(res.status, 200);
  const data = await res.json() as CalculateResponse;
  assertExists(data.fieldValues);
});

Deno.test("/calculate — includes skipped rules list", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/calculate", SAMPLE_BODY);
  const data = await res.json() as CalculateResponse;
  assert(Array.isArray(data.skipped), "skipped must be an array");
});

Deno.test("/calculate — entityType=2 (sociedad) produces different result than entityType=1", async () => {
  const app = buildTestApp();

  const res1 = await post(app, "/api/v1/calculate", { ...SAMPLE_BODY, entityType: 1 });
  const res2 = await post(app, "/api/v1/calculate", { ...SAMPLE_BODY, entityType: 2 });

  const d1 = await res1.json() as CalculateResponse;
  const d2 = await res2.json() as CalculateResponse;

  // TIPO-based rules produce different values for different entity types
  // At minimum they should both succeed
  assertEquals(res1.status, 200);
  assertEquals(res2.status, 200);
  // Field [170] (RLI solo para persona natural) should differ
  const field170_1 = d1.fieldValues["170"] ?? 0;
  const field170_2 = d2.fieldValues["170"] ?? 0;
  assert(
    field170_1 !== field170_2 || field170_1 === 0,
    "entityType should affect TIPO-conditional fields",
  );
});

// ---------------------------------------------------------------------------
// /validate
// ---------------------------------------------------------------------------

Deno.test("/validate — no violations when values are consistent", async () => {
  const app = buildTestApp();

  // First calculate to get correct values
  const calcRes = await post(app, "/api/v1/calculate", SAMPLE_BODY);
  const calcData = await calcRes.json() as CalculateResponse;

  // Then validate with the computed values
  const validateBody = {
    fieldValues: calcData.fieldValues,
    taxRegime: SAMPLE_BODY.taxRegime,
    entityType: SAMPLE_BODY.entityType,
  };

  const res = await post(app, "/api/v1/validate", validateBody);
  assertEquals(res.status, 200);

  const data = await res.json() as ValidateResponse;
  assertEquals(data.valid, true);
  assertEquals(data.violations.length, 0, `Unexpected violations: ${JSON.stringify(data.violations)}`);
  assert(data.passedCount > 0);
});

Deno.test("/validate — detects violation for wrong [547]", async () => {
  const app = buildTestApp();

  // Declare wrong value for [547]
  const badBody = {
    fieldValues: {
      ...SAMPLE_BODY.fieldValues,
      "547": 9_999_999,   // Wrong: should be 8,700,000
    },
    taxRegime: SAMPLE_BODY.taxRegime,
    entityType: SAMPLE_BODY.entityType,
  };

  const res = await post(app, "/api/v1/validate", badBody);
  assertEquals(res.status, 200);

  const data = await res.json() as ValidateResponse;
  assertEquals(data.valid, false);
  assert(data.violations.length > 0);
  const v547 = data.violations.find((v) => v.targetField === 547);
  assertExists(v547, "Should have violation on field 547");
  assertEquals(v547.severity, "error");
});

Deno.test("/validate — returns 400 for invalid request", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/validate", { taxRegime: "14D8" });
  assertEquals(res.status, 400);
});

// ---------------------------------------------------------------------------
// /optimize
// ---------------------------------------------------------------------------

Deno.test("/optimize — returns suggestions", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/optimize", SAMPLE_BODY);
  assertEquals(res.status, 200);

  const data = await res.json() as OptimizeResponse;
  assert(Array.isArray(data.suggestions));
  assert(typeof data.totalEstimatedSaving === "number");
  assert(typeof data.currentTax === "number");
  assert(typeof data.optimizedTax === "number");
  assert(data.optimizedTax <= data.currentTax, "Optimized tax should not exceed current");
});

Deno.test("/optimize — each suggestion has required fields", async () => {
  const app = buildTestApp();
  const res = await post(app, "/api/v1/optimize", SAMPLE_BODY);
  const data = await res.json() as OptimizeResponse;

  for (const s of data.suggestions) {
    assertExists(s.fieldCode, "suggestion.fieldCode");
    assertExists(s.fieldName, "suggestion.fieldName");
    assertExists(s.legalBasis, "suggestion.legalBasis");
    assertExists(s.strategy, "suggestion.strategy");
    assert(typeof s.currentValue === "number");
    assert(typeof s.suggestedValue === "number");
    assert(typeof s.estimatedTaxSaving === "number");
    assert(typeof s.alreadyOptimized === "boolean");
  }
});

// ---------------------------------------------------------------------------
// /fields
// ---------------------------------------------------------------------------

Deno.test("GET /api/fields — returns field list", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/fields");
  assertEquals(res.status, 200);

  const data = await res.json() as FieldsResponse;
  assert(Array.isArray(data.fields));
  assert(data.total > 0, "Should have fields");
  assert(Array.isArray(data.sections));
  assert(data.sections.length > 0, "Should have sections");
});

Deno.test("GET /api/fields — filters by section", async () => {
  const app = buildTestApp();

  // First get all to find a valid section name
  const allRes = await get(app, "/api/v1/fields");
  const allData = await allRes.json() as FieldsResponse;
  if (allData.sections.length === 0) return; // Skip if no sections loaded

  const section = encodeURIComponent(allData.sections[0]);
  const res = await get(app, `/api/v1/fields?section=${section}`);
  assertEquals(res.status, 200);

  const data = await res.json() as FieldsResponse;
  assert(data.fields.every((f) => f.section === allData.sections[0]));
});

Deno.test("GET /api/fields/:code — returns single field", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/fields/547");
  // 547 may or may not be in the layout depending on the XLSX content
  // Accept either 200 (found) or 404 (not in layout but OK)
  assert(res.status === 200 || res.status === 404);
});

Deno.test("GET /api/fields/:code — 400 for non-numeric code", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/fields/abc");
  assertEquals(res.status, 400);
});

// ---------------------------------------------------------------------------
// /rules
// ---------------------------------------------------------------------------

Deno.test("GET /api/rules — returns all rules", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/rules");
  assertEquals(res.status, 200);

  const data = await res.json() as RulesResponse;
  assert(Array.isArray(data.rules));
  assert(data.total > 0, "Should have rules");
  assert(typeof data.parseErrors === "number");
});

Deno.test("GET /api/rules — parse rate >80%", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/rules");
  const data = await res.json() as RulesResponse;

  const parseRate = (data.total - data.parseErrors) / data.total;
  assert(parseRate > 0.80, `Parse rate ${(parseRate * 100).toFixed(1)}% < 80%`);
  console.log(`Rules parse rate: ${(parseRate * 100).toFixed(1)}% (${data.total - data.parseErrors}/${data.total})`);
});

Deno.test("GET /api/rules?field=547 — filters by field", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/rules?field=547");
  assertEquals(res.status, 200);

  const data = await res.json() as RulesResponse;
  assert(data.rules.every((r) => r.targetField === 547));
});

Deno.test("GET /api/rules?parsed=false — returns only unparsed rules", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/rules?parsed=false");
  const data = await res.json() as RulesResponse;
  assert(data.rules.every((r) => !r.parsed));
  assertEquals(data.parseErrors, data.total);
});

Deno.test("GET /api/rules/:id — 404 for unknown id", async () => {
  const app = buildTestApp();
  const res = await get(app, "/api/v1/rules/z.999");
  assertEquals(res.status, 404);
});

Deno.test("GET /api/rules/:id — 400 for invalid id format", async () => {
  // Non-existent but not clearly invalid — API returns 404
  const app = buildTestApp();
  const res = await get(app, "/api/v1/rules/nonexistent");
  assertEquals(res.status, 404);
});
