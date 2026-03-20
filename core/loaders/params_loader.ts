/**
 * Loads tributary parameters from the JSON data file.
 */

import type { Parameter, ParameterStore } from "../models/parameter.ts";
import { buildParameterStore } from "../models/parameter.ts";
import { RAW_PARAMS } from "../data/params_AT2026.ts";

export async function loadParameters(jsonPath: string): Promise<ParameterStore> {
  const text = await Deno.readTextFile(jsonPath);
  const raw = JSON.parse(text) as Parameter[];
  return buildParameterStore(raw);
}

/** Load parameters from the pre-processed data module (no disk I/O) */
export function loadDefaultParameters(): Promise<ParameterStore> {
  return Promise.resolve(buildParameterStore(RAW_PARAMS));
}
