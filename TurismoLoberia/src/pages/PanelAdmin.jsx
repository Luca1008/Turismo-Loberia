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

const PanelAdmin = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/Admin");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCity, setSelectedCity] = useState("loberia");
  const [image, setImage] = useState(null);
  const [useDefault, setUseDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const editModalRef = useRef(null);
  const searcherRef = useRef(null);

  const handleEditCard = (cardId) => {
    setSelectedCardId(cardId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCardId(null);
  };

  const handleUpdateCard = () => {
    setShowEditModal(false);
    setSelectedCardId(null);
    if (searcherRef.current) {
      searcherRef.current.fetchCards();
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setImage(null);
    setUseDefault(false);
  };
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleUseDefaultChange = (e) => setUseDefault(e.target.checked);

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
      <section className="panel-admin">
        <h2>Bienvenido al Panel de Administración</h2>
        <div id="gestionar-contenido"> </div>

        <Searcher ref={searcherRef} isAdmin={true} onEdit={handleEditCard} />

        <section id="crear-contenido" className="add-card">
          <Create />
        </section>

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
      <section id="enviar-suscripciones" className="send-content">
        <SendContent />
      </section>
      <section id="estadisticas" className="stats">
        <AdminDashboard />
      </section>
    </>
  );
};

export default PanelAdmin;
