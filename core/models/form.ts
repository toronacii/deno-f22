/**
 * Form data and context types for F22 AT2026.
 */

/**
 * Tributary regime. Used in atributo checks in formulas.
 * Values correspond to the "régimen tributario" declared in field [03].
 */
export type TaxRegime =
  | "M14A"          // Renta Atribuida
  | "14D1"          // Semi-integrado (transparencia)
  | "14D3"          // Pro-Pyme Transparente
  | "14D8"          // Pro-Pyme General
  | "14G"           // Renta Presunta Opcional
  | "14TT"          // Transición
  | "BHEP"          // Base Honorarios Efectivos
  | "PRESUNTO"      // Renta Presunta
  | "SIMPLIFICADO"; // Régimen Simplificado (14 ter)

/**
 * Entity type (TIPO{[03]}).
 * 1=Persona Natural, 2=Sociedad de Personas, 3=SA, 4=SpA, 5=EIRL,
 * 6=Sociedad de Profesionales, 7=Comunidad, 8=Otro
 */
export type EntityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface FormContext {
  /** Current tax regime */
  taxRegime: TaxRegime;
  /** Entity type from field [03] */
  entityType: EntityType;
  /** Whether this is an amended return */
  isRectificatoria: boolean;
  /** External variable values (e.g. Vx014720) */
  externalVars: Map<string, number>;
}

/**
 * The actual form field values.
 * Key is the numeric field code (e.g. 547), value is the numeric amount.
 * Missing key = field not declared (treated as 0 in calculations).
 */
export type FormData = Map<number, number>;

/** Get field value, defaulting to 0 if not present */
export function getField(data: FormData, code: number): number {
  return data.get(code) ?? 0;
}

/** Set a field value (mutates the map) */
export function setField(data: FormData, code: number, value: number): void {
  data.set(code, value);
}

/** Create an empty FormData */
export function createFormData(): FormData {
  return new Map<number, number>();
}

/** Create a default FormContext */
export function createFormContext(
  partial: Partial<FormContext> = {}
): FormContext {
  return {
    taxRegime: "14D8",
    entityType: 1,
    isRectificatoria: false,
    externalVars: new Map(),
    ...partial,
  };
}
