/**
 * GET /api/params
 * Returns all tributary parameters as JSON (for browser engine bootstrap).
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";

export async function paramsHandler(c: Context): Promise<Response> {
  const { params } = await getEngine();
  const list = Array.from(params.values());
  return c.json(list);
}
