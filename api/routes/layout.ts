/**
 * GET /api/layout
 * GET /api/layout?section=RECUADRO+1
 *
 * Returns the structured form layout as parsed from F22_layout_AT2026.xlsx.
 * Each section contains ordered rows with field codes, operators, and sub-headers,
 * preserving the multi-column structure of the original form.
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";

export async function layoutHandler(c: Context): Promise<Response> {
  const { layoutSections } = await getEngine();
  const sectionFilter = c.req.query("section");

  const result = sectionFilter
    ? layoutSections.filter((s) => s.id === sectionFilter)
    : layoutSections;

  return c.json(result);
}
