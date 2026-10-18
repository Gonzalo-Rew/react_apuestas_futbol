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
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h2 className="h4 mb-4">Jugadores encontrados</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-primary">
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
                      <img
                        className="rounded-circle object-fit-cover"
                        width="56"
                        height="56"
                        src={jugador.imagen}
                        alt={jugador.nombre}
                      />
                    </td>
                    <td className="fw-semibold">{jugador.nombre}</td>
                    <td>{jugador.posicion}</td>
                    <td>{jugador.edad}</td>
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
