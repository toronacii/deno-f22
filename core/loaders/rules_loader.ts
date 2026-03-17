/**
 * Parses 5_CSW_Set_1.0_AT2026.xlsx to extract RawRule[].
 *
 * Sheet: "Hoja1" (or first sheet)
 * Column layout (0-based):
 *   B(1) = rule ID (e.g. "a.3")
 *   C(2) = target field code (e.g. "[547]" or "547")
 *   D(3) = operator ("=" or validation keyword)
 *   E(4) = formula raw text
 *   F(5) = guidance text
 */

import { loadXlsx, getCellStr, type Sheet } from "./xlsx_loader.ts";
import type { RawRule } from "../models/rule.ts";

const COL_B = 1;
const COL_C = 2;
const COL_D = 3;
const COL_E = 4;
const COL_F = 5;

/** Detect rows that have a valid rule ID like "a.3" or "a.3.1" */
function isValidRuleId(id: string): boolean {
  return /^[a-z]\.\d+(\.\d+)?$/.test(id.trim());
}

/** Normalize operator string */
function normalizeOperator(raw: string): "=" | "validation" {
  const s = raw.trim();
  if (s === "=") return "=";
  return "validation";
}

export async function loadRules(xlsxPath: string): Promise<RawRule[]> {
  const workbook = await loadXlsx(xlsxPath);

  // Find the right sheet
  let sheet: Sheet | undefined;
  for (const [name, s] of workbook) {
    if (name.toLowerCase().includes("hoja") || name.toLowerCase().includes("sheet") || name.toLowerCase().includes("csw")) {
      sheet = s;
      break;
    }
  }
  if (!sheet) {
    sheet = workbook.values().next().value;
  }
  if (!sheet) throw new Error("No sheet found in rules XLSX");

  const rules: RawRule[] = [];

  for (let row = 0; row < sheet.length; row++) {
    const ruleId = getCellStr(sheet, row, COL_B);
    if (!isValidRuleId(ruleId)) continue;

    const targetFieldRaw = getCellStr(sheet, row, COL_C);
    const operatorRaw = getCellStr(sheet, row, COL_D);
    const formulaRaw = getCellStr(sheet, row, COL_E);
    const guidanceText = getCellStr(sheet, row, COL_F);

    if (!targetFieldRaw) continue;

    rules.push({
      ruleId: ruleId.trim(),
      targetFieldRaw: targetFieldRaw.trim(),
      operatorRaw: normalizeOperator(operatorRaw),
      formulaRaw: formulaRaw.trim(),
      guidanceText: guidanceText.trim(),
    });
  }

  return rules;
}
