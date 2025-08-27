// src/pages/Invites.jsx
import React from "react";
import "../styles/invites.css";
import { useTranslation } from "react-i18next";
import invitesImg from "../assets/images/invites.jpg";

const Invites = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="invites" key={i18n.language}>
      <div className="portada-invites">
        <h1>{t("titulo_invites")}</h1>
        <img src={invitesImg} alt="Lobería Te Invita" />
      </div>
      <div className="content-invites">
        <p>{t("p1_invites")}</p>
        <p>{t("p2_invites")}</p>
        <p>
          {t("p3_invites")}
        </p>
        <p>{t("link_invites")}
            <a
            href="https://forms.gle/kmbozSt448xEVYC57"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("link_aqui")}
          </a></p>
      </div>
    </div>
  );
};

export default Invites;