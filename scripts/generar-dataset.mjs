// Genera el dataset sintético del taller 3.4 (≈250 pacientes ficticios), reproducible: semilla fija.
// Salidas en public/descargas/: pacientes-sinteticos-con-errores.{xlsx,csv} y pacientes-sinteticos-limpio.{xlsx,csv}.
// Uso: npm run generar-dataset
// Todos los datos son inventados: ningún paciente real. Las relaciones entre variables son plausibles, no reales.
import ExcelJS from 'exceljs';
import { mkdirSync, writeFileSync } from 'node:fs';

const SEMILLA = 20261031;
const N = 250;
const SALIDA = 'public/descargas';

// ── Generador pseudoaleatorio con semilla (mulberry32) y distribuciones básicas
function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const rnd = mulberry32(SEMILLA);
const normal = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
const poisson = (l) => { const L = Math.exp(-l); let k = 0, p = 1; do { k++; p *= rnd(); } while (p > L); return k - 1; };
const binomial = (n, p) => { let k = 0; for (let i = 0; i < n; i++) if (rnd() < p) k++; return k; };
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const sigmoide = (x) => 1 / (1 + Math.exp(-x));

// ── Pacientes «limpios» (la verdad del modelo)
const limpio = [];
for (let i = 1; i <= N; i++) {
  const edad = Math.round(clamp(83 + 5.5 * normal(), 70, 99));
  const sexo = rnd() < 0.62 ? 'Mujer' : 'Varón';
  const barthel = clamp(Math.round((72 - 1.6 * (edad - 80) + 22 * normal()) / 5) * 5, 0, 100);
  const pfeiffer = clamp(poisson(0.8 + 0.1 * (edad - 75) + (100 - barthel) / 30), 0, 10);
  const nFarmacos = clamp(4 + poisson(3.2) + (rnd() < 0.5 ? 0 : 1) + Math.round(0.05 * (edad - 80)), 1, 20);
  const frail = binomial(5, clamp(0.1 + 0.55 * (100 - barthel) / 100 + 0.008 * (edad - 80), 0.02, 0.95));
  const caidas = poisson(clamp(0.2 + 0.01 * (100 - barthel) + 0.06 * nFarmacos, 0.05, 3));
  const ingreso = rnd() < sigmoide(-3.6 + 0.012 * (100 - barthel) + 0.2 * nFarmacos + 0.35 * Math.min(caidas, 3) + 0.2 * frail) ? 1 : 0;
  const muerte = rnd() < sigmoide(-3.7 + 0.05 * (edad - 70) + 0.012 * (100 - barthel) + 0.1 * pfeiffer + 0.25 * frail + 0.4 * ingreso) ? 1 : 0;
  limpio.push({ id: `P${String(i).padStart(3, '0')}`, edad, sexo, barthel, pfeiffer, n_farmacos: nFarmacos, frail, caidas_12m: caidas, ingreso_12m: ingreso, muerte_12m: muerte });
}

// ── Errores intencionados (para el ejercicio de limpieza)
const orden = (() => { const a = [...Array(N).keys()]; for (let i = N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
const usados = new Set();
// Toma n pacientes que no se hayan usado ya para otro error (y que cumplan el filtro, si lo hay)
const tomar = (n, filtro = () => true) => {
  const elegidos = [];
  for (const i of orden) { if (elegidos.length === n) break; if (!usados.has(i) && filtro(i)) { usados.add(i); elegidos.push(i); } }
  return elegidos;
};
const sucio = limpio.map((p) => ({ ...p }));
const registro = [];
const nota = (tipo, filas, detalle) => registro.push({ tipo, filas: filas.map((i) => sucio[i].id), detalle });

const sexos = tomar(12);
sexos.forEach((i, k) => { const v = sucio[i].sexo === 'Mujer' ? ['M', 'mujer', 'Mujer '][k % 3] : ['V', 'varon', 'H'][k % 3]; sucio[i].sexo = v; });
nota('sexo con codificación inconsistente', sexos, 'M, mujer, V, varon, H o espacios sobrantes en lugar de «Mujer» y «Varón»');

const edadTexto = tomar(3); edadTexto.forEach((i) => { sucio[i].edad = `${sucio[i].edad} años`; });
nota('edad guardada como texto', edadTexto, 'Texto del tipo «84 años» en lugar de un número');

const edadMal = tomar(2); sucio[edadMal[0]].edad = 9; sucio[edadMal[1]].edad = 840;
nota('edad imposible', edadMal, '9 y 840 (erratas de 90 y 84)');

const barthelMal = tomar(2); sucio[barthelMal[0]].barthel = 150; sucio[barthelMal[1]].barthel = 900;
nota('Barthel fuera de rango', barthelMal, '150 y 900 (el índice de Barthel va de 0 a 100)');

const pfeifferMal = tomar(2); sucio[pfeifferMal[0]].pfeiffer = 11; sucio[pfeifferMal[1]].pfeiffer = 12;
nota('Pfeiffer fuera de rango', pfeifferMal, '11 y 12 (el test de Pfeiffer va de 0 a 10 errores)');

const farmacoMal = tomar(1); sucio[farmacoMal[0]].n_farmacos = 55;
nota('número de fármacos improbable', farmacoMal, '55 (errata de 5)');

const faltBarthel = tomar(8); faltBarthel.forEach((i) => { sucio[i].barthel = ''; });
nota('Barthel sin dato', faltBarthel, 'Celda vacía');

const faltPfeiffer = tomar(6); faltPfeiffer.forEach((i) => { sucio[i].pfeiffer = ''; });
nota('Pfeiffer sin dato', faltPfeiffer, 'Celda vacía');

const nsnc = tomar(2); nsnc.forEach((i) => { sucio[i].frail = 'NS/NC'; });
nota('FRAIL con «NS/NC»', nsnc, 'Texto en una columna numérica');

const si = tomar(4, (i) => limpio[i].ingreso_12m === 1); si.forEach((i) => { sucio[i].ingreso_12m = 'Sí'; });
nota('ingreso con codificación inconsistente', si, '«Sí» en lugar de 1');

const duplicados = tomar(3);
duplicados.forEach((i) => sucio.push({ ...sucio[i] }));
nota('filas duplicadas', duplicados, 'La fila completa aparece dos veces');

// ── Versión limpia de referencia: duplicados fuera, texto a número, imposibles y NS/NC → vacío
const hasta = (v, a, b) => (typeof v === 'number' && v >= a && v <= b ? v : '');
const referencia = limpio.map((p, k) => {
  const s = sucio[k];
  const edad = typeof s.edad === 'string' ? parseInt(s.edad, 10) : s.edad;
  return {
    id: p.id, edad: hasta(edad, 60, 110), sexo: p.sexo,
    barthel: hasta(s.barthel === '' ? NaN : s.barthel, 0, 100), pfeiffer: hasta(s.pfeiffer === '' ? NaN : s.pfeiffer, 0, 10),
    n_farmacos: hasta(s.n_farmacos, 0, 30), frail: hasta(s.frail === 'NS/NC' ? NaN : s.frail, 0, 5),
    caidas_12m: p.caidas_12m, ingreso_12m: p.ingreso_12m, muerte_12m: p.muerte_12m,
  };
});

// ── Diccionario de variables
const DICCIONARIO = [
  ['id', 'Código del paciente (ficticio)', 'Texto', 'P001–P250'],
  ['edad', 'Edad en años', 'Numérica', '70–99'],
  ['sexo', 'Sexo', 'Categórica', 'Mujer / Varón'],
  ['barthel', 'Índice de Barthel (dependencia en actividades básicas; 100 = independiente)', 'Numérica', '0–100, de 5 en 5'],
  ['pfeiffer', 'Test de Pfeiffer (nº de errores; más errores = más deterioro cognitivo)', 'Numérica', '0–10'],
  ['n_farmacos', 'Número de fármacos crónicos', 'Numérica', '1–20'],
  ['frail', 'Escala FRAIL (nº de criterios presentes)', 'Numérica', '0–5'],
  ['caidas_12m', 'Nº de caídas en los 12 meses previos', 'Numérica', '0 o más'],
  ['ingreso_12m', 'Ingreso hospitalario en los 12 meses siguientes', 'Binaria', '0 = no, 1 = sí'],
  ['muerte_12m', 'Fallecimiento en los 12 meses siguientes', 'Binaria', '0 = no, 1 = sí'],
];
const COLUMNAS = DICCIONARIO.map((d) => d[0]);

async function escribirXlsx(ruta, filas) {
  const libro = new ExcelJS.Workbook();
  libro.creator = 'Mi IA Médica · datos sintéticos';
  const hoja = libro.addWorksheet('Datos');
  hoja.columns = COLUMNAS.map((c) => ({ header: c, key: c, width: c === 'id' ? 8 : c.length + 6 }));
  hoja.getRow(1).font = { bold: true };
  hoja.views = [{ state: 'frozen', ySplit: 1 }];
  filas.forEach((f) => hoja.addRow(COLUMNAS.map((c) => f[c])));
  const dic = libro.addWorksheet('Diccionario');
  dic.columns = [{ header: 'Variable', width: 14 }, { header: 'Descripción', width: 70 }, { header: 'Tipo', width: 12 }, { header: 'Valores', width: 22 }];
  dic.getRow(1).font = { bold: true };
  DICCIONARIO.forEach((d) => dic.addRow(d));
  dic.addRow([]);
  dic.addRow(['AVISO', 'Todos los datos son ficticios, generados con una semilla fija. Ningún paciente es real y las relaciones entre variables son plausibles, no reales.']);
  await libro.xlsx.writeFile(ruta);
}
const aCsv = (filas) => '﻿' + [COLUMNAS.join(','), ...filas.map((f) => COLUMNAS.map((c) => { const v = f[c]; return /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v; }).join(','))].join('\n') + '\n';

mkdirSync(SALIDA, { recursive: true });
await escribirXlsx(`${SALIDA}/pacientes-sinteticos-con-errores.xlsx`, sucio);
await escribirXlsx(`${SALIDA}/pacientes-sinteticos-limpio.xlsx`, referencia);
writeFileSync(`${SALIDA}/pacientes-sinteticos-con-errores.csv`, aCsv(sucio));
writeFileSync(`${SALIDA}/pacientes-sinteticos-limpio.csv`, aCsv(referencia));

// ── Resumen para el texto del curso
const col = (k) => referencia.map((f) => f[k]).filter((v) => v !== '');
const media = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const de = (a) => { const m = media(a); return Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / (a.length - 1)); };
const resumen = {
  semilla: SEMILLA, filas_con_errores: sucio.length, filas_limpio: referencia.length,
  errores: registro.map((r) => ({ tipo: r.tipo, n: r.filas.length, filas: r.filas.join(' ') , detalle: r.detalle })),
  descriptivos: Object.fromEntries(['edad', 'barthel', 'pfeiffer', 'n_farmacos', 'frail', 'caidas_12m'].map((k) => [k, { n: col(k).length, media: +media(col(k)).toFixed(2), de: +de(col(k)).toFixed(2) }])),
  mujeres_n: referencia.filter((f) => f.sexo === 'Mujer').length,
  ingreso_n: referencia.filter((f) => f.ingreso_12m === 1).length,
  muerte_n: referencia.filter((f) => f.muerte_12m === 1).length,
};
console.log(JSON.stringify(resumen, null, 2));
