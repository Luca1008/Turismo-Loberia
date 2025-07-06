import React from "react";
import { Button, Card } from "react-bootstrap";
import { MdPlace } from "react-icons/md";
import eventoImg from "../../assets/images/event-card-index/event-card-1.jpg";

const EventCard = () => {
  return (
    <Card className="event-card">
      <img src={eventoImg} alt="Música en la Playa" className="event-card__img" />
      <div className="event-card__bottom-overlay">
        <Card.Title className="event-card__title">Música en la Playa</Card.Title>
        <div className="event-card__location">
          <MdPlace className="event-card__icon" /> <h3>Arenas Verdes</h3>
        </div>
        <Button variant="link" className="event-card__btn">Ver más</Button>
      </div>
      <div className="event-card__date">
        <p className="event-card__month">Enero</p>
        <p className="event-card__day">15</p>
      </div>
    </Card>
  );
};

export default EventCard;
