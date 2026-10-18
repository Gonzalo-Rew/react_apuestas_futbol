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
      return <p className="alert alert-info">Cargando Apuestas...</p>;
    } else {
      return (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
              <h1 className="h2 mb-0">Apuestas</h1>
              <NavLink to="/apuestas/crear-apuesta" className="btn btn-primary">
                Realizar apuesta
              </NavLink>
            </div>
            <div className="alert alert-info mb-4" role="status">
              <span className="fw-semibold">Partido:</span> Local: FC Barcelona - Visitante: Real Madrid
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-primary">
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
                      <td className="fw-semibold">{apuesta.resultado}</td>
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
          </div>
        </div>
      );
    }
  }
}
