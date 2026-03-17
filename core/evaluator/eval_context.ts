/**
 * Evaluation context — holds all state needed to evaluate a formula.
 */

import type { FormData, FormContext } from "../models/form.ts";
import type { ParameterStore } from "../models/parameter.ts";
import { getField } from "../models/form.ts";

export class EvalContext {
  /** User-declared field values (immutable during evaluation) */
  readonly declared: FormData;
  /** Fields computed so far by the engine */
  readonly computed: FormData;
  /** Parameters from params_AT2026.json */
  readonly params: ParameterStore;
  /** Form metadata (regime, entity type, etc.) */
  readonly context: FormContext;
  /** Named variable bindings (Alfa, Beta, etc.) from current rule */
  readonly bindings: Map<string, number>;

  constructor(
    declared: FormData,
    computed: FormData,
    params: ParameterStore,
    context: FormContext,
  ) {
    this.declared = declared;
    this.computed = computed;
    this.params = params;
    this.context = context;
    this.bindings = new Map();
  }

  /**
   * Get field value: computed takes priority over declared.
   * Returns 0 if not found.
   */
  getField(code: number): number {
    if (this.computed.has(code)) return this.computed.get(code)!;
    return getField(this.declared, code);
  }

  /** Get parameter value by numeric ID */
  getParam(id: number): number {
    return this.params.get(id)?.value ?? 0;
  }

  /** Get external variable value */
  getExternalVar(varId: string): number {
    return this.context.externalVars.get(varId) ??
      this.context.externalVars.get(varId.toUpperCase()) ??
      0;
  }

  /** Get named binding value */
  getBinding(name: string): number {
    return this.bindings.get(name) ?? 0;
  }

  /** Set a named binding */
  setBinding(name: string, value: number): void {
    this.bindings.set(name, value);
  }

  /** Create a child context for binding evaluation */
  withBinding(name: string, value: number): EvalContext {
    const child = new EvalContext(this.declared, this.computed, this.params, this.context);
    // Copy parent bindings
    for (const [k, v] of this.bindings) child.bindings.set(k, v);
    child.bindings.set(name, value);
    return child;
  }
}
