// Esquemas del contenido. Si un subcapítulo, test, recurso o herramienta no cumple
// estas reglas, `npm run build` falla con un mensaje que indica qué falta.
// Las comprobaciones que dependen del cuerpo del MDX (sesiones, componentes obligatorios,
// términos del glosario) están en scripts/validar-contenido.mjs.
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const VERBOS = [
  'Explicar', 'Describir', 'Distinguir', 'Diferenciar', 'Reconocer', 'Interpretar', 'Identificar', 'Aplicar', 'Construir',
  'Calcular', 'Localizar', 'Usar', 'Utilizar', 'Comprobar', 'Verificar', 'Redactar', 'Comparar', 'Elegir', 'Decidir', 'Clasificar',
  'Detectar', 'Evaluar', 'Valorar', 'Situar', 'Configurar', 'Anonimizar', 'Presentar', 'Pedir', 'Organizar', 'Generar', 'Crear',
  'Preparar', 'Planificar', 'Integrar', 'Proponer', 'Priorizar', 'Formular', 'Ejecutar', 'Gestionar', 'Estructurar', 'Obtener',
  'Mejorar', 'Analizar', 'Resolver', 'Revisar', 'Ajustar', 'Extraer', 'Adaptar', 'Citar', 'Documentar', 'Leer', 'Buscar', 'Escribir', 'Mostrar', 'Diseñar', 'Delegar', 'Reproducir', 'Seleccionar', 'Argumentar', 'Resumir', 'Traducir', 'Conocer', 'Entender', 'Emplear', 'Interpretar', 'Cuantificar', 'Corregir', 'Justificar', 'Presentar', 'Programar', 'Reconocer',
];
const verboObservable = new RegExp(`^(${VERBOS.join('|')})\\b`);
const fecha = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Usa el formato AAAA-MM-DD');

const fuente = z.object({
  texto: z.string().min(5),
  url: z.url().optional(),
  pmid: z.string().regex(/^\d+$/).optional(),
  doi: z.string().optional(),
});

const partes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/partes' }),
  schema: z.object({
    id: z.string().regex(/^\d-\d$/, 'El id es «parte-subcapítulo», p. ej. 1-5'),
    titulo: z.string().min(5),
    parte: z.number().int().min(0).max(3),
    minutos: z.number().int().min(20).max(240),
    objetivos: z
      .array(z.string().regex(verboObservable, `Cada objetivo empieza por un verbo observable en infinitivo (${VERBOS.slice(0, 8).join(', ')}…)`))
      .min(2, 'Mínimo 2 objetivos').max(4, 'Máximo 4 objetivos'),
    gancho: z.string().min(60, 'El gancho debe tener al menos 2 líneas'),
    recursos: z.array(reference('recursos')).min(1, 'Al menos 1 recurso externo').max(3, 'Máximo 3 recursos principales'),
    paraSaberMas: z.array(reference('recursos')).default([]),
    test: reference('tests'),
    fechaRevision: fecha,
    aFecha: z.string().optional(),
    fuentes: z.array(fuente).min(1, 'Al menos 1 fuente en el pie'),
  }),
});

const opcion = z.object({
  texto: z.string().min(1),
  correcta: z.boolean().default(false),
  explicacion: z.string().min(15, 'Cada opción necesita su explicación'),
});

const preguntaBase = { enunciado: z.string().min(10), caso: z.string().optional() };

const pregunta = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('unica'), ...preguntaBase, opciones: z.array(opcion).min(2).max(5) })
    .refine((p) => p.opciones.filter((o) => o.correcta).length === 1, 'Una pregunta de opción única debe tener exactamente una opción correcta'),
  z.object({ tipo: z.literal('escenario'), ...preguntaBase, caso: z.string().min(20), opciones: z.array(opcion).min(2).max(5) })
    .refine((p) => p.opciones.filter((o) => o.correcta).length === 1, 'Un escenario debe tener exactamente una opción correcta'),
  z.object({
    tipo: z.literal('vf'), ...preguntaBase, respuesta: z.boolean(),
    explicacionVerdadero: z.string().min(15), explicacionFalso: z.string().min(15),
  }),
  z.object({
    tipo: z.literal('ordenar'), ...preguntaBase,
    pasos: z.array(z.object({ texto: z.string(), porque: z.string().min(10) })).min(3).max(7),
  }),
  z.object({
    tipo: z.literal('emparejar'), ...preguntaBase,
    pares: z.array(z.object({ izquierda: z.string(), derecha: z.string(), porque: z.string().min(10) })).min(3).max(6),
  }),
]);

const tests = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/tests' }),
  schema: z.object({
    titulo: z.string(),
    preguntas: z.array(pregunta).min(3, 'El test necesita al menos 3 preguntas').max(5, 'Máximo 5 preguntas'),
  }),
});

const recursos = defineCollection({
  loader: file('src/data/recursos.json'),
  schema: z
    .object({
      id: z.string(),
      tipo: z.enum(['video', 'articulo', 'documento', 'web', 'curso']),
      titulo: z.string(),
      tituloOriginal: z.string().optional(),
      autor: z.string(),
      url: z.url(),
      youtubeId: z.string().optional(),
      idioma: z.enum(['es-ES', 'es-419', 'es', 'en']),
      doblaje: z.enum(['oficial']).optional(),
      subtitulos: z.string().optional(),
      duracion: z.string().regex(/^\d+:\d{2}$/).optional(),
      minutosLectura: z.number().int().positive().optional(),
      publicado: fecha.optional(),
      subcapitulos: z.array(z.string()),
      porQue: z.string().min(20, 'Explica en una línea por qué verlo'),
      fechaVerificacion: fecha,
      estado: z.enum(['verificado', 'con-reservas', 'bloqueado-anti-bots', 'descartado']),
      contenido: z.enum(['completo', 'capitulos', 'titulo-descripcion', 'pendiente']),
      notas: z.string().optional(),
    })
    .refine((r) => r.duracion || r.minutosLectura, 'Indica la duración (vídeo) o el tiempo de lectura')
    .refine((r) => r.tipo !== 'video' || r.youtubeId, 'Los vídeos necesitan youtubeId'),
});

const TAREAS = [
  'asistente-general', 'evidencia-clinica', 'farmacologia', 'interacciones', 'calculadoras', 'deprescripcion',
  'bibliografia', 'gestor-referencias', 'estadistica', 'estudiar-documentos', 'presentaciones',
] as const;

const herramientas = defineCollection({
  loader: file('src/data/herramientas.json'),
  schema: z.object({
    id: z.string(),
    nombre: z.string(),
    url: z.url(),
    tareas: z.array(z.enum(TAREAS)).min(1),
    descripcion: z.string().min(20),
    haceBien: z.array(z.string()).min(1),
    haceMal: z.array(z.string()).min(1, 'Toda herramienta tiene limitaciones: indícalas'),
    cuandoNoUsarla: z.string().min(10),
    gratis: z.boolean(),
    precio: z.string(),
    idiomaEs: z.enum(['sí', 'parcial', 'no']),
    disponibleEspana: z.enum(['sí', 'no', 'por-verificar']),
    aptaDatosPacientes: z.enum(['no', 'solo-con-contrato-del-centro', 'no-aplica']),
    registro: z.enum(['no', 'gratuito', 'profesional']),
    fechaVerificacion: fecha,
    estado: z.enum(['verificado', 'parcial', 'bloqueado-anti-bots', 'no-disponible']),
    notas: z.string().optional(),
  }),
});

const glosario = defineCollection({
  loader: file('src/data/glosario.json'),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    termino: z.string(),
    definicion: z.string().min(15).max(260, 'Definición de una línea (máx. ~260 caracteres)'),
    analogia: z.string().min(10),
    ver: z.array(z.string()).default([]),
  }),
});

const prompts = defineCollection({
  loader: file('src/data/prompts.json'),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    tarea: z.enum(['aprender', 'redactar', 'resumir', 'casos-clinicos', 'farmacologia', 'bibliografia', 'estadistica', 'articulos', 'presentaciones', 'estudiar']),
    subcapitulo: z.string(),
    plantilla: z.string().min(40),
    notas: z.string().optional(),
  }),
});

export const collections = { partes, tests, recursos, herramientas, glosario, prompts };
