/**
 * Walks an AST and collects metadata about field/param references.
 */

import type { ExprNode, CondNode } from "../models/ast.ts";
import type { RuleMetadata } from "../models/rule.ts";

export function collectMetadata(ast: ExprNode): RuleMetadata {
  const fields = new Set<number>();
  const params = new Set<number>();
  let hasConditional = false;
  let hasTipoCheck = false;
  let hasAtributoCheck = false;

  function walkExpr(node: ExprNode): void {
    switch (node.kind) {
      case "field":
        fields.add(node.code);
        break;
      case "param":
        params.add(node.id);
        break;
      case "binary":
        walkExpr(node.left);
        walkExpr(node.right);
        break;
      case "unary":
        walkExpr(node.operand);
        break;
      case "func":
        node.args.forEach(walkExpr);
        break;
      case "if":
        hasConditional = true;
        walkCond(node.condition);
        walkExpr(node.then);
        walkExpr(node.else);
        break;
      case "inline_cond":
        hasConditional = true;
        walkCond(node.condition);
        walkExpr(node.value);
        break;
      case "binding":
        walkExpr(node.value);
        walkExpr(node.body);
        break;
    }
  }

  function walkCond(cond: CondNode): void {
    switch (cond.kind) {
      case "compare":
        walkExpr(cond.left);
        walkExpr(cond.right);
        break;
      case "and":
      case "or":
        walkCond(cond.left);
        walkCond(cond.right);
        break;
      case "tipo":
        hasTipoCheck = true;
        fields.add(cond.field);
        break;
      case "atributo_check":
        hasAtributoCheck = true;
        break;
    }
  }

  walkExpr(ast);

  return {
    referencedFields: Array.from(fields),
    referencedParams: Array.from(params),
    hasConditional,
    hasTipoCheck,
    hasAtributoCheck,
  };
}
