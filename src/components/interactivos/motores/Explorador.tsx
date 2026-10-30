// Motor «explorador»: elementos filtrables por categoría con ficha desplegable.
// Sirve para líneas temporales, galerías y mapas (1.2, 1.7, 1.8, 2.1…).
import { useState } from 'preact/hooks';

export interface ItemExplorador { id: string; etiqueta?: string; titulo: string; categoria: string; detalle: string; fuente?: string }
export interface DatosExplorador {
  titulo: string;
  instrucciones?: string;
  categorias: { id: string; nombre: string }[];
  items: ItemExplorador[];
  nota?: string;
  modo?: 'linea' | 'tarjetas';
}

export default function Explorador({ datos }: { datos: DatosExplorador }) {
  const [filtro, setFiltro] = useState<string>('todas');
  const [abierto, setAbierto] = useState<string | null>(null);
  const nombre = (id: string) => datos.categorias.find((c) => c.id === id)?.nombre ?? id;
  const visibles = datos.items.filter((i) => filtro === 'todas' || i.categoria === filtro);
  const linea = datos.modo !== 'tarjetas';

  return (
    <div class="grid gap-3">
      {datos.instrucciones && <p class="m-0">{datos.instrucciones}</p>}
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {[{ id: 'todas', nombre: 'Todas' }, ...datos.categorias].map((c) => (
          <button key={c.id} type="button" class="opcion w-auto min-h-11 py-1.5" aria-pressed={filtro === c.id} onClick={() => setFiltro(c.id)}>{c.nombre}</button>
        ))}
      </div>
      <p class="m-0 text-sm tenue" aria-live="polite">{visibles.length} elementos</p>
      <ol class={`list-none m-0 p-0 grid gap-2 ${linea ? '' : 'sm:grid-cols-2'}`}>
        {visibles.map((i) => {
          const abierta = abierto === i.id;
          return (
            <li key={i.id} class="rounded-xl border border-borde bg-superficie">
              <button type="button" class="w-full text-left flex gap-3 items-start px-3.5 py-3 min-h-12 bg-transparent border-0 cursor-pointer" aria-expanded={abierta} onClick={() => setAbierto(abierta ? null : i.id)}>
                {i.etiqueta && <span class="mono text-[13px] font-medium text-l1 w-12 flex-none pt-0.5">{i.etiqueta}</span>}
                <span class="flex-1 min-w-0">
                  <span class="block font-semibold leading-snug">{i.titulo}</span>
                  <span class="block text-sm tenue">{nombre(i.categoria)}</span>
                </span>
                <span aria-hidden="true" class="text-tinta-3 pt-0.5">{abierta ? '−' : '+'}</span>
              </button>
              {abierta && (
                <div class="px-3.5 pb-3.5 pt-0 grid gap-1.5 text-base">
                  <p class="m-0">{i.detalle}</p>
                  {i.fuente && <p class="m-0 text-sm tenue"><strong>Fuente:</strong> {i.fuente}</p>}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {datos.nota && <p class="m-0 text-sm tenue">{datos.nota}</p>}
    </div>
  );
}
