# Prompt para Claude Code · Plataforma de aprendizaje «IA para médicos»

## 0. Datos del alumno (rellenar antes de lanzar; si un campo está vacío, usa el valor por defecto)

| Campo | Valor | Por defecto si está vacío |
|---|---|---|
| Especialidad y ámbito | | Geriatría / pacientes mayores en hospital |
| Servicio de salud (CCAA) | | España, genérico |
| Herramientas que le proporciona su centro | | Ninguna garantizada  |
| Presupuesto para herramientas de pago | | Priorizar gratuitas; indicar cuándo compensa pagar una suscripción, hasta 20€ mes si merece la pena |
| Dispositivos con los que estudiará | | Portátil Windows + tablet o móvil |
| Nombre del curso | | Mi IA Médica - Learning Path |

## 1. Tu papel

Vas a actuar como un equipo completo: diseñador instruccional especializado en formación médica continuada, divulgador de IA para público sin formación técnica, diseñador UX/UI y desarrollador front-end. Cuando haya conflicto entre objetivos, este es el orden de prioridad:

1. Exactitud (técnica y clínica) y nada inventado.
2. Claridad para un lector sin formación técnica.
3. Utilidad práctica en el día a día del médico.
4. Atractivo visual y motivación.
5. Exhaustividad.

Trabaja y respóndeme siempre en español de España.

## 2. Qué vamos a construir

Una web de aprendizaje personal, dinámica y visual, para que un médico se inicie en la inteligencia artificial y acabe usándola con soltura y seguridad en su trabajo. Duración total: entre 30 y 40 horas de dedicación (objetivo ≈35 h), repartidas en tres partes:

1. **Fundamentos**: qué es la IA, cómo ha evolucionado y cómo funciona, hasta el estado del arte actual y sus aplicaciones generales.
2. **IA en medicina**: aplicaciones en medicina en general, con un capítulo propio de geriatría; herramientas y repositorios, tanto generalistas como de nicho.
3. **Tu caja de herramientas**: talleres prácticos que resuelven necesidades concretas del alumno (sección 6, Parte 3).

Debe invitar a seguir el camino de forma fluida: sesiones cortas, progreso visible, variedad de formatos y una sensación constante de «esto me sirve el lunes en la consulta».

## 3. El alumno

- Médico en ejercicio, con mucho conocimiento clínico y muy poco tecnológico: correo, Word, Excel a nivel usuario y SPSS siguiendo pasos. Ha usado algo ChatGPT o similares.
- Tiene poco tiempo: estudiará en huecos de 15–30 minutos, a menudo desde tablet o móvil.
- Es curioso pero escéptico. Le preocupan equivocarse con un paciente, la privacidad de los datos y «hacer el ridículo» con la tecnología.
- Domina conceptos que podemos aprovechar como puente: sensibilidad, especificidad, valores predictivos, curvas ROC, sesgos de selección, validación de escalas, guías clínicas.

## 4. Principios pedagógicos y de tono

- **Lenguaje llano.** Frases cortas, tuteo cercano y respetuoso, cero jerga sin explicar. Cada término técnico se introduce con una definición de una línea y una analogía, y aparece en el glosario (con tooltip en el texto). Prueba de fuego: lo entendería cualquier persona sin formación técnica.
- **Analogías médicas como hilo conductor.** Úsalas de forma sistemática. Punto de partida (amplíalo):

| Concepto de IA | Analogía médica |
|---|---|
| Entrenar un modelo | La residencia: aprender viendo miles de casos |
| Datos de entrenamiento | La casuística que ha visto el residente |
| Sobreajuste | El residente que memoriza las preguntas del examen y falla con el paciente real |
| Sesgo del modelo | Un ensayo clínico que excluyó a los mayores de 75 años |
| Evaluar un modelo | Sensibilidad, especificidad, VPP y curva ROC |
| Validación externa | Validar una escala en otra población antes de usarla |
| Alucinación | Confabulación: respuesta fluida, segura y falsa |
| Prompt | Una buena hoja de interconsulta: contexto, pregunta concreta y qué esperas recibir |
| Ventana de contexto | Lo que recuerdas de la consulta en curso y olvidas en la siguiente |
| Búsqueda con fuentes (RAG) | Consultar la guía clínica antes de contestar |
| Ajuste fino (fine-tuning) | Hacer la especialidad después del grado |
| Modelo de razonamiento | Pensar el diagnóstico diferencial en voz alta antes de decidir |
| Agente | Un residente al que encargas una tarea de varios pasos y cuyo trabajo supervisas |
| Complacencia del modelo | El residente que te da la razón porque eres el adjunto |

- **Microaprendizaje.** Cada subcapítulo se divide en sesiones de 15–25 minutos, con un botón «continúa donde lo dejaste».
- **Aprender haciendo.** En cuanto sea posible, el alumno prueba algo real. El primer «éxito» útil debe llegar en los primeros 30 minutos del curso.
- **Variedad de formatos** dentro de cada subcapítulo: texto breve, visual interactivo propio, vídeo en castellano, lectura externa, práctica y test.
- **Honestidad, no promoción.** Cada herramienta y técnica se presenta con lo que hace bien, lo que hace mal y cuándo no usarla. Nada de tono de folleto comercial.
- **Adulto profesional.** Motivador sin infantilizar: nada de mascotas, confeti constante ni lenguaje de videojuego infantil.

## 5. Anatomía obligatoria de cada subcapítulo

1. **Cabecera**: título, tiempo estimado, 2–4 objetivos de aprendizaje con verbos observables («serás capaz de…») y un gancho de 2–3 líneas, idealmente un mini caso clínico o una situación de consulta.
2. **Explicación** en bloques cortos (máximo ~150 palabras por bloque), con negritas para lo esencial y una analogía médica por concepto clave.
3. **Al menos un elemento visual propio**: interactivo, animación o infografía (ideas en la sección 6). Todo funciona en el navegador, sin servidor y sin claves de API.
4. **Recursos externos verificados** (1–3): idealmente un vídeo en castellano y un artículo o blog claro, cada uno con una línea de «por qué verlo» y su duración o tiempo de lectura (reglas en la sección 7).
5. **«Pruébalo tú»**: práctica guiada con instrucciones paso a paso y una plantilla de prompt para copiar con un botón. Obligatorio en la Parte 3; recomendado en las Partes 1 y 2.
6. **«Ojo con…»**: errores típicos y límites.
7. **Resumen** en 3–5 puntos + **ficha de bolsillo** imprimible (una página, mediante CSS de impresión).
8. **Test final** de 3–5 preguntas: sencillo, con retroalimentación inmediata que explique por qué cada opción es correcta o incorrecta, reintentos ilimitados y sin penalización. Mezcla tipos: opción única, verdadero/falso, ordenar pasos, emparejar, y escenarios del tipo «¿qué harías?» o «¿qué falla en esta respuesta de la IA?».
9. **Pie**: fecha de última revisión y fuentes.

## 6. Estructura del curso (propuesta de partida: valídala y ajústala en la Fase 0)

Las horas son orientativas y suman ≈39 h, cerca del techo. Si al calcularlas la suma supera las 40 h, recorta antes la Parte 1 que la Parte 3.

### Módulo 0 · Bienvenida (≈45 min)

- Cómo funciona el curso, mapa del camino y autoevaluación inicial (no puntúa; sirve para comparar al final).
- **Primer éxito en 10 minutos**: crear una cuenta en un asistente gratuito y pedirle algo útil y no clínico (resumir un documento público, redactar un correo complicado).

### Parte 1 · Fundamentos (≈12 h)

| # | Subcapítulo | h | Ideas de interactivo |
|---|---|---|---|
| 1.1 | ¿Qué es la IA (y qué no es)? | 1 | Juego «¿Esto es IA?»: clasificar ejemplos cotidianos y clínicos |
| 1.2 | De Turing a hoy: breve historia | 1,5 | Línea temporal interactiva. Gancho: MYCIN (Stanford, años 70), un sistema experto que recomendaba antibióticos y nunca llegó a usarse en la clínica. ¿Por qué? |
| 1.3 | Cómo aprende una máquina | 2 | «Entrena tu modelo de fragilidad»: mover un umbral sobre pacientes ficticios y ver cambiar en directo sensibilidad, especificidad y curva ROC. Demo de sobreajuste |
| 1.4 | Redes neuronales sin fórmulas | 1,5 | Neurona artificial con deslizadores; capas como un «comité de especialistas»; por qué la imagen médica fue la primera revolución |
| 1.5 | Cómo «piensa» ChatGPT o Claude (los LLM) | 2 | Visualizador de tokens; juego «predice la siguiente palabra»; deslizador de temperatura con respuestas precalculadas; juego «detecta la confabulación» |
| 1.6 | Más allá del texto: imagen, voz y vídeo | 1 | Galería de capacidades multimodales; de la voz a la nota clínica (escribas ambientales) |
| 1.7 | El estado del arte hoy | 1,5 | Mapa del ecosistema: empresas, modelos abiertos y cerrados, gratuito y de pago, modelos de razonamiento, agentes. **Investiga en el momento de construir y pon fecha** |
| 1.8 | El arte de preguntar (prompting) | 1,5 | Constructor de prompts por bloques (rol, contexto, tarea, formato, límites) con indicador de calidad basado en reglas; antes y después de un mismo prompt |

### Parte 2 · IA en medicina (≈8,5 h)

| # | Subcapítulo | h | Contenido clave |
|---|---|---|---|
| 2.1 | Dónde está ya la IA en medicina | 2 | Imagen (radiología, dermatología, oftalmología), anatomía patológica, ECG, predicción de deterioro, documentación clínica, descubrimiento de fármacos (AlphaFold); LLM y exámenes médicos frente a práctica real. Mapa interactivo por especialidades |
| 2.2 | Leer con lupa un estudio de IA médica | 1,5 | Métricas, validación externa, cambio de población, sesgos, guías de publicación (TRIPOD+AI, CONSORT-AI…). Juego «¿Te fiarías?» con 3 productos ficticios |
| 2.3 | Ética, regulación y privacidad | 1,5 | RGPD y LOPDGDD (datos de salud como categoría especial), Reglamento Europeo de IA (**verifica su calendario de aplicación vigente**), IA como producto sanitario, responsabilidad profesional y deontología, guía de la OMS sobre modelos multimodales en salud. Juego semáforo «¿Puedo pegar esto en la IA?» |
| 2.4 | Mapa de herramientas | 1,5 | Asistentes generalistas, herramientas médicas basadas en evidencia, herramientas de búsqueda bibliográfica y de productividad. Enlaza con el directorio filtrable (sección 10) |
| 2.5 | IA y geriatría | 2 | Fragilidad (p. ej., índices electrónicos de fragilidad), caídas y sensores, predicción de delirium, deterioro cognitivo (voz, imagen), polifarmacia, monitorización en domicilio y residencias, robots sociales y soledad, edadismo en los algoritmos (OMS), brecha digital del paciente mayor. Si la evidencia es escasa o preliminar, dilo con claridad |

### Parte 3 · Tu caja de herramientas (≈17,5 h)

Cada taller sigue el mismo esquema: **para qué sirve → flujo de trabajo paso a paso → herramientas (verificadas) → taller con caso o datos sintéticos → plantillas de prompt → verificación → «ojo con…»**. Todos los casos y datos de ejemplo son ficticios y lo indican.

**3.0 · Tu entorno de trabajo seguro (1 h).** Qué cuentas abrir y qué plan conviene; ajustes de privacidad (por ejemplo, desactivar el uso de tus conversaciones para entrenar donde sea posible); la regla de oro de la anonimización con una checklist (nombre, NHC, DNI/CIP, fechas exactas → edades o intervalos, dirección, combinaciones raras que identifican); consultar la política del propio centro. Se recomienda antes de cualquier otro módulo de la Parte 3.

**3.1 · Dudas sobre casos clínicos: diagnóstico, tratamiento y seguimiento (2,5 h).**
- Flujo: anonimizar → presentar el caso estructurado como en una sesión clínica → pedir un diagnóstico diferencial razonado (qué datos apoyan y cuáles refutan cada opción, qué pruebas discriminan) → abordaje terapéutico y plan de seguimiento con referencia a guías → pedir a la IA que critique su propia respuesta → contrastar con una fuente de referencia → la decisión es siempre del médico.
- Enseña la complacencia del modelo: si le das tu sospecha, tiende a confirmarla. Presenta el caso de forma neutra.
- Herramientas candidatas: asistentes generalistas con modo de razonamiento; herramientas que citan evidencia (OpenEvidence, UpToDate con IA si el centro lo ofrece); cuadernos con guías propias en PDF (NotebookLM o proyectos en asistentes).
- Taller: caso geriátrico sintético (p. ej., mujer de 86 años con caídas de repetición, confusión fluctuante, hiponatremia y 11 fármacos).

**3.2 · Farmacología: ajuste de dosis, dosis máximas, combinaciones y deprescripción (2,5 h).**
- Principio: la IA explica, organiza y propone; **la dosis se verifica en fuente oficial** (ficha técnica en CIMA-AEMPS) y los cálculos (aclaramiento de creatinina, etc.) se hacen con calculadora o pidiendo a la IA que muestre el cálculo paso a paso.
- Deprescripción: criterios STOPP/START, criterios de Beers, LESS-CHRON, algoritmos de deprescribing.org, escalas de carga anticolinérgica. Usar la IA para aplicar los criterios a una lista de medicación, proponer un plan escalonado y redactar la explicación para el paciente o la familia.
- Interacciones: comprobadores de interacciones (gratuitos y los que pueda tener por su centro, como Bot PLUS o Lexicomp).
- Interactivo: «Encuentra el error», una respuesta de IA aparentemente perfecta con un error de dosis en insuficiencia renal.
- Taller: paciente sintético con 12 fármacos y filtrado glomerular de 28 ml/min.

**3.3 · Búsqueda bibliográfica actualizada (2,5 h).**
- PubMed sigue siendo la base. La IA ayuda a convertir una pregunta clínica (PICO) en una estrategia con MeSH y operadores booleanos, a cribar y a resumir.
- Herramientas candidatas: Consensus, Elicit, Scite, Semantic Scholar, OpenEvidence, Perplexity; mapas de citas (ResearchRabbit, Connected Papers, Litmaps); Epistemonikos, Cochrane, Trip; acceso a texto completo mediante la biblioteca virtual de su servicio de salud; Zotero como gestor; alertas automáticas en PubMed.
- Peligro central: **referencias inventadas**. Comprobar siempre PMID o DOI.
- Interactivos: constructor visual de búsquedas para PubMed (bloques arrastrables) y juego «¿Referencia real o inventada?».
- Taller: pregunta PICO geriátrica → estrategia → 5 artículos de los últimos 2 años → tabla de evidencia.

**3.4 · Análisis estadístico de una base de datos en Excel (3 h).**
- Compara tres caminos con sus pros y contras:
  - (a) jamovi o JASP: gratuitos, se parecen a SPSS y los datos no salen del ordenador.
  - (b) Asistente de IA con análisis de datos: se sube el Excel anonimizado y se conversa.
  - (c) **Híbrido (recomendado por privacidad)**: la IA como tutor estadístico, el análisis en jamovi y a la IA solo se le pegan resultados agregados para interpretarlos y redactarlos.
- Preparar el Excel: limpieza, diccionario de variables, codificación y anonimización.
- Interactivos: árbol de decisión «¿Qué prueba estadística uso?» y visualizador intuitivo de p-valor e intervalo de confianza.
- Taller con **dataset sintético descargable**: genera ~250 pacientes geriátricos ficticios en .xlsx (edad, sexo, Barthel, Pfeiffer, número de fármacos, escala FRAIL, caídas, ingresos, mortalidad a 12 meses), con relaciones plausibles y algunos errores intencionados para limpiar.
- Verificación: reproducir un resultado clave por una segunda vía.

**3.5 · Escribir un artículo científico (2 h).**
- Estructura IMRaD, guías EQUATOR (STROBE, CARE, CONSORT…), políticas del ICMJE y de las revistas sobre IA (no puede ser autora; hay que declarar su uso).
- Qué delegar (esquema, edición, traducción al inglés, resumen, carta al editor, respuesta a revisores) y qué no (datos, resultados, referencias sin verificar).
- Taller: case report según CARE con el caso de 3.1, o resumen tipo congreso con los resultados de 3.4.

**3.6 · Presentaciones en PowerPoint (1,5 h).**
- Flujo: objetivo y audiencia → guion → la IA genera la estructura y las notas del ponente → herramienta para las diapositivas (Gamma, Copilot en PowerPoint si su centro lo tiene, Canva, asistentes que generan .pptx) → revisión de diseño (una idea por diapositiva) → imágenes clínicas anonimizadas y con consentimiento.
- Taller: presentación de 10 diapositivas del caso de 3.1.

**3.7 · Cursos de formación continuada: estudiar, repasar y responder con IA (1 h).**
- Método fiable: cargar el material del curso (PDF) en NotebookLM o en un proyecto de un asistente, y preguntar exigiendo respuestas basadas en ese material, con cita de página. Generar preguntas de repaso y tarjetas; pedir que explique por qué cada opción es correcta o incorrecta.
- Honestidad: la IA sin el material del curso falla precisamente en las preguntas de detalle. Recordar que cada curso acreditado tiene sus propias normas sobre la evaluación.
- Taller: con el PDF de una guía clínica pública.

**3.8 · Proyecto final (1,5 h).** A elegir: (a) caso clínico completo → presentación; (b) mini estudio con el dataset sintético → resumen tipo congreso → presentación. Checklist de autoevaluación y certificado de finalización (no oficial, generado en el navegador).

## 7. Recursos externos: reglas estrictas

- **Nunca inventes una URL ni un vídeo.** Todo enlace se verifica con una petición real antes de incluirlo: responde correctamente, el contenido coincide con lo que dices y está disponible desde España.
- **YouTube**: comprueba cada vídeo con el endpoint oEmbed (`https://www.youtube.com/oembed?url=…&format=json`), registra título, canal y duración, y confirma que está en castellano (si solo tiene subtítulos en español, márcalo). Insértalo con `youtube-nocookie.com` y carga diferida.
- Prioriza fuentes estables e institucionales (universidades, sociedades científicas, organismos públicos, divulgadores consolidados) frente a vídeos virales.
- Centraliza todos los recursos en `src/data/recursos.json` con: id, título, autor o canal, URL, tipo, idioma, duración o tiempo de lectura, subcapítulos donde se usa, «por qué verlo», fecha de verificación y estado.
- Crea un script `npm run check-links` que revise todos los enlaces y genere un informe.
- Si para un concepto no encuentras un buen recurso en castellano, no rellenes con cualquier cosa: compénsalo con un interactivo o una infografía propia y anótalo en el informe de la fase.
- Candidatos semilla para **verificar** (no los des por buenos): canal DotCSV (Carlos Santana), Ringa Tech, 3Blue1Brown Español (redes neuronales), curso Elements of AI en español, curso «IA para todos» de Andrew Ng (con subtítulos en español), guía de la OMS sobre ética y gobernanza de modelos multimodales en salud, posicionamientos sobre IA de la OMC y de sociedades científicas españolas (SEGG, semFYC, SEMI…).
- No reproduzcas textos, imágenes ni figuras con derechos: enlaza y crea tus propias ilustraciones en SVG.

## 8. Herramientas de IA mencionadas: reglas

- Para cada herramienta verifica, en el momento de construir: si sigue existiendo, si la puede usar un médico desde España (algunas exigen ser profesional sanitario en EE. UU.), si es gratuita o de pago y cuánto cuesta, si está en español y **si es apta o no para introducir datos de pacientes**.
- Guárdalas en `src/data/herramientas.json` con fecha de verificación. Todo contenido sensible al paso del tiempo (estado del arte, herramientas, regulación) lleva la etiqueta «a fecha de [mes año]».
- Presenta las herramientas por **tarea** («quiero buscar bibliografía»), no por marca.

## 9. Seguridad clínica y privacidad (transversal e innegociable)

- Aviso visible y sobrio (sin alarmismo): la IA no sustituye el juicio clínico y la responsabilidad es del médico.
- Todos los casos, pacientes y datos de ejemplo son **sintéticos** y se indica.
- Ninguna dosis o recomendación clínica del curso se presenta sin fuente y fecha. Los ejemplos de farmacología remiten siempre a la ficha técnica.
- En cada taller de la Parte 3 aparece un paso explícito de **anonimización** y otro de **verificación**.
- Crea `REVISION_CLINICA.md` con todas las afirmaciones clínicas, dosis y criterios usados en ejemplos y tests, cada una con su fuente, para que un médico las revise antes de dar el curso por bueno.

## 10. Experiencia, motivación y diseño

- **Mapa del camino** visual como portada (por ejemplo, un plano de metro: tres líneas, una por parte, y una estación por subcapítulo) con progreso, horas completadas y próximo paso recomendado. Puedes proponer otra metáfora si funciona mejor.
- Navegación libre, con un orden recomendado y avisos suaves (no bloqueos) si se salta un requisito.
- Insignias discretas al terminar cada parte, autoevaluación final comparada con la inicial y certificado.
- Páginas transversales: **glosario** con buscador, **biblioteca de prompts** filtrable por tarea con botón de copiar, **directorio de herramientas** filtrable (tarea, gratis/pago, español, apta o no para datos de pacientes) y **buscador** global.
- Diseño limpio, cálido y profesional: ni hospitalario frío ni infantil. Tipografía grande (cuerpo ≥18 px), alto contraste, modo oscuro, mobile-first y pensado para tablet. Animaciones con propósito y respetando `prefers-reduced-motion`.
- Accesibilidad WCAG 2.1 AA: navegación por teclado, textos alternativos y contraste.

## 11. Arquitectura técnica

**Propuesta** (puedes proponer otra en la Fase 0 si cumple mejor los criterios):

- Astro con salida estática + MDX para el contenido + islas React o Preact para los interactivos + Tailwind CSS.
- Colecciones de contenido con esquema validado (zod), de modo que un subcapítulo sin objetivos, test, recursos o fecha de revisión **haga fallar la compilación**.
- Animaciones con SVG + CSS o una librería ligera; gráficos con D3 solo donde aporten; buscador estático (Pagefind).
- Progreso en `localStorage`, con exportar/importar un código de progreso para cambiar de dispositivo y opción de reiniciar.
- Sin backend, sin claves de API y sin cookies de seguimiento.
- Despliegue gratuito (Netlify, Vercel o GitHub Pages) con instrucciones en el README.

**Criterios de decisión** para el stack: (1) cero backend y cero claves; (2) contenido editable en Markdown sin tocar código; (3) carga rápida en móvil y tablet; (4) despliegue gratis y sencillo; (5) mantenible por alguien que no sea su autor.

Estructura orientativa:

```
src/content/partes/…/x-y-slug.mdx      # un archivo por subcapítulo, con frontmatter validado
src/content/tests/x-y.json             # preguntas, opciones, explicaciones
src/data/recursos.json · herramientas.json · glosario.json · prompts.json
src/components/interactivos/…          # un componente por interactivo
public/descargas/                      # dataset sintético, plantillas, fichas
scripts/check-links.mjs
REVISION_CLINICA.md · CLAUDE.md · README.md
```

Crea y mantén un `CLAUDE.md` con las convenciones del proyecto (tono, plantilla de subcapítulo, analogías, reglas de recursos y de seguridad) para que las sesiones futuras sean coherentes.

## 12. Forma de trabajo por fases (con paradas obligatorias)

Usa una lista de tareas, haz un commit de git al cerrar cada fase y no avances de fase sin mi aprobación.

**Fase 0 · Plan (sin código).** Investiga lo necesario y entrega `PLAN.md` con:

- Mapa del curso definitivo: partes, subcapítulos, sesiones, objetivos y horas, con el cálculo (lectura a ~180 palabras/min + duración de vídeos + interactivos + práctica + test). La suma debe estar entre 30 y 40 h.
- Para cada subcapítulo: interactivo o infografía propuesta, recursos candidatos con su estado de verificación y tema del test.
- Arquitectura técnica justificada con los criterios de la sección 11, y propuesta visual (paleta, tipografía, metáfora del mapa; adjunta un boceto en HTML de la portada si ayuda).
- Riesgos detectados y cómo los mitigas.
- Un máximo de 5 preguntas para mí.

**PARA y espera mi aprobación.**

**Fase 1 · Esqueleto + piloto vertical.** Infraestructura completa (navegación, mapa, progreso, motor de tests, glosario, recursos, biblioteca de prompts, directorio, impresión) y **dos subcapítulos piloto terminados al 100 %**: el 1.5 (conceptual) y el 3.2 (práctico).

Criterios para aprobar el piloto: un lector sin formación técnica lo entiende todo sin ayuda; los interactivos funcionan en móvil; los tests dan una retroalimentación clara; todos los enlaces están verificados; la compilación valida el esquema.

**PARA y espera mi revisión.**

**Fase 2 · Parte 1 completa** (+ Módulo 0). **PARA.**

**Fase 3 · Parte 2 completa.** **PARA.**

**Fase 4 · Parte 3 completa**, con el dataset sintético y todas las plantillas. **PARA.**

**Fase 5 · Control de calidad y entrega.** `check-links` sin errores; revisión de cada test (respuesta correcta inequívoca y explicación coherente); auditoría de accesibilidad y rendimiento (Lighthouse ≥90 si es posible ejecutarlo); recuento final de horas; `REVISION_CLINICA.md` completo; README con instrucciones de despliegue y de actualización del contenido.

Al final de cada fase entrega un informe breve: qué se ha hecho, decisiones tomadas, qué falta y qué necesitas de mí.

## 13. Definición de «terminado» por subcapítulo

- [ ] Sigue la plantilla de la sección 5 completa.
- [ ] Tiene al menos un elemento visual propio que funciona en móvil.
- [ ] Todos sus recursos externos están verificados y con fecha.
- [ ] Ningún término técnico aparece sin explicar ni sin entrada en el glosario.
- [ ] Test de 3–5 preguntas con explicación por opción.
- [ ] Afirmaciones clínicas con fuente y añadidas a `REVISION_CLINICA.md`.
- [ ] Tiempo estimado calculado y coherente con el plan.

## 14. Lo que no quiero

- Muros de texto, jerga sin explicar o explicaciones que presupongan conocimientos técnicos.
- Enlaces, vídeos, referencias o datos inventados.
- Tono comercial o entusiasmo sin matices sobre las herramientas.
- Dosis o recomendaciones clínicas sin fuente.
- Un diseño infantil o una gamificación invasiva.
- Avanzar de fase sin mi aprobación.

**Empieza ahora por la Fase 0. No escribas código hasta que apruebe el plan.**
