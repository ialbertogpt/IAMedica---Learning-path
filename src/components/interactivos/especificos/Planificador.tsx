// Planificador de ritmo: ¿cuántas sesiones a la semana? → fecha estimada de fin.
import { useEffect, useState } from 'preact/hooks';
import { leer } from '../../../lib/progreso';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export default function Planificador({ totalSesiones, minutosMedios }: { totalSesiones: number; minutosMedios: number }) {
  const [porSemana, setPorSemana] = useState(4);
  const [hechas, setHechas] = useState(0);
  useEffect(() => {
    try { const v = Number(localStorage.getItem('miamed:ritmo')); if (v >= 1 && v <= 14) setPorSemana(v); } catch { /* sin almacenamiento */ }
    setHechas(Object.values(leer().sesiones).reduce((a, l) => a + l.length, 0));
  }, []);
  const cambiar = (v: number) => { setPorSemana(v); try { localStorage.setItem('miamed:ritmo', String(v)); } catch { /* sin almacenamiento */ } };
  const restantes = Math.max(0, totalSesiones - hechas);
  const semanas = Math.ceil(restantes / porSemana);
  const fin = new Date(Date.now() + semanas * 7 * 864e5);
  const minSemana = porSemana * minutosMedios;

  return (
    <div class="grid gap-3">
      <label class="grid gap-1" for="plan-ritmo"><span class="font-semibold">Sesiones por semana: {porSemana}</span>
        <input id="plan-ritmo" type="range" min={1} max={14} step={1} value={porSemana} class="w-full min-h-11 accent-[var(--l1)]" onInput={(e) => cambiar(Number((e.target as HTMLInputElement).value))} /></label>
      <p class="m-0 retro retro-ok" aria-live="polite">
        A {porSemana} sesiones por semana (unos {minSemana} minutos), te quedan <strong>{semanas} semanas</strong> para las {restantes} sesiones pendientes: terminarías hacia el <strong>{fin.getDate()} de {MESES[fin.getMonth()]} de {fin.getFullYear()}</strong>.
      </p>
      <p class="m-0 text-sm tenue">Una sesión dura unos {minutosMedios} minutos. Cuatro a la semana son dos huecos de 40 minutos o cuatro de 20. La regularidad importa más que la duración.</p>
    </div>
  );
}
