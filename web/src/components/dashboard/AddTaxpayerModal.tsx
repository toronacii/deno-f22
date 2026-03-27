/**
 * Modal para agregar un contribuyente (RUT).
 * Valida formato RUT + dígito verificador en tiempo real.
 */

import { useState, type FormEvent } from "react";
import { api } from "../../lib/api.ts";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

const TAX_REGIMES = [
  { value: "",            label: "Sin especificar" },
  { value: "14D8",        label: "14D8 — Pro-Pyme General" },
  { value: "M14A",        label: "M14A — Renta Atribuida" },
  { value: "14D1",        label: "14D1 — Semi-integrado" },
  { value: "14D3",        label: "14D3 — Pro-Pyme Transparente" },
  { value: "14G",         label: "14G — Renta Presunta Opcional" },
  { value: "14TT",        label: "14TT — Transición" },
  { value: "BHEP",        label: "BHEP — Base Honorarios" },
  { value: "PRESUNTO",    label: "Renta Presunta" },
  { value: "SIMPLIFICADO",label: "Simplificado" },
];

/** Calcula el dígito verificador del RUT chileno. */
function calcDv(rut: string): string {
  const digits = rut.replace(/\D/g, "");
  let sum = 0;
  let factor = 2;
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += parseInt(digits[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const rem = 11 - (sum % 11);
  if (rem === 11) return "0";
  if (rem === 10) return "K";
  return String(rem);
}

/** Formatea RUT: 12345678 → 12.345.678 */
function formatRutDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function validateRut(rut: string): boolean {
  const clean = rut.replace(/[\.\-]/g, "").toUpperCase();
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  return calcDv(body) === dv;
}

export function AddTaxpayerModal({ onClose, onAdded }: Props) {
  const [rutBody,  setRutBody]  = useState("");
  const [name,     setName]     = useState("");
  const [regime,   setRegime]   = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  const dvDisplay = rutBody.length >= 7 ? calcDv(rutBody.replace(/\./g, "")) : null;
  const rutFull   = rutBody ? `${formatRutDisplay(rutBody.replace(/\./g, ""))}-${dvDisplay ?? ""}` : "";
  const rutValid  = rutBody.length >= 7 && validateRut(rutFull);

  function handleRutChange(raw: string) {
    // solo números y puntos
    const cleaned = raw.replace(/[^\d\.]/g, "");
    setRutBody(cleaned);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!rutValid) return;
    setError(null);
    setLoading(true);

    try {
      await api.post("/taxpayers", {
        rut:        rutFull,
        name:       name.trim(),
        tax_regime: regime || undefined,
      });
      onAdded();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-stone-900">Agregar contribuyente</h2>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-600 hover:bg-stone-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2.5 bg-danger-500/10 border border-danger-500/20 rounded-lg text-sm text-danger-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* RUT */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">RUT</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={rutBody}
                onChange={(e) => handleRutChange(e.target.value)}
                placeholder="12345678"
                maxLength={11}
                className={`flex-1 border rounded-lg px-3 py-2.5 text-sm font-mono
                  focus:outline-none focus:ring-2 transition-colors ${
                    rutBody.length >= 7
                      ? rutValid
                        ? "border-success-500 focus:ring-success-500/30"
                        : "border-danger-500 focus:ring-danger-500/30"
                      : "border-stone-200 focus:ring-brand-300"
                  }`}
              />
              <span className="text-stone-400 font-mono text-sm">-</span>
              <div className={`w-10 text-center font-mono font-bold text-lg border rounded-lg px-2 py-2 ${
                rutValid ? "border-success-500 text-success-500" : "border-stone-200 text-stone-400"
              }`}>
                {dvDisplay ?? "?"}
              </div>
            </div>
            {rutBody.length >= 7 && (
              <p className={`text-xs mt-1 ${rutValid ? "text-success-500" : "text-danger-600"}`}>
                {rutValid ? "✓ RUT válido" : "Dígito verificador incorrecto"}
              </p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Nombre / Razón social</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Empresa SpA"
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400
                placeholder:text-stone-400"
            />
          </div>

          {/* Régimen (opcional) */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Régimen tributario <span className="text-stone-400 font-normal">(opcional)</span>
            </label>
            <select
              value={regime}
              onChange={(e) => setRegime(e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-brand-300 text-stone-700"
            >
              {TAX_REGIMES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-stone-200 text-stone-700 font-medium py-2.5 rounded-lg text-sm hover:bg-stone-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!rutValid || !name.trim() || loading}
              className="flex-1 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-300
                text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? "Guardando…" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
