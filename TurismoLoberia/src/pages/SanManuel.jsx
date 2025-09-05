import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaBicycle } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics"; // 👈 Importamos función GA4

export const SanManuel = () => {
  const { t, i18n } = useTranslation();
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
      <div id="informacion_general" className="portada-san-manuel"></div>
      <h1>{t("san_manuel")}</h1>
      <section className="information">
        <Trans components={{ p: <p /> }} i18nKey="descripcion_san_manuel" />
      </section>

      <section className="go-to" id="como_llegar">
        <h2>{t("como_llegar")}</h2>
        <div className="photo-como-llegar-san-manuel"></div>
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.titulo"
        />
        <p>
          <strong className="primary">
            <FaCar />
           { t("en_auto")}
          </strong>
        </p>
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_loberia"
        />
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_tandil"
        />
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_necochea"
        />
      </section>

      <section className="accommodation" id="alojamientos">
        <Trans components={{ h2: <h2 />}} i18nKey="alojamientos_san_manuel" />
        <div className="photo-alojamiento-san-manuel"></div>
        <p>{t("alojamientos_san_manuel_descripcion")}</p>
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
        <div className="photo-gastronomia-san-manuel"></div>
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
        <div className="photo-transporte-san-manuel"></div>
        <p>San Manuel ofrece opciones limitadas de transporte público...</p>
      </section>

      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo-agenda-san-manuel"></div>
        <Trans components={{ p: <p />, h2: <h2 />, h3: <h3 />, ul: <ul />, li: <li /> }} i18nKey="agenda_san_manuel" />
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

      <section className="event" id="que_hacer">
        <h2>{t("que_hacer_san_manuel")}</h2>
        <div className="photo-que-hacer-san-manuel"></div>
        <Trans components={{ p: <p />, h3: <h3 />, ul: <ul />, li: <li /> }} i18nKey="que_hacer_san_manuel_descripcion" />
      </section>

      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>
          Puedes descargar material útil para tu visita como: Mapa turístico,
          listado actualizado de alojamientos y guía gastronómica local.
        </p>
      </section>
    </div>
  );
};

export default SanManuel;
