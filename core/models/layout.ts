/**
 * Structured layout types for the F22 form.
 *
 * These represent the visual structure of each RECUADRO as it appears in the
 * official Excel layout — including multi-column rows, sub-headers, and operators.
 */

export interface LayoutField {
  /** Field code, e.g. 545 */
  code: number;
  /** Operator symbol: "+", "-", "=", or "" */
  operator: string;
  /** 0-based slot index (left-to-right column position within this section) */
  slot: number;
  /** Per-field label (when different from the row's main text label) */
  label?: string;
  /** Inferred data type for this specific field */
  dataType?: "number" | "text" | "boolean" | "currency" | "date";
  /** Decimal places allowed (0 or absent = integer field) */
  decimals?: number;
}

export interface LayoutRow {
  rowIndex: number;
  /** "col_header" = first data row with column label texts (no codes)
   *  "sub_header" = bold section separator within a RECUADRO (no codes)
   *  "field"      = data row with one or more field codes */
  type: "col_header" | "sub_header" | "field";
  /** Col B text — label for field rows, descriptor text for headers */
  text: string;
  /** True when the label appears bold/total in the form (heuristic) */
  bold: boolean;
  /** Field entries for this row (empty for header rows) */
  fields: LayoutField[];
  /** For col_header rows: text labels for each slot column */
  colTexts?: string[];
}

export interface LayoutSection {
  /** Canonical ID, e.g. "RECUADRO 1" */
  id: string;
  /** Full title from the Excel, e.g. "RECUADRO N° 1:  HONORARIOS" */
  title: string;
  /** Column header texts per slot, derived from the first col_header row */
  columnHeaders: string[];
  /** Ordered rows for this section */
  rows: LayoutRow[];
}
