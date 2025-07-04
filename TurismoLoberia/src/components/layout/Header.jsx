import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaGlobe,
  FaTimes,
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import logoLoberia from "../../assets/icons/logoLoberia.svg";
import "../../styles/Navbar.css";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  const menuData = [
    {
      label: "Partido de Lobería",
      subitems: [
        "Información General",
        "Historia",
        "Naturaleza",
        "Producciones",
        "Cómo Llegar",
      ],
    },
    {
      label: "Ciudad de Lobería",
      subitems: [
        "Información General",
        "Cómo LLegar",
        "Alojamientos",
        "Gastronomía",
        "Transporte",
        "Agenda",
        "Qué Hacer",
        "Descargas",
      ],
    },
    {
      label: "San Manuel",
      subitems: [
        "Información General",
        "Cómo LLegar",
        "Alojamientos",
        "Gastronomía",
        "Transporte",
        "Agenda",
        "Qué Hacer",
        "Descargas",
      ],
    },
    {
      label: "Arenas Verdes",
      subitems: [
        "Información General",
        "Cómo LLegar",
        "Alojamientos",
        "Base de Campamentos",
        "Gastronomía",
        "Transporte",
        "Agenda",
        "Qué Hacer",
        "Descargas",
      ],
    },
  ];

  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <nav className="navbar sticky-top bg-white shadow-sm border-nav navBar primary">
        <div className="container-fluid d-flex align-items-center justify-content-between px-3 py-2">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 m-0"
          >
            <img
              className="logoLoberia"
              src={logoLoberia}
              alt="Lobería"
              width="40"
              height="40"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {menuData.map(({ label }, idx) => (
              <div
                key={idx}
                className="desktop-nav-item d-flex align-items-center gap-1"
              >
                <strong>{label}</strong>
                <FaChevronDown className="primary" size={12} />
              </div>
            ))}
            <strong className="ms-3 d-flex align-items-center gap-1">
              <WiDaySunny className="primary" size={20} title="Clima" />
              Clima
            </strong>
            <div className="d-flex align-items-center gap-1">
              <FaGlobe className="primary" />
              <span>Español</span>
              <span className="primary">▼</span>
            </div>
            <FaSearch
              style={{ cursor: "pointer" }}
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>

          {/* ICONOS Clima e Idioma SOLO en MOBILE */}
          <div className="d-flex align-items-center gap-3 d-md-none">
            <strong className="border-item-nav d-flex align-items-center gap-1">
              <WiDaySunny className="primary" size={20} title="Clima" />
              Clima
            </strong>
            <div className="d-flex align-items-center border-item-nav">
              <FaGlobe className="me-1 primary" />
              <span>Español</span>
              <span className="ms-1 primary">▼</span>
            </div>
          </div>

          {/* HAMBURGUESA SOLO en MOBILE */}
          <button
            className="btn p-0 d-md-none"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* BARRA DE BÚSQUEDA DESPLEGABLE (DESKTOP) */}
      {showSearch && (
        <div className="desktop-search-bar p-3 border-nav d-none d-md-block">
          <div className="container d-flex justify-content-between align-items-center">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Buscar…"
            />
            <button className="btn btn-white">Buscar</button>
          </div>
          </div>
      )}

      {/* PANEL LATERAL (MOBILE) */}
      {showMenu && (
        <div className="mobile-menu d-flex flex-column p-3 pt-5 menu-padding">
          <div className="search-container mb-4">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Buscar..."
            />
            <FaSearch
              style={{ cursor: "pointer" }}
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>
          <ul className="menu-list px-0">
            <li className="menu-item d-flex justify-content-between align-items-center mb-3">
              <strong>Suscribirme</strong> <FaBell />
            </li>

            {menuData.map(({ label, subitems }, idx) => (
              <li key={idx} className="menu-item">
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => toggleItem(label)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{label}</strong>
                  <FaChevronDown
                    className={`arrow text-primary ${openItem === label ? "rotate" : ""}`}
                  />
                </div>

                {openItem === label && subitems.length > 0 && (
                  <ul className="submenu mt-2">
                    {subitems.map((sub, i) => (
                      <li key={i}>
                        <a href="#">{sub}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
