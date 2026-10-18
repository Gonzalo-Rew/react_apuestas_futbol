import React, { Component } from "react";
import ApuestasService from "../services/ApuestasService";
import { Navigate } from "react-router-dom";

export default class CrearApuesta extends Component {
  service = new ApuestasService();
  inputUsuario = React.createRef();
  inputResultado1 = React.createRef();
  inputResultado2 = React.createRef();
  inputFecha = React.createRef();

  state = {
    apuestaCreada: false,
  };

  crearApuesta = async (e) => {
    e.preventDefault();
    const apuesta = {
      idApuesta: 1,
      usuario: this.inputUsuario.current.value,
      resultado: `${this.inputResultado1.current.value} - ${this.inputResultado2.current.value}`,
      fecha: this.inputFecha.current.value,
    };
    await this.service.postApuesta(apuesta);
    this.setState({ apuestaCreada: true });
  };

  render() {
    if (this.state.apuestaCreada) {
      return <Navigate to="/apuestas" />;
    } else {
      return (
        <div>
          <h1>Crear Apuesta</h1>
          <form onSubmit={this.crearApuesta}>
            <div className="mb-3">
              <label
                htmlFor="usuario"
                ref={this.inputUsuario}
                className="form-label"
              >
                Usuario
              </label>
              <input
                type="text"
                ref={this.inputUsuario}
                className="form-control"
                id="usuario"
              />
              <label htmlFor="resultado" className="form-label">
                FC Barcelona
              </label>
              <input
                type="number"
                ref={this.inputResultado1}
                className="form-control"
                id="resultado1"
              />
              <label htmlFor="resultado" className="form-label">
                Real Madrid
              </label>
              <input
                type="number"
                ref={this.inputResultado2}
                className="form-control"
                id="resultado2"
              />
              <label htmlFor="fecha" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                ref={this.inputFecha}
                className="form-control"
                id="fecha"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear Apuesta
            </button>
          </form>
        </div>
      );
    }
  }
}
