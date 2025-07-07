import React from "react";
import eventoImg from "../assets/images/event-card-index/event-card-1.jpg";
import EventCard from "../components/cards/EventCard";
import PlaceCard from "../components/cards/PlaceCard";
import { ControlledCarousel } from "../components/layout/ControlledCarousel";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

import { FaInfo, FaPaintBrush } from "react-icons/fa";
import {
  MdHotel,
  MdMuseum,
  MdOutlineRestaurant,
  MdPlace,
} from "react-icons/md";
import ButtonSuccess from "../components/common/ButtonSuccess";

export const Index = () => {
  return (
    <div className="index">
      <Header />
      <ControlledCarousel />
      <section className="services">
        <h2>Guía de Servicios</h2>
        <div className="item-services-container">
          <div className="item-services">
            <MdHotel />
            <p>Alojamientos</p>
          </div>
          <div className="item-services">
            <MdOutlineRestaurant />
            <p>Gastronomía</p>
          </div>
          <div className="item-services">
            <MdPlace />
            <p>Lugares Interés</p>
          </div>
          <div className="item-services">
            <FaPaintBrush />
            <p>Artesanos</p>
          </div>
          <div className="item-services">
            <MdMuseum />
            <p>Servicios Públicos</p>
          </div>
          <div className="item-services">
            <FaInfo />
            <p>Info Útil</p>
          </div>
        </div>
      </section>
      <section className="places">
        <h2>Descubrí Lobería</h2>
        <p>Explorá la naturaleza, historia y cultura de Lobería, Arenas Verdes y San Manuel.</p>
        <div className="places-items">
        <PlaceCard className="place-card" />
        <PlaceCard className="place-card" />
        <PlaceCard className="place-card" />
        <PlaceCard className="place-card" />
        <PlaceCard className="place-card" />
        <PlaceCard className="place-card" />
        </div>
        <ButtonSuccess />
      </section>
      <section className="upcoming-events">
        <h2>Próximos Eventos</h2>
        <p>No te pierdas todos los eventos que tenemos para vos!!!</p>
        <EventCard />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
