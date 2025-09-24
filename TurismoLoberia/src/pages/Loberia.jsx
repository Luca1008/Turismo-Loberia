import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics";
import DownloadButton from "../components/ui/DownloadButton";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { TbMapRoute } from "react-icons/tb";

/**
 * Componente `Loberia`
 *
 * Representa la página de la ciudad de Lobería, incluyendo secciones de:
 * - Información general
 * - Cómo llegar
 * - Alojamiento
 * - Gastronomía
 * - Transporte
 * - Agenda y eventos
 * - Qué hacer
 * - Descargas de documentos PDF
 *
 * Funcionalidades:
 * - Traducción de contenido mediante `react-i18next` (`t` y `Trans`)
 * - Seguimiento de eventos con `trackEvent` para:
 *   - Vista de página
 *   - Vista de secciones
 *   - Clics en botones de acción
 * - Navegación programática a la página de búsqueda (`/Buscador`) según categoría
 *
 * Hooks usados:
 * - `useEffect`: para trackear vistas iniciales de página y secciones
 * - `useTranslation`: para traducciones
 * - `useNavigate`: para navegación programática
 *
 * Componentes internos usados:
 * - `ButtonSuccess`: botones para navegar a buscadores de categorías
 * - `DownloadButton`: botones para descargar archivos PDF
 * - `Trans`: para contenido traducido con componentes React embebidos
 *
 * @component
 * @returns {JSX.Element} Página completa de la ciudad de Lobería
 */
const Loberia = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  /**
   * Datos de descripción de la ciudad traducidos
   * @type {Object}
   */
  const data_descripcion = t("descripcion_ciudad_loberia", {
    returnObjects: true,
  });

  /**
   * Efecto para trackear vista de página y secciones
   */
  useEffect(() => {
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Lobería",
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
      label: "Lobería",
    });
  }, []);

  return (
    <div id="informacion_general" className="city" key={i18n.language}>
      {/* Portada de la ciudad */}
      <div id="informacion-general" className="portada-loberia"></div>
      <h1>{t("ciudad_loberia")}</h1>

      {/* Sección Información General */}
      <section className="information-city-loberia">
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.introduccion}
        </Trans>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.calles}
        </Trans>
        <div className="item-location">
          <MdOutlineAddLocationAlt/>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.parque}
        </Trans>
        </div>
        <div className="item-location">
          <MdOutlineAddLocationAlt/>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.camino_sirga}
        </Trans>
        </div>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.vida_cultural_intro}
        </Trans>
        <div className="item-location">
          <MdOutlineAddLocationAlt/>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.museo_historia_natural}
        </Trans>
        </div>
        <div className="item-location">
          <MdOutlineAddLocationAlt/>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.museo_historico}
        </Trans>
        </div>
        <div className="item-location">
          <MdOutlineAddLocationAlt/>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.fiestas_populares}
        </Trans>
        </div>
        <div className="item-location">
          <MdOutlineAddLocationAlt/>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.automovilismo}
        </Trans>
        </div>
        <Trans components={{ p: <p />, span: <span className="font-semibold" /> }}>
          {data_descripcion.cierre}
        </Trans>
      </section>

      {/* Sección Cómo Llegar */}
      <section className="go-to" id="como_llegar">
        <h2>{t("como_llegar")}</h2>
        <div className="photo-como-llegar-loberia"></div>
        {/* Transporte en auto */}
        <div className="car">
          <p>
            <strong className="primary">
              <FaCar />
              {t("en_auto")}
            </strong>{" "}
          </p>
          <div>
            {Object.values(
              t("como_llegar_partido_loberia", { returnObjects: true })
            ).map((item, index) => (
              <div key={index} className="mb-4">
                <p>
                  <TbMapRoute className="route-icon"/><strong>{item.descripcion}:</strong>
                </p>
                {Array.isArray(item.rutas) && (
                  <ul className="list-disc pl-5">
                    {item.rutas.map((ruta, i) => (
                      <li key={i} className="route-item">{ruta}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <Trans i18nKey="intro_2_como_llegar_partido_loberia" components={{ br: <br /> }} />
        </div>

        {/* Transporte en micro */}
        <div className="bus">
          <p>
            <strong className="primary">
              <FaBus />
              {t("en_micro")}
            </strong>{" "}
          </p>
          <Trans i18nKey="descripcion_en_micro" components={{ br: <br /> }} />
          <ul>
            <li>
              <TbMapRoute className="route-icon"/>
              <Trans i18nKey="opcion_desde_buenos_aires" components={{ br: <br /> }} />
            </li>
            <li>
              <TbMapRoute className="route-icon"/>
              <Trans i18nKey="opcion_desde_mar_del_plata" components={{ br: <br /> }} />
            </li>
          </ul>
        </div>
        <p>{t("cierre_como_llegar_partido_loberia")}</p>
      </section>

      {/* Sección Alojamiento */}
      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo-alojamiento-loberia"></div>
        <p>{t("alojamientos_loberia_descripcion")}</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({ category: "Botón", action: "Clic alojamiento", label: "Lobería" });
            navigate("/Buscador", { state: { category: "Alojamiento" } });
          }}
        />
      </section>

      {/* Sección Gastronomía */}
      <section className="gastronomy" id="gastronomia">
        <h2>{t("gastronomia")}</h2>
        <div className="photo-gastronomia-loberia"></div>
        <Trans i18nKey="gastronomia_loberia_descripcion" components={{ p: <p />, span: <span className="font-semibold" /> }} />
        <ButtonSuccess
          onClick={() => {
            trackEvent({ category: "Botón", action: "Clic gastronomía", label: "Lobería" });
            navigate("/Buscador", { state: { category: "Gastronomía" } });
          }}
        />
      </section>

      {/* Sección Transporte */}
      <section className="transport" id="transporte">
        <h2>{t("transporte")}</h2>
        <div className="photo-transporte-partido-loberia"></div>
        <Trans i18nKey="transporte_loberia_descripcion" components={{ p: <p />, strong: <strong /> }} />
      </section>

      {/* Sección Agenda */}
      <section className="agenda" id="agenda">
        <h2>{t("agenda_loberia")}</h2>
        <div className="photo-agenda-loberia"></div>
        <p>{t("agenda_loberia_descripcion")}</p>
        <Trans i18nKey="fiestas_loberia_descripcion" components={{ p: <p />, strong: <strong />, h3: <h3 />, h2: <h2 />, ul: <ul />, li: <li /> }} />
        <ButtonSuccess
          onClick={() => {
            trackEvent({ category: "Botón", action: "Clic eventos", label: "Lobería" });
            navigate("/Buscador", { state: { category: "Evento" } });
          }}
        />
      </section>

      {/* Sección Qué Hacer */}
      <section className="event" id="que_hacer">
        <h2>{t("que_hacer_loberia")}</h2>
        <div className="photo-que-hacer-loberia"></div>
        <Trans i18nKey="que_hacer_loberia_descripcion" components={{ p: <p />, h2: <h2 />, h3: <h3 />, span: <span className="font-semibold" /> }} />
      </section>

      {/* Sección Descargas */}
      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <DownloadButton
          filePath="/downloads/loberia/camino_de_sirga.pdf"
          fileName="Camino de Sirga"
          label="Descargar PDF - Camino de Sirga"
          className="button"
        />
        <DownloadButton
          filePath="/downloads/loberia/corredor_biologico_camino_de_los_curros.pdf"
          fileName="Corredor Biológico Camino de los Curros"
          label="Descargar PDF - Corredor Biológico Camino de los Curros"
          className="button"
        />
      </section>
    </div>
  );
};

export default Loberia;
