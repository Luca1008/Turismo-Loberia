import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/cardPage.css"; // lo podés personalizar vos

const CardPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

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

  if (!card) return <p>Cargando...</p>;

  return (
    <div className="card-detail">
      {/* Imagen Portada */}
      {card.card_img_portada && (
        <img src={card.card_img_portada} alt={card.card_title} className="card-img-portada" />
      )}

      {/* Título */}
      <h1>{card.card_title}</h1>

      {/* Descripción */}
      <p>{card.card_description}</p>

      {/* Ubicación */}
      <section className="card-section">
        <h2>Ubicación</h2>
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
        <h2>Horarios</h2>
        <p>{card.card_horario}</p>
      </section>

      {/* Imagen Extra */}
      {card.card_img && (
        <section className="card-section">
          <img src={card.card_img} alt="Imagen adicional" className="card-img-extra" />
        </section>
      )}

      {/* Contactos */}
      <section className="card-section">
        <h2>Contactos</h2>
        <p>{card.card_contacto}</p>
      </section>

      {/* Información */}
      <section className="card-section">
        <h2>Información</h2>
        <p>{card.card_info}</p>
      </section>
    </div>
  );
};

export default CardPage;