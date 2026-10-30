// Motor «encuentra el error»: un texto (p. ej., una respuesta de IA) con frases clicables.
// El alumno marca las que cree erróneas y al comprobar se explican aciertos, fallos y falsas alarmas.
import { useState } from 'preact/hooks';

export interface Bloque { texto: string; error?: boolean; explicacion?: string }
export interface DatosEncuentraError {
  titulo: string;
  pregunta: string;
  procedencia: string;
  instrucciones: string;
  parrafos: Bloque[][];
  conclusion: string;
  /** Palabra para lo que hay que encontrar (por defecto «errores») */
  hallazgo?: string;
}

export default function EncuentraError({ datos }: { datos: DatosEncuentraError }) {
  const [marcadas, setMarcadas] = useState<Set<string>>(new Set());
  const [comprobado, setComprobado] = useState(false);
  const todos = datos.parrafos.flatMap((p, i) => p.map((b, j) => ({ ...b, clave: `${i}-${j}` })));
  const errores = todos.filter((b) => b.error);
  const encontrados = errores.filter((b) => marcadas.has(b.clave)).length;
  const falsasAlarmas = todos.filter((b) => !b.error && marcadas.has(b.clave)).length;

  const alternar = (clave: string) => {
    if (comprobado) return;
    // Actualización funcional: dos toques seguidos no deben pisarse.
    setMarcadas((previas) => {
      const n = new Set(previas);
      if (n.has(clave)) n.delete(clave); else n.add(clave);
      return n;
    });
  };

  return (
    <div class="grid gap-3">
      <p class="m-0">{datos.instrucciones}</p>
      <div class="rounded-lg border border-borde bg-superficie-2 p-3">
        <p class="m-0 text-base"><strong>Pregunta del usuario:</strong> {datos.pregunta}</p>
      </div>
      <div class="rounded-lg border border-borde p-4 grid gap-3 bg-superficie">
        <p class="eyebrow m-0">Respuesta · {datos.procedencia}</p>
        {datos.parrafos.map((p, i) => (
          <p key={i} class="m-0 leading-relaxed">
            {p.map((b, j) => {
              const clave = `${i}-${j}`;
              const marcada = marcadas.has(clave);
              let clase = marcada ? 'bg-[color-mix(in_srgb,var(--acento)_22%,transparent)] outline outline-2 outline-[var(--acento)]' : '';
              if (comprobado && b.error) clase = marcada ? 'bg-[var(--ok-fondo)] outline outline-2 outline-[var(--ok)]' : 'bg-[var(--mal-fondo)] outline outline-2 outline-dashed outline-[var(--mal)]';
              if (comprobado && !b.error && marcada) clase = 'outline outline-2 outline-dashed outline-[var(--tinta-2)]';
              return (
                <span key={j}>
                  <button
                    type="button"
                    class={`inline text-left rounded px-0.5 cursor-pointer underline decoration-dotted decoration-[var(--tinta-2)] underline-offset-4 hover:bg-[color-mix(in_srgb,var(--l1)_10%,transparent)] ${clase}`}
                    aria-pressed={marcada}
                    disabled={comprobado}
                    onClick={() => alternar(clave)}
                  >{b.texto}</button>{' '}
                </span>
              );
            })}
          </p>
        ))}
      </div>
      {!comprobado ? (
        <div class="flex flex-wrap gap-2 items-center">
          <button type="button" class="boton boton-peq" onClick={() => setComprobado(true)}>Comprobar ({marcadas.size} marcadas)</button>
          <span class="text-base tenue">Toca una frase para marcarla; tócala otra vez para desmarcarla.</span>
        </div>
      ) : (
        <div class="grid gap-2" aria-live="polite">
          <p class={`retro m-0 ${encontrados === errores.length && falsasAlarmas === 0 ? 'retro-ok' : 'retro-neutra'}`}>
            Has encontrado <strong>{encontrados} de {errores.length}</strong> {datos.hallazgo ?? 'errores'}{falsasAlarmas ? ` y has marcado ${falsasAlarmas} fragmento(s) que no lo eran` : ''}.
          </p>
          {errores.map((b) => (
            <p key={b.clave} class={`retro m-0 ${marcadas.has(b.clave) ? 'retro-ok' : 'retro-mal'}`}>
              <strong>{marcadas.has(b.clave) ? '✓ Lo has visto: ' : '✗ Se te ha escapado: '}</strong>«{b.texto}» — {b.explicacion}
            </p>
          ))}
          {todos.filter((b) => !b.error && marcadas.has(b.clave)).map((b) => (
            <p key={b.clave} class="retro retro-neutra m-0"><strong>Esta era correcta:</strong> «{b.texto}» {b.explicacion ? `— ${b.explicacion}` : ''}</p>
          ))}
          <p class="cuadro cuadro-analogia m-0 text-base">{datos.conclusion}</p>
          <button type="button" class="boton boton-sec boton-peq justify-self-start" onClick={() => { setMarcadas(new Set()); setComprobado(false); }}>Intentarlo de nuevo</button>
        </div>
      )}
    </div>
  );
}
