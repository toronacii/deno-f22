/**
 * Recursive AST walker: ExprNode → number.
 */

import type { ExprNode } from "../models/ast.ts";
import type { EvalContext } from "./eval_context.ts";
import { applyFunction } from "./functions.ts";
import { evaluateCondition } from "./condition_evaluator.ts";

export function evaluateExpr(node: ExprNode, ctx: EvalContext): number {
  switch (node.kind) {
    case "number":
      return node.value;

    case "field":
      return ctx.getField(node.code);

    case "param":
      return ctx.getParam(node.id);

    case "external": {
      // Check bindings first (e.g. Alfa, Beta from bindings)
      if (ctx.bindings.has(node.varId)) {
        return ctx.getBinding(node.varId);
      }
      return ctx.getExternalVar(node.varId);
    }

    case "binary": {
      const left = evaluateExpr(node.left, ctx);
      const right = evaluateExpr(node.right, ctx);
      switch (node.op) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return right !== 0 ? left / right : 0;
      }
    }

    case "unary":
      return -evaluateExpr(node.operand, ctx);

    case "func": {
      // Special case: TIPO returns entityType, no need to evaluate args as values
      if (node.name === "TIPO") {
        return ctx.context.entityType;
      }
      const args = node.args.map((a) => evaluateExpr(a, ctx));
      return applyFunction(node.name, args, ctx.context.entityType);
    }

    case "if": {
      const cond = evaluateCondition(node.condition, ctx);
      return cond
        ? evaluateExpr(node.then, ctx)
        : evaluateExpr(node.else, ctx);
    }

    case "inline_cond": {
      const cond = evaluateCondition(node.condition, ctx);
      return cond ? evaluateExpr(node.value, ctx) : 0;
    }

    case "binding": {
      const value = evaluateExpr(node.value, ctx);
      const childCtx = ctx.withBinding(node.name, value);
      return evaluateExpr(node.body, childCtx);
    }

    case "atributo": {
      // atributo expression evaluates to 1 if regime matches, else 0
      const regime = ctx.context.taxRegime;
      return node.values.some((v) => v.toUpperCase() === regime.toUpperCase()) ? 1 : 0;
    }

    case "cond_expr":
      return evaluateCondition(node.cond, ctx) ? 1 : 0;

    default:
      return 0;
  }
}
