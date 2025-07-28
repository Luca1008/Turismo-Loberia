import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Create from "../components/layout/Create";
import Edit from "../components/layout/Edit";
import "../styles/panelAdmin.css";
import Searcher from "./Searcher";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../hooks/useAuth.jsx";
import { MdLogout, MdOutlineSettings } from "react-icons/md";
import { FaPencilAlt, FaUserCheck, FaUsersCog} from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";


const PanelAdmin = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();            // Limpia estado y localStorage
    navigate("/Admin");  // Redirige a /Admin
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const editModalRef = useRef(null);
  const searcherRef = useRef(null);

  const handleEditCard = (cardId) => {
    setSelectedCardId(cardId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCardId(null);
  };

  // Nueva función para refrescar la lista tras editar
  const handleUpdateCard = () => {
    setShowEditModal(false);
    setSelectedCardId(null);
    if (searcherRef.current) {
      searcherRef.current.fetchCards();
    }
  };

  useEffect(() => {
    if (showEditModal && editModalRef.current) {
      editModalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showEditModal]);

  return (
    <>
      <Nav defaultActiveKey="/Admin" as="ul" className="nav-user">
        <Nav.Item as="li">
          <span>Bienvenido {auth.name}</span>
        </Nav.Item>
        <Nav.Item as="li">
          <button className="btn-admin" onClick={handleShow}>
            <MdOutlineSettings /> Ajustes
          </button>
        </Nav.Item>
        <Nav.Item as="li">
          <span>
          <button className="btn-admin" onClick={handleLogout}>
            <MdLogout /> Cerrar sesión
            </button>
          </span>
        </Nav.Item>
      </Nav>
      <section className="panel-admin">
        <h2>Bienvenido al Panel de Administración</h2>

        {/* Buscador en modo admin */}
        <Searcher ref={searcherRef} isAdmin={true} onEdit={handleEditCard} />

        {/* Formulario de creación */}
        <section className="add-card">
          <Create />
        </section>

        {/* Modal de edición */}
        {showEditModal && (
          <div className="modal-overlay" ref={editModalRef}>
            <div className="modal-content">
              <Edit
                cardId={selectedCardId}
                onClose={handleCloseEditModal}
                onUpdate={handleUpdateCard}
              />
            </div>
          </div>
        )}
      </section>

      {/*----------------------Ajustes-----------------*/}
      <section className="user-panel">
  <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Panel de ajustes de:  {auth.name}</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <div className="user-panel-content">
        <div className="user-info">
          <p><strong>Email:</strong> {auth.email}</p>
          <p><strong>Rol:</strong> {auth.role}</p>
        </div>

        <div className="panel-admin">
      <aside className="sidebar-admin">
        <ul>
          {auth.role === "superadmin" && (
            <>
          <li><Link to="modificar-datos"><FaPencilAlt />Modificar mis datos</Link></li>
          <li><Link to="crear-admin"><FaUserCheck />Crear nuevo admin</Link></li>
          <li><Link to="listar-admins"><FaUsersCog />Gestionar administradores</Link></li>
          </>
          )}
        </ul>
      </aside>
      <main className="panel-content">
        <Outlet /> {/* Aquí se renderiza la subvista */}
      </main>
      </div>
      </div>
    </Offcanvas.Body>
  </Offcanvas>
</section>
    </>
  );
};

export default PanelAdmin;
