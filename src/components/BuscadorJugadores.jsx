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
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <h1 className="h2 mb-4">Buscador de Jugadores</h1>
            <div className="row g-3 align-items-end">
              <div className="col-lg-5">
                <label htmlFor="buscador-nombre" className="form-label">
                  Nombre de jugador
                </label>
                <input
                  type="text"
                  id="buscador-nombre"
                  ref={this.inputNombreRef}
                  className="form-control"
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="buscador-equipo" className="form-label">
                  Seleccione equipo
                </label>
                <select
                  id="buscador-equipo"
                  ref={this.inputEquipoRef}
                  className="form-select"
                >
                  {this.state.equipos.map((equipo, index) => (
                    <option key={index} value={equipo.idEquipo}>
                      {equipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-3 d-flex flex-wrap gap-2">
                <button onClick={this.cargarJugadores} className="btn btn-primary">
                  Buscar jugadores nombre
                </button>
                <button onClick={this.cargarJugadores} className="btn btn-outline-primary">
                  Buscar jugadores por equipo
                </button>
              </div>
            </div>
          </div>
        </div>
        <JugadoresTabla
          nombre={this.state.nombreJugador}
          idEquipo={this.state.equipoSeleccionado}
        />
      </div>
    );
  }
}
