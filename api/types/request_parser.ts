/**
 * Parses and validates incoming FormRequest JSON into core FormData + FormContext.
 */

import {
  createFormData,
  createFormContext,
  type FormData,
  type FormContext,
  type TaxRegime,
  type EntityType,
} from "@f22/core";
import type { FormRequest } from "./api_types.ts";

const VALID_REGIMES = new Set<string>([
  "M14A", "14D1", "14D3", "14D8", "14G", "14TT", "BHEP", "PRESUNTO", "SIMPLIFICADO",
]);

const VALID_ENTITY_TYPES = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8]);

export interface ParsedRequest {
  formData: FormData;
  context: FormContext;
}

export interface ParseError {
  field: string;
  message: string;
}

export function parseFormRequest(body: FormRequest): { ok: true; data: ParsedRequest } | { ok: false; errors: ParseError[] } {
  const errors: ParseError[] = [];

  // Validate fieldValues
  if (!body.fieldValues || typeof body.fieldValues !== "object" || Array.isArray(body.fieldValues)) {
    errors.push({ field: "fieldValues", message: "Must be an object mapping field codes to numbers" });
  }

  // Validate taxRegime
  if (body.taxRegime !== undefined && !VALID_REGIMES.has(body.taxRegime)) {
    errors.push({
      field: "taxRegime",
      message: `Invalid regime '${body.taxRegime}'. Valid: ${[...VALID_REGIMES].join(", ")}`,
    });
  }

  // Validate entityType
  if (body.entityType !== undefined && !VALID_ENTITY_TYPES.has(body.entityType)) {
    errors.push({
      field: "entityType",
      message: `Invalid entityType '${body.entityType}'. Must be 1–8`,
    });
  }

  if (errors.length > 0) return { ok: false, errors };

  // Build FormData
  const formData = createFormData();
  for (const [k, v] of Object.entries(body.fieldValues ?? {})) {
    const code = parseInt(k);
    if (!isNaN(code) && typeof v === "number") {
      formData.set(code, v);
    }
  }

  // Build FormContext
  const externalVars = new Map<string, number>();
  for (const [k, v] of Object.entries(body.externalVars ?? {})) {
    externalVars.set(k, v);
  }

  const context = createFormContext({
    taxRegime: (body.taxRegime ?? "14D8") as TaxRegime,
    entityType: (body.entityType ?? 1) as EntityType,
    isRectificatoria: body.isRectificatoria ?? false,
    externalVars,
  });

  return { ok: true, data: { formData, context } };
}
