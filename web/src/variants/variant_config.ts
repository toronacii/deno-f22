/**
 * F22 form variants.
 *
 * The F22 has 19 variants (F22.1–F22.19) based on entity type and tax regime.
 * Each variant shows a different subset of RECUADROS and fields.
 *
 * Source: 8_F22_Customizado_AT2026.pdf
 *
 * A variant defines:
 *  - visibleSections: which RECUADRO IDs are shown (others are hidden)
 *  - hiddenFields: specific field codes hidden within visible sections
 *  - label: human-readable name for the UI
 */

import type { TaxRegime, EntityType } from "@core/models/form.ts";

export interface VariantConfig {
  id: string;
  label: string;
  description: string;
  taxRegimes: TaxRegime[];
  entityTypes: EntityType[];
  /** RECUADRO IDs that are visible. Empty = show all. */
  visibleSections: string[];
  /** Field codes that are hidden even within visible sections */
  hiddenFields: number[];
}

// ---------------------------------------------------------------------------
// Section IDs used across variants (from F22_layout_AT2026.xlsx)
// ---------------------------------------------------------------------------

// Identification — always the first section in every variant
const RECUADRO_INFO_BASE = "RECUADRO 0";          // Información base (RUT, Nombre, Actividad)

// Core sections (IDs match the Excel layout exactly)
const RECUADRO_IDENTIFICACION = "RECUADRO 1";     // Honorarios
const RECUADRO_HONORARIOS = "RECUADRO 2";         // Mayor/menor valor enajenaciones
const RECUADRO_RENTAS_TRABAJO = "RECUADRO 3";     // Ahorro previsional
const RECUADRO_BIENES_RAICES = "RECUADRO 4";      // Enajenación acciones/derechos
const RECUADRO_CAPITALES = "RECUADRO 5";          // Crédito ingreso diferido
const RECUADRO_RETIROS = "RECUADRO 6";            // Datos informativos
const RECUADRO_IGC = "RECUADRO 7";                // Ingreso diferido y saldos
const RECUADRO_CREDITOS = "RECUADRO 8";           // Donaciones
const RECUADRO_RELIQUIDACION = "RECUADRO 9";      // Registro FUR
const RECUADRO_RESULTADO = "RECUADRO 10";          // Depreciación
const RECUADRO_IDPC = "RECUADRO 11";              // Royalty minero
const RECUADRO_PAGO = "RECUADRO 12";              // Base imponible 1ª categoría
const RECUADRO_TOTAL = "RECUADRO 13";             // Determinación RAI

// Sections specific to companies / regimes
const RECUADRO_RLI = "RECUADRO 14";              // Razonabilidad capital propio
const RECUADRO_PROPIETARIOS = "RECUADRO 15";     // Registro tributario rentas
const RECUADRO_14D3 = "RECUADRO 16";             // Registro tributario 14D3
const RECUADRO_PRESUNTO = "RECUADRO 17";         // Base imponible 14D3
const RECUADRO_ART21 = "RECUADRO 18";            // Determinación IDPC 14D3

// Final determination sections — always shown regardless of variant.
// These correspond to the tax calculation area at the bottom of the F22.
const FINAL_SECTIONS = [
  "BASE IMPONIBLE IUSC O IGC O IA",
  "REBAJAS A LA RENTA",
  "BASE IMPONIBLE ANUAL",
  "IUSC o IGC, Y DÉBITOS FISCALES",
  "CRÉDITOS",
  "IMPUESTOS ANUALES A LA RENTA",
  "DEDUCCIONES A LOS IMPUESTOS",
  "OTROS CARGOS",
  "REMANENTE DE CRÉDITO",
  "IMPUESTO A PAGAR",
];

// Sections for all personas naturales
const PERSONA_NATURAL_SECTIONS = [
  RECUADRO_INFO_BASE,
  RECUADRO_IDENTIFICACION,
  RECUADRO_HONORARIOS,
  RECUADRO_RENTAS_TRABAJO,
  RECUADRO_BIENES_RAICES,
  RECUADRO_CAPITALES,
  RECUADRO_RETIROS,
  RECUADRO_IGC,
  RECUADRO_CREDITOS,
  RECUADRO_RELIQUIDACION,
  RECUADRO_RESULTADO,
  RECUADRO_PAGO,
  RECUADRO_TOTAL,
  ...FINAL_SECTIONS,
];

// Sections for companies with IDPC
const EMPRESA_SECTIONS = [
  RECUADRO_INFO_BASE,
  RECUADRO_IDENTIFICACION,
  RECUADRO_RLI,
  RECUADRO_IDPC,
  RECUADRO_ART21,
  RECUADRO_CREDITOS,
  RECUADRO_PAGO,
  RECUADRO_TOTAL,
  ...FINAL_SECTIONS,
];

// ---------------------------------------------------------------------------
// The 19 variants
// ---------------------------------------------------------------------------

export const VARIANTS: VariantConfig[] = [
  // ---- Persona Natural ----
  {
    id: "F22-1",
    label: "Persona Natural — Pro-Pyme General",
    description: "Persona natural con rentas de honorarios, trabajo dependiente, bienes raíces y/o capitales. Régimen Pro-Pyme General (14D8).",
    taxRegimes: ["14D8"],
    entityTypes: [1],
    visibleSections: PERSONA_NATURAL_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-2",
    label: "Persona Natural — Renta Atribuida",
    description: "Persona natural, propietario de empresa en régimen de Renta Atribuida (M14A).",
    taxRegimes: ["M14A"],
    entityTypes: [1],
    visibleSections: PERSONA_NATURAL_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-3",
    label: "Persona Natural — Semi-integrado",
    description: "Persona natural con rentas atribuidas de empresa semi-integrada (14D1).",
    taxRegimes: ["14D1"],
    entityTypes: [1],
    visibleSections: PERSONA_NATURAL_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-4",
    label: "Persona Natural — Pro-Pyme Transparente",
    description: "Persona natural, socio/accionista de empresa Pro-Pyme Transparente (14D3).",
    taxRegimes: ["14D3"],
    entityTypes: [1],
    visibleSections: [...PERSONA_NATURAL_SECTIONS, RECUADRO_14D3],
    hiddenFields: [],
  },
  {
    id: "F22-5",
    label: "Persona Natural — Solo rentas de trabajo",
    description: "Persona natural con únicamente rentas del trabajo dependiente (sueldos). Sin honorarios ni otras rentas.",
    taxRegimes: ["14D8"],
    entityTypes: [1],
    visibleSections: [
      RECUADRO_INFO_BASE,
      RECUADRO_IDENTIFICACION,
      RECUADRO_RENTAS_TRABAJO,
      RECUADRO_IGC,
      RECUADRO_CREDITOS,
      RECUADRO_RESULTADO,
      RECUADRO_PAGO,
      RECUADRO_TOTAL,
      ...FINAL_SECTIONS,
    ],
    hiddenFields: [],
  },
  {
    id: "F22-6",
    label: "Persona Natural — Renta Presunta",
    description: "Persona natural en régimen de renta presunta (agricultura, transporte, minería).",
    taxRegimes: ["PRESUNTO"],
    entityTypes: [1],
    visibleSections: [...PERSONA_NATURAL_SECTIONS, RECUADRO_PRESUNTO],
    hiddenFields: [],
  },

  // ---- Sociedades de Personas ----
  {
    id: "F22-7",
    label: "Sociedad de Personas — Semi-integrado",
    description: "Sociedad de personas en régimen semi-integrado (14D1). Declara IDPC y distribuye retiros.",
    taxRegimes: ["14D1"],
    entityTypes: [2],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-8",
    label: "Sociedad de Personas — Pro-Pyme General",
    description: "Sociedad de personas en régimen Pro-Pyme General (14D8).",
    taxRegimes: ["14D8"],
    entityTypes: [2],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-9",
    label: "Sociedad de Personas — Pro-Pyme Transparente",
    description: "Sociedad de personas en régimen Pro-Pyme Transparente (14D3). No paga IDPC.",
    taxRegimes: ["14D3"],
    entityTypes: [2],
    visibleSections: [
      RECUADRO_INFO_BASE,
      RECUADRO_IDENTIFICACION,
      RECUADRO_14D3,
      RECUADRO_PROPIETARIOS,
      RECUADRO_PAGO,
      RECUADRO_TOTAL,
      ...FINAL_SECTIONS,
    ],
    hiddenFields: [],
  },

  // ---- Sociedad Anónima / SpA ----
  {
    id: "F22-10",
    label: "SA / SpA — Semi-integrado",
    description: "Sociedad Anónima o SpA en régimen semi-integrado (14D1). Declara IDPC.",
    taxRegimes: ["14D1"],
    entityTypes: [3, 4],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-11",
    label: "SA / SpA — Renta Atribuida",
    description: "SA o SpA en régimen de Renta Atribuida (M14A). Atribuye rentas a propietarios.",
    taxRegimes: ["M14A"],
    entityTypes: [3, 4],
    visibleSections: [...EMPRESA_SECTIONS, RECUADRO_PROPIETARIOS],
    hiddenFields: [],
  },
  {
    id: "F22-12",
    label: "SA / SpA — Pro-Pyme General",
    description: "SA o SpA en régimen Pro-Pyme General (14D8).",
    taxRegimes: ["14D8"],
    entityTypes: [3, 4],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },

  // ---- EIRL ----
  {
    id: "F22-13",
    label: "EIRL — Semi-integrado",
    description: "Empresa Individual de Responsabilidad Limitada en régimen semi-integrado.",
    taxRegimes: ["14D1"],
    entityTypes: [5],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-14",
    label: "EIRL — Pro-Pyme General",
    description: "EIRL en régimen Pro-Pyme General (14D8).",
    taxRegimes: ["14D8"],
    entityTypes: [5],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },

  // ---- Sociedad de Profesionales ----
  {
    id: "F22-15",
    label: "Sociedad de Profesionales",
    description: "Sociedad de profesionales que tributa en 2ª categoría como persona natural.",
    taxRegimes: ["14D8", "M14A", "14D1"],
    entityTypes: [6],
    visibleSections: PERSONA_NATURAL_SECTIONS,
    hiddenFields: [],
  },

  // ---- Comunidad ----
  {
    id: "F22-16",
    label: "Comunidad — Semi-integrado",
    description: "Comunidad hereditaria o contractual en régimen semi-integrado.",
    taxRegimes: ["14D1"],
    entityTypes: [7],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },
  {
    id: "F22-17",
    label: "Comunidad — Pro-Pyme",
    description: "Comunidad en régimen Pro-Pyme General o Transparente.",
    taxRegimes: ["14D8", "14D3"],
    entityTypes: [7],
    visibleSections: EMPRESA_SECTIONS,
    hiddenFields: [],
  },

  // ---- Renta Presunta (empresas) ----
  {
    id: "F22-18",
    label: "Empresa — Renta Presunta",
    description: "Empresa (sociedad/EIRL) en régimen de renta presunta.",
    taxRegimes: ["PRESUNTO"],
    entityTypes: [2, 3, 4, 5, 7],
    visibleSections: [...EMPRESA_SECTIONS, RECUADRO_PRESUNTO],
    hiddenFields: [],
  },

  // ---- Otros / Sin actividad ----
  {
    id: "F22-19",
    label: "Otros / Sin actividad clasificada",
    description: "Contribuyentes que no se clasifican en los anteriores casos.",
    taxRegimes: ["14D8", "M14A", "14D1", "14D3", "SIMPLIFICADO"],
    entityTypes: [8],
    visibleSections: [
      RECUADRO_INFO_BASE,
      RECUADRO_IDENTIFICACION,
      RECUADRO_RLI,
      RECUADRO_IDPC,
      RECUADRO_CREDITOS,
      RECUADRO_PAGO,
      RECUADRO_TOTAL,
      ...FINAL_SECTIONS,
    ],
    hiddenFields: [],
  },
];

/**
 * Find the best matching variant for a given (entityType, taxRegime).
 * Falls back to the most generic variant if no exact match.
 */
export function getVariant(entityType: EntityType, taxRegime: TaxRegime): VariantConfig {
  // Exact match: both entityType and taxRegime
  const exact = VARIANTS.find(
    (v) =>
      v.entityTypes.includes(entityType) &&
      v.taxRegimes.includes(taxRegime),
  );
  if (exact) return exact;

  // Partial match: entityType only
  const byType = VARIANTS.find((v) => v.entityTypes.includes(entityType));
  if (byType) return byType;

  // Fallback: F22-1 (persona natural, 14D8)
  return VARIANTS[0];
}

/**
 * Given a list of all sections, filter to those visible in the variant.
 * If visibleSections is empty, all sections are shown.
 */
export function filterSections(
  allSections: string[],
  variant: VariantConfig,
): string[] {
  if (variant.visibleSections.length === 0) return allSections;
  return allSections.filter((s) => variant.visibleSections.includes(s));
}
