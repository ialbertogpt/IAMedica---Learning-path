# Informe · Fase 2: Módulo 0 y Parte 1 completos

Fecha: 31/10/2026 · Estado: **cerrada** (revisión de coherencia hecha; se continúa con la Fase 3 por indicación del usuario de ejecutar todas las fases en secuencia)

## Qué se ha hecho

**Contenido (9 subcapítulos nuevos, 38 sesiones nuevas, 33 interactivos, 9 tests):**

| # | Subcapítulo | Sesiones | Interactivos principales |
|---|---|---|---|
| M0 | Bienvenida | 2 | Autoevaluación inicial (12 ítems, se guarda), planificador de ritmo |
| 1.1 | ¿Qué es la IA? | 2 | «¿Esto es IA?» (10 ejemplos), muñecas rusas |
| 1.2 | De Turing a hoy | 2 | Línea temporal de 16 hitos filtrable, «¿Por qué MYCIN no llegó?» |
| 1.3 | Cómo aprende una máquina | 6 | Neurona, modelo sintético (umbral, ROC, prevalencia, cambio de hospital), demo de sobreajuste, clasificador de sesgos |
| 1.4 | Redes neuronales | 3 | Neurona con pesos, capas como comité, «¿En qué se fija?» |
| 1.6 | El arte de preguntar | 4 | Constructor de prompts con detector de datos identificativos, antes/después, complacencia, «¿qué bloque falta?» |
| 1.7 | Más allá del texto | 3 | Galería multimodal, «Audita la nota» del escriba |
| 1.8 | Estado del arte | 4 | Mapa del ecosistema, tipo de modelo, árbol «¿qué herramienta me conviene?» |

**Motores nuevos:** explorador, comparador, árbol de decisión, autoevaluación, modelo sintético (cuatro modos: umbral, sobreajuste, calibración y grupos), neurona, constructor de prompts y planificador. Los dos últimos modos del modelo sintético (calibración y grupos) se usarán en 2.2 y 2.5.

**Datos:** 28 recursos nuevos verificados (vídeos con duración, canal y capítulos; artículos con PMID), 19 términos nuevos de glosario (ya son 60) y 13 plantillas nuevas en la biblioteca de prompts (ya son 21). `REVISION_CLINICA.md` suma 21 filas.

## Revisión de coherencia al cerrar la fase

| Comprobación | Resultado |
|---|---|
| Compilación (20 páginas) y validación del contenido | Sin errores ni avisos |
| Duración: `npm run horas` | 2.160 min (36 h); **todos los subcapítulos coinciden con el plan** |
| Glosario: `npm run check-glosario` | Ningún término sin explicar (corregidos 25 con la nueva opción `--arreglar`) |
| Enlaces: `npm run check-links` | 99 únicos: 95 correctos, 3 redirigen (benignas), 1 en revisión manual (Medscape), 0 rotos |
| Referencias cruzadas entre subcapítulos | Coherentes con la numeración actual (1.6 prompting, 1.7 multimodal, 1.8 estado del arte) |
| Pruebas en Chrome (móvil de 390 px y escritorio) | **34 de 34** en cada tamaño: todas las sesiones de los 10 subcapítulos sin desbordes, 18 interactivos probados y los 8 tests nuevos resueltos y guardados. Sin errores de consola |
| Revisión visual | Interactivos nuevos en móvil y escritorio |

**Fallos encontrados y corregidos durante la revisión:**
1. Dos motores perdían respuestas si el alumno cambiaba varias a la vez (estado obsoleto en la autoevaluación, en «emparejar» y en la neurona): ahora usan actualizaciones funcionales.
2. Un objetivo con «: » sin comillas hacía que el frontmatter se leyese como un objeto. Ahora el validador lo detecta y lo explica.
3. La lista de verbos permitidos en los objetivos era corta: ampliada.
4. El comprobador de glosario daba falsos positivos con «Atención Primaria»: ahora busca «mecanismo de atención».

## Decisiones

1. **Respuestas de IA en los ejemplos:**
   - La comparación «antes/después» de 1.6 usa dos respuestas **redactadas por Claude (claude-sonnet-5-5) al responder a esos prompts exactos**, con la etiqueta de procedencia y la fecha.
   - Los ejemplos de complacencia y de la nota del escriba son **textos creados para el ejercicio** y así se indica: no se hacen pasar por salidas reales.
2. **1.8 es una fotografía fechada**: lista los modelos solo con lo verificado (sala de prensa de Anthropic, documentación de Google, OpenAI por buscador) y remite a las webs oficiales.
3. **1.2:** se ofrece un fragmento de 8 min 51 s (6:27–15:18) de EDteam por sus capítulos, marcado «con reservas» por ser un canal comercial.
4. **Tamaño de sesiones:** todas dentro de 15–25 min y sumadas igual al plan.

## Pendiente y reservas

- **Vídeos:** no he podido ver su contenido (YouTube no deja descargar transcripciones); verificado título, canal, duración, subtítulos y capítulos. Los marcados «con reservas» son opcionales o se usan por fragmentos con capítulos.
- **Revisión clínica humana** de `REVISION_CLINICA.md`: dos filas necesitan especialmente tu criterio, RC-1.6-02 (diagnóstico diferencial del delirium en el ejemplo «neutro») y RC-1.7-03 (caso ficticio de la nota).
- **MYCIN (RC-1.2-02):** la lista de razones por las que no se usó es la habitual en la literatura, pero no he podido leer el texto completo del artículo de 2018.
- **OpenAI (1.8):** su web bloquea las comprobaciones automáticas; la información sobre GPT-6 se ha contrastado por buscador y está marcada como tal.
