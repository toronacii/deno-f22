/**
 * Pre-processes raw formula strings from the CSW Set spreadsheet.
 *
 * Handles:
 * - Unicode comparison operators: ≤ ≥ ≠
 * - Malformed bracket pairs: {NNN] → [NNN]
 * - Whitespace normalization inside field refs
 * - Section separator lines (---...)
 * - Various typos observed in source data
 */

export function normalizeFormula(raw: string): string {
  let s = raw;

  // Strip zero-width spaces (U+200B) that appear after operators in source data
  s = s.replace(/\u200B/g, "");

  // Replace Unicode comparison operators
  s = s.replace(/≤/g, "<=");
  s = s.replace(/≥/g, ">=");
  s = s.replace(/≠/g, "!=");
  s = s.replace(/–/g, "-");   // en-dash → minus
  s = s.replace(/—/g, "-");   // em-dash → minus
  s = s.replace(/×/g, "*");   // multiplication sign
  s = s.replace(/÷/g, "/");   // division sign

  // Fix malformed brackets: {NNN] or [NNN} → [NNN]
  s = s.replace(/\{(\s*\d+\s*)\]/g, "[$1]");
  s = s.replace(/\[(\s*\d+\s*)\}/g, "[$1]");

  // Normalize whitespace inside field refs: [ 547 ] → [547]
  s = s.replace(/\[\s+(\d+)\s+\]/g, "[$1]");
  s = s.replace(/\[(\d+)\s+\]/g, "[$1]");
  s = s.replace(/\[\s+(\d+)\]/g, "[$1]");

  // Remove section separators (lines of dashes used as separators in formulas)
  s = s.replace(/\s*---+\s*/g, "\n");

  // Normalize curly braces for function calls: ensure no spaces before {
  // Functions: POS{ NEG{ MIN{ MAX{ ABS{ ROUND{ TIPO{
  s = s.replace(/\b(POS|NEG|MIN|MAX|ABS|ROUND|TIPO)\s*\{/g, "$1{");

  // Fix common typo: missing closing brace
  // Count unmatched { and }
  // (handled by parser error recovery)

  // Normalize Spanish boolean keywords with possible extra spaces
  s = s.replace(/\.\s*[yY]\s*\./g, ".y.");
  s = s.replace(/\.\s*[oO]\s*\./g, ".o.");

  // Normalize "Atributo" → "atributo" (keyword is case-sensitive in tokenizer)
  s = s.replace(/\bAtributo\b/g, "atributo");

  // Normalize "Si" keyword variants
  s = s.replace(/\bSI\b/g, "Si");

  // Normalize "entonces" / "Entonces" → "entonces"
  s = s.replace(/\bEntonces\b/g, "entonces");
  s = s.replace(/\bENTONCES\b/g, "entonces");

  // Normalize "Sino" / "SINO" → "Sino"
  s = s.replace(/\bSINO\b/g, "Sino");

  // Ensure space between Sino and an immediately following field ref (Sino[547] → Sino [547])
  s = s.replace(/\bSino\[/g, "Sino [");

  // Collapse multiple spaces into one
  s = s.replace(/[ \t]+/g, " ");

  // Trim leading/trailing whitespace
  s = s.trim();

  return s;
}

/** Split a multi-part formula by newlines (each part is an independent rule) */
export function splitFormulaParts(formula: string): string[] {
  return formula
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}
