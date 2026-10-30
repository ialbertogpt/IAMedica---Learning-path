// Calculadora DIDÁCTICA de función renal: Cockcroft-Gault (aclaramiento de creatinina, ml/min)
// y CKD-EPI 2021 sin raza (FG estimado, ml/min/1,73 m²), mostrando cada paso del cálculo.
// Fuentes: Cockcroft DW, Gault MH. Nephron 1976;16:31-41 · Inker LA et al. N Engl J Med 2021;385:1737-49.
import { useState } from 'preact/hooks';

interface Props { inicial: { sexo: 'mujer' | 'hombre'; edad: number; peso: number; creatinina: number } }

const f1 = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const f3 = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 3 });

export default function CalculadoraRenal({ inicial }: Props) {
  const [sexo, setSexo] = useState(inicial.sexo);
  const [edad, setEdad] = useState(String(inicial.edad));
  const [peso, setPeso] = useState(String(inicial.peso));
  const [cr, setCr] = useState(String(inicial.creatinina).replace('.', ','));
  const [unidad, setUnidad] = useState<'mgdl' | 'umol'>('mgdl');

  const num = (s: string) => Number(s.replace(',', '.'));
  const e = num(edad), p = num(peso);
  const scr = unidad === 'mgdl' ? num(cr) : num(cr) / 88.4;
  const valido = e >= 18 && e <= 110 && p >= 25 && p <= 250 && scr >= 0.2 && scr <= 15;

  let cg = 0, ckd = 0, pasosCG: string[] = [], pasosCKD: string[] = [];
  if (valido) {
    const factor = sexo === 'mujer' ? 0.85 : 1;
    cg = ((140 - e) * p) / (72 * scr) * factor;
    pasosCG = [
      `(140 − ${e}) × ${f1(p)} kg = ${f1((140 - e) * p)}`,
      `72 × ${f3(scr)} mg/dl = ${f3(72 * scr)}`,
      `${f1((140 - e) * p)} ÷ ${f3(72 * scr)} = ${f1(((140 - e) * p) / (72 * scr))}`,
      sexo === 'mujer' ? `× 0,85 por ser mujer = ${f1(cg)} ml/min` : `Hombre: sin factor de corrección = ${f1(cg)} ml/min`,
    ];
    const k = sexo === 'mujer' ? 0.7 : 0.9;
    const a = sexo === 'mujer' ? -0.241 : -0.302;
    const r = scr / k;
    const t1 = Math.pow(Math.min(r, 1), a);
    const t2 = Math.pow(Math.max(r, 1), -1.2);
    const t3 = Math.pow(0.9938, e);
    const t4 = sexo === 'mujer' ? 1.012 : 1;
    ckd = 142 * t1 * t2 * t3 * t4;
    pasosCKD = [
      `Creatinina ÷ κ (${sexo === 'mujer' ? '0,7' : '0,9'}) = ${f3(r)}`,
      `mín(${f3(r)}; 1) elevado a ${a.toLocaleString('es-ES')} = ${f3(t1)}`,
      `máx(${f3(r)}; 1) elevado a −1,200 = ${f3(t2)}`,
      `0,9938 elevado a ${e} años = ${f3(t3)}`,
      `142 × ${f3(t1)} × ${f3(t2)} × ${f3(t3)}${sexo === 'mujer' ? ' × 1,012 (mujer)' : ''} = ${f1(ckd)} ml/min/1,73 m²`,
    ];
  }

  const campo = 'min-h-11 w-full rounded-lg border border-borde bg-superficie px-3 text-base';
  return (
    <div class="grid gap-4">
      <div class="grid gap-3 sm:grid-cols-2">
        <fieldset class="m-0 p-0 border-0 grid gap-1">
          <legend class="font-bold">Sexo</legend>
          <div class="flex gap-2">
            {(['mujer', 'hombre'] as const).map((s) => (
              <button key={s} type="button" class="opcion w-auto" aria-pressed={sexo === s} onClick={() => setSexo(s)}>{s === 'mujer' ? 'Mujer' : 'Hombre'}</button>
            ))}
          </div>
        </fieldset>
        <label class="grid gap-1"><span class="font-bold">Edad (años)</span><input class={campo} inputMode="numeric" value={edad} onInput={(ev) => setEdad((ev.target as HTMLInputElement).value)} /></label>
        <label class="grid gap-1"><span class="font-bold">Peso (kg)</span><input class={campo} inputMode="decimal" value={peso} onInput={(ev) => setPeso((ev.target as HTMLInputElement).value)} /></label>
        <div class="grid gap-1">
          <label class="font-bold" for="calc-cr">Creatinina sérica</label>
          <div class="flex gap-2">
            <input id="calc-cr" class={campo} inputMode="decimal" value={cr} onInput={(ev) => setCr((ev.target as HTMLInputElement).value)} />
            <select class="min-h-11 rounded-lg border border-borde bg-superficie px-2 text-base" value={unidad} aria-label="Unidad de la creatinina" onChange={(ev) => setUnidad((ev.target as HTMLSelectElement).value as 'mgdl' | 'umol')}>
              <option value="mgdl">mg/dl</option>
              <option value="umol">µmol/l</option>
            </select>
          </div>
        </div>
      </div>
      {!valido ? (
        <p class="retro retro-mal m-0">Revisa los datos: edad entre 18 y 110 años, peso entre 25 y 250 kg y una creatinina plausible.</p>
      ) : (
        <div class="grid gap-3 sm:grid-cols-2" aria-live="polite">
          <div class="rounded-lg border border-borde p-3">
            <p class="eyebrow m-0">Cockcroft-Gault · aclaramiento de creatinina</p>
            <p class="m-0 text-3xl font-medium">{f1(cg)} <span class="text-base font-sans font-normal">ml/min</span></p>
            <ol class="m-0 mt-2 pl-5 text-base grid gap-0.5">{pasosCG.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
          <div class="rounded-lg border border-borde p-3">
            <p class="eyebrow m-0">CKD-EPI 2021 · FG estimado</p>
            <p class="m-0 text-3xl font-medium">{f1(ckd)} <span class="text-base font-sans font-normal">ml/min/1,73 m²</span></p>
            <ol class="m-0 mt-2 pl-5 text-base grid gap-0.5">{pasosCKD.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        </div>
      )}
      {valido && Math.abs(cg - ckd) >= 3 && (
        <p class="retro retro-neutra m-0">
          Diferencia de {f1(Math.abs(cg - ckd))} entre las dos estimaciones. Cockcroft-Gault incluye el peso y no se normaliza a 1,73 m²; por eso, en personas mayores y de poco peso suele dar valores más bajos. Usa la medida que indique la ficha técnica de cada fármaco.
        </p>
      )}
    </div>
  );
}
