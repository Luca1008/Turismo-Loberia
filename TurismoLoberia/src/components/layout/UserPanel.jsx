import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/user/user.png";

const UserPanel = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="user-panel">
      <Button variant="primary" onClick={handleShow}>
        <FaCog /> Ajustes
      </Button>

            <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Panel de Usuario</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="user-panel-content">
            <div className="user-avatar">
              <img
                src={avatar}
                className="container-avatar__img"
                alt="Foto de perfil"
              />
            </div>
            <div className="user-info">
              <h5>Usuario</h5>
              <p>Panel de ajustes del usuario</p>
            </div>
            <div className="user-actions">
              <Link to="/perfil" className="btn btn-primary mb-2 w-100">
                Ver Perfil
              </Link>
              <Link to="/configuracion" className="btn btn-outline-secondary w-100">
                Configuración
              </Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
};

export default UserPanel;
