/**
 * Sample CSW rules for testing.
 * Based on real rules from 5_CSW_Set_1.0_AT2026.xlsx.
 */

import type { RawRule } from "../../models/rule.ts";

export const SAMPLE_RAW_RULES: RawRule[] = [
  // RECUADRO 1 — Honorarios
  // a.1: [547] = [545] + [461] + [856] + [1650]
  {
    ruleId: "a.1",
    targetFieldRaw: "[547]",
    operatorRaw: "=",
    formulaRaw: "[545] + [461] + [856] + [1650]",
    guidanceText: "Honorarios brutos totales: suma de todas las fuentes de honorarios",
  },
  // a.2: [550] = POS{[547] * P24 - P42 * P29}  (gastos presuntos con tope UTM)
  // Simplified version for testing
  {
    ruleId: "a.2",
    targetFieldRaw: "[550]",
    operatorRaw: "=",
    formulaRaw: "MIN{[547] * P24; P42 * P29}",
    guidanceText: "Gastos presuntos: menor entre 30% de honorarios brutos y 15 UTM",
  },
  // a.3: [553] = POS{[547] - [550]}
  {
    ruleId: "a.3",
    targetFieldRaw: "[553]",
    operatorRaw: "=",
    formulaRaw: "POS{[547] - [550]}",
    guidanceText: "Renta neta de honorarios: honorarios brutos menos gastos",
  },
  // a.4: [159] = [553] + [157] (renta total persona natural)
  {
    ruleId: "a.4",
    targetFieldRaw: "[159]",
    operatorRaw: "=",
    formulaRaw: "[553] + [157]",
    guidanceText: "Base imponible IGC: suma renta neta honorarios y otras rentas",
  },
  // a.5: [160] = Si [159] > 0 entonces [159] * P12 Sino 0
  {
    ruleId: "a.5",
    targetFieldRaw: "[160]",
    operatorRaw: "=",
    formulaRaw: "Si [159] > 0 entonces [159] * P12\nSino 0",
    guidanceText: "IGC calculado: aplicar tasa máxima si hay base imponible (simplificado)",
  },
  // a.6: Rule with TIPO check
  {
    ruleId: "a.6",
    targetFieldRaw: "[170]",
    operatorRaw: "=",
    formulaRaw: "Si TIPO{[03]} = 1 entonces [159]\nSino 0",
    guidanceText: "RLI solo para personas naturales (TIPO=1)",
  },
  // a.7: Rule with atributo check
  {
    ruleId: "a.7",
    targetFieldRaw: "[180]",
    operatorRaw: "=",
    formulaRaw: "Si atributo = M14A entonces [170] * P08\nSino Si atributo = 14D1 entonces [170] * P09\nSino [170] * P10",
    guidanceText: "IDPC según régimen tributario",
  },
  // a.8: Validation rule
  {
    ruleId: "a.8",
    targetFieldRaw: "[547]",
    operatorRaw: "validation",
    formulaRaw: "[547] >= 0",
    guidanceText: "Los honorarios brutos no pueden ser negativos",
  },
  // a.9: Rule with binding variable
  {
    ruleId: "a.9",
    targetFieldRaw: "[200]",
    operatorRaw: "=",
    formulaRaw: "Alfa = [159] * P08\n[547] + Alfa",
    guidanceText: "Ejemplo con variable binding",
  },
  // a.10: Rule with rectificatoria check
  {
    ruleId: "a.10",
    targetFieldRaw: "[205]",
    operatorRaw: "=",
    formulaRaw: "Si F22 NO es Rectificatoria entonces [200]\nSino 0",
    guidanceText: "Solo aplica para declaraciones originales",
  },
];

/** Expected parse results: true = should parse successfully */
export const EXPECTED_PARSE_SUCCESS: Record<string, boolean> = {
  "a.1": true,
  "a.2": true,
  "a.3": true,
  "a.4": true,
  "a.5": true,
  "a.6": true,
  "a.7": false, // Nested Si without proper multi-line structure — partial support
  "a.8": true,
  "a.9": true,
  "a.10": true,
};
