#!/usr/bin/env python3
"""
3_generate_ts.py
----------------
Convierte deductions_raw.json → core/optimizer/optimization_space_v2.ts

Genera un archivo TypeScript con DEDUCTIBLE_FIELDS completo, listo para
reemplazar el hardcoded actual.

Uso:
  python3 scripts/3_generate_ts.py [--dry-run]
"""

import json
import argparse
from pathlib import Path
from datetime import date

SCRIPTS_DIR = Path(__file__).parent
ROOT = SCRIPTS_DIR.parent
INPUT_PATH = SCRIPTS_DIR / "deductions_raw.json"
OUTPUT_PATH = ROOT / "core" / "optimizer" / "optimization_space_v2.ts"

# ── Helpers ───────────────────────────────────────────────────────────────────

def ts_str(s) -> str:
    """Escapa una string para TypeScript."""
    if s is None:
        return "null"
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip() + '"'

def ts_number(n) -> str:
    if n is None:
        return "null"
    return str(n)

def generate_entry(d: dict) -> str:
    """Genera una entrada TypeScript para un DeductibleField."""
    code = d["fieldCode"]
    name = d.get("name", f"Campo {code}")
    legal_basis = d.get("legalBasis", "Ver instrucciones SII")
    limit_type = d.get("limitType", "none")
    limit_value = d.get("limitValue")
    ref_field = d.get("referenceField")
    param_id = d.get("paramId")
    strategy = d.get("strategy", "Consultar instrucciones SII.")
    conditions = d.get("conditions")
    notes = d.get("notes")

    # Normalizar limitType
    valid_limit_types = {"fixed_utm", "fixed_uf", "fixed_pesos", "percentage_of_income", "percentage_of_field", "none"}
    if limit_type not in valid_limit_types:
        limit_type = "none"
        limit_value = None

    lines = [
        "  {",
        f"    fieldCode: {code},",
        f"    name: {ts_str(name)},",
        f"    legalBasis: {ts_str(legal_basis)},",
        f"    limitType: {ts_str(limit_type)},",
    ]

    if limit_value is not None:
        lines.append(f"    limitValue: {ts_number(limit_value)},")
    if ref_field is not None:
        lines.append(f"    referenceField: {ref_field},")
    if param_id is not None:
        lines.append(f"    paramId: {param_id},")

    lines.append(f"    strategy: {ts_str(strategy)},")

    if conditions:
        lines.append(f"    conditions: {ts_str(conditions)},")
    if notes:
        lines.append(f"    // Nota: {notes}")

    lines.append("  },")
    return "\n".join(lines)

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true",
                        help="Mostrar output sin escribir archivo")
    args = parser.parse_args()

    if not INPUT_PATH.exists():
        print(f"ERROR: {INPUT_PATH} no encontrado.")
        print("Ejecuta primero: python3 scripts/2_enrich_with_ai.py")
        return

    raw = json.loads(INPUT_PATH.read_text())

    # Filtrar solo los que son deducibles y no tienen errores
    deductible = [
        d for d in raw
        if d.get("isDeductible") is True and "error" not in d
    ]

    # Ordenar por fieldCode
    deductible.sort(key=lambda d: d["fieldCode"])

    print(f"Campos deducibles a incluir: {len(deductible)}")

    # Agrupar por categoría (basado en el campo de conditions o legalBasis)
    # para añadir comentarios agrupadores
    def categorize(d: dict) -> str:
        basis = (d.get("legalBasis") or "").lower()
        if "42 bis" in basis or "apv" in basis:
            return "APV y Ahorro Previsional"
        if "42" in basis and "n°2" in basis or "art. 42" in basis:
            return "Honorarios (Art. 42 N°2 LIR)"
        if "donaci" in basis or "19.885" in basis or "18.985" in basis:
            return "Donaciones"
        if "hipotecari" in basis or "55 bis" in basis:
            return "Intereses Hipotecarios"
        if "sence" in basis or "capacitaci" in basis:
            return "Capacitación SENCE"
        if "idpc" in basis or "primera categoría" in basis:
            return "Impuesto de Primera Categoría"
        if "igc" in basis or "global complementario" in basis:
            return "Impuesto Global Complementario"
        return "Otros"

    # Generar el archivo TypeScript
    entries = [generate_entry(d) for d in deductible]

    # Stats por limitType
    by_type: dict[str, int] = {}
    for d in deductible:
        lt = d.get("limitType", "none")
        by_type[lt] = by_type.get(lt, 0) + 1

    ts_content = f"""/**
 * optimization_space_v2.ts
 *
 * Catálogo de campos deducibles del F22 AT2026.
 * GENERADO AUTOMÁTICAMENTE el {date.today().isoformat()} desde instrucciones_unidas.pdf
 * usando Claude AI + reglas CSW ({len(deductible)} campos identificados).
 *
 * Distribución por tipo de límite:
{chr(10).join(f' * - {lt}: {count} campos' for lt, count in sorted(by_type.items()))}
 *
 * NO EDITAR MANUALMENTE — regenerar con:
 *   python3 scripts/1_extract_chunks.py
 *   python3 scripts/2_enrich_with_ai.py
 *   python3 scripts/3_generate_ts.py
 */

export interface DeductibleField {{
  fieldCode: number;
  name: string;
  legalBasis: string;
  limitType: "fixed_utm" | "fixed_uf" | "fixed_pesos" | "percentage_of_income" | "percentage_of_field" | "none";
  limitValue?: number;
  referenceField?: number;
  paramId?: number;
  strategy: string;
  /** Quién puede usar esta deducción (null = todos). */
  conditions?: string;
}}

export const DEDUCTIBLE_FIELDS: DeductibleField[] = [
{chr(10).join(entries)}
];

export function getDeductibleFieldMap(): Map<number, DeductibleField[]> {{
  const map = new Map<number, DeductibleField[]>();
  for (const df of DEDUCTIBLE_FIELDS) {{
    const existing = map.get(df.fieldCode) ?? [];
    existing.push(df);
    map.set(df.fieldCode, existing);
  }}
  return map;
}}
"""

    if args.dry_run:
        print("\n--- OUTPUT PREVIEW (primeras 50 líneas) ---")
        print("\n".join(ts_content.split("\n")[:50]))
        print("...")
        print(f"\nTotal líneas: {ts_content.count(chr(10))}")
    else:
        OUTPUT_PATH.write_text(ts_content)
        print(f"\nGenerado: {OUTPUT_PATH}")
        print(f"  {len(deductible)} campos deducibles")
        print(f"  {ts_content.count(chr(10))} líneas")
        print()
        print("Para activarlo en el optimizador:")
        print(f"  En core/optimizer/optimizer.ts, cambiar el import:")
        print(f"  - import {{ DEDUCTIBLE_FIELDS }} from './optimization_space.ts';")
        print(f"  + import {{ DEDUCTIBLE_FIELDS }} from './optimization_space_v2.ts';")

if __name__ == "__main__":
    main()
