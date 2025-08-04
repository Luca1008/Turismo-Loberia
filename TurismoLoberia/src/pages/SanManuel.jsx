import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaBicycle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics"; // 👈 Importamos función GA4

export const SanManuel = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Vista de página
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "San Manuel",
    });

    // ✅ Vista por sección
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

    // ✅ Simulación de lectura completa
    trackEvent({
      category: "Scroll",
      action: "Página completa",
      label: "San Manuel",
    });
  }, []);

  return (
    <div className="city" key={i18n.language}>
      <h1 id="informacion-general">{t("san_manuel")}</h1>
      <div className="portada-city"></div>

      <section className="information">
        <p>San Manuel es una localidad del partido de Lobería...</p>
      </section>

      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <p><strong><FaCar />En auto:</strong> ...</p>
        <p><strong><FaBus />En colectivo:</strong> ...</p>
        <p><strong><FaBicycle />En bicicleta:</strong> ...</p>
        <div className="photo"></div>
      </section>

      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo"></div>
        <p>San Manuel ofrece opciones de alojamiento sencillas...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic alojamiento",
              label: "San Manuel",
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
        <p>San Manuel ofrece una propuesta gastronómica sencilla...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic gastronomía",
              label: "San Manuel",
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
        <p>San Manuel ofrece opciones limitadas de transporte público...</p>
      </section>

      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo"></div>
        <p>San Manuel celebra diversos eventos a lo largo del año...</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic eventos",
              label: "San Manuel",
            });
            navigate("/Buscador", {
              state: { category: "Evento" },
            });
          }}
        />
      </section>

      <section className="event" id="que-hacer">
        <h2>{t("que_hacer2")}</h2>
        <p>En San Manuel podés disfrutar de varias actividades...</p>
      </section>

      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>Puedes descargar material útil para tu visita como: Mapa turístico, listado actualizado de alojamientos y guía gastronómica local.</p>
      </section>
    </div>
  );
};

export default SanManuel;
