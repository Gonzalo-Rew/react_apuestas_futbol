import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import EquiposService from "../services/EquiposService";
import ChampionsLogo from "../assets/ChampionsLogo.png";
export default class Menu extends Component {
  service = new EquiposService();

  state = {
    equipos: [],
  };

  loadEquipos = async () => {
    const equipos = await this.service.getEquipos();
    this.setState({ equipos });
  };

  componentDidMount() {
    this.loadEquipos();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center fw-semibold" to="/">
            <img
              src={ChampionsLogo}
              alt="Logo"
              width="80px"
              height="50px"
              className="d-inline-block align-top me-2"
            />
            Apuestas Fútbol
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/apuestas">
                Apuestas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/buscar-jugadores">
                Buscar Jugadores
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Equipos
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.state.equipos.map((equipo, index) => (
                  <NavLink
                    key={index}
                    className="dropdown-item"
                    to={`/home/${equipo.idEquipo}`}
                  >
                    {equipo.nombre}
                  </NavLink>
                ))}
              </div>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
