/**
 * Registry of rules indexed by target field and rule ID.
 * Also responsible for building Rules from RawRules (parsing formulas).
 */

import type { Rule, RawRule, RuleBinding, RuleMetadata } from "../models/rule.ts";
import type { ExprNode } from "../models/ast.ts";
import { parseFormula } from "../parser/parser.ts";
import { collectMetadata } from "./metadata_collector.ts";

/**
 * Extracts top-level binding nodes from the parsed AST into a flat ordered
 * array, returning the bindings and the residual body expression separately.
 *
 * e.g. binding(Alfa=…, binding(Beta=…, body)) →
 *   bindings: [{name:"Alfa",ast:…},{name:"Beta",ast:…}], body: body
 */
function extractBindings(
  ast: ExprNode,
): { bindings: RuleBinding[]; body: ExprNode } {
  if (ast.kind !== "binding") return { bindings: [], body: ast };
  const { bindings, body } = extractBindings(ast.body);
  return { bindings: [{ name: ast.name, ast: ast.value }, ...bindings], body };
}

/** Parse a field code from strings like "[547]", "547", "0547" */
function parseFieldCode(raw: string): number {
  return parseInt(raw.replace(/[[\]\s]/g, ""));
}

export class RuleRegistry {
  private readonly byField: Map<number, Rule[]>;
  private readonly byId: Map<string, Rule>;
  readonly rules: Rule[];

  constructor(rules: Rule[]) {
    this.rules = rules;
    this.byField = new Map();
    this.byId = new Map();

    for (const rule of rules) {
      this.byId.set(rule.ruleId, rule);
      const existing = this.byField.get(rule.targetField) ?? [];
      existing.push(rule);
      this.byField.set(rule.targetField, existing);
    }
  }

  getByField(code: number): Rule[] {
    return this.byField.get(code) ?? [];
  }

  getById(id: string): Rule | undefined {
    return this.byId.get(id);
  }

  getAll(): Rule[] {
    return this.rules;
  }

  /** How many rules failed to parse */
  parseErrorCount(): number {
    return this.rules.filter((r) => r.formulaAst === null).length;
  }

  /** Rules that parsed successfully */
  parsedRules(): Rule[] {
    return this.rules.filter((r) => r.formulaAst !== null);
  }
}

/** Build a RuleRegistry from raw rules (parses all formulas) */
export function buildRuleRegistry(rawRules: RawRule[]): RuleRegistry {
  const rules: Rule[] = rawRules.map((raw) => {
    const fieldCode = parseFieldCode(raw.targetFieldRaw);
    const { ast, error } = parseFormula(raw.formulaRaw);

    const { bindings, body } = ast ? extractBindings(ast) : { bindings: [], body: ast };

    return {
      ruleId: raw.ruleId,
      targetField: isNaN(fieldCode) ? 0 : fieldCode,
      operator: raw.operatorRaw as "=" | "validation",
      formulaRaw: raw.formulaRaw,
      bindings,
      formulaAst: body,
      parseError: error,
      guidanceText: raw.guidanceText,
      metadata: body ? collectMetadata(body) : emptyMetadata(),
    };
  });

  return new RuleRegistry(rules);
}

function emptyMetadata(): RuleMetadata {
  return {
    referencedFields: [],
    referencedParams: [],
    hasConditional: false,
    hasTipoCheck: false,
    hasAtributoCheck: false,
  };
}
