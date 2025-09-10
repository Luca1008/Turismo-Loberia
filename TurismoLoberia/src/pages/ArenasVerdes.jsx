import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics";
import DownloadButton from "../components/ui/DownloadButton";

const ArenasVerdes = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });

  useEffect(() => {
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Arenas Verdes",
    });

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

    trackEvent({
      category: "Scroll",
      action: "Página completa",
      label: "Arenas Verdes",
    });
  }, []);

  return (
    <div className="city" key={i18n.language}>
      <div id="informacion_general" className="portada-arenas-verdes"></div>
      <h1>{t("arenas_verdes")}</h1>
      <section className="information">
        <Trans components={{ p: <p /> }}>{data_arenas.descripcion_1}</Trans>
        <Trans components={{ p: <p /> }}>{data_arenas.descripcion_2}</Trans>
      </section>

      <section className="go-to" id="como_llegar">
        <h2>{t("como_llegar")}</h2>
        <div className="photo-como-llegar-arenas-verdes"></div>
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
        <h2>{t("alojamientos_arenas_verdes")}</h2>
        <div className="photo-alojamiento-arenas-verdes"></div>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.alojamiento}
        </Trans>
        <Trans
          i18nKey="alojamientos_arenas_verdes_descripcion"
          components={{
            p: <p />,
            h2: <h2 />,
            h3: <h3 />,
            ul: <ul />,
            li: <li />,
            br: <br />,
            strong: <strong />,
          }}
        />
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
        <h2>{t("gastronomia_arenas_verdes")}</h2>
        <div className="photo-gastronomia-arenas-verdes"></div>
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
        <p>{t("transporte_arenas_verdes")}</p>
      </section>

      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo-agenda-arenas-verdes"></div>
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

      <section className="event" id="que_hacer">
        <h2>{t("que_hacer_arenas_verdes")}</h2>
        <div className="photo-que-hacer-arenas-verdes"></div>
        <Trans components={{ p: <p /> }}>{data_arenas.actividades_intro}</Trans>
        <h2>{t("actividades_arenas_verdes")}</h2>
        <Trans components={{ p: <p />, strong: <strong />, h3: <h3 /> }}>
          {data_arenas.mar}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong /> }}>
          {data_arenas.entorno}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong />, h3: <h3 /> }}>
          {data_arenas.aire_libre}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong />, h3: <h3 /> }}>
          {data_arenas.magico}
        </Trans>
        <Trans components={{ p: <p />, strong: <strong />, h3: <h3 /> }}>
          {data_arenas.experiencia}
        </Trans>
      </section>

      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <DownloadButton
          filePath="/downloads/arenas_verdes/info_aves_arenas_verdes.pdf"
          fileName="Info Arenas Verdes"
          label="Descargar PDF - Info Arenas Verdes"
          className="button"
        />
        <DownloadButton
          filePath="/downloads/arenas_verdes/alojamientos_arenas_verdes.pdf"
          fileName="Alojamientos Arenas Verdes"
          label="Descargar PDF - Alojamientos Arenas Verdes"
          className="button"
        />
        <DownloadButton
          filePath="/downloads/arenas_verdes/aves_arenas_verdes.pdf"
          fileName="Aves Arenas Verdes"
          label="Descargar PDF - Aves Arenas Verdes"
          className="button"
        />
      </section>
    </div>
  );
};

export default ArenasVerdes;
