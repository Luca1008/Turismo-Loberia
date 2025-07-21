import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaLocationDot } from "react-icons/fa6";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import placeCard1 from "../../assets/images/default-photo.jpg";
import '../../styles/card.css';

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
      <Card.Img className="card-img"
        variant="top"
        src={img || placeCard1}
        alt={title}
      />
      <Card.Body className="card-edit-body">
        <div className="content-card">
        <Card.Title className="card-title-ellipsis">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Card.Text className="card-city-ellipsis">
          <strong><FaLocationDot /></strong> {city}
        </Card.Text>
        </div>
        <div className="card-buttons">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={handleEdit}
            className="btn-edit"
          >
           <strong><MdModeEdit /> Editar</strong>
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={handleDelete}
            className="btn-delete"
          >
            <strong><MdDeleteForever /> Eliminar</strong> 
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardEdit; 