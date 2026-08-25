import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonSuccess from "../common/ButtonSuccess";
import { trackEvent } from "../../analytics";
import desktopImg from "../../assets/images/reserva_natural_banner/desktop.jpg";
import mobileImg from "../../assets/images/reserva_natural_banner/mobile.jpg";
import "../../styles/reservaNaturalBanner.css";

/**
 * Componente `ReservaNaturalBanner`
 *
 * Banner promocional de la Reserva Natural en la home, con imagen
 * responsive (desktop/mobile) y un botón "Ver Más" que lleva a la
 * sección correspondiente dentro de Partido de Lobería.
 */
const ReservaNaturalBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="reserve-banner">
      <picture>
        <source media="(max-width: 768px)" srcSet={mobileImg} />
        <img
          src={desktopImg}
          alt={t("intro_reserva_natural", { returnObjects: true }).nombre}
          className="reserve-banner-img"
        />
      </picture>
      <div className="reserve-banner-cta">
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Ver más",
              label: "Reserva Natural (Home)",
            });
            navigate("/PartidoLoberia/reserva_natural");
          }}
        />
      </div>
    </section>
  );
};

export default ReservaNaturalBanner;
