import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics";

const PartidoLoberia = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Vista de página
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Partido Lobería",
    });

    // ✅ Eventos por sección
    const sections = [
      "informacion_general",
      "como_llegar",
      "alojamientos",
      "gastronomia",
      "transporte",
      "agenda",
      "que_hacer",
      "descargas",
    ];

    sections.forEach((sectionId) => {
      trackEvent({
        category: "Sección",
        action: "Vista sección",
        label: sectionId,
      });
    });

    // ✅ Scroll completo
    trackEvent({
      category: "Scroll",
      action: "Página completa",
      label: "Partido Lobería",
    });
  }, []);

  return (
    <div className="city" key={i18n.language}>
      <h1 id="informacion-general">{t("ciudad_loberia")}</h1>
      <div className="portada-city"></div>

      <section className="information">
        <p>Lobería es una ciudad ubicada en el sudeste de la provincia...</p>
      </section>

      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <p><strong><FaCar />En auto:</strong> ...</p>
        <p><strong><FaBus />En micro:</strong> ...</p>
        <p><strong><FaTrain /><FaBus />En tren + micro:</strong> ...</p>
        <div className="photo"></div>
      </section>

      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo"></div>
        <p>La ciudad de Lobería ofrece una variedad de opciones...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic alojamiento",
              label: "Partido Lobería",
            });
            navigate("/Buscador", {
              state: { category: "Alojamiento" },
            });
          }}
        />
      </section>

      <section className="gastronomy" id="gastronomia">
        <h2>{t("gastronomia")}</h2>
        <div className="photo"></div>
        <p>La gastronomía en Lobería se destaca por...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic gastronomía",
              label: "Partido Lobería",
            });
            navigate("/Buscador", {
              state: { category: "Gastronomía" },
            });
          }}
        />
      </section>

      <section className="transport" id="transporte">
        <h2>{t("transporte")}</h2>
        <div className="photo"></div>
        <p>Lobería cuenta con una terminal de ómnibus...</p>
      </section>

      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo"></div>
        <p>Lobería ofrece una variada agenda cultural...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic eventos",
              label: "Partido Lobería",
            });
            navigate("/Buscador", {
              state: { category: "Evento" },
            });
          }}
        />
      </section>

      <section className="event" id="que-hacer">
        <h2>{t("que_hacer2")}</h2>
        <p><strong>Playas y naturaleza:</strong> ...</p>
        <p><strong>Cultura e historia:</strong> ...</p>
        <p><strong>Turismo rural:</strong> ...</p>
        <p><strong>Gastronomía y relax:</strong> ...</p>
      </section>

      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>Puedes descargar material útil para tu visita como: ...</p>
      </section>
    </div>
  );
};

export default PartidoLoberia;
