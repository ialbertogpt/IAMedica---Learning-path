# CLAUDE.md · Mi IA Médica – Learning Path

Convenciones del proyecto para que todas las sesiones de trabajo sean coherentes. El encargo completo está en `PROMPT.md` y el plan aprobado, en `PLAN.md`. **Lee los dos antes de empezar una fase.**

## Contexto

- Web de aprendizaje personal para que **un médico (geriatría hospitalaria)** se inicie en la IA y la use con seguridad. Unas 36 h en 104 sesiones de 15–25 min.
- **El alumno estudia en casa, con dispositivos y cuentas personales**, y quiere mantener el curso separado de su trabajo (Servicio Madrileño de Salud). No construyas el curso sobre herramientas corporativas: como mucho, menciónalas con un «si tu centro las ofrece».
- De momento **solo se usa en local** (`npm run build` + `npm run preview -- --host` para la tablet en la wifi de casa). No hay despliegue público.
- **Se trabaja por fases con parada obligatoria**: al terminar cada fase, commit, informe en `informes/fase-N.md` y **esperar la aprobación del usuario**. No avances de fase sin ella.
- Estado: Fases 0 y 1 cerradas. **El usuario autorizó el 31/10/2026 ejecutar las fases 2 a 5 en secuencia**, con revisión de coherencia al final de cada una (compilación, validación, enlaces, glosario, horas, pruebas en móvil y `REVISION_CLINICA.md`) y un informe en `informes/fase-N.md`. Fases 2 (M0 + Parte 1), 3 (Parte 2) y 4 (Parte 3 completa) cerradas el 31/10/2026. Siguiente: Fase 5 (revisión final y entrega).

## Idioma y tono

- **Español de España**, tuteo cercano y respetuoso. Frases cortas. Ningún término técnico sin explicar.
- **No supongas el género del alumno**: evita «bienvenido/a», «preparado», etc. («Te damos la bienvenida», «Cuando termines…»).
- Profesional, no infantil: sin mascotas, sin confeti y sin lenguaje de videojuego. Motivador, con matices y sin tono comercial.
- Bloques de 150 palabras como máximo, negritas para lo esencial y **una analogía médica por concepto clave**.

## Analogías de referencia (amplía la lista, no la contradigas)

Entrenar = residencia · datos de entrenamiento = casuística · sobreajuste = residente que memoriza el examen · sesgo = ensayo que excluyó a los mayores de 75 · evaluar = S/E/VPP/ROC · validación externa = validar una escala en otra población · confabulación = Korsakoff · prompt = hoja de interconsulta · ventana de contexto = lo que recuerdas de la consulta en curso · RAG = consultar la guía antes de contestar · ajuste fino = la especialidad tras el grado · preentrenamiento = la carrera · razonamiento = diferencial en voz alta · agente = residente con encargo supervisado · complacencia = residente que da la razón al adjunto · criterios STOPP/START = checklist de quirófano para la medicación · deprescribir = destetar.

## Estructura

```
src/content/partes/parte-N/X-Y-slug.mdx   subcapítulos (el slug debe coincidir con src/data/curso.json)
src/content/tests/X-Y.json                tests (3–5 preguntas; tipos: unica, escenario, vf, ordenar, emparejar)
src/data/curso.json                       estructura del curso: orden, partes, minutos del plan, requisitos
src/data/recursos.json                    recursos externos verificados (vídeos, artículos, webs)
src/data/herramientas.json                directorio de herramientas (con haceBien, haceMal y cuandoNoUsarla)
src/data/glosario.json · prompts.json     glosario y biblioteca de plantillas
src/data/interactivos/*.json              datos de los interactivos
src/components/curso/                     componentes para usar en MDX (ver index.ts)
src/components/interactivos/              envoltorios .astro + islas Preact (motores/ y especificos/)
src/content.config.ts                     esquemas Zod (la compilación falla si algo no cumple)
scripts/validar-contenido.mjs             validación del cuerpo de los MDX (se ejecuta antes de dev y build)
```

## Plantilla de un subcapítulo (obligatoria; la valida la compilación)

Frontmatter: `id`, `titulo`, `parte`, `minutos` (igual a la suma de las sesiones), `objetivos` (2–4, empezando por un verbo en infinitivo de la lista de `content.config.ts`), `gancho`, `recursos` (1–3 ids), `paraSaberMas`, `test`, `fechaRevision`, `aFecha` (si hay contenido sensible al tiempo) y `fuentes`.

Cuerpo: solo sesiones en el nivel superior, escritas **exactamente** así: `<Sesion n={1} titulo="…" minutos={20}>` (15–25 min). Dentro de las sesiones:

- `<T id="…">texto</T>` en la primera aparición de cada término del glosario (lo comprueba `npm run check-glosario`).
- `<Analogia>`, `<OjoCon>` (obligatorio), `<PruebaloTu>` (obligatorio en la Parte 3), `<AvisoClinico>`, `<Caso>` y `<Desplegable>`.
- `<Video id>` y `<Recurso id>` (deben existir en `recursos.json` y no estar descartados). `<Plantilla id>` sale de `prompts.json`.
- Al menos un visual propio: `Clasificador`, `EncuentraError`, `Tokenizador`, `Minimodelo`, `VentanaContexto`, `CalculadoraRenal`, `TresAyudas` o `AnatomiaFicha`.
- En la Parte 3: `<PasoTaller tipo="anonimizar">` y `<PasoTaller tipo="verificar">`.
- En la última sesión: `<Resumen>` (3–5 puntos), `<Ficha titulo>` (cabe en una página A4) y `<TestFinal id>`.

Para añadir un componente nuevo: créalo, añádelo a `src/components/curso/index.ts` **y** a `COMPONENTES` (y, si es visual, a `VISUALES`) en `scripts/validar-contenido.mjs`.

## Recursos externos

- **Nunca inventes un enlace, un vídeo ni una referencia.** Todo se verifica con una petición real antes de incluirlo.
- **Vídeos:** oEmbed de YouTube + ficha pública (duración, subtítulos, pistas de audio, disponibilidad en España). Se aceptan vídeos de Latinoamérica y con **doblaje oficial** del canal, siempre marcados. Los de **doblaje automático se descartan**. YouTube no deja descargar transcripciones automáticamente: el contenido se comprueba por la descripción y los capítulos, y se marca en `contenido`.
- Todo va a `recursos.json` con su `fechaVerificacion` y su `estado`: `verificado`, `con-reservas`, `bloqueado-anti-bots` o `descartado`.
- Si no hay un buen recurso en castellano, no rellenes: compénsalo con un interactivo propio y anótalo en el informe de la fase.
- `npm run check-links` genera `informes/enlaces-AAAA-MM-DD.md`. Los 403 o 202 de Cloudflare se tratan como «revisión manual», no como «roto».

## Seguridad clínica (innegociable)

- Todos los casos y datos son **ficticios** y se indica.
- **Ninguna dosis ni recomendación sin fuente y fecha.** Las dosis se verifican en la ficha técnica de CIMA. API útil: `https://cima.aemps.es/cima/rest/medicamentos?nombre=…` y `…/docSegmentado/contenido/1?nregistro=N&seccion=4.2`.
- Cada afirmación clínica, dosis, criterio o cálculo va a **`REVISION_CLINICA.md`** con su fuente (documento, versión o fecha, y sección).
- Las respuestas de IA de los ejemplos se **generan con un modelo real y se etiquetan con el modelo y la fecha**. Si se alteran a propósito para un ejercicio, se dice («texto creado para este ejercicio…; contiene N errores intencionados»). Nunca hagas pasar un texto redactado por una salida real.
- No reproduzcas tablas con derechos (STOPP/START, Beers, figuras): cita y parafrasea. Los algoritmos de deprescribing.org no se traducen (lo prohíbe su licencia).
- Lo que es sensible al tiempo (herramientas, precios, modelos, regulación) lleva «a fecha de [mes año]».

## Diseño y accesibilidad

- **Referencia visual: `bocetos/Portada_dc.html`, opción 1a («hoja clínica»)**, elegida por el usuario. Itinerario en tabla con raíl de colores, resumen fijo a la izquierda y bloque «continúa donde lo dejaste». Etiquetas en IBM Plex Mono en mayúsculas con espaciado, IBM Plex Sans para el resto, e iconos lineales de Material Symbols teñidos con el color de la línea.
- Iconos: `<Icono nombre="…" />` (`src/components/ui/Icono.astro`) inserta el SVG de `@material-symbols/svg-300`. Para la versión rellena, `relleno`. No uses emojis como iconos.
- Tokens de color (OKLCH) y tipografía en `src/styles/global.css` (claro y oscuro). No uses colores sueltos: usa las variables `--l0…--l3`, `--tinta`, `--tinta-2`, `--tinta-3`, `--borde`, etc. Colores por línea: l0 Bienvenida (violeta), l1 Fundamentos (azul), l2 Medicina (terracota), l3 Herramientas (verde).
- En `src/data/curso.json` cada estación tiene `icono`, `nota` (requisito breve) y `expres` (si forma parte de la ruta exprés).
- El cuerpo del texto tiene 18 px o más. Objetivos táctiles de 44 px o más. Todo funciona con teclado: «ordenar» usa botones ↑↓ y «emparejar», desplegables.
- Las animaciones respetan `prefers-reduced-motion`.
- Los vídeos usan una fachada: no se conecta con YouTube hasta que el alumno pulsa. Sin cookies, sin analítica y fuentes autoalojadas.

## Notas de trabajo

- **Finales de línea:** `recursos.json`, `glosario.json`, `prompts.json`, `curso.json`, `src/components/curso/index.ts` y `scripts/validar-contenido.mjs` están en CRLF; los MDX, los tests y los demás ficheros, en LF. En Windows, Python reescribe en CRLF por defecto: abre y guarda con `newline=''` para no ensuciar el diff.
- **Un término del glosario con paréntesis** en `termino` (p. ej. «Benchmark (prueba de rendimiento)») se empareja también por la palabra entre paréntesis: evita palabras comunes que den falsos positivos en `check-glosario`.
- **`<T>` fuera de encabezados y de celdas de tabla:** `check-glosario --arreglar` los inserta donde aparece la primera vez; revisa que no queden dentro de un encabezado o de una tabla.
- **Las cifras de un estudio** se leen en el resumen **completo** (incluida la sección de métodos). Un extractor que corta en «RESULTS» pierde el tamaño de la muestra.

- **Dataset del taller 3.4:** `npm run generar-dataset` (necesita `exceljs`, solo de desarrollo) regenera los cuatro ficheros de `public/descargas/`. Si cambias el generador, recalcula los resultados de referencia de 3.4 (`REVISION_CLINICA.md`, RC-3.4-02) y el texto.
- **Objetivos de cada subcapítulo:** entre 2 y 4, empezando por un verbo de la lista de `content.config.ts` (la compilación falla si no).

## Comandos

```
npm run dev              validar + servidor de desarrollo
npm run build            validar + compilar + índice de Pagefind
npm run preview -- --host   servir dist/ también para la tablet de la red local
npm run validar          solo la validación del contenido
npm run check-links      comprobar enlaces (informe en informes/)
npm run check-glosario   términos del glosario sin <T>
npm run horas            recuento de horas (informe en informes/)
```
