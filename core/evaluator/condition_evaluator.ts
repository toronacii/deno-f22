/**
 * Evaluates CondNode → boolean.
 */

import type { CondNode } from "../models/ast.ts";
import type { EvalContext } from "./eval_context.ts";
import { evaluateExpr } from "./evaluator.ts";

export function evaluateCondition(cond: CondNode, ctx: EvalContext): boolean {
  switch (cond.kind) {
    case "compare": {
      const left = evaluateExpr(cond.left, ctx);
      const right = evaluateExpr(cond.right, ctx);
      switch (cond.op) {
        case "=": return left === right;
        case "!=": return left !== right;
        case "<": return left < right;
        case ">": return left > right;
        case "<=": return left <= right;
        case ">=": return left >= right;
      }
    }

    case "and":
      return evaluateCondition(cond.left, ctx) && evaluateCondition(cond.right, ctx);

    case "or":
      return evaluateCondition(cond.left, ctx) || evaluateCondition(cond.right, ctx);

    case "tipo": {
      const entityType = ctx.context.entityType;
      return cond.values.includes(entityType);
    }

    case "atributo_check": {
      const regime = ctx.context.taxRegime;
      return cond.values.some((v) => v.toUpperCase() === regime.toUpperCase());
    }

    case "rectificatoria": {
      const isRect = ctx.context.isRectificatoria;
      // "F22 NO es Rectificatoria" → negated=true, evaluates to !isRect
      // "F22 es Rectificatoria" → negated=false, evaluates to isRect
      return cond.negated ? !isRect : isRect;
    }

    default:
      return false;
  }
}
