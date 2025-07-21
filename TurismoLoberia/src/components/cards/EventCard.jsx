import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import eventoImg from "../../assets/images/default-photo.jpg";
import "../../styles/card.css";

const EventCard = ({
  title = "Título del lugar",
  description = "Descripción breve del lugar.",
  city = "Ciudad no especificada",
  img,
  id = null,
}) => {
  const imageSrc = img || eventoImg;
  return (
    <Card className="card">
      <Card.Img  className="card-img" src={imageSrc} variant="top" alt={title} />
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
        <div className="event-card__date">
          <p className="event-card__month">Mes</p>
          <p className="event-card__day">Dia</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
