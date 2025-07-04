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
        "Cómo Llegar",
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
        "Cómo Llegar",
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
        "Cómo Llegar",
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
            {menuData.map(({ label, subitems }, idx) => (
              <div
                key={idx}
                className="desktop-nav-item d-flex align-items-center gap-1 position-relative"
                onClick={() => toggleItem(label)}
                style={{ cursor: "pointer" }}
              >
                <strong>{label}</strong>
                <FaChevronDown className={`primary transition-arrow${openItem === label ? ' rotate' : ''}`} size={12} />
                {openItem === label && subitems && subitems.length > 0 && (
                  <ul className="submenu-desktop position-absolute shadow p-2 mt-2">
                    {subitems.map((sub, i) => (
                      <li key={i} className="py-1 px-2 nav-subitem">
                        <a href="#" className="text-decoration-none">{sub}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <strong className="ms-3 d-flex align-items-center gap-1">
              <WiDaySunny className="primary" size={20} title="Clima" />
              Clima
            </strong>
            <div className="d-flex align-items-center gap-1">
              <FaGlobe />
              <span>Español</span>
              <span>▼</span>
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
            </strong>
            <div className="d-flex align-items-center border-item-nav">
              <FaGlobe className="me-1" />
              <span>Español</span>
              <span className="ms-1">▼</span>
            </div>
          </div>

          {/* HAMBURGUESA SOLO en MOBILE */}
          <button
            className="btn p-0 d-md-none primary"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <FaTimes className="primary" size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* BARRA DE BÚSQUEDA DESPLEGABLE (DESKTOP) */}
      {showSearch && (
        <div className="desktop-search-bar p-3 border-nav d-none d-md-block position-sticky">
          <div className="container d-flex justify-content-between align-items-center">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Buscar…"
            />
            <button className="btn btn-white">
              <FaSearch className="desktop-search-icon"/>
            </button>
          </div>
        </div>
      )}

      {/* PANEL LATERAL (MOBILE) */}
      {showMenu && (
        <div className="mobile-menu d-flex flex-column p-3 pt-5 menu-padding">
          <div className="search-container mb-4">
            <div className="input-group search-bar-custom">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar..."
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowSearch(!showSearch)}
              >
                <FaSearch />
              </button>
            </div>
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
                    className={`arrow${openItem === label ? " rotate" : ""}`}
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
