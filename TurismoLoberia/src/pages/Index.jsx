import React from "react";
import EventCard from "../components/cards/EventCard";
import PlaceCard from "../components/cards/PlaceCard";
import { ControlledCarousel } from "../components/layout/ControlledCarousel";

import { FaInfo, FaPaintBrush } from "react-icons/fa";
import {
  MdHotel,
  MdMuseum,
  MdOutlineRestaurant,
  MdPlace,
} from "react-icons/md";
import ButtonSuccess from "../components/common/ButtonSuccess";
import WeatherCarousel from "../components/layout/WeatherCarousel";
import "../styles/button.css";

export const Index = () => {
  return (
    <div className="index">
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
        <p>
          Explorá la naturaleza, historia y cultura de Lobería, Arenas Verdes y
          San Manuel.
        </p>
        <div className="places-items">
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
        <div className="events">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
        <ButtonSuccess />
      </section>
      <section className="more-info">
        <h2>Actualidad</h2>
        <div className="container-info">
          <WeatherCarousel />
          <div className="facebook-container">
            <iframe
              className="facebook-iframe"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Floberiaturismo&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="500"
              height="600"
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              style={{
                border: "none",
                overflow: "hidden",
                width: "100%",
                height: "600px",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
