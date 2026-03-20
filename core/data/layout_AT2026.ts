/**
 * AUTO-GENERATED — do not edit manually.
 * Source: F22_layout_AT2026.xlsx
 *
 * Regenerate with:
 *   deno run --allow-read --allow-write scripts/build_data.ts
 */

import type { FieldDefinition, SectionInfo } from "../models/field.ts";
import type { LayoutSection } from "../models/layout.ts";

export const LAYOUT_FIELDS: FieldDefinition[] = [
  {
    "code": 3,
    "label": "RUT",
    "section": "RECUADRO 0",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 3
  },
  {
    "code": 6,
    "label": "Domicilio",
    "section": "RECUADRO 0",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 3
  },
  {
    "code": 1,
    "label": "Nombre",
    "section": "RECUADRO 0",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 4
  },
  {
    "code": 55,
    "label": "Correo electrónico",
    "section": "RECUADRO 0",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 4
  },
  {
    "code": 13,
    "label": "Actividad, profesión o giro del negocio",
    "section": "RECUADRO 0",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 5
  },
  {
    "code": 9,
    "label": "Telefóno",
    "section": "RECUADRO 0",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 5
  },
  {
    "code": 95,
    "label": "Leyes N°s 18.392 o 19.149 (Navarino y Primavera)",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 7
  },
  {
    "code": 786,
    "label": "Ley N° 19.709 (Tocopilla)",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 7
  },
  {
    "code": 616,
    "label": "Asociación o cuentas en participación",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 8
  },
  {
    "code": 73,
    "label": "D.S. N° 341 de 2004, del Min. de Hacienda (Zona Franca)",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 8
  },
  {
    "code": 69,
    "label": "Instituciones art. 40 N°s 2 y 4 LIR",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 9
  },
  {
    "code": 72,
    "label": "D.L. N° 701 de 1974 (Fomento Forestal)",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 9
  },
  {
    "code": 68,
    "label": "D.L. N° 600 de 1974 (E.I.E.)",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 10
  },
  {
    "code": 805,
    "label": "Opción al régimen",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 13
  },
  {
    "code": 813,
    "label": "Retiro del régimen",
    "section": "RECUADRO 0",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 13
  },
  {
    "code": 461,
    "label": "Honorarios anuales con retención",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 17
  },
  {
    "code": 492,
    "label": "Honorarios anuales con retención",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 17
  },
  {
    "code": 545,
    "label": "Honorarios anuales sin retención",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 18
  },
  {
    "code": 1650,
    "label": "Honorarios líquidos percibidos de fuente extranjera",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 19
  },
  {
    "code": 856,
    "label": "Incremento por impuestos soportados en el extranjero",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 20
  },
  {
    "code": 547,
    "label": "Total ingresos brutos",
    "section": "RECUADRO 1",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 21
  },
  {
    "code": 617,
    "label": "Participación en sociedades de profesionales de 2ª Categoría",
    "section": "RECUADRO 1",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 22
  },
  {
    "code": 770,
    "label": "Monto ahorro previsional, según art. 42 bis inc. 1° LIR",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 23
  },
  {
    "code": 872,
    "label": "Gastos por donaciones para fines sociales, según art. 1° bis Ley N° 19.885, y gasto por donaciones de bienes inmuebles en apoyo al plan de emergencia habitacional, art. 26 Ley N° 21.450",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 24
  },
  {
    "code": 465,
    "label": "Gastos efectivos (solo rebajables del código 547)",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 25
  },
  {
    "code": 494,
    "label": "Gastos presuntos: 30% sobre el código 547, con tope de 15 UTA",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 26
  },
  {
    "code": 850,
    "label": "Rebaja por presunción de asignación de zona  D.L. N° 889 de 1975",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 27
  },
  {
    "code": 467,
    "label": "Total honorarios",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 28
  },
  {
    "code": 479,
    "label": "Total remuneraciones directores S.A.",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 29
  },
  {
    "code": 491,
    "label": "Total remuneraciones directores S.A.",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 29
  },
  {
    "code": 618,
    "label": "Total rentas y retenciones",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 30
  },
  {
    "code": 619,
    "label": "Total rentas y retenciones",
    "section": "RECUADRO 1",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 30
  },
  {
    "code": 896,
    "label": "Participaciones en ingresos brutos sociedades de profesionales de 2ª Categoría",
    "section": "RECUADRO 1",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 31
  },
  {
    "code": 1055,
    "label": "Precios de enajenaciones del conjunto de los bienes raíces",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 35
  },
  {
    "code": 1981,
    "label": "Precios de enajenaciones del conjunto de los bienes raíces",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 35
  },
  {
    "code": 1982,
    "label": "Precios de enajenaciones del conjunto de los bienes raíces",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 35
  },
  {
    "code": 1056,
    "label": "Menos:valor de adquisición de los bienes raíces reajustados",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 36
  },
  {
    "code": 1983,
    "label": "Menos:valor de adquisición de los bienes raíces reajustados",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 36
  },
  {
    "code": 1984,
    "label": "Menos:valor de adquisición de los bienes raíces reajustados",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 36
  },
  {
    "code": 1057,
    "label": "Menos:mejoras que hayan aumentado el valor de los bienes raíces reajustadas",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 37
  },
  {
    "code": 1985,
    "label": "Menos:mejoras que hayan aumentado el valor de los bienes raíces reajustadas",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 37
  },
  {
    "code": 1986,
    "label": "Menos:mejoras que hayan aumentado el valor de los bienes raíces reajustadas",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 37
  },
  {
    "code": 1058,
    "label": "Mayor o menor valor percibido o devengado",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 38
  },
  {
    "code": 1987,
    "label": "Mayor o menor valor percibido o devengado",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 38
  },
  {
    "code": 1988,
    "label": "Mayor o menor valor percibido o devengado",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 38
  },
  {
    "code": 1060,
    "label": "Ingreso no renta equivalente a 8.000 UF o saldo del ejercicio anterior",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 39
  },
  {
    "code": 1061,
    "label": "Mayor valor percibido o devengado afecto a impuesto",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 40
  },
  {
    "code": 1062,
    "label": "Saldo de ingreso no renta a utilizar en los ejercicios siguientes",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 41
  },
  {
    "code": 1099,
    "label": "Mayor valor percibido en enajenaciones efectuadas en el ejercicio",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 42
  },
  {
    "code": 1847,
    "label": "Mayor valor devengado en enajenaciones efectuadas en el ejercicio a declarar en el año tributario actual",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 43
  },
  {
    "code": 1100,
    "label": "Mayor valor devengado y no percibido en enajenaciones efectuadas en el ejercicio a declarar en los años tributarios siguientes",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 44
  },
  {
    "code": 1114,
    "label": "Mayor valor percibido en el ejercicio por enajenaciones efectuadas en el ejercicio anterior",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 45
  },
  {
    "code": 1063,
    "label": "Mayor valor percibido según códigos 1099 y 1114 afecto a IGC o IA",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 47
  },
  {
    "code": 1064,
    "label": "Mayor valor devengado según código 1847 afecto a IGC",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 48
  },
  {
    "code": 1065,
    "label": "Mayor valor percibido según códigos 1099 y 1114 afecto al impuesto único y sustitutivo con tasa 10%",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 49
  },
  {
    "code": 1989,
    "label": "Mayor valor devengado según código 1987 afecto al IGC o IA",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 50
  },
  {
    "code": 1990,
    "label": "Mayor valor devengado según código 1988 afecto a IDPC e IGC o IA",
    "section": "RECUADRO 2",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 51
  },
  {
    "code": 701,
    "label": "Total ahorro neto positivo del ejercicio",
    "section": "RECUADRO 3",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 54
  },
  {
    "code": 702,
    "label": "Ahorro neto positivo utilizado en el ejercicio",
    "section": "RECUADRO 3",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 55
  },
  {
    "code": 703,
    "label": "Remanente ahorro neto positivo del ejercicio siguiente",
    "section": "RECUADRO 3",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 56
  },
  {
    "code": 704,
    "label": "Total ahorro neto negativo del ejercicio",
    "section": "RECUADRO 3",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 57
  },
  {
    "code": 930,
    "label": "Cuota exenta 10 UTA",
    "section": "RECUADRO 3",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 58
  },
  {
    "code": 705,
    "label": "Base para débito fiscal del ejercicio a registrar en código 201",
    "section": "RECUADRO 3",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 59
  },
  {
    "code": 1070,
    "label": "IGC o IA sobre rentas percibidas, según código 1869",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 64
  },
  {
    "code": 1074,
    "label": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
    "section": "RECUADRO 4",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 65
  },
  {
    "code": 1079,
    "label": "IGC o IA sobre rentas percibidas, según código 1869",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 68
  },
  {
    "code": 1083,
    "label": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
    "section": "RECUADRO 4",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 69
  },
  {
    "code": 1087,
    "label": "IGC o IA sobre rentas percibidas, según código 1869",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 72
  },
  {
    "code": 1131,
    "label": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
    "section": "RECUADRO 4",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 73
  },
  {
    "code": 1809,
    "label": "Acciones",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 76
  },
  {
    "code": 1813,
    "label": "Cuotas de fondos mutuos y/o fondos de inversión",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 77
  },
  {
    "code": 1814,
    "label": "Resultado neto de las operaciones del ejercicio",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 79
  },
  {
    "code": 1815,
    "label": "Pérdida de arrastre del ejercicio anterior actualizada",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 80
  },
  {
    "code": 1816,
    "label": "Base imponible o pérdida del ejercicio",
    "section": "RECUADRO 4",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 81
  },
  {
    "code": 1651,
    "label": "Remanente ejercicio anterior",
    "section": "RECUADRO 5",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 84
  },
  {
    "code": 1652,
    "label": "Crédito recibido en el ejercicio",
    "section": "RECUADRO 5",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 85
  },
  {
    "code": 1653,
    "label": "Crédito imputado en el ejercicio",
    "section": "RECUADRO 5",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 86
  },
  {
    "code": 1654,
    "label": "Remanente para ejercicio siguiente",
    "section": "RECUADRO 5",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 87
  },
  {
    "code": 783,
    "label": "Préstamos efectuados a propietarios, socios o accionistas en el ejercicio",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 91
  },
  {
    "code": 976,
    "label": "Total de cantidades adeudadas, pagadas, abonadas en cuenta o puestas a disposición de relacionados en el exterior (arts. 31 inc. 3° y 59 LIR)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 92
  },
  {
    "code": 978,
    "label": "Cantidades adeudadas, pagadas, abonadas en cuenta o puestas a disposición de relacionados en el exterior, cuyo IA no ha sido enterado (arts. 31 inc.  3° y 59 LIR)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 93
  },
  {
    "code": 1020,
    "label": "Total pasivos contraídos en Chile",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 94
  },
  {
    "code": 1019,
    "label": "Beneficio antes de gastos financieros (EBITDA)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 95
  },
  {
    "code": 974,
    "label": "Renta imponible extranjera (art. 41 A  N° 3 LIR)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 96
  },
  {
    "code": 122,
    "label": "Bienes adquiridos contrato leasing",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 98
  },
  {
    "code": 648,
    "label": "Total del activo",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 98
  },
  {
    "code": 123,
    "label": "Activo inmovilizado",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 99
  },
  {
    "code": 647,
    "label": "Total del pasivo",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 99
  },
  {
    "code": 101,
    "label": "Activo gasto diferido goodwill tributario",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 100
  },
  {
    "code": 1003,
    "label": "Saldo de caja (sólo dinero en efectivo y documentos al día, según arqueo)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 100
  },
  {
    "code": 102,
    "label": "Activo intangible goodwill tributario (Ley N° 20.780)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 101
  },
  {
    "code": 1004,
    "label": "Capital efectivo",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 101
  },
  {
    "code": 784,
    "label": "Patrimonio financiero",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 102
  },
  {
    "code": 843,
    "label": "Saldo cuenta corriente bancaria según, conciliación",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 102
  },
  {
    "code": 129,
    "label": "Existencia final",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 103
  },
  {
    "code": 1005,
    "label": "Utilidades financieras capitalizadas",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 105
  },
  {
    "code": 975,
    "label": "Gastos adeudados o pagados por cuotas de bienes en leasing",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 106
  },
  {
    "code": 1021,
    "label": "Monto del capital  directa o indirectamente financiado por partes relacionadas",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 107
  },
  {
    "code": 1191,
    "label": "TEX",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "decimals": 6,
    "sourceRow": 108
  },
  {
    "code": 1192,
    "label": "TEF",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "decimals": 6,
    "sourceRow": 109
  },
  {
    "code": 1193,
    "label": "Retiros, remesas o distribuciones afectos a IGC o IA, no Imputados a los RTRE",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 110
  },
  {
    "code": 1194,
    "label": "Retiros, remesas o distribuciones afectos a IGC o IA, imputados a las utilidades de balance en exceso de las tributables (UBET)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 111
  },
  {
    "code": 1782,
    "label": "Depreciación acelerada vehículos eléctricos o híbridos con recarga eléctrica exterior u otros calificados como cero emisiones por resolución fundada del Ministerio de Energía (art. 8 Ley N° 21.305)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 112
  },
  {
    "code": 1783,
    "label": "Depreciación normal vehículos eléctricos o híbridos con recarga eléctrica exterior u otros calificados como cero emisiones por resolución fundada del Ministerio de Energía (art. 8 Ley N° 21.305)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 113
  },
  {
    "code": 1195,
    "label": "Saldo total de rentas exentas de IGC (art. 11 Ley N° 18.401, rentas del capitalismo popular)",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 115
  },
  {
    "code": 1691,
    "label": "Saldo exceso de retiros de 2014, determinados al 31 de diciembre para ejercicios siguientes",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 116
  },
  {
    "code": 1196,
    "label": "Saldo de crédito por IDPC no sujetos a restitución generados hasta el 31.12.2019",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 117
  },
  {
    "code": 1197,
    "label": "Saldo de crédito por IDPC no sujetos a restitución generados a contar del 01.01.2020",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 118
  },
  {
    "code": 238,
    "label": "Saldo crédito Impuesto Tasa Adicional ex art. 21 LIR",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 119
  },
  {
    "code": 1586,
    "label": "Saldo de excedente base imponible IDPC voluntario a imputar ejercicio siguientes",
    "section": "RECUADRO 6",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 120
  },
  {
    "code": 1823,
    "label": "Saldo o aporte inicial del ejercicio de la asociación o cuentas en participación o del encargo fiduciario a informar por el gestor",
    "section": "RECUADRO 6",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 122
  },
  {
    "code": 1824,
    "label": "Saldo final del ejercicio de la asociación o cuentas en participación o del encargo fiduciario a informar por el gestor",
    "section": "RECUADRO 6",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 123
  },
  {
    "code": 1825,
    "label": "Credito por IDPC asignado en el ejercicio a los partícipes o beneficiarios de la asociación o cuentas en participación o del encargo fiduciario",
    "section": "RECUADRO 6",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 124
  },
  {
    "code": 1826,
    "label": "Crédito IPE asignado en el ejercicio a los partícipes o beneficiarios de la asociación o cuentas en participación o del encargo fiduciario",
    "section": "RECUADRO 6",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 125
  },
  {
    "code": 1358,
    "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 130
  },
  {
    "code": 1359,
    "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 130
  },
  {
    "code": 1360,
    "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 130
  },
  {
    "code": 1361,
    "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 130
  },
  {
    "code": 1184,
    "label": "Ingreso  diferido a  imputar  en  el ejercicio",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 131
  },
  {
    "code": 1362,
    "label": "Ingreso  diferido a  imputar  en  el ejercicio",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 131
  },
  {
    "code": 1363,
    "label": "Ingreso  diferido a  imputar  en  el ejercicio",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 131
  },
  {
    "code": 1364,
    "label": "Ingreso  diferido a  imputar  en  el ejercicio",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 131
  },
  {
    "code": 1096,
    "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 132
  },
  {
    "code": 1097,
    "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 132
  },
  {
    "code": 1106,
    "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 132
  },
  {
    "code": 1372,
    "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
    "section": "RECUADRO 7",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 132
  },
  {
    "code": 994,
    "label": "Donaciones al FNR, según arts. 4° y 9° Ley N° 20.444 (no afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 137
  },
  {
    "code": 876,
    "label": "Donaciones al FNR, según arts. 4° y 9° Ley N° 20.444 (no afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 137
  },
  {
    "code": 898,
    "label": "Donaciones al FNR, según arts. 4° y 9° Ley N° 20.444 (no afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 137
  },
  {
    "code": 986,
    "label": "Donaciones para fines culturales, según art. 8° Ley N° 18.985 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 138
  },
  {
    "code": 990,
    "label": "Donaciones para fines culturales, según art. 8° Ley N° 18.985 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 138
  },
  {
    "code": 373,
    "label": "Donaciones para fines culturales, según art. 8° Ley N° 18.985 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 138
  },
  {
    "code": 987,
    "label": "Donaciones para fines educacionales, según art. 3° Ley N° 19.247 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 139
  },
  {
    "code": 991,
    "label": "Donaciones para fines educacionales, según art. 3° Ley N° 19.247 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 139
  },
  {
    "code": 382,
    "label": "Donaciones para fines educacionales, según art. 3° Ley N° 19.247 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 139
  },
  {
    "code": 988,
    "label": "Donaciones para fines deportivos, según art. 62 y sgtes. Ley N° 19.712 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 140
  },
  {
    "code": 1001,
    "label": "Donaciones para fines deportivos, según art. 62 y sgtes. Ley N° 19.712 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 140
  },
  {
    "code": 761,
    "label": "Donaciones para fines deportivos, según art. 62 y sgtes. Ley N° 19.712 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 140
  },
  {
    "code": 792,
    "label": "Donaciones para fines sociales, según art. 1° y sgtes. Ley N° 19.885 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 141
  },
  {
    "code": 794,
    "label": "Donaciones para fines sociales, según art. 1° y sgtes. Ley N° 19.885 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 141
  },
  {
    "code": 773,
    "label": "Donaciones para fines sociales, según art. 1° y sgtes. Ley N° 19.885 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 141
  },
  {
    "code": 365,
    "label": "Crédito por impuesto territorial (contribuciones de bienes raíces)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 142
  },
  {
    "code": 366,
    "label": "Crédito por bienes físicos del activo inmovilizado del ejercicio",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 143
  },
  {
    "code": 392,
    "label": "Crédito por rentas de zonas francas",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 144
  },
  {
    "code": 984,
    "label": "Otras rebajas especiales",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 145
  },
  {
    "code": 839,
    "label": "Remanente de crédito por bienes físicos del activo inmovilizado proveniente de inversiones AT 1999 - 2002",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 147
  },
  {
    "code": 989,
    "label": "Donaciones a universidades, institutos profesionales y centros de formación técnica, según art. 69 Ley N° 18.681 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 148
  },
  {
    "code": 993,
    "label": "Donaciones a universidades, institutos profesionales y centros de formación técnica, según art. 69 Ley N° 18.681 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 148
  },
  {
    "code": 384,
    "label": "Donaciones a universidades, institutos profesionales y centros de formación técnica, según art. 69 Ley N° 18.681 (afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 148
  },
  {
    "code": 815,
    "label": "Monto inversión Ley Arica",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 149
  },
  {
    "code": 390,
    "label": "Monto inversión Ley Arica",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 149
  },
  {
    "code": 741,
    "label": "Monto inversión  Ley Austral",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 150
  },
  {
    "code": 742,
    "label": "Monto inversión  Ley Austral",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 150
  },
  {
    "code": 841,
    "label": "Crédito por impuestos soportados en el extranjero, según art. 41 A LIR",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 151
  },
  {
    "code": 855,
    "label": "Crédito por inversión privada en actividades de investigación y desarrollo Ley N° 20.241",
    "section": "RECUADRO 8",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 152
  },
  {
    "code": 828,
    "label": "Crédito IEAM utilizado en el ejercicio",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 154
  },
  {
    "code": 830,
    "label": "Crédito IEAM utilizado en el ejercicio",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 154
  },
  {
    "code": 829,
    "label": "Remanente crédito IEAM a devolver a través de código 36",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 154
  },
  {
    "code": 772,
    "label": "Otras donaciones, según art. 10 Ley N° 19.885 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 157
  },
  {
    "code": 811,
    "label": "Otras donaciones, según art. 10 Ley N° 19.885 (afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 157
  },
  {
    "code": 873,
    "label": "Donaciones, según art. 7° Ley N° 16.282 (no afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 158
  },
  {
    "code": 1120,
    "label": "Donaciones, según art. 37 D.L. N° 1.939 de 1977 (no afectas al LGA) y según art. 68 Ley N° 19.300 (no afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 159
  },
  {
    "code": 1838,
    "label": "Donaciones, según Título VIII bis D.L. N° 3.063 de 1979 (no afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 160
  },
  {
    "code": 1839,
    "label": "Donaciones, según Título VIII bis D.L. N° 3.063 de 1979 (no afectas al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 160
  },
  {
    "code": 1775,
    "label": "Donaciones, según art. 18° Ley N° 21.258 (no afecta al LGA)",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 161
  },
  {
    "code": 1911,
    "label": "Donaciones de bienes inmuebles en apoyo al plan de emergencia habitacional, art. 26 Ley N° 21.450",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 162
  },
  {
    "code": 1992,
    "label": "Donaciones, según art.157 ter letra b) del Código del Trabajo",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 163
  },
  {
    "code": 999,
    "label": "Donaciones para fines culturales según art. 8° Ley N° 18.985",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 165
  },
  {
    "code": 998,
    "label": "Donaciones para fines culturales según art. 8° Ley N° 18.985",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 165
  },
  {
    "code": 953,
    "label": "Donaciones para fines culturales según art. 8° Ley N° 18.985",
    "section": "RECUADRO 8",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 165
  },
  {
    "code": 1160,
    "label": "Remanente FUR ejercicio anterior debidamente reajustado",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 168
  },
  {
    "code": 1163,
    "label": "Rebaja FUR por devolución de capital, enajenación de acciones o derechos sociales y reorganización empresarial, debidamente reajustados",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 169
  },
  {
    "code": 1164,
    "label": "Rebaja FUR acogido a IS por devolución de capital, enajenación de acciones o derechos sociales y reorganización empresarial, debidamente reajustados",
    "section": "RECUADRO 9",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 170
  },
  {
    "code": 1166,
    "label": "Aumento FUR por reorganización empresarial debidamente reajustado",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 171
  },
  {
    "code": 1168,
    "label": "Remanente para el ejercicio siguiente de rentas afectadas con IS",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 172
  },
  {
    "code": 1169,
    "label": "Remanente FUR para el ejercicio siguiente afectos a impuestos finales",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 173
  },
  {
    "code": 1170,
    "label": "Remanente FUR para el ejercicio siguiente exentos e INR",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 174
  },
  {
    "code": 1171,
    "label": "Remanente crédito IDPC ejercicio anterior debidamente reajustado",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 175
  },
  {
    "code": 1172,
    "label": "Crédito por IDPC utilizado en el ejercicio",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 176
  },
  {
    "code": 1173,
    "label": "Crédito por IDPC recibido en el ejercicio",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 177
  },
  {
    "code": 1174,
    "label": "Remanente crédito por IDPC para el ejercicio siguiente",
    "section": "RECUADRO 9",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 178
  },
  {
    "code": 940,
    "label": "Cantidad de bienes del activo inmovilizado",
    "section": "RECUADRO 10",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 181
  },
  {
    "code": 938,
    "label": "Depreciación acelerada en 1/3  vida útil, del ejercicio (art. 31 N° 5 LIR)",
    "section": "RECUADRO 10",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 182
  },
  {
    "code": 949,
    "label": "Depreciación acelerada en 1/10 vida útil, del ejercicio (art. 31 N° 5 bis LIR)",
    "section": "RECUADRO 10",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 183
  },
  {
    "code": 950,
    "label": "Total depreciación normal de los bienes con depreciación acelerada informada en los códigos 938, 949",
    "section": "RECUADRO 10",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 184
  },
  {
    "code": 1066,
    "label": "Diferencia entre depreciaciones aceleradas y normales del ejercicio, anteriores",
    "section": "RECUADRO 10",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 185
  },
  {
    "code": 884,
    "label": "Agregados a la RLI (o pérdida tributaria) de primera categoría, según ex. art. 64 ter LIR",
    "section": "RECUADRO 11",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 189
  },
  {
    "code": 885,
    "label": "Deducciones a la RLI (o pérdida tributaria) de primera categoría, según ex. art. 64 ter LIR",
    "section": "RECUADRO 11",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 190
  },
  {
    "code": 886,
    "label": "Ventas expresadas en TMCF, según ex. art. 64 bis LIR",
    "section": "RECUADRO 11",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 191
  },
  {
    "code": 985,
    "label": "Ventas de relacionados expresadas en TMCF, según ex art. 64 bis LIR",
    "section": "RECUADRO 11",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 192
  },
  {
    "code": 887,
    "label": "Margen operacional minero, según ex. art. 64 bis LIR",
    "section": "RECUADRO 11",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 193
  },
  {
    "code": 1954,
    "label": "Componente sobre la rentabilidad, según art. 3 o art. 4 Ley N° 21.591",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 197
  },
  {
    "code": 1955,
    "label": "Costos asociados a ingresos no operacionales mineros",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 198
  },
  {
    "code": 1956,
    "label": "Gastos asociados a ingresos no operacionales mineros",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 199
  },
  {
    "code": 1957,
    "label": "Proporción gastos de imputación común que no sean asignables exclusivamente a un determinado tipo de ingresos",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 200
  },
  {
    "code": 1958,
    "label": "Gastos de intereses",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 201
  },
  {
    "code": 1959,
    "label": "Depreciación acelerada",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 202
  },
  {
    "code": 1960,
    "label": "Pérdida de ejercicios anteriores",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 203
  },
  {
    "code": 1961,
    "label": "Gastos de organización y puesta en marcha",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 204
  },
  {
    "code": 1962,
    "label": "Contratos de avío y otras contraprestaciones",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 205
  },
  {
    "code": 1963,
    "label": "Cierre de faenas (art 58 de la Ley N° 20.551)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 206
  },
  {
    "code": 1964,
    "label": "Ingresos no operacionales mineros",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 208
  },
  {
    "code": 1965,
    "label": "Cuota depreciación normal",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 209
  },
  {
    "code": 1966,
    "label": "Cuota gastos de organización y puesta en marcha",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 210
  },
  {
    "code": 1967,
    "label": "Renta imponible operacional minera ajustada (RIOMA)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 211
  },
  {
    "code": 1968,
    "label": "Promedio TMCF (incluídos los ingresos de explotadores mineros relacionados) art. 5 Ley N° 21.591",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "decimals": 2,
    "sourceRow": 213
  },
  {
    "code": 1969,
    "label": "Total ingresos de productos mineros del ejercicio (indistintamente del mineral de que se trata)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 214
  },
  {
    "code": 1970,
    "label": "Total ingresos de productos mineros del ejercicio (solo cobre)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 215
  },
  {
    "code": 1971,
    "label": "Margen operacional minero según N° 6 del art 1 Ley N° 21.591",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "decimals": 1,
    "sourceRow": 216
  },
  {
    "code": 1972,
    "label": "Tasa componente sobre la rentabilidad, según art. 3 o art. 4 Ley N° 21.591",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "decimals": 2,
    "sourceRow": 217
  },
  {
    "code": 1657,
    "label": "Ingresos del giro percibidos o devengados",
    "section": "RECUADRO 12",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 221
  },
  {
    "code": 1658,
    "label": "Rentas de fuente extranjera",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 222
  },
  {
    "code": 1659,
    "label": "Intereses percibidos o devengados",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 223
  },
  {
    "code": 1660,
    "label": "Otros ingresos percibidos o devengados",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 224
  },
  {
    "code": 1661,
    "label": "Costo directo de los bienes y servicios",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 225
  },
  {
    "code": 1662,
    "label": "Remuneraciones",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 226
  },
  {
    "code": 1140,
    "label": "Arriendos",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 227
  },
  {
    "code": 1663,
    "label": "Depreciación financiera del ejercicio",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 228
  },
  {
    "code": 1664,
    "label": "Intereses pagados o adeudados",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 229
  },
  {
    "code": 1665,
    "label": "Gastos por donaciones",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 230
  },
  {
    "code": 1666,
    "label": "Otros gastos financieros",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 231
  },
  {
    "code": 1667,
    "label": "Gastos por inversión privada en investigación y desarrollo certificados por CORFO",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 232
  },
  {
    "code": 1668,
    "label": "Gastos por inversión privada en Investigación y desarrollo no certificados por CORFO",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 233
  },
  {
    "code": 1141,
    "label": "Gastos por exigencias medio ambientales",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 234
  },
  {
    "code": 1142,
    "label": "Gasto por indemnización o compensación a clientes o usuarios",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 235
  },
  {
    "code": 1669,
    "label": "Costos y gastos necesarios para producir las rentas de fuente extranjera",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 236
  },
  {
    "code": 1670,
    "label": "Gastos por impuesto renta e impuesto diferido",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 237
  },
  {
    "code": 1671,
    "label": "Otros gastos deducidos de los ingresos brutos",
    "section": "RECUADRO 12",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 238
  },
  {
    "code": 1672,
    "label": "Resultado financiero",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 239
  },
  {
    "code": 1673,
    "label": "Corrección monetaria saldo deudor (art. 32 N° 1 LIR)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 241
  },
  {
    "code": 1674,
    "label": "Corrección monetaria saldo acreedor (art. 32 N° 2 LIR)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 242
  },
  {
    "code": 1144,
    "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR, reajustados",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 243
  },
  {
    "code": 1675,
    "label": "Depreciación financiera del ejercicio",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 244
  },
  {
    "code": 1175,
    "label": "Estimación y/o castigos de deudas incobrables, según criterios financieros",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 245
  },
  {
    "code": 1676,
    "label": "Rentas tributables no reconocidas financieramente",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 246
  },
  {
    "code": 1677,
    "label": "Gastos agregados por donaciones",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 247
  },
  {
    "code": 1678,
    "label": "Gastos que se deben agregar a la RLI según el art. 33 N° 1 LIR",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 248
  },
  {
    "code": 1150,
    "label": "Ingreso diferido por cambio de régimen",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 249
  },
  {
    "code": 1147,
    "label": "Costos y gastos asociados a  ingresos no renta (art. 17 LIR), generados",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 250
  },
  {
    "code": 1148,
    "label": "Proporcionalidad gastos imputados a ingresos no renta y/o rentas exentas",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 251
  },
  {
    "code": 1149,
    "label": "Intereses devengados por inversiones en bonos del art. 104 LIR",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 252
  },
  {
    "code": 1151,
    "label": "Ingresos devengados por cambio de régimen",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 253
  },
  {
    "code": 1991,
    "label": "Ajustes por precios de transferencia, según art. 41 E LIR",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 254
  },
  {
    "code": 1152,
    "label": "Gastos adeudados por cambio de régimen",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 255
  },
  {
    "code": 1176,
    "label": "Castigo de deudas incobrables, según art. 31 inc. 4° N° 4 LIR",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 256
  },
  {
    "code": 1679,
    "label": "Depreciación tributaria del ejercicio",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 257
  },
  {
    "code": 1680,
    "label": "Gasto goodwill tributario del ejercicio",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 258
  },
  {
    "code": 1681,
    "label": "Impuesto específico a la actividad minera",
    "section": "RECUADRO 12",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 259
  },
  {
    "code": 1974,
    "label": "Componente ad valorem del royalty minero según art. 2 Ley N° 21.591",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 260
  },
  {
    "code": 1975,
    "label": "Componente sobre la rentabilidad del royalty minero según art. 3 o art. 4 Ley N° 21.591",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 261
  },
  {
    "code": 1682,
    "label": "Gastos rechazados afectos a la tributación del art. 21 inc. 1°  LIR",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 262
  },
  {
    "code": 1683,
    "label": "Gastos rechazados afectos a la tributación del art. 21 inc. 3° LIR",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 263
  },
  {
    "code": 1684,
    "label": "Otras partidas",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 264
  },
  {
    "code": 1685,
    "label": "Rentas exentas IDPC (art. 33 N°2 LIR )",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 265
  },
  {
    "code": 1686,
    "label": "Dividendos y/o utilidades sociales percibidos o devengados (art. 33 N° 2 LIR)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 266
  },
  {
    "code": 1183,
    "label": "Dividendos y/o utilidades sociales percibidas o devengadas (art. 33 N° 2 LIR), ingresos no renta",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 267
  },
  {
    "code": 1687,
    "label": "Gastos aceptados por donaciones",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 268
  },
  {
    "code": 1688,
    "label": "Ingresos no renta, generados (art. 17 LIR)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 269
  },
  {
    "code": 1689,
    "label": "Pérdidas de ejercicios anteriores (art. 31 N° 3 LIR)",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 270
  },
  {
    "code": 1728,
    "label": "Renta líquida imponible antes de rebaja por incentivo al ahorro (art. 14 letra E) LIR) y/o por pago de IDPC voluntario (art. 14 letra A) N°6 LIR y art. 42° transitorio Ley N° 21.210) o pérdida tributaria",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 271
  },
  {
    "code": 1154,
    "label": "Incentivo al ahorro según art. 14 letra E) LIR",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 272
  },
  {
    "code": 1157,
    "label": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR y art. 42° transitorio Ley N° 21.210",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 273
  },
  {
    "code": 1690,
    "label": "Renta líquida imponible afecta a IDPC o pérdida tributaria del ejercicio",
    "section": "RECUADRO 12",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 274
  },
  {
    "code": 1692,
    "label": "Saldo negativo del registro REX al término del ejercicio",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 279
  },
  {
    "code": 1699,
    "label": "Remesas, retiros o dividendos repartidos en el ejercicio, reajustados",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 280
  },
  {
    "code": 1718,
    "label": "Subtotal",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 281
  },
  {
    "code": 1693,
    "label": "Saldo positivo del registro REX al término del ejercicio, antes de imputaciones",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 282
  },
  {
    "code": 844,
    "label": "Capital aportado debidamente reajustado (incluye aumentos y disminuciones efectivas)",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 283
  },
  {
    "code": 982,
    "label": "Saldo FUR  (cuando no haya sido considerado dentro del valor del capital aportado a la empresa)",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 284
  },
  {
    "code": 1198,
    "label": "Sobreprecio obtenido en la colocación de acciones de propia emisión, debidamente reajustado",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 285
  },
  {
    "code": 1199,
    "label": "Rentas afectas a IGC o IA (RAI) del ejercicio",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 286
  },
  {
    "code": 1145,
    "label": "CPT positivo inicial",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 289
  },
  {
    "code": 1146,
    "label": "CPT negativo inicial",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 290
  },
  {
    "code": 1177,
    "label": "Corrección monetaria capital propio tributario inicial",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 291
  },
  {
    "code": 893,
    "label": "Aumentos (efectivos) de capital del ejercicio, actualizados",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 292
  },
  {
    "code": 894,
    "label": "Disminuciones (efectivas) de capital del ejercicio, actualizadas",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 293
  },
  {
    "code": 1694,
    "label": "Renta líquida imponible afecta a IDPC del ejercicio",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 294
  },
  {
    "code": 1695,
    "label": "Pérdida tributaria del ejercicio al 31 de diciembre",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 295
  },
  {
    "code": 1696,
    "label": "Pérdidas de ejercicios anteriores (art. 31 N° 3 LIR)",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 296
  },
  {
    "code": 1178,
    "label": "Rentas exentas del IDPC e ingresos no renta (positivo), generados por la empresa en el ejercicio",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 297
  },
  {
    "code": 1179,
    "label": "Pérdida por rentas exentas del IDPC e ingresos no renta del ejercicio",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 298
  },
  {
    "code": 1180,
    "label": "Retiros o dividendos percibidos en el ejercicio por participaciones en otras empresas",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 299
  },
  {
    "code": 1182,
    "label": "Remesas, retiros o dividendos repartidos en el ejercicio, reajustados",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 300
  },
  {
    "code": 1697,
    "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR, reajustados",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 301
  },
  {
    "code": 1186,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 302
  },
  {
    "code": 1187,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 303
  },
  {
    "code": 1700,
    "label": "Ingreso diferido por cambio de régimen",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 304
  },
  {
    "code": 1188,
    "label": "Crédito total disponible imputable contra impuestos finales (IPE), del ejercicio",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 305
  },
  {
    "code": 1701,
    "label": "Incentivo al ahorro según art. 14 letra E) LIR",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 306
  },
  {
    "code": 1702,
    "label": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 307
  },
  {
    "code": 1189,
    "label": "Otras partidas a agregar",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 308
  },
  {
    "code": 1190,
    "label": "Otras partidas a deducir",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 309
  },
  {
    "code": 645,
    "label": "CPT positivo final",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 310
  },
  {
    "code": 646,
    "label": "CPT negativo final",
    "section": "RECUADRO 14",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 311
  },
  {
    "code": 1200,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1211,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1221,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1730,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1731,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1234,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1246,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1260,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 317
  },
  {
    "code": 1222,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 318
  },
  {
    "code": 1843,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 318
  },
  {
    "code": 1235,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 318
  },
  {
    "code": 1247,
    "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 318
  },
  {
    "code": 1933,
    "label": "Monto acogido al ISIF, según art. 10 Ley N° 21.681, reajustado",
    "section": "RECUADRO 15",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 319
  },
  {
    "code": 1934,
    "label": "Monto acogido al ISIF, según art. 10 Ley N° 21.681, reajustado",
    "section": "RECUADRO 15",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 319
  },
  {
    "code": 1935,
    "label": "+/-",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 319
  },
  {
    "code": 1202,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1212,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1224,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1733,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1734,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1236,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1248,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1262,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 320
  },
  {
    "code": 1203,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1213,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1225,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1735,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1736,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1237,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1249,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1263,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 321
  },
  {
    "code": 1204,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1214,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1226,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1737,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1738,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1238,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1250,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1264,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 322
  },
  {
    "code": 1205,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 323
  },
  {
    "code": 1215,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 323
  },
  {
    "code": 1740,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 323
  },
  {
    "code": 1239,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 323
  },
  {
    "code": 1251,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 323
  },
  {
    "code": 1206,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1216,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1228,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1741,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1742,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1240,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1252,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1265,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 324
  },
  {
    "code": 1207,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1217,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1229,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1743,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1744,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1241,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1253,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1266,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 325
  },
  {
    "code": 1208,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1218,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1230,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1745,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1746,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1242,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1254,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1267,
    "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 326
  },
  {
    "code": 1209,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1219,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1231,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1747,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1748,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1243,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1255,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1268,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 327
  },
  {
    "code": 1210,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1220,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1232,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1749,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1750,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1244,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1256,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1269,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 328
  },
  {
    "code": 1233,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 329
  },
  {
    "code": 1844,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 329
  },
  {
    "code": 1245,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 329
  },
  {
    "code": 1257,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 15",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 329
  },
  {
    "code": 1270,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1279,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1288,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1301,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1313,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1324,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1335,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1346,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 335
  },
  {
    "code": 1821,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 336
  },
  {
    "code": 1822,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 336
  },
  {
    "code": 1289,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 336
  },
  {
    "code": 1302,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 336
  },
  {
    "code": 1936,
    "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 337
  },
  {
    "code": 1937,
    "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 337
  },
  {
    "code": 1938,
    "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 337
  },
  {
    "code": 1939,
    "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 337
  },
  {
    "code": 1940,
    "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 337
  },
  {
    "code": 1941,
    "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 337
  },
  {
    "code": 1271,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1280,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1290,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1303,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1314,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1326,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1337,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1347,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 338
  },
  {
    "code": 1272,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1281,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1291,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1304,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1315,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1327,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1338,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1348,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 339
  },
  {
    "code": 1292,
    "label": "IDPC e IPE RLI generada en el ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 340
  },
  {
    "code": 1305,
    "label": "IDPC e IPE RLI generada en el ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 340
  },
  {
    "code": 1316,
    "label": "IDPC e IPE RLI generada en el ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 340
  },
  {
    "code": 1273,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1282,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1293,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1306,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1317,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1328,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1339,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1349,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 341
  },
  {
    "code": 1274,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1283,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1294,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1307,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1318,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1329,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1340,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1350,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 342
  },
  {
    "code": 1275,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1284,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1295,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1308,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1319,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1330,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1341,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1351,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 343
  },
  {
    "code": 1276,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1285,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1296,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1309,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1320,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1331,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1342,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1352,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 344
  },
  {
    "code": 1277,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1286,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1297,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1310,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1321,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1332,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1343,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1353,
    "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 345
  },
  {
    "code": 1298,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 346
  },
  {
    "code": 1311,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 346
  },
  {
    "code": 1322,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 346
  },
  {
    "code": 1333,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 346
  },
  {
    "code": 1344,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 346
  },
  {
    "code": 1354,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 346
  },
  {
    "code": 1278,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1287,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1312,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1300,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1323,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1334,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1345,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1355,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 347
  },
  {
    "code": 1723,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 348
  },
  {
    "code": 1724,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 348
  },
  {
    "code": 1299,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 348
  },
  {
    "code": 1373,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 16",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 348
  },
  {
    "code": 1400,
    "label": "Ingresos del giro percibidos",
    "section": "RECUADRO 17",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 352
  },
  {
    "code": 1817,
    "label": "Ingresos del giro devengados en ejercicios anteriores y percibidos en el ejercicio actual",
    "section": "RECUADRO 17",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 353
  },
  {
    "code": 1401,
    "label": "Rentas de fuente extranjera percibidas",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 354
  },
  {
    "code": 1402,
    "label": "Intereses y reajustes percibidos por préstamos y otros",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 355
  },
  {
    "code": 1403,
    "label": "Mayor valor percibido por rescate o enajenación de inversiones o bienes no depreciables",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 356
  },
  {
    "code": 1587,
    "label": "Ingresos percibidos o devengados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 357
  },
  {
    "code": 1588,
    "label": "Otros ingresos percibidos o devengados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 358
  },
  {
    "code": 1404,
    "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado cuando corresponda",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 359
  },
  {
    "code": 1405,
    "label": "Crédito sobre activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 360
  },
  {
    "code": 1410,
    "label": "Total de ingresos anuales",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 361
  },
  {
    "code": 1406,
    "label": "Gasto por saldo inicial de existencias o insumos del negocio en cambio de régimen, pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 362
  },
  {
    "code": 1407,
    "label": "Gasto por saldo inicial de activos fijos depreciables en cambio de régimen, pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 363
  },
  {
    "code": 1408,
    "label": "Gasto por pérdida tributaria en cambio de régimen",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 364
  },
  {
    "code": 1409,
    "label": "Existencias, insumos y servicios del negocio, pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 365
  },
  {
    "code": 1818,
    "label": "Existencias, insumos y servicios del negocio adeudados en ejercicios anteriores y pagados en el ejercicio actual",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 366
  },
  {
    "code": 1429,
    "label": "Gastos de rentas de fuente extranjera, pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 367
  },
  {
    "code": 1411,
    "label": "Remuneraciones pagadas",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 368
  },
  {
    "code": 1412,
    "label": "Honorarios pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 369
  },
  {
    "code": 1413,
    "label": "Adquisición de bienes del activo fijo, pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 370
  },
  {
    "code": 1415,
    "label": "Arriendos pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 371
  },
  {
    "code": 1416,
    "label": "Gastos por exigencias medio ambientales, pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 372
  },
  {
    "code": 1417,
    "label": "Gastos por inversión privada en investigación y desarrollo no certificados por CORFO",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 373
  },
  {
    "code": 1418,
    "label": "Gastos por inversión privada en investigación y desarrollo certificados por CORFO",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 374
  },
  {
    "code": 1419,
    "label": "Intereses y reajustes pagados por préstamos y otros",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 375
  },
  {
    "code": 1421,
    "label": "Partidas del art. 21 inc. 1° y 3° LIR pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 376
  },
  {
    "code": 1422,
    "label": "Partidas del art. 21 inc. 1° no afectados con IU 40% y del inc. 2° LIR pagados",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 377
  },
  {
    "code": 1423,
    "label": "Pérdida en rescate o enajenación de inversiones o bienes no depreciables",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 378
  },
  {
    "code": 1424,
    "label": "Otros gastos deducibles de los ingresos",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 379
  },
  {
    "code": 1425,
    "label": "Gastos o egresos pagados o adeudados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 380
  },
  {
    "code": 1426,
    "label": "Pérdidas tributarias de ejercicios anteriores",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 381
  },
  {
    "code": 1427,
    "label": "Créditos incobrables castigados en el ejercicio (reconocidos sobre ingresos devengados)",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 382
  },
  {
    "code": 1428,
    "label": "Gastos aceptados por donaciones",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 383
  },
  {
    "code": 1430,
    "label": "Total de egresos anuales",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 384
  },
  {
    "code": 1431,
    "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR (históricos), incluidos en el total de egresos",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 385
  },
  {
    "code": 1729,
    "label": "Base imponible antes de rebaja por incentivo al ahorro (art. 14 letra E) LIR) y/o por pago de IDPC voluntario (art. 14 letra A) N°6 LIR y art. 42° transitorio Ley N° 21.210) o pérdida tributaria",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 386
  },
  {
    "code": 1432,
    "label": "Incentivo al ahorro según art. 14 letra E) LIR",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 387
  },
  {
    "code": 1433,
    "label": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR y art. 42° transitorio Ley N° 21.210",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 388
  },
  {
    "code": 1440,
    "label": "Base Imponible afecta a IDPC o pérdida tributaria del ejercicio",
    "section": "RECUADRO 17",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 389
  },
  {
    "code": 1492,
    "label": "Saldo negativo del registro REX al término del ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 394
  },
  {
    "code": 1704,
    "label": "Remesas, retiros o dividendos repartidos en el ejercicio, históricos",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 395
  },
  {
    "code": 1720,
    "label": "Subtotal",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 396
  },
  {
    "code": 1493,
    "label": "Saldo positivo del registro REX al término del ejercicio, antes de imputaciones",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 397
  },
  {
    "code": 1494,
    "label": "Capital aportado, histórico (incluye aumentos y disminuciones efectivas)",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 398
  },
  {
    "code": 1725,
    "label": "Saldo FUR  (cuando no haya sido considerado dentro del valor del capital aportado a la empresa)",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 399
  },
  {
    "code": 1727,
    "label": "Sobreprecio obtenido en la colocación de acciones de propia emisión, histórico",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 400
  },
  {
    "code": 1500,
    "label": "Rentas afectas a IGC o IA (RAI) del ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 401
  },
  {
    "code": 1445,
    "label": "CPT o CPTS positivo inicial",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 404
  },
  {
    "code": 1446,
    "label": "CPT o CPTS negativo inicial",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 405
  },
  {
    "code": 1374,
    "label": "Capital aportado empresas que inician actividades en el año comercial que corresponda a esta declaración",
    "section": "RECUADRO 19",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 406
  },
  {
    "code": 1375,
    "label": "Aumentos (efectivos) de capital del ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 407
  },
  {
    "code": 1376,
    "label": "Disminuciones (efectivas) de capital del ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 408
  },
  {
    "code": 1705,
    "label": "Base imponible afecta a IDPC del ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 409
  },
  {
    "code": 1706,
    "label": "Pérdida tributaria del ejercicio al 31 de diciembre",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 410
  },
  {
    "code": 1707,
    "label": "Pérdidas tributarias de ejercicios anteriores",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 411
  },
  {
    "code": 1377,
    "label": "Rentas exentas e ingresos no renta (positivo), generados por la empresa en el ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 412
  },
  {
    "code": 1378,
    "label": "Pérdida por rentas exentas e ingresos no renta del ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 413
  },
  {
    "code": 1726,
    "label": "Retiros o dividendos percibidos en el ejercicio por participaciones en otras empresas",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 414
  },
  {
    "code": 1479,
    "label": "Remesas, retiros o dividendos repartidos en el ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 415
  },
  {
    "code": 1708,
    "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 416
  },
  {
    "code": 1709,
    "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado cuando corresponda",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 417
  },
  {
    "code": 1379,
    "label": "Crédito total disponible imputable contra impuestos finales (IPE), del ejercicio",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 418
  },
  {
    "code": 1710,
    "label": "Incentivo al ahorro según art. 14 letra E) LIR",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 419
  },
  {
    "code": 1711,
    "label": "Base del IDPC voluntario según art. 14 letra A) N° 6 LIR",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 420
  },
  {
    "code": 1380,
    "label": "Otras partidas a agregar",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 421
  },
  {
    "code": 1381,
    "label": "Otras partidas a deducir",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 422
  },
  {
    "code": 1545,
    "label": "CPTS positivo final",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 423
  },
  {
    "code": 1546,
    "label": "CPTS negativo final",
    "section": "RECUADRO 19",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 424
  },
  {
    "code": 1451,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 430
  },
  {
    "code": 1452,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 430
  },
  {
    "code": 1752,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 430
  },
  {
    "code": 1753,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 430
  },
  {
    "code": 1453,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 430
  },
  {
    "code": 1454,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 430
  },
  {
    "code": 1382,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 430
  },
  {
    "code": 1589,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 431
  },
  {
    "code": 1845,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 431
  },
  {
    "code": 1455,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 431
  },
  {
    "code": 1456,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 431
  },
  {
    "code": 1942,
    "label": "Monto acogido al ISIF, según arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 20",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 432
  },
  {
    "code": 1943,
    "label": "Monto acogido al ISIF, según arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 20",
    "dataType": "boolean",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 432
  },
  {
    "code": 1944,
    "label": "+/-",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 432
  },
  {
    "code": 1392,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 433
  },
  {
    "code": 1393,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 433
  },
  {
    "code": 1755,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 433
  },
  {
    "code": 1756,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 433
  },
  {
    "code": 1394,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 433
  },
  {
    "code": 1395,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 433
  },
  {
    "code": 1384,
    "label": "Aumentos del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 433
  },
  {
    "code": 1396,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 434
  },
  {
    "code": 1397,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 434
  },
  {
    "code": 1757,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 434
  },
  {
    "code": 1758,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 434
  },
  {
    "code": 1398,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 434
  },
  {
    "code": 1399,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 434
  },
  {
    "code": 1385,
    "label": "Disminuciones del ejercicio (por reorganizaciones)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 434
  },
  {
    "code": 1459,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 435
  },
  {
    "code": 1460,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 435
  },
  {
    "code": 1759,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 435
  },
  {
    "code": 1760,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 435
  },
  {
    "code": 1461,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 435
  },
  {
    "code": 1462,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 435
  },
  {
    "code": 1386,
    "label": "Reversos y/o disminuciones del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 435
  },
  {
    "code": 1463,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 436
  },
  {
    "code": 1762,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 436
  },
  {
    "code": 1465,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 436
  },
  {
    "code": 1466,
    "label": "Aumentos del ejercicio (propios)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 436
  },
  {
    "code": 1467,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 437
  },
  {
    "code": 1468,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 437
  },
  {
    "code": 1763,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 437
  },
  {
    "code": 1764,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 437
  },
  {
    "code": 1469,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 437
  },
  {
    "code": 1470,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 437
  },
  {
    "code": 1387,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 437
  },
  {
    "code": 1471,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 438
  },
  {
    "code": 1472,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 438
  },
  {
    "code": 1765,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 438
  },
  {
    "code": 1766,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 438
  },
  {
    "code": 1473,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 438
  },
  {
    "code": 1474,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 438
  },
  {
    "code": 1388,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 438
  },
  {
    "code": 1475,
    "label": "Retiros, dividendos o remesas imputados a los RTRE",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 439
  },
  {
    "code": 1476,
    "label": "Retiros, dividendos o remesas imputados a los RTRE",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 439
  },
  {
    "code": 1767,
    "label": "Retiros, dividendos o remesas imputados a los RTRE",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 439
  },
  {
    "code": 1768,
    "label": "Retiros, dividendos o remesas imputados a los RTRE",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 439
  },
  {
    "code": 1477,
    "label": "Retiros, dividendos o remesas imputados a los RTRE",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 439
  },
  {
    "code": 1478,
    "label": "Retiros, dividendos o remesas imputados a los RTRE",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 439
  },
  {
    "code": 1389,
    "label": "Retiros, dividendos o remesas imputados a los RTRE",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 439
  },
  {
    "code": 1480,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 440
  },
  {
    "code": 1481,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 440
  },
  {
    "code": 1769,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 440
  },
  {
    "code": 1770,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 440
  },
  {
    "code": 1482,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 440
  },
  {
    "code": 1483,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 440
  },
  {
    "code": 1390,
    "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 440
  },
  {
    "code": 1484,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 441
  },
  {
    "code": 1485,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 441
  },
  {
    "code": 1771,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 441
  },
  {
    "code": 1772,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 441
  },
  {
    "code": 1486,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 441
  },
  {
    "code": 1487,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 441
  },
  {
    "code": 1391,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 441
  },
  {
    "code": 1489,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 442
  },
  {
    "code": 1846,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 442
  },
  {
    "code": 1490,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 442
  },
  {
    "code": 1491,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 20",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 442
  },
  {
    "code": 1495,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1496,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1497,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1498,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1499,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1501,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1502,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1503,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 448
  },
  {
    "code": 1655,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 449
  },
  {
    "code": 1656,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 449
  },
  {
    "code": 1504,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 449
  },
  {
    "code": 1505,
    "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 449
  },
  {
    "code": 1945,
    "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 450
  },
  {
    "code": 1946,
    "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 450
  },
  {
    "code": 1947,
    "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 450
  },
  {
    "code": 1948,
    "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 450
  },
  {
    "code": 1949,
    "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 450
  },
  {
    "code": 1950,
    "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 450
  },
  {
    "code": 1590,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1436,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1437,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1438,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1439,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1441,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1442,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1443,
    "label": "Aumentos del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 451
  },
  {
    "code": 1444,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1447,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1448,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1449,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1508,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1509,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1510,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1511,
    "label": "Disminuciones del ejercicio(por reorganizaciones)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 452
  },
  {
    "code": 1512,
    "label": "IDPC e IPE base imponible generada en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 453
  },
  {
    "code": 1513,
    "label": "IDPC e IPE base imponible generada en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 453
  },
  {
    "code": 1514,
    "label": "IDPC e IPE base imponible generada en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 453
  },
  {
    "code": 1515,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1516,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1517,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1518,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1519,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1520,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1521,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1522,
    "label": "IDPC e IPE retiros o dividendos percibidos",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 454
  },
  {
    "code": 1523,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1524,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1525,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1526,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1527,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1528,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1529,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1530,
    "label": "Otros aumentos del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 455
  },
  {
    "code": 1531,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1532,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1533,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1534,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1535,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1536,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1537,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1538,
    "label": "Otras disminuciones del ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 456
  },
  {
    "code": 1539,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1540,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1541,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1542,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1543,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1544,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1547,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1548,
    "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 457
  },
  {
    "code": 1549,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1550,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1551,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1552,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1553,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1554,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1555,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1556,
    "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 458
  },
  {
    "code": 1557,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 459
  },
  {
    "code": 1558,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 459
  },
  {
    "code": 1559,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 459
  },
  {
    "code": 1560,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 459
  },
  {
    "code": 1561,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 459
  },
  {
    "code": 1562,
    "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 459
  },
  {
    "code": 1563,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1564,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1565,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1566,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1567,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1568,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1569,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1570,
    "label": "Remanente ejercicio siguiente (saldo positivo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 460
  },
  {
    "code": 1368,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 461
  },
  {
    "code": 1371,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 461
  },
  {
    "code": 1571,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 461
  },
  {
    "code": 1572,
    "label": "Remanente ejercicio siguiente (saldo negativo)",
    "section": "RECUADRO 21",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 461
  },
  {
    "code": 1600,
    "label": "Ingresos del giro percibidos",
    "section": "RECUADRO 22",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 465
  },
  {
    "code": 1819,
    "label": "Ingresos del giro devengados en ejercicios anteriores y percibidos en el ejercicio actual",
    "section": "RECUADRO 22",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 466
  },
  {
    "code": 1601,
    "label": "Rentas de fuente extranjera percibidas",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 467
  },
  {
    "code": 1602,
    "label": "Intereses y reajustes percibidos por préstamos y otros",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 468
  },
  {
    "code": 1603,
    "label": "Mayor valor percibido por rescate o enajenación de inversiones o bienes no depreciables",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 469
  },
  {
    "code": 1604,
    "label": "Dividendos o retiros percibidos en el ejercicio, por participaciones en otras empresas",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 470
  },
  {
    "code": 1605,
    "label": "Incremento por IDPC",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 471
  },
  {
    "code": 1606,
    "label": "Ingresos percibidos o devengados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 472
  },
  {
    "code": 1607,
    "label": "Otros ingresos percibidos o devengados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 473
  },
  {
    "code": 1608,
    "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado, cuando corresponda",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 474
  },
  {
    "code": 1609,
    "label": "Crédito por activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 475
  },
  {
    "code": 1610,
    "label": "Total de ingresos anuales",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 476
  },
  {
    "code": 1611,
    "label": "Gasto por saldo inicial de existencias o insumos del negocio en cambio de régimen, pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 477
  },
  {
    "code": 1612,
    "label": "Gasto por saldo inicial de activos fijos depreciables en cambio de régimen, pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 478
  },
  {
    "code": 1613,
    "label": "Gasto por pérdida tributaria en cambio de régimen",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 479
  },
  {
    "code": 1614,
    "label": "Existencias, insumos y servicios del negocio, pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 480
  },
  {
    "code": 1820,
    "label": "Existencias, insumos y servicios del negocio adeudados en ejercicios anteriores y pagados en el ejercicio actual",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 481
  },
  {
    "code": 1615,
    "label": "Gastos de rentas de fuente extranjera, pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 482
  },
  {
    "code": 1616,
    "label": "Remuneraciones pagadas",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 483
  },
  {
    "code": 1617,
    "label": "Honorarios pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 484
  },
  {
    "code": 1618,
    "label": "Adquisición de bienes del activo fijo, pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 485
  },
  {
    "code": 1620,
    "label": "Arriendos pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 486
  },
  {
    "code": 1621,
    "label": "Gastos por exigencias medio ambientales, pagados",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 487
  },
  {
    "code": 1622,
    "label": "Intereses y reajustes pagados por préstamos y otros",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 488
  },
  {
    "code": 1624,
    "label": "Pérdida en rescate o enajenación de inversiones o bienes no depreciables",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 489
  },
  {
    "code": 1625,
    "label": "Otros gastos deducibles de los ingresos",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 490
  },
  {
    "code": 1626,
    "label": "Gastos o egresos pagados o adeudados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 491
  },
  {
    "code": 1627,
    "label": "Pérdidas tributarias de ejercicios anteriores",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 492
  },
  {
    "code": 1628,
    "label": "Créditos incobrables castigados en el ejercicio (reconocidos sobre ingresos devengados)",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 493
  },
  {
    "code": 1909,
    "label": "Gastos aceptados por donaciones",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 494
  },
  {
    "code": 1629,
    "label": "Total de egresos anuales",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 495
  },
  {
    "code": 1630,
    "label": "Base imponible a asignar a propietarios que son contribuyentes de impuestos finales, o pérdida tributaria del ejercicio",
    "section": "RECUADRO 22",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 496
  },
  {
    "code": 1580,
    "label": "CPT o CPTS positivo inicial",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 499
  },
  {
    "code": 1582,
    "label": "CPT o CPTS negativo inicial",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 500
  },
  {
    "code": 1573,
    "label": "Capital aportado empresas que inician actividades en el año comercial que corresponda a esta declaración",
    "section": "RECUADRO 23",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 501
  },
  {
    "code": 1574,
    "label": "Aumentos (efectivos) de capital del ejercicio",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 502
  },
  {
    "code": 1575,
    "label": "Disminuciones (efectivas) de capital del ejercicio",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 503
  },
  {
    "code": 1712,
    "label": "Base imponible del ejercicio, asignable a los propietarios",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 504
  },
  {
    "code": 1713,
    "label": "Pérdida tributaria del ejercicio al 31 de diciembre",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 505
  },
  {
    "code": 1714,
    "label": "Pérdidas tributarias de ejercicios anteriores",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 506
  },
  {
    "code": 1576,
    "label": "Remesas, retiros o dividendos repartidos en el ejercicio",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 507
  },
  {
    "code": 1715,
    "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado, cuando corresponda",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 508
  },
  {
    "code": 1577,
    "label": "Partidas de gastos no aceptados",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 509
  },
  {
    "code": 1716,
    "label": "Crédito por activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 510
  },
  {
    "code": 1578,
    "label": "Crédito por IDPC, por participaciones en otras empresas que incrementaron la BI del ejercicio",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 511
  },
  {
    "code": 1584,
    "label": "Otras partidas a agregar",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 512
  },
  {
    "code": 1585,
    "label": "Otras partidas a deducir",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 513
  },
  {
    "code": 1581,
    "label": "CPTS positivo final",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 514
  },
  {
    "code": 1583,
    "label": "CPTS negativo final",
    "section": "RECUADRO 23",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 515
  },
  {
    "code": 1784,
    "label": "5% de las rentas que forman parte de la declaración anual de impuestos a la renta según art. 65 LIR (calculado sobre el código 170)",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 518
  },
  {
    "code": 1801,
    "label": "Cuota anual (30% del monto del préstamo tasa 0%), según art. 11 inc. 1° Ley N° 21.323",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 520
  },
  {
    "code": 1799,
    "label": "Saldo pendiente cuota año anterior",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 521
  },
  {
    "code": 1802,
    "label": "Monto a pagar de la cuota",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 522
  },
  {
    "code": 1787,
    "label": "Pago anticipado por reintegro del préstamo tasa 0% (F-50, F-10 o código 1842 del F-22 AT2025), según art. 11 inc. 3° Ley N° 21.323",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 524
  },
  {
    "code": 1788,
    "label": "Monto a pagar de la cuota después de anticipos",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 526
  },
  {
    "code": 1789,
    "label": "Retención adicional sobre rentas del art. 42 N° 1 LIR con tasa del 3% (retención a trabajadores dependientes), por reintegro del préstamo tasa 0%,  según art. 11 letra a) Ley N° 21.323",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 528
  },
  {
    "code": 1790,
    "label": "Retención adicional sobre rentas del art. 42 N° 2 LIR con tasa del 3% (retención a trabajadores independientes), por reintegro del préstamo tasa 0%, según  art. 11 letra b) Ley N° 21.323",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 529
  },
  {
    "code": 1791,
    "label": "PPMA primera categoría art. 84 letra a) y 14 letra D) N° 3 letra (k) y N° 8 letra (a) numeral (viii) LIR, con tasa 3%, por reintegro de préstamo tasa 0%, según art. 11 letra c) Ley N° 21.323",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 530
  },
  {
    "code": 1792,
    "label": "PPMA segunda categoría art. 84 letra b) LIR, con tasa 3%, por reintegro de préstamo  tasa 0%, (trabajadores independientes) según art. 11 letra b) Ley N° 21.323",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 531
  },
  {
    "code": 1793,
    "label": "Total retenciones adicionales y PPMA",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 532
  },
  {
    "code": 1794,
    "label": "Monto a pagar de la cuota después de retenciones adicionales y PPMA",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 534
  },
  {
    "code": 1795,
    "label": "Saldo a devolver por retenciones adicionales y PPMA en exceso",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 535
  },
  {
    "code": 1592,
    "label": "1",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 542
  },
  {
    "code": 1024,
    "label": "1",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 542
  },
  {
    "code": 1593,
    "label": "1",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 542
  },
  {
    "code": 1025,
    "label": "1",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 542
  },
  {
    "code": 104,
    "label": "1",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 542
  },
  {
    "code": 2005,
    "label": "Campo 2005",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 543
  },
  {
    "code": 2006,
    "label": "Campo 2006",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 543
  },
  {
    "code": 2007,
    "label": "Campo 2007",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 543
  },
  {
    "code": 2008,
    "label": "Campo 2008",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 543
  },
  {
    "code": 2009,
    "label": "Campo 2009",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 543
  },
  {
    "code": 2000,
    "label": "Campo 2000",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 544
  },
  {
    "code": 2001,
    "label": "Campo 2001",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 544
  },
  {
    "code": 2002,
    "label": "Campo 2002",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 544
  },
  {
    "code": 2003,
    "label": "Campo 2003",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 544
  },
  {
    "code": 2004,
    "label": "Campo 2004",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 544
  },
  {
    "code": 1594,
    "label": "2",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 545
  },
  {
    "code": 1026,
    "label": "2",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 545
  },
  {
    "code": 1595,
    "label": "2",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 545
  },
  {
    "code": 1027,
    "label": "2",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 545
  },
  {
    "code": 105,
    "label": "2",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 545
  },
  {
    "code": 106,
    "label": "3",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 546
  },
  {
    "code": 603,
    "label": "4",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 547
  },
  {
    "code": 108,
    "label": "4",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 547
  },
  {
    "code": 1920,
    "label": "Campo 1920",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 548
  },
  {
    "code": 1921,
    "label": "Campo 1921",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 548
  },
  {
    "code": 1922,
    "label": "Campo 1922",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 549
  },
  {
    "code": 1923,
    "label": "Campo 1923",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 549
  },
  {
    "code": 1721,
    "label": "5",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 550
  },
  {
    "code": 1722,
    "label": "5",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 550
  },
  {
    "code": 1596,
    "label": "5",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 550
  },
  {
    "code": 954,
    "label": "5",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 550
  },
  {
    "code": 955,
    "label": "5",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 550
  },
  {
    "code": 1917,
    "label": "Campo 1917",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 551
  },
  {
    "code": 1848,
    "label": "Campo 1848",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 551
  },
  {
    "code": 1849,
    "label": "Campo 1849",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 551
  },
  {
    "code": 1850,
    "label": "Campo 1850",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 552
  },
  {
    "code": 1851,
    "label": "Campo 1851",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 552
  },
  {
    "code": 1852,
    "label": "Campo 1852",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 552
  },
  {
    "code": 1853,
    "label": "Campo 1853",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 553
  },
  {
    "code": 1854,
    "label": "Campo 1854",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 553
  },
  {
    "code": 1855,
    "label": "Campo 1855",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 553
  },
  {
    "code": 1856,
    "label": "Campo 1856",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 553
  },
  {
    "code": 1857,
    "label": "Campo 1857",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 553
  },
  {
    "code": 1858,
    "label": "Campo 1858",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 554
  },
  {
    "code": 1859,
    "label": "Campo 1859",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 554
  },
  {
    "code": 1860,
    "label": "Campo 1860",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 554
  },
  {
    "code": 1861,
    "label": "Campo 1861",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 554
  },
  {
    "code": 1862,
    "label": "Campo 1862",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 554
  },
  {
    "code": 1872,
    "label": "Campo 1872",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 555
  },
  {
    "code": 1873,
    "label": "Campo 1873",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 555
  },
  {
    "code": 1863,
    "label": "Campo 1863",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 556
  },
  {
    "code": 1864,
    "label": "Campo 1864",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 556
  },
  {
    "code": 1865,
    "label": "Campo 1865",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 556
  },
  {
    "code": 1597,
    "label": "6",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 557
  },
  {
    "code": 1598,
    "label": "6",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 557
  },
  {
    "code": 1599,
    "label": "6",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 557
  },
  {
    "code": 1631,
    "label": "6",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 557
  },
  {
    "code": 1632,
    "label": "6",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 557
  },
  {
    "code": 2010,
    "label": "Campo 2010",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 558
  },
  {
    "code": 2011,
    "label": "Campo 2011",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 558
  },
  {
    "code": 2012,
    "label": "Campo 2012",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 558
  },
  {
    "code": 2013,
    "label": "Campo 2013",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 558
  },
  {
    "code": 2014,
    "label": "Campo 2014",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 558
  },
  {
    "code": 2015,
    "label": "Campo 2015",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 559
  },
  {
    "code": 2016,
    "label": "Campo 2016",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 559
  },
  {
    "code": 2017,
    "label": "Campo 2017",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 559
  },
  {
    "code": 2018,
    "label": "Campo 2018",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 559
  },
  {
    "code": 2019,
    "label": "Campo 2019",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 559
  },
  {
    "code": 110,
    "label": "7",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 560
  },
  {
    "code": 605,
    "label": "8",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 561
  },
  {
    "code": 155,
    "label": "8",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 561
  },
  {
    "code": 1866,
    "label": "Campo 1866",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 562
  },
  {
    "code": 1867,
    "label": "Campo 1867",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 562
  },
  {
    "code": 1869,
    "label": "Campo 1869",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 563
  },
  {
    "code": 1871,
    "label": "Campo 1871",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 564
  },
  {
    "code": 1633,
    "label": "9",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 565
  },
  {
    "code": 1105,
    "label": "9",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 565
  },
  {
    "code": 1634,
    "label": "9",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 565
  },
  {
    "code": 606,
    "label": "9",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 565
  },
  {
    "code": 152,
    "label": "9",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 565
  },
  {
    "code": 1874,
    "label": "Campo 1874",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 566
  },
  {
    "code": 1875,
    "label": "Campo 1875",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 566
  },
  {
    "code": 1876,
    "label": "Campo 1876",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 566
  },
  {
    "code": 1877,
    "label": "Campo 1877",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 566
  },
  {
    "code": 1878,
    "label": "Campo 1878",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 566
  },
  {
    "code": 1879,
    "label": "Campo 1879",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 567
  },
  {
    "code": 1880,
    "label": "Campo 1880",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 567
  },
  {
    "code": 1881,
    "label": "Campo 1881",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 567
  },
  {
    "code": 1882,
    "label": "Campo 1882",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 567
  },
  {
    "code": 1883,
    "label": "Campo 1883",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 567
  },
  {
    "code": 1884,
    "label": "Campo 1884",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 568
  },
  {
    "code": 1885,
    "label": "Campo 1885",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 569
  },
  {
    "code": 1886,
    "label": "Campo 1886",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 569
  },
  {
    "code": 1887,
    "label": "Campo 1887",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 569
  },
  {
    "code": 1888,
    "label": "Campo 1888",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 569
  },
  {
    "code": 1889,
    "label": "Campo 1889",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 569
  },
  {
    "code": 1635,
    "label": "10",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 570
  },
  {
    "code": 1031,
    "label": "10",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 570
  },
  {
    "code": 1032,
    "label": "10",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 570
  },
  {
    "code": 1890,
    "label": "11",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 571
  },
  {
    "code": 1891,
    "label": "11",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 571
  },
  {
    "code": 1914,
    "label": "12",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 572
  },
  {
    "code": 1104,
    "label": "12",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 572
  },
  {
    "code": 1098,
    "label": "Sueldos y otras rentas similares de fuente extranjera",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 573
  },
  {
    "code": 1030,
    "label": "Sueldos y otras rentas similares de fuente extranjera",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 573
  },
  {
    "code": 161,
    "label": "13",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 573
  },
  {
    "code": 159,
    "label": "Incremento por impuestos soportados en el exterior, según art. 41 A LIR",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 574
  },
  {
    "code": 748,
    "label": "Incremento por impuestos soportados en el exterior, según art. 41 A LIR",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 574
  },
  {
    "code": 749,
    "label": "14",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 574
  },
  {
    "code": 166,
    "label": "15",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 577
  },
  {
    "code": 907,
    "label": "16",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 578
  },
  {
    "code": 169,
    "label": "17",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 579
  },
  {
    "code": 1833,
    "label": "18",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 580
  },
  {
    "code": 158,
    "label": "19",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 581
  },
  {
    "code": 111,
    "label": "20",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 582
  },
  {
    "code": 750,
    "label": "Dividendos hipotecarios pagados por viviendas nuevas acogidas al D.F.L. Nº 2 de 1959, según Ley N°19.622",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 583
  },
  {
    "code": 740,
    "label": "Dividendos hipotecarios pagados por viviendas nuevas acogidas al D.F.L. Nº 2 de 1959, según Ley N°19.622",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 583
  },
  {
    "code": 751,
    "label": "21",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 583
  },
  {
    "code": 822,
    "label": "22",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 584
  },
  {
    "code": 765,
    "label": "23",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 585
  },
  {
    "code": 170,
    "label": "24",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 587
  },
  {
    "code": 157,
    "label": "25",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 590
  },
  {
    "code": 1017,
    "label": "26",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 591
  },
  {
    "code": 1033,
    "label": "27",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 592
  },
  {
    "code": 201,
    "label": "28",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 593
  },
  {
    "code": 1035,
    "label": "29",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 594
  },
  {
    "code": 910,
    "label": "30",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 595
  },
  {
    "code": 1036,
    "label": "31",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 598
  },
  {
    "code": 1101,
    "label": "32",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 599
  },
  {
    "code": 135,
    "label": "33",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 600
  },
  {
    "code": 136,
    "label": "34",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 601
  },
  {
    "code": 176,
    "label": "35",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 602
  },
  {
    "code": 752,
    "label": "36",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 603
  },
  {
    "code": 608,
    "label": "37",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 604
  },
  {
    "code": 1636,
    "label": "38",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 605
  },
  {
    "code": 1637,
    "label": "39",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 606
  },
  {
    "code": 1638,
    "label": "40",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 607
  },
  {
    "code": 895,
    "label": "41",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 608
  },
  {
    "code": 867,
    "label": "42",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 609
  },
  {
    "code": 609,
    "label": "43",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 610
  },
  {
    "code": 1639,
    "label": "44",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 611
  },
  {
    "code": 1018,
    "label": "45",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 612
  },
  {
    "code": 162,
    "label": "46",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 613
  },
  {
    "code": 174,
    "label": "47",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 614
  },
  {
    "code": 610,
    "label": "48",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 615
  },
  {
    "code": 746,
    "label": "49",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 616
  },
  {
    "code": 866,
    "label": "50",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 617
  },
  {
    "code": 607,
    "label": "51",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 618
  },
  {
    "code": 304,
    "label": "52",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 619
  },
  {
    "code": 31,
    "label": "REBAJAS AL IMPUESTO",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 623
  },
  {
    "code": 18,
    "label": "54",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 624
  },
  {
    "code": 19,
    "label": "54",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 624
  },
  {
    "code": 20,
    "label": "54",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 624
  },
  {
    "code": 1109,
    "label": "55",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 625
  },
  {
    "code": 1111,
    "label": "55",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 625
  },
  {
    "code": 1113,
    "label": "55",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 625
  },
  {
    "code": 1640,
    "label": "56",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 626
  },
  {
    "code": 1641,
    "label": "56",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 626
  },
  {
    "code": 1642,
    "label": "56",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 626
  },
  {
    "code": 187,
    "label": "57",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 627
  },
  {
    "code": 188,
    "label": "57",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 627
  },
  {
    "code": 189,
    "label": "57",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 627
  },
  {
    "code": 1924,
    "label": "Campo 1924",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 628
  },
  {
    "code": 1925,
    "label": "Campo 1925",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 628
  },
  {
    "code": 1926,
    "label": "Campo 1926",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 628
  },
  {
    "code": 1927,
    "label": "Campo 1927",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 629
  },
  {
    "code": 1928,
    "label": "Campo 1928",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 629
  },
  {
    "code": 1929,
    "label": "Campo 1929",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 630
  },
  {
    "code": 1930,
    "label": "Campo 1930",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 630
  },
  {
    "code": 1931,
    "label": "Campo 1931",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 631
  },
  {
    "code": 1932,
    "label": "Campo 1932",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 631
  },
  {
    "code": 1037,
    "label": "58",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 632
  },
  {
    "code": 1038,
    "label": "58",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 632
  },
  {
    "code": 1039,
    "label": "58",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 632
  },
  {
    "code": 1892,
    "label": "Campo 1892",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 633
  },
  {
    "code": 1893,
    "label": "Campo 1893",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 633
  },
  {
    "code": 1894,
    "label": "Campo 1894",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 633
  },
  {
    "code": 1895,
    "label": "Campo 1895",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 634
  },
  {
    "code": 1897,
    "label": "Campo 1897",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 634
  },
  {
    "code": 1898,
    "label": "Campo 1898",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 635
  },
  {
    "code": 1899,
    "label": "Campo 1899",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 635
  },
  {
    "code": 1900,
    "label": "Campo 1900",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 635
  },
  {
    "code": 1901,
    "label": "Campo 1901",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 636
  },
  {
    "code": 1902,
    "label": "Campo 1902",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 636
  },
  {
    "code": 1903,
    "label": "Campo 1903",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 636
  },
  {
    "code": 1912,
    "label": "Campo 1912",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 637
  },
  {
    "code": 1918,
    "label": "Campo 1918",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 637
  },
  {
    "code": 1913,
    "label": "Campo 1913",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 637
  },
  {
    "code": 77,
    "label": "59",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 638
  },
  {
    "code": 74,
    "label": "59",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 638
  },
  {
    "code": 79,
    "label": "59",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 638
  },
  {
    "code": 1040,
    "label": "60",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 639
  },
  {
    "code": 1041,
    "label": "60",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 639
  },
  {
    "code": 1042,
    "label": "61",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 640
  },
  {
    "code": 824,
    "label": "62",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 641
  },
  {
    "code": 825,
    "label": "62",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 641
  },
  {
    "code": 1976,
    "label": "63",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 642
  },
  {
    "code": 1977,
    "label": "Campo 1977",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 643
  },
  {
    "code": 1978,
    "label": "Campo 1978",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 643
  },
  {
    "code": 1979,
    "label": "Campo 1979",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 644
  },
  {
    "code": 1980,
    "label": "Campo 1980",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 644
  },
  {
    "code": 1043,
    "label": "64",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 645
  },
  {
    "code": 1102,
    "label": "64",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 645
  },
  {
    "code": 1044,
    "label": "64",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 645
  },
  {
    "code": 113,
    "label": "65",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 646
  },
  {
    "code": 1007,
    "label": "65",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 646
  },
  {
    "code": 114,
    "label": "65",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 646
  },
  {
    "code": 1829,
    "label": "66",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 647
  },
  {
    "code": 1830,
    "label": "66",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 647
  },
  {
    "code": 1835,
    "label": "67",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 648
  },
  {
    "code": 1836,
    "label": "67",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 648
  },
  {
    "code": 1837,
    "label": "67",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 648
  },
  {
    "code": 908,
    "label": "68",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 649
  },
  {
    "code": 909,
    "label": "68",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 649
  },
  {
    "code": 951,
    "label": "69",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 650
  },
  {
    "code": 952,
    "label": "69",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 650
  },
  {
    "code": 753,
    "label": "70",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 651
  },
  {
    "code": 754,
    "label": "70",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 651
  },
  {
    "code": 755,
    "label": "70",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 651
  },
  {
    "code": 133,
    "label": "71",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 652
  },
  {
    "code": 138,
    "label": "71",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 652
  },
  {
    "code": 134,
    "label": "71",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 652
  },
  {
    "code": 32,
    "label": "72",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 653
  },
  {
    "code": 76,
    "label": "72",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 653
  },
  {
    "code": 34,
    "label": "72",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 653
  },
  {
    "code": 1643,
    "label": "73",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 654
  },
  {
    "code": 1644,
    "label": "73",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 654
  },
  {
    "code": 911,
    "label": "74",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 655
  },
  {
    "code": 913,
    "label": "75",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 656
  },
  {
    "code": 923,
    "label": "76",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 657
  },
  {
    "code": 924,
    "label": "77",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 658
  },
  {
    "code": 1051,
    "label": "78",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 659
  },
  {
    "code": 1052,
    "label": "79",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 660
  },
  {
    "code": 21,
    "label": "80",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 661
  },
  {
    "code": 43,
    "label": "81",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 662
  },
  {
    "code": 767,
    "label": "82",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 663
  },
  {
    "code": 862,
    "label": "83",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 664
  },
  {
    "code": 51,
    "label": "84",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 667
  },
  {
    "code": 63,
    "label": "84",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 667
  },
  {
    "code": 71,
    "label": "84",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 667
  },
  {
    "code": 36,
    "label": "85",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 668
  },
  {
    "code": 1904,
    "label": "Campo 1904",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 669
  },
  {
    "code": 1905,
    "label": "Campo 1905",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 670
  },
  {
    "code": 1906,
    "label": "Campo 1906",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 671
  },
  {
    "code": 1916,
    "label": "Campo 1916",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 672
  },
  {
    "code": 848,
    "label": "86",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 673
  },
  {
    "code": 82,
    "label": "87",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 674
  },
  {
    "code": 1123,
    "label": "88",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 675
  },
  {
    "code": 83,
    "label": "89",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 676
  },
  {
    "code": 173,
    "label": "90",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 677
  },
  {
    "code": 198,
    "label": "91",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 678
  },
  {
    "code": 54,
    "label": "92",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 679
  },
  {
    "code": 832,
    "label": "93",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 680
  },
  {
    "code": 1907,
    "label": "94",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 681
  },
  {
    "code": 833,
    "label": "95",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 682
  },
  {
    "code": 1908,
    "label": "96",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 683
  },
  {
    "code": 119,
    "label": "Remanente de crédito por IDPC proveniente de códigos 1638 y/o 610",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 684
  },
  {
    "code": 116,
    "label": "Remanente de crédito por IDPC proveniente de códigos 1638 y/o 610",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 684
  },
  {
    "code": 757,
    "label": "97",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 684
  },
  {
    "code": 58,
    "label": "98",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 685
  },
  {
    "code": 1645,
    "label": "99",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 686
  },
  {
    "code": 181,
    "label": "100",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 687
  },
  {
    "code": 881,
    "label": "101",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 688
  },
  {
    "code": 1646,
    "label": "102",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 689
  },
  {
    "code": 1647,
    "label": "103",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 690
  },
  {
    "code": 1910,
    "label": "104",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 691
  },
  {
    "code": 1915,
    "label": "105",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 692
  },
  {
    "code": 900,
    "label": "106",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 694
  },
  {
    "code": 1796,
    "label": "107",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 695
  },
  {
    "code": 1827,
    "label": "108",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 696
  },
  {
    "code": 305,
    "label": "109",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 697
  },
  {
    "code": 85,
    "label": "110",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 700
  },
  {
    "code": 86,
    "label": "111",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 701
  },
  {
    "code": 87,
    "label": "112",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 703
  },
  {
    "code": 301,
    "label": "Nombre institución bancaria",
    "section": "RECUADRO 24",
    "dataType": "text",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 705
  },
  {
    "code": 306,
    "label": "Número de cuenta",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 706
  },
  {
    "code": 780,
    "label": "Cuenta corriente",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 707
  },
  {
    "code": 90,
    "label": "113",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 714
  },
  {
    "code": 39,
    "label": "114",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 715
  },
  {
    "code": 91,
    "label": "115",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 716
  },
  {
    "code": 92,
    "label": "116",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 718
  },
  {
    "code": 93,
    "label": "117",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 719
  },
  {
    "code": 94,
    "label": "118",
    "section": "RECUADRO 24",
    "dataType": "number",
    "isCalculated": false,
    "isMandatory": false,
    "canBeNegative": false,
    "sourceRow": 720
  }
];

export const SECTION_INFOS: SectionInfo[] = [
  {
    "id": "RECUADRO 0",
    "title": "RECUADRO N° 0: INFORMACIÓN BASE",
    "startRow": 1
  },
  {
    "id": "RECUADRO 1",
    "title": "RECUADRO N° 1:  HONORARIOS",
    "startRow": 15
  },
  {
    "id": "RECUADRO 2",
    "title": "RECUADRO N° 2: DETERMINACIÓN MAYOR O MENOR VALOR OBTENIDO POR PERSONAS NATURALES EN LAS ENAJENACIONES DE BIENES RAÍCES, NO ASIGNADOS A SU EMPRESA INDIVIDUAL",
    "startRow": 33
  },
  {
    "id": "RECUADRO 3",
    "title": "RECUADRO N° 3: DATOS SOBRE INSTRUMENTOS DE AHORRO ACOGIDOS AL EX ART. 57 BIS LIR (ART. 3° TRANSITORIO NUMERAL VI) LEY N° 20.780)",
    "startRow": 53
  },
  {
    "id": "RECUADRO 4",
    "title": "RECUADRO N° 4: ENAJENACIÓN DE ACCIONES, DERECHOS SOCIALES, CUOTAS DE FONDOS MUTUOS Y/O DE INVERSIÓN",
    "startRow": 61
  },
  {
    "id": "RECUADRO 5",
    "title": "RECUADRO N°5: CRÉDITO POR INGRESO DIFERIDO PROPIETARIOS DE EMPRESAS RÉGIMEN TRANSPARENCIA TRIBUTARIA, ART. 14 LETRA D) N°8 LIR",
    "startRow": 83
  },
  {
    "id": "RECUADRO 6",
    "title": "RECUADRO N° 6: DATOS INFORMATIVOS",
    "startRow": 89
  },
  {
    "id": "RECUADRO 7",
    "title": "RECUADRO N° 7: INGRESO DIFERIDO Y SALDOS PENDIENTES DE AMORTIZACIÓN",
    "startRow": 127
  },
  {
    "id": "RECUADRO 8",
    "title": "RECUADRO N° 8:  INFORMACIÓN SOBRE DONACIONES Y CRÉDITOS O REBAJAS IMPUTABLES AL IDPC",
    "startRow": 134
  },
  {
    "id": "RECUADRO 9",
    "title": "RECUADRO N° 9: REGISTRO FUR",
    "startRow": 167
  },
  {
    "id": "RECUADRO 10",
    "title": "RECUADRO Nº 10: DEPRECIACIÓN",
    "startRow": 180
  },
  {
    "id": "RECUADRO 11",
    "title": "RECUADRO N° 11: ROYALTY MINERO",
    "startRow": 187
  },
  {
    "id": "RECUADRO 12",
    "title": "Renta líquida imponible o pérdida tributaria, arts. 29 al 33 LIR (código 1728 recuadro N° 12)",
    "startRow": 195
  },
  {
    "id": "RECUADRO 12",
    "title": "RECUADRO N° 12: BASE IMPONIBLE DE PRIMERA CATEGORÍA (ART. 14 LETRAS  A) O G) LIR)",
    "startRow": 219
  },
  {
    "id": "RECUADRO 13",
    "title": "RECUADRO Nº 13: DETERMINACIÓN DEL RAI (ART. 14 LETRA A) LIR)",
    "startRow": 276
  },
  {
    "id": "RECUADRO 14",
    "title": "CPT positivo final (recuadro N° 14)",
    "startRow": 277
  },
  {
    "id": "RECUADRO 14",
    "title": "CPT negativo final (recuadro N° 14)",
    "startRow": 278
  },
  {
    "id": "RECUADRO 14",
    "title": "RECUADRO Nº 14:  RAZONABILIDAD CAPITAL PROPIO TRIBUTARIO (ART. 14 LETRA A) O G) LIR)",
    "startRow": 288
  },
  {
    "id": "RECUADRO 15",
    "title": "RECUADRO N° 15: REGISTRO TRIBUTARIO DE RENTAS EMPRESARIALES Y MOVIMIENTO STUT (ART. 14 LETRA A) LIR)",
    "startRow": 313
  },
  {
    "id": "RECUADRO 16",
    "title": "RECUADRO N° 16: REGISTRO SAC (ART. 14 LETRA A) LIR)",
    "startRow": 331
  },
  {
    "id": "RECUADRO 17",
    "title": "RECUADRO N° 17: BASE IMPONIBLE RÉGIMEN PRO PYME (ART. 14 LETRA D) N° 3 LIR)",
    "startRow": 350
  },
  {
    "id": "RECUADRO 18",
    "title": "RECUADRO Nº 18DETERMINACIÓN DEL RAI (ART. 14 LETRA D) N° 3 LIR)",
    "startRow": 391
  },
  {
    "id": "RECUADRO 19",
    "title": "CPTS positivo final (recuadro N° 19)",
    "startRow": 392
  },
  {
    "id": "RECUADRO 19",
    "title": "CPTS negativo final (recuadro N° 19)",
    "startRow": 393
  },
  {
    "id": "RECUADRO 19",
    "title": "RECUADRO N° 19: CPTS RÉGIMEN PRO PYME (ART. 14 LETRA D) N° 3 LIR)",
    "startRow": 403
  },
  {
    "id": "RECUADRO 20",
    "title": "RECUADRO N° 20: REGISTRO TRIBUTARIO DE RENTAS EMPRESARIALES Y MOVIMIENTO STUT (ART. 14 LETRA D) N° 3 LIR)",
    "startRow": 426
  },
  {
    "id": "RECUADRO 21",
    "title": "RECUADRO N° 21: REGISTRO SAC (ART. 14 LETRA D) N° 3 LIR)",
    "startRow": 444
  },
  {
    "id": "RECUADRO 22",
    "title": "RECUADRO N° 22: BASE IMPONIBLE RÉGIMEN DE TRANSPARENCIA TRIBUTARIA (ART. 14 LETRA D) N° 8 LIR)",
    "startRow": 463
  },
  {
    "id": "RECUADRO 23",
    "title": "RECUADRO N° 23: CPTS RÉGIMEN DE TRANSPARENCIA TRIBUTARIA (ART. 14 LETRA D) N° 8 LIR)",
    "startRow": 498
  },
  {
    "id": "RECUADRO 24",
    "title": "RECUADRO N° 24: PAGO PRÉSTAMO TASA 0% PERCIBIDO EN EL AÑO COMERCIAL 2021 (PRÉSTAMO SOLIDARIO DEL ESTADO)",
    "startRow": 517
  }
];

export const LAYOUT_SECTIONS: LayoutSection[] = [
  {
    "id": "RECUADRO 0",
    "title": "RECUADRO N° 0: INFORMACIÓN BASE",
    "columnHeaders": [
      "",
      "",
      "",
      ""
    ],
    "rows": [
      {
        "rowIndex": 2,
        "type": "sub_header",
        "text": "INFORMACIÓN PERSONAL",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 3,
        "type": "field",
        "text": "RUT",
        "bold": false,
        "fields": [
          {
            "code": 3,
            "operator": "",
            "slot": 1,
            "label": "RUT",
            "dataType": "text"
          },
          {
            "code": 6,
            "operator": "",
            "slot": 3,
            "label": "Domicilio",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 4,
        "type": "field",
        "text": "Nombre",
        "bold": false,
        "fields": [
          {
            "code": 1,
            "operator": "",
            "slot": 1,
            "label": "Nombre",
            "dataType": "text"
          },
          {
            "code": 55,
            "operator": "",
            "slot": 3,
            "label": "Correo electrónico",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 5,
        "type": "field",
        "text": "Actividad, profesión o giro del negocio",
        "bold": false,
        "fields": [
          {
            "code": 13,
            "operator": "",
            "slot": 1,
            "label": "Actividad, profesión o giro del negocio",
            "dataType": "text"
          },
          {
            "code": 9,
            "operator": "",
            "slot": 3,
            "label": "Telefóno",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 6,
        "type": "sub_header",
        "text": "SELECCIONE LAS FRANQUICIAS TRIBUTARIAS A LAS QUE ESTÁ ACOGIDO",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 7,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 95,
            "operator": "",
            "slot": 0,
            "label": "Leyes N°s 18.392 o 19.149 (Navarino y Primavera)",
            "dataType": "boolean"
          },
          {
            "code": 786,
            "operator": "",
            "slot": 2,
            "label": "Ley N° 19.709 (Tocopilla)",
            "dataType": "boolean"
          }
        ]
      },
      {
        "rowIndex": 8,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 616,
            "operator": "",
            "slot": 0,
            "label": "Asociación o cuentas en participación",
            "dataType": "boolean"
          },
          {
            "code": 73,
            "operator": "",
            "slot": 2,
            "label": "D.S. N° 341 de 2004, del Min. de Hacienda (Zona Franca)",
            "dataType": "boolean"
          }
        ]
      },
      {
        "rowIndex": 9,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 69,
            "operator": "",
            "slot": 0,
            "label": "Instituciones art. 40 N°s 2 y 4 LIR",
            "dataType": "boolean"
          },
          {
            "code": 72,
            "operator": "",
            "slot": 2,
            "label": "D.L. N° 701 de 1974 (Fomento Forestal)",
            "dataType": "boolean"
          }
        ]
      },
      {
        "rowIndex": 10,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 68,
            "operator": "",
            "slot": 0,
            "label": "D.L. N° 600 de 1974 (E.I.E.)",
            "dataType": "boolean"
          }
        ]
      },
      {
        "rowIndex": 11,
        "type": "sub_header",
        "text": "Régimen de tributación",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 12,
        "type": "sub_header",
        "text": "Régimen contabilidad agrícola simplificada según D.S. N° 344 de 2004, del Min. de Hacienda",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 13,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 805,
            "operator": "",
            "slot": 0,
            "label": "Opción al régimen",
            "dataType": "boolean"
          },
          {
            "code": 813,
            "operator": "",
            "slot": 2,
            "label": "Retiro del régimen",
            "dataType": "boolean"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 1",
    "title": "RECUADRO N° 1:  HONORARIOS",
    "columnHeaders": [
      "Renta actualizada",
      "Impuesto retenido actualizado"
    ],
    "rows": [
      {
        "rowIndex": 16,
        "type": "col_header",
        "text": "RENTAS DE 2ª CATEGORÍA",
        "bold": false,
        "fields": [],
        "colTexts": [
          "Renta actualizada",
          "Impuesto retenido actualizado"
        ]
      },
      {
        "rowIndex": 17,
        "type": "field",
        "text": "Honorarios anuales con retención",
        "bold": false,
        "fields": [
          {
            "code": 461,
            "operator": "+",
            "slot": 0,
            "label": "Honorarios anuales con retención",
            "dataType": "number"
          },
          {
            "code": 492,
            "operator": "+",
            "slot": 1,
            "label": "Honorarios anuales con retención",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 18,
        "type": "field",
        "text": "Honorarios anuales sin retención",
        "bold": false,
        "fields": [
          {
            "code": 545,
            "operator": "+",
            "slot": 0,
            "label": "Honorarios anuales sin retención",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 19,
        "type": "field",
        "text": "Honorarios líquidos percibidos de fuente extranjera",
        "bold": false,
        "fields": [
          {
            "code": 1650,
            "operator": "+",
            "slot": 0,
            "label": "Honorarios líquidos percibidos de fuente extranjera",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 20,
        "type": "field",
        "text": "Incremento por impuestos soportados en el extranjero",
        "bold": false,
        "fields": [
          {
            "code": 856,
            "operator": "+",
            "slot": 0,
            "label": "Incremento por impuestos soportados en el extranjero",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 21,
        "type": "field",
        "text": "Total ingresos brutos",
        "bold": true,
        "fields": [
          {
            "code": 547,
            "operator": "=",
            "slot": 0,
            "label": "Total ingresos brutos",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 22,
        "type": "field",
        "text": "Participación en sociedades de profesionales de 2ª Categoría",
        "bold": false,
        "fields": [
          {
            "code": 617,
            "operator": "+",
            "slot": 0,
            "label": "Participación en sociedades de profesionales de 2ª Categoría",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 23,
        "type": "field",
        "text": "Monto ahorro previsional, según art. 42 bis inc. 1° LIR",
        "bold": false,
        "fields": [
          {
            "code": 770,
            "operator": "-",
            "slot": 0,
            "label": "Monto ahorro previsional, según art. 42 bis inc. 1° LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 24,
        "type": "field",
        "text": "Gastos por donaciones para fines sociales, según art. 1° bis Ley N° 19.885, y gasto por donaciones de bienes inmuebles en apoyo al plan de emergencia habitacional, art. 26 Ley N° 21.450",
        "bold": false,
        "fields": [
          {
            "code": 872,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por donaciones para fines sociales, según art. 1° bis Ley N° 19.885, y gasto por donaciones de bienes inmuebles en apoyo al plan de emergencia habitacional, art. 26 Ley N° 21.450",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 25,
        "type": "field",
        "text": "Gastos efectivos (solo rebajables del código 547)",
        "bold": false,
        "fields": [
          {
            "code": 465,
            "operator": "-",
            "slot": 0,
            "label": "Gastos efectivos (solo rebajables del código 547)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 26,
        "type": "field",
        "text": "Gastos presuntos: 30% sobre el código 547, con tope de 15 UTA",
        "bold": false,
        "fields": [
          {
            "code": 494,
            "operator": "-",
            "slot": 0,
            "label": "Gastos presuntos: 30% sobre el código 547, con tope de 15 UTA",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 27,
        "type": "field",
        "text": "Rebaja por presunción de asignación de zona  D.L. N° 889 de 1975",
        "bold": false,
        "fields": [
          {
            "code": 850,
            "operator": "-",
            "slot": 0,
            "label": "Rebaja por presunción de asignación de zona  D.L. N° 889 de 1975",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 28,
        "type": "field",
        "text": "Total honorarios",
        "bold": true,
        "fields": [
          {
            "code": 467,
            "operator": "=",
            "slot": 0,
            "label": "Total honorarios",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 29,
        "type": "field",
        "text": "Total remuneraciones directores S.A.",
        "bold": true,
        "fields": [
          {
            "code": 479,
            "operator": "+",
            "slot": 0,
            "label": "Total remuneraciones directores S.A.",
            "dataType": "number"
          },
          {
            "code": 491,
            "operator": "+",
            "slot": 1,
            "label": "Total remuneraciones directores S.A.",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 30,
        "type": "field",
        "text": "Total rentas y retenciones",
        "bold": true,
        "fields": [
          {
            "code": 618,
            "operator": "=",
            "slot": 0,
            "label": "Total rentas y retenciones",
            "dataType": "number"
          },
          {
            "code": 619,
            "operator": "=",
            "slot": 1,
            "label": "Total rentas y retenciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 31,
        "type": "field",
        "text": "Participaciones en ingresos brutos sociedades de profesionales de 2ª Categoría",
        "bold": false,
        "fields": [
          {
            "code": 896,
            "operator": "",
            "slot": 0,
            "label": "Participaciones en ingresos brutos sociedades de profesionales de 2ª Categoría",
            "dataType": "text"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 2",
    "title": "RECUADRO N° 2: DETERMINACIÓN MAYOR O MENOR VALOR OBTENIDO POR PERSONAS NATURALES EN LAS ENAJENACIONES DE BIENES RAÍCES, NO ASIGNADOS A SU EMPRESA INDIVIDUAL",
    "columnHeaders": [
      "Según art. 17 N°8 letra b) de la LIR",
      "Enajenaciones a partes relacionadas",
      "Otras enajenaciones afectas"
    ],
    "rows": [
      {
        "rowIndex": 34,
        "type": "col_header",
        "text": "Conceptos",
        "bold": false,
        "fields": [],
        "colTexts": [
          "Según art. 17 N°8 letra b) de la LIR",
          "Enajenaciones a partes relacionadas",
          "Otras enajenaciones afectas"
        ]
      },
      {
        "rowIndex": 35,
        "type": "field",
        "text": "Precios de enajenaciones del conjunto de los bienes raíces",
        "bold": false,
        "fields": [
          {
            "code": 1055,
            "operator": "",
            "slot": 0,
            "label": "Precios de enajenaciones del conjunto de los bienes raíces",
            "dataType": "number"
          },
          {
            "code": 1981,
            "operator": "",
            "slot": 1,
            "label": "Precios de enajenaciones del conjunto de los bienes raíces",
            "dataType": "number"
          },
          {
            "code": 1982,
            "operator": "+",
            "slot": 2,
            "label": "Precios de enajenaciones del conjunto de los bienes raíces",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 36,
        "type": "field",
        "text": "Menos:valor de adquisición de los bienes raíces reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1056,
            "operator": "",
            "slot": 0,
            "label": "Menos:valor de adquisición de los bienes raíces reajustados",
            "dataType": "number"
          },
          {
            "code": 1983,
            "operator": "",
            "slot": 1,
            "label": "Menos:valor de adquisición de los bienes raíces reajustados",
            "dataType": "number"
          },
          {
            "code": 1984,
            "operator": "-",
            "slot": 2,
            "label": "Menos:valor de adquisición de los bienes raíces reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 37,
        "type": "field",
        "text": "Menos:mejoras que hayan aumentado el valor de los bienes raíces reajustadas",
        "bold": false,
        "fields": [
          {
            "code": 1057,
            "operator": "",
            "slot": 0,
            "label": "Menos:mejoras que hayan aumentado el valor de los bienes raíces reajustadas",
            "dataType": "number"
          },
          {
            "code": 1985,
            "operator": "",
            "slot": 1,
            "label": "Menos:mejoras que hayan aumentado el valor de los bienes raíces reajustadas",
            "dataType": "number"
          },
          {
            "code": 1986,
            "operator": "-",
            "slot": 2,
            "label": "Menos:mejoras que hayan aumentado el valor de los bienes raíces reajustadas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 38,
        "type": "field",
        "text": "Mayor o menor valor percibido o devengado",
        "bold": false,
        "fields": [
          {
            "code": 1058,
            "operator": "",
            "slot": 0,
            "label": "Mayor o menor valor percibido o devengado",
            "dataType": "number"
          },
          {
            "code": 1987,
            "operator": "",
            "slot": 1,
            "label": "Mayor o menor valor percibido o devengado",
            "dataType": "number"
          },
          {
            "code": 1988,
            "operator": "=",
            "slot": 2,
            "label": "Mayor o menor valor percibido o devengado",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 39,
        "type": "field",
        "text": "Ingreso no renta equivalente a 8.000 UF o saldo del ejercicio anterior",
        "bold": false,
        "fields": [
          {
            "code": 1060,
            "operator": "",
            "slot": 0,
            "label": "Ingreso no renta equivalente a 8.000 UF o saldo del ejercicio anterior",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 40,
        "type": "field",
        "text": "Mayor valor percibido o devengado afecto a impuesto",
        "bold": false,
        "fields": [
          {
            "code": 1061,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor percibido o devengado afecto a impuesto",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 41,
        "type": "field",
        "text": "Saldo de ingreso no renta a utilizar en los ejercicios siguientes",
        "bold": false,
        "fields": [
          {
            "code": 1062,
            "operator": "",
            "slot": 0,
            "label": "Saldo de ingreso no renta a utilizar en los ejercicios siguientes",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 42,
        "type": "field",
        "text": "Mayor valor percibido en enajenaciones efectuadas en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1099,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor percibido en enajenaciones efectuadas en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 43,
        "type": "field",
        "text": "Mayor valor devengado en enajenaciones efectuadas en el ejercicio a declarar en el año tributario actual",
        "bold": false,
        "fields": [
          {
            "code": 1847,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor devengado en enajenaciones efectuadas en el ejercicio a declarar en el año tributario actual",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 44,
        "type": "field",
        "text": "Mayor valor devengado y no percibido en enajenaciones efectuadas en el ejercicio a declarar en los años tributarios siguientes",
        "bold": false,
        "fields": [
          {
            "code": 1100,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor devengado y no percibido en enajenaciones efectuadas en el ejercicio a declarar en los años tributarios siguientes",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 45,
        "type": "field",
        "text": "Mayor valor percibido en el ejercicio por enajenaciones efectuadas en el ejercicio anterior",
        "bold": false,
        "fields": [
          {
            "code": 1114,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor percibido en el ejercicio por enajenaciones efectuadas en el ejercicio anterior",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 46,
        "type": "sub_header",
        "text": "RÉGIMEN DE TRIBUTACIÓN",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 47,
        "type": "field",
        "text": "Mayor valor percibido según códigos 1099 y 1114 afecto a IGC o IA",
        "bold": false,
        "fields": [
          {
            "code": 1063,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor percibido según códigos 1099 y 1114 afecto a IGC o IA",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 48,
        "type": "field",
        "text": "Mayor valor devengado según código 1847 afecto a IGC",
        "bold": false,
        "fields": [
          {
            "code": 1064,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor devengado según código 1847 afecto a IGC",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 49,
        "type": "field",
        "text": "Mayor valor percibido según códigos 1099 y 1114 afecto al impuesto único y sustitutivo con tasa 10%",
        "bold": false,
        "fields": [
          {
            "code": 1065,
            "operator": "",
            "slot": 0,
            "label": "Mayor valor percibido según códigos 1099 y 1114 afecto al impuesto único y sustitutivo con tasa 10%",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 50,
        "type": "field",
        "text": "Mayor valor devengado según código 1987 afecto al IGC o IA",
        "bold": false,
        "fields": [
          {
            "code": 1989,
            "operator": "",
            "slot": 1,
            "label": "Mayor valor devengado según código 1987 afecto al IGC o IA",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 51,
        "type": "field",
        "text": "Mayor valor devengado según código 1988 afecto a IDPC e IGC o IA",
        "bold": false,
        "fields": [
          {
            "code": 1990,
            "operator": "",
            "slot": 2,
            "label": "Mayor valor devengado según código 1988 afecto a IDPC e IGC o IA",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 3",
    "title": "RECUADRO N° 3: DATOS SOBRE INSTRUMENTOS DE AHORRO ACOGIDOS AL EX ART. 57 BIS LIR (ART. 3° TRANSITORIO NUMERAL VI) LEY N° 20.780)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 54,
        "type": "field",
        "text": "Total ahorro neto positivo del ejercicio",
        "bold": true,
        "fields": [
          {
            "code": 701,
            "operator": "+",
            "slot": 0,
            "label": "Total ahorro neto positivo del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 55,
        "type": "field",
        "text": "Ahorro neto positivo utilizado en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 702,
            "operator": "-",
            "slot": 0,
            "label": "Ahorro neto positivo utilizado en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 56,
        "type": "field",
        "text": "Remanente ahorro neto positivo del ejercicio siguiente",
        "bold": false,
        "fields": [
          {
            "code": 703,
            "operator": "=",
            "slot": 0,
            "label": "Remanente ahorro neto positivo del ejercicio siguiente",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 57,
        "type": "field",
        "text": "Total ahorro neto negativo del ejercicio",
        "bold": true,
        "fields": [
          {
            "code": 704,
            "operator": "+",
            "slot": 0,
            "label": "Total ahorro neto negativo del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 58,
        "type": "field",
        "text": "Cuota exenta 10 UTA",
        "bold": false,
        "fields": [
          {
            "code": 930,
            "operator": "-",
            "slot": 0,
            "label": "Cuota exenta 10 UTA",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 59,
        "type": "field",
        "text": "Base para débito fiscal del ejercicio a registrar en código 201",
        "bold": false,
        "fields": [
          {
            "code": 705,
            "operator": "=",
            "slot": 0,
            "label": "Base para débito fiscal del ejercicio a registrar en código 201",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 4",
    "title": "RECUADRO N° 4: ENAJENACIÓN DE ACCIONES, DERECHOS SOCIALES, CUOTAS DE FONDOS MUTUOS Y/O DE INVERSIÓN",
    "columnHeaders": [
      "Mayor o menor valor determinado"
    ],
    "rows": [
      {
        "rowIndex": 62,
        "type": "sub_header",
        "text": "ENAJENACIÓN DE ACCIONES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 63,
        "type": "col_header",
        "text": "Régimen  tributario de la LIR",
        "bold": false,
        "fields": [],
        "colTexts": [
          "Mayor o menor valor determinado"
        ]
      },
      {
        "rowIndex": 64,
        "type": "field",
        "text": "IGC o IA sobre rentas percibidas, según código 1869",
        "bold": false,
        "fields": [
          {
            "code": 1070,
            "operator": "",
            "slot": 0,
            "label": "IGC o IA sobre rentas percibidas, según código 1869",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 65,
        "type": "field",
        "text": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
        "bold": false,
        "fields": [
          {
            "code": 1074,
            "operator": "",
            "slot": 0,
            "label": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 66,
        "type": "sub_header",
        "text": "ENAJENACIÓN DE DERECHOS SOCIALES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 67,
        "type": "sub_header",
        "text": "Régimen  tributario de la LIR",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 68,
        "type": "field",
        "text": "IGC o IA sobre rentas percibidas, según código 1869",
        "bold": false,
        "fields": [
          {
            "code": 1079,
            "operator": "",
            "slot": 0,
            "label": "IGC o IA sobre rentas percibidas, según código 1869",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 69,
        "type": "field",
        "text": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
        "bold": false,
        "fields": [
          {
            "code": 1083,
            "operator": "",
            "slot": 0,
            "label": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 70,
        "type": "sub_header",
        "text": "ENAJENACIÓN O RESCATE DE CUOTAS DE FONDOS MUTUOS Y/O FONDOS DE INVERSIÓN",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 71,
        "type": "sub_header",
        "text": "Régimen  tributario de la LIR",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 72,
        "type": "field",
        "text": "IGC o IA sobre rentas percibidas, según código 1869",
        "bold": false,
        "fields": [
          {
            "code": 1087,
            "operator": "",
            "slot": 0,
            "label": "IGC o IA sobre rentas percibidas, según código 1869",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 73,
        "type": "field",
        "text": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
        "bold": false,
        "fields": [
          {
            "code": 1131,
            "operator": "",
            "slot": 0,
            "label": "Opción a reliquidar el IGC sobre renta devengada, según código 1033",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 74,
        "type": "sub_header",
        "text": "ENAJENACIÓN O RESCATE DE INSTRUMENTOS SEGÚN ART. 107 LIR",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 75,
        "type": "sub_header",
        "text": "Instrumentos enajenados o rescatados",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 76,
        "type": "field",
        "text": "Acciones",
        "bold": false,
        "fields": [
          {
            "code": 1809,
            "operator": "",
            "slot": 0,
            "label": "Acciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 77,
        "type": "field",
        "text": "Cuotas de fondos mutuos y/o fondos de inversión",
        "bold": false,
        "fields": [
          {
            "code": 1813,
            "operator": "",
            "slot": 0,
            "label": "Cuotas de fondos mutuos y/o fondos de inversión",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 78,
        "type": "sub_header",
        "text": "DETERMINACIÓN DEL RESULTADO",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 79,
        "type": "field",
        "text": "Resultado neto de las operaciones del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1814,
            "operator": "",
            "slot": 0,
            "label": "Resultado neto de las operaciones del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 80,
        "type": "field",
        "text": "Pérdida de arrastre del ejercicio anterior actualizada",
        "bold": false,
        "fields": [
          {
            "code": 1815,
            "operator": "",
            "slot": 0,
            "label": "Pérdida de arrastre del ejercicio anterior actualizada",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 81,
        "type": "field",
        "text": "Base imponible o pérdida del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1816,
            "operator": "",
            "slot": 0,
            "label": "Base imponible o pérdida del ejercicio",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 5",
    "title": "RECUADRO N°5: CRÉDITO POR INGRESO DIFERIDO PROPIETARIOS DE EMPRESAS RÉGIMEN TRANSPARENCIA TRIBUTARIA, ART. 14 LETRA D) N°8 LIR",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 84,
        "type": "field",
        "text": "Remanente ejercicio anterior",
        "bold": false,
        "fields": [
          {
            "code": 1651,
            "operator": "+",
            "slot": 0,
            "label": "Remanente ejercicio anterior",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 85,
        "type": "field",
        "text": "Crédito recibido en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1652,
            "operator": "+",
            "slot": 0,
            "label": "Crédito recibido en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 86,
        "type": "field",
        "text": "Crédito imputado en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1653,
            "operator": "-",
            "slot": 0,
            "label": "Crédito imputado en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 87,
        "type": "field",
        "text": "Remanente para ejercicio siguiente",
        "bold": false,
        "fields": [
          {
            "code": 1654,
            "operator": "=",
            "slot": 0,
            "label": "Remanente para ejercicio siguiente",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 6",
    "title": "RECUADRO N° 6: DATOS INFORMATIVOS",
    "columnHeaders": [
      "",
      ""
    ],
    "rows": [
      {
        "rowIndex": 90,
        "type": "sub_header",
        "text": "OPERACIONES INTERNACIONALES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 91,
        "type": "field",
        "text": "Préstamos efectuados a propietarios, socios o accionistas en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 783,
            "operator": "",
            "slot": 1,
            "label": "Préstamos efectuados a propietarios, socios o accionistas en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 92,
        "type": "field",
        "text": "Total de cantidades adeudadas, pagadas, abonadas en cuenta o puestas a disposición de relacionados en el exterior (arts. 31 inc. 3° y 59 LIR)",
        "bold": true,
        "fields": [
          {
            "code": 976,
            "operator": "",
            "slot": 1,
            "label": "Total de cantidades adeudadas, pagadas, abonadas en cuenta o puestas a disposición de relacionados en el exterior (arts. 31 inc. 3° y 59 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 93,
        "type": "field",
        "text": "Cantidades adeudadas, pagadas, abonadas en cuenta o puestas a disposición de relacionados en el exterior, cuyo IA no ha sido enterado (arts. 31 inc.  3° y 59 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 978,
            "operator": "",
            "slot": 1,
            "label": "Cantidades adeudadas, pagadas, abonadas en cuenta o puestas a disposición de relacionados en el exterior, cuyo IA no ha sido enterado (arts. 31 inc.  3° y 59 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 94,
        "type": "field",
        "text": "Total pasivos contraídos en Chile",
        "bold": true,
        "fields": [
          {
            "code": 1020,
            "operator": "",
            "slot": 1,
            "label": "Total pasivos contraídos en Chile",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 95,
        "type": "field",
        "text": "Beneficio antes de gastos financieros (EBITDA)",
        "bold": false,
        "fields": [
          {
            "code": 1019,
            "operator": "",
            "slot": 1,
            "label": "Beneficio antes de gastos financieros (EBITDA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 96,
        "type": "field",
        "text": "Renta imponible extranjera (art. 41 A  N° 3 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 974,
            "operator": "",
            "slot": 1,
            "label": "Renta imponible extranjera (art. 41 A  N° 3 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 97,
        "type": "sub_header",
        "text": "DATOS DE BALANCE",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 98,
        "type": "field",
        "text": "Total del activo",
        "bold": true,
        "fields": [
          {
            "code": 122,
            "operator": "",
            "slot": 0,
            "label": "Bienes adquiridos contrato leasing",
            "dataType": "number"
          },
          {
            "code": 648,
            "operator": "",
            "slot": 1,
            "label": "Total del activo",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 99,
        "type": "field",
        "text": "Total del pasivo",
        "bold": true,
        "fields": [
          {
            "code": 123,
            "operator": "",
            "slot": 0,
            "label": "Activo inmovilizado",
            "dataType": "number"
          },
          {
            "code": 647,
            "operator": "",
            "slot": 1,
            "label": "Total del pasivo",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 100,
        "type": "field",
        "text": "Saldo de caja (sólo dinero en efectivo y documentos al día, según arqueo)",
        "bold": false,
        "fields": [
          {
            "code": 101,
            "operator": "",
            "slot": 0,
            "label": "Activo gasto diferido goodwill tributario",
            "dataType": "number"
          },
          {
            "code": 1003,
            "operator": "",
            "slot": 1,
            "label": "Saldo de caja (sólo dinero en efectivo y documentos al día, según arqueo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 101,
        "type": "field",
        "text": "Capital efectivo",
        "bold": false,
        "fields": [
          {
            "code": 102,
            "operator": "",
            "slot": 0,
            "label": "Activo intangible goodwill tributario (Ley N° 20.780)",
            "dataType": "number"
          },
          {
            "code": 1004,
            "operator": "",
            "slot": 1,
            "label": "Capital efectivo",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 102,
        "type": "field",
        "text": "Saldo cuenta corriente bancaria según, conciliación",
        "bold": false,
        "fields": [
          {
            "code": 784,
            "operator": "",
            "slot": 0,
            "label": "Patrimonio financiero",
            "dataType": "number"
          },
          {
            "code": 843,
            "operator": "",
            "slot": 1,
            "label": "Saldo cuenta corriente bancaria según, conciliación",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 103,
        "type": "field",
        "text": "Existencia final",
        "bold": false,
        "fields": [
          {
            "code": 129,
            "operator": "",
            "slot": 0,
            "label": "Existencia final",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 104,
        "type": "sub_header",
        "text": "OTROS ANTECEDENTES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 105,
        "type": "field",
        "text": "Utilidades financieras capitalizadas",
        "bold": false,
        "fields": [
          {
            "code": 1005,
            "operator": "",
            "slot": 1,
            "label": "Utilidades financieras capitalizadas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 106,
        "type": "field",
        "text": "Gastos adeudados o pagados por cuotas de bienes en leasing",
        "bold": false,
        "fields": [
          {
            "code": 975,
            "operator": "",
            "slot": 1,
            "label": "Gastos adeudados o pagados por cuotas de bienes en leasing",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 107,
        "type": "field",
        "text": "Monto del capital  directa o indirectamente financiado por partes relacionadas",
        "bold": false,
        "fields": [
          {
            "code": 1021,
            "operator": "",
            "slot": 1,
            "label": "Monto del capital  directa o indirectamente financiado por partes relacionadas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 108,
        "type": "field",
        "text": "TEX",
        "bold": false,
        "fields": [
          {
            "code": 1191,
            "operator": "",
            "slot": 1,
            "label": "TEX",
            "dataType": "number",
            "decimals": 6
          }
        ]
      },
      {
        "rowIndex": 109,
        "type": "field",
        "text": "TEF",
        "bold": false,
        "fields": [
          {
            "code": 1192,
            "operator": "",
            "slot": 1,
            "label": "TEF",
            "dataType": "number",
            "decimals": 6
          }
        ]
      },
      {
        "rowIndex": 110,
        "type": "field",
        "text": "Retiros, remesas o distribuciones afectos a IGC o IA, no Imputados a los RTRE",
        "bold": false,
        "fields": [
          {
            "code": 1193,
            "operator": "",
            "slot": 1,
            "label": "Retiros, remesas o distribuciones afectos a IGC o IA, no Imputados a los RTRE",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 111,
        "type": "field",
        "text": "Retiros, remesas o distribuciones afectos a IGC o IA, imputados a las utilidades de balance en exceso de las tributables (UBET)",
        "bold": false,
        "fields": [
          {
            "code": 1194,
            "operator": "",
            "slot": 1,
            "label": "Retiros, remesas o distribuciones afectos a IGC o IA, imputados a las utilidades de balance en exceso de las tributables (UBET)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 112,
        "type": "field",
        "text": "Depreciación acelerada vehículos eléctricos o híbridos con recarga eléctrica exterior u otros calificados como cero emisiones por resolución fundada del Ministerio de Energía (art. 8 Ley N° 21.305)",
        "bold": false,
        "fields": [
          {
            "code": 1782,
            "operator": "",
            "slot": 1,
            "label": "Depreciación acelerada vehículos eléctricos o híbridos con recarga eléctrica exterior u otros calificados como cero emisiones por resolución fundada del Ministerio de Energía (art. 8 Ley N° 21.305)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 113,
        "type": "field",
        "text": "Depreciación normal vehículos eléctricos o híbridos con recarga eléctrica exterior u otros calificados como cero emisiones por resolución fundada del Ministerio de Energía (art. 8 Ley N° 21.305)",
        "bold": false,
        "fields": [
          {
            "code": 1783,
            "operator": "",
            "slot": 1,
            "label": "Depreciación normal vehículos eléctricos o híbridos con recarga eléctrica exterior u otros calificados como cero emisiones por resolución fundada del Ministerio de Energía (art. 8 Ley N° 21.305)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 114,
        "type": "sub_header",
        "text": "SALDOS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 115,
        "type": "field",
        "text": "Saldo total de rentas exentas de IGC (art. 11 Ley N° 18.401, rentas del capitalismo popular)",
        "bold": false,
        "fields": [
          {
            "code": 1195,
            "operator": "",
            "slot": 1,
            "label": "Saldo total de rentas exentas de IGC (art. 11 Ley N° 18.401, rentas del capitalismo popular)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 116,
        "type": "field",
        "text": "Saldo exceso de retiros de 2014, determinados al 31 de diciembre para ejercicios siguientes",
        "bold": false,
        "fields": [
          {
            "code": 1691,
            "operator": "",
            "slot": 1,
            "label": "Saldo exceso de retiros de 2014, determinados al 31 de diciembre para ejercicios siguientes",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 117,
        "type": "field",
        "text": "Saldo de crédito por IDPC no sujetos a restitución generados hasta el 31.12.2019",
        "bold": false,
        "fields": [
          {
            "code": 1196,
            "operator": "",
            "slot": 1,
            "label": "Saldo de crédito por IDPC no sujetos a restitución generados hasta el 31.12.2019",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 118,
        "type": "field",
        "text": "Saldo de crédito por IDPC no sujetos a restitución generados a contar del 01.01.2020",
        "bold": false,
        "fields": [
          {
            "code": 1197,
            "operator": "",
            "slot": 1,
            "label": "Saldo de crédito por IDPC no sujetos a restitución generados a contar del 01.01.2020",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 119,
        "type": "field",
        "text": "Saldo crédito Impuesto Tasa Adicional ex art. 21 LIR",
        "bold": false,
        "fields": [
          {
            "code": 238,
            "operator": "",
            "slot": 1,
            "label": "Saldo crédito Impuesto Tasa Adicional ex art. 21 LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 120,
        "type": "field",
        "text": "Saldo de excedente base imponible IDPC voluntario a imputar ejercicio siguientes",
        "bold": false,
        "fields": [
          {
            "code": 1586,
            "operator": "",
            "slot": 1,
            "label": "Saldo de excedente base imponible IDPC voluntario a imputar ejercicio siguientes",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 121,
        "type": "sub_header",
        "text": "CUENTAS EN PARTICIPACIÓN Y DEMÁS ENCARGOS FIDUCIARIOS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 122,
        "type": "field",
        "text": "Saldo o aporte inicial del ejercicio de la asociación o cuentas en participación o del encargo fiduciario a informar por el gestor",
        "bold": false,
        "fields": [
          {
            "code": 1823,
            "operator": "",
            "slot": 1,
            "label": "Saldo o aporte inicial del ejercicio de la asociación o cuentas en participación o del encargo fiduciario a informar por el gestor",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 123,
        "type": "field",
        "text": "Saldo final del ejercicio de la asociación o cuentas en participación o del encargo fiduciario a informar por el gestor",
        "bold": false,
        "fields": [
          {
            "code": 1824,
            "operator": "",
            "slot": 1,
            "label": "Saldo final del ejercicio de la asociación o cuentas en participación o del encargo fiduciario a informar por el gestor",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 124,
        "type": "field",
        "text": "Credito por IDPC asignado en el ejercicio a los partícipes o beneficiarios de la asociación o cuentas en participación o del encargo fiduciario",
        "bold": false,
        "fields": [
          {
            "code": 1825,
            "operator": "",
            "slot": 1,
            "label": "Credito por IDPC asignado en el ejercicio a los partícipes o beneficiarios de la asociación o cuentas en participación o del encargo fiduciario",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 125,
        "type": "field",
        "text": "Crédito IPE asignado en el ejercicio a los partícipes o beneficiarios de la asociación o cuentas en participación o del encargo fiduciario",
        "bold": false,
        "fields": [
          {
            "code": 1826,
            "operator": "",
            "slot": 1,
            "label": "Crédito IPE asignado en el ejercicio a los partícipes o beneficiarios de la asociación o cuentas en participación o del encargo fiduciario",
            "dataType": "boolean"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 7",
    "title": "RECUADRO N° 7: INGRESO DIFERIDO Y SALDOS PENDIENTES DE AMORTIZACIÓN",
    "columnHeaders": [
      "Saldo de rentas tributables acumuladas",
      "Incremento",
      "Crédito",
      ""
    ],
    "rows": [
      {
        "rowIndex": 128,
        "type": "col_header",
        "text": "Detalle",
        "bold": false,
        "fields": [],
        "colTexts": [
          "Saldo de rentas tributables acumuladas",
          "Incremento",
          "Crédito",
          ""
        ]
      },
      {
        "rowIndex": 130,
        "type": "field",
        "text": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
        "bold": false,
        "fields": [
          {
            "code": 1358,
            "operator": "",
            "slot": 0,
            "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
            "dataType": "number"
          },
          {
            "code": 1359,
            "operator": "",
            "slot": 1,
            "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
            "dataType": "number"
          },
          {
            "code": 1360,
            "operator": "",
            "slot": 2,
            "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
            "dataType": "number"
          },
          {
            "code": 1361,
            "operator": "+",
            "slot": 3,
            "label": "Saldo de ingreso diferido pendiente de tributación de acuerdo al art. 14 letra D) N°8, letra (d) de la LIR, art. 40° transitorio  de la Ley N° 21.210 y Circular N° 62 de 2020",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 131,
        "type": "field",
        "text": "Ingreso  diferido a  imputar  en  el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1184,
            "operator": "",
            "slot": 0,
            "label": "Ingreso  diferido a  imputar  en  el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1362,
            "operator": "",
            "slot": 1,
            "label": "Ingreso  diferido a  imputar  en  el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1363,
            "operator": "",
            "slot": 2,
            "label": "Ingreso  diferido a  imputar  en  el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1364,
            "operator": "-",
            "slot": 3,
            "label": "Ingreso  diferido a  imputar  en  el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 132,
        "type": "field",
        "text": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
        "bold": true,
        "fields": [
          {
            "code": 1096,
            "operator": "",
            "slot": 0,
            "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
            "dataType": "number"
          },
          {
            "code": 1097,
            "operator": "",
            "slot": 1,
            "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
            "dataType": "number"
          },
          {
            "code": 1106,
            "operator": "",
            "slot": 2,
            "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
            "dataType": "number"
          },
          {
            "code": 1372,
            "operator": "=",
            "slot": 3,
            "label": "TOTAL Saldo ingreso diferido a imputar en los ejercicios siguientes",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 8",
    "title": "RECUADRO N° 8:  INFORMACIÓN SOBRE DONACIONES Y CRÉDITOS O REBAJAS IMPUTABLES AL IDPC",
    "columnHeaders": [
      "",
      "Total Gasto",
      "Gasto No Aceptado",
      "Crédito"
    ],
    "rows": [
      {
        "rowIndex": 135,
        "type": "sub_header",
        "text": "CRÉDITOS CUYOS REMANENTES NO DAN DERECHO A IMPUTACIÓN EN LOS EJERCICIOS SIGUIENTES NI A DEVOLUCIÓN",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 136,
        "type": "col_header",
        "text": "Detalle",
        "bold": false,
        "fields": [],
        "colTexts": [
          "",
          "Total Gasto",
          "Gasto No Aceptado",
          "Crédito"
        ]
      },
      {
        "rowIndex": 137,
        "type": "field",
        "text": "Donaciones al FNR, según arts. 4° y 9° Ley N° 20.444 (no afectas al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 994,
            "operator": "",
            "slot": 1,
            "label": "Donaciones al FNR, según arts. 4° y 9° Ley N° 20.444 (no afectas al LGA)",
            "dataType": "number"
          },
          {
            "code": 876,
            "operator": "",
            "slot": 2,
            "label": "Donaciones al FNR, según arts. 4° y 9° Ley N° 20.444 (no afectas al LGA)",
            "dataType": "number"
          },
          {
            "code": 898,
            "operator": "",
            "slot": 3,
            "label": "Donaciones al FNR, según arts. 4° y 9° Ley N° 20.444 (no afectas al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 138,
        "type": "field",
        "text": "Donaciones para fines culturales, según art. 8° Ley N° 18.985 (afectas al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 986,
            "operator": "",
            "slot": 1,
            "label": "Donaciones para fines culturales, según art. 8° Ley N° 18.985 (afectas al LGA)",
            "dataType": "number"
          },
          {
            "code": 990,
            "operator": "",
            "slot": 2,
            "label": "Donaciones para fines culturales, según art. 8° Ley N° 18.985 (afectas al LGA)",
            "dataType": "number"
          },
          {
            "code": 373,
            "operator": "",
            "slot": 3,
            "label": "Donaciones para fines culturales, según art. 8° Ley N° 18.985 (afectas al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 139,
        "type": "field",
        "text": "Donaciones para fines educacionales, según art. 3° Ley N° 19.247 (afectas al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 987,
            "operator": "",
            "slot": 1,
            "label": "Donaciones para fines educacionales, según art. 3° Ley N° 19.247 (afectas al LGA)",
            "dataType": "number"
          },
          {
            "code": 991,
            "operator": "",
            "slot": 2,
            "label": "Donaciones para fines educacionales, según art. 3° Ley N° 19.247 (afectas al LGA)",
            "dataType": "number"
          },
          {
            "code": 382,
            "operator": "",
            "slot": 3,
            "label": "Donaciones para fines educacionales, según art. 3° Ley N° 19.247 (afectas al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 140,
        "type": "field",
        "text": "Donaciones para fines deportivos, según art. 62 y sgtes. Ley N° 19.712 (afecta al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 988,
            "operator": "",
            "slot": 1,
            "label": "Donaciones para fines deportivos, según art. 62 y sgtes. Ley N° 19.712 (afecta al LGA)",
            "dataType": "number"
          },
          {
            "code": 1001,
            "operator": "",
            "slot": 2,
            "label": "Donaciones para fines deportivos, según art. 62 y sgtes. Ley N° 19.712 (afecta al LGA)",
            "dataType": "number"
          },
          {
            "code": 761,
            "operator": "",
            "slot": 3,
            "label": "Donaciones para fines deportivos, según art. 62 y sgtes. Ley N° 19.712 (afecta al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 141,
        "type": "field",
        "text": "Donaciones para fines sociales, según art. 1° y sgtes. Ley N° 19.885 (afecta al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 792,
            "operator": "",
            "slot": 1,
            "label": "Donaciones para fines sociales, según art. 1° y sgtes. Ley N° 19.885 (afecta al LGA)",
            "dataType": "number"
          },
          {
            "code": 794,
            "operator": "",
            "slot": 2,
            "label": "Donaciones para fines sociales, según art. 1° y sgtes. Ley N° 19.885 (afecta al LGA)",
            "dataType": "number"
          },
          {
            "code": 773,
            "operator": "",
            "slot": 3,
            "label": "Donaciones para fines sociales, según art. 1° y sgtes. Ley N° 19.885 (afecta al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 142,
        "type": "field",
        "text": "Crédito por impuesto territorial (contribuciones de bienes raíces)",
        "bold": false,
        "fields": [
          {
            "code": 365,
            "operator": "",
            "slot": 3,
            "label": "Crédito por impuesto territorial (contribuciones de bienes raíces)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 143,
        "type": "field",
        "text": "Crédito por bienes físicos del activo inmovilizado del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 366,
            "operator": "",
            "slot": 3,
            "label": "Crédito por bienes físicos del activo inmovilizado del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 144,
        "type": "field",
        "text": "Crédito por rentas de zonas francas",
        "bold": false,
        "fields": [
          {
            "code": 392,
            "operator": "",
            "slot": 3,
            "label": "Crédito por rentas de zonas francas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 145,
        "type": "field",
        "text": "Otras rebajas especiales",
        "bold": false,
        "fields": [
          {
            "code": 984,
            "operator": "",
            "slot": 3,
            "label": "Otras rebajas especiales",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 146,
        "type": "sub_header",
        "text": "CRÉDITOS CUYOS REMANENTES DAN  SOLO DERECHO A IMPUTACIÓN EN LOS EJERCICIOS SIGUIENTES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 147,
        "type": "field",
        "text": "Remanente de crédito por bienes físicos del activo inmovilizado proveniente de inversiones AT 1999 - 2002",
        "bold": false,
        "fields": [
          {
            "code": 839,
            "operator": "",
            "slot": 3,
            "label": "Remanente de crédito por bienes físicos del activo inmovilizado proveniente de inversiones AT 1999 - 2002",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 148,
        "type": "field",
        "text": "Donaciones a universidades, institutos profesionales y centros de formación técnica, según art. 69 Ley N° 18.681 (afectas al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 989,
            "operator": "",
            "slot": 1,
            "label": "Donaciones a universidades, institutos profesionales y centros de formación técnica, según art. 69 Ley N° 18.681 (afectas al LGA)",
            "dataType": "text"
          },
          {
            "code": 993,
            "operator": "",
            "slot": 2,
            "label": "Donaciones a universidades, institutos profesionales y centros de formación técnica, según art. 69 Ley N° 18.681 (afectas al LGA)",
            "dataType": "text"
          },
          {
            "code": 384,
            "operator": "",
            "slot": 3,
            "label": "Donaciones a universidades, institutos profesionales y centros de formación técnica, según art. 69 Ley N° 18.681 (afectas al LGA)",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 149,
        "type": "field",
        "text": "Monto inversión Ley Arica",
        "bold": false,
        "fields": [
          {
            "code": 815,
            "operator": "",
            "slot": 1,
            "label": "Monto inversión Ley Arica",
            "dataType": "number"
          },
          {
            "code": 390,
            "operator": "",
            "slot": 3,
            "label": "Monto inversión Ley Arica",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 150,
        "type": "field",
        "text": "Monto inversión  Ley Austral",
        "bold": false,
        "fields": [
          {
            "code": 741,
            "operator": "",
            "slot": 1,
            "label": "Monto inversión  Ley Austral",
            "dataType": "number"
          },
          {
            "code": 742,
            "operator": "",
            "slot": 3,
            "label": "Monto inversión  Ley Austral",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 151,
        "type": "field",
        "text": "Crédito por impuestos soportados en el extranjero, según art. 41 A LIR",
        "bold": false,
        "fields": [
          {
            "code": 841,
            "operator": "",
            "slot": 3,
            "label": "Crédito por impuestos soportados en el extranjero, según art. 41 A LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 152,
        "type": "field",
        "text": "Crédito por inversión privada en actividades de investigación y desarrollo Ley N° 20.241",
        "bold": false,
        "fields": [
          {
            "code": 855,
            "operator": "",
            "slot": 3,
            "label": "Crédito por inversión privada en actividades de investigación y desarrollo Ley N° 20.241",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 153,
        "type": "sub_header",
        "text": "CRÉDITO CUYO REMANENTE DA DERECHO A DEVOLUCIÓN",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 154,
        "type": "field",
        "text": "Crédito IEAM del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 828,
            "operator": "",
            "slot": 0,
            "label": "Crédito IEAM utilizado en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 830,
            "operator": "",
            "slot": 1,
            "label": "Crédito IEAM utilizado en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 829,
            "operator": "",
            "slot": 3,
            "label": "Remanente crédito IEAM a devolver a través de código 36",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 155,
        "type": "sub_header",
        "text": "OTRAS  DONACIONES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 156,
        "type": "sub_header",
        "text": "Detalle",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 157,
        "type": "field",
        "text": "Otras donaciones, según art. 10 Ley N° 19.885 (afecta al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 772,
            "operator": "",
            "slot": 1,
            "label": "Otras donaciones, según art. 10 Ley N° 19.885 (afecta al LGA)",
            "dataType": "number"
          },
          {
            "code": 811,
            "operator": "",
            "slot": 2,
            "label": "Otras donaciones, según art. 10 Ley N° 19.885 (afecta al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 158,
        "type": "field",
        "text": "Donaciones, según art. 7° Ley N° 16.282 (no afectas al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 873,
            "operator": "",
            "slot": 1,
            "label": "Donaciones, según art. 7° Ley N° 16.282 (no afectas al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 159,
        "type": "field",
        "text": "Donaciones, según art. 37 D.L. N° 1.939 de 1977 (no afectas al LGA) y según art. 68 Ley N° 19.300 (no afectas al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 1120,
            "operator": "",
            "slot": 1,
            "label": "Donaciones, según art. 37 D.L. N° 1.939 de 1977 (no afectas al LGA) y según art. 68 Ley N° 19.300 (no afectas al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 160,
        "type": "field",
        "text": "Donaciones, según Título VIII bis D.L. N° 3.063 de 1979 (no afectas al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 1838,
            "operator": "",
            "slot": 1,
            "label": "Donaciones, según Título VIII bis D.L. N° 3.063 de 1979 (no afectas al LGA)",
            "dataType": "number"
          },
          {
            "code": 1839,
            "operator": "",
            "slot": 2,
            "label": "Donaciones, según Título VIII bis D.L. N° 3.063 de 1979 (no afectas al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 161,
        "type": "field",
        "text": "Donaciones, según art. 18° Ley N° 21.258 (no afecta al LGA)",
        "bold": false,
        "fields": [
          {
            "code": 1775,
            "operator": "",
            "slot": 1,
            "label": "Donaciones, según art. 18° Ley N° 21.258 (no afecta al LGA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 162,
        "type": "field",
        "text": "Donaciones de bienes inmuebles en apoyo al plan de emergencia habitacional, art. 26 Ley N° 21.450",
        "bold": false,
        "fields": [
          {
            "code": 1911,
            "operator": "",
            "slot": 1,
            "label": "Donaciones de bienes inmuebles en apoyo al plan de emergencia habitacional, art. 26 Ley N° 21.450",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 163,
        "type": "field",
        "text": "Donaciones, según art.157 ter letra b) del Código del Trabajo",
        "bold": false,
        "fields": [
          {
            "code": 1992,
            "operator": "",
            "slot": 1,
            "label": "Donaciones, según art.157 ter letra b) del Código del Trabajo",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 165,
        "type": "field",
        "text": "Donaciones para fines culturales según art. 8° Ley N° 18.985",
        "bold": false,
        "fields": [
          {
            "code": 999,
            "operator": "",
            "slot": 1,
            "label": "Donaciones para fines culturales según art. 8° Ley N° 18.985",
            "dataType": "number"
          },
          {
            "code": 998,
            "operator": "",
            "slot": 2,
            "label": "Donaciones para fines culturales según art. 8° Ley N° 18.985",
            "dataType": "number"
          },
          {
            "code": 953,
            "operator": "",
            "slot": 3,
            "label": "Donaciones para fines culturales según art. 8° Ley N° 18.985",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 9",
    "title": "RECUADRO N° 9: REGISTRO FUR",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 168,
        "type": "field",
        "text": "Remanente FUR ejercicio anterior debidamente reajustado",
        "bold": false,
        "fields": [
          {
            "code": 1160,
            "operator": "+",
            "slot": 0,
            "label": "Remanente FUR ejercicio anterior debidamente reajustado",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 169,
        "type": "field",
        "text": "Rebaja FUR por devolución de capital, enajenación de acciones o derechos sociales y reorganización empresarial, debidamente reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1163,
            "operator": "-",
            "slot": 0,
            "label": "Rebaja FUR por devolución de capital, enajenación de acciones o derechos sociales y reorganización empresarial, debidamente reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 170,
        "type": "field",
        "text": "Rebaja FUR acogido a IS por devolución de capital, enajenación de acciones o derechos sociales y reorganización empresarial, debidamente reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1164,
            "operator": "-",
            "slot": 0,
            "label": "Rebaja FUR acogido a IS por devolución de capital, enajenación de acciones o derechos sociales y reorganización empresarial, debidamente reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 171,
        "type": "field",
        "text": "Aumento FUR por reorganización empresarial debidamente reajustado",
        "bold": false,
        "fields": [
          {
            "code": 1166,
            "operator": "+",
            "slot": 0,
            "label": "Aumento FUR por reorganización empresarial debidamente reajustado",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 172,
        "type": "field",
        "text": "Remanente para el ejercicio siguiente de rentas afectadas con IS",
        "bold": false,
        "fields": [
          {
            "code": 1168,
            "operator": "=",
            "slot": 0,
            "label": "Remanente para el ejercicio siguiente de rentas afectadas con IS",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 173,
        "type": "field",
        "text": "Remanente FUR para el ejercicio siguiente afectos a impuestos finales",
        "bold": false,
        "fields": [
          {
            "code": 1169,
            "operator": "=",
            "slot": 0,
            "label": "Remanente FUR para el ejercicio siguiente afectos a impuestos finales",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 174,
        "type": "field",
        "text": "Remanente FUR para el ejercicio siguiente exentos e INR",
        "bold": false,
        "fields": [
          {
            "code": 1170,
            "operator": "=",
            "slot": 0,
            "label": "Remanente FUR para el ejercicio siguiente exentos e INR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 175,
        "type": "field",
        "text": "Remanente crédito IDPC ejercicio anterior debidamente reajustado",
        "bold": false,
        "fields": [
          {
            "code": 1171,
            "operator": "+",
            "slot": 0,
            "label": "Remanente crédito IDPC ejercicio anterior debidamente reajustado",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 176,
        "type": "field",
        "text": "Crédito por IDPC utilizado en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1172,
            "operator": "-",
            "slot": 0,
            "label": "Crédito por IDPC utilizado en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 177,
        "type": "field",
        "text": "Crédito por IDPC recibido en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1173,
            "operator": "+",
            "slot": 0,
            "label": "Crédito por IDPC recibido en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 178,
        "type": "field",
        "text": "Remanente crédito por IDPC para el ejercicio siguiente",
        "bold": false,
        "fields": [
          {
            "code": 1174,
            "operator": "=",
            "slot": 0,
            "label": "Remanente crédito por IDPC para el ejercicio siguiente",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 10",
    "title": "RECUADRO Nº 10: DEPRECIACIÓN",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 181,
        "type": "field",
        "text": "Cantidad de bienes del activo inmovilizado",
        "bold": false,
        "fields": [
          {
            "code": 940,
            "operator": "",
            "slot": 0,
            "label": "Cantidad de bienes del activo inmovilizado",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 182,
        "type": "field",
        "text": "Depreciación acelerada en 1/3  vida útil, del ejercicio (art. 31 N° 5 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 938,
            "operator": "+",
            "slot": 0,
            "label": "Depreciación acelerada en 1/3  vida útil, del ejercicio (art. 31 N° 5 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 183,
        "type": "field",
        "text": "Depreciación acelerada en 1/10 vida útil, del ejercicio (art. 31 N° 5 bis LIR)",
        "bold": false,
        "fields": [
          {
            "code": 949,
            "operator": "+",
            "slot": 0,
            "label": "Depreciación acelerada en 1/10 vida útil, del ejercicio (art. 31 N° 5 bis LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 184,
        "type": "field",
        "text": "Total depreciación normal de los bienes con depreciación acelerada informada en los códigos 938, 949",
        "bold": true,
        "fields": [
          {
            "code": 950,
            "operator": "-",
            "slot": 0,
            "label": "Total depreciación normal de los bienes con depreciación acelerada informada en los códigos 938, 949",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 185,
        "type": "field",
        "text": "Diferencia entre depreciaciones aceleradas y normales del ejercicio, anteriores",
        "bold": false,
        "fields": [
          {
            "code": 1066,
            "operator": "=",
            "slot": 0,
            "label": "Diferencia entre depreciaciones aceleradas y normales del ejercicio, anteriores",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 11",
    "title": "RECUADRO N° 11: ROYALTY MINERO",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 188,
        "type": "sub_header",
        "text": "ANTECEDENTES IEAM EX ARTS. 64 BIS y 64 TER LIR (CONTRIBUYENTES CON INVARIABILIDAD TRIBUTARIA VIGENTE)",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 189,
        "type": "field",
        "text": "Agregados a la RLI (o pérdida tributaria) de primera categoría, según ex. art. 64 ter LIR",
        "bold": false,
        "fields": [
          {
            "code": 884,
            "operator": "",
            "slot": 0,
            "label": "Agregados a la RLI (o pérdida tributaria) de primera categoría, según ex. art. 64 ter LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 190,
        "type": "field",
        "text": "Deducciones a la RLI (o pérdida tributaria) de primera categoría, según ex. art. 64 ter LIR",
        "bold": false,
        "fields": [
          {
            "code": 885,
            "operator": "",
            "slot": 0,
            "label": "Deducciones a la RLI (o pérdida tributaria) de primera categoría, según ex. art. 64 ter LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 191,
        "type": "field",
        "text": "Ventas expresadas en TMCF, según ex. art. 64 bis LIR",
        "bold": false,
        "fields": [
          {
            "code": 886,
            "operator": "",
            "slot": 0,
            "label": "Ventas expresadas en TMCF, según ex. art. 64 bis LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 192,
        "type": "field",
        "text": "Ventas de relacionados expresadas en TMCF, según ex art. 64 bis LIR",
        "bold": false,
        "fields": [
          {
            "code": 985,
            "operator": "",
            "slot": 0,
            "label": "Ventas de relacionados expresadas en TMCF, según ex art. 64 bis LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 193,
        "type": "field",
        "text": "Margen operacional minero, según ex. art. 64 bis LIR",
        "bold": false,
        "fields": [
          {
            "code": 887,
            "operator": "",
            "slot": 0,
            "label": "Margen operacional minero, según ex. art. 64 bis LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 194,
        "type": "sub_header",
        "text": "ANTECEDENTES ROYALTY MINERO LEY N° 21.591",
        "bold": false,
        "fields": []
      }
    ]
  },
  {
    "id": "RECUADRO 12",
    "title": "Renta líquida imponible o pérdida tributaria, arts. 29 al 33 LIR (código 1728 recuadro N° 12)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 196,
        "type": "sub_header",
        "text": "AGREGADOS PARA LA DETERMINACIÓN DE LA RIOMA (ART. 6 LEY N° 21.591 Y ART. 58 LEY N° 20.551)",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 197,
        "type": "field",
        "text": "Componente sobre la rentabilidad, según art. 3 o art. 4 Ley N° 21.591",
        "bold": false,
        "fields": [
          {
            "code": 1954,
            "operator": "+",
            "slot": 0,
            "label": "Componente sobre la rentabilidad, según art. 3 o art. 4 Ley N° 21.591",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 198,
        "type": "field",
        "text": "Costos asociados a ingresos no operacionales mineros",
        "bold": false,
        "fields": [
          {
            "code": 1955,
            "operator": "+",
            "slot": 0,
            "label": "Costos asociados a ingresos no operacionales mineros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 199,
        "type": "field",
        "text": "Gastos asociados a ingresos no operacionales mineros",
        "bold": false,
        "fields": [
          {
            "code": 1956,
            "operator": "+",
            "slot": 0,
            "label": "Gastos asociados a ingresos no operacionales mineros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 200,
        "type": "field",
        "text": "Proporción gastos de imputación común que no sean asignables exclusivamente a un determinado tipo de ingresos",
        "bold": false,
        "fields": [
          {
            "code": 1957,
            "operator": "+",
            "slot": 0,
            "label": "Proporción gastos de imputación común que no sean asignables exclusivamente a un determinado tipo de ingresos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 201,
        "type": "field",
        "text": "Gastos de intereses",
        "bold": false,
        "fields": [
          {
            "code": 1958,
            "operator": "+",
            "slot": 0,
            "label": "Gastos de intereses",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 202,
        "type": "field",
        "text": "Depreciación acelerada",
        "bold": false,
        "fields": [
          {
            "code": 1959,
            "operator": "+",
            "slot": 0,
            "label": "Depreciación acelerada",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 203,
        "type": "field",
        "text": "Pérdida de ejercicios anteriores",
        "bold": false,
        "fields": [
          {
            "code": 1960,
            "operator": "+",
            "slot": 0,
            "label": "Pérdida de ejercicios anteriores",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 204,
        "type": "field",
        "text": "Gastos de organización y puesta en marcha",
        "bold": false,
        "fields": [
          {
            "code": 1961,
            "operator": "+",
            "slot": 0,
            "label": "Gastos de organización y puesta en marcha",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 205,
        "type": "field",
        "text": "Contratos de avío y otras contraprestaciones",
        "bold": false,
        "fields": [
          {
            "code": 1962,
            "operator": "+",
            "slot": 0,
            "label": "Contratos de avío y otras contraprestaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 206,
        "type": "field",
        "text": "Cierre de faenas (art 58 de la Ley N° 20.551)",
        "bold": false,
        "fields": [
          {
            "code": 1963,
            "operator": "+",
            "slot": 0,
            "label": "Cierre de faenas (art 58 de la Ley N° 20.551)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 207,
        "type": "sub_header",
        "text": "DEDUCCIONES PARA LA DETERMINACIÓN DE LA RIOMA ART. 6 LEY N° 21.591",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 208,
        "type": "field",
        "text": "Ingresos no operacionales mineros",
        "bold": false,
        "fields": [
          {
            "code": 1964,
            "operator": "-",
            "slot": 0,
            "label": "Ingresos no operacionales mineros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 209,
        "type": "field",
        "text": "Cuota depreciación normal",
        "bold": false,
        "fields": [
          {
            "code": 1965,
            "operator": "-",
            "slot": 0,
            "label": "Cuota depreciación normal",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 210,
        "type": "field",
        "text": "Cuota gastos de organización y puesta en marcha",
        "bold": false,
        "fields": [
          {
            "code": 1966,
            "operator": "-",
            "slot": 0,
            "label": "Cuota gastos de organización y puesta en marcha",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 211,
        "type": "field",
        "text": "Renta imponible operacional minera ajustada (RIOMA)",
        "bold": false,
        "fields": [
          {
            "code": 1967,
            "operator": "=",
            "slot": 0,
            "label": "Renta imponible operacional minera ajustada (RIOMA)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 212,
        "type": "sub_header",
        "text": "OTROS ANTECEDENTES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 213,
        "type": "field",
        "text": "Promedio TMCF (incluídos los ingresos de explotadores mineros relacionados) art. 5 Ley N° 21.591",
        "bold": false,
        "fields": [
          {
            "code": 1968,
            "operator": "",
            "slot": 0,
            "label": "Promedio TMCF (incluídos los ingresos de explotadores mineros relacionados) art. 5 Ley N° 21.591",
            "dataType": "number",
            "decimals": 2
          }
        ]
      },
      {
        "rowIndex": 214,
        "type": "field",
        "text": "Total ingresos de productos mineros del ejercicio (indistintamente del mineral de que se trata)",
        "bold": true,
        "fields": [
          {
            "code": 1969,
            "operator": "",
            "slot": 0,
            "label": "Total ingresos de productos mineros del ejercicio (indistintamente del mineral de que se trata)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 215,
        "type": "field",
        "text": "Total ingresos de productos mineros del ejercicio (solo cobre)",
        "bold": true,
        "fields": [
          {
            "code": 1970,
            "operator": "",
            "slot": 0,
            "label": "Total ingresos de productos mineros del ejercicio (solo cobre)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 216,
        "type": "field",
        "text": "Margen operacional minero según N° 6 del art 1 Ley N° 21.591",
        "bold": false,
        "fields": [
          {
            "code": 1971,
            "operator": "",
            "slot": 0,
            "label": "Margen operacional minero según N° 6 del art 1 Ley N° 21.591",
            "dataType": "number",
            "decimals": 1
          }
        ]
      },
      {
        "rowIndex": 217,
        "type": "field",
        "text": "Tasa componente sobre la rentabilidad, según art. 3 o art. 4 Ley N° 21.591",
        "bold": false,
        "fields": [
          {
            "code": 1972,
            "operator": "",
            "slot": 0,
            "label": "Tasa componente sobre la rentabilidad, según art. 3 o art. 4 Ley N° 21.591",
            "dataType": "number",
            "decimals": 2
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 12",
    "title": "RECUADRO N° 12: BASE IMPONIBLE DE PRIMERA CATEGORÍA (ART. 14 LETRAS  A) O G) LIR)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 220,
        "type": "sub_header",
        "text": "RESULTADO FINANCIERO",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 221,
        "type": "field",
        "text": "Ingresos del giro percibidos o devengados",
        "bold": false,
        "fields": [
          {
            "code": 1657,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos del giro percibidos o devengados",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 222,
        "type": "field",
        "text": "Rentas de fuente extranjera",
        "bold": false,
        "fields": [
          {
            "code": 1658,
            "operator": "+",
            "slot": 0,
            "label": "Rentas de fuente extranjera",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 223,
        "type": "field",
        "text": "Intereses percibidos o devengados",
        "bold": false,
        "fields": [
          {
            "code": 1659,
            "operator": "+",
            "slot": 0,
            "label": "Intereses percibidos o devengados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 224,
        "type": "field",
        "text": "Otros ingresos percibidos o devengados",
        "bold": false,
        "fields": [
          {
            "code": 1660,
            "operator": "+",
            "slot": 0,
            "label": "Otros ingresos percibidos o devengados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 225,
        "type": "field",
        "text": "Costo directo de los bienes y servicios",
        "bold": false,
        "fields": [
          {
            "code": 1661,
            "operator": "-",
            "slot": 0,
            "label": "Costo directo de los bienes y servicios",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 226,
        "type": "field",
        "text": "Remuneraciones",
        "bold": false,
        "fields": [
          {
            "code": 1662,
            "operator": "-",
            "slot": 0,
            "label": "Remuneraciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 227,
        "type": "field",
        "text": "Arriendos",
        "bold": false,
        "fields": [
          {
            "code": 1140,
            "operator": "-",
            "slot": 0,
            "label": "Arriendos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 228,
        "type": "field",
        "text": "Depreciación financiera del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1663,
            "operator": "-",
            "slot": 0,
            "label": "Depreciación financiera del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 229,
        "type": "field",
        "text": "Intereses pagados o adeudados",
        "bold": false,
        "fields": [
          {
            "code": 1664,
            "operator": "-",
            "slot": 0,
            "label": "Intereses pagados o adeudados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 230,
        "type": "field",
        "text": "Gastos por donaciones",
        "bold": false,
        "fields": [
          {
            "code": 1665,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por donaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 231,
        "type": "field",
        "text": "Otros gastos financieros",
        "bold": false,
        "fields": [
          {
            "code": 1666,
            "operator": "-",
            "slot": 0,
            "label": "Otros gastos financieros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 232,
        "type": "field",
        "text": "Gastos por inversión privada en investigación y desarrollo certificados por CORFO",
        "bold": false,
        "fields": [
          {
            "code": 1667,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por inversión privada en investigación y desarrollo certificados por CORFO",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 233,
        "type": "field",
        "text": "Gastos por inversión privada en Investigación y desarrollo no certificados por CORFO",
        "bold": false,
        "fields": [
          {
            "code": 1668,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por inversión privada en Investigación y desarrollo no certificados por CORFO",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 234,
        "type": "field",
        "text": "Gastos por exigencias medio ambientales",
        "bold": false,
        "fields": [
          {
            "code": 1141,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por exigencias medio ambientales",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 235,
        "type": "field",
        "text": "Gasto por indemnización o compensación a clientes o usuarios",
        "bold": false,
        "fields": [
          {
            "code": 1142,
            "operator": "-",
            "slot": 0,
            "label": "Gasto por indemnización o compensación a clientes o usuarios",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 236,
        "type": "field",
        "text": "Costos y gastos necesarios para producir las rentas de fuente extranjera",
        "bold": false,
        "fields": [
          {
            "code": 1669,
            "operator": "-",
            "slot": 0,
            "label": "Costos y gastos necesarios para producir las rentas de fuente extranjera",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 237,
        "type": "field",
        "text": "Gastos por impuesto renta e impuesto diferido",
        "bold": false,
        "fields": [
          {
            "code": 1670,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por impuesto renta e impuesto diferido",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 238,
        "type": "field",
        "text": "Otros gastos deducidos de los ingresos brutos",
        "bold": false,
        "fields": [
          {
            "code": 1671,
            "operator": "-",
            "slot": 0,
            "label": "Otros gastos deducidos de los ingresos brutos",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 239,
        "type": "field",
        "text": "Resultado financiero",
        "bold": false,
        "fields": [
          {
            "code": 1672,
            "operator": "=",
            "slot": 0,
            "label": "Resultado financiero",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 240,
        "type": "sub_header",
        "text": "AJUSTES AL RESULTADO FINANCIERO",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 241,
        "type": "field",
        "text": "Corrección monetaria saldo deudor (art. 32 N° 1 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1673,
            "operator": "-",
            "slot": 0,
            "label": "Corrección monetaria saldo deudor (art. 32 N° 1 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 242,
        "type": "field",
        "text": "Corrección monetaria saldo acreedor (art. 32 N° 2 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1674,
            "operator": "+",
            "slot": 0,
            "label": "Corrección monetaria saldo acreedor (art. 32 N° 2 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 243,
        "type": "field",
        "text": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1144,
            "operator": "+",
            "slot": 0,
            "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 244,
        "type": "field",
        "text": "Depreciación financiera del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1675,
            "operator": "+",
            "slot": 0,
            "label": "Depreciación financiera del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 245,
        "type": "field",
        "text": "Estimación y/o castigos de deudas incobrables, según criterios financieros",
        "bold": false,
        "fields": [
          {
            "code": 1175,
            "operator": "+",
            "slot": 0,
            "label": "Estimación y/o castigos de deudas incobrables, según criterios financieros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 246,
        "type": "field",
        "text": "Rentas tributables no reconocidas financieramente",
        "bold": false,
        "fields": [
          {
            "code": 1676,
            "operator": "+",
            "slot": 0,
            "label": "Rentas tributables no reconocidas financieramente",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 247,
        "type": "field",
        "text": "Gastos agregados por donaciones",
        "bold": false,
        "fields": [
          {
            "code": 1677,
            "operator": "+",
            "slot": 0,
            "label": "Gastos agregados por donaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 248,
        "type": "field",
        "text": "Gastos que se deben agregar a la RLI según el art. 33 N° 1 LIR",
        "bold": false,
        "fields": [
          {
            "code": 1678,
            "operator": "+",
            "slot": 0,
            "label": "Gastos que se deben agregar a la RLI según el art. 33 N° 1 LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 249,
        "type": "field",
        "text": "Ingreso diferido por cambio de régimen",
        "bold": false,
        "fields": [
          {
            "code": 1150,
            "operator": "+",
            "slot": 0,
            "label": "Ingreso diferido por cambio de régimen",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 250,
        "type": "field",
        "text": "Costos y gastos asociados a  ingresos no renta (art. 17 LIR), generados",
        "bold": false,
        "fields": [
          {
            "code": 1147,
            "operator": "+",
            "slot": 0,
            "label": "Costos y gastos asociados a  ingresos no renta (art. 17 LIR), generados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 251,
        "type": "field",
        "text": "Proporcionalidad gastos imputados a ingresos no renta y/o rentas exentas",
        "bold": false,
        "fields": [
          {
            "code": 1148,
            "operator": "+",
            "slot": 0,
            "label": "Proporcionalidad gastos imputados a ingresos no renta y/o rentas exentas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 252,
        "type": "field",
        "text": "Intereses devengados por inversiones en bonos del art. 104 LIR",
        "bold": false,
        "fields": [
          {
            "code": 1149,
            "operator": "+",
            "slot": 0,
            "label": "Intereses devengados por inversiones en bonos del art. 104 LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 253,
        "type": "field",
        "text": "Ingresos devengados por cambio de régimen",
        "bold": false,
        "fields": [
          {
            "code": 1151,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos devengados por cambio de régimen",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 254,
        "type": "field",
        "text": "Ajustes por precios de transferencia, según art. 41 E LIR",
        "bold": false,
        "fields": [
          {
            "code": 1991,
            "operator": "+",
            "slot": 0,
            "label": "Ajustes por precios de transferencia, según art. 41 E LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 255,
        "type": "field",
        "text": "Gastos adeudados por cambio de régimen",
        "bold": false,
        "fields": [
          {
            "code": 1152,
            "operator": "-",
            "slot": 0,
            "label": "Gastos adeudados por cambio de régimen",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 256,
        "type": "field",
        "text": "Castigo de deudas incobrables, según art. 31 inc. 4° N° 4 LIR",
        "bold": false,
        "fields": [
          {
            "code": 1176,
            "operator": "-",
            "slot": 0,
            "label": "Castigo de deudas incobrables, según art. 31 inc. 4° N° 4 LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 257,
        "type": "field",
        "text": "Depreciación tributaria del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1679,
            "operator": "-",
            "slot": 0,
            "label": "Depreciación tributaria del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 258,
        "type": "field",
        "text": "Gasto goodwill tributario del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1680,
            "operator": "-",
            "slot": 0,
            "label": "Gasto goodwill tributario del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 259,
        "type": "field",
        "text": "Impuesto específico a la actividad minera",
        "bold": false,
        "fields": [
          {
            "code": 1681,
            "operator": "-",
            "slot": 0,
            "label": "Impuesto específico a la actividad minera",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 260,
        "type": "field",
        "text": "Componente ad valorem del royalty minero según art. 2 Ley N° 21.591",
        "bold": false,
        "fields": [
          {
            "code": 1974,
            "operator": "-",
            "slot": 0,
            "label": "Componente ad valorem del royalty minero según art. 2 Ley N° 21.591",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 261,
        "type": "field",
        "text": "Componente sobre la rentabilidad del royalty minero según art. 3 o art. 4 Ley N° 21.591",
        "bold": false,
        "fields": [
          {
            "code": 1975,
            "operator": "-",
            "slot": 0,
            "label": "Componente sobre la rentabilidad del royalty minero según art. 3 o art. 4 Ley N° 21.591",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 262,
        "type": "field",
        "text": "Gastos rechazados afectos a la tributación del art. 21 inc. 1°  LIR",
        "bold": false,
        "fields": [
          {
            "code": 1682,
            "operator": "-",
            "slot": 0,
            "label": "Gastos rechazados afectos a la tributación del art. 21 inc. 1°  LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 263,
        "type": "field",
        "text": "Gastos rechazados afectos a la tributación del art. 21 inc. 3° LIR",
        "bold": false,
        "fields": [
          {
            "code": 1683,
            "operator": "-",
            "slot": 0,
            "label": "Gastos rechazados afectos a la tributación del art. 21 inc. 3° LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 264,
        "type": "field",
        "text": "Otras partidas",
        "bold": false,
        "fields": [
          {
            "code": 1684,
            "operator": "-",
            "slot": 0,
            "label": "Otras partidas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 265,
        "type": "field",
        "text": "Rentas exentas IDPC (art. 33 N°2 LIR )",
        "bold": false,
        "fields": [
          {
            "code": 1685,
            "operator": "-",
            "slot": 0,
            "label": "Rentas exentas IDPC (art. 33 N°2 LIR )",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 266,
        "type": "field",
        "text": "Dividendos y/o utilidades sociales percibidos o devengados (art. 33 N° 2 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1686,
            "operator": "-",
            "slot": 0,
            "label": "Dividendos y/o utilidades sociales percibidos o devengados (art. 33 N° 2 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 267,
        "type": "field",
        "text": "Dividendos y/o utilidades sociales percibidas o devengadas (art. 33 N° 2 LIR), ingresos no renta",
        "bold": false,
        "fields": [
          {
            "code": 1183,
            "operator": "-",
            "slot": 0,
            "label": "Dividendos y/o utilidades sociales percibidas o devengadas (art. 33 N° 2 LIR), ingresos no renta",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 268,
        "type": "field",
        "text": "Gastos aceptados por donaciones",
        "bold": false,
        "fields": [
          {
            "code": 1687,
            "operator": "-",
            "slot": 0,
            "label": "Gastos aceptados por donaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 269,
        "type": "field",
        "text": "Ingresos no renta, generados (art. 17 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1688,
            "operator": "-",
            "slot": 0,
            "label": "Ingresos no renta, generados (art. 17 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 270,
        "type": "field",
        "text": "Pérdidas de ejercicios anteriores (art. 31 N° 3 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1689,
            "operator": "-",
            "slot": 0,
            "label": "Pérdidas de ejercicios anteriores (art. 31 N° 3 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 271,
        "type": "field",
        "text": "Renta líquida imponible antes de rebaja por incentivo al ahorro (art. 14 letra E) LIR) y/o por pago de IDPC voluntario (art. 14 letra A) N°6 LIR y art. 42° transitorio Ley N° 21.210) o pérdida tributaria",
        "bold": false,
        "fields": [
          {
            "code": 1728,
            "operator": "=",
            "slot": 0,
            "label": "Renta líquida imponible antes de rebaja por incentivo al ahorro (art. 14 letra E) LIR) y/o por pago de IDPC voluntario (art. 14 letra A) N°6 LIR y art. 42° transitorio Ley N° 21.210) o pérdida tributaria",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 272,
        "type": "field",
        "text": "Incentivo al ahorro según art. 14 letra E) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1154,
            "operator": "-",
            "slot": 0,
            "label": "Incentivo al ahorro según art. 14 letra E) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 273,
        "type": "field",
        "text": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR y art. 42° transitorio Ley N° 21.210",
        "bold": false,
        "fields": [
          {
            "code": 1157,
            "operator": "-",
            "slot": 0,
            "label": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR y art. 42° transitorio Ley N° 21.210",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 274,
        "type": "field",
        "text": "Renta líquida imponible afecta a IDPC o pérdida tributaria del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1690,
            "operator": "=",
            "slot": 0,
            "label": "Renta líquida imponible afecta a IDPC o pérdida tributaria del ejercicio",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 13",
    "title": "RECUADRO Nº 13: DETERMINACIÓN DEL RAI (ART. 14 LETRA A) LIR)",
    "columnHeaders": [],
    "rows": []
  },
  {
    "id": "RECUADRO 14",
    "title": "CPT positivo final (recuadro N° 14)",
    "columnHeaders": [],
    "rows": []
  },
  {
    "id": "RECUADRO 14",
    "title": "CPT negativo final (recuadro N° 14)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 279,
        "type": "field",
        "text": "Saldo negativo del registro REX al término del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1692,
            "operator": "+",
            "slot": 0,
            "label": "Saldo negativo del registro REX al término del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 280,
        "type": "field",
        "text": "Remesas, retiros o dividendos repartidos en el ejercicio, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1699,
            "operator": "+",
            "slot": 0,
            "label": "Remesas, retiros o dividendos repartidos en el ejercicio, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 281,
        "type": "field",
        "text": "Subtotal",
        "bold": true,
        "fields": [
          {
            "code": 1718,
            "operator": "=",
            "slot": 0,
            "label": "Subtotal",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 282,
        "type": "field",
        "text": "Saldo positivo del registro REX al término del ejercicio, antes de imputaciones",
        "bold": false,
        "fields": [
          {
            "code": 1693,
            "operator": "-",
            "slot": 0,
            "label": "Saldo positivo del registro REX al término del ejercicio, antes de imputaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 283,
        "type": "field",
        "text": "Capital aportado debidamente reajustado (incluye aumentos y disminuciones efectivas)",
        "bold": false,
        "fields": [
          {
            "code": 844,
            "operator": "-",
            "slot": 0,
            "label": "Capital aportado debidamente reajustado (incluye aumentos y disminuciones efectivas)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 284,
        "type": "field",
        "text": "Saldo FUR  (cuando no haya sido considerado dentro del valor del capital aportado a la empresa)",
        "bold": false,
        "fields": [
          {
            "code": 982,
            "operator": "-",
            "slot": 0,
            "label": "Saldo FUR  (cuando no haya sido considerado dentro del valor del capital aportado a la empresa)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 285,
        "type": "field",
        "text": "Sobreprecio obtenido en la colocación de acciones de propia emisión, debidamente reajustado",
        "bold": false,
        "fields": [
          {
            "code": 1198,
            "operator": "-",
            "slot": 0,
            "label": "Sobreprecio obtenido en la colocación de acciones de propia emisión, debidamente reajustado",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 286,
        "type": "field",
        "text": "Rentas afectas a IGC o IA (RAI) del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1199,
            "operator": "=",
            "slot": 0,
            "label": "Rentas afectas a IGC o IA (RAI) del ejercicio",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 14",
    "title": "RECUADRO Nº 14:  RAZONABILIDAD CAPITAL PROPIO TRIBUTARIO (ART. 14 LETRA A) O G) LIR)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 289,
        "type": "field",
        "text": "CPT positivo inicial",
        "bold": false,
        "fields": [
          {
            "code": 1145,
            "operator": "+",
            "slot": 0,
            "label": "CPT positivo inicial",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 290,
        "type": "field",
        "text": "CPT negativo inicial",
        "bold": false,
        "fields": [
          {
            "code": 1146,
            "operator": "-",
            "slot": 0,
            "label": "CPT negativo inicial",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 291,
        "type": "field",
        "text": "Corrección monetaria capital propio tributario inicial",
        "bold": false,
        "fields": [
          {
            "code": 1177,
            "operator": "+",
            "slot": 0,
            "label": "Corrección monetaria capital propio tributario inicial",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 292,
        "type": "field",
        "text": "Aumentos (efectivos) de capital del ejercicio, actualizados",
        "bold": false,
        "fields": [
          {
            "code": 893,
            "operator": "+",
            "slot": 0,
            "label": "Aumentos (efectivos) de capital del ejercicio, actualizados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 293,
        "type": "field",
        "text": "Disminuciones (efectivas) de capital del ejercicio, actualizadas",
        "bold": false,
        "fields": [
          {
            "code": 894,
            "operator": "-",
            "slot": 0,
            "label": "Disminuciones (efectivas) de capital del ejercicio, actualizadas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 294,
        "type": "field",
        "text": "Renta líquida imponible afecta a IDPC del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1694,
            "operator": "+",
            "slot": 0,
            "label": "Renta líquida imponible afecta a IDPC del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 295,
        "type": "field",
        "text": "Pérdida tributaria del ejercicio al 31 de diciembre",
        "bold": false,
        "fields": [
          {
            "code": 1695,
            "operator": "-",
            "slot": 0,
            "label": "Pérdida tributaria del ejercicio al 31 de diciembre",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 296,
        "type": "field",
        "text": "Pérdidas de ejercicios anteriores (art. 31 N° 3 LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1696,
            "operator": "+",
            "slot": 0,
            "label": "Pérdidas de ejercicios anteriores (art. 31 N° 3 LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 297,
        "type": "field",
        "text": "Rentas exentas del IDPC e ingresos no renta (positivo), generados por la empresa en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1178,
            "operator": "+",
            "slot": 0,
            "label": "Rentas exentas del IDPC e ingresos no renta (positivo), generados por la empresa en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 298,
        "type": "field",
        "text": "Pérdida por rentas exentas del IDPC e ingresos no renta del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1179,
            "operator": "-",
            "slot": 0,
            "label": "Pérdida por rentas exentas del IDPC e ingresos no renta del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 299,
        "type": "field",
        "text": "Retiros o dividendos percibidos en el ejercicio por participaciones en otras empresas",
        "bold": false,
        "fields": [
          {
            "code": 1180,
            "operator": "+",
            "slot": 0,
            "label": "Retiros o dividendos percibidos en el ejercicio por participaciones en otras empresas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 300,
        "type": "field",
        "text": "Remesas, retiros o dividendos repartidos en el ejercicio, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1182,
            "operator": "-",
            "slot": 0,
            "label": "Remesas, retiros o dividendos repartidos en el ejercicio, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 301,
        "type": "field",
        "text": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1697,
            "operator": "-",
            "slot": 0,
            "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 302,
        "type": "field",
        "text": "Aumentos del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1186,
            "operator": "+",
            "slot": 0,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 303,
        "type": "field",
        "text": "Disminuciones del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1187,
            "operator": "-",
            "slot": 0,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 304,
        "type": "field",
        "text": "Ingreso diferido por cambio de régimen",
        "bold": false,
        "fields": [
          {
            "code": 1700,
            "operator": "-",
            "slot": 0,
            "label": "Ingreso diferido por cambio de régimen",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 305,
        "type": "field",
        "text": "Crédito total disponible imputable contra impuestos finales (IPE), del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1188,
            "operator": "-",
            "slot": 0,
            "label": "Crédito total disponible imputable contra impuestos finales (IPE), del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 306,
        "type": "field",
        "text": "Incentivo al ahorro según art. 14 letra E) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1701,
            "operator": "+",
            "slot": 0,
            "label": "Incentivo al ahorro según art. 14 letra E) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 307,
        "type": "field",
        "text": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR",
        "bold": false,
        "fields": [
          {
            "code": 1702,
            "operator": "+",
            "slot": 0,
            "label": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 308,
        "type": "field",
        "text": "Otras partidas a agregar",
        "bold": false,
        "fields": [
          {
            "code": 1189,
            "operator": "+",
            "slot": 0,
            "label": "Otras partidas a agregar",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 309,
        "type": "field",
        "text": "Otras partidas a deducir",
        "bold": false,
        "fields": [
          {
            "code": 1190,
            "operator": "-",
            "slot": 0,
            "label": "Otras partidas a deducir",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 310,
        "type": "field",
        "text": "CPT positivo final",
        "bold": false,
        "fields": [
          {
            "code": 645,
            "operator": "=",
            "slot": 0,
            "label": "CPT positivo final",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 311,
        "type": "field",
        "text": "CPT negativo final",
        "bold": false,
        "fields": [
          {
            "code": 646,
            "operator": "=",
            "slot": 0,
            "label": "CPT negativo final",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 15",
    "title": "RECUADRO N° 15: REGISTRO TRIBUTARIO DE RENTAS EMPRESARIALES Y MOVIMIENTO STUT (ART. 14 LETRA A) LIR)",
    "columnHeaders": [
      "RAI",
      "DDAN",
      "REX",
      "REX",
      "",
      "",
      "STUT",
      "STUT"
    ],
    "rows": [
      {
        "rowIndex": 314,
        "type": "col_header",
        "text": "",
        "bold": false,
        "fields": [],
        "colTexts": [
          "RAI",
          "DDAN",
          "REX",
          "REX",
          "",
          "",
          "STUT",
          "STUT"
        ]
      },
      {
        "rowIndex": 317,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1200,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1211,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1221,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1730,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1731,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1234,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1246,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1260,
            "operator": "",
            "slot": 7,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 318,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1222,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1843,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1235,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1247,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio anterior o saldo inicial reajustado (saldo negativo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 319,
        "type": "field",
        "text": "Monto acogido al ISIF, según art. 10 Ley N° 21.681, reajustado",
        "bold": false,
        "fields": [
          {
            "code": 1933,
            "operator": "",
            "slot": 0,
            "label": "Monto acogido al ISIF, según art. 10 Ley N° 21.681, reajustado",
            "dataType": "number"
          },
          {
            "code": 1934,
            "operator": "",
            "slot": 3,
            "label": "Monto acogido al ISIF, según art. 10 Ley N° 21.681, reajustado",
            "dataType": "number"
          },
          {
            "code": 1935,
            "operator": "",
            "slot": 7,
            "label": "+/-",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 320,
        "type": "field",
        "text": "Aumentos del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1202,
            "operator": "",
            "slot": 0,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1212,
            "operator": "",
            "slot": 1,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1224,
            "operator": "",
            "slot": 2,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1733,
            "operator": "",
            "slot": 3,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1734,
            "operator": "",
            "slot": 4,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1236,
            "operator": "",
            "slot": 5,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1248,
            "operator": "",
            "slot": 6,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1262,
            "operator": "",
            "slot": 7,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 321,
        "type": "field",
        "text": "Disminuciones del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1203,
            "operator": "",
            "slot": 0,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1213,
            "operator": "",
            "slot": 1,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1225,
            "operator": "",
            "slot": 2,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1735,
            "operator": "",
            "slot": 3,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1736,
            "operator": "",
            "slot": 4,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1237,
            "operator": "",
            "slot": 5,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1249,
            "operator": "",
            "slot": 6,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1263,
            "operator": "",
            "slot": 7,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 322,
        "type": "field",
        "text": "Reversos y/o disminuciones del ejercicio (propios)",
        "bold": false,
        "fields": [
          {
            "code": 1204,
            "operator": "",
            "slot": 0,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1214,
            "operator": "",
            "slot": 1,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1226,
            "operator": "",
            "slot": 2,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1737,
            "operator": "",
            "slot": 3,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1738,
            "operator": "",
            "slot": 4,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1238,
            "operator": "",
            "slot": 5,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1250,
            "operator": "",
            "slot": 6,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1264,
            "operator": "",
            "slot": 7,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 323,
        "type": "field",
        "text": "Aumentos del ejercicio (propios)",
        "bold": false,
        "fields": [
          {
            "code": 1205,
            "operator": "",
            "slot": 0,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1215,
            "operator": "",
            "slot": 1,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1740,
            "operator": "",
            "slot": 4,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1239,
            "operator": "",
            "slot": 5,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1251,
            "operator": "",
            "slot": 6,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 324,
        "type": "field",
        "text": "Otros aumentos del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1206,
            "operator": "",
            "slot": 0,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1216,
            "operator": "",
            "slot": 1,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1228,
            "operator": "",
            "slot": 2,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1741,
            "operator": "",
            "slot": 3,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1742,
            "operator": "",
            "slot": 4,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1240,
            "operator": "",
            "slot": 5,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1252,
            "operator": "",
            "slot": 6,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1265,
            "operator": "",
            "slot": 7,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 325,
        "type": "field",
        "text": "Otras disminuciones del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1207,
            "operator": "",
            "slot": 0,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1217,
            "operator": "",
            "slot": 1,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1229,
            "operator": "",
            "slot": 2,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1743,
            "operator": "",
            "slot": 3,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1744,
            "operator": "",
            "slot": 4,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1241,
            "operator": "",
            "slot": 5,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1253,
            "operator": "",
            "slot": 6,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1266,
            "operator": "",
            "slot": 7,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 326,
        "type": "field",
        "text": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1208,
            "operator": "",
            "slot": 0,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          },
          {
            "code": 1218,
            "operator": "",
            "slot": 1,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          },
          {
            "code": 1230,
            "operator": "",
            "slot": 2,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          },
          {
            "code": 1745,
            "operator": "",
            "slot": 3,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          },
          {
            "code": 1746,
            "operator": "",
            "slot": 4,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          },
          {
            "code": 1242,
            "operator": "",
            "slot": 5,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          },
          {
            "code": 1254,
            "operator": "",
            "slot": 6,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          },
          {
            "code": 1267,
            "operator": "",
            "slot": 7,
            "label": "Remesas, retiros o dividendos imputados a los RTRE, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 327,
        "type": "field",
        "text": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1209,
            "operator": "",
            "slot": 0,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1219,
            "operator": "",
            "slot": 1,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1231,
            "operator": "",
            "slot": 2,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1747,
            "operator": "",
            "slot": 3,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1748,
            "operator": "",
            "slot": 4,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1243,
            "operator": "",
            "slot": 5,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1255,
            "operator": "",
            "slot": 6,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1268,
            "operator": "",
            "slot": 7,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 328,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1210,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1220,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1232,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1749,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1750,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1244,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1256,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1269,
            "operator": "",
            "slot": 7,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 329,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1233,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1844,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1245,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1257,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 16",
    "title": "RECUADRO N° 16: REGISTRO SAC (ART. 14 LETRA A) LIR)",
    "columnHeaders": [
      "Acumulados a contar desde el 01.01.2017",
      "Acumulados a contar desde el 01.01.2017",
      "",
      "",
      "Acumulados hasta el 31.12.2016",
      "Acumulados hasta el 31.12.2016",
      "Acumulados hasta el 31.12.2016",
      ""
    ],
    "rows": [
      {
        "rowIndex": 332,
        "type": "col_header",
        "text": "",
        "bold": false,
        "fields": [],
        "colTexts": [
          "Acumulados a contar desde el 01.01.2017",
          "Acumulados a contar desde el 01.01.2017",
          "",
          "",
          "Acumulados hasta el 31.12.2016",
          "Acumulados hasta el 31.12.2016",
          "Acumulados hasta el 31.12.2016",
          ""
        ]
      },
      {
        "rowIndex": 335,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1270,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1279,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1288,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1301,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1313,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1324,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1335,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1346,
            "operator": "",
            "slot": 7,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 336,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1821,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1822,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1289,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1302,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 337,
        "type": "field",
        "text": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
        "bold": false,
        "fields": [
          {
            "code": 1936,
            "operator": "",
            "slot": 0,
            "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
            "dataType": "number"
          },
          {
            "code": 1937,
            "operator": "",
            "slot": 1,
            "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
            "dataType": "number"
          },
          {
            "code": 1938,
            "operator": "",
            "slot": 2,
            "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
            "dataType": "number"
          },
          {
            "code": 1939,
            "operator": "",
            "slot": 3,
            "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
            "dataType": "number"
          },
          {
            "code": 1940,
            "operator": "",
            "slot": 5,
            "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
            "dataType": "number"
          },
          {
            "code": 1941,
            "operator": "",
            "slot": 6,
            "label": "Monto imputado al ISIF art. 10  Ley N° 21.681, reajustado",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 338,
        "type": "field",
        "text": "Aumentos del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1271,
            "operator": "",
            "slot": 0,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1280,
            "operator": "",
            "slot": 1,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1290,
            "operator": "",
            "slot": 2,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1303,
            "operator": "",
            "slot": 3,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1314,
            "operator": "",
            "slot": 4,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1326,
            "operator": "",
            "slot": 5,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1337,
            "operator": "",
            "slot": 6,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1347,
            "operator": "",
            "slot": 7,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 339,
        "type": "field",
        "text": "Disminuciones del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1272,
            "operator": "",
            "slot": 0,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1281,
            "operator": "",
            "slot": 1,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1291,
            "operator": "",
            "slot": 2,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1304,
            "operator": "",
            "slot": 3,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1315,
            "operator": "",
            "slot": 4,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1327,
            "operator": "",
            "slot": 5,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1338,
            "operator": "",
            "slot": 6,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1348,
            "operator": "",
            "slot": 7,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 340,
        "type": "field",
        "text": "IDPC e IPE RLI generada en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1292,
            "operator": "",
            "slot": 2,
            "label": "IDPC e IPE RLI generada en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1305,
            "operator": "",
            "slot": 3,
            "label": "IDPC e IPE RLI generada en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1316,
            "operator": "",
            "slot": 4,
            "label": "IDPC e IPE RLI generada en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 341,
        "type": "field",
        "text": "IDPC e IPE retiros o dividendos percibidos",
        "bold": false,
        "fields": [
          {
            "code": 1273,
            "operator": "",
            "slot": 0,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1282,
            "operator": "",
            "slot": 1,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1293,
            "operator": "",
            "slot": 2,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1306,
            "operator": "",
            "slot": 3,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1317,
            "operator": "",
            "slot": 4,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1328,
            "operator": "",
            "slot": 5,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1339,
            "operator": "",
            "slot": 6,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1349,
            "operator": "",
            "slot": 7,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 342,
        "type": "field",
        "text": "Otros aumentos del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1274,
            "operator": "",
            "slot": 0,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1283,
            "operator": "",
            "slot": 1,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1294,
            "operator": "",
            "slot": 2,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1307,
            "operator": "",
            "slot": 3,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1318,
            "operator": "",
            "slot": 4,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1329,
            "operator": "",
            "slot": 5,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1340,
            "operator": "",
            "slot": 6,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1350,
            "operator": "",
            "slot": 7,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 343,
        "type": "field",
        "text": "Otras disminuciones del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1275,
            "operator": "",
            "slot": 0,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1284,
            "operator": "",
            "slot": 1,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1295,
            "operator": "",
            "slot": 2,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1308,
            "operator": "",
            "slot": 3,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1319,
            "operator": "",
            "slot": 4,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1330,
            "operator": "",
            "slot": 5,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1341,
            "operator": "",
            "slot": 6,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1351,
            "operator": "",
            "slot": 7,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 344,
        "type": "field",
        "text": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1276,
            "operator": "",
            "slot": 0,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1285,
            "operator": "",
            "slot": 1,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1296,
            "operator": "",
            "slot": 2,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1309,
            "operator": "",
            "slot": 3,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1320,
            "operator": "",
            "slot": 4,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1331,
            "operator": "",
            "slot": 5,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1342,
            "operator": "",
            "slot": 6,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1352,
            "operator": "",
            "slot": 7,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 345,
        "type": "field",
        "text": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
        "bold": false,
        "fields": [
          {
            "code": 1277,
            "operator": "",
            "slot": 0,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1286,
            "operator": "",
            "slot": 1,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1297,
            "operator": "",
            "slot": 2,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1310,
            "operator": "",
            "slot": 3,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1321,
            "operator": "",
            "slot": 4,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1332,
            "operator": "",
            "slot": 5,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1343,
            "operator": "",
            "slot": 6,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          },
          {
            "code": 1353,
            "operator": "",
            "slot": 7,
            "label": "Asignado a retiros en exceso y devoluciones de capital efectuados en el ejercicio, reajustados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 346,
        "type": "field",
        "text": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
        "bold": false,
        "fields": [
          {
            "code": 1298,
            "operator": "",
            "slot": 2,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1311,
            "operator": "",
            "slot": 3,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1322,
            "operator": "",
            "slot": 4,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1333,
            "operator": "",
            "slot": 5,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1344,
            "operator": "",
            "slot": 6,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1354,
            "operator": "",
            "slot": 7,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 347,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1278,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1287,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1312,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1300,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1323,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1334,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1345,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1355,
            "operator": "",
            "slot": 7,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 348,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1723,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1724,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1299,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1373,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 17",
    "title": "RECUADRO N° 17: BASE IMPONIBLE RÉGIMEN PRO PYME (ART. 14 LETRA D) N° 3 LIR)",
    "columnHeaders": [
      "PERCIBIDO O PAGADO"
    ],
    "rows": [
      {
        "rowIndex": 351,
        "type": "col_header",
        "text": "",
        "bold": false,
        "fields": [],
        "colTexts": [
          "PERCIBIDO O PAGADO"
        ]
      },
      {
        "rowIndex": 352,
        "type": "field",
        "text": "Ingresos del giro percibidos",
        "bold": false,
        "fields": [
          {
            "code": 1400,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos del giro percibidos",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 353,
        "type": "field",
        "text": "Ingresos del giro devengados en ejercicios anteriores y percibidos en el ejercicio actual",
        "bold": false,
        "fields": [
          {
            "code": 1817,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos del giro devengados en ejercicios anteriores y percibidos en el ejercicio actual",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 354,
        "type": "field",
        "text": "Rentas de fuente extranjera percibidas",
        "bold": false,
        "fields": [
          {
            "code": 1401,
            "operator": "+",
            "slot": 0,
            "label": "Rentas de fuente extranjera percibidas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 355,
        "type": "field",
        "text": "Intereses y reajustes percibidos por préstamos y otros",
        "bold": false,
        "fields": [
          {
            "code": 1402,
            "operator": "+",
            "slot": 0,
            "label": "Intereses y reajustes percibidos por préstamos y otros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 356,
        "type": "field",
        "text": "Mayor valor percibido por rescate o enajenación de inversiones o bienes no depreciables",
        "bold": false,
        "fields": [
          {
            "code": 1403,
            "operator": "+",
            "slot": 0,
            "label": "Mayor valor percibido por rescate o enajenación de inversiones o bienes no depreciables",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 357,
        "type": "field",
        "text": "Ingresos percibidos o devengados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1587,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos percibidos o devengados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 358,
        "type": "field",
        "text": "Otros ingresos percibidos o devengados",
        "bold": false,
        "fields": [
          {
            "code": 1588,
            "operator": "+",
            "slot": 0,
            "label": "Otros ingresos percibidos o devengados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 359,
        "type": "field",
        "text": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado cuando corresponda",
        "bold": false,
        "fields": [
          {
            "code": 1404,
            "operator": "+",
            "slot": 0,
            "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado cuando corresponda",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 360,
        "type": "field",
        "text": "Crédito sobre activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1405,
            "operator": "+",
            "slot": 0,
            "label": "Crédito sobre activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 361,
        "type": "field",
        "text": "Total de ingresos anuales",
        "bold": true,
        "fields": [
          {
            "code": 1410,
            "operator": "=",
            "slot": 0,
            "label": "Total de ingresos anuales",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 362,
        "type": "field",
        "text": "Gasto por saldo inicial de existencias o insumos del negocio en cambio de régimen, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1406,
            "operator": "-",
            "slot": 0,
            "label": "Gasto por saldo inicial de existencias o insumos del negocio en cambio de régimen, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 363,
        "type": "field",
        "text": "Gasto por saldo inicial de activos fijos depreciables en cambio de régimen, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1407,
            "operator": "-",
            "slot": 0,
            "label": "Gasto por saldo inicial de activos fijos depreciables en cambio de régimen, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 364,
        "type": "field",
        "text": "Gasto por pérdida tributaria en cambio de régimen",
        "bold": false,
        "fields": [
          {
            "code": 1408,
            "operator": "-",
            "slot": 0,
            "label": "Gasto por pérdida tributaria en cambio de régimen",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 365,
        "type": "field",
        "text": "Existencias, insumos y servicios del negocio, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1409,
            "operator": "-",
            "slot": 0,
            "label": "Existencias, insumos y servicios del negocio, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 366,
        "type": "field",
        "text": "Existencias, insumos y servicios del negocio adeudados en ejercicios anteriores y pagados en el ejercicio actual",
        "bold": false,
        "fields": [
          {
            "code": 1818,
            "operator": "-",
            "slot": 0,
            "label": "Existencias, insumos y servicios del negocio adeudados en ejercicios anteriores y pagados en el ejercicio actual",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 367,
        "type": "field",
        "text": "Gastos de rentas de fuente extranjera, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1429,
            "operator": "-",
            "slot": 0,
            "label": "Gastos de rentas de fuente extranjera, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 368,
        "type": "field",
        "text": "Remuneraciones pagadas",
        "bold": false,
        "fields": [
          {
            "code": 1411,
            "operator": "-",
            "slot": 0,
            "label": "Remuneraciones pagadas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 369,
        "type": "field",
        "text": "Honorarios pagados",
        "bold": false,
        "fields": [
          {
            "code": 1412,
            "operator": "-",
            "slot": 0,
            "label": "Honorarios pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 370,
        "type": "field",
        "text": "Adquisición de bienes del activo fijo, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1413,
            "operator": "-",
            "slot": 0,
            "label": "Adquisición de bienes del activo fijo, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 371,
        "type": "field",
        "text": "Arriendos pagados",
        "bold": false,
        "fields": [
          {
            "code": 1415,
            "operator": "-",
            "slot": 0,
            "label": "Arriendos pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 372,
        "type": "field",
        "text": "Gastos por exigencias medio ambientales, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1416,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por exigencias medio ambientales, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 373,
        "type": "field",
        "text": "Gastos por inversión privada en investigación y desarrollo no certificados por CORFO",
        "bold": false,
        "fields": [
          {
            "code": 1417,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por inversión privada en investigación y desarrollo no certificados por CORFO",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 374,
        "type": "field",
        "text": "Gastos por inversión privada en investigación y desarrollo certificados por CORFO",
        "bold": false,
        "fields": [
          {
            "code": 1418,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por inversión privada en investigación y desarrollo certificados por CORFO",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 375,
        "type": "field",
        "text": "Intereses y reajustes pagados por préstamos y otros",
        "bold": false,
        "fields": [
          {
            "code": 1419,
            "operator": "-",
            "slot": 0,
            "label": "Intereses y reajustes pagados por préstamos y otros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 376,
        "type": "field",
        "text": "Partidas del art. 21 inc. 1° y 3° LIR pagados",
        "bold": false,
        "fields": [
          {
            "code": 1421,
            "operator": "-",
            "slot": 0,
            "label": "Partidas del art. 21 inc. 1° y 3° LIR pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 377,
        "type": "field",
        "text": "Partidas del art. 21 inc. 1° no afectados con IU 40% y del inc. 2° LIR pagados",
        "bold": false,
        "fields": [
          {
            "code": 1422,
            "operator": "-",
            "slot": 0,
            "label": "Partidas del art. 21 inc. 1° no afectados con IU 40% y del inc. 2° LIR pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 378,
        "type": "field",
        "text": "Pérdida en rescate o enajenación de inversiones o bienes no depreciables",
        "bold": false,
        "fields": [
          {
            "code": 1423,
            "operator": "-",
            "slot": 0,
            "label": "Pérdida en rescate o enajenación de inversiones o bienes no depreciables",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 379,
        "type": "field",
        "text": "Otros gastos deducibles de los ingresos",
        "bold": false,
        "fields": [
          {
            "code": 1424,
            "operator": "-",
            "slot": 0,
            "label": "Otros gastos deducibles de los ingresos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 380,
        "type": "field",
        "text": "Gastos o egresos pagados o adeudados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1425,
            "operator": "-",
            "slot": 0,
            "label": "Gastos o egresos pagados o adeudados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 381,
        "type": "field",
        "text": "Pérdidas tributarias de ejercicios anteriores",
        "bold": false,
        "fields": [
          {
            "code": 1426,
            "operator": "-",
            "slot": 0,
            "label": "Pérdidas tributarias de ejercicios anteriores",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 382,
        "type": "field",
        "text": "Créditos incobrables castigados en el ejercicio (reconocidos sobre ingresos devengados)",
        "bold": false,
        "fields": [
          {
            "code": 1427,
            "operator": "-",
            "slot": 0,
            "label": "Créditos incobrables castigados en el ejercicio (reconocidos sobre ingresos devengados)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 383,
        "type": "field",
        "text": "Gastos aceptados por donaciones",
        "bold": false,
        "fields": [
          {
            "code": 1428,
            "operator": "-",
            "slot": 0,
            "label": "Gastos aceptados por donaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 384,
        "type": "field",
        "text": "Total de egresos anuales",
        "bold": true,
        "fields": [
          {
            "code": 1430,
            "operator": "=",
            "slot": 0,
            "label": "Total de egresos anuales",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 385,
        "type": "field",
        "text": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR (históricos), incluidos en el total de egresos",
        "bold": false,
        "fields": [
          {
            "code": 1431,
            "operator": "+",
            "slot": 0,
            "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR (históricos), incluidos en el total de egresos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 386,
        "type": "field",
        "text": "Base imponible antes de rebaja por incentivo al ahorro (art. 14 letra E) LIR) y/o por pago de IDPC voluntario (art. 14 letra A) N°6 LIR y art. 42° transitorio Ley N° 21.210) o pérdida tributaria",
        "bold": false,
        "fields": [
          {
            "code": 1729,
            "operator": "=",
            "slot": 0,
            "label": "Base imponible antes de rebaja por incentivo al ahorro (art. 14 letra E) LIR) y/o por pago de IDPC voluntario (art. 14 letra A) N°6 LIR y art. 42° transitorio Ley N° 21.210) o pérdida tributaria",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 387,
        "type": "field",
        "text": "Incentivo al ahorro según art. 14 letra E) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1432,
            "operator": "-",
            "slot": 0,
            "label": "Incentivo al ahorro según art. 14 letra E) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 388,
        "type": "field",
        "text": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR y art. 42° transitorio Ley N° 21.210",
        "bold": false,
        "fields": [
          {
            "code": 1433,
            "operator": "-",
            "slot": 0,
            "label": "Base del IDPC voluntario según  art. 14 letra A) N°  6 LIR y art. 42° transitorio Ley N° 21.210",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 389,
        "type": "field",
        "text": "Base Imponible afecta a IDPC o pérdida tributaria del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1440,
            "operator": "=",
            "slot": 0,
            "label": "Base Imponible afecta a IDPC o pérdida tributaria del ejercicio",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 18",
    "title": "RECUADRO Nº 18DETERMINACIÓN DEL RAI (ART. 14 LETRA D) N° 3 LIR)",
    "columnHeaders": [],
    "rows": []
  },
  {
    "id": "RECUADRO 19",
    "title": "CPTS positivo final (recuadro N° 19)",
    "columnHeaders": [],
    "rows": []
  },
  {
    "id": "RECUADRO 19",
    "title": "CPTS negativo final (recuadro N° 19)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 394,
        "type": "field",
        "text": "Saldo negativo del registro REX al término del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1492,
            "operator": "+",
            "slot": 0,
            "label": "Saldo negativo del registro REX al término del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 395,
        "type": "field",
        "text": "Remesas, retiros o dividendos repartidos en el ejercicio, históricos",
        "bold": false,
        "fields": [
          {
            "code": 1704,
            "operator": "+",
            "slot": 0,
            "label": "Remesas, retiros o dividendos repartidos en el ejercicio, históricos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 396,
        "type": "field",
        "text": "Subtotal",
        "bold": true,
        "fields": [
          {
            "code": 1720,
            "operator": "=",
            "slot": 0,
            "label": "Subtotal",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 397,
        "type": "field",
        "text": "Saldo positivo del registro REX al término del ejercicio, antes de imputaciones",
        "bold": false,
        "fields": [
          {
            "code": 1493,
            "operator": "-",
            "slot": 0,
            "label": "Saldo positivo del registro REX al término del ejercicio, antes de imputaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 398,
        "type": "field",
        "text": "Capital aportado, histórico (incluye aumentos y disminuciones efectivas)",
        "bold": false,
        "fields": [
          {
            "code": 1494,
            "operator": "-",
            "slot": 0,
            "label": "Capital aportado, histórico (incluye aumentos y disminuciones efectivas)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 399,
        "type": "field",
        "text": "Saldo FUR  (cuando no haya sido considerado dentro del valor del capital aportado a la empresa)",
        "bold": false,
        "fields": [
          {
            "code": 1725,
            "operator": "-",
            "slot": 0,
            "label": "Saldo FUR  (cuando no haya sido considerado dentro del valor del capital aportado a la empresa)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 400,
        "type": "field",
        "text": "Sobreprecio obtenido en la colocación de acciones de propia emisión, histórico",
        "bold": false,
        "fields": [
          {
            "code": 1727,
            "operator": "-",
            "slot": 0,
            "label": "Sobreprecio obtenido en la colocación de acciones de propia emisión, histórico",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 401,
        "type": "field",
        "text": "Rentas afectas a IGC o IA (RAI) del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1500,
            "operator": "=",
            "slot": 0,
            "label": "Rentas afectas a IGC o IA (RAI) del ejercicio",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 19",
    "title": "RECUADRO N° 19: CPTS RÉGIMEN PRO PYME (ART. 14 LETRA D) N° 3 LIR)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 404,
        "type": "field",
        "text": "CPT o CPTS positivo inicial",
        "bold": false,
        "fields": [
          {
            "code": 1445,
            "operator": "+",
            "slot": 0,
            "label": "CPT o CPTS positivo inicial",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 405,
        "type": "field",
        "text": "CPT o CPTS negativo inicial",
        "bold": false,
        "fields": [
          {
            "code": 1446,
            "operator": "-",
            "slot": 0,
            "label": "CPT o CPTS negativo inicial",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 406,
        "type": "field",
        "text": "Capital aportado empresas que inician actividades en el año comercial que corresponda a esta declaración",
        "bold": false,
        "fields": [
          {
            "code": 1374,
            "operator": "+",
            "slot": 0,
            "label": "Capital aportado empresas que inician actividades en el año comercial que corresponda a esta declaración",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 407,
        "type": "field",
        "text": "Aumentos (efectivos) de capital del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1375,
            "operator": "+",
            "slot": 0,
            "label": "Aumentos (efectivos) de capital del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 408,
        "type": "field",
        "text": "Disminuciones (efectivas) de capital del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1376,
            "operator": "-",
            "slot": 0,
            "label": "Disminuciones (efectivas) de capital del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 409,
        "type": "field",
        "text": "Base imponible afecta a IDPC del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1705,
            "operator": "+",
            "slot": 0,
            "label": "Base imponible afecta a IDPC del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 410,
        "type": "field",
        "text": "Pérdida tributaria del ejercicio al 31 de diciembre",
        "bold": false,
        "fields": [
          {
            "code": 1706,
            "operator": "-",
            "slot": 0,
            "label": "Pérdida tributaria del ejercicio al 31 de diciembre",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 411,
        "type": "field",
        "text": "Pérdidas tributarias de ejercicios anteriores",
        "bold": false,
        "fields": [
          {
            "code": 1707,
            "operator": "+",
            "slot": 0,
            "label": "Pérdidas tributarias de ejercicios anteriores",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 412,
        "type": "field",
        "text": "Rentas exentas e ingresos no renta (positivo), generados por la empresa en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1377,
            "operator": "+",
            "slot": 0,
            "label": "Rentas exentas e ingresos no renta (positivo), generados por la empresa en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 413,
        "type": "field",
        "text": "Pérdida por rentas exentas e ingresos no renta del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1378,
            "operator": "-",
            "slot": 0,
            "label": "Pérdida por rentas exentas e ingresos no renta del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 414,
        "type": "field",
        "text": "Retiros o dividendos percibidos en el ejercicio por participaciones en otras empresas",
        "bold": false,
        "fields": [
          {
            "code": 1726,
            "operator": "+",
            "slot": 0,
            "label": "Retiros o dividendos percibidos en el ejercicio por participaciones en otras empresas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 415,
        "type": "field",
        "text": "Remesas, retiros o dividendos repartidos en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1479,
            "operator": "-",
            "slot": 0,
            "label": "Remesas, retiros o dividendos repartidos en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 416,
        "type": "field",
        "text": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR",
        "bold": false,
        "fields": [
          {
            "code": 1708,
            "operator": "-",
            "slot": 0,
            "label": "Partidas del inc. 1° no afectas al IU de tasa 40% y del inc. 2° del art. 21 LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 417,
        "type": "field",
        "text": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado cuando corresponda",
        "bold": false,
        "fields": [
          {
            "code": 1709,
            "operator": "-",
            "slot": 0,
            "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado cuando corresponda",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 418,
        "type": "field",
        "text": "Crédito total disponible imputable contra impuestos finales (IPE), del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1379,
            "operator": "-",
            "slot": 0,
            "label": "Crédito total disponible imputable contra impuestos finales (IPE), del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 419,
        "type": "field",
        "text": "Incentivo al ahorro según art. 14 letra E) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1710,
            "operator": "+",
            "slot": 0,
            "label": "Incentivo al ahorro según art. 14 letra E) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 420,
        "type": "field",
        "text": "Base del IDPC voluntario según art. 14 letra A) N° 6 LIR",
        "bold": false,
        "fields": [
          {
            "code": 1711,
            "operator": "+",
            "slot": 0,
            "label": "Base del IDPC voluntario según art. 14 letra A) N° 6 LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 421,
        "type": "field",
        "text": "Otras partidas a agregar",
        "bold": false,
        "fields": [
          {
            "code": 1380,
            "operator": "+",
            "slot": 0,
            "label": "Otras partidas a agregar",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 422,
        "type": "field",
        "text": "Otras partidas a deducir",
        "bold": false,
        "fields": [
          {
            "code": 1381,
            "operator": "-",
            "slot": 0,
            "label": "Otras partidas a deducir",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 423,
        "type": "field",
        "text": "CPTS positivo final",
        "bold": false,
        "fields": [
          {
            "code": 1545,
            "operator": "=",
            "slot": 0,
            "label": "CPTS positivo final",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 424,
        "type": "field",
        "text": "CPTS negativo final",
        "bold": false,
        "fields": [
          {
            "code": 1546,
            "operator": "=",
            "slot": 0,
            "label": "CPTS negativo final",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 20",
    "title": "RECUADRO N° 20: REGISTRO TRIBUTARIO DE RENTAS EMPRESARIALES Y MOVIMIENTO STUT (ART. 14 LETRA D) N° 3 LIR)",
    "columnHeaders": [
      "RAI",
      "REX",
      "REX",
      "",
      "",
      "STUT",
      "STUT"
    ],
    "rows": [
      {
        "rowIndex": 427,
        "type": "col_header",
        "text": "",
        "bold": false,
        "fields": [],
        "colTexts": [
          "RAI",
          "REX",
          "REX",
          "",
          "",
          "STUT",
          "STUT"
        ]
      },
      {
        "rowIndex": 430,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1451,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1452,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1752,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1753,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1453,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1454,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1382,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 431,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1589,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1845,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1455,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1456,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 432,
        "type": "field",
        "text": "Monto acogido al ISIF, según arts. 10 y 11 Ley N° 21.681",
        "bold": false,
        "fields": [
          {
            "code": 1942,
            "operator": "",
            "slot": 0,
            "label": "Monto acogido al ISIF, según arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          },
          {
            "code": 1943,
            "operator": "",
            "slot": 2,
            "label": "Monto acogido al ISIF, según arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          },
          {
            "code": 1944,
            "operator": "",
            "slot": 6,
            "label": "+/-",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 433,
        "type": "field",
        "text": "Aumentos del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1392,
            "operator": "",
            "slot": 0,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1393,
            "operator": "",
            "slot": 1,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1755,
            "operator": "",
            "slot": 2,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1756,
            "operator": "",
            "slot": 3,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1394,
            "operator": "",
            "slot": 4,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1395,
            "operator": "",
            "slot": 5,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1384,
            "operator": "",
            "slot": 6,
            "label": "Aumentos del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 434,
        "type": "field",
        "text": "Disminuciones del ejercicio (por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1396,
            "operator": "",
            "slot": 0,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1397,
            "operator": "",
            "slot": 1,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1757,
            "operator": "",
            "slot": 2,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1758,
            "operator": "",
            "slot": 3,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1398,
            "operator": "",
            "slot": 4,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1399,
            "operator": "",
            "slot": 5,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1385,
            "operator": "",
            "slot": 6,
            "label": "Disminuciones del ejercicio (por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 435,
        "type": "field",
        "text": "Reversos y/o disminuciones del ejercicio (propios)",
        "bold": false,
        "fields": [
          {
            "code": 1459,
            "operator": "",
            "slot": 0,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1460,
            "operator": "",
            "slot": 1,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1759,
            "operator": "",
            "slot": 2,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1760,
            "operator": "",
            "slot": 3,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1461,
            "operator": "",
            "slot": 4,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1462,
            "operator": "",
            "slot": 5,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1386,
            "operator": "",
            "slot": 6,
            "label": "Reversos y/o disminuciones del ejercicio (propios)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 436,
        "type": "field",
        "text": "Aumentos del ejercicio (propios)",
        "bold": false,
        "fields": [
          {
            "code": 1463,
            "operator": "",
            "slot": 0,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1762,
            "operator": "",
            "slot": 3,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1465,
            "operator": "",
            "slot": 4,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          },
          {
            "code": 1466,
            "operator": "",
            "slot": 5,
            "label": "Aumentos del ejercicio (propios)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 437,
        "type": "field",
        "text": "Otros aumentos del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1467,
            "operator": "",
            "slot": 0,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1468,
            "operator": "",
            "slot": 1,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1763,
            "operator": "",
            "slot": 2,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1764,
            "operator": "",
            "slot": 3,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1469,
            "operator": "",
            "slot": 4,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1470,
            "operator": "",
            "slot": 5,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1387,
            "operator": "",
            "slot": 6,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 438,
        "type": "field",
        "text": "Otras disminuciones del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1471,
            "operator": "",
            "slot": 0,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1472,
            "operator": "",
            "slot": 1,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1765,
            "operator": "",
            "slot": 2,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1766,
            "operator": "",
            "slot": 3,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1473,
            "operator": "",
            "slot": 4,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1474,
            "operator": "",
            "slot": 5,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1388,
            "operator": "",
            "slot": 6,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 439,
        "type": "field",
        "text": "Retiros, dividendos o remesas imputados a los RTRE",
        "bold": false,
        "fields": [
          {
            "code": 1475,
            "operator": "",
            "slot": 0,
            "label": "Retiros, dividendos o remesas imputados a los RTRE",
            "dataType": "number"
          },
          {
            "code": 1476,
            "operator": "",
            "slot": 1,
            "label": "Retiros, dividendos o remesas imputados a los RTRE",
            "dataType": "number"
          },
          {
            "code": 1767,
            "operator": "",
            "slot": 2,
            "label": "Retiros, dividendos o remesas imputados a los RTRE",
            "dataType": "number"
          },
          {
            "code": 1768,
            "operator": "",
            "slot": 3,
            "label": "Retiros, dividendos o remesas imputados a los RTRE",
            "dataType": "number"
          },
          {
            "code": 1477,
            "operator": "",
            "slot": 4,
            "label": "Retiros, dividendos o remesas imputados a los RTRE",
            "dataType": "number"
          },
          {
            "code": 1478,
            "operator": "",
            "slot": 5,
            "label": "Retiros, dividendos o remesas imputados a los RTRE",
            "dataType": "number"
          },
          {
            "code": 1389,
            "operator": "",
            "slot": 6,
            "label": "Retiros, dividendos o remesas imputados a los RTRE",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 440,
        "type": "field",
        "text": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1480,
            "operator": "",
            "slot": 0,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1481,
            "operator": "",
            "slot": 1,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1769,
            "operator": "",
            "slot": 2,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1770,
            "operator": "",
            "slot": 3,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1482,
            "operator": "",
            "slot": 4,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1483,
            "operator": "",
            "slot": 5,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1390,
            "operator": "",
            "slot": 6,
            "label": "Retiros en exceso y devoluciones de capital imputados en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 441,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1484,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1485,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1771,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1772,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1486,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1487,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1391,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 442,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1489,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1846,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1490,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1491,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 21",
    "title": "RECUADRO N° 21: REGISTRO SAC (ART. 14 LETRA D) N° 3 LIR)",
    "columnHeaders": [
      "Acumulados a contar desde el 01.01.2017",
      "Acumulados a contar desde el 01.01.2017",
      "",
      "",
      "Acumulados hasta el 31.12.2016",
      "Acumulados hasta el 31.12.2016",
      "Acumulados hasta el 31.12.2016",
      ""
    ],
    "rows": [
      {
        "rowIndex": 445,
        "type": "col_header",
        "text": "",
        "bold": false,
        "fields": [],
        "colTexts": [
          "Acumulados a contar desde el 01.01.2017",
          "Acumulados a contar desde el 01.01.2017",
          "",
          "",
          "Acumulados hasta el 31.12.2016",
          "Acumulados hasta el 31.12.2016",
          "Acumulados hasta el 31.12.2016",
          ""
        ]
      },
      {
        "rowIndex": 448,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1495,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1496,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1497,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1498,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1499,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1501,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1502,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1503,
            "operator": "",
            "slot": 7,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 449,
        "type": "field",
        "text": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1655,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1656,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1504,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1505,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio anterior o saldo inicial (saldo negativo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 450,
        "type": "field",
        "text": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
        "bold": false,
        "fields": [
          {
            "code": 1945,
            "operator": "",
            "slot": 0,
            "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          },
          {
            "code": 1946,
            "operator": "",
            "slot": 1,
            "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          },
          {
            "code": 1947,
            "operator": "",
            "slot": 2,
            "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          },
          {
            "code": 1948,
            "operator": "",
            "slot": 3,
            "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          },
          {
            "code": 1949,
            "operator": "",
            "slot": 5,
            "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          },
          {
            "code": 1950,
            "operator": "",
            "slot": 6,
            "label": "Monto imputado al ISIF arts. 10 y 11 Ley N° 21.681",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 451,
        "type": "field",
        "text": "Aumentos del ejercicio(por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1590,
            "operator": "",
            "slot": 0,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1436,
            "operator": "",
            "slot": 1,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1437,
            "operator": "",
            "slot": 2,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1438,
            "operator": "",
            "slot": 3,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1439,
            "operator": "",
            "slot": 4,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1441,
            "operator": "",
            "slot": 5,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1442,
            "operator": "",
            "slot": 6,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1443,
            "operator": "",
            "slot": 7,
            "label": "Aumentos del ejercicio(por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 452,
        "type": "field",
        "text": "Disminuciones del ejercicio(por reorganizaciones)",
        "bold": false,
        "fields": [
          {
            "code": 1444,
            "operator": "",
            "slot": 0,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1447,
            "operator": "",
            "slot": 1,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1448,
            "operator": "",
            "slot": 2,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1449,
            "operator": "",
            "slot": 3,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1508,
            "operator": "",
            "slot": 4,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1509,
            "operator": "",
            "slot": 5,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1510,
            "operator": "",
            "slot": 6,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          },
          {
            "code": 1511,
            "operator": "",
            "slot": 7,
            "label": "Disminuciones del ejercicio(por reorganizaciones)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 453,
        "type": "field",
        "text": "IDPC e IPE base imponible generada en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1512,
            "operator": "",
            "slot": 0,
            "label": "IDPC e IPE base imponible generada en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1513,
            "operator": "",
            "slot": 1,
            "label": "IDPC e IPE base imponible generada en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1514,
            "operator": "",
            "slot": 4,
            "label": "IDPC e IPE base imponible generada en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 454,
        "type": "field",
        "text": "IDPC e IPE retiros o dividendos percibidos",
        "bold": false,
        "fields": [
          {
            "code": 1515,
            "operator": "",
            "slot": 0,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1516,
            "operator": "",
            "slot": 1,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1517,
            "operator": "",
            "slot": 2,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1518,
            "operator": "",
            "slot": 3,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1519,
            "operator": "",
            "slot": 4,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1520,
            "operator": "",
            "slot": 5,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1521,
            "operator": "",
            "slot": 6,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          },
          {
            "code": 1522,
            "operator": "",
            "slot": 7,
            "label": "IDPC e IPE retiros o dividendos percibidos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 455,
        "type": "field",
        "text": "Otros aumentos del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1523,
            "operator": "",
            "slot": 0,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1524,
            "operator": "",
            "slot": 1,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1525,
            "operator": "",
            "slot": 2,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1526,
            "operator": "",
            "slot": 3,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1527,
            "operator": "",
            "slot": 4,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1528,
            "operator": "",
            "slot": 5,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1529,
            "operator": "",
            "slot": 6,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1530,
            "operator": "",
            "slot": 7,
            "label": "Otros aumentos del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 456,
        "type": "field",
        "text": "Otras disminuciones del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1531,
            "operator": "",
            "slot": 0,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1532,
            "operator": "",
            "slot": 1,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1533,
            "operator": "",
            "slot": 2,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1534,
            "operator": "",
            "slot": 3,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1535,
            "operator": "",
            "slot": 4,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1536,
            "operator": "",
            "slot": 5,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1537,
            "operator": "",
            "slot": 6,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          },
          {
            "code": 1538,
            "operator": "",
            "slot": 7,
            "label": "Otras disminuciones del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 457,
        "type": "field",
        "text": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1539,
            "operator": "",
            "slot": 0,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1540,
            "operator": "",
            "slot": 1,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1541,
            "operator": "",
            "slot": 2,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1542,
            "operator": "",
            "slot": 3,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1543,
            "operator": "",
            "slot": 4,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1544,
            "operator": "",
            "slot": 5,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1547,
            "operator": "",
            "slot": 6,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1548,
            "operator": "",
            "slot": 7,
            "label": "Asignado a remesas, retiros o dividendos efectuados en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 458,
        "type": "field",
        "text": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1549,
            "operator": "",
            "slot": 0,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1550,
            "operator": "",
            "slot": 1,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1551,
            "operator": "",
            "slot": 2,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1552,
            "operator": "",
            "slot": 3,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1553,
            "operator": "",
            "slot": 4,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1554,
            "operator": "",
            "slot": 5,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1555,
            "operator": "",
            "slot": 6,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          },
          {
            "code": 1556,
            "operator": "",
            "slot": 7,
            "label": "Asignado a retiros en exceso y devoluciones de capital  efectuados en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 459,
        "type": "field",
        "text": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
        "bold": false,
        "fields": [
          {
            "code": 1557,
            "operator": "",
            "slot": 0,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1558,
            "operator": "",
            "slot": 1,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1559,
            "operator": "",
            "slot": 4,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1560,
            "operator": "",
            "slot": 5,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1561,
            "operator": "",
            "slot": 6,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          },
          {
            "code": 1562,
            "operator": "",
            "slot": 7,
            "label": "IDPC e IPE asignado a gastos rechazados del art. 21 inc. 1° no afectos a IU 40% y del inc. 2° LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 460,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo positivo)",
        "bold": false,
        "fields": [
          {
            "code": 1563,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1564,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1565,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1566,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1567,
            "operator": "",
            "slot": 4,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1568,
            "operator": "",
            "slot": 5,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1569,
            "operator": "",
            "slot": 6,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          },
          {
            "code": 1570,
            "operator": "",
            "slot": 7,
            "label": "Remanente ejercicio siguiente (saldo positivo)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 461,
        "type": "field",
        "text": "Remanente ejercicio siguiente (saldo negativo)",
        "bold": false,
        "fields": [
          {
            "code": 1368,
            "operator": "",
            "slot": 0,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1371,
            "operator": "",
            "slot": 1,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1571,
            "operator": "",
            "slot": 2,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          },
          {
            "code": 1572,
            "operator": "",
            "slot": 3,
            "label": "Remanente ejercicio siguiente (saldo negativo)",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 22",
    "title": "RECUADRO N° 22: BASE IMPONIBLE RÉGIMEN DE TRANSPARENCIA TRIBUTARIA (ART. 14 LETRA D) N° 8 LIR)",
    "columnHeaders": [
      "Percibido o Pagado"
    ],
    "rows": [
      {
        "rowIndex": 464,
        "type": "col_header",
        "text": "",
        "bold": false,
        "fields": [],
        "colTexts": [
          "Percibido o Pagado"
        ]
      },
      {
        "rowIndex": 465,
        "type": "field",
        "text": "Ingresos del giro percibidos",
        "bold": false,
        "fields": [
          {
            "code": 1600,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos del giro percibidos",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 466,
        "type": "field",
        "text": "Ingresos del giro devengados en ejercicios anteriores y percibidos en el ejercicio actual",
        "bold": false,
        "fields": [
          {
            "code": 1819,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos del giro devengados en ejercicios anteriores y percibidos en el ejercicio actual",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 467,
        "type": "field",
        "text": "Rentas de fuente extranjera percibidas",
        "bold": false,
        "fields": [
          {
            "code": 1601,
            "operator": "+",
            "slot": 0,
            "label": "Rentas de fuente extranjera percibidas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 468,
        "type": "field",
        "text": "Intereses y reajustes percibidos por préstamos y otros",
        "bold": false,
        "fields": [
          {
            "code": 1602,
            "operator": "+",
            "slot": 0,
            "label": "Intereses y reajustes percibidos por préstamos y otros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 469,
        "type": "field",
        "text": "Mayor valor percibido por rescate o enajenación de inversiones o bienes no depreciables",
        "bold": false,
        "fields": [
          {
            "code": 1603,
            "operator": "+",
            "slot": 0,
            "label": "Mayor valor percibido por rescate o enajenación de inversiones o bienes no depreciables",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 470,
        "type": "field",
        "text": "Dividendos o retiros percibidos en el ejercicio, por participaciones en otras empresas",
        "bold": false,
        "fields": [
          {
            "code": 1604,
            "operator": "+",
            "slot": 0,
            "label": "Dividendos o retiros percibidos en el ejercicio, por participaciones en otras empresas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 471,
        "type": "field",
        "text": "Incremento por IDPC",
        "bold": false,
        "fields": [
          {
            "code": 1605,
            "operator": "+",
            "slot": 0,
            "label": "Incremento por IDPC",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 472,
        "type": "field",
        "text": "Ingresos percibidos o devengados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1606,
            "operator": "+",
            "slot": 0,
            "label": "Ingresos percibidos o devengados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 473,
        "type": "field",
        "text": "Otros ingresos percibidos o devengados",
        "bold": false,
        "fields": [
          {
            "code": 1607,
            "operator": "+",
            "slot": 0,
            "label": "Otros ingresos percibidos o devengados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 474,
        "type": "field",
        "text": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado, cuando corresponda",
        "bold": false,
        "fields": [
          {
            "code": 1608,
            "operator": "+",
            "slot": 0,
            "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado, cuando corresponda",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 475,
        "type": "field",
        "text": "Crédito por activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1609,
            "operator": "+",
            "slot": 0,
            "label": "Crédito por activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 476,
        "type": "field",
        "text": "Total de ingresos anuales",
        "bold": true,
        "fields": [
          {
            "code": 1610,
            "operator": "=",
            "slot": 0,
            "label": "Total de ingresos anuales",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 477,
        "type": "field",
        "text": "Gasto por saldo inicial de existencias o insumos del negocio en cambio de régimen, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1611,
            "operator": "-",
            "slot": 0,
            "label": "Gasto por saldo inicial de existencias o insumos del negocio en cambio de régimen, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 478,
        "type": "field",
        "text": "Gasto por saldo inicial de activos fijos depreciables en cambio de régimen, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1612,
            "operator": "-",
            "slot": 0,
            "label": "Gasto por saldo inicial de activos fijos depreciables en cambio de régimen, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 479,
        "type": "field",
        "text": "Gasto por pérdida tributaria en cambio de régimen",
        "bold": false,
        "fields": [
          {
            "code": 1613,
            "operator": "-",
            "slot": 0,
            "label": "Gasto por pérdida tributaria en cambio de régimen",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 480,
        "type": "field",
        "text": "Existencias, insumos y servicios del negocio, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1614,
            "operator": "-",
            "slot": 0,
            "label": "Existencias, insumos y servicios del negocio, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 481,
        "type": "field",
        "text": "Existencias, insumos y servicios del negocio adeudados en ejercicios anteriores y pagados en el ejercicio actual",
        "bold": false,
        "fields": [
          {
            "code": 1820,
            "operator": "-",
            "slot": 0,
            "label": "Existencias, insumos y servicios del negocio adeudados en ejercicios anteriores y pagados en el ejercicio actual",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 482,
        "type": "field",
        "text": "Gastos de rentas de fuente extranjera, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1615,
            "operator": "-",
            "slot": 0,
            "label": "Gastos de rentas de fuente extranjera, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 483,
        "type": "field",
        "text": "Remuneraciones pagadas",
        "bold": false,
        "fields": [
          {
            "code": 1616,
            "operator": "-",
            "slot": 0,
            "label": "Remuneraciones pagadas",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 484,
        "type": "field",
        "text": "Honorarios pagados",
        "bold": false,
        "fields": [
          {
            "code": 1617,
            "operator": "-",
            "slot": 0,
            "label": "Honorarios pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 485,
        "type": "field",
        "text": "Adquisición de bienes del activo fijo, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1618,
            "operator": "-",
            "slot": 0,
            "label": "Adquisición de bienes del activo fijo, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 486,
        "type": "field",
        "text": "Arriendos pagados",
        "bold": false,
        "fields": [
          {
            "code": 1620,
            "operator": "-",
            "slot": 0,
            "label": "Arriendos pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 487,
        "type": "field",
        "text": "Gastos por exigencias medio ambientales, pagados",
        "bold": false,
        "fields": [
          {
            "code": 1621,
            "operator": "-",
            "slot": 0,
            "label": "Gastos por exigencias medio ambientales, pagados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 488,
        "type": "field",
        "text": "Intereses y reajustes pagados por préstamos y otros",
        "bold": false,
        "fields": [
          {
            "code": 1622,
            "operator": "-",
            "slot": 0,
            "label": "Intereses y reajustes pagados por préstamos y otros",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 489,
        "type": "field",
        "text": "Pérdida en rescate o enajenación de inversiones o bienes no depreciables",
        "bold": false,
        "fields": [
          {
            "code": 1624,
            "operator": "-",
            "slot": 0,
            "label": "Pérdida en rescate o enajenación de inversiones o bienes no depreciables",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 490,
        "type": "field",
        "text": "Otros gastos deducibles de los ingresos",
        "bold": false,
        "fields": [
          {
            "code": 1625,
            "operator": "-",
            "slot": 0,
            "label": "Otros gastos deducibles de los ingresos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 491,
        "type": "field",
        "text": "Gastos o egresos pagados o adeudados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
        "bold": false,
        "fields": [
          {
            "code": 1626,
            "operator": "-",
            "slot": 0,
            "label": "Gastos o egresos pagados o adeudados por operaciones con empresas relacionadas del art. 14 letra A) LIR",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 492,
        "type": "field",
        "text": "Pérdidas tributarias de ejercicios anteriores",
        "bold": false,
        "fields": [
          {
            "code": 1627,
            "operator": "-",
            "slot": 0,
            "label": "Pérdidas tributarias de ejercicios anteriores",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 493,
        "type": "field",
        "text": "Créditos incobrables castigados en el ejercicio (reconocidos sobre ingresos devengados)",
        "bold": false,
        "fields": [
          {
            "code": 1628,
            "operator": "-",
            "slot": 0,
            "label": "Créditos incobrables castigados en el ejercicio (reconocidos sobre ingresos devengados)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 494,
        "type": "field",
        "text": "Gastos aceptados por donaciones",
        "bold": false,
        "fields": [
          {
            "code": 1909,
            "operator": "-",
            "slot": 0,
            "label": "Gastos aceptados por donaciones",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 495,
        "type": "field",
        "text": "Total de egresos anuales",
        "bold": true,
        "fields": [
          {
            "code": 1629,
            "operator": "=",
            "slot": 0,
            "label": "Total de egresos anuales",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 496,
        "type": "field",
        "text": "Base imponible a asignar a propietarios que son contribuyentes de impuestos finales, o pérdida tributaria del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1630,
            "operator": "=",
            "slot": 0,
            "label": "Base imponible a asignar a propietarios que son contribuyentes de impuestos finales, o pérdida tributaria del ejercicio",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 23",
    "title": "RECUADRO N° 23: CPTS RÉGIMEN DE TRANSPARENCIA TRIBUTARIA (ART. 14 LETRA D) N° 8 LIR)",
    "columnHeaders": [
      ""
    ],
    "rows": [
      {
        "rowIndex": 499,
        "type": "field",
        "text": "CPT o CPTS positivo inicial",
        "bold": false,
        "fields": [
          {
            "code": 1580,
            "operator": "+",
            "slot": 0,
            "label": "CPT o CPTS positivo inicial",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 500,
        "type": "field",
        "text": "CPT o CPTS negativo inicial",
        "bold": false,
        "fields": [
          {
            "code": 1582,
            "operator": "-",
            "slot": 0,
            "label": "CPT o CPTS negativo inicial",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 501,
        "type": "field",
        "text": "Capital aportado empresas que inician actividades en el año comercial que corresponda a esta declaración",
        "bold": false,
        "fields": [
          {
            "code": 1573,
            "operator": "+",
            "slot": 0,
            "label": "Capital aportado empresas que inician actividades en el año comercial que corresponda a esta declaración",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 502,
        "type": "field",
        "text": "Aumentos (efectivos) de capital del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1574,
            "operator": "+",
            "slot": 0,
            "label": "Aumentos (efectivos) de capital del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 503,
        "type": "field",
        "text": "Disminuciones (efectivas) de capital del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1575,
            "operator": "-",
            "slot": 0,
            "label": "Disminuciones (efectivas) de capital del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 504,
        "type": "field",
        "text": "Base imponible del ejercicio, asignable a los propietarios",
        "bold": false,
        "fields": [
          {
            "code": 1712,
            "operator": "+",
            "slot": 0,
            "label": "Base imponible del ejercicio, asignable a los propietarios",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 505,
        "type": "field",
        "text": "Pérdida tributaria del ejercicio al 31 de diciembre",
        "bold": false,
        "fields": [
          {
            "code": 1713,
            "operator": "-",
            "slot": 0,
            "label": "Pérdida tributaria del ejercicio al 31 de diciembre",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 506,
        "type": "field",
        "text": "Pérdidas tributarias de ejercicios anteriores",
        "bold": false,
        "fields": [
          {
            "code": 1714,
            "operator": "+",
            "slot": 0,
            "label": "Pérdidas tributarias de ejercicios anteriores",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 507,
        "type": "field",
        "text": "Remesas, retiros o dividendos repartidos en el ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1576,
            "operator": "-",
            "slot": 0,
            "label": "Remesas, retiros o dividendos repartidos en el ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 508,
        "type": "field",
        "text": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado, cuando corresponda",
        "bold": false,
        "fields": [
          {
            "code": 1715,
            "operator": "-",
            "slot": 0,
            "label": "Ingreso diferido imputado en el ejercicio, debidamente incrementado y reajustado, cuando corresponda",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 509,
        "type": "field",
        "text": "Partidas de gastos no aceptados",
        "bold": false,
        "fields": [
          {
            "code": 1577,
            "operator": "-",
            "slot": 0,
            "label": "Partidas de gastos no aceptados",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 510,
        "type": "field",
        "text": "Crédito por activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
        "bold": false,
        "fields": [
          {
            "code": 1716,
            "operator": "-",
            "slot": 0,
            "label": "Crédito por activos fijos adquiridos en el ejercicio (art. 33 bis LIR)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 511,
        "type": "field",
        "text": "Crédito por IDPC, por participaciones en otras empresas que incrementaron la BI del ejercicio",
        "bold": false,
        "fields": [
          {
            "code": 1578,
            "operator": "-",
            "slot": 0,
            "label": "Crédito por IDPC, por participaciones en otras empresas que incrementaron la BI del ejercicio",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 512,
        "type": "field",
        "text": "Otras partidas a agregar",
        "bold": false,
        "fields": [
          {
            "code": 1584,
            "operator": "+",
            "slot": 0,
            "label": "Otras partidas a agregar",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 513,
        "type": "field",
        "text": "Otras partidas a deducir",
        "bold": false,
        "fields": [
          {
            "code": 1585,
            "operator": "-",
            "slot": 0,
            "label": "Otras partidas a deducir",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 514,
        "type": "field",
        "text": "CPTS positivo final",
        "bold": false,
        "fields": [
          {
            "code": 1581,
            "operator": "=",
            "slot": 0,
            "label": "CPTS positivo final",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 515,
        "type": "field",
        "text": "CPTS negativo final",
        "bold": false,
        "fields": [
          {
            "code": 1583,
            "operator": "=",
            "slot": 0,
            "label": "CPTS negativo final",
            "dataType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "RECUADRO 24",
    "title": "RECUADRO N° 24: PAGO PRÉSTAMO TASA 0% PERCIBIDO EN EL AÑO COMERCIAL 2021 (PRÉSTAMO SOLIDARIO DEL ESTADO)",
    "columnHeaders": [
      "",
      "",
      "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
      "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
      "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
      "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
      "",
      "RENTAS Y REBAJAS",
      "RENTAS Y REBAJAS"
    ],
    "rows": [
      {
        "rowIndex": 518,
        "type": "field",
        "text": "5% de las rentas que forman parte de la declaración anual de impuestos a la renta según art. 65 LIR (calculado sobre el código 170)",
        "bold": false,
        "fields": [
          {
            "code": 1784,
            "operator": "",
            "slot": 8,
            "label": "5% de las rentas que forman parte de la declaración anual de impuestos a la renta según art. 65 LIR (calculado sobre el código 170)",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 519,
        "type": "sub_header",
        "text": "DETERMINACIÓN CUOTA ANUAL",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 520,
        "type": "field",
        "text": "Cuota anual (30% del monto del préstamo tasa 0%), según art. 11 inc. 1° Ley N° 21.323",
        "bold": false,
        "fields": [
          {
            "code": 1801,
            "operator": "",
            "slot": 8,
            "label": "Cuota anual (30% del monto del préstamo tasa 0%), según art. 11 inc. 1° Ley N° 21.323",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 521,
        "type": "field",
        "text": "Saldo pendiente cuota año anterior",
        "bold": false,
        "fields": [
          {
            "code": 1799,
            "operator": "+",
            "slot": 8,
            "label": "Saldo pendiente cuota año anterior",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 522,
        "type": "field",
        "text": "Monto a pagar de la cuota",
        "bold": false,
        "fields": [
          {
            "code": 1802,
            "operator": "+",
            "slot": 8,
            "label": "Monto a pagar de la cuota",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 523,
        "type": "sub_header",
        "text": "ANTICIPOS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 524,
        "type": "field",
        "text": "Pago anticipado por reintegro del préstamo tasa 0% (F-50, F-10 o código 1842 del F-22 AT2025), según art. 11 inc. 3° Ley N° 21.323",
        "bold": false,
        "fields": [
          {
            "code": 1787,
            "operator": "-",
            "slot": 8,
            "label": "Pago anticipado por reintegro del préstamo tasa 0% (F-50, F-10 o código 1842 del F-22 AT2025), según art. 11 inc. 3° Ley N° 21.323",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 525,
        "type": "sub_header",
        "text": "MONTOS A PAGAR",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 526,
        "type": "field",
        "text": "Monto a pagar de la cuota después de anticipos",
        "bold": false,
        "fields": [
          {
            "code": 1788,
            "operator": "=",
            "slot": 8,
            "label": "Monto a pagar de la cuota después de anticipos",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 527,
        "type": "sub_header",
        "text": "RETENCIONES ADICIONALES Y PPMA",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 528,
        "type": "field",
        "text": "Retención adicional sobre rentas del art. 42 N° 1 LIR con tasa del 3% (retención a trabajadores dependientes), por reintegro del préstamo tasa 0%,  según art. 11 letra a) Ley N° 21.323",
        "bold": false,
        "fields": [
          {
            "code": 1789,
            "operator": "-",
            "slot": 8,
            "label": "Retención adicional sobre rentas del art. 42 N° 1 LIR con tasa del 3% (retención a trabajadores dependientes), por reintegro del préstamo tasa 0%,  según art. 11 letra a) Ley N° 21.323",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 529,
        "type": "field",
        "text": "Retención adicional sobre rentas del art. 42 N° 2 LIR con tasa del 3% (retención a trabajadores independientes), por reintegro del préstamo tasa 0%, según  art. 11 letra b) Ley N° 21.323",
        "bold": false,
        "fields": [
          {
            "code": 1790,
            "operator": "-",
            "slot": 8,
            "label": "Retención adicional sobre rentas del art. 42 N° 2 LIR con tasa del 3% (retención a trabajadores independientes), por reintegro del préstamo tasa 0%, según  art. 11 letra b) Ley N° 21.323",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 530,
        "type": "field",
        "text": "PPMA primera categoría art. 84 letra a) y 14 letra D) N° 3 letra (k) y N° 8 letra (a) numeral (viii) LIR, con tasa 3%, por reintegro de préstamo tasa 0%, según art. 11 letra c) Ley N° 21.323",
        "bold": false,
        "fields": [
          {
            "code": 1791,
            "operator": "-",
            "slot": 8,
            "label": "PPMA primera categoría art. 84 letra a) y 14 letra D) N° 3 letra (k) y N° 8 letra (a) numeral (viii) LIR, con tasa 3%, por reintegro de préstamo tasa 0%, según art. 11 letra c) Ley N° 21.323",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 531,
        "type": "field",
        "text": "PPMA segunda categoría art. 84 letra b) LIR, con tasa 3%, por reintegro de préstamo  tasa 0%, (trabajadores independientes) según art. 11 letra b) Ley N° 21.323",
        "bold": false,
        "fields": [
          {
            "code": 1792,
            "operator": "-",
            "slot": 8,
            "label": "PPMA segunda categoría art. 84 letra b) LIR, con tasa 3%, por reintegro de préstamo  tasa 0%, (trabajadores independientes) según art. 11 letra b) Ley N° 21.323",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 532,
        "type": "field",
        "text": "Total retenciones adicionales y PPMA",
        "bold": true,
        "fields": [
          {
            "code": 1793,
            "operator": "=",
            "slot": 8,
            "label": "Total retenciones adicionales y PPMA",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 533,
        "type": "sub_header",
        "text": "RELIQUIDACIÓN",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 534,
        "type": "field",
        "text": "Monto a pagar de la cuota después de retenciones adicionales y PPMA",
        "bold": false,
        "fields": [
          {
            "code": 1794,
            "operator": "=",
            "slot": 8,
            "label": "Monto a pagar de la cuota después de retenciones adicionales y PPMA",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 535,
        "type": "field",
        "text": "Saldo a devolver por retenciones adicionales y PPMA en exceso",
        "bold": false,
        "fields": [
          {
            "code": 1795,
            "operator": "",
            "slot": 8,
            "label": "Saldo a devolver por retenciones adicionales y PPMA en exceso",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 537,
        "type": "sub_header",
        "text": "BASE IMPONIBLE IUSC O IGC O IA",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 538,
        "type": "col_header",
        "text": "TIPOS  DE RENTAS Y REBAJAS",
        "bold": false,
        "fields": [],
        "colTexts": [
          "",
          "",
          "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
          "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
          "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
          "CRÉDITO POR IMPUESTO DE PRIMERA CATEGORÍA",
          "",
          "RENTAS Y REBAJAS",
          "RENTAS Y REBAJAS"
        ]
      },
      {
        "rowIndex": 541,
        "type": "sub_header",
        "text": "RENTAS BRUTAS AFECTAS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 542,
        "type": "field",
        "text": "1",
        "bold": false,
        "fields": [
          {
            "code": 1592,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1024,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1593,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1025,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 104,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 543,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 2005,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 2006,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 2007,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 2008,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 2009,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 544,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 2000,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 2001,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 2002,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 2003,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 2004,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 545,
        "type": "field",
        "text": "2",
        "bold": false,
        "fields": [
          {
            "code": 1594,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1026,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1595,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1027,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 105,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 546,
        "type": "field",
        "text": "3",
        "bold": false,
        "fields": [
          {
            "code": 106,
            "operator": "+",
            "slot": 8,
            "label": "3",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 547,
        "type": "field",
        "text": "4",
        "bold": false,
        "fields": [
          {
            "code": 603,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 108,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 548,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1920,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1921,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 549,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1922,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1923,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 550,
        "type": "field",
        "text": "5",
        "bold": false,
        "fields": [
          {
            "code": 1721,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1722,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1596,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 954,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 955,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 551,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1917,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1848,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1849,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 552,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1850,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1851,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1852,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 553,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1853,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1854,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1855,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1856,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1857,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 554,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1858,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1859,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1860,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1861,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1862,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 555,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1872,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1873,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 556,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1863,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1864,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1865,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 557,
        "type": "field",
        "text": "6",
        "bold": false,
        "fields": [
          {
            "code": 1597,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1598,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1599,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1631,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1632,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 558,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 2010,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 2011,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 2012,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 2013,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 2014,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 559,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 2015,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 2016,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 2017,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 2018,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 2019,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 560,
        "type": "field",
        "text": "7",
        "bold": false,
        "fields": [
          {
            "code": 110,
            "operator": "+",
            "slot": 8,
            "label": "7",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 561,
        "type": "field",
        "text": "8",
        "bold": false,
        "fields": [
          {
            "code": 605,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 155,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 562,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1866,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1867,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 563,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1869,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 564,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1871,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 565,
        "type": "field",
        "text": "9",
        "bold": false,
        "fields": [
          {
            "code": 1633,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1105,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1634,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 606,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 152,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 566,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1874,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1875,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1876,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1877,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1878,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 567,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1879,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1880,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1881,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1882,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1883,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 568,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1884,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 569,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1885,
            "operator": "",
            "slot": 3,
            "dataType": "number"
          },
          {
            "code": 1886,
            "operator": "",
            "slot": 5,
            "dataType": "number"
          },
          {
            "code": 1887,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1888,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1889,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 570,
        "type": "field",
        "text": "10",
        "bold": false,
        "fields": [
          {
            "code": 1635,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1031,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1032,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 571,
        "type": "field",
        "text": "11",
        "bold": false,
        "fields": [
          {
            "code": 1890,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1891,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 572,
        "type": "field",
        "text": "12",
        "bold": false,
        "fields": [
          {
            "code": 1914,
            "operator": "",
            "slot": 7,
            "dataType": "number"
          },
          {
            "code": 1104,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 573,
        "type": "field",
        "text": "13",
        "bold": false,
        "fields": [
          {
            "code": 1098,
            "operator": "",
            "slot": 0,
            "label": "Sueldos y otras rentas similares de fuente extranjera",
            "dataType": "number"
          },
          {
            "code": 1030,
            "operator": "",
            "slot": 6,
            "label": "Sueldos y otras rentas similares de fuente extranjera",
            "dataType": "number"
          },
          {
            "code": 161,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 574,
        "type": "field",
        "text": "14",
        "bold": false,
        "fields": [
          {
            "code": 159,
            "operator": "",
            "slot": 0,
            "label": "Incremento por impuestos soportados en el exterior, según art. 41 A LIR",
            "dataType": "number"
          },
          {
            "code": 748,
            "operator": "",
            "slot": 6,
            "label": "Incremento por impuestos soportados en el exterior, según art. 41 A LIR",
            "dataType": "number"
          },
          {
            "code": 749,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 576,
        "type": "sub_header",
        "text": "REBAJAS A LA RENTA",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 577,
        "type": "field",
        "text": "15",
        "bold": false,
        "fields": [
          {
            "code": 166,
            "operator": "-",
            "slot": 8,
            "label": "15",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 578,
        "type": "field",
        "text": "16",
        "bold": false,
        "fields": [
          {
            "code": 907,
            "operator": "-",
            "slot": 8,
            "label": "16",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 579,
        "type": "field",
        "text": "17",
        "bold": false,
        "fields": [
          {
            "code": 169,
            "operator": "-",
            "slot": 8,
            "label": "17",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 580,
        "type": "field",
        "text": "18",
        "bold": false,
        "fields": [
          {
            "code": 1833,
            "operator": "-",
            "slot": 8,
            "label": "18",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 581,
        "type": "field",
        "text": "19",
        "bold": false,
        "fields": [
          {
            "code": 158,
            "operator": "=",
            "slot": 8,
            "label": "19",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 582,
        "type": "field",
        "text": "20",
        "bold": false,
        "fields": [
          {
            "code": 111,
            "operator": "-",
            "slot": 8,
            "label": "20",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 583,
        "type": "field",
        "text": "21",
        "bold": false,
        "fields": [
          {
            "code": 750,
            "operator": "",
            "slot": 0,
            "label": "Dividendos hipotecarios pagados por viviendas nuevas acogidas al D.F.L. Nº 2 de 1959, según Ley N°19.622",
            "dataType": "number"
          },
          {
            "code": 740,
            "operator": "",
            "slot": 6,
            "label": "Dividendos hipotecarios pagados por viviendas nuevas acogidas al D.F.L. Nº 2 de 1959, según Ley N°19.622",
            "dataType": "number"
          },
          {
            "code": 751,
            "operator": "-",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 584,
        "type": "field",
        "text": "22",
        "bold": false,
        "fields": [
          {
            "code": 822,
            "operator": "-",
            "slot": 8,
            "label": "22",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 585,
        "type": "field",
        "text": "23",
        "bold": false,
        "fields": [
          {
            "code": 765,
            "operator": "-",
            "slot": 8,
            "label": "23",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 586,
        "type": "sub_header",
        "text": "BASE IMPONIBLE ANUAL",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 587,
        "type": "field",
        "text": "24",
        "bold": false,
        "fields": [
          {
            "code": 170,
            "operator": "=",
            "slot": 8,
            "label": "24",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 589,
        "type": "sub_header",
        "text": "IUSC o IGC, Y DÉBITOS FISCALES",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 590,
        "type": "field",
        "text": "25",
        "bold": false,
        "fields": [
          {
            "code": 157,
            "operator": "+",
            "slot": 8,
            "label": "25",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 591,
        "type": "field",
        "text": "26",
        "bold": false,
        "fields": [
          {
            "code": 1017,
            "operator": "+",
            "slot": 8,
            "label": "26",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 592,
        "type": "field",
        "text": "27",
        "bold": false,
        "fields": [
          {
            "code": 1033,
            "operator": "+",
            "slot": 8,
            "label": "27",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 593,
        "type": "field",
        "text": "28",
        "bold": false,
        "fields": [
          {
            "code": 201,
            "operator": "+",
            "slot": 8,
            "label": "28",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 594,
        "type": "field",
        "text": "29",
        "bold": false,
        "fields": [
          {
            "code": 1035,
            "operator": "+",
            "slot": 8,
            "label": "29",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 595,
        "type": "field",
        "text": "30",
        "bold": false,
        "fields": [
          {
            "code": 910,
            "operator": "+",
            "slot": 8,
            "label": "30",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 597,
        "type": "sub_header",
        "text": "CRÉDITOS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 598,
        "type": "field",
        "text": "31",
        "bold": false,
        "fields": [
          {
            "code": 1036,
            "operator": "-",
            "slot": 8,
            "label": "31",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 599,
        "type": "field",
        "text": "32",
        "bold": false,
        "fields": [
          {
            "code": 1101,
            "operator": "-",
            "slot": 8,
            "label": "32",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 600,
        "type": "field",
        "text": "33",
        "bold": false,
        "fields": [
          {
            "code": 135,
            "operator": "-",
            "slot": 8,
            "label": "33",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 601,
        "type": "field",
        "text": "34",
        "bold": false,
        "fields": [
          {
            "code": 136,
            "operator": "-",
            "slot": 8,
            "label": "34",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 602,
        "type": "field",
        "text": "35",
        "bold": false,
        "fields": [
          {
            "code": 176,
            "operator": "-",
            "slot": 8,
            "label": "35",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 603,
        "type": "field",
        "text": "36",
        "bold": false,
        "fields": [
          {
            "code": 752,
            "operator": "-",
            "slot": 8,
            "label": "36",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 604,
        "type": "field",
        "text": "37",
        "bold": false,
        "fields": [
          {
            "code": 608,
            "operator": "-",
            "slot": 8,
            "label": "37",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 605,
        "type": "field",
        "text": "38",
        "bold": false,
        "fields": [
          {
            "code": 1636,
            "operator": "-",
            "slot": 8,
            "label": "38",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 606,
        "type": "field",
        "text": "39",
        "bold": false,
        "fields": [
          {
            "code": 1637,
            "operator": "-",
            "slot": 8,
            "label": "39",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 607,
        "type": "field",
        "text": "40",
        "bold": false,
        "fields": [
          {
            "code": 1638,
            "operator": "-",
            "slot": 8,
            "label": "40",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 608,
        "type": "field",
        "text": "41",
        "bold": false,
        "fields": [
          {
            "code": 895,
            "operator": "-",
            "slot": 8,
            "label": "41",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 609,
        "type": "field",
        "text": "42",
        "bold": false,
        "fields": [
          {
            "code": 867,
            "operator": "-",
            "slot": 8,
            "label": "42",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 610,
        "type": "field",
        "text": "43",
        "bold": false,
        "fields": [
          {
            "code": 609,
            "operator": "-",
            "slot": 8,
            "label": "43",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 611,
        "type": "field",
        "text": "44",
        "bold": false,
        "fields": [
          {
            "code": 1639,
            "operator": "-",
            "slot": 8,
            "label": "44",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 612,
        "type": "field",
        "text": "45",
        "bold": false,
        "fields": [
          {
            "code": 1018,
            "operator": "-",
            "slot": 8,
            "label": "45",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 613,
        "type": "field",
        "text": "46",
        "bold": false,
        "fields": [
          {
            "code": 162,
            "operator": "-",
            "slot": 8,
            "label": "46",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 614,
        "type": "field",
        "text": "47",
        "bold": false,
        "fields": [
          {
            "code": 174,
            "operator": "-",
            "slot": 8,
            "label": "47",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 615,
        "type": "field",
        "text": "48",
        "bold": false,
        "fields": [
          {
            "code": 610,
            "operator": "-",
            "slot": 8,
            "label": "48",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 616,
        "type": "field",
        "text": "49",
        "bold": false,
        "fields": [
          {
            "code": 746,
            "operator": "-",
            "slot": 8,
            "label": "49",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 617,
        "type": "field",
        "text": "50",
        "bold": false,
        "fields": [
          {
            "code": 866,
            "operator": "-",
            "slot": 8,
            "label": "50",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 618,
        "type": "field",
        "text": "51",
        "bold": false,
        "fields": [
          {
            "code": 607,
            "operator": "-",
            "slot": 8,
            "label": "51",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 619,
        "type": "field",
        "text": "52",
        "bold": false,
        "fields": [
          {
            "code": 304,
            "operator": "=",
            "slot": 8,
            "label": "52",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 621,
        "type": "sub_header",
        "text": "IMPUESTOS ANUALES A LA RENTA",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 622,
        "type": "sub_header",
        "text": "IMPUESTOS DETERMINADOS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 623,
        "type": "field",
        "text": "53",
        "bold": false,
        "fields": [
          {
            "code": 31,
            "operator": "+",
            "slot": 8,
            "label": "REBAJAS AL IMPUESTO",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 624,
        "type": "field",
        "text": "54",
        "bold": false,
        "fields": [
          {
            "code": 18,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 19,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 20,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 625,
        "type": "field",
        "text": "55",
        "bold": false,
        "fields": [
          {
            "code": 1109,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1111,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1113,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 626,
        "type": "field",
        "text": "56",
        "bold": false,
        "fields": [
          {
            "code": 1640,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1641,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1642,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 627,
        "type": "field",
        "text": "57",
        "bold": false,
        "fields": [
          {
            "code": 187,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 188,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 189,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 628,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1924,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1925,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1926,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 629,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1927,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1928,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 630,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1929,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1930,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 631,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1931,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1932,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 632,
        "type": "field",
        "text": "58",
        "bold": false,
        "fields": [
          {
            "code": 1037,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1038,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1039,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 633,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1892,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1893,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1894,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 634,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1895,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1897,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 635,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1898,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1899,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1900,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 636,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1901,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1902,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1903,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 637,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1912,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1918,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1913,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 638,
        "type": "field",
        "text": "59",
        "bold": false,
        "fields": [
          {
            "code": 77,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 74,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 79,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 639,
        "type": "field",
        "text": "60",
        "bold": false,
        "fields": [
          {
            "code": 1040,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1041,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 640,
        "type": "field",
        "text": "61",
        "bold": false,
        "fields": [
          {
            "code": 1042,
            "operator": "+",
            "slot": 8,
            "label": "61",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 641,
        "type": "field",
        "text": "62",
        "bold": false,
        "fields": [
          {
            "code": 824,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 825,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 642,
        "type": "field",
        "text": "63",
        "bold": false,
        "fields": [
          {
            "code": 1976,
            "operator": "+",
            "slot": 8,
            "label": "63",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 643,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1977,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1978,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 644,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1979,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1980,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 645,
        "type": "field",
        "text": "64",
        "bold": false,
        "fields": [
          {
            "code": 1043,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1102,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1044,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 646,
        "type": "field",
        "text": "65",
        "bold": false,
        "fields": [
          {
            "code": 113,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1007,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 114,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 647,
        "type": "field",
        "text": "66",
        "bold": false,
        "fields": [
          {
            "code": 1829,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1830,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 648,
        "type": "field",
        "text": "67",
        "bold": false,
        "fields": [
          {
            "code": 1835,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1836,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 1837,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 649,
        "type": "field",
        "text": "68",
        "bold": false,
        "fields": [
          {
            "code": 908,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 909,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 650,
        "type": "field",
        "text": "69",
        "bold": false,
        "fields": [
          {
            "code": 951,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 952,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 651,
        "type": "field",
        "text": "70",
        "bold": false,
        "fields": [
          {
            "code": 753,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 754,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 755,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 652,
        "type": "field",
        "text": "71",
        "bold": false,
        "fields": [
          {
            "code": 133,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 138,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 134,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 653,
        "type": "field",
        "text": "72",
        "bold": false,
        "fields": [
          {
            "code": 32,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 76,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 34,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 654,
        "type": "field",
        "text": "73",
        "bold": false,
        "fields": [
          {
            "code": 1643,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 1644,
            "operator": "+",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 655,
        "type": "field",
        "text": "74",
        "bold": false,
        "fields": [
          {
            "code": 911,
            "operator": "+",
            "slot": 8,
            "label": "74",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 656,
        "type": "field",
        "text": "75",
        "bold": false,
        "fields": [
          {
            "code": 913,
            "operator": "+",
            "slot": 8,
            "label": "75",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 657,
        "type": "field",
        "text": "76",
        "bold": false,
        "fields": [
          {
            "code": 923,
            "operator": "+",
            "slot": 8,
            "label": "76",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 658,
        "type": "field",
        "text": "77",
        "bold": false,
        "fields": [
          {
            "code": 924,
            "operator": "+",
            "slot": 8,
            "label": "77",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 659,
        "type": "field",
        "text": "78",
        "bold": false,
        "fields": [
          {
            "code": 1051,
            "operator": "+",
            "slot": 8,
            "label": "78",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 660,
        "type": "field",
        "text": "79",
        "bold": false,
        "fields": [
          {
            "code": 1052,
            "operator": "+",
            "slot": 8,
            "label": "79",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 661,
        "type": "field",
        "text": "80",
        "bold": false,
        "fields": [
          {
            "code": 21,
            "operator": "+",
            "slot": 8,
            "label": "80",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 662,
        "type": "field",
        "text": "81",
        "bold": false,
        "fields": [
          {
            "code": 43,
            "operator": "+",
            "slot": 8,
            "label": "81",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 663,
        "type": "field",
        "text": "82",
        "bold": false,
        "fields": [
          {
            "code": 767,
            "operator": "+",
            "slot": 8,
            "label": "82",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 664,
        "type": "field",
        "text": "83",
        "bold": false,
        "fields": [
          {
            "code": 862,
            "operator": "+",
            "slot": 8,
            "label": "83",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 666,
        "type": "sub_header",
        "text": "DEDUCCIONES A LOS IMPUESTOS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 667,
        "type": "field",
        "text": "84",
        "bold": false,
        "fields": [
          {
            "code": 51,
            "operator": "",
            "slot": 4,
            "dataType": "number"
          },
          {
            "code": 63,
            "operator": "",
            "slot": 6,
            "dataType": "number"
          },
          {
            "code": 71,
            "operator": "-",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 668,
        "type": "field",
        "text": "85",
        "bold": false,
        "fields": [
          {
            "code": 36,
            "operator": "-",
            "slot": 8,
            "label": "85",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 669,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1904,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 670,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1905,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 671,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1906,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 672,
        "type": "field",
        "text": "",
        "bold": false,
        "fields": [
          {
            "code": 1916,
            "operator": "",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 673,
        "type": "field",
        "text": "86",
        "bold": false,
        "fields": [
          {
            "code": 848,
            "operator": "-",
            "slot": 8,
            "label": "86",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 674,
        "type": "field",
        "text": "87",
        "bold": false,
        "fields": [
          {
            "code": 82,
            "operator": "-",
            "slot": 8,
            "label": "87",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 675,
        "type": "field",
        "text": "88",
        "bold": false,
        "fields": [
          {
            "code": 1123,
            "operator": "-",
            "slot": 8,
            "label": "88",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 676,
        "type": "field",
        "text": "89",
        "bold": false,
        "fields": [
          {
            "code": 83,
            "operator": "-",
            "slot": 8,
            "label": "89",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 677,
        "type": "field",
        "text": "90",
        "bold": false,
        "fields": [
          {
            "code": 173,
            "operator": "-",
            "slot": 8,
            "label": "90",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 678,
        "type": "field",
        "text": "91",
        "bold": false,
        "fields": [
          {
            "code": 198,
            "operator": "-",
            "slot": 8,
            "label": "91",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 679,
        "type": "field",
        "text": "92",
        "bold": false,
        "fields": [
          {
            "code": 54,
            "operator": "-",
            "slot": 8,
            "label": "92",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 680,
        "type": "field",
        "text": "93",
        "bold": false,
        "fields": [
          {
            "code": 832,
            "operator": "-",
            "slot": 8,
            "label": "93",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 681,
        "type": "field",
        "text": "94",
        "bold": false,
        "fields": [
          {
            "code": 1907,
            "operator": "-",
            "slot": 8,
            "label": "94",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 682,
        "type": "field",
        "text": "95",
        "bold": false,
        "fields": [
          {
            "code": 833,
            "operator": "-",
            "slot": 8,
            "label": "95",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 683,
        "type": "field",
        "text": "96",
        "bold": false,
        "fields": [
          {
            "code": 1908,
            "operator": "-",
            "slot": 8,
            "label": "96",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 684,
        "type": "field",
        "text": "97",
        "bold": false,
        "fields": [
          {
            "code": 119,
            "operator": "",
            "slot": 1,
            "label": "Remanente de crédito por IDPC proveniente de códigos 1638 y/o 610",
            "dataType": "number"
          },
          {
            "code": 116,
            "operator": "",
            "slot": 6,
            "label": "Remanente de crédito por IDPC proveniente de códigos 1638 y/o 610",
            "dataType": "number"
          },
          {
            "code": 757,
            "operator": "-",
            "slot": 8,
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 685,
        "type": "field",
        "text": "98",
        "bold": false,
        "fields": [
          {
            "code": 58,
            "operator": "-",
            "slot": 8,
            "label": "98",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 686,
        "type": "field",
        "text": "99",
        "bold": false,
        "fields": [
          {
            "code": 1645,
            "operator": "-",
            "slot": 8,
            "label": "99",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 687,
        "type": "field",
        "text": "100",
        "bold": false,
        "fields": [
          {
            "code": 181,
            "operator": "-",
            "slot": 8,
            "label": "100",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 688,
        "type": "field",
        "text": "101",
        "bold": false,
        "fields": [
          {
            "code": 881,
            "operator": "-",
            "slot": 8,
            "label": "101",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 689,
        "type": "field",
        "text": "102",
        "bold": false,
        "fields": [
          {
            "code": 1646,
            "operator": "-",
            "slot": 8,
            "label": "102",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 690,
        "type": "field",
        "text": "103",
        "bold": false,
        "fields": [
          {
            "code": 1647,
            "operator": "-",
            "slot": 8,
            "label": "103",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 691,
        "type": "field",
        "text": "104",
        "bold": false,
        "fields": [
          {
            "code": 1910,
            "operator": "-",
            "slot": 8,
            "label": "104",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 692,
        "type": "field",
        "text": "105",
        "bold": false,
        "fields": [
          {
            "code": 1915,
            "operator": "-",
            "slot": 8,
            "label": "105",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 693,
        "type": "sub_header",
        "text": "OTROS CARGOS",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 694,
        "type": "field",
        "text": "106",
        "bold": false,
        "fields": [
          {
            "code": 900,
            "operator": "+",
            "slot": 8,
            "label": "106",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 695,
        "type": "field",
        "text": "107",
        "bold": false,
        "fields": [
          {
            "code": 1796,
            "operator": "+",
            "slot": 8,
            "label": "107",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 696,
        "type": "field",
        "text": "108",
        "bold": false,
        "fields": [
          {
            "code": 1827,
            "operator": "+",
            "slot": 8,
            "label": "108",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 697,
        "type": "field",
        "text": "109",
        "bold": false,
        "fields": [
          {
            "code": 305,
            "operator": "=",
            "slot": 8,
            "label": "109",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 699,
        "type": "sub_header",
        "text": "REMANENTE DE CRÉDITO",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 700,
        "type": "field",
        "text": "110",
        "bold": false,
        "fields": [
          {
            "code": 85,
            "operator": "+",
            "slot": 8,
            "label": "110",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 701,
        "type": "field",
        "text": "111",
        "bold": false,
        "fields": [
          {
            "code": 86,
            "operator": "-",
            "slot": 8,
            "label": "111",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 702,
        "type": "sub_header",
        "text": "DEVOLUCIÓN SOLICITADA",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 703,
        "type": "field",
        "text": "112",
        "bold": false,
        "fields": [
          {
            "code": 87,
            "operator": "=",
            "slot": 8,
            "label": "112",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 704,
        "type": "sub_header",
        "text": "SOLICITO DEPOSITAR REMANENTE EN CUENTA CORRIENTE O DE AHORRO BANCARIA",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 705,
        "type": "field",
        "text": "Nombre institución bancaria",
        "bold": false,
        "fields": [
          {
            "code": 301,
            "operator": "",
            "slot": 2,
            "label": "Nombre institución bancaria",
            "dataType": "text"
          }
        ]
      },
      {
        "rowIndex": 706,
        "type": "field",
        "text": "Número de cuenta",
        "bold": false,
        "fields": [
          {
            "code": 306,
            "operator": "",
            "slot": 2,
            "label": "Número de cuenta",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 707,
        "type": "field",
        "text": "Tipo de cuenta",
        "bold": false,
        "fields": [
          {
            "code": 780,
            "operator": "",
            "slot": 2,
            "label": "Cuenta corriente",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 713,
        "type": "sub_header",
        "text": "IMPUESTO A PAGAR",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 714,
        "type": "field",
        "text": "113",
        "bold": false,
        "fields": [
          {
            "code": 90,
            "operator": "+",
            "slot": 8,
            "label": "113",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 715,
        "type": "field",
        "text": "114",
        "bold": false,
        "fields": [
          {
            "code": 39,
            "operator": "+",
            "slot": 8,
            "label": "114",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 716,
        "type": "field",
        "text": "115",
        "bold": false,
        "fields": [
          {
            "code": 91,
            "operator": "=",
            "slot": 8,
            "label": "115",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 717,
        "type": "sub_header",
        "text": "RECARGOS POR DECLARACIÓN FUERA DE PLAZO",
        "bold": false,
        "fields": []
      },
      {
        "rowIndex": 718,
        "type": "field",
        "text": "116",
        "bold": false,
        "fields": [
          {
            "code": 92,
            "operator": "+",
            "slot": 8,
            "label": "116",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 719,
        "type": "field",
        "text": "117",
        "bold": false,
        "fields": [
          {
            "code": 93,
            "operator": "+",
            "slot": 8,
            "label": "117",
            "dataType": "number"
          }
        ]
      },
      {
        "rowIndex": 720,
        "type": "field",
        "text": "118",
        "bold": false,
        "fields": [
          {
            "code": 94,
            "operator": "=",
            "slot": 8,
            "label": "118",
            "dataType": "number"
          }
        ]
      }
    ]
  }
];
