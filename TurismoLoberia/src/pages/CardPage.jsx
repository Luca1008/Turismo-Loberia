import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/cardPage.css";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../analytics"; // 👈 GA4

const CardPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cards/${id}`);
        setCard(res.data);

        // ✅ Evento: Card vista
        trackEvent({
          category: "Contenido",
          action: "Vista Card",
          label: res.data.card_title || `ID: ${id}`,
        });

        // ✅ Evento: Si es evento con fecha
        if (res.data.card_category === "Evento" && res.data.card_date) {
          trackEvent({
            category: "Evento",
            action: "Vista evento con fecha",
            label: res.data.card_title || `ID: ${id}`,
          });
        }

        // ✅ Eventos por secciones
        trackEvent({ category: "Sección", action: "Vista", label: "Ubicación" });
        trackEvent({ category: "Sección", action: "Vista", label: "Horarios" });
        trackEvent({ category: "Sección", action: "Vista", label: "Contactos" });
        trackEvent({ category: "Sección", action: "Vista", label: "Información" });

        // ✅ Si tiene mapa
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
    <div className="card-detail" key={i18n.language}>
      {card.card_img_portada && (
        <img
          src={card.card_img_portada}
          alt={card.card_title}
          className="card-img-portada"
        />
      )}

      <h1>{card.card_title}</h1>

      {card.card_category === "Evento" && card.card_date && (
        <div
          className="event-date-detail"
          style={{ marginBottom: "1rem", fontWeight: "bold", fontSize: "1.2rem" }}
        >
          {t("fecha_evento")}:{" "}
          {new Date(card.card_date).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}

      <p>{card.card_description}</p>

      {/* Ubicación */}
      <section className="card-section">
        <h2>{t("ubicacion")}</h2>
        <p>{card.card_ubicacion}</p>

        {card.card_lat && card.card_lon && (
          <>
            <iframe
              title="Mapa OpenStreetMap"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${card.card_lon - 0.01}%2C${card.card_lat - 0.01}%2C${card.card_lon + 0.01}%2C${card.card_lat + 0.01}&layer=mapnik&marker=${card.card_lat}%2C${card.card_lon}`}
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
          </>
        )}
      </section>

      {/* Horarios */}
      <section className="card-section">
        <h2>{t("horarios")}</h2>
        <p>{card.card_horario}</p>
      </section>

      {/* Contactos */}
      <section className="card-section">
        <h2>{t("contactos")}</h2>
        <p>{card.card_contacto}</p>
      </section>

      {/* Información */}
      <section className="card-section">
        <h2>{t("informacion")}</h2>
        <p>{card.card_info}</p>
      </section>
    </div>
  );
};

export default CardPage;
