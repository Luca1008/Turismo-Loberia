import React, { useEffect, useRef, useState } from "react";
import Create from "../components/layout/Create";
import Edit from "../components/layout/Edit";
import UserPanel from "../components/layout/UserPanel";
import '../styles/panelAdmin.css';
import Searcher from "./Searcher";

const PanelAdmin = () => {
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
      editModalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showEditModal]);

  return (
    <section className="panel-admin">
      <h2>Bienvenido al Panel de Administración</h2>
      
      {/* Buscador en modo admin */}
      <Searcher 
        ref={searcherRef}
        isAdmin={true} 
        onEdit={handleEditCard}
      />
      
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
  );
};

export default PanelAdmin;
