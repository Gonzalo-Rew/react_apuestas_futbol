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
      return <p>Cargando jugadores...</p>;
    } else {
      return (
        <>
          <NavLink
            to={`/home/${this.props.idEquipo}`}
            className="btn btn-secondary"
          >
            Volver
          </NavLink>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jugadores.map((jugador, index) => (
                <tr key={index}>
                  <td>{jugador.nombre}</td>
                  <td>
                    <img src={jugador.imagen} alt={jugador.nombre} />
                  </td>
                  <td>
                    <NavLink
                      to={`/home/${this.props.idEquipo}/jugadores/${jugador.idJugador}`}
                      className="btn btn-primary"
                    >
                      Ver detalles
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <NavLink
            to={`/home/${this.props.idEquipo}`}
            className="btn btn-secondary"
          >
            Volver
          </NavLink>
        </>
      );
    }
  }
}
