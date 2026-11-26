import { useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  FaPencilAlt,
  FaUserCheck,
  FaUsersCog,
} from "react-icons/fa";
import {
  LuChartColumn,
  LuList,
  LuFilePlus,
  LuImage,
  LuGalleryHorizontalEnd,
  LuMail,
  LuLogOut,
  LuSettings,
} from "react-icons/lu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "../components/layout/Create";
import Edit from "../components/layout/Edit";
import { useAuth } from "../hooks/useAuth.jsx";
import "../styles/panelAdmin.css";
import Searcher from "./Searcher";
import AdminDashboard from "../components/layout/panel-admin/AdminDashboard.jsx";
import SendContent from "../components/layout/panel-admin/SendContent";
import EditarSecciones from "../components/layout/panel-admin/EditarSecciones";
import { Global } from "../helpers/Global.js";

/**
 * Secciones del panel, agrupadas y en el orden en que aparecen en el
 * sidebar. Cada una es una "pestaña": solo la sección activa se
 * renderiza en `<main>`, en vez del viejo esquema de todo apilado con
 * scroll a anclas.
 */
const GENERAL_TABS = [
  { id: "estadisticas", label: "Estadísticas", icon: LuChartColumn },
  { id: "gestionar-contenido", label: "Gestionar contenido", icon: LuList },
  { id: "crear-contenido", label: "Crear contenido", icon: LuFilePlus },
];

const CONFIG_TABS = [
  { id: "editar-secciones", label: "Editar secciones", icon: LuImage, superadminOnly: true },
  { id: "modificar-carrusel", label: "Carrusel de portada", icon: LuGalleryHorizontalEnd },
  { id: "enviar-suscripciones", label: "Enviar contenido", icon: LuMail },
];

/**
 * Componente `PanelAdmin`
 *
 * Este componente representa el panel de administración de la aplicación.
 * Permite a los usuarios autenticados con roles adecuados:
 * - Gestionar contenido existente
 * - Crear nuevo contenido
 * - Editar tarjetas de contenido
 * - Modificar el carrusel de portada por ciudad
 * - Enviar contenido a suscriptores
 * - Ver estadísticas
 * - Configurar sus datos de usuario
 * - Administrar otros administradores (solo superadmin)
 *
 * Estructura: un sidebar fijo con una pestaña por sección (`activeTab`)
 * y un topbar con breadcrumb + accesos a Ajustes/Cerrar sesión — solo la
 * sección activa se muestra en el contenido principal.
 *
 * Funcionalidades principales:
 * - Uso de `useAuth` para autenticación y logout
 * - Navegación programática con `useNavigate`
 * - Estado y gestión de modales (`showEditModal`, `show`)
 * - Manejo de carrusel de portada con imagen personalizada o default
 * - Notificaciones con `react-toastify`
 *
 * Hooks utilizados:
 * - `useState` para manejar estado de la pestaña activa, modales, imagen y carga
 * - `useRef` para referencias a modales y componentes hijos
 * - `useEffect` para scroll automático al abrir modal de edición
 *
 * Componentes internos usados:
 * - `Searcher` para búsqueda y gestión de contenido
 * - `Create` para creación de contenido
 * - `Edit` para edición de contenido
 * - `SendContent` para envío a suscriptores
 * - `AdminDashboard` para mostrar estadísticas
 *
 * @component
 * @returns {JSX.Element} Panel de administración completo
 */
const PanelAdmin = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Cierra sesión y redirige al login de admin
   */
  const handleLogout = () => {
    logout();
    navigate("/Admin");
  };

  /** Sección activa del panel (pestaña del sidebar) */
  const [activeTab, setActiveTab] = useState("gestionar-contenido");

  /** Estado del Offcanvas de ajustes */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /** Estado del modal de edición de tarjeta */
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  /** Estado del carrusel de portada */
  const [selectedCity, setSelectedCity] = useState("loberia");
  const [image, setImage] = useState(null);
  const [useDefault, setUseDefault] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Referencias a componentes */
  const editModalRef = useRef(null);
  const searcherRef = useRef(null);

  const isSuperadmin = auth.role === "superadmin";
  const visibleConfigTabs = CONFIG_TABS.filter(
    (tab) => !tab.superadminOnly || isSuperadmin
  );
  const currentTab =
    [...GENERAL_TABS, ...CONFIG_TABS].find((tab) => tab.id === activeTab) ||
    GENERAL_TABS[0];

  /**
   * Abre el modal de edición de tarjeta
   * @param {string|number} cardId - ID de la tarjeta a editar
   */
  const handleEditCard = (cardId) => {
    setSelectedCardId(cardId);
    setShowEditModal(true);
  };

  /** Cierra el modal de edición */
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCardId(null);
  };

  /** Actualiza la tarjeta y refresca el listado de tarjetas */
  const handleUpdateCard = () => {
    setShowEditModal(false);
    setSelectedCardId(null);
    if (searcherRef.current) {
      searcherRef.current.fetchCards();
    }
  };

  /** Maneja el cambio de ciudad para el carrusel */
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setImage(null);
    setUseDefault(false);
  };

  /** Maneja el cambio de imagen para el carrusel */
  const handleImageChange = (e) => setImage(e.target.files[0]);

  /** Activa o desactiva el uso de imagen default */
  const handleUseDefaultChange = (e) => setUseDefault(e.target.checked);

  /**
   * Maneja el envío del formulario para actualizar el carrusel
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (useDefault) {
        await fetch(`${Global.url}carousel/${selectedCity}`, {
          method: "DELETE",
        });
        toast.success("Se usará la imagen default para esta ciudad.");
      } else {
        if (!image) {
          toast.error("Selecciona una imagen o marca 'Usar imagen default'");
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append("city", selectedCity);
        formData.append("image", image);
        await fetch(`${Global.url}carousel`, {
          method: "POST",
          body: formData,
        });
        toast.success("Imagen personalizada actualizada.");
      }
      setImage(null);
      setUseDefault(false);
    } finally {
      setLoading(false);
    }
  };

  /** Scroll automático al abrir modal de edición */
  useEffect(() => {
    if (showEditModal && editModalRef.current) {
      editModalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showEditModal]);

  const renderNavLink = (tab) => (
    <button
      key={tab.id}
      type="button"
      className={`side-link${activeTab === tab.id ? " is-active" : ""}`}
      onClick={() => setActiveTab(tab.id)}
    >
      <tab.icon aria-hidden="true" />
      {tab.label}
    </button>
  );

  return (
    <div className="admin-shell">
      {/* Topbar: a todo el ancho de la página, arriba del sidebar */}
      <header className="admin-topbar">
        <div className="admin-topbar-breadcrumb">
          Panel de Administración
          <span className="admin-topbar-sep">/</span>
          <strong>{currentTab.label}</strong>
        </div>
        <div className="admin-topbar-actions">
          <span className="admin-topbar-welcome">
            Bienvenido, <strong>{auth.name}</strong>
          </span>
          <span className="admin-topbar-divider"></span>
          <button type="button" className="admin-topbar-link" onClick={handleShow}>
            <LuSettings aria-hidden="true" /> Ajustes
          </button>
          <button
            type="button"
            className="admin-topbar-link admin-topbar-link--danger"
            onClick={handleLogout}
          >
            <LuLogOut aria-hidden="true" /> Cerrar sesión
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            <span className="admin-sidebar-logo">L</span>
            <div>
              <div className="admin-sidebar-title">Lobería</div>
              <div className="admin-sidebar-subtitle">Panel Admin</div>
            </div>
          </div>

          <nav className="admin-sidebar-nav">
            <div className="admin-sidebar-group-label">General</div>
            {GENERAL_TABS.map(renderNavLink)}

            <div className="admin-sidebar-group-label">Configuración</div>
            {visibleConfigTabs.map(renderNavLink)}
          </nav>

          <div className="admin-sidebar-footer">
            <button type="button" className="side-link" onClick={handleLogout}>
              <LuLogOut aria-hidden="true" /> Cerrar sesión
            </button>
          </div>
        </aside>

        <div className="admin-content-wrap">
        {/* Panel principal: solo la pestaña activa */}
        <main className="admin-main">
          {activeTab === "estadisticas" && (
            <section className="admin-tab-panel">
              <h1 className="admin-tab-title">Estadísticas</h1>
              <AdminDashboard />
            </section>
          )}

          {activeTab === "gestionar-contenido" && (
            <section className="admin-tab-panel">
              <h1 className="admin-tab-title">Gestionar contenido</h1>
              <Searcher ref={searcherRef} isAdmin={true} onEdit={handleEditCard} />
            </section>
          )}

          {activeTab === "crear-contenido" && (
            <section className="admin-tab-panel">
              <h1 className="admin-tab-title">Crear contenido</h1>
              <div className="admin-panel">
                <Create />
              </div>
            </section>
          )}

          {activeTab === "editar-secciones" && isSuperadmin && (
            <section className="admin-tab-panel">
              <h1 className="admin-tab-title">Editar secciones</h1>
              <div className="admin-panel">
                <EditarSecciones />
              </div>
            </section>
          )}

          {activeTab === "modificar-carrusel" && (
            <section className="admin-tab-panel">
              <h1 className="admin-tab-title">Carrusel de portada</h1>
              <div className="admin-panel admin-panel--narrow">
                <div className="admin-panel-head">Actualizar imagen por ciudad</div>
                <form onSubmit={handleSubmit} className="form-carousel">
                  <label>
                    Ciudad
                    <select value={selectedCity} onChange={handleCityChange}>
                      <option value="loberia">Lobería</option>
                      <option value="arenas_verdes">Arenas Verdes</option>
                      <option value="san_manuel">San Manuel</option>
                    </select>
                  </label>
                  <label>
                    Imagen personalizada
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={useDefault}
                      key={selectedCity + (useDefault ? "-default" : "-custom")}
                    />
                  </label>
                  <label className="default-image">
                    <input
                      type="checkbox"
                      checked={useDefault}
                      onChange={handleUseDefaultChange}
                    />
                    Usar imagen default
                  </label>
                  <button type="submit" className="btn-admin-primary" disabled={loading}>
                    {loading ? "Actualizando..." : "Actualizar Carrusel"}
                  </button>
                </form>
              </div>
            </section>
          )}

          {activeTab === "enviar-suscripciones" && (
            <section className="admin-tab-panel">
              <h1 className="admin-tab-title">Enviar contenido</h1>
              <SendContent />
            </section>
          )}
        </main>
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="admin-modal-overlay" ref={editModalRef}>
          <div className="admin-modal-content">
            <Edit
              cardId={selectedCardId}
              onClose={handleCloseEditModal}
              onUpdate={handleUpdateCard}
            />
          </div>
        </div>
      )}

      {/* Offcanvas de ajustes */}
      <section className="user-panel">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Panel de ajustes de: {auth.name}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="user-panel-content">
              <div className="user-info">
                <p>
                  <strong>Email:</strong> {auth.email}
                </p>
                <p>
                  <strong>Rol:</strong> {auth.role}
                </p>
              </div>

              <div className="panel-admin">
                <aside className="sidebar-admin">
                  <ul>
                    {isSuperadmin && (
                      <>
                        <li>
                          <Link to="modificar-datos">
                            <FaPencilAlt />
                            Modificar mis datos
                          </Link>
                        </li>
                        <li>
                          <Link to="crear-admin">
                            <FaUserCheck />
                            Crear nuevo admin
                          </Link>
                        </li>
                        <li>
                          <Link to="listar-admins">
                            <FaUsersCog />
                            Gestionar administradores
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </aside>
                <main className="panel-content">
                  <Outlet />
                </main>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </section>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default PanelAdmin;
