import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ArenasVerdes from '../pages/ArenasVerdes';
import { Contact } from '../pages/Contact';
import { Index } from '../pages/Index';
import Loberia from '../pages/Loberia';
import PartidoLoberia from '../pages/PartidoLoberia';
import { SanManuel } from '../pages/SanManuel';
import Searcher from '../pages/Searcher';
import { Suscribe } from '../pages/Subscribe';
import { Clima } from '../pages/Weather';
import Login from '../pages/Login';
import {Register} from '../pages/Register';
import Admin from '../pages/Admin';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/PartidoLoberia" element={<PartidoLoberia />} />
      <Route path="/Loberia" element={<Loberia />} />
      <Route path="/ArenasVerdes" element={<ArenasVerdes />} />
      <Route path="/SanManuel" element={<SanManuel />} />
      <Route path="/Clima" element={<Clima />} />
      <Route path="/Contacto" element={<Contact />} />
      <Route path="/Buscador" element={<Searcher />} />
      <Route path="/Suscribirse" element={<Suscribe />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Admin" element={<Admin />} />
    </Routes>
  )
}
