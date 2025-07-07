import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "../pages/Index";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const Buscador = () => {
  return (
    <div className="index">
      <Header />
      <div className="buscador">
        <h1>Buscador</h1>
        <p>Esta página está en construcción.</p>
        <p>Pronto podrás buscar información sobre el Partido de Lobería.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Buscador;
