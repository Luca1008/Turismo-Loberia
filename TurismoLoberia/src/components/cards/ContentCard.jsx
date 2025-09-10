import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/images/default-photo.jpg";
import "../../styles/card.css";

/**
 * Componente `ContentCard`
 *
 * Representa una tarjeta de contenido que puede mostrar información de un lugar o evento,
 * incluyendo título, descripción, ciudad, imagen y fecha (para eventos). 
 * También permite mostrar botones de edición y eliminación si se proporcionan las funciones correspondientes.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.title="Título del lugar"] - Título del contenido.
 * @param {string} [props.description="Descripción breve del lugar."] - Descripción breve.
 * @param {string} [props.city="Ciudad no especificada"] - Nombre de la ciudad.
 * @param {string} [props.img] - URL de la imagen del contenido. Usa imagen por defecto si no se proporciona.
 * @param {string|number} [props.id=null] - Identificador del contenido.
 * @param {string} [props.category=""] - Categoría del contenido. Si es "Evento", se mostrará la fecha.
 * @param {string} [props.card_date=""] - Fecha del evento (formato ISO o reconocible por `Date`).
 * @param {function} [props.onEdit] - Función llamada al hacer clic en el botón de editar, recibe `id` como argumento.
 * @param {function} [props.onDelete] - Función llamada al hacer clic en el botón de eliminar, recibe `id` como argumento.
 *
 * @returns {JSX.Element} Tarjeta de contenido renderizada.
 *
 * @example
 * <ContentCard
 *   title="Playa de Lobería"
 *   description="Una hermosa playa para disfrutar del verano."
 *   city="Lobería"
 *   img="https://example.com/imagen.jpg"
 *   id={1}
 *   category="Evento"
 *   card_date="2025-09-15"
 *   onEdit={(id) => console.log("Editar", id)}
 *   onDelete={(id) => console.log("Eliminar", id)}
 * />
 */
const ContentCard = ({
  title = "Título del lugar",
  description = "Descripción breve del lugar.",
  city = "Ciudad no especificada",
  img,
  id = null,
  category = "",
  card_date = "",
  onEdit,
  onDelete,
}) => {
  const imageSrc = img || defaultImg;
  const isEvent = category === "Evento";
  let dateMonth = "";
  let dateDay = "";
  if (isEvent && card_date) {
    const dateObj = new Date(card_date);
    dateMonth = dateObj.toLocaleString("es-ES", { month: "short" });
    dateDay = dateObj.getDate();
  }

  return (
    <Card className="card">
      <Card.Img className="card-img" src={imageSrc} variant="top" alt={title} />
      <Card.Body className="card-body">
        <div className="content-card">
          <Card.Title className="card-title-ellipsis">{title}</Card.Title>
          <Card.Text className="text-left">{description}</Card.Text>
          <Card.Text className="card-city-ellipsis">
            <strong className="location-icon">
              <FaLocationDot /> {city}
            </strong>
          </Card.Text>
        </div>
        <Button
          variant="link"
          className="btn-link"
          as={Link}
          to={`/cards/${id}`}
        >
          Ver Más
        </Button>
        {(onEdit || onDelete) && (
          <div className="card-buttons-wrapper">
            <div className="card-buttons">
              {onEdit && (
                <Button
                  variant="primary"
                  size="sm"
                  className="btn-edit"
                  onClick={() => onEdit(id)}
                >
                  <strong>
                    <MdModeEdit
                      style={{ marginRight: 4, verticalAlign: "middle" }}
                    />
                    Editar
                  </strong>
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  className="btn-delete"
                  onClick={() => onDelete(id)}
                >
                  <strong>
                    <MdDeleteForever
                      style={{ marginRight: 4, verticalAlign: "middle" }}
                    />
                    Eliminar
                  </strong>
                </Button>
              )}
            </div>
          </div>
        )}
        {isEvent && (
          <div className="event-card__date blurred">
            <p className="event-card__month">{dateMonth}.</p>
            <p className="event-card__day">{dateDay}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
