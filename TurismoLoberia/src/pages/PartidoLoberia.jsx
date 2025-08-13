import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../analytics";
import { Trans } from "react-i18next";
import DownloadButton from "../components/ui/DownloadButton";

const PartidoLoberia = () => {
  // Configuración de i18n y navegación
  const { t, i18n } = useTranslation();

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

  const data_intro = t("intro_partido_loberia", { returnObjects: true });

  return (
    <div className="city" key={i18n.language}>
      <div id="informacion_general" className="portada-city"></div>
      <h1>{t("partido_loberia")}</h1>
      <section className="information">
        <Trans components={{ p: <p /> }}>{data_intro.presentacion}</Trans>
        <br />
        <br />
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.caracteristicas}
        </Trans>
        <br />
        <br />

          <h2 id="historia">{t("historia")}</h2>
        <div className="photo-historia-partido-loberia"></div>
        <Trans components={{ h3: <h3 className="h3-city" /> }}>
          {data_intro.cultura.titulo}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.cultura.identidad}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.cultura.historia}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.cultura.talento}
        </Trans>
        <br />

        <h2 id="naturaleza">{t("naturaleza")}</h2>
        <div className="photo-naturaleza-partido-loberia"></div>
        <Trans components={{ h3: <h3 className="h3-city" /> }}>
          {data_intro.paisaje.titulo}
        </Trans>
        <br />
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.paisaje.mar}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.paisaje.sierras}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.paisaje.campo}
        </Trans>
        <Trans components={{ p: <p /> }}>{data_intro.paisaje.cierre}</Trans>
        <br />
        <br />
        
        

        <h2 id="producciones">{t("producciones")}</h2>
        <div className="photo-produccion-partido-loberia"></div>
        <Trans components={{ p: <p /> }}>{data_intro.economia.intro}</Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.economia.produccion}
        </Trans>
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.economia.productos}
        </Trans>
        <br />
        <Trans
          components={{
            p: <p />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.cierre}
        </Trans>
      </section>

      <section className="go-to" id="como-llegar">
        <h2 id="como-llegar">{t("como_llegar")}</h2>
        <div className="photo-como-llegar-partido-loberia"></div>
        <div className="car">
          <p>
            <strong>
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
            <strong>
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

      <section className="download" id="descargas">
        <h2>{t("descargas")}</h2>
        <DownloadButton
          filePath="/downloads/partido_loberia/camino_de_sirga.pdf"
          fileName="Camino de Sirga"
          label="Descargar PDF Camino de Sirga"
          className="button"
        />
      </section>
    </div>
  );
};

export default PartidoLoberia;
