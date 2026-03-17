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
// Routes
// ---------------------------------------------------------------------------
app.get("/api/health", healthHandler);
app.get("/api/params", paramsHandler);

app.post("/api/calculate", calculateHandler);
app.post("/api/validate", validateHandler);
app.post("/api/optimize", optimizeHandler);

app.get("/api/fields", fieldsHandler);
app.get("/api/fields/:code", fieldByCodeHandler);

app.get("/api/rules", rulesHandler);
app.get("/api/rules/:id", ruleByIdHandler);

app.get("/api/layout", layoutHandler);

// 404 catch-all
app.notFound((c) => c.json({ error: "Not found" }, 404));

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
