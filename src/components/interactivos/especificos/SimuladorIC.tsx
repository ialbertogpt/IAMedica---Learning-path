// Simulador de p-valor e intervalo de confianza: repite un «estudio» muchas veces (dos grupos con la misma
// desviación típica) y muestra cuántos IC del 95 % contienen la diferencia real y cuántos salen «significativos».
// Todo con datos simulados en el navegador; la t crítica se aproxima con el desarrollo de Cornish-Fisher.
import { useMemo, useState } from 'preact/hooks';

const REPETICIONES = 50;
const DT = 10;

function mulberry32(a: number) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
// t crítica bilateral al 5 % (z = 1,959964) con df grados de libertad
function tCritica(df: number) {
  const z = 1.959964;
  return z + (z ** 3 + z) / (4 * df) + (5 * z ** 5 + 16 * z ** 3 + 3 * z) / (96 * df * df) + (3 * z ** 7 + 19 * z ** 5 + 17 * z ** 3 - 15 * z) / (384 * df ** 3);
}

export default function SimuladorIC({ titulo }: { titulo?: string }) {
  const [n, setN] = useState(30);
  const [efecto, setEfecto] = useState(5);
  const [ronda, setRonda] = useState(1);

  const estudios = useMemo(() => {
    const rnd = mulberry32(1000 + ronda * 7919 + n * 31 + efecto * 101);
    const normal = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
    const tc = tCritica(2 * n - 2);
    return Array.from({ length: REPETICIONES }, () => {
      const a = Array.from({ length: n }, () => efecto + DT * normal());
      const b = Array.from({ length: n }, () => DT * normal());
      const ma = a.reduce((s, x) => s + x, 0) / n, mb = b.reduce((s, x) => s + x, 0) / n;
      const va = a.reduce((s, x) => s + (x - ma) ** 2, 0) / (n - 1), vb = b.reduce((s, x) => s + (x - mb) ** 2, 0) / (n - 1);
      const se = Math.sqrt((va + vb) / 2 * (2 / n));
      const dif = ma - mb;
      return { dif, bajo: dif - tc * se, alto: dif + tc * se, significativo: Math.abs(dif / se) > tc };
    });
  }, [n, efecto, ronda]);

  const contienen = estudios.filter((e) => e.bajo <= efecto && e.alto >= efecto).length;
  const signif = estudios.filter((e) => e.significativo).length;
  const W = 420, H = 18 * REPETICIONES + 36, MIN = -25, MAX = 35;
  const X = (v: number) => 12 + ((Math.max(MIN, Math.min(MAX, v)) - MIN) / (MAX - MIN)) * (W - 24);

  return (
    <div class="grid gap-3" aria-label={titulo}>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="grid gap-1" for="sic-n"><span class="font-semibold">Pacientes por grupo: {n}</span>
          <input id="sic-n" type="range" min={10} max={200} step={5} value={n} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => setN(Number((e.target as HTMLInputElement).value))} /></label>
        <label class="grid gap-1" for="sic-e"><span class="font-semibold">Diferencia real entre grupos: {efecto} puntos</span>
          <input id="sic-e" type="range" min={0} max={15} step={1} value={efecto} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => setEfecto(Number((e.target as HTMLInputElement).value))} /></label>
      </div>
      <button type="button" class="boton boton-sec w-fit" onClick={() => setRonda((r) => r + 1)}>Repetir los 50 estudios</button>

      <svg viewBox={`0 0 ${W} ${H}`} class="w-full h-auto rounded-lg border border-borde bg-superficie" role="img" aria-label={`Intervalos de confianza del 95 % de ${REPETICIONES} estudios simulados con ${n} pacientes por grupo y una diferencia real de ${efecto} puntos`}>
        <line x1={X(0)} y1={8} x2={X(0)} y2={H - 22} stroke="var(--tinta-3)" stroke-width="1.5" />
        <line x1={X(efecto)} y1={8} x2={X(efecto)} y2={H - 22} stroke="var(--l2)" stroke-width="2" stroke-dasharray="5 4" />
        {estudios.map((e, i) => {
          const dentro = e.bajo <= efecto && e.alto >= efecto;
          const color = dentro ? 'var(--l1)' : 'var(--mal)';
          const y = 16 + i * 18;
          return (
            <g key={i}>
              <line x1={X(e.bajo)} y1={y} x2={X(e.alto)} y2={y} stroke={color} stroke-width="2.5" />
              <circle cx={X(e.dif)} cy={y} r="3.6" fill={e.significativo ? color : 'var(--superficie)'} stroke={color} stroke-width="1.5" />
            </g>
          );
        })}
        <text x={X(0)} y={H - 6} text-anchor="middle" font-size="11" fill="var(--tinta-2)">0 = sin diferencia</text>
        <text x={X(efecto) + (efecto < 12 ? 4 : -4)} y={H - 6} text-anchor={efecto < 12 ? 'start' : 'end'} font-size="11" fill="var(--l2)">valor real</text>
      </svg>
      <p class="m-0 text-sm tenue">Cada línea es un estudio: el segmento es su IC del 95 % y el círculo, su diferencia observada (relleno = p &lt; 0,05). Línea discontinua: la diferencia real. En rojo, los IC que no la contienen.</p>

      <div class="grid grid-cols-2 gap-3 text-center" aria-live="polite">
        <div class="rounded-xl border border-borde p-3"><p class="eyebrow m-0">IC que contienen el valor real</p><p class="m-0 text-2xl mono font-medium">{contienen} de {REPETICIONES}</p><p class="m-0 text-sm tenue">Esperado: unos 95 de cada 100</p></div>
        <div class="rounded-xl border border-borde p-3"><p class="eyebrow m-0">Estudios con p &lt; 0,05</p><p class="m-0 text-2xl mono font-medium">{signif} de {REPETICIONES}</p><p class="m-0 text-sm tenue">{efecto === 0 ? 'Sin diferencia real: son falsos positivos (≈ 5 %)' : 'Con diferencia real: es la potencia del estudio'}</p></div>
      </div>
      <p class="m-0 retro retro-neutra">{efecto === 0
        ? 'No hay ninguna diferencia real y, aun así, algunos estudios salen «significativos» solo por azar. Por eso un único p < 0,05 no es una prueba.'
        : n < 40 && efecto <= 5
          ? 'Con pocos pacientes, muchos estudios no detectan una diferencia que sí existe y los IC son muy anchos. Que no salga significativo no significa que no haya diferencia.'
          : 'Con más pacientes, los IC se estrechan y más estudios detectan la diferencia. El IC te dice, además, entre qué valores es plausible.'}</p>
    </div>
  );
}
