// Estructura del curso (src/data/curso.json) combinada con los subcapítulos ya escritos.
import { getCollection, type CollectionEntry } from 'astro:content';
import curso from '../data/curso.json';

export interface SesionInfo { n: number; titulo: string; minutos: number }
export interface SubInfo {
  id: string; numero: string; parte: number; titulo: string; slug: string; icono: string;
  minutosPlan: number; sesionesPlan: number; requiere: string[]; nota?: string; expres: boolean;
  construido: boolean; minutos: number; sesiones: SesionInfo[];
}

// Mismo patrón que valida scripts/validar-contenido.mjs: <Sesion n={1} titulo="…" minutos={20}>
const RE_SESION = /<Sesion\s+n=\{(\d+)\}\s+titulo="([^"]+)"\s+minutos=\{(\d+)\}\s*>/g;

export function extraerSesiones(cuerpo: string | undefined): SesionInfo[] {
  return [...(cuerpo ?? '').matchAll(RE_SESION)].map((m) => ({ n: Number(m[1]), titulo: m[2], minutos: Number(m[3]) }));
}

export const partes = curso.partes;
export const minutosTotalesPlan = curso.minutosTotalesPlan;
export const sesionesPorSemana = curso.sesionesPorSemana;

export async function subcapitulos(): Promise<SubInfo[]> {
  const entradas = await getCollection('partes');
  const porId = new Map<string, CollectionEntry<'partes'>>(entradas.map((e) => [e.data.id, e]));
  return curso.subcapitulos.map((s) => {
    const e = porId.get(s.id);
    if (e && e.id !== s.slug) throw new Error(`[curso] ${s.id}: el archivo está en «${e.id}», pero curso.json espera «${s.slug}»`);
    return {
      ...s,
      construido: Boolean(e),
      minutos: e ? e.data.minutos : s.minutosPlan,
      sesiones: e ? extraerSesiones(e.body) : [],
    };
  });
}

export function infoParte(n: number) {
  const p = curso.partes.find((x) => x.n === n);
  if (!p) throw new Error(`[curso] Parte ${n} inexistente`);
  return p;
}
