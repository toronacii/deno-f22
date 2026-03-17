/**
 * F22 AT2026 Tax Engine — Public API
 *
 * Core library for calculating, validating, and optimizing
 * Chilean F22 income tax returns (Año Tributario 2026).
 */

// Models
export type { ExprNode, CondNode, FuncName } from "./models/ast.ts";
export type { FieldDefinition, SectionInfo, FieldDataType } from "./models/field.ts";
export type { Rule, RawRule, RuleMetadata, ValidationResult } from "./models/rule.ts";
export type { Parameter, ParameterStore } from "./models/parameter.ts";
export { buildParameterStore } from "./models/parameter.ts";
export type { FormData, FormContext, TaxRegime, EntityType } from "./models/form.ts";
export {
  createFormData,
  createFormContext,
  getField,
  setField,
} from "./models/form.ts";

// Loaders
export { loadXlsx, getCell, getCellStr, getCellNum } from "./loaders/xlsx_loader.ts";
export type { CellValue, Sheet, Workbook } from "./loaders/xlsx_loader.ts";
export { loadLayout, loadLayoutSections } from "./loaders/layout_loader.ts";
export type { LayoutLoadResult } from "./loaders/layout_loader.ts";
export { loadRules } from "./loaders/rules_loader.ts";
export { loadParameters, loadDefaultParameters } from "./loaders/params_loader.ts";

// Parser
export { normalizeFormula, splitFormulaParts } from "./parser/normalizer.ts";
export { tokenize } from "./parser/tokenizer.ts";
export { parseFormula, parseCondition } from "./parser/parser.ts";
export type { ParseResult } from "./parser/parser.ts";
export { TokenKind } from "./parser/token_types.ts";
export type { Token } from "./parser/token_types.ts";

// Evaluator
export { EvalContext } from "./evaluator/eval_context.ts";
export { evaluateExpr } from "./evaluator/evaluator.ts";
export { evaluateCondition } from "./evaluator/condition_evaluator.ts";
export { applyFunction } from "./evaluator/functions.ts";

// Registry
export { FieldRegistry } from "./registry/field_registry.ts";
export { RuleRegistry, buildRuleRegistry } from "./registry/rule_registry.ts";
export { collectMetadata } from "./registry/metadata_collector.ts";

// Engine
export { buildExecutionPlan } from "./engine/execution_plan.ts";
export type { ExecutionPlan } from "./engine/execution_plan.ts";
export { Calculator } from "./engine/calculator.ts";
export { Validator } from "./engine/validator.ts";
export type {
  CalculationResult,
  FieldResult,
  ValidationReport,
  ValidationViolation,
} from "./engine/engine_types.ts";

// Optimizer
export { Optimizer } from "./optimizer/optimizer.ts";
export type { OptimizationReport, OptimizationSuggestion } from "./optimizer/optimizer.ts";
export { DEDUCTIBLE_FIELDS, getDeductibleFieldMap } from "./optimizer/optimization_space.ts";
export type { DeductibleField } from "./optimizer/optimization_space.ts";
