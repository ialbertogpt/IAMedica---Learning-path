# Informe · Fase 1: esqueleto + pilotos 1.5 y 3.2

Fecha: 30/10/2026 · Estado: **entregada, pendiente de tu revisión**

## Qué se ha hecho

### Infraestructura (completa)

- **Proyecto:** Astro 7.4 en salida estática, con MDX, islas Preact 11, Tailwind CSS 4 y Pagefind 1.5. Tipografías IBM Plex Sans y Mono autoalojadas e iconos Material Symbols insertados como SVG: no se hace ninguna petición a terceros.
- **Validación que hace fallar la compilación:**
  - Esquemas Zod para subcapítulos, tests, recursos, herramientas, glosario y prompts.
  - `scripts/validar-contenido.mjs` revisa el cuerpo de cada MDX: sesiones de 15–25 min cuya suma coincide con el total; componentes obligatorios (`OjoCon`, `Resumen`, `Ficha`, `TestFinal`, un visual propio y, en la Parte 3, «Pruébalo tú» y los pasos de anonimizar y verificar); términos, recursos, plantillas y datos existentes; y tests con exactamente una respuesta correcta y una explicación en cada opción.
- **Portada con el diseño que elegiste (opción 1a, «hoja clínica»):**
  - Resumen fijo a la izquierda: porcentaje, barra por partes, horas y sesiones, fecha estimada de fin a 4 sesiones por semana, progreso de cada parte e interruptor de «ruta exprés».
  - Bloque «continúa donde lo dejaste», con la sesión, sus marcas de progreso y el requisito recomendado.
  - Itinerario completo en tabla con raíl de colores, iconos por estación, notas de requisitos y estado de cada estación (completado, en curso con sesiones hechas, pendiente o en preparación).
  - En el móvil sigue la versión móvil de tu boceto: tarjeta compacta de progreso y partes desplegables. En tablet, el bloque «continúa» va primero.
- **Cabecera y pie del diseño:** navegación (Itinerario, Glosario, Prompts, Herramientas, Fichas), buscador con atajo «/», tema claro u oscuro, «Mi progreso», menú desplegable en el móvil y aviso clínico en el pie.
- **Página «Fichas»** (nueva, por el diseño): acceso directo a la ficha de bolsillo de cada subcapítulo.
- **Subcapítulos:** una sesión cada vez (con «ver todo en una página»), «Marcar como hecha y continuar», avisos suaves de requisitos, recursos, fuentes y fecha de revisión.
- **Progreso:** `localStorage`, exportar e importar con código comprimido y suma de verificación (`MIAM1-…`) o con archivo `.json`, y reinicio.
- **Motores de interactivos:** test (opción única, escenario, V/F, ordenar y emparejar), clasificador y «encuentra el error».
- **Interactivos específicos:** tokenizador real, minimodelo de lenguaje, ventana de contexto, calculadora renal didáctica y dos infografías.
- **Páginas transversales:** glosario con buscador (ignora tildes), biblioteca de prompts filtrable con botón de copiar, directorio de herramientas filtrable (tarea, gratis, español, disponible en España), recursos, buscador (Pagefind, funciona en local), mi progreso y «acerca de» (incluye cómo usarlo en la tablet).
- **Impresión:** ficha de bolsillo en una sola página A4 (comprobado en PDF) e impresión limpia del subcapítulo completo.
- **Scripts:** `check-links`, `check-glosario` y `horas`.
- **Documentos:** `CLAUDE.md`, `REVISION_CLINICA.md` (25 filas clínicas de 3.2, 6 de 1.5 y 10 técnicas) y `README.md`.

### Pilotos terminados al 100 %

| | 1.5 · Cómo «piensa» un LLM | 3.2 · Farmacología |
|---|---|---|
| Sesiones | 6 (120 min) | 7 (150 min) |
| Interactivos | Tokenizador real · predice la siguiente palabra · temperatura · ventana de contexto · detecta la confabulación · infografía «tres ayudas» · clasificador | ¿Dónde lo compruebo? · anatomía de la ficha técnica · calculadora Cockcroft-Gault/CKD-EPI · encuentra el error · taller de 12 fármacos con solución verificada |
| Recursos | 2 vídeos + 2 opcionales | 3 recursos + 5 opcionales |
| Pruébalo tú | 4 | 5, con pasos de anonimizar y verificar |
| Test | 5 preguntas, 5 tipos | 5 preguntas, 5 tipos |
| Verificación clínica | Barthel (PubMed), estudio de referencias inventadas (PubMed) | 10 fichas técnicas en CIMA (con fecha de revisión), apéndice de STOPP/START v3, Beers 2023, deprescribing.org, KDIGO 2024 |

## Comprobaciones realizadas

- **Compilación y validación:** sin errores ni avisos.
- **`check-links`:** 67 enlaces únicos, de los que 65 son correctos, 1 redirige y 1 queda en revisión manual. Ninguno está roto.
  - La redirección es `claude.ai`, que lleva a la página de inicio de sesión, como es normal.
  - La revisión manual es Medscape, que bloquea las comprobaciones automáticas.
  - Informe: `informes/enlaces-2026-10-30.md`.
- **`check-glosario`:** ningún término aparece sin explicar en los pilotos.
- **`horas`:** 2.160 min (36 h). Los dos pilotos coinciden con el plan. Informe: `informes/horas-2026-10-30.md`.
- **Pruebas automáticas en Chrome (móvil de 390 px y escritorio):** 36 comprobaciones superadas en cada tamaño (también tras el cambio de diseño), sin errores de consola. Han cubierto:
  - Que no haya desplazamiento horizontal.
  - La definición del glosario dentro de la pantalla.
  - Que cada interactivo responda: tokenizador, minimodelo, ventana, temperatura, los dos «encuentra el error», clasificador, calculadora (también en µmol/l) y test completo y guardado.
  - Que «Marcar como hecha» guarde el progreso y que «continúa donde lo dejaste» lo recoja.
  - Que exportar e importar funcionen y que un código corrupto se rechace.
  - Los filtros del glosario y de las herramientas, el buscador (también desde la cabecera), el paso de taller guardado, la «ruta exprés», el menú del móvil y la página «Fichas».
- **Revisión visual:** claro y oscuro, en móvil, tablet y escritorio.
- **Peso:** unos 36 KB comprimidos de JS y CSS por página. El tokenizador real (1 MB comprimido) solo se descarga si se pulsa «Trocear en tokens».

## Decisiones tomadas (y cambios respecto al plan)

0. **Diseño visual: aplicado tu boceto (opción 1a).**
   - Has sustituido la propuesta visual de `PLAN.md` (§8) por tu boceto. Lo he encontrado en Descargas (`UI para plataforma médica/Portada.dc.html`) y lo he copiado a `bocetos/Portada_dc.html`. También he corregido el enlace de `PLAN.md` para que apunte a él.
   - Lo he aplicado a toda la web: paleta OKLCH del boceto, IBM Plex Sans y Mono, iconos lineales teñidos con el color de cada línea, tarjetas, cuadros, interactivos, cabecera de los subcapítulos y portada. El plano de metro se ha retirado.
   - **Contraste comprobado:** todos los textos cumplen AA (el gris más claro da 4,8:1 o más). He oscurecido un poco el borde de los círculos «pendiente» (en el boceto quedaba en 1,7:1).
   - **Tamaño de letra:** el texto de lectura de los subcapítulos se mantiene en 18 px, como pedía el prompt. En la portada y los paneles uso 13–16 px, como en el boceto.
   - He sustituido mi boceto anterior, que borraste del repositorio.

1. **La temperatura y «predice la siguiente palabra» usan un minimodelo de lenguaje real**, en lugar de respuestas precalculadas. Es un modelo de juguete (cuenta palabras en unas 130 frases ficticias), pero sus probabilidades y su temperatura son reales. Así no hay que inventar salidas ni hacerlas pasar por las de un modelo, y la limitación queda explicada en pantalla.
2. **Los textos que imitan una respuesta de IA con errores** («encuentra el error») se etiquetan como «texto creado para este ejercicio; contiene 3 errores intencionados». No se presentan como salidas reales.
3. **El vídeo de la UVa sobre la ficha técnica pasa a «para saber más».** Está hecho desde la Facultad de Traducción, no para clínicos. Lo sustituye la infografía propia «Anatomía de una ficha técnica».
4. **Los motores «explorador» y «comparador»** (línea temporal, mapas, antes y después) no los usa ningún piloto. Los construiré en la Fase 2, cuando se necesiten (1.2, 1.6, 1.8), para no dejar código sin probar.
5. **Validación del cuerpo de los MDX con un script propio**, no con plugins de remark. Astro 7 cambió su procesador de Markdown por defecto, y así la validación no depende de él.
6. **Tu contexto, aplicado:** cuentas y dispositivos personales (el directorio y el taller lo dicen expresamente), sin depender de herramientas del SERMAS, y uso en local con instrucciones para la tablet en la wifi de casa.
7. **Revisión clínica y pruebas en dispositivos («a tu criterio»):**
   - Yo verifico cada dato contra su fuente y lo dejo en `REVISION_CLINICA.md`.
   - La **revisión médica final la haces tú**, como médico y alumno: es la única que garantiza el contenido. Te propongo empezar por las 25 filas de 3.2.
   - He probado la web en Chrome simulando un móvil. Falta que la abras en **tu tablet real** (instrucciones en el README).

## Lo que falta o queda pendiente

- **Contenido de los vídeos:** YouTube bloquea la descarga automática de transcripciones. He verificado título, canal, duración, subtítulos, pistas de audio, descripción y capítulos (los capítulos del vídeo de 3Blue1Brown coinciden con lo que se explica en 1.5), pero **no he podido ver los vídeos**. Te pido que mires por encima los dos vídeos de 1.5 (8 y 15 min).
- **Medscape:** comprobación manual pendiente (bloquea los robots).
- **OpenEvidence:** la retirada de la UE está confirmada por prensa, no por un comunicado de la empresa.
- **Precios de los asistentes de pago:** sin verificar. Se hará en la Fase 4 (subcapítulo 3.0).
- **Lighthouse:** se ejecutará en la Fase 5.
- **Palabras frente a plan:** los pilotos tienen menos texto del que estimaba el plan (unas 2.100 y 2.700 palabras frente a 4.400 y 4.000), porque he priorizado bloques cortos. El tiempo se mantiene con los interactivos y la práctica: en 1.5 calculo unos 110–120 min reales. Lo recalibraré con `npm run horas` en la Fase 5.

## Lo que necesito de ti

1. **Revisa los pilotos** con los criterios del prompt: ¿lo entiendes todo sin ayuda?, ¿los interactivos funcionan en tu tablet?, ¿los tests explican bien?
2. **Revisión clínica** de `REVISION_CLINICA.md`, sobre todo la solución del taller de 3.2 (fila RC-3.2-25, que son valoraciones clínicas y no datos).
3. Dime si la **adaptación de tu diseño 1a** es lo que buscabas (sobre todo el tamaño de letra de la portada) y qué cambiarías de **tono, extensión y diseño** antes de escribir los 20 subcapítulos restantes: es el momento más barato para ajustar la plantilla.
4. **Aprobación para pasar a la Fase 2** (Parte 1 completa + Módulo 0).
