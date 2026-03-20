/**
 * Field and section definitions extracted from F22_layout_AT2026.xlsx.
 */

export interface SectionInfo {
  /** Section identifier, e.g. "RECUADRO 1" */
  id: string;
  /** Human-readable title */
  title: string;
  /** Starting row in the XLSX */
  startRow: number;
}

export type FieldDataType = "number" | "text" | "date" | "boolean" | "currency";

export interface FieldDefinition {
  /** Numeric field code, e.g. 547 */
  code: number;
  /** Human-readable label */
  label: string;
  /** Section this field belongs to */
  section: string;
  /** Data type */
  dataType: FieldDataType;
  /** Whether this field is calculated (has CSW rule) or user-entered */
  isCalculated: boolean;
  /** Whether the field is mandatory */
  isMandatory: boolean;
  /** Whether it can be negative */
  canBeNegative: boolean;
  /** Max digits allowed */
  maxDigits?: number;
  /** Decimal places allowed (0 or absent = integer field) */
  decimals?: number;
  /** Row number in source XLSX */
  sourceRow?: number;
}
