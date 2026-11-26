import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { FaCar } from "react-icons/fa";
import { LuMapPin, LuMap, LuCompass } from "react-icons/lu";
import { useSectionOverride } from "../../../hooks/useSectionOverride";
import CityPhoto from "../../../components/common/CityPhoto";
import comoLlegarImg from "../../../assets/images/arenas_verdes/como_llegar.jpg";
import "../../../styles/storySection.css";
import "../../../styles/mosaicSection.css";
import "../../../styles/comoLlegarPartido.css";

const ComoLlegar = () => {
  const { t } = useTranslation();
  const data_arenas = t("descripcion_arenas_verdes", { returnObjects: true });
  const { text, imageUrl } = useSectionOverride("arenas_verdes", "como_llegar");

  return (
    <section className="go-to" id="como_llegar">
      <div className="title-wrap">
        <div className="section-eyebrow">
          <LuMap aria-hidden="true" />
          <span>{t("descubri_loberia")}</span>
        </div>
        <h2>{t("como_llegar")}</h2>
        <div className="title-underline"></div>
      </div>

      <div className="photo-container reveal-item">
        <div className="photo-frame-adventure">
          <CityPhoto src={imageUrl || comoLlegarImg} alt={t("como_llegar")} />
          <div className="torn-edge" aria-hidden="true"></div>
          <span className="adventure-badge" aria-hidden="true">
            <LuCompass />
          </span>
        </div>
      </div>
      <h3 className="section-subheading">
        <FaCar aria-hidden="true" />
        {t("en_auto")}
      </h3>
      {text ? (
        <p className="story-intro">{text}</p>
      ) : (
        <Trans components={{ p: <p className="story-intro" />, h3: <h3 className="story-intro" /> }}>{data_arenas.como_llegar_intro}</Trans>
      )}
      <div className="fact-list">
        <article className="fact-block">
          <span className="fact-icon is-orange" aria-hidden="true">
            <LuMapPin />
          </span>
          <div className="fact-copy tint-orange">
            <Trans components={{ p: <p />, strong: <strong />, h3: <h3 className="story-intro" /> }}>
              {data_arenas.desde_loberia}
            </Trans>
          </div>
        </article>
        <article className="fact-block">
          <span className="fact-icon is-orange" aria-hidden="true">
            <LuMapPin />
          </span>
          <div className="fact-copy tint-orange">
            <Trans components={{ p: <p />, strong: <strong />, h3: <h3 className="story-intro" /> }}>
              {data_arenas.desde_necochea}
            </Trans>
          </div>
        </article>
        <article className="fact-block">
          <span className="fact-icon is-orange" aria-hidden="true">
            <LuMapPin />
          </span>
          <div className="fact-copy tint-orange">
            <Trans components={{ p: <p />, strong: <strong />, h3: <h3 className="story-intro" /> }}>
              {data_arenas.desde_mar_del_plata}
            </Trans>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ComoLlegar;
