/**
 * Currency input for Chilean pesos.
 * Displays formatted value (1.234.567) while storing raw integer.
 */

import { useRef, useState } from "react";

interface Props {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  disabled?: boolean;
  hasError?: boolean;
  placeholder?: string;
  className?: string;
}

function format(n: number): string {
  return new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(n);
}

function parse(s: string): number | undefined {
  const clean = s.replace(/\./g, "").replace(/,/g, "").trim();
  if (clean === "" || clean === "-") return undefined;
  const n = parseInt(clean, 10);
  return isNaN(n) ? undefined : n;
}

export function CurrencyInput({ value, onChange, disabled, hasError, placeholder, className }: Props) {
  const [rawInput, setRawInput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = rawInput !== null
    ? rawInput
    : value !== undefined
    ? format(value)
    : "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d-]/g, "");
    setRawInput(raw);
    onChange(parse(raw));
  }

  function handleBlur() {
    setRawInput(null);
    if (inputRef.current && value !== undefined) {
      // Reformat on blur
      inputRef.current.value = format(value);
    }
  }

  function handleFocus() {
    if (value !== undefined) {
      setRawInput(String(value));
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      disabled={disabled}
      placeholder={placeholder ?? "0"}
      className={[
        "w-full text-right tabular-nums rounded px-2 py-1 text-sm",
        "border focus:outline-none focus:ring-2",
        disabled
          ? "bg-gray-50 text-gray-500 border-gray-200 cursor-default"
          : hasError
          ? "border-red-400 bg-red-50 focus:ring-red-300"
          : "border-gray-300 bg-white focus:ring-blue-300 focus:border-blue-400",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
