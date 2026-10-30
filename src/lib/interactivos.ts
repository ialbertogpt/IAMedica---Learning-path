// Datos de los interactivos (src/data/interactivos/*.json), cargados en la compilación.
const datos = import.meta.glob('../data/interactivos/*.json', { eager: true, import: 'default' });

export function cargarDatos<T>(nombre: string): T {
  const clave = `../data/interactivos/${nombre}.json`;
  if (!(clave in datos)) throw new Error(`[interactivos] No existe src/data/interactivos/${nombre}.json`);
  return datos[clave] as T;
}
