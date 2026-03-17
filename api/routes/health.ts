/**
 * GET /api/health
 *
 * Returns engine status: loaded, rule counts, parse rate, uptime.
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";

const startedAt = new Date();

export async function healthHandler(c: Context): Promise<Response> {
  const engine = await getEngine();

  const total = engine.ruleRegistry.rules.length;
  const parsed = engine.ruleRegistry.parsedRules().length;
  const fields = engine.fieldRegistry.getAll().length;

  return c.json({
    status: "ok",
    version: "1.0.0",
    yearTributario: "AT2026",
    engine: {
      loadedAt: engine.loadedAt.toISOString(),
      rules: { total, parsed, parseErrors: total - parsed, parseRate: engine.parseRate },
      fields,
    },
    uptime: Math.round((Date.now() - startedAt.getTime()) / 1000),
  });
}
