import { Button, Card } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { LuArrowRight, LuCompass } from "react-icons/lu";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CardPlaceholder, { CATEGORY_ACCENTS } from "./CardPlaceholder";
import "../../styles/card.css";
import "../../styles/mosaicSection.css";

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
 * @param {string} [props.img] - URL de la imagen del contenido. Si no hay (o no carga) se muestra un placeholder con el ícono de la categoría.
 * @param {string|number} [props.id=null] - Identificador del contenido.
 * @param {string} [props.category=""] - Categoría del contenido. Si es "Evento", se mostrará la fecha.
 * @param {string} [props.card_date=""] - Fecha del evento (formato ISO o reconocible por `Date`).
 * @param {"grid"|"showcase"} [props.variant="grid"] - "showcase" agrega el marco tipo estampa
 *   (borde recortado + insignia brújula) usado en "Descubrí Lobería" del inicio; /Buscador y el
 *   admin siguen usando "grid" (por defecto), sin tocar su apariencia.
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
  variant = "grid",
  onEdit,
  onDelete,
}) => {
  // Si la foto no carga (link roto) también se muestra el placeholder.
  const [imgFailed, setImgFailed] = useState(false);
  useEffect(() => setImgFailed(false), [img]);
  const hasImage = Boolean(img) && !imgFailed;
  const isEvent = category === "Evento";
  const isShowcase = variant === "showcase";
  const accent = CATEGORY_ACCENTS[category] || "green";
  const { t } = useTranslation();
  // Nombre legible ("Información útil" en vez de "InfoUtil"); si la
  // categoría no está en la lista, se muestra tal cual.
  const categoryLabel = category
    ? t(`categorias.${category}`, { defaultValue: category })
    : "";
  let dateMonth = "";
  let dateDay = "";
  if (isEvent && card_date) {
    const dateObj = new Date(card_date);
    dateMonth = dateObj.toLocaleString("es-ES", { month: "short" });
    dateDay = dateObj.getDate();
  }

  return (
    <Card className={`card${isShowcase ? " card-showcase" : ""}`}>
      {isShowcase ? (
        <div className="card-img-wrapper-showcase">
          {hasImage ? (
            <img
              className="card-img-showcase"
              src={img}
              alt={title}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <CardPlaceholder category={category} className="card-img-showcase" />
          )}
          <span className="adventure-badge-mini" aria-hidden="true">
            <LuCompass />
          </span>
          {category && (
            <span className={`accent-chip accent-${accent} card-category-chip`}>
              {categoryLabel}
            </span>
          )}
        </div>
      ) : (
        <>
          {hasImage ? (
            <Card.Img
              className="card-img"
              src={img}
              variant="top"
              alt={title}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <CardPlaceholder category={category} className="card-img" />
          )}
          {category && (
            <span className={`accent-chip accent-${accent} card-category-chip`}>
              {categoryLabel}
            </span>
          )}
        </>
      )}
      <Card.Body className="card-body">
        <div className="content-card">
          <Card.Title className="card-title-ellipsis">{title}</Card.Title>
          <Card.Text className="text-left card-description">{description}</Card.Text>
          <Card.Text className="card-city-ellipsis">
            <strong className="location-icon">
              <FaLocationDot /> {city}
            </strong>
          </Card.Text>
        </div>
        <Button
          variant="link"
          className={`accent-pill-button accent-${accent} card-view-more`}
          as={Link}
          to={`/cards/${id}`}
        >
          Ver Más
          <LuArrowRight aria-hidden="true" />
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
                  onClick={() => {
                    if (window.confirm("¿Está seguro que desea eliminar?")) {
                      onDelete(id);
                    }
                  }}
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
          <div className="event-card__date">
            <p className="event-card__month">{dateMonth}.</p>
            <p className="event-card__day">{dateDay}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
