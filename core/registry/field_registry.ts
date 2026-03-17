/**
 * Registry of field definitions indexed by field code.
 */

import type { FieldDefinition } from "../models/field.ts";

export class FieldRegistry {
  private readonly byCode: Map<number, FieldDefinition>;

  constructor(fields: FieldDefinition[]) {
    this.byCode = new Map(fields.map((f) => [f.code, f]));
  }

  get(code: number): FieldDefinition | undefined {
    return this.byCode.get(code);
  }

  has(code: number): boolean {
    return this.byCode.has(code);
  }

  getAll(): FieldDefinition[] {
    return Array.from(this.byCode.values());
  }

  getBySection(section: string): FieldDefinition[] {
    return this.getAll().filter((f) => f.section === section);
  }

  getSections(): string[] {
    return [...new Set(this.getAll().map((f) => f.section))];
  }
}
