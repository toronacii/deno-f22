/**
 * A single RECUADRO — the numbered box that groups related fields in the F22.
 */

import type { FieldDefinition, SectionInfo } from "@core/models/field.ts";
import { FieldRow } from "./FieldRow.tsx";
import { useFormStore } from "../../store/form_store.ts";
import { Badge } from "../ui/Badge.tsx";

interface Props {
  section: SectionInfo;
  fields: FieldDefinition[];
  optimizableFields?: Set<number>;
}

export function Recuadro({ section, fields, optimizableFields }: Props) {
  const violations = useFormStore((s) => s.violations);

  const sectionViolations = violations.filter((v) =>
    fields.some((f) => f.code === v.targetField),
  );

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">
            {section.id}
          </span>
          <h2 className="text-sm font-semibold text-gray-800">
            {section.title !== section.id ? section.title : ""}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{fields.length} campos</span>
          {sectionViolations.length > 0 && (
            <Badge variant="error">{sectionViolations.length} error{sectionViolations.length !== 1 ? "es" : ""}</Badge>
          )}
        </div>
      </div>

      {/* Fields table */}
      <div className="px-4 py-2">
        <table className="w-full">
          <tbody>
            {fields.map((field) => (
              <FieldRow
                key={field.code}
                field={field}
                optimizableFields={optimizableFields}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
