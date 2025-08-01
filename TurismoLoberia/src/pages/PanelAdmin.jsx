import { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaPencilAlt, FaUserCheck, FaUsersCog } from "react-icons/fa";
import { MdLogout, MdOutlineSettings } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "../components/layout/Create";
import Edit from "../components/layout/Edit";
import { useAuth } from "../hooks/useAuth.jsx";
import "../styles/panelAdmin.css";
import Searcher from "./Searcher";

const PanelAdmin = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Limpia estado y localStorage
    navigate("/Admin"); // Redirige a /Admin
  };

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

  // Nueva función para refrescar la lista tras editar
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
        await fetch(`http://localhost:5000/api/carousel/${selectedCity}`, {
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
        await fetch("http://localhost:5000/api/carousel", {
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
          <span>Bienvenido {auth.name}</span>
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
      <section className="panel-admin">
        <h2>Bienvenido al Panel de Administración</h2>

        {/* Buscador en modo admin */}
        <Searcher ref={searcherRef} isAdmin={true} onEdit={handleEditCard} />

        {/* Formulario de creación */}
        <section className="add-card">
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

        <h3>Modificar Carrousel de Portada</h3>
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

      {/*----------------------Ajustes-----------------*/}
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
                  <Outlet /> {/* Aquí se renderiza la subvista */}
                </main>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </section>
    </>
  );
};

export default PanelAdmin;
