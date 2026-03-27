/**
 * CORS middleware configuration.
 * In development, allows all origins.
 * In production, restrict to the deployed frontend origin via ALLOWED_ORIGIN env var.
 */

import { cors } from "hono/cors";

const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") ?? "*";

export const corsMiddleware = cors({
  origin: allowedOrigin,
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
});
