import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics"; // 👈 Importa GA tracking

const ArenasVerdes = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // 🔥 Evento al montar (solo una vez)
  useEffect(() => {
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Arenas Verdes",
    });

    // Eventos automáticos por sección (puede ajustarse según uso real de scroll)
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

    // Al llegar al final del componente, simulamos evento de scroll total
    trackEvent({
      category: "Scroll",
      action: "Página completa",
      label: "Arenas Verdes",
    });
  }, []);

  return (
    <div className="city" key={i18n.language}>
      <h1 id="informacion-general">{t("arenas_verdes")}</h1>
      <div className="portada-city"></div>

      <section className="information">
        <p>Arenas Verdes es una pequeña localidad costera...</p>
      </section>

      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <p><strong>En autobús:</strong> ...</p>
        <p><strong><FaCar />En auto:</strong> ...</p>
        <div className="photo"></div>
      </section>

      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo"></div>
        <p>La oferta de alojamiento incluye cabañas...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic alojamiento",
              label: "Arenas Verdes",
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
        <p>La gastronomía local se basa en productos frescos...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic gastronomía",
              label: "Arenas Verdes",
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
        <p>Durante la temporada alta...</p>
      </section>

      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo"></div>
        <p>Durante el verano se realizan actividades...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic eventos",
              label: "Arenas Verdes",
            });
            navigate("/Buscador", {
              state: { category: "Evento" },
            });
          }}
        />
      </section>

      <section className="event" id="que-hacer">
        <h2>{t("que_hacer2")}</h2>
        <p>Disfrutar de la playa...</p>
      </section>

      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>Puedes descargar material útil...</p>
      </section>
    </div>
  );
};

export default ArenasVerdes;
