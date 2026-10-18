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
      return <p>Cargando detalles del jugador...</p>;
    } else if (this.state.jugador === null) {
      return <p>No se encontró el jugador.</p>;
    } else {
      return (
        <div>
          <div>
            <h1>{this.state.jugador.nombre}</h1>
            <img
              src={this.state.jugador.imagen}
              alt={this.state.jugador.nombre}
            ></img>
            <p>Posición: {this.state.jugador.posicion}</p>
            <p>Fecha Nacimiento: {this.state.jugador.fechaNacimiento}</p>
            <p>País: {this.state.jugador.pais}</p>
          </div>
          <div>
            <NavLink
              to={`/home/${this.props.idEquipo}/jugadores`}
              className="btn btn-secondary"
            >
              Jugadores
            </NavLink>
          </div>
        </div>
      );
    }
  }
}
