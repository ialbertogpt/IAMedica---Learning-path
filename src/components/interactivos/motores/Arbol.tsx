// Motor «árbol de decisión»: preguntas encadenadas con un resultado explicado.
// Sirve para elegir herramienta (2.4), prueba estadística (3.4) o casos ramificados (2.5).
import { useState } from 'preact/hooks';

export type NodoArbol =
  | { tipo: 'pregunta'; texto: string; ayuda?: string; opciones: { texto: string; siguiente: string }[] }
  | { tipo: 'resultado'; titulo: string; detalle: string; ojo?: string; fuente?: string };
export interface DatosArbol { titulo: string; instrucciones?: string; inicio: string; nodos: Record<string, NodoArbol>; nota?: string }

export default function Arbol({ datos }: { datos: DatosArbol }) {
  const [camino, setCamino] = useState<{ nodo: string; eleccion?: string }[]>([{ nodo: datos.inicio }]);
  const actual = camino[camino.length - 1];
  const nodo = datos.nodos[actual.nodo];

  const elegir = (texto: string, siguiente: string) => {
    const copia = camino.slice(0, -1);
    copia.push({ nodo: actual.nodo, eleccion: texto });
    copia.push({ nodo: siguiente });
    setCamino(copia);
  };
  const atras = () => {
    if (camino.length < 2) return;
    const copia = camino.slice(0, -1);
    copia[copia.length - 1] = { nodo: copia[copia.length - 1].nodo };
    setCamino(copia);
  };

  return (
    <div class="grid gap-3">
      {datos.instrucciones && <p class="m-0">{datos.instrucciones}</p>}
      {camino.length > 1 && (
        <ol class="list-none m-0 p-0 grid gap-1 text-sm tenue" aria-label="Tus respuestas hasta ahora">
          {camino.slice(0, -1).map((c, i) => {
            const n = datos.nodos[c.nodo];
            return <li key={i}>{n.tipo === 'pregunta' ? n.texto : ''} → <strong class="text-tinta">{c.eleccion}</strong></li>;
          })}
        </ol>
      )}
      <div class="rounded-xl border border-borde bg-superficie p-4 grid gap-3" aria-live="polite">
        {nodo.tipo === 'pregunta' ? (
          <>
            <p class="m-0 font-semibold text-[17px]">{nodo.texto}</p>
            {nodo.ayuda && <p class="m-0 text-base tenue">{nodo.ayuda}</p>}
            <div class="grid gap-2">
              {nodo.opciones.map((o) => <button key={o.texto} type="button" class="opcion" onClick={() => elegir(o.texto, o.siguiente)}>{o.texto}</button>)}
            </div>
          </>
        ) : (
          <>
            <p class="eyebrow m-0">Resultado</p>
            <p class="m-0 font-semibold text-[18px]">{nodo.titulo}</p>
            <p class="m-0">{nodo.detalle}</p>
            {nodo.ojo && <p class="retro retro-mal m-0"><strong>Ojo con: </strong>{nodo.ojo}</p>}
            {nodo.fuente && <p class="m-0 text-sm tenue">{nodo.fuente}</p>}
          </>
        )}
      </div>
      <div class="flex gap-2 flex-wrap">
        {camino.length > 1 && <button type="button" class="boton boton-sec boton-peq" onClick={atras}>← Una pregunta atrás</button>}
        {camino.length > 1 && <button type="button" class="boton boton-sec boton-peq" onClick={() => setCamino([{ nodo: datos.inicio }])}>Empezar de nuevo</button>}
      </div>
      {datos.nota && <p class="m-0 text-sm tenue">{datos.nota}</p>}
    </div>
  );
}
