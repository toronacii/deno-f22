/**
 * Defines the space of legally deductible fields and their limits.
 * Sources: Art. 42 N°2 LIR, Art. 17 LIR, APV, Donaciones, etc.
 */

export interface DeductibleField {
  /** Field code in the F22 */
  fieldCode: number;
  /** Human-readable name */
  name: string;
  /** Legal basis */
  legalBasis: string;
  /** Type of limit */
  limitType: "fixed_utm" | "percentage_of_income" | "fixed_pesos" | "percentage_of_field";
  /** Limit value (interpretation depends on limitType) */
  limitValue: number;
  /** Reference field code (for percentage_of_field limits) */
  referenceField?: number;
  /** Parameter ID for UTM/UF conversions */
  paramId?: number;
  /** Description of the optimization strategy */
  strategy: string;
}

/**
 * Fields where the taxpayer can legally increase deductions to reduce tax.
 * Based on AT2026 regulations.
 */
export const DEDUCTIBLE_FIELDS: DeductibleField[] = [
  {
    fieldCode: 765,
    name: "Gastos Presuntos Honorarios (Art. 42 N°2)",
    legalBasis: "Artículo 42 N°2 LIR - Gastos presuntos hasta 30% de los honorarios brutos",
    limitType: "percentage_of_income",
    limitValue: 0.30,
    referenceField: 547,
    strategy: "Deducir el máximo de gastos presuntos permitido (30% de honorarios brutos, tope 15 UTM anuales). " +
      "Si los gastos reales superan el 30%, conviene declarar gastos efectivos en cambio.",
  },
  {
    fieldCode: 765,
    name: "Gastos Presuntos máximo UTM (Art. 42 N°2)",
    legalBasis: "Artículo 42 N°2 LIR - Tope 15 UTM anuales",
    limitType: "fixed_utm",
    limitValue: 15,
    paramId: 29,
    strategy: "El tope de gastos presuntos es 15 UTM. Verificar que el monto declarado no supere el tope.",
  },
  {
    fieldCode: 764,
    name: "APV - Ahorro Previsional Voluntario (Art. 42 bis)",
    legalBasis: "Artículo 42 bis LIR - APV hasta 600 UF anuales",
    limitType: "fixed_pesos",
    limitValue: 22965600,  // 600 UF × ~38276 (aprox AT2026)
    strategy: "Maximizar cotizaciones voluntarias APV/APVC para obtener rebaja en base imponible del IGC. " +
      "Cada peso cotizado reduce directamente la base imponible.",
  },
  {
    fieldCode: 749,
    name: "Donaciones con beneficio tributario",
    legalBasis: "Ley 19.885 y Ley 18.985 - Donaciones hasta 1.6% de la RLI",
    limitType: "percentage_of_income",
    limitValue: 0.016,
    referenceField: 170,
    strategy: "Donaciones a entidades sin fines de lucro certificadas otorgan crédito de hasta 50% del monto donado " +
      "y el resto se deduce de la RLI. Máximo beneficio: donaciones planificadas antes del 31 de diciembre.",
  },
  {
    fieldCode: 750,
    name: "Donaciones culturales (Ley Valdés)",
    legalBasis: "Artículo 8 Ley 18.985 - Donaciones a instituciones culturales",
    limitType: "percentage_of_income",
    limitValue: 0.025,
    referenceField: 170,
    strategy: "Donaciones a proyectos culturales aprobados: crédito del 50% con tope 14.000 UTM " +
      "y del 2.5% de la RLI. Combinar con donaciones educacionales para maximizar el beneficio.",
  },
  {
    fieldCode: 602,
    name: "Intereses crédito hipotecario (Art. 55 bis)",
    legalBasis: "Artículo 55 bis LIR - Intereses hipotecarios hasta 8 UTA",
    limitType: "fixed_pesos",
    limitValue: 6325152,  // 8 UTA = 8 × 790644 (aprox AT2026)
    strategy: "Deducir intereses pagados en créditos hipotecarios para la vivienda propia. " +
      "Límite: 8 UTA (~$6.3M). Requiere certificado del banco.",
  },
  {
    fieldCode: 750,
    name: "Gastos de capacitación SENCE",
    legalBasis: "DFL N°1/1989 SENCE - Crédito por capacitación",
    limitType: "percentage_of_income",
    limitValue: 0.01,
    referenceField: 170,
    strategy: "Invertir en capacitación a través de OTEC/OTIC registrados. Genera crédito directo " +
      "contra el IDPC/IGC de hasta 1% de las remuneraciones imponibles.",
  },
];

/** Get all deductible fields as a map indexed by fieldCode */
export function getDeductibleFieldMap(): Map<number, DeductibleField[]> {
  const map = new Map<number, DeductibleField[]>();
  for (const df of DEDUCTIBLE_FIELDS) {
    const existing = map.get(df.fieldCode) ?? [];
    existing.push(df);
    map.set(df.fieldCode, existing);
  }
  return map;
}
