#!/usr/bin/env python3
"""
5_generate_field_metadata_ts.py
--------------------------------
Convierte field_metadata_raw.json → core/data/field_metadata.ts

Genera un Map<number, FieldMetadata> listo para usar en core, api y web.

Uso:
  python3 scripts/5_generate_field_metadata_ts.py [--dry-run]
"""

import json
import argparse
from pathlib import Path
from datetime import date

SCRIPTS_DIR = Path(__file__).parent
ROOT        = SCRIPTS_DIR.parent
INPUT_PATH  = SCRIPTS_DIR / "field_metadata_raw.json"
OUTPUT_PATH = ROOT / "core" / "data" / "field_metadata.ts"

def ts_str(s) -> str:
    if s is None:
        return "null"
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip() + '"'

def ts_str_array(arr) -> str:
    if not arr:
        return "[]"
    return "[" + ", ".join(ts_str(x) for x in arr) + "]"

def ts_num_array(arr) -> str:
    if not arr:
        return "[]"
    return "[" + ", ".join(str(x) for x in arr) + "]"

def generate_entry(d: dict) -> str:
    code    = d["fieldCode"]
    desc    = d.get("description", "")
    entered = d.get("isUserEntered", True)
    regimes = d.get("applicableRegimes")
    types   = d.get("applicableEntityTypes")
    warns   = d.get("warnings") or []

    lines = [
        f"  [{code}]: {{",
        f"    fieldCode: {code},",
        f"    description: {ts_str(desc)},",
        f"    isUserEntered: {'true' if entered else 'false'},",
    ]

    if regimes is not None:
        lines.append(f"    applicableRegimes: {ts_str_array(regimes)},")
    if types is not None:
        lines.append(f"    applicableEntityTypes: {ts_num_array(types)},")
    if warns:
        lines.append(f"    warnings: {ts_str_array(warns)},")

    lines.append("  },")
    return "\n".join(lines)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not INPUT_PATH.exists():
        print(f"ERROR: {INPUT_PATH} no encontrado.")
        print("Ejecuta primero: python3 scripts/4_extract_field_metadata.py")
        return

    raw = json.loads(INPUT_PATH.read_text())
    ok  = [d for d in raw if "error" not in d]
    ok.sort(key=lambda d: d["fieldCode"])

    user_entered = sum(1 for d in ok if d.get("isUserEntered"))
    with_regimes = sum(1 for d in ok if d.get("applicableRegimes"))
    with_types   = sum(1 for d in ok if d.get("applicableEntityTypes"))
    with_warns   = sum(1 for d in ok if d.get("warnings"))

    print(f"Campos con metadata: {len(ok)}")
    print(f"  Usuario declara:   {user_entered}")
    print(f"  Calculados:        {len(ok) - user_entered}")
    print(f"  Con régimen:       {with_regimes}")
    print(f"  Con tipo entidad:  {with_types}")
    print(f"  Con advertencias:  {with_warns}")

    entries = "\n".join(generate_entry(d) for d in ok)

    ts = f"""/**
 * field_metadata.ts
 *
 * Metadata extraída de instrucciones_unidas.pdf para el F22 AT2026.
 * GENERADO AUTOMÁTICAMENTE el {date.today().isoformat()} ({len(ok)} campos).
 *
 * NO EDITAR MANUALMENTE — regenerar con:
 *   python3 scripts/4_extract_field_metadata.py
 *   python3 scripts/5_generate_field_metadata_ts.py
 */

export interface FieldMetadata {{
  fieldCode: number;
  /** Descripción concisa del campo para tooltips. */
  description: string;
  /** true = el contribuyente lo declara; false = calculado automáticamente. */
  isUserEntered: boolean;
  /** null = aplica a todos los regímenes. */
  applicableRegimes?: string[];
  /** null = aplica a todos los tipos de entidad (1–8). */
  applicableEntityTypes?: number[];
  /** Advertencias o restricciones especiales. */
  warnings?: string[];
}}

export const FIELD_METADATA: Record<number, FieldMetadata> = {{
{entries}
}};

/** Obtiene la metadata de un campo, o undefined si no hay instrucciones disponibles. */
export function getFieldMetadata(code: number): FieldMetadata | undefined {{
  return FIELD_METADATA[code];
}}

/** Filtra campos aplicables a un régimen y tipo de entidad dados. */
export function isFieldApplicable(
  code: number,
  regime: string,
  entityType: number,
): boolean {{
  const meta = FIELD_METADATA[code];
  if (!meta) return true; // sin metadata → asumimos que aplica
  if (meta.applicableRegimes && !meta.applicableRegimes.includes(regime)) return false;
  if (meta.applicableEntityTypes && !meta.applicableEntityTypes.includes(entityType)) return false;
  return true;
}}
"""

    if args.dry_run:
        print("\n--- OUTPUT PREVIEW (primeras 60 líneas) ---")
        print("\n".join(ts.split("\n")[:60]))
        print("...")
        print(f"\nTotal líneas: {ts.count(chr(10))}")
    else:
        OUTPUT_PATH.write_text(ts)
        print(f"\nGenerado: {OUTPUT_PATH}")
        print(f"  {ts.count(chr(10))} líneas")
        print()
        print("Integración:")
        print("  core/ → importar getFieldMetadata en field_registry.ts")
        print("  api/  → exponer en GET /api/fields")
        print("  web/  → usar description como tooltip en RecuadroTable.tsx")

if __name__ == "__main__":
    main()
