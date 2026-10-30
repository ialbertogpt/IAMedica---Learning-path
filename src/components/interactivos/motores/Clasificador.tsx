// Motor «clasificador»: cada tarjeta se asigna a una categoría y se explica por qué.
import { useState } from 'preact/hooks';

export interface DatosClasificador {
  titulo: string;
  instrucciones: string;
  categorias: { id: string; nombre: string; descripcion?: string }[];
  items: { texto: string; detalle?: string; categoria: string; explicacion: string }[];
  cierre?: string;
}

export default function Clasificador({ datos }: { datos: DatosClasificador }) {
  const [respuestas, setRespuestas] = useState<Record<number, string[]>>({});
  const nombre = (id: string) => datos.categorias.find((c) => c.id === id)?.nombre ?? id;
  const resuelto = (i: number) => (respuestas[i] ?? []).includes(datos.items[i].categoria);
  const aLaPrimera = datos.items.filter((it, i) => respuestas[i]?.[0] === it.categoria).length;
  const nResueltos = datos.items.filter((_, i) => resuelto(i)).length;

  const elegir = (i: number, cat: string) => {
    if (resuelto(i)) return;
    setRespuestas((r) => ({ ...r, [i]: [...(r[i] ?? []), cat] }));
  };

  return (
    <div class="grid gap-3">
      <p class="m-0">{datos.instrucciones}</p>
      {datos.categorias.some((c) => c.descripcion) && (
        <ul class="m-0 pl-5 text-base tenue">
          {datos.categorias.map((c) => <li key={c.id}><strong class="text-tinta">{c.nombre}:</strong> {c.descripcion}</li>)}
        </ul>
      )}
      <ol class="list-none m-0 p-0 grid gap-3">
        {datos.items.map((it, i) => {
          const elegidas = respuestas[i] ?? [];
          const ultima = elegidas[elegidas.length - 1];
          const ok = resuelto(i);
          return (
            <li key={i} class="tarjeta p-4 grid gap-2">
              <p class="m-0 font-bold">{it.texto}</p>
              {it.detalle && <p class="m-0 text-base tenue">{it.detalle}</p>}
              <div class="flex flex-wrap gap-2" role="group" aria-label={`Clasifica: ${it.texto}`}>
                {datos.categorias.map((c) => {
                  const marcada = elegidas.includes(c.id);
                  const clase = marcada ? (c.id === it.categoria ? 'correcta' : 'incorrecta') : '';
                  return (
                    <button key={c.id} type="button" class={`opcion w-auto ${clase}`} aria-pressed={marcada} disabled={ok && !marcada} onClick={() => elegir(i, c.id)}>
                      {c.nombre}
                    </button>
                  );
                })}
              </div>
              {ultima && (
                <p class={`retro m-0 ${ok ? 'retro-ok' : 'retro-mal'}`} aria-live="polite">
                  {ok ? <><strong>✓ {nombre(it.categoria)}.</strong> {it.explicacion}</> : <><strong>✗ No es «{nombre(ultima)}».</strong> Prueba otra vez.</>}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <p class="m-0 text-base" aria-live="polite"><strong>{nResueltos} de {datos.items.length}</strong> clasificadas · {aLaPrimera} a la primera.</p>
      {nResueltos === datos.items.length && datos.cierre && <p class="retro retro-neutra m-0">{datos.cierre}</p>}
      {nResueltos > 0 && <button type="button" class="boton boton-sec boton-peq justify-self-start" onClick={() => setRespuestas({})}>Empezar de nuevo</button>}
    </div>
  );
}
