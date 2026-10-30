export function etiquetaIdioma(idioma: string, doblaje?: string): string {
  if (doblaje === 'oficial') return 'Español (doblaje del canal)';
  switch (idioma) {
    case 'es-ES': return 'Español de España';
    case 'es-419': return 'Español de América';
    case 'es': return 'Español';
    case 'en': return 'Inglés';
    default: return idioma;
  }
}

export function etiquetaTipo(tipo: string): string {
  const tipos: Record<string, string> = { video: 'Vídeo', articulo: 'Artículo', documento: 'Documento', web: 'Web', curso: 'Curso en línea' };
  return tipos[tipo] ?? tipo;
}

export function minutosATexto(m: number): string {
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r} min`;
  return r ? `${h} h ${r} min` : `${h} h`;
}

export function horasDecimal(m: number): string {
  return (m / 60).toLocaleString('es-ES', { maximumFractionDigits: 2 }) + ' h';
}

export function fechaCorta(iso: string): string {
  return iso.split('-').reverse().join('/');
}

export function fechaLarga(iso: string): string {
  const [a, mes, d] = iso.split('-').map(Number);
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${d} de ${meses[mes - 1]} de ${a}`;
}
