import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ArenasVerdes from '../pages/ArenasVerdes';
import { Ciudad } from '../pages/City';
import { Contact } from '../pages/Contact';
import { Partido } from '../pages/County';
import { Index } from '../pages/Index';
import Loberia from '../pages/Loberia';
import { SanManuel } from '../pages/SanManuel';
import { Buscador } from '../pages/Searcher';
import { Suscribe } from '../pages/Subscribe';
import { Clima } from '../pages/Weather';
import PartidoLoberia from '../pages/PartidoLoberia';


export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/Ciudad/:nombreCiudad" element={<Ciudad />} />
      <Route path="/PartidoLoberia" element={<PartidoLoberia />} />
      <Route path="/Loberia" element={<Loberia />} />
      <Route path="/ArenasVerdes" element={<ArenasVerdes />} />
      <Route path="/SanManuel" element={<SanManuel />} />
      <Route path="/Clima" element={<Clima />} />
      <Route path="/Contacto" element={<Contact />} />
      <Route path="/Buscador" element={<Buscador />} />
      <Route path="/Suscribirse" element={<Suscribe />} />
    </Routes>
  )
}
