import React, { Component } from "react";
import EquiposService from "../services/EquiposService";
import { NavLink } from "react-router-dom";

export default class Home extends Component {
  service = new EquiposService();

  state = {
    equipo: null,
  };

  loadEquipo = async () => {
    const equipo = await this.service.getEquipoById(this.props.idEquipo);
    this.setState({ equipo });
  };

  componentDidMount() {
    if (this.props.idEquipo) {
      this.loadEquipo();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.idEquipo && prevProps.idEquipo !== this.props.idEquipo) {
      this.loadEquipo();
    }
  }

  render() {
    if (this.state.equipo === null) {
      return (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center p-5">
            <h1 className="h2">Home</h1>
            <p className="lead text-body-secondary mb-0">No equipo seleccionado</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <img
                className="img-fluid rounded-circle border p-1"
                src={this.state.equipo.imagen}
                alt={this.state.equipo.nombre}
                width="100"
                height="100"
              />
              <div className="text-center text-md-start">
                <h1 className="display-6 fw-bold mb-2">{this.state.equipo.nombre}</h1>
                <p className="badge text-bg-primary fs-6 mb-0">
                  Champions: {this.state.equipo.champions}
                </p>
              </div>
            </div>
            <hr className="my-4" />
            <p className="lead">{this.state.equipo.descripcion}</p>
            <div className="d-flex flex-wrap gap-2 mt-4">
              <NavLink
                to={`/home/${this.props.idEquipo}/jugadores`}
                className="btn btn-primary"
              >
                Jugadores
              </NavLink>
              <NavLink to="/" className="btn btn-outline-secondary">
                Volver
              </NavLink>
            </div>
          </div>
        </div>
      );
    }
  }
}
