/**
 * Parses F22_layout_AT2026.xlsx.
 *
 * Provides two exports:
 *   loadLayout()         → flat FieldDefinition[] + SectionInfo[] (for the engine)
 *   loadLayoutSections() → structured LayoutSection[] (for the UI, preserves row grouping)
 *
 * Real Excel column structure (0-indexed):
 *   B(1)  = label / description (always)
 *   Numeric codes are scattered across many columns depending on RECUADRO:
 *     RECUADRO 1: codes at cols 25, 32 — operators at cols 31, 38
 *     RECUADRO 2: codes at cols 20, 26, 32 — operator at col 38 (last slot)
 *     Most others: code at col 32, operator at col 38
 *   Operator offset: always code_col + 6
 *
 *   Section headers: "RECUADRO N° 1: HONORARIOS" in col B
 */

import { loadXlsx, getCellStr, type Sheet } from "./xlsx_loader.ts";
import type { FieldDefinition, SectionInfo } from "../models/field.ts";
import type { LayoutSection, LayoutRow, LayoutField } from "../models/layout.ts";

const COL_LABEL = 1;        // Column B — always the label
const OP_OFFSET = 6;        // operator column = code_col + 6
const OPS = new Set(["+", "-", "="]);

// Final sections of the F22 form that use plain text headers instead of "RECUADRO N°..." format.
const FINAL_SECTION_HEADERS = new Set([
  "BASE IMPONIBLE IUSC O IGC O IA",
  "REBAJAS A LA RENTA",
  "BASE IMPONIBLE ANUAL",
  "IUSC o IGC, Y DÉBITOS FISCALES",
  "CRÉDITOS",
  "IMPUESTOS ANUALES A LA RENTA",
  "DEDUCCIONES A LOS IMPUESTOS",
  "OTROS CARGOS",
  "REMANENTE DE CRÉDITO",
  "IMPUESTO A PAGAR",
]);

// ── helpers ──────────────────────────────────────────────────────────────────

function isRecuadroHeader(val: string): boolean {
  return /RECUADRO\s+N[°º]?\s*\d+/i.test(val) || /RECUADRO\s+\d+/i.test(val);
}

function isFinalSectionHeader(val: string): boolean {
  return FINAL_SECTION_HEADERS.has(val.trim());
}

function extractSectionId(val: string): string {
  const m = val.match(/RECUADRO\s+N[°º]?\s*(\d+)/i) ?? val.match(/RECUADRO\s+(\d+)/i);
  return m ? `RECUADRO ${m[1]}` : val.trim();
}

function isBoldLabel(text: string): boolean {
  const t = text.trim();
  return t.startsWith("Total") || t.startsWith("TOTAL") || t.startsWith("Subtotal");
}

function isInteger(v: string): boolean {
  const n = parseInt(v);
  return !isNaN(n) && n > 0 && n <= 9999 && String(n) === v.trim();
}

/** Infer data type from a field label string */
function inferDataType(label: string): "text" | "boolean" | "number" {
  const l = label.toLowerCase();
  // Text fields: personal identification data
  if (/rut|nombre|raz[oó]n social|direcci[oó]n|domicilio|correo|e-?mail|tel[eé]f|actividad|giro|profesi[oó]n/.test(l)) return "text";
  // Boolean fields: checkboxes for laws, decrees, options, participation
  if (/^leye?s?\b|^d\.?l\.?\b|^d\.?s\.?\b|^art\.?\b|opci[oó]n|retiro del r[eé]gimen|asociaci[oó]n|instituci[oó]n|acogido|franquicia/.test(l)) return "boolean";
  return "number";
}

/** Scan a row and return all {col, code, operator, adjacentLabel} entries.
 *  For each code found, searches nearby columns (up to ±10) for the closest text label. */
function extractRowFields(sheet: Sheet, row: number): Array<{col: number; code: number; operator: string; adjacentLabel: string}> {
  // First pass: collect all text values in the row (not integer, not operator)
  const textCells: Array<{col: number; text: string}> = [];
  for (let col = 0; col < 45; col++) {
    const v = getCellStr(sheet, row, col);
    if (v && !isInteger(v) && !OPS.has(v.trim())) {
      textCells.push({ col, text: v.trim() });
    }
  }

  const result: Array<{col: number; code: number; operator: string; adjacentLabel: string}> = [];
  for (let col = 2; col < 45; col++) {
    const v = getCellStr(sheet, row, col);
    if (!v || !isInteger(v)) continue;
    const code = parseInt(v);
    const opCol = col + OP_OFFSET;
    const opVal = getCellStr(sheet, row, opCol).trim();

    // Find nearest text cell within ±10 columns, excluding col B (1) when other options exist
    const candidates = textCells
      .filter(t => t.col !== COL_LABEL && Math.abs(t.col - col) <= 10)
      .sort((a, b) => Math.abs(a.col - col) - Math.abs(b.col - col));

    // Fall back to col B if no close neighbor
    const colBText = textCells.find(t => t.col === COL_LABEL)?.text ?? "";
    const adjacentLabel = candidates[0]?.text ?? colBText;

    result.push({ col, code, operator: OPS.has(opVal) ? opVal : "", adjacentLabel });
  }
  return result;
}

/** Scan a row for text values in non-label columns (excluding integers and operators) */
function extractRowTexts(sheet: Sheet, row: number): Array<{col: number; text: string}> {
  const result: Array<{col: number; text: string}> = [];
  for (let col = 2; col < 45; col++) {
    const v = getCellStr(sheet, row, col);
    if (!v || isInteger(v) || OPS.has(v.trim())) continue;
    result.push({ col, text: v.trim() });
  }
  return result;
}

// ── flat layout (for the engine) ─────────────────────────────────────────────

export interface LayoutLoadResult {
  fields: FieldDefinition[];
  sections: SectionInfo[];
}

export async function loadLayout(xlsxPath: string): Promise<LayoutLoadResult> {
  const workbook = await loadXlsx(xlsxPath);
  let sheet: Sheet | undefined;
  for (const [name, s] of workbook) {
    if (name.toLowerCase().includes("f22") || name.toLowerCase().includes("nuevo")) {
      sheet = s; break;
    }
  }
  if (!sheet) sheet = workbook.values().next().value;
  if (!sheet) throw new Error("No sheet found in layout XLSX");

  const fields: FieldDefinition[] = [];
  const sections: SectionInfo[] = [];
  let currentSection = "GENERAL";
  const seenCodes = new Set<number>();

  for (let row = 0; row < sheet.length; row++) {
    const colB = getCellStr(sheet, row, COL_LABEL);

    if (colB && (isRecuadroHeader(colB) || isFinalSectionHeader(colB))) {
      const sectionId = extractSectionId(colB);
      currentSection = sectionId;
      sections.push({ id: sectionId, title: colB.trim(), startRow: row });
      continue;
    }

    const label = colB || "";
    const rowFields = extractRowFields(sheet, row);

    for (const { code, adjacentLabel } of rowFields) {
      if (seenCodes.has(code)) continue;
      seenCodes.add(code);
      const effectiveLabel = adjacentLabel || label || `Campo ${code}`;
      const dataType = inferDataType(effectiveLabel);
      fields.push({
        code,
        label: effectiveLabel,
        section: currentSection,
        dataType,
        isCalculated: false,
        isMandatory: false,
        canBeNegative: false,
        sourceRow: row,
      });
    }
  }

  return { fields, sections };
}

// ── structured layout (for the UI) ───────────────────────────────────────────

export async function loadLayoutSections(xlsxPath: string): Promise<LayoutSection[]> {
  const workbook = await loadXlsx(xlsxPath);
  let sheet: Sheet | undefined;
  for (const [name, s] of workbook) {
    if (name.toLowerCase().includes("f22") || name.toLowerCase().includes("nuevo")) {
      sheet = s; break;
    }
  }
  if (!sheet) sheet = workbook.values().next().value;
  if (!sheet) throw new Error("No sheet found in layout XLSX");

  // ── First pass: collect raw rows per section ────────────────────────────
  interface RawSection {
    id: string;
    title: string;
    startRow: number;
    endRow: number;
  }
  const rawSections: RawSection[] = [];
  for (let row = 0; row < sheet.length; row++) {
    const colB = getCellStr(sheet, row, COL_LABEL);
    if (colB && (isRecuadroHeader(colB) || isFinalSectionHeader(colB))) {
      if (rawSections.length > 0) rawSections[rawSections.length - 1].endRow = row - 1;
      rawSections.push({ id: extractSectionId(colB), title: colB.trim(), startRow: row, endRow: sheet.length - 1 });
    }
  }
  if (rawSections.length > 0) rawSections[rawSections.length - 1].endRow = sheet.length - 1;

  // ── Second pass: build LayoutSection for each raw section ───────────────
  const result: LayoutSection[] = [];

  for (const sec of rawSections) {
    // Discover which columns have codes in this section
    const codeColSet = new Set<number>();
    for (let row = sec.startRow + 1; row <= sec.endRow; row++) {
      for (const { col } of extractRowFields(sheet, row)) {
        codeColSet.add(col);
      }
    }
    const codeColsSorted = [...codeColSet].sort((a, b) => a - b);

    // Map column index → slot number (0-based)
    const colToSlot = new Map<number, number>();
    codeColsSorted.forEach((col, i) => colToSlot.set(col, i));

    const rows: LayoutRow[] = [];
    let foundColHeaders = false;

    for (let row = sec.startRow + 1; row <= sec.endRow; row++) {
      const label = getCellStr(sheet, row, COL_LABEL).trim();
      const rowFields = extractRowFields(sheet, row);
      const rowTexts = extractRowTexts(sheet, row);

      if (rowFields.length === 0) {
        if (!label && rowTexts.length === 0) continue; // completely empty

        // Check if text values appear at code-column positions → col_header row
        const textsAtCodeCols = rowTexts.filter(t => codeColSet.has(t.col) || codeColsSorted.some(c => Math.abs(c - t.col) <= 2));

        if (!foundColHeaders && (textsAtCodeCols.length > 0 || (rowTexts.length > 0 && !label))) {
          foundColHeaders = true;
          const colTexts = codeColsSorted.map(c => {
            // Find text closest to this code column
            const nearby = rowTexts.filter(t => Math.abs(t.col - c) <= 4).sort((a, b) => Math.abs(a.col - c) - Math.abs(b.col - c));
            return nearby[0]?.text ?? "";
          });
          rows.push({ rowIndex: row, type: "col_header", text: label, bold: false, fields: [], colTexts });
        } else if (label) {
          rows.push({ rowIndex: row, type: "sub_header", text: label, bold: isBoldLabel(label), fields: [] });
        }
        continue;
      }

      // Field row — map entries to slots with per-field labels and types
      const fields: LayoutField[] = rowFields.map(({ col, code, operator, adjacentLabel }) => {
        // Determine the effective label for this field
        // Priority: adjacentLabel > rowLabel (col B) when there are multiple fields
        const effectiveLabel = adjacentLabel || (rowFields.length === 1 ? label : "");
        const dataType = inferDataType(effectiveLabel || label);
        return {
          code,
          operator,
          slot: colToSlot.get(col) ?? 0,
          label: effectiveLabel || undefined,
          dataType,
        };
      }).sort((a, b) => a.slot - b.slot);

      rows.push({ rowIndex: row, type: "field", text: label, bold: isBoldLabel(label), fields });
    }

    // Extract column headers from col_header rows
    const colHeaderRow = rows.find(r => r.type === "col_header");
    const columnHeaders = colHeaderRow?.colTexts ?? codeColsSorted.map(() => "");

    result.push({ id: sec.id, title: sec.title, columnHeaders, rows });
  }

  return result;
}
