# Motor de Reglas F22 AT2026 — SII Chile

Motor de cálculo, validación y optimización tributaria para el **Formulario 22** del Servicio de Impuestos Internos de Chile, año tributario 2026.

---

## Índice

1. [Qué hace este proyecto](#qué-hace-este-proyecto)
2. [Estado actual](#estado-actual)
3. [Arquitectura](#arquitectura)
4. [Core — Motor de Reglas](#core--motor-de-reglas)
   - [Modelos de datos](#modelos-de-datos)
   - [Loaders](#loaders)
   - [Parser de fórmulas](#parser-de-fórmulas)
   - [Evaluador](#evaluador)
   - [Registros](#registros)
   - [Motor de integración](#motor-de-integración)
   - [Optimizador](#optimizador)
   - [Tests](#tests)
5. [API REST — Fase 2](#api-rest--fase-2)
   - [Endpoints](#endpoints)
   - [Esquemas de request/response](#esquemas-de-requestresponse)
   - [Engine singleton](#engine-singleton)
   - [Middleware](#middleware)
   - [Tests de API](#tests-de-api)
   - [Cómo ejecutar la API](#cómo-ejecutar-la-api)
5. [Fuentes de datos](#fuentes-de-datos)
6. [Cómo ejecutar](#cómo-ejecutar)
7. [Roadmap](#roadmap)
8. [Decisiones de diseño](#decisiones-de-diseño)

---

## Qué hace este proyecto

El SII exige que el software que genera el F22 esté **certificado** y siga las reglas CSW (_Conjunto de Swicht_). Este proyecto implementa:

| Capacidad | Descripción |
|---|---|
| **Cálculo** | Computa todos los campos derivados del F22 siguiendo las 149 reglas CSW en orden topológico |
| **Validación** | Detecta incoherencias entre valores declarados y calculados (tolerancia ±1 peso) |
| **Optimización** | Sugiere estrategias legales de deducción para minimizar la carga tributaria |

---

## Estado actual

```
✅ Fase 1 — Core (Motor de Reglas)       COMPLETA
   ✅ Sprint 1 — Loaders de datos
   ✅ Sprint 2 — Parser de fórmulas
   ✅ Sprint 3 — Evaluador de AST
   ✅ Sprint 4 — Motor de integración
   ✅ Sprint 5 — Optimizador tributario
   ✅ Sprint 6 — Tests (57/57 pasan, ~52ms)

✅ Fase 2 — API REST (Deno + Hono)       COMPLETA
   ✅ 6 endpoints implementados (calculate, validate, optimize, fields, rules, health)
   ✅ Engine singleton con carga eager al arranque (~106ms)
   ✅ Tests de API (22/22 pasan, ~128ms con datos reales)
   ✅ Datos reales: 609 reglas cargadas, 80.5% parse rate

⏳ Fase 3 — Frontend (Vite + React)      PENDIENTE
```

**Cobertura de reglas (datos reales AT2026):** 490/609 reglas parsean (80.5%). La tasa objetivo para certificación SII es ≥145/149 fórmulas del CSW Set principal.

---

## Arquitectura

```
DSL4/
├── core/          ← Motor de reglas (Deno, librería pura, sin dependencias externas)
├── api/           ← API REST (Deno + Hono)
└── web/           ← Frontend (Vite + React + Tailwind) [pendiente]
```

El `core` es una librería Deno pura: no usa `npm:xlsx`, no hace peticiones de red, no tiene efectos secundarios. Todo el parsing de XLSX se hace con `DecompressionStream` nativo + XML propio.

---

## Core — Motor de Reglas

### Estructura de archivos

```
core/
├── deno.json                          ← Configuración Deno, tareas de test
├── mod.ts                             ← Entrada pública (re-exporta todo)
├── data/
│   └── params_AT2026.json             ← 54 parámetros tributarios (P08–P751)
├── loaders/
│   ├── xlsx_loader.ts                 ← Lector ZIP+XML de XLSX sin dependencias
│   ├── layout_loader.ts               ← F22_layout → FieldDefinition[]
│   ├── rules_loader.ts                ← 5_CSW_Set → RawRule[]
│   └── params_loader.ts               ← params_AT2026.json → ParameterStore
├── models/
│   ├── ast.ts                         ← Tipos del AST de fórmulas
│   ├── field.ts                       ← FieldDefinition, SectionInfo
│   ├── rule.ts                        ← Rule, RawRule, ValidationResult
│   ├── parameter.ts                   ← Parameter, ParameterStore
│   └── form.ts                        ← FormData, FormContext, TaxRegime, EntityType
├── parser/
│   ├── normalizer.ts                  ← Pre-procesamiento Unicode, typos, brackets
│   ├── token_types.ts                 ← Enum TokenKind (40+ tipos)
│   ├── tokenizer.ts                   ← string → Token[]
│   └── parser.ts                      ← Recursive descent: Token[] → ExprNode
├── evaluator/
│   ├── eval_context.ts                ← EvalContext (campos + params + contexto)
│   ├── evaluator.ts                   ← Walk AST → number
│   ├── functions.ts                   ← POS, NEG, MIN, MAX, ABS, ROUND, TIPO
│   └── condition_evaluator.ts         ← Si/entonces/Sino, .y., .o.
├── registry/
│   ├── field_registry.ts              ← fieldCode → FieldDefinition
│   ├── rule_registry.ts               ← fieldCode → Rule[], parsea fórmulas al cargar
│   ├── metadata_collector.ts          ← Extrae campos/params referenciados del AST
│   └── param_store.ts                 ← Re-exports de ParameterStore
├── engine/
│   ├── engine_types.ts                ← CalculationResult, ValidationReport, etc.
│   ├── execution_plan.ts              ← Ordenamiento topológico (Kahn's BFS)
│   ├── calculator.ts                  ← Ejecuta reglas en orden, rellena FormData
│   └── validator.ts                   ← Compara valor declarado vs calculado
├── optimizer/
│   ├── optimization_space.ts          ← Campos deducibles y sus límites legales
│   └── optimizer.ts                   ← Estrategias de ahorro tributario
└── tests/
    ├── parser_test.ts                 ← 23 tests: normalizer, tokenizer, parser
    ├── evaluator_test.ts              ← 24 tests: funciones y evaluación de AST
    ├── engine_test.ts                 ← 10 tests: registry, plan, calculator, validator
    └── fixtures/
        ├── sample_rules.ts            ← 10 reglas de ejemplo (a.1–a.10)
        └── sample_form_data.ts        ← FormData de ejemplo + valores esperados
```

---

### Modelos de datos

#### `models/ast.ts` — AST de fórmulas

El parser produce un árbol `ExprNode` que el evaluador recorre:

```typescript
type ExprNode =
  | { kind: "number"; value: number }
  | { kind: "field"; code: number }          // [547]
  | { kind: "param"; id: number }            // P08
  | { kind: "binary"; op: "+"|"-"|"*"|"/"; left: ExprNode; right: ExprNode }
  | { kind: "unary"; op: "-"; operand: ExprNode }
  | { kind: "func"; name: FuncName; args: ExprNode[] }       // MIN{a;b}, POS{x}
  | { kind: "if"; condition: CondNode; then: ExprNode; else: ExprNode }
  | { kind: "inline_cond"; condition: CondNode; value: ExprNode }  // expr; si cond
  | { kind: "binding"; name: string; value: ExprNode; body: ExprNode }  // Alfa=...
  | { kind: "atributo"; values: string[] }   // atributo = M14A .o. 14D1
  | { kind: "external"; varId: string };     // Vx014720

type CondNode =
  | { kind: "compare"; op: "="|"!="|"<"|">"|"<="|">="; left: ExprNode; right: ExprNode }
  | { kind: "and"; left: CondNode; right: CondNode }         // .y.
  | { kind: "or"; left: CondNode; right: CondNode }          // .o.
  | { kind: "tipo"; field: number; values: number[] }        // TIPO{[03]}=1
  | { kind: "atributo_check"; values: string[] }
  | { kind: "rectificatoria"; negated: boolean };            // F22 NO es Rectificatoria
```

#### `models/form.ts` — Formulario

```typescript
type TaxRegime = "M14A" | "14D1" | "14D3" | "14D8" | "14G" | "14TT" | "BHEP" | "PRESUNTO" | "SIMPLIFICADO";
type EntityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;  // 1=Persona Natural, 6=Soc. Profesionales...

interface FormContext {
  taxRegime: TaxRegime;
  entityType: EntityType;
  isRectificatoria: boolean;
  externalVars: Map<string, number>;  // Vx014720, VX010183
}

type FormData = Map<number, number>;  // fieldCode → value en pesos
```

#### `models/rule.ts` — Regla CSW

```typescript
interface Rule {
  ruleId: string;         // "a.3"
  targetField: number;    // 547
  operator: "=" | "validation";
  formulaRaw: string;
  formulaAst: ExprNode | null;  // null si falló el parse
  parseError?: string;
  guidanceText: string;
  metadata: {
    referencedFields: number[];
    referencedParams: number[];
    hasConditional: boolean;
    hasTipoCheck: boolean;
    hasAtributoCheck: boolean;
  };
}
```

---

### Loaders

#### `xlsx_loader.ts`

Lector de archivos `.xlsx` **sin dependencias externas**.

- Los XLSX son ZIPs. Se parsea el ZIP manualmente: se busca el End of Central Directory (EOCD) al final del buffer, se itera el Central Directory, y se descomprimen entradas con `DecompressionStream("deflate-raw")` nativo de Deno/Web.
- El XML de cada hoja se parsea con un mini-parser SAX propio (regex + stack), sin DOM ni `DOMParser`.
- Strings compartidas (`xl/sharedStrings.xml`) se resuelven correctamente.
- Entidades XML (`&amp;`, `&lt;`, etc.) se decodifican.

```typescript
const workbook: Workbook = await loadXlsx("F22_layout_AT2026.xlsx");
const sheet = workbook.get("F22_nuevo");
const value = getCellStr(sheet, row, col);
```

#### `layout_loader.ts`

Itera la hoja principal del `F22_layout_AT2026.xlsx`:

- Detecta cabeceras de sección (`RECUADRO 1`, `RECUADRO 2`, …) en columna B.
- Extrae field codes, etiquetas, tipos de dato e indicadores de obligatoriedad.
- Devuelve `{ fields: FieldDefinition[], sections: SectionInfo[] }`.

#### `rules_loader.ts`

Itera la hoja `Hoja1` del `5_CSW_Set_1.0_AT2026.xlsx`:

- Filtra filas con ID válido (`a.X` o `a.X.Y`).
- Extrae columnas: ID, campo destino, operador, fórmula raw, texto guía.
- Devuelve `RawRule[]` (sin parsear todavía las fórmulas).

#### `params_loader.ts` + `data/params_AT2026.json`

54 parámetros tributarios extraídos de `7_CSW_Parametros_AT2026.pdf`:

| Parámetro | Valor | Descripción |
|---|---|---|
| P08 | 0.30 | Tasa IDPC régimen general |
| P09 | 0.27 | Tasa IDPC semi-integrado |
| P10 | 0.25 | Tasa IDPC Pro-Pyme |
| P12 | 0.35 | Tasa máxima IGC |
| P24 | 0.50 | Porcentaje gastos presuntos Art. 42 N°2 |
| P29 | 65887 | UTM diciembre AT2025 |
| P42 | 15 | Límite gastos presuntos en UTM |
| P647 | 0.27 | Crédito IDPC semi-integrado en IGC |
| P704 | 0.25 | Crédito IDPC Pro-Pyme en IGC |
| P725 | 0.05 | Crédito IDPC renta presunta |
| … | … | … |

---

### Parser de fórmulas

El lenguaje de fórmulas del CSW Set es un DSL en español con construcciones como:

```
POS{[547] - MIN{[547] * P24; P42 * P29}}

Si TIPO{[03]} = 1 .y. [159] > 0 entonces [159] * P12
Sino 0

Si atributo = M14A entonces [170] * P08
Sino Si atributo = 14D1 entonces [170] * P09
Sino [170] * P10

Alfa = [553] * P08
[547] + Alfa

Si F22 NO es Rectificatoria entonces [200]
Sino 0
```

#### `normalizer.ts`

Pre-procesamiento antes de tokenizar:

- `≤ → <=`, `≥ → >=`, `≠ → !=`, `– → -`, `× → *`
- `{NNN] → [NNN]`, `[NNN} → [NNN]` (brackets malformados frecuentes en el Excel)
- `[ 547 ] → [547]` (espacios dentro de brackets)
- `.Y. → .y.`, `.O. → .o.`
- `SI → Si`, `ENTONCES → entonces`, `SINO → Sino`
- Separadores `---` → `\n`

#### `token_types.ts`

40+ tipos de token definidos en el enum `TokenKind`:

```
NUMBER, FIELD_REF, PARAM_REF, EXTERN_VAR
FUNC_POS, FUNC_NEG, FUNC_MIN, FUNC_MAX, FUNC_ABS, FUNC_ROUND, FUNC_TIPO
KW_SI, KW_ENTONCES, KW_SINO, KW_NO, KW_ES, KW_RECTIFICATORIA, KW_ATRIBUTO
REGIME_ID (M14A, 14D1, 14D3, 14D8, 14G, 14TT, BHEP…)
PLUS, MINUS, STAR, SLASH, EQ, NEQ, LT, GT, LTE, GTE
AND (.y.), OR (.o.)
LPAREN, RPAREN, LBRACE, RBRACE, SEMICOLON, COMMA
IDENT, NEWLINE, EOF
```

#### `tokenizer.ts`

Scanner carácter a carácter. Casos especiales:

- `.y.` y `.o.` se detectan como tokens atómicos (no confundir con el `.` de números).
- Los `NEWLINE` se emiten como tokens significativos (el `Sino` debe estar en línea nueva).
- Parámetros `P08` → `PARAM_REF` con valor `"08"` (el `P` se descarta).
- Variables externas `Vx014720` → `EXTERN_VAR`.
- Identificadores de régimen (`M14A`, `14D1`, etc.) → `REGIME_ID`.

#### `parser.ts`

Recursive descent con la siguiente gramática (simplificada):

```
program      → bindings* expr EOF
bindings     → IDENT '=' expr NEWLINE
expr         → if_expr | inline_guard | arithmetic
if_expr      → 'Si' condition ';'? 'entonces' expr NEWLINE 'Sino' expr
inline_guard → arithmetic ';' 'Si' condition
arithmetic   → term (('+' | '-') term)*
term         → factor (('*' | '/') factor)*
factor       → ('-')? primary
primary      → NUMBER | FIELD_REF | PARAM_REF | EXTERN_VAR | func_call
             | '(' expr ')' | IDENT
func_call    → FUNC_NAME '{' expr (';' expr)* '}'
condition    → or_cond
or_cond      → and_cond ('.o.' and_cond)*
and_cond     → simple_cond ('.y.' simple_cond)*
simple_cond  → tipo_cond | rect_cond | atributo_cond | compare_cond
tipo_cond    → 'TIPO' '{' FIELD_REF '}' ('=' | '!=') NUMBER (',' NUMBER)*
rect_cond    → ('F22')? 'NO'? 'es'? 'Rectificatoria'
atributo_cond → 'atributo' '=' REGIME_ID ('.o.' REGIME_ID)*
compare_cond → arithmetic op arithmetic
```

**Limitación conocida:** Si/Sino anidados en una sola línea (sin salto de línea entre ellos) no se parsean. La solución es el formato multi-línea estándar que usa el CSW Set.

---

### Evaluador

#### `eval_context.ts`

Contexto inmutable durante la evaluación de una regla:

```typescript
class EvalContext {
  getField(code: number): number   // computed → declared → 0
  getParam(id: number): number     // params_AT2026.json
  getExternalVar(varId: string): number
  getBinding(name: string): number // Alfa, Beta...
  withBinding(name: string, value: number): EvalContext  // fork inmutable
}
```

#### `evaluator.ts`

Walk recursivo del AST. Casos:

| Nodo | Evaluación |
|---|---|
| `number` | El literal |
| `field` | `ctx.getField(code)` |
| `param` | `ctx.getParam(id)` |
| `binary` | `left op right`; división por cero devuelve `0` |
| `unary` | `-operand` |
| `func` | Ver tabla de funciones |
| `if` | Evalúa condición; rama `then` o `else` |
| `inline_cond` | Si condición es true, devuelve valor; si no, `0` |
| `binding` | Evalúa valor, crea `EvalContext` hijo con binding, evalúa body |
| `external` | Busca en bindings, luego en `externalVars` |

#### `functions.ts`

Semántica de funciones según `4_Instrucciones_Set_AT2026.docx`:

| Función | Implementación | Nota |
|---|---|---|
| `POS(x)` | `Math.max(0, x)` | Valor positivo o cero |
| `NEG(x)` | `Math.abs(Math.min(0, x))` | Valor negativo **sin signo** |
| `MIN(a,b)` | `Math.min(a, b)` | |
| `MAX(a,b)` | `Math.max(a, b)` | |
| `ABS(x)` | `Math.abs(x)` | |
| `ROUND(x)` | `Math.round(x)` | Pesos enteros |
| `TIPO(f)` | `ctx.context.entityType` | No evalúa el campo, usa contexto |

> **Importante:** `NEG` devuelve el valor absoluto del negativo. Si `x = -500`, `NEG(x) = 500`, no `-500`. Esto es una convención del F22: los campos se registran sin signo.

#### `condition_evaluator.ts`

Evalúa `CondNode → boolean`:

- `compare`: evaluación aritmética de ambos lados + comparación.
- `and` / `or`: evaluación en cortocircuito.
- `tipo`: compara `ctx.context.entityType` con los valores del nodo.
- `atributo_check`: compara `ctx.context.taxRegime` con los valores del nodo.
- `rectificatoria`: `negated ? !isRect : isRect`.

---

### Registros

#### `field_registry.ts`

```typescript
class FieldRegistry {
  get(code: number): FieldDefinition | undefined
  getBySection(section: string): FieldDefinition[]
  getSections(): string[]
}
```

#### `rule_registry.ts`

Al construirse (`buildRuleRegistry(rawRules)`), parsea todas las fórmulas inmediatamente y construye los `Rule[]` con sus ASTs. Reglas con error de parse tienen `formulaAst: null` y `parseError` con el mensaje.

```typescript
class RuleRegistry {
  getByField(code: number): Rule[]
  getById(id: string): Rule | undefined
  parsedRules(): Rule[]          // Solo las que parsearon sin error
  parseErrorCount(): number
}
```

#### `metadata_collector.ts`

Walk del AST para extraer `RuleMetadata`:

- Qué campos referencia la regla (`referencedFields`).
- Qué parámetros usa (`referencedParams`).
- Flags: `hasConditional`, `hasTipoCheck`, `hasAtributoCheck`.

Estos metadatos son usados por el motor para construir el grafo de dependencias.

---

### Motor de integración

#### `execution_plan.ts` — Ordenamiento topológico

Implementa **Kahn's BFS** sobre el grafo de dependencias entre reglas:

1. Para cada regla `R` con operador `=`, se extraen sus `referencedFields`.
2. Si un campo referenciado `F` es a su vez calculado por otra regla `S`, entonces `R` depende de `S`.
3. Kahn's BFS procesa los nodos con in-degree 0 primero, garantizando que cada regla se ejecute después de todas sus dependencias.
4. Si hay ciclos (no debería ocurrir en el F22), las reglas cicladas se añaden al final con flag `cycleRules`.

```typescript
const { orderedRules, cycleRules } = buildExecutionPlan(rules);
// orderedRules: reglas en orden seguro de ejecución
// cycleRules: reglas con dependencias circulares (vacío en F22)
```

Ejemplo con RECUADRO 1:
```
a.1 → calcula [547] (sin dependencias calculadas)
a.2 → calcula [550] (depende de [547] → ejecuta después de a.1)
a.3 → calcula [553] (depende de [547], [550] → ejecuta después de a.1, a.2)
a.4 → calcula [159] (depende de [553] → ejecuta después de a.3)
a.5 → calcula [160] (depende de [159] → ejecuta después de a.4)
```

#### `calculator.ts`

Ejecuta las reglas en orden topológico y puebla un `FormData` de salida:

```typescript
const calc = new Calculator(rules, params);
const result = calc.calculate(declared, context);
// result.fields: Map<fieldCode, value> con todos los campos calculados
// result.fieldResults: lista de { code, value, ruleId, isComputed }
// result.skipped: reglas que fallaron en parse o evaluación
// result.durationMs: tiempo de ejecución
```

Notas de implementación:
- Las reglas con `formulaAst === null` se registran en `skipped` antes de ejecutar el plan.
- Todos los valores se redondean a entero (`Math.round`) porque el F22 trabaja en pesos enteros.
- El `EvalContext` comparte el mismo `computed` mutable para que las reglas posteriores vean los valores ya calculados.

#### `validator.ts`

Compara valores declarados contra calculados con tolerancia `±1` peso:

```typescript
const validator = new Validator(rules, params);
const report = validator.validate(declared, context);
// report.violations: Array<{ ruleId, targetField, declaredValue, calculatedValue, delta, severity }>
// report.passedCount / failedCount / skippedCount
```

---

### Optimizador

#### `optimization_space.ts`

Define los campos en los que el contribuyente puede legalmente incrementar deducciones:

| Campo | Nombre | Base legal | Límite |
|---|---|---|---|
| 765 | Gastos presuntos honorarios | Art. 42 N°2 LIR | 30% de honorarios brutos o 15 UTM |
| 764 | APV / Ahorro Previsional Voluntario | Art. 42 bis LIR | 600 UF anuales |
| 749 | Donaciones con beneficio tributario | Ley 19.885 | 1.6% de la RLI |
| 750 | Donaciones culturales (Ley Valdés) | Art. 8 Ley 18.985 | 2.5% de la RLI |
| 602 | Intereses crédito hipotecario | Art. 55 bis LIR | 8 UTA |
| 750 | Gastos de capacitación SENCE | DFL N°1/1989 | 1% de remuneraciones |

#### `optimizer.ts`

Para cada campo deducible:

1. Calcula el máximo legal según el tipo de límite (`fixed_utm`, `percentage_of_income`, `fixed_pesos`).
2. Compara con el valor actualmente declarado.
3. Si hay margen, reporta la sugerencia con el ahorro estimado.
4. Aplica todas las sugerencias y recalcula el formulario completo para obtener el ahorro real.

```typescript
const optimizer = new Optimizer(rules, params);
const report = optimizer.optimize(declared, context);
// report.suggestions: [{ fieldCode, fieldName, currentValue, suggestedValue, estimatedTaxSaving, strategy }]
// report.totalEstimatedSaving: ahorro total si se aplican todas las sugerencias
// report.currentTax / optimizedTax: antes y después
```

---

### Tests

57 tests en total, tiempo de ejecución ~52ms.

```
deno test --allow-read tests/
```

#### `tests/parser_test.ts` — 23 tests

- Normalizer: Unicode operators, brackets malformados, espacios, keywords.
- Tokenizer: field refs, param refs, funciones, Si/entonces/Sino, .y./.o., REGIME_ID.
- Parser: aritmética, funciones (POS/NEG/MIN), Si/Sino, TIPO{}, atributo=, Rectificatoria, bindings, .y. compuesto.
- **Batch test**: ≥80% de las reglas de muestra parsean correctamente.

#### `tests/evaluator_test.ts` — 24 tests

- Funciones built-in: POS, NEG, MIN, MAX, ABS, ROUND, TIPO.
- Evaluación de campos y parámetros.
- Ramas Si/entonces/Sino (true/false).
- Condiciones TIPO y atributo (con y sin match).
- Condición rectificatoria.
- Variables binding (Alfa, Beta).
- División por cero → 0.
- Campo ausente → 0.
- Unary minus.
- Condiciones compuestas con .y.

#### `tests/engine_test.ts` — 10 tests

- Registry: construir desde reglas raw, indexar por campo, metadatos.
- Execution plan: orden topológico correcto (a.1 antes de a.3 antes de a.4).
- Calculator: cálculo correcto de RECUADRO 1, tiempo <50ms, reglas con error → skipped.
- Validator: sin violaciones cuando valores son correctos, detecta violación cuando están mal.
- Optimizer: genera sugerencias para campos deducibles.

#### `tests/fixtures/`

- **`sample_rules.ts`**: 10 reglas representativas (a.1–a.10) que cubren todos los constructores del lenguaje.
- **`sample_form_data.ts`**: Persona natural con honorarios (~$8.7M), valores esperados calculados.

---

## Fuentes de datos

| Archivo | Propósito | Estado |
|---|---|---|
| `F22_layout_AT2026.xlsx` | 721 filas, 25 RECUADROS, 1.134 códigos de campo | Loader implementado |
| `5_CSW_Set_1.0_AT2026.xlsx` | 149 reglas CSW con fórmulas | Loader + parser implementados |
| `7_CSW_Parametros_AT2026.pdf` | 50+ parámetros P01–P751 | Extraídos manualmente a JSON |
| `4_Instrucciones_Set_AT2026.docx` | Definición de funciones y tipos | Implementadas en `functions.ts` |
| `8_F22_Customizado_AT2026.pdf` | 19 variantes del F22 por tipo de contribuyente | Pendiente (Fase 3) |

---

## Cómo ejecutar

### Requisitos

- [Deno](https://deno.land/) ≥ 2.0

### Tests

```bash
cd core
deno test --allow-read tests/
```

### Uso programático

```typescript
import {
  loadRules,
  loadParameters,
  buildRuleRegistry,
  Calculator,
  Validator,
  Optimizer,
  createFormData,
  createFormContext,
} from "./core/mod.ts";

// Cargar datos
const rawRules = await loadRules("5_CSW_Set_1.0_AT2026.xlsx");
const params = await loadParameters("core/data/params_AT2026.json");

// Construir motor
const registry = buildRuleRegistry(rawRules);
const calculator = new Calculator(registry.rules, params);
const validator = new Validator(registry.rules, params);
const optimizer = new Optimizer(registry.rules, params);

// Preparar formulario
const declared = createFormData();
declared.set(545, 8_000_000);   // Honorarios por servicios
declared.set(461, 500_000);     // Honorarios en boletas
declared.set(157, 1_200_000);   // Rentas de capitales

const context = createFormContext({
  taxRegime: "14D8",
  entityType: 1,                // Persona Natural
  isRectificatoria: false,
});

// Calcular
const calcResult = calculator.calculate(declared, context);
console.log("Campo [547]:", calcResult.fields.get(547));  // Honorarios brutos totales
console.log("Campo [553]:", calcResult.fields.get(553));  // Renta neta de honorarios

// Validar
const valReport = validator.validate(declared, context);
console.log("Violaciones:", valReport.violations.length);

// Optimizar
const optReport = optimizer.optimize(declared, context);
console.log("Ahorro estimado:", optReport.totalEstimatedSaving);
for (const s of optReport.suggestions) {
  console.log(`  ${s.fieldName}: $${s.estimatedTaxSaving.toLocaleString()} de ahorro`);
}
```

---

---

## API REST — Fase 2

### Estructura de archivos

```
api/
├── deno.json                    ← Configuración Deno + imports (Hono 4.x)
├── main.ts                      ← Entry point: monta la app, arranca Deno.serve
├── engine_singleton.ts          ← Carga y cachea el motor (carga eager al arranque)
├── middleware/
│   ├── cors.ts                  ← CORS configurable por env ALLOWED_ORIGIN
│   └── error_handler.ts         ← Convierte excepciones en JSON 500
├── routes/
│   ├── calculate.ts             ← POST /api/calculate
│   ├── validate.ts              ← POST /api/validate
│   ├── optimize.ts              ← POST /api/optimize
│   ├── fields.ts                ← GET /api/fields, GET /api/fields/:code
│   ├── rules.ts                 ← GET /api/rules, GET /api/rules/:id
│   └── health.ts                ← GET /api/health
├── types/
│   ├── api_types.ts             ← DTOs de request/response
│   └── request_parser.ts        ← FormRequest → FormData + FormContext
└── tests/
    └── api_test.ts              ← 22 tests con Hono app.request()
```

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado del motor: reglas cargadas, parse rate, uptime |
| `POST` | `/api/calculate` | Calcula todos los campos derivados |
| `POST` | `/api/validate` | Valida coherencia de valores declarados vs calculados |
| `POST` | `/api/optimize` | Sugiere deducciones legales para reducir impuesto |
| `GET` | `/api/fields` | Lista de campos del F22 (filtrables por `?section=`) |
| `GET` | `/api/fields/:code` | Detalle de un campo + reglas que lo calculan |
| `GET` | `/api/rules` | Lista de reglas CSW (filtrable por `?field=` y `?parsed=`) |
| `GET` | `/api/rules/:id` | Detalle de una regla por su ID (e.g. `a.3`) |

### Esquemas de request/response

#### Request body (POST /calculate, /validate, /optimize)

```json
{
  "fieldValues": {
    "545": 8000000,
    "461": 500000,
    "856": 0,
    "1650": 200000,
    "157": 1200000
  },
  "taxRegime": "14D8",
  "entityType": 1,
  "isRectificatoria": false,
  "externalVars": {}
}
```

| Campo | Tipo | Default | Descripción |
|---|---|---|---|
| `fieldValues` | `Record<string, number>` | requerido | Valores declarados (clave = código de campo) |
| `taxRegime` | string | `"14D8"` | Régimen tributario: `M14A`, `14D1`, `14D3`, `14D8`, `14G`, `14TT`, `BHEP`, `PRESUNTO`, `SIMPLIFICADO` |
| `entityType` | 1–8 | `1` | Tipo de contribuyente. 1=Persona Natural, 2=Soc. de Personas, 3=SA, 4=SpA, 5=EIRL, 6=Soc. Profesionales, 7=Comunidad, 8=Otro |
| `isRectificatoria` | boolean | `false` | Si es declaración rectificatoria |
| `externalVars` | `Record<string, number>` | `{}` | Variables externas (`Vx014720`, etc.) |

#### POST /api/calculate → CalculateResponse

```json
{
  "fieldValues": {
    "545": 8000000,
    "547": 8700000,
    "550": 988305,
    "553": 7711695,
    "159": 8911695
  },
  "computed": [
    { "code": 547, "value": 8700000, "ruleId": "a.1", "isComputed": true },
    { "code": 550, "value": 988305,  "ruleId": "a.2", "isComputed": true }
  ],
  "skipped": [],
  "durationMs": 2.5
}
```

#### POST /api/validate → ValidateResponse

```json
{
  "valid": false,
  "violations": [
    {
      "ruleId": "a.1",
      "targetField": 547,
      "message": "Campo [547]: declarado=9999999, calculado=8700000, diferencia=1299999",
      "declaredValue": 9999999,
      "calculatedValue": 8700000,
      "delta": 1299999,
      "severity": "error"
    }
  ],
  "passedCount": 48,
  "failedCount": 1,
  "skippedCount": 0
}
```

#### POST /api/optimize → OptimizeResponse

```json
{
  "suggestions": [
    {
      "fieldCode": 764,
      "fieldName": "APV - Ahorro Previsional Voluntario",
      "legalBasis": "Artículo 42 bis LIR - APV hasta 600 UF anuales",
      "strategy": "Maximizar cotizaciones voluntarias APV/APVC...",
      "currentValue": 0,
      "suggestedValue": 22965600,
      "maxLegalValue": 22965600,
      "estimatedTaxSaving": 8038,
      "alreadyOptimized": false
    }
  ],
  "totalEstimatedSaving": 350000,
  "currentTax": 1500000,
  "optimizedTax": 1150000
}
```

#### GET /api/health

```json
{
  "status": "ok",
  "version": "1.0.0",
  "yearTributario": "AT2026",
  "engine": {
    "loadedAt": "2026-03-12T10:00:00.000Z",
    "rules": {
      "total": 609,
      "parsed": 490,
      "parseErrors": 119,
      "parseRate": 0.805
    },
    "fields": 1134
  },
  "uptime": 42
}
```

### Engine singleton

El módulo `engine_singleton.ts` carga los archivos XLSX y JSON **una sola vez** al arrancar el servidor. Todas las requests posteriores reutilizan el estado ya cargado:

```
Primera request →  carga XLSX (~106ms)  → engine listo
Requests siguientes →  ~1–5ms (sin I/O)
```

La carga se hace **eageramente** en `main.ts` (antes de que llegue la primera request) para que el servidor no tenga latencia fría. Si la carga falla, el proceso termina con `Deno.exit(1)`.

```typescript
// main.ts — arranca carga al boot
getEngine().catch((e) => { console.error(e); Deno.exit(1); });
```

### Middleware

#### CORS

Configurable con la variable de entorno `ALLOWED_ORIGIN`. Por defecto `"*"` (desarrollo). En producción:

```bash
ALLOWED_ORIGIN=https://mi-frontend.cl deno task start
```

#### Error handler

Captura excepciones no manejadas y devuelve JSON estructurado:

```json
{ "error": "Internal server error", "detail": "mensaje solo en desarrollo" }
```

### Tests de API

22 tests sin servidor real, usando `app.request()` de Hono:

```bash
cd api
deno test --allow-read --allow-net tests/
# ok | 22 passed | 0 failed (128ms)
```

Los tests incluyen:
- Health endpoint con validación de parse rate >80%
- Calculate: valores declarados se preservan, engine completa en <500ms
- Calculate: entityType afecta campos con condición TIPO
- Validate: sin violaciones cuando los valores son coherentes
- Validate: detecta violación cuando un campo está mal declarado
- Optimize: todas las sugerencias tienen los campos requeridos
- Fields: filtrado por sección, 400 para código no numérico
- Rules: filtrado por campo y por `?parsed=false`, parse rate >80%
- 404 para recursos inexistentes

### Cómo ejecutar la API

```bash
cd api

# Desarrollo (con hot-reload)
deno task dev

# Producción
deno task start

# Con puerto personalizado
PORT=3000 deno task start

# Con CORS restringido
ALLOWED_ORIGIN=https://mi-app.cl deno task start
```

La API escucha en `http://localhost:8000` por defecto.

**Ejemplos curl:**

```bash
# Health
curl http://localhost:8000/api/health | jq

# Calcular
curl -X POST http://localhost:8000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "fieldValues": { "545": 8000000, "461": 500000, "856": 0, "1650": 200000 },
    "taxRegime": "14D8",
    "entityType": 1
  }' | jq

# Validar
curl -X POST http://localhost:8000/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "fieldValues": { "545": 8000000, "547": 9999999 },
    "taxRegime": "14D8"
  }' | jq '.violations'

# Optimizar
curl -X POST http://localhost:8000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "fieldValues": { "545": 8000000, "461": 500000 },
    "taxRegime": "14D8",
    "entityType": 1
  }' | jq '.suggestions[] | {fieldName, estimatedTaxSaving}'

# Reglas de un campo
curl http://localhost:8000/api/rules?field=547 | jq

# Reglas con error de parse
curl http://localhost:8000/api/rules?parsed=false | jq '.total'
```

---

## Roadmap

### Fase 3 — Frontend (Vite + React + Tailwind) `[pendiente]`

- Calco visual del F22 organizado por RECUADROS (secciones).
- Validación en tiempo real con feedback inline por campo.
- Panel de optimización con lista de sugerencias y botón "Aplicar sugerencia".
- Soporte para las 19 variantes del formulario (`F22.1`–`F22.19`) según tipo de contribuyente.
- Exportación del formulario completo (PDF / JSON).

### Mejoras pendientes al Core `[backlog]`
- Incrementar parse rate del 80.5% al ≥97% (analizar las 119 reglas que fallan).
- Soporte para Si/Sino anidados en una sola línea.
- Completar parámetros P01–P751 faltantes en `params_AT2026.json`.
- Loader para variantes del F22 (`8_F22_Customizado_AT2026.pdf`).

---

## Decisiones de diseño

### ¿Por qué no usar `npm:xlsx`?

El requisito de certificación SII exige que el software sea auditable y sin dependencias de terceros difíciles de inspeccionar. Al implementar el lector XLSX con primitivas nativas (`DecompressionStream`, `TextDecoder`, regex) garantizamos total transparencia y control.

### ¿Por qué Deno y no Node.js?

Deno ofrece TypeScript nativo, permisos explícitos (`--allow-read`), y compatibilidad con Web APIs estándar (incluyendo `DecompressionStream`). El modelo de permisos es un requisito de seguridad deseable en el contexto tributario.

### ¿Por qué ordenamiento topológico?

Las 149 reglas del CSW Set forman un grafo dirigido acíclico (DAG). Al menos 66 reglas tienen dependencias encadenadas (el campo calculado por una regla es usado por otra). Sin ordenamiento correcto, los valores intermedios serían 0 y los cálculos estarían mal. Kahn's BFS garantiza el orden correcto en O(V+E).

### ¿Por qué `NEG(x) = abs(min(0,x))` y no `max(0,-x)`?

Son equivalentes matemáticamente, pero la segunda formulación hace explícito el significado: `NEG` extrae el valor absoluto de la parte negativa. Esto es importante porque en el F22 los campos de "pérdida" o "rebaja" se registran como valores positivos; el signo negativo se infiere del contexto del campo.

### Tolerancia de ±1 peso en validación

Las fórmulas del CSW pueden generar diferencias de redondeo de hasta ±1 peso dependiendo del orden de operaciones. El validador acepta estas diferencias como válidas para evitar falsos positivos.
