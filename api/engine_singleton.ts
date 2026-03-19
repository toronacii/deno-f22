/**
 * Initializes and caches the engine components on first use.
 *
 * Loading the XLSX files and parsing 149 rules is a one-time startup cost
 * (~200–500ms). After that, all requests share the same parsed state.
 */

import {
  loadRules,
  loadLayout,
  loadLayoutSections,
  loadParameters,
  buildRuleRegistry,
  FieldRegistry,
  RuleRegistry,
  Calculator,
  Validator,
  Optimizer,
  type ParameterStore,
  type Rule,
  type RawRule,
} from "@f22/core";
import type { LayoutSection } from "@f22/core";
import { resolve, fromFileUrl, dirname } from "jsr:@std/path@^1.0.0";

// Paths relative to this file (api/)
const ROOT = dirname(fromFileUrl(import.meta.url));
const DATA_ROOT = resolve(ROOT, "..");

const XLSX_RULES = resolve(DATA_ROOT, "5_CSW_Set_1.0_AT2026.xlsx");
const XLSX_LAYOUT = resolve(DATA_ROOT, "F22_layout_AT2026.xlsx");
const JSON_PARAMS = resolve(ROOT, "../core/data/params_AT2026.json");

interface EngineState {
  fieldRegistry: FieldRegistry;
  ruleRegistry: RuleRegistry;
  params: ParameterStore;
  calculator: Calculator;
  validator: Validator;
  optimizer: Optimizer;
  layoutSections: LayoutSection[];
  loadedAt: Date;
  parseRate: number;
}

/**
 * Build the set of field codes that are definitively numeric, based on CSW rules:
 *
 * 1. Target field of any "=" calculation rule → numeric (it receives a computed value).
 * 2. referencedFields of any "=" calculation rule → numeric (they're operands in the formula).
 * 3. Any [NNNN] that appears adjacent to arithmetic operators (+, -, *, /)
 *    in the raw formula or raw target-field text of ANY rule — catches cases where
 *    the parser misidentifies the target (e.g. "([1074]+[1083])" parsed as target=0).
 */
function buildNumericFieldsFromRules(rules: Rule[], rawRules: RawRule[]): Set<number> {
  const numeric = new Set<number>();

  // Signal 1 & 2: parsed "=" calculation rules
  for (const rule of rules) {
    if (rule.operator === "=" && rule.formulaAst !== null) {
      numeric.add(rule.targetField);
      for (const code of rule.metadata.referencedFields) {
        numeric.add(code);
      }
    }
  }

  // Signal 3: raw text arithmetic patterns — [NNN] adjacent to +/-/*//
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
        // Never override "text" — keyword heuristic for RUT/nombre/domicilio is reliable.
        // Only promote "boolean" → "number" when there is arithmetic evidence.
        if (numericFields.has(field.code) && field.dataType !== "text") {
          field.dataType = "number";
        }
      }
    }
  }
}

let _state: EngineState | null = null;
let _loading: Promise<EngineState> | null = null;

export async function getEngine(): Promise<EngineState> {
  if (_state) return _state;
  if (_loading) return _loading;

  _loading = (async (): Promise<EngineState> => {
    console.log("[Engine] Loading data files…");
    const t0 = performance.now();

    const [rawRules, layoutResult, layoutSections, params] = await Promise.all([
      loadRules(XLSX_RULES),
      loadLayout(XLSX_LAYOUT),
      loadLayoutSections(XLSX_LAYOUT),
      loadParameters(JSON_PARAMS),
    ]);

    const ruleRegistry = buildRuleRegistry(rawRules);
    const fieldRegistry = new FieldRegistry(layoutResult.fields);

    // Override keyword-inferred types with rule-based evidence.
    const numericFields = buildNumericFieldsFromRules(ruleRegistry.rules, rawRules);
    applyRuleTypeOverrides(layoutSections, numericFields);

    const total = ruleRegistry.rules.length;
    const parsed = ruleRegistry.parsedRules().length;
    const parseRate = total > 0 ? parsed / total : 1;

    const calculator = new Calculator(ruleRegistry.rules, params);
    const validator = new Validator(ruleRegistry.rules, params);
    const optimizer = new Optimizer(ruleRegistry.rules, params);

    const elapsed = (performance.now() - t0).toFixed(0);
    console.log(
      `[Engine] Ready in ${elapsed}ms — ${parsed}/${total} rules parsed (${(parseRate * 100).toFixed(1)}%)`,
    );

    _state = {
      fieldRegistry,
      ruleRegistry,
      params,
      calculator,
      validator,
      optimizer,
      layoutSections,
      loadedAt: new Date(),
      parseRate,
    };
    return _state;
  })();

  return _loading;
}

/** For testing: force reload of engine state */
export function resetEngine(): void {
  _state = null;
  _loading = null;
}
