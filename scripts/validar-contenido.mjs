// Valida el contenido antes de compilar. Si algo falla, la compilación se detiene (código de salida 1).
// Comprueba lo que el esquema de content.config.ts no puede ver: el cuerpo de los .mdx.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { visit } from 'unist-util-visit';
import { archivosMDX, leerMDX, componentes, sesionesDe, contarPalabras, leerJSON, DIR_DATOS, DIR_TESTS } from './lib-contenido.mjs';

// Componentes permitidos en los .mdx (deben coincidir con src/components/curso/index.ts)
const COMPONENTES = new Set([
  'Sesion', 'T', 'OjoCon', 'Analogia', 'PruebaloTu', 'AvisoClinico', 'Caso', 'Desplegable', 'Plantilla', 'Video', 'Recurso', 'Resumen', 'Ficha', 'PasoTaller', 'TestFinal',
  'Clasificador', 'EncuentraError', 'Tokenizador', 'Minimodelo', 'VentanaContexto', 'CalculadoraRenal', 'TresAyudas', 'AnatomiaFicha',
]);
// Elementos visuales propios (al menos uno por subcapítulo)
const VISUALES = new Set(['Clasificador', 'EncuentraError', 'Tokenizador', 'Minimodelo', 'VentanaContexto', 'CalculadoraRenal', 'TresAyudas', 'AnatomiaFicha']);
const CON_DATOS = new Set(['Clasificador', 'EncuentraError', 'Tokenizador', 'Minimodelo', 'VentanaContexto']);
const MIN_SESION = 15, MAX_SESION = 25, MAX_PALABRAS_BLOQUE = 150;

const curso = leerJSON(join(DIR_DATOS, 'curso.json'));
const glosario = new Set(leerJSON(join(DIR_DATOS, 'glosario.json')).map((g) => g.id));
const recursos = new Map(leerJSON(join(DIR_DATOS, 'recursos.json')).map((r) => [r.id, r]));
const prompts = new Set(leerJSON(join(DIR_DATOS, 'prompts.json')).map((p) => p.id));

const errores = [];
const avisos = [];

function validarTest(id, donde) {
  const ruta = join(DIR_TESTS, `${id}.json`);
  if (!existsSync(ruta)) return errores.push(`${donde}: no existe el test src/content/tests/${id}.json`);
  const t = leerJSON(ruta);
  const n = t.preguntas?.length ?? 0;
  if (n < 3 || n > 5) errores.push(`${donde}: el test ${id} tiene ${n} preguntas (deben ser 3–5)`);
  const tipos = new Set();
  (t.preguntas ?? []).forEach((p, i) => {
    const q = `${donde} · test ${id}, pregunta ${i + 1}`;
    tipos.add(p.tipo);
    if (p.tipo === 'unica' || p.tipo === 'escenario') {
      const c = p.opciones.filter((o) => o.correcta).length;
      if (c !== 1) errores.push(`${q}: debe tener exactamente 1 opción correcta (tiene ${c})`);
      p.opciones.forEach((o, j) => { if (!o.explicacion || o.explicacion.length < 15) errores.push(`${q}: la opción ${j + 1} no tiene explicación`); });
    }
  });
  if (tipos.size < 3) avisos.push(`${donde}: el test ${id} solo usa ${tipos.size} tipo(s) de pregunta; se recomienda mezclar al menos 3`);
}

function existeRecurso(id, donde) {
  const r = recursos.get(id);
  if (!r) return errores.push(`${donde}: el recurso «${id}» no existe en src/data/recursos.json`);
  if (r.estado === 'descartado') errores.push(`${donde}: el recurso «${id}» está descartado`);
}

for (const ruta of archivosMDX()) {
  let doc;
  try { doc = leerMDX(ruta); } catch (e) { errores.push(`${ruta}: no se puede leer el MDX (${e.message})`); continue; }
  const { frontmatter: fm, arbol, slug } = doc;
  const donde = slug;

  // Coherencia con curso.json
  const plan = curso.subcapitulos.find((s) => s.id === fm.id);
  if (!plan) { errores.push(`${donde}: el id «${fm.id}» no está en src/data/curso.json`); continue; }
  if (plan.slug !== slug) errores.push(`${donde}: según curso.json, el archivo debería ser src/content/partes/${plan.slug}.mdx`);
  if (plan.parte !== fm.parte) errores.push(`${donde}: «parte: ${fm.parte}» no coincide con curso.json (${plan.parte})`);

  // Frontmatter que referencia otros archivos
  (fm.recursos ?? []).forEach((id) => existeRecurso(id, `${donde} (frontmatter)`));
  (fm.paraSaberMas ?? []).forEach((id) => existeRecurso(id, `${donde} (paraSaberMas)`));
  if (fm.test) validarTest(fm.test, donde);

  // Sesiones
  const sesiones = sesionesDe(arbol);
  if (!sesiones.length) errores.push(`${donde}: no hay ninguna <Sesion> en el nivel superior del documento`);
  sesiones.forEach((s, i) => {
    const orden = s.nodo.attributes.map((a) => a.name).join(',');
    if (orden !== 'n,titulo,minutos') errores.push(`${donde}, línea ${s.nodo.position.start.line}: escribe la sesión como <Sesion n={${i + 1}} titulo="…" minutos={20}> (atributos en ese orden)`);
    if (Number(s.n) !== i + 1) errores.push(`${donde}: la sesión ${i + 1} tiene n={${s.n}}`);
    const min = Number(s.minutos);
    if (!(min >= MIN_SESION && min <= MAX_SESION)) errores.push(`${donde}: la sesión ${i + 1} dura ${s.minutos} min (deben ser ${MIN_SESION}–${MAX_SESION})`);
    if (!s.titulo || String(s.titulo).length < 4) errores.push(`${donde}: la sesión ${i + 1} no tiene título`);
  });
  const suma = sesiones.reduce((a, s) => a + Number(s.minutos), 0);
  if (sesiones.length && suma !== fm.minutos) errores.push(`${donde}: las sesiones suman ${suma} min, pero el frontmatter dice minutos: ${fm.minutos}`);
  if (Math.abs(fm.minutos - plan.minutosPlan) / plan.minutosPlan > 0.15) avisos.push(`${donde}: ${fm.minutos} min frente a ${plan.minutosPlan} min del plan (desviación > 15 %)`);

  // Contenido fuera de las sesiones
  arbol.children.forEach((n) => {
    const vacio = n.type === 'mdxjsEsm' || (n.type === 'mdxJsxFlowElement' && n.name === 'Sesion');
    if (!vacio) avisos.push(`${donde}, línea ${n.position?.start.line}: hay contenido fuera de una <Sesion> (no se verá con la navegación por sesiones)`);
  });

  // Componentes
  const comps = componentes(arbol);
  const cuenta = (nombre) => comps.filter((c) => c.nombre === nombre).length;
  comps.forEach((c) => {
    const lugar = `${donde}, línea ${c.linea}`;
    if (c.nombre && !COMPONENTES.has(c.nombre) && !/^[a-z]/.test(c.nombre)) errores.push(`${lugar}: componente desconocido <${c.nombre}> (¿error de escritura?)`);
    if (c.nombre === 'T' && !glosario.has(c.attrs.id)) errores.push(`${lugar}: el término «${c.attrs.id}» no existe en el glosario`);
    if ((c.nombre === 'Video' || c.nombre === 'Recurso') && c.attrs.id) existeRecurso(c.attrs.id, lugar);
    if (c.nombre === 'Video' && recursos.get(c.attrs.id)?.tipo !== 'video') errores.push(`${lugar}: «${c.attrs.id}» no es un vídeo`);
    if (c.nombre === 'Plantilla' && !prompts.has(c.attrs.id)) errores.push(`${lugar}: la plantilla «${c.attrs.id}» no existe en prompts.json`);
    if (CON_DATOS.has(c.nombre) && !existsSync(join(DIR_DATOS, 'interactivos', `${c.attrs.datos}.json`))) errores.push(`${lugar}: no existe src/data/interactivos/${c.attrs.datos}.json`);
    if (c.nombre === 'TestFinal' && c.attrs.id !== fm.test) errores.push(`${lugar}: <TestFinal id="${c.attrs.id}"> no coincide con «test: ${fm.test}» del frontmatter`);
  });
  if (cuenta('Resumen') !== 1) errores.push(`${donde}: debe haber exactamente un <Resumen> (hay ${cuenta('Resumen')})`);
  if (cuenta('Ficha') !== 1) errores.push(`${donde}: debe haber exactamente una <Ficha> de bolsillo (hay ${cuenta('Ficha')})`);
  if (cuenta('TestFinal') !== 1) errores.push(`${donde}: debe haber exactamente un <TestFinal> (hay ${cuenta('TestFinal')})`);
  if (cuenta('OjoCon') < 1) errores.push(`${donde}: falta el apartado <OjoCon>`);
  if (!comps.some((c) => VISUALES.has(c.nombre))) errores.push(`${donde}: falta al menos un elemento visual propio (${[...VISUALES].join(', ')})`);
  if (fm.parte === 3) {
    if (cuenta('PruebaloTu') < 1) errores.push(`${donde}: en la Parte 3, «Pruébalo tú» es obligatorio`);
    const pasos = comps.filter((c) => c.nombre === 'PasoTaller').map((c) => c.attrs.tipo);
    if (!pasos.includes('anonimizar')) errores.push(`${donde}: en la Parte 3 hace falta un <PasoTaller tipo="anonimizar">`);
    if (!pasos.includes('verificar')) errores.push(`${donde}: en la Parte 3 hace falta un <PasoTaller tipo="verificar">`);
  } else if (cuenta('PruebaloTu') < 1) avisos.push(`${donde}: se recomienda al menos un «Pruébalo tú»`);
  if (!comps.some((c) => c.nombre === 'Video' || c.nombre === 'Recurso') && !(fm.recursos ?? []).length) errores.push(`${donde}: no hay recursos externos`);

  // Bloques de texto largos (máximo ~150 palabras por bloque)
  visit(arbol, 'paragraph', (p) => {
    // Las tablas Markdown (GFM) se leen aquí como párrafos: no son bloques de texto corrido.
    if (p.children[0]?.type === 'text' && p.children[0].value.trimStart().startsWith('|')) return;
    const n = contarPalabras(p);
    if (n > MAX_PALABRAS_BLOQUE) avisos.push(`${donde}, línea ${p.position.start.line}: párrafo de ${n} palabras (máximo recomendado ${MAX_PALABRAS_BLOQUE})`);
  });
}

// Datos de interactivos con JSON válido
for (const r of recursos.values()) {
  if (r.tipo === 'video' && !r.youtubeId) errores.push(`recursos.json: «${r.id}» es un vídeo sin youtubeId`);
}

if (avisos.length) {
  console.log(`\n⚠  ${avisos.length} aviso(s):`);
  avisos.forEach((a) => console.log('   · ' + a));
}
if (errores.length) {
  console.error(`\n✗ La validación del contenido ha encontrado ${errores.length} error(es):`);
  errores.forEach((e) => console.error('   · ' + e));
  console.error('\nCorrige los errores y vuelve a compilar.\n');
  process.exit(1);
}
console.log(`✓ Contenido validado (${archivosMDX().length} subcapítulo(s)).`);
