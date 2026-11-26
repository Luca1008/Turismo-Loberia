import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuWaves, LuMountain, LuWheat, LuMap, LuCompass } from "react-icons/lu";
import { useSectionOverride, sectionImageStyle } from "../../../hooks/useSectionOverride";
import "../../../styles/storySection.css";
import "../../../styles/partidoPhotoFrame.css";
import "../../../styles/partidoSectionBg.css";
import "../../../styles/mosaicSection.css";

const Naturaleza = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("partido_loberia", "naturaleza");

  return (
    <section id="naturaleza" className="information bg-pattern-waves">
      <LuWaves className="deco-bounce" aria-hidden="true" style={{ top: "12%", left: "5%", fontSize: "3rem" }} />
      <LuWheat className="deco-float" aria-hidden="true" style={{ top: "50%", right: "6%", fontSize: "2.5rem", animationDelay: "1s" }} />

      <div className="section-inner">
        <div className="title-wrap">
          <div className="section-eyebrow">
            <LuMap aria-hidden="true" />
            <span>{t("descubri_loberia")}</span>
          </div>
          <h2>{t("naturaleza")}</h2>
          <div className="title-underline"></div>
        </div>

        {/* Esta sección nunca tuvo imagen de portada por defecto (sin regla en
            city.css); el tamaño se aplica inline solo cuando hay un override,
            para no dejar un recuadro vacío mientras no se cargue ninguna. El
            marco (con insignia brújula) solo se muestra junto con la imagen,
            para no dejar un marco vacío. */}
        {imageUrl && (
          <div className="photo-container reveal-item">
            <div className="photo-frame-adventure">
              <div
                className="photo-naturaleza-partido-loberia"
                style={sectionImageStyle(imageUrl)}
              ></div>
              <div className="torn-edge" aria-hidden="true"></div>
              <span className="adventure-badge" aria-hidden="true">
                <LuCompass />
              </span>
            </div>
          </div>
        )}

        <Trans components={{ h3: <h3 className="section-lead" /> }}>
          {data_intro.paisaje.titulo}
        </Trans>

        <div className="mosaic-list">
          <article className="mosaic-card mosaic-blue mosaic-tilt-1 reveal-item reveal-delay-1">
            <LuWaves className="mosaic-watermark" aria-hidden="true" />
            <LuWaves className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
                b: <strong />,
                h3: <h3 className="story-intro" />,
              }}
            >
              {data_intro.paisaje.mar}
            </Trans>
          </article>

          <article className="mosaic-card mosaic-blue mosaic-tilt-2 reveal-item reveal-delay-2">
            <LuMountain className="mosaic-watermark" aria-hidden="true" />
            <LuMountain className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
                h3: <h3 className="story-intro" />,
              }}
            >
              {data_intro.paisaje.sierras}
            </Trans>
          </article>

          <article className="mosaic-card mosaic-blue mosaic-tilt-3 reveal-item reveal-delay-3">
            <LuWheat className="mosaic-watermark" aria-hidden="true" />
            <LuWheat className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
                h3: <h3 className="story-intro" />,
              }}
            >
              {data_intro.paisaje.campo}
            </Trans>
          </article>
        </div>

        {text ? (
          <p className="mosaic-closing-text">{text}</p>
        ) : (
          <Trans components={{ p: <p className="mosaic-closing-text" />, h3: <h3 className="story-intro" /> }}>{data_intro.paisaje.cierre}</Trans>
        )}
      </div>
    </section>
  );
};

export default Naturaleza;
