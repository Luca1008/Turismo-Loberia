import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { LuLandmark, LuTrainFront, LuTrophy, LuMap, LuCompass, LuLeaf, LuMountain } from "react-icons/lu";
import { useSectionOverride, sectionImageStyle } from "../../../hooks/useSectionOverride";
import "../../../styles/storySection.css";
import "../../../styles/partidoPhotoFrame.css";
import "../../../styles/partidoSectionBg.css";
import "../../../styles/mosaicSection.css";

const Historia = () => {
  const { t } = useTranslation();
  const data_intro = t("intro_partido_loberia", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("partido_loberia", "historia");

  return (
    <section id="historia" className="information bg-pattern-landmark">
      <LuLeaf className="deco-float" aria-hidden="true" style={{ top: "10%", left: "4%", fontSize: "3rem" }} />
      <LuMountain className="deco-float" aria-hidden="true" style={{ top: "45%", right: "6%", fontSize: "2.5rem", animationDelay: "1s" }} />

      <div className="section-inner">
        <div className="title-wrap">
          <div className="section-eyebrow">
            <LuMap aria-hidden="true" />
            <span>{t("descubri_loberia")}</span>
          </div>
          <h2>{t("historia")}</h2>
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
                className="photo-historia-partido-loberia"
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
          {data_intro.cultura.titulo}
        </Trans>

        <div className="mosaic-list">
          <article className="mosaic-card mosaic-orange mosaic-tilt-1 reveal-item reveal-delay-1">
            <LuLandmark className="mosaic-watermark" aria-hidden="true" />
            <LuLandmark className="mosaic-card-icon" aria-hidden="true" />
            {text ? (
              <p className="mosaic-copy">{text}</p>
            ) : (
              <Trans
                components={{
                  p: <p className="mosaic-copy" />,
                  strong: <strong className="mosaic-label" />,
                  h3: <h3 className="story-intro" />,
                }}
              >
                {data_intro.cultura.identidad}
              </Trans>
            )}
          </article>

          <article className="mosaic-card mosaic-orange mosaic-tilt-2 reveal-item reveal-delay-2">
            <LuTrainFront className="mosaic-watermark" aria-hidden="true" />
            <LuTrainFront className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
                h3: <h3 className="story-intro" />,
              }}
            >
              {data_intro.cultura.historia}
            </Trans>
          </article>

          <article className="mosaic-card mosaic-orange mosaic-tilt-3 reveal-item reveal-delay-3">
            <LuTrophy className="mosaic-watermark" aria-hidden="true" />
            <LuTrophy className="mosaic-card-icon" aria-hidden="true" />
            <Trans
              components={{
                p: <p className="mosaic-copy" />,
                strong: <strong className="mosaic-label" />,
                h3: <h3 className="story-intro" />,
              }}
            >
              {data_intro.cultura.talento}
            </Trans>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Historia;
