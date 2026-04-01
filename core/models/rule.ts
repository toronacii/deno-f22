/**
 * CSW rule definition from 5_CSW_Set_1.0_AT2026.xlsx.
 */

import type { ExprNode } from "./ast.ts";

export interface RuleBinding {
  name: string;
  ast: ExprNode;
}

export interface RuleMetadata {
  referencedFields: number[];
  referencedParams: number[];
  hasConditional: boolean;
  hasTipoCheck: boolean;
  hasAtributoCheck: boolean;
}

export interface Rule {
  /** Rule ID, e.g. "a.3" */
  ruleId: string;
  /** Target field code, e.g. 547 */
  targetField: number;
  /** "=" means compute the field; "validation" means check an invariant */
  operator: "=" | "validation";
  /** Raw formula string from spreadsheet */
  formulaRaw: string;
  /** Pre-calculated variable bindings (Alfa, Beta, e, j, m…), in evaluation order */
  bindings: RuleBinding[];
  /** Parsed AST of the main expression (body after bindings), null if parsing failed */
  formulaAst: ExprNode | null;
  /** Parse error message if parsing failed */
  parseError?: string;
  /** Human-readable guidance text from column F */
  guidanceText: string;
  metadata: RuleMetadata;
}

export interface ValidationResult {
  ruleId: string;
  targetField: number;
  passed: boolean;
  declaredValue?: number;
  calculatedValue?: number;
  /** Difference: declared - calculated */
  delta?: number;
  message: string;
}

/** Raw rule row as read from XLSX before parsing */
export interface RawRule {
  ruleId: string;
  targetFieldRaw: string;
  operatorRaw: string;
  formulaRaw: string;
  guidanceText: string;
}
