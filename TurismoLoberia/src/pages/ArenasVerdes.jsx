import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics"; // 👈 Importa GA tracking

const ArenasVerdes = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });

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
        <Trans components={{ p: <p /> }}>{data_arenas.descripcion_1}</Trans>
        <Trans components={{ p: <p /> }}>{data_arenas.descripcion_2}</Trans>
      </section>

      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <div className="photo"></div>
        <p>
          <strong className="primary">
            <FaCar />
            {t("en_auto")}
          </strong>
        </p>
        <Trans components={{ p: <p /> }}>{data_arenas.como_llegar_intro}</Trans>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.desde_loberia}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.desde_necochea}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.desde_mar_del_plata}
        </Trans>
      </section>

      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo"></div>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.alojamiento}
        </Trans>
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
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.gastronomia}
        </Trans>
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
        <Trans components={{ p: <p /> }}>{data_arenas.actividades_intro}</Trans>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.relax_naturaleza}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.deportes_acuaticos}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.aire_libre}
        </Trans>
      </section>

      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <p>Puedes descargar material útil...</p>
      </section>
    </div>
  );
};

export default ArenasVerdes;
