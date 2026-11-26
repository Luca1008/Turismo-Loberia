import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { FaCar, FaBus } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { LuMap, LuMapPin } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import "../../../styles/storySection.css";
import "../../../styles/partidoSectionBg.css";
import "../../../styles/mosaicSection.css";
import "../../../styles/comoLlegarPartido.css";

const ComoLlegar = () => {
  const { t } = useTranslation();
  const { text } = useSectionOverride("partido_loberia", "como_llegar");
  const carRoutes = Object.values(
    t("como_llegar_partido_loberia", { returnObjects: true })
  );

  return (
    <section className="go-to bg-pattern-pin" id="como_llegar">
      <div className="section-inner">
        <div className="title-wrap">
          <div className="section-eyebrow">
            <LuMap aria-hidden="true" />
            <span>{t("descubri_loberia")}</span>
          </div>
          <h2>{t("como_llegar")}</h2>
          <div className="title-underline"></div>
        </div>

        {/* Llegar en auto */}
        <h3 className="section-subheading">
          <FaCar aria-hidden="true" />
          {t("en_auto")}
        </h3>

        <div className="fact-list">
          {carRoutes.map((item, index) => {
            return (
              <article key={index} className="fact-block">
                <span className="fact-icon is-orange" aria-hidden="true">
                  <LuMapPin />
                </span>
                <div className="fact-copy tint-orange">
                  <h4 className="fact-title">{item.descripcion}</h4>
                  {Array.isArray(item.rutas) && (
                    <ul className="fact-routes">
                      {item.rutas.map((ruta, i) => (
                        <li key={i}>{ruta}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <Trans
          i18nKey="intro_2_como_llegar_partido_loberia"
          parent="h3"
          className="story-intro"
          components={{ br: <br /> }}
        />

        {/* Llegar en micro */}
        <h3 className="section-subheading">
          <FaBus aria-hidden="true" />
          {t("en_micro")}
        </h3>

        <Trans
          i18nKey="descripcion_en_micro"
          parent="h3"
          className="story-intro"
          components={{ br: <br /> }}
        />

        <div className="fact-list">
          <article className="fact-block">
            <span className="fact-icon is-orange" aria-hidden="true">
              <FaClock />
            </span>
            <div className="fact-copy tint-orange">
              <Trans i18nKey="opcion_desde_buenos_aires" components={{ br: <br /> }} />
            </div>
          </article>

          <article className="fact-block">
            <span className="fact-icon is-orange" aria-hidden="true">
              <FaClock />
            </span>
            <div className="fact-copy tint-orange">
              <Trans i18nKey="opcion_desde_mar_del_plata" components={{ br: <br /> }} />
            </div>
          </article>
        </div>

        <blockquote className="mosaic-quote">
          {text || t("cierre_como_llegar_partido_loberia")}
        </blockquote>
      </div>
    </section>
  );
};

export default ComoLlegar;
