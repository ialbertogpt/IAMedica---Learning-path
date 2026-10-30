// Busca términos del glosario que aparecen en un subcapítulo sin su explicación (<T id="…">).
// Regla: en cada subcapítulo, la primera aparición de un término debería llevar <T>.
import { join } from 'node:path';
import { visit } from 'unist-util-visit';
import { archivosMDX, leerMDX, componentes, leerJSON, DIR_DATOS } from './lib-contenido.mjs';

const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const glosario = leerJSON(join(DIR_DATOS, 'glosario.json'));

// Formas que se buscan para cada término: el nombre principal y lo que vaya entre paréntesis.
const formas = glosario.map((g) => {
  const principal = g.termino.replace(/\s*\(.*\)\s*/, '').trim();
  // El paréntesis solo cuenta como sinónimo si es una sigla o una sola palabra (p. ej. «RAG», «alucinación»),
  // no si es una aclaración («del modelo», «mecanismo de»).
  const p = g.termino.match(/\(([^)]+)\)/)?.[1];
  const parentesis = p && (/^[A-Z]/.test(p) || !p.includes(' ')) ? p : undefined;
  const lista = [principal, parentesis].filter(Boolean).filter((f) => f.length >= 3);
  return { id: g.id, termino: g.termino, patrones: lista.map((f) => new RegExp(`(^|[^\\p{L}])${sinTildes(f).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\p{L}])`, 'u')) };
});

let total = 0;
const usados = new Set();
for (const ruta of archivosMDX()) {
  const { arbol, slug } = leerMDX(ruta);
  const conT = new Set(componentes(arbol).filter((c) => c.nombre === 'T').map((c) => c.attrs.id));
  conT.forEach((id) => usados.add(id));
  const hallazgos = [];
  for (const f of formas) {
    if (conT.has(f.id)) continue;
    let linea = null;
    visit(arbol, 'text', (n, _i, padre) => {
      if (linea || (padre?.type?.startsWith('mdxJsx') && padre.name === 'T')) return;
      if (f.patrones.some((p) => p.test(sinTildes(n.value)))) linea = n.position?.start.line;
    });
    if (linea) hallazgos.push(`   · «${f.termino}» aparece (línea ${linea}) sin <T id="${f.id}">`);
  }
  if (hallazgos.length) {
    console.log(`\n${slug}: ${hallazgos.length} término(s) sin explicar`);
    hallazgos.forEach((h) => console.log(h));
    total += hallazgos.length;
  }
}
const sinUso = glosario.filter((g) => !usados.has(g.id)).map((g) => g.id);
console.log(`\nTérminos del glosario que todavía no se usan con <T> en ningún subcapítulo (${sinUso.length}): ${sinUso.join(', ') || '—'}`);
console.log(total ? `\n⚠ ${total} aparición(es) para revisar. Puede haber falsos positivos (p. ej., «modelo» en sentido general).` : '\n✓ Ningún término del glosario aparece sin explicar.');
