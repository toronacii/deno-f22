#!/usr/bin/env python3
"""
4_extract_field_metadata.py
---------------------------
Para cada campo con texto en chunks.json, llama a OpenAI para extraer
metadata estructurada: descripción, advertencias, aplicabilidad.

Uso:
  python3 scripts/4_extract_field_metadata.py [--model gpt4o|gpt4om] [--limit N] [--force]
"""

import asyncio
import json
import os
import sys
import time
import argparse
from pathlib import Path

def install(pkg):
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", pkg, "-q"],
                         stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)

try:
    from dotenv import load_dotenv
except ImportError:
    install("python-dotenv")
    from dotenv import load_dotenv

try:
    from openai import OpenAI
except ImportError:
    install("openai")
    from openai import OpenAI

# ── Config ────────────────────────────────────────────────────────────────────

ROOT          = Path(__file__).parent.parent
SCRIPTS_DIR   = Path(__file__).parent
CHUNKS_PATH   = SCRIPTS_DIR / "chunks.json"
OUTPUT_PATH   = SCRIPTS_DIR / "field_metadata_raw.json"
PROGRESS_PATH = SCRIPTS_DIR / ".progress_metadata.json"

MODELS = {
    "gpt4o":  "gpt-4o",
    "gpt4om": "gpt-4o-mini",
}

RATE_LIMIT_RPM = 60
MAX_RETRIES    = 3
RETRY_BACKOFF  = [5, 15, 45]

REGIMES   = ["M14A", "14D1", "14D3", "14D8", "14G", "14TT", "BHEP", "PRESUNTO", "SIMPLIFICADO"]
ENT_TYPES = [1, 2, 3, 4, 5, 6, 7, 8]

# ── Prompt ────────────────────────────────────────────────────────────────────

SYSTEM = (
    "Eres un experto en tributación chilena. "
    "Analiza instrucciones oficiales del SII para el Formulario 22 AT2026. "
    "Responde ÚNICAMENTE con JSON válido, sin texto adicional ni markdown."
)

def build_prompt(code: int, text: str) -> str:
    return f"""Analiza las instrucciones del código {code} del F22 AT2026.

TEXTO OFICIAL DEL SII:
{text}

Extrae como JSON con esta estructura exacta:
{{
  "fieldCode": {code},
  "description": "explicación clara del campo en 1-2 oraciones (máx 200 chars)",
  "isUserEntered": true | false,
  "applicableRegimes": {json.dumps(REGIMES)} o null si aplica a todos,
  "applicableEntityTypes": {json.dumps(ENT_TYPES)} o null si aplica a todos,
  "warnings": ["advertencia 1", "advertencia 2"] o [] si no hay advertencias especiales
}}

Reglas:
- isUserEntered: true si el contribuyente declara el valor; false si es calculado automáticamente
- applicableRegimes: solo incluir los regímenes mencionados explícitamente en el texto; null si aplica a todos
- applicableEntityTypes: 1=empresa, 2=sociedad profesionales, 3=comunidad, 4=persona natural dependiente,
  5=persona natural independiente (Art.42 N°2), 6=extranjero, 7=global complementario, 8=otro
  Solo incluir si el texto lo restringe explícitamente; null si aplica a todos
- warnings: restricciones importantes, signos especiales (negativo), topes, casos de excepción (máx 2)"""

# ── Helpers ───────────────────────────────────────────────────────────────────

def load_fields() -> dict[int, str]:
    """Combina todos los chunks por código, retorna dict code → text."""
    raw = json.loads(CHUNKS_PATH.read_text())
    by_code: dict[int, str] = {}
    for chunk in raw:
        text = chunk.get("text", "").strip()
        if not text:
            continue
        code = chunk["fieldCode"]
        if code not in by_code:
            by_code[code] = ""
        sep = f"\n\n--- {chunk['sectionId']} ---\n" if by_code[code] else ""
        by_code[code] += sep + text
    # Truncar a 3000 chars (metadata necesita menos contexto que deducciones)
    return {code: text[:3000] for code, text in by_code.items()}

# ── API call ──────────────────────────────────────────────────────────────────

async def call_openai(
    client: OpenAI,
    model_name: str,
    field_code: int,
    text: str,
    semaphore: asyncio.Semaphore,
) -> dict | None:
    async with semaphore:
        prompt = build_prompt(field_code, text)
        loop = asyncio.get_event_loop()

        for attempt in range(MAX_RETRIES):
            try:
                response = await loop.run_in_executor(
                    None,
                    lambda: client.chat.completions.create(
                        model=model_name,
                        messages=[
                            {"role": "system", "content": SYSTEM},
                            {"role": "user",   "content": prompt},
                        ],
                        temperature=0,
                        max_tokens=500,
                        response_format={"type": "json_object"},
                    )
                )
                result = json.loads(response.choices[0].message.content)
                result["fieldCode"] = field_code
                return result

            except json.JSONDecodeError as e:
                print(f"  [{field_code}] JSON inválido (intento {attempt+1}): {e}")

            except Exception as e:
                err = str(e)
                if "429" in err or "rate_limit" in err.lower():
                    import re
                    m = re.search(r'retry[^0-9]*(\d+)s', err, re.IGNORECASE)
                    wait = int(m.group(1)) + 2 if m else RETRY_BACKOFF[attempt]
                    print(f"  [{field_code}] Rate limit — esperando {wait}s...")
                    await asyncio.sleep(wait)
                    continue
                else:
                    print(f"  [{field_code}] Error ({attempt+1}/{MAX_RETRIES}): {err[:80]}")

            if attempt < MAX_RETRIES - 1:
                await asyncio.sleep(RETRY_BACKOFF[attempt])

        return None

# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", choices=["gpt4o", "gpt4om"], default="gpt4om")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    load_dotenv(ROOT / ".env")
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not api_key:
        print(f"ERROR: Configura OPENAI_API_KEY en {ROOT / '.env'}")
        sys.exit(1)

    client = OpenAI(api_key=api_key)
    model_name = MODELS[args.model]
    print(f"Modelo: {model_name}")

    if not CHUNKS_PATH.exists():
        print("ERROR: Ejecuta primero: python3 scripts/1_extract_chunks.py")
        sys.exit(1)

    all_fields = load_fields()
    print(f"Campos con texto en PDF: {len(all_fields)}")

    results: dict[int, dict] = {}
    if PROGRESS_PATH.exists() and not args.force:
        saved = json.loads(PROGRESS_PATH.read_text())
        results = {int(k): v for k, v in saved.items() if "error" not in v}
        print(f"Progreso previo: {len(results)} campos OK cargados")

    pending = [c for c in sorted(all_fields.keys()) if c not in results]
    if args.limit:
        pending = pending[:args.limit]

    if not pending:
        print("Nada pendiente.")
    else:
        print(f"Pendientes: {len(pending)} | ~{len(pending)/RATE_LIMIT_RPM:.1f} min estimados")
        print()

        semaphore = asyncio.Semaphore(8)
        BATCH = 15
        processed = 0
        t0 = time.time()

        for i in range(0, len(pending), BATCH):
            batch = pending[i:i + BATCH]
            tasks = [
                call_openai(client, model_name, code, all_fields[code], semaphore)
                for code in batch
            ]
            batch_results = await asyncio.gather(*tasks)

            for code, res in zip(batch, batch_results):
                if res is not None:
                    results[code] = res
                    entered = "✎" if res.get("isUserEntered") else "⟳"
                    desc = res.get("description", "?")[:55]
                    warns = f" ⚠×{len(res.get('warnings', []))}" if res.get("warnings") else ""
                    print(f"  {entered} [{code:4d}] {desc}{warns}")
                else:
                    results[code] = {"fieldCode": code, "error": "failed"}
                    print(f"  ✗ [{code:4d}] FAILED")
                processed += 1

            PROGRESS_PATH.write_text(json.dumps(results, ensure_ascii=False, indent=2))

            elapsed = time.time() - t0
            rate = processed / elapsed * 60 if elapsed > 0 else 1
            eta = (len(pending) - processed) / rate if rate > 0 else 0
            print(f"    {processed}/{len(pending)} | ~{rate:.0f} req/min | ETA {eta:.1f} min\n")

            if i + BATCH < len(pending):
                await asyncio.sleep(60 / RATE_LIMIT_RPM * len(batch))

    ok     = [v for v in results.values() if "error" not in v]
    failed = [v for v in results.values() if "error" in v]

    OUTPUT_PATH.write_text(json.dumps(list(results.values()), ensure_ascii=False, indent=2))

    print(f"\n{'='*50}")
    print(f"Procesados:  {len(results)}/{len(all_fields)}")
    print(f"OK:          {len(ok)}")
    print(f"Fallidos:    {len(failed)}")
    print(f"Guardado:    {OUTPUT_PATH}")
    print(f"Siguiente:   python3 scripts/5_generate_field_metadata_ts.py")

if __name__ == "__main__":
    asyncio.run(main())
