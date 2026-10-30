// Visualizador de tokens. Los ejemplos vienen troceados desde la compilación; el texto propio
// se trocea en el navegador cargando el tokenizador real solo cuando el alumno lo pide (~2,4 MB).
import { Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { trocear } from '../../../lib/tokens';

interface Ejemplo { titulo: string; texto: string; piezas: string[]; nTokens: number }
interface Props { ejemplos: Ejemplo[] }

const COLORES = ['var(--l1)', 'var(--l2)', 'var(--l3)', 'var(--l0)', 'var(--acento)'];

function Piezas({ piezas }: { piezas: string[] }) {
  return (
    <p class="m-0 leading-[2.2] break-words" aria-label={`Texto dividido en ${piezas.length} piezas`}>
      {piezas.map((p, i) => (
        <Fragment key={i}>
          <span
            class="rounded px-0.5 py-0.5 mr-px"
            style={`background: color-mix(in srgb, ${COLORES[i % COLORES.length]} 22%, transparent); box-shadow: inset 0 -2px 0 ${COLORES[i % COLORES.length]}`}
          >{p.replace(/ /g, '·')}</span>
          <wbr />
        </Fragment>
      ))}
    </p>
  );
}

export default function Tokenizador({ ejemplos }: Props) {
  const [sel, setSel] = useState(0);
  const [propio, setPropio] = useState('');
  const [resultado, setResultado] = useState<{ piezas: string[]; nTokens: number } | null>(null);
  const [estado, setEstado] = useState<'inicial' | 'cargando' | 'listo' | 'error'>('inicial');
  const ej = ejemplos[sel];
  const palabras = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

  const tokenizar = async () => {
    if (!propio.trim()) return;
    setEstado('cargando');
    try {
      const cod = await import('gpt-tokenizer/encoding/o200k_base');
      setResultado(trocear(propio, cod));
      setEstado('listo');
    } catch {
      setEstado('error');
    }
  };

  return (
    <div class="grid gap-3">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Elige un ejemplo">
        {ejemplos.map((e, i) => (
          <button key={i} type="button" class={`opcion w-auto ${i === sel ? '' : ''}`} aria-pressed={i === sel} onClick={() => setSel(i)}>{e.titulo}</button>
        ))}
      </div>
      <div class="rounded-lg border border-borde p-3 bg-superficie-2 grid gap-2">
        <Piezas piezas={ej.piezas} />
        <p class="m-0 text-base"><strong>{ej.nTokens} tokens</strong> para {palabras(ej.texto)} palabras ({(ej.nTokens / palabras(ej.texto)).toLocaleString('es-ES', { maximumFractionDigits: 1 })} tokens por palabra). El punto «·» marca un espacio.</p>
      </div>
      <details class="rounded-lg border border-borde p-3">
        <summary class="cursor-pointer font-bold min-h-11 flex items-center">Prueba con tu propio texto (sin datos de pacientes)</summary>
        <div class="grid gap-2 mt-2">
          <label for="tok-propio" class="text-base">Escribe o pega un texto corto:</label>
          <textarea id="tok-propio" rows={3} maxLength={1500} class="w-full rounded-lg border border-borde bg-superficie p-2 text-base" value={propio} onInput={(e) => setPropio((e.target as HTMLTextAreaElement).value)} />
          <button type="button" class="boton boton-peq justify-self-start" onClick={tokenizar} disabled={estado === 'cargando' || !propio.trim()}>
            {estado === 'cargando' ? 'Cargando el tokenizador…' : 'Trocear en tokens'}
          </button>
          <p class="m-0 text-sm tenue">La primera vez se descarga el tokenizador (unos 2,4 MB). Todo ocurre en tu navegador: el texto no sale de tu dispositivo.</p>
          {estado === 'error' && <p class="retro retro-mal m-0">No se ha podido cargar el tokenizador. Comprueba la conexión y vuelve a intentarlo.</p>}
          {resultado && estado === 'listo' && (
            <div class="rounded-lg border border-borde p-3 bg-superficie-2 grid gap-2" aria-live="polite">
              <Piezas piezas={resultado.piezas} />
              <p class="m-0 text-base"><strong>{resultado.nTokens} tokens</strong> para {palabras(propio)} palabras.</p>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
