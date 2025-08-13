import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaCloudSun,
  FaGlobe,
  FaSearch,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logoLoberia from "../../assets/icons/logoLoberia.jpg";
import "../../styles/Navbar.css";
import { trackEvent } from "../../analytics";
//import { useLocation } from "react-router-dom";
import Typewriter from "typewriter-effect";

export const Header = () => {
  const { t, i18n } = useTranslation();

  // 🧠 Estados
  const [showMenu, setShowMenu] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent({
      category: "Header",
      action: "Render",
      label: "Componente Header cargado",
    });
  }, []);

  // 🌍 Cambio de idioma
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguage(false);
    trackEvent({
      category: "Idioma",
      action: "Cambio idioma",
      label: lang,
    });
  };

  // 🔍 Enviar búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    const url = query
      ? `/buscador?title=${encodeURIComponent(query)}`
      : "/buscador";

    navigate(url);
    setShowSearch(false);
    setShowMenu(false);
    trackEvent({
      category: "Búsqueda",
      action: "Buscar desde header",
      label: query || "Vacío",
    });
  };

  // 🎯 Scroll transparente
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔐 Cierre al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setOpenItem(null);
        setShowLanguage(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔍 Autofocus en búsqueda
  useEffect(() => {
    if (showSearch) {
      const input = document.querySelector(".desktop-search-bar input");
      if (input) input.focus();
    }
  }, [showSearch]);

  // 🗂️ Menú de navegación traducido
  const menuData = useMemo(
    () => [
      {
        id: "partido_loberia",
        subitems: [
          "informacion_general",
          "historia",
          "naturaleza",
          "producciones",
          "como_llegar",
        ],
      },
      {
        id: "ciudad_loberia",
        subitems: [
          "informacion_general",
          "como_llegar",
          "alojamientos",
          "gastronomia",
          "transporte",
          "agenda",
          "que_hacer",
          "descargas",
        ],
      },
      {
        id: "san_manuel",
        subitems: [
          "informacion_general",
          "como_llegar",
          "alojamientos",
          "gastronomia",
          "transporte",
          "agenda",
          "que_hacer",
          "descargas",
        ],
      },
      {
        id: "arenas_verdes",
        subitems: [
          "informacion_general",
          "como_llegar",
          "alojamientos",
          "base_campamentos",
          "gastronomia",
          "transporte",
          "agenda",
          "que_hacer",
          "descargas",
        ],
      },
    ],
    [i18n.language]
  );

  // 🧩 Generar ruta con hash
  const toHash = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, "-");

  const getSubitemRoute = (sectionId, subKey) => {
    const hash = toHash(subKey);
    switch (sectionId) {
      case "partido_loberia":
        return `/PartidoLoberia#${hash}`;
      case "ciudad_loberia":
        return `/Loberia#${hash}`;
      case "san_manuel":
        return `/SanManuel#${hash}`;
      case "arenas_verdes":
        return `/ArenasVerdes#${hash}`;
      default:
        return "/";
    }
  };

  // 🎛️ UI
  const toggleItem = (item, e) => {
    e?.stopPropagation();
    setOpenItem(openItem === item ? null : item);
    setShowSearch(false);
    setShowLanguage(false);
    trackEvent({
      category: "Menú",
      action: "Abrir sección",
      label: item,
    });
  };

  const toggleLanguage = (e) => {
    e?.stopPropagation();
    setShowLanguage(!showLanguage);
    setOpenItem(null);
    setShowSearch(false);
    trackEvent({
      category: "Menú",
      action: "Abrir menú idioma",
    });
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setOpenItem(null);
    trackEvent({
      category: "Búsqueda",
      action: "Mostrar barra",
    });
  };

  return (
    <>
      <nav
        className={`navbar sticky-top shadow-sm navBar text-nav header border-nav
    ${scrolled ? "nav-transparent-desktop-scroll" : ""}
    ${showMenu ? "nav-menu-open" : ""}
  `}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-3 py-2">
          <div className="logo-container">
            <Link
              to="/"
              className="navbar-brand d-flex align-items-center gap-2 m-0"
            >
              <img className="logoLoberia" src={logoLoberia} alt="Lobería" />
              <div className={`logo-text ${scrolled ? "nav-transparent" : ""}`}>
                <strong className="primary" style={{ fontFamily: 'MADE Tommy Soft, sans-serif', letterSpacing: '0.5px', fontSize: '24px', marginRight: '5px', marginBottom: '3px'}}>Lobería</strong>
                <span className="typewriter-react">
                  <Typewriter
                    options={{
                      strings: [
                        "Patrimonio Vivo",
                        "Cultura",
                        "Historia",
                        "Naturaleza",
                        "Tradición",
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                    }}
                  />
                </span>
              </div>
            </Link>
          </div>

          {/* 🔍 DESKTOP NAV */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {menuData.map(({ id, subitems }, idx) => (
              <div
                key={idx}
                className="desktop-nav-item position-relative"
                onClick={(e) => toggleItem(id, e)}
              >
                <strong>{t(id)}</strong>
                <FaChevronDown
                  className={` transition-arrow${
                    openItem === id ? " rotate" : ""
                  }`}
                  size={12}
                />
                {openItem === id && (
                  <ul className="submenu-desktop position-absolute shadow p-2 mt-2">
                    {subitems.map((subKey, i) => (
                      <li key={i} className="py-1 px-2 nav-subitem">
                        <Link
                          to={getSubitemRoute(id, subKey)}
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenItem(null);
                            setShowMenu(false);
                          }}
                        >
                          {t(subKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Link to="/Clima" className="text-decoration-none text-inherit">
              <strong className="ms-3 d-flex align-items-center gap-1">
                <FaCloudSun className="text-inherit logoNav" />
                <span className="nav-hover-effect">{t("Clima")}</span>
              </strong>
            </Link>

            {/* Menu de idioma */}
            {/* 🌍 Language Switcher */}
            <div
              className="position-relative"
              onClick={toggleLanguage}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-1">
                <FaGlobe />
                <strong className="nav-hover-effect">
                  {i18n.language === "es" ? t("espanol") : t("ingles")}
                </strong>
                <FaChevronDown
                  className={`
                     transition-arrow${showLanguage ? " rotate" : ""}`}
                  size={12}
                />
              </div>
              {showLanguage && (
                <ul
                  className="submenu-desktop position-absolute shadow p-2 mt-2 bg-white"
                  style={{ zIndex: 1000 }}
                >
                  <li
                    className="px-2 py-1"
                    onClick={() => changeLanguage("es")}
                  >
                    {i18n.language === "es" && (
                      <FaCheck className="me-2 text-success" />
                    )}{" "}
                    {t("espanol")}
                  </li>
                  <li
                    className="px-2 py-1"
                    onClick={() => changeLanguage("en")}
                  >
                    {i18n.language === "en" && (
                      <FaCheck className="me-2 text-success" />
                    )}{" "}
                    {t("ingles")}
                  </li>
                </ul>
              )}
            </div>

            <FaSearch className="text-inherit" onClick={handleSearchToggle} />
          </div>

          {/* 🔧 MOBILE ICONOS */}
          <div className="d-flex align-items-center gap-2 d-md-none mobile-icon">
            <strong className="border-item-nav d-flex align-items-center gap-1">
              <Link
                to="/Clima"
                className="text-decoration-none border-item-nav"
              >
                <FaCloudSun className="primary logoNav" />
              </Link>
            </strong>
            <div className="vertical-divider"></div>
            <div className="position-relative">
              <div
                className="d-flex align-items-center border-item-nav"
                onClick={(e) => toggleLanguage(e)}
              >
                <FaGlobe className="me-1 primary" />
                <strong className="primary">
                  {i18n.language === "es" ? t("espanol") : t("ingles")}
                </strong>
                <FaChevronDown
                  className={`primary transition-arrow${
                    showLanguage ? " rotate" : ""
                  }`}
                  size={12}
                />
              </div>
              {showLanguage && (
                <ul
                  className="submenu-mobile position-absolute shadow p-2 mt-2 bg-white"
                  style={{
                    zIndex: 2000,
                    right: 0,
                    minWidth: "100px",
                    whiteSpace: "nowrap",
                    textAlign: "right",
                  }}
                >
                  <li
                    className="px-2 py-1"
                    onClick={() => changeLanguage("es")}
                  >
                    {i18n.language === "es" && (
                      <FaCheck className="me-2 text-success" />
                    )}{" "}
                    {t("espanol")}
                  </li>
                  <li
                    className="px-2 py-1"
                    onClick={() => changeLanguage("en")}
                  >
                    {i18n.language === "en" && (
                      <FaCheck className="me-2 text-success" />
                    )}{" "}
                    {t("ingles")}
                  </li>
                </ul>
              )}
            </div>
            <div className="vertical-divider"></div>
          </div>

          {/* 🍔 HAMBURGUESA */}
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

      {/* 🔍 BARRA DE BÚSQUEDA DESKTOP */}
      {showSearch && (
        <div
          ref={searchRef}
          className="desktop-search-bar p-3 border-nav d-none d-md-block position-sticky"
        >
          <form className="search-desktop-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control me-3"
              placeholder={t("Buscar...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-white" type="submit">
              <FaSearch className="desktop-search-icon" />
            </button>
          </form>
        </div>
      )}

      {/* 📱 PANEL MOBILE */}
      {showMenu && (
        <div className="mobile-menu d-flex flex-column p-3 pt-5 menu-padding">
          <div className="search-container mb-4">
            <form
              className="input-group search-bar-custom"
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.elements.searchMobile.value.trim();
                const url = query
                  ? `/buscador?title=${encodeURIComponent(query)}`
                  : "/buscador";
                window.location.href = url;
              }}
            >
              <input
                name="searchMobile"
                type="text"
                className="form-control search-input"
                placeholder="Buscar..."
              />
              <button
                className="btn-buscador btn btn-outline-secondary"
                type="submit"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          <ul className="menu-list px-0">
            <li className="menu-item d-flex justify-content-between align-items-center mb-3">
              <Link
                to="/Suscribirse"
                className="d-flex justify-content-between align-items-center text-decoration-none"
                onClick={() => setShowMenu(false)}
              >
                <strong className="text-white">{t("suscribirme")}</strong>
                <FaBell className="text-white bell-icon" />
              </Link>
            </li>
            {menuData.map(({ id, subitems }, idx) => (
              <li key={idx} className="menu-item">
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={(e) => toggleItem(id, e)}
                >
                  <strong>{t(id)}</strong>
                  <FaChevronDown
                    className={`arrow${openItem === id ? " rotate" : ""}`}
                  />
                </div>
                {openItem === id && (
                  <ul className="submenu mt-2">
                    {subitems.map((sub, i) => (
                      <li key={i}>
                        <Link
                          to={getSubitemRoute(id, sub)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenItem(null);
                            setShowMenu(false);
                          }}
                        >
                          {t(sub)}
                        </Link>
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
