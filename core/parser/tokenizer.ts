/**
 * Tokenizer for F22 formula language.
 * Converts a normalized formula string into a Token[] array.
 */

import { TokenKind, type Token } from "./token_types.ts";

const KEYWORDS: Record<string, TokenKind> = {
  "Si": TokenKind.KW_SI,
  "entonces": TokenKind.KW_ENTONCES,
  "Sino": TokenKind.KW_SINO,
  "NO": TokenKind.KW_NO,
  "es": TokenKind.KW_ES,
  "Rectificatoria": TokenKind.KW_RECTIFICATORIA,
  "atributo": TokenKind.KW_ATRIBUTO,
  "POS": TokenKind.FUNC_POS,
  "NEG": TokenKind.FUNC_NEG,
  "MIN": TokenKind.FUNC_MIN,
  "MAX": TokenKind.FUNC_MAX,
  "ABS": TokenKind.FUNC_ABS,
  "ROUND": TokenKind.FUNC_ROUND,
  "TIPO": TokenKind.FUNC_TIPO,
};

export function tokenize(formula: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  function peek(): string {
    return formula[pos] ?? "";
  }

  function advance(): string {
    return formula[pos++];
  }

  function addToken(kind: TokenKind, value: string, startPos: number): void {
    tokens.push({ kind, value, pos: startPos });
  }

  while (pos < formula.length) {
    const startPos = pos;
    const ch = peek();

    // Skip spaces and tabs (but not newlines)
    if (ch === " " || ch === "\t" || ch === "\r") {
      advance();
      continue;
    }

    // Newlines are significant
    if (ch === "\n") {
      advance();
      addToken(TokenKind.NEWLINE, "\n", startPos);
      continue;
    }

    // Comments or separators (---) — skip rest of line
    if (ch === "-" && formula[pos + 1] === "-" && formula[pos + 2] === "-") {
      while (pos < formula.length && formula[pos] !== "\n") pos++;
      continue;
    }

    // Field reference [NNN]
    if (ch === "[") {
      advance();
      let numStr = "";
      while (pos < formula.length && /\d/.test(formula[pos])) {
        numStr += formula[pos++];
      }
      if (formula[pos] === "]") advance();
      addToken(TokenKind.FIELD_REF, numStr, startPos);
      continue;
    }

    // .y. and .o.
    if (ch === "." && formula.slice(pos, pos + 3).toLowerCase() === ".y.") {
      pos += 3;
      addToken(TokenKind.AND, ".y.", startPos);
      continue;
    }
    if (ch === "." && formula.slice(pos, pos + 3).toLowerCase() === ".o.") {
      pos += 3;
      addToken(TokenKind.OR, ".o.", startPos);
      continue;
    }

    // Operators
    if (ch === "<") {
      advance();
      if (peek() === "=") { advance(); addToken(TokenKind.LTE, "<=", startPos); }
      else addToken(TokenKind.LT, "<", startPos);
      continue;
    }
    if (ch === ">") {
      advance();
      if (peek() === "=") { advance(); addToken(TokenKind.GTE, ">=", startPos); }
      else addToken(TokenKind.GT, ">", startPos);
      continue;
    }
    if (ch === "!") {
      advance();
      if (peek() === "=") { advance(); addToken(TokenKind.NEQ, "!=", startPos); }
      else addToken(TokenKind.IDENT, "!", startPos);
      continue;
    }
    if (ch === "=") { advance(); addToken(TokenKind.EQ, "=", startPos); continue; }
    if (ch === "+") { advance(); addToken(TokenKind.PLUS, "+", startPos); continue; }
    if (ch === "-") { advance(); addToken(TokenKind.MINUS, "-", startPos); continue; }
    if (ch === "*") { advance(); addToken(TokenKind.STAR, "*", startPos); continue; }
    if (ch === "/") { advance(); addToken(TokenKind.SLASH, "/", startPos); continue; }
    if (ch === "(") { advance(); addToken(TokenKind.LPAREN, "(", startPos); continue; }
    if (ch === ")") { advance(); addToken(TokenKind.RPAREN, ")", startPos); continue; }
    if (ch === "{") { advance(); addToken(TokenKind.LBRACE, "{", startPos); continue; }
    if (ch === "}") { advance(); addToken(TokenKind.RBRACE, "}", startPos); continue; }
    if (ch === ";") { advance(); addToken(TokenKind.SEMICOLON, ";", startPos); continue; }
    if (ch === ",") { advance(); addToken(TokenKind.COMMA, ",", startPos); continue; }

    // Numbers (including decimals)
    if (/\d/.test(ch) || (ch === "." && /\d/.test(formula[pos + 1] ?? ""))) {
      let numStr = "";
      while (pos < formula.length && /[\d.]/.test(formula[pos])) {
        numStr += formula[pos++];
      }
      addToken(TokenKind.NUMBER, numStr, startPos);
      continue;
    }

    // Identifiers, keywords, regime IDs, param refs, extern vars
    if (/[A-Za-z_]/.test(ch)) {
      let word = "";
      while (pos < formula.length && /[\w]/.test(formula[pos])) {
        word += formula[pos++];
      }

      // Check for known keywords first
      if (KEYWORDS[word] !== undefined) {
        addToken(KEYWORDS[word], word, startPos);
        continue;
      }

      // Parameter reference: P followed by digits
      if (/^P\d+$/.test(word)) {
        addToken(TokenKind.PARAM_REF, word.slice(1), startPos);  // strip "P"
        continue;
      }

      // External variable: Vx or VX followed by digits
      if (/^[Vv][Xx]\d+$/.test(word)) {
        addToken(TokenKind.EXTERN_VAR, word, startPos);
        continue;
      }

      // Tax regime identifiers
      const regimeMatch = word.match(/^(M14A|14D[138]|14G|14TT|BHEP|PRESUNTO|SIMPLIFICADO)$/i);
      if (regimeMatch) {
        addToken(TokenKind.REGIME_ID, word.toUpperCase(), startPos);
        continue;
      }

      // Generic identifier (Alfa, Beta, etc.)
      addToken(TokenKind.IDENT, word, startPos);
      continue;
    }

    // Unknown character — skip
    advance();
  }

  addToken(TokenKind.EOF, "", pos);
  return tokens;
}
