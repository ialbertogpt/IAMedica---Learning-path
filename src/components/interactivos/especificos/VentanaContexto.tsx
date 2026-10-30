// Simulación de la ventana de contexto: solo «se ve» lo que cabe contando desde el final.
import { useState } from 'preact/hooks';

interface Turno { rol: 'usuario' | 'asistente'; texto: string; tokens: number; clave?: boolean }
interface Props {
  turnos: Turno[];
  pregunta: { texto: string; tokens: number };
  respuestaCon: string;
  respuestaSin: string;
  minimo: number;
}

export default function VentanaContexto({ turnos, pregunta, respuestaCon, respuestaSin, minimo }: Props) {
  const total = turnos.reduce((s, t) => s + t.tokens, 0) + pregunta.tokens;
  const [ventana, setVentana] = useState(total);

  // Se llena la ventana desde el final: primero la pregunta, luego los turnos más recientes.
  let restante = ventana - pregunta.tokens;
  const dentro = new Array(turnos.length).fill(false);
  for (let i = turnos.length - 1; i >= 0; i--) {
    if (turnos[i].tokens <= restante) { dentro[i] = true; restante -= turnos[i].tokens; } else break;
  }
  const claveDentro = turnos.every((t, i) => !t.clave || dentro[i]);
  const usados = turnos.reduce((s, t, i) => s + (dentro[i] ? t.tokens : 0), 0) + pregunta.tokens;

  return (
    <div class="grid gap-3">
      <label class="grid gap-1" for="ventana-tam">
        <span class="font-bold">Tamaño de la ventana: {ventana.toLocaleString('es-ES')} tokens</span>
        <input id="ventana-tam" type="range" min={minimo} max={total} step={10} value={ventana} class="w-full accent-[var(--l1)] min-h-11"
          onInput={(e) => setVentana(Number((e.target as HTMLInputElement).value))} />
        <span class="text-sm tenue">La conversación completa ocupa {total.toLocaleString('es-ES')} tokens. Mueve el deslizador hacia la izquierda.</span>
      </label>
      <ol class="list-none m-0 p-0 grid gap-2">
        {turnos.map((t, i) => (
          <li key={i} class={`rounded-lg border p-3 text-base transition-opacity ${dentro[i] ? 'border-borde bg-superficie' : 'border-dashed border-borde opacity-45'} ${t.rol === 'usuario' ? 'sm:mr-10' : 'sm:ml-10 bg-superficie-2'}`}>
            <p class="m-0 text-sm tenue flex justify-between gap-2">
              <span>{t.rol === 'usuario' ? 'Tú' : 'Asistente'}{t.clave && ' · dato clave'}</span>
              <span>{t.tokens} tokens{!dentro[i] && ' · fuera de la ventana'}</span>
            </p>
            <p class={`m-0 ${t.clave ? 'font-bold' : ''}`}>{t.texto}</p>
          </li>
        ))}
        <li class="rounded-lg border-2 border-[var(--l1)] p-3 text-base sm:mr-10">
          <p class="m-0 text-sm tenue">Tú · {pregunta.tokens} tokens</p>
          <p class="m-0">{pregunta.texto}</p>
        </li>
      </ol>
      <div class="rounded-lg border border-borde p-3 grid gap-1" aria-live="polite">
        <p class="m-0 text-sm tenue">Respuesta simulada · {usados.toLocaleString('es-ES')} tokens dentro de la ventana</p>
        <p class="m-0">{claveDentro ? respuestaCon : respuestaSin}</p>
        <p class={`retro m-0 ${claveDentro ? 'retro-ok' : 'retro-mal'}`}>
          {claveDentro
            ? 'El dato de la alergia está dentro de la ventana y aparece en el resumen.'
            : 'El primer mensaje ha quedado fuera: el modelo ya no «ve» la alergia. Puede omitirla… o rellenar el hueco con algo verosímil y falso.'}
        </p>
      </div>
    </div>
  );
}
