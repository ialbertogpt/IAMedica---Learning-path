# Informe · Fase 3: Parte 2 «La IA en medicina»

Fecha: 31/10/2026 · Estado: **cerrada** (revisión de coherencia hecha; se continúa con la Fase 4 por indicación del usuario de ejecutar todas las fases en secuencia)

## Qué se ha hecho

**Contenido (5 subcapítulos nuevos, 23 sesiones, 15 interactivos de datos, 5 tests):**

| # | Subcapítulo | Min. | Sesiones | Interactivos principales |
|---|---|---:|---:|---|
| 2.1 | Dónde está ya la IA en medicina | 120 | 6 | Mapa por especialidades con nivel de evidencia (11 estudios), clasificador de niveles, árbol «¿implantas la alarma de sepsis?» |
| 2.2 | Leer con lupa un estudio de IA médica | 90 | 4 | Simulaciones de calibración y de infrarrepresentación, «¿qué guía corresponde?», «encuentra las 6 señales de alarma», «¿te fiarías?» |
| 2.3 | Ética, regulación y privacidad | 90 | 4 | Semáforo de datos (10 casos), calendario regulatorio filtrable, árbol de la obediencia algorítmica |
| 2.4 | Mapa de herramientas | 60 | 3 | Mapa de 6 familias, «¿qué familia para cada tarea?», árbol «te ofrecen una herramienta nueva» |
| 2.5 | IA y geriatría | 120 | 6 | Mapa de 6 áreas con evidencia, «¿qué se puede afirmar hoy?» (8 frases), caso ramificado de Doña Carmen, simulaciones de calibración y de grupos |

**Datos:** 35 recursos nuevos verificados (ya son 90): artículos con PMID, documentos oficiales y una nota de prensa del Ministerio. 12 términos nuevos de glosario (ya son 72) y 5 plantillas nuevas (ya son 26). `REVISION_CLINICA.md` suma 46 filas y 2 afirmaciones técnicas.

**Hilo pedagógico:** 2.1 enseña a *pesar la evidencia* con una escala didáctica propia (N1–N4) y cifras reales; 2.2 da las herramientas de lectura (validación, VPP, calibración, guías de comunicación); 2.3 y 2.4 sitúan la regulación y las herramientas; 2.5 lo aplica a geriatría y lo cierra con la decisión compartida. Una idea se repite a propósito: **resultado intermedio ≠ beneficio para el paciente** (MASAI, EAGLE, OPERAM, sensores de caídas).

## Revisión de coherencia al cerrar la fase

| Comprobación | Resultado |
|---|---|
| Compilación (25 páginas) y validación del contenido | Sin errores ni avisos |
| Duración: `npm run horas` | 2.160 min (36 h) en el plan; **los 5 subcapítulos nuevos coinciden con el plan** (120/90/90/60/120) |
| Glosario: `npm run check-glosario` | Ningún término sin explicar (revisados a mano los insertados por `--arreglar`: 3 salieron de encabezados y 3 de celdas de tabla) |
| Enlaces: `npm run check-links` | 140 únicos: 137 correctos, 2 redirigen, 1 en revisión manual (Medscape), 0 rotos |
| Pruebas en Chrome (móvil de 390 px y escritorio de 1280 px) | **45 de 45** en cada tamaño: todas las sesiones de los 15 subcapítulos sin desbordes, 16 interactivos de la Parte 2 probados (filtros, clasificadores, árboles, simulaciones y «encuentra el error») y los 13 tests de M0, Parte 1 y Parte 2 resueltos y guardados. Sin errores de consola |
| Revisión visual | Tablas, calendario y mapas en móvil |
| `REVISION_CLINICA.md` | 46 filas nuevas de la Parte 2, con fuente y fecha |

## Errores encontrados al releer las fuentes (y corregidos)

Lo más valioso de la revisión fue volver a las fuentes primarias. Esto es lo que salió:

1. **Epic Sepsis Model (1.3 y 2.1):** el texto decía que el modelo «identificó 183 de 2.552 pacientes con sepsis». Los 183 eran los casos detectados *sin* antibiótico a tiempo; el modelo **no identificó a 1.709 (67 %)**. Corregido en 1.3, en 2.1 y en `REVISION_CLINICA.md` (RC-1.3-03).
2. **Enlace de la FDA roto:** la URL que recordaba daba 404. Se sustituye por el registro De Novo DEN180001 (IDx-DR, decisión del 11/04/2018), que sí se comprobó, y se actualiza RC-1.2-04.
3. **Alfabetización en IA (art. 4):** el Reglamento (UE) 2026/1744 (en vigor desde el 27/07/2026) **suavizó** la obligación: ahora hay que «adoptar medidas para apoyar» la alfabetización, sin garantizar un nivel concreto. Estaba a punto de describirla con la redacción antigua.
4. **MASAI 2023:** la diferencia de detección estaba en el límite de la significación (razón 1,2; p = 0,052; era un análisis de seguridad). Ahora se dice, y la razón de 2025 (1,29) se presenta como ya significativa.
5. **EAGLE:** define la fracción de eyección baja como ≤ 50 %, no ≤ 35 % como el estudio de Attia. Se aclara para que no se confundan.
6. **Rentosertib:** «seguro y bien tolerado» es la conclusión de los autores, pero el resumen muestra eventos adversos del 70,6–83,3 % entre grupos y suspensiones por hepatotoxicidad y diarrea. El texto cita los datos y la conclusión por separado, y señala los intervalos amplios.
7. **Una «corrección» mía que era errónea:** al releer los escribas ambientales pensé que los «238 médicos» no constaban y los retiré; al leer el resumen completo (mi extractor cortaba antes de la sección de métodos) **sí constan**, así que se restauró. Queda anotado en `CLAUDE.md`: las cifras se leen en el resumen *completo*.
8. **Falso positivo del glosario:** el término «Producto sanitario (software)» hacía que `check-glosario` marcase la palabra «software» en 1.8. Se renombra a «Producto sanitario» y se revierte esa etiqueta.
9. **Finales de línea:** los scripts de Python reescribían los ficheros en CRLF y el diff marcaba ficheros enteros como cambiados. Normalizado y documentado en `CLAUDE.md`.
10. **Acceso a EUR-Lex:** el texto consolidado del Reglamento de IA devolvía HTTP 202 (anti-bots). Se usó el Explorador del Reglamento para los artículos 26, 50 y 113 y el anexo I; el Reglamento (UE) 2026/1744 sí se leyó directamente en EUR-Lex.

## Decisiones

1. **Escala N1–N4:** es **propia del curso** y así se dice en el texto, en el mapa y en la ficha. Es una herramienta pedagógica, no un estándar. (RC-2.1-01 te pide que juzgues si los niveles asignados te parecen razonables.)
2. **Productos y estudios ficticios:** «CaidasAI», «RadioTorax», «LatidoApp», «DoctorBot», «AlertaDelirio», «ClasificaRiesgo» y Doña Carmen son **ficticios** y se declaran como tales. Los números del ejemplo del VPP (90 %, 5 %, 1.000 pacientes) son redondos y ficticios.
3. **Manual de la OMC:** los diez principios y el checklist se **parafrasean** con cita de página; no se reproducen.
4. **Disponibilidad y precios:** 2.4 solo afirma lo que ya está verificado en el directorio y remite a él; los precios se verificarán en 3.0.
5. **Estado de la ley española de IA:** se dice «proyecto en tramitación» y se remite al expediente del Congreso, porque una fuente secundaria sugiere que pudo caducar y no he podido confirmarlo.

## Pendiente y reservas

- **Vídeos:** no he podido ver su contenido. En 2.1 se usan el de AlphaFold (2021, anterior al Nobel, y así se indica) y el de Civio; en 2.3, el de la SERAM, marcado «con reservas» y con aviso de que es anterior al Reglamento (UE) 2026/1744.
- **Reglamento de IA, art. 26:** leí el texto hasta el apartado 2 (uso conforme a las instrucciones y supervisión humana por personas con competencia, formación y autoridad). Es lo único que se afirma.
- **Ley española de IA (RC-2.3-08):** estado actual por confirmar.
- **OpenEvidence (RT-10 / RC-2.4-03):** falta el comunicado de la empresa; se cita a Medscape y a la prensa sectorial.
- **Revisión clínica humana:** conviene tu criterio especialmente en RC-2.1-01 (niveles de evidencia), RC-2.3-03 (conclusión práctica sobre cuentas personales y RGPD, que contrastaría con el delegado de protección de datos), RC-2.5-01 (rasgos de la geriatría) y el caso de Doña Carmen (RC-2.5-11).
