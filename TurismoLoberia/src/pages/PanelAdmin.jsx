import React, { useState } from "react";
import Create from "../components/layout/Create";
import Edit from "../components/layout/Edit";
import '../styles/panelAdmin.css';
import Searcher from "./Searcher";
import UserPanel from "../components/layout/UserPanel";

const PanelAdmin = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleEditCard = (cardId) => {
    setSelectedCardId(cardId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCardId(null);
  };

  return (
    <section className="panel-admin">
      <h2>Bienvenido al Panel de Administración</h2>
      
      {/* Buscador en modo admin */}
      <Searcher 
        isAdmin={true} 
        onEdit={handleEditCard}
      />
      
      {/* Formulario de creación */}
      <section className="add-card">
        <Create />
      </section>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Edit 
              cardId={selectedCardId} 
              onClose={handleCloseEditModal}
            />
          </div>
        </div>
      )}
      <UserPanel />
    </section>
  );
};

export default PanelAdmin;
