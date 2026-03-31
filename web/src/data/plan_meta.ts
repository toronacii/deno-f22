/**
 * Metadatos visuales y de contenido para los planes de membresía.
 * Compartido entre OnboardingPage y AccountPage.
 */

/** 1 USD ≈ 900 CLP; 1 UF = 38,500 CLP → tasa de conversión */
export const UF_PER_USD = 900 / 38_500;

export interface PlanMeta {
  icon:        string;
  donation:    number | null;   // % a causas benéficas, null si no aplica
  rutLabel:    string;          // "1 RUT", "2 a 3", "Ilimitado"
  rutSquares:  string[];        // clases Tailwind para los cuadros indicadores
  features:    string[];
  popular:     boolean;
}

export const PLAN_META: Record<string, PlanMeta> = {
  f22digital: {
    icon:       "📋",
    donation:   null,
    rutLabel:   "1 RUT",
    rutSquares: ["bg-brand-500"],
    features: [
      "Auto gestión asistida con F22 Digital",
      "RUT 1",
    ],
    popular: false,
  },
  genesis: {
    icon:       "🌱",
    donation:   2,
    rutLabel:   "1 RUT",
    rutSquares: ["bg-emerald-500"],
    features: [
      "Auto gestión asistida con F22 Digital",
      "Soporte estándar",
      "1 capacitación anual",
    ],
    popular: false,
  },
  sinergy: {
    icon:       "⚡",
    donation:   4,
    rutLabel:   "2 a 3 RUTs",
    rutSquares: ["bg-gold-400"],
    features: [
      "Auto gestión asistida con F22 Digital",
      "Diagnóstico de Ciberseguridad",
      "Revisión fiscal trimestral",
      "Soporte estándar",
      "3 capacitaciones anuales",
    ],
    popular: true,
  },
  momentum: {
    icon:       "📈",
    donation:   6,
    rutLabel:   "4 a 7 RUTs",
    rutSquares: ["bg-blue-500"],
    features: [
      "Auto gestión asistida con F22 Digital",
      "Diagnóstico de Ciberseguridad",
      "Asesoría contable",
      "Auditoría interna",
      "Revisión fiscal mensual",
    ],
    popular: false,
  },
  horizon: {
    icon:       "🌐",
    donation:   6,
    rutLabel:   "Ilimitado",
    rutSquares: ["bg-violet-500"],
    features: [
      "Auto gestión asistida con F22 Digital",
      "Diagnóstico de Ciberseguridad",
      "Asesoría contable",
      "Auditoría interna",
      "Simulación de auditoría gubernamental",
      "Soporte 24/7",
      "7 capacitaciones anuales",
    ],
    popular: false,
  },
};
