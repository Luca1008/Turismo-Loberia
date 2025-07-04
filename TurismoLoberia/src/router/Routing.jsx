import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Index } from '../pages/Index';
import { Ciudad } from '../pages/Ciudad';
import { Clima } from '../pages/Clima';
import { Contacto } from '../pages/Contacto';
import { Partido } from '../pages/Partido';
import { Buscador } from '../pages/Buscador';
import { Suscribirse } from '../pages/Suscribirse';


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
