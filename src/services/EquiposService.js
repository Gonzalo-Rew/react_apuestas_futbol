import axios from "axios";
import Global from "../Global";

export default class EquiposService {
  async getEquipos() {
    const url = Global.utlApiEjemplos + "api/Equipos";
    return (await axios.get(url)).data;
  }

  async getEquipoById(idEquipo) {
    const url = Global.utlApiEjemplos + "api/Equipos/" + idEquipo;
    return (await axios.get(url)).data;
  }
}
