import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Ciudad } from '../pages/City';
import { Contact } from '../pages/Contact';
import { Partido } from '../pages/County';
import { Index } from '../pages/Index';
import { Buscador } from '../pages/Searcher';
import { Suscribe } from '../pages/Subscribe';
import { Clima } from '../pages/Weather';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/Ciudad/:nombreCiudad" element={<Ciudad />} />
      <Route path="/Clima" element={<Clima />} />
      <Route path="/Contacto" element={<Contact />} />
      <Route path="/Partido" element={<Partido />} />
      <Route path="/Buscador" element={<Buscador />} />
      <Route path="/Suscribirse" element={<Suscribe />} />
    </Routes>
  )
}
