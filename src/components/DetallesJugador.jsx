import React, { Component } from "react";
import JugadoresService from "../services/JugadoresService";
import { NavLink } from "react-router-dom";

export default class DetallesJugador extends Component {
  service = new JugadoresService();

  state = {
    jugador: null,
    isLoading: true,
  };

  loadJugador = async () => {
    const jugador = await this.service.getJugadorById(this.props.idJugador);
    this.setState({ jugador, isLoading: false });
  };

  componentDidMount() {
    this.loadJugador();
  }

  render() {
    if (this.state.isLoading) {
      return <p className="alert alert-info">Cargando detalles del jugador...</p>;
    } else if (this.state.jugador === null) {
      return <p className="alert alert-warning">No se encontró el jugador.</p>;
    } else {
      return (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
              <img
                className="img-fluid rounded shadow-sm"
                width="220"
                src={this.state.jugador.imagen}
                alt={this.state.jugador.nombre}
              />
              <div>
                <h1 className="display-6 fw-bold">{this.state.jugador.nombre}</h1>
                <dl className="row mb-0">
                  <dt className="col-sm-5">Posición</dt>
                  <dd className="col-sm-7">{this.state.jugador.posicion}</dd>
                  <dt className="col-sm-5">Fecha Nacimiento</dt>
                  <dd className="col-sm-7">{this.state.jugador.fechaNacimiento}</dd>
                  <dt className="col-sm-5">País</dt>
                  <dd className="col-sm-7">{this.state.jugador.pais}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="card-footer bg-transparent border-0 px-4 pb-4">
            <NavLink
              to={`/home/${this.props.idEquipo}/jugadores`}
              className="btn btn-outline-secondary"
            >
              Jugadores
            </NavLink>
          </div>
        </div>
      );
    }
  }
}
