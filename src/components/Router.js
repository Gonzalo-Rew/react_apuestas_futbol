import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import Jugadores from "./Jugadores";
import DetallesJugador from "./DetallesJugador";
import Apuestas from "./Apuestas";
import CrearApuesta from "./CrearApuesta";
import BuscadorJugadores from "./BuscadorJugadores";

export default class Router extends Component {
  render() {
    function HomeElement() {
      const { idEquipo } = useParams();
      return <Home idEquipo={idEquipo} />;
    }

    function JugadoresElement() {
      const { idEquipo } = useParams();
      return <Jugadores idEquipo={idEquipo} />;
    }

    function DetallesJugadorElement() {
      const { idEquipo, idJugador } = useParams();
      return <DetallesJugador idEquipo={idEquipo} idJugador={idJugador} />;
    }

    return (
      <BrowserRouter>
        <Menu />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/:idEquipo" element={<HomeElement />} />
            <Route
              path="/home/:idEquipo/jugadores"
              element={<JugadoresElement />}
            />
            <Route
              path="/home/:idEquipo/jugadores/:idJugador"
              element={<DetallesJugadorElement />}
            />
            <Route path="/apuestas" element={<Apuestas />} />
            <Route path="/apuestas/crear-apuesta" element={<CrearApuesta />} />
            <Route path="/buscar-jugadores" element={<BuscadorJugadores />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
