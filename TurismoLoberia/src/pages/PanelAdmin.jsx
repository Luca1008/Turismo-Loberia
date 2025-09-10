import { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  FaChevronRight,
  FaChevronLeft,
  FaPencilAlt,
  FaUserCheck,
  FaUsersCog,
  FaPlus,
} from "react-icons/fa";
import { MdLogout, MdOutlineSettings, MdEmail } from "react-icons/md";
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
import { IoStatsChartSharp } from "react-icons/io5";
import { Global } from "../helpers/Global.js";

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
 * Funcionalidades principales:
 * - Uso de `useAuth` para autenticación y logout
 * - Navegación programática con `useNavigate`
 * - Estado y gestión de modales (`showEditModal`, `show`)
 * - Manejo de carrusel de portada con imagen personalizada o default
 * - Notificaciones con `react-toastify`
 *
 * Hooks utilizados:
 * - `useState` para manejar estado de menús, modales, imagen y carga
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

  /** Estado del menú lateral */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      {/* Navbar superior con información del usuario y logout */}
      <Nav defaultActiveKey="/Admin" as="ul" className="nav-user">
        <Nav.Item as="li">
          <strong>Bienvenido {auth.name}</strong>
        </Nav.Item>
        <Nav.Item as="li">
          <button className="btn-admin" onClick={handleShow}>
            <MdOutlineSettings /> Ajustes
          </button>
        </Nav.Item>
        <Nav.Item as="li">
          <span>
            <button className="btn-admin" onClick={handleLogout}>
              <MdLogout /> Cerrar sesión
            </button>
          </span>
        </Nav.Item>
      </Nav>

      {/* Menú lateral */}
      <button
        className={`menu-toggle right ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <div className={`container-tools ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#gestionar-contenido">
              <span>
                <FaPencilAlt />
                Gestionar contenido
              </span>
            </a>
          </li>
          <li>
            <a href="#crear-contenido">
              <span>
                <FaPlus />
                Crear contenido
              </span>
            </a>
          </li>
          <li>
            <a href="#modificar-carrusel">
              <span>
                <FaPencilAlt />
                Modificar carrusel
              </span>
            </a>
          </li>
          <li>
            <a href="#enviar-suscripciones">
              <span>
                <MdEmail />
                Enviar contenido
              </span>
            </a>
          </li>
          <li>
            <a href="#estadisticas">
              <span>
                <IoStatsChartSharp />
                Estadísticas
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* Panel principal */}
      <section className="panel-admin">
        <h2>Bienvenido al Panel de Administración</h2>
        <div id="gestionar-contenido"> </div>

        {/* Componente para gestión de contenido */}
        <Searcher ref={searcherRef} isAdmin={true} onEdit={handleEditCard} />

        {/* Crear nuevo contenido */}
        <section id="crear-contenido" className="add-card">
          <Create />
        </section>

        {/* Modal de edición */}
        {showEditModal && (
          <div className="modal-overlay" ref={editModalRef}>
            <div className="modal-content">
              <Edit
                cardId={selectedCardId}
                onClose={handleCloseEditModal}
                onUpdate={handleUpdateCard}
              />
            </div>
          </div>
        )}

        {/* Formulario de actualización del carrusel */}
        <h2 id="modificar-carrusel">Modificar Carrusel de Portada</h2>
        <form onSubmit={handleSubmit} className="form-carousel">
          <label>
            Ciudad:
            <select value={selectedCity} onChange={handleCityChange}>
              <option value="loberia">Lobería</option>
              <option value="arenas_verdes">Arenas Verdes</option>
              <option value="san_manuel">San Manuel</option>
            </select>
          </label>
          <label>
            Imagen personalizada:
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
          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar Carrusel"}
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={2500} />
      </section>

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
                    {auth.role === "superadmin" && (
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

      {/* Sección de envío de contenido a suscriptores */}
      <section id="enviar-suscripciones" className="send-content">
        <SendContent />
      </section>

      {/* Sección de estadísticas */}
      <section id="estadisticas" className="stats">
        <AdminDashboard />
      </section>
    </>
  );
};

export default PanelAdmin;
