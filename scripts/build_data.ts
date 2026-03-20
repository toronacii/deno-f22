#!/usr/bin/env -S deno run --allow-read --allow-write
/**
 * build_data.ts
 * -------------
 * Reads XLSX source files and generates pre-processed TypeScript data modules
 * that can be imported at runtime without any disk I/O.
 *
 * Run:
 *   deno run --allow-read --allow-write scripts/build_data.ts
 *
 * Outputs:
 *   core/data/rules_AT2026.ts    — RAW_RULES: RawRule[]
 *   core/data/layout_AT2026.ts   — LAYOUT_SECTIONS, LAYOUT_FIELDS, SECTION_INFOS
 */

import { resolve, fromFileUrl, dirname } from "jsr:@std/path@^1.0.0";
import {
  loadRules,
  loadLayout,
  loadLayoutSections,
  buildRuleRegistry,
  type RawRule,
  type FieldDefinition,
  type SectionInfo,
  type LayoutSection,
  type Rule,
} from "../core/mod.ts";

const ROOT        = resolve(dirname(fromFileUrl(import.meta.url)), "..");
const XLSX_RULES  = resolve(ROOT, "5_CSW_Set_1.0_AT2026.xlsx");
const XLSX_LAYOUT = resolve(ROOT, "F22_layout_AT2026.xlsx");
const OUT_RULES   = resolve(ROOT, "core/data/rules_AT2026.ts");
const OUT_LAYOUT  = resolve(ROOT, "core/data/layout_AT2026.ts");

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildNumericFieldsFromRules(rules: Rule[], rawRules: RawRule[]): Set<number> {
  const numeric = new Set<number>();
  for (const rule of rules) {
    if (rule.operator === "=" && rule.formulaAst !== null) {
      numeric.add(rule.targetField);
      for (const code of rule.metadata.referencedFields) numeric.add(code);
    }
  }
  const arithmeticRe = /\[(\d+)\]\s*[+\-*/]|[+\-*/]\s*\[(\d+)\]/g;
  for (const raw of rawRules) {
    for (const text of [raw.targetFieldRaw, raw.formulaRaw]) {
      let m: RegExpExecArray | null;
      arithmeticRe.lastIndex = 0;
      while ((m = arithmeticRe.exec(text)) !== null) {
        const code = parseInt(m[1] ?? m[2]);
        if (!isNaN(code) && code > 0) numeric.add(code);
      }
    }
  }
  return numeric;
}

function applyRuleTypeOverrides(sections: LayoutSection[], numericFields: Set<number>): void {
  for (const section of sections) {
    for (const row of section.rows) {
      for (const field of row.fields) {
        if (numericFields.has(field.code) && field.dataType !== "text") {
          field.dataType = "number";
        }
      }
    }
  }
}

function header(description: string): string {
  return `/**
 * AUTO-GENERATED — do not edit manually.
 * ${description}
 *
 * Regenerate with:
 *   deno run --allow-read --allow-write scripts/build_data.ts
 */\n\n`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log("[build_data] Loading XLSX files…");
const t0 = performance.now();

const [rawRules, layoutResult, layoutSections] = await Promise.all([
  loadRules(XLSX_RULES),
  loadLayout(XLSX_LAYOUT),
  loadLayoutSections(XLSX_LAYOUT),
]);

console.log(`[build_data] Loaded in ${(performance.now() - t0).toFixed(0)}ms`);
console.log(`  Rules: ${rawRules.length}`);
console.log(`  Fields: ${layoutResult.fields.length}`);
console.log(`  Sections: ${layoutResult.sections.length}`);
console.log(`  Layout sections: ${layoutSections.length}`);

// Apply rule-based type overrides (done at build time so runtime is pure import)
const registry = buildRuleRegistry(rawRules);
const numericFields = buildNumericFieldsFromRules(registry.rules, rawRules);
applyRuleTypeOverrides(layoutSections, numericFields);

const parsed = registry.parsedRules().length;
console.log(`  Parse rate: ${parsed}/${rawRules.length} (${(parsed / rawRules.length * 100).toFixed(1)}%)`);

// ── Generate rules_AT2026.ts ──────────────────────────────────────────────────

const rulesJson = JSON.stringify(rawRules, null, 2);
const rulesTs = header("Source: 5_CSW_Set_1.0_AT2026.xlsx") +
  `import type { RawRule } from "../models/rule.ts";\n\n` +
  `export const RAW_RULES: RawRule[] = ${rulesJson};\n`;

await Deno.writeTextFile(OUT_RULES, rulesTs);
console.log(`\n[build_data] Written: ${OUT_RULES}`);

// ── Generate layout_AT2026.ts ─────────────────────────────────────────────────

const fieldsJson  = JSON.stringify(layoutResult.fields, null, 2);
const sectionsJson = JSON.stringify(layoutResult.sections, null, 2);
const layoutJson  = JSON.stringify(layoutSections, null, 2);

const layoutTs = header("Source: F22_layout_AT2026.xlsx") +
  `import type { FieldDefinition, SectionInfo } from "../models/field.ts";\n` +
  `import type { LayoutSection } from "../models/layout.ts";\n\n` +
  `export const LAYOUT_FIELDS: FieldDefinition[] = ${fieldsJson};\n\n` +
  `export const SECTION_INFOS: SectionInfo[] = ${sectionsJson};\n\n` +
  `export const LAYOUT_SECTIONS: LayoutSection[] = ${layoutJson};\n`;

await Deno.writeTextFile(OUT_LAYOUT, layoutTs);
console.log(`[build_data] Written: ${OUT_LAYOUT}`);

const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
console.log(`\n[build_data] Done in ${elapsed}s`);
