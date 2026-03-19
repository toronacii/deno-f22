/**
 * Shared request/response types for the F22 AT2026 API.
 * All monetary values in Chilean pesos (integer).
 */

// ---------------------------------------------------------------------------
// Shared request body
// ---------------------------------------------------------------------------

/**
 * JSON representation of FormData + FormContext.
 * fieldValues: { "547": 8700000, "550": 988305, ... }
 */
export interface FormRequest {
  /** Field values keyed by string field code */
  fieldValues: Record<string, number>;
  /** Tributary regime */
  taxRegime?: string;
  /** Entity type 1–8 */
  entityType?: number;
  /** Is this an amended return? */
  isRectificatoria?: boolean;
  /** External variables (Vx...) */
  externalVars?: Record<string, number>;
}

// ---------------------------------------------------------------------------
// /calculate
// ---------------------------------------------------------------------------

export interface FieldResultDTO {
  code: number;
  value: number;
  ruleId: string;
  isComputed: boolean;
}

export interface SkippedRuleDTO {
  ruleId: string;
  reason: string;
}

export interface CalculateResponse {
  /** All field values after calculation (declared + computed) */
  fieldValues: Record<string, number>;
  /** Detail of each computed field */
  computed: FieldResultDTO[];
  /** Rules that could not be evaluated */
  skipped: SkippedRuleDTO[];
  durationMs: number;
}

// ---------------------------------------------------------------------------
// /validate
// ---------------------------------------------------------------------------

export interface ViolationDTO {
  ruleId: string;
  targetField: number;
  message: string;
  declaredValue?: number;
  calculatedValue?: number;
  delta?: number;
  severity: "error" | "warning";
}

export interface ValidateResponse {
  valid: boolean;
  violations: ViolationDTO[];
  passedCount: number;
  failedCount: number;
  skippedCount: number;
}

// ---------------------------------------------------------------------------
// /optimize
// ---------------------------------------------------------------------------

export interface SuggestionDTO {
  fieldCode: number;
  fieldName: string;
  legalBasis: string;
  strategy: string;
  currentValue: number;
  suggestedValue: number;
  maxLegalValue: number;
  estimatedTaxSaving: number;
  alreadyOptimized: boolean;
}

export interface OptimizeResponse {
  suggestions: SuggestionDTO[];
  totalEstimatedSaving: number;
  currentTax: number;
  optimizedTax: number;
}

// ---------------------------------------------------------------------------
// /fields
// ---------------------------------------------------------------------------

export interface FieldDTO {
  code: number;
  label: string;
  section: string;
  dataType: string;
  isCalculated: boolean;
  isMandatory: boolean;
  /** Descripción extraída de las instrucciones oficiales (tooltip). */
  description?: string;
  /** Advertencias o restricciones especiales del SII. */
  warnings?: string[];
  /** Regímenes tributarios a los que aplica este campo (null = todos). */
  applicableRegimes?: string[];
  /** Tipos de entidad a los que aplica (null = todos). */
  applicableEntityTypes?: number[];
}

export interface FieldsResponse {
  fields: FieldDTO[];
  sections: string[];
  total: number;
}

// ---------------------------------------------------------------------------
// /rules
// ---------------------------------------------------------------------------

export interface RuleDTO {
  ruleId: string;
  targetField: number;
  operator: "=" | "validation";
  formulaRaw: string;
  guidanceText: string;
  parsed: boolean;
  parseError?: string;
  metadata: {
    referencedFields: number[];
    referencedParams: number[];
    hasConditional: boolean;
    hasTipoCheck: boolean;
    hasAtributoCheck: boolean;
  };
}

export interface RulesResponse {
  rules: RuleDTO[];
  total: number;
  parseErrors: number;
}

// ---------------------------------------------------------------------------
// Error response
// ---------------------------------------------------------------------------

export interface ErrorResponse {
  error: string;
  detail?: string;
}
