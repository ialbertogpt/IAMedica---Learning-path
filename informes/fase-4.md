# Informe · Fase 4: Parte 3 «Tu caja de herramientas»

Fecha: 31/10/2026 · Estado: **cerrada** (revisión de coherencia hecha; se continúa con la Fase 5 por indicación del usuario de ejecutar todas las fases en secuencia)

## Qué se ha hecho

**Contenido (8 subcapítulos nuevos, 42 sesiones, 28 interactivos de datos, 8 tests):**

| # | Subcapítulo | Min. | Ses. | Qué practica el alumno |
|---|---|---:|---:|---|
| 3.0 | Tu entorno de trabajo seguro | 60 | 3 | Ajustes de privacidad de cada asistente (con fuente y fecha), «¿basta el plan gratuito?», anonimizador de práctica (8 identificadores) |
| 3.1 | Dudas sobre casos clínicos | 150 | 7 | Caso ficticio: estructurarlo, diferencial razonado, complacencia (dos respuestas etiquetadas), «¿qué falla en esta respuesta?» con fichas técnicas de CIMA |
| 3.2 | Farmacología (piloto de la Fase 1) | 150 | 7 | Ya existía |
| 3.3 | Búsqueda bibliográfica | 150 | 7 | PICO, constructor visual de búsquedas de PubMed, «¿real, mal citada o inventada?», tabla de evidencia con artículos reales |
| 3.4 | Análisis estadístico | 180 | 9 | Dataset sintético descargable con errores, limpieza, árbol de pruebas, simulador de p-valor e IC, jamovi con resultados de referencia, interpretación con errores |
| 3.5 | Escribir un artículo | 105 | 5 | ICMJE y declaración de uso de IA, guía CARE de 13 apartados, «¿delego esto?», revisión de un borrador con 5 fallos |
| 3.6 | Presentaciones | 75 | 4 | Guion, diapositivas antes/después, imágenes clínicas |
| 3.7 | Formación continuada | 60 | 3 | Con y sin el material cargado (respuestas etiquetadas), cuadernos con citas |
| 3.8 | Proyecto final | 90 | 4 | Dos itinerarios, autoevaluación final comparada con la inicial y certificado no oficial |

**Componentes nuevos:** constructor de búsquedas de PubMed (3.3), simulador de p-valor e intervalo de confianza (3.4), maquetas «antes y después» de diapositivas (3.6) y página `/certificado/` (3.8). **Dataset:** `npm run generar-dataset` genera cuatro ficheros en `public/descargas/` (Excel y CSV, con errores y limpios) con semilla fija.

**Datos:** 18 recursos nuevos (ya son 108: vídeos con duración y capítulos, ICMJE, CARE, jamovi, JASP, PubMed…), 33 plantillas nuevas (ya son 55) y precios verificados en el directorio. `REVISION_CLINICA.md` suma 29 filas.

## Revisión de coherencia al cerrar la fase

| Comprobación | Resultado |
|---|---|
| Compilación (34 páginas) y validación del contenido | Sin errores ni avisos |
| Duración: `npm run horas` | 2.160 min (36 h): **todos los subcapítulos coinciden con el plan** |
| Glosario: `npm run check-glosario` | Ningún término sin explicar |
| Enlaces: `npm run check-links` | 173 únicos: 166 correctos, 4 redirigen, 3 en revisión manual, 0 rotos |
| Pruebas en Chrome (móvil de 390 px y escritorio de 1280 px) | **35 de 35** en cada tamaño: todas las sesiones de la Parte 3 sin desbordes, los interactivos nuevos, la descarga de los 4 ficheros del dataset, la comparación de autoevaluaciones, el certificado y los 8 tests resueltos y guardados. Sin errores de consola |
| `npm audit` (dependencias de producción) | 0 vulnerabilidades. `exceljs` es solo de desarrollo (genera los ficheros) y trae avisos moderados que no llegan al sitio publicado |

## Fallos encontrados y corregidos al revisar

1. **Objetivos con verbos no observables** («Convertir», «Evitar», «Contrastar», «Cargar», «Respetar», «Definir»): la compilación los rechazó; se reformularon.
2. **Mapa de ajustes de privacidad:** una primera versión mencionaba datos que solo había visto en una fuente secundaria. Se rehízo con las páginas de ayuda oficiales de OpenAI, Anthropic y Google; Copilot queda como «sin verificar» porque su página devolvió un 404.
3. **Estrategia de PubMed del ejemplo:** el recuento que había apuntado (28) correspondía a una cadena distinta de la que genera el constructor; se recalculó con la cadena exacta (29).
4. **Dataset:** la primera calibración daba 1 fallecimiento en 250 pacientes (inútil para regresión); se recalibró (31 % de ingresos, 11 % de mortalidad).
5. **Resultados estadísticos:** se calcularon por dos vías independientes (Python y Node, sin librerías estadísticas) y coinciden en todas las cifras. Ningún valor del texto se ha tomado de memoria.
6. **Etiquetas del glosario** insertadas por la herramienta automática dentro de encabezados y celdas de tabla: se movieron al párrafo.
7. **Hiponatremia:** mi primera redacción decía que «las guías recomiendan corrección gradual»; la revisión de 2024 también contempla el tratamiento urgente en casos sintomáticos graves. El texto ahora dice «prefieren una corrección gradual y controlada antes que una normalización rápida, por el riesgo de sobrecorrección».
8. **Referencia al índice de Barthel en Excel:** las letras de columna del ejemplo no coincidían con el fichero; corregidas (D y I).

## Decisiones

1. **Dos respuestas de IA etiquetadas como redactadas por Claude (claude-sonnet-5-5)** en 3.1 (diferencial neutro) y 3.7 (sin y con el documento), como muestras genuinas; las de complacencia y los errores intencionados, como «texto creado para este ejercicio».
2. **Directorio de herramientas:** solo se han actualizado los precios que he podido leer en páginas oficiales (Claude); para ChatGPT y Google el curso remite a su web, porque el precio en euros se carga dinámicamente. Las herramientas de literatura se describen en 3.3 con lo que dice cada web oficial, sin ampliar el directorio con datos no verificados.
3. **Referencias inventadas del juego de 3.3:** se comprobó en PubMed y en doi.org que no existen o que apuntan a otro artículo, y se declaran como creadas para el ejercicio.
4. **Certificado:** personal, no oficial, generado en el navegador; el nombre se guarda solo en el dispositivo.

## Pendiente y reservas

- **Vídeos:** no he visto su contenido. Los de jamovi, Gamma, NotebookLM y privacidad de Red SanitarIA están «con reservas» (títulos comerciales, enlaces de afiliado o anteriores al cambio de nombre de NotebookLM) y se usan por capítulos o como opcionales. No he encontrado un vídeo en castellano fiable específico para 3.1, 3.5 ni 3.7 (CARE/ICMJE); se compensa con interactivos propios.
- **jamovi:** no se ha ejecutado en este entorno. Los resultados de referencia están calculados por dos vías propias; convendría que alguien los reproduzca con jamovi y confirme los nombres de los menús.
- **Gamma, Perplexity, Cochrane Library, ChatGPT (precios en euros) y Google (precios en euros):** las webs bloquean o cargan dinámicamente; así lo dice el texto.
- **Revisión clínica humana:** conviene tu criterio especialmente en RC-3.1-01 y RC-3.1-06 (caso y diferencial de la respuesta «neutra»), RC-3.0-05 (lista de anonimización), RC-3.4-03 (árbol de pruebas) y RC-3.6-01 (imágenes en sesiones internas).
