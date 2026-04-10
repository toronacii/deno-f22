/**
 * Metadatos visuales y de contenido para los planes de membresía.
 * Compartido entre OnboardingPage y AccountPage.
 */

export interface PlanMeta {
  icon:        string;    // clave para PlanIcon
  description: string;
  donation:    number | null;
  rutLabel:    string;
  rutDot:      string;    // clase Tailwind bg-* para el indicador circular
  features:    string[];
  popular:     boolean;
}

export const PLAN_META: Record<string, PlanMeta> = {
  f22digital: {
    icon:        "clipboard",
    description: "Gestiona tu Declaración F22 con asistencia experta y sin errores. La forma más simple y segura de cumplir con la Operación Renta 2026.",
    donation:    null,
    rutLabel:    "1 RUT",
    rutDot:      "bg-brand-700",
    features: [
      "Autogestión asistida con F22 Digital",
      "Sistema automático de alertas de vencimientos",
    ],
    popular: false,
  },
  genesis: {
    icon:        "invoice",
    description: "Ideal para profesionales, freelancers, consultores, conferencistas y estructuras simples. Ordena tu operación y comienza a automatizar tu gestión desde el primer día.",
    donation:    1,
    rutLabel:    "1 RUT",
    rutDot:      "bg-emerald-500",
    features: [
      "Autogestión asistida con F22 Digital",
      "Soporte estándar",
      "1 Capacitación anual",
      "Sistema automático de alertas de vencimientos",
    ],
    popular: false,
  },
  sinergy: {
    icon:        "gift",
    description: "Pensado para empresas en crecimiento. Gana control, trazabilidad y reduce riesgos fiscales con una gestión más estructurada.",
    donation:    2,
    rutLabel:    "2 a 3 RUT",
    rutDot:      "bg-gold-400",
    features: [
      "Autogestión asistida con F22 Digital",
      "Diagnóstico de ciberseguridad",
      "Revisión fiscal trimestral",
      "Soporte estándar",
      "3 Capacitaciones anuales",
      "Sistema automático de alertas de vencimientos",
    ],
    popular: true,
  },
  momentum: {
    icon:        "trending",
    description: "Para operaciones más complejas. Integramos procesos, optimizamos recursos y consolidamos tu estructura tributaria.",
    donation:    3,
    rutLabel:    "4 a 7 RUT",
    rutDot:      "bg-blue-500",
    features: [
      "Autogestión asistida con F22 Digital",
      "Diagnóstico de ciberseguridad",
      "Asesoría contable",
      "Auditoría interna",
      "Revisión fiscal mensual",
      "Sistema automático de alertas de vencimientos",
    ],
    popular: false,
  },
  horizon: {
    icon:        "globe",
    description: "Para empresas que escalan o se internacionalizan. Planificación estratégica y control global para operar sin límites.",
    donation:    4,
    rutLabel:    "RUT Ilimitado",
    rutDot:      "bg-violet-500",
    features: [
      "Autogestión asistida con F22 Digital",
      "Diagnóstico de ciberseguridad",
      "Asesoría contable",
      "Auditoría interna",
      "Simulación",
      "Soporte 24/7",
      "7 Capacitaciones anuales",
      "Sistema automático de alertas de vencimientos",
    ],
    popular: false,
  },
};
