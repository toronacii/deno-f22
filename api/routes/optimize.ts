/**
 * POST /api/optimize
 *
 * Analyzes the form and suggests legal deductions to minimize tax liability.
 *
 * Request body: FormRequest
 * Response: OptimizeResponse
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";
import { parseFormRequest } from "../types/request_parser.ts";
import type { OptimizeResponse, FormRequest } from "../types/api_types.ts";

export async function optimizeHandler(c: Context): Promise<Response> {
  const body = await c.req.json<FormRequest>();
  const parsed = parseFormRequest(body);

  if (!parsed.ok) {
    return c.json({ error: "Invalid request", detail: parsed.errors }, 400);
  }

  const { optimizer } = await getEngine();
  const report = optimizer.optimize(parsed.data.formData, parsed.data.context);

  const response: OptimizeResponse = {
    suggestions: report.suggestions,
    totalEstimatedSaving: report.totalEstimatedSaving,
    currentTax: report.currentTax,
    optimizedTax: report.optimizedTax,
  };

  return c.json(response);
}
