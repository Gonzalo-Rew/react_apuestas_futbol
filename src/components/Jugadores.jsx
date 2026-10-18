import React, { Component } from "react";
import JugadoresService from "../services/JugadoresService";
import { NavLink } from "react-router-dom";

export default class Jugadores extends Component {
  service = new JugadoresService();

  state = {
    jugadores: [],
    isLoading: true,
  };

  loadJugadores = async () => {
    const jugadores = await this.service.getJugadoresByIdEquipo(
      this.props.idEquipo,
    );
    this.setState({ jugadores, isLoading: false });
  };

  componentDidMount() {
    this.loadJugadores();
  }

  render() {
    if (this.state.isLoading) {
      return <p className="alert alert-info">Cargando jugadores...</p>;
    } else {
      return (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
              <h1 className="h2 mb-0">Jugadores</h1>
              <NavLink
                to={`/home/${this.props.idEquipo}`}
                className="btn btn-outline-secondary"
              >
                Volver
              </NavLink>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.jugadores.map((jugador, index) => (
                    <tr key={index}>
                      <td className="fw-semibold">{jugador.nombre}</td>
                      <td>
                        <img
                          className="rounded-circle object-fit-cover"
                          width="56"
                          height="56"
                          src={jugador.imagen}
                          alt={jugador.nombre}
                        />
                      </td>
                      <td>
                        <NavLink
                          to={`/home/${this.props.idEquipo}/jugadores/${jugador.idJugador}`}
                          className="btn btn-sm btn-primary"
                        >
                          Ver detalles
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}
