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
        <>
          <div>Home</div>
          <p>No equipo seleccionado</p>
        </>
      );
    } else {
      return (
        <>
          <h1>{this.state.equipo.nombre}</h1>
          <img
            style={{ width: "100px", height: "100px" }}
            src={this.state.equipo.imagen}
            alt={this.state.equipo.nombre}
          />
          <p>Champions: {this.state.equipo.champions}</p>
          <p>descripcion: {this.state.equipo.descripcion}</p>
          <NavLink
            to={`/home/${this.props.idEquipo}/jugadores`}
            className="btn btn-primary"
          >
            Jugadores
          </NavLink>
          <NavLink to="/" className="btn btn-secondary">
            Volver
          </NavLink>
        </>
      );
    }
  }
}
