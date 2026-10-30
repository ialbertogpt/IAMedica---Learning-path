// Motor de tests: opción única, escenario, verdadero/falso, ordenar y emparejar.
// Retroalimentación inmediata, reintentos ilimitados y sin penalización.
import { useEffect, useMemo, useState } from 'preact/hooks';
import { registrarTest, leer } from '../../../lib/progreso';
import { barajar } from '../../../lib/azar';

interface Opcion { texto: string; correcta: boolean; explicacion: string }
type Pregunta =
  | { tipo: 'unica' | 'escenario'; enunciado: string; caso?: string; opciones: Opcion[] }
  | { tipo: 'vf'; enunciado: string; caso?: string; respuesta: boolean; explicacionVerdadero: string; explicacionFalso: string }
  | { tipo: 'ordenar'; enunciado: string; caso?: string; pasos: { texto: string; porque: string }[] }
  | { tipo: 'emparejar'; enunciado: string; caso?: string; pares: { izquierda: string; derecha: string; porque: string }[] };

interface Props { id: string; preguntas: Pregunta[] }

const ETIQUETA: Record<Pregunta['tipo'], string> = {
  unica: 'Elige una respuesta', escenario: '¿Qué harías?', vf: 'Verdadero o falso', ordenar: 'Ordena los pasos', emparejar: 'Empareja',
};

export default function Test({ id, preguntas }: Props) {
  const [ronda, setRonda] = useState(0);
  const [resueltas, setResueltas] = useState<Record<number, boolean>>({});
  const [primera, setPrimera] = useState<Record<number, boolean>>({});
  const [previo, setPrevio] = useState<string | null>(null);

  useEffect(() => {
    const r = leer().tests[id];
    if (r?.superado) setPrevio(`Ya superaste este test (${r.aciertosPrimera} de ${r.total} a la primera).`);
  }, [id]);

  const total = preguntas.length;
  const nResueltas = Object.values(resueltas).filter(Boolean).length;
  const nPrimera = Object.values(primera).filter(Boolean).length;
  const terminado = nResueltas === total;

  useEffect(() => {
    if (terminado) registrarTest(id, nPrimera, total);
  }, [terminado]);

  const alResolver = (i: number, aLaPrimera: boolean) => {
    setPrimera((p) => (i in p ? p : { ...p, [i]: aLaPrimera }));
    setResueltas((r) => ({ ...r, [i]: true }));
  };
  const alFallar = (i: number) => setPrimera((p) => (i in p ? p : { ...p, [i]: false }));

  return (
    <div class="grid gap-5 mt-4" key={ronda}>
      {previo && <p class="retro retro-neutra m-0">{previo}</p>}
      {preguntas.map((p, i) => (
        <fieldset class="tarjeta m-0 grid gap-3" key={`${ronda}-${i}`}>
          <legend class="sr-only">Pregunta {i + 1} de {total}</legend>
          <p class="eyebrow m-0">Pregunta {i + 1} de {total} · {ETIQUETA[p.tipo]}</p>
          {p.caso && <p class="cuadro cuadro-caso m-0 text-base">{p.caso}</p>}
          <p class="m-0 font-bold">{p.enunciado}</p>
          {(p.tipo === 'unica' || p.tipo === 'escenario') && (
            <Unica p={p} semilla={`${id}-${i}-${ronda}`} onResuelta={(a) => alResolver(i, a)} onFallo={() => alFallar(i)} />
          )}
          {p.tipo === 'vf' && <VerdaderoFalso p={p} onResuelta={(a) => alResolver(i, a)} onFallo={() => alFallar(i)} />}
          {p.tipo === 'ordenar' && <Ordenar p={p} semilla={`${id}-${i}-${ronda}`} onResuelta={(a) => alResolver(i, a)} onFallo={() => alFallar(i)} />}
          {p.tipo === 'emparejar' && <Emparejar p={p} semilla={`${id}-${i}-${ronda}`} onResuelta={(a) => alResolver(i, a)} onFallo={() => alFallar(i)} />}
        </fieldset>
      ))}
      <div class="tarjeta grid gap-2" aria-live="polite">
        <p class="m-0"><strong>{nResueltas} de {total}</strong> preguntas resueltas · {nPrimera} acertadas a la primera.</p>
        {terminado && (
          <p class="retro retro-ok m-0">
            ¡Test completado! Queda guardado en tu progreso. {nPrimera < total ? 'Repasa las explicaciones de las que fallaste: es donde más se aprende.' : 'Todas a la primera.'}
          </p>
        )}
        <button type="button" class="boton boton-sec boton-peq justify-self-start" onClick={() => { setRonda((r) => r + 1); setResueltas({}); setPrimera({}); }}>
          Repetir el test
        </button>
      </div>
    </div>
  );
}

interface SubProps<T> { p: T; semilla?: string; onResuelta: (aLaPrimera: boolean) => void; onFallo: () => void }

function Unica({ p, semilla, onResuelta, onFallo }: SubProps<{ opciones: Opcion[] }>) {
  const orden = useMemo(() => barajar(p.opciones.map((_, i) => i), semilla!), [semilla]);
  const [elegidas, setElegidas] = useState<number[]>([]);
  const [verTodas, setVerTodas] = useState(false);
  const resuelta = elegidas.some((i) => p.opciones[i].correcta);
  const ultima = elegidas[elegidas.length - 1];

  const elegir = (i: number) => {
    if (resuelta || elegidas.includes(i)) return;
    const nuevas = [...elegidas, i];
    setElegidas(nuevas);
    if (p.opciones[i].correcta) onResuelta(nuevas.length === 1); else onFallo();
  };

  return (
    <div class="grid gap-2">
      {orden.map((i, k) => {
        const o = p.opciones[i];
        const marcada = elegidas.includes(i);
        const mostrar = marcada || (resuelta && verTodas);
        return (
          <div key={i}>
            <button
              type="button"
              class={`opcion ${marcada ? (o.correcta ? 'correcta' : 'incorrecta') : ''}`}
              aria-pressed={marcada}
              disabled={resuelta && !marcada}
              onClick={() => elegir(i)}
            >
              <span aria-hidden="true" class="font-bold">{String.fromCharCode(65 + k)}.</span>
              <span>{o.texto}{marcada && <span class="sr-only">{o.correcta ? ' (correcta)' : ' (incorrecta)'}</span>}</span>
            </button>
            {mostrar && (
              <p class={`retro ${o.correcta ? 'retro-ok' : 'retro-mal'}`} aria-live={i === ultima ? 'polite' : undefined}>
                <strong>{o.correcta ? '✓ Correcta. ' : '✗ No es la mejor. '}</strong>{o.explicacion}
              </p>
            )}
          </div>
        );
      })}
      {!resuelta && elegidas.length > 0 && <p class="m-0 text-base tenue">Prueba con otra opción.</p>}
      {resuelta && !verTodas && (
        <button type="button" class="boton boton-sec boton-peq justify-self-start" onClick={() => setVerTodas(true)}>Ver por qué las demás no</button>
      )}
    </div>
  );
}

function VerdaderoFalso({ p, onResuelta, onFallo }: SubProps<{ respuesta: boolean; explicacionVerdadero: string; explicacionFalso: string }>) {
  const [elegidas, setElegidas] = useState<boolean[]>([]);
  const resuelta = elegidas.includes(p.respuesta);
  const elegir = (v: boolean) => {
    if (resuelta || elegidas.includes(v)) return;
    const nuevas = [...elegidas, v];
    setElegidas(nuevas);
    if (v === p.respuesta) onResuelta(nuevas.length === 1); else onFallo();
  };
  return (
    <div class="grid gap-2">
      <div class="flex gap-2 flex-wrap">
        {[true, false].map((v) => {
          const marcada = elegidas.includes(v);
          return (
            <button key={String(v)} type="button" class={`opcion w-auto min-w-36 justify-center ${marcada ? (v === p.respuesta ? 'correcta' : 'incorrecta') : ''}`} aria-pressed={marcada} disabled={resuelta && !marcada} onClick={() => elegir(v)}>
              {v ? 'Verdadero' : 'Falso'}
            </button>
          );
        })}
      </div>
      {elegidas.map((v) => (
        <p key={String(v)} class={`retro ${v === p.respuesta ? 'retro-ok' : 'retro-mal'}`} aria-live="polite">
          <strong>{v === p.respuesta ? '✓ Correcto. ' : '✗ No. '}</strong>{v ? p.explicacionVerdadero : p.explicacionFalso}
        </p>
      ))}
    </div>
  );
}

function Ordenar({ p, semilla, onResuelta, onFallo }: SubProps<{ pasos: { texto: string; porque: string }[] }>) {
  const inicial = useMemo(() => {
    const idx = p.pasos.map((_, i) => i);
    let o = barajar(idx, semilla!);
    if (o.every((v, i) => v === i)) o = [...o.slice(1), o[0]];
    return o;
  }, [semilla]);
  const [orden, setOrden] = useState(inicial);
  const [comprobado, setComprobado] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const correcto = orden.every((v, i) => v === i);
  const resuelta = comprobado && correcto;

  const mover = (pos: number, d: -1 | 1) => {
    const destino = pos + d;
    if (destino < 0 || destino >= orden.length || resuelta) return;
    const n = [...orden];
    [n[pos], n[destino]] = [n[destino], n[pos]];
    setOrden(n);
    setComprobado(false);
  };
  const comprobar = () => {
    setComprobado(true);
    const nIntentos = intentos + 1;
    setIntentos(nIntentos);
    if (correcto) onResuelta(nIntentos === 1); else onFallo();
  };

  return (
    <div class="grid gap-2">
      <ol class="list-none m-0 p-0 grid gap-2">
        {orden.map((v, pos) => {
          const bien = comprobado && v === pos;
          const mal = comprobado && v !== pos;
          return (
            <li key={v} class={`opcion cursor-default ${bien ? 'correcta' : ''} ${mal ? 'incorrecta' : ''}`}>
              <span class="font-bold" aria-hidden="true">{pos + 1}.</span>
              <span class="flex-1">
                {p.pasos[v].texto}
                {mal && <span class="sr-only"> (posición incorrecta)</span>}
                {resuelta && <span class="block text-base tenue mt-1">{p.pasos[v].porque}</span>}
              </span>
              {!resuelta && (
                <span class="flex gap-1 flex-none">
                  <button type="button" class="boton boton-sec boton-peq px-3" aria-label={`Subir «${p.pasos[v].texto}»`} disabled={pos === 0} onClick={() => mover(pos, -1)}>↑</button>
                  <button type="button" class="boton boton-sec boton-peq px-3" aria-label={`Bajar «${p.pasos[v].texto}»`} disabled={pos === orden.length - 1} onClick={() => mover(pos, 1)}>↓</button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {!resuelta && <button type="button" class="boton boton-peq justify-self-start" onClick={comprobar}>Comprobar el orden</button>}
      {comprobado && !correcto && <p class="retro retro-mal m-0" aria-live="polite">Hay pasos fuera de sitio (marcados en rojo). Muévelos y vuelve a comprobar.</p>}
      {resuelta && <p class="retro retro-ok m-0" aria-live="polite"><strong>✓ Orden correcto.</strong> Debajo de cada paso tienes por qué va ahí.</p>}
    </div>
  );
}

function Emparejar({ p, semilla, onResuelta, onFallo }: SubProps<{ pares: { izquierda: string; derecha: string; porque: string }[] }>) {
  const derechas = useMemo(() => barajar(p.pares.map((_, i) => i), semilla!), [semilla]);
  const [eleccion, setEleccion] = useState<Record<number, number>>({});
  const [comprobado, setComprobado] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const completo = p.pares.every((_, i) => i in eleccion);
  const correcto = p.pares.every((_, i) => eleccion[i] === i);
  const resuelta = comprobado && correcto;

  const comprobar = () => {
    setComprobado(true);
    const n = intentos + 1;
    setIntentos(n);
    if (correcto) onResuelta(n === 1); else onFallo();
  };

  return (
    <div class="grid gap-3">
      {p.pares.map((par, i) => {
        const bien = comprobado && eleccion[i] === i;
        const mal = comprobado && eleccion[i] !== i;
        return (
          <div key={i} class={`opcion cursor-default flex-col sm:flex-row sm:items-center ${bien ? 'correcta' : ''} ${mal ? 'incorrecta' : ''}`}>
            <label class="flex-1 font-bold" for={`${semilla}-sel-${i}`}>{par.izquierda}</label>
            <select
              id={`${semilla}-sel-${i}`}
              class="min-h-11 w-full sm:w-auto sm:max-w-[55%] rounded-lg border border-borde bg-superficie px-2 text-base"
              value={eleccion[i] ?? ''}
              disabled={resuelta}
              onChange={(e) => { const v = Number((e.target as HTMLSelectElement).value); setEleccion((prev) => ({ ...prev, [i]: v })); setComprobado(false); }}
            >
              <option value="" disabled>Elige…</option>
              {derechas.map((d) => <option key={d} value={d}>{p.pares[d].derecha}</option>)}
            </select>
            {resuelta && <span class="block text-base tenue w-full">{par.porque}</span>}
          </div>
        );
      })}
      {!resuelta && <button type="button" class="boton boton-peq justify-self-start" disabled={!completo} onClick={comprobar}>Comprobar</button>}
      {comprobado && !correcto && <p class="retro retro-mal m-0" aria-live="polite">Hay parejas que no encajan (en rojo). Cámbialas y vuelve a comprobar.</p>}
      {resuelta && <p class="retro retro-ok m-0" aria-live="polite"><strong>✓ Todas las parejas son correctas.</strong></p>}
    </div>
  );
}
