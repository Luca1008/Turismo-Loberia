import React, { useEffect, useRef, useState } from "react";
import Create from "../components/layout/Create";
import Edit from "../components/layout/Edit";
import UserPanel from "../components/layout/UserPanel";
import "../styles/panelAdmin.css";
import Searcher from "./Searcher";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../hooks/useAuth.jsx";

const PanelAdmin = () => {
  const { auth } = useAuth();
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
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/home"></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
              <span className="container-names__name">{auth.name}</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2">Link</Nav.Link>
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
        <UserPanel />
      </section>
    </>
  );
};

export default PanelAdmin;
