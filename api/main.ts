/**
 * F22 AT2026 API — Entry point
 *
 * Start:  deno task start
 * Dev:    deno task dev
 */

import { Hono } from "hono";
import { logger } from "hono/logger";
import { corsMiddleware } from "./middleware/cors.ts";
import { errorHandler } from "./middleware/error_handler.ts";
import { calculateHandler } from "./routes/calculate.ts";
import { validateHandler } from "./routes/validate.ts";
import { optimizeHandler } from "./routes/optimize.ts";
import { fieldsHandler, fieldByCodeHandler } from "./routes/fields.ts";
import { rulesHandler, ruleByIdHandler } from "./routes/rules.ts";
import { healthHandler } from "./routes/health.ts";
import { paramsHandler } from "./routes/params.ts";
import { layoutHandler } from "./routes/layout.ts";
import { getEngine } from "./engine_singleton.ts";

const app = new Hono();

// ---------------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------------
app.use("*", corsMiddleware);
app.use("*", logger());
app.use("*", errorHandler);

// ---------------------------------------------------------------------------
// Routes — /api/v1/
// ---------------------------------------------------------------------------
const v1 = new Hono();

v1.get("/health", healthHandler);
v1.get("/params", paramsHandler);

v1.post("/calculate", calculateHandler);
v1.post("/validate", validateHandler);
v1.post("/optimize", optimizeHandler);

v1.get("/fields", fieldsHandler);
v1.get("/fields/:code", fieldByCodeHandler);

v1.get("/rules", rulesHandler);
v1.get("/rules/:id", ruleByIdHandler);

v1.get("/layout", layoutHandler);

// Any unmatched /api/v1/* path → JSON 404 (never fall through to SPA)
v1.all("*", (c) => c.json({ error: "Not found" }, 404));

app.route("/api/v1", v1);

// ---------------------------------------------------------------------------
// Static frontend (web/dist/) — SPA fallback to index.html
// ---------------------------------------------------------------------------
const STATIC_ROOT = new URL("../web/dist", import.meta.url).pathname;
const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".ico":  "image/x-icon",
  ".json": "application/json",
  ".woff2": "font/woff2",
};

app.get("*", async (c) => {
  const url   = new URL(c.req.url);
  const path  = url.pathname;
  const ext   = path.includes(".") ? path.slice(path.lastIndexOf(".")) : "";
  const candidates = ext
    ? [`${STATIC_ROOT}${path}`]
    : [`${STATIC_ROOT}${path}/index.html`, `${STATIC_ROOT}/index.html`];

  for (const file of candidates) {
    try {
      const data = await Deno.readFile(file);
      const mime = MIME[ext] ?? MIME[".html"];
      return new Response(data, { headers: { "Content-Type": mime } });
    } catch { /* try next */ }
  }
  return c.json({ error: "Not found" }, 404);
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
const port = parseInt(Deno.env.get("PORT") ?? "8000");

// Eagerly load engine on startup so first request is fast
getEngine().catch((e) => {
  console.error("[Engine] Failed to load:", e);
  Deno.exit(1);
});

console.log(`[API] Listening on http://localhost:${port}`);

Deno.serve({ port }, app.fetch);
