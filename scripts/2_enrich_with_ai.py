#!/usr/bin/env python3
"""
2_enrich_with_ai.py
-------------------
Toma chunks.json y para cada campo deducible llama a la API de OpenAI
para extraer información estructurada de deducción tributaria.

Uso:
  python3 scripts/2_enrich_with_ai.py [--model gpt4o|gpt4om] [--limit N] [--force]
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

ROOT        = Path(__file__).parent.parent
SCRIPTS_DIR = Path(__file__).parent
CHUNKS_PATH = SCRIPTS_DIR / "chunks.json"
OUTPUT_PATH = SCRIPTS_DIR / "deductions_raw.json"
PROGRESS_PATH = SCRIPTS_DIR / ".progress.json"

MODELS = {
    "gpt4o":  "gpt-4o",           # Máxima calidad
    "gpt4om": "gpt-4o-mini",      # Rápido y económico
}

RATE_LIMIT_RPM = 60    # gpt-4o-mini: 500 RPM; gpt-4o: 60 RPM (conservador)
MAX_RETRIES    = 3
RETRY_BACKOFF  = [5, 15, 45]

# ── Prompt ────────────────────────────────────────────────────────────────────

SYSTEM = (
    "Eres un experto en tributación chilena. "
    "Analiza instrucciones oficiales del SII para el Formulario 22 AT2026 "
    "y extrae información estructurada sobre deducciones tributarias. "
    "Responde ÚNICAMENTE con JSON válido, sin texto adicional ni markdown."
)

def build_prompt(code: int, text: str) -> str:
    return f"""Analiza las instrucciones del código {code} del F22 AT2026.

TEXTO OFICIAL DEL SII:
{text}

Extrae como JSON. Si NO es una deducción que reduce impuesto o base imponible,
devuelve {{"isDeductible": false}}.

Si SÍ es deducible:
{{
  "fieldCode": {code},
  "name": "nombre corto (máx 60 chars)",
  "isDeductible": true,
  "legalBasis": "artículo LIR, DL, DS o Ley que lo autoriza",
  "limitType": "fixed_utm" | "fixed_uf" | "fixed_pesos" | "percentage_of_income" | "percentage_of_field" | "none",
  "limitValue": número o null,
  "referenceField": código F22 base si es % de otro campo (ej: 547) o null,
  "strategy": "consejo concreto de planificación en 1-2 oraciones",
  "conditions": "quién puede usarlo (ej: solo Art.42 N°2) o null"
}}

Tipos de límite:
- fixed_utm: N UTM (ej: 15 UTM → limitValue: 15)
- fixed_uf: N UF (ej: 600 UF → limitValue: 600)
- fixed_pesos: monto fijo en $ (limitValue: número)
- percentage_of_income: decimal (ej: 30% → 0.30), referenceField: código del ingreso base
- percentage_of_field: decimal, referenceField: código del campo base
- none: sin límite explícito"""

# ── Helpers ───────────────────────────────────────────────────────────────────

def load_chunks() -> dict[int, dict]:
    raw = json.loads(CHUNKS_PATH.read_text())
    by_code: dict[int, dict] = {}
    for chunk in raw:
        if not chunk["isDeductible"]:
            continue
        code = chunk["fieldCode"]
        if code not in by_code:
            by_code[code] = {"fieldCode": code, "combinedText": ""}
        sep = f"\n\n--- {chunk['sectionId']} ---\n" if by_code[code]["combinedText"] else ""
        by_code[code]["combinedText"] += sep + chunk["text"]
    for entry in by_code.values():
        entry["combinedText"] = entry["combinedText"][:4000]
    return by_code

def parse_json_response(text: str) -> dict:
    text = text.strip()
    if "```" in text:
        for part in text.split("```"):
            clean = part.lstrip("json").strip()
            if clean.startswith("{"):
                return json.loads(clean)
    return json.loads(text)

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
                        max_tokens=1000,
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

    all_fields = load_chunks()
    print(f"Campos deducibles: {len(all_fields)}")

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
        print(f"Pendientes: {len(pending)} | ~{len(pending)/RATE_LIMIT_RPM:.0f} min estimados")
        print()

        semaphore = asyncio.Semaphore(5)  # max 5 concurrentes
        BATCH = 10
        processed = 0
        t0 = time.time()

        for i in range(0, len(pending), BATCH):
            batch = pending[i:i + BATCH]
            tasks = [
                call_openai(client, model_name, code,
                            all_fields[code]["combinedText"], semaphore)
                for code in batch
            ]
            batch_results = await asyncio.gather(*tasks)

            for code, res in zip(batch, batch_results):
                if res is not None:
                    results[code] = res
                    icon = "✓" if res.get("isDeductible") else "○"
                    name = res.get("name", "?")[:45]
                    limit = f" [{res.get('limitType','?')} {res.get('limitValue','')}]" if res.get("isDeductible") else ""
                    print(f"  {icon} [{code:4d}] {name}{limit}")
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

    deductible = [v for v in results.values() if v.get("isDeductible") and "error" not in v]
    failed = [v for v in results.values() if "error" in v]

    OUTPUT_PATH.write_text(json.dumps(list(results.values()), ensure_ascii=False, indent=2))

    print(f"\n{'='*50}")
    print(f"Procesados:  {len(results)}/{len(all_fields)}")
    print(f"Deducibles:  {len(deductible)}")
    print(f"Fallidos:    {len(failed)}")
    print(f"Guardado:    {OUTPUT_PATH}")
    print(f"Siguiente:   python3 scripts/3_generate_ts.py")

if __name__ == "__main__":
    asyncio.run(main())
