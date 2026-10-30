// Recuento de horas: minutos declarados en las sesiones, palabras y lectura (÷180 palabras/min),
// comparados con el plan (src/data/curso.json). Escribe informes/horas-AAAA-MM-DD.md.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { archivosMDX, leerMDX, sesionesDe, contarPalabras, leerJSON, DIR_DATOS, RAIZ } from './lib-contenido.mjs';

const PALABRAS_MIN = 180;
const curso = leerJSON(join(DIR_DATOS, 'curso.json'));
const escritos = new Map(archivosMDX().map((r) => { const d = leerMDX(r); return [d.frontmatter.id, d]; }));
const HOY = new Date().toISOString().slice(0, 10);

let totalPlan = 0, totalActual = 0, totalPalabras = 0, nSesiones = 0;
const filas = curso.subcapitulos.map((s) => {
  totalPlan += s.minutosPlan;
  const d = escritos.get(s.id);
  if (!d) { totalActual += s.minutosPlan; nSesiones += s.sesionesPlan; return `| ${s.numero} | ${s.titulo} | ${s.minutosPlan} | — | — | — | — | en preparación |`; }
  const ses = sesionesDe(d.arbol);
  const min = ses.reduce((a, x) => a + Number(x.minutos), 0);
  const palabras = contarPalabras(d.arbol);
  const lectura = Math.round(palabras / PALABRAS_MIN);
  const desv = Math.round(((min - s.minutosPlan) / s.minutosPlan) * 100);
  totalActual += min; totalPalabras += palabras; nSesiones += ses.length;
  return `| ${s.numero} | ${s.titulo} | ${s.minutosPlan} | ${min} | ${ses.length} | ${palabras.toLocaleString('es-ES')} | ${lectura} | ${desv === 0 ? 'igual al plan' : `${desv > 0 ? '+' : ''}${desv} %`}${Math.abs(desv) > 15 ? ' ⚠' : ''} |`;
});

const h = (m) => (m / 60).toLocaleString('es-ES', { maximumFractionDigits: 2 });
const md = `# Recuento de horas · ${HOY}

Minutos de cada subcapítulo = suma de los minutos declarados en sus sesiones (que incluyen lectura, vídeo, interactivos, práctica y test). La columna «Lectura» estima solo el texto propio, a ${PALABRAS_MIN} palabras por minuto. Los subcapítulos en preparación cuentan con los minutos del plan.

| # | Subcapítulo | Plan (min) | Actual (min) | Sesiones | Palabras | Lectura (min) | Desviación |
|---|---|---:|---:|---:|---:|---:|---|
${filas.join('\n')}

**Total:** ${totalActual} min (${h(totalActual)} h) · plan ${totalPlan} min (${h(totalPlan)} h) · ${nSesiones} sesiones · ${totalPalabras.toLocaleString('es-ES')} palabras en los subcapítulos ya escritos.
El curso debe quedar entre 30 y 40 h: ${totalActual >= 1800 && totalActual <= 2400 ? '✓ dentro del rango' : '✗ FUERA DEL RANGO'}.
`;
mkdirSync(join(RAIZ, 'informes'), { recursive: true });
writeFileSync(join(RAIZ, 'informes', `horas-${HOY}.md`), md);
console.log(md);
