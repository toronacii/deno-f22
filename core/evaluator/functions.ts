/**
 * Built-in functions for the F22 formula language.
 * Per 4_Instrucciones_Set_AT2026.docx:
 *
 * POS(x)   = max(0, x)              — positive value or zero
 * NEG(x)   = abs(min(0, x))         — absolute value of negative (recorded without sign)
 * MIN(a,b) = Math.min(a, b)
 * MAX(a,b) = Math.max(a, b)
 * ABS(x)   = Math.abs(x)
 * ROUND(x) = Math.round(x) to integer (pesos, no decimals)
 * TIPO(f)  = entity type from context (not field value)
 */

import type { FuncName } from "../models/ast.ts";

export function applyFunction(
  name: FuncName,
  args: number[],
  entityType?: number,
): number {
  switch (name) {
    case "POS":
      return Math.max(0, args[0] ?? 0);

    case "NEG":
      return Math.abs(Math.min(0, args[0] ?? 0));

    case "MIN":
      if (args.length < 2) return args[0] ?? 0;
      return Math.min(args[0], args[1]);

    case "MAX":
      if (args.length < 2) return args[0] ?? 0;
      return Math.max(args[0], args[1]);

    case "ABS":
      return Math.abs(args[0] ?? 0);

    case "ROUND":
      return Math.round(args[0] ?? 0);

    case "TIPO":
      // TIPO{[03]} returns the entity type from context, not the field value
      return entityType ?? 1;

    default:
      return 0;
  }
}
