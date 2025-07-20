import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import placeCard1 from "../../assets/images/place-card-index/place-card-1.jpg";

const CardEdit = ({
  title = "Título del lugar",
  description = "Descripción breve del lugar.",
  city = "Ciudad no especificada",
  img = placeCard1,
  id,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    if (onEdit && id) {
      onEdit(id);
    }
  };

  const handleDelete = () => {
    if (onDelete && id) {
      if (window.confirm("¿Estás seguro de que quieres eliminar esta card?")) {
        onDelete(id);
      }
    }
  };

  return (
    <Card className="card-edit">
      <Card.Img
        variant="top"
        src={img || placeCard1}
        alt={title}
        className="card-edit-img"
      />
      <Card.Body className="card-edit-body">
        <Card.Title className="card-edit-title">{title}</Card.Title>
        <Card.Text className="card-edit-description">{description}</Card.Text>
        <Card.Text className="card-edit-city">
          <strong>Ciudad:</strong> {city}
        </Card.Text>
        
        {/* Botones de administración */}
        <div className="card-edit-actions">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={handleEdit}
            className="btn-edit"
          >
            ✏️ Editar
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={handleDelete}
            className="btn-delete"
          >
            🗑️ Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardEdit; 