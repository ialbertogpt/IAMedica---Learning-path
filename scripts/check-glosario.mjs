// Busca términos del glosario que aparecen en un subcapítulo sin su explicación (<T id="…">).
// Regla: en cada subcapítulo, la primera aparición de un término debe llevar <T>.
// Uso: npm run check-glosario                (informe)
//      npm run check-glosario -- --arreglar  (inserta <T> en la primera aparición de cada término que falte)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { visit } from 'unist-util-visit';
import { archivosMDX, leerMDX, componentes, leerJSON, DIR_DATOS } from './lib-contenido.mjs';

const arreglar = process.argv.includes('--arreglar');
const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const esc = (f) => sinTildes(f).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const glosario = leerJSON(join(DIR_DATOS, 'glosario.json'));

// Formas que se buscan para cada término: el nombre principal y lo que vaya entre paréntesis.
// Algunos términos necesitan una forma más específica para no dar falsos positivos.
const FORMAS_ESPECIALES = { atencion: ['mecanismo de atencion', 'mecanismo de atención'] };
const formas = glosario.map((g) => {
  const principal = g.termino.replace(/\s*\(.*\)\s*/, '').trim();
  const p = g.termino.match(/\(([^)]+)\)/)?.[1];
  // El paréntesis solo cuenta como sinónimo si es una sigla o una sola palabra, no si es una aclaración.
  const parentesis = p && (/^[A-Z]/.test(p) || !p.includes(' ')) ? p : undefined;
  const lista = FORMAS_ESPECIALES[g.id] ?? [principal, parentesis].filter(Boolean).filter((f) => f.length >= 3);
  return { id: g.id, termino: g.termino, patrones: lista.map((f) => new RegExp(`(^|[^\\p{L}])(${esc(f)})(?=$|[^\\p{L}])`, 'u')) };
});

let total = 0;
const usados = new Set();
for (const ruta of archivosMDX()) {
  const doc = leerMDX(ruta);
  const { arbol, slug } = doc;
  const conT = new Set(componentes(arbol).filter((c) => c.nombre === 'T').map((c) => c.attrs.id));
  conT.forEach((id) => usados.add(id));
  const hallazgos = [];
  const cambios = [];
  for (const f of formas) {
    if (conT.has(f.id)) continue;
    let hallado = null;
    visit(arbol, 'text', (n, _i, padre) => {
      if (hallado || (padre?.type?.startsWith('mdxJsx') && padre.name === 'T')) return;
      const norm = sinTildes(n.value);
      for (const p of f.patrones) {
        const m = p.exec(norm);
        if (m) {
          const ini = m.index + m[1].length;
          hallado = { linea: n.position.start.line, offset: n.position.start.offset + ini, largo: m[2].length, texto: n.value.slice(ini, ini + m[2].length) };
          return;
        }
      }
    });
    if (hallado) { hallazgos.push(`   · «${f.termino}» aparece (línea ${hallado.linea}) sin <T id="${f.id}">`); cambios.push({ ...hallado, id: f.id }); }
  }
  if (hallazgos.length) {
    console.log(`\n${slug}: ${hallazgos.length} término(s) sin explicar`);
    hallazgos.forEach((h) => console.log(h));
    total += hallazgos.length;
    if (arreglar) {
      // El árbol se calculó sobre el cuerpo sin frontmatter: se aplica el desplazamiento correspondiente.
      const texto = readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n');
      const m = texto.match(/^---\n([\s\S]*?)\n---\n?/);
      const base = m[0].length;
      let nuevo = texto;
      for (const c of cambios.sort((a, b) => b.offset - a.offset)) {
        const ini = base + c.offset;
        if (sinTildes(nuevo.slice(ini, ini + c.largo)) !== sinTildes(c.texto)) { console.log(`   ✗ no se pudo insertar <T> para «${c.id}» (posición desplazada)`); continue; }
        nuevo = nuevo.slice(0, ini) + `<T id="${c.id}">` + nuevo.slice(ini, ini + c.largo) + '</T>' + nuevo.slice(ini + c.largo);
      }
      writeFileSync(ruta, nuevo);
      console.log(`   → insertados ${cambios.length} <T> en ${slug}`);
    }
  }
}
const sinUso = glosario.filter((g) => !usados.has(g.id)).map((g) => g.id);
console.log(`\nTérminos del glosario que todavía no se usan con <T> en ningún subcapítulo (${sinUso.length}): ${sinUso.join(', ') || '—'}`);
console.log(total ? (arreglar ? `\n✓ Corregidas ${total} aparición(es). Vuelve a ejecutar para comprobar.` : `\n⚠ ${total} aparición(es) para revisar. Usa --arreglar para insertar los <T> automáticamente.`) : '\n✓ Ningún término del glosario aparece sin explicar.');
