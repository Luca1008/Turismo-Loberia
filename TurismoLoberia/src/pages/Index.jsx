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
  const [iframeLoaded, setIframeLoaded] = useState(false);

  /*---Spinner facebook----*/
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

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
            {!iframeLoaded && (
              <div className="fb-logo-spinner-container">
                <div
                  className={`fb-logo-spinner ${
                    isVisible ? "visible" : "hidden"
                  }`}
                >
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34 18c0-8.837-7.163-16-16-16S2 9.163 2 18c0 7.99 5.847 14.604 13.5 15.804V23.5h-4V18h4v-3.5c0-4.142 3.358-7.5 7.5-7.5h3v5h-3c-1.381 0-2.5 1.119-2.5 2.5V18h4.5l-1 5.5H22v10.804C29.153 32.604 34 25.99 34 18z"
                      fill="#1877F2"
                    />
                    <path
                      d="M24.5 23.5L25.5 18H22v-3.5c0-1.381 1.119-2.5 2.5-2.5h3v-5h-3c-4.142 0-7.5 3.358-7.5 7.5V18h-4v5.5h4v10.804a16.096 16.096 0 005 0V23.5h3.5z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
                <p className="fb-loading-text">
                  <strong>Cargando contenido...</strong>
                </p>
              </div>
            )}
            {iframeLoaded ? null : <p style={{ color: "red" }}>No se cargó el iframe aún</p>}
            <iframe
              className="facebook-iframe"
              title="Plugin de página de Facebook de Turismo Lobería"
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
                display: iframeLoaded ? "block" : "none",
              }}
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
