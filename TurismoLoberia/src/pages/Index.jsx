import React, { useEffect, useState } from "react";
import ContentCard from "../components/cards/ContentCard";
import { ControlledCarousel } from "../components/layout/ControlledCarousel";
import { Global } from "../helpers/Global";

import { FaInfo, FaPaintBrush } from "react-icons/fa";
import {
  MdHotel,
  MdMuseum,
  MdOutlineRestaurant,
  MdPlace,
} from "react-icons/md";
import ButtonSuccess from "../components/common/ButtonSuccess";
import WeatherCarousel from "../components/layout/WeatherCarousel";
import { useTranslation } from "react-i18next";
import "../styles/button.css";

export const Index = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Traer solo los tres primeros alojamientos
    fetch(`${Global.url}cards?category=Alojamiento&limit=3&page=1`)
      .then((res) => res.json())
      .then((data) => {
        // Si la respuesta es { cards: [...] }
        const cards = data.cards || data;
        setAlojamientos(cards.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error al cargar alojamientos:", err);
        setAlojamientos([]);
      });
    // Traer solo los tres primeros eventos
    fetch(`${Global.url}cards?category=Evento&limit=3&page=1`)
      .then((res) => res.json())
      .then((data) => {
        const cards = data.cards || data;
        setEventos(cards.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error al cargar eventos:", err);
        setEventos([]);
      });
  }, []);

  return (
    <div className="index" key={i18n.language}>
      <ControlledCarousel />
      <section className="services">
        <h2>{t("guia_servicios")}</h2>
        <div className="item-services-container">
          <div className="item-services">
            <MdHotel />
            <p>{t("alojamientos")}</p>
          </div>
          <div className="item-services">
            <MdOutlineRestaurant />
            <p>{t("gastronomia")}</p>
          </div>
          <div className="item-services">
            <MdPlace />
            <p>{t("lugares_interes")}</p>
          </div>
          <div className="item-services">
            <FaPaintBrush />
            <p>{t("artesanos")}</p>
          </div>
          <div className="item-services">
            <MdMuseum />
            <p>{t("servicios_publicos")}</p>
          </div>
          <div className="item-services">
            <FaInfo />
            <p>{t("info_util")}</p>
          </div>
        </div>
      </section>
      <section className="places">
        <h2>{t("descubri_loberia")}</h2>
        <p>{t("explora_loberia")}</p>
        <div className="places-items">
          {alojamientos.map((card) => (
            <ContentCard
              key={card.id}
              id={card.id}
              title={card.card_title}
              description={card.card_description}
              city={card.card_city}
              img={card.card_img_portada}
              category={card.card_category}
            />
          ))}
        </div>
        <ButtonSuccess />
      </section>
      <section className="upcoming-events">
        <h2>{t("proximos_eventos")}</h2>
        <p>{t("eventos_intro")}</p>
        <div className="events">
          {eventos.map((card) => (
            <ContentCard
              key={card.id}
              id={card.id}
              title={card.card_title}
              description={card.card_description}
              city={card.card_city}
              img={card.card_img_portada}
              category={card.card_category}
              card_date={card.card_date}
            />
          ))}
        </div>
        <ButtonSuccess />
      </section>
      <section className="more-info">
        <h2>{t("actualidad")}</h2>
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
