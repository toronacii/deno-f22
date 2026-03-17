/**
 * POST /api/validate
 *
 * Validates declared field values against CSW rules.
 * Returns a list of violations where declared ≠ calculated (±1 peso tolerance).
 *
 * Request body: FormRequest
 * Response: ValidateResponse
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";
import { parseFormRequest } from "../types/request_parser.ts";
import type { ValidateResponse, FormRequest } from "../types/api_types.ts";

export async function validateHandler(c: Context): Promise<Response> {
  const body = await c.req.json<FormRequest>();
  const parsed = parseFormRequest(body);

  if (!parsed.ok) {
    return c.json({ error: "Invalid request", detail: parsed.errors }, 400);
  }

  const { validator } = await getEngine();
  const report = validator.validate(parsed.data.formData, parsed.data.context);

  const response: ValidateResponse = {
    valid: report.violations.length === 0,
    violations: report.violations,
    passedCount: report.passedCount,
    failedCount: report.failedCount,
    skippedCount: report.skippedCount,
  };

  return c.json(response);
}
