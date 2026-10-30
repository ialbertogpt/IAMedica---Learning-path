// Constructor de prompts por bloques (rol, contexto, tarea, formato y límites) con un indicador de
// calidad basado en reglas y un detector de datos que podrían identificar a un paciente.
import { useMemo, useState } from 'preact/hooks';

export interface DatosConstructor {
  ejemplos: { nombre: string; bloques: Record<string, string> }[];
  nota?: string;
}

const BLOQUES = [
  { id: 'rol', nombre: 'Rol', ayuda: '¿Quién quieres que sea la IA? (p. ej., «Actúa como un geriatra que explica a residentes de primer año»)' },
  { id: 'contexto', nombre: 'Contexto', ayuda: 'Datos necesarios, sin identificar a nadie: edad en años, situación, qué sabes ya.' },
  { id: 'tarea', nombre: 'Tarea', ayuda: 'Qué quieres exactamente: una pregunta concreta, con un verbo («resume», «compara», «redacta»).' },
  { id: 'formato', nombre: 'Formato', ayuda: 'Cómo quieres recibirlo: tabla, lista, nº de palabras, idioma, nivel.' },
  { id: 'limites', nombre: 'Límites', ayuda: 'Lo que no debe hacer: no inventar fuentes, avisar si no está seguro, no dar dosis, etc.' },
];

const IDENTIFICADORES: { nombre: string; re: RegExp }[] = [
  { nombre: 'DNI / NIE', re: /\b(?:\d{8}[A-Za-z]|[XYZxyz]\d{7}[A-Za-z])\b/ },
  { nombre: 'Número de teléfono', re: /\b(?:\+34\s?)?[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}\b/ },
  { nombre: 'Fecha completa (día, mes y año)', re: /\b\d{1,2}[/.-]\d{1,2}[/.-](?:19|20)?\d{2}\b/ },
  { nombre: 'Correo electrónico', re: /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/ },
  { nombre: 'Código tipo CIP (4 letras y 10 cifras)', re: /\b[A-Za-z]{4}\d{10}\b/ },
  { nombre: 'NHC o nº de historia', re: /\b(?:NHC|n[ºo°]?\s*(?:de\s*)?historia|historia\s*cl[ií]nica)\s*[:#]?\s*\d{4,}\b/i },
  { nombre: 'Nombre con «Sr./Sra./D./Dña.»', re: /\b(?:Sra?\.|D\.|D[ñn]a\.?|Don|Doña)\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+/ },
];

function evaluar(b: Record<string, string>) {
  const largo = (id: string) => (b[id] ?? '').trim().length;
  const reglas = [
    { ok: largo('rol') >= 15, ok_txt: 'Das un rol claro.', mal_txt: 'Falta el rol: dile quién quieres que sea y para quién escribe.' },
    { ok: largo('contexto') >= 40, ok_txt: 'El contexto aporta datos útiles.', mal_txt: 'El contexto es escaso: sin datos, la IA rellena los huecos por su cuenta.' },
    { ok: largo('tarea') >= 20 && /(resume|compara|redacta|explica|enumera|lista|calcula|revisa|propon|prepara|traduce|reescribe|dame|elabora|identifica|genera|crea|ordena|clasifica|analiza|escribe)/i.test(b.tarea ?? ''), ok_txt: 'La tarea es concreta y tiene un verbo de acción.', mal_txt: 'La tarea es vaga: usa un verbo («resume», «compara»…) y una petición concreta.' },
    { ok: largo('formato') >= 10, ok_txt: 'Indicas el formato de la respuesta.', mal_txt: 'Falta el formato (tabla, lista, nº de palabras…).' },
    { ok: largo('limites') >= 15 || /(no inventes|si no (est|sab)|cita|fuente)/i.test(b.limites ?? ''), ok_txt: 'Pones límites (no inventar, avisar si dudas…).', mal_txt: 'Faltan límites: pide que no invente fuentes y que avise cuando no esté seguro.' },
  ];
  return reglas;
}

export default function ConstructorPrompt({ datos }: { datos: DatosConstructor }) {
  const [b, setB] = useState<Record<string, string>>({});
  const [copiado, setCopiado] = useState<string>('');
  const reglas = useMemo(() => evaluar(b), [b]);
  const puntos = reglas.filter((r) => r.ok).length;
  const texto = BLOQUES.map((x) => (b[x.id]?.trim() ? `${x.nombre.toUpperCase()}: ${b[x.id].trim()}` : '')).filter(Boolean).join('\n\n');
  const hallazgos = IDENTIFICADORES.filter((i) => i.re.test(texto)).map((i) => i.nombre);
  const nivel = puntos <= 1 ? 'Muy mejorable' : puntos <= 3 ? 'Aceptable' : puntos === 4 ? 'Bueno' : 'Muy bueno';

  const copiar = async () => {
    try { await navigator.clipboard.writeText(texto); setCopiado('Copiado ✓'); } catch {
      const area = document.createElement('textarea'); area.value = texto; document.body.appendChild(area); area.select();
      try { document.execCommand('copy'); setCopiado('Copiado ✓'); } catch { setCopiado('Selecciona y copia a mano'); }
      area.remove();
    }
    setTimeout(() => setCopiado(''), 2500);
  };

  return (
    <div class="grid gap-4">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Cargar un ejemplo">
        <span class="self-center text-sm tenue">Ejemplos:</span>
        {datos.ejemplos.map((e) => <button key={e.nombre} type="button" class="boton boton-sec boton-peq" onClick={() => setB(e.bloques)}>{e.nombre}</button>)}
        <button type="button" class="boton boton-sec boton-peq" onClick={() => setB({})}>Vaciar</button>
      </div>
      <div class="grid gap-3">
        {BLOQUES.map((x) => (
          <label key={x.id} class="grid gap-1" for={`cp-${x.id}`}>
            <span class="font-semibold">{x.nombre}</span>
            <span class="text-sm tenue">{x.ayuda}</span>
            <textarea id={`cp-${x.id}`} rows={x.id === 'contexto' ? 3 : 2} class="w-full rounded-lg border border-borde bg-superficie p-2 text-base" value={b[x.id] ?? ''} onInput={(e) => setB({ ...b, [x.id]: (e.target as HTMLTextAreaElement).value })} />
          </label>
        ))}
      </div>
      <div class="rounded-xl border border-borde p-3 grid gap-2" aria-live="polite">
        <p class="m-0 font-semibold">Calidad del prompt: {nivel} ({puntos}/5)</p>
        <div class="h-2.5 rounded bg-superficie-2 overflow-hidden" aria-hidden="true"><div class="h-full rounded" style={`width:${(puntos / 5) * 100}%; background:${puntos >= 4 ? 'var(--l3)' : puntos >= 2 ? 'var(--acento)' : 'var(--l2)'}`} /></div>
        <ul class="m-0 p-0 list-none grid gap-1 text-base">{reglas.map((r, i) => <li key={i} class="flex gap-2"><span aria-hidden="true" class={r.ok ? 'text-ok' : 'text-mal'}>{r.ok ? '✓' : '✗'}</span><span>{r.ok ? r.ok_txt : r.mal_txt}</span></li>)}</ul>
        <p class="m-0 text-sm tenue">Indicador basado en reglas sencillas (longitud y palabras clave). Orienta, pero no mide la calidad real: eso lo mide la respuesta que obtienes.</p>
      </div>
      {hallazgos.length > 0 && (
        <p class="retro retro-mal m-0" role="alert"><strong>Posibles datos identificativos:</strong> {hallazgos.join(', ')}. Elimínalos o sustitúyelos antes de usar este prompt en una IA con tu cuenta personal.</p>
      )}
      {texto && (
        <div class="grid gap-2">
          <p class="eyebrow m-0">Tu prompt montado</p>
          <pre class="m-0 p-3 rounded-lg border border-borde bg-superficie-2 whitespace-pre-wrap break-words font-sans text-base">{texto}</pre>
          <div class="flex gap-2 items-center"><button type="button" class="boton boton-peq" onClick={copiar}>Copiar prompt</button><span class="text-sm tenue" aria-live="polite">{copiado}</span></div>
        </div>
      )}
      {datos.nota && <p class="m-0 text-sm tenue">{datos.nota}</p>}
    </div>
  );
}
