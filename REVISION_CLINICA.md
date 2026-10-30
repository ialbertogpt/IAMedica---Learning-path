# Revisión clínica

Este documento recoge **todas las afirmaciones clínicas, dosis, criterios y cálculos** usados en el texto, los ejemplos, los interactivos y los tests del curso. Cada una lleva su fuente para que un médico la revise antes de dar el contenido por bueno.

**Cómo usarlo:** comprueba cada fila contra su fuente y rellena «Revisado por / fecha». Si algo no coincide, anótalo en «Observaciones» y se corrige el contenido.

- **Verificado (Claude):** comprobado por Claude contra la fuente original el día indicado. **No sustituye la revisión de un médico.**
- **Fichas técnicas:** consultadas en CIMA a través de su servicio de secciones (`cima.aemps.es/cima/rest/docSegmentado`). Las fichas se actualizan: antes de cada revisión anual del curso, vuelve a comprobar la fecha de la sección 10.

Última actualización: 30/10/2026 (Fase 1: pilotos 1.5 y 3.2).

---

## 3.2 · Farmacología

Caso ficticio usado en todo el taller: mujer de 84 años, 58 kg, creatinina 1,75 mg/dl, FG estimado (CKD-EPI 2021) de 28,4 ml/min/1,73 m² y Cockcroft-Gault de 21,9 ml/min.

| ID | Afirmación | Dónde aparece | Fuente (documento · versión · sección) | Verificado (Claude) | Revisado por / fecha | Observaciones |
|---|---|---|---|---|---|---|
| RC-3.2-01 | Metformina: **contraindicada con TFG inferior a 30 ml/min**. Con TFG de 30–44, dosis máxima de 1.000 mg/día. | S1 clasificador · S3 «Encuentra el error» · S6 solución · test P1 · ficha | Ficha técnica de Metformina Cinfa 850 mg (nº reg. 68167), revisión de marzo de 2025, secciones 4.2 (tabla) y 4.3 | 30/10/2026 | | |
| RC-3.2-02 | Apixabán en la FANV: 5 mg/12 h; **2,5 mg/12 h** si se cumplen al menos dos de estos criterios: edad de 80 años o más, peso de 60 kg o menos, creatinina de 1,5 mg/dl o más. Con **aclaramiento de 15–29 ml/min, 2,5 mg/12 h**. Por debajo de 15 ml/min o en diálisis, no recomendado. | S1 · S3 · S6 · test P3 | Ficha técnica de Eliquis 5 mg (nº reg. 111691009, autorizado por la EMA), sección 4.2; consultada el 30/10/2026 (CIMA remite a la EMA para la fecha de revisión) | 30/10/2026 | | |
| RC-3.2-03 | Digoxina: en mayores, dosis más bajas y control de los niveles; el mantenimiento se ajusta al aclaramiento de creatinina. | S6 solución | Ficha técnica de Digoxina Kern Pharma 0,25 mg (nº reg. 34566), revisión de octubre de 2026, sección 4.2 | 30/10/2026 | | |
| RC-3.2-04 | Enalapril: con un aclaramiento de 10–30 ml/min, **dosis inicial de 2,5 mg/día**. Vigilar el potasio y la función renal. | S2 (usa el aclaramiento) · S6 solución | Ficha técnica de Enalapril Cinfa 20 mg (nº reg. 63355), revisión de julio de 2021, sección 4.2 (tabla 2) | 30/10/2026 | | La tabla de la ficha se ve con caracteres defectuosos en CIMA; el valor de 2,5 mg para 10–30 ml/min se lee bien. |
| RC-3.2-05 | Amlodipino: el **edema es una reacción adversa muy frecuente** (≥ 1/10). | S6 solución | Ficha técnica de Amlodipino Cinfa 10 mg (nº reg. 65461), revisión de julio de 2022, sección 4.8 | 30/10/2026 | | |
| RC-3.2-06 | Simvastatina: **con amlodipino, no superar 20 mg/día**. Con un aclaramiento inferior a 30 ml/min, las dosis de más de 10 mg/día deben considerarse con cuidado y, si se usan, con precaución. | S1 · S3 · S4 (Pruébalo tú) · S6 · test P3 | Ficha técnica de Simvastatina Cinfamed 40 mg (nº reg. 70235), revisión de abril de 2026, secciones 4.2 y 4.5 | 30/10/2026 | | |
| RC-3.2-07 | Lorazepam: en el insomnio, duración máxima de 4 semanas incluida la retirada gradual. En mayores puede bastar la mitad de la dosis de adultos. | S6 solución | Ficha técnica de Lorazepam Cinfa 1 mg (nº reg. 68477), revisión de noviembre de 2021, sección 4.2 | 30/10/2026 | | |
| RC-3.2-08 | Amitriptilina: en mayores de 65 años, dosis inicial de 10–25 mg por la noche. | S1 clasificador · S6 solución | Ficha técnica de Tryptizol 25 mg (nº reg. 37130), revisión de enero de 2025, sección 4.2 | 30/10/2026 | | |
| RC-3.2-09 | Alopurinol: con alteración renal, empezar con un máximo de 100 mg/día y aumentar solo si la respuesta no es satisfactoria. En la insuficiencia renal grave, menos de 100 mg/día o 100 mg a intervalos de más de un día. | S3 · S6 solución | Ficha técnica de Alopurinol Cinfamed 100 mg (nº reg. 84085), revisión de enero de 2025, sección 4.2 | 30/10/2026 | | |
| RC-3.2-10 | Ibuprofeno: **contraindicado en la insuficiencia renal grave** (filtración glomerular inferior a 30 ml/min). | S1 · S3 · S6 | Ficha técnica de Ibuprofeno Cinfa 600 mg (nº reg. 70039), revisión de noviembre de 2024, sección 4.3 | 30/10/2026 | | |
| RC-3.2-11 | Criterios STOPP/START v3 citados: **A1** (fármaco sin indicación clínica) · **B21** (digoxina como primera opción a largo plazo para controlar la frecuencia en la FA) · **C10** (AINE con anticoagulante) · **D8** (benzodiacepinas durante 4 semanas o más, retirar de forma gradual) · **D10** (benzodiacepinas para el insomnio durante 2 semanas o más) · **E1** (digoxina de 125 µg/día o más con FG inferior a 30) · **E3** (inhibidores del factor Xa con FG inferior a 15) · **E4** (AINE con FG inferior a 50) · **E6** (metformina con FG inferior a 30) · **K1** (benzodiacepinas con caídas de repetición) · **K8** (antidepresivos con caídas de repetición) · **START F3** (IBP junto a un AINE). | S1 · S3 · S4 · S5 · S6 · test P3 | O'Mahony D, et al. Eur Geriatr Med 2023;14:625-32, apéndice 1 (CC BY 4.0) · PMID 37256475 | 30/10/2026 | | Conviene contrastar los códigos con la versión española (Delgado-Silveira et al., 2023; PMID 37738843), por si su numeración difiere. |
| RC-3.2-12 | STOPP/START v3 tiene **190 criterios: 133 STOPP y 57 START**. | S4 | O'Mahony 2023 (texto principal) · resumen de la versión española | 30/10/2026 | | |
| RC-3.2-13 | Beers 2023: **evitar** las benzodiacepinas (incluido el lorazepam) y los antidepresivos con fuerte actividad anticolinérgica (incluida la amitriptilina). Digoxina: evitar dosis de más de 0,125 mg/día. | S4 · S6 | 2023 AGS Beers Criteria Update Expert Panel. J Am Geriatr Soc 2023;71:2052-81 (PMC12478568) · PMID 37139824 | 30/10/2026 | | |
| RC-3.2-14 | Algoritmo de deprescripción de benzodiacepinas e hipnóticos: en mayores de 65 años se recomienda deprescribir sea cual sea el tiempo de uso. Reducir en torno a un 25 % cada dos semanas, con reducciones del 12,5 % al final; vigilar cada 1–2 semanas; medidas no farmacológicas. | S5 | deprescribing.org, BZRA Deprescribing Algorithm (2019), CC BY-NC-SA 4.0 | 30/10/2026 | | No se traduce (lo prohíbe su licencia): se resume con palabras propias. |
| RC-3.2-15 | Algoritmo de IBP: si no hay indicación que justifique mantenerlo, reducir la dosis o suspender y usar a demanda (recomendación fuerte); vigilar a las 4 y a las 12 semanas. | S5 · S6 solución | deprescribing.org, PPI Deprescribing Algorithm (2018) | 30/10/2026 | | |
| RC-3.2-16 | **Cockcroft-Gault:** (140 − edad) × peso ÷ (72 × creatinina en mg/dl), × 0,85 en mujeres. Conversión: µmol/l ÷ 88,4 = mg/dl. | S2 calculadora · ficha · test P4 | Cockcroft DW, Gault MH. Nephron 1976;16:31-41 · PMID 1244564 | 30/10/2026 | | |
| RC-3.2-17 | **CKD-EPI 2021 sin raza:** 142 × mín(Cr/κ; 1)^α × máx(Cr/κ; 1)^−1,200 × 0,9938^edad × 1,012 (mujer); κ = 0,7 (mujer) o 0,9 (hombre); α = −0,241 (mujer) o −0,302 (hombre). | S2 calculadora | Inker LA, et al. N Engl J Med 2021;385:1737-49 · PMID 34554658 | 30/10/2026 | | |
| RC-3.2-18 | Valores del caso: **Cockcroft-Gault 21,9 ml/min; CKD-EPI 28,4 ml/min/1,73 m²**. | S2 · S6 · test P4 | Calculado con las fórmulas anteriores (comprobado también con la calculadora del curso) | 30/10/2026 | | |
| RC-3.2-19 | Un FG de 15–29 ml/min/1,73 m² corresponde a la **ERC G4**. | S3 «Encuentra el error» | KDIGO 2024 CKD Guideline. Kidney Int 2024 · PMID 38490803 | 30/10/2026 | | |
| RC-3.2-20 | La ficha de metformina expresa los ajustes con la «TFG»; las de apixabán y enalapril, con el «aclaramiento de creatinina». | S2 | Fichas técnicas RC-3.2-01, 02 y 04 | 30/10/2026 | | |
| RC-3.2-21 | LESS-CHRON: criterios desarrollados en España para deprescribir en pacientes crónicos con multimorbilidad. | S4 · glosario | Rodríguez-Pérez A, et al. Geriatr Gerontol Int 2017 · PMID 28544188 | 30/10/2026 | | |
| RC-3.2-22 | Estructura de la ficha técnica: 4.2 posología, 4.3 contraindicaciones, 4.4 advertencias, 4.5 interacciones, 4.8 reacciones adversas, 10 fecha de revisión… | S1 infografía | Estructura observada en todas las fichas consultadas en CIMA | 30/10/2026 | | |
| RC-3.2-23 | Polifarmacia: la definición más usada es tomar 5 o más fármacos al día. | Glosario | Masnoon N, et al. What is polypharmacy? A systematic review of definitions. BMC Geriatr 2017 · PMID 29017448 | 30/10/2026 | | |
| RC-3.2-24 | La carga anticolinérgica se asocia en mayores a confusión, estreñimiento, retención urinaria y caídas. | S4 · glosario | STOPP/START v3 (secciones D14, K12 y M1) · Beers 2023 (tabla 7) | 30/10/2026 | | Afirmación general de farmacología; valora si quieres una referencia específica. |
| RC-3.2-25 | Solución del taller: «sin criterio START claro con los datos disponibles»; furosemida «sin criterio claro»; enalapril «revisar, no necesariamente cambiar». | S6 solución | Juicio clínico sobre el caso ficticio, apoyado en las fuentes anteriores | — | | **Revisión clínica imprescindible**: son valoraciones, no datos. |

## 1.5 · Cómo «piensa» un LLM

| ID | Afirmación | Dónde aparece | Fuente | Verificado (Claude) | Revisado por / fecha | Observaciones |
|---|---|---|---|---|---|---|
| RC-1.5-01 | En un estudio con ChatGPT-3.5, de 115 referencias médicas generadas, el **47 % eran inventadas, el 46 % existían pero tenían errores y solo el 7 % eran correctas**; el error más frecuente fue un PMID equivocado. | S4 · test P2 | Bhattacharyya M, et al. Cureus 2023;15:e39238 · PMID 37337480 | 30/10/2026 | | |
| RC-1.5-02 | Índice de Barthel: 10 actividades básicas de la vida diaria; puntuación de 0 a 100 en su versión más usada (también existe una de 0 a 20); publicado por **Mahoney y Barthel en 1965** en el Maryland State Medical Journal. | S4 «Detecta la confabulación» | Mahoney FI, Barthel DW. Md State Med J 1965;14:61-5 · PMID 14258950 | 30/10/2026 | | |
| RC-1.5-03 | El Barthel mide la dependencia en actividades básicas y **no** es una escala de fragilidad recomendada por la OMS. | S4 (error intencionado y su explicación) | Concepto: el Barthel valora las ABVD (Mahoney 1965); fragilidad y dependencia son constructos distintos | 30/10/2026 | | Confirma que la explicación te parece correcta. |
| RC-1.5-04 | El PMID 31234567 corresponde a un artículo de ingeniería (Sensors 2019, humedad en materiales granulares) y el PMID 35512345, a uno de radiobiología (Radiat Res 2022, p53). | S4 · test P2 | PubMed E-utilities, consultado el 30/10/2026 | 30/10/2026 | | Se usan como ejemplo de PMID «real pero de otro artículo». |
| RC-1.5-05 | Recomendaciones de cuidados en la simulación de la ventana de contexto: ofrecer agua con frecuencia (salvo restricción de líquidos), retirar alfombras y cables, luz nocturna, calzado cerrado y signos de alarma (confusión nueva, somnolencia, fiebre, caída, menor ingesta). | S3 «Ventana de contexto» | Texto ilustrativo de una simulación (no es contenido docente clínico) | — | | Revisa que sea razonable como ejemplo. |
| RC-1.5-06 | Analogía: la confabulación del LLM es como la del paciente con síndrome de Korsakoff. | S4 · glosario · test P3 | Analogía didáctica | — | | |

## Afirmaciones técnicas (no clínicas) con fuente

| ID | Afirmación | Fuente | Verificado (Claude) |
|---|---|---|---|
| RT-01 | El transformer se presentó en 2017. | Vaswani A, et al. arXiv:1706.03762 | 30/10/2026 |
| RT-02 | Ajuste con valoraciones humanas (RLHF) aplicado a asistentes (InstructGPT, 2022). | Ouyang L, et al. arXiv:2203.02155 | 30/10/2026 |
| RT-03 | Los asistentes entrenados con valoraciones humanas tienden a la complacencia. | Sharma M, et al. arXiv:2310.13548 | 30/10/2026 |
| RT-04 | El entrenamiento y las evaluaciones premian arriesgarse frente a reconocer la incertidumbre, lo que favorece la confabulación. | Kalai AT, et al. arXiv:2509.04664 (2025) | 30/10/2026 |
| RT-05 | Los modelos aprovechan peor la información situada en mitad de contextos largos. | Liu NF, et al. TACL 2024 (arXiv:2307.03172) | 30/10/2026 |
| RT-06 | La búsqueda con fuentes (RAG) se describió en 2020. | Lewis P, et al. arXiv:2005.11401 | 30/10/2026 |
| RT-07 | Modelos de razonamiento: existen desde 2024; DeepSeek-R1 se publicó en Nature en 2025. | DeepSeek-AI. Nature 2025 · PMID 40962978 | 30/10/2026 |
| RT-08 | A fecha de octubre de 2026, muchos modelos punteros tienen ventanas de un millón de tokens o más. | Google AI for Developers, «Long context», consultado el 30/10/2026 | 30/10/2026 |
| RT-09 | El tokenizador o200k_base (OpenAI) es el que usan modelos como GPT-4o (y también GPT-4.1, GPT-5 y la serie o). | README del paquete gpt-tokenizer 4.1.0 | 30/10/2026 |
| RT-10 | OpenEvidence bloquea el acceso desde la UE y el Reino Unido desde finales de abril de 2026. | Medscape (abril de 2026) y prensa sectorial | Parcial: falta el comunicado de la empresa |
