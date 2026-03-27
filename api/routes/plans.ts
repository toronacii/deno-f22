/**
 * GET /api/v1/plans — catálogo de planes disponibles (público)
 */

import { Hono } from "hono";
import { getAdminClient } from "../db/supabase_client.ts";

export const plansRouter = new Hono();

plansRouter.get("/", async (c) => {
  const db = getAdminClient();

  const { data, error } = await db
    .from("membership_plans")
    .select("id, code, name, max_ruts, price_monthly_usd, price_quarterly_usd, price_annual_usd, min_commitment_months")
    .eq("is_active", true)
    .order("price_monthly_usd", { ascending: true });

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ plans: data });
});
