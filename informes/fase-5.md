# Informe · Fase 5: revisión final y entrega

Fecha: 31/10/2026 · Estado: **curso completo**

## Estado final

| Dato | Valor |
|---|---|
| Subcapítulos | 23 (M0 + Parte 1: 8 + Parte 2: 5 + Parte 3: 9 con 3.0–3.8) |
| Duración | 2.160 min = **36 h**, 104 sesiones; cada subcapítulo coincide con el plan |
| Interactivos y tests | 63 ficheros de datos interactivos, 23 tests (todos resueltos y guardados en la QA) |
| Datos | 108 recursos externos, 72 términos de glosario, 55 plantillas de prompts, 15 herramientas |
| Revisión clínica | `REVISION_CLINICA.md`: filas de todos los subcapítulos con fuente y fecha |
| Páginas | 34 compiladas (incluidas fichas, glosario, prompts, herramientas, recursos, progreso y certificado) |

## Comprobaciones finales

| Comprobación | Resultado |
|---|---|
| Compilación y validación del contenido | Sin errores ni avisos |
| Enlaces (`npm run check-links`) | 173 únicos: 166 correctos, 4 redirigen, 3 en revisión manual, **0 rotos** |
| Glosario | Ningún término sin explicar |
| Pruebas en Chrome, regresión completa (móvil 390 px) | **45/45** (M0, Partes 1 y 2) y **35/35** (Parte 3, incluidos certificado y descargas); en escritorio, 45/45 y 35/35 en las ejecuciones previas. Sin errores de consola |
| Lighthouse (móvil, páginas representativas) | Accesibilidad **100**, buenas prácticas **100**; rendimiento 84–99 |
| `npm audit` (producción) | 0 vulnerabilidades |

## Correcciones de esta fase

1. **Accesibilidad:** Lighthouse señaló dos fallos (96 → 100): el nombre accesible del logo no contenía su texto visible y los enlaces dentro de párrafos solo se distinguían por el color. Corregidos (ahora van subrayados).
2. **Directorio de herramientas:** el último «precio por verificar» (Copilot) se sustituyó por lo comprobado.
3. **README:** guía de mantenimiento (qué revisar cada pocos meses) y licencias de `exceljs` y del dataset.
4. **Salto de maquetación (CLS):** la primera sesión se sirve ya como activa; no basta para los subcapítulos con requisitos (3.3, 3.4…).

## Reservas que quedan (honestas)

- **Rendimiento 84–86 en 3.3 y 3.4:** al abrirlos sin haber hecho sus requisitos aparece un aviso («Pide 3.0») que desplaza el contenido (CLS ≈ 0,25). Es un efecto de la primera visita y no afecta al uso; se podría reservar espacio para el aviso si molesta.
- **Revisión clínica humana pendiente (tuya):** las filas de `REVISION_CLINICA.md` marcadas «**Revisar**». Las más importantes: niveles de evidencia N1–N4 (RC-2.1-01), cuentas personales y RGPD (RC-2.3-03), caso e interpretación de 3.1 (RC-3.1-01, RC-3.1-06), lista de anonimización (RC-3.0-05), árbol de pruebas estadísticas (RC-3.4-03) y la regla de imágenes en sesiones internas (RC-3.6-01).
- **Vídeos:** no he visto su contenido (YouTube no permite descargar transcripciones); se comprobaron título, canal, duración, subtítulos y capítulos. Varios están «con reservas» y se usan por capítulos o como opcionales.
- **jamovi** no se ha ejecutado aquí: los resultados de referencia de 3.4 están calculados por dos vías propias independientes; conviene reproducirlos con jamovi y confirmar los nombres de los menús.
- **Webs que bloquean comprobaciones:** OpenAI, Gamma, Perplexity, Cochrane, Medscape; precios en euros de ChatGPT y Google. El texto lo dice en cada caso.
- **Sensible al tiempo (octubre de 2026):** modelos y planes, calendario del Reglamento de IA y estado de la ley española de IA. El README indica qué revisar y cuándo.

## Cómo usarlo

```
npm run build
npm run preview -- --host      # y abrir la dirección de red desde la tablet
```
