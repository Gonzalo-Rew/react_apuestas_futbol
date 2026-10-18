import React, { Component } from "react";
import JugadoresService from "../services/JugadoresService";

export default class JugadoresTabla extends Component {
  service = new JugadoresService();

  state = {
    jugadores: [],
  };

  loadJugadores = async () => {
    const { nombre, idEquipo } = this.props;
    let jugadores = new Set();
    if (nombre) {
      const listaJugadores = await this.service.getJugadoresByNombre(nombre);
      listaJugadores.forEach((jugador) => jugadores.add(jugador));
    } else if (idEquipo) {
      const listaJugadores =
        await this.service.getJugadoresByIdEquipo(idEquipo);
      listaJugadores.forEach((jugador) => jugadores.add(jugador));
    }

    this.setState({ jugadores });
  };

  componentDidMount() {
    this.loadJugadores();
  }

  componentDidUpdate(prevProps) {
    if (this.props.nombre !== prevProps.nombre || this.props.idEquipo !== prevProps.idEquipo) {
      this.loadJugadores();
    }
  }

  render() {
    return (
      <div>
        <h1>Jugadores Component</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Posición</th>
              <th>Edad</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(this.state.jugadores).map((jugador, index) => (
              <tr key={index}>
                <td>
                  <img src={jugador.imagen} alt={jugador.nombre} />
                </td>
                <td>{jugador.nombre}</td>
                <td>{jugador.posicion}</td>
                <td>{jugador.edad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
