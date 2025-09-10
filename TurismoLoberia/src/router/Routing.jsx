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
import PanelAdmin from "../pages/PanelAdmin";
import UpdateUser from "../components/layout/panel-admin/UpdateAdmin";
import CreateAdmin from "../components/layout/panel-admin/CreateAdmin";
import ListAdmins from "../components/layout/panel-admin/ListAdmins";
import CardPage from "../pages/CardPage";
import { Register } from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Unsubscribe from "../pages/Unsubscribe";

/**
 * Componente `Routing`
 *
 * Define todas las rutas de la aplicación usando React Router v6.
 * Incluye rutas públicas, rutas para páginas de administración y rutas con parámetros dinámicos.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa las rutas de la aplicación.
 *
 * @example
 * // Uso básico en App.js
 * import { Routing } from './routes/Routing';
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <Routing />
 *     </BrowserRouter>
 *   );
 * }
 */
export const Routing = () => {  
  return (
    <Routes>
      {/* Rutas públicas */}
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
      <Route path="/recuperar-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/cards/:id" element={<CardPage />} />
      <Route path="/unsubscribe/:token" element={<Unsubscribe />} />

      {/* Rutas del panel de administración */}
      <Route path="/PanelAdmin" element={<PanelAdmin />}>
        <Route path="modificar-datos" element={<UpdateUser />} />
        <Route path="crear-admin" element={<CreateAdmin />} />
        <Route path="listar-admins" element={<ListAdmins />} />
      </Route>
    </Routes>
  );
};
