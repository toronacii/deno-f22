/**
 * Tributary parameter definitions (P01–P751).
 * Values sourced from 7_CSW_Parametros_AT2026.pdf.
 */

export interface Parameter {
  /** Parameter ID, e.g. "P08" */
  id: string;
  /** Numeric parameter number */
  num: number;
  /** Parameter value */
  value: number;
  /** Human-readable description */
  description: string;
  /** Unit or type, e.g. "tasa", "UF", "UTM" */
  unit?: string;
}

/** Immutable store of parameters keyed by numeric ID */
export type ParameterStore = ReadonlyMap<number, Parameter>;

export function buildParameterStore(params: Parameter[]): ParameterStore {
  const map = new Map<number, Parameter>();
  for (const p of params) {
    map.set(p.num, p);
  }
  return map;
}
