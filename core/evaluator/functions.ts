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

/**
 * Tabla Global Complementaria AT2026 (Art. 52 LIR).
 * TGL(x) = x * factor - rebaja   (tramo aplicable a la base imponible anual)
 * Fuente: SII — Tabla IGC año tributario 2026.
 */
const TGL_TRAMOS: Array<{ hasta: number; factor: number; rebaja: number }> = [
  { hasta: 11_265_804,    factor: 0,     rebaja: 0             }, // Exento
  { hasta: 25_035_120,    factor: 0.04,  rebaja: 450_632.16    },
  { hasta: 41_725_200,    factor: 0.08,  rebaja: 1_452_036.96  },
  { hasta: 58_415_280,    factor: 0.135, rebaja: 3_746_922.96  },
  { hasta: 75_105_360,    factor: 0.23,  rebaja: 9_296_374.56  },
  { hasta: 100_140_480,   factor: 0.304, rebaja: 14_854_171.20 },
  { hasta: 258_696_240,   factor: 0.35,  rebaja: 19_460_633.28 },
  { hasta: Infinity,      factor: 0.40,  rebaja: 32_395_445.28 },
];

function applyTGL(base: number): number {
  if (base <= 0) return 0;
  for (const { hasta, factor, rebaja } of TGL_TRAMOS) {
    if (base <= hasta) return Math.max(0, base * factor - rebaja);
  }
  return 0;
}

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

    case "TGL":
      return applyTGL(args[0] ?? 0);

    default:
      return 0;
  }
}
