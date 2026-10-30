// Trocea un texto en tokens reales (tokenizador o200k_base de OpenAI) y agrupa los
// tokens que, por separado, no forman un carácter completo (p. ej. letras acentuadas).
type Codificador = { encode: (t: string) => number[]; decode: (ids: number[]) => string };

export function trocear(texto: string, cod: Codificador): { piezas: string[]; nTokens: number } {
  const ids = cod.encode(texto);
  const piezas: string[] = [];
  let pendiente: number[] = [];
  for (const id of ids) {
    pendiente.push(id);
    const s = cod.decode(pendiente);
    if (!s.includes('�')) {
      piezas.push(s);
      pendiente = [];
    }
  }
  if (pendiente.length) piezas.push(cod.decode(pendiente));
  return { piezas, nTokens: ids.length };
}
