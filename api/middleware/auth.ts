/**
 * Middleware de autenticación — valida Bearer JWT de Supabase.
 *
 * Uso en rutas protegidas:
 *   router.use("*", authMiddleware);
 *
 * Variables disponibles en el contexto después del middleware:
 *   c.get("userId")    → UUID del usuario
 *   c.get("userEmail") → email del usuario
 *   c.get("userJwt")   → JWT original (para crear getUserClient)
 */

import type { Context, Next } from "hono";
import { validateToken } from "../db/supabase_client.ts";

export async function authMiddleware(c: Context, next: Next): Promise<Response | void> {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "No autorizado — falta Bearer token" }, 401);
  }

  const jwt = authHeader.slice(7);
  try {
    const { id, email } = await validateToken(jwt);
    c.set("userId", id);
    c.set("userEmail", email);
    c.set("userJwt", jwt);
    await next();
  } catch {
    return c.json({ error: "Token inválido o expirado" }, 401);
  }
}
