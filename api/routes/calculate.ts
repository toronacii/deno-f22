/**
 * POST /api/calculate
 *
 * Computes all derived fields for the given form data.
 *
 * Request body: FormRequest
 * Response: CalculateResponse
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";
import { parseFormRequest } from "../types/request_parser.ts";
import type { CalculateResponse, FormRequest } from "../types/api_types.ts";

export async function calculateHandler(c: Context): Promise<Response> {
  const body = await c.req.json<FormRequest>();
  const parsed = parseFormRequest(body);

  if (!parsed.ok) {
    return c.json({ error: "Invalid request", detail: parsed.errors }, 400);
  }

  const { calculator } = await getEngine();
  const result = calculator.calculate(parsed.data.formData, parsed.data.context);

  // Serialize FormData (Map<number,number>) to Record<string,number>
  const fieldValues: Record<string, number> = {};
  for (const [code, value] of result.fields) {
    fieldValues[String(code)] = value;
  }

  const response: CalculateResponse = {
    fieldValues,
    computed: result.fieldResults.map((r) => ({
      code: r.code,
      value: r.value,
      ruleId: r.ruleId,
      isComputed: r.isComputed,
    })),
    skipped: result.skipped,
    durationMs: Math.round(result.durationMs * 100) / 100,
  };

  return c.json(response);
}
