/**
 * Initializes and caches the engine components on first use.
 *
 * All data is imported from pre-processed TypeScript modules (no disk I/O at runtime).
 * To regenerate the data files run:
 *   deno run --allow-read --allow-write scripts/build_data.ts
 */

import {
  loadDefaultParameters,
  buildRuleRegistry,
  FieldRegistry,
  RuleRegistry,
  Calculator,
  Validator,
  Optimizer,
  type ParameterStore,
  type LayoutSection,
} from "@f22/core";
import { RAW_RULES } from "../core/data/rules_AT2026.ts";
import { LAYOUT_FIELDS, LAYOUT_SECTIONS } from "../core/data/layout_AT2026.ts";

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

let _state: EngineState | null = null;
let _loading: Promise<EngineState> | null = null;

export async function getEngine(): Promise<EngineState> {
  if (_state) return _state;
  if (_loading) return _loading;

  _loading = (async (): Promise<EngineState> => {
    console.log("[Engine] Initializing from pre-processed data…");
    const t0 = performance.now();

    // All data is already in memory as imported modules — no disk I/O needed.
    const params = await loadDefaultParameters();
    const ruleRegistry = buildRuleRegistry(RAW_RULES);
    const fieldRegistry = new FieldRegistry(LAYOUT_FIELDS);

    // Layout sections already have rule-based type overrides applied (done at build time).
    const layoutSections: LayoutSection[] = LAYOUT_SECTIONS;

    const total  = ruleRegistry.rules.length;
    const parsed = ruleRegistry.parsedRules().length;
    const parseRate = total > 0 ? parsed / total : 1;

    const calculator = new Calculator(ruleRegistry.rules, params);
    const validator  = new Validator(ruleRegistry.rules, params);
    const optimizer  = new Optimizer(ruleRegistry.rules, params);

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

  return _loading!;
}

/** For testing: force reload of engine state */
export function resetEngine(): void {
  _state = null;
  _loading = null;
}
