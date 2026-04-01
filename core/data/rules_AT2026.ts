/*
* AUTO - GENERATED — do not edit manually.
* Source: 5_CSW_Set_1.0_AT2026.xlsx
* 
* Regenerate with:
* deno run - - allow - read - - allow - write scripts / build_data.ts
*/

import type { RawRule } from "../models/rule.ts";

export const RAW_RULES: RawRule[] = [
  {
    "ruleId": "a.1",
    "targetFieldRaw": "[06]",
    "operatorRaw": "validation",
    "formulaRaw": "B",
    "guidanceText": "Debe registrar domicilio"
  },
  {
    "ruleId": "a.3",
    "targetFieldRaw": "[547]",
    "operatorRaw": "=",
    "formulaRaw": "[545] + [461] + [856] + [1650]",
    "guidanceText": "El monto registrado en el código 547 debe ser igual a la suma de los códigos 545, 461, 856, y 1650."
  },
  {
    "ruleId": "a.4",
    "targetFieldRaw": "[494]",
    "operatorRaw": "=",
    "formulaRaw": "Si [465] = 0 .y. TIPO{[03]} = 1; entonces MIN{ P08 * [547] ; P42 } Sino 0",
    "guidanceText": "El monto registrado en el código 494 debe corresponder al mínimo entre 30% del valor declarado en el código 547 y el tope de 15 UTA."
  },
  {
    "ruleId": "a.5",
    "targetFieldRaw": "[467]",
    "operatorRaw": "=",
    "formulaRaw": "Si TIPO{[03]} = 2; entonces POS{[547] - [465]} Sino Si [617] > 0 .y. [547] = 0; entonces [617] - [770] - [872] Sino POS{POS{[547] - [465] - [494] - [850]} + [617] - [770] - [872]}",
    "guidanceText": "El monto registrado en el código 467 debe ser igual a la suma de los códigos 547 y 617 menos 770, 872, 465, 494 y 850. En el caso del código 617 solo es procedente deducir las cantidades anotadas en los códigos 770 y 872, y en el caso de sociedades profesionales la diferencia entre los códigos 547 y 465."
  },
  {
    "ruleId": "a.6",
    "targetFieldRaw": "[618]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[467] + [479]}",
    "guidanceText": "El monto registrado en el código 618 debe ser igual a la suma de los códigos 467 y 479."
  },
  {
    "ruleId": "a.7",
    "targetFieldRaw": "[619]",
    "operatorRaw": "=",
    "formulaRaw": "[492] + [491]",
    "guidanceText": "El monto registrado en el código 619 debe ser igual a la suma de los códigos 492 y 491."
  },
  {
    "ruleId": "a.10",
    "targetFieldRaw": "[703]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[701] - [702]}",
    "guidanceText": "El código 703 debe ser igual al resultado positivo del código 701 menos el código 702."
  },
  {
    "ruleId": "a.32",
    "targetFieldRaw": "[953]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[999] - [998]}",
    "guidanceText": "El código 953 debe ser igual que el código 999 y el código 998."
  },
  {
    "ruleId": "a.37",
    "targetFieldRaw": "[1066]",
    "operatorRaw": "=",
    "formulaRaw": "[938] + [949] - [950]",
    "guidanceText": "El monto registrado en el código 1066 debe ser igual a la suma de los códigos 938, y 949, menos el código 950, todos del recuadro N°10."
  },
  {
    "ruleId": "a.38",
    "targetFieldRaw": "[1058]",
    "operatorRaw": "=",
    "formulaRaw": "[1055] - [1056] - [1057]",
    "guidanceText": "El monto registrado en el código 1058 debe ser igual al código 1055 menos los códigos 1056 y 1057."
  },
  {
    "ruleId": "a.39",
    "targetFieldRaw": "[1061]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1058] - [1060]}",
    "guidanceText": "El monto del código 1061 debe ser igual al código 1058 menos el código 1060."
  },
  {
    "ruleId": "a.40",
    "targetFieldRaw": "[1062]",
    "operatorRaw": "=",
    "formulaRaw": "Si [1058] <=​ 0; entonces [1060] Sino POS{[1060] - [1058]}",
    "guidanceText": "El monto registrado en el código 1062 es incorrecto."
  },
  {
    "ruleId": "a.42",
    "targetFieldRaw": "[1100]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1061] - [1099] - [1847]}",
    "guidanceText": "El monto registrado en el código 1100 debe ser igual al código 1061 menos los códigos 1099 y 1847."
  },
  {
    "ruleId": "a.44",
    "targetFieldRaw": "[1654]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1651] + [1652] - [1653]}",
    "guidanceText": "El código 1654 debe ser igual a la suma de los códigos 1651, 1652 menos el código1653"
  },
  {
    "ruleId": "a.45",
    "targetFieldRaw": "[1096]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1358] - [1184]}",
    "guidanceText": "El monto del código 1096 del recuadro N° 7 debe ser el igual al código 1358 menos el código 1184."
  },
  {
    "ruleId": "a.46",
    "targetFieldRaw": "[1097]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1359] - [1362]}",
    "guidanceText": "El monto del código 1097 del recuadro N° 7 debe ser el igual al código 1359 menos el código 1362."
  },
  {
    "ruleId": "a.47",
    "targetFieldRaw": "[1106]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1360] - [1363]}",
    "guidanceText": "El monto del código 1106 del recuadro N° 7 debe ser el igual al código 1360 menos el código 1363."
  },
  {
    "ruleId": "a.48",
    "targetFieldRaw": "[1372]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1361] - [1364]}",
    "guidanceText": "El monto registrado en código 1372 debe ser igual al resultado de los códigos 1361 menos 1364. Recuadro N°7"
  },
  {
    "ruleId": "a.50",
    "targetFieldRaw": "[1174]",
    "operatorRaw": "=",
    "formulaRaw": "[1171] - [1172] + [1173]",
    "guidanceText": "El código 1174 del recuadro N°9 debe ser igual a la suma de los códigos 1171 y 1173 menos el código 1172."
  },
  {
    "ruleId": "a.51",
    "targetFieldRaw": "[1672]",
    "operatorRaw": "=",
    "formulaRaw": "[1657] + [1658] + [1659] + [1660] - [1661] - [1662] - [1140] - [1663] - [1664] - [1665] - [1666] - [1667] - [1668] - [1141] - [1142] - [1669] - [1670] - [1671]",
    "guidanceText": "El monto registrado en código 1672 debe ser igual al resultado de los códigos :1657 más 1658, 1659, 1660 menos 1661, 1662, 1140, 1663 menos 1664, 1665, 1666, 1667, 1668, 1141, 1142, 1669, 1670, 1671. Recuadro N°12"
  },
  {
    "ruleId": "a.52",
    "targetFieldRaw": "[1728]",
    "operatorRaw": "=",
    "formulaRaw": "[1672] - [1673] + [1674] + [1144] + [1675] + [1175] + [1676] + [1677] + [1678] + [1150] + [1147] + [1148] + [1149] + [1151] + [1991] - [1152] - [1176] - [1679] - [1680] - [1681] - [1974] - [1975] - [1682] - [1683] - [1684] - [1685] - [1686] - [1183] - [1687] - [1688] - [1689]",
    "guidanceText": "La renta liquida imponible registrada en el código 1728 del recuadro N° 12, debe ser igual al resultado de la suma de los códigos 1672, 1674, 1674, 1144, 1675, 1175, 1676, 1677, 1678, 1150, 1147, 1148, 1149, 1151 y 1991, menos los códigos 1673, 1152, 1176, 1679, 1680, 1681, 1974, 1975, 1682, 1683, 1684, 1685, 1686, 1183, 1687, 1688, y 1689, todos del mismo recuadro N°12"
  },
  {
    "ruleId": "a.53",
    "targetFieldRaw": "[1690]",
    "operatorRaw": "=",
    "formulaRaw": "Si [1728] > 0; entonces POS{[1728] - [1154] - [1157]} Sino [1728]",
    "guidanceText": "El código 1690 del recuadro N° 12 debe ser igual al código 1728 menos los códigos 1154 y 1157."
  },
  {
    "ruleId": "a.55",
    "targetFieldRaw": "[1718]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1698] > 0); entonces ([1698] + [1692] + [1699]) Sino POS{[1692] + [1699] - [1717]}",
    "guidanceText": "El monto registrado en código 1718 debe ser igual al resultado de los códigos 1698 menos el código 1717 más los códigos 1692, 1699 del recuadro N°13"
  },
  {
    "ruleId": "a.56",
    "targetFieldRaw": "[1199]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1718] - [1693] - [844] - [982] - [1198]}",
    "guidanceText": "El monto registrado en código 1199 debe ser igual a resultado de los códigos 1718 menos 1693, 844, 982, 1198. Recuadro N°13"
  },
  {
    "ruleId": "a.58",
    "targetFieldRaw": "[1150]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A; entonces ([1184] + [1362]) Sino 0",
    "guidanceText": "El monto registrado en el código 1150, del recuadro N°12, debe ser igual a la suma de los códigos 1184. y 1362 del recuadro N°7."
  },
  {
    "ruleId": "a.59",
    "targetFieldRaw": "[1698]",
    "operatorRaw": "=",
    "formulaRaw": "Si (atributo = M14A); entonces [645] Sino 0",
    "guidanceText": "El monto registrado en código 1698 debe ser igual a código 645 del recuadro N°14"
  },
  {
    "ruleId": "a.60",
    "targetFieldRaw": "[1717]",
    "operatorRaw": "=",
    "formulaRaw": "Si (atributo = M14A); entonces [646] Sino 0",
    "guidanceText": "El monto registrado en código 1717 debe ser igual a código 646 del recuadro N°14"
  },
  {
    "ruleId": "a.61",
    "targetFieldRaw": "[1694]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1690]}",
    "guidanceText": "El monto registrado en código 1694 del recuadro N°14 debe ser igual a código 1690 del recuadro N°12"
  },
  {
    "ruleId": "a.62",
    "targetFieldRaw": "[1695]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1690]}",
    "guidanceText": "El código 1695 del recuadro N°14, debe ser igual al código 1690 del recuadro N°12"
  },
  {
    "ruleId": "a.63",
    "targetFieldRaw": "[1696]",
    "operatorRaw": "=",
    "formulaRaw": "[1689]",
    "guidanceText": "El valor registrado en código 1696 del recuadro N°14 debe ser igual a código 1689 del recuadro N°12"
  },
  {
    "ruleId": "a.65",
    "targetFieldRaw": "[1700]",
    "operatorRaw": "=",
    "formulaRaw": "[1150]",
    "guidanceText": "El valor registrado en código 1700 del recuadro N°14 debe ser igual a código 1150 del recuadro N°12"
  },
  {
    "ruleId": "a.66",
    "targetFieldRaw": "[1701]",
    "operatorRaw": "=",
    "formulaRaw": "[1154]",
    "guidanceText": "El valor registrado en código 1701 del recuadro N°14 debe ser igual a código 1154 del recuadro N°12"
  },
  {
    "ruleId": "a.67",
    "targetFieldRaw": "[1702]",
    "operatorRaw": "=",
    "formulaRaw": "[1157]",
    "guidanceText": "El valor registrado en código 1702 del recuadro N°14 debe ser igual a código 1157 del recuadro N°12"
  },
  {
    "ruleId": "a.68",
    "targetFieldRaw": "[645]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1145] - [1146] + [1177] + [893] - [894] + [1694] - [1695] + [1696] + [1178] - [1179] + [1180] - [1182] - [1697] + [1186] - [1187] - [1700] - [1188] + [1701] + [1702] + [1189] - [1190]}",
    "guidanceText": "El capital propio tributario positivo final registrado en el código 645 debe ser igual al resultado positivo de la suma de los códigos 1145, 1177, 893, 1694, 1178, 1186, 1701, 1702, 1189, y la resta de los códigos 1146, 894, 1695, 1179, 1182, 1697, 1187, 1700, 1188 y 1190."
  },
  {
    "ruleId": "a.69",
    "targetFieldRaw": "[646]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1145] - [1146] + [1177] + [893] - [894] + [1694] - [1695] + [1696] + [1178] - [1179] + [1180] - [1182] - [1697] + [1186] - [1187] - [1700] - [1188] + [1701] + [1702] + [1189] - [1190]}",
    "guidanceText": "El capital propio tributario positivo final registrado en el código 645 debe ser igual al resultado negativo de la suma de los códigos 1145, 1177, 893, 1694, 1178, 1186, 1701, 1702, 1189, y la resta de los códigos 1146, 894, 1695, 1179, 1182, 1697, 1187, 1700, 1188 y 1190. El resultado se debe registrar sin signo negativo."
  },
  {
    "ruleId": "a.70",
    "targetFieldRaw": "[1210]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1200] - [1933] + [1202] - [1203] - [1204] + [1205] + [1206] - [1207] - [1208] - [1209]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1210 del recuadro N° 15 debe ser igual al resultado positivo de la suma de los códigos 1200 , 1202, 1205, y 1206, menos los códigos 1933, 1203, 1204, 1207, 1208 y 1209."
  },
  {
    "ruleId": "a.72",
    "targetFieldRaw": "[1220]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1211] + [1212] - [1213] - [1214] + [1215] + [1216] - [1217] - [1218] - [1219]}",
    "guidanceText": "El valor registrado en código 1220 debe ser igual a la operatoria de los códigos 1211 más 1212 menos 1213, 1214 más 1215, 1216 menos 1217, 1218, 1219. Recuadro N°15"
  },
  {
    "ruleId": "a.73",
    "targetFieldRaw": "[1232]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1221] - [1222] + [1224] - [1225] - [1226] + [1228] - [1229] - [1230] - [1231]}",
    "guidanceText": "El monto registrado en código 1232 debe ser igual al resultado positivo de la operatoria de los códigos 1221 menos 1222 más 1224 menos 1225, 1226 más 1228 menos 1229, 1230, 1231 . Recuadro N°15"
  },
  {
    "ruleId": "a.74",
    "targetFieldRaw": "[1233]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1221] - [1222] + [1224] - [1225] - [1226] + [1228] - [1229] - [1230] - [1231]}",
    "guidanceText": "El monto registrado en código 1233 debe ser igual al resultado negativo de la operatoria de los códigos 1221 menos 1222 más 1224 menos 1225, 1226 más 1228 menos 1229, 1230, 1231 . Recuadro N°15"
  },
  {
    "ruleId": "a.75",
    "targetFieldRaw": "[1749]",
    "operatorRaw": "=",
    "formulaRaw": "[1730] + [1934] + [1733] - [1735] - [1737] + [1741] - [1743] - [1745] - [1747]",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1749 del recuadro N° 15, debe ser igual al resultado positivo de la suma de los códigos 1730, 1934, 1733, 1741, menos los códigos 1735, 1737, 1743, 1745, 1747."
  },
  {
    "ruleId": "a.76",
    "targetFieldRaw": "[1750]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1731] - [1843] + [1734] - [1736] - [1738] + [1740] + [1742] - [1744] - [1746] - [1748]}",
    "guidanceText": "El monto registrado en código 1750 debe ser igual a la operatoria de los códigos 1731 menos 1843 más 1734 menos 1736, 1738 más 1740, 1742 menos 1744, 1746, 1748. Recuadro N°15"
  },
  {
    "ruleId": "a.78",
    "targetFieldRaw": "[1244]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1234] - [1235] + [1236] - [1237] - [1238] + [1239] + [1240] - [1241] - [1242] - [1243]}",
    "guidanceText": "El monto registrado en código 1244 debe ser igual a la operatoria de los códigos 1234 menos 1235 más 1236 menos 1237, 1238 más 1239, 1240 menos 1241, 1242, 1243. Recuadro N°15"
  },
  {
    "ruleId": "a.79",
    "targetFieldRaw": "[1245]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1234] - [1235] + [1236] - [1237] - [1238] + [1239] + [1240] - [1241] - [1242] - [1243]}",
    "guidanceText": "El monto registrado en código 1245 debe ser igual a la operatoria de los códigos 1234 menos 1235 más 1236 menos 1237, 1238 más 1239, 1240 menos 1241, 1242, 1243. Recuadro N°15"
  },
  {
    "ruleId": "a.80",
    "targetFieldRaw": "[1256]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1246] - [1247] + [1248] - [1249] - [1250] + [1251] + [1252] - [1253] - [1254] - [1255]}",
    "guidanceText": "El monto registrado en código 1256 debe ser igual a la operatoria de los códigos 1246 menos 1247 más 1248 menos 1249, 1250 más 1251, 1252 menos 1253, 1254, 1255. Recuadro N°15"
  },
  {
    "ruleId": "a.81",
    "targetFieldRaw": "[1257]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1246] - [1247] + [1248] - [1249] - [1250] + [1251] + [1252] - [1253] - [1254] - [1255]}",
    "guidanceText": "El monto registrado en código 1257 debe ser igual a la operatoria de los códigos 1246 menos 1247 más 1248 menos 1249, 1250 más 1251, 1252 menos 1253, 1254, 1255. Recuadro N°15"
  },
  {
    "ruleId": "a.82",
    "targetFieldRaw": "[1269]",
    "operatorRaw": "=",
    "formulaRaw": "[1260] - [1935] + [1262] - [1263] - [1264] + [1265] - [1266] - [1267] - [1268]",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1269 del recuadro N° 15, debe ser igual al resultado positivo de la suma de los códigos 1260, 1262, 1265, menos los códigos 1935, 1263, 1264, 1266, 1267, 1268."
  },
  {
    "ruleId": "a.83",
    "targetFieldRaw": "[1278]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1270] - [1821] - [1936] + [1271] - [1272] + [1273] + [1274] - [1275] - [1276] - [1277]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1278 del recuadro N° 16, debe ser igual al resultado positivo de la suma de los códigos 1270, 1271, 1273, 1274 menos los códigos 1821, 1936, 1272, 1275, 1276, 1277."
  },
  {
    "ruleId": "a.84",
    "targetFieldRaw": "[1723]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1270] - [1821] - [1936] + [1271] - [1272] + [1273] + [1274] - [1275] - [1276] - [1277]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1723 del recuadro N° 16, debe ser igual al resultado negativo de la suma de los códigos 1270, 1271, 1273, 1274 menos los códigos 1821, 1936, 1272, 1275, 1276, 1277."
  },
  {
    "ruleId": "a.85",
    "targetFieldRaw": "[1287]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1279] - [1822] - [1937] + [1280] - [1281] + [1282] + [1283] - [1284] - [1285] - [1286]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1287 del recuadro N° 16, debe ser igual al resultado positivo de la suma de los códigos 1279, 1280, 1282, 1283 menos los códigos 1822, 1937, 1281, 1284, 1285, 1286."
  },
  {
    "ruleId": "a.86",
    "targetFieldRaw": "[1724]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1279] - [1822] - [1937] + [1280] - [1281] + [1282] + [1283] - [1284] - [1285] - [1286]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1724 del recuadro N° 16, debe ser igual al resultado negativo de la suma de los códigos 1279, 1280, 1282, 1283 menos los códigos 1822, 1937, 1281, 1284, 1285, 1286."
  },
  {
    "ruleId": "a.87",
    "targetFieldRaw": "[1312]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1288] - [1289] - [1938] + [1290] - [1291] + [1292] + [1293] + [1294] - [1295] - [1296] - [1297] - [1298]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1312 del recuadro N° 16, debe ser igual al resultado positivo de la suma de los códigos 1288, 1290, 1292, 1293, 1294 menos los códigos 1289, 1938, 1291, 1295, 1296, 1297, 1298."
  },
  {
    "ruleId": "a.88",
    "targetFieldRaw": "[1299]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1288] - [1289] - [1938] + [1290] - [1291] + [1292] + [1293] + [1294] - [1295] - [1296] - [1297] - [1298]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1299 del recuadro N° 16, debe ser igual al resultado negativo de la suma de los códigos 1288, 1290, 1292, 1293, 1294 menos los códigos 1289, 1938, 1291, 1295, 1296, 1297, 1298."
  },
  {
    "ruleId": "a.89",
    "targetFieldRaw": "[1300]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1301] - [1302] - [1939] + [1303] - [1304] + [1305] + [1306] + [1307] - [1308] - [1309] - [1310] - [1311]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1300 del recuadro N° 16, debe ser igual al resultado positivo de la suma de los códigos 1301, 1303, 1305, 1306 menos los códigos 1302, 1939, 1304, 1307, 1308, 1309, 1310, 1311."
  },
  {
    "ruleId": "a.90",
    "targetFieldRaw": "[1373]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1301] - [1302] - [1939] + [1303] - [1304] + [1305] + [1306] + [1307] - [1308] - [1309] - [1310] - [1311]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1373 del recuadro N° 16, debe ser igual al resultado negativo de la suma de los códigos 1301, 1303, 1305, 1306, 1307 menos los códigos 1302, 1939, 1308, 1309, 1310, 1311."
  },
  {
    "ruleId": "a.91",
    "targetFieldRaw": "[1323]",
    "operatorRaw": "=",
    "formulaRaw": "[1313] + [1314] - [1315] + [1316] + [1317] + [1318] - [1319] - [1320] - [1321] - [1322]",
    "guidanceText": "El monto registrado en código 1323 debe ser igual a la operatoria de los códigos 1313 más 1314 menos 1315 más 1316, 1317, 1318 menos 1319, 1320, 1321, 1322. Recuadro N°16"
  },
  {
    "ruleId": "a.92",
    "targetFieldRaw": "[1334]",
    "operatorRaw": "=",
    "formulaRaw": "[1324] - [1940] + [1326] - [1327] + [1328] + [1329] - [1330] - [1331] - [1332] - [1333]",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1334 del recuadro N° 16, debe ser igual al resultado positivo de la suma de los códigos 1324, 1326, 1328, 1329 menos los códigos 1940, 1327, 1330, 1331, 1332, 1333."
  },
  {
    "ruleId": "a.93",
    "targetFieldRaw": "[1345]",
    "operatorRaw": "=",
    "formulaRaw": "[1335] - [1941] - [1336] + [1337] - [1338] + [1339] + [1340] - [1341] - [1342] - [1343] - [1344]",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1345 del recuadro N° 16, debe ser igual al resultado positivo de la suma de los códigos 1335, 1337, 1339, 1340 menos los códigos 1941, 1336, 1338, 1341, 1342, 1343, 1344."
  },
  {
    "ruleId": "a.94",
    "targetFieldRaw": "[1355]",
    "operatorRaw": "=",
    "formulaRaw": "[1346] + [1347] - [1348] + [1349] + [1350] - [1351] - [1352] - [1353] - [1354]",
    "guidanceText": "El monto registrado en código 1355 debe ser igual a la operatoria de los códigos 1346 más 1347 menos 1348 más 1349, 1350 menos 1351, 1352, 1353, 1354. Recuadro N°16"
  },
  {
    "ruleId": "a.97",
    "targetFieldRaw": "[1410]",
    "operatorRaw": "=",
    "formulaRaw": "[1400] + [1817] + [1401] + [1402] + [1403] + [1587] + [1588] + [1404] + [1405]",
    "guidanceText": "El monto registrado en código 1410 debe ser igual a la suma de los códigos1400 más 1817, 1401, 1402, 1403, 1587, 1588, 1404, 1405. Recuadro N°17"
  },
  {
    "ruleId": "a.98",
    "targetFieldRaw": "[1430]",
    "operatorRaw": "=",
    "formulaRaw": "[1406] + [1407] + [1408] + [1409] + [1818] + [1429] + [1411] + [1412] + [1413] + [1415] + [1416] + [1417] + [1418] + [1419] + [1421] + [1422] + [1423] + [1424] + [1425] + [1426] + [1427] + [1428]",
    "guidanceText": "El monto registrado en código 1430 debe ser igual a la suma de los códigos1406, 1407, 1408, 1409, 1818, 1429, 1411, 1412, 1413, 1415, 1416, 1417, 1418, 1419, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428. Recuadro N° 17"
  },
  {
    "ruleId": "a.99",
    "targetFieldRaw": "[1729]",
    "operatorRaw": "=",
    "formulaRaw": "[1410] - [1430] + [1431]",
    "guidanceText": "El monto registrado en código 1729 debe ser igual a la operatoria de los códigos1410 menos 1430 más 1431. Recuadro N°17"
  },
  {
    "ruleId": "a.100",
    "targetFieldRaw": "[1440]",
    "operatorRaw": "=",
    "formulaRaw": "Si [1729] > 0; entonces POS{[1729] - [1432] - [1433]} Sino [1729]",
    "guidanceText": "El monto registrado en código 1440 debe ser igual a la operatoria de 1729 menos 1432 y 1433. Recuadro N°17"
  },
  {
    "ruleId": "a.102",
    "targetFieldRaw": "[1720]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1703] - [1719] + [1492] + [1704]}",
    "guidanceText": "El monto registrado en código 1720 debe ser igual a la operatoria de los códigos1703 menos 1719 más 1492, 1704. Recuadro N°18"
  },
  {
    "ruleId": "a.103",
    "targetFieldRaw": "[1500]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1720] - [1493] - [1494] - [1725] - [1727]) > 0; entonces ([1720] - [1493] - [1494] - [1725] - [1727]) Sino 0",
    "guidanceText": "El monto registrado en código 1500 debe ser igual a la operatoria de los códigos1720 menos 1493, 1494, 1725, 1727. Recuadro N°18"
  },
  {
    "ruleId": "a.104",
    "targetFieldRaw": "[1545]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1445] - [1446] + [1374] + [1375] - [1376] + [1705] - [1706] + [1707] + [1377] - [1378] + [1726] - [1479] - [1708] - [1709] - [1379] + [1710] + [1711] + [1380] - [1381]}",
    "guidanceText": "El capital propio tributario simplificado positivo final registrado en código 1545 del recuadro N°19, debe ser igual al resultado positivo de la suma de los códigos1445, 1374, 1375, 1705, 1707, 1377, 1726, 1710, 1711, 1380 menos los códigos 1446, 1376, 1706, 1378, 1479, 1708, 1709, 1379, 1381."
  },
  {
    "ruleId": "a.105",
    "targetFieldRaw": "[1546]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1445] - [1446] + [1374] + [1375] - [1376] + [1705] - [1706] + [1707] + [1377] - [1378] + [1726] - [1479] - [1708] - [1709] - [1379] + [1710] + [1711] + [1380] - [1381]}",
    "guidanceText": "El capital propio tributario simplificado negativo final registrado en código 1546 del recuadro N°19, debe ser igual al resultado negativo de la suma de los códigos1445, 1374, 1375, 1705, 1707, 1377, 1726, 1710, 1711, 1380 menos los códigos 1446, 1376, 1706, 1378, 1479, 1708, 1709, 1379, 1381."
  },
  {
    "ruleId": "a.106",
    "targetFieldRaw": "[1705]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1440]}",
    "guidanceText": "El valor registrado en código 1705 debe ser igual a código 1440 del recuadro N°17. Recuadro N°19"
  },
  {
    "ruleId": "a.107",
    "targetFieldRaw": "[1706]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1440]}",
    "guidanceText": "La pérdida tributario del ejercicio al 31 de diciembre registrada en el código 1706 del recuadro N° 19, debe ser igual al código 1440 del recuadro N°17."
  },
  {
    "ruleId": "a.109",
    "targetFieldRaw": "[1479]",
    "operatorRaw": "=",
    "formulaRaw": "[1704]",
    "guidanceText": "El valor registrado en código 1479 del recuadro N°19 debe ser igual a valor del código 1704 del recuadro N°18"
  },
  {
    "ruleId": "a.110",
    "targetFieldRaw": "[1709]",
    "operatorRaw": "=",
    "formulaRaw": "[1404]",
    "guidanceText": "El valor registrado en código 1709 debe ser igual a valor del código 1404 del recuadro N°17"
  },
  {
    "ruleId": "a.111",
    "targetFieldRaw": "[1710]",
    "operatorRaw": "=",
    "formulaRaw": "[1432]",
    "guidanceText": "El valor registrado en código 1710 debe ser igual a valor del código 1432 del recuadro N°17"
  },
  {
    "ruleId": "a.112",
    "targetFieldRaw": "[1711]",
    "operatorRaw": "=",
    "formulaRaw": "[1433]",
    "guidanceText": "El valor registrado en código 1711 debe ser igual a valor del código 1433 del recuadro N°17"
  },
  {
    "ruleId": "a.113",
    "targetFieldRaw": "[1719]",
    "operatorRaw": "=",
    "formulaRaw": "[1546]",
    "guidanceText": "El valor registrado en código 1719 del recuadro N°18 debe ser igual a valor del código 1546 del recuadro N°19"
  },
  {
    "ruleId": "a.114",
    "targetFieldRaw": "[1431]",
    "operatorRaw": "=",
    "formulaRaw": "[1422]",
    "guidanceText": "El valor registrado en código 1431 del recuadro N°17 debe ser igual al códigos 1422 del mismo recuadro N°17"
  },
  {
    "ruleId": "a.116",
    "targetFieldRaw": "[1708]",
    "operatorRaw": "=",
    "formulaRaw": "[1422]",
    "guidanceText": "El valor registrado en código 1708 debe ser igual código 1422, del recuadro N°17"
  },
  {
    "ruleId": "a.117",
    "targetFieldRaw": "[1484]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1451] - [1942] + [1392] - [1396] - [1459] + [1463] + [1467] - [1471] - [1475] - [1480]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1484 del recuadro N° 20, debe ser igual al resultado positivo de la suma de los códigos 1451, 1392, 1463, 1467,menos los códigos 1942, 1396, 1459, 1471, 1475, 1480."
  },
  {
    "ruleId": "a.119",
    "targetFieldRaw": "[1485]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1452] - [1589] + [1393] - [1397] - [1460] + [1468] - [1472] - [1476] - [1481]}",
    "guidanceText": "El monto del código 1485 debe ser igual a la operatoria de loscódigos1452 menos 1589 más 1393 menos 1397, 1460 más 1468 menos 1472, 1476, 1481. Recuadro N°20"
  },
  {
    "ruleId": "a.120",
    "targetFieldRaw": "[1489]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1452] - [1589] + [1393] - [1397] - [1460] + [1468] - [1472] - [1476] - [1481]}",
    "guidanceText": "El monto del código 1489 debe ser igual a la operatoria de loscódigos1452 menos 1589 más 1393 menos 1397, 1460 más 1468 menos 1472, 1476, 1481. Recuadro N°20"
  },
  {
    "ruleId": "a.121",
    "targetFieldRaw": "[1771]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1752] + [1943] + [1755] - [1757] - [1759] + [1763] - [1765] - [1767] - [1769]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1771 del recuadro N° 20, debe ser igual al resultado positivo de la suma de los códigos 1752, 1943, 1755, 1763,menos los códigos 1757, 1759, 1765, 1767, 1769."
  },
  {
    "ruleId": "a.122",
    "targetFieldRaw": "[1772]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1753] - [1845] + [1756] - [1758] - [1760] + [1762] + [1764] - [1766] - [1768] - [1770]}",
    "guidanceText": "El monto del código 1772 debe ser igual a la operatoria de los códigos 1753 menos 1845 más 1756 menos 1758, 1760 más 1762, 1764 menos 1766, 1768, 1770. Recuadro N°20"
  },
  {
    "ruleId": "a.124",
    "targetFieldRaw": "[1486]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1453] - [1455] + [1394] - [1398] - [1461] + [1465] + [1469] - [1473] - [1477] - [1482]}",
    "guidanceText": "El monto del código 1486 debe ser igual a la operatoria de loscódigos1453 menos 1455 más 1394 menos 1398, 1461 más 1465, 1469 menos 1473, 1477, 1482. Recuadro N°20"
  },
  {
    "ruleId": "a.125",
    "targetFieldRaw": "[1490]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1453] - [1455] + [1394] - [1398] - [1461] + [1465] + [1469] - [1473] - [1477] - [1482]}",
    "guidanceText": "El monto del código 1490 debe ser igual a la operatoria de loscódigos1453 menos 1455 más 1394 menos 1398, 1461 más 1465, 1469 menos 1473, 1477, 1482. Recuadro N°20"
  },
  {
    "ruleId": "a.126",
    "targetFieldRaw": "[1487]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1454] - [1456] + [1395] - [1399] - [1462] + [1466] + [1470] - [1474] - [1478] - [1483]}",
    "guidanceText": "El monto del código 1487 debe ser igual a la operatoria de loscódigos1454 menos 1456 más 1395 menos 1399, 1462 más 1466, 1470 menos 1474, 1478, 1483. Recuadro N°20"
  },
  {
    "ruleId": "a.127",
    "targetFieldRaw": "[1491]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1454] - [1456] + [1395] - [1399] - [1462] + [1466] + [1470] - [1474] - [1478] - [1483]}",
    "guidanceText": "El monto del código 1491 debe ser igual a la operatoria de loscódigos1454 menos 1456 más 1395 menos 1399, 1462 más 1466, 1470 menos 1474, 1478, 1483. Recuadro N°20"
  },
  {
    "ruleId": "a.128",
    "targetFieldRaw": "[1391]",
    "operatorRaw": "=",
    "formulaRaw": "[1382] - [1944] + [1384] - [1385] - [1386] + [1387] - [1388] - [1389] - [1390]",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1391 del recuadro N° 20, debe ser igual al resultado positivo de la suma de los códigos 1382, 1384, 1387,menos los códigos 1944, 1385, 1386, 1388, 1389, 1390."
  },
  {
    "ruleId": "a.129",
    "targetFieldRaw": "[1563]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1495] - [1655] - [1945] + [1590] - [1444] + [1512] + [1515] + [1523] - [1531] - [1539] - [1549] - [1557]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1563 del recuadro N° 21, debe ser igual al resultado positivo de la suma de los códigos 1495, 1590, 1512, 1515, 1523 menos los códigos 1655, 1945, 1444, 1531, 1539, 1549, 1557."
  },
  {
    "ruleId": "a.130",
    "targetFieldRaw": "[1368]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1495] - [1655] - [1945] + [1590] - [1444] + [1512] + [1515] + [1523] - [1531] - [1539] - [1549] - [1557]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1368 del recuadro N° 21, debe ser igual al resultado negativo de la suma de los códigos 1495, 1590, 1512, 1515, 1523 menos los códigos 1655, 1945, 1444, 1531, 1539, 1549, 1557."
  },
  {
    "ruleId": "a.131",
    "targetFieldRaw": "[1564]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1496] - [1656] - [1946] + [1436] - [1447] + [1513] + [1516] + [1524] - [1532] - [1540] - [1550] - [1558]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1564 del recuadro N° 21, debe ser igual al resultado positivo de la suma de los códigos 1496, 1436, 1513, 1516, 1524 menos los códigos 1656, 1946, 1447, 1532, 1540, 1550, 1558."
  },
  {
    "ruleId": "a.132",
    "targetFieldRaw": "[1371]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1496] - [1656] - [1946] + [1436] - [1447] + [1513] + [1516] + [1524] - [1532] - [1540] - [1550] - [1558]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1371 del recuadro N° 21, debe ser igual al resultado negativo de la suma de los códigos 1496, 1436, 1513, 1516, 1524 menos los códigos 1656, 1946, 1447, 1532, 1540, 1550, 1558."
  },
  {
    "ruleId": "a.133",
    "targetFieldRaw": "[1565]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1497] - [1504] - [1947] + [1437] - [1448] + [1517] + [1525] - [1533] - [1541] - [1551]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1565 del recuadro N° 21, debe ser igual al resultado positivo de la suma de los códigos 1497, 1437, 1517, 1525 menos los códigos 1504, 1947, 1448, 1533, 1541, 1551."
  },
  {
    "ruleId": "a.134",
    "targetFieldRaw": "[1571]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1497] - [1504] - [1947] + [1437] - [1448] + [1517] + [1525] - [1533] - [1541] - [1551]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1571 del recuadro N° 21, debe ser igual al resultado negativo de la suma de los códigos 1497, 1437, 1517, 1525 menos los códigos 1504, 1947, 1448, 1533, 1541, 1551."
  },
  {
    "ruleId": "a.135",
    "targetFieldRaw": "[1566]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1498] - [1505] - [1948] + [1438] - [1449] + [1518] + [1526] - [1534] - [1542] - [1552]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1566 del recuadro N° 21, debe ser igual al resultado positivo de la suma de los códigos 1498, 1438, 1518, 1526 menos los códigos 1505, 1948, 1449, 1534, 1542, 1552."
  },
  {
    "ruleId": "a.136",
    "targetFieldRaw": "[1572]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1498] - [1505] - [1948] + [1438] - [1449] + [1518] + [1526] - [1534] - [1542] - [1552]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1572 del recuadro N° 21, debe ser igual al resultado negativo de la suma de los códigos 1498, 1438, 1518, 1526 menos los códigos 1505, 1948, 1449, 1534, 1542, 1552."
  },
  {
    "ruleId": "a.137",
    "targetFieldRaw": "[1567]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1499 ] + [1439] - [1508] + [1514] + [1519] + [1527] - [1535] - [1543] - [1553] - [1559]}",
    "guidanceText": "El montodel código 1567 debe ser igual al resultado positivo de loscódigos1499 más 1439 menos 1508 más 1514, 1519, 1527 menos 1535, 1543, 1553, 1559. Recuadro N°21"
  },
  {
    "ruleId": "a.138",
    "targetFieldRaw": "[1568]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1501] - [1949] + [1441] - [1509] + [1520] + [1528] - [1536] - [1544] - [1554] - [1560]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1568 del recuadro N° 21, debe ser igual al resultado positivo de la suma de los códigos 1501, 1441, 1520, 1528 menos los códigos 1949, 1509, 1536, 1544, 1554, 1560."
  },
  {
    "ruleId": "a.139",
    "targetFieldRaw": "[1569]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1502] - [1950] + [1442] - [1510] + [1521] + [1529] - [1537] - [1547] - [1555] - [1561]}",
    "guidanceText": "El remanente para el ejercicio siguiente registrado en el código 1502 del recuadro N° 21, debe ser igual al resultado positivo de la suma de los códigos 1502, 1442, 1521, 1529 menos los códigos 1950, 1510, 1537, 1547, 1555, 1561."
  },
  {
    "ruleId": "a.140",
    "targetFieldRaw": "[1570]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1503] + [1443] - [1511] + [1522] + [1530] - [1538] - [1548] - [1556] - [1562]}",
    "guidanceText": "El montodel código 1570 debe ser igual al resultado positivo de loscódigos1503 más 1443 menos 1511 más 1522, 1530 menos 1538, 1548, 1556, 1562. Recuadro N°21"
  },
  {
    "ruleId": "a.141",
    "targetFieldRaw": "[1610]",
    "operatorRaw": "=",
    "formulaRaw": "[1600] + [1819] + [1601] + [1602] + [1603] + [ 1604] + [1605] + [1606] + [1607] + [1608] + [1609]",
    "guidanceText": "El monto del código 1610 debe ser la suma de los códigos 1600, 1819, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609. Recuadro N°22"
  },
  {
    "ruleId": "a.142",
    "targetFieldRaw": "[1629]",
    "operatorRaw": "=",
    "formulaRaw": "[1611] + [1612] + [1613] + [1614] + [1820] + [1615] + [1616] + [1617] + [1618] + [1620] + [1621] + [1622] + [1624] + [1625] + [1626] + [1627] + [1628] + [1909]",
    "guidanceText": "El montodel código 1629 debe ser la suma de los códigos 1611, 1612, 1613, 1614, 1820, 1615, 1616, 1617, 1618, 1620, 1621, 1622, 1624, 1625, 1626, 1627, 1628, 1909. Recuadro N°22"
  },
  {
    "ruleId": "a.143",
    "targetFieldRaw": "[1630]",
    "operatorRaw": "=",
    "formulaRaw": "[1610] - [1629]",
    "guidanceText": "El valor del código 1630 es igual al resultado 1610 menos 1629. Recuadro N°22"
  },
  {
    "ruleId": "a.144",
    "targetFieldRaw": "[1581]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1580] - [1582] + [1573] + [1574] - [1575] + [1712] - [1713] + [1714] - [1576] - [1715] - [1577] - [1716] - [1578] + [1584] - [1585]}",
    "guidanceText": "El monto del código 1581 debe ser la operatoria de los códigos 1580 menos 1582 más 1573, 1574 menos 1575 más 1712 menos 1713 más 1714 menos 1576, 1715, 1577, 1716, 1578, más 1584 menos 1585. Recuadro N°23"
  },
  {
    "ruleId": "a.145",
    "targetFieldRaw": "[1583]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1580] - [1582] + [1573] + [1574] - [1575] + [1712] - [1713] + [1714] - [1576] - [1715] - [1577] - [1716] - [1578] + [1584] - [1585]}",
    "guidanceText": "El monto del código 1583 debe ser la suma de los códigos 1580 menos 1582 más 1573, 1574 menos 1575 más 1712 menos 1713 más 1714 menos 1576, 1715, 1577, 1716, 1578, más 1584 menos 1585. Recuadro N°23"
  },
  {
    "ruleId": "a.146",
    "targetFieldRaw": "[1463]",
    "operatorRaw": "=",
    "formulaRaw": "[1500]",
    "guidanceText": "El monto del código 1463, del recuadro N°20, deber ser igual al código 1500 del recuadro N°18"
  },
  {
    "ruleId": "a.154",
    "targetFieldRaw": "[1707]",
    "operatorRaw": "=",
    "formulaRaw": "[1408] + [1426]",
    "guidanceText": "El valor del código 1707del recuadro N°19 debe ser igual al valor del código 1408 o 1426 F172del recuadro N°17"
  },
  {
    "ruleId": "a.157",
    "targetFieldRaw": "[1608]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = 14TT; entonces ([1184] + [1362]) Sino 0",
    "guidanceText": "El monto registrado en el código 1608, del recuadro N°22, debe ser igual a la suma de los códigos 1184, y 1362, del recuadro N°7"
  },
  {
    "ruleId": "a.160",
    "targetFieldRaw": "[705]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[704] - [930]}",
    "guidanceText": "El código 705 debe ser igual al resultado positivo del código 704 menos el código 930."
  },
  {
    "ruleId": "a.161",
    "targetFieldRaw": "[829]",
    "operatorRaw": "=",
    "formulaRaw": "[828] - [830]",
    "guidanceText": "El código 829 del recuadro N° 8 debe ser igual al código 828 menos el código 830."
  },
  {
    "ruleId": "a.162",
    "targetFieldRaw": "[1404]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = 14D1; entonces ([1184] + [1362]) Sino 0",
    "guidanceText": "El monto registrado en el código 1404, del recuadro N°17, debe ser igual a la suma de los códigos 1184, y 1362 del recuadro N°7."
  },
  {
    "ruleId": "a.167",
    "targetFieldRaw": "[1182]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A; entonces [1699] Sino 0",
    "guidanceText": "El valor del código 1182 del recuadro N°14 debe ser igual al valor del código 1699 recuadro N°13"
  },
  {
    "ruleId": "a.168",
    "targetFieldRaw": "[1703]",
    "operatorRaw": "=",
    "formulaRaw": "[1545]",
    "guidanceText": "El valor del código 1703 del recuadro N°18 debe ser igual al valor del código 1545 recuadro N°19"
  },
  {
    "ruleId": "a.169",
    "targetFieldRaw": "[1712]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1580] + [1582] + [1573]) > 0; entonces POS{[1630]} Sino 0",
    "guidanceText": "El valor registrado en código 1712 debe ser igual a la base imponible del ejercicio, asignable a los propietarios, registrada en código 1630 del recuadro N°22. Recuadro N°23"
  },
  {
    "ruleId": "a.170",
    "targetFieldRaw": "[1713]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1580] + [1582] + [1573]) > 0; entonces NEG{[1630]} Sino 0",
    "guidanceText": "El valor registrado en código 1713 debe ser igual a la pérdida tributaria registrada en código 1630 del recuadro N°22. Recuadro N°23"
  },
  {
    "ruleId": "a.172",
    "targetFieldRaw": "[1715]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1580] + [1582] + [1573]) > 0; entonces [1608] Sino 0",
    "guidanceText": "El valor del código 1715 del recuadro N°23 debe ser igual al valor del código 1608 del recuadro N°22"
  },
  {
    "ruleId": "a.173",
    "targetFieldRaw": "[1716]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1580] + [1582] + [1573]) > 0; entonces [1609] Sino 0",
    "guidanceText": "El valor del código 1716 del recuadro N°23 debe ser igual al valor del código 1609 del recuadro N°22"
  },
  {
    "ruleId": "a.180",
    "targetFieldRaw": "[1677]",
    "operatorRaw": "=",
    "formulaRaw": "[1665]",
    "guidanceText": "El valor del código 1677 del recuadro N°12 debe ser igual al valor del código 1665 del mismo recuadro"
  },
  {
    "ruleId": "a.181",
    "targetFieldRaw": "[1204]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1200] - [1933] + [1202] - [1203]}",
    "guidanceText": "El reverso y/o disminución del ejercicio registrado en el código 1204 del recuadro N°15, debe ser igual al resultado positivo de la suma de los códigos 1200, 1202, menos los códigos 1933, y 1203."
  },
  {
    "ruleId": "a.182",
    "targetFieldRaw": "[1459]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1451] - [1942] + [1392] - [1396]}",
    "guidanceText": "El reverso y/o disminución del ejercicio registrado en el código 1459 del recuadro N°15, debe ser igual al resultado positivo de la suma de los códigos 1451, 1392, menos los códigos 1942, y 1396."
  },
  {
    "ruleId": "a.183",
    "targetFieldRaw": "[1692]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{([1221] - [1222] + [1224] - [1225] - [1226] + [1228] - [1229]) + ([1730] + [1934] + [1733] - [1735] - [1737] + [1741] - [1743]) + ([1731] - [1843] + [1734] - [1736] - [1738] + [1740] + [1742] - [1744]) + ([1234] - [1235] + [1236] - [1237] - [1238] + [1239] + [1240] - [1241]) + ([1246] - [1247] + [1248] - [1249] - [1250] + [1251] + [1252] - [1253])}",
    "guidanceText": "El saldo negativo del registro REX al término del ejercicio registrado en el código 1692 del recuadro N° 13 debe ser igual al resultado negativo de la suma de los códigos 1221, 1224, 1228, 1730, 1934, 1733, 1741, 1731, 1734, 1740, 1742, 1234, 1236, 1239, 1240, 1246, 1248, 1251, 1252, menos los códigos 1222, 1225, 1226, 1229, 1735, 1737, 1743, 1843, 1736, 1738, 1235, 1237, 1238, 1241, 1247, 1249, 1250, 1253."
  },
  {
    "ruleId": "a.184",
    "targetFieldRaw": "[1693]",
    "operatorRaw": "=",
    "formulaRaw": "POS{([1221] - [1222] + [1224] - [1225] - [1226] + [1228] - [1229]) + ([1730] + [1934] + [1733] - [1735] - [1737] + [1741] - [1743]) + ([1731] - [1843] + [1734] - [1736] - [1738] + [1740] + [1742] - [1744]) + ([1234] - [1235] + [1236] - [1237] - [1238] + [1239] + [1240] - [1241]) + ([1246] - [1247] + [1248] - [1249] - [1250] + [1251] + [1252] - [1253])}",
    "guidanceText": "El saldo positivo del registro REX al término del ejercicio registrado en el código 1692 del recuadro N° 13 debe ser igual al resultado positivo de la suma de los códigos 1221, 1224, 1228, 1730, 1934, 1733, 1741, 1731, 1734, 1740, 1742, 1234, 1236, 1239, 1240, 1246, 1248, 1251, 1252, menos los códigos 1222, 1225, 1226, 1229, 1735, 1737, 1743, 1843, 1736, 1738, 1235, 1237, 1238, 1241, 1247, 1249, 1250, 1253."
  },
  {
    "ruleId": "a.185",
    "targetFieldRaw": "[1492]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{([1452] - [1589] + [1393] - [1397] - [1460] + [1468] - [1472]) + ([1752] + [1943] + [1755] - [1757] - [1759] + [1763] - [1765]) + ([1753] - [1845] + [1756] - [1758] - [1760] + [1762] + [1764] - [1766]) + ([1453] - [1455] + [1394] - [1398] - [1461] + [1465] + [1469] - [1473]) + ([1454] - [1456] + [1395] - [1399] - [1462] + [1466] + [1470] - [1474])}",
    "guidanceText": "El saldo negativo del registro REX al término del ejercicio registrado en el código 1692 del recuadro N° 18 debe ser igual al resultado negativo de la suma de los códigos 1452, 1393, 1468, 1752, 1943, 1755, 1763, 1753, 1756, 1762, 1764, 1453, 1394, 1465, 1469, 1454, 1395, 1466, 1470, menos los códigos 1589, 1397, 1460, 1472, 1757, 1759, 1765, 1845, 1758, 1760, 1766, 1455, 1398, 1461, 1473, 1456, 1399, 1462, 1474."
  },
  {
    "ruleId": "a.186",
    "targetFieldRaw": "[1493]",
    "operatorRaw": "=",
    "formulaRaw": "POS{([1452] - [1589] + [1393] - [1397] - [1460] + [1468] - [1472]) + ([1752] + [1943] + [1755] - [1757] - [1759] + [1763] - [1765]) + ([1753] - [1845] + [1756] - [1758] - [1760] + [1762] + [1764] - [1766]) + ([1453] - [1455] + [1394] - [1398] - [1461] + [1465] + [1469] - [1473]) + ([1454] - [1456] + [1395] - [1399] - [1462] + [1466] + [1470] - [1474])}",
    "guidanceText": "El saldo positivo del registro REX al término del ejercicio registrado en el código 1692 del recuadro N° 18 debe ser igual al resultado positivo de la suma de los códigos 1452, 1393, 1468, 1752, 1943, 1755, 1763, 1753, 1756, 1762, 1764, 1453, 1394, 1465, 1469, 1454, 1395, 1466, 1470, menos los códigos 1589, 1397, 1460, 1472, 1757, 1759, 1765, 1845, 1758, 1760, 1766, 1455, 1398, 1461, 1473, 1456, 1399, 1462, 1474."
  },
  {
    "ruleId": "a.187",
    "targetFieldRaw": "[1784]",
    "operatorRaw": "=",
    "formulaRaw": "Si F22 NO es Rectificatoria; entonces (Si TIPO{[03]} = 1 .y. ((atributo = 0HEP .o. PSCD .o. PSEI .o. PCD2 .o. PEI2) .o. Vx014720 > 0); entonces [170] * P725 Sino Si Vx010183 = 2 .y. ((atributo = 0HEP .o. PSCD .o. PSEI .o. PCD2 .o. PEI2).o. Vx014720 > 0); entonces [618] * P725 Sino 0) Sino Vx014433",
    "guidanceText": "El valor del código 1784 del recuadro N° 24 debe ser igual al resultado de la multiplicacion del código 170 por el 5%, En el caso de sociedades de profesionales código 1784 debe ser igual al resultado de la multiplicacion del código 618 por el 5%"
  },
  {
    "ruleId": "a.189",
    "targetFieldRaw": "[1788]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1802] - [1787]}",
    "guidanceText": "El monto a pagar de la(s) cuota(s) después de anticipos registrado en el código 1788 del recuadro N° 24, debe ser igual al código 1802 menos el código 1787."
  },
  {
    "ruleId": "a.190",
    "targetFieldRaw": "[1793]",
    "operatorRaw": "=",
    "formulaRaw": "[1789] + [1790] + [1791] + [1792]",
    "guidanceText": "El valor del código 1793 del recuadro N° 24 debe ser igual a la sumatoria de los códigos 1789, 1790, 1791 y 1792 del mismo recuadro"
  },
  {
    "ruleId": "a.191",
    "targetFieldRaw": "[1794]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1788] - [1793]}",
    "guidanceText": "El monto a pagar de la cuota registrado en el código 1794 del recuadro N° 24 debe ser igual al resultado positivo de la resta del código 1788 y el código 1793."
  },
  {
    "ruleId": "a.192",
    "targetFieldRaw": "[1795]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1788] - [1793]}",
    "guidanceText": "El saldo a devolver por retenciones adicionales y PPMA en exceso registrado en el código 1795 del recuadro N° 24 debe ser igual al código 1788 menos el código 1793."
  },
  {
    "ruleId": "a.193",
    "targetFieldRaw": "[1205]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A; entonces [1199] Sino 0",
    "guidanceText": "El monto registrado en el código 1205 del recuadro N°15, debe ser igual al código 1199 del recuadro N°13"
  },
  {
    "ruleId": "a.194",
    "targetFieldRaw": "[1714]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1580] + [1582] + [1573]) > 0; entonces ([1613] + [1627]) Sino 0",
    "guidanceText": "El valor del código 1714 del recuadro N°23 debe ser igual al valor del código 1613 o 1627 del recuadro N°22"
  },
  {
    "ruleId": "a.195",
    "targetFieldRaw": "[1814]",
    "operatorRaw": "=",
    "formulaRaw": "[1809] + [1813]",
    "guidanceText": "El código 1814 del recuadro N°4 debe ser igual al código 1809 más el código 1813."
  },
  {
    "ruleId": "a.196",
    "targetFieldRaw": "[1816]",
    "operatorRaw": "=",
    "formulaRaw": "[1814] + [1815]",
    "guidanceText": "El código 1816 del recuadro N°4 debe ser igual al código 1814 más el código 1815."
  },
  {
    "ruleId": "a.197",
    "targetFieldRaw": "[1802]",
    "operatorRaw": "=",
    "formulaRaw": "MIN{[1784]; [1801] + [1799]}",
    "guidanceText": "El código 1802 del recuadro N° 24 debe ser el minimo entre el código 1784 y la suma de los códigos 1801 y 1799."
  },
  {
    "ruleId": "a.200",
    "targetFieldRaw": "[1846]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1753] - [1845] + [1756] - [1758] - [1760] + [1762] + [1764] - [1766] - [1768] - [1770]}",
    "guidanceText": "El montodel código 1846 debe ser igual a la operatoria de loscódigos1753 menos 1845 más 1756 menos 1758, 1760 más 1762, 1764 menos 1766, 1768, 1770. Recuadro N°20"
  },
  {
    "ruleId": "a.201",
    "targetFieldRaw": "[1844]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[1731] - [1843] + [1734] - [1736] - [1738] + [1740] + [1742] - [1744] - [1746] - [1748]}",
    "guidanceText": "El monto del código 1844 debe ser igual a la operatoria de los códigos 1731 menos 1843 más 1734 menos 1736, 1738 más 1740, 1742 menos 1744, 1746, 1748. Recuadro N°15"
  },
  {
    "ruleId": "a.202",
    "targetFieldRaw": "[1681]",
    "operatorRaw": "=",
    "formulaRaw": "[825]",
    "guidanceText": "El valor registrado en código 1681 debe ser igual al valor anotado en el código 825"
  },
  {
    "ruleId": "a.203",
    "targetFieldRaw": "[1699]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A; entonces [1208] + [1218] + [1230] + [1745] + [1746] + [1242] + [1254] + [1193] + [1194] Sino 0",
    "guidanceText": "El valor registrado en código 1699 debe ser igual a la suma de los retiros, remesas y distribuciones repartidos registrados en los códigos 1208, 1218, 1230, 1745, 1746, 1242, 1254 del recuadro N° 15 más el valor registrado en los códigos 1193, y 1194 del recuadro N° 6"
  },
  {
    "ruleId": "a.204",
    "targetFieldRaw": "[1704]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = 14D1; entonces [1475] + [1476] + [1767] + [1768] + [1477] + [1478] + [1193] Sino 0",
    "guidanceText": "El valor registrado en código 1704 debe ser igual a la suma de los retiros, remesas y distribuciones repartidos registrados en los códigos 1475, 1476, 1767, 1768, 1477, 1478, del recuadro N° 20 más el valor registrado en el código 1193 del recuadro N° 6"
  },
  {
    "ruleId": "a.205",
    "targetFieldRaw": "[1987]",
    "operatorRaw": "=",
    "formulaRaw": "[1981] - [1983] - [1985]",
    "guidanceText": "El mayor o menor valor percibido o devengado en la enajenación de bienes raíces registrado en el código 1987 del recuadro N° 2, debe ser igual al código 1981 menos los códigos 1983 y 1985."
  },
  {
    "ruleId": "a.206",
    "targetFieldRaw": "[1988]",
    "operatorRaw": "=",
    "formulaRaw": "[1982] - [1984] - [1986]",
    "guidanceText": "El mayor o menor valor percibido o devengado en la enajenación de bienes raíces registrado en el código 1988 del recuadro N° 2, debe ser igual al código 1982 menos los códigos 1984 y 1986."
  },
  {
    "ruleId": "a.209",
    "targetFieldRaw": "[1967]",
    "operatorRaw": "=",
    "formulaRaw": "Si ABS{[1954] + [1955] + [1956] + [1957] + [1958] + [1959] + [1960] + [1961] + [1962] + [1963] - [1964] - [1965] - [1966]} > 0; entonces [1954] + [1955] + [1956] + [1957] + [1958] + [1959] + [1960] + [1961] + [1962] + [1963] - [1964] - [1965] - [1966] + [1996] Sino 0",
    "guidanceText": "La renta imponible operacional minera ajustada declarada en el código 1967 debe ser igual a la suma de los códigos 1996, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, menos los códigos 1964, 1965 y 1966."
  },
  {
    "ruleId": "a.211",
    "targetFieldRaw": "[1974]",
    "operatorRaw": "=",
    "formulaRaw": "[1978]",
    "guidanceText": "El componente ad valorem del Royalty Minero declarado en el código 1974 del recuadro N°12, debe ser igual al código 1978."
  },
  {
    "ruleId": "a.212",
    "targetFieldRaw": "[1975]",
    "operatorRaw": "=",
    "formulaRaw": "[1980]",
    "guidanceText": "El componente del margen del Royalty Minero registrado en el código 1975 del recuadro N°12, debe ser igual al código 1980."
  },
  {
    "ruleId": "a.214",
    "targetFieldRaw": "[1960]",
    "operatorRaw": "=",
    "formulaRaw": "Si ABS{[1955] + [1956] + [1957] + [1958] + [1959] + [1961] + [1962] + [1963] - [1964] - [1965] - [1966]} > 0; entonces [1689] Sino 0",
    "guidanceText": "La pérdida de ejercicios anteriores registrada en el código 1960 debe ser igual al código 1689 del recuadro N° 12."
  },
  {
    "ruleId": "a.216",
    "targetFieldRaw": "[1943]",
    "operatorRaw": "=",
    "formulaRaw": "[1942]",
    "guidanceText": "El monto acogido al impuesto sustitutivo de impuestos finales declarado en el código 1943 debe ser igual al monto declarado en el código 1942."
  },
  {
    "ruleId": "a.217",
    "targetFieldRaw": "[1934]",
    "operatorRaw": "=",
    "formulaRaw": "[1933]",
    "guidanceText": "El monto acogido al impuesto sustitutivo de impuestos finales declarado en el código 1934 debe ser igual al monto declarado en el código 1933."
  },
  {
    "ruleId": "a.219",
    "targetFieldRaw": "[1292]",
    "operatorRaw": "=",
    "formulaRaw": "Alfa=Si ([1111] - [373] - [382] - [761] - [773]) >= [365]; entonces [365] Sino POS{[1111] - [373] - [382] - [761] - [773]}---Beta=Si ([1111] - [373] - [382] - [761] - [773] - [365] - [366] - [392] - [984] - [839] - [384] - [390] - [742]) >= [841]; entonces [841] Sino POS{[1111] - [373] - [382] - [761] - [773] - [365] - [366] - [392] - [984] - [839] - [384] - [390] - [742]}---Si atributo = M14A .y. [95] != 1 .y. [1111] > 0 .y. ([365] + [841]) > 0; entonces Alfa + Beta Sino Si atributo = M14A .y. [95] = 1; entonces ROUND{[1685] * P647} Sino 0",
    "guidanceText": "El crédito sin derecho a devolución y sujeto a restitución registrado en el código 1292 debe ser igual Crédito por impuesto territorial (código 365) y/o Crédito por impuestos soportados en el extranjero (código 841) utilizado en el ejercicio."
  },
  {
    "ruleId": "a.220",
    "targetFieldRaw": "[1305]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. [95] !=​ 1; entonces [1111] - [1292] + [1113] Sino Si atributo = M14A .y. [95] = 1; entonces [1111] + [1113] Sino 0",
    "guidanceText": "Debe registrar el crédito por Impuesto de primera categoría sujeto a restitución, con derecho a devolución correspondiente a la RLI del ejercicio."
  },
  {
    "ruleId": "a.221",
    "targetFieldRaw": "[1512]",
    "operatorRaw": "=",
    "formulaRaw": "Alfa=Si ([19] - [373] - [382] - [761] - [773]) >= [365]; entonces [365] Sino POS{[19] - [373] - [382] - [761] - [773]}---Beta=Si ([19] - [373] - [382] - [761] - [773] - [365] - [366] - [392] - [984] - [839] - [384] - [390] - [742]) >= [841]; entonces [841] Sino POS{[19] - [373] - [382] - [761] - [773] - [365] - [366] - [392] - [984] - [839] - [384] - [390] - [742]}---Si atributo = 14D1 .y. [95] != 1 .y. [19] > 0 .y. ([365] + [841]) > 0; entonces Alfa + Beta Sino Si atributo = 14D1 .y. [95] = 1; entonces ROUND{[1377] * P704} Sino 0",
    "guidanceText": "El crédito sin derecho a devolución y no sujeto a restitución registrado en el código 1512 debe ser igual Crédito por impuesto territorial (código 365) y/o Crédito por impuestos soportados en el extranjero (código 841) utilizado en el ejercicio."
  },
  {
    "ruleId": "a.222",
    "targetFieldRaw": "[1513]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = 14D1 .y. [95] !=​ 1; entonces [19] - [1512] + [20] Sino Si atributo = 14D1 .y. [95] = 1; entonces [19] + [20] Sino 0",
    "guidanceText": "Debe registrar el crédito por Impuesto de primera categoría no sujeto a restitución, con derecho a devolución correspondiente a la RLI del ejercicio."
  },
  {
    "ruleId": "a.223",
    "targetFieldRaw": "[1996]",
    "operatorRaw": "=",
    "formulaRaw": "Si ABS{[1954] + [1955] + [1956] + [1957] + [1958] + [1959] + [1961] + [1962] + [1963] - [1964] - [1965] - [1966]} > 0; entonces [1728] Sino 0",
    "guidanceText": "El monto del código 1996 del recuadro N° 11 debe ser igual al monto del código 1728 del recuadro N° 12."
  },
  {
    "ruleId": "b.1",
    "targetFieldRaw": "M11{[03]}",
    "operatorRaw": "=",
    "formulaRaw": "1",
    "guidanceText": "Debe ingresar un Rut válido en el código 03."
  },
  {
    "ruleId": "b.2",
    "targetFieldRaw": "[110]",
    "operatorRaw": "=",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces POS{POS{[547] - [770]} - [872] - [465] - [494] - [850]} + POS{[617] - POS{[770] - [547]}} + [479] Sino 0",
    "guidanceText": "El monto registrado en el código 110 es incorrecto"
  },
  {
    "ruleId": "b.3",
    "targetFieldRaw": "[749]",
    "operatorRaw": "=",
    "formulaRaw": "[159] + [748]",
    "guidanceText": "El monto registrado en el código 749 debe ser igual a la suma de los códigos 159 y 748."
  },
  {
    "ruleId": "b.4",
    "targetFieldRaw": "[158]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [152] + [1032] + [1891] + [1104] + [161] + [749] - [166] - [907] - [169] - [1833]}",
    "guidanceText": "El monto registrado en el código 158 debe ser igual a la suma de los códigos 104, 105, 106, 108, 955, 1632 ,110, 155, 152, 1032, 1891, 1104, 161, y 749 menos los códigos 166, 907, 169 y 1833."
  },
  {
    "ruleId": "b.5",
    "targetFieldRaw": "[751]",
    "operatorRaw": "=",
    "formulaRaw": "[750] + [740]",
    "guidanceText": "El monto registrado en el código 751 debe ser igual a la suma de los códigos 750 y 740."
  },
  {
    "ruleId": "b.7",
    "targetFieldRaw": "[170]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[158] - [111] - [751] - [822] - [765] - [133] - [32]}",
    "guidanceText": "El monto registrado en el código 170 debe ser igual al valor positivo de la resta de los códigos 158, 111, 751, 822, 765, 133 y 32."
  },
  {
    "ruleId": "b.8",
    "targetFieldRaw": "[157]",
    "operatorRaw": "=",
    "formulaRaw": "TGL{ [170] - (([152] + [749] - [169] ) * [l])} [l] = Si ([104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [1032] + [1891] + [1104] + [166] + [1030] = 0) .y. { [161] > 0 .o. [152] > 0}; entonces 1 Sino 0",
    "guidanceText": "El monto registrado en el código 157 es incorrecto"
  },
  {
    "ruleId": "b.9",
    "targetFieldRaw": "[304]",
    "operatorRaw": "=",
    "formulaRaw": "[157] + [1017] + [1033] + [201] + [1035] + [910] - [1036] - [1101] - [135] - [136] - [176] - [752] - [608] - [1636] - [1637] - [1638] - [895] - [867] - [609] - [1639] - [1018] - [162] - [174] - [610] - [746] - [866] - [607]",
    "guidanceText": "El monto registrado en el código 304 debe ser igual a la suma de los códigos 157, 1017, 1033, 201, 1035 y 910 menos 1036, 1101, 135, 136, 176, 752, 608, 1636, 1637, 1638,895, 867, 609, 1639, 1018, 162, 174, 610, 746, 866 y 607."
  },
  {
    "ruleId": "b.10",
    "targetFieldRaw": "[31]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[304]}",
    "guidanceText": "El monto registrado en el código 31 debe ser igual al valor positivo del código 304"
  },
  {
    "ruleId": "b.12",
    "targetFieldRaw": "[20]",
    "operatorRaw": "=",
    "formulaRaw": "POS{ROUND{P704 * [18] - [19]}}",
    "guidanceText": "El valor del código 20 no corresponde."
  },
  {
    "ruleId": "b.13",
    "targetFieldRaw": "[189]",
    "operatorRaw": "=",
    "formulaRaw": "[1926] + [1928] + [1930] + [1932]",
    "guidanceText": "El código 189 debe ser igual a la suma de los códigos 1926, 1928, 1930 y 1932."
  },
  {
    "ruleId": "b.15",
    "targetFieldRaw": "[79]",
    "operatorRaw": "=",
    "formulaRaw": "POS{ROUND{P28 * [77]} - [74]}",
    "guidanceText": "El monto debe ser igual a la base imponible declarada en el código 77 multiplicado por tasa vigente, menos el código 74"
  },
  {
    "ruleId": "b.16",
    "targetFieldRaw": "[755]",
    "operatorRaw": "=",
    "formulaRaw": "POS{ROUND{P62 * [753]} - [754]}",
    "guidanceText": "El valor para el código 755 debe ser igual al código 753 multiplicado por la tasa vigente, menos el código 754."
  },
  {
    "ruleId": "b.21",
    "targetFieldRaw": "[198]",
    "operatorRaw": "=",
    "formulaRaw": "[619]",
    "guidanceText": "El monto registrado en el código 198 debe ser igual al código 619."
  },
  {
    "ruleId": "b.23",
    "targetFieldRaw": "[757]",
    "operatorRaw": "=",
    "formulaRaw": "[116] + [119]",
    "guidanceText": "El monto registrado en el código 757 debe ser igual a la suma de los códigos 116 y 119."
  },
  {
    "ruleId": "b.25",
    "targetFieldRaw": "[305]",
    "operatorRaw": "=",
    "formulaRaw": "[31] + [20] + [1113] + [1642] + [189] + [1039] + [79] + [1041] + [1042] + [825] + [1976] + [1044] + [114] + [1830] + [1837] + [909] + [952] + [755] + [134] + POS{[34] - [1910]} + [1644] + [911] + [913] + [923] + [924] + [1051] + [1052] + [21] + [43] + [767] + [862] - [71] - [36] - [848] - [82] - [1123] - [83] - [173] - [198] - [54] - [832] - [1907] - [833] - [1908] - [757] - [58] - [1645] - [181] - [881] - [1646] - [1647] - [1915] + [900] + [1796] + [1827]",
    "guidanceText": "El resultado liquidación anual impuesto a la renta registrado en el código 305 debe ser igual a la suma de los códigos 31, 20, 1113, 1642, 189, 1039, 79, 1041, 1042, 825, 1044, 114, 1830, 1837, 909, 952, 755, 134, 34, 1644, 911, 913, 923, 924, 1051, 1052, 21, 43, 767, 862, 900, 1796, y 1827 menos los códigos 71, 36, 848, 82, 1123, 83, 173, 198, 54, 832, 1907, 833, 1908, 757, 58, 1645, 181, 881, 1646, 1647, 1910, y 1915."
  },
  {
    "ruleId": "b.26",
    "targetFieldRaw": "[85]",
    "operatorRaw": "=",
    "formulaRaw": "NEG{[305]}",
    "guidanceText": "El saldo a favor registrado en el código 85 debe ser igual al valor negativo del código 305."
  },
  {
    "ruleId": "b.28",
    "targetFieldRaw": "[87]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[85] - [86]}",
    "guidanceText": "El valor del código 87 debe ser igual al código 85 menos el código 86."
  },
  {
    "ruleId": "b.29",
    "targetFieldRaw": "[90]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[305]}",
    "guidanceText": "El monto registrado en el código 90 debe ser igual al valor positivo del código 305"
  },
  {
    "ruleId": "b.30",
    "targetFieldRaw": "[39]",
    "operatorRaw": "=",
    "formulaRaw": "P56 * [90]; Si MES{[315}] = 01 / AT P57 * [90]; Si MES{[315}] = 02 / AT P58 * [90]; Si MES{[315}] = 03 / AT P30 * [90]; Si no Nota: Esta validación no debe ser aplicada en caso de declaraciones en moneda extranjera. El código [315] corresponde a la fecha de declaración.",
    "guidanceText": "El monto registrado de reajuste art.72 línea 88 es incorrecto"
  },
  {
    "ruleId": "b.31",
    "targetFieldRaw": "[91]",
    "operatorRaw": "=",
    "formulaRaw": "[90] + [39]",
    "guidanceText": "El monto registrado en el código 91 debe ser igual a la suma de los códigos 90 y 39."
  },
  {
    "ruleId": "b.36",
    "targetFieldRaw": "[116]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [1032] + [1104] + [166]) > 0 .y. [304] < 0; entonces MIN{ ([1638] + [610]); POS{(NEG{[304]}) - [746] - [866] }} Sino MIN{([1638] + [610]); POS{(NEG{[304]}) - [866]}}",
    "guidanceText": "El monto registrado en el código 116 es incorrecto"
  },
  {
    "ruleId": "b.37",
    "targetFieldRaw": "[119]",
    "operatorRaw": "=",
    "formulaRaw": "Si {[104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [1032] + [1104] + [166] > 0 .y. [304] < 0}; entonces MIN{ {[174] + [162]}; POS{ (NEG{[304]}) - [1638] - [610] - [746] - [866] }} Sino MIN{ {[174] + [162]}; POS{ (NEG{[304]}) - [610] - [866] }}",
    "guidanceText": "El monto registrado en el código 119 es incorrecto"
  },
  {
    "ruleId": "b.38",
    "targetFieldRaw": "[98]",
    "operatorRaw": "=",
    "formulaRaw": "Si [823] > 0; entonces [91] - [823] Sino 0",
    "guidanceText": "El monto registrado en el código 98 es incorrecto"
  },
  {
    "ruleId": "b.58",
    "targetFieldRaw": "[900]",
    "operatorRaw": "=",
    "formulaRaw": "[3039] variable resultante del motor de cálculo",
    "guidanceText": ""
  },
  {
    "ruleId": "b.63",
    "targetFieldRaw": "[952]",
    "operatorRaw": "=",
    "formulaRaw": "ROUND{[951] * P24}",
    "guidanceText": "El valor para el código 952 debe ser igual al código 951 multiplicado por la tasa vigente."
  },
  {
    "ruleId": "b.64",
    "targetFieldRaw": "[909]",
    "operatorRaw": "=",
    "formulaRaw": "ROUND{[908] * P25}",
    "guidanceText": "El valor para el código 909 debe ser igual al código 908 multiplicado por la tasa vigente."
  },
  {
    "ruleId": "b.65",
    "targetFieldRaw": "[161]",
    "operatorRaw": "=",
    "formulaRaw": "[1098] + [1030]",
    "guidanceText": "El monto registrado en el código 161 debe ser igual a la suma de los códigos 1098 y 1030."
  },
  {
    "ruleId": "b.67",
    "targetFieldRaw": "[1041]",
    "operatorRaw": "=",
    "formulaRaw": "Si (atributo = M14A); entonces POS{ROUND{P647 * [1040]}} Sino POS{ROUND{P704 * [1040]}}",
    "guidanceText": "El monto debe ser igual a la base imponible declarada en el código 1040 multiplicado por tasa vigente"
  },
  {
    "ruleId": "b.68",
    "targetFieldRaw": "[1044]",
    "operatorRaw": "=",
    "formulaRaw": "POS{(P24 * [1043]) - [1102]}",
    "guidanceText": "El monto debe ser igual a la base imponible declarada en el código 1043 multiplicado por tasa vigente, menos el código 1102"
  },
  {
    "ruleId": "b.69",
    "targetFieldRaw": "[1043]",
    "operatorRaw": "=",
    "formulaRaw": "[1065]",
    "guidanceText": "El monto del código 1043 debe ser igual al código 1065 del recuadro N°2."
  },
  {
    "ruleId": "b.74",
    "targetFieldRaw": "[1113]",
    "operatorRaw": "=",
    "formulaRaw": "POS{ROUND{P647 * [1109]} - [1111]}",
    "guidanceText": "El código 1113 debe ser igual al código 1109 multiplicado por la tasa vigente, menos el código 1111."
  },
  {
    "ruleId": "b.77",
    "targetFieldRaw": "[1642]",
    "operatorRaw": "=",
    "formulaRaw": "POS{ROUND{P84 * [1640]} - [1641]}",
    "guidanceText": "El monto debe ser igual a base imponible [1640] multiplicado por tasa vigente, menos [1641]"
  },
  {
    "ruleId": "b.78",
    "targetFieldRaw": "[1644]",
    "operatorRaw": "=",
    "formulaRaw": "ROUND{[1643] * P64}",
    "guidanceText": "El código 1644 debe ser igual al código 1643 multiplicado por 25%."
  },
  {
    "ruleId": "b.82",
    "targetFieldRaw": "[18]",
    "operatorRaw": "=",
    "formulaRaw": "Si (((POS{[1440]} + [1892] + [1895] + [1898] + [1901] + [1912] + [1924] + [1927] + [1929] + [1931]) >P720) .y. TIPO{[03]} = 1 .y. atributo = 14D1) .o. ([1440] > 0 .y. TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8 .y. atributo = 14D1); entonces POS{[1440]} Sino 0",
    "guidanceText": "El IDPC de empresas acogidas al régimen Pro Pyme registrado en código 18 debe ser igual al valor positivo declarado en el código 1440 del recuadro N°17. En el caso de los empresarios individuales el valor registrado en el código 18 debe ser mayor a 1 UTA."
  },
  {
    "ruleId": "b.83",
    "targetFieldRaw": "[1109]",
    "operatorRaw": "=",
    "formulaRaw": "Si (((POS{[1690]} + [1892] + [1895] + [1898] + [1901] + [1912] + [1924] + [1927] + [1929] + [1931]) > P720) .y. TIPO{[03]} = 1 .y. atributo = M14A) .o. ([1690] > 0 .y. TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8 .y. atributo = M14A); entonces POS{[1690]} Sino 0",
    "guidanceText": "El IDPC de empresas acogidas al régimen de imputación parcial de créditos registrado en el código 1109 debe ser igual al valor declarado en el código 1690 del recuadro N°12. En el caso de los empresarios individuales el valor registrado en el código 18 debe ser mayor a 1 UTA."
  },
  {
    "ruleId": "b.84",
    "targetFieldRaw": "[1640]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([1690] > 0 . y. [1109]=0 .y. atributo = M14G); entonces [1690] Sino 0",
    "guidanceText": "El valor anotado en código 1640 debe ser igual al valor registardo en recuadro N° 12 , código 1690."
  },
  {
    "ruleId": "b.88",
    "targetFieldRaw": "[1111]",
    "operatorRaw": "=",
    "formulaRaw": "Si {atributo = M14A .y. ([898] + [373] + [382] + [761] + [773] + [365] + [366] + [392] + [1153] + [984] + [839] + [384] + [390] + [742] + [841] + [855]) > 0}; entonces MIN{ROUND{[1109] * P647}; ([898] + [373] + [382] + [761] + [773] + [365] + [366] + [392] + [1153] + [984] + [839] + [384] + [390] + [742] + [841] + [855])} Sino 0",
    "guidanceText": "El valor del código 1111 debe ser igual al valor registrado en los códigos 898, 373, 382, 761, 773, 365, 366, 392, 1153, 984, 839, 384, 390, 742, 841, 855 del recuadro N° 8, solo hasta el monto que sea necesario para cubrir el IDPC determinado."
  },
  {
    "ruleId": "b.89",
    "targetFieldRaw": "[19]",
    "operatorRaw": "=",
    "formulaRaw": "Si {atributo = 14D1 .y. ([898] + [373] + [382] + [761] + [773] + [365] + [366] + [392] + [1153] + [984] + [839] + [384] + [390] + [742] + [841] + [855]) > 0}; entonces MIN{ROUND{[18] * P704}; ([898] + [373] + [382] + [761] + [773] + [365] + [366] + [392] + [1153] + [984] + [839] + [384] + [390] + [742] + [841] + [855])} Sino 0",
    "guidanceText": "El valor del código 19 debe ser igual al valor registrado en los códigos 898, 373, 382, 761, 773, 365, 366, 392, 1153, 984, 839, 384, 390, 742, 841, 855 del recuadro N° 8, solo hasta el monto que sea necesario para cubrir el IDPC determinado."
  },
  {
    "ruleId": "b.90",
    "targetFieldRaw": "[1641]",
    "operatorRaw": "=",
    "formulaRaw": "Si {atributo = M14G .y. ([898] + [373] + [382] + [761] + [773] + [365] + [366] + [392] + [1153] + [984] + [839] + [384] + [390] + [742] + [841] + [855]) > 0}; entonces MIN{ROUND{[1640] * P84}; ([898] + [373] + [382] + [761] + [773] + [365] + [366] + [392] + [1153] + [984] + [839] + [384] + [390] + [742] + [841] + [855])} Sino 0",
    "guidanceText": "El valor del código 1641 debe ser igual al valor registrado en los códigos 898, 373, 382, 761, 773, 365, 366, 392, 1153, 984, 839, 384, 390, 742, 841, 855 del recuadro N° 8, solo hasta el monto que sea necesario para cubrir el IDPC determinado."
  },
  {
    "ruleId": "b.91",
    "targetFieldRaw": "[1796]",
    "operatorRaw": "=",
    "formulaRaw": "[1794]",
    "guidanceText": "El valor registrado en código 1796 debe ser igual al valor anotado en recuadro N°24, código 1794"
  },
  {
    "ruleId": "b.92",
    "targetFieldRaw": "[608]",
    "operatorRaw": "=",
    "formulaRaw": "Si {([32] + [133]) > 0 .y. [158] > 0} .o. {([104] + [105] + [106] + [955] + [1632] + [110] + [155] + [1032] + [1104]) = 0}; entonces 0 Sino ([1592] + [1593] + [1594] + [1595] + [1721] + [1596] + [1597] + [1599] + [1633] + [1634] + [1635])",
    "guidanceText": "El crédito al Impuesto Global Complementario (IGC) por Impuesto de Primera Categoría (IDPC) sin derecho a devolución que debe o intenta declarar en el código 608 tiene que ser igual al valor registrado en los códigos 1592, 1593, 1594, 1595, 1721, 1596, 1597, 1599, 1633, 1634, y 1635, de éste mismo formulario 22."
  },
  {
    "ruleId": "b.93",
    "targetFieldRaw": "[610]",
    "operatorRaw": "=",
    "formulaRaw": "Si ([32] + [133]) = 0; entonces ([1024] + [1025] + [1026] + [1027] + [603] + [1722] + [954] + [1598] + [1631] + [605] + [1105] + [606] + [1031] + [1890] + [1914]) Sino 0",
    "guidanceText": "El valor del código 610 debe ser igual al valor registrado en los códigos 1024, 1025, 1026, 1027, 603, 1722, 954, 1598, 1631, 605, 1105, 606, 1031, 1890 y 1914."
  },
  {
    "ruleId": "b.94",
    "targetFieldRaw": "[34]",
    "operatorRaw": "=",
    "formulaRaw": "POS{ROUND{P62 * [32]} - [76]}",
    "guidanceText": "El valor del código 34 no corresponde."
  },
  {
    "ruleId": "b.96",
    "targetFieldRaw": "[1829]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1816]}",
    "guidanceText": "El valor registrado en código 1829 debe ser igual al valor positivo anotado en el código 1816"
  },
  {
    "ruleId": "b.97",
    "targetFieldRaw": "[1830]",
    "operatorRaw": "=",
    "formulaRaw": "ROUND{[1829] * P24}",
    "guidanceText": "El monto registrado en el código [1830] debe ser igual al código [1829] multiplicado por 10%."
  },
  {
    "ruleId": "b.98",
    "targetFieldRaw": "[1721]",
    "operatorRaw": "=",
    "formulaRaw": "[1853] + [1858]",
    "guidanceText": "El código 1721 debe ser igual a la suma de los códigos 1853, y 1858."
  },
  {
    "ruleId": "b.99",
    "targetFieldRaw": "[1722]",
    "operatorRaw": "=",
    "formulaRaw": "[1854] + [1859]",
    "guidanceText": "El código 1722 debe ser igual a la suma de los códigos 1854, y 1859."
  },
  {
    "ruleId": "b.100",
    "targetFieldRaw": "[1596]",
    "operatorRaw": "=",
    "formulaRaw": "[1850] + [1855] + [1860] + [1863] + [1917]",
    "guidanceText": "El código 1596 debe ser igual a la suma de los códigos 1850, 1855, 1860, 1863, 1917."
  },
  {
    "ruleId": "b.101",
    "targetFieldRaw": "[954]",
    "operatorRaw": "=",
    "formulaRaw": "[1848] + [1851] + [1856] + [1861] + [1872] + [1864]",
    "guidanceText": "El código 954 debe ser igual a la suma de los códigos 1848, 1851, 1856, 1861, 1872, 1864."
  },
  {
    "ruleId": "b.102",
    "targetFieldRaw": "[955]",
    "operatorRaw": "=",
    "formulaRaw": "[1849] + [1852] + [1857] + [1862] + [1873] + [1865]",
    "guidanceText": "El código 955 debe ser igual a suma de los códigos 1849, 1852, 1857, 1862, 1873, 1865."
  },
  {
    "ruleId": "b.103",
    "targetFieldRaw": "[605]",
    "operatorRaw": "=",
    "formulaRaw": "[1866]",
    "guidanceText": "El código 605 debe ser igual al código 1866."
  },
  {
    "ruleId": "b.104",
    "targetFieldRaw": "[155]",
    "operatorRaw": "=",
    "formulaRaw": "[1867] + [1869] + [1871]",
    "guidanceText": "El código 155 debe ser igual a la suma de los códigos 1867, 1869, 1871."
  },
  {
    "ruleId": "b.105",
    "targetFieldRaw": "[1633]",
    "operatorRaw": "=",
    "formulaRaw": "[1874] + [1879] + [1885]",
    "guidanceText": "El código 1633 debe ser igual a la suma de los códigos 1874, 1879, 1885."
  },
  {
    "ruleId": "b.106",
    "targetFieldRaw": "[1105]",
    "operatorRaw": "=",
    "formulaRaw": "[1875] + [1880] + [1886]",
    "guidanceText": "El código 1105 debe ser igual a la suma de los códigos 1875, 1880, 1886."
  },
  {
    "ruleId": "b.107",
    "targetFieldRaw": "[1634]",
    "operatorRaw": "=",
    "formulaRaw": "[1876] + [1881] + [1887]",
    "guidanceText": "El código 1634 debe ser igual a la suma de los códigos 1876, 1881, 1887."
  },
  {
    "ruleId": "b.108",
    "targetFieldRaw": "[606]",
    "operatorRaw": "=",
    "formulaRaw": "[1877] + [1882] + [1888]",
    "guidanceText": "El código 606 debe ser igual a la suma de los códigos 1877, 1882, 1888."
  },
  {
    "ruleId": "b.109",
    "targetFieldRaw": "[152]",
    "operatorRaw": "=",
    "formulaRaw": "[1878] + [1883] + [1884] + [1889]",
    "guidanceText": "El código 152 debe ser igual a la suma de los códigos 1878, 1883, 1884, 1889."
  },
  {
    "ruleId": "b.110",
    "targetFieldRaw": "[1037]",
    "operatorRaw": "=",
    "formulaRaw": "[1892] + [1895] + [1898] + [1901] + [1912]",
    "guidanceText": "El código 1037 debe ser igual a la suma de los códigos 1892, 1895, 1898, 1901,1912."
  },
  {
    "ruleId": "b.111",
    "targetFieldRaw": "[1038]",
    "operatorRaw": "=",
    "formulaRaw": "[1893] + [1899] + [1902] + [1918]",
    "guidanceText": "La rebaja al impuesto declarada en el código 1038, debe ser igual al valor registrado en los códigos 1893, 1899, 1902, y 1918"
  },
  {
    "ruleId": "b.112",
    "targetFieldRaw": "[1039]",
    "operatorRaw": "=",
    "formulaRaw": "[1894] + [1897] + [1900] + [1903] + [1913]",
    "guidanceText": "El código 1039 debe ser igual a la suma de los códigos 1894, 1897, 1900, 1903, 1913."
  },
  {
    "ruleId": "b.113",
    "targetFieldRaw": "[36]",
    "operatorRaw": "=",
    "formulaRaw": "[1904] + [1905] + [1906] + [1916]",
    "guidanceText": "El valor del código 36 debe ser igual al valor de los códigos 1904, 1905, 1906, 1916."
  },
  {
    "ruleId": "b.114",
    "targetFieldRaw": "[1894]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{([1892] * P84) - [1893]}}",
    "guidanceText": "El IDPC sobre rentas del arrendamiento, subarrendamiento, usufructo o cesión de cualquier otra forma de uso o goce temporal de bienes raíces agrícolas y no agrícolas registrado en el código 1894 debe ser igual a base imponible código 1892 multiplicado por tasa vigente, menos el código 1893."
  },
  {
    "ruleId": "b.115",
    "targetFieldRaw": "[1897]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino ROUND{[1895] * P84}",
    "guidanceText": "El IDPC sobre el mayor valor en la enajenación de bienes raíces situados en Chile registrado en el código 1897, debe ser igual a base imponible código 1895 multiplicado por la tasa vigente, menos el código 1896."
  },
  {
    "ruleId": "b.116",
    "targetFieldRaw": "[1900]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{([1898] * P84) - [1899]}}",
    "guidanceText": "El IDPC sobre rentas obtenidas por contribuyentes con contabilidad simplificada registrado en el código 1900, debe ser igual a base imponible código 1898 multiplicado por la tasa vigente, menos el código 1899."
  },
  {
    "ruleId": "b.117",
    "targetFieldRaw": "[1903]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{([1901] * P84) - [1902]}}",
    "guidanceText": "El IDPC sobre otras rentas efectivas registradas en el código 1903 , debe ser igual a base imponible código 1901 multiplicado por la tasa vigente, menos el código 1902."
  },
  {
    "ruleId": "b.118",
    "targetFieldRaw": "[1913]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{([1912] * P84) - [1918]}}",
    "guidanceText": "El IDPC otras rentas de fuente extranjera afectas registrado en el código 1913, debe ser igual a base imponible código 1912 multiplicado por la tasa vigente."
  },
  {
    "ruleId": "b.119",
    "targetFieldRaw": "[1916]",
    "operatorRaw": "=",
    "formulaRaw": "Si SUBTIPO{[03]} = 112 .o. 113 .o. 411; entonces [829] Sino 0",
    "guidanceText": "El valor registrado en el código 1916 debe ser igual al monto registrado en el código 829 del recuadro N° 8 de este Formulario 22"
  },
  {
    "ruleId": "b.122",
    "targetFieldRaw": "[603]",
    "operatorRaw": "=",
    "formulaRaw": "[1920] + [1922]",
    "guidanceText": "El crédito por impuesto de primera categoría (IDPC) sin obligación de restitución, y con derecho a devolución que debe o intenta declarar en el código 603 tiene que ser igual a la suma de los códigos 1920 y 1922."
  },
  {
    "ruleId": "b.123",
    "targetFieldRaw": "[108]",
    "operatorRaw": "=",
    "formulaRaw": "[1921] + [1923]",
    "guidanceText": "Las rentas presuntas propias y/o de terceros que debe o intenta declarar en el código 108 tiene que ser igual a la suma de los códigos 1921 y 1923."
  },
  {
    "ruleId": "b.124",
    "targetFieldRaw": "[187]",
    "operatorRaw": "=",
    "formulaRaw": "[1924] + [1927] + [1929] + [1931]",
    "guidanceText": "La base imponible de las rentas presuntas que debe o intenta declarar en el código 187 tiene que ser igual a la suma de los códigos 1924, 1927, 1929 y 1931."
  },
  {
    "ruleId": "b.125",
    "targetFieldRaw": "[188]",
    "operatorRaw": "=",
    "formulaRaw": "[1925]",
    "guidanceText": "El crédito por impuesto de primera categoría que debe o intenta declarar en el código 188 tiene que ser igual al código 1925."
  },
  {
    "ruleId": "b.126",
    "targetFieldRaw": "[1926]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{P84 * [1924] - [1925]}}",
    "guidanceText": "El impuesto de primera categoría que debe o intenta declarar en el código 1926 tiene que ser igual a la multiplicación del código 1924 por la tasa vigente del impuesto de primera categoría, menos el código 1925. En el caso de los empresarios individuales se deberá tener en cuenta la exención de 1 UTA, según lo dispuesto en el N° del artículo 40 de la Ley sobre Impuesto a la Renta."
  },
  {
    "ruleId": "b.127",
    "targetFieldRaw": "[1928]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{P84 * [1927]}}",
    "guidanceText": "El impuesto de primera categoría que debe o intenta declarar en el código 1928 tiene que ser igual a la multiplicación del código 1927 por la tasa vigente del impuesto de primera categoría. En el caso de los empresarios individuales se deberá tener en cuenta la exención de 1 UTA, según lo dispuesto en el N° del artículo 40 de la Ley sobre Impuesto a la Renta."
  },
  {
    "ruleId": "b.128",
    "targetFieldRaw": "[1930]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{P84 * [1929]}}",
    "guidanceText": "El impuesto de primera categoría que debe o intenta declarar en el código 1930 tiene que ser igual a la multiplicación del código 1929 por la tasa vigente del impuesto de primera categoría. En el caso de los empresarios individuales se deberá tener en cuenta la exención de 1 UTA, según lo dispuesto en el N° del artículo 40 de la Ley sobre Impuesto a la Renta."
  },
  {
    "ruleId": "b.129",
    "targetFieldRaw": "[1932]",
    "operatorRaw": "=",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. ([1892] + [1895] + [1898] + [1901] + [1912] + [18] + [1109] + [1924] + [1927] + [1929] + [1931]) <=​ P720); entonces 0 Sino POS{ROUND{P84 * [1931]}}",
    "guidanceText": "El impuesto de primera categoría que debe o intenta declarar en el código 1932 tiene que ser igual a la multiplicación del código 1931 por la tasa vigente del impuesto de primera categoría. En el caso de los empresarios individuales se deberá tener en cuenta la exención de 1 UTA, según lo dispuesto en el N° del artículo 40 de la Ley sobre Impuesto a la Renta."
  },
  {
    "ruleId": "b.130",
    "targetFieldRaw": "[201]",
    "operatorRaw": "=",
    "formulaRaw": "POS{ROUND{[705] * P16}}",
    "guidanceText": "El débito fiscal por ahorro neto negativo que debe o intenta declarar en el código 201 tiene que ser igual a la multiplicación del código 705 por la tasa del 15%."
  },
  {
    "ruleId": "b.131",
    "targetFieldRaw": "[1977]",
    "operatorRaw": "=",
    "formulaRaw": "Si [1968] > P751; entonces [1970] Sino 0",
    "guidanceText": "El Componente Ad Valorem registrado en el código 1977 debe ser igual al código 1970 total ingresos de productos mineros del ejercicio, cuando el promedio de toneladas metricas sea superior a 50.000"
  },
  {
    "ruleId": "b.132",
    "targetFieldRaw": "[1979]",
    "operatorRaw": "=",
    "formulaRaw": "POS{[1967]}",
    "guidanceText": "El componente del margen declarado en el código 1979 debe ser igual al código 1967 del recuadro N° 11."
  },
  {
    "ruleId": "b.133",
    "targetFieldRaw": "[1976]",
    "operatorRaw": "=",
    "formulaRaw": "[1978] + [1980]",
    "guidanceText": "El royalty minero que debe o intenta declarar en el código 1976 tienen que ser igual a la suma de los códigos 1978 y 1980."
  },
  {
    "ruleId": "b.134",
    "targetFieldRaw": "[1921]",
    "operatorRaw": "=",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1924] + [1927] + [1929] + [1931] Sino 0",
    "guidanceText": "Las rentas propias de la actividad de renta presunta registrado en el código 1921 deben ser igual al monto registrado en los códigos 1924, 1927, 1929, y 1931."
  },
  {
    "ruleId": "b.135",
    "targetFieldRaw": "[1920]",
    "operatorRaw": "=",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1926] + [1928] + [1930] + [1932] Sino 0",
    "guidanceText": "El crédito por impuesto de primera categoría (IDPC) sin obligación de restitución, con y con derecho a devolución registrado en el código 1920 debe ser igual al monto registrado en los códigos 1926, 1928, 1930 y 1932."
  },
  {
    "ruleId": "b.136",
    "targetFieldRaw": "[1592]",
    "operatorRaw": "=",
    "formulaRaw": "[2000] + [2005]",
    "guidanceText": "El código 1592 debe ser igual a la suma de los códigos 2000 y 2005."
  },
  {
    "ruleId": "b.137",
    "targetFieldRaw": "[1024]",
    "operatorRaw": "=",
    "formulaRaw": "[2001] + [2006]",
    "guidanceText": "El código 1024 debe ser igual a la suma de los códigos 2001 y 2006."
  },
  {
    "ruleId": "b.138",
    "targetFieldRaw": "[1593]",
    "operatorRaw": "=",
    "formulaRaw": "[2002] + [2007]",
    "guidanceText": "El código 1593 debe ser igual a la suma de los códigos 2002 y 2007."
  },
  {
    "ruleId": "b.139",
    "targetFieldRaw": "[1025]",
    "operatorRaw": "=",
    "formulaRaw": "[2003] + [2008]",
    "guidanceText": "El código 1025 debe ser igual a la suma de los códigos 2003 y 2008."
  },
  {
    "ruleId": "b.140",
    "targetFieldRaw": "[104]",
    "operatorRaw": "=",
    "formulaRaw": "[2004] + [2009]",
    "guidanceText": "El código 104 debe ser igual a la suma de los códigos 2004 y 2009."
  },
  {
    "ruleId": "b.141",
    "targetFieldRaw": "[2009]",
    "operatorRaw": "=",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces ([1208] + [1218] + ([1209] + [1219] + [1475] + [1480] + [1193] + [1194])) Sino 0",
    "guidanceText": "El código 2009 debe ser igual a la suma de los códigos 1208, 1218, 1209, 1219 del recuadro N° 15 o los códigos 1475, 1480 del recuadro N° 20, y/o los códigos 1193, 1194 del recuadro N° 6"
  },
  {
    "ruleId": "b.142",
    "targetFieldRaw": "[1597]",
    "operatorRaw": "=",
    "formulaRaw": "[2010] + [2015]",
    "guidanceText": "El código 1597 debe ser igual a la suma de los códigos 2010 y 2015."
  },
  {
    "ruleId": "b.143",
    "targetFieldRaw": "[1598]",
    "operatorRaw": "=",
    "formulaRaw": "[2011] + [2016]",
    "guidanceText": "El código 1598 debe ser igual a la suma de los códigos 2011 y 2016."
  },
  {
    "ruleId": "b.144",
    "targetFieldRaw": "[1599]",
    "operatorRaw": "=",
    "formulaRaw": "[2012] + [2017]",
    "guidanceText": "El código 1599 debe ser igual a la suma de los códigos 2012 y 2017."
  },
  {
    "ruleId": "b.145",
    "targetFieldRaw": "[1631]",
    "operatorRaw": "=",
    "formulaRaw": "[2013] + [2018]",
    "guidanceText": "El código 1631 debe ser igual a la suma de los códigos 2013 y 2018."
  },
  {
    "ruleId": "b.146",
    "targetFieldRaw": "[1632]",
    "operatorRaw": "=",
    "formulaRaw": "[2014] + [2019]",
    "guidanceText": "El código 1632 debe ser igual a la suma de los códigos 2014 y 2019."
  },
  {
    "ruleId": "b.147",
    "targetFieldRaw": "[2014]",
    "operatorRaw": "=",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces POS{[1630]} Sino 0",
    "guidanceText": "El código 2014 debe ser igual código 1630."
  },
  {
    "ruleId": "c.1",
    "targetFieldRaw": "[111]",
    "operatorRaw": "validation",
    "formulaRaw": "MIN{P27 / P13; [104] + [1024] + [1025] + [1592] + [1593]}",
    "guidanceText": "Las cotizaciones previsionales que registra en el código 111 debe ser menor o igual al monto máximo imponible anual, o al monto de los retiros tributables debidamente declarados en la línea 1."
  },
  {
    "ruleId": "c.4",
    "targetFieldRaw": "[136]",
    "operatorRaw": "validation",
    "formulaRaw": "l=Si [104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [1032] + [1891] + [1104] + [166] = 0 .y. [161] > 0; entonces 1 Sino 0---Si [170] > 0 .y. l = 0; entonces ([157] / [170]) * MAX{[152] / P13; [152] + [606] + [1105]} + P390 Sino 0",
    "guidanceText": "El crédito proporcional al Impuesto Global Complementario registrado en el código 136 supera el máximo permitido."
  },
  {
    "ruleId": "c.5",
    "targetFieldRaw": "[169]",
    "operatorRaw": "validation",
    "formulaRaw": "e=Si [104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [1032] + [1891] + [1104] + [166] = 0 .y. [161] > 0; entonces 0 Sino 1---( ((([105] + [155] + [152] + [1032] + [1104]) * (1 + P651)) + P390) + [1891]) * e",
    "guidanceText": "Las pérdidas en operaciones de capitales mobiliarios y ganancias de capital superan el máximo permitido."
  },
  {
    "ruleId": "c.7",
    "targetFieldRaw": "[822]",
    "operatorRaw": "validation",
    "formulaRaw": "P12",
    "guidanceText": "El 20% de cuotas de fondos de inversión adquiridas antes del 04.06.93 registradas en el código 822 debe ser menor o igual a 50 Unidades Tributarias Anuales."
  },
  {
    "ruleId": "c.9",
    "targetFieldRaw": "[607]",
    "operatorRaw": "validation",
    "formulaRaw": "MIN{ P343; (P22 * [170]) }",
    "guidanceText": "El crédito al Impuesto Global Complementario (IGC) o Impuesto Unico de Segunda Categoría (IUSC) por donaciones para fines culturales registrado en el código 607 debe ser menor a 320 UTM o el 20% de la base imponible del Impuesto Global Complementario o del Impuesto Unico de Segunda Categoría."
  },
  {
    "ruleId": "c.10",
    "targetFieldRaw": "[609]",
    "operatorRaw": "validation",
    "formulaRaw": "Si [104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [1032] + [1891] + [1104] + [166] = 0 .y. [161] > 0; entonces 0 Sino MIN{ P37; MIN{ P343; (P22 * [170]) }}",
    "guidanceText": "El crédito al Impuesto Global Complementario por donaciones a universidades, institutos profesionales y centros de formación técnica valor registrado en el código 609 debe ser menor o igual a 320 unidades tributables mensuales o el 20% de la base imponible del Impuesto Global Complementario o del impuesto Unico de Segunda Categoría o 14.000 unidades tributables mensuales."
  },
  {
    "ruleId": "c.11",
    "targetFieldRaw": "[373]",
    "operatorRaw": "validation",
    "formulaRaw": "MIN{[986] * P02; P641}",
    "guidanceText": "Las donaciones para fines culturales registradas en el código 373 deben ser igual o menor que 20.000 unidades tributables mensuales o a 50% de de las donaciones registradas en el código 986."
  },
  {
    "ruleId": "c.22",
    "targetFieldRaw": "[114]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{P60 * [113] - [1007]}",
    "guidanceText": "El Impuesto único sobre gastos rechazados y otras partidas registrado en el código 114 supera el monto máximo."
  },
  {
    "ruleId": "c.23",
    "targetFieldRaw": "[134]",
    "operatorRaw": "validation",
    "formulaRaw": "Si [106] = 0 .y. [133] > 0 .y. [158] > 0; entonces POS{(P61 * [133]) - [138]} + P48 Sino Si [106] > 0.y. [133] > 0 .y. [158] > 0; entonces ([106] * P60) + POS{(([133] - [106]) - [138]) * P61} + P48 Sino 0",
    "guidanceText": "El Impuesto Adicional según ex D.L. N° 600 de 1974 registrado en el código 134 supera el monto máximo."
  },
  {
    "ruleId": "c.25",
    "targetFieldRaw": "[86]",
    "operatorRaw": "validation",
    "formulaRaw": "[85]",
    "guidanceText": "El saldo puesto a disposición de los socios en el código 86 debe ser igual o menor al monto registrado en el código 85."
  },
  {
    "ruleId": "c.26",
    "targetFieldRaw": "[702]",
    "operatorRaw": "validation",
    "formulaRaw": "[701]",
    "guidanceText": "El Ahorro neto positivo utitlizado en el ejercicio registrado en el código 702 supera el monto registrado en el código 701."
  },
  {
    "ruleId": "c.27",
    "targetFieldRaw": "[114]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{P62 * [113] - [1007]}",
    "guidanceText": "El Impuesto único sobre gastos rechazados y otras partidas registrado en el código 114 es inferior al mínimo establecido."
  },
  {
    "ruleId": "c.28",
    "targetFieldRaw": "[134]",
    "operatorRaw": "validation",
    "formulaRaw": "Si [106] = 0 .y.[133]>0 .y. [158] > 0; entonces POS{(P16 * [133]) - [138]} + P48 Sino Si [106] > 0 .y. [133]>0 .y. [158] > 0; entonces ([106] * P648) + POS{(([133] - [106]) - [138]) * P16} + P48 Sino 0",
    "guidanceText": "El Impuesto Adicional según ex D.L. N° 600 de 1974 registrado en el código 134 es inferior al mínimo establecido."
  },
  {
    "ruleId": "c.30",
    "targetFieldRaw": "[133] + [32]",
    "operatorRaw": "validation",
    "formulaRaw": "Si [133] + [32] + [138] + [76] + [134] + [34] > 0; entonces [158] Sino 0",
    "guidanceText": "El valor en código 133 y/o en código 32 es (son) inferior(es) al mínimo permitido."
  },
  {
    "ruleId": "c.31",
    "targetFieldRaw": "[21]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = PTAO .y. Vx011357 < P311; entonces MAX{P03; Vx010017} Sino Si atributo = PTAO .y. P311 <= Vx011357 .y. Vx011357 <= P312; entonces MAX{P03 / 12; Vx010017} Sino 0",
    "guidanceText": "El monto del Impuesto único talleres artesanales es inferior al mínimo entre el valor de 2 UTM y los PPM obligatorios. En caso que ya no cumpla los requisitos de taller artesanal deberá regularizar su situación en la unidad o direccion regional que le corresponda a su domicilio."
  },
  {
    "ruleId": "c.32",
    "targetFieldRaw": "[750]",
    "operatorRaw": "validation",
    "formulaRaw": "P82",
    "guidanceText": "La rebaja por Intereses pagados por créditos con garantía hipotecaria registrado en el código 750 debe ser menor o igual a 8 unidades tributables anuales."
  },
  {
    "ruleId": "c.33",
    "targetFieldRaw": "[752]",
    "operatorRaw": "validation",
    "formulaRaw": "MIN{ P343; (P22 * [170]) }",
    "guidanceText": "El crédito al Impuesto al Global Complementario por donaciones para fines deportivos registrado en el código 752 debe ser menor o igual a 320 unidades tributables mensuales o el 20% de la base imponible del Impuesto Global Complementario."
  },
  {
    "ruleId": "c.34",
    "targetFieldRaw": "[823]",
    "operatorRaw": "validation",
    "formulaRaw": "Vx010799 (Nota: Validación exclusiva de Internet)",
    "guidanceText": "El monto registrado en el código 823 debe ser menor o igual al monto solicitado por usted en la Unidad del SII."
  },
  {
    "ruleId": "c.35",
    "targetFieldRaw": "[823]",
    "operatorRaw": "validation",
    "formulaRaw": "[91] (Nota: Validación exclusiva de Internet)",
    "guidanceText": "El monto registrado en código 823 debe ser menor o igual al monto registrado en el código 91."
  },
  {
    "ruleId": "c.43",
    "targetFieldRaw": "[198]",
    "operatorRaw": "validation",
    "formulaRaw": "P358",
    "guidanceText": "El monto de las retenciones registradas en el código 198 es excesivo."
  },
  {
    "ruleId": "c.45",
    "targetFieldRaw": "[82]",
    "operatorRaw": "validation",
    "formulaRaw": "P358",
    "guidanceText": "El crédito por gastos de capacitación registrado en el código 82 es excesivo."
  },
  {
    "ruleId": "c.46",
    "targetFieldRaw": "[740]",
    "operatorRaw": "validation",
    "formulaRaw": "P561",
    "guidanceText": "Los dividendos hipotecarios pagados por viviendas nuevas que registra en el código 740 es excesivo. Revise el monto informado en la declaración jurada N° 1896 por la institucion que otorgó el crédito, e instrucciones del código publcado en el sitio web sii.cl"
  },
  {
    "ruleId": "c.49",
    "targetFieldRaw": "[896]",
    "operatorRaw": "validation",
    "formulaRaw": "[617]",
    "guidanceText": "El valor registrado en el código 896 debe ser mayor o igual a código 617."
  },
  {
    "ruleId": "c.70",
    "targetFieldRaw": "[998]",
    "operatorRaw": "validation",
    "formulaRaw": "[999]",
    "guidanceText": "El código 998 debe ser menor o igual al código 999."
  },
  {
    "ruleId": "c.76",
    "targetFieldRaw": "[1026] + [1027] + [1594] + [1595]",
    "operatorRaw": "validation",
    "formulaRaw": "Si [748] > 0; entonces ([105] * P651) + [748] + P390 Sino([105] * P651) + P390",
    "guidanceText": "El valor registrado en los códigos 1024 más 1025, 1592 y 1593 es superior al máximo establecido."
  },
  {
    "ruleId": "c.80",
    "targetFieldRaw": "[1031] + [1635]",
    "operatorRaw": "validation",
    "formulaRaw": "([1032] * P84) + P736",
    "guidanceText": "Los créditos por impuesto de primera categoría (IDPC) sin obligación de restitución, con y sin derecho a devolución que debe o intenta declarar en los códigos 1031 y 1635 tiene que ser inferior al resultado del código 1032 multiplicado por la tasa del IDPC."
  },
  {
    "ruleId": "c.83",
    "targetFieldRaw": "[491]",
    "operatorRaw": "validation",
    "formulaRaw": "P474 * [479]; Si SUBTIPO{[03]} = 112 .o. 113 .o. 114 .o.115 P22 * [479], Sino",
    "guidanceText": "El valor declarado en el código 491 es incorrecto."
  },
  {
    "ruleId": "c.92",
    "targetFieldRaw": "[1177]",
    "operatorRaw": "validation",
    "formulaRaw": "[1145] * P34",
    "guidanceText": "El código 1177 debe ser menor o igual a código 1145 multiplicado por el IPC anual."
  },
  {
    "ruleId": "c.94",
    "targetFieldRaw": "[1154]",
    "operatorRaw": "validation",
    "formulaRaw": "Si F22 es Rectificatoria .y. [315]<=P377 .y. [91] > 0; entonces MIN{P103; ROUND{POS{[1728]}} * P02} Sino Si F22 NO es Rectificatoria .y. [315]<=P52 .y. [87] >= 0; entonces MIN{P103; ROUND{POS{[1728]}} * P02} Sino Si F22 es Rectificatoria .y. [1154] > (ROUND{POS{[1728]}} * P02); entonces ROUND{POS{[1728]}} * P02 Sino [1154]",
    "guidanceText": "El Incentivo al ahorro registrado en el código 1154 debe ser menor o igual al 50% del código 1728 o al valor en pesos de U.F 5.000."
  },
  {
    "ruleId": "c.95",
    "targetFieldRaw": "[1157]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{[1728] - [1154]}",
    "guidanceText": "El código 1157 debe ser menor o igual código 1728 menos el código 1154."
  },
  {
    "ruleId": "c.99",
    "targetFieldRaw": "[1433]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{[1729] - [1432]}",
    "guidanceText": "El valor del código 1433 debe ser menor o igual ala operatoria del código 1729 menos 1432"
  },
  {
    "ruleId": "c.104",
    "targetFieldRaw": "[910] + [913]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{ P24 * [106]}",
    "guidanceText": "El valor del código 910 más 913 debe ser mayor o igual a código 106 por tasa adicional 10%"
  },
  {
    "ruleId": "c.107",
    "targetFieldRaw": "[1636]",
    "operatorRaw": "validation",
    "formulaRaw": "Si ([170] > P722) .y. (([1592] + [1024] + [1594] + [1026]) > 0); entonces MIN{(([170] - P722) * P11) + P390; (((([104] + [105]) * (1 + P651)) + [748]) * P11) + P390} Sino 0",
    "guidanceText": "El monto registrado en el código 1636 debe ser menor o igual al 5% aplicado sobre la parte de la renta que exceda las 310 UTA y que corresponda a retiros o dividendos debidamente incrementados"
  },
  {
    "ruleId": "c.111",
    "targetFieldRaw": "[1184]",
    "operatorRaw": "validation",
    "formulaRaw": "[1358] * P24",
    "guidanceText": "El monto registrado en código 1184 debe ser al menos un decimo de la cantidad anotada en el código 1358. Recuadro N°7"
  },
  {
    "ruleId": "c.112",
    "targetFieldRaw": "[1362]",
    "operatorRaw": "validation",
    "formulaRaw": "[1359] * P24",
    "guidanceText": "El monto registrado en código 1362 debe ser al menos un decimo de la cantidad anotada en el código 1359. Recuadro N°7"
  },
  {
    "ruleId": "c.113",
    "targetFieldRaw": "[1432]",
    "operatorRaw": "validation",
    "formulaRaw": "Si F22 es Rectificatoria .y. [315]<=P377 .y. [91] > 0; entonces MIN{P103; POS{ROUND{[1729]} * P02}} Sino Si F22 NO es Rectificatoria .y. [315]<=P52 .y. [87] >= 0; entonces MIN{P103; ROUND{POS{[1729]}} * P02} Sino Si F22 es Rectificatoria .y. [1432] > (ROUND{POS{[1729]}} * P02); entonces ROUND{POS{[1729]}} * P02 Sino [1432]",
    "guidanceText": "El Incentivo al ahorro registrado en el código 1432 debe ser menor o igual al 50% del código 1729 o al valor en pesos de U.F 5.000."
  },
  {
    "ruleId": "c.114",
    "targetFieldRaw": "[1679]",
    "operatorRaw": "validation",
    "formulaRaw": "[938] + [949]",
    "guidanceText": "El valor del código 1679 debe ser al menos lo registrado en los códigos 938 y949"
  },
  {
    "ruleId": "c.117",
    "targetFieldRaw": "[1178]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{[1685] + [1688] - [1147] - [1148]}",
    "guidanceText": "El valor registrado en el código 1178 debe ser mayor o igual al resultado positivo del código 1685 más 1688 menos 1147 y 1148"
  },
  {
    "ruleId": "c.118",
    "targetFieldRaw": "[1179]",
    "operatorRaw": "validation",
    "formulaRaw": "NEG{[1685] + [1688] - [1147] - [1148]}",
    "guidanceText": "El valor registrado en el código 1179 debe ser mayor o igual al resultado negativo del código 1685 más 1688 menos 1147 y 1148"
  },
  {
    "ruleId": "c.120",
    "targetFieldRaw": "[1475] + [1476] + [1767] + [1768] + [1477] + [1478]",
    "operatorRaw": "validation",
    "formulaRaw": "[1479]",
    "guidanceText": "La suma de los códigos 1475, 1476, 1767, 1768, 1477 y 1478 del recuadro N° 20 debe ser igual o menor al código 1479 del recuadro N° 19"
  },
  {
    "ruleId": "c.121",
    "targetFieldRaw": "[1208] + [1218] + [1230] + [1745] + [1746] + [1242] + [1254]",
    "operatorRaw": "validation",
    "formulaRaw": "[1182]",
    "guidanceText": "La suma de los códigos 1208, 1218, 1230, 1745, 1746, 1242, y 1254 del recuadro N° 15 debe ser igual o menor al código 1182 del recuadro N° 14"
  },
  {
    "ruleId": "c.122",
    "targetFieldRaw": "[1685] + [1686] + [1183] + [1688]",
    "operatorRaw": "validation",
    "formulaRaw": "[1657] + [1658] + [1659] + [1660]",
    "guidanceText": "El valor registrado en los códigos 1685, 1686, 1183 y/o 1688 debe ser menor o igual a lo registrado en los códigos 1657, 1658, 1659 y/o 1660"
  },
  {
    "ruleId": "c.123",
    "targetFieldRaw": "[1578]",
    "operatorRaw": "validation",
    "formulaRaw": "[1605]",
    "guidanceText": "El códigos 1578 del recuadro N° 23 debe ser igual o menor al código 1605 del recuadro N° 22"
  },
  {
    "ruleId": "c.126",
    "targetFieldRaw": "[1637]",
    "operatorRaw": "validation",
    "formulaRaw": "Si{TIPO{[03]} = 1 .y. [1849] > 0 .y. [170] > 0}; entonces (eta * [1849]) + P390 Sino 0 eta = ([157] / [170]) redondear a 3 decimales y luego operar).",
    "guidanceText": "El valor registrado en el código 1637 supera el máximo permitido."
  },
  {
    "ruleId": "c.127",
    "targetFieldRaw": "[76]",
    "operatorRaw": "validation",
    "formulaRaw": "Si [32] > 0; entonces ([1592] + [1593] + [1594] + [1595] + [1721] + [1596] + [1597] + [1599] + [1633] + [1634] + [1635]) + ([1024] + [1025] + [1026] + [1027] + [603] + [1722] + [954] + [1598] + [1631] + [605] + [1105] + [606] + [1031] + [1890] + [1914]) Sino 0",
    "guidanceText": "El valor del código 76 debe ser al menos igual a la sumatoria de los códigos 1592 + 1593 + 1594 + 1595 + 1721 + 1596 + 1597 + 1599 + 1633 + 1634 + 1635 + 1024 + 1025 + 1026 + 1027 + 603 + 1722 + 954 + 1598 + 1631 + 605 + 1105 + 606 + 1031"
  },
  {
    "ruleId": "c.130",
    "targetFieldRaw": "[113]",
    "operatorRaw": "validation",
    "formulaRaw": "Si {[1682] > 0 .y. atributo = M14A .y. (SUBTIPO{[03]} = 111 .o. 211 .o. 212 .o. 213 .o. 214 .o. 215 .o. 216 .o. 217 .o. 218. o . 219. o . 220. o. 221 .o. 222 .o. 223 .o. 224 .o. 311 .o. 312 .o. 313 .o. 411 .o. 811 .o. 812 .o. 815 .o. 816 .o. 817 .o. 818)}; entonces [1682] Sino 0",
    "guidanceText": "El valor del código 113 debe ser al menos igual a lo declarado en el código 1682 del recuadro N° 12"
  },
  {
    "ruleId": "c.131",
    "targetFieldRaw": "[1638]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1609] Sino 0",
    "guidanceText": "El valor del código 1638 debe ser mayor o igual código 1609"
  },
  {
    "ruleId": "c.132",
    "targetFieldRaw": "[1035]",
    "operatorRaw": "validation",
    "formulaRaw": "alfa=[1592] + [1594] + [1721] + [1597] + [1633]---beta=[1024] + [1026] + [1722] + [1598] + [1105]---eta=Si ([1592] + [1024]) > 0 .y. [170] < P12; entonces 1 Sino 0---Si [32] = 0; entonces POS{((beta - ([1024] * eta)) * P654) + MIN{MIN{(alfa - ([1592] * eta)) * P654; (((beta - ([1024] * eta)) * P654) + [157] + [1017] + [1033] + [201] + [910]) * (1 + P59) * P654}; [608]} - P390} Sino 0",
    "guidanceText": "El débito fiscal por restitución crédito por Impuesto de Primera Categoría registrado en el código 1035 es inferior al monto a restituir."
  },
  {
    "ruleId": "c.134",
    "targetFieldRaw": "[1833]",
    "operatorRaw": "validation",
    "formulaRaw": "MIN{ P732; POS{([104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [152] + [1032] + [1891] + [1104] + [161] + [749] - [166] - [907] - [169] - [111] - [750] - [740] - [822] - [765]) * P655} }",
    "guidanceText": "La rebaja por donaciones a entidades sin fines de lucro registrada en el código 1833 debe ser menor o igual al limite entre 10.000 unidades tributaria mensuales y el 5% de la base imponible del Impuesto Global Complementario o Impuesto Unico Segunda Categoría."
  },
  {
    "ruleId": "c.135",
    "targetFieldRaw": "[867]",
    "operatorRaw": "validation",
    "formulaRaw": "MIN{ P343; (P22 * [170]) }",
    "guidanceText": "El crédito al Impuesto Global Complementario o Impuesto Unico de Segunda Categoría por donaciones para fines sociales valor registrado en el código 867 debe ser menor o igual a 320 unidades tributarias mensuales o al 205 de la base imponible del Impuesto Global Complementario."
  },
  {
    "ruleId": "c.160",
    "targetFieldRaw": "[366]",
    "operatorRaw": "validation",
    "formulaRaw": "P481",
    "guidanceText": "El crédito por bienes físicos del activo inmovilizado del ejercicio registrado en el código 366 debe ser menor o igual 500 UTM."
  },
  {
    "ruleId": "c.161",
    "targetFieldRaw": "[1060]",
    "operatorRaw": "validation",
    "formulaRaw": "P656",
    "guidanceText": "El valor registrado en el código 1060 supera el máximo de 8.000 UF"
  },
  {
    "ruleId": "c.164",
    "targetFieldRaw": "[1215]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{[1066]}",
    "guidanceText": "El valor del código 1215 del recuadro N° 15 debe ser mayor o igual código 1066 del recuadro N° 10"
  },
  {
    "ruleId": "c.165",
    "targetFieldRaw": "[1740]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8) .y. atributo = M14A; entonces POS{[1814]} Sino 0",
    "guidanceText": "El valor del código 1740 del recuadro N° 15 debe ser al menos el valor del código 1814 del recuadro N° 4"
  },
  {
    "ruleId": "c.167",
    "targetFieldRaw": "[1189]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8) .y. atributo = M14A; entonces POS{[1814]} Sino 0",
    "guidanceText": "El monto de las otras partidas a agregar que debe o intenta declarar en el código 1189 del recuadro N° 14 tiene que ser mayor o igual al resultado neto de las operaciones del ejercicio por enajenaciones de acciones o cuotas de fondos mutuos y/o de inversión declaradas en el código 1814 del recuadro N°4 de éste formulario 22."
  },
  {
    "ruleId": "c.168",
    "targetFieldRaw": "[1190]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8) .y. atributo = M14A; entonces NEG{[1814]} Sino 0",
    "guidanceText": "El monto de las otras partidas a deducir que debe o intenta declarar en el código 1190 del recuadro N° 14 tiene que ser mayor o igual al resultado neto (pérdidas) de las operaciones del ejercicio por enajenaciones de acciones o cuotas de fondos mutuos y/o de inversión declaradas en el código 1814 del recuadro N°4 de éste formulario 22."
  },
  {
    "ruleId": "c.169",
    "targetFieldRaw": "[1380]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8) .y. atributo = 14D1; entonces POS{[1814]} Sino 0",
    "guidanceText": "El valor registrado en el código 1380 debe ser mayor o igual al valor positivo del código 1814 del recuadro N°4."
  },
  {
    "ruleId": "c.170",
    "targetFieldRaw": "[1381]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8) .y. atributo = 14D1; entonces NEG{[1814]} Sino 0",
    "guidanceText": "El valor registrado en el código 1381 debe ser mayor o igual al valor negativo del código 1814 del recuadro N°4."
  },
  {
    "ruleId": "c.171",
    "targetFieldRaw": "[1584]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8) .y. atributo = 14TT; entonces POS{[1814]} Sino 0",
    "guidanceText": "El valor registrado en el código 1584 debe ser mayor o igual al valor negativo del código 1814 del recuadro N°4."
  },
  {
    "ruleId": "c.172",
    "targetFieldRaw": "[1585]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8) .y. atributo = 14TT; entonces NEG{[1814]} Sino 0",
    "guidanceText": "El valor registrado en el código 1585 debe ser mayor o igual al valor negativo del código 1814 del recuadro N°4."
  },
  {
    "ruleId": "c.183",
    "targetFieldRaw": "[1866]",
    "operatorRaw": "validation",
    "formulaRaw": "([1867] * P85) + P390",
    "guidanceText": "El crédito por impuesto de primera categoría (IDPC) sin obligación de restitución, con y con derecho a devolución registrado en el código 1866 debe ser a lo menos el monto registrado en el código 1867 multiplicada por tasa vigente."
  },
  {
    "ruleId": "c.184",
    "targetFieldRaw": "[1879] + [1880] + [1881] + [1882]",
    "operatorRaw": "validation",
    "formulaRaw": "P651 * [1883] + P390; Si [748] = 0 P59 * [1883] + P390 ; Si no",
    "guidanceText": "La suma de los códigos 1879, 1880, 1881, 1882 supera el maximo permitivo"
  },
  {
    "ruleId": "c.185",
    "targetFieldRaw": "[1853] + [1854] + [1855] + [1856]",
    "operatorRaw": "validation",
    "formulaRaw": "[1857] * P84",
    "guidanceText": "Los créditos por impuesto de primera categoría (IDPC) registrados en los códigos 1853, 1854, 1855, y 1856 son superiores a la renta efectiva declarada en el código 1857 multiplicada por la tasa vigente."
  },
  {
    "ruleId": "c.186",
    "targetFieldRaw": "[1858] + [1859] + [1860] + [1861]",
    "operatorRaw": "validation",
    "formulaRaw": "[1862] * P84",
    "guidanceText": "Los créditos por impuesto de primera categoría (IDPC) registrados en los códigos 1858, 1859, 1860, y 1861 son superiores a la renta efectiva declarada en el código 1862 multiplicada por la tasa vigente."
  },
  {
    "ruleId": "c.187",
    "targetFieldRaw": "[1849]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1892] Sino 0",
    "guidanceText": "El valor de las rentas del arrendamiento, subarrendamiento, usufructo o cesión de cualquier otra forma del uso o goce temporal de bienes raíces agrícolas y no agrícolas registrado en el código 1849 debe ser al menos el monto registrado en el código 1892."
  },
  {
    "ruleId": "c.192",
    "targetFieldRaw": "[1915]",
    "operatorRaw": "validation",
    "formulaRaw": "P738",
    "guidanceText": "El crédito por la compra de viviendas nuevas adquiridas con créditos con garantía hipotecaria registrado en el código 1915 supera el máximo de 16 UTM a diciembre AT - 1."
  },
  {
    "ruleId": "c.194",
    "targetFieldRaw": "[1848]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1894] Sino 0",
    "guidanceText": "El crédito por impuesto de primera categoría (IDPC) sin obligación de restitución, con y con derecho a devolución registrado en el código 1848 debe ser a lo menos el monto registrado en el código 1894."
  },
  {
    "ruleId": "c.195",
    "targetFieldRaw": "[1890]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1897] Sino 0",
    "guidanceText": "El crédito por impuesto de primera categoría (IDPC) sin obligación de restitución, con y con derecho a devolución registrado en el código 1890 debe ser a lo menos el monto registrado en el código 1897."
  },
  {
    "ruleId": "c.196",
    "targetFieldRaw": "[1891]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1063] + [1989] + [1990] Sino 0",
    "guidanceText": "El mayor valor en la enajenación de bienes raíces situados en Chile registrado en el código 1891 debe ser mayor o igual al monto registrado en los códigos 1063, 1989 y 1990."
  },
  {
    "ruleId": "c.197",
    "targetFieldRaw": "[1864] + [1866] + [1031]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1903] Sino 0",
    "guidanceText": "El valor registrado en los códigos1864, 1866, y/o 1031 debe ser a lo menos el monto registrado en el código 1903."
  },
  {
    "ruleId": "c.198",
    "targetFieldRaw": "[1865] + [1867] + [1032]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1901] Sino 0",
    "guidanceText": "El valor registrado en los códigos 1865, 1867 y/o 1032 debe ser mayor o igual al monto registrado en el código 1901."
  },
  {
    "ruleId": "c.199",
    "targetFieldRaw": "[1609]",
    "operatorRaw": "validation",
    "formulaRaw": "((POS{[1600] + [1819] + [1601] + [1602] + [1603] + [1604] + [1605] + [1606] + [1607] + [1608] - [1629]} / (1 - P704)) * P704) + P736",
    "guidanceText": "El crédito por activos fijos adquiridos en el ejercicio (art. 33 bis LIR) declarado en el código 1609 no puede exceder del IDPC (12,5%) que habría gravado la base imponible en el caso de que aquella hubiese estado afecta a dicho impuesto."
  },
  {
    "ruleId": "c.201",
    "targetFieldRaw": "[1918]",
    "operatorRaw": "validation",
    "formulaRaw": "([1912] * P84) + P736",
    "guidanceText": "El valor registrado en el código 1918 debe ser menor o igual al monto registrado en el código 1912 por la tasa vigente."
  },
  {
    "ruleId": "c.203",
    "targetFieldRaw": "[1363] + [1364]",
    "operatorRaw": "validation",
    "formulaRaw": "([1184] * P651) + P390",
    "guidanceText": "El valor registrado en los códigos 1363 más 1364 es superior al máximo establecido."
  },
  {
    "ruleId": "c.205",
    "targetFieldRaw": "[1852]",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1; entonces [1898] Sino 0",
    "guidanceText": "Las rentas por participaciones o cuotas de comunidad obtenidas por la empresa que determina su renta efectiva sin contabilidad completa que debe o intenta declarar en el código 1852 debe ser a lo menos el monto registrado en el código 1898 de éste mismo formulario."
  },
  {
    "ruleId": "c.206",
    "targetFieldRaw": "[1917] + [1848]",
    "operatorRaw": "validation",
    "formulaRaw": "([1849] * P84) + P736",
    "guidanceText": "El valor registrado en los códigos 1917 y 1848 es superior al máximo establecido."
  },
  {
    "ruleId": "c.207",
    "targetFieldRaw": "[1850] + [1851]",
    "operatorRaw": "validation",
    "formulaRaw": "([1852] * P84) + P736",
    "guidanceText": "El valor registrado en los códigos 1850 y 1851 es superior al máximo establecido."
  },
  {
    "ruleId": "c.208",
    "targetFieldRaw": "[1914]",
    "operatorRaw": "validation",
    "formulaRaw": "([1104] * P84) + P736",
    "guidanceText": "El valor registrado en el código 1914 es superior al máximo establecido."
  },
  {
    "ruleId": "c.209",
    "targetFieldRaw": "[1863] + [1864]",
    "operatorRaw": "validation",
    "formulaRaw": "([1865] * P84) + P736",
    "guidanceText": "Los créditos por impuesto de primera categoría (IDPC) sin obligación de restitución, con y sin derecho a devolución que debe o intenta declarar en los códigos 1863 y/o 1864 tiene que ser inferior al resultado del código 1865 multiplicado por la tasa del IDPC."
  },
  {
    "ruleId": "c.210",
    "targetFieldRaw": "[1874] + [1875] + [1876] + [1877]",
    "operatorRaw": "validation",
    "formulaRaw": "([1878] * P651) + P390",
    "guidanceText": "Los créditos por impuesto de primera categoría (IDPC) con y sin obligación de restitución, con y sin derecho a devolución que debe o intenta declarar en los códigos 1874, 1875, 1876, y/o 1877 debe ser igual o menor que el resultado del código 1878 multiplicado por la tasa del IDPC."
  },
  {
    "ruleId": "c.211",
    "targetFieldRaw": "[1885] + [1886] + [1887] + [1888]",
    "operatorRaw": "validation",
    "formulaRaw": "([1889] * P651) + P390",
    "guidanceText": "Los créditos por impuesto de primera categoría (IDPC) con y sin obligación de restitución, con y sin derecho a devolución que debe o intenta declarar en los códigos 1885, 1886, 1887, y/o 1888 debe ser igual o menor que el resultado del código 1889 multiplicado por la tasa del IDPC."
  },
  {
    "ruleId": "c.212",
    "targetFieldRaw": "[71]",
    "operatorRaw": "validation",
    "formulaRaw": "[63]",
    "guidanceText": "El excedente del Impuesto Unico (IU) de 35% que debe o intenta declarar en el código 71 debe ser menor o igual al IU de 35% anotado en el código 63."
  },
  {
    "ruleId": "c.214",
    "targetFieldRaw": "[1959]",
    "operatorRaw": "validation",
    "formulaRaw": "Si ABS{ [1955] + [1956] + [1957] + [1958] + [1959] + [1961] + [1962] + [1963] - [1964] - [1965] - [1966]} > 0; entonces [938] + [949] Sino 0",
    "guidanceText": "La depreciacion acelerada declarada en el código 1959 del recuadro N° 11 debe ser al menos el valor declarado en los códigos 938 y 949."
  },
  {
    "ruleId": "c.215",
    "targetFieldRaw": "[1989] + [1990]",
    "operatorRaw": "validation",
    "formulaRaw": "POS{[1987] + [1988]}",
    "guidanceText": "El mayor valor en la enajenación de bienes raíces registrado en los códigos 1989 y 1990 debe ser mayor o igual al monto registrado en los códigos 1987 y 1988."
  },
  {
    "ruleId": "c.216",
    "targetFieldRaw": "[1922]",
    "operatorRaw": "validation",
    "formulaRaw": "(P84 * [1923]) + P390",
    "guidanceText": "El crédito por impuesto de primera categoría (IDPC) sin obligación de restitución, y con derecho a devolución que debe o intenta declarar en el código 1922 tiene que ser inferior al resultado de la multiplicación del código 1923 por la tasa del IDPC."
  },
  {
    "ruleId": "c.217",
    "targetFieldRaw": "[1936]",
    "operatorRaw": "validation",
    "formulaRaw": "[1270] + [1271]",
    "guidanceText": "El monto extinguido por ISIF que debe declarar en el código 1936 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1270 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1271."
  },
  {
    "ruleId": "c.218",
    "targetFieldRaw": "[1937]",
    "operatorRaw": "validation",
    "formulaRaw": "[1279] + [1280]",
    "guidanceText": "El monto extinguido por ISIF que debe declarar en el código 1937 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1279 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1280."
  },
  {
    "ruleId": "c.219",
    "targetFieldRaw": "[1938]",
    "operatorRaw": "validation",
    "formulaRaw": "[1288] + [1290]",
    "guidanceText": "El monto extinguido por ISIF que debe declarar en el código 1938 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1288 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1290."
  },
  {
    "ruleId": "c.220",
    "targetFieldRaw": "[1939]",
    "operatorRaw": "validation",
    "formulaRaw": "[1301] + [1303]",
    "guidanceText": "El monto extinguido por ISIF que debe declarar en el código 1939 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1301 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1303."
  },
  {
    "ruleId": "c.221",
    "targetFieldRaw": "[1940]",
    "operatorRaw": "validation",
    "formulaRaw": "[1324] + [1326]",
    "guidanceText": "El monto extinguido por ISIF que debe declarar en el código 1940 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1324 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1326."
  },
  {
    "ruleId": "c.222",
    "targetFieldRaw": "[1941]",
    "operatorRaw": "validation",
    "formulaRaw": "[1335] + [1337]",
    "guidanceText": "El monto extinguido por ISIF que debe declarar en el código 1941 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1335 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1337."
  },
  {
    "ruleId": "c.223",
    "targetFieldRaw": "[1945]",
    "operatorRaw": "validation",
    "formulaRaw": "[1495] + [1590]",
    "guidanceText": "El monto imputado por ISIF que debe declarar en el código 1945 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1495 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1590."
  },
  {
    "ruleId": "c.224",
    "targetFieldRaw": "[1946]",
    "operatorRaw": "validation",
    "formulaRaw": "[1496] + [1436]",
    "guidanceText": "El monto imputado por ISIF que debe declarar en el código 1946 del recuadro N°21, debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1496 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1436."
  },
  {
    "ruleId": "c.225",
    "targetFieldRaw": "[1947]",
    "operatorRaw": "validation",
    "formulaRaw": "[1497] + [1437]",
    "guidanceText": "El monto imputado por ISIF que debe declarar en el código 1947 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1497 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1437."
  },
  {
    "ruleId": "c.226",
    "targetFieldRaw": "[1948]",
    "operatorRaw": "validation",
    "formulaRaw": "[1498] + [1438]",
    "guidanceText": "El monto imputado por ISIF que debe declarar en el código 1948 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1498 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1438."
  },
  {
    "ruleId": "c.227",
    "targetFieldRaw": "[1949]",
    "operatorRaw": "validation",
    "formulaRaw": "[1501] + [1441]",
    "guidanceText": "El monto imputado por ISIF que debe declarar en el código 1949 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1501 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1441."
  },
  {
    "ruleId": "c.228",
    "targetFieldRaw": "[1950]",
    "operatorRaw": "validation",
    "formulaRaw": "[1502] + [1442]",
    "guidanceText": "El monto imputado por ISIF que debe declarar en el código 1950 debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1502 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1442."
  },
  {
    "ruleId": "c.229",
    "targetFieldRaw": "[1942]",
    "operatorRaw": "validation",
    "formulaRaw": "[1451] + [1392]",
    "guidanceText": "El monto acogido al ISIF que debe declarar en el código 1942 del recuadro N°20, debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1451 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1392."
  },
  {
    "ruleId": "c.230",
    "targetFieldRaw": "[1933]",
    "operatorRaw": "validation",
    "formulaRaw": "[1200] + [1202]",
    "guidanceText": "El monto acogido al ISIF que debe declarar en el código 1933 del recuadro N°15, debe ser menor o igual al remanente ejercicio anterior o saldo inicial positivo registrado en el código 1200 y/o al aumento del ejercicio por reorganizaciones registrado en el código 1202."
  },
  {
    "ruleId": "c.231",
    "targetFieldRaw": "([1735] + [1737] + [1743] + [1745] + [1747])",
    "operatorRaw": "validation",
    "formulaRaw": "([1730] + [1934] + [1733] + 1741])",
    "guidanceText": "Los montos registrados en los códigos 1735, 1737, 1743, 1745, y 1747, deben ser menor o igual que los valores registrados en los códigos 1730, 1934, 1733, y 1741."
  },
  {
    "ruleId": "c.232",
    "targetFieldRaw": "([1935] + [1263] + [1264] + [1266] + [1267] + [1268])",
    "operatorRaw": "validation",
    "formulaRaw": "([1260] + [1262] + [1265])",
    "guidanceText": "Los montos registrados en los códigos 1935, 1263, 1264, 1266, 1267, y 1268, deben ser menor o igual que los valores registrados en los códigos 1260 + 1262 y 1265."
  },
  {
    "ruleId": "c.233",
    "targetFieldRaw": "([1315] + [1319] + [1320] + [1321] + [1322])",
    "operatorRaw": "validation",
    "formulaRaw": "([1313] + [1314] + [1316] + [1317] + [1318])",
    "guidanceText": "Los montos registrados en los códigos 1315, 1319, 1320], 1321, y 1322, deben ser menor o igual que los valores registrados en los códigos 1313, 1314, 1316, 1317, y 1318."
  },
  {
    "ruleId": "c.234",
    "targetFieldRaw": "([1940] + [1327] + [1330] + [1331] + [1332] + [1333])",
    "operatorRaw": "validation",
    "formulaRaw": "([1324] + [1326] + [1328] + [1329])",
    "guidanceText": "Los montos registrados en los códigos 1940, ,1327, 1330, 1331, 1332], y 1333, deben ser menor o igual que los valores registrados en los códigos 1324, 1326, 1328, y 1329."
  },
  {
    "ruleId": "c.235",
    "targetFieldRaw": "([1941] + [1338] + [1341] + [1342] + [1343] + [1344])",
    "operatorRaw": "validation",
    "formulaRaw": "([1335] + [1337] + [1339] + [1340])",
    "guidanceText": "Los montos registrados en los códigos 1941, 1338, 1341, 1342, 1343, y 1344, deben ser menor o igual que los valores registrados en los códigos 1335, 1337, 1339, 1340."
  },
  {
    "ruleId": "c.236",
    "targetFieldRaw": "([1348] + [1351] + [1352] + [1353] + [1354])",
    "operatorRaw": "validation",
    "formulaRaw": "([1346] + [1347] + [1349] + [1350])",
    "guidanceText": "Los montos registrados en los códigos 1348, 1351, 1352, 1353, y 1354, deben ser menor o igual que los valores registrados en los códigos 1346, 1347, 1349, y 1350."
  },
  {
    "ruleId": "c.237",
    "targetFieldRaw": "([1757] + [1759] + [1765] + [1767] + [1769])",
    "operatorRaw": "validation",
    "formulaRaw": "([1752] + [1943] + [1755] + [1763])",
    "guidanceText": "Los montos registrados en los códigos 1757, 1759, 1765, 1767, y 1769, deben ser menor o igual que los valores registrados en los códigos 1752, 1943, 1755, y 1763."
  },
  {
    "ruleId": "c.238",
    "targetFieldRaw": "([1944] + [1385] + [1386] + [1388] + [1389] + [1390])",
    "operatorRaw": "validation",
    "formulaRaw": "([1382] + [1384] + [1387])",
    "guidanceText": "Los montos registrados en los códigos 1944, 1385, 1386, 1388, 1389, y 1390, deben ser menor o igual que los valores registrados en los códigos 1382, 1384, y 1387."
  },
  {
    "ruleId": "c.239",
    "targetFieldRaw": "([1508] + [1535] + [1543] + [1553] + [1559])",
    "operatorRaw": "validation",
    "formulaRaw": "([1499] + [1439] + [1514] + [1519] + [1527])",
    "guidanceText": "Los montos registrados en los códigos 1508, 1535, 1543, 1553, y 1559, deben ser menor o igual que los valores registrados en los códigos 1499, 1439, 1514, 1519, y 1527."
  },
  {
    "ruleId": "c.240",
    "targetFieldRaw": "([1949] + [1509] + [1536] + [1544] + [1554] + [1560])",
    "operatorRaw": "validation",
    "formulaRaw": "([1501] + [1441] + [1520] + [1528])",
    "guidanceText": "Los montos registrados en los códigos 1949, 1509, 1536, 1544, 1554, y 1560, deben ser menor o igual que los valores registrados en los códigos 1501, 1441, 1520, y 1528."
  },
  {
    "ruleId": "c.241",
    "targetFieldRaw": "([1950] + [1510] + [1537] + [1547] + [1555] + [1561])",
    "operatorRaw": "validation",
    "formulaRaw": "([1502] + [1442] + [1521] + [1529])",
    "guidanceText": "Los montos registrados en los códigos 1950, 1510, 1537, 1547, 1555, y 1561, deben ser menor o igual que los valores registrados en los códigos 1502, 1442, 1521, y 1529."
  },
  {
    "ruleId": "c.242",
    "targetFieldRaw": "([1511] + [1538] + [1548] + [1556] + [1562])",
    "operatorRaw": "validation",
    "formulaRaw": "([1503] + [1443] + [1522] + [1530])",
    "guidanceText": "Los montos registrados en los códigos 1511, 1538, 1548, 1556, y 1562, deben ser menor o igual que los valores registrados en los códigos 1503, 1443, 1522, y 1530."
  },
  {
    "ruleId": "c.271",
    "targetFieldRaw": "[2000] + [2001] + [2002] + [2003]",
    "operatorRaw": "validation",
    "formulaRaw": "Si [748] > 0; entonces ([2004] * P651) + [748] + P390 Sino([2004] * P651) + P390",
    "guidanceText": "El valor registrado en los códigos 2000, 2001, 2002 y 2003 es superior al máximo establecido."
  },
  {
    "ruleId": "c.272",
    "targetFieldRaw": "[1639]",
    "operatorRaw": "validation",
    "formulaRaw": "Si (TIPO{[03]} = 1 .y. [1608] > 0 ); entonces ([1608] * ([157] / [170]))",
    "guidanceText": "Se debe registrar el crédito asociado al ingreso diferido que se impute en el año comercial 2024, el que no debe exceder de la cantidad que se determine al aplicar la tasa efectiva de IF del propietario sobre el ingreso diferido incrementado que le corresponde reconocer en dicho año comercial"
  },
  {
    "ruleId": "d.1",
    "targetFieldRaw": "[19] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([20] + [18]) > 0",
    "guidanceText": "Como ingresó datos en el código 19 debe ingresar datos en los códigos 18 o 20."
  },
  {
    "ruleId": "d.3",
    "targetFieldRaw": "[74] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[77] > 0",
    "guidanceText": "Como ingresó datos en el código 74 debe ingresar datos en el código 77."
  },
  {
    "ruleId": "d.5",
    "targetFieldRaw": "[754] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[753] > 0",
    "guidanceText": "Como ingresó datos en el código 754 debe ingresar datos en el código 753."
  },
  {
    "ruleId": "d.6",
    "targetFieldRaw": "[138] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[133] > 0 .y. [68] > 0",
    "guidanceText": "Si registra valor en el código 138, debe ingresar un valor en el código 133 y seleccionar el código 68."
  },
  {
    "ruleId": "d.7",
    "targetFieldRaw": "[76] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[32] > 0",
    "guidanceText": "Como ingresó datos en el código 76 debe ingresar datos en el código 32."
  },
  {
    "ruleId": "d.11",
    "targetFieldRaw": "[63] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[51] > 0",
    "guidanceText": "Como ingresó datos en el código 63 debe ingresar datos en el código 51."
  },
  {
    "ruleId": "d.12",
    "targetFieldRaw": "[51] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[63] + [71] > 0",
    "guidanceText": "Como ingresó datos en el código 51 debe ingresar datos en el código 63 o en el código 71."
  },
  {
    "ruleId": "d.13",
    "targetFieldRaw": "[71] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[51] > 0",
    "guidanceText": "Como ingresó datos en el código 71 debe ingresar datos en el código 51."
  },
  {
    "ruleId": "d.18",
    "targetFieldRaw": "[301] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[306] > 0 .y. [780] > 0",
    "guidanceText": "Como ingresó datos en el código 301 debe ingresar datos en el código 306 y en el código 780."
  },
  {
    "ruleId": "d.19",
    "targetFieldRaw": "[306] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[301] > 0 .y. [780] > 0",
    "guidanceText": "Como ingresó datos el en código 306 debe ingresar datos en el código 301 y en el código 780."
  },
  {
    "ruleId": "d.22",
    "targetFieldRaw": "[461] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[492] > 0",
    "guidanceText": "Como ingresó datos en el código 461 debe ingresar datos en el código 492."
  },
  {
    "ruleId": "d.23",
    "targetFieldRaw": "[492] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[461] > 0",
    "guidanceText": "Como ingresó datos en el código 492 debe ingresar datos en el código 461."
  },
  {
    "ruleId": "d.24",
    "targetFieldRaw": "[479] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[491] > 0",
    "guidanceText": "Como ingresó datos en el código 479 debe ingresar datos en el código 491."
  },
  {
    "ruleId": "d.25",
    "targetFieldRaw": "[491] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[479] > 0",
    "guidanceText": "Como ingresó datos en el código 491 debe ingresar datos en el código 479."
  },
  {
    "ruleId": "d.51",
    "targetFieldRaw": "TIPO{[03]} = 2, 3, 4, 5, 6, 7 o 8",
    "operatorRaw": "validation",
    "formulaRaw": "M11{ [903] } = 1",
    "guidanceText": "Debe ingresar un Rut válido en el código 903."
  },
  {
    "ruleId": "d.52",
    "targetFieldRaw": "TIPO{[03]} = 2, 3, 4, 5, 6, 7 o 8",
    "operatorRaw": "validation",
    "formulaRaw": "[01] > 0 .y. [02] = 0 .y. [05] = 0",
    "guidanceText": "Debe ingresar sólo razón social"
  },
  {
    "ruleId": "d.53",
    "targetFieldRaw": "TIPO{[03]} = 1",
    "operatorRaw": "validation",
    "formulaRaw": "{ [05] > 0 .y. ( [01] > 0 .o. [02] > 0 ) }",
    "guidanceText": "Debe indicar Nombre(s) y Apellidos (códigos 01,02 y 05)"
  },
  {
    "ruleId": "d.54",
    "targetFieldRaw": "[86] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "TIPO{[03]} =2, 3, 4, 5, 6, 7 o 8",
    "guidanceText": "En el código 86 no puede registrar saldo a disposición de los socios."
  },
  {
    "ruleId": "d.55",
    "targetFieldRaw": "[58] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "TIPO{[03]} = 1 o 4",
    "guidanceText": "No puede utilizar el crédito registrado en el código 58."
  },
  {
    "ruleId": "d.56",
    "targetFieldRaw": "TIPO{[03]} = 2, 3, 4, 5, 6, 7, 8",
    "operatorRaw": "validation",
    "formulaRaw": "[903] > 0",
    "guidanceText": "Debe ingresar el RUT del Representante Legal (código 903)"
  },
  {
    "ruleId": "d.64",
    "targetFieldRaw": "[765] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[161] > 0",
    "guidanceText": "Como ingresó datos en el código 765 debe ingresar datos en código 161."
  },
  {
    "ruleId": "d.65",
    "targetFieldRaw": "[780] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[306] > 0 .y. [301] > 0",
    "guidanceText": "Como ingresó datos en el código 780 debe ingresar datos en el código 306 y en el código 301."
  },
  {
    "ruleId": "d.66",
    "targetFieldRaw": "[133] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[68] > 0",
    "guidanceText": "Como ingresó datos en el código 133 debe marcar el código 68."
  },
  {
    "ruleId": "d.68",
    "targetFieldRaw": "[134] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[68] > 0",
    "guidanceText": "Como ingresó datos en el código 134 debe marcar el código 68."
  },
  {
    "ruleId": "d.69",
    "targetFieldRaw": "[825] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[824] > 0",
    "guidanceText": "Como ingresó datos en el código 825 debe ingresar datos en el código 824."
  },
  {
    "ruleId": "d.75",
    "targetFieldRaw": "[824] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[884] + [885] + [886] + [887] + [985] > 0",
    "guidanceText": "Señor contribuyente: Si Usted declaró el código [824] correspondiente a “Impuesto específico a la actividad minera (Art. 64 bis)”, deberá declarar los códigos [884], [885], [886] [887] y [985]"
  },
  {
    "ruleId": "d.77",
    "targetFieldRaw": "[780] = R",
    "operatorRaw": "validation",
    "formulaRaw": "[306] = CUERPORUT{[03]}",
    "guidanceText": "El Número de Cuenta Rut no coincide con su número de RUT."
  },
  {
    "ruleId": "d.78",
    "targetFieldRaw": "[895] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [152] + [1032] + [1891] + [1104] + [161] + [749] - [765]) < (P456 * P87)",
    "guidanceText": "Su renta anual excede las UF 792, por lo que no puede hacer uso del Crédito al IGC o IUSC por gastos en educación, según art. 55 ter LIR."
  },
  {
    "ruleId": "d.79",
    "targetFieldRaw": "[162] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[161] > 0",
    "guidanceText": "Como ingresó datos en el código 162 debe ingresar datos en el código 161."
  },
  {
    "ruleId": "d.88",
    "targetFieldRaw": "[1063] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1891] > 0.y. ([1099] + [1114]) > 0",
    "guidanceText": "Como ingresó datos en el código 1063 debe ingresar datos en los códigos 1891, 1099, 1114."
  },
  {
    "ruleId": "d.89",
    "targetFieldRaw": "[1036] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1098] > 0",
    "guidanceText": "Como ingresó datos en el código 1036 debe ingresar datos en el código 1098."
  },
  {
    "ruleId": "d.90",
    "targetFieldRaw": "[1101] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1061] > 0",
    "guidanceText": "Como ingresó datos en el código 1101 debe ingresar datos en el código 1061."
  },
  {
    "ruleId": "d.114",
    "targetFieldRaw": "[1101] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[157] > 0 .o. [1033] > 0",
    "guidanceText": "Como ingresó datos en el código 1101 debe ingresar datos en los códigos 157 o 1033."
  },
  {
    "ruleId": "d.116",
    "targetFieldRaw": "[1111] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([1109] + [1113]) > 0",
    "guidanceText": "Como ingresó datos en el código 1111 debe ingresar datos en los códigos 1109 o 1113."
  },
  {
    "ruleId": "d.119",
    "targetFieldRaw": "[1192] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "{atributo = M14A .y. ((([1324] + [1335]) > 0 .y. [1260] > 0).o. (([1326] + [1337]) > 0 .y. [1262] > 0) .o. ( ([1328] + [1339]) > 0))} .o. {atributo = 14D1 .y.((([1501] + [1502]) > 0 .y. [1382] > 0) .o. (([1441] + [1442]) > 0 .y. [1384] > 0) .o. (([1520] + [1521]) > 0)) }",
    "guidanceText": "Como ingreso valor en el código 1192 debe ingresar datos en los códigos 1324, 1335 del recuadro N° 16 y 1260 del recuadro N° R15 o 1326, 1337 del recuadro N° 16 y 1262 del recuadro N° 15 o 1328, 1339 del recuadro N°16 y, o 1501, 1502 del recuadro N°21 1382 recuadro N° 20 o 1441, 1442 del recuadro N°21 y 1384 del recuadro N°20 o 1520, 1521 del recuadro N°21."
  },
  {
    "ruleId": "d.120",
    "targetFieldRaw": "([1606] + [1600]) > (P92 * P87)",
    "operatorRaw": "validation",
    "formulaRaw": "[1581] > 0 .o. [1583] > 0",
    "guidanceText": "Debe declarar el código 1583, ya que sus ingresos son superirores a 50.000 UF"
  },
  {
    "ruleId": "d.122",
    "targetFieldRaw": "[1636] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[170] > P722 .y. ([104] + [105]) >0 .y. ([1592] + [1024] + [1594] + [1026]) > 0",
    "guidanceText": "Si declaró el código 1636, el código 170 debe ser mayor a 310 UTA , además de haber declarado en los códigos 104, 105, 1592, 1024, 1594 y 1026"
  },
  {
    "ruleId": "d.126",
    "targetFieldRaw": "[1184] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1358] > 0",
    "guidanceText": "Como ingresó datos en el código 1184 debe ingresar datos en el código 1358."
  },
  {
    "ruleId": "d.127",
    "targetFieldRaw": "[1362] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1359] > 0",
    "guidanceText": "Como ingresó datos en el código 1362 debe ingresar datos en el código 1359."
  },
  {
    "ruleId": "d.129",
    "targetFieldRaw": "[1641] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1640] > 0",
    "guidanceText": "Como ingresó datos en el código 1641 debe ingresar datos en el código1640."
  },
  {
    "ruleId": "d.134",
    "targetFieldRaw": "([1682] + [1683]) >0",
    "operatorRaw": "validation",
    "formulaRaw": "[1678] > 0",
    "guidanceText": "Como ingresó datos en los códigos 1682 y/o 1683 debe ingresar datos en el código 1678."
  },
  {
    "ruleId": "d.137",
    "targetFieldRaw": "[1638] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1632] > 0",
    "guidanceText": "Como ingresó datos en el código 1638 debe ingresar datos en el código 1632."
  },
  {
    "ruleId": "d.138",
    "targetFieldRaw": "[1065] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1043] > 0 .y. ([1099] + [1114]) > 0",
    "guidanceText": "Como ingresó datos en el código 1065 debe ingresar datos en los códigos 1043, 1099, 1114"
  },
  {
    "ruleId": "d.139",
    "targetFieldRaw": "[1653] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1639] > 0 .o. [76] > 0",
    "guidanceText": "Como ingresó datos en el código 1653 debe ingresar datos en el código 76, o en código 1639."
  },
  {
    "ruleId": "d.140",
    "targetFieldRaw": "[1064] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([1033] + [1032]) > 0 .y. [1061] > 0",
    "guidanceText": "Como ingresó datos en el código 1064 debe ingresar datos en los códigos 1033, 1032, 1061."
  },
  {
    "ruleId": "d.141",
    "targetFieldRaw": "([1074] + [1083] + [1131] - P04) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "TIPO{[03]} = 1 .y. [1033] > 0",
    "guidanceText": "Comoa ingresó datos en los códigos 1074, 1083, o 1131 debe ingresar datos en el código 1033."
  },
  {
    "ruleId": "d.142",
    "targetFieldRaw": "[830] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([828] + [138]) > 0 .y. SUBTIPO{[03]} = 112 .o. 113 .o. 411 .y. (Atributo = M14A .o. 14D1 .o. M14G)",
    "guidanceText": "Si registra valor en el código 830, debe ingresar un valor en el código 828 y/o en el código 138"
  },
  {
    "ruleId": "d.143",
    "targetFieldRaw": "[1102] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1043] > 0",
    "guidanceText": "Como ingresó datos en el código 1102 debe ingresar datos en el código 1043."
  },
  {
    "ruleId": "d.144",
    "targetFieldRaw": "[832] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Si Vx010659 = 1; entonces [767] >=​ 0 Sino [767] > 0",
    "guidanceText": "Como ingresó datos en el código 832 debe ingresar datos en el código 767."
  },
  {
    "ruleId": "d.145",
    "targetFieldRaw": "([1823] + [1824] + [1825] + [1826]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[616] > 0",
    "guidanceText": "Como ingresó datos en los códigos 1823, 1824, 1825 o 1826 debe seleccionar código 616 Asociacion o cuentas en participación"
  },
  {
    "ruleId": "d.146",
    "targetFieldRaw": "[1685] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([1657] + [1658] + [1660]) > 0",
    "guidanceText": "Como ingresó datos en el código 1685 debe ingresar datos en los códigos 1657, 1658 y/o 1660."
  },
  {
    "ruleId": "d.147",
    "targetFieldRaw": "[1686] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([1657] + [1660]) > 0",
    "guidanceText": "Como ingresó datos en código 1686 debe ingresar datos en código 1657 y/o 1660."
  },
  {
    "ruleId": "d.148",
    "targetFieldRaw": "[1183] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([1657] + [1660]) > 0",
    "guidanceText": "Como ingresó datos en código 1183 debe ingresar datos en código 1657 y/o 1660."
  },
  {
    "ruleId": "d.149",
    "targetFieldRaw": "[1688] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([1657] + [1658] + [1659] + [1660]) > 0",
    "guidanceText": "Como ingresó datos en código 1688 debe ingresar datos en código 1657, 1658, 1659 y/o 1660."
  },
  {
    "ruleId": "d.150",
    "targetFieldRaw": "([893] + [894]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[844] > 0",
    "guidanceText": "Como ingresó datos en el código 893 o en el código 894 del recuadro N° 14 debe ingresar datos en el código 844 del recuadro N° 13"
  },
  {
    "ruleId": "d.151",
    "targetFieldRaw": "[1429] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1401] > 0",
    "guidanceText": "Como ingresó datos en el código 1429 debe ingresar datos en el código 1401."
  },
  {
    "ruleId": "d.152",
    "targetFieldRaw": "([1375] + [1376]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1494] > 0",
    "guidanceText": "Como ingresó datos en el código 1375 o en el código 1376 del recuadro N° 19 debe ingresar datos en el código 1494 del recuadro N° 18"
  },
  {
    "ruleId": "d.153",
    "targetFieldRaw": "[1615] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1601] > 0",
    "guidanceText": "Como ingresó datos en código 1615 debe ingresar datos en código 1601"
  },
  {
    "ruleId": "d.154",
    "targetFieldRaw": "([741] + [742]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "(ABS{1440} + ABS{1690}) > 0",
    "guidanceText": "Si registra valor en el código 741 y/o en el código 742, debe registrar un valor en el código 1440 y/o en el código 1690, según corresponda su regimen de tributación."
  },
  {
    "ruleId": "d.155",
    "targetFieldRaw": "([815] + [390]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "(ABS{1440} + ABS{1690}) > 0",
    "guidanceText": "Si declara los códigos 815 y/o 390, debe declarar una una base imponible en el recuadro N°12 o N°17 según su regimen de tributación."
  },
  {
    "ruleId": "d.157",
    "targetFieldRaw": "([87] + [1795]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[780] > 0",
    "guidanceText": "Si declara el código 87 y/o 1795, debe completar el código 780"
  },
  {
    "ruleId": "d.158",
    "targetFieldRaw": "[1018] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "{[1104] + [1650] + [1030] + [856] + [748]} > 0",
    "guidanceText": "Si declara el código 1018, los códigos 1104, o 1650, o 1030, o 856, o 748 deben ser mayor que cero"
  },
  {
    "ruleId": "d.161",
    "targetFieldRaw": "[872] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[465] > 0",
    "guidanceText": "Como ingresó datos en código 872 debe ingresar datos en código 465"
  },
  {
    "ruleId": "d.162",
    "targetFieldRaw": "([884] + [885]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[886] > 0",
    "guidanceText": "Como ingresó datos en los códigos 884 y 885 debe ingresar datos en código 886."
  },
  {
    "ruleId": "d.163",
    "targetFieldRaw": "[1782] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[938] > 0",
    "guidanceText": "Como ingresó datos en código 1782 debe ingresar datos en código 938"
  },
  {
    "ruleId": "d.164",
    "targetFieldRaw": "[1910] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[34] > 0",
    "guidanceText": "Si declara el código 1910, el código 34 debe ser mayor que cero"
  },
  {
    "ruleId": "d.166",
    "targetFieldRaw": "[1908] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Si TIPO{[03]} = 1 .y.([187] + [1037] + [18] + [1109])< P01; entonces ([189] + [1039] + [20] + [1113])= 0 Sino([187] + [1037] + ABS{[1440]} + ABS{[1690]} + ABS{[1630]})> 0",
    "guidanceText": "Si declara el código 1908, debe ingresar un valor en los códigos 187, 1037, 1440, 1690, o 1630. Si es empresario individual la suma de los códigos 18, 187, 1037, y 1109 debe ser mayor a 1 UTA."
  },
  {
    "ruleId": "d.167",
    "targetFieldRaw": "[746] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([104] + [105] + [955] + [152] + [1104]) > 0",
    "guidanceText": "Si declara el código 746, los códigos 104, 105, 955, 152 o 1104 deben ser mayor que cero."
  },
  {
    "ruleId": "d.168",
    "targetFieldRaw": "[166] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "([108] + [1849] + [1852] + [110]) > 0",
    "guidanceText": "Si declara el código 166, los códigos 108, 1849, 1852, o 110 deben ser mayor que cero."
  },
  {
    "ruleId": "d.169",
    "targetFieldRaw": "VX010017 > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[21] > 0",
    "guidanceText": "Como declaró el código 70 en el Formulario 29 en uno o más periodos del año comercial 2023, en el código 21 debe declarar el Impuesto único talleres artesanales"
  },
  {
    "ruleId": "d.170",
    "targetFieldRaw": "[856] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1650] > 0",
    "guidanceText": "Como declaró incremento por impuestos soportados en el extranjero en el código 856 del recuadro N° 1, debe declarar honorarios líquidos percibidos de fuente extranjera en el código 1650 del mismo recuadro N° 1."
  },
  {
    "ruleId": "d.171",
    "targetFieldRaw": "[1925] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1924] > 0",
    "guidanceText": "Si registra valor en el código 1925, debe ingresar un valor en el código 1924."
  },
  {
    "ruleId": "d.172",
    "targetFieldRaw": "([1989] + [1990]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1891] > 0",
    "guidanceText": "Si registra valor en el código 1989 y/o en el código 1990, debe ingresar un valor en el código 1891."
  },
  {
    "ruleId": "d.173",
    "targetFieldRaw": "[1965] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1959] > 0",
    "guidanceText": "Si registra valor en el código 1965, debe ingresar un valor en el código 1959."
  },
  {
    "ruleId": "d.174",
    "targetFieldRaw": "([938] + [949]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[940] > 0 .y, [647] > 0",
    "guidanceText": "Si registra valor en el código 938 del recuadro N° 10, debe ingresar un valor en el código 940 del recuadro N°10 y valor en el código 959 del recuadro N°6."
  },
  {
    "ruleId": "d.175",
    "targetFieldRaw": "[1971] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1967] > 0",
    "guidanceText": "Si declara margen operacional minero registrado en el código 1971, debe declarar un valor positivo en el código 1967"
  },
  {
    "ruleId": "d.176",
    "targetFieldRaw": "([1657] + [1658] + [1659] + [1660] + [1661] + [1662] + [1140] + [1663] + [1664] + [1665] + [1666] + [1667] + [1668] + [1141] + [1142] + [1669] + [1670] + [1671] + [1672] + [1673] + [1674] + [1144] + [1675] + [1175] + [1676] + [1677] + [1678] + [1150] + [1147] + [1148] + [1149] + [1151] + [1991] + [1152] + [1176] + [1679] + [1680] + [1681] + [1974] + [1975] + [1682] + [1683] + [1684] + [1685] + [1686] + [1183] + [1687] + [1688] + [1689] + [1154] + [1157]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. M14G .o. TIPO{[03]} = 5, 6, 7",
    "guidanceText": "El recuadro N° 12 debe ser declarado por contribuyentes acogidos al regimen 14 letra A), o 14 letra G), ambos del artículo 14 de la LIR."
  },
  {
    "ruleId": "d.177",
    "targetFieldRaw": "([1400] + [1817] + [1401] + [1402] + [1403] + [1587] + [1588] + [1405] + [1410] + [1406] + [1407] + [1408] + [1409] + [1818] + [1429] + [1411] + [1412] + [1413] + [1415] + [1416] + [1417] + [1418] + [1419] + [1421] + [1422] + [1423] + [1424] + [1425] + [1426] + [1427] + [1428] + [1431] + [1432] + [1433])> 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14D1 .o. TIPO{[03]} = 5, 6, 7",
    "guidanceText": "El recuadro N° 17 debe ser declarado por contribuyentes acogidos al regimen del N° 3 de la letra D) del artículo 14 de la LIR."
  },
  {
    "ruleId": "d.178",
    "targetFieldRaw": "([1600] + [1819] + [1601] + [1602] + [1603] + [1604] + [1605] + [1606] + [1607] + [1608] + [1609] + [1611] + [1612] + [1613] + [1614] + [1820] + [1615] + [1616] + [1617] + [1618] + [1620] + [1621] + [1622] + [1624] + [1625] + [1626] + [1627] + [1628] + [1909]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT",
    "guidanceText": "El recuadro N° 22 debe ser declarado por contribuyentes acogidos al regimen del N°8 de la letra D) del artículo 14 de la LIR."
  },
  {
    "ruleId": "d.180",
    "targetFieldRaw": "([1200] + [1933] + [1202] + [1203] + [1204] + [1205] + [1206] + [1207] + [1208] + [1209] + [1211] + [1212] + [1213] + [1214] + [1215] + [1216] + [1217] + [1218] + [1219] + [1221] + [1222] + [1224] + [1225] + [1226] + [1228] + [1229] + [1230] + [1231] + [1730] + [1934] + [1733] + [1735] + [1737] + [1741] + [1743] + [1745] + [1747] + [1731] + [1843] + [1734] + [1736] + [1738] + [1740] + [1742] + [1744] + [1746] + [1748] + [1234] + [1235] + [1236] + [1237] + [1238] + [1239] + [1240] + [1241] + [1242] + [1243] + [1246] + [1247] + [1248] + [1249] + [1250] + [1251] + [1252] + [1253] + [1254] + [1255] + [1260] + [1935] + [1262] + [1263] + [1264] + [1265] + [1266] + [1267] + [1268]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A",
    "guidanceText": "El recuadro N° 15 debe ser declarado por contribuyentes acogidos al regimen 14 letra Adel artículo 14 de la LIR."
  },
  {
    "ruleId": "d.181",
    "targetFieldRaw": "([1270] + [1821] + [1936] + [1271] + [1272] + [1273] + [1274] + [1275] + [1276] + [1277] + [1279] + [1822] + [1937] + [1280] + [1281] + [1282] + [1283] + [1283] + [1284] + [1285] + [1286] + [1288] + [1289] + [1938] + [1290] + [1291] + [1292] + [1293] + [1294] + [1295] + [1296] + [1297] + [1298] + [1301] + [1302] + [1939] + [1303] + [1304] + [1305] + [1306] + [1307] + [1308] + [1309] + [1310] + [1311] + [1313] + [1314] + [1315] + [1316] + [1317] + [1318] + [1319] + [1320] + [1321] + [1322] + [1324] + [1940] + [1326] + [1327] + [1328] + [1329] + [1330] + [1331] + [1332] + [1333] + [1335] + [1941] + [1337] + [1338] + [1339] + [1340] + [1341] + [1342] + [1343] + [1344] + [1346] + [1347] + [1348] + [1349] + [1350] + [1351] + [1352] + [1353] + [1354]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A",
    "guidanceText": "El recuadro N° 16 debe ser declarado por contribuyentes acogidos al regimen 14 letra Adel artículo 14 de la LIR."
  },
  {
    "ruleId": "d.182",
    "targetFieldRaw": "([1145] + [1146] + [1177] + [893] + [894] + [1694] + [1695] + [1696] + [1178] + [1179] + [1180] + [1182] + [1697] + [1186] + [1187] + [1700] + [1188] + [1701] + [1702] + [1189] + [1190]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A",
    "guidanceText": "El recuadro N° 14 debe ser declarado por contribuyentes acogidos al regimen 14 letra Adel artículo 14 de la LIR."
  },
  {
    "ruleId": "d.183",
    "targetFieldRaw": "([1451] + [1942] + [1392] + [1396] + [1459] + [1463] + [1467] + [1471] + [1475] + [1480] + [1452] + [1589] + [1393] + [1397] + [1460] + [1468] + [1472] + [1476] + [1481] + [1752] + [1943] + [1755] + [1757] + [1759] + [1763] + [1765] + [1767] + [1769] + [1753] + [1845] + [1756] + [1758] + [1760] + [1762] + [1764] + [1766] + [1768] + [1770] + [1453] + [1455] + [1394] + [1398] + [1461] + [1465] + [1469] + [1473] + [1477] + [1482} + [1454] + [1456] + [1395] + [1399] + [1462] + [1466] + [1470] + [1474] + [1478] + [1483] + [1382] + [1944] + [1384] + [1385] + [1386] + [1387] + [1388] + [1389] + [1390]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14D1",
    "guidanceText": "El recuadro N° 20 debe ser declarado por contribuyentes acogidos al regimen del N° 3 de la letra D) del artículo 14 de la LIR."
  },
  {
    "ruleId": "d.184",
    "targetFieldRaw": "([1495] + [1655] + [1945] + [1590] + [1444] + [1512] + [1515] + [1523] + [1531] + [1539] + [1549] + [1557] + [1496] + [1656] + [1946] + [1436] + [1447] + [1513] + [1516] + [1524] + [1532] + [1540] + [1550] + [1558] + [1497] + [1504] + [1947] + [1437] + [1448] + [1517] + [1525] + [1533] + [1541] + [1551] + [1498] + [1505] + [1948] + [1438] + [1449] + [1518] + [1526] + [1534] + [1542] + [1552] + [1499] + [1439] + [1508] + [1514] + [1519] + [1527] + [1535] + [1543] + [1553] + [1559] + [1501] + [1949] + [1441] + [1509] + [1520] + [1528] + [1536] + [1544] + [1554] + [1560] + [1502] + [1950] + [1442] + [1510] + [1521] + [1529] + [1537] + [1547] + [1555] + [1561] + [1503] + [1443] + [1511] + [1522] + [1530] + [1538] + [1548] + [1556] + [1562]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14D1",
    "guidanceText": "El recuadro N° 21 debe ser declarado por contribuyentes acogidos al regimen del N° 3 de la letra D) del artículo 14 de la LIR."
  },
  {
    "ruleId": "d.185",
    "targetFieldRaw": "([1445] + [1446] + [1374] + [1375] + [1376] + [1705] + [1706] + [1707] + [1377] + [1378] + [1726] + [1479] + [1708] + [1709] + [1379] + [1710] + [1711] + [1380] + [1381]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14D1",
    "guidanceText": "El recuadro N° 19 debe ser declarado por contribuyentes acogidos al regimen del N° 3 de la letra D) del artículo 14 de la LIR."
  },
  {
    "ruleId": "d.186",
    "targetFieldRaw": "([1580] + [1582] + [1573] + [1574] + [1575] + [1712] + [1713] + [1714] + [1576] + [1715] + [1577] + [1716] + [1578] + [1584] + [1585]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT",
    "guidanceText": "El recuadro N° 23 debe ser declarado por contribuyentes acogidos al regimen del N°8 de la letra D) del artículo 14 de la LIR."
  },
  {
    "ruleId": "d.187",
    "targetFieldRaw": "([994] + [986] + [987] + [988] + [792] + [772] + [873] + [1120] + [1838] + [1775] + [1911] + [1992]) > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = M14A .o. M14G; entonces [1665] + [1677] + [1687] > 0 Sino [1428] > 0",
    "guidanceText": "Si declara el código 994, 986 987, 988, 792, 772, 873, 1120, 1838, 1775, 1911, y/o 1992 en el recuadro N°8, los códigos 1665, 1677, y/o 1687 del recuadro N° 12 deben ser mayor que cero."
  },
  {
    "ruleId": "e.1",
    "targetFieldRaw": "[21] > 0 .y. [104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [152] + [1032] + [1891] + [1104] + [161] + [159] + [748] + [749] + [166] + [907] + [169] + [1833] + [158] + [111] + [740] + [750] + [751] + [822] + [765] + [170] + [157] + [1017] + [1033] + [201] + [1035] + [910] + [1036] + [1101] + [135] + [136] + [176] + [607] + [752] + [608] + [1636] + [1637] + [1638] + [895] + [867] + [609] + [1639] + [1018] + [162] + [174] + [610] + [746] + [866] + POS{[304]} + [31] + [18] + [19] + [20] + [187] + [188] + [189] + [1109] + [1111] + [1113] + [1640] + [1641] + [1642] + [77] + [74] + [79] + [113] + [1007] + [114] + [908] + [909] + [951] + [952] + [753] + [754] + [755] + [133] + [138] + [134] + [32] + [76] + [34] + [119] + [1037] + [1038] + [1039] + [1040] + [1041] + [1042] + [1043] + [1102] + [1044] + [1051] + [1052] + [1053] = 0",
    "operatorRaw": "validation",
    "formulaRaw": "[87] = 0",
    "guidanceText": "Según los datos ingresados, Ud. No puede solicitar devolución en código 87"
  },
  {
    "ruleId": "e.2",
    "targetFieldRaw": "TIPO{[03]} = 2, 3, 5, 6, 7, 8",
    "operatorRaw": "validation",
    "formulaRaw": "[104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [152] + [1032] + [1891] + [1104] + [161] + [159] + [748] + [749] + [166] + [907] + [169] + [111] + [750] + [740] + [751] + [822] + [765] + [1017] + [1033] + [201] + [1035] + [910] + [135] + [136] + [176] + [607] + [752] + [608] + [895] + [867] + [609] + [162] + [174] + [610] + [746] + [866] + [43] + [767] + [54] + [832] + [119] + [116] + [757] + [900] + [1036] + [1101] + [1018] + [1636] + [1637] + [1638] + [1639] = 0",
    "guidanceText": "No debe ingresar códigos en Base Imponible Global Complementario o Adicional"
  },
  {
    "ruleId": "e.3",
    "targetFieldRaw": "[58] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[86] = 0",
    "guidanceText": "No puede hacer uso de crédito puesto a su disposición en el código 58 por registrar saldo a disposición de los socios en el código 86."
  },
  {
    "ruleId": "e.5",
    "targetFieldRaw": "[86] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[58] = 0",
    "guidanceText": "No puede registrar saldo a disposición de los socios en el código 86 dado que dispone de crédito puesto a su disposición registrado en el código 58."
  },
  {
    "ruleId": "e.6",
    "targetFieldRaw": "[465] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[494] = 0 .y. [547] > 0",
    "guidanceText": "Debe registrar monto sólo en código 465 o sólo en código 494, cuando el código 547 sea mayor a cero"
  },
  {
    "ruleId": "e.7",
    "targetFieldRaw": "[494] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[465] = 0",
    "guidanceText": "Debe registrar monto sólo en código 465 o sólo en código 494"
  },
  {
    "ruleId": "e.8",
    "targetFieldRaw": "[494] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "TIPO{[03]} = 1",
    "guidanceText": "Para descontar gastos presuntos (cód. 494) usted debe ser Persona Natural"
  },
  {
    "ruleId": "e.12",
    "targetFieldRaw": "[750] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[740] = 0",
    "guidanceText": "Usted sólo puede optar a un beneficio tributario. “Infórmese en el menú Renta, opción “Información, ayuda y otras aplicaciones, Beneficio tributario para personas con créditos con garantía hipotecaria””"
  },
  {
    "ruleId": "e.13",
    "targetFieldRaw": "[740] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[750] = 0",
    "guidanceText": "Usted sólo puede optar a un beneficio tributario. “Infórmese en el menú Renta, opción “Información, ayuda y otras aplicaciones, Beneficio tributario para personas con créditos con garantía hipotecaria””"
  },
  {
    "ruleId": "e.16",
    "targetFieldRaw": "[805] = X",
    "operatorRaw": "validation",
    "formulaRaw": "[813] = 0",
    "guidanceText": "Si marca en el código 805 (Agricultor Contabilidad Simplificada D.S. N°3344/2004), no puede marcar el código 813 (Retiro)."
  },
  {
    "ruleId": "e.17",
    "targetFieldRaw": "[813] = X",
    "operatorRaw": "validation",
    "formulaRaw": "[805] = 0",
    "guidanceText": "Si marca en el código 813 (Retiro) no puede marcar el código 805 (Agricultor Contabilidad Simplificada D.S. N°3344/2004)."
  },
  {
    "ruleId": "e.21",
    "targetFieldRaw": "[87] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[823] = 0",
    "guidanceText": "Si solicita devolución en el código 87, el código 823 debe ser cero."
  },
  {
    "ruleId": "e.25",
    "targetFieldRaw": "[85] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[90] = 0",
    "guidanceText": "Si solicita devolución en el código [85] no puede registrar Impuesto adeudado en el código [90]."
  },
  {
    "ruleId": "e.26",
    "targetFieldRaw": "[90] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[85] = 0",
    "guidanceText": "Si registra Impuesto adeudado en el código 90 no puede solicitar devolución en el código 85."
  },
  {
    "ruleId": "e.38",
    "targetFieldRaw": "Si existe [87] > 0 en el F22",
    "operatorRaw": "validation",
    "formulaRaw": "[98] = 0",
    "guidanceText": "Si solicita devolución en el código [87] no puede registrar Monto efectivo a pagar, al declarar en el código [98]."
  },
  {
    "ruleId": "e.40",
    "targetFieldRaw": "[750] = 0",
    "operatorRaw": "validation",
    "formulaRaw": "j=[104] + [105] + [106] + [108] + [110] + [155] + [748] + [955]---m=Si j = 0; entonces [161] - [765] Sino Si j > 0; entonces j + [152] + [159] + [161] - [765] Sino 0---m > P80",
    "guidanceText": "Según las rentas ingresadas, no le corresponde rebaja por intereses pagados por crédito con garantía hipotecaria, según Art.55 bis"
  },
  {
    "ruleId": "e.44",
    "targetFieldRaw": "[104] + [105] + [106] + [108] + [955] + [1632] + [110] + [155] + [1032] + [1104] = 0 .y. [161] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[135] + [136] + [176] + [752] + [608] + [1636] + [1637] + [1638] + [609] + [746] + [866] = 0",
    "guidanceText": "Usted no puede registrar montos en los códigos de créditos al Global Complementario."
  },
  {
    "ruleId": "e.54",
    "targetFieldRaw": "[1698] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1717] = 0",
    "guidanceText": "Sólo puedes declarar código de capital propio positivo, no ambos. Recuadro N°13"
  },
  {
    "ruleId": "e.55",
    "targetFieldRaw": "[1717] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1698] = 0",
    "guidanceText": "Sólo puedes declarar el código de capital propio negativo, no ambos. Recuadro N°13"
  },
  {
    "ruleId": "e.56",
    "targetFieldRaw": "[1145] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1146] = 0",
    "guidanceText": "Sólo puedes declarar código de capital propio positivo, no ambos."
  },
  {
    "ruleId": "e.57",
    "targetFieldRaw": "[1146] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1145] = 0",
    "guidanceText": "Sólo puedes declarar el código de capital propio negativo, no ambos"
  },
  {
    "ruleId": "e.58",
    "targetFieldRaw": "[645] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[646] = 0",
    "guidanceText": "Sólo puedes declarar el código de capital propio positivo, no ambos"
  },
  {
    "ruleId": "e.59",
    "targetFieldRaw": "[646] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[645] = 0",
    "guidanceText": "Sólo puedes declarar el código de capital propio negativo, no ambos"
  },
  {
    "ruleId": "e.76",
    "targetFieldRaw": "[1445] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1446] + [1374] = 0",
    "guidanceText": "Sólo puedes declarar el capital propio inicial positivo, no capital propio inicial ni capital propio negativo. Recuadro N°19"
  },
  {
    "ruleId": "e.77",
    "targetFieldRaw": "[1446] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1445] + [1374] = 0",
    "guidanceText": "Sólo puedes declarar el capital propio inicial negativo, no capital propio inicial ni capital propio positivo. Recuadro N°19"
  },
  {
    "ruleId": "e.78",
    "targetFieldRaw": "[1374] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1445] + [1446] = 0",
    "guidanceText": "Sólo puedes declarar el capital inicial, no capital propio inicial positivo o negativo. Recuadro N°19"
  },
  {
    "ruleId": "e.83",
    "targetFieldRaw": "[1193] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo !=​ 14TT; ([1210] + [1220] + [1232] + [1749] + [1750] + [1244] + [1256] + [1484] + [1485] + [1486] + [1487] + [1771] + [1772]) = 0 Sino 0",
    "guidanceText": "Como ingreso valor en el código 1193 en el recuadro N°6, los códigos 1210, 1220, 1232, 1749, 1750, 1224, 1256 del recuadro N° 15 y los códigos 1484, 1485, 1486, 1487, 1771, 1772 del recuadro N° 20 deben ser cero."
  },
  {
    "ruleId": "e.86",
    "targetFieldRaw": "[1580] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1582 ] + [ 1573] = 0",
    "guidanceText": "Solo puedes declarar el capital propio positivo, no el negativo ni el inicial. Recuadro N°23"
  },
  {
    "ruleId": "e.87",
    "targetFieldRaw": "[1582] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1580 ] + [ 1573] = 0",
    "guidanceText": "Solo puedes declarar el capital propio negativo, no el positivo ni el inicial. Recuadro N°23"
  },
  {
    "ruleId": "e.88",
    "targetFieldRaw": "[1573] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1580 ] + [ 1582] = 0",
    "guidanceText": "Solo puedes declarar el capital inicial, no e capital propio positivo ni negativo. Recuadro N°23"
  },
  {
    "ruleId": "e.116",
    "targetFieldRaw": "[1221] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1222] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1221 del recuadro N°15."
  },
  {
    "ruleId": "e.117",
    "targetFieldRaw": "[1222] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1221] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1222 del recuadro N°15."
  },
  {
    "ruleId": "e.119",
    "targetFieldRaw": "[1234] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1235] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1234 del recuadro N°15."
  },
  {
    "ruleId": "e.120",
    "targetFieldRaw": "[1235] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1234] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1235 del recuadro N°15."
  },
  {
    "ruleId": "e.121",
    "targetFieldRaw": "[1246] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1247] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1246 del recuadro N°15."
  },
  {
    "ruleId": "e.122",
    "targetFieldRaw": "[1247] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1246] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1247 del recuadro N°15."
  },
  {
    "ruleId": "e.123",
    "targetFieldRaw": "[1270] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1821] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1270 del recuadro N°16."
  },
  {
    "ruleId": "e.124",
    "targetFieldRaw": "[1821] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1270] > 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1821 del recuadro N°16."
  },
  {
    "ruleId": "e.125",
    "targetFieldRaw": "[1279] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1822] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1279 del recuadro N°16."
  },
  {
    "ruleId": "e.126",
    "targetFieldRaw": "[1822] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1279] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1822 del recuadro N°16."
  },
  {
    "ruleId": "e.127",
    "targetFieldRaw": "[1288] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1289] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1288 del recuadro N°16."
  },
  {
    "ruleId": "e.128",
    "targetFieldRaw": "[1289] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1288] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1289 del recuadro N°16."
  },
  {
    "ruleId": "e.129",
    "targetFieldRaw": "[1301] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1302] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1301 del recuadro N°16."
  },
  {
    "ruleId": "e.130",
    "targetFieldRaw": "[1302] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1301] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1302 del recuadro N°16."
  },
  {
    "ruleId": "e.131",
    "targetFieldRaw": "[1452] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1589] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1452 del recuadro N°20."
  },
  {
    "ruleId": "e.132",
    "targetFieldRaw": "[1589] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1452] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1589 del recuadro N°20."
  },
  {
    "ruleId": "e.134",
    "targetFieldRaw": "[1453] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1455] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1453 del recuadro N°20."
  },
  {
    "ruleId": "e.135",
    "targetFieldRaw": "[1455] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1453] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1455 del recuadro N°20."
  },
  {
    "ruleId": "e.136",
    "targetFieldRaw": "[1454] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1456] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1454 del recuadro N°20."
  },
  {
    "ruleId": "e.137",
    "targetFieldRaw": "[1456] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1454] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1456 del recuadro N°20."
  },
  {
    "ruleId": "e.138",
    "targetFieldRaw": "[1495] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1655] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1495 del recuadro N°21."
  },
  {
    "ruleId": "e.139",
    "targetFieldRaw": "[1655] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1495] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1655 del recuadro N°21."
  },
  {
    "ruleId": "e.140",
    "targetFieldRaw": "[1496] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1656] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1496 del recuadro N°21."
  },
  {
    "ruleId": "e.141",
    "targetFieldRaw": "[1656] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1496] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1656 del recuadro N°21."
  },
  {
    "ruleId": "e.142",
    "targetFieldRaw": "[1497] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1504] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1497 del recuadro N°21."
  },
  {
    "ruleId": "e.143",
    "targetFieldRaw": "[1504] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1497] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1504 del recuadro N°21."
  },
  {
    "ruleId": "e.144",
    "targetFieldRaw": "[1498] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1505] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior positivo código 1498 del recuadro N°21."
  },
  {
    "ruleId": "e.145",
    "targetFieldRaw": "[1505] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1498] = 0",
    "guidanceText": "Solo puedes declarar el remanente del ejercicio anterior negativo código 1505 del recuadro N°21."
  },
  {
    "ruleId": "e.146",
    "targetFieldRaw": "[91] + [87] + [1795] = 0",
    "operatorRaw": "validation",
    "formulaRaw": "[780] = sin tipo de cuenta",
    "guidanceText": "Solo puedes declarar datos institucion bancaria Si tienes devolución"
  },
  {
    "ruleId": "e.147",
    "targetFieldRaw": "[91] > 0 .y. {([87] + [1795]) = 0}",
    "operatorRaw": "validation",
    "formulaRaw": "[780] = sin tipo de cuenta",
    "guidanceText": "Solo puedes declarar datos institucion bancaria Si tienes devolución"
  },
  {
    "ruleId": "e.154",
    "targetFieldRaw": "[1408] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1426] = 0",
    "guidanceText": "Si declara el código 1408 no puede declarar el código 1426, ambos del recuadro N°17"
  },
  {
    "ruleId": "e.155",
    "targetFieldRaw": "[1426] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1408] = 0",
    "guidanceText": "Si declara el código 1426 no puede declarar el código 1408, ambos del recuadro N°17"
  },
  {
    "ruleId": "e.156",
    "targetFieldRaw": "[43] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[32] = 0",
    "guidanceText": "Si declara el código 43 no puede declarar el código 32"
  },
  {
    "ruleId": "e.157",
    "targetFieldRaw": "[1753] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1845] = 0",
    "guidanceText": "Si registra valor en el código 1753, entonces el código 1845 debe ser cero."
  },
  {
    "ruleId": "e.158",
    "targetFieldRaw": "[1845] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "[1753] = 0",
    "guidanceText": "Si registra valor en el código 1845, entonces el código 1753 debe ser cero."
  },
  {
    "ruleId": "e.159",
    "targetFieldRaw": "[1194] > 0",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo !=​ 14TT; ([1210] + [1220] + [1232] + [1749] + [1750] + [1244] + [1256] + [1484] + [1485] + [1486] + [1487] + [1771] + [1772]) = 0 Sino 0",
    "guidanceText": "Como ingreso valor en el código 1194 en el recuadro N°6, los códigos 1210, 1220, 1232, 1749, 1750, 1224, 1256 del recuadro N° 15 y los códigos 1484, 1485, 1486, 1487, 1771, 1772 del recuadro N° 20 deben ser cero."
  },
  {
    "ruleId": "f.1",
    "targetFieldRaw": "si$[03]",
    "operatorRaw": "validation",
    "formulaRaw": "TIPO{[03]} = 1, 2, 3, 4, 5, 6, 7, 8",
    "guidanceText": "El RUT registrado en el código 03 es inconsistente."
  },
  {
    "ruleId": "f.2",
    "targetFieldRaw": "si$[903]",
    "operatorRaw": "validation",
    "formulaRaw": "[903] <= 46999999 .o. (48000000 <= [903] .y. [903] <= 49999999) .y. M11{[903]} = 1",
    "guidanceText": "El RUT del representante legal (código 903) debe ser persona natural"
  },
  {
    "ruleId": "f.3",
    "targetFieldRaw": "si$[650]",
    "operatorRaw": "validation",
    "formulaRaw": "M11{[650]} = 1",
    "guidanceText": "Debe ingresar un Rut válido en el código 650"
  },
  {
    "ruleId": "f.4",
    "targetFieldRaw": "si$[08]",
    "operatorRaw": "validation",
    "formulaRaw": "[08] > 0",
    "guidanceText": "Comuna (código 08) ingresada es incorrecta"
  },
  {
    "ruleId": "f.8",
    "targetFieldRaw": "si$[301]",
    "operatorRaw": "validation",
    "formulaRaw": "[301]ÎTabla de Bancos",
    "guidanceText": "El nombre de la institución bancaria es incorrecto"
  },
  {
    "ruleId": "f.13",
    "targetFieldRaw": "si$[616]",
    "operatorRaw": "validation",
    "formulaRaw": "[616] != 0",
    "guidanceText": "En el código 616 debe marcar con una “X”"
  },
  {
    "ruleId": "f.15",
    "targetFieldRaw": "si$[95]",
    "operatorRaw": "validation",
    "formulaRaw": "[95] != 0",
    "guidanceText": "En el código 95 debe marcar con una “X”"
  },
  {
    "ruleId": "f.16",
    "targetFieldRaw": "si$[68]",
    "operatorRaw": "validation",
    "formulaRaw": "[68] != 0",
    "guidanceText": "En el código 68 debe marcar con una “X”"
  },
  {
    "ruleId": "f.17",
    "targetFieldRaw": "si$[72]",
    "operatorRaw": "validation",
    "formulaRaw": "[72] != 0",
    "guidanceText": "En el código 72 debe marcar con una “X”"
  },
  {
    "ruleId": "f.18",
    "targetFieldRaw": "si$[69]",
    "operatorRaw": "validation",
    "formulaRaw": "[69] != 0",
    "guidanceText": "En el código 69 debe marcar con una “X”"
  },
  {
    "ruleId": "f.19",
    "targetFieldRaw": "si$[73]",
    "operatorRaw": "validation",
    "formulaRaw": "[73] != 0",
    "guidanceText": "En el código 73 debe marcar con una “X”"
  },
  {
    "ruleId": "f.22",
    "targetFieldRaw": "si$[301]",
    "operatorRaw": "validation",
    "formulaRaw": "[780] > 0",
    "guidanceText": "Como ingresó datos en el código 301 debe ingresar datos en el código 780."
  },
  {
    "ruleId": "f.23",
    "targetFieldRaw": "si$[306]",
    "operatorRaw": "validation",
    "formulaRaw": "[780] > 0",
    "guidanceText": "Como ingresó datos en el código 306 debe ingresar datos en el código 780."
  },
  {
    "ruleId": "f.25",
    "targetFieldRaw": "si$[780]",
    "operatorRaw": "validation",
    "formulaRaw": "[780] = C .o. V .o. A .o. S .o. R",
    "guidanceText": "Debe marcar con una “X” el tipo de cuenta."
  },
  {
    "ruleId": "f.26",
    "targetFieldRaw": "si$[786]",
    "operatorRaw": "validation",
    "formulaRaw": "[786] != 0",
    "guidanceText": "En el código 786 debe marcar con una “X”"
  },
  {
    "ruleId": "f.30",
    "targetFieldRaw": "si$[805]",
    "operatorRaw": "validation",
    "formulaRaw": "[805] != 0",
    "guidanceText": "En el código 805 debe marcar con una “X”"
  },
  {
    "ruleId": "f.31",
    "targetFieldRaw": "si$[813]",
    "operatorRaw": "validation",
    "formulaRaw": "[813] != 0",
    "guidanceText": "En el código 813 debe marcar con una “X”"
  },
  {
    "ruleId": "f.32",
    "targetFieldRaw": "si$[159]",
    "operatorRaw": "validation",
    "formulaRaw": "[1592] + [1024] + [1025] + [1026] + [1027] + [606] + [1105] + [1592] + [1593] + [1594] + [1595] + [1633] + [1634] > 0",
    "guidanceText": "Si ingresó un monto en el código 159 debe haber ingresado valor en alguno de los siguientes códigos: 1024, 1025, 1026, 1027, 606, 1105, 1592, 1593, 1594, 1595, 1633, 1634."
  },
  {
    "ruleId": "f.33",
    "targetFieldRaw": "si$[306]",
    "operatorRaw": "validation",
    "formulaRaw": "[306 ] debe tener largo <= 15",
    "guidanceText": "El número de cuenta ingresado excede el largo máximo permitido."
  },
  {
    "ruleId": "f.35",
    "targetFieldRaw": "si$[828]",
    "operatorRaw": "validation",
    "formulaRaw": "[828] > 0 .y. (SUBTIPO{[03]} = 112 .o. 113 .o. 411) .y. (Atributo = M14A .o. 14D1 .o. M14G)",
    "guidanceText": "Si registra valor en el código 828, debe tener un regimen de tributación 14A, propyme general, o 14G, y ser una persona o sociedad extranjera."
  },
  {
    "ruleId": "f.43",
    "targetFieldRaw": "si$[850]",
    "operatorRaw": "validation",
    "formulaRaw": "[461] + [545] > 0",
    "guidanceText": "Usted no puede hacer uso de la Rebaja por Presunción de Asignación de Zona D.L. 889/75, código 850, si no ha percibido rentas de las Segunda Categoría y en particular del N° 2 del art. 42, declaradas en los códigos [461] y [545] del Recuadro N°1 : Honorarios"
  },
  {
    "ruleId": "f.61",
    "targetFieldRaw": "si$[848]",
    "operatorRaw": "validation",
    "formulaRaw": "Tipo {[03]} = 2.y. subtipo = 219",
    "guidanceText": "Usted no puede hacer uso del crédito Fiscal AFP (Art.23 D.L.3500/80)"
  },
  {
    "ruleId": "f.77",
    "targetFieldRaw": "si$[833]",
    "operatorRaw": "validation",
    "formulaRaw": "{[104] + [106] + [108] + [955] + [1632] + [155] + [1032] + [908] + [951] + [32] + [187] + [1037] + [1829] + (ABS{1440}) + (ABS{1690}) + (ABS{1630}) + (ABS{1816}) } > 0",
    "guidanceText": "Si ingresó un monto en el código 833 debe haber ingresado valor en alguno de los siguientes códigos: 104, 106, 108, 955, 1632, 155, 1032, 908, 951, 32, , 187, 1037, 1829, 1440, 1630, 1690 o 1816."
  },
  {
    "ruleId": "f.78",
    "targetFieldRaw": "si$[54]",
    "operatorRaw": "validation",
    "formulaRaw": "[1098] > 0",
    "guidanceText": "Como ingresó datos en el código 54 debe ingresar datos en el código 1098."
  },
  {
    "ruleId": "f.79",
    "targetFieldRaw": "si$[1358]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1358 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.80",
    "targetFieldRaw": "si$[1359]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1359 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.81",
    "targetFieldRaw": "si$[1360]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1360 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.82",
    "targetFieldRaw": "si$[1361]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1361 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.83",
    "targetFieldRaw": "si$[1184]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1184 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.84",
    "targetFieldRaw": "si$[1362]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1362 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.85",
    "targetFieldRaw": "si$[1363]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1363 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.86",
    "targetFieldRaw": "si$[1364]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = 14TT .o. M14A .o. 14D1",
    "guidanceText": "El código 1364 debe ser declarado por los contribuyentes acogidos a los regimenes de la letra A) o letra D) N°3 o N°8 del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.87",
    "targetFieldRaw": "si$[1191]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 1191 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.88",
    "targetFieldRaw": "si$[1192]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 1192 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.89",
    "targetFieldRaw": "si$[1193]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 1193 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.90",
    "targetFieldRaw": "si$[1194]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 1194 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.91",
    "targetFieldRaw": "si$[1195]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 1195 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.92",
    "targetFieldRaw": "si$[1691]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 1691 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.93",
    "targetFieldRaw": "si$[1196]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código1196debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.94",
    "targetFieldRaw": "si$[1197]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 1197 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.96",
    "targetFieldRaw": "si$[238]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1",
    "guidanceText": "El código 238 debe ser declarado por los contribuyentes acogidos al regimen 14 A) o del N° 3 de la letra D), ambos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.98",
    "targetFieldRaw": "si$[898]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 898 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.99",
    "targetFieldRaw": "si$[373]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 373 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.100",
    "targetFieldRaw": "si$[382]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 382 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.101",
    "targetFieldRaw": "si$[761]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 761 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.102",
    "targetFieldRaw": "si$[773]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 773 debe ser declarado por los contribuyentes acogidos al regimen 114 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.103",
    "targetFieldRaw": "si$[365]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 365 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.104",
    "targetFieldRaw": "si$[366]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 366 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.105",
    "targetFieldRaw": "si$[392]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 392 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.107",
    "targetFieldRaw": "si$[984]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 984 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.108",
    "targetFieldRaw": "si$[390]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 390 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.109",
    "targetFieldRaw": "si$[742]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 742 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.110",
    "targetFieldRaw": "si$[841]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 841 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.111",
    "targetFieldRaw": "si$[855]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = M14A .o. 14D1 .o. M14G",
    "guidanceText": "El código 855 debe ser declarado por los contribuyentes acogidos al regimen 14 letra A), o del N° 3 de la letra D), o 14 letra G), todos del artículo 14 de la LIR"
  },
  {
    "ruleId": "f.113",
    "targetFieldRaw": "si$[77]",
    "operatorRaw": "validation",
    "formulaRaw": "TIPO{[03]} = 1 .o. 3 .o. 4",
    "guidanceText": "El código 77 debe ser declarado por empresas del Estado o en aquellas empresas en que tenga participacion"
  },
  {
    "ruleId": "f.114",
    "targetFieldRaw": "si$[1609]",
    "operatorRaw": "validation",
    "formulaRaw": "[1630] > 0",
    "guidanceText": "Puedes declarar el código 1609 sólo si código 1630 es positivo"
  },
  {
    "ruleId": "f.146",
    "targetFieldRaw": "si$[1123]",
    "operatorRaw": "validation",
    "formulaRaw": "Atributo = OTFA .o. OTFI",
    "guidanceText": "El código 1123 debe ser declarado por los contribuyentes obligados a trazabilidad"
  },
  {
    "ruleId": "i.3",
    "targetFieldRaw": "[1168] + [1169] + [1170]",
    "operatorRaw": "=",
    "formulaRaw": "[1160] - [1163] - [1164] + [1166]",
    "guidanceText": "La suma de los códigos 1168, 1169, 1170 debe ser igual a la sumatoria de los códigos 1160 menos 1163, 1164, más 1166. Recuadro N°9"
  },
  {
    "ruleId": "m.1",
    "targetFieldRaw": "[1208] + [1218] + [1209] + [1219] + [1193] + [1194]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014105 + Vx014106 + Vx014107 + Vx014108",
    "guidanceText": "Los retiros, remesas o dividendos de los códigos 1208, 1218, 1209, 1219, del recuadro N° 15 y/o en los códigos 1193, 1194 del recuadro N° 6, deben ser iguales a los retiros, remesas o dividendos de las columnas C5, C6, C7 y C8 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.2",
    "targetFieldRaw": "[1230] + [1231]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014109",
    "guidanceText": "Los retiros, remesas o dividendos de los códigos 1230, 1231 del recuadro N° 15, deben ser iguales a los retiros, remesas o dividendos de la columna C9 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.3",
    "targetFieldRaw": "[1745] + [1747]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014112 + Vx014113",
    "guidanceText": "Los retiros, remesas o dividendos de los códigos 1745, 1747 del recuadro N° 15, deben ser iguales a los retiros, remesas o dividendos de las columnas C12 y C13 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.4",
    "targetFieldRaw": "[1746] + [1748]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014110 + Vx014111",
    "guidanceText": "Los retiros, remesas o dividendos de los códigos 1746, 1748 del recuadro N° 15, deben ser iguales a los retiros, remesas o dividendos de las columnas C10 y C11 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.5",
    "targetFieldRaw": "[1242] + [1243]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014114 + Vx014115",
    "guidanceText": "Los retiros, remesas o dividendos de los códigos 1242, 1243 del recuadro N° 15, deben ser iguales a los retiros, remesas o dividendos de las columnas C14 y C15 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.6",
    "targetFieldRaw": "[1254] + [1255]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014116",
    "guidanceText": "Los retiros, remesas o dividendos de los códigos 1254, 1255 del recuadro N° 15, deben ser iguales a los retiros, remesas o dividendos de la columna C16 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.7",
    "targetFieldRaw": "[1276] + [1277]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014117 + Vx014119",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1276, 1277 del recuadro N° 16, deben ser iguales a los créditos de las columnas C17 y C19 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.8",
    "targetFieldRaw": "[1285] + [1286] + [1041]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014118 + Vx014120",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1285, 1286 del recuadro N° 16, y/o el pago voluntario a título de IDPC del código 1041, deben ser iguales a los créditos de las columnas C18 y C20 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.9",
    "targetFieldRaw": "[1296] + [1297]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014121 + Vx014123",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1296, 1297 del recuadro N° 16, deben ser iguales a los créditos de las columnas C21 y C23 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.10",
    "targetFieldRaw": "[1309] + [1310]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014122 + Vx014124",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1309, 1310 del recuadro N° 16, deben ser iguales a los créditos de las columnas C22 y C24 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.11",
    "targetFieldRaw": "[1320] + [1321]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014125",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1320, 1321 del recuadro N° 16, deben ser iguales al crédito de las columna C25 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.12",
    "targetFieldRaw": "[1331] + [1332]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014126 + Vx014128",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1331, 1332 del recuadro N° 16, deben ser iguales a los créditos de las columnas C26 y C28 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.13",
    "targetFieldRaw": "[1342] + [1343]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014127 + Vx014129",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1342, 1343 del recuadro N° 16, deben ser iguales a los créditos de las columnas C27 y C29 de la declaración jurada N°1948."
  },
  {
    "ruleId": "m.14",
    "targetFieldRaw": "[1352] + [1353]",
    "operatorRaw": "=",
    "formulaRaw": "Si atributo = M14A .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014130",
    "guidanceText": "Los créditos por impuesto de primera categoría de los códigos 1352, 1353 del recuadro N° 16, deben ser iguales al crédito de la columna C30 de la declaración jurada N°1948."
  },
  {
    "ruleId": "n.1",
    "targetFieldRaw": "[1475] + [1480] + [1193] + [1194]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014105 + Vx014106 + Vx014107 + Vx014108) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de las columnas C5, C6, C7 y/o C8 (reajustadas), deben ser iguales a los códigos 1475, 1480 (sin reajuste) del recuadro N° 20 y/o los códigos 1193, y/o 1194 (sin reajuste) del recuadro N° 6, según corresponda."
  },
  {
    "ruleId": "n.2",
    "targetFieldRaw": "[1475] + [1480] + [1193] + [1194]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014105 + Vx014106 + Vx014107 + Vx014108",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1475, 1480 del recuadro N°20, y/o de los códigos 1193, y 1194 del recuadro N° 6, deben ser iguales a las columnas C5, C6, C7 y/o C8 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.3",
    "targetFieldRaw": "[1476] + [1481]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014109 * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de la columna C9 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1476 y/o 1481 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.4",
    "targetFieldRaw": "[1476] + [1481]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014109 Sino 0",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1476, 1481 del recuadro N°20, deben ser iguales a la columna C09 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.5",
    "targetFieldRaw": "[1767] + [1769]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014112 + Vx014113) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de las columnas C12 y/o C13 (reajustadas) de la declaración jurada N° 1948, deben ser iguales a los códigos 1767 y/o 1769 (sin reajuste) del recuadro N° 20."
  },
  {
    "ruleId": "n.6",
    "targetFieldRaw": "[1767] + [1769]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014112 + Vx014113",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1767, 1769 del recuadro N°20, deben ser iguales a las columnas C12, y/o C13 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.7",
    "targetFieldRaw": "[1768] + [1770]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014110 + Vx014111) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de las columnas C10 y/o C11 (reajustadas) de la declaración jurada N° 1948, deben ser iguales a los códigos 1768 y/o 1770 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.8",
    "targetFieldRaw": "[1768] + [1770]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014110 + Vx014111",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1768, 1770 del recuadro N°20, deben ser iguales a las columnas C10, y/o C11 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.9",
    "targetFieldRaw": "[1477] + [1482]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014114 + Vx014115) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de las columnas C14 y/o C15 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1477 y/o 1482 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.10",
    "targetFieldRaw": "[1477] + [1482]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014114 + Vx014115",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1477, 1482 del recuadro N°20, deben ser iguales a las columnas C14, y/o C15 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.11",
    "targetFieldRaw": "[1478] + [1483]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014116 * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de la columna C16 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1478 y/o 1483 (sin reajuste) del recuadro N° 20."
  },
  {
    "ruleId": "n.12",
    "targetFieldRaw": "[1478] + [1483]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014116",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1478, 1483 del recuadro N°20, deben ser iguales a la columna C16 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.13",
    "targetFieldRaw": "[1539] + [1549]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014117 + Vx014119) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de las columnas C17 y/o C19 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1539 y/o 1549 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.14",
    "targetFieldRaw": "[1539] + [1549]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014117 + Vx014119",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1539, 1549 del recuadro N°20, deben ser iguales a las columnas C14, y/o C15 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.15",
    "targetFieldRaw": "[1540] + [1550] + [1041]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014118 + Vx014120) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos de las columnas C18 y/o C20 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1540 y/o 1550 (sin reajustar) del recuadro N° 20, o el código 1041 del anverso del Formulario 22."
  },
  {
    "ruleId": "n.16",
    "targetFieldRaw": "[1540] + [1550] + [1041]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014118 + Vx014120",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1540, 1550 del recuadro N°20, o el código 1041 del anverso del Formulario 22, deben ser iguales a las columnas C18, y/o C20 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.17",
    "targetFieldRaw": "[1541] + [1551]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014121 + Vx014123) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos en las columnas C21 y/o C23 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1541 y/o 1551 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.18",
    "targetFieldRaw": "[1541] + [1551]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014121 + Vx014123",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1541, 1551 del recuadro N°20, deben ser iguales a las columnas C21, y/o C23 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.19",
    "targetFieldRaw": "[1542] + [1552]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014122 + Vx014124) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos en las columnas C22 y/o C24 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1542 y/o 1552 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.20",
    "targetFieldRaw": "[1542] + [1552]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014122 + Vx014124",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1542, 1552 del recuadro N°20, deben ser iguales a las columnas C22, y/o C24 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.21",
    "targetFieldRaw": "[1543] + [1553]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014125 * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos en la columna C25 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1543 y/o 1553 (sin reajuste) del recuadro N° 20."
  },
  {
    "ruleId": "n.22",
    "targetFieldRaw": "[1543] + [1553]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014125",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1543, 1553 del recuadro N°20, deben ser iguales a la columna C25 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.23",
    "targetFieldRaw": "[1544] + [1554]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y .(Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014126 + Vx014128) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos en las columnas C26 y/o C28 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1544 y/o 1554 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.24",
    "targetFieldRaw": "[1544] + [1554]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014126 + Vx014128",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1544, 1554 del recuadro N°20, deben ser iguales a las columnas C26, y/o C28 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.25",
    "targetFieldRaw": "[1547] + [1555]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces (Vx014127 + Vx014129) * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos en las columnas C27 y/o C29 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1547 y/o 1555 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.26",
    "targetFieldRaw": "[1547] + [1555]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014127 + Vx014129",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1547, 1555 del recuadro N°20, deben ser iguales a las columnas C27, y/o C29 (reajustados) de la declaración jurada N° 1948."
  },
  {
    "ruleId": "n.27",
    "targetFieldRaw": "[1548] + [1556]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014130 * (2 - P34 - P747)",
    "guidanceText": "Los retiros, remesas o dividendos en la columna C30 (reajustados) de la declaración jurada N° 1948, deben ser iguales a los códigos 1548 y/o 1556 (sin reajustar) del recuadro N° 20."
  },
  {
    "ruleId": "n.28",
    "targetFieldRaw": "[1548] + [1556]",
    "operatorRaw": "validation",
    "formulaRaw": "Si atributo = 14D1 .y. (Vx011264 = 0 .o. atributo !=​ ME22); entonces Vx014130",
    "guidanceText": "Los retiros, remesas o dividendos (sin reajustar) de los códigos 1548, 1556 del recuadro N°20, deben ser iguales a las columna C30 (reajustados) de la declaración jurada N° 1948."
  }
];
