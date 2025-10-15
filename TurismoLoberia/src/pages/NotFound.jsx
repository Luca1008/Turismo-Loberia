// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/not-found.css';
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">{t("page_not_found")}</h2>
        <p className="not-found-message">
        {t("sorry_not_found")}
        </p>
        <Link to="/" className="not-found-link">
         {t("back_index")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;