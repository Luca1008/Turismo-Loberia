import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../../../helpers/Global";
import { useAuth } from "../../../hooks/useAuth";
import "../../../styles/panelAdmin.css";
import Button from 'react-bootstrap/Button';

const UpdateAdmin = ({ admin, onSuccess, onCancel, isAdminEdit = false }) => {
  const { auth, setAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  // Cargar datos del admin seleccionado o del usuario logueado
  useEffect(() => {
    if (isAdminEdit && admin) {
      // Cargar datos del admin seleccionado para edición
      setFormData({
        name: admin.name || "",
        surname: admin.surname || "",
        email: admin.email || "",
        password: ""
      });
    } else if (auth) {
      // Cargar datos del usuario logueado (para edición de perfil propio)
      setFormData({
        name: auth.name || "",
        surname: auth.surname || "",
        email: auth.email || "",
        password: ""
      });
    }
  }, [admin, auth, isAdminEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.surname || !formData.email) {
      toast.error("Todos los campos excepto la contraseña son obligatorios.");
      return;
    }

    const updatedData = { ...formData };
    if (formData.password.trim() === "") {
      delete updatedData.password;
    }

    try {
      const token = localStorage.getItem("token");
      const url = isAdminEdit 
        ? Global.url + `user/${admin.id}` // Edición de admin
        : Global.url + `user/${auth.id}`; // Edición de perfil propio

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Datos actualizados correctamente");
        
        if (isAdminEdit) {
          onSuccess(); // Para edición de admin desde el listado
        } else {
          // Manejo para edición de perfil propio
          if (formData.password) {
            setTimeout(() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setAuth({});
              window.location.href = "/Admin";
            }, 3000);
          } else {
            localStorage.setItem("user", JSON.stringify(data.user));
            setAuth(data.user);
          }
        }
      } else {
        throw new Error(data.message || "Error al actualizar");
      }
    } catch (error) {
      toast.error(error.message || "Error al conectar con el servidor");
    }
  };

  return (
    <>
      <section className="register">
        <h3 className="content__title">
          {isAdminEdit ? "Editar Administrador" : "Modificar Perfil"}
        </h3>
        <div className="content__posts">
          <Form className="register-form" onSubmit={updateProfile}>
            <Form.Group className="mb-3" controlId="updateName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="updateSurname">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="updateEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="updatePassword">
              <Form.Label>Nueva contraseña (opcional)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Dejar en blanco si no querés cambiarla"
              />
            </Form.Group>

            <div className="buttons-container">
              <Button variant="secondary" 
                type="button"
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button variant="success" type="submit">
                Actualizar
              </Button>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default UpdateAdmin;