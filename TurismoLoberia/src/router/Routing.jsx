import React from "react";
import { Route, Routes } from "react-router-dom";
import ArenasVerdes from "../pages/ArenasVerdes";
import { Contact } from "../pages/Contact";
import { Index } from "../pages/Index";
import Loberia from "../pages/Loberia";
import PartidoLoberia from "../pages/PartidoLoberia";
import { SanManuel } from "../pages/SanManuel";
import Searcher from "../pages/Searcher";
import { Suscribe } from "../pages/Subscribe";
import { Clima } from "../pages/Weather";
import Admin from "../pages/Admin";
import { Register } from "../pages/Register";
import PanelAdmin from "../pages/PanelAdmin";
import UpdateUser from '../components/layout/panel-admin/UpdateAdmin';
import CreateAdmin from '../components/layout/panel-admin/CreateAdmin';
import ListAdmins from '../components/layout/panel-admin/ListAdmins';
import DeleteAdmin from '../components/layout/panel-admin/DeleteAdmin';


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
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Register" element={<Register />} />
      {/*Rutas panel Admin renderizadas en el mismo componente*/}
      <Route path="/PanelAdmin" element={<PanelAdmin />}>
        <Route path="modificar-datos" element={<UpdateUser />} />
        <Route path="crear-admin" element={<CreateAdmin />} />
        <Route path="listar-admins" element={<ListAdmins />} />
        <Route path="baja-admins" element={<DeleteAdmin />} />
      </Route>
    </Routes>
  );
};
