/**
 * AST types for F22 formula expressions.
 * Formulas come from the CSW Set rules (5_CSW_Set_1.0_AT2026.xlsx).
 */

export type FuncName = "POS" | "NEG" | "MIN" | "MAX" | "ABS" | "ROUND" | "TIPO";

export type ExprNode =
  | { kind: "number"; value: number }
  | { kind: "field"; code: number }                         // [547]
  | { kind: "param"; id: number }                           // P08
  | { kind: "binary"; op: "+" | "-" | "*" | "/"; left: ExprNode; right: ExprNode }
  | { kind: "unary"; op: "-"; operand: ExprNode }
  | { kind: "func"; name: FuncName; args: ExprNode[] }      // MIN{a;b}, POS{x}
  | { kind: "if"; condition: CondNode; then: ExprNode; else: ExprNode }  // Si...entonces...Sino
  | { kind: "inline_cond"; condition: CondNode; value: ExprNode }        // expr; si condition
  | { kind: "binding"; name: string; value: ExprNode; body: ExprNode }  // Alfa=..., Beta=...
  | { kind: "atributo"; values: string[] }                  // atributo = M14A .o. 14D1
  | { kind: "external"; varId: string }                     // Vx014720
  | { kind: "cond_expr"; cond: CondNode };                  // condition used as 1/0 expression

export type CondNode =
  | { kind: "compare"; op: "=" | "!=" | "<" | ">" | "<=" | ">="; left: ExprNode; right: ExprNode }
  | { kind: "and"; left: CondNode; right: CondNode }        // .y.
  | { kind: "or"; left: CondNode; right: CondNode }         // .o.
  | { kind: "tipo"; field: number; values: number[] }       // TIPO{[03]}=1
  | { kind: "atributo_check"; values: string[]; negated?: boolean }  // atributo = M14A .o. 14D1
  | { kind: "rectificatoria"; negated: boolean };           // F22 NO es Rectificatoria
