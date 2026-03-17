/**
 * Token types for the F22 formula language.
 */

export enum TokenKind {
  // Literals
  NUMBER = "NUMBER",               // 123, 0.25
  FIELD_REF = "FIELD_REF",        // [547]
  PARAM_REF = "PARAM_REF",        // P08, P647
  EXTERN_VAR = "EXTERN_VAR",      // Vx014720, VX010183

  // Function names
  FUNC_POS = "FUNC_POS",
  FUNC_NEG = "FUNC_NEG",
  FUNC_MIN = "FUNC_MIN",
  FUNC_MAX = "FUNC_MAX",
  FUNC_ABS = "FUNC_ABS",
  FUNC_ROUND = "FUNC_ROUND",
  FUNC_TIPO = "FUNC_TIPO",

  // Keywords
  KW_SI = "KW_SI",                // Si
  KW_ENTONCES = "KW_ENTONCES",    // entonces
  KW_SINO = "KW_SINO",            // Sino
  KW_NO = "KW_NO",                // NO (negation)
  KW_ES = "KW_ES",                // es (in "NO es Rectificatoria")
  KW_RECTIFICATORIA = "KW_RECTIFICATORIA",  // Rectificatoria
  KW_ATRIBUTO = "KW_ATRIBUTO",    // atributo

  // Regime identifiers (used in atributo checks)
  REGIME_ID = "REGIME_ID",        // M14A, 14D1, 14D3, 14D8, 14G, 14TT, BHEP, etc.

  // Operators
  PLUS = "PLUS",                   // +
  MINUS = "MINUS",                 // -
  STAR = "STAR",                   // *
  SLASH = "SLASH",                 // /
  EQ = "EQ",                       // =
  NEQ = "NEQ",                     // !=
  LT = "LT",                       // <
  GT = "GT",                       // >
  LTE = "LTE",                     // <=
  GTE = "GTE",                     // >=

  // Logical
  AND = "AND",                     // .y.
  OR = "OR",                       // .o.

  // Delimiters
  LPAREN = "LPAREN",               // (
  RPAREN = "RPAREN",               // )
  LBRACE = "LBRACE",               // {
  RBRACE = "RBRACE",               // }
  SEMICOLON = "SEMICOLON",         // ;
  COMMA = "COMMA",                 // ,

  // Special
  IDENT = "IDENT",                 // generic identifier (Alfa, Beta, etc.)
  NEWLINE = "NEWLINE",             // \n (significant in Si...entonces...Sino)
  EOF = "EOF",
}

export interface Token {
  kind: TokenKind;
  value: string;
  pos: number;
}
