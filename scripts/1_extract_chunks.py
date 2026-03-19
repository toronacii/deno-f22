#!/usr/bin/env python3
"""
1_extract_chunks.py
-------------------
Parsea instrucciones_unidas.pdf y genera chunks.json:
un objeto por sección de campo (Código NNN), con el texto completo de esa sección.

También carga 5_CSW_Set_1.0_AT2026.xlsx vía deno para identificar qué campos
aparecen como deducciones ('-') en las reglas CSW.

Output: scripts/chunks.json
"""

import re
import json
import subprocess
import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    print("Instalando pypdf...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf", "-q"])
    import pypdf

ROOT = Path(__file__).parent.parent
PDF_PATH = ROOT / "instrucciones_unidas.pdf"
RULES_PATH = ROOT / "5_CSW_Set_1.0_AT2026.xlsx"
OUT_PATH = Path(__file__).parent / "chunks.json"

# ── 1. Extraer texto completo del PDF ─────────────────────────────────────────

print(f"Leyendo {PDF_PATH.name}...")
reader = pypdf.PdfReader(str(PDF_PATH))
pages_text = []
for i, page in enumerate(reader.pages):
    pages_text.append(page.extract_text() or "")

full_text = "\n".join(pages_text)
print(f"  {len(reader.pages)} páginas, {len(full_text):,} caracteres")

# ── 2. Identificar campos deducibles desde reglas CSW ────────────────────────

print(f"\nIdentificando campos deducibles desde CSW rules...")

deno_script = r"""
import { loadRules, buildRuleRegistry } from "/RULES_PATH/core/mod.ts";
const raw = await loadRules("/RULES_PATH/5_CSW_Set_1.0_AT2026.xlsx");
const reg = buildRuleRegistry(raw);

// Campos que aparecen con '-' en formulas (deducciones en reglas de cálculo)
const reSubtract = /\-\s*\[(\d+)\]/g;
const deductible = new Set();
for (const r of reg.rules) {
  for (const text of [r.formulaRaw, r.targetFieldRaw ?? ""]) {
    let m;
    reSubtract.lastIndex = 0;
    while ((m = reSubtract.exec(text)) !== null) deductible.add(parseInt(m[1]));
  }
}

// También incluir campos con operador '-' explícito en el layout
// (los que el SII marca con '-' como rebaja)
console.log(JSON.stringify([...deductible].sort((a,b)=>a-b)));
""".replace("/RULES_PATH/core/mod.ts", str(ROOT / "core/mod.ts")) \
   .replace("/RULES_PATH/5_CSW_Set_1.0_AT2026.xlsx", str(RULES_PATH))

result = subprocess.run(
    ["deno", "eval", deno_script],
    capture_output=True, text=True, cwd=str(ROOT)
)
if result.returncode != 0:
    print(f"  WARN: deno falló, usando set vacío. Error: {result.stderr[:200]}")
    deductible_codes = set()
else:
    lines = [l for l in result.stdout.strip().split("\n") if l.startswith("[")]
    deductible_codes = set(json.loads(lines[-1])) if lines else set()

print(f"  {len(deductible_codes)} campos aparecen como deducciones en reglas CSW")

# ── 3. Segmentar el texto en chunks por campo ─────────────────────────────────

# Patrón de encabezado de sección de campo:
# "1.1.8. Código 770." o "16.1.1.1. Código 1279."
HEADER_RE = re.compile(
    r"(\d+(?:\.\d+)+)\.\s+[Cc]ódigo[s]?\s+(\d{2,4})\.",
    re.MULTILINE
)

matches = list(HEADER_RE.finditer(full_text))
print(f"\nEncontradas {len(matches)} secciones de campo en el PDF")

chunks = []
for i, match in enumerate(matches):
    section_id = match.group(1)
    field_code = int(match.group(2))
    start = match.start()
    end = matches[i + 1].start() if i + 1 < len(matches) else len(full_text)
    text = full_text[start:end].strip()

    # Limitar a 3000 caracteres (suficiente para el contexto del campo)
    # pero preservar el inicio que tiene el título y la definición clave
    text_trimmed = text[:3000]

    chunks.append({
        "sectionId": section_id,
        "fieldCode": field_code,
        "isDeductible": field_code in deductible_codes,
        "text": text_trimmed,
        "textLength": len(text),
        "trimmed": len(text) > 3000,
    })

# ── 4. Estadísticas ──────────────────────────────────────────────────────────

deductible_chunks = [c for c in chunks if c["isDeductible"]]
unique_codes = len(set(c["fieldCode"] for c in chunks))
unique_deductible = len(set(c["fieldCode"] for c in deductible_chunks))

print(f"\nResumen:")
print(f"  Total chunks:              {len(chunks)}")
print(f"  Códigos únicos:            {unique_codes}")
print(f"  Chunks de campos deducibles: {len(deductible_chunks)}")
print(f"  Códigos deducibles únicos: {unique_deductible}")
print(f"  Avg text length:           {sum(c['textLength'] for c in chunks) // len(chunks)} chars")

# ── 5. Guardar ────────────────────────────────────────────────────────────────

OUT_PATH.write_text(json.dumps(chunks, ensure_ascii=False, indent=2))
print(f"\nGuardado: {OUT_PATH}")
print(f"Listo para procesar con: python3 scripts/2_enrich_with_ai.py")
