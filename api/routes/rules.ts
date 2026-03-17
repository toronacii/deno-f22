/**
 * GET /api/rules
 * GET /api/rules?field=547
 * GET /api/rules?parsed=false        (only rules with parse errors)
 * GET /api/rules/:id                 (single rule by ID, e.g. "a.3")
 */

import type { Context } from "hono";
import { getEngine } from "../engine_singleton.ts";
import type { RulesResponse, RuleDTO } from "../types/api_types.ts";

function toRuleDTO(r: import("@f22/core").Rule): RuleDTO {
  return {
    ruleId: r.ruleId,
    targetField: r.targetField,
    operator: r.operator,
    formulaRaw: r.formulaRaw,
    guidanceText: r.guidanceText,
    parsed: r.formulaAst !== null,
    parseError: r.parseError,
    metadata: r.metadata,
  };
}

export async function rulesHandler(c: Context): Promise<Response> {
  const { ruleRegistry } = await getEngine();

  const fieldParam = c.req.query("field");
  const parsedParam = c.req.query("parsed");

  let rules = ruleRegistry.getAll();

  if (fieldParam) {
    const code = parseInt(fieldParam);
    if (isNaN(code)) return c.json({ error: "Invalid field code" }, 400);
    rules = ruleRegistry.getByField(code);
  }

  if (parsedParam === "false") {
    rules = rules.filter((r) => r.formulaAst === null);
  } else if (parsedParam === "true") {
    rules = rules.filter((r) => r.formulaAst !== null);
  }

  const response: RulesResponse = {
    rules: rules.map(toRuleDTO),
    total: rules.length,
    parseErrors: rules.filter((r) => r.formulaAst === null).length,
  };

  return c.json(response);
}

export async function ruleByIdHandler(c: Context): Promise<Response> {
  const id = c.req.param("id") ?? "";
  const { ruleRegistry } = await getEngine();

  const rule = ruleRegistry.getById(id);
  if (!rule) {
    return c.json({ error: `Rule '${id}' not found` }, 404);
  }

  return c.json(toRuleDTO(rule));
}
