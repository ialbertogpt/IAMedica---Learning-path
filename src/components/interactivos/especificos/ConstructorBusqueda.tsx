// Constructor visual de búsquedas para PubMed: conceptos (P, I, C, O…) con sinónimos, MeSH y [tiab],
// que se combinan con OR dentro de cada concepto y AND entre conceptos. Genera la cadena y un enlace
// que abre PubMed en una pestaña nueva: no hay API, ni clave, ni se envía nada hasta que pulsas el enlace.
import { useMemo, useState } from 'preact/hooks';

export interface ConceptoBusqueda { id: string; nombre: string; ayuda: string; mesh: string; sinonimos: string }
export interface DatosConstructorBusqueda {
  conceptos: ConceptoBusqueda[];
  filtros?: { id: string; nombre: string; cadena: string; activo?: boolean }[];
  nota?: string;
}

const lineas = (s: string) => s.split(/[\n,;]+/).map((x) => x.trim()).filter(Boolean);
const entrecomillar = (t: string) => (/\s/.test(t) ? `"${t}"` : t);

export default function ConstructorBusqueda({ datos }: { datos: DatosConstructorBusqueda }) {
  const [valores, setValores] = useState<Record<string, { mesh: string; sinonimos: string }>>(
    Object.fromEntries(datos.conceptos.map((c) => [c.id, { mesh: c.mesh, sinonimos: c.sinonimos }])),
  );
  const [filtros, setFiltros] = useState<Record<string, boolean>>(Object.fromEntries((datos.filtros ?? []).map((f) => [f.id, !!f.activo])));
  const [copiado, setCopiado] = useState(false);

  const cambiar = (id: string, campo: 'mesh' | 'sinonimos', v: string) => setValores((p) => ({ ...p, [id]: { ...p[id], [campo]: v } }));

  const { cadena, bloques, vacios } = useMemo(() => {
    const bl: { id: string; texto: string }[] = [];
    const vac: string[] = [];
    for (const c of datos.conceptos) {
      const v = valores[c.id];
      const partes = [
        ...lineas(v.mesh).map((m) => `${entrecomillar(m)}[mh]`),
        ...lineas(v.sinonimos).map((s) => `${entrecomillar(s)}[tiab]`),
      ];
      if (!partes.length) { vac.push(c.nombre); continue; }
      bl.push({ id: c.id, texto: partes.length > 1 ? `(${partes.join(' OR ')})` : partes[0] });
    }
    const extra = (datos.filtros ?? []).filter((f) => filtros[f.id]).map((f) => f.cadena);
    const todo = [...bl.map((b) => b.texto), ...extra];
    return { cadena: todo.join(' AND '), bloques: bl, vacios: vac };
  }, [valores, filtros, datos]);

  const enlace = cadena ? `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(cadena)}` : '';
  const copiar = async () => {
    try { await navigator.clipboard.writeText(cadena); setCopiado(true); setTimeout(() => setCopiado(false), 1800); } catch { /* sin portapapeles: se puede seleccionar el texto */ }
  };

  return (
    <div class="grid gap-4">
      <div class="grid gap-3 md:grid-cols-2">
        {datos.conceptos.map((c) => (
          <fieldset key={c.id} class="rounded-xl border border-borde bg-superficie p-3.5 grid gap-2 m-0 min-w-0">
            <legend class="font-semibold px-1">{c.nombre}</legend>
            <p class="m-0 text-sm tenue">{c.ayuda}</p>
            <label class="grid gap-1 text-sm" for={`cb-${c.id}-mesh`}><span class="font-semibold">Términos MeSH (uno por línea)</span>
              <textarea id={`cb-${c.id}-mesh`} rows={2} class="w-full rounded-lg border border-borde bg-fondo p-2 text-base mono" value={valores[c.id].mesh} onInput={(e) => cambiar(c.id, 'mesh', (e.target as HTMLTextAreaElement).value)} />
            </label>
            <label class="grid gap-1 text-sm" for={`cb-${c.id}-tiab`}><span class="font-semibold">Palabras en título o resumen (uno por línea)</span>
              <textarea id={`cb-${c.id}-tiab`} rows={3} class="w-full rounded-lg border border-borde bg-fondo p-2 text-base mono" value={valores[c.id].sinonimos} onInput={(e) => cambiar(c.id, 'sinonimos', (e.target as HTMLTextAreaElement).value)} />
            </label>
          </fieldset>
        ))}
      </div>

      {(datos.filtros ?? []).length > 0 && (
        <fieldset class="rounded-xl border border-borde bg-superficie p-3.5 grid gap-2 m-0">
          <legend class="font-semibold px-1">Filtros (se añaden con AND)</legend>
          {(datos.filtros ?? []).map((f) => (
            <label key={f.id} class="flex gap-2 items-center min-h-11"><input type="checkbox" class="size-5" checked={!!filtros[f.id]} onChange={(e) => setFiltros((p) => ({ ...p, [f.id]: (e.target as HTMLInputElement).checked }))} /> <span>{f.nombre} <span class="mono text-sm tenue">{f.cadena}</span></span></label>
          ))}
        </fieldset>
      )}

      <div class="rounded-xl border border-borde bg-superficie p-3.5 grid gap-2.5" aria-live="polite">
        <p class="eyebrow m-0">Tu cadena de búsqueda</p>
        {cadena ? (
          <>
            <ol class="m-0 pl-5 grid gap-1 text-sm">
              {bloques.map((b) => <li key={b.id}><span class="font-semibold">{datos.conceptos.find((c) => c.id === b.id)?.nombre}: </span><span class="mono">{b.texto}</span></li>)}
            </ol>
            <p class="m-0 mono text-[15px] break-words rounded-lg bg-fondo border border-borde p-2.5 select-all" tabIndex={0} aria-label="Cadena de búsqueda completa">{cadena}</p>
            <div class="flex gap-2 flex-wrap">
              <a class="boton" href={enlace} target="_blank" rel="noopener noreferrer">Abrir en PubMed (pestaña nueva)</a>
              <button type="button" class="boton boton-sec" onClick={copiar}>{copiado ? 'Copiada' : 'Copiar la cadena'}</button>
            </div>
          </>
        ) : <p class="m-0">Escribe al menos un término para ver la cadena.</p>}
        {vacios.length > 0 && cadena && <p class="m-0 text-sm tenue">Conceptos sin términos (no se incluyen): {vacios.join(', ')}.</p>}
      </div>
      {datos.nota && <p class="m-0 text-sm tenue">{datos.nota}</p>}
    </div>
  );
}
