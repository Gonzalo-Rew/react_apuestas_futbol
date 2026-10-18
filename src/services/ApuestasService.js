import axios from "axios";
import Global from "../Global";

export default class ApuestasService {
  async getApuestas() {
    const url = Global.utlApiEjemplos + "api/Apuestas";
    return (await axios.get(url)).data;
  }

  async deleteApuesta(idApuesta) {
    const url = Global.utlApiEjemplos + "api/Apuestas/" + idApuesta;
    return (await axios.delete(url)).data;
  }

  async postApuesta(apuesta) {
    const url = Global.utlApiEjemplos + "api/Apuestas";
    return (await axios.post(url, apuesta)).data;
  }
}
