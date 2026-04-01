/**
 * GET /api/fields
 * GET /api/fields?section=RECUADRO+1
 * GET /api/fields/:code
 *
 * Returns field definitions loaded from F22_layout_AT2026.xlsx.
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";
import type { FieldsResponse, FieldDTO } from "../types/api_types.ts";
import { getFieldMetadata } from "@f22/core";

export async function fieldsHandler(c: Context): Promise<Response> {
  const { fieldRegistry, ruleRegistry } = await getEngine();
  const sectionFilter = c.req.query("section");

  // Build set of field codes that have a "=" rule (computed by engine)
  const computedFields = new Set(
    ruleRegistry.rules
      .filter((r) => r.operator === "=" && r.formulaAst !== null)
      .map((r) => r.targetField),
  );

  const allFields = sectionFilter
    ? fieldRegistry.getBySection(sectionFilter)
    : fieldRegistry.getAll();

  const fields: FieldDTO[] = allFields.map((f) => {
    const meta = getFieldMetadata(f.code);
    return {
      code: f.code,
      label: f.label,
      section: f.section,
      dataType: f.dataType,
      isCalculated: computedFields.has(f.code),
      isMandatory: f.isMandatory,
      ...(meta?.description        && { description: meta.description }),
      ...(meta?.warnings?.length   && { warnings: meta.warnings }),
      ...(meta?.applicableRegimes  && { applicableRegimes: meta.applicableRegimes }),
      ...(meta?.applicableEntityTypes && { applicableEntityTypes: meta.applicableEntityTypes }),
      ...(meta?.isUserEntered !== undefined && { isUserEntered: meta.isUserEntered }),
    };
  });

  const response: FieldsResponse = {
    fields,
    sections: fieldRegistry.getSections(),
    total: fields.length,
  };

  return c.json(response);
}

export async function fieldByCodeHandler(c: Context): Promise<Response> {
  const code = parseInt(c.req.param("code") ?? "");
  if (isNaN(code)) {
    return c.json({ error: "Invalid field code" }, 400);
  }

  const { fieldRegistry, ruleRegistry } = await getEngine();
  const field = fieldRegistry.get(code);

  if (!field) {
    return c.json({ error: `Field [${code}] not found` }, 404);
  }

  // Also include any rules that compute this field
  const rules = ruleRegistry.getByField(code).map((r) => ({
    ruleId: r.ruleId,
    operator: r.operator,
    formulaRaw: r.formulaRaw,
    guidanceText: r.guidanceText,
    parsed: r.formulaAst !== null,
  }));

  const meta = getFieldMetadata(code);
  return c.json({ ...field, rules, metadata: meta ?? null });
}
