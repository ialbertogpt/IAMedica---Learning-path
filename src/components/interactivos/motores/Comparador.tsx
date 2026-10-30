// Motor «comparador»: dos o más versiones lado a lado (apiladas en el móvil).
// Se usa para antes/después de un prompt, con y sin material, complacencia, diapositivas…
import { useState } from 'preact/hooks';

export interface VersionComparador {
  titulo: string;
  entrada?: string;
  etiquetaEntrada?: string;
  respuesta: string[];
  procedencia: string;
  observaciones?: string[];
}
export interface DatosComparador {
  titulo: string;
  instrucciones?: string;
  versiones: VersionComparador[];
  pregunta?: string;
  conclusion: string;
}

export default function Comparador({ datos }: { datos: DatosComparador }) {
  const [revelado, setRevelado] = useState(!datos.pregunta);
  return (
    <div class="grid gap-3">
      {datos.instrucciones && <p class="m-0">{datos.instrucciones}</p>}
      <div class={`grid gap-3 ${datos.versiones.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {datos.versiones.map((v, i) => (
          <article key={i} class="rounded-xl border border-borde bg-superficie p-3.5 grid gap-2.5 content-start">
            <h4 class="m-0 text-[17px]">{v.titulo}</h4>
            {v.entrada && (
              <div class="rounded-lg bg-superficie-2 border border-borde p-2.5">
                <p class="eyebrow m-0 mb-1">{v.etiquetaEntrada ?? 'Lo que escribes'}</p>
                <p class="m-0 text-base whitespace-pre-wrap">{v.entrada}</p>
              </div>
            )}
            <div class="rounded-lg border border-borde p-2.5 grid gap-2">
              <p class="eyebrow m-0">Respuesta · {v.procedencia}</p>
              {v.respuesta.map((p, j) => <p key={j} class="m-0 text-base whitespace-pre-wrap">{p}</p>)}
            </div>
            {revelado && v.observaciones && (
              <ul class="m-0 pl-5 text-base grid gap-1">{v.observaciones.map((o, k) => <li key={k}>{o}</li>)}</ul>
            )}
          </article>
        ))}
      </div>
      {!revelado ? (
        <div class="retro retro-neutra grid gap-2">
          <p class="m-0 font-semibold">{datos.pregunta}</p>
          <button type="button" class="boton boton-peq justify-self-start" onClick={() => setRevelado(true)}>Ver qué ha cambiado</button>
        </div>
      ) : (
        <p class="cuadro cuadro-analogia m-0 text-base">{datos.conclusion}</p>
      )}
    </div>
  );
}
