// Autoevaluación de confianza (1–5). No puntúa: se guarda para compararla al final del curso.
import { useEffect, useState } from 'preact/hooks';
import { leer, guardar } from '../../../lib/progreso';

export interface DatosAutoevaluacion { titulo: string; fase: 'inicial' | 'final'; intro: string; escala: string[]; items: { id: string; texto: string }[] }

export default function Autoevaluacion({ datos }: { datos: DatosAutoevaluacion }) {
  const [resp, setResp] = useState<Record<string, number>>({});
  const [inicial, setInicial] = useState<Record<string, number>>({});
  const [guardada, setGuardada] = useState(false);

  useEffect(() => {
    const p = leer();
    setResp(p.autoevaluacion[datos.fase] ?? {});
    setInicial(p.autoevaluacion.inicial ?? {});
    setGuardada(Boolean(p.autoevaluacion[datos.fase]));
  }, []);

  const completa = datos.items.every((i) => resp[i.id]);
  const elegir = (id: string, v: number) => { setResp((prev) => ({ ...prev, [id]: v })); setGuardada(false); };
  const guardarTodo = () => {
    const p = leer();
    p.autoevaluacion[datos.fase] = resp;
    if (guardar(p)) setGuardada(true);
  };
  const media = (r: Record<string, number>) => {
    const v = datos.items.map((i) => r[i.id]).filter(Boolean);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
  };
  const hayInicial = Object.keys(inicial).length > 0;

  return (
    <div class="grid gap-4">
      <p class="m-0">{datos.intro}</p>
      <ol class="list-none m-0 p-0 grid gap-3">
        {datos.items.map((it, n) => (
          <li key={it.id} class="rounded-xl border border-borde bg-superficie p-3.5 grid gap-2">
            <p class="m-0 font-medium" id={`ae-${datos.fase}-${it.id}`}>{n + 1}. {it.texto}</p>
            <div class="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={`ae-${datos.fase}-${it.id}`}>
              {datos.escala.map((e, v) => (
                <button key={v} type="button" role="radio" aria-checked={resp[it.id] === v + 1} class="opcion w-auto min-w-11 justify-center" aria-pressed={resp[it.id] === v + 1} aria-label={`${v + 1}: ${e}`} onClick={() => elegir(it.id, v + 1)}>
                  <span class="mono">{v + 1}</span>
                </button>
              ))}
            </div>
            {datos.fase === 'final' && hayInicial && inicial[it.id] && resp[it.id] && (
              <p class="m-0 text-sm tenue">Al empezar: {inicial[it.id]} · Ahora: {resp[it.id]} ({resp[it.id] - inicial[it.id] >= 0 ? '+' : ''}{resp[it.id] - inicial[it.id]})</p>
            )}
          </li>
        ))}
      </ol>
      <p class="m-0 text-sm tenue">Escala: {datos.escala.map((e, i) => `${i + 1} = ${e}`).join(' · ')}</p>
      <div class="flex flex-wrap gap-2 items-center">
        <button type="button" class="boton" disabled={!completa} onClick={guardarTodo}>Guardar mi autoevaluación</button>
        {!completa && <span class="text-sm tenue">Responde las {datos.items.length} afirmaciones para poder guardarla.</span>}
      </div>
      <div aria-live="polite">
        {guardada && datos.fase === 'inicial' && <p class="retro retro-ok m-0">Guardada en este dispositivo ({media(resp).toLocaleString('es-ES', { maximumFractionDigits: 1 })} de media). No puntúa: al terminar el curso la compararás con la final.</p>}
        {guardada && datos.fase === 'final' && (
          <div class="retro retro-ok grid gap-2">
            <p class="m-0"><strong>Guardada.</strong> {hayInicial ? `Media al empezar: ${media(inicial).toLocaleString('es-ES', { maximumFractionDigits: 1 })} · media ahora: ${media(resp).toLocaleString('es-ES', { maximumFractionDigits: 1 })}.` : 'No hay autoevaluación inicial guardada en este dispositivo para comparar.'}</p>
            {hayInicial && (
              <div class="grid gap-1" role="img" aria-label="Comparación de la media inicial y la final">
                {[['Al empezar', media(inicial)], ['Ahora', media(resp)]].map(([t, m]) => (
                  <div key={String(t)} class="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-2 text-sm">
                    <span>{t}</span>
                    <span class="h-3 rounded bg-superficie-2 overflow-hidden"><span class="block h-full bg-l1" style={`width:${(Number(m) / 5) * 100}%`} /></span>
                    <span class="mono text-right">{Number(m).toLocaleString('es-ES', { maximumFractionDigits: 1 })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
