import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { trackEvent } from "../analytics";
import { Global } from "../helpers/Global";
import "../styles/cardPage.css";

/**
 * Componente `CardPage`
 *
 * Este componente muestra el detalle de una "card" (contenido turístico o evento)
 * según el ID pasado por la URL. Incluye:
 * - Título, imagen de portada y descripción
 * - Información de ubicación con mapa OpenStreetMap
 * - Horarios, contactos y detalles adicionales
 * - Fecha del evento (si aplica)
 *
 * Hooks usados:
 * - `useParams` para obtener el ID de la card desde la URL
 * - `useState` para almacenar los datos de la card
 * - `useEffect` para hacer la petición a la API y trackear eventos
 * - `useTranslation` para traducción de textos
 *
 * Funcionalidades:
 * - Fetch de la card desde la API (`axios.get`)
 * - Trackeo de eventos de analítica para vistas de página, secciones y mapa
 * - Renderizado condicional según categoría de card (Evento o general)
 *
 * @component
 * @returns {JSX.Element} Página de detalle de una card
 */
const CardPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const { t, i18n } = useTranslation();

  /**
   * Efecto para cargar la card desde la API y trackear eventos
   */
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await axios.get(`${Global.url}cards/${id}`);
        setCard(res.data);

        trackEvent({
          category: "Contenido",
          action: "Vista Card",
          label: res.data.card_title || `ID: ${id}`,
        });

        if (res.data.card_category === "Evento" && res.data.card_date) {
          trackEvent({
            category: "Evento",
            action: "Vista evento con fecha",
            label: res.data.card_title || `ID: ${id}`,
          });
        }

        // Trackeo de secciones
        ["Ubicación", "Horarios", "Contactos", "Información"].forEach((section) => {
          trackEvent({ category: "Sección", action: "Vista", label: section });
        });

        // Trackeo de mapa
        if (res.data.card_lat && res.data.card_lon) {
          trackEvent({
            category: "Mapa",
            action: "Renderizado",
            label: res.data.card_title || `ID: ${id}`,
          });
        }
      } catch (err) {
        console.error("Error al cargar la card", err);
      }
    };

    fetchCard();
  }, [id]);

  if (!card) return <p>{t("cargando")}</p>;

  return (
    <section className="card-detail" key={i18n.language}>
      <h1>{card.card_title}</h1>
      {card.card_img_portada && (
        <img
          src={card.card_img_portada}
          alt={card.card_title}
          className="card-img-portada"
        />
      )}

      {card.card_category === "Evento" && card.card_date && (
        <div className="event-date-detail" style={{ marginBottom: "1rem", fontWeight: "bold", fontSize: "1.2rem" }}>
          {t("fecha_evento")}:{" "}
          {new Date(card.card_date).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}

      <p>{card.card_description || "Sin información"}</p>

      {/* Sección Ubicación */}
      <section className="card-section">
        <h2>{t("ubicacion")}</h2>
        <p>{card.card_ubicacion || "Sin información"}</p>

        {card.card_lat && card.card_lon && (
          <div className="map-container">
            <iframe
              title="Mapa OpenStreetMap"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                card.card_lon - 0.01
              }%2C${card.card_lat - 0.01}%2C${card.card_lon + 0.01}%2C${
                card.card_lat + 0.01
              }&layer=mapnik&marker=${card.card_lat}%2C${card.card_lon}`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
            <br />
            <a
              href={`https://www.openstreetmap.org/?mlat=${card.card_lat}&mlon=${card.card_lon}#map=18/${card.card_lat}/${card.card_lon}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  category: "Mapa",
                  action: "Click ver en OpenStreetMap",
                  label: card.card_title || `ID: ${id}`,
                })
              }
            >
              {t("ver_en_openstreetmap")}
            </a>
          </div>
        )}
      </section>

      {/* Sección Horarios */}
      <section className="card-section">
        <h2>{t("horarios")}</h2>
        <p>{card.card_horario || "Sin información"}</p>
      </section>

      {/* Sección Contactos */}
      <section className="card-section">
        <h2>{t("contactos")}</h2>
        <p>{card.card_contacto || "Sin información"}</p>
      </section>

      {/* Sección Información */}
      <section className="card-section">
        <h2>{t("informacion")}</h2>
        <p>{card.card_info || "Sin información"}</p>
      </section>
    </section>
  );
};

export default CardPage;
