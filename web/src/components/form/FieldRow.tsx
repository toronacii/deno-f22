/**
 * A single field row in the F22 form.
 *
 * States:
 *  - declared (user input, editable)
 *  - computed (calculated by engine, read-only, green)
 *  - computed-override (declared but differs from computed, orange border)
 *  - optimizable (has a legal deduction available, amber indicator)
 */

import { useFormStore } from "../../store/form_store.ts";
import { CurrencyInput } from "../ui/CurrencyInput.tsx";
import { Tooltip } from "../ui/Tooltip.tsx";
import type { FieldDefinition } from "@core/models/field.ts";

interface Props {
  field: FieldDefinition;
  optimizableFields?: Set<number>;
}

const TOLERANCE = 1;

function formatPesos(n: number): string {
  return new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(n);
}

export function FieldRow({ field, optimizableFields }: Props) {
  const declared = useFormStore((s) => s.fieldValues[field.code]);
  const computed = useFormStore((s) => s.computedValues[field.code]);
  const hasViolation = useFormStore((s) =>
    s.violations.some((v) => v.targetField === field.code),
  );
  const violationMessage = useFormStore((s) =>
    s.violations.find((v) => v.targetField === field.code)?.message,
  );
  const setField = useFormStore((s) => s.setField);
  const clearField = useFormStore((s) => s.clearField);
  const isOptimizable = optimizableFields?.has(field.code) ?? false;

  // Determine display mode
  const isComputed = field.isCalculated && computed !== undefined;
  const hasDrift =
    declared !== undefined &&
    computed !== undefined &&
    Math.abs(declared - computed) > TOLERANCE;

  const effectiveValue = computed ?? declared;

  return (
    <tr
      id={`field-${field.code}`}
      className={`group border-b border-gray-100 last:border-0 ${
        hasViolation ? "bg-red-50/40" : ""
      }`}
    >
      {/* Field code */}
      <td className="w-16 pr-2 py-1.5 text-right">
        <span className="font-mono text-xs text-gray-400 select-none">{field.code}</span>
      </td>

      {/* Label */}
      <td className="py-1.5 pr-3">
        <span className="text-sm text-gray-700 leading-tight">
          {field.label}
          {isOptimizable && (
            <Tooltip content="Hay una deducción legal disponible para este campo">
              <span className="ml-1 text-amber-500 cursor-help">💡</span>
            </Tooltip>
          )}
          {field.isMandatory && (
            <span className="ml-1 text-red-400 text-xs">*</span>
          )}
        </span>
      </td>

      {/* Value / Input */}
      <td className="w-44 py-1.5">
        {isComputed ? (
          <div
            className={`flex items-center justify-end gap-1.5 ${
              hasDrift ? "rounded border border-amber-400 bg-amber-50 px-2 py-1" : ""
            }`}
          >
            {hasDrift ? (
              <Tooltip
                content={`Declarado: ${formatPesos(declared!)} — Calculado: ${formatPesos(computed!)}`}
              >
                <span className="text-amber-600 text-xs cursor-help">⚠</span>
              </Tooltip>
            ) : null}
            <span className="font-mono text-sm text-emerald-700 font-medium tabular-nums">
              {formatPesos(effectiveValue ?? 0)}
            </span>
          </div>
        ) : (
          <CurrencyInput
            value={declared}
            onChange={(v) => {
              if (v === undefined) clearField(field.code);
              else setField(field.code, v);
            }}
            hasError={hasViolation}
          />
        )}
      </td>

      {/* Violation indicator */}
      <td className="w-6 py-1.5 pl-1">
        {hasViolation && (
          <Tooltip content={violationMessage ?? ""}>
            <span className="text-red-500 text-xs cursor-help">✕</span>
          </Tooltip>
        )}
      </td>
    </tr>
  );
}
