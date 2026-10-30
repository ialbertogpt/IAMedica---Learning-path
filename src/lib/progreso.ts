// Progreso del alumno: se guarda solo en este navegador (localStorage), nunca se envía a ningún sitio.
// Se puede exportar e importar con un código de texto para cambiar de dispositivo.

export interface ResultadoTest {
  superado: boolean;
  aciertosPrimera: number;
  total: number;
  fecha: string;
}

export interface Progreso {
  v: 1;
  /** Sesiones completadas por subcapítulo, p. ej. { "1-5": [1, 2] } */
  sesiones: Record<string, number[]>;
  tests: Record<string, ResultadoTest>;
  /** Pasos de taller marcados, p. ej. { "3-2-anonimizar": "2026-10-30" } */
  pasos: Record<string, string>;
  autoevaluacion: { inicial?: Record<string, number>; final?: Record<string, number> };
  ultima?: { sub: string; sesion: number; fecha: string };
  nombreCertificado?: string;
}

const CLAVE = 'miamed:v1';
const EVENTO = 'miamed:progreso';

function vacio(): Progreso {
  return { v: 1, sesiones: {}, tests: {}, pasos: {}, autoevaluacion: {} };
}

export function leer(): Progreso {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return vacio();
    const datos = JSON.parse(crudo);
    return normalizar(datos) ?? vacio();
  } catch {
    return vacio();
  }
}

function normalizar(d: unknown): Progreso | null {
  if (!d || typeof d !== 'object' || (d as Progreso).v !== 1) return null;
  const p = d as Progreso;
  return {
    v: 1,
    sesiones: p.sesiones && typeof p.sesiones === 'object' ? p.sesiones : {},
    tests: p.tests && typeof p.tests === 'object' ? p.tests : {},
    pasos: p.pasos && typeof p.pasos === 'object' ? p.pasos : {},
    autoevaluacion: p.autoevaluacion && typeof p.autoevaluacion === 'object' ? p.autoevaluacion : {},
    ultima: p.ultima,
    nombreCertificado: typeof p.nombreCertificado === 'string' ? p.nombreCertificado : undefined,
  };
}

export function guardar(p: Progreso): boolean {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(p));
    window.dispatchEvent(new CustomEvent(EVENTO));
    return true;
  } catch {
    return false;
  }
}

export function alCambiar(fn: () => void): () => void {
  const manejador = (e: Event) => {
    if (e instanceof StorageEvent && e.key !== CLAVE) return;
    fn();
  };
  window.addEventListener(EVENTO, manejador);
  window.addEventListener('storage', manejador);
  return () => {
    window.removeEventListener(EVENTO, manejador);
    window.removeEventListener('storage', manejador);
  };
}

const hoy = () => new Date().toISOString().slice(0, 10);

export function marcarSesion(sub: string, n: number, hecha = true): Progreso {
  const p = leer();
  const lista = new Set(p.sesiones[sub] ?? []);
  if (hecha) lista.add(n); else lista.delete(n);
  p.sesiones[sub] = [...lista].sort((a, b) => a - b);
  guardar(p);
  return p;
}

export function registrarVisita(sub: string, sesion: number): void {
  const p = leer();
  p.ultima = { sub, sesion, fecha: hoy() };
  guardar(p);
}

export function registrarTest(id: string, aciertosPrimera: number, total: number): void {
  const p = leer();
  const previo = p.tests[id];
  // Se conserva el mejor resultado «a la primera»; repetir nunca penaliza.
  p.tests[id] = {
    superado: true,
    aciertosPrimera: Math.max(aciertosPrimera, previo?.aciertosPrimera ?? 0),
    total,
    fecha: hoy(),
  };
  guardar(p);
}

export function marcarPaso(id: string, hecho: boolean): void {
  const p = leer();
  if (hecho) p.pasos[id] = hoy(); else delete p.pasos[id];
  guardar(p);
}

export function reiniciar(): void {
  try { localStorage.removeItem(CLAVE); } catch { /* sin almacenamiento: nada que borrar */ }
  window.dispatchEvent(new CustomEvent(EVENTO));
}

// ── Exportar / importar ─────────────────────────────────────────────────────
// Formato: MIAM1-<base64url(deflate(JSON))>-<suma de verificación de 8 hex>.
// Si el navegador no tiene CompressionStream, se usa MIAM0 (JSON sin comprimir).

function crc32(bytes: Uint8Array): string {
  let c = 0xffffffff;
  for (const b of bytes) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ((c ^ 0xffffffff) >>> 0).toString(16).padStart(8, '0');
}

function aBase64url(bytes: Uint8Array): string {
  let s = '';
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function deBase64url(t: string): Uint8Array {
  const s = atob(t.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((t.length + 3) % 4));
  return Uint8Array.from(s, (ch) => ch.charCodeAt(0));
}

async function transformar(bytes: Uint8Array, flujo: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const respuesta = new Response(new Blob([bytes as BlobPart]).stream().pipeThrough(flujo));
  return new Uint8Array(await respuesta.arrayBuffer());
}

export async function exportarCodigo(): Promise<string> {
  const json = new TextEncoder().encode(JSON.stringify(leer()));
  if (typeof CompressionStream === 'function') {
    const comprimido = await transformar(json, new CompressionStream('deflate-raw'));
    return `MIAM1-${aBase64url(comprimido)}-${crc32(json)}`;
  }
  return `MIAM0-${aBase64url(json)}-${crc32(json)}`;
}

export async function importarCodigo(codigo: string): Promise<{ ok: true } | { ok: false; motivo: string }> {
  const m = codigo.trim().match(/^MIAM([01])-([A-Za-z0-9_-]+)-([0-9a-f]{8})$/);
  if (!m) return { ok: false, motivo: 'El código no tiene el formato esperado (empieza por MIAM1- o MIAM0-).' };
  try {
    let bytes = deBase64url(m[2]);
    if (m[1] === '1') {
      if (typeof DecompressionStream !== 'function') return { ok: false, motivo: 'Este navegador no puede leer códigos comprimidos. Actualízalo o usa el archivo .json.' };
      bytes = await transformar(bytes, new DecompressionStream('deflate-raw'));
    }
    if (crc32(bytes) !== m[3]) return { ok: false, motivo: 'El código está incompleto o se ha copiado mal (la suma de verificación no coincide).' };
    const datos = normalizar(JSON.parse(new TextDecoder().decode(bytes)));
    if (!datos) return { ok: false, motivo: 'El código no contiene un progreso válido.' };
    guardar(datos);
    return { ok: true };
  } catch {
    return { ok: false, motivo: 'No se ha podido leer el código.' };
  }
}

export function importarJSON(texto: string): boolean {
  try {
    const datos = normalizar(JSON.parse(texto));
    if (!datos) return false;
    return guardar(datos);
  } catch {
    return false;
  }
}
