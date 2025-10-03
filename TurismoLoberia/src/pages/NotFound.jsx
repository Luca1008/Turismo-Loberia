// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/not-found.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página No Encontrada</h2>
        <p className="not-found-message">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link to="/" className="not-found-link">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;