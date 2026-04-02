/**
 * Recursive descent parser for F22 formula language.
 *
 * Grammar:
 *   program     → binding* expr EOF
 *   binding     → IDENT '=' expr NEWLINE
 *   expr        → if_expr | inline_guard | arithmetic
 *   if_expr     → 'Si' condition ';'? 'entonces' expr NEWLINE 'Sino' expr
 *   inline_guard → arithmetic ';' 'Si' condition
 *   arithmetic  → term (('+' | '-') term)*
 *   term        → factor (('*' | '/') factor)*
 *   factor      → ('-')? primary
 *   primary     → NUMBER | field_ref | param_ref | extern_var | func_call
 *               | '(' expr ')' | IDENT (for variable references like Alfa, Beta)
 *   func_call   → FUNC_NAME '{' arg_list '}'
 *   arg_list    → expr (';' expr)*
 *   condition   → or_cond
 *   or_cond     → and_cond ('.o.' and_cond)*
 *   and_cond    → simple_cond ('.y.' simple_cond)*
 *   simple_cond → tipo_cond | rect_cond | atributo_cond | compare_cond
 *   tipo_cond   → 'TIPO' '{' field_ref '}' '=' NUMBER (',' NUMBER)*
 *   rect_cond   → 'F22' 'NO' 'es' 'Rectificatoria' | 'F22' 'es' 'Rectificatoria'
 *   atributo_cond → 'atributo' '=' REGIME_ID ('.o.' REGIME_ID)*
 *   compare_cond → expr ('<' | '>' | '<=' | '>=' | '=' | '!=') expr
 */

import { TokenKind, type Token } from "./token_types.ts";
import { tokenize } from "./tokenizer.ts";
import { normalizeFormula } from "./normalizer.ts";
import type { ExprNode, CondNode, FuncName } from "../models/ast.ts";

class ParseError extends Error {
  constructor(message: string, public readonly pos: number) {
    super(message);
    this.name = "ParseError";
  }
}

class Parser {
  private tokens: Token[];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(offset = 0): Token {
    return this.tokens[this.pos + offset] ?? { kind: TokenKind.EOF, value: "", pos: -1 };
  }

  private advance(): Token {
    const tok = this.tokens[this.pos];
    this.pos++;
    return tok ?? { kind: TokenKind.EOF, value: "", pos: -1 };
  }

  private check(...kinds: TokenKind[]): boolean {
    return kinds.includes(this.peek().kind);
  }

  private match(...kinds: TokenKind[]): Token | null {
    if (this.check(...kinds)) return this.advance();
    return null;
  }

  private expect(kind: TokenKind): Token {
    if (this.peek().kind === kind) return this.advance();
    throw new ParseError(
      `Expected ${kind} but got ${this.peek().kind} ('${this.peek().value}') at pos ${this.peek().pos}`,
      this.peek().pos
    );
  }

  private skipNewlines(): void {
    while (this.peek().kind === TokenKind.NEWLINE) this.advance();
  }

  // -------------------------------------------------------------------------
  // Top-level entry point
  // -------------------------------------------------------------------------

  parseProgram(): ExprNode {
    this.skipNewlines();

    // Check for binding pattern: IDENT = expr NEWLINE ... body
    // Look ahead: IDENT EQ (not part of a condition)
    if (this.isBindingStart()) {
      return this.parseBindings();
    }

    const expr = this.parseExpr();
    // Consume trailing EOF
    return expr;
  }

  private isBindingStart(): boolean {
    // Binding: starts with IDENT '=' where the IDENT is a name like Alfa, Beta, etc.
    // and not a field operation
    if (
      this.peek().kind === TokenKind.IDENT &&
      this.peek(1).kind === TokenKind.EQ
    ) {
      // Make sure it's not a comparison (followed by a non-expr token)
      // Bindings have IDENT = expr NEWLINE then more stuff
      return true;
    }
    return false;
  }

  private parseBindings(): ExprNode {
    // Parse zero or more "Name = expr NEWLINE" bindings,
    // then the final expression is the body
    const name = this.expect(TokenKind.IDENT).value;
    this.expect(TokenKind.EQ);
    const value = this.parseExpr();
    this.skipNewlines();

    let body: ExprNode;
    if (this.isBindingStart()) {
      body = this.parseBindings();
    } else if (this.peek().kind !== TokenKind.EOF) {
      body = this.parseExpr();
    } else {
      body = value;
    }

    return { kind: "binding", name, value, body };
  }

  // -------------------------------------------------------------------------
  // Expression
  // -------------------------------------------------------------------------

  parseExpr(): ExprNode {
    this.skipNewlines();

    // Si...entonces...Sino
    if (this.check(TokenKind.KW_SI)) {
      return this.parseIfExpr();
    }

    // Standalone condition expression: "atributo = REGIME"
    if (this.check(TokenKind.KW_ATRIBUTO)) {
      const cond = this.parseCondition();
      return { kind: "cond_expr", cond };
    }

    // Top-level "{cond}" blocks (e.g. "{[x] > 0 .y. [y] > 0}")
    if (this.check(TokenKind.LBRACE) && this.looksLikeConditionBlock()) {
      const cond = this.parseCondition(); // parseSimpleCond handles LBRACE
      return { kind: "cond_expr", cond };
    }

    const arith = this.parseArithmetic();

    // Inline guard: expr ; Si condition
    if (this.check(TokenKind.SEMICOLON)) {
      const savedPos = this.pos;
      this.advance(); // consume ;
      this.skipNewlines();
      if (this.check(TokenKind.KW_SI)) {
        this.advance(); // consume Si
        const cond = this.parseCondition();
        return { kind: "inline_cond", condition: cond, value: arith };
      }
      // Not an inline guard, backtrack
      this.pos = savedPos;
    }

    // Top-level comparison (e.g. "{sum} > 0" validation rules)
    const compOps = [
      TokenKind.EQ, TokenKind.NEQ, TokenKind.LT,
      TokenKind.GT, TokenKind.LTE, TokenKind.GTE,
    ] as const;
    if (this.check(...compOps)) {
      let op: "=" | "!=" | "<" | ">" | "<=" | ">=" = "=";
      if (this.check(TokenKind.EQ))       { this.advance(); op = "="; }
      else if (this.check(TokenKind.NEQ)) { this.advance(); op = "!="; }
      else if (this.check(TokenKind.LTE)) { this.advance(); op = "<="; }
      else if (this.check(TokenKind.GTE)) { this.advance(); op = ">="; }
      else if (this.check(TokenKind.LT))  { this.advance(); op = "<"; }
      else if (this.check(TokenKind.GT))  { this.advance(); op = ">"; }
      const right = this.parseArithmetic();
      return { kind: "cond_expr", cond: { kind: "compare", op, left: arith, right } };
    }

    return arith;
  }

  /**
   * Scan ahead from current pos (expected to be LBRACE) to find if the block
   * content contains condition-specific tokens (.y., .o., atributo, TIPO).
   * Used to disambiguate "{cond}" vs "{arithmetic}" at top level.
   */
  private looksLikeConditionBlock(): boolean {
    let depth = 0;
    let i = this.pos;
    while (i < this.tokens.length) {
      const t = this.tokens[i];
      if (t.kind === TokenKind.LBRACE) depth++;
      else if (t.kind === TokenKind.RBRACE) {
        depth--;
        if (depth === 0) break;
      } else if (depth === 1) {
        if (
          t.kind === TokenKind.AND || t.kind === TokenKind.OR ||
          t.kind === TokenKind.KW_ATRIBUTO || t.kind === TokenKind.FUNC_TIPO
        ) return true;
      }
      i++;
    }
    return false;
  }

  private parseIfExpr(): ExprNode {
    this.expect(TokenKind.KW_SI);
    const condition = this.parseCondition();

    // Optional semicolon before entonces; entonces itself is also optional
    this.match(TokenKind.SEMICOLON);
    this.skipNewlines();
    this.match(TokenKind.KW_ENTONCES);

    const thenExpr = this.parseArithmeticOrCond();
    this.skipNewlines();

    if (!this.match(TokenKind.KW_SINO)) {
      return { kind: "if", condition, then: thenExpr, else: { kind: "number", value: 0 } };
    }
    this.skipNewlines();
    const elseExpr = this.parseExpr();

    return { kind: "if", condition, then: thenExpr, else: elseExpr };
  }

  /** Parse an arithmetic expression; if followed by a comparison op, wrap as cond_expr (1/0). */
  private parseArithmeticOrCond(): ExprNode {
    const arith = this.parseArithmetic();
    const compOps = [
      TokenKind.EQ, TokenKind.NEQ, TokenKind.LT,
      TokenKind.GT, TokenKind.LTE, TokenKind.GTE,
    ] as const;
    if (this.check(...compOps)) {
      let op: "=" | "!=" | "<" | ">" | "<=" | ">=" = "=";
      if (this.check(TokenKind.EQ))  { this.advance(); op = "="; }
      else if (this.check(TokenKind.NEQ)) { this.advance(); op = "!="; }
      else if (this.check(TokenKind.LTE)) { this.advance(); op = "<="; }
      else if (this.check(TokenKind.GTE)) { this.advance(); op = ">="; }
      else if (this.check(TokenKind.LT))  { this.advance(); op = "<"; }
      else if (this.check(TokenKind.GT))  { this.advance(); op = ">"; }
      const right = this.parseArithmetic();
      return { kind: "cond_expr", cond: { kind: "compare", op, left: arith, right } };
    }
    return arith;
  }

  // -------------------------------------------------------------------------
  // Arithmetic
  // -------------------------------------------------------------------------

  private parseArithmetic(): ExprNode {
    let left = this.parseTerm();

    while (this.check(TokenKind.PLUS, TokenKind.MINUS)) {
      const op = this.advance().kind === TokenKind.PLUS ? "+" : "-";
      const right = this.parseTerm();
      left = { kind: "binary", op, left, right };
    }

    return left;
  }

  private parseTerm(): ExprNode {
    let left = this.parseFactor();

    while (this.check(TokenKind.STAR, TokenKind.SLASH)) {
      const op = this.advance().kind === TokenKind.STAR ? "*" : "/";
      const right = this.parseFactor();
      left = { kind: "binary", op, left, right };
    }

    return left;
  }

  private parseFactor(): ExprNode {
    if (this.check(TokenKind.MINUS)) {
      this.advance();
      const operand = this.parsePrimary();
      return { kind: "unary", op: "-", operand };
    }
    return this.parsePrimary();
  }

  // -------------------------------------------------------------------------
  // Primary
  // -------------------------------------------------------------------------

  private parsePrimary(): ExprNode {
    const tok = this.peek();

    // Number literal
    if (tok.kind === TokenKind.NUMBER) {
      this.advance();
      return { kind: "number", value: parseFloat(tok.value) };
    }

    // Field reference [NNN]
    if (tok.kind === TokenKind.FIELD_REF) {
      this.advance();
      return { kind: "field", code: parseInt(tok.value) };
    }

    // Parameter reference PNN
    if (tok.kind === TokenKind.PARAM_REF) {
      this.advance();
      return { kind: "param", id: parseInt(tok.value) };
    }

    // External variable
    if (tok.kind === TokenKind.EXTERN_VAR) {
      this.advance();
      return { kind: "external", varId: tok.value };
    }

    // Function calls
    if (this.isFuncToken(tok.kind)) {
      return this.parseFuncCall();
    }

    // Parenthesized expression (with parens or braces)
    if (tok.kind === TokenKind.LPAREN || tok.kind === TokenKind.LBRACE) {
      const closeKind = tok.kind === TokenKind.LPAREN ? TokenKind.RPAREN : TokenKind.RBRACE;
      this.advance();
      const expr = this.parseExpr();
      this.match(closeKind);
      return expr;
    }

    // Generic identifier (variable reference like Alfa, Beta)
    if (tok.kind === TokenKind.IDENT) {
      this.advance();
      return { kind: "external", varId: tok.value };
    }

    throw new ParseError(
      `Unexpected token ${tok.kind} ('${tok.value}') in primary at pos ${tok.pos}`,
      tok.pos
    );
  }

  private isFuncToken(kind: TokenKind): boolean {
    return [
      TokenKind.FUNC_POS, TokenKind.FUNC_NEG, TokenKind.FUNC_MIN,
      TokenKind.FUNC_MAX, TokenKind.FUNC_ABS, TokenKind.FUNC_ROUND,
      TokenKind.FUNC_TIPO, TokenKind.FUNC_TGL,
    ].includes(kind);
  }

  private parseFuncCall(): ExprNode {
    const funcTok = this.advance();
    const funcName = this.tokenKindToFuncName(funcTok.kind);

    // TIPO is special: TIPO{[03]}=1 is a condition, not an expression
    // But here we handle TIPO as an expression returning entity type
    this.expect(TokenKind.LBRACE);
    const args: ExprNode[] = [];

    if (!this.check(TokenKind.RBRACE)) {
      args.push(this.parseExpr());
      while (this.match(TokenKind.SEMICOLON, TokenKind.COMMA)) {
        if (this.check(TokenKind.RBRACE)) break;
        args.push(this.parseExpr());
      }
    }

    this.expect(TokenKind.RBRACE);
    return { kind: "func", name: funcName, args };
  }

  private tokenKindToFuncName(kind: TokenKind): FuncName {
    switch (kind) {
      case TokenKind.FUNC_POS: return "POS";
      case TokenKind.FUNC_NEG: return "NEG";
      case TokenKind.FUNC_MIN: return "MIN";
      case TokenKind.FUNC_MAX: return "MAX";
      case TokenKind.FUNC_ABS: return "ABS";
      case TokenKind.FUNC_ROUND: return "ROUND";
      case TokenKind.FUNC_TIPO: return "TIPO";
      case TokenKind.FUNC_TGL:  return "TGL";
      default: throw new ParseError(`Not a function token: ${kind}`, -1);
    }
  }

  // -------------------------------------------------------------------------
  // Conditions
  // -------------------------------------------------------------------------

  parseCondition(): CondNode {
    return this.parseOrCond();
  }

  private parseOrCond(): CondNode {
    let left = this.parseAndCond();

    while (this.check(TokenKind.OR)) {
      this.advance();
      const right = this.parseAndCond();
      left = { kind: "or", left, right };
    }

    return left;
  }

  private parseAndCond(): CondNode {
    let left = this.parseSimpleCond();

    while (this.check(TokenKind.AND)) {
      this.advance();
      const right = this.parseSimpleCond();
      left = { kind: "and", left, right };
    }

    return left;
  }

  private parseSimpleCond(): CondNode {
    const compOps = [
      TokenKind.EQ, TokenKind.NEQ, TokenKind.LT,
      TokenKind.GT, TokenKind.LTE, TokenKind.GTE,
    ] as const;

    // Grouped condition: (cond) — but NOT (expr) op value, which is a compare_cond
    if (this.check(TokenKind.LPAREN)) {
      const savedPos = this.pos;
      this.advance();
      const cond = this.parseCondition();
      if (this.match(TokenKind.RPAREN)) {
        if (!this.check(...compOps)) {
          return cond;
        }
      }
      // Backtrack: this is (expr) op value — let parseCompareCond handle it
      this.pos = savedPos;
    }

    if (this.check(TokenKind.LBRACE)) {
      this.advance();
      const cond = this.parseCondition();
      this.match(TokenKind.RBRACE);
      return cond;
    }

    // TIPO{[NNN]} = NUM (,NUM)*
    if (this.check(TokenKind.FUNC_TIPO)) {
      return this.parseTipoCond();
    }

    // "F22 NO es Rectificatoria" or "F22 es Rectificatoria"
    if (this.check(TokenKind.IDENT) && this.peek().value === "F22") {
      return this.parseRectificatoriaCond();
    }

    // "atributo = REGIME .o. REGIME"
    if (this.check(TokenKind.KW_ATRIBUTO)) {
      return this.parseAtributoCond();
    }

    // "NO es Rectificatoria" (without F22 prefix)
    if (this.check(TokenKind.KW_NO)) {
      const savedPos = this.pos;
      this.advance(); // consume NO
      if (this.check(TokenKind.KW_ES)) {
        this.advance(); // consume es
        if (this.check(TokenKind.KW_RECTIFICATORIA)) {
          this.advance();
          return { kind: "rectificatoria", negated: true };
        }
      }
      this.pos = savedPos;
    }

    // Compare condition: expr op expr
    return this.parseCompareCond();
  }

  private parseTipoCond(): CondNode {
    this.expect(TokenKind.FUNC_TIPO);
    this.expect(TokenKind.LBRACE);
    const fieldTok = this.expect(TokenKind.FIELD_REF);
    const fieldCode = parseInt(fieldTok.value);
    this.expect(TokenKind.RBRACE);

    // Could be = or !=  (value not used, only presence matters for parsing)
    if (this.check(TokenKind.EQ)) { this.advance(); }
    else if (this.check(TokenKind.NEQ)) { this.advance(); }
    else { this.expect(TokenKind.EQ); }

    // One or more values separated by commas
    const values: number[] = [];
    const firstVal = this.expect(TokenKind.NUMBER);
    values.push(parseInt(firstVal.value));

    while (this.match(TokenKind.COMMA)) {
      if (this.check(TokenKind.NUMBER)) {
        values.push(parseInt(this.advance().value));
      }
    }

    // If operator is !=, we negate: create an OR of all != comparisons
    // For simplicity, represent as tipo node and handle negation in evaluator
    return { kind: "tipo", field: fieldCode, values };
  }

  private parseRectificatoriaCond(): CondNode {
    this.advance(); // consume F22
    const negated = this.check(TokenKind.KW_NO);
    if (negated) this.advance(); // consume NO
    this.match(TokenKind.KW_ES); // consume es (optional)
    this.expect(TokenKind.KW_RECTIFICATORIA);
    return { kind: "rectificatoria", negated };
  }

  private parseAtributoCond(): CondNode {
    this.expect(TokenKind.KW_ATRIBUTO);

    // Accept both "atributo = REGIME" and "atributo != REGIME"
    const negated = this.check(TokenKind.NEQ);
    if (negated) {
      this.advance();
    } else {
      this.expect(TokenKind.EQ);
    }

    const values: string[] = [];
    if (this.check(TokenKind.REGIME_ID)) {
      values.push(this.advance().value);
    } else if (this.check(TokenKind.IDENT)) {
      values.push(this.advance().value);
    }

    while (this.check(TokenKind.OR)) {
      this.advance(); // consume .o.
      if (this.check(TokenKind.REGIME_ID)) {
        values.push(this.advance().value);
      } else if (this.check(TokenKind.IDENT)) {
        values.push(this.advance().value);
      } else {
        break;
      }
    }

    return { kind: "atributo_check", values, negated };
  }

  private parseCompareCond(): CondNode {
    const left = this.parseArithmetic();

    let op: "=" | "!=" | "<" | ">" | "<=" | ">=" = "=";
    if (this.check(TokenKind.EQ)) { this.advance(); op = "="; }
    else if (this.check(TokenKind.NEQ)) { this.advance(); op = "!="; }
    else if (this.check(TokenKind.LTE)) { this.advance(); op = "<="; }
    else if (this.check(TokenKind.GTE)) { this.advance(); op = ">="; }
    else if (this.check(TokenKind.LT)) { this.advance(); op = "<"; }
    else if (this.check(TokenKind.GT)) { this.advance(); op = ">"; }
    else {
      // No operator — treat as a truthy check (non-zero)
      return { kind: "compare", op: "!=", left, right: { kind: "number", value: 0 } };
    }

    const right = this.parseArithmetic();
    return { kind: "compare", op, left, right };
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ParseResult {
  ast: ExprNode | null;
  error?: string;
}

/** Parse a raw formula string into an AST */
export function parseFormula(raw: string): ParseResult {
  try {
    const normalized = normalizeFormula(raw);
    if (!normalized) return { ast: { kind: "number", value: 0 } };

    const tokens = tokenize(normalized);
    const parser = new Parser(tokens);
    const ast = parser.parseProgram();
    return { ast };
  } catch (e) {
    return { ast: null, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Parse a condition string (used for validation rules) */
export function parseCondition(raw: string): { cond: CondNode | null; error?: string } {
  try {
    const normalized = normalizeFormula(raw);
    const tokens = tokenize(normalized);
    const parser = new Parser(tokens);
    const cond = parser.parseCondition();
    return { cond };
  } catch (e) {
    return { cond: null, error: e instanceof Error ? e.message : String(e) };
  }
}
