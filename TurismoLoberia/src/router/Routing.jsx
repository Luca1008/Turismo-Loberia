import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Buscador } from '../pages/Searcher';
import { Ciudad } from '../pages/City';
import { Clima } from '../pages/Weather';
import { Contacto } from '../pages/Contact';
import { Index } from '../pages/Index';
import { Partido } from '../pages/County';
import { Suscribirse } from '../pages/Subscribe';


export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Ciudad/:nombreCiudad" element={<Ciudad />} />
        <Route path="/Clima" element={<Clima />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Partido" element={<Partido />} />
        <Route path="/Buscador" element={<Buscador />} />
        <Route path="/Suscribirse" element={<Suscribirse />} />
      </Routes>
    </BrowserRouter>
  )
}
