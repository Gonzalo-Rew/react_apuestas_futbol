import React, { Component } from "react";
import EquiposService from "../services/EquiposService";
import JugadoresTabla from "./JugadoresTabla";

export default class BuscadorJugadores extends Component {
  service = new EquiposService();
  inputNombreRef = React.createRef();
  inputEquipoRef = React.createRef();

  state = {
    equipos: [],
    nombreJugador: "",
    equipoSeleccionado: null,
  };

  loadEquipos = async () => {
    const equipos = await this.service.getEquipos();
    this.setState({ equipos });
  };

  componentDidMount() {
    this.loadEquipos();
  }

  cargarJugadores = () => {
    const nombreJugador = this.inputNombreRef.current?.value || "";
    const equipoSeleccionado = this.inputEquipoRef.current?.value || null;
    this.setState({ nombreJugador, equipoSeleccionado });
  };

  render() {
    return (
      <div>
        <h1>Buscador de Jugadores</h1>
        <label htmlFor="buscador">Nombre de jugador:</label>
        <input type="text" id="buscador" ref={this.inputNombreRef} />
        <button onClick={this.cargarJugadores}>Buscar jugadores nombre</button>
        <label htmlFor="buscador">Seleccione equipo:</label>
        <select id="buscador" ref={this.inputEquipoRef}>
          {this.state.equipos.map((equipo, index) => (
            <option key={index} value={equipo.idEquipo}>
              {equipo.nombre}
            </option>
          ))}
        </select>
        <button onClick={this.cargarJugadores}>
          Buscar jugadores por equipo
        </button>
        <JugadoresTabla
          nombre={this.state.nombreJugador}
          idEquipo={this.state.equipoSeleccionado}
        />
      </div>
    );
  }
}
