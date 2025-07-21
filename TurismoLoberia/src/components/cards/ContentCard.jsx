import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/images/default-photo.jpg";
import "../../styles/card.css";

const ContentCard = ({
  title = "Título del lugar",
  description = "Descripción breve del lugar.",
  city = "Ciudad no especificada",
  img,
  id = null,
  category = "",
  card_date = "",
  onEdit,
  onDelete,
}) => {
  const imageSrc = img || defaultImg;
  const isEvent = category === "Evento";
  let dateMonth = "";
  let dateDay = "";
  if (isEvent && card_date) {
    // card_date puede venir como YYYY-MM-DD o ISO
    const dateObj = new Date(card_date);
    dateMonth = dateObj.toLocaleString('es-ES', { month: 'short' });
    dateDay = dateObj.getDate();
  }
  return (
    <Card className="card">
      <Card.Img className="card-img" src={imageSrc} variant="top" alt={title} />
      <Card.Body className="card-body">
        <div className="content-card">
          <Card.Title className="card-title-ellipsis">{title}</Card.Title>
          <Card.Text className="card-description">{description}</Card.Text>
          <Card.Text className="card-city-ellipsis">
            <strong>
              <FaLocationDot />
            </strong>{" "}
            {city}
          </Card.Text>
        </div>
        <Button
          variant="link"
          className="btn-link"
          as={Link}
          to={`/card/${id}`}
        >
          Ver más
        </Button>
        {(onEdit || onDelete) && (
          <div className="card-buttons-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
            <div className="card-buttons" style={{ background: '#f6f8fa', borderRadius: '10px', padding: '0.5rem 0.75rem', display: 'flex', gap: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              {onEdit && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="btn-edit"
                  onClick={() => onEdit(id)}
                >
                  <MdModeEdit style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Editar
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="btn-delete"
                  onClick={() => onDelete(id)}
                >
                  <MdDeleteForever style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        )}
        {isEvent && (
          <div className="event-card__date">
            <p className="event-card__month">{dateMonth}</p>
            <p className="event-card__day">{dateDay}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContentCard; 