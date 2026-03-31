/**
 * Modal para agregar un contribuyente (RUT).
 * Valida formato RUT + dígito verificador en tiempo real.
 * Al perder el foco sobre el RUT válido, consulta el SII para obtener info del contribuyente.
 */

import { useState, type FormEvent } from "react";
import { api } from "../../lib/api.ts";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

interface SiiData {
  registrado: boolean;
  nombre: string | null;
  inicioActividades: boolean;
  fechaInicioActividades: string | null;
  cumpleObligacionTributaria: string | null;
  girosNegocio: { codigo: string; descripcion: string; categoriaTributaria: string; indicadorAfectoIva: string }[];
  timbrajes: { codigo: string; descripcion: string }[];
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
  const [rutBody,    setRutBody]    = useState("");
  const [name,       setName]       = useState("");
  const [regime,     setRegime]     = useState("");
  const [error,      setError]      = useState<string | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [siiData,    setSiiData]    = useState<SiiData | null>(null);
  const [siiLoading, setSiiLoading] = useState(false);
  const [siiError,   setSiiError]   = useState<string | null>(null);

  const dvDisplay = rutBody.length >= 7 ? calcDv(rutBody.replace(/\./g, "")) : null;
  const rutFull   = rutBody ? `${formatRutDisplay(rutBody.replace(/\./g, ""))}-${dvDisplay ?? ""}` : "";
  const rutValid  = rutBody.length >= 7 && validateRut(rutFull);

  function handleRutChange(raw: string) {
    const cleaned = raw.replace(/[^\d\.]/g, "");
    setRutBody(cleaned);
    // Limpiar info SII al cambiar el RUT
    if (cleaned !== rutBody) {
      setSiiData(null);
      setSiiError(null);
    }
  }

  async function handleRutBlur() {
    if (!rutValid) return;
    const digits = rutBody.replace(/\./g, "");
    const dv     = dvDisplay!;

    setSiiLoading(true);
    setSiiError(null);
    setSiiData(null);

    try {
      const data = await api.get<SiiData>(`/taxpayers/sii-lookup?rut=${digits}&dv=${dv}`);
      setSiiData(data);
      // Auto-rellenar nombre si está vacío y el SII devolvió uno
      if (data.nombre && !name.trim()) {
        setName(data.nombre);
      }
    } catch {
      setSiiError("No se pudo consultar el SII");
    } finally {
      setSiiLoading(false);
    }
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
        sii_data:   siiData ?? undefined,
      });
      onAdded();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  const cumpleOk = siiData?.cumpleObligacionTributaria === "SI";

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
                onBlur={handleRutBlur}
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

            {/* SII lookup result */}
            {siiLoading && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-400">
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Consultando SII…
              </div>
            )}

            {siiError && (
              <p className="mt-2 text-xs text-amber-600">{siiError}</p>
            )}

            {siiData && !siiLoading && (
              <div className={`mt-2 rounded-lg border px-3 py-2.5 text-xs space-y-1.5 ${
                !siiData.registrado
                  ? "border-danger-200 bg-danger-500/5"
                  : cumpleOk
                    ? "border-stone-200 bg-stone-50"
                    : "border-amber-200 bg-amber-50"
              }`}>
                {/* Nombre */}
                {siiData.nombre && (
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium text-stone-800">{siiData.nombre}</span>
                  </div>
                )}

                {/* Inicio de actividades */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {siiData.inicioActividades
                    ? <span className="text-stone-600">Inicio actividades: <span className="font-medium">{siiData.fechaInicioActividades}</span></span>
                    : <span className="text-danger-600">Sin inicio de actividades</span>
                  }
                </div>

                {/* Giro principal */}
                {siiData.girosNegocio.length > 0 && (
                  <div className="flex items-start gap-1.5">
                    <svg className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-stone-600">{siiData.girosNegocio[0].descripcion}</span>
                  </div>
                )}

                {/* Cumplimiento tributario */}
                {siiData.cumpleObligacionTributaria && (
                  <div className="flex items-center gap-1.5">
                    <svg className={`w-3 h-3 shrink-0 ${cumpleOk ? "text-success-500" : "text-amber-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {cumpleOk
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      }
                    </svg>
                    <span className={cumpleOk ? "text-success-600" : "text-amber-700"}>
                      {cumpleOk ? "Cumple obligaciones tributarias" : "No cumple obligaciones tributarias"}
                    </span>
                  </div>
                )}
              </div>
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
