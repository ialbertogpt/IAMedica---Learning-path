// Componentes disponibles dentro de los .mdx (se pasan a <Content components={…} />).
// Para añadir uno nuevo: impórtalo aquí y añádelo también a COMPONENTES en scripts/validar-contenido.mjs.
import Sesion from './Sesion.astro';
import T from './T.astro';
import OjoCon from './OjoCon.astro';
import Analogia from './Analogia.astro';
import PruebaloTu from './PruebaloTu.astro';
import AvisoClinico from './AvisoClinico.astro';
import Caso from './Caso.astro';
import Desplegable from './Desplegable.astro';
import Plantilla from './Plantilla.astro';
import Video from './Video.astro';
import Recurso from './Recurso.astro';
import Resumen from './Resumen.astro';
import Ficha from './Ficha.astro';
import PasoTaller from './PasoTaller.astro';
import TestFinal from './TestFinal.astro';
import Clasificador from '../interactivos/Clasificador.astro';
import EncuentraError from '../interactivos/EncuentraError.astro';
import Tokenizador from '../interactivos/Tokenizador.astro';
import Minimodelo from '../interactivos/Minimodelo.astro';
import VentanaContexto from '../interactivos/VentanaContexto.astro';
import CalculadoraRenal from '../interactivos/CalculadoraRenal.astro';
import TresAyudas from '../interactivos/TresAyudas.astro';
import AnatomiaFicha from '../interactivos/AnatomiaFicha.astro';
import Explorador from '../interactivos/Explorador.astro';
import Comparador from '../interactivos/Comparador.astro';
import Arbol from '../interactivos/Arbol.astro';
import Autoevaluacion from '../interactivos/Autoevaluacion.astro';
import ModeloSintetico from '../interactivos/ModeloSintetico.astro';
import Neurona from '../interactivos/Neurona.astro';
import ConstructorPrompt from '../interactivos/ConstructorPrompt.astro';
import ConstructorBusqueda from '../interactivos/ConstructorBusqueda.astro';
import SimuladorIC from '../interactivos/SimuladorIC.astro';
import Diapositivas from '../interactivos/Diapositivas.astro';
import Planificador from '../interactivos/Planificador.astro';
import Munecas from '../interactivos/Munecas.astro';
import CapasRed from '../interactivos/CapasRed.astro';

export const componentesMDX = {
  Sesion, T, OjoCon, Analogia, PruebaloTu, AvisoClinico, Caso, Desplegable, Plantilla, Video, Recurso, Resumen, Ficha, PasoTaller, TestFinal,
  Clasificador, EncuentraError, Tokenizador, Minimodelo, VentanaContexto, CalculadoraRenal, TresAyudas, AnatomiaFicha,
  Explorador, Comparador, Arbol, Autoevaluacion, ModeloSintetico, Neurona, ConstructorPrompt, Planificador, Munecas, CapasRed, ConstructorBusqueda, SimuladorIC, Diapositivas,
};
