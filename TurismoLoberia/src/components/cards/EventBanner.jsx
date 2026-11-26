import { FaLocationDot, FaClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import defaultImg from "../../assets/images/default-photo.jpg";
import ButtonSuccess from "../common/ButtonSuccess";
import { trackEvent } from "../../analytics";
import "../../styles/card.css";

/**
 * Componente `EventBanner`
 *
 * Banner horizontal para un evento en la home, con la foto de fondo a todo
 * lo ancho y el texto (título, descripción, ubicación, horario, fecha) y el
 * botón "Ver más" superpuestos sobre la imagen — mismo formato que
 * `ReservaNaturalBanner`, pero con contenido dinámico por evento.
 *
 * @param {Object} props
 * @param {string} [props.title="Título del evento"]
 * @param {string} [props.description="Descripción breve del evento."]
 * @param {string} [props.city="Ciudad no especificada"]
 * @param {string} [props.horario=""] - Horario del evento (ej. "12 hs").
 * @param {string} [props.img] - Imagen del evento. Usa imagen por defecto si no se proporciona.
 * @param {string|number} [props.id=null]
 * @param {string} [props.card_date=""] - Fecha del evento (formato reconocible por `Date`).
 *
 * @returns {JSX.Element}
 */
const EventBanner = ({
  title = "Título del evento",
  description = "Descripción breve del evento.",
  city = "Ciudad no especificada",
  horario = "",
  img,
  id = null,
  card_date = "",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const imageSrc = img || defaultImg;

  let ribbonMonth = "";
  let ribbonDay = "";
  if (card_date) {
    const dateObj = new Date(card_date);
    ribbonMonth = dateObj
      .toLocaleString("es-ES", { month: "short" })
      .replace(".", "");
    ribbonDay = dateObj.getDate();
  }

  return (
    <div className="event-banner">
      <img className="event-banner-img" src={imageSrc} alt={title} />
      {ribbonDay && (
        <div className="event-banner-ribbon" aria-hidden="true">
          <span className="event-banner-ribbon-month">{ribbonMonth}</span>
          <span className="event-banner-ribbon-day">{ribbonDay}</span>
        </div>
      )}
      <div className="event-banner-overlay">
        <div className="event-banner-info">
          <h3 className="event-banner-title">{title}</h3>
          <p className="event-banner-description">{description}</p>
          <p className="event-banner-meta">
            <span>
              <FaLocationDot /> {city}
            </span>
            {horario && (
              <span>
                <FaClock /> {horario}
              </span>
            )}
          </p>
          <ButtonSuccess
            text={t("ver_detalles")}
            onClick={() => {
              trackEvent({
                category: "Botón",
                action: "Ver más",
                label: `Evento (Home): ${title}`,
              });
              navigate(`/cards/${id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
