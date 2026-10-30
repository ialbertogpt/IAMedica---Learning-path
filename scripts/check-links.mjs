// Comprueba todos los enlaces del curso y genera un informe en informes/enlaces-AAAA-MM-DD.md.
// Uso: npm run check-links            (solo informe)
//      npm run check-links -- --actualizar   (además, actualiza fechaVerificacion de los enlaces correctos)
// Clasificación: correcto · redirige · revisión manual (la web bloquea comprobaciones automáticas) · roto.
// Sale con código 1 si hay algún enlace roto.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { archivosMDX, leerMDX, leerJSON, DIR_DATOS, RAIZ } from './lib-contenido.mjs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const CABECERAS = { 'User-Agent': UA, 'Accept-Language': 'es-ES,es;q=0.9,en;q=0.5', Cookie: 'SOCS=CAI; CONSENT=YES+cb' };
const HOY = new Date().toISOString().slice(0, 10);
const actualizar = process.argv.includes('--actualizar');

// ── Recopilar enlaces ───────────────────────────────────────────────────────
const enlaces = new Map(); // url → { url, donde: Set, recurso?, herramienta?, youtubeId?, duracion? }
const anotar = (url, donde, extra = {}) => {
  if (!/^https?:\/\//.test(url)) return;
  const e = enlaces.get(url) ?? { url, donde: new Set() };
  e.donde.add(donde);
  Object.assign(e, extra);
  enlaces.set(url, e);
};
const recursos = leerJSON(join(DIR_DATOS, 'recursos.json'));
const herramientas = leerJSON(join(DIR_DATOS, 'herramientas.json'));
recursos.forEach((r) => anotar(r.url, `recursos.json · ${r.id}`, { recurso: r.id, youtubeId: r.youtubeId, duracion: r.duracion }));
herramientas.forEach((h) => anotar(h.url, `herramientas.json · ${h.id}`, { herramienta: h.id }));
for (const ruta of archivosMDX()) {
  const { frontmatter, cuerpo, slug } = leerMDX(ruta);
  (frontmatter.fuentes ?? []).forEach((f) => {
    if (f.url) anotar(f.url, `${slug} · fuentes`);
    if (f.pmid) anotar(`https://pubmed.ncbi.nlm.nih.gov/${f.pmid}/`, `${slug} · fuentes (PMID)`);
  });
  for (const m of cuerpo.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) anotar(m[1], `${slug} · texto`);
  for (const m of cuerpo.matchAll(/href="(https?:\/\/[^"]+)"/g)) anotar(m[1], `${slug} · texto`);
}

// ── Comprobar ───────────────────────────────────────────────────────────────
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
async function pedir(url, intentos = 2) {
  let cabeceras = CABECERAS;
  for (let i = 0; i < intentos; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 30000);
      const r = await fetch(url, { headers: cabeceras, redirect: 'follow', signal: ctrl.signal });
      const cuerpo = (await r.text()).slice(0, 200000);
      clearTimeout(t);
      return { status: r.status, final: r.url, cuerpo };
    } catch (e) {
      if (i === intentos - 1) return { status: 0, final: url, cuerpo: '', error: e.cause?.code ?? e.cause?.message ?? e.message ?? String(e) };
      // Algunas webs entran en un bucle de redirecciones con cabeceras de navegador completo: se reintenta con unas mínimas.
      if (/redirect/i.test(e.cause?.message ?? '')) cabeceras = { 'User-Agent': 'Mozilla/5.0' };
      await espera(1500);
    }
  }
}

// Página de desafío anti-bots: se reconoce por el título o por ser una página mínima con captcha.
const ANTIBOTS = /Just a moment|captcha|Please enable JS|cf-chl|Attention Required/i;
const esDesafio = (cuerpo) => {
  const titulo = cuerpo.match(/<title[^>]*>([^<]*)/i)?.[1] ?? '';
  return /Just a moment|Attention Required|Access denied/i.test(titulo) || (cuerpo.length < 4000 && ANTIBOTS.test(cuerpo));
};
async function comprobar(e) {
  if (e.youtubeId) {
    const oe = await pedir(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${e.youtubeId}`)}&format=json`);
    if (oe.status !== 200) return { ...e, estado: oe.status === 401 || oe.status === 403 ? 'roto' : 'roto', detalle: `oEmbed ${oe.status} (vídeo privado, eliminado o no insertable)` };
    const titulo = JSON.parse(oe.cuerpo).title;
    const pag = await pedir(`https://www.youtube.com/watch?v=${e.youtubeId}&hl=es&gl=ES`);
    const seg = Number(pag.cuerpo.match(/"lengthSeconds":"(\d+)"/)?.[1] ?? 0);
    const estadoRep = pag.cuerpo.match(/"playabilityStatus":\{"status":"([A-Z_]+)"/)?.[1];
    const dur = seg ? `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}` : '?';
    const avisos = [];
    if (estadoRep && estadoRep !== 'OK') avisos.push(`estado de reproducción: ${estadoRep}`);
    if (e.duracion && seg && Math.abs(seg - e.duracion.split(':').reduce((a, x) => a * 60 + Number(x), 0)) > 5) avisos.push(`duración ${dur} distinta de la registrada (${e.duracion})`);
    return { ...e, estado: avisos.length ? 'revisar' : 'correcto', detalle: `«${titulo}» · ${dur}${avisos.length ? ' · ' + avisos.join('; ') : ''}` };
  }
  const r = await pedir(e.url);
  if (r.status >= 200 && r.status < 300 && !esDesafio(r.cuerpo)) {
    const norm = (u) => u.replace(/\/+$/, '').replace(/^https?:\/\/(www\.)?/, '');
    const titulo = r.cuerpo.match(/<title[^>]*>([^<]*)/i)?.[1]?.trim().replace(/\s+/g, ' ').slice(0, 90) ?? '';
    if (norm(r.final) !== norm(e.url)) return { ...e, estado: 'redirige', detalle: `→ ${r.final}${titulo ? ` · «${titulo}»` : ''}` };
    return { ...e, estado: 'correcto', detalle: titulo ? `«${titulo}»` : `HTTP ${r.status}` };
  }
  if ([202, 401, 403, 405, 412, 429].includes(r.status) || esDesafio(r.cuerpo)) return { ...e, estado: 'revision-manual', detalle: `HTTP ${r.status}: la web bloquea las comprobaciones automáticas` };
  return { ...e, estado: 'roto', detalle: r.status ? `HTTP ${r.status}` : `sin respuesta (${r.error})` };
}

const lista = [...enlaces.values()];
const resultados = [];
const CONCURRENCIA = 6;
for (let i = 0; i < lista.length; i += CONCURRENCIA) {
  resultados.push(...(await Promise.all(lista.slice(i, i + CONCURRENCIA).map(comprobar))));
  process.stdout.write(`\r  Comprobados ${resultados.length}/${lista.length}`);
}
process.stdout.write('\n');

// ── Informe ─────────────────────────────────────────────────────────────────
const ORDEN = { roto: 0, revisar: 1, 'revision-manual': 2, redirige: 3, correcto: 4 };
const ETIQUETA = { roto: '✗ Roto', revisar: '⚠ Revisar', 'revision-manual': '🔒 Revisión manual', redirige: '↪ Redirige', correcto: '✓ Correcto' };
resultados.sort((a, b) => ORDEN[a.estado] - ORDEN[b.estado] || a.url.localeCompare(b.url));
const cuenta = (est) => resultados.filter((r) => r.estado === est).length;
const filas = resultados.map((r) => `| ${ETIQUETA[r.estado]} | ${r.url} | ${r.detalle.replace(/\|/g, '/')} | ${[...r.donde].join('<br>')} |`);
const md = `# Informe de enlaces · ${HOY}

Generado con \`npm run check-links\`. ${lista.length} enlaces únicos.

| Estado | Número |
|---|---:|
| ✓ Correcto | ${cuenta('correcto')} |
| ↪ Redirige | ${cuenta('redirige')} |
| 🔒 Revisión manual (bloqueo anti-bots) | ${cuenta('revision-manual')} |
| ⚠ Revisar (vídeo con cambios) | ${cuenta('revisar')} |
| ✗ Roto | ${cuenta('roto')} |

Los enlaces en «revisión manual» no están necesariamente rotos: la web rechaza las peticiones automáticas. Ábrelos en el navegador y, si funcionan, anota la fecha en el JSON correspondiente.

| Estado | URL | Detalle | Dónde se usa |
|---|---|---|---|
${filas.join('\n')}
`;
mkdirSync(join(RAIZ, 'informes'), { recursive: true });
const salida = join(RAIZ, 'informes', `enlaces-${HOY}.md`);
writeFileSync(salida, md);
console.log(`  ✓ ${cuenta('correcto')} · ↪ ${cuenta('redirige')} · 🔒 ${cuenta('revision-manual')} · ⚠ ${cuenta('revisar')} · ✗ ${cuenta('roto')}`);
console.log(`  Informe: informes/enlaces-${HOY}.md`);

if (actualizar) {
  const okRec = new Set(resultados.filter((r) => r.recurso && ['correcto', 'redirige'].includes(r.estado)).map((r) => r.recurso));
  const okHer = new Set(resultados.filter((r) => r.herramienta && ['correcto', 'redirige'].includes(r.estado)).map((r) => r.herramienta));
  for (const [archivo, ok] of [['recursos.json', okRec], ['herramientas.json', okHer]]) {
    const ruta = join(DIR_DATOS, archivo);
    const datos = JSON.parse(readFileSync(ruta, 'utf8'));
    datos.forEach((d) => { if (ok.has(d.id)) d.fechaVerificacion = HOY; });
    writeFileSync(ruta, JSON.stringify(datos, null, 2) + '\n');
  }
  console.log(`  Fechas de verificación actualizadas: ${okRec.size} recursos y ${okHer.size} herramientas.`);
}
if (cuenta('roto')) process.exit(1);
