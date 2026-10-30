// Modelo sintético de juguete (pacientes ficticios) para ver en directo cómo se evalúa un modelo.
// Modos: umbral (sensibilidad, especificidad, VPP, ROC, prevalencia y cambio de hospital),
//        sobreajuste, calibracion y grupos (infrarrepresentación en los datos).
// Todo se calcula en el navegador con matemáticas reales (distribuciones normales y ajuste polinómico).
import { useMemo, useState } from 'preact/hooks';
import { generador } from '../../../lib/azar';

export interface DatosModelo { modo: 'umbral' | 'sobreajuste' | 'calibracion' | 'grupos'; etiqueta?: string; nota?: string }

// ── Estadística básica ──────────────────────────────────────────────────────
function erf(x: number): number {
  const s = x < 0 ? -1 : 1; x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));
const phi = (z: number) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
const f0 = (n: number, d = 0) => n.toLocaleString('es-ES', { maximumFractionDigits: d, minimumFractionDigits: d });
const pct = (n: number) => `${f0(n * 100, 0)} %`;

export default function ModeloSintetico({ datos }: { datos: DatosModelo }) {
  if (datos.modo === 'sobreajuste') return <Sobreajuste />;
  if (datos.modo === 'calibracion') return <Calibracion />;
  if (datos.modo === 'grupos') return <Grupos />;
  return <Umbral />;
}

// ── Umbral, ROC, prevalencia y cambio de hospital ───────────────────────────
function Umbral() {
  const [t, setT] = useState(0.8);
  const [prev, setPrev] = useState(20);
  const [otro, setOtro] = useState(false);
  const d = otro ? 0.9 : 1.5;
  const p = prev / 100;
  const N = 1000;
  const se = 1 - Phi(t - d), sp = Phi(t);
  const tp = Math.round(N * p * se), fn = Math.round(N * p) - tp;
  const fp = Math.round(N * (1 - p) * (1 - sp)), tn = Math.round(N * (1 - p)) - fp;
  const vpp = tp + fp ? tp / (tp + fp) : 0;
  const vpn = tn + fn ? tn / (tn + fn) : 0;
  const auc = Phi(d / Math.SQRT2);

  // Densidades ponderadas por prevalencia
  const W = 400, H = 150, x0 = -3, x1 = 5.5;
  const X = (x: number) => ((x - x0) / (x1 - x0)) * W;
  const ymax = Math.max(phi(0) * (1 - p), phi(0) * p, 0.05);
  const Y = (v: number) => H - 14 - (v / ymax) * (H - 30);
  const curva = (mu: number, peso: number) => {
    const pts: string[] = [];
    for (let x = x0; x <= x1; x += 0.1) pts.push(`${X(x).toFixed(1)},${Y(phi(x - mu) * peso).toFixed(1)}`);
    return pts.join(' ');
  };
  // ROC
  const roc: string[] = [];
  for (let u = -4; u <= d + 4; u += 0.1) roc.push(`${(100 * (1 - Phi(u))).toFixed(1)},${(100 - 100 * (1 - Phi(u - d))).toFixed(1)}`);

  return (
    <div class="grid gap-4">
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="grid gap-1" for="ms-umbral"><span class="font-semibold">Umbral del modelo: {f0(t, 1)}</span>
          <input id="ms-umbral" type="range" min={-1} max={3} step={0.1} value={t} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => setT(Number((e.target as HTMLInputElement).value))} />
          <span class="text-sm tenue">Por encima del umbral, el modelo dice «frágil».</span></label>
        <label class="grid gap-1" for="ms-prev"><span class="font-semibold">Prevalencia de fragilidad: {prev} %</span>
          <input id="ms-prev" type="range" min={1} max={50} step={1} value={prev} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => setPrev(Number((e.target as HTMLInputElement).value))} />
          <span class="text-sm tenue">Cuántos pacientes frágiles hay de verdad en la planta.</span></label>
      </div>
      <button type="button" class="boton boton-sec boton-peq justify-self-start" aria-pressed={otro} onClick={() => setOtro(!otro)}>
        {otro ? 'Volver al hospital donde se entrenó' : 'Cambia de hospital (otra población)'}
      </button>
      {otro && <p class="retro retro-mal m-0">Otra población: el perfil de los pacientes es distinto y el modelo separa peor a los frágiles de los no frágiles. Es la razón de pedir validación externa.</p>}

      <div class="grid gap-4 md:grid-cols-2">
        <figure class="m-0 grid gap-1">
          <svg viewBox={`0 0 ${W} ${H}`} class="w-full h-auto rounded-lg border border-borde bg-superficie" role="img" aria-label={`Distribución de la puntuación en pacientes no frágiles y frágiles, con el umbral en ${f0(t, 1)}`}>
            <polyline points={curva(0, 1 - p)} fill="none" stroke="var(--l3)" stroke-width="2.5" />
            <polyline points={curva(d, p)} fill="none" stroke="var(--l2)" stroke-width="2.5" />
            <line x1={X(t)} x2={X(t)} y1={6} y2={H - 14} stroke="var(--tinta)" stroke-width="2" stroke-dasharray="5 4" />
            <line x1={0} x2={W} y1={H - 14} y2={H - 14} stroke="var(--borde-2)" />
            <text x={X(0) - 4} y={14} fill="var(--l3)" font-size="12" font-weight="600" text-anchor="end">No frágiles</text>
            <text x={X(d) + 4} y={14} fill="var(--l2)" font-size="12" font-weight="600">Frágiles</text>
          </svg>
          <figcaption class="text-sm tenue">Puntuación del modelo en 1.000 pacientes ficticios (curvas ponderadas por prevalencia).</figcaption>
        </figure>
        <figure class="m-0 grid gap-1">
          <svg viewBox="-12 -8 122 122" class="w-full max-h-64 h-auto rounded-lg border border-borde bg-superficie" role="img" aria-label={`Curva ROC con AUC ${f0(auc, 2)}; punto actual: sensibilidad ${pct(se)}, 1 menos especificidad ${pct(1 - sp)}`}>
            <line x1={0} y1={100} x2={100} y2={0} stroke="var(--borde-2)" stroke-dasharray="3 3" />
            <rect x={0} y={0} width={100} height={100} fill="none" stroke="var(--borde-2)" />
            <polyline points={roc.join(' ')} fill="none" stroke="var(--l1)" stroke-width="2.5" />
            <circle cx={100 * (1 - sp)} cy={100 - 100 * se} r="4.5" fill="var(--acento)" stroke="var(--tinta)" stroke-width="1.2" />
            <text x={50} y={113} text-anchor="middle" font-size="7" fill="var(--tinta-2)">1 − especificidad</text>
            <text x={-8} y={50} text-anchor="middle" font-size="7" fill="var(--tinta-2)" transform="rotate(-90 -8 50)">sensibilidad</text>
          </svg>
          <figcaption class="text-sm tenue">Curva ROC. <strong class="text-tinta">AUC = {f0(auc, 2)}</strong>. El punto naranja es tu umbral actual.</figcaption>
        </figure>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <table class="w-full border-collapse text-base">
          <caption class="sr-only">Matriz de confusión con los pacientes de cada celda</caption>
          <thead><tr><th class="border border-borde p-2"></th><th class="border border-borde p-2">Realmente frágil</th><th class="border border-borde p-2">Realmente no frágil</th></tr></thead>
          <tbody>
            <tr><th class="border border-borde p-2 text-left">Modelo: «frágil»</th><td class="border border-borde p-2 text-center" style="background:var(--ok-fondo)"><strong>{tp}</strong><br /><span class="text-sm">verdaderos positivos</span></td><td class="border border-borde p-2 text-center" style="background:var(--mal-fondo)"><strong>{fp}</strong><br /><span class="text-sm">falsos positivos</span></td></tr>
            <tr><th class="border border-borde p-2 text-left">Modelo: «no frágil»</th><td class="border border-borde p-2 text-center" style="background:var(--mal-fondo)"><strong>{fn}</strong><br /><span class="text-sm">falsos negativos</span></td><td class="border border-borde p-2 text-center" style="background:var(--ok-fondo)"><strong>{tn}</strong><br /><span class="text-sm">verdaderos negativos</span></td></tr>
          </tbody>
        </table>
        <dl class="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 content-start text-base" aria-live="polite">
          <dt class="font-semibold">Sensibilidad</dt><dd class="m-0 mono">{pct(se)}</dd>
          <dt class="font-semibold">Especificidad</dt><dd class="m-0 mono">{pct(sp)}</dd>
          <dt class="font-semibold">VPP</dt><dd class="m-0 mono">{pct(vpp)} <span class="text-sm tenue font-sans">de los que marca «frágil», lo es de verdad</span></dd>
          <dt class="font-semibold">VPN</dt><dd class="m-0 mono">{pct(vpn)} <span class="text-sm tenue font-sans">de los que marca «no frágil», no lo es</span></dd>
        </dl>
      </div>
      <p class="m-0 text-sm tenue">Simulación didáctica con dos distribuciones normales. Con una prevalencia baja, incluso un modelo con buena sensibilidad y especificidad tiene un VPP bajo: pruébalo con el deslizador.</p>
    </div>
  );
}

// ── Sobreajuste ─────────────────────────────────────────────────────────────
function ajustar(xs: number[], ys: number[], grado: number): number[] {
  const n = grado + 1;
  const A = Array.from({ length: n }, () => new Array(n + 1).fill(0));
  for (let i = 0; i < xs.length; i++) {
    const pot = Array.from({ length: n }, (_, k) => Math.pow(xs[i], k));
    for (let r = 0; r < n; r++) { for (let c = 0; c < n; c++) A[r][c] += pot[r] * pot[c]; A[r][n] += pot[r] * ys[i]; }
  }
  for (let r = 0; r < n; r++) A[r][r] += 1e-9;
  for (let c = 0; c < n; c++) {
    let m = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r;
    [A[c], A[m]] = [A[m], A[c]];
    for (let r = c + 1; r < n; r++) { const f = A[r][c] / A[c][c]; for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k]; }
  }
  const coef = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) { let s = A[r][n]; for (let c = r + 1; c < n; c++) s -= A[r][c] * coef[c]; coef[r] = s / A[r][r]; }
  return coef;
}
const evaluar = (coef: number[], x: number) => coef.reduce((a, c, k) => a + c * Math.pow(x, k), 0);
const verdad = (x: number) => 0.8 * Math.sin(2.2 * x);

function Sobreajuste() {
  const [grado, setGrado] = useState(2);
  const datos = useMemo(() => {
    const r = generador(20261030);
    const gauss = () => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
    const ent = Array.from({ length: 12 }, (_, i) => { const x = -1 + (2 * (i + 0.5)) / 12 + (r() - 0.5) * 0.08; return { x, y: verdad(x) + 0.22 * gauss() }; });
    const test = Array.from({ length: 200 }, () => { const x = -1 + 2 * r(); return { x, y: verdad(x) + 0.22 * gauss() }; });
    return { ent, test };
  }, []);
  const coef = useMemo(() => ajustar(datos.ent.map((p) => p.x), datos.ent.map((p) => p.y), grado), [grado, datos]);
  const rmse = (pts: { x: number; y: number }[]) => Math.sqrt(pts.reduce((a, p) => a + Math.pow(evaluar(coef, p.x) - p.y, 2), 0) / pts.length);
  const eEnt = rmse(datos.ent), eTest = rmse(datos.test);

  const W = 400, H = 220, X = (x: number) => 20 + ((x + 1) / 2) * (W - 40), Y = (y: number) => H / 2 - Math.max(-2.2, Math.min(2.2, y)) * 40;
  const curva = Array.from({ length: 101 }, (_, i) => { const x = -1 + (2 * i) / 100; return `${X(x).toFixed(1)},${Y(evaluar(coef, x)).toFixed(1)}`; }).join(' ');
  const real = Array.from({ length: 101 }, (_, i) => { const x = -1 + (2 * i) / 100; return `${X(x).toFixed(1)},${Y(verdad(x)).toFixed(1)}`; }).join(' ');
  const veredicto = grado <= 1 ? 'Demasiado simple: no capta el patrón (infraajuste). Falla en entrenamiento y en pacientes nuevos.' : grado <= 4 ? 'Complejidad razonable: capta el patrón y generaliza.' : 'Demasiado complejo: persigue el ruido de los 12 casos de entrenamiento. El error de entrenamiento baja, pero el de pacientes nuevos sube.';

  return (
    <div class="grid gap-3">
      <label class="grid gap-1" for="ms-grado"><span class="font-semibold">Complejidad del modelo (grado del polinomio): {grado}</span>
        <input id="ms-grado" type="range" min={1} max={9} step={1} value={grado} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => setGrado(Number((e.target as HTMLInputElement).value))} /></label>
      <svg viewBox={`0 0 ${W} ${H}`} class="w-full h-auto rounded-lg border border-borde bg-superficie" role="img" aria-label={`Ajuste de un polinomio de grado ${grado} a 12 puntos de entrenamiento`}>
        <polyline points={real} fill="none" stroke="var(--tinta-3)" stroke-width="1.5" stroke-dasharray="5 4" />
        <polyline points={curva} fill="none" stroke="var(--l1)" stroke-width="2.5" />
        {datos.ent.map((p, i) => <circle key={i} cx={X(p.x)} cy={Y(p.y)} r="4.5" fill="var(--l2)" stroke="var(--superficie)" stroke-width="1" />)}
      </svg>
      <p class="m-0 text-sm tenue">Puntos naranjas: 12 pacientes de entrenamiento. Línea discontinua: la relación real. Línea azul: lo que ha aprendido el modelo.</p>
      <div class="grid grid-cols-2 gap-3 text-center">
        <div class="rounded-xl border border-borde p-3"><p class="eyebrow m-0">Error con los 12 de entrenamiento</p><p class="m-0 text-2xl mono font-medium">{f0(eEnt, 2)}</p></div>
        <div class="rounded-xl border border-borde p-3" style={eTest > eEnt * 2 && grado > 4 ? 'border-color:var(--mal)' : ''}><p class="eyebrow m-0">Error con 200 pacientes nuevos</p><p class="m-0 text-2xl mono font-medium">{f0(eTest, 2)}</p></div>
      </div>
      <p class={`retro m-0 ${grado > 4 ? 'retro-mal' : 'retro-neutra'}`} aria-live="polite">{veredicto}</p>
      <p class="m-0 text-sm tenue">Es el residente que memoriza las preguntas del examen: sobresaliente en el simulacro y flojo con el paciente real. Por eso se evalúa siempre con casos que el modelo no ha visto.</p>
    </div>
  );
}

// ── Calibración ─────────────────────────────────────────────────────────────
function Calibracion() {
  const [desv, setDesv] = useState(1.2);
  const bins = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95];
  const obs = bins.map((p) => 1 / (1 + Math.exp(-(Math.log(p / (1 - p)) - desv))));
  const W = 260;
  return (
    <div class="grid gap-3">
      <label class="grid gap-1" for="ms-cal"><span class="font-semibold">Sobreestimación del riesgo: {desv === 0 ? 'ninguna (modelo bien calibrado)' : desv > 0 ? `${f0(desv, 1)} (el modelo exagera el riesgo)` : `${f0(desv, 1)} (el modelo lo subestima)`}</span>
        <input id="ms-cal" type="range" min={-2} max={2} step={0.1} value={desv} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => setDesv(Number((e.target as HTMLInputElement).value))} /></label>
      <div class="grid gap-4 md:grid-cols-2">
        <svg viewBox="-34 -8 300 280" class="w-full max-h-72 h-auto rounded-lg border border-borde bg-superficie" role="img" aria-label="Gráfico de calibración: riesgo previsto frente a riesgo observado">
          <rect x={0} y={0} width={W} height={W} fill="none" stroke="var(--borde-2)" />
          <line x1={0} y1={W} x2={W} y2={0} stroke="var(--tinta-3)" stroke-dasharray="4 4" />
          <polyline points={bins.map((p, i) => `${p * W},${W - obs[i] * W}`).join(' ')} fill="none" stroke="var(--l1)" stroke-width="2.5" />
          {bins.map((p, i) => <circle key={i} cx={p * W} cy={W - obs[i] * W} r="4" fill="var(--acento)" stroke="var(--tinta)" stroke-width="1" />)}
          <text x={W / 2} y={W + 22} text-anchor="middle" font-size="12" fill="var(--tinta-2)">riesgo previsto por el modelo</text>
          <text x={-22} y={W / 2} text-anchor="middle" font-size="12" fill="var(--tinta-2)" transform={`rotate(-90 -22 ${W / 2})`}>riesgo observado</text>
        </svg>
        <div class="grid gap-2 content-start text-base" aria-live="polite">
          <p class="m-0"><strong>Si el modelo dice «riesgo del 75 %»</strong>, de cada 100 pacientes así, en realidad lo desarrollan <strong>{f0(obs[7] * 100, 0)}</strong>.</p>
          <p class="m-0"><strong>Si dice «riesgo del 15 %»</strong>, lo desarrollan <strong>{f0(obs[1] * 100, 0)}</strong>.</p>
          <p class="m-0 retro retro-neutra"><strong>AUC: 0,86, el mismo en todos los casos.</strong> Mover el deslizador no cambia el orden de los pacientes (a quién considera de más riesgo), solo cuánto se fía uno de la cifra. Por eso un AUC alto no basta: hay que mirar la calibración.</p>
        </div>
      </div>
      <p class="m-0 text-sm tenue">Simulación didáctica: la línea azul es lo que ocurre de verdad; la discontinua, la calibración perfecta.</p>
    </div>
  );
}

// ── Infrarrepresentación en los datos de entrenamiento ──────────────────────
function Grupos() {
  const [cuota, setCuota] = useState(5);
  // Ilustración: el rendimiento en el grupo infrarrepresentado mejora al aumentar su peso en el entrenamiento.
  const dMenores = 1.5;
  const dMayores = 0.6 + 0.9 * Math.min(1, cuota / 30);
  const aucMenores = Phi(dMenores / Math.SQRT2), aucMayores = Phi(dMayores / Math.SQRT2);
  const barra = (t: string, v: number, c: string) => (
    <div class="grid grid-cols-[9rem_1fr_3rem] items-center gap-2 text-base"><span>{t}</span>
      <span class="h-4 rounded bg-superficie-2 overflow-hidden"><span class="block h-full" style={`width:${((v - 0.5) / 0.5) * 100}%; background:${c}`} /></span><span class="mono text-right">{f0(v, 2)}</span></div>
  );
  return (
    <div class="grid gap-3">
      <label class="grid gap-1" for="ms-cuota"><span class="font-semibold">Pacientes de 80 años o más en los datos de entrenamiento: {cuota} %</span>
        <input id="ms-cuota" type="range" min={0} max={30} step={1} value={cuota} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => setCuota(Number((e.target as HTMLInputElement).value))} /></label>
      <div class="grid gap-2" aria-live="polite">
        {barra('AUC en menores de 80', aucMenores, 'var(--l3)')}
        {barra('AUC en 80 o más', aucMayores, 'var(--l2)')}
      </div>
      <p class={`retro m-0 ${cuota < 10 ? 'retro-mal' : 'retro-neutra'}`}>{cuota < 10 ? 'El modelo «presume» de un buen rendimiento global, pero casi no ha visto pacientes muy mayores y con ellos funciona bastante peor.' : 'Con más pacientes muy mayores en el entrenamiento, la brecha se reduce.'}</p>
      <p class="m-0 text-sm tenue"><strong>Simulación ilustrativa:</strong> la relación entre la cuota y el rendimiento es un supuesto didáctico, no un dato real. Lo real: los algoritmos pueden funcionar peor en grupos poco representados (p. ej., Obermeyer et al., <i>Science</i> 2019) y la OMS ha alertado del edadismo en los datos y en el diseño de la IA en salud (2022).</p>
    </div>
  );
}
