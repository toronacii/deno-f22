/**
 * Numeric input for F22 fields.
 * Integer fields: formats with thousands separator (es-CL style).
 * Decimal fields: allows up to `decimals` fractional digits.
 */

import { useRef, useState } from "react";

interface Props {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  decimals?: number;
  disabled?: boolean;
  hasError?: boolean;
  placeholder?: string;
  className?: string;
}

function formatValue(n: number, decimals: number): string {
  if (decimals > 0) {
    return new Intl.NumberFormat("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(n);
  }
  return new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(n);
}

function parseValue(s: string, decimals: number): number | undefined {
  // Strip thousands separators (period in es-CL), keep minus and decimal comma/dot
  const clean = decimals > 0
    ? s.replace(/\./g, "").replace(",", ".").trim()
    : s.replace(/\./g, "").replace(/,/g, "").trim();
  if (clean === "" || clean === "-") return undefined;
  const n = decimals > 0 ? parseFloat(clean) : parseInt(clean, 10);
  return isNaN(n) ? undefined : n;
}

export function CurrencyInput({ value, onChange, decimals = 0, disabled, hasError, placeholder, className }: Props) {
  const [rawInput, setRawInput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = rawInput !== null
    ? rawInput
    : value !== undefined
    ? formatValue(value, decimals)
    : "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = decimals > 0
      ? e.target.value.replace(/[^\d,.-]/g, "")
      : e.target.value.replace(/[^\d-]/g, "");
    setRawInput(raw);
    onChange(parseValue(raw, decimals));
  }

  function handleBlur() {
    setRawInput(null);
    if (inputRef.current && value !== undefined) {
      inputRef.current.value = formatValue(value, decimals);
    }
  }

  function handleFocus() {
    if (value !== undefined) {
      setRawInput(decimals > 0 ? String(value).replace(".", ",") : String(value));
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode={decimals > 0 ? "decimal" : "numeric"}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      disabled={disabled}
      placeholder={placeholder ?? (decimals > 0 ? `0,${"0".repeat(decimals)}` : "0")}
      className={[
        "w-full text-right tabular-nums rounded px-2 py-1 text-sm",
        "border focus:outline-none focus:ring-2",
        disabled
          ? "bg-stone-50 text-stone-400 border-stone-200 cursor-default"
          : hasError
          ? "border-danger-500 bg-danger-500/8 focus:ring-danger-500/30"
          : "border-stone-300 bg-white focus:ring-brand-300 focus:border-brand-400",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
