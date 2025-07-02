import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import {
  FaBars,
  FaGlobe,
  FaTimes,
  FaChevronDown,
  FaBell,
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

  return (
    <>
      <nav className="navbar fixed-top bg-white shadow-sm border-nav navBar">
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

          <div className="d-flex align-items-center gap-3">
            <WiDaySunny className="border-item-nav" size={24} title="Clima" />
            <div className="d-flex align-items-center border-item-nav">
              <FaGlobe className="me-1" />
              <span>Español</span>
              <span className="ms-1">▼</span>
            </div>
            <button className="btn p-0" onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {showMenu && (
  <div className="mobile-menu d-flex flex-column p-3 pt-5">
    <div className="search-container mb-4">
      <input
        type="text"
        className="form-control search-input"
        placeholder="Buscar..."
      />
      <FaSearch className="search-icon" />
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
                    className={`arrow ${openItem === label ? "rotate" : ""}`}
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
