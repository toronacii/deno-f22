/**
 * Loads tributary parameters from the JSON data file.
 */

import type { Parameter, ParameterStore } from "../models/parameter.ts";
import { buildParameterStore } from "../models/parameter.ts";

export async function loadParameters(jsonPath: string): Promise<ParameterStore> {
  const text = await Deno.readTextFile(jsonPath);
  const raw = JSON.parse(text) as Parameter[];
  return buildParameterStore(raw);
}

/** Load parameters from the default bundled data file */
export async function loadDefaultParameters(): Promise<ParameterStore> {
  const url = new URL("../data/params_AT2026.json", import.meta.url);
  return loadParameters(url.pathname);
}
