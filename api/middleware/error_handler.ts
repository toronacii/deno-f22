/**
 * Global error handler middleware.
 * Converts unhandled exceptions into structured JSON error responses.
 */

import type { Context, Next } from "hono";
import type { ErrorResponse } from "../types/api_types.ts";

export async function errorHandler(c: Context, next: Next): Promise<Response> {
  try {
    await next();
    return c.res;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[API Error]", message);

    const body: ErrorResponse = {
      error: "Internal server error",
      detail: Deno.env.get("DENO_ENV") !== "production" ? message : undefined,
    };

    return c.json(body, 500);
  }
}

/** Validate that required fields exist in parsed JSON body */
export function requireFields(
  body: unknown,
  fields: string[],
): body is Record<string, unknown> {
  if (!body || typeof body !== "object") return false;
  const obj = body as Record<string, unknown>;
  return fields.every((f) => f in obj);
}
