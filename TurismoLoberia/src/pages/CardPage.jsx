import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/cardPage.css"; // lo podés personalizar vos
import { useTranslation } from "react-i18next";

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
      } catch (err) {
        console.error("Error al cargar la card", err);
      }
    };
    fetchCard();
  }, [id]);

  if (!card) return <p>{t("cargando")}</p>;

  return (
    <div className="card-detail" key={i18n.language}>
      {/* Imagen Portada */}
      {card.card_img_portada && (
        <img src={card.card_img_portada} alt={card.card_title} className="card-img-portada" />
      )}

      {/* Título */}
      <h1>{card.card_title}</h1>

      {/* Mostrar fecha si es un evento y tiene fecha */}
      {card.card_category === "Evento" && card.card_date && (
        <div className="event-date-detail" style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {t("fecha_evento")}: {new Date(card.card_date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      )}

      {/* Descripción */}
      <p>{card.card_description}</p>

      {/* Ubicación */}
      <section className="card-section">
        <h2>{t("ubicacion")}</h2>
        <p>{card.card_ubicacion}</p>
        {card.card_link_ubicacion && (
          <iframe
            title="Mapa"
            src={card.card_link_ubicacion}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        )}
      </section>

      {/* Horarios */}
      <section className="card-section">
        <h2>{t("horarios")}</h2>
        <p>{card.card_horario}</p>
      </section>

      {/* Imagen Extra
      {card.card_img && (
        <section className="card-section">
          <img src={card.card_img} alt="Imagen adicional" className="card-img-extra" />
        </section>
      )} */}

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