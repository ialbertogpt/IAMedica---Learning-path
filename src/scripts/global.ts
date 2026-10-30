// Comportamientos comunes a todas las páginas. Sin dependencias y sin enviar nada a ningún servidor.
import { leer, marcarPaso, alCambiar } from '../lib/progreso';

// ── Tema claro/oscuro ───────────────────────────────────────────────────────
const botonTema = document.getElementById('boton-tema');
function temaActualOscuro(): boolean {
  const t = document.documentElement.getAttribute('data-theme');
  return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
}
botonTema?.setAttribute('aria-pressed', String(temaActualOscuro()));
botonTema?.addEventListener('click', () => {
  const nuevo = temaActualOscuro() ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nuevo);
  try { localStorage.setItem('miamed:tema', nuevo); } catch { /* sin almacenamiento */ }
  botonTema.setAttribute('aria-pressed', String(nuevo === 'dark'));
});

// ── Menú del móvil y atajo «/» para buscar ──────────────────────────────────
const botonMenu = document.getElementById('boton-menu');
const menu = document.getElementById('menu-movil');
botonMenu?.addEventListener('click', () => {
  const abrir = menu!.hidden;
  menu!.hidden = !abrir;
  botonMenu.setAttribute('aria-expanded', String(abrir));
});
document.addEventListener('keydown', (e) => {
  if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target as HTMLElement;
  if (t.closest('input, textarea, select, [contenteditable="true"]')) return;
  const caja = document.getElementById('busqueda-cabecera') as HTMLInputElement | null;
  if (caja && caja.offsetParent !== null) { e.preventDefault(); caja.focus(); }
});

// ── Términos del glosario ───────────────────────────────────────────────────
function cerrarDefiniciones(excepto?: Element) {
  document.querySelectorAll<HTMLElement>('.termino').forEach((t) => {
    if (t === excepto) return;
    t.querySelector('.definicion')?.setAttribute('hidden', '');
    t.querySelector('button')?.setAttribute('aria-expanded', 'false');
  });
}
function colocar(def: HTMLElement) {
  def.style.left = '0px';
  const r = def.getBoundingClientRect();
  const margen = 12;
  if (r.right > window.innerWidth - margen) def.style.left = `${window.innerWidth - margen - r.right}px`;
  const r2 = def.getBoundingClientRect();
  if (r2.left < margen) def.style.left = `${parseFloat(def.style.left) + (margen - r2.left)}px`;
}
document.addEventListener('click', (e) => {
  const boton = (e.target as Element).closest('.termino > button');
  if (!boton) {
    if (!(e.target as Element).closest('.definicion')) cerrarDefiniciones();
    return;
  }
  const termino = boton.parentElement!;
  const def = termino.querySelector<HTMLElement>('.definicion')!;
  const abrir = def.hasAttribute('hidden');
  cerrarDefiniciones(termino);
  if (abrir) { def.removeAttribute('hidden'); colocar(def); } else def.setAttribute('hidden', '');
  boton.setAttribute('aria-expanded', String(abrir));
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarDefiniciones(); });

// ── Copiar al portapapeles (con alternativa para http en la red local) ────────
async function copiar(texto: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(texto); return true; } catch { /* probamos la alternativa */ }
  }
  const area = document.createElement('textarea');
  area.value = texto;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  area.remove();
  return ok;
}
document.addEventListener('click', async (e) => {
  const boton = (e.target as Element).closest<HTMLButtonElement>('[data-copiar]');
  if (!boton) return;
  const origen = document.getElementById(boton.dataset.copiar!);
  if (!origen) return;
  const ok = await copiar(origen.innerText.trim());
  const estado = boton.parentElement?.querySelector<HTMLElement>('[data-estado-copia]');
  const original = boton.dataset.textoOriginal ?? boton.textContent ?? '';
  boton.dataset.textoOriginal = original;
  boton.textContent = ok ? 'Copiado ✓' : 'Selecciona y copia a mano';
  if (estado) estado.textContent = ok ? 'Plantilla copiada al portapapeles.' : 'No se ha podido copiar automáticamente: selecciona el texto y cópialo.';
  if (!ok) {
    const sel = window.getSelection();
    const rango = document.createRange();
    rango.selectNodeContents(origen);
    sel?.removeAllRanges();
    sel?.addRange(rango);
  }
  setTimeout(() => { boton.textContent = original; }, 2500);
});

// ── Imprimir solo la ficha de bolsillo ──────────────────────────────────────
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('[data-imprimir-ficha]')) return;
  document.documentElement.classList.add('imprimir-ficha');
  window.print();
});
window.addEventListener('afterprint', () => document.documentElement.classList.remove('imprimir-ficha'));

// ── Vídeos: no se carga nada de YouTube hasta que se pulsa ─────────────────
document.addEventListener('click', (e) => {
  const boton = (e.target as Element).closest<HTMLButtonElement>('[data-cargar-video]');
  if (!boton) return;
  const contenedor = boton.closest<HTMLElement>('[data-video]')!;
  const id = contenedor.dataset.video!;
  const inicio = contenedor.dataset.inicio ? `&start=${contenedor.dataset.inicio}` : '';
  const fin = contenedor.dataset.fin ? `&end=${contenedor.dataset.fin}` : '';
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&hl=es&cc_lang_pref=es${inicio}${fin}`;
  iframe.title = contenedor.dataset.titulo ?? 'Vídeo';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.loading = 'lazy';
  iframe.className = 'w-full aspect-video rounded-lg border-0';
  const marco = contenedor.querySelector<HTMLElement>('[data-marco]')!;
  marco.replaceChildren(iframe);
  iframe.focus();
});

// ── Pasos de taller (anonimizar, verificar…) ────────────────────────────────
function pintarPasos() {
  const p = leer();
  document.querySelectorAll<HTMLInputElement>('input[data-paso]').forEach((c) => {
    c.checked = Boolean(p.pasos[c.dataset.paso!]);
  });
}
document.addEventListener('change', (e) => {
  const c = e.target as HTMLInputElement;
  if (c.matches('input[data-paso]')) marcarPaso(c.dataset.paso!, c.checked);
});
pintarPasos();
alCambiar(pintarPasos);
