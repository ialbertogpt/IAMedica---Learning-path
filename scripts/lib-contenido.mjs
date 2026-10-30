// Utilidades compartidas por los scripts: leer los .mdx, su frontmatter y su árbol MDX.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYAML } from 'yaml';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxjs } from 'micromark-extension-mdxjs';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { visit } from 'unist-util-visit';

export const RAIZ = fileURLToPath(new URL('..', import.meta.url));
export const DIR_PARTES = join(RAIZ, 'src', 'content', 'partes');
export const DIR_TESTS = join(RAIZ, 'src', 'content', 'tests');
export const DIR_DATOS = join(RAIZ, 'src', 'data');

export const leerJSON = (ruta) => JSON.parse(readFileSync(ruta, 'utf8'));

export function archivosMDX(dir = DIR_PARTES) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const r = join(dir, n);
    if (statSync(r).isDirectory()) return archivosMDX(r);
    return n.endsWith('.mdx') ? [r] : [];
  });
}

/** Lee un .mdx: { ruta, slug, frontmatter, cuerpo, arbol } */
export function leerMDX(ruta) {
  const texto = readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n');
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) throw new Error(`${ruta}: falta el bloque de frontmatter entre ---`);
  const frontmatter = parseYAML(m[1]);
  const cuerpo = texto.slice(m[0].length);
  const arbol = fromMarkdown(cuerpo, { extensions: [mdxjs()], mdastExtensions: [mdxFromMarkdown()] });
  const slug = relative(DIR_PARTES, ruta).split(sep).join('/').replace(/\.mdx$/, '');
  return { ruta, slug, frontmatter, cuerpo, arbol };
}

/** Valor de un atributo JSX: cadena, número o expresión literal */
export function atributos(nodo) {
  const out = {};
  for (const a of nodo.attributes ?? []) {
    if (a.type !== 'mdxJsxAttribute') continue;
    if (a.value == null) out[a.name] = true;
    else if (typeof a.value === 'string') out[a.name] = a.value;
    else out[a.name] = a.value.value; // expresión: se guarda el texto, p. ej. "20"
  }
  return out;
}

export function componentes(arbol) {
  const lista = [];
  visit(arbol, (n, _i, padre) => {
    if (n.type === 'mdxJsxFlowElement' || n.type === 'mdxJsxTextElement') {
      lista.push({ nombre: n.name, attrs: atributos(n), nodo: n, padre, linea: n.position?.start.line, ordenAttrs: (n.attributes ?? []).map((a) => a.name) });
    }
  });
  return lista;
}

/** Palabras de texto legible (excluye código y atributos) */
export function contarPalabras(nodo) {
  let n = 0;
  visit(nodo, (x) => {
    if (x.type === 'text') n += x.value.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  });
  return n;
}

export function sesionesDe(arbol) {
  return arbol.children
    .filter((n) => n.type === 'mdxJsxFlowElement' && n.name === 'Sesion')
    .map((n) => ({ ...atributos(n), nodo: n, palabras: contarPalabras(n) }));
}
