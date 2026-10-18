import axios from "axios";
import Global from "../Global";

export default class JugadoresService {
  async getJugadoresByIdEquipo(idEquipo) {
    const url = Global.utlApiEjemplos + "api/Jugadores/JugadoresEquipos/" + idEquipo;
    return (await axios.get(url)).data;
  }

  async getJugadorById(idJugador) {
    const url = Global.utlApiEjemplos + "api/Jugadores/" + idJugador;
    return (await axios.get(url)).data;
  }

  async getJugadoresByNombre(nombre) {
    const url = Global.utlApiEjemplos + "api/Jugadores/FindJugadores/" + nombre;
    return (await axios.get(url)).data;
  }
}
