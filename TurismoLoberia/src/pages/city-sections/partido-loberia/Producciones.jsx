import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuTractor, LuLeaf, LuMap, LuCompass } from "react-icons/lu";
import { useSectionOverride, sectionImageStyle } from "../../../hooks/useSectionOverride";
import "../../../styles/storySection.css";
import "../../../styles/partidoPhotoFrame.css";
import "../../../styles/partidoSectionBg.css";
import "../../../styles/mosaicSection.css";

const Producciones = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("partido_loberia", "producciones");

  return (
    <section id="producciones" className="information bg-pattern-wheat">
      <LuTractor className="deco-float" aria-hidden="true" style={{ top: "12%", left: "5%", fontSize: "3rem" }} />
      <LuLeaf className="deco-pulse" aria-hidden="true" style={{ top: "50%", right: "6%", fontSize: "2.5rem" }} />

      <div className="section-inner">
        <div className="title-wrap">
          <div className="section-eyebrow">
            <LuMap aria-hidden="true" />
            <span>{t("descubri_loberia")}</span>
          </div>
          <h2>{t("producciones")}</h2>
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
                className="photo-produccion-partido-loberia"
                style={sectionImageStyle(imageUrl)}
              ></div>
              <div className="torn-edge" aria-hidden="true"></div>
              <span className="adventure-badge" aria-hidden="true">
                <LuCompass />
              </span>
            </div>
          </div>
        )}

        {text ? (
          <p className="section-lead">{text}</p>
        ) : (
          <Trans components={{ p: <p />, h3: <h3 className="section-lead" /> }}>
            {data_intro.economia.intro}
          </Trans>
        )}

        <div className="mosaic-list mosaic-list-2">
          <article className="mosaic-card mosaic-yellow mosaic-tilt-2 reveal-item reveal-delay-1">
            <LuTractor className="mosaic-watermark" aria-hidden="true" />
            <LuTractor className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
                h3: <h3 className="story-intro" />,
              }}
            >
              {data_intro.economia.produccion}
            </Trans>
          </article>

          <article className="mosaic-card mosaic-yellow mosaic-tilt-3 reveal-item reveal-delay-2">
            <LuLeaf className="mosaic-watermark" aria-hidden="true" />
            <LuLeaf className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
                h3: <h3 className="story-intro" />,
              }}
            >
              {data_intro.economia.productos}
            </Trans>
          </article>
        </div>

        <Trans
          components={{
            p: <p className="mosaic-closing-text" />,
            strong: <strong className="font-semibold mt-2" />,
          }}
        >
          {data_intro.cierre}
        </Trans>
      </div>
    </section>
  );
};

export default Producciones;
