# Mi IA Médica · Learning Path

Curso personal de inteligencia artificial para médicos: unas 36 horas en sesiones de 15–25 minutos, con interactivos, talleres prácticos y tests sin nota. Es una web estática: funciona sin servidor, sin claves y sin cookies.

> **Estado:** versión piloto (Fase 1). Incluye la infraestructura completa y dos subcapítulos terminados: **1.5 · Cómo «piensa» ChatGPT o Claude** y **3.2 · Farmacología**. El resto de estaciones del itinerario aparecen como «en preparación».

## Requisitos

- [Node.js](https://nodejs.org/) 22.23.4 o posterior (probado con Node 24).
- Un navegador actual (Chrome, Edge, Firefox o Safari).

## Primer uso

Abre una terminal en esta carpeta y ejecuta:

```bash
npm install          # solo la primera vez
npm run build        # comprueba el contenido y genera la web en dist/
npm run preview      # la sirve en http://localhost:4321
```

Abre <http://localhost:4321> en el navegador.

### En la tablet o el móvil (misma wifi de casa)

```bash
npm run build
npm run preview -- --host
```

La terminal mostrará una dirección del tipo `http://192.168.1.23:4321/`. Escríbela en el navegador de la tablet. Si Windows pregunta por el cortafuegos, permite el acceso **solo en redes privadas**. El progreso de cada dispositivo es independiente: pásalo de uno a otro desde **Mi progreso → Exportar / Importar**.

> Nota: al abrirla desde la tablet por `http://`, algunos navegadores no permiten copiar al portapapeles automáticamente. La web lo detecta y selecciona el texto para que lo copies a mano.

## Mientras editas el contenido

```bash
npm run dev          # servidor de desarrollo con recarga automática (el buscador solo funciona tras build)
```

## Comprobaciones

| Comando | Qué hace |
|---|---|
| `npm run validar` | Comprueba que cada subcapítulo cumple la plantilla: sesiones de 15–25 min, objetivos, recursos, test, «Ojo con…», resumen, ficha y pasos de taller. Se ejecuta solo antes de `dev` y `build`. |
| `npm run check-links` | Comprueba todos los enlaces (vídeos de YouTube incluidos) y deja un informe en `informes/enlaces-AAAA-MM-DD.md`. Con `-- --actualizar` actualiza las fechas de verificación de los enlaces correctos. |
| `npm run check-glosario` | Avisa de términos del glosario que aparecen sin su explicación. |
| `npm run horas` | Recalcula la duración del curso y la compara con el plan (`informes/horas-AAAA-MM-DD.md`). |

## Cómo actualizar el contenido

- **Texto de un subcapítulo:** `src/content/partes/parte-N/X-Y-slug.mdx`. Es Markdown con algunos componentes (ver `CLAUDE.md`).
- **Tests:** `src/content/tests/X-Y.json`.
- **Glosario, plantillas de prompts, herramientas y recursos:** archivos JSON en `src/data/`.
- **Interactivos:** sus datos están en `src/data/interactivos/`.
- Si te falta un campo obligatorio, `npm run build` se detiene y te dice qué y dónde.

Cada vez que cambies una dosis, un criterio o un dato clínico, actualiza **`REVISION_CLINICA.md`**.

## Mantenimiento: qué revisar cada pocos meses

El curso está **completo** (36 h, 104 sesiones). Lo que caduca es lo sensible al tiempo; revísalo con esta lista y cambia la fecha («a fecha de…») al hacerlo:

1. **Modelos y empresas (1.8):** nombres de modelos, planes y disponibilidad. Fuente: la web de cada empresa.
2. **Herramientas y precios (2.4, 3.0, 3.3, directorio):** `src/data/herramientas.json` y los mapas de 2.4, 3.0 y 3.3. Comprueba también los ajustes de privacidad de 3.0 en las páginas de ayuda de cada empresa.
3. **Regulación (2.3):** calendario del Reglamento de IA (Reglamento (UE) 2026/1744 y posteriores) y estado del proyecto de ley español de IA.
4. **Fichas técnicas (3.1, 3.2):** vuelve a mirar la sección 10 (fecha de revisión) de cada ficha citada en CIMA y actualiza `REVISION_CLINICA.md`.
5. **Enlaces y vídeos:** `npm run check-links` (con `-- --actualizar` para fechar los correctos). Los enlaces «en revisión manual» ábrelos en el navegador.
6. **Estudios de 2.1 y 2.5:** si aparece un ensayo nuevo importante en un área, añádelo al mapa con su nivel de evidencia.

Si cambias el dataset de 3.4 (`npm run generar-dataset`, necesita `exceljs`, solo de desarrollo), recalcula los resultados de referencia del taller.

## Privacidad

- La web no usa cookies ni analítica. El progreso se guarda solo en el navegador (`localStorage`).
- Los vídeos de YouTube no se cargan hasta que pulsas «Reproducir» (y se insertan desde `youtube-nocookie.com`).
- Las tipografías están incluidas en la web.
- Astro, la herramienta con la que se compila la web, envía estadísticas anónimas de uso de la propia herramienta (no de la web ni de tu progreso). Para desactivarlas en este ordenador: `npx astro telemetry disable`.

## Si algún día quieres publicarlo

La carpeta `dist/` que genera `npm run build` se puede subir tal cual a cualquier alojamiento estático gratuito: Netlify (arrastrar y soltar la carpeta en app.netlify.com), GitHub Pages o Cloudflare Pages. Ten en cuenta que quien tenga el enlace podrá verla.

## Documentos del proyecto

- `PROMPT.md`: el encargo original.
- `PLAN.md`: el plan aprobado (Fase 0), con el cálculo de horas y la verificación de recursos.
- `CLAUDE.md`: convenciones de contenido, tono, seguridad y estructura.
- `REVISION_CLINICA.md`: afirmaciones clínicas con su fuente, para revisión médica.
- `informes/`: informes de cada fase, de enlaces y de horas.

## Licencias de terceros

- Tipografías IBM Plex Sans e IBM Plex Mono (SIL Open Font License), distribuidas por Fontsource.
- Iconos Material Symbols de Google (Apache 2.0), paquete `@material-symbols/svg-300`: se insertan como SVG solo los que se usan.
- Tokenizador `gpt-tokenizer` (MIT).
- Criterios STOPP/START v3 (O'Mahony et al., 2023; CC BY 4.0): citados y parafraseados.
- `exceljs` (MIT), solo para generar los ficheros de ejemplo del taller 3.4; no forma parte del sitio publicado.
- El dataset de 3.4 es sintético y propio: no contiene datos de ninguna persona.
