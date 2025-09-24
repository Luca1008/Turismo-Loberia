import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaBicycle } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics";
import { TbMapRoute } from "react-icons/tb";

/**
 * Componente `SanManuel`.
 *
 * Página informativa sobre la localidad de San Manuel.
 * Muestra secciones de información general, cómo llegar, alojamientos, gastronomía,
 * transporte, agenda de eventos, actividades y descargas.
 * Realiza tracking de la vista de la página, secciones y clics en botones.
 *
 * @component
 * @example
 * <SanManuel />
 *
 * @returns {JSX.Element} Contenido de la página de San Manuel
 *
 * @author
 * Felicitas Aguerralde
 * Luca Guidi
 */
export const SanManuel = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  /**
   * Ejecuta tracking al cargar la página.
   * Registra vistas de la página, de secciones y scroll completo.
   */
  useEffect(() => {
    // Tracking de vista de página
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "San Manuel",
    });

    // Tracking de vistas de secciones
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

    // Tracking de scroll completo
    trackEvent({
      category: "Scroll",
      action: "Página completa",
      label: "San Manuel",
    });
  }, []);

  /**
   * Navega a la página de búsqueda filtrando por categoría
   * y realiza tracking del clic en el botón.
   *
   * @param {string} category Categoría de búsqueda ("Alojamiento", "Gastronomía", "Evento", etc.)
   */
  const handleButtonClick = (category) => {
    trackEvent({
      category: "Botón",
      action: `Clic ${category.toLowerCase()}`,
      label: "San Manuel",
    });
    navigate("/Buscador", { state: { category } });
  };

  /**
   * Renderiza la página de San Manuel con todas sus secciones.
   */
  return (
    <div className="city" key={i18n.language}>
      {/* Sección principal */}
      <div id="informacion_general" className="portada-san-manuel"></div>
      <h1>{t("san_manuel")}</h1>
      <section className="information">
        <Trans components={{ p: <p /> }} i18nKey="descripcion_san_manuel" />
      </section>

      {/* Cómo llegar */}
      <section className="go-to" id="como_llegar">
        <h2>{t("como_llegar")}</h2>
        <div className="photo-como-llegar-san-manuel"></div>
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.titulo"
        />
        <p>
          <strong className="primary">
            <FaCar /> {t("en_auto")}
          </strong>
        </p>
        <div className="item-location margin-bottom">
        <TbMapRoute className="route-icon"/>
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_loberia"
        />
        </div>
        <div className="item-location margin-bottom">
        <TbMapRoute className="route-icon"/>
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_tandil"
        />
        </div>
        <div className="item-location">
        <TbMapRoute className="route-icon"/>  
        <Trans
          components={{ p: <p /> }}
          i18nKey="como_llegar_san_manuel.desde_necochea"
        />
        </div>
      </section>

      {/* Alojamiento */}
      <section className="accommodation" id="alojamientos">
        <Trans components={{ h2: <h2 /> }} i18nKey="alojamientos_san_manuel" />
        <div className="photo-alojamiento-san-manuel"></div>
        <p>{t("alojamientos_san_manuel_descripcion")}</p>
        <ButtonSuccess onClick={() => handleButtonClick("Alojamiento")} />
      </section>

      {/* Gastronomía */}
      <section className="gastronomy" id="gastronomia">
        <h2>{t("gastronomia")}</h2>
        <div className="photo-gastronomia-san-manuel"></div>
        <p>San Manuel ofrece una propuesta gastronómica sencilla...</p>
        <ButtonSuccess onClick={() => handleButtonClick("Gastronomía")} />
      </section>

      {/* Transporte */}
      <section className="transport" id="transporte">
        <h2>{t("transporte")}</h2>
        <div className="photo-transporte-san-manuel"></div>
        <p>San Manuel ofrece opciones limitadas de transporte público...</p>
      </section>

      {/* Agenda de eventos */}
      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo-agenda-san-manuel"></div>
        <Trans
          components={{ p: <p />, h2: <h2 />, h3: <h3 className="h3-margin-top" />, ul: <ul />, li: <li /> }}
          i18nKey="agenda_san_manuel"
        />
        <ButtonSuccess onClick={() => handleButtonClick("Evento")} />
      </section>

      {/* Qué hacer */}
      <section className="event" id="que_hacer">
        <h2>{t("que_hacer_san_manuel")}</h2>
        <div className="photo-que-hacer-san-manuel"></div>
        <Trans
          components={{ p: <p />, h3: <h3 className="h3-margin-top"/>, ul: <ul />, li: <li /> }}
          i18nKey="que_hacer_san_manuel_descripcion"
        />
      </section>

      {/* Descargas */}
      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
      </section>
    </div>
  );
};

export default SanManuel;
