# PLAN · Mi IA Médica – Learning Path

**Fase 0 · Plan (sin código)** · Redactado el 29 de octubre de 2026 · Estado: **pendiente de tu aprobación**

> Todo lo que aparece aquí como «verificado» se ha comprobado con una petición real el 29/10/2026 desde una conexión en España (ver [Anexo A](#anexo-a--registro-de-verificación-de-recursos-29102026)). Lo que no he podido comprobar está marcado como tal. No he inventado ningún enlace, vídeo ni referencia.

---

## Índice

1. [Resumen en un minuto](#1-resumen-en-un-minuto)
2. [Supuestos sobre el alumno](#2-supuestos-sobre-el-alumno)
3. [Novedades detectadas al investigar (cambian el prompt)](#3-novedades-detectadas-al-investigar)
4. [Mapa del curso definitivo y cálculo de horas](#4-mapa-del-curso-definitivo-y-cálculo-de-horas)
5. [Detalle por subcapítulo](#5-detalle-por-subcapítulo)
6. [Inventario de interactivos (motores reutilizables)](#6-inventario-de-interactivos)
7. [Arquitectura técnica](#7-arquitectura-técnica)
8. [Propuesta visual](#8-propuesta-visual)
9. [Seguridad clínica y privacidad: cómo se aplica](#9-seguridad-clínica-y-privacidad-cómo-se-aplica)
10. [Riesgos y mitigación](#10-riesgos-y-mitigación)
11. [Lista de tareas por fase](#11-lista-de-tareas-por-fase)
12. [Preguntas para ti (5)](#12-preguntas-para-ti)
- [Anexo A · Registro de verificación de recursos](#anexo-a--registro-de-verificación-de-recursos-29102026)
- [Anexo B · Herramientas: verificación preliminar](#anexo-b--herramientas-verificación-preliminar)
- [Anexo C · Referencias científicas ya localizadas](#anexo-c--referencias-científicas-ya-localizadas)

---

## 1. Resumen en un minuto

- **Duración total: 36 h** (2.160 min) en **104 sesiones** de 15–25 min. Dentro del rango 30–40 h y cerca del objetivo de 35 h.
- **Reparto:** Módulo 0 (0,75 h) · Parte 1 Fundamentos (10,25 h) · Parte 2 IA en medicina (8 h) · Parte 3 Caja de herramientas (17 h). He recortado sobre todo la Parte 1 (de 12 a 10,25 h), como pedías.
- **Aprender haciendo:** el 30 % del tiempo es práctica guiada y el 23 %, interactivos. Solo el 18 % es lectura de texto propio.
- **Primer éxito útil dentro de los primeros 30 minutos** (Módulo 0, sesión 2).
- **Cambio de orden en la Parte 1:** propongo adelantar «El arte de preguntar» justo después de «Cómo piensa un LLM» (pasa de 1.8 a 1.6). Así la práctica llega antes. Te lo pregunto en la [pregunta 2](#12-preguntas-para-ti).
- **Stack:** Astro 7 (web estática) + MDX + islas Preact + Tailwind CSS 4 + Pagefind. Sin servidor, sin claves, sin cookies.
- **Metáfora visual:** plano de metro con tres líneas (una por parte) y el Módulo 0 como estación de origen. Boceto en [bocetos/portada.html](bocetos/portada.html).
- **Cinco novedades** del mundo real que obligan a ajustar el prompt (sección 3). La más importante: **OpenEvidence no está disponible en España** desde abril de 2026.

---

## 2. Supuestos sobre el alumno

La tabla de datos del alumno del prompt estaba vacía. He aplicado los valores por defecto:

| Campo | Valor aplicado |
|---|---|
| Especialidad y ámbito | Geriatría, pacientes mayores en hospital |
| Servicio de salud | España, genérico (sin CCAA concreta) |
| Herramientas del centro | Ninguna garantizada |
| Presupuesto | Priorizar gratuitas; indicar cuándo compensa pagar, hasta 20 €/mes |
| Dispositivos | Portátil Windows + tablet o móvil |
| Nombre del curso | Mi IA Médica - Learning Path |

Si alguno no es correcto, dímelo en la [pregunta 1](#12-preguntas-para-ti): afecta sobre todo a los talleres 3.1–3.3.

---

## 3. Novedades detectadas al investigar

Estas novedades cambian lo que proponía el prompt. Todo el contenido sensible al tiempo llevará la etiqueta «a fecha de [mes año]».

| # | Novedad (a fecha de octubre de 2026) | Impacto en el curso | Fuente y estado |
|---|---|---|---|
| 1 | **OpenEvidence bloquea el acceso desde la UE y el Reino Unido** desde finales de abril de 2026. Alega incertidumbre regulatoria (Reglamento de IA). | Sale de las herramientas «candidatas» de 3.1 y 3.3. Lo uso como ejemplo didáctico: **comprueba siempre si una herramienta está disponible en España**. Alternativas que valoraré en la Fase 4: UpToDate Expert AI (si el centro la ofrece), ClinicalKey AI, DynaMed, BMJ Best Practice, AMBOSS. | Medscape (abril 2026) y prensa sectorial; no he encontrado el comunicado original de la empresa. Desde aquí, su web responde con un captcha anti-bots, lo que no confirma ni desmiente el bloqueo. **Confirmar manualmente en la Fase 4.** |
| 2 | **NotebookLM ahora se llama «Gemini Notebook»** (16/07/2026). Es el mismo producto y la dirección redirige a `notebook.google.com`. | En 3.1, 3.7 y el directorio la llamaré «Gemini Notebook (antes NotebookLM)». Los vídeos anteriores al cambio de nombre se marcarán así. | Blog oficial de Google y Google Workspace Updates. La redirección está verificada. |
| 3 | **El calendario del Reglamento Europeo de IA ha cambiado.** El «Ómnibus Digital» es el Reglamento (UE) 2026/1744 y está en vigor desde el 27/07/2026. Los sistemas de **alto riesgo del Anexo III** se aplazan al **02/12/2027**. Los ligados a productos regulados del **Anexo I** (aquí entran los productos sanitarios) se aplazan al **02/08/2028**. Las prohibiciones (desde 02/02/2025) y las obligaciones de los modelos de uso general (desde 02/08/2025) siguen igual. | 2.3 explicará el calendario vigente con fecha. Algunos vídeos de 2024–2025 citan fechas antiguas: lo advertiré junto al vídeo. | artificialintelligenceact.eu (explorador del texto) y varios despachos. EUR-Lex bloquea las peticiones automáticas. **Confirmar en EUR-Lex en la Fase 3.** |
| 4 | **España tiene en tramitación un Proyecto de Ley Orgánica para el buen uso y la gobernanza de la IA.** Se publicó en el Boletín de las Cortes el 12/06/2026 y todavía no es ley. | 2.3 lo menciona como «en tramitación (a fecha de…)». La AESIA es la autoridad de supervisión. | Prensa jurídica. **Comprobar el estado en la Fase 3.** |
| 5 | **La OMC publicó en junio de 2026 su «Manual de Buenas Prácticas para la Inteligencia Artificial en Medicina».** Tiene 140 páginas, es de acceso abierto e incluye «diez principios para el médico», «diez garantías para el paciente» y un checklist para evaluar herramientas. | Será el recurso de referencia de 2.3, 3.0 y 3.1. Es un PDF de 31 MB: avisaré del tamaño para quien lo abra desde el móvil. | PDF descargado y revisado (portada, sumario y metadatos). ✅ |

Otros hallazgos útiles:

- **STOPP/START versión 3 tiene versión oficial en español** (Delgado-Silveira et al., *Rev Esp Geriatr Gerontol* 2023). Hay acceso abierto a través de *Salud y Fármacos*. ✅
- **CHART (2025)** es una guía nueva para publicar estudios de chatbots que dan consejo de salud. La añado a 2.2. ✅
- **UpToDate:** según Wolters Kluwer, el Ministerio de Sanidad tiene un acuerdo nacional para los profesionales del SNS. No sé si incluye «Expert AI», la función de IA. Lo pregunto ([pregunta 1](#12-preguntas-para-ti)) y lo verificaré en la Fase 4.
- **Precios orientativos** (fuentes secundarias de 2026, **sin confirmar** en la página oficial): Claude Pro unos 18 €/mes, ChatGPT Plus unos 23 €/mes y Google AI Pro unos 21,99 €/mes. Los confirmaré en la Fase 4 antes de escribir 3.0.
- **El estado del arte se mueve deprisa.** Los rastreadores de lanzamientos de octubre de 2026 citan nuevas familias de modelos de OpenAI, Google, Anthropic, DeepSeek y Meta. Su fiabilidad es irregular. El subcapítulo 1.8 se investigará en el momento de construirlo (Fase 2) y solo con fuentes oficiales de cada empresa.

---

## 4. Mapa del curso definitivo y cálculo de horas

### 4.1 Cómo calculo el tiempo

Para cada subcapítulo sumo:

- **Lectura** del texto propio: número de palabras ÷ 180 palabras/min.
- **Vídeo:** duración real verificada (o del fragmento recomendado). Los vídeos «opcionales» **no** cuentan.
- **Lectura externa:** tiempo estimado de la parte que se pide leer.
- **Interactivo:** tiempo estimado de uso con atención (5–15 min cada uno).
- **Práctica** («Pruébalo tú» y talleres).
- **Test + resumen:** unos 1,5 min por pregunta, más 2–3 min de resumen y ficha.

En la Fase 5, un script (`npm run horas`) recalculará el total a partir del contenido real: palabras contadas y minutos declarados en cada sesión. Así el plan y el curso no se desincronizan.

### 4.2 Tabla de horas

| # | Subcapítulo | Palabras | Lectura | Vídeo | Lect. ext. | Interactivo | Práctica | Test + resumen | **Total** | Sesiones |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| M0 | Bienvenida | 1.600 | 9 | 0 | 0 | 16 | 15 | 5 | **45** | 2 |
| 1.1 | ¿Qué es la IA (y qué no es)? | 2.000 | 11 | 16 | 0 | 9 | 0 | 9 | **45** | 2 |
| 1.2 | De Turing a hoy | 1.600 | 9 | 12 | 0 | 15 | 0 | 9 | **45** | 2 |
| 1.3 | Cómo aprende una máquina | 4.300 | 24 | 14 | 10 | 45 | 15 | 12 | **120** | 6 |
| 1.4 | Redes neuronales sin fórmulas | 2.200 | 12 | 21 | 0 | 18 | 0 | 9 | **60** | 3 |
| 1.5 | Cómo «piensa» un LLM ★ piloto | 4.400 | 24 | 23 | 0 | 34 | 27 | 12 | **120** | 6 |
| 1.6 | El arte de preguntar *(antes 1.8)* | 3.000 | 17 | 15 | 0 | 16 | 30 | 12 | **90** | 4 |
| 1.7 | Más allá del texto *(antes 1.6)* | 2.200 | 12 | 6 | 6 | 16 | 11 | 9 | **60** | 3 |
| 1.8 | El estado del arte hoy *(antes 1.7)* | 3.000 | 17 | 9 | 5 | 22 | 10 | 12 | **75** | 4 |
| | **Parte 1** | 22.700 | 126 | 116 | 21 | 175 | 93 | 84 | **615 (10,25 h)** | 30 |
| 2.1 | Dónde está ya la IA en medicina | 4.300 | 24 | 26 | 10 | 30 | 18 | 12 | **120** | 6 |
| 2.2 | Leer con lupa un estudio de IA | 3.200 | 18 | 0 | 15 | 35 | 10 | 12 | **90** | 4 |
| 2.3 | Ética, regulación y privacidad | 3.400 | 19 | 18 | 15 | 18 | 8 | 12 | **90** | 4 |
| 2.4 | Mapa de herramientas | 2.000 | 11 | 0 | 0 | 22 | 16 | 11 | **60** | 3 |
| 2.5 | IA y geriatría | 4.500 | 25 | 15 | 15 | 35 | 18 | 12 | **120** | 6 |
| | **Parte 2** | 17.400 | 97 | 59 | 55 | 140 | 70 | 59 | **480 (8 h)** | 23 |
| 3.0 | Tu entorno de trabajo seguro | 2.000 | 11 | 0 | 6 | 15 | 18 | 10 | **60** | 3 |
| 3.1 | Dudas sobre casos clínicos | 4.000 | 22 | 0 | 10 | 25 | 75 | 18 | **150** | 7 |
| 3.2 | Farmacología ★ piloto | 4.000 | 22 | 7 | 10 | 30 | 63 | 18 | **150** | 7 |
| 3.3 | Búsqueda bibliográfica | 3.800 | 21 | 21 | 0 | 30 | 60 | 18 | **150** | 7 |
| 3.4 | Análisis estadístico de un Excel | 4.300 | 24 | 22 | 0 | 30 | 86 | 18 | **180** | 9 |
| 3.5 | Escribir un artículo científico | 3.200 | 18 | 0 | 12 | 12 | 51 | 12 | **105** | 5 |
| 3.6 | Presentaciones | 2.200 | 12 | 10 | 0 | 8 | 35 | 10 | **75** | 4 |
| 3.7 | Cursos de formación continuada | 1.800 | 10 | 7 | 0 | 6 | 28 | 9 | **60** | 3 |
| 3.8 | Proyecto final | 1.200 | 7 | 0 | 0 | 13 | 65 | 5 | **90** | 4 |
| | **Parte 3** | 26.500 | 147 | 67 | 38 | 169 | 481 | 118 | **1.020 (17 h)** | 49 |
| | **TOTAL** | **68.200** | **379** | **242** | **114** | **500** | **659** | **266** | **2.160 (36 h)** | **104** |

**Reparto del tiempo:** práctica 30 % · interactivos 23 % · lectura propia 18 % · test y resumen 12 % · vídeo 11 % · lectura externa 5 %.

### 4.3 Cambios respecto a la propuesta de partida

| Cambio | Motivo |
|---|---|
| Parte 1: de 12 h a 10,25 h. Bajan 1.1 (1 → 0,75 h), 1.2 (1,5 → 0,75 h), 1.4 (1,5 → 1 h) y 1.7/1.8 estado del arte (1,5 → 1,25 h). | El prompt pedía recortar antes la Parte 1. 1.3 y 1.5 conservan sus 2 h porque son la base de todo lo demás. |
| **Reordenación de la Parte 1:** 1.5 LLM → **1.6 Prompting** → 1.7 Multimodal → 1.8 Estado del arte. | El prompting es lo más práctico de la Parte 1 y sigue de forma natural a «cómo piensa un LLM». El estado del arte, al final, sirve de puente con la Parte 2. Los pilotos (1.5 y 3.2) no cambian de número. |
| Parte 2: 2.4 Mapa de herramientas de 1,5 h a 1 h. | Lo detallado vive en el directorio filtrable (página transversal). El subcapítulo enseña a elegir, no a memorizar marcas. |
| Parte 3: 3.5 Artículo (2 → 1,75 h) y 3.6 Presentaciones (1,5 → 1,25 h). | Para acercarnos a 35 h sin tocar los talleres clínicos (3.1–3.4). |
| Módulo 0: al crear la cuenta se desactiva **ya** el uso de tus conversaciones para entrenar el modelo, en 2 minutos. | El primer éxito no debe crear un mal hábito de privacidad. 3.0 lo profundiza después. |
| Vídeos opcionales no computan horas. | Hay vídeos buenos pero largos (conferencias de 30–110 min). Se ofrecen como «para saber más» o con un fragmento concreto. |

### 4.4 Orden recomendado y prerrequisitos (avisos suaves, sin bloqueos)

- M0 → 1.1 → … → 1.8 → 2.1 → … → 2.5 → 3.0 → 3.1 → … → 3.8.
- **Atajo práctico:** quien tenga prisa puede ir de M0 a 1.5, 1.6, 2.3 y 3.0 y luego a cualquier taller de la Parte 3. El mapa lo señalará como «ruta exprés» (unas 9 h).
- Avisos de prerrequisito: 2.2 pide 1.3 · 3.0 pide 2.3 · todos los talleres 3.x piden 3.0 · 3.1 recomienda 1.6 · 3.2 recomienda 2.5 · 3.5 y 3.6 reutilizan el caso de 3.1 · 3.8 pide al menos tres talleres.

---

## 5. Detalle por subcapítulo

**Leyenda de estado de los recursos** (detalle técnico en el [Anexo A](#anexo-a--registro-de-verificación-de-recursos-29102026)):

- ✅ Existe, está disponible desde España, admite inserción y tiene título, canal, duración y subtítulos comprobados el 29/10/2026. **El contenido completo se revisará con la transcripción al construir cada subcapítulo.**
- 🟡 Candidato con reservas: largo (se usaría un fragmento), antiguo, doblaje automático, canal pequeño o título con tono comercial.
- 🔒 La web bloquea las comprobaciones automáticas (anti-bots). Hará falta una comprobación manual con fecha.
- ⬜ Hueco: no hay recurso adecuado en castellano. Lo compensa un interactivo o una infografía propia.
- ❌ Descartado.

Idioma: 🇪🇸 castellano de España · 🌎 español de América · 🔊 doblaje oficial al español · CC = subtítulos en español (manuales si no se indica «auto»).

---

### Módulo 0 · Bienvenida — 45 min · 2 sesiones

- **Gancho:** «No necesitas saber programar. En 10 minutos vas a conseguir que una IA te ahorre un rato hoy mismo.»
- **Serás capaz de:** (1) crear una cuenta en un asistente de IA gratuito y desactivar el uso de tus conversaciones para entrenarlo; (2) obtener un primer resultado útil y no clínico; (3) planificar tu ritmo semanal de estudio.
- **Sesiones:** S1 · Cómo funciona el curso, mapa y autoevaluación inicial (20′) · S2 · Primer éxito en 10 minutos (25′): redactar un correo complicado y resumir un documento público, por ejemplo una nota informativa de la AEMPS.
- **Visual propio:** recorrido guiado por el mapa de metro; autoevaluación de confianza (12 ítems, no puntúa) que se guarda para compararla al final; planificador «¿cuántos huecos tienes a la semana?», que calcula la fecha estimada de fin.
- **Recursos:** ninguno externo obligatorio. Opcional: r-elementsofai-es ✅.
- **Test (3 preguntas):** qué datos nunca se introducen; qué hacer si la respuesta parece muy segura; dónde se guarda tu progreso.

### PARTE 1 · FUNDAMENTOS (10,25 h)

#### 1.1 · ¿Qué es la IA (y qué no es)? — 45 min · 2 sesiones

- **Gancho:** «Tu móvil se desbloquea con tu cara. El electrocardiógrafo imprime "probable fibrilación auricular". El corrector cambia "disnea" por "Disney". ¿Cuál de esas cosas es IA?»
- **Serás capaz de:** (1) distinguir IA, aprendizaje automático, aprendizaje profundo e IA generativa; (2) clasificar ejemplos cotidianos y clínicos como IA o no IA, y justificarlo; (3) explicar la diferencia entre un sistema de reglas y uno que aprende de datos.
- **Sesiones:** S1 · Reglas frente a aprendizaje (22′) · S2 · Las muñecas rusas: IA ⊃ aprendizaje automático ⊃ aprendizaje profundo ⊃ IA generativa (23′).
- **Visual propio:** juego **«¿Esto es IA?»**, que clasifica 12 ejemplos (escala de Barthel en Excel, alarma de monitor, detector de nódulos, autocorrector, ChatGPT…) y explica cada uno; infografía SVG de las muñecas rusas.
- **Recursos:** v-derivando-ia ✅ 🇪🇸 (8:33) · v-dotcsv-ml-mapa ✅ 🇪🇸 (7:46) · r-elementsofai-es ✅ (capítulo 1, opcional) · v-mantaras-cara-oculta ✅ 🇪🇸 (15:29, opcional).
- **Analogías:** sistema de reglas = protocolo en diagrama de flujo; aprendizaje = residencia.
- **Test (5):** clasificar ejemplos; V/F «la IA entiende lo que dice»; emparejar términos con definiciones.

#### 1.2 · De Turing a hoy: breve historia — 45 min · 2 sesiones

- **Gancho:** MYCIN (Stanford, años 70) recomendaba antibióticos. En una evaluación a ciegas publicada en *JAMA* en 1979, sus recomendaciones se juzgaron comparables a las de expertos en enfermedades infecciosas. Nunca se usó con pacientes. ¿Por qué?
- **Serás capaz de:** (1) situar en una línea temporal los hitos clave (Turing 1950, Dartmouth 1956, sistemas expertos, inviernos de la IA, aprendizaje profundo 2012, *transformers* 2017, ChatGPT 2022, modelos de razonamiento); (2) explicar por qué MYCIN no llegó a la clínica y qué lecciones siguen vigentes; (3) reconocer los ciclos de entusiasmo y decepción.
- **Sesiones:** S1 · Línea temporal (22′) · S2 · El caso MYCIN y las lecciones para hoy (23′).
- **Visual propio:** **línea temporal interactiva** con hitos médicos en paralelo (MYCIN, INTERNIST-1, primera aprobación de la FDA de un sistema autónomo de retinopatía, AlphaFold…) y ejercicio «ordena las causas del fracaso de MYCIN».
- **Recursos:** v-dotcsv-pasado-presente 🟡 🇪🇸 (28:43; fragmento de unos 12 min, por determinar con la transcripción) · v-edteam-historia 🟡 🌎 (26:56, alternativa) · Yu VL et al., *JAMA* 1979 (PMID 480542) ✅.
- **Test (4):** ordenar hitos; «¿qué falló en MYCIN?» (respuesta múltiple con explicación); V/F sobre los inviernos de la IA.

#### 1.3 · Cómo aprende una máquina — 2 h · 6 sesiones

- **Gancho:** «Te ofrecen un modelo que predice qué pacientes de tu planta serán frágiles al alta con un "95 % de precisión". ¿Lo compras?»
- **Serás capaz de:** (1) explicar con la analogía de la residencia cómo aprende un modelo a partir de ejemplos etiquetados; (2) interpretar sensibilidad, especificidad, VPP, VPN y curva ROC/AUC en la salida de un modelo, y cómo cambian al mover el umbral y la prevalencia; (3) reconocer el sobreajuste y por qué se separan los datos de entrenamiento, validación y prueba; (4) explicar por qué un modelo necesita validación externa antes de usarse en otra población.
- **Sesiones:** S1 · Aprender de ejemplos: supervisado, no supervisado y por refuerzo (20′) · S2 · Del dato a la predicción: variables, etiquetas y umbral (20′) · S3 · Evaluar como un clínico: matriz de confusión, ROC y el efecto de la prevalencia en el VPP (20′) · S4 · El residente que memoriza el examen: sobreajuste (20′) · S5 · Datos y sesgos: el ensayo que excluyó a los mayores de 75 (20′) · S6 · Pruébalo tú, resumen y test (20′).
- **Visual propio (estrella del curso):** **«Entrena tu modelo de fragilidad»**. Son 200 pacientes ficticios; mueves un umbral y ves cambiar en directo la matriz de confusión, sensibilidad, especificidad, VPP, VPN y el punto sobre la curva ROC. Incluye un deslizador de prevalencia y el botón **«Cambia de hospital»**, en el que la población cambia y el AUC cae. **Demo de sobreajuste:** una curva que se ajusta cada vez más a los puntos de entrenamiento mientras sube el error con pacientes nuevos.
- **Recursos:** v-cuello-roc ✅ 🌎 (8:50) · v-codbits-overfitting ✅ 🌎 CC (5:28) · v-bioest-roc ✅ (8:30, alternativa) · r-elementsofai-es ✅ (capítulo 4, unos 10 min).
- **Pruébalo tú:** pide a un asistente que explique la diferencia entre sensibilidad y VPP con un ejemplo de geriatría y comprueba si se equivoca. Plantilla incluida.
- **Analogías:** residencia, casuística, residente que memoriza, ensayo sin mayores de 75, validar una escala en otra población.
- **Test (5):** ¿qué pasa con el VPP si baja la prevalencia?; ordenar el flujo entrenamiento → validación → prueba; emparejar el error con su analogía; escenario «¿qué falla en este estudio?».

#### 1.4 · Redes neuronales sin fórmulas — 1 h · 3 sesiones

- **Gancho:** en 2016, un algoritmo detectó retinopatía diabética en retinografías con alta sensibilidad y especificidad frente al criterio de un panel de oftalmólogos (Gulshan et al., *JAMA* 2016). ¿Cómo «ve» una máquina?
- **Serás capaz de:** (1) describir una neurona artificial (entradas, pesos, umbral) como una decisión clínica ponderada; (2) explicar por qué apilar capas permite reconocer patrones complejos (el «comité de especialistas»); (3) explicar por qué la imagen médica fue la primera gran revolución del aprendizaje profundo; (4) reconocer el problema de la «caja negra» con un ejemplo real.
- **Sesiones:** S1 · Una neurona con deslizadores (21′) · S2 · Capas, comités e imagen médica (20′) · S3 · ¿En qué se fija? Caja negra y atajos engañosos (19′).
- **Visual propio:** **neurona con deslizadores** («¿ingreso o alta?»: edad, Barthel, convivencia… con pesos ajustables); animación de capas (bordes → formas → lesión); ejercicio **«¿en qué se fija?»** basado en el estudio en el que unas marcas de rotulador en la piel confundían a una red de dermatología (Winkler et al., *JAMA Dermatol* 2019). Ilustración propia, sin imágenes del artículo.
- **Recursos:** v-dotcsv-neurona ✅ 🇪🇸 (9:14) · v-ringa-redes ✅ (11:52) · opcionales: v-3b1b-red-es ✅ (20:51) y v-dotcsv-cnn ✅ 🇪🇸 (13:25).
- **Test (4):** emparejar las partes de la neurona con su analogía; V/F sobre la caja negra; escenario «la red acierta por la razón equivocada».

#### 1.5 · Cómo «piensa» ChatGPT o Claude (los LLM) — 2 h · 6 sesiones ★ PILOTO

- **Gancho:** «Preguntas a un asistente la dosis máxima de un fármaco para una paciente de 88 años. Te responde con un formato impecable, con total seguridad… y con un dato que no aparece en la ficha técnica. ¿Cómo puede equivocarse algo que escribe tan bien?»
- **Serás capaz de:** (1) explicar que un LLM genera texto prediciendo la siguiente pieza (token) a partir de patrones aprendidos; (2) describir qué son los tokens, la ventana de contexto y la temperatura, y cómo afectan a la respuesta; (3) explicar por qué un LLM confabula y reconocer señales de alerta en una respuesta; (4) diferenciar preentrenamiento, ajuste fino, búsqueda con fuentes (RAG), modelos de razonamiento y agentes.
- **Sesiones:** S1 · Tokens y siguiente palabra (20′) · S2 · De predecir palabras a conversar: preentrenamiento, ajuste fino y complacencia (20′) · S3 · Ventana de contexto y temperatura (20′) · S4 · Confabulación: respuesta fluida, segura y falsa (20′) · S5 · Cómo se le ayuda: RAG, razonamiento y agentes (20′) · S6 · Pruébalo tú, ficha de bolsillo y test (20′).
- **Visual propio:** **visualizador de tokens** (textos clínicos de ejemplo troceados en tokens; tokenizador real cargado solo en esa página o, si pesa demasiado, tokenizaciones precalculadas); juego **«predice la siguiente palabra»**, en el que tú eliges y luego ves las probabilidades; **deslizador de temperatura** con respuestas precalculadas; **ventana de contexto** («lo que recuerdas de la consulta en curso»); juego **«detecta la confabulación»** (cuatro respuestas, cada una con un error distinto); infografía «tres ayudas»: consultar la guía (RAG), pensar el diferencial en voz alta (razonamiento) y el residente con encargo supervisado (agente).
- **Recursos:** v-3b1b-llm ✅ 🔊 CC (7:58) · v-dotcsv-llm ✅ 🇪🇸 (15:25; es de 2022, anterior a los modelos de razonamiento, y lo advertiré) · opcionales: v-dotcsv-transformer ✅ 🇪🇸 CC (18:41) y v-3b1b-gpt ✅ 🔊 (27:14).
- **Pruébalo tú:** (a) haz la misma pregunta con y sin pedir fuentes y compara; (b) pide que razone paso a paso frente a una respuesta directa; (c) pide «¿qué datos te faltan para responder bien?».
- **Analogías:** confabulación, ventana de contexto, RAG, ajuste fino, razonamiento, agente, complacencia.
- **Test (5):** V/F «el modelo busca la respuesta en una base de datos»; escenario «¿qué falla en esta respuesta de la IA?»; emparejar conceptos con analogías; ordenar el ciclo preentrenamiento → ajuste fino → uso.

#### 1.6 · El arte de preguntar (prompting) — 1,5 h · 4 sesiones *(antes 1.8)*

- **Gancho:** dos médicos piden lo mismo: «resúmeme la guía de insuficiencia cardiaca». Uno recibe una página genérica. El otro recibe una tabla con los cambios respecto a la versión anterior y las dosis remitidas a la ficha técnica. La diferencia está en la hoja de interconsulta.
- **Serás capaz de:** (1) construir un prompt con cinco bloques: rol, contexto, tarea, formato y límites; (2) mejorar una respuesta en varias vueltas con correcciones concretas; (3) aplicar técnicas útiles: dar ejemplos, pedir pasos, pedir que pregunte lo que falta y pedir fuentes verificables; (4) reconocer los prompts que inducen complacencia o que filtran datos sensibles.
- **Sesiones:** S1 · La hoja de interconsulta: cinco bloques (22′) · S2 · Antes y después (22′) · S3 · Técnicas que funcionan (y las que no) (23′) · S4 · Tu primera plantilla personal y test (23′).
- **Visual propio:** **constructor de prompts por bloques** con un indicador de calidad basado en reglas: avisa si falta contexto o formato, o si detecta un patrón de dato identificable (DNI, NHC, fechas completas). Comparador **antes/después** del mismo prompt, con respuestas reales generadas con un modelo y etiquetadas con modelo y fecha.
- **Recursos:** v-mitjana-prompts 🟡 (14:36; título con tono comercial, revisar el contenido) · v-edteam-prompt 🟡 🌎 (46:15, opcional) · ⬜ no he encontrado un recurso institucional en castellano sobre prompting **para médicos**; lo compensan el constructor y la biblioteca de prompts.
- **Pruébalo tú:** tres plantillas: correo difícil, resumen de una guía pública e información para un paciente con lenguaje sencillo.
- **Test (5):** ordenar bloques; «¿qué le falta a este prompt?»; escenario de complacencia («le das tu sospecha y te la confirma»); V/F sobre la longitud del prompt.

#### 1.7 · Más allá del texto: imagen, voz y vídeo — 1 h · 3 sesiones *(antes 1.6)*

- **Gancho:** una compañera ya no teclea durante la consulta. Un «escriba» con IA escucha, transcribe y le propone la nota clínica. ¿Qué podría salir mal?
- **Serás capaz de:** (1) explicar qué significa que un modelo sea multimodal, con ejemplos clínicos; (2) describir el flujo de un escriba ambiental y sus riesgos: omisiones, invenciones, consentimiento y privacidad; (3) decidir cuándo es razonable usar la entrada por imagen o por voz, y con qué datos.
- **Sesiones:** S1 · Galería multimodal (20′) · S2 · De la voz a la nota (20′) · S3 · Imágenes generadas, *deepfakes* y Pruébalo tú (20′).
- **Visual propio:** **galería de capacidades** (texto ↔ imagen ↔ audio ↔ vídeo, con ejemplos no identificables); ejercicio **«audita la nota»**: una transcripción sintética de consulta y la nota generada, en la que encuentras dos omisiones y una invención.
- **Recursos:** v-redsanitaria-escriba 🟡 (6:11; canal pequeño, autoría por confirmar) · lectura sobre la evidencia de los escribas ambientales: ⬜ pendiente (en la Fase 2 buscaré estudios recientes, idealmente ensayos, y un resumen en castellano).
- **Pruébalo tú:** foto de una tabla de una guía pública → pide a la IA que la transcriba → comprueba las cifras una a una.
- **Test (4):** escenario «¿qué falla en esta nota?»; V/F sobre el consentimiento; respuesta única sobre el riesgo principal.

#### 1.8 · El estado del arte hoy — 1 h 15 min · 4 sesiones *(antes 1.7)*

- **Investigación en el momento de construir (Fase 2), con fecha.** Solo fuentes oficiales de cada empresa más alguna fuente independiente.
- **Gancho:** «Cada semana sale "el modelo más potente del mundo". ¿Cómo eliges sin volverte loco?»
- **Serás capaz de:** (1) identificar a los principales actores y la diferencia entre modelos abiertos y cerrados; (2) distinguir modelos rápidos, modelos de razonamiento y agentes, y cuándo conviene cada uno; (3) leer con escepticismo los rankings y los exámenes superados; (4) elegir un asistente según la tarea, la privacidad, el idioma y el coste.
- **Sesiones:** S1 · Mapa del ecosistema (20′) · S2 · Razonamiento y agentes (20′) · S3 · Rankings con lupa y Pruébalo tú (18′) · S4 · Abiertos, cerrados, locales y de pago; test (17′).
- **Visual propio:** **mapa del ecosistema** filtrable (empresa, abierto/cerrado, gratis/pago, en la UE o no); ejercicio «¿rápido, de razonamiento o agente?» con 8 tareas; «lee el ranking con lupa».
- **Recursos:** v-nabani-agentes ✅ CC (9:00) · v-santana-afi 🟡 🇪🇸 (75:05; fragmento, publicado el 28/10/2026) · v-santana-holded 🟡 🇪🇸 (63:45; fragmento) · v-platzi-agentes 🟡 🌎 (23:02, alternativa).
- **Pruébalo tú:** la misma pregunta no clínica en dos asistentes distintos; compara la exactitud y si citan fuentes.
- **Test (5):** emparejar la tarea con el tipo de modelo; V/F «aprobar el MIR = saber ejercer»; escenario de elección de herramienta.

### PARTE 2 · IA EN MEDICINA (8 h)

#### 2.1 · Dónde está ya la IA en medicina — 2 h · 6 sesiones

- **Gancho:** tu hospital instala un sistema que lee las radiografías de tórax de Urgencias por la noche. ¿Quién firma el informe? ¿Sabes cómo se validó?
- **Serás capaz de:** (1) describir las aplicaciones más asentadas por áreas (imagen, anatomía patológica digital, ECG, predicción de deterioro, documentación, fármacos); (2) diferenciar las aplicaciones con evidencia prospectiva de las que solo tienen estudios retrospectivos; (3) explicar por qué aprobar exámenes médicos no equivale a rendir bien con pacientes reales; (4) localizar las aplicaciones relevantes para tu práctica en el mapa por especialidades.
- **Sesiones:** S1 · Imagen: radiología, dermatología, oftalmología (20′) · S2 · Anatomía patológica digital y ECG con IA (20′) · S3 · Predicción de deterioro: la alarma de sepsis que no funcionaba fuera de casa (20′) · S4 · Documentación y LLM: exámenes frente a práctica real (20′) · S5 · Fármacos y proteínas: AlphaFold (20′) · S6 · Pruébalo tú y test (20′).
- **Visual propio:** **mapa interactivo por especialidades**, con cada aplicación etiquetada por nivel de evidencia (retrospectiva / validación externa / prospectiva / ensayo); caso interactivo **«la alarma que nadie escuchaba»** (validación externa del modelo de sepsis de Epic: Wong et al., *JAMA Intern Med* 2021).
- **Recursos:** v-dotcsv-alphafold ✅ 🇪🇸 (18:10; de 2021, lo actualizaré en el texto con el Nobel de Química de 2024) · v-cto-seram 🟡 🇪🇸 (32:54; fragmento de unos 8 min) · v-bloomberg-medicina 🟡 (7:51; riesgo de tono promocional) · opcionales: v-redaccion-salto 🟡 🇪🇸 (64:33, octubre de 2026) y v-pharmamar 🟡 🇪🇸 (113:09, sin subtítulos).
- **Referencias de ejemplo:** Gulshan 2016, Attia 2019 (ECG-IA), Wong 2021 (sepsis), Obermeyer 2019 (sesgo). Ver el [Anexo C](#anexo-c--referencias-científicas-ya-localizadas).
- **Test (5):** emparejar la aplicación con su especialidad; ordenar los niveles de evidencia; escenario «¿lo implantarías mañana?».

#### 2.2 · Leer con lupa un estudio de IA médica — 1,5 h · 4 sesiones

- **Gancho:** «Nuestro algoritmo detecta el delirium con un AUC de 0,94». ¿Qué tres preguntas harías antes de creértelo?
- **Serás capaz de:** (1) identificar el tipo de validación de un estudio (interna, temporal, externa, prospectiva); (2) detectar señales de sesgo y de cambio de población; (3) usar una lista de comprobación basada en TRIPOD+AI, CONSORT-AI/SPIRIT-AI, STARD-AI, DECIDE-AI y CHART para valorar un artículo; (4) decidir si una herramienta está lista para tu población.
- **Sesiones:** S1 · Más allá del AUC: calibración y utilidad (22′) · S2 · Validación y cambio de población (22′) · S3 · Qué guía de publicación corresponde a cada estudio (22′) · S4 · Juego «¿Te fiarías?» y test (24′).
- **Visual propio:** **gráfico de calibración** interactivo; simulador de cambio de población, que reutiliza el motor de 1.3; infografía «qué guía para qué estudio»; juego **«¿Te fiarías?»** con 3 productos ficticios, cada uno con un defecto distinto.
- **Recursos:** ⬜ **no hay vídeo adecuado en castellano** (lo compensan los interactivos; lo anoto en el informe de fase) · TRIPOD+AI, *BMJ* 2024 ✅ · CONSORT-AI, *Lancet Digit Health* 2020 ✅ · CHART 2025 🔒 · r-semi-rce: Puchades y Ramos-Ruperto (Grupo de Medicina Digital de la SEMI), *Rev Clin Esp* 2025 ✅ (acceso por suscripción; compruebo si hay versión abierta).
- **Test (5):** escenario «¿qué falla en este estudio?»; emparejar el estudio con su guía; V/F sobre el AUC y la calibración.

#### 2.3 · Ética, regulación y privacidad — 1,5 h · 4 sesiones

- **Gancho:** al acabar la guardia, un residente pega en un chatbot el informe de alta de un paciente «para que se lo resuma a la familia». Lleva nombre, NHC y fecha de nacimiento. ¿Qué ha pasado con esos datos?
- **Serás capaz de:** (1) explicar por qué los datos de salud son una categoría especial en el RGPD y la LOPDGDD, y qué implica para usar IA; (2) describir el Reglamento Europeo de IA (niveles de riesgo y calendario vigente, con fecha); (3) reconocer cuándo una herramienta de IA es un producto sanitario y qué supone el marcado CE; (4) aplicar los principios deontológicos (Código de Deontología Médica y Manual de la OMC de 2026) y la guía de la OMS a decisiones cotidianas.
- **Sesiones:** S1 · Datos de salud y privacidad (22′) · S2 · Reglamento de IA y productos sanitarios (22′) · S3 · Deontología, responsabilidad y OMS (22′) · S4 · Semáforo y test (24′).
- **Visual propio:** juego semáforo **«¿Puedo pegar esto en la IA?»** con 15 casos (verde, ámbar o rojo, y por qué); **calendario del Reglamento de IA** con fechas antes y después del Ómnibus; infografía «¿es producto sanitario?».
- **Recursos:** r-omc-manual-ia-2026 ✅ 🇪🇸 (leer los decálogos, págs. 11–16) · r-aepd-rgpd-ia ✅ 🇪🇸 · r-boe-lopdgdd ✅ · v-seram-regulacion 🟡 🇪🇸 (18:00; de 2024, anterior al Ómnibus, lo advertiré) · v-civio-sanidad ✅ 🇪🇸 CC (26:51; algoritmos en la sanidad pública española, opcional o como fragmento) · r-oms-lmm-2024 ✅ (inglés) · r-aiact-explorer-omnibus ✅ (inglés) · r-eurlex-ria 🔒 · r-aesia ✅ · v-inap-ria 🟡 (51:41, opcional).
- **Test (5):** semáforo; ordenar las fechas del Reglamento; V/F «si está anonimizado ya no es dato personal» (matiz: seudonimizar no es anonimizar).

#### 2.4 · Mapa de herramientas — 1 h · 3 sesiones

- **Gancho:** «Quiero buscar bibliografía, no aprenderme 40 marcas.»
- **Serás capaz de:** (1) elegir una herramienta a partir de la **tarea**, no de la marca; (2) aplicar cinco criterios: finalidad, fuentes y evidencia, privacidad (apta o no para datos de pacientes), disponibilidad en España e idioma, y coste; (3) averiguar qué herramientas te proporciona tu centro o tu servicio de salud.
- **Sesiones:** S1 · Por tareas, no por marcas (20′) · S2 · Los cinco criterios (20′) · S3 · Explora el directorio y test (20′).
- **Visual propio:** **asistente de selección** («¿qué quieres hacer?» → «¿con datos de pacientes?» → «¿presupuesto?» → recomendación con pros, contras y cuándo no usarla); enlaza al **directorio filtrable**.
- **Recursos:** directorio propio (`herramientas.json`); OpenEvidence como ejemplo de herramienta **no disponible en la UE**.
- **Test (4):** escenarios de elección; V/F «gratuito = apto para datos de pacientes».

#### 2.5 · IA y geriatría — 2 h · 6 sesiones

- **Gancho:** Doña Carmen, 84 años, vive sola. Su hija le ha instalado un sensor de caídas y un altavoz que «le da conversación». Te pregunta si merece la pena. ¿Qué le dices?
- **Serás capaz de:** (1) describir las aplicaciones de IA en fragilidad, caídas, delirium, deterioro cognitivo, polifarmacia y monitorización, con su nivel de evidencia; (2) valorar críticamente una evidencia que a menudo es preliminar; (3) reconocer el edadismo en los algoritmos (OMS, 2022) y la infrarrepresentación de las personas mayores en los datos; (4) tener en cuenta la brecha digital y la autonomía del paciente mayor al proponer tecnología.
- **Sesiones:** S1 · Fragilidad e índices electrónicos (20′) · S2 · Caídas y sensores (20′) · S3 · Delirium y deterioro cognitivo: voz e imagen (20′) · S4 · Polifarmacia y monitorización en domicilio y residencias (20′) · S5 · Robots sociales, soledad, edadismo y brecha digital (20′) · S6 · El caso de Doña Carmen y test (20′).
- **Visual propio:** **semáforo de evidencia** por aplicación (cada una con su referencia); simulador **«¿quién falta en los datos?»** (si los mayores de 80 están infrarrepresentados en el entrenamiento, el rendimiento cae en ese grupo; reutiliza el motor de 1.3); caso ramificado de Doña Carmen.
- **Recursos:** r-oms-edadismo-2022 ✅ (inglés; leer el resumen) · Fontecha-Gómez y Betancor-Santana, *Rev Esp Geriatr Gerontol* 2023 ✅ 🇪🇸 · Clegg et al., índice electrónico de fragilidad, *Age Ageing* 2016 ✅ · v-amg-llm 🟡 🌎 (62:39, Academia Mexicana de Geriatría; fragmento de unos 15 min). **No he encontrado un documento de la SEGG sobre IA** (lo anotaré en el informe).
- **Aviso:** donde la evidencia sea escasa o preliminar, lo diré claramente, aplicación por aplicación.
- **Test (5):** emparejar la aplicación con su nivel de evidencia; escenario de Doña Carmen; V/F sobre el edadismo algorítmico.

### PARTE 3 · TU CAJA DE HERRAMIENTAS (17 h)

Todos los talleres siguen el mismo esquema: **para qué sirve → flujo paso a paso → herramientas verificadas → taller con caso o datos sintéticos → plantillas de prompt → verificación → «ojo con…»**. Cada taller incluye un paso explícito de **anonimización** y otro de **verificación**, y una casilla de «he hecho este paso» que forma parte del progreso.

#### 3.0 · Tu entorno de trabajo seguro — 1 h · 3 sesiones

- **Serás capaz de:** (1) configurar al menos un asistente con los ajustes de privacidad adecuados; (2) anonimizar un texto clínico con la checklist (nombre, NHC, DNI/CIP, fechas exactas → edades o intervalos, dirección, combinaciones raras que identifican); (3) decidir si te basta el plan gratuito o compensa una suscripción de hasta 20 €/mes; (4) localizar la política de IA de tu centro y saber a quién preguntar.
- **Sesiones:** S1 · Cuentas, planes y ajustes (20′) · S2 · La regla de oro: anonimizar (20′) · S3 · La política de tu centro, la checklist imprimible y el test (20′).
- **Visual propio:** **anonimizador de práctica**: en un informe de alta sintético marcas los identificadores y la web te dice cuáles se te han escapado. Funciona en local, sin enviar nada.
- **Recursos:** r-omc-manual-ia-2026 ✅ · r-aepd-rgpd-ia ✅ · v-redsanitaria-privacidad 🟡 (23:58; canal pequeño, opcional).
- **Test (4):** ¿qué identificadores quedan?; V/F sobre la seudonimización; escenario de elección de plan.

#### 3.1 · Dudas sobre casos clínicos — 2,5 h · 7 sesiones

- **Taller:** mujer de 86 años con caídas de repetición, confusión fluctuante, hiponatremia y 11 fármacos (**caso sintético**).
- **Serás capaz de:** (1) presentar un caso anonimizado y estructurado como en una sesión clínica; (2) pedir un diagnóstico diferencial razonado (qué apoya y qué refuta cada opción, qué pruebas discriminan); (3) pedir un abordaje y un plan de seguimiento con referencias a guías, y que la IA critique su propia respuesta; (4) evitar la complacencia presentando el caso de forma neutra; (5) contrastar con una fuente de referencia y documentar que la decisión es tuya.
- **Sesiones:** S1 · Para qué sirve y para qué no (20′) · S2 · Anonimizar y estructurar el caso (20′) · S3 · El diferencial razonado (22′) · S4 · La trampa de la complacencia (20′) · S5 · Tratamiento, seguimiento y autocrítica (22′) · S6 · Contrastar con una fuente de referencia (22′) · S7 · Checklist y test (24′).
- **Visual propio:** formulario **«estructura tu caso»** que genera el prompt y avisa si detecta identificadores; demo de **complacencia**: el mismo caso presentado de forma neutra y con tu sospecha, con respuestas reales etiquetadas con modelo y fecha.
- **Herramientas (verificación en la Fase 4):** asistentes generalistas con modo de razonamiento; herramientas que citan evidencia (UpToDate Expert AI si tu centro la tiene); cuadernos con tus guías en PDF (Gemini Notebook o proyectos en asistentes). OpenEvidence ❌ no está disponible en la UE.
- **Recursos:** r-omc-manual-ia-2026 ✅ (capítulo de práctica asistencial) · ⬜ no hay vídeo en castellano específico y fiable.
- **Test (5):** ordenar el flujo; escenario «¿qué falla en este prompt?» (sesgado); escenario «¿qué falla en esta respuesta?».

#### 3.2 · Farmacología: ajuste de dosis, combinaciones y deprescripción — 2,5 h · 7 sesiones ★ PILOTO

- **Taller:** paciente sintético con 12 fármacos y un filtrado glomerular de 28 ml/min/1,73 m².
- **Principio:** la IA explica, organiza y propone; **la dosis se verifica en la ficha técnica (CIMA-AEMPS)**. Los cálculos se hacen con calculadora o pidiendo a la IA que muestre el cálculo paso a paso.
- **Serás capaz de:** (1) localizar en la ficha técnica de CIMA la posología en insuficiencia renal (sección 4.2), las contraindicaciones (4.3) y las interacciones (4.5); (2) calcular o verificar el aclaramiento de creatinina y distinguir Cockcroft-Gault del FG estimado por CKD-EPI, y cuándo importa la diferencia; (3) usar la IA para aplicar STOPP/START v3, Beers 2023 y LESS-CHRON a una lista de medicación y proponer un plan de deprescripción escalonado; (4) comprobar interacciones con un comprobador; (5) redactar la explicación para el paciente o la familia.
- **Sesiones:** S1 · La regla: la IA propone, la ficha técnica decide (20′) · S2 · Función renal y cálculos a la vista (20′) · S3 · Juego «Encuentra el error» (20′) · S4 · Interacciones (20′) · S5 · Deprescripción con criterios (22′) · S6 · Taller I: revisión de los 12 fármacos (24′) · S7 · Taller II: plan escalonado, explicación a la familia y test (24′).
- **Visual propio:** **«Encuentra el error»**: una respuesta de IA aparentemente perfecta con un error de dosis en insuficiencia renal; haces clic en la frase errónea y se explica, con remisión a la ficha técnica. **Calculadora didáctica** de Cockcroft-Gault y CKD-EPI 2021 que muestra el cálculo, con el aviso «para aprender; en la clínica, usa la calculadora de tu centro». Navegador de criterios: muestra el tipo de criterio y enlaza a la fuente, sin reproducir las tablas con derechos.
- **Recursos:** r-cima ✅ · v-uva-fichatecnica ✅ 🇪🇸 (7:12; de 2015, pero la estructura de la ficha técnica no ha cambiado) · r-stopp-start-3-es ✅ 🇪🇸 · r-deprescribing-algoritmos ✅ (inglés) · r-acbcalc ✅ · r-drugs-interacciones ✅ (inglés) · r-medscape-interacciones 🔒 · Bot PLUS y Lexicomp (si el centro los tiene; verificación en la Fase 1). Descartados: v-cof-coruna-stopp ❌ y v-kabilia-stopp ❌ (anteriores a la versión 3).
- **Revisión clínica:** cada dosis, criterio y cálculo de este taller irá a `REVISION_CLINICA.md` con su fuente (ficha técnica con fecha de revisión, artículo y página).
- **Test (5):** «¿qué falla en esta respuesta de la IA?» (dosis); ordenar los pasos de verificación; emparejar el criterio con su uso; V/F sobre Cockcroft-Gault frente al FG estimado.

#### 3.3 · Búsqueda bibliográfica actualizada — 2,5 h · 7 sesiones

- **Taller:** pregunta PICO geriátrica → estrategia → 5 artículos de los últimos 2 años → tabla de evidencia.
- **Serás capaz de:** (1) convertir una pregunta clínica en PICO y en una estrategia con MeSH, `[tiab]` y operadores booleanos, con ayuda de la IA; (2) ejecutar y refinar la búsqueda en PubMed y crear una alerta; (3) usar herramientas de IA para cribar, resumir y explorar citas sin perder la trazabilidad; (4) verificar cada referencia por PMID o DOI y detectar referencias inventadas; (5) gestionar las referencias con Zotero.
- **Sesiones:** S1 · De la duda a la PICO (20′) · S2 · PubMed bien hecho: MeSH y booleanos (22′) · S3 · La IA como ayudante de estrategia (20′) · S4 · Cribar y resumir con IA (22′) · S5 · Mapas de citas y alertas (20′) · S6 · ¿Real o inventada? Verificar referencias (22′) · S7 · Zotero, tabla de evidencia y test (24′).
- **Visual propio:** **constructor visual de búsquedas** con bloques (conceptos → sinónimos → MeSH/`[tiab]` → AND/OR/NOT) que genera la cadena y abre PubMed en una pestaña nueva; es un enlace, sin API ni clave. Juego **«¿Referencia real o inventada?»**: las reales tienen el PMID verificado y las inventadas se identifican como tales.
- **Herramientas (Fase 4):** PubMed ✅, Epistemonikos ✅, Trip ✅, Cochrane Library 🔒, Consensus ✅, Elicit ✅, Scite ✅, Semantic Scholar ✅, Perplexity 🔒, ResearchRabbit ✅, Connected Papers ✅, Litmaps ✅, Zotero ✅, biblioteca virtual de tu servicio de salud. OpenEvidence ❌ no disponible en la UE.
- **Recursos:** v-us-pubmed ✅ 🇪🇸 (8:56) · v-us-mesh ✅ 🇪🇸 (5:22, sin subtítulos) · v-ua-avanzada ✅ 🇪🇸 CC (3:17) · v-ua-mesh ✅ 🇪🇸 (3:42) · v-calimaco-zotero ✅ (8:46).
- **Test (5):** ordenar los pasos de la estrategia; «¿real o inventada?»; emparejar la herramienta con su tarea.

#### 3.4 · Análisis estadístico de una base de datos en Excel — 3 h · 9 sesiones

- **Taller con dataset sintético descargable** (.xlsx, unos 250 pacientes ficticios): edad, sexo, Barthel, Pfeiffer, número de fármacos, FRAIL, caídas, ingresos y mortalidad a 12 meses. Tendrá relaciones plausibles y errores intencionados para limpiar, se generará con un script de semilla fija (reproducible) e incluirá un diccionario de variables.
- **Serás capaz de:** (1) comparar tres caminos (jamovi/JASP; IA con análisis de datos; híbrido) y elegir el adecuado según la privacidad; (2) preparar un Excel: limpieza, diccionario de variables, codificación y anonimización; (3) elegir la prueba estadística adecuada con un árbol de decisión; (4) hacer el análisis en jamovi y usar la IA solo con resultados agregados para interpretarlos y redactarlos; (5) reproducir un resultado clave por una segunda vía.
- **Sesiones:** S1 · Tres caminos (20′) · S2 · Preparar el Excel I: limpieza (20′) · S3 · Preparar el Excel II: diccionario y anonimización (20′) · S4 · ¿Qué prueba uso? (20′) · S5 · p-valor e intervalo de confianza sin fórmulas (20′) · S6 · jamovi: descriptivos (20′) · S7 · jamovi: comparaciones y regresión (20′) · S8 · La IA como tutor e intérprete (20′) · S9 · Verificar por una segunda vía y test (20′).
- **Visual propio:** **árbol de decisión «¿Qué prueba estadística uso?»**; **visualizador de p-valor e intervalo de confianza**: repite un estudio muchas veces y ve cuántos IC contienen el valor real.
- **Recursos:** jamovi ✅ · JASP ✅ · v-medina-jamovi ✅ 🌎 (10:04) · v-iadaniel-jamovi 🟡 (21:49; canal con título comercial, revisar).
- **Test (5):** árbol (escenario → prueba); V/F sobre el p-valor; «¿qué falla en esta interpretación de la IA?».

#### 3.5 · Escribir un artículo científico — 1 h 45 min · 5 sesiones

- **Taller:** case report según CARE con el caso de 3.1, o resumen tipo congreso con los resultados de 3.4.
- **Serás capaz de:** (1) estructurar un manuscrito con IMRaD y la guía EQUATOR que corresponda (STROBE, CARE, CONSORT…); (2) aplicar las recomendaciones del ICMJE y de las revistas sobre IA (no puede ser autora; hay que declarar su uso); (3) distinguir qué delegar (esquema, edición, traducción, resumen, carta al editor, respuesta a revisores) y qué no (datos, resultados, referencias sin verificar); (4) redactar con IA un borrador verificable.
- **Sesiones:** S1 · Reglas del juego: ICMJE y declaración de uso (20′) · S2 · Estructura y guías EQUATOR (20′) · S3 · Qué delegar y qué no (20′) · S4 · Taller (25′) · S5 · Revisión, declaración y test (20′).
- **Visual propio:** clasificador **«¿delego esto?»**; plantilla de declaración de uso de IA.
- **Recursos:** r-icmje-ia ✅ · r-equator-care ✅ · ⬜ vídeo en castellano pendiente de buscar en la Fase 4.
- **Test (4):** clasificar tareas; V/F «la IA puede figurar como autora»; escenario de la declaración.

#### 3.6 · Presentaciones en PowerPoint — 1 h 15 min · 4 sesiones

- **Taller:** presentación de 10 diapositivas del caso de 3.1.
- **Serás capaz de:** (1) definir el objetivo y la audiencia antes de abrir ninguna herramienta; (2) pedir a la IA un guion con la estructura y las notas del ponente; (3) generar las diapositivas con una herramienta (Gamma, Canva, Copilot en PowerPoint si el centro lo tiene, o asistentes que generan .pptx); (4) revisar el diseño (una idea por diapositiva) y las imágenes clínicas (anonimizadas y con consentimiento).
- **Sesiones:** S1 · Objetivo, audiencia y guion (18′) · S2 · De guion a diapositivas (20′) · S3 · Revisión de diseño (17′) · S4 · Taller final y test (20′).
- **Visual propio:** «antes y después» de diapositivas sobrecargadas, con ejemplos propios en SVG.
- **Recursos:** v-utrera-gamma 🟡 (10:17; título comercial) · Gamma 🔒 · Canva ✅.
- **Test (4):** ordenar el flujo; «¿qué falla en esta diapositiva?»; V/F sobre las imágenes de pacientes.

#### 3.7 · Cursos de formación continuada: estudiar con IA — 1 h · 3 sesiones

- **Taller:** con el PDF de una guía clínica pública (se enlaza y lo descarga el alumno).
- **Serás capaz de:** (1) cargar el material del curso en Gemini Notebook o en un proyecto de un asistente y exigir respuestas basadas en ese material, con cita de página; (2) generar preguntas de repaso y tarjetas con la explicación de cada opción; (3) reconocer que la IA sin el material falla en las preguntas de detalle; (4) respetar las normas de evaluación de cada curso acreditado.
- **Sesiones:** S1 · Con y sin el material (20′) · S2 · Preguntas de repaso y tarjetas (20′) · S3 · Taller y test (20′).
- **Visual propio:** comparación de respuestas con y sin el material, reales y etiquetadas con modelo y fecha.
- **Recursos:** Gemini Notebook ✅ · v-udia-notebooklm 🟡 (6:57; anterior al cambio de nombre) · v-redsanitaria-notebooklm 🟡 (11:26).
- **Test (4):** escenario «¿te fías de esta respuesta?»; V/F sobre las normas de los cursos; respuesta única sobre las citas de página.

#### 3.8 · Proyecto final — 1,5 h · 4 sesiones

- **A elegir:** (a) caso clínico completo → presentación; (b) mini estudio con el dataset sintético → resumen tipo congreso → presentación.
- **Serás capaz de:** (1) integrar el flujo completo con anonimización y verificación; (2) autoevaluarte con una checklist; (3) comparar tu autoevaluación final con la inicial.
- **Sesiones:** S1 · Elegir el proyecto y planificar (20′) · S2–S3 · Realización (25′ + 25′) · S4 · Checklist, autoevaluación comparada y certificado (20′).
- **Visual propio:** gráfico de autoevaluación inicial frente a final; **certificado no oficial** generado en el navegador (nombre escrito por ti, guardado solo en tu dispositivo, para imprimir o guardar en PDF).

---

## 6. Inventario de interactivos

Para que 25 interactivos sean viables y mantenibles, los construyo sobre **motores reutilizables** que se alimentan de JSON. Así se añaden ejercicios nuevos sin tocar código.

| Motor | Se usa en | Qué hace |
|---|---|---|
| **Test** | Todos los subcapítulos | Opción única, V/F, ordenar (arrastrar o con botones ↑↓ para teclado), emparejar y escenarios. Retroalimentación por opción, reintentos ilimitados y sin penalización. |
| **Clasificador** | 1.1 ¿Esto es IA?, 2.3 Semáforo, 2.2 ¿Te fiarías?, 3.3 ¿Real o inventada?, 3.5 ¿Delego esto?, 1.8 tipo de modelo | Tarjetas que se clasifican en categorías, con explicación de cada una. |
| **Encuentra el error** | 1.5 Detecta la confabulación, 3.2 Encuentra el error, 1.7 Audita la nota, 3.1 y 3.4 «¿qué falla?» | Texto con frases clicables; marca los errores y se explican. |
| **Modelo sintético** | 1.3 Umbral/ROC/prevalencia/sobreajuste/cambio de hospital, 2.2 Calibración, 2.5 ¿Quién falta en los datos? | Población ficticia generada en el navegador, con semilla fija; gráficos SVG. |
| **Constructor de prompts** | 1.6, 3.1 (estructura tu caso), 3.3 (pregunta PICO) | Bloques que se combinan, reglas de calidad y detector de patrones identificables; botón de copiar. |
| **Explorador (mapa/línea temporal)** | 1.2 Línea temporal, 1.8 Ecosistema, 2.1 Mapa por especialidades, 1.7 Galería | Elementos con filtros y fichas de detalle. |
| **Árbol de decisión** | 3.4 ¿Qué prueba uso?, 2.4 Asistente de selección, 2.5 Caso de Doña Carmen | Preguntas encadenadas con resultado explicado. |
| **Comparador antes/después** | 1.5 Temperatura, 1.6 Antes/después, 3.1 Complacencia, 3.7 Con y sin material, 3.6 Diapositivas | Dos o más versiones lado a lado (apiladas en el móvil). |
| Específicos | 1.4 Neurona, 1.5 Tokens y siguiente palabra, 3.0 Anonimizador, 3.2 Calculadora didáctica, 3.3 Constructor PubMed, 3.4 p-valor/IC, M0 Planificador, 3.8 Certificado | Componentes propios. |

**Respuestas de IA dentro de los interactivos:** no puedo llamar a una IA en directo (no hay servidor ni claves). Propongo **generarlas con un modelo real y etiquetarlas** («Respuesta generada con [modelo], [fecha]») y no redactarlas yo haciéndolas pasar por reales. Cuando haya que fabricar un error a propósito (por ejemplo, en «Encuentra el error»), se indicará: «respuesta modificada para el ejercicio». Lo confirmo contigo en la [pregunta 5](#12-preguntas-para-ti).

---

## 7. Arquitectura técnica

### 7.1 Propuesta

**Astro 7 (salida estática) + MDX + islas Preact + Tailwind CSS 4 + Pagefind**, con colecciones de contenido validadas con Zod.

Versiones actuales en npm a 29/10/2026: astro 7.4.4 · @astrojs/mdx 8.1.2 · @astrojs/preact 6.1.1 · preact 11.1.0 · tailwindcss 4.3.3 · pagefind 1.5.2 · zod 4.6.7.

### 7.2 Justificación con tus criterios

| Criterio | Cómo se cumple |
|---|---|
| **1. Cero backend y cero claves** | Astro genera HTML estático. Los interactivos son islas que funcionan en el navegador. El progreso se guarda en `localStorage`. El buscador (Pagefind) es un índice estático. Nada se envía a ningún servidor. |
| **2. Contenido editable en Markdown** | Un `.mdx` por subcapítulo, con frontmatter. Los tests, recursos, glosario, prompts y herramientas son JSON legibles. Los interactivos se insertan con una línea (`<Clasificador datos="esto-es-ia" />`). |
| **3. Carga rápida en móvil y tablet** | 0 KB de JavaScript por defecto. Preact pesa unos 4 KB frente a los ~45 KB de React. Las islas se hidratan solo al verse (`client:visible`). Fuentes autoalojadas y recortadas. Los vídeos usan una «fachada»: no se carga nada de YouTube hasta que pulsas reproducir. |
| **4. Despliegue gratis y sencillo** | `npm run build` produce la carpeta `dist/`, que se sube a Netlify, GitHub Pages o Cloudflare Pages. Instrucciones en el README. |
| **5. Mantenible por otra persona** | Estructura estándar de Astro, motores reutilizables, esquemas con mensajes de error en español, `CLAUDE.md` con las convenciones y scripts de control (`check-links`, `check-glosario`, `horas`). |

**Alternativas descartadas:**

- **Starlight** (tema de documentación de Astro): rápido de montar, pero su maquetación de «documentación» choca con el mapa de metro y la experiencia de curso.
- **Eleventy:** más simple, pero sin validación tipada del contenido ni un modelo de componentes interactivos tan cómodo.
- **Next.js en exportación estática:** más JavaScript y más complejidad sin beneficio aquí.
- **Quarto:** excelente para documentos científicos, pero limitado para una experiencia interactiva y una interfaz propias.

### 7.3 Validación que hace fallar la compilación

El esquema de cada subcapítulo exige:

- `id`, `parte`, `titulo`, `minutos` y `sesiones[]` (cada una con título y minutos; la suma debe coincidir con `minutos`).
- `objetivos` (de 2 a 4, empezando por un verbo observable), `gancho`, `fechaRevision` y `fuentes` (al menos 1).
- `recursos` (de 1 a 3 identificadores que **deben existir** en `recursos.json` con estado `verificado`).
- `test` (debe existir `tests/x-y.json`, con 3–5 preguntas, exactamente una respuesta correcta en las de opción única y una explicación en **cada** opción).
- `visual` (al menos uno).
- `pruebalo` (obligatorio en la Parte 3).

Las herramientas exigen `haceBien`, `haceMal`, `cuandoNoUsarla`, `aptaDatosPacientes`, `disponibleEspana`, `precio` y `fechaVerificacion`. Sin esos campos no compila: así se garantiza el tono honesto, no comercial.

### 7.4 Scripts

- `npm run check-links`: revisa todos los enlaces de `recursos.json`, `herramientas.json` y los `.mdx`. Los vídeos de YouTube se comprueban por oEmbed y con los datos públicos del vídeo (duración, subtítulos, disponibilidad en España). Cada enlace se clasifica como **correcto / redirige / bloqueado por anti-bots (revisión manual con fecha) / roto**, y el script genera `informes/enlaces-AAAA-MM-DD.md`. Lecciones de esta fase: hay que usar los certificados del sistema (`node --use-system-ca`) y tratar los 403/202 de Cloudflare o DataDome como «revisión manual», no como «roto».
- `npm run check-glosario`: detecta términos del glosario que aparecen en el texto sin su tooltip.
- `npm run horas`: recalcula los minutos (palabras ÷ 180 + minutos declarados) y avisa si un subcapítulo se desvía más de un 15 % del plan.
- `npm run generar-dataset` (Fase 4): crea el .xlsx sintético con semilla fija.

### 7.5 Progreso, privacidad e impresión

- **Progreso** en `localStorage`: sesiones completadas, resultados de los tests, autoevaluaciones y casillas de los talleres.
  - **Exportar e importar** con un código de texto comprimido y con suma de verificación (`MIAM-…`) o como archivo `.json`, para cambiar de dispositivo.
  - Botón «Reiniciar» con confirmación.
  - «Continúa donde lo dejaste» en la portada.
- **Sin cookies ni analítica.** Fuentes autoalojadas (no se pide nada a Google Fonts). YouTube solo vía `youtube-nocookie.com` y tras pulsar. Política CSP básica.
- **Impresión:** cada subcapítulo tiene su **ficha de bolsillo** en una página A4 (`@media print`) y la checklist de anonimización también es imprimible.

### 7.6 Estructura de carpetas

```
src/content/partes/parte-1/1-5-como-piensa-un-llm.mdx   # un archivo por subcapítulo
src/content/tests/1-5.json                               # preguntas, opciones, explicaciones
src/content.config.ts                                    # esquemas Zod
src/data/recursos.json · herramientas.json · glosario.json · prompts.json · curso.json (orden, líneas, prerrequisitos)
src/components/{layout,mapa,progreso,test,recursos,glosario,ui}/
src/components/interactivos/{motores,especificos}/
src/pages/  index (mapa) · [parte]/[slug] · glosario · prompts · herramientas · buscar · progreso · fichas/[id] · certificado
public/descargas/  (dataset, plantillas, fichas) · public/fonts/
scripts/check-links.mjs · check-glosario.mjs · horas.mjs · generar-dataset.mjs
informes/  (informes de fase y de enlaces)
REVISION_CLINICA.md · CLAUDE.md · README.md · PLAN.md
```

---

## 8. Propuesta visual



**Boceto:** [bocetos/Portada_dc.html](bocetos/Portada_dc.html). Utilizalo de referencia para el diseño web, toma la opción 1a.

---

## 9. Seguridad clínica y privacidad: cómo se aplica

- **Aviso sobrio y permanente** en el pie y al inicio de cada taller: «La IA no sustituye tu juicio clínico. La responsabilidad de cada decisión es tuya. Todos los casos y datos de este curso son ficticios.»
- **Casos y datos sintéticos**, siempre etiquetados («Caso ficticio»).
- **Ninguna dosis ni recomendación clínica sin fuente y fecha.** En farmacología se remite siempre a la ficha técnica de CIMA.
- **Dos pasos obligatorios en cada taller de la Parte 3:** anonimizar y verificar. Ambos son casillas del progreso.
- **`REVISION_CLINICA.md`** (desde la Fase 1): tabla con cada afirmación clínica, dosis, criterio o cálculo usado en el texto, los ejemplos y los tests, con su fuente (documento, versión o fecha, y página o sección), dónde aparece y una casilla «revisado por: ___ fecha: ___».
- **Límites:** no reproduzco tablas con derechos (STOPP/START, Beers, figuras de artículos). Enlazo, parafraseo ejemplos puntuales y creo ilustraciones propias en SVG.

---

## 10. Riesgos y mitigación

| # | Riesgo | Probabilidad / impacto | Mitigación |
|---|---|---|---|
| 1 | **Desactualización rápida** de herramientas, modelos, precios y regulación (en esta misma fase ya han cambiado 5 cosas respecto al prompt). | Alta / alto | Etiqueta «a fecha de…» en todo lo sensible al tiempo. Datos centralizados en JSON con `fechaVerificacion`. `check-links` periódico. Sección «Qué ha cambiado» en el README. 1.8 y 2.3 se investigan al construirlos. |
| 2 | **Errores clínicos** en ejemplos, dosis o tests (también por mi parte: puedo equivocarme). | Media / muy alto | Fuente obligatoria para cada afirmación. `REVISION_CLINICA.md` con casilla de revisión humana. Revisión de cada test en la Fase 5. Los pilotos incluyen un taller de farmacología precisamente para probar el circuito de revisión. |
| 3 | **Pocos recursos de calidad en castellano** para temas de nicho (lectura crítica de estudios de IA, IA en geriatría, prompting médico). Muchos son de Latinoamérica o tienen doblaje automático. | Alta / medio | Interactivos propios que compensan (ya identificados ⬜ en 2.2, 3.1, 1.6 y 3.5). Marcado del idioma y la variedad. Informe de huecos en cada fase. |
| 4 | **No puedo «ver» los vídeos.** Verifico la existencia, la duración, el idioma y la disponibilidad, pero el contenido lo reviso por la transcripción automática. | Media / medio | Revisión de la transcripción al construir cada subcapítulo (fragmentos con minutos de inicio y fin). Te pediré una revisión rápida en los pilotos. |
| 5 | **Falsos «rotos» en check-links** por protección anti-bots (Cloudflare, DataDome) y certificados TLS (lo he visto en esta fase). | Alta / bajo | Estado «revisión manual» con fecha, certificados del sistema y reintentos espaciados. |
| 6 | **Alcance grande** (22 subcapítulos + M0, unos 25 interactivos, 4 páginas transversales). | Alta / alto | Motores reutilizables guiados por JSON. Piloto vertical primero (Fase 1) para fijar la plantilla. El esquema hace fallar la compilación si algo falta. |
| 7 | **Rendimiento en tablet o móvil** con interactivos pesados (tokenizador, gráficos). | Media / medio | Carga diferida por página. Tokenizaciones precalculadas si el tokenizador real pesa demasiado. Lighthouse en la Fase 5 con objetivo ≥ 90. |
| 8 | **Pérdida del progreso** (modo privado, borrado de datos del navegador). | Media / bajo | Exportar e importar con código o archivo. Aviso visible en la página de progreso. |
| 9 | **Tono promocional** al hablar de herramientas. | Media / medio | Campos obligatorios `haceMal` y `cuandoNoUsarla` en el esquema. Cada herramienta, presentada por tarea. |
| 10 | **Interpretación del certificado** como acreditación oficial. | Baja / medio | Texto explícito: «Certificado personal no oficial; este curso no está acreditado como formación continuada.» |
| 11 | **Copyright** de criterios, guías e imágenes. | Media / medio | Solo enlaces y paráfrasis breves. Ilustraciones propias en SVG. |
| 12 | **Disponibilidad geográfica** de las herramientas (caso OpenEvidence). | Media / medio | Campo `disponibleEspana` comprobado desde España, con fecha. |

---

## 11. Lista de tareas por fase

**Fase 0 · Plan** ✅ (este documento)

- [x] Investigar recursos, herramientas, regulación y stack.
- [x] Verificar 53 vídeos y más de 60 enlaces web (Anexo A).
- [x] Mapa del curso, horas, sesiones y objetivos.
- [x] Arquitectura, propuesta visual y boceto.
- [x] Riesgos y preguntas.
- [ ] **Tu aprobación** ← estamos aquí.

**Fase 1 · Esqueleto + pilotos 1.5 y 3.2**

- [ ] Proyecto Astro, Tailwind, Preact, fuentes, tema claro y oscuro, `.gitignore`.
- [ ] Esquemas Zod y validación cruzada (recursos, tests y glosario).
- [ ] Portada con el mapa de metro, progreso, exportar/importar/reiniciar y «continúa donde lo dejaste».
- [ ] Motores: test, clasificador, encuentra el error, comparador y explorador; vídeo con fachada; tooltip de glosario.
- [ ] Páginas: glosario con buscador, biblioteca de prompts, directorio de herramientas, buscador (Pagefind), fichas imprimibles.
- [ ] `check-links`, `check-glosario` y `horas`.
- [ ] Piloto 1.5 completo al 100 % (6 sesiones, interactivos específicos, test y ficha).
- [ ] Piloto 3.2 completo al 100 % (7 sesiones, Encuentra el error, calculadora, taller y test).
- [ ] `CLAUDE.md`, `REVISION_CLINICA.md` (entradas de los pilotos), README inicial e informe de fase.
- [ ] Commit «Fase 1».

**Fase 2 · Parte 1 + M0** · **Fase 3 · Parte 2** · **Fase 4 · Parte 3 + dataset + plantillas** · **Fase 5 · Calidad y entrega**: según el prompt, con un informe y un commit al cerrar cada una.

---

## 12. Preguntas para ti

1. **Tu contexto real.** ¿Son correctos los valores por defecto de la sección 2 (geriatría hospitalaria, España genérico, sin herramientas garantizadas, ≤20 €/mes)? En concreto: **¿de qué comunidad autónoma es tu servicio de salud y tienes acceso por tu centro a UpToDate, Bot PLUS, Lexicomp, Microsoft 365 Copilot o a una biblioteca virtual?** Cambia las herramientas recomendadas en 3.1–3.3.
2. **Estructura.** ¿Apruebas **36 h** con los recortes de la sección 4.3 y la **reordenación de la Parte 1** (el prompting pasa a ser 1.6, y Multimodal y Estado del arte pasan a 1.7 y 1.8)?
3. **Variedad de español en los vídeos.** Cuando no haya un buen vídeo de España, ¿aceptas **vídeos de Latinoamérica** y **vídeos con doblaje oficial** al español (p. ej., 3Blue1Brown)? Siempre irían marcados. Los de **doblaje automático** los descartaría salvo que me digas lo contrario.
4. **Publicación.** ¿Dónde quieres publicarlo: **Netlify**, **GitHub Pages** o **solo en local** por ahora? ¿Tienes cuenta en GitHub o Netlify? Ten en cuenta que una web publicada en esos servicios es accesible para cualquiera que tenga el enlace. El contenido no es sensible, pero conviene que lo decidas.
5. **Respuestas de IA en los ejemplos.** ¿Te parece bien que las respuestas de ejemplo de los interactivos se **generen con un modelo real** y se etiqueten con el modelo y la fecha, y que las alteradas a propósito para un ejercicio se marquen como tales? Y una pregunta ligada: **¿quién hará la revisión clínica de `REVISION_CLINICA.md` y probará los pilotos en tablet o móvil?**

---

## Anexo A · Registro de verificación de recursos (29/10/2026)

**Método:**

- **Vídeos:** petición al endpoint oEmbed de YouTube (estado 200, título y canal) y a la ficha pública del vídeo (duración, estado de reproducción, si se puede insertar, países disponibles, pistas de subtítulos y de audio). Todas las peticiones se hicieron desde España.
- **Webs:** petición GET (estado, URL final y `<title>` o tipo de archivo).
- **Contenido de los vídeos:** pendiente de revisar con la transcripción al construir cada subcapítulo.

### A.1 Vídeos

Todos devolvieron oEmbed 200, están disponibles en España y admiten inserción, salvo que se indique otra cosa.

| ID propuesto | YouTube | Título | Canal | Duración | Publicado | Subtítulos / audio | Uso | Estado |
|---|---|---|---|---|---|---|---|---|
| v-derivando-ia | `_tA5cinv0U8` | ¿Qué es y cómo funciona la INTELIGENCIA ARTIFICIAL? | Derivando | 8:33 | 2021-08-04 | es (auto) | 1.1 | ✅ |
| v-dotcsv-ml-mapa | `KytW151dpqU` | ¿Qué es el Machine Learning? ¿Y Deep Learning? Un mapa conceptual | Dot CSV | 7:46 | 2017-11-01 | es (auto) | 1.1 | ✅ |
| v-mantaras-cara-oculta | `dTcExJGfCyc` | Ramón López de Mántaras · La cara oculta de la IA · Congreso Futuro 2026 | Congreso Futuro | 15:29 | 2026-01-16 | es (auto) | 1.1 opc. | ✅ |
| v-mantaras-geiser | `CA8LdZpG5l0` | ¿Es realmente inteligente la IA? Ponencia de R. López de Mántaras | Géiser | 32:37 | 2025-02-17 | es (auto) | 1.1 opc. | 🟡 largo |
| v-dotcsv-pasado-presente | `yAF3bopYMGk` | Pasado, Presente y Futuro de la IA | Dot CSV | 28:43 | 2023-09-17 | es (auto) | 1.2 fragm. | 🟡 |
| v-edteam-historia | `WCM0h9TX7cY` | La historia completa de la IA | EDteam | 26:56 | 2024-06-29 | es (auto) | 1.2 alt. | 🟡 |
| v-cuello-roc | `Y1XAP6omGzo` | Entendiendo las Curvas ROC | Carlos A. Cuello García | 8:50 | 2016-02-21 | es (auto) | 1.3 | ✅ |
| v-bioest-roc | `fsgDD0pNkZ0` | Curva ROC | Bioestadística Para No Estadísticos | 8:30 | 2014-05-23 | es (auto) | 1.3 alt. | ✅ |
| v-hablandoendata-roc | `TmhzUdPpVPQ` | Curva ROC y el AUC como nunca te lo habían contado | Hablando En Data | 11:12 | 2020-01-20 | es (auto) | 1.3 alt. | 🟡 |
| v-codbits-overfitting | `hBFff9l-AlE` | Underfitting y Overfitting en las Redes Neuronales | Codificando Bits | 5:28 | 2019-08-27 | es (manual) | 1.3 | ✅ |
| v-dotcsv-neurona | `MRIv2IwFTPg` | ¿Qué es una Red Neuronal? Parte 1: La Neurona | Dot CSV | 9:14 | 2018-03-19 | es (auto) | 1.4 | ✅ |
| v-dotcsv-red | `uwbHOpp9xkc` | ¿Qué es una Red Neuronal? Parte 2: La Red | Dot CSV | 11:34 | 2018-05-28 | es (auto) | 1.4 opc. | ✅ |
| v-ringa-redes | `CU24iC3grq8` | Cómo funcionan las redes neuronales | Ringa Tech | 11:52 | 2020-11-10 | es (auto) | 1.4 | ✅ |
| v-3b1b-red-es | `jKCQsndqEGQ` | ¿Qué es una Red Neuronal? Aprendizaje Profundo, cap. 1 | 3Blue1Brown Español | 20:51 | 2020-09-21 | es (auto) | 1.4 opc. | ✅ |
| v-dotcsv-cnn | `V8j1oENVz00` | ¡Redes Neuronales CONVOLUCIONALES! ¿Cómo funcionan? | Dot CSV | 13:25 | 2020-11-12 | es (auto) | 1.4 opc. | ✅ |
| v-3b1b-llm | `LPZh9BOjkQs` | Breve explicación de los LLM (orig. «Large Language Models explained briefly») | 3Blue1Brown | 7:58 | 2024-11-20 | subt. es manual; pista de audio es | 1.5 | ✅ 🔊 |
| v-dotcsv-llm | `Sz4qacFBHLk` | ¿Qué es un LLM? Enormes Modelos del Lenguaje | Dot CSV | 15:25 | 2022-06-05 | es (auto) | 1.5 | ✅ (2022) |
| v-dotcsv-transformer | `aL-EmKuB078` | ¿Qué es un TRANSFORMER? | Dot CSV | 18:41 | 2021-09-27 | es (manual) | 1.5 opc. | ✅ |
| v-dotcsv-transformer-2 | `xi94v_jl26U` | ¿Por qué estas REDES NEURONALES son tan POTENTES? Transformers parte 2 | Dot CSV | 15:17 | 2021-11-14 | solo en (auto) | — | ❌ sin subt. es |
| v-3b1b-gpt | `wjZofJX0v4M` | Pero, ¿qué es un GPT? (orig. «Transformers, the tech behind LLMs») | 3Blue1Brown | 27:14 | 2024-04-01 | subt. es; audio es | 1.5 opc. | ✅ 🔊 |
| v-mitjana-prompts | `BRy7Z3ZoQZk` | Cómo ESCRIBIR PROMPTS perfectos · método de Google | Xavier Mitjana | 14:36 | 2026-01-28 | es (auto) | 1.6 | 🟡 tono |
| v-edteam-prompt | `8Wqgr7Ry3dk` | Curso gratis de prompt engineering (2026) | EDteam | 46:15 | 2025-10-01 | es (auto) | 1.6 opc. | 🟡 largo |
| v-redsanitaria-escriba | `_ClRwi-CuKk` | IA en consulta: qué es un escriba médico y cómo usarlo bien | Red_SanitarIA | 6:11 | 2026-02-21 | es (auto) | 1.7 | 🟡 canal pequeño |
| v-nabani-agentes | `Xh1Jv33RIKw` | ¿Qué son los Agentes de IA? Explicación sencilla | Oliver Nabani | 9:00 | 2024-12-27 | es (manual) | 1.8 | ✅ |
| v-platzi-agentes | `4bXNYw_dTeY` | Qué es un agente de AI | Platzi | 23:02 | 2026-05-09 | es (auto) | 1.8 alt. | 🟡 |
| v-santana-afi | `dZOl9_GQN9s` | Carlos Santana: El presente y el futuro de la IA | Afi Global Education | 75:05 | 2026-10-28 | es (auto) | 1.8 fragm. | 🟡 |
| v-santana-holded | `zEwCxAI81Xs` | La IA ya no sorprende: así hay que usarla ahora · Carlos Santana | Holded | 63:45 | 2026-08-10 | es (auto) | 1.8 fragm. | 🟡 |
| v-dotcsv-alphafold | `Uz7ucmqjZ08` | La Revolución de la IA en BIOMEDICINA (AlphaFold2), con La Hiperactina | Dot CSV | 18:10 | 2021-01-03 | es (auto) | 2.1 | ✅ |
| v-cto-seram | `zWP4tGOYCac` | Jornadas PostMIR25 SERAM · Radiología e IA | CTO Medicina | 32:54 | 2025-02-21 | es (auto) | 2.1 fragm. | 🟡 |
| v-bloomberg-medicina | `QrHo1NdaW54` | Cómo la IA está revolucionando la medicina | Bloomberg en Español | 7:51 | 2025-05-04 | es (auto), es-419 | 2.1 | 🟡 tono |
| v-tedx-manzano | `6IRgWKbyJ5I` | La revolución de la IA en la Medicina · TEDx | TEDx Talks | 15:12 | 2024-05-20 | es (auto) | — | 🟡 reserva |
| v-redaccion-salto | `C9zebkaL0ew` | La IA sanitaria busca dar el salto definitivo a la práctica clínica | Redacción Médica | 64:33 | 2026-10-21 | es (auto) | 2.1 opc. | 🟡 |
| v-pharmamar | `jJhvkiT4rLI` | IA en Medicina: Separando hechos de ficción | Fundación PharmaMar | 113:09 | 2026-03-24 | sin subtítulos | 2.1 opc. | 🟡 |
| v-redemc-agentes | `3k9MSDpY9oQ` | Webinar: Uso de Agentes de IA en Salud | redEMC | 61:44 | 2025-08-20 | es (auto) | — | 🟡 reserva |
| v-seram-regulacion | `UL7OjVRWy5Y` | Café SERAM con el Dr. Ángel Morales: regulación legal de la IA en radiología | SERAM | 18:00 | 2024-12-17 | es (auto) | 2.3 | 🟡 (anterior al Ómnibus) |
| v-inap-ria | `E7M_lRxgNto` | El contexto normativo: Reglamento Europeo de IA · Noelia Betetos | INAP | 51:41 | 2025-03-26 | es (auto) | 2.3 opc. | 🟡 |
| v-civio-sanidad | `pCBgqQOFKfY` | Algoritmos e IA en la sanidad pública española | Fundación Civio | 26:51 | 2025-11-21 | es (manual) | 2.3 / 2.1 | ✅ |
| v-amg-llm | `sYSjqebCXnU` | Fundamentos de ChatGPT y LLMs para médicos | Academia Mexicana de Geriatría | 62:39 | 2026-05-16 | es (auto) | 2.5 fragm. | 🟡 |
| v-redsanitaria-privacidad | `vcJa3bQ-LWM` | Privacidad, RGPD y datos de pacientes con IA: qué NO subir | Red_SanitarIA | 23:58 | 2026-07-21 | es (auto) | 3.0 opc. | 🟡 |
| v-uva-fichatecnica | `Cdb3itggsvA` | La ficha técnica de los medicamentos. Contenido y estructura | UVa_Online | 7:12 | 2015-03-27 | es (auto) | 3.2 | ✅ |
| v-kabilia-stopp | `UMPFtRk5qVE` | Criterios STOPP-START | Kabilia | 13:13 | 2022-03-07 | es (auto) | — | ❌ anterior a v3 |
| v-cof-coruna-stopp | `5szbNyMbypQ` | Criterios STOPP/START para la revisión de medicación | COF A Coruña | 76:03 | 2018-04-11 | es (auto) | — | ❌ anterior a v3 |
| v-us-mesh | `_iYMuUtP7LA` | Cómo utilizar el MeSH de PubMed | Biblioteca de Centros de la Salud (US) | 5:22 | 2021-04-30 | sin subtítulos | 3.3 | ✅ |
| v-us-pubmed | `wVn04jZC-bk` | Cómo realizar una búsqueda bibliográfica en PubMed | Biblioteca de Centros de la Salud (US) | 8:56 | 2021-04-15 | es (auto) | 3.3 | ✅ |
| v-ua-avanzada | `m8aSV9QXJls` | Búsqueda avanzada en PubMed | Biblioteca Universidad de Alicante | 3:17 | 2023-02-13 | es (manual) | 3.3 | ✅ |
| v-ua-mesh | `22Ao6KHfC4Y` | Búsqueda en PubMed con términos MeSH | Biblioteca Universidad de Alicante | 3:42 | 2023-01-24 | es (auto) | 3.3 | ✅ |
| v-calimaco-zotero | `RhYRYvgLloU` | Un tutorial corto de Zotero en 2026 | Calímaco Digital | 8:46 | 2026-07-13 | es (auto) | 3.3 | ✅ |
| v-iadaniel-jamovi | `EQTXO6-tvmA` | Curso JAMOVI desde 0 para principiantes | IA con Daniel | 21:49 | 2024-05-26 | es (auto) | 3.4 | 🟡 |
| v-medina-jamovi | `VyUq1XgBqvw` | Introducción y menús principales de Jamovi | Luis Medina Gual | 10:04 | 2022-01-24 | es (auto) | 3.4 | ✅ |
| v-utrera-gamma | `WHW4VK_leqI` | Tutorial Gamma App 2026 | Franco Utrera Digital | 10:17 | 2025-02-28 | es (auto) | 3.6 | 🟡 tono |
| v-udia-notebooklm | `Xv5ZrnzA2DA` | Domina NotebookLM en menos de 7 minutos | UDIA | 6:57 | 2025-01-28 | es (auto) | 3.7 | 🟡 nombre antiguo |
| v-redsanitaria-notebooklm | `1VanWwX3Ec8` | NotebookLM para médicos: tu asistente de estudio con IA | Red_SanitarIA | 11:26 | 2026-06-26 | es (auto) | 3.7 alt. | 🟡 |
| — | `o3DztvnfAJg` | Underfitting & Overfitting · Explained | NStatum | 2:52 | 2022-08-12 | en; audio es por doblaje automático | — | ❌ doblaje automático |

**Notas:**

- Las direcciones son `https://www.youtube.com/watch?v=<ID>`. En la web se insertarán con `https://www.youtube-nocookie.com/embed/<ID>`.
- YouTube muestra a veces una pista de audio «en-US» en vídeos grabados en castellano: es su doblaje automático **al inglés** y no afecta. En 3Blue1Brown la pista en español es de su programa de doblajes, que yo sepa no automática; lo confirmaré escuchando un fragmento en la Fase 1.

### A.2 Webs, documentos y artículos

| ID propuesto | URL | Resultado | Uso |
|---|---|---|---|
| r-elementsofai-es | https://www.elementsofai.com/es | 200 · «Una introducción a la inteligencia artificial, en línea y gratis, para no expertos» | 1.1, 1.3 |
| r-coursera-ia-todos | https://www.coursera.org/learn/ai-for-everyone | 200 · «IA para todos \| Coursera» (subtítulos en español: por confirmar) | 1.1 opc. |
| r-omc-manual-ia-2026 | https://www.cgcom.es/media/7247/download | 200 · PDF de 140 págs., 31 MB · «Manual de Buenas Prácticas para la IA en Medicina» (OMC, 2026) | 2.3, 3.0, 3.1 |
| r-omc-nota-manual | https://www.cgcom.es/media/7250/download | 200 · nota de prensa de la OMC, 2 págs. | 2.3 |
| r-aepd-rgpd-ia | https://www.aepd.es/guias/adecuacion-rgpd-ia.pdf | 200 · PDF (AEPD, 2020) | 2.3, 3.0 |
| r-aepd-auditorias-ia | https://www.aepd.es/guias/requisitos-auditorias-tratamientos-incluyan-ia.pdf | 200 · PDF (AEPD, 2021) | opc. |
| r-boe-lopdgdd | https://www.boe.es/buscar/doc.php?id=BOE-A-2018-16673 | 200 · Ley Orgánica 3/2018 | 2.3 |
| r-eurlex-ria | https://eur-lex.europa.eu/eli/reg/2024/1689/oj | 202 · 🔒 protección anti-bots | 2.3 |
| r-eurlex-omnibus | https://eur-lex.europa.eu/eli/reg/2026/1744/oj | 202 · 🔒 | 2.3 |
| r-aiact-explorer-omnibus | https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ | 200 · «Digital Omnibus on AI» | 2.3 |
| r-aesia | https://aesia.digital.gob.es/es | 200 · AESIA | 2.3 |
| r-oms-lmm-2024 | https://www.who.int/publications/i/item/9789240084759 | 200 · «Ethics and governance of AI for health: Guidance on large multi-modal models» | 2.3 |
| r-oms-etica-2021 | https://www.who.int/publications/i/item/9789240029200 | 200 · «Ethics and governance of artificial intelligence for health» | 2.3 opc. |
| r-oms-edadismo-2022 | https://www.who.int/publications/i/item/9789240040793 | 200 · «Ageism in artificial intelligence for health» | 2.5 |
| r-cima | https://cima.aemps.es/cima/publico/home.html | 200 · CIMA | 3.2 |
| r-aemps | https://www.aemps.gob.es | 200 | M0, 3.2 |
| r-stopp-start-3-es | https://www.elsevier.es/es-revista-revista-espanola-geriatria-gerontologia-124-articulo-version-espanol-criterios-stopp-start-3--S0211139X23001282 | 200 · versión en español de STOPP/START 3 | 3.2 |
| r-stopp-start-3-es-abierto | https://www.saludyfarmacos.org/lang/es/boletin-farmacos/boletines/nov202301/05_ve/ | 200 · acceso abierto (resumen y enlace) | 3.2 |
| r-deprescribing-algoritmos | https://deprescribing.org/resources/deprescribing-guidelines-algorithms/ | 200 | 3.2 |
| r-acbcalc | https://www.acbcalc.com | 200 · ACB Calculator | 3.2 |
| r-drugs-interacciones | https://www.drugs.com/drug_interactions.html | 200 | 3.2 |
| r-medscape-interacciones | https://reference.medscape.com/drug-interactionchecker | 403 · 🔒 Cloudflare | 3.2 |
| r-mdcalc | https://www.mdcalc.com | 200 | 3.2 |
| r-tripod | https://www.tripod-statement.org | 200 | 2.2 |
| r-consort-ai | https://doi.org/10.1016/S2589-7500(20)30218-1 | 200 → linkinghub.elsevier.com | 2.2 |
| r-chart | https://doi.org/10.1136/bmjmed-2025-001632 | 403 · 🔒 BMJ | 2.2 |
| r-semi-rce | https://revclinesp.es/es-inteligencia-artificial-practica-clinica-calidad-articulo-S0014256524001735 | 200 · «Inteligencia artificial en la práctica clínica: calidad y evidencia» | 2.2 |
| r-regg-editorial | https://doi.org/10.1016/j.regg.2023.101403 | 200 → linkinghub.elsevier.com | 2.5 |
| r-equator-care | https://www.equator-network.org/reporting-guidelines/care/ | 200 · CARE Guidelines | 3.5 |
| r-icmje-ia | https://www.icmje.org/recommendations/browse/artificial-intelligence/ai-use-by-authors.html | 200 | 3.5 |
| r-segg / r-semfyc / r-semi / r-seram | https://www.segg.es · https://www.semfyc.es · https://www.fesemi.org · https://seram.es | 200 (semFYC y SERAM, comprobados con curl) | 2.x |

**Búsquedas sin resultado útil (huecos documentados):**

- Documento de posicionamiento de la **SEGG** sobre IA.
- Documento de **semFYC** sobre IA (tiene un grupo de trabajo y fichas de un curso, no un posicionamiento).
- Documento formal de la **SEMI** (hay notas de prensa de 2023–2024 y el artículo de la *Rev Clin Esp*).
- Vídeo en castellano sobre **lectura crítica de estudios de IA**.

---

## Anexo B · Herramientas: verificación preliminar

Solo se ha comprobado que la web responde desde España. Disponibilidad real, precio, idioma y aptitud para datos de pacientes se verificarán una a una en la Fase 1 (pilotos) y en la Fase 4.

| Tarea | Herramientas | Respuesta 29/10/2026 |
|---|---|---|
| Asistentes generalistas | ChatGPT · Gemini · Microsoft Copilot · Claude · Mistral Le Chat | 200 · 200 · 200 · 🔒 · 🔒 |
| Evidencia clínica con IA | UpToDate (Expert AI) · ClinicalKey AI · DynaMed · AMBOSS · BMJ Best Practice · **OpenEvidence** | por verificar · … · **❌ no disponible en la UE (abril 2026)** |
| Cuadernos con tus documentos | Gemini Notebook (antes NotebookLM) | 200 (redirección verificada) |
| Bibliografía | PubMed · Epistemonikos · Trip · Cochrane Library · Consensus · Elicit · Scite · Semantic Scholar · Perplexity · ResearchRabbit · Connected Papers · Litmaps · Zotero | 200 · 200 · 200 · 🔒 · 200 · 200 · 200 · 200 · 🔒 · 200 · 200 · 200 · 200 |
| Estadística | jamovi · JASP | 200 · 200 |
| Presentaciones | Gamma · Canva · Copilot en PowerPoint | 🔒 · 200 · (licencia del centro) |
| Farmacología | CIMA · Drugs.com · Medscape · ACB Calculator · Bot PLUS · Lexicomp | 200 · 200 · 🔒 · 200 · por verificar · por verificar |

**Regla general sobre los datos de pacientes** (por confirmar herramienta a herramienta): con una **cuenta personal**, ninguna de estas herramientas es apta para datos identificables. Solo podría serlo una herramienta **contratada y autorizada por tu centro**, con contrato de encargo de tratamiento. El curso lo explicará así en 2.3 y 3.0.

---

## Anexo C · Referencias científicas ya localizadas

Comprobadas en PubMed (E-utilities) el 29/10/2026. Irán a `REVISION_CLINICA.md` cuando se usen.

| Uso | Referencia | PMID | DOI |
|---|---|---|---|
| 1.2 gancho MYCIN | Yu VL et al. Antimicrobial selection by a computer. A blinded evaluation by infectious diseases experts. *JAMA* 1979. | 480542 | — |
| 1.2 MYCIN | Shortliffe EH et al. Computer-based consultations in clinical therapeutics… MYCIN. *Comput Biomed Res* 1975. | 1157471 | 10.1016/0010-4809(75)90009-9 |
| 1.4 gancho | Gulshan V et al. Deep learning algorithm for detection of diabetic retinopathy… *JAMA* 2016. | 27898976 | 10.1001/jama.2016.17216 |
| 1.4 caja negra | Winkler JK et al. Surgical skin markings in dermoscopic images and CNN performance… *JAMA Dermatol* 2019. | 31411641 | 10.1001/jamadermatol.2019.1735 |
| 2.1 ECG | Attia ZI et al. Screening for cardiac contractile dysfunction using an AI-enabled ECG. *Nat Med* 2019. | 30617318 | 10.1038/s41591-018-0240-2 |
| 2.1 sepsis | Wong A et al. External validation of a widely implemented proprietary sepsis prediction model… *JAMA Intern Med* 2021. | 34152373 | 10.1001/jamainternmed.2021.2626 |
| 1.3 / 2.2 sesgo | Obermeyer Z et al. Dissecting racial bias in an algorithm… *Science* 2019. | 31649194 | 10.1126/science.aax2342 |
| 2.2 | Collins GS et al. TRIPOD+AI statement. *BMJ* 2024. | 38626948 | 10.1136/bmj-2023-078378 |
| 2.2 | Liu X et al. CONSORT-AI extension. *Lancet Digit Health* 2020. | 33328048 | 10.1016/S2589-7500(20)30218-1 |
| 2.2 | Cruz Rivera S et al. SPIRIT-AI extension. *Lancet Digit Health* 2020. | 33328049 | 10.1016/S2589-7500(20)30219-3 |
| 2.2 | CHART statement (chatbot health advice studies). *BMJ Med* 2025. | 40761518 | 10.1136/bmjmed-2025-001632 |
| 2.5 | Clegg A et al. Development and validation of an electronic frailty index. *Age Ageing* 2016. | 26944937 | 10.1093/ageing/afw039 |
| 2.5 | Fontecha-Gómez BJ, Betancor-Santana É. IA en geriatría: impacto de ChatGPT e IA. *Rev Esp Geriatr Gerontol* 2023. | 37738926 | 10.1016/j.regg.2023.101403 |
| 3.2 | O'Mahony D et al. STOPP/START criteria… version 3. *Eur Geriatr Med* 2023. | 37256475 | 10.1007/s41999-023-00777-y |
| 3.2 | Delgado-Silveira E et al. Versión en español de los criterios STOPP/START 3. *Rev Esp Geriatr Gerontol* 2023. | 37738843 | 10.1016/j.regg.2023.101407 |
| 3.2 | 2023 AGS Beers Criteria Update Expert Panel. *J Am Geriatr Soc* 2023. | 37139824 | 10.1111/jgs.18372 |
| 3.2 | LESS-CHRON (validación). *J Am Geriatr Soc* 2026. *(Artículo original de 2017: pendiente de localizar.)* | 41467581 | 10.1111/jgs.70269 |

*Fin del plan. Quedo a la espera de tu aprobación y de tus respuestas a las 5 preguntas antes de escribir código.*
