import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics"; // 👈 Importamos GA4
import DownloadButton from "../components/ui/DownloadButton";

const Loberia = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const data_descripcion = t("descripcion_ciudad_loberia", {
    returnObjects: true,
  });

  useEffect(() => {
    // ✅ Evento: Vista general de la página
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Lobería",
    });

    // ✅ Evento por sección renderizada
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

    // ✅ Simulación de "lectura completa"
    trackEvent({
      category: "Scroll",
      action: "Página completa",
      label: "Lobería",
    });
  }, []);

  return (
    <div id="informacion-general" className="city" key={i18n.language}>
      <div id="informacion-general" className="portada-loberia"></div>
      <h1>{t("ciudad_loberia")}</h1>
      <section className="information-city-loberia">
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.introduccion}
        </Trans>
        <br />
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.calles}
        </Trans>
        <br />
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.parque}
        </Trans>
        <br />
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.camino_sirga}
        </Trans>
        <br />
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.vida_cultural_intro}
        </Trans>
        <br />
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.museo_historia_natural}
        </Trans>
        <br />
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.museo_historico}
        </Trans>
        <br />

        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.fiestas_populares}
        </Trans>
        <br />
        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.automovilismo}
        </Trans>
        <br />

        <Trans
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        >
          {data_descripcion.cierre}
        </Trans>
      </section>

      <section className="go-to" id="como-llegar">
        <h2>{t("como_llegar")}</h2>
        <div className="photo-como-llegar-loberia"></div>
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
                  <strong>{item.descripcion}:</strong>
                </p>
                {Array.isArray(item.rutas) && (
                  <ul className="list-disc pl-5">
                    {item.rutas.map((ruta, i) => (
                      <li key={i}>{ruta}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <Trans
            i18nKey="intro_2_como_llegar_partido_loberia"
            components={{
              br: <br />,
            }}
          />
        </div>
        <div className="bus">
          <p>
            <strong className="primary">
              <FaBus />
              {t("en_micro")}
            </strong>{" "}
          </p>
          <Trans
            i18nKey="descripcion_en_micro"
            components={{
              br: <br />,
            }}
          />
          <ul>
            <li>
              <Trans
                i18nKey="opcion_desde_buenos_aires"
                components={{
                  br: <br />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey="opcion_desde_mar_del_plata"
                components={{
                  br: <br />,
                }}
              />
            </li>
          </ul>
        </div>
        <p>{t("cierre_como_llegar_partido_loberia")}</p>
      </section>

      <section className="accommodation" id="alojamientos">
        <h2>{t("alojamientos")}</h2>
        <div className="photo-alojamiento-loberia"></div>
        <p>{t("alojamientos_loberia_descripcion")}</p>
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic alojamiento",
              label: "Lobería",
            });
            navigate("/Buscador", {
              state: { category: "Alojamiento" },
            });
          }}
        />
      </section>

      <section className="gastronomy" id="gastronomia">
        <h2>{t("gastronomia")}</h2>
        <div className="photo-gastronomia-loberia"></div>
        <Trans
          i18nKey="gastronomia_loberia_descripcion"
          components={{ p: <p />, span: <span className="font-semibold" /> }}
        />
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic gastronomía",
              label: "Lobería",
            });
            navigate("/Buscador", {
              state: { category: "Gastronomía" },
            });
          }}
        />
      </section>

      <section className="transport" id="transporte">
        <h2>{t("transporte")}</h2>
        <div className="photo-transporte-partido-loberia"></div>
        <Trans
          i18nKey="transporte_loberia_descripcion"
          components={{ p: <p />, strong: <strong /> }}
        />
      </section>

      <section className="agenda" id="agenda">
        <h2>{t("agenda_loberia")}</h2>
        <div className="photo-agenda-loberia"></div>
        <p>{t("agenda_loberia_descripcion")}</p>
        <Trans i18nKey="fiestas_loberia_descripcion"
          components={{ p: <p />, strong: <strong />, h3: <h3 />, h2: <h2 />, ul:<ul/>, li:<li/>}} />
        <ButtonSuccess
          onClick={() => {
            trackEvent({
              category: "Botón",
              action: "Clic eventos",
              label: "Lobería",
            });
            navigate("/Buscador", {
              state: { category: "Evento" },
            });
          }}
        />
      </section>

      <section className="event" id="que-hacer">
        <h2>{t("que_hacer_loberia")}</h2>
        <div className="photo-que-hacer-loberia"></div>
        <Trans
          i18nKey="que_hacer_loberia_descripcion" components={{ p: <p />,h2: <h2 />, h3: <h3 /> , span: <span className="font-semibold" />}} />
      </section>

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
