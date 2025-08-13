import React, { useEffect } from "react";
import ButtonSuccess from "../components/common/ButtonSuccess";
import "../styles/city.css";
import { FaCar, FaBus, FaTrain } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics";
import { Trans } from "react-i18next";
import imagen1 from "../assets/images/partido_loberia/portada.jpg";
import imagen2 from "../assets/images/partido_loberia/gastronomia.jpg";
import imagen3 from "../assets/images/partido_loberia/transporte.jpg";
import imagen4 from "../assets/images/partido_loberia/alojamiento.jpg";
import DownloadButton from "../components/ui/DownloadButton";

const PartidoLoberia = () => {
  const slidesData = [
    { id: 1, title: "Slide 1", description: "Descripción 1", img: imagen1 },
    { id: 2, title: "Slide 2", description: "Descripción 2", img: imagen2 },
    { id: 3, title: "Slide 3", description: "Descripción 3", img: imagen3 },
    { id: 4, title: "Slide 4", description: "Descripción 4", img: imagen4 },
  ];

  const { t, i18n } = useTranslation();
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

  const data = t("como_llegar_partido_loberia", { returnObjects: true });
  const data_intro = t("intro_partido_loberia", { returnObjects: true });

  return (
    <div className="city" key={i18n.language}>
      <div className="portada-city"></div>
      <h1 id="informacion-general">{t("partido_loberia")}</h1>
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
        <h2>{t("como_llegar")}</h2>
        <div className="photo-como-llegar-partido-loberia"></div>
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
        <div className="photo-alojamiento-partido-loberia"></div>
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
        <div className="photo-gastronomia-partido-loberia"></div>
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
        <div className="photo-transporte-partido-loberia"></div>
        <p>Lobería cuenta con una terminal de ómnibus...</p>
      </section>

      <section className="agenda" id="agenda">
        <h2>{t("agenda")}</h2>
        <div className="photo-agenda-partido-loberia"></div>
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
        <p>
          <strong>Playas y naturaleza:</strong> ...
        </p>
        <p>
          <strong>Cultura e historia:</strong> ...
        </p>
        <p>
          <strong>Turismo rural:</strong> ...
        </p>
        <p>
          <strong>Gastronomía y relax:</strong> ...
        </p>
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
