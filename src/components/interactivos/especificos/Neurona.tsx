// Neurona artificial con deslizadores: «¿ingreso o alta?» a partir de tres datos de un paciente ficticio.
// Muestra que una neurona es una suma ponderada que pasa por un umbral suave.
import { useState } from 'preact/hooks';

const sigmoide = (z: number) => 1 / (1 + Math.exp(-z));
const f1 = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 1, minimumFractionDigits: 1 });

const ENTRADAS = [
  { id: 'edad', nombre: 'Edad', unidad: 'años', min: 65, max: 100, ini: 84 },
  { id: 'barthel', nombre: 'Índice de Barthel', unidad: 'puntos', min: 0, max: 100, ini: 55 },
  { id: 'solo', nombre: 'Vive solo/a', unidad: '0 = no · 1 = sí', min: 0, max: 1, ini: 1 },
];
const PESOS_INI = [1.2, -2.5, 1.5];
const SESGO_INI = -0.4;

export default function Neurona() {
  const [x, setX] = useState<number[]>(ENTRADAS.map((e) => e.ini));
  const [w, setW] = useState<number[]>(PESOS_INI);
  const [b, setB] = useState(SESGO_INI);
  const norm = ENTRADAS.map((e, i) => (x[i] - e.min) / (e.max - e.min));
  const aportes = norm.map((v, i) => v * w[i]);
  const z = aportes.reduce((a, c) => a + c, 0) + b;
  const prob = sigmoide(z);
  const maxAbs = Math.max(1, ...aportes.map(Math.abs), Math.abs(b));

  return (
    <div class="grid gap-4">
      <div class="grid gap-3 md:grid-cols-2">
        <fieldset class="m-0 p-3 rounded-xl border border-borde grid gap-3"><legend class="px-1 font-semibold">1 · Datos del paciente (ficticio)</legend>
          {ENTRADAS.map((e, i) => (
            <label key={e.id} class="grid gap-0.5" for={`neu-x-${e.id}`}><span>{e.nombre}: <strong>{e.id === 'solo' ? (x[i] ? 'sí' : 'no') : x[i]}</strong> <span class="text-sm tenue">({e.unidad})</span></span>
              <input id={`neu-x-${e.id}`} type="range" min={e.min} max={e.max} step={1} value={x[i]} class="w-full min-h-11 accent-[var(--l1)]" onInput={(ev) => { const val = Number((ev.target as HTMLInputElement).value); setX((prev) => prev.map((v, k) => (k === i ? val : v))); }} /></label>
          ))}
        </fieldset>
        <fieldset class="m-0 p-3 rounded-xl border border-borde grid gap-3"><legend class="px-1 font-semibold">2 · Importancia que da la neurona (pesos)</legend>
          {ENTRADAS.map((e, i) => (
            <label key={e.id} class="grid gap-0.5" for={`neu-w-${e.id}`}><span>Peso de «{e.nombre}»: <strong class="mono">{f1(w[i])}</strong></span>
              <input id={`neu-w-${e.id}`} type="range" min={-4} max={4} step={0.1} value={w[i]} class="w-full min-h-11 accent-[var(--l2)]" onInput={(ev) => { const val = Number((ev.target as HTMLInputElement).value); setW((prev) => prev.map((v, k) => (k === i ? val : v))); }} /></label>
          ))}
          <label class="grid gap-0.5" for="neu-b"><span>Sesgo (tendencia a ingresar): <strong class="mono">{f1(b)}</strong></span>
            <input id="neu-b" type="range" min={-4} max={4} step={0.1} value={b} class="w-full min-h-11 accent-[var(--l2)]" onInput={(ev) => setB(Number((ev.target as HTMLInputElement).value))} /></label>
        </fieldset>
      </div>

      <div class="rounded-xl border border-borde p-3 grid gap-2" aria-live="polite">
        <p class="m-0 font-semibold">3 · La neurona suma y decide</p>
        {[...ENTRADAS.map((e, i) => ({ t: e.nombre, v: aportes[i] })), { t: 'Sesgo', v: b }].map((a) => (
          <div key={a.t} class="grid grid-cols-[8.5rem_1fr_3rem] items-center gap-2 text-sm">
            <span>{a.t}</span>
            <span class="relative h-3 rounded bg-superficie-2" aria-hidden="true"><span class="absolute top-0 h-full rounded" style={`left:${a.v >= 0 ? 50 : 50 + (a.v / maxAbs) * 50}%; width:${(Math.abs(a.v) / maxAbs) * 50}%; background:${a.v >= 0 ? 'var(--l2)' : 'var(--l3)'}`} /><span class="absolute left-1/2 top-0 h-full w-px bg-tinta-3" /></span>
            <span class="mono text-right">{a.v >= 0 ? '+' : ''}{f1(a.v)}</span>
          </div>
        ))}
        <p class="m-0 text-sm tenue">Barras a la derecha (naranja) empujan hacia «ingreso»; a la izquierda (verde), hacia «alta».</p>
        <div class="grid grid-cols-[1fr_auto] items-center gap-3 mt-1">
          <span class="h-5 rounded bg-superficie-2 overflow-hidden" role="img" aria-label={`Probabilidad de ingreso: ${Math.round(prob * 100)} %`}><span class="block h-full" style={`width:${prob * 100}%; background:${prob >= 0.5 ? 'var(--l2)' : 'var(--l3)'}`} /></span>
          <span class="mono font-semibold text-lg">{Math.round(prob * 100)} %</span>
        </div>
        <p class={`retro m-0 ${prob >= 0.5 ? 'retro-mal' : 'retro-ok'}`}><strong>{prob >= 0.5 ? 'Sugiere: ingreso.' : 'Sugiere: alta.'}</strong> Suma total {f1(z)} → pasa por una curva en S (función sigmoide) que la convierte en una probabilidad entre 0 y 100 %.</p>
      </div>
      <button type="button" class="boton boton-sec boton-peq justify-self-start" onClick={() => { setW(PESOS_INI); setB(SESGO_INI); setX(ENTRADAS.map((e) => e.ini)); }}>Restablecer</button>
      <p class="m-0 text-sm tenue">Neurona didáctica con pesos inventados: no sirve para decidir ingresos. En el entrenamiento, el modelo no tiene a nadie que le dé los pesos: los ajusta él solo, viendo miles de casos. Esa búsqueda de pesos es «aprender».</p>
    </div>
  );
}
