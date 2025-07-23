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
import { useTranslation } from 'react-i18next';
import logoLoberia from "../../assets/icons/logoLoberia.svg";
import "../../styles/Navbar.css";

export const Header = () => {
  // ===== Estados principales
  const [showMenu, setShowMenu] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // 🧠 Este debe ir arriba
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();


  // ===== Cambio de idioma
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguage(false);
  };

  // ===== Navegación con parámetros de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscador?title=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setShowMenu(false);
    }
  };

  // ===== Scroll transparente
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== Cierre de submenús si haces click fuera
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

  // ===== Enfocar el input al abrir buscador
  useEffect(() => {
    if (showSearch) {
      const input = document.querySelector(".desktop-search-bar input");
      if (input) input.focus();
    }
  }, [showSearch]);

  // ===== Menú de navegación
  const menuData = useMemo(() => [
    {
      label: t("Partido de Lobería"),
      subitems: [t("Información General"), t("Historia"), t("Naturaleza"), t("Producciones"), t("Cómo Llegar")],
    },
    {
      label: t("Ciudad de Lobería"),
      subitems: [t("Información General"), t("Cómo Llegar"), t("Alojamientos"), t("Gastronomía"), t("Transporte"), t("Agenda"), t("Qué Hacer"), t("Descargas")],
    },
    {
      label: t("San Manuel"),
      subitems: [t("Información General"), t("Cómo Llegar"), t("Alojamientos"), t("Gastronomía"), t("Transporte"), t("Agenda"), t("Qué Hacer"), t("Descargas")],
    },
    {
      label: t("Arenas Verdes"),
      subitems: [t("Información General"), t("Cómo Llegar"), t("Alojamientos"), t("Base de Campamentos"), t("Gastronomía"), t("Transporte"), t("Agenda"), t("Qué Hacer"), t("Descargas")],
    },
  ], [i18n.language]);

  const toHash = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  const getSubitemRoute = (label, sub) => {
    const hash = toHash(sub);
    switch (label) {
      case "Partido de Lobería": return `/PartidoLoberia#${hash}`;
      case "Ciudad de Lobería": return `/Loberia#${hash}`;
      case "San Manuel": return `/SanManuel#${hash}`;
      case "Arenas Verdes": return `/ArenasVerdes#${hash}`;
      default: return "/";
    }
  };

  // ===== Toggle acciones
  const toggleItem = (item, e) => {
    e?.stopPropagation();
    setOpenItem(openItem === item ? null : item);
    setShowSearch(false);
    setShowLanguage(false);
  };

  const toggleLanguage = (e) => {
    e?.stopPropagation();
    setShowLanguage(!showLanguage);
    setOpenItem(null);
    setShowSearch(false);
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setOpenItem(null);
  };

  return (
    <>
      {/* 🧭 NAVBAR PRINCIPAL */}
      <nav ref={navRef} className={`navbar sticky-top shadow-sm border-nav navBar primary header ${scrolled ? "nav-transparent" : ""}`}>
        <div className="container-fluid d-flex align-items-center justify-content-between px-3 py-2">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0">
            <img className="logoLoberia" src={logoLoberia} alt="Lobería" />
          </Link>

          {/* 🔍 DESKTOP NAV */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {menuData.map(({ label, subitems }, idx) => (
              <div key={idx} className="desktop-nav-item position-relative" onClick={(e) => toggleItem(label, e)}>
                <strong>{label}</strong>
                <FaChevronDown className={`primary transition-arrow${openItem === label ? " rotate" : ""}`} size={12} />
                {openItem === label && (
                  <ul className="submenu-desktop position-absolute shadow p-2 mt-2">
                    {subitems.map((sub, i) => (
                      <li key={i} className="py-1 px-2 nav-subitem">
                        <Link to={getSubitemRoute(label, sub)} className="text-decoration-none" onClick={(e) => {
                          e.stopPropagation();
                          setOpenItem(null);
                          setShowMenu(false);
                        }}>
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Link to="/Clima" className="text-decoration-none">
              <strong className="ms-3 d-flex align-items-center gap-1">
                <FaCloudSun className="primary logoNav" />
                <span className="nav-hover-effect">{t("Clima")}</span>
              </strong>
            </Link>
            {/* Menu de idioma */}
            {/* 🌍 Language Switcher */}
            <div className="position-relative" onClick={toggleLanguage} style={{ cursor: "pointer" }}>
              <div className="d-flex align-items-center gap-1">
                <FaGlobe />
                <strong className="nav-hover-effect">{i18n.language === "es" ? "Español" : "English"}</strong>
                <FaChevronDown className={`primary transition-arrow${showLanguage ? " rotate" : ""}`} size={12} />
              </div>
              {showLanguage && (
                <ul className="submenu-desktop position-absolute shadow p-2 mt-2 bg-white" style={{ zIndex: 1000 }}>
                  <li className="px-2 py-1" onClick={() => changeLanguage("es")}>
                    {i18n.language === "es" && <FaCheck className="me-2 text-success" />} Español
                  </li>
                  <li className="px-2 py-1" onClick={() => changeLanguage("en")}>
                    {i18n.language === "en" && <FaCheck className="me-2 text-success" />} English
                  </li>
                </ul>
              )}
            </div>


            <FaSearch className="search-icon-nav" onClick={handleSearchToggle} />
          </div>

          {/* 🔧 MOBILE ICONOS */}
          <div className="d-flex align-items-center gap-2 d-md-none mobile-icon">
            <strong className="border-item-nav d-flex align-items-center gap-1">
              <FaCloudSun className="primary logoNav" />
            </strong>
            <div className="vertical-divider"></div>
            <div className="d-flex align-items-center border-item-nav" onClick={(e) => toggleLanguage(e)}>
              <FaGlobe className="me-1" />
              <span>Español</span>
              <FaChevronDown className={`primary transition-arrow${showLanguage ? " rotate" : ""}`} size={12} />
            </div>
            <div className="vertical-divider"></div>
          </div>

          {/* 🍔 HAMBURGUESA */}
          <button className="btn p-0 d-md-none primary" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <FaTimes className="primary" size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* 🔍 BARRA DE BÚSQUEDA DESKTOP */}
      {showSearch && (
        <div ref={searchRef} className="desktop-search-bar p-3 border-nav d-none d-md-block position-sticky">
          <form className="search-desktop-form" onSubmit={handleSearchSubmit}>
            <input type="text" className="form-control me-3" placeholder={t("Buscar...")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
            <form className="input-group search-bar-custom" onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.elements.searchMobile.value;
              if (query.trim()) {
                window.location.href = `/buscador?title=${encodeURIComponent(query.trim())}`;
              }
            }}>
              <input name="searchMobile" type="text" className="form-control search-input" placeholder="Buscar..." />
              <button className="btn-buscador btn btn-outline-secondary" type="submit">
                <FaSearch />
              </button>
            </form>
          </div>
          <ul className="menu-list px-0">
            <li className="menu-item d-flex justify-content-between align-items-center mb-3">
              <strong>Suscribirme</strong> <FaBell />
            </li>
            {menuData.map(({ label, subitems }, idx) => (
              <li key={idx} className="menu-item">
                <div className="d-flex justify-content-between align-items-center" onClick={(e) => toggleItem(label, e)}>
                  <strong>{label}</strong>
                  <FaChevronDown className={`arrow${openItem === label ? " rotate" : ""}`} />
                </div>
                {openItem === label && (
                  <ul className="submenu mt-2">
                    {subitems.map((sub, i) => (
                      <li key={i}>
                        <Link to={getSubitemRoute(label, sub)} onClick={(e) => {
                          e.stopPropagation();
                          setOpenItem(null);
                          setShowMenu(false);
                        }}>
                          {sub}
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
