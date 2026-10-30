// Minimodelo de lenguaje «de juguete»: cuenta qué palabra sigue a las dos anteriores en un
// pequeño corpus de frases ficticias. Las probabilidades y la temperatura son reales para este
// minimodelo; un LLM hace algo parecido a una escala muchísimo mayor y mirando todo el contexto.
import { useMemo, useState } from 'preact/hooks';
import { barajar } from '../../../lib/azar';

interface Props { frases: string[]; inicios: string[]; modo: 'siguiente' | 'temperatura' }
type Conteos = Map<string, Map<string, number>>;

const separar = (t: string) => t.toLowerCase().match(/[a-záéíóúüñ0-9]+|[.,;:]/g) ?? [];

function entrenar(frases: string[]) {
  const tri: Conteos = new Map();
  const bi: Conteos = new Map();
  const sumar = (m: Conteos, k: string, w: string) => {
    if (!m.has(k)) m.set(k, new Map());
    const c = m.get(k)!;
    c.set(w, (c.get(w) ?? 0) + 1);
  };
  for (const f of frases) {
    const p = ['<s>', '<s>', ...separar(f)];
    for (let i = 2; i < p.length; i++) {
      sumar(tri, `${p[i - 2]} ${p[i - 1]}`, p[i]);
      sumar(bi, p[i - 1], p[i]);
    }
  }
  return { tri, bi };
}

function distribucion(modelo: ReturnType<typeof entrenar>, palabras: string[], temperatura: number) {
  const p = ['<s>', '<s>', ...palabras];
  const a = p[p.length - 2];
  const b = p[p.length - 1];
  let conteos = modelo.tri.get(`${a} ${b}`);
  let nivel: 'dos' | 'una' = 'dos';
  if (!conteos) { conteos = modelo.bi.get(b); nivel = 'una'; }
  if (!conteos) return { nivel, items: [] as { palabra: string; p: number; n: number }[] };
  const pesos = [...conteos.entries()].map(([palabra, n]) => ({ palabra, n, w: Math.pow(n, 1 / temperatura) }));
  const total = pesos.reduce((s, x) => s + x.w, 0);
  const items = pesos.map((x) => ({ palabra: x.palabra, n: x.n, p: x.w / total })).sort((x, y) => y.p - x.p || x.palabra.localeCompare(y.palabra));
  return { nivel, items };
}

function sortear(items: { palabra: string; p: number }[]): string {
  let r = Math.random();
  for (const it of items) { r -= it.p; if (r <= 0) return it.palabra; }
  return items[items.length - 1].palabra;
}

function texto(palabras: string[]) {
  return palabras.join(' ').replace(/ ([.,;:])/g, '$1');
}

const pct = (p: number) => `${(p * 100).toLocaleString('es-ES', { maximumFractionDigits: p < 0.1 ? 1 : 0 })} %`;

function Barras({ items, resaltar }: { items: { palabra: string; p: number }[]; resaltar?: string }) {
  return (
    <ul class="list-none m-0 p-0 grid gap-1.5">
      {items.slice(0, 7).map((it) => (
        <li key={it.palabra} class="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-2 text-base">
          <span class={`truncate ${it.palabra === resaltar ? 'font-bold' : ''}`}>{it.palabra === '.' ? '(punto)' : it.palabra}</span>
          <span class="h-4 rounded bg-superficie-2 overflow-hidden" aria-hidden="true">
            <span class="block h-full rounded" style={`width:${Math.max(2, it.p * 100)}%; background: ${it.palabra === resaltar ? 'var(--acento)' : 'var(--l1)'}`} />
          </span>
          <span class="text-right tabular-nums">{pct(it.p)}</span>
        </li>
      ))}
      {items.length > 7 && <li class="text-sm tenue">… y {items.length - 7} palabras más con menos probabilidad.</li>}
    </ul>
  );
}

export default function Minimodelo({ frases, inicios, modo }: Props) {
  const modelo = useMemo(() => entrenar(frases), [frases]);
  const [inicio, setInicio] = useState(inicios[0]);
  const [palabras, setPalabras] = useState<string[]>(separar(inicios[0]));
  const [apuesta, setApuesta] = useState<string | null>(null);
  const [temp, setTemp] = useState(1);
  const [generadas, setGeneradas] = useState<string[]>([]);

  const reiniciar = (i: string) => { setInicio(i); setPalabras(separar(i)); setApuesta(null); setGeneradas([]); };
  const terminado = palabras[palabras.length - 1] === '.' || palabras.length > 30;

  const generar = (desde: string[], t: number) => {
    const ps = [...desde];
    while (ps[ps.length - 1] !== '.' && ps.length < 26) {
      const d = distribucion(modelo, ps, t);
      if (!d.items.length) break;
      ps.push(sortear(d.items));
    }
    return texto(ps);
  };

  // Modo «predice la siguiente palabra» (se calcula siempre para mantener el orden de los hooks)
  const d = distribucion(modelo, palabras, 1);
  const opciones = useMemo(() => {
    const top = d.items.slice(0, 3).map((x) => x.palabra);
    const resto = d.items.slice(3).map((x) => x.palabra);
    const extra = resto.length ? [resto[resto.length - 1]] : [];
    return barajar([...top, ...extra], palabras.join(' '));
  }, [palabras.join(' ')]);
  const masProbable = d.items[0]?.palabra;

  const selector = (
    <div class="flex flex-wrap gap-2" role="group" aria-label="Elige cómo empieza la frase">
      {inicios.map((i) => (
        <button key={i} type="button" class="opcion w-auto" aria-pressed={i === inicio} onClick={() => reiniciar(i)}>«{i}…»</button>
      ))}
    </div>
  );

  if (modo === 'temperatura') {
    const dt = distribucion(modelo, separar(inicio), temp);
    const descripcion = temp <= 0.35
      ? 'Temperatura baja: casi siempre elige la palabra más probable. Frases previsibles y repetitivas.'
      : temp < 1.4
        ? 'Temperatura media: suele elegir palabras probables, con algo de variedad.'
        : 'Temperatura alta: las palabras raras ganan opciones. Más variedad… y más frases sin sentido o falsas.';
    return (
      <div class="grid gap-3">
        {selector}
        <label class="grid gap-1" for="temp-minimodelo">
          <span class="font-bold">Temperatura: {temp.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span>
          <input id="temp-minimodelo" type="range" min={0.1} max={2} step={0.1} value={temp} class="w-full accent-[var(--l1)] min-h-11"
            onInput={(e) => setTemp(Number((e.target as HTMLInputElement).value))} />
        </label>
        <p class="m-0 text-base" aria-live="polite">{descripcion}</p>
        <div class="rounded-lg border border-borde p-3 grid gap-2">
          <p class="m-0 text-base">Probabilidad de la palabra que sigue a «{inicio}»:</p>
          <Barras items={dt.items} />
        </div>
        <button type="button" class="boton boton-peq justify-self-start" onClick={() => setGeneradas([0, 1, 2].map(() => generar(separar(inicio), temp)))}>Generar 3 frases con esta temperatura</button>
        {generadas.length > 0 && (
          <ol class="m-0 pl-6 grid gap-1" aria-live="polite">
            {generadas.map((g, i) => <li key={i}>{g}</li>)}
          </ol>
        )}
      </div>
    );
  }

  const anadir = (w: string) => { setPalabras([...palabras, w]); setApuesta(null); };

  return (
    <div class="grid gap-3">
      {selector}
      <p class="m-0 text-xl font-medium" aria-live="polite">{texto(palabras)}{!terminado && ' …'}</p>
      {terminado ? (
        <div class="grid gap-2">
          <p class="retro retro-neutra m-0">Frase terminada. Fíjate: suena bien, pero el minimodelo no «sabe» si es verdad; solo encadena palabras frecuentes.</p>
          <button type="button" class="boton boton-sec boton-peq justify-self-start" onClick={() => reiniciar(inicio)}>Empezar otra frase</button>
        </div>
      ) : !apuesta ? (
        <div class="grid gap-2">
          <p class="m-0 font-bold">¿Qué palabra crees que viene ahora?</p>
          <div class="flex flex-wrap gap-2">
            {opciones.map((w) => <button key={w} type="button" class="opcion w-auto" onClick={() => setApuesta(w)}>{w === '.' ? '(punto final)' : w}</button>)}
          </div>
        </div>
      ) : (
        <div class="grid gap-2">
          <p class={`retro m-0 ${apuesta === masProbable ? 'retro-ok' : 'retro-neutra'}`}>
            {apuesta === masProbable ? '✓ Has elegido la más probable para el minimodelo.' : `Para el minimodelo, la más probable era «${masProbable === '.' ? 'punto final' : masProbable}».`}
            {d.nivel === 'una' && ' (No encontró ejemplos con las dos últimas palabras y solo ha mirado la última: le falta contexto.)'}
          </p>
          <Barras items={d.items} resaltar={apuesta} />
          <div class="flex flex-wrap gap-2">
            <button type="button" class="boton boton-peq" onClick={() => anadir(masProbable!)}>Añadir la más probable</button>
            {apuesta !== masProbable && <button type="button" class="boton boton-sec boton-peq" onClick={() => anadir(apuesta)}>Añadir la mía</button>}
            <button type="button" class="boton boton-sec boton-peq" onClick={() => anadir(sortear(d.items))}>Que la elija el modelo (sorteo)</button>
          </div>
        </div>
      )}
    </div>
  );
}
