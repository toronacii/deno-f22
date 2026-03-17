/**
 * Topological ordering of calculation rules using Kahn's BFS algorithm.
 *
 * Rules that compute field X must execute after all rules computing
 * any field referenced in X's formula.
 */

import type { Rule } from "../models/rule.ts";

export interface ExecutionPlan {
  /** Rules in topologically sorted order */
  orderedRules: Rule[];
  /** Rules that are part of a dependency cycle (should not happen in F22) */
  cycleRules: Rule[];
}

/**
 * Build an execution plan from the set of calculation rules.
 *
 * @param rules - All rules with operator "=" (computation rules)
 */
export function buildExecutionPlan(rules: Rule[]): ExecutionPlan {
  // Filter to computation rules only
  const calcRules = rules.filter((r) => r.operator === "=" && r.formulaAst !== null);

  // Map from fieldCode → rule (only one rule per field for "=" rules)
  const fieldToRule = new Map<number, Rule>();
  for (const rule of calcRules) {
    fieldToRule.set(rule.targetField, rule);
  }

  // Build dependency graph:
  // rule R depends on rule S if R's formula references S's targetField
  const dependsOn = new Map<string, Set<string>>();  // ruleId → Set<ruleId>
  const dependedBy = new Map<string, Set<string>>(); // ruleId → Set<ruleId>

  for (const rule of calcRules) {
    dependsOn.set(rule.ruleId, new Set());
    dependedBy.set(rule.ruleId, new Set());
  }

  for (const rule of calcRules) {
    for (const refField of rule.metadata.referencedFields) {
      const depRule = fieldToRule.get(refField);
      if (depRule && depRule.ruleId !== rule.ruleId) {
        dependsOn.get(rule.ruleId)!.add(depRule.ruleId);
        dependedBy.get(depRule.ruleId)!.add(rule.ruleId);
      }
    }
  }

  // Kahn's BFS
  const inDegree = new Map<string, number>();
  for (const rule of calcRules) {
    inDegree.set(rule.ruleId, dependsOn.get(rule.ruleId)!.size);
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }

  const ruleById = new Map<string, Rule>(calcRules.map((r) => [r.ruleId, r]));
  const ordered: Rule[] = [];

  while (queue.length > 0) {
    const id = queue.shift()!;
    const rule = ruleById.get(id);
    if (rule) ordered.push(rule);

    for (const dependentId of (dependedBy.get(id) ?? new Set())) {
      const newDeg = (inDegree.get(dependentId) ?? 1) - 1;
      inDegree.set(dependentId, newDeg);
      if (newDeg === 0) queue.push(dependentId);
    }
  }

  // Any rules not in ordered have a cycle
  const orderedIds = new Set(ordered.map((r) => r.ruleId));
  const cycleRules = calcRules.filter((r) => !orderedIds.has(r.ruleId));

  // Append cycle rules at the end (best effort)
  return { orderedRules: [...ordered, ...cycleRules], cycleRules };
}
