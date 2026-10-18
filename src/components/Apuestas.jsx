import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApuestasService from "../services/ApuestasService";

export default class Apuestas extends Component {
  service = new ApuestasService();

  state = {
    apuestas: [],
    isLoading: true,
  };

  loadApuestas = async () => {
    const apuestas = await this.service.getApuestas();
    this.setState({ apuestas, isLoading: false });
  };

  deleteApuesta = async (idApuesta) => {
    await this.service.deleteApuesta(idApuesta);
    this.loadApuestas();
  };

  componentDidMount() {
    this.loadApuestas();
  }

  render() {
    if (this.state.isLoading) {
      return <p>Cargando Apuestas...</p>;
    } else {
      return (
        <div>
          <h1>Apuestas</h1>
          <NavLink to="/apuestas/crear-apuesta" className="btn btn-primary">
            Realizar apuesta
          </NavLink>
          <h2>Local: FC Barcelona - Visitante: Real Madrid</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Resultado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.apuestas.map((apuesta, index) => (
                <tr key={index}>
                  <td>{apuesta.usuario}</td>
                  <td>{apuesta.resultado}</td>
                  <td>{apuesta.fecha}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => this.deleteApuesta(apuesta.idApuesta)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
