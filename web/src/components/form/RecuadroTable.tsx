/**
 * RecuadroTable — renders a single RECUADRO section faithful to the Excel layout.
 *
 * Each row can have 1–N field slots depending on the section's column structure.
 * Operators (+, -, =) are shown between the code and its input.
 * Sub-headers and column-header rows are rendered as spanning cells.
 * Supports dataType: "number" (currency), "text" (text input), "boolean" (checkbox).
 */

import { Fragment } from "react";
import type { LayoutSection, LayoutRow, LayoutField } from "@core/models/layout.ts";
import type { FieldMetadataEntry } from "../../engine/browser_engine.ts";
import { useFormStore } from "../../store/form_store.ts";
import { CurrencyInput } from "../ui/CurrencyInput.tsx";
import { Tooltip } from "../ui/Tooltip.tsx";

interface Props {
  section: LayoutSection;
  /** Set of field codes that have been computed (read-only) */
  computedCodes: Set<number>;
  optimizableFields?: Set<number>;
  fieldMetadata?: Map<number, FieldMetadataEntry>;
}

function formatPesos(n: number): string {
  return new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(n);
}

// ── text field cell ───────────────────────────────────────────────────────────

function TextFieldCell({ code }: { code: number }) {
  const value = useFormStore((s) => s.textValues[code] ?? "");
  const setTextField = useFormStore((s) => s.setTextField);
  return (
    <input
      id={`field-${code}`}
      type="text"
      value={value}
      onChange={(e) => setTextField(code, e.target.value)}
      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
    />
  );
}

// ── boolean field cell ────────────────────────────────────────────────────────

function BoolFieldCell({ code }: { code: number }) {
  const value = useFormStore((s) => s.fieldValues[code] ?? 0);
  const setField = useFormStore((s) => s.setField);
  return (
    <input
      id={`field-${code}`}
      type="checkbox"
      checked={value === 1}
      onChange={(e) => setField(code, e.target.checked ? 1 : 0)}
      className="w-4 h-4 accent-blue-600 cursor-pointer"
    />
  );
}

// ── numeric field cell ────────────────────────────────────────────────────────

function NumericFieldCell({ code, isComputed }: { code: number; isComputed: boolean }) {
  const declared = useFormStore((s) => s.fieldValues[code]);
  const computed = useFormStore((s) => s.computedValues[code]);
  const hasViolation = useFormStore((s) => s.violations.some((v) => v.targetField === code));
  const violationMsg = useFormStore((s) => s.violations.find((v) => v.targetField === code)?.message);
  const setField = useFormStore((s) => s.setField);
  const clearField = useFormStore((s) => s.clearField);

  const effectiveValue = computed ?? declared;
  const hasDrift =
    declared !== undefined &&
    computed !== undefined &&
    Math.abs(declared - computed) > 1;

  if (isComputed) {
    return (
      <div
        id={`field-${code}`}
        className={`flex items-center justify-end gap-1 px-2 py-1 rounded text-right bg-gray-50 border border-gray-200 ${
          hasDrift ? "!border-amber-400 !bg-amber-50" : ""
        }`}
      >
        {hasDrift && (
          <Tooltip content={`Declarado: ${formatPesos(declared!)} — Calculado: ${formatPesos(computed!)}`}>
            <span className="text-amber-500 text-xs cursor-help">⚠</span>
          </Tooltip>
        )}
        <span className="font-mono text-sm text-emerald-700 font-semibold tabular-nums">
          {formatPesos(effectiveValue ?? 0)}
        </span>
      </div>
    );
  }

  return (
    <div id={`field-${code}`}>
      {hasViolation ? (
        <Tooltip content={violationMsg ?? ""}>
          <div>
            <CurrencyInput
              value={declared}
              onChange={(v) => v === undefined ? clearField(code) : setField(code, v)}
              hasError
            />
          </div>
        </Tooltip>
      ) : (
        <CurrencyInput
          value={declared}
          onChange={(v) => v === undefined ? clearField(code) : setField(code, v)}
        />
      )}
    </div>
  );
}

// ── field cell dispatcher ─────────────────────────────────────────────────────

function FieldCell({
  code,
  isComputed,
  dataType,
}: {
  code: number;
  isComputed: boolean;
  dataType?: string;
}) {
  if (dataType === "text") return <TextFieldCell code={code} />;
  if (dataType === "boolean") return <BoolFieldCell code={code} />;
  return <NumericFieldCell code={code} isComputed={isComputed} />;
}

// ── section title row ─────────────────────────────────────────────────────────

function SectionTitleRow({ section, nSlots }: { section: LayoutSection; nSlots: number }) {
  return (
    <tr>
      <td
        colSpan={1 + nSlots * 2}
        className="bg-[#003087] text-white font-bold text-sm py-1.5 px-3"
      >
        {section.title}
      </td>
    </tr>
  );
}

// ── sub-header row ────────────────────────────────────────────────────────────

function SubHeaderRow({ row, nSlots }: { row: LayoutRow; nSlots: number }) {
  return (
    <tr className="bg-gray-100">
      <td
        colSpan={1 + nSlots * 2}
        className="py-1 px-3 text-xs uppercase tracking-wide text-gray-600 font-semibold border-b border-gray-200"
      >
        {row.text}
      </td>
    </tr>
  );
}

// ── column-header row ─────────────────────────────────────────────────────────

function ColHeaderRow({ row, nSlots }: { row: LayoutRow; nSlots: number }) {
  const colTexts = row.colTexts ?? [];
  return (
    <>
      {row.text && (
        <tr className="bg-gray-50">
          <td
            colSpan={1 + nSlots * 2}
            className="py-1 px-3 text-xs font-semibold text-gray-700 border-b border-gray-200 uppercase tracking-wide"
          >
            {row.text}
          </td>
        </tr>
      )}
      <tr className="bg-gray-50 text-xs text-gray-500 font-medium border-b border-gray-300">
        <td className="py-1 px-3" />
        {Array.from({ length: nSlots }).map((_, i) => (
          <Fragment key={i}>
            <td className="py-1 px-2 text-center text-[11px] text-gray-500 italic">
              {colTexts[i] ?? ""}
            </td>
            <td className="w-5" />
          </Fragment>
        ))}
      </tr>
    </>
  );
}

// ── slot cell ─────────────────────────────────────────────────────────────────

/** Tooltip content combining description + warnings. */
function FieldTooltipContent({ meta }: { meta: FieldMetadataEntry }) {
  return (
    <span>
      {meta.description && <span className="block">{meta.description}</span>}
      {meta.warnings?.map((w, i) => (
        <span key={i} className="block mt-1 text-amber-300">⚠ {w}</span>
      ))}
    </span>
  );
}

/** Renders a single slot (field + operator). Handles per-field labels. */
function SlotCell({
  field,
  rowText,
  computedCodes,
  meta,
}: {
  field: LayoutField;
  rowText: string;
  computedCodes: Set<number>;
  meta?: FieldMetadataEntry;
}) {
  const isComputed = computedCodes.has(field.code);
  const perFieldLabel = field.label && field.label !== rowText ? field.label : "";
  const hasWarnings = (meta?.warnings?.length ?? 0) > 0;

  return (
    <td className="w-44 py-1.5 px-2 align-top">
      <div className="flex flex-col gap-0.5">
        {perFieldLabel && (
          <span className="text-[11px] text-gray-500 leading-tight" title={perFieldLabel}>
            {perFieldLabel}
          </span>
        )}
        <div className={`flex items-center gap-1 ${field.dataType === "boolean" ? "justify-start" : "justify-end"}`}>
          {/* Info / warning icon with tooltip */}
          {meta && (
            <Tooltip content={<FieldTooltipContent meta={meta} />}>
              <span className={`text-[11px] cursor-help select-none ${
                hasWarnings ? "text-amber-400" : "text-gray-300 hover:text-blue-400"
              }`}>
                {hasWarnings ? "⚠" : "?"}
              </span>
            </Tooltip>
          )}
          <span className="text-[10px] font-mono text-gray-400 select-none">{field.code}</span>
          <div className={field.dataType === "boolean" ? "" : field.dataType === "text" ? "flex-1" : "flex-1 max-w-28"}>
            <FieldCell
              code={field.code}
              isComputed={isComputed}
              dataType={field.dataType}
            />
          </div>
        </div>
      </div>
    </td>
  );
}

// ── field row ─────────────────────────────────────────────────────────────────

function FieldDataRow({
  row,
  nSlots,
  slotGroups,
  computedCodes,
  fieldMetadata,
}: {
  row: LayoutRow;
  nSlots: number;
  slotGroups: number[][];
  computedCodes: Set<number>;
  fieldMetadata?: Map<number, FieldMetadataEntry>;
}) {
  return (
    <tr
      className={`border-b border-gray-100 last:border-0 hover:bg-blue-50/30 group ${
        row.bold ? "font-semibold bg-gray-50/60" : ""
      }`}
    >
      {/* Label column — row.text only; per-field labels live in the slot cells */}
      <td className="py-1.5 px-3 text-sm text-gray-800 leading-snug min-w-[140px]">
        {row.text}
      </td>

      {/* Field slots — one cell per slot group */}
      {Array.from({ length: nSlots }).map((_, groupIdx) => {
        const group = slotGroups[groupIdx] ?? [groupIdx];
        const f = row.fields.find((x) => group.includes(x.slot));
        if (!f) {
          return (
            <Fragment key={`empty-${groupIdx}`}>
              <td className="w-44 py-1.5 px-2" />
              <td className="w-5 py-1.5 text-center text-xs text-gray-400" />
            </Fragment>
          );
        }
        return (
          <Fragment key={`slot-${f.code}`}>
            <SlotCell
              field={f}
              rowText={row.text}
              computedCodes={computedCodes}
              meta={fieldMetadata?.get(f.code)}
            />
            <td className="w-5 py-1.5 text-center text-xs font-mono text-gray-500 select-none align-middle">
              {f.operator}
            </td>
          </Fragment>
        );
      })}
    </tr>
  );
}

// ── main component ────────────────────────────────────────────────────────────

/**
 * Build display-column groups by merging adjacent slots that are never
 * used simultaneously in the same row.  Example: RECUADRO 0 has slots
 * {0,1,2,3} where even slots carry checkboxes and odd slots carry text
 * inputs — never both in the same row — so they collapse to 2 groups:
 * [0,1] and [2,3].  Sections whose rows do use both slots keep them apart.
 */
function buildSlotGroups(section: LayoutSection): number[][] {
  const fieldRows = section.rows.filter((r) => r.type === "field");
  if (fieldRows.length === 0) return [[0]];

  const maxSlot = Math.max(
    0,
    ...fieldRows.flatMap((r) => r.fields.map((f) => f.slot)),
  );

  const groups: number[][] = [];
  let s = 0;
  while (s <= maxSlot) {
    if (s + 1 <= maxSlot) {
      // Check if slot s and slot s+1 ever co-exist in the same row
      const conflict = fieldRows.some(
        (r) =>
          r.fields.some((f) => f.slot === s) &&
          r.fields.some((f) => f.slot === s + 1),
      );
      if (!conflict) {
        groups.push([s, s + 1]);
        s += 2;
        continue;
      }
    }
    groups.push([s]);
    s += 1;
  }
  return groups;
}

export function RecuadroTable({ section, computedCodes, optimizableFields: _optimizableFields, fieldMetadata }: Props) {
  const slotGroups = buildSlotGroups(section);
  const nSlots = slotGroups.length;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <SectionTitleRow section={section} nSlots={nSlots} />
        </thead>
        <tbody>
          {section.rows.map((row, i) => {
            if (row.type === "col_header") {
              return <ColHeaderRow key={i} row={row} nSlots={nSlots} />;
            }
            if (row.type === "sub_header") {
              return <SubHeaderRow key={i} row={row} nSlots={nSlots} />;
            }
            return (
              <FieldDataRow key={i} row={row} nSlots={nSlots} slotGroups={slotGroups} computedCodes={computedCodes} fieldMetadata={fieldMetadata} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
