import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  FaArrowRight,
  FaBars,
  FaBell,
  FaCheck,
  FaChevronDown,
  FaCloudSun,
  FaGlobe,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { trackEvent } from "../../analytics";
import logoLoberia from "../../assets/icons/logoLoberia.jpg";
import { Global } from "../../helpers/Global";
import "../../styles/navBar.css";

/**
 * Hook para detectar clics fuera de un elemento.
 * @param {React.RefObject} ref - Referencia al elemento.
 * @param {Function} callback - Función a ejecutar al hacer clic fuera.
 */
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Usar 'click' en lugar de 'mousedown' para evitar cerrar antes del onClick de React
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};

/**
 * Componente `Header`
 *
 * Navbar del sitio web con:
 * - Logo con animación tipo typewriter.
 * - Menú desktop y mobile con subitems.
 * - Selector de idioma con tracking de eventos.
 * - Barra de búsqueda con sugerencias de título o categoría.
 * - Tracking de eventos de Google Analytics en todos los clics relevantes.
 *
 * @component
 * @example
 * <Header />
 *
 * @returns {JSX.Element} Navbar responsive con búsqueda, menú y selección de idioma.
 */
export const Header = () => {
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navRef = useRef(null);
  const languageRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  /** Rutas donde el navbar es transparente */
  const transparentRoutes = [
    "/Suscribirse",
    "/Clima",
    "/Contacto",
    "/Buscador",
    "/Admin",
    "/PanelAdmin",
    "/PanelAdmin/modificar-datos",
    "/PanelAdmin/crear-admin",
    "/PanelAdmin/listar-admins",
    "/recuperar-password",
    "/reset-password/:token",
    "/Register",
    "/cards/:id",
    "/unsubscribe/:token",
  ];

  const isTransparentRoute = transparentRoutes.some((route) =>
    route.includes(":")
      ? location.pathname.startsWith(route.split("/:")[0])
      : location.pathname === route
  );

  /** Categorías disponibles para sugerencias de búsqueda */
  const categoriasDisponibles = useMemo(
    () => [
      "Alojamiento",
      "Gastronomia",
      "Cultura",
      "Evento",
      "Interes",
      "Artesanos",
      "ServPublicos",
      "InfoUtil",
    ],
    []
  );

  useClickOutside(navRef, () => {
    if (showMenu) return; // Evitar cerrar submenús cuando el menú móvil está abierto
    setOpenItem(null);
  });

  useClickOutside(languageRef, () => {
    setShowLanguage(false);
  });

  useClickOutside(searchRef, () => {
    setShowSearch(false);
    setSuggestions([]);
  });

  /** Track de render del componente */
  useEffect(() => {
    trackEvent({
      category: "Header",
      action: "Render",
      label: "Componente Header cargado",
    });
  }, []);

  /**
   * Obtiene sugerencias de búsqueda por título o categoría.
   * @param {string} texto - Texto ingresado en el input.
   */
  const fetchSuggestions = useCallback(
    async (texto) => {
      try {
        const response = await axios.get(`${Global.url}cards`, {
          params: { title: texto, limit: 5 },
        });

        const titles =
          response.data.cards?.map((c) => ({
            type: "title",
            id: c.id,
            value: c.card_title,
          })) || [];

        const categories = categoriasDisponibles
          .filter((cat) => cat.toLowerCase().includes(texto.toLowerCase()))
          .map((cat) => ({ type: "category", value: cat }));

        setSuggestions([...titles, ...categories]);
      } catch (error) {
        console.error("Error al obtener sugerencias:", error);
        setSuggestions([]);
      }
    },
    [categoriasDisponibles]
  );

  /** Maneja click en una sugerencia */
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 🔹 Click en sugerencia
  const handleSuggestionClick = (s) => {
    if (s.type === "title") {
      setSearchQuery(s.value);
      setTimeout(() => {
        const form = document.querySelector(".search-desktop-form");
        if (form) {
          form.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }
      }, 100);
    } else if (s.type === "category") {
      navigate(`/buscador?category=${encodeURIComponent(s.value)}`);
      setShowSearch(false);
      setSuggestions([]);
    }
  };

  /** Cambia idioma y trackea */
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguage(false);
    trackEvent({
      category: "Idioma",
      action: "Cambio idioma",
      label: lang,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    const url = query
      ? `/buscador?title=${encodeURIComponent(query)}`
      : "/buscador";

    navigate(url);
    setShowSearch(false);
    setSuggestions([]);
    setShowMenu(false);
    trackEvent({
      category: "Búsqueda",
      action: "Buscar desde header",
      label: query || "Vacío",
    });
  };

  /** Detecta scroll para efecto sticky */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Auto-focus input search al abrir barra */
  useEffect(() => {
    if (showSearch) {
      const timer = setTimeout(() => {
        const input = document.querySelector(".desktop-search-bar input");
        if (input) input.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSearch]);

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

  /** Genera hash amigable para subitems del menú */
  const toHash = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, "-");

  /** Obtiene ruta para cada subitem del menú */
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

  /** Toggle de menú desktop/mobile */
  const toggleItem = (item, e) => {
    e?.stopPropagation();
    setOpenItem(openItem === item ? null : item);
    setShowSearch(false);
    setShowLanguage(false);
    setSuggestions([]);
    trackEvent({
      category: "Menú",
      action: "Abrir sección",
      label: item,
    });
  };

  /** Toggle menú de idioma */
  const toggleLanguage = (e) => {
    e?.stopPropagation();
    setShowLanguage(!showLanguage);
    setOpenItem(null);
    setShowSearch(false);
    setSuggestions([]);
    trackEvent({
      category: "Menú",
      action: "Abrir menú idioma",
    });
  };

  /** Toggle barra de búsqueda - CORREGIDO */
  const handleSearchToggle = (e) => {
    if (e) e.stopPropagation(); // Prevenir propagación del evento
    
    setShowSearch(!showSearch); // Alternar entre mostrar/ocultar
    setOpenItem(null);
    setShowLanguage(false);
    
    if (!showSearch) {
      setSuggestions([]);
    }
    
    trackEvent({
      category: "Búsqueda",
      action: showSearch ? "Ocultar barra" : "Mostrar barra",
    });
  };

  /** Reset estado al click en logo */
  const handleLogoClick = () => {
    setShowMenu(false);
    setOpenItem(null);
    setShowLanguage(false);
    setShowSearch(false);
    setSuggestions([]);

    trackEvent({
      category: "Navegación",
      action: "Clic en logo",
      label: "Volver al inicio",
    });
  };

  // 🔹 Render JSX
  return (
    <>
      {/** ==================== NAVBAR PRINCIPAL ==================== */}
      <nav
        ref={navRef}
        className={`navbar sticky-top shadow-sm navBar text-nav header border-nav
          ${
            isTransparentRoute
              ? "nav-transparent-desktop-scroll"
              : scrolled
              ? "nav-transparent-desktop-scroll"
              : ""
          }
          ${showMenu ? "nav-menu-open" : ""}
        `}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-3 py-2">
          
          {/** Logo */}
          <div className="logo-container">
            <Link
              to="/"
              className="navbar-brand d-flex align-items-center gap-2 m-0"
              onClick={handleLogoClick}
            >
              {/** Imagen del logo */}
              <img className="logoLoberia" src={logoLoberia} alt="Lobería" />
              
              {/** Texto del logo con efecto Typewriter */}
              <div className={`logo-text loberia ${scrolled ? "nav-transparent" : ""}`}>
                <strong
                  className="primary"
                  style={{
                    fontFamily: "MADE Tommy Soft, sans-serif",
                    letterSpacing: "0.5px",
                    fontSize: "24px",
                    marginRight: "5px",
                    marginBottom: "3px",
                  }}
                >
                  Lobería
                </strong>
                <span className="typewriter-react">
                  <Typewriter
                    options={{
                      strings: [
                        t("patrimonio"),
                        t("cultura"),
                        t("historia"),
                        t("naturaleza"),
                        t("tradicion"),
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

          {/** ==================== NAV DESKTOP ==================== */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {menuData.map(({ id, subitems }, idx) => (
              <div
                key={idx}
                className="desktop-nav-item position-relative"
                onClick={(e) => toggleItem(id, e)}
              >
                {/** Nombre del item principal */}
                <strong>{t(id)}</strong>
                
                {/** Icono de flecha desplegable */}
                <FaChevronDown
                  className={`transition-arrow${openItem === id ? " rotate" : ""}`}
                  size={12}
                />

                {/** Submenu desplegable */}
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

            {/** Link a la sección Clima */}
            <Link to="/Clima" className="text-decoration-none text-inherit">
              <strong className="ms-3 d-flex align-items-center gap-1">
                <FaCloudSun className="text-inherit logoNav" />
                <span className="nav-hover-effect">{t("Clima")}</span>
              </strong>
            </Link>

            {/** Selector de idioma */}
            <div
              ref={languageRef}
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
                  className={`transition-arrow${showLanguage ? " rotate" : ""}`}
                  size={12}
                />
              </div>

              {showLanguage && (
                <ul
                  className="submenu-desktop position-absolute shadow p-2 mt-2 bg-white"
                  style={{ zIndex: 1000 }}
                >
                  <li className="px-2 py-1" onClick={() => changeLanguage("es")}>
                    {i18n.language === "es" && <FaCheck className="me-2 text-success" />}
                    {t("espanol")}
                  </li>
                  <li className="px-2 py-1" onClick={() => changeLanguage("en")}>
                    {i18n.language === "en" && <FaCheck className="me-2 text-success" />}
                    {t("ingles")}
                  </li>
                </ul>
              )}
            </div>

            {/** Botón mostrar/ocultar barra de búsqueda - CORREGIDO */}
            {showSearch ? (
              <FaTimes
                className="text-inherit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchToggle(e);
                }}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaSearch
                className="text-inherit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchToggle(e);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          {/** ==================== NAV MOBILE ==================== */}
          <div className="d-flex align-items-center gap-2 d-md-none mobile-icon">
            {/** Clima mobile */}
            <strong className="border-item-nav d-flex align-items-center gap-1">
              <Link to="/Clima" className="text-decoration-none border-item-nav">
                <FaCloudSun className="primary logoNav" />
              </Link>
            </strong>
            <div className="vertical-divider"></div>

            {/** Selector de idioma mobile */}
            <div className="position-relative">
              <div className="d-flex align-items-center border-item-nav" onClick={(e) => toggleLanguage(e)}>
                <FaGlobe className="me-1 primary" />
                <strong className="primary">
                  {i18n.language === "es" ? t("espanol") : t("ingles")}
                </strong>
                <FaChevronDown
                  className={`primary transition-arrow${showLanguage ? " rotate" : ""}`}
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
                  <li className="px-2 py-1" onClick={() => changeLanguage("es")}>
                    {i18n.language === "es" && <FaCheck className="me-2 text-success" />}
                    {t("espanol")}
                  </li>
                  <li className="px-2 py-1" onClick={() => changeLanguage("en")}>
                    {i18n.language === "en" && <FaCheck className="me-2 text-success" />}
                    {t("ingles")}
                  </li>
                </ul>
              )}
            </div>
            <div className="vertical-divider"></div>
          </div>

          {/** Botón hamburguesa para abrir/ocultar menú mobile */}
          <button className="btn p-0 d-md-none primary" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <FaTimes className="primary" size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/** ==================== BARRA DE BÚSQUEDA DESKTOP ==================== */}
      {showSearch && (
        <div
          ref={searchRef}
          className="desktop-search-bar p-3 border-nav d-none d-md-block position-sticky"
          style={{ zIndex: 1050 }}
        >
          <form className="search-desktop-form position-relative" onSubmit={handleSearchSubmit}>
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

          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown-index">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="suggestion-item p-2 cursor-pointer d-flex justify-content-between align-items-center"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <span>{s.value}</span>
                  <span className="suggestion-type text-muted small">
                    <FaArrowRight className="me-1" />
                    {s.type === "title" ? "Título" : "Categoría"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/** ==================== MENÚ MOBILE ==================== */}
      {showMenu && (
        <div className="mobile-menu d-flex flex-column p-3 pt-5 menu-padding">
          {/** Barra de búsqueda mobile */}
          <div className="search-container mb-4 position-relative">
            <form
              className="input-group search-bar-custom"
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.elements.searchMobile.value.trim();
                const url = query ? `/Buscador?title=${encodeURIComponent(query)}` : "/Buscador";
                navigate(url);
                setShowMenu(false);
              }}
            >
              <input
                name="searchMobile"
                type="text"
                className="form-control search-input"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn-buscador btn btn-outline-secondary" type="submit">
                <FaSearch />
              </button>
            </form>

            {suggestions.length > 0 && (
              <ul className="suggestions-dropdown-mobile position-absolute start-0 end-0 bg-white shadow rounded mt-1">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="suggestion-item p-2 cursor-pointer d-flex justify-content-between align-items-center"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    <span>{s.value}</span>
                    <span className="suggestion-type text-muted small">
                      <FaArrowRight className="me-1" />
                      {s.type === "title" ? "Título" : "Categoría"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/** Menú principal mobile */}
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
                <div className="d-flex justify-content-between align-items-center" onClick={(e) => toggleItem(id, e)}>
                  <strong>{t(id)}</strong>
                  <FaChevronDown className={`arrow${openItem === id ? " rotate" : ""}`} />
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
