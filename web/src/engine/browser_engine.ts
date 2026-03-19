/**
 * Browser-side engine bootstrap.
 *
 * Downloads rules + fields from the API once, parses formulas in-browser
 * using the same core/ code as the server, and exposes Calculator + Validator
 * ready to use with zero network latency per keypress.
 */

import { buildRuleRegistry, Calculator, Validator } from "@core/mod.ts";
import { buildParameterStore } from "@core/models/parameter.ts";
import type { FieldDefinition, SectionInfo } from "@core/models/field.ts";
import type { ParameterStore } from "@core/models/parameter.ts";
import type { LayoutSection } from "@core/models/layout.ts";

// DTO shapes returned by the API
interface RuleDTO {
  ruleId: string;
  targetField: number;
  operator: "=" | "validation";
  formulaRaw: string;
  guidanceText: string;
}

interface FieldDTO {
  code: number;
  label: string;
  section: string;
  dataType: string;
  isCalculated: boolean;
  isMandatory: boolean;
  description?: string;
  warnings?: string[];
  applicableRegimes?: string[];
  applicableEntityTypes?: number[];
}

export interface FieldMetadataEntry {
  description?: string;
  warnings?: string[];
  applicableRegimes?: string[];
  applicableEntityTypes?: number[];
}

interface ParamDTO {
  id: string;
  num: number;
  value: number;
  description: string;
  unit?: string;
}

export interface BrowserEngine {
  calculator: Calculator;
  validator: Validator;
  fields: FieldDefinition[];
  sections: SectionInfo[];
  layoutSections: LayoutSection[];
  params: ParameterStore;
  fieldMetadata: Map<number, FieldMetadataEntry>;
  parseRate: number;
  totalRules: number;
}

export async function initBrowserEngine(apiBase = "/api"): Promise<BrowserEngine> {
  // Fetch rules, fields, params and layout in parallel
  const [rulesRes, fieldsRes, paramsRes, layoutRes] = await Promise.all([
    fetch(`${apiBase}/rules`),
    fetch(`${apiBase}/fields`),
    fetch(`${apiBase}/params`),
    fetch(`${apiBase}/layout`),
  ]);

  if (!rulesRes.ok) throw new Error(`Failed to load rules: ${rulesRes.status}`);
  if (!fieldsRes.ok) throw new Error(`Failed to load fields: ${fieldsRes.status}`);

  const rulesData = await rulesRes.json() as { rules: RuleDTO[]; total: number };
  const fieldsData = await fieldsRes.json() as { fields: FieldDTO[]; sections: string[] };

  // Params may not have a dedicated endpoint yet — fall back to embedded defaults
  let paramsList: ParamDTO[] = DEFAULT_PARAMS;
  if (paramsRes.ok) {
    paramsList = await paramsRes.json() as ParamDTO[];
  }

  // Re-parse formulas in browser using same core/ parser
  const rawRules = rulesData.rules.map((r) => ({
    ruleId: r.ruleId,
    targetFieldRaw: String(r.targetField),
    operatorRaw: r.operator,
    formulaRaw: r.formulaRaw,
    guidanceText: r.guidanceText,
  }));

  const registry = buildRuleRegistry(rawRules);
  const params = buildParameterStore(paramsList);
  const calculator = new Calculator(registry.rules, params);
  const validator = new Validator(registry.rules, params);

  const parsed = registry.parsedRules().length;
  const total = registry.rules.length;

  // Build SectionInfo[] from the sections array + fields
  const sections: SectionInfo[] = fieldsData.sections.map((id, i) => ({
    id,
    title: id,
    startRow: i,
  }));

  const fields: FieldDefinition[] = fieldsData.fields.map((f) => ({
    code: f.code,
    label: f.label,
    section: f.section,
    dataType: f.dataType as FieldDefinition["dataType"],
    isCalculated: f.isCalculated,
    isMandatory: f.isMandatory,
    canBeNegative: false,
  }));

  const fieldMetadata = new Map<number, FieldMetadataEntry>();
  for (const f of fieldsData.fields) {
    if (f.description || f.warnings?.length || f.applicableRegimes || f.applicableEntityTypes) {
      fieldMetadata.set(f.code, {
        description: f.description,
        warnings: f.warnings,
        applicableRegimes: f.applicableRegimes,
        applicableEntityTypes: f.applicableEntityTypes,
      });
    }
  }

  const layoutSections: LayoutSection[] = layoutRes.ok
    ? await layoutRes.json() as LayoutSection[]
    : [];

  return { calculator, validator, fields, sections, layoutSections, params, fieldMetadata, parseRate: parsed / total, totalRules: total };
}

// Minimal params embedded in the browser bundle as fallback
// (full list loaded from API at runtime, this is just a safety net)
const DEFAULT_PARAMS: ParamDTO[] = [
  { id: "P08", num: 8, value: 0.30, description: "IDPC M14A" },
  { id: "P09", num: 9, value: 0.27, description: "IDPC 14D1" },
  { id: "P10", num: 10, value: 0.25, description: "IDPC 14D8" },
  { id: "P12", num: 12, value: 0.35, description: "Tasa max IGC" },
  { id: "P24", num: 24, value: 0.30, description: "Gastos presuntos" },
  { id: "P29", num: 29, value: 65887, description: "UTM diciembre" },
  { id: "P42", num: 42, value: 15, description: "Limite gastos UTM" },
  { id: "P647", num: 647, value: 0.27, description: "Crédito IDPC semi" },
  { id: "P704", num: 704, value: 0.25, description: "Crédito IDPC pyme" },
];
