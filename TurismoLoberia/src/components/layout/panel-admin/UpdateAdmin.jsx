import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../../../helpers/Global";
import { useAuth } from "../../../hooks/useAuth";
import "../../../styles/panelAdmin.css";

const UpdateAdmin = () => {
  const { auth, setAuth } = useAuth(); // ← usar contexto
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  // Cargar datos del usuario logueado
  useEffect(() => {
    if (auth) {
      setFormData({
        name: auth.name || "",
        surname: auth.surname || "",
        email: auth.email || "",
        password: ""
      });
    }
  }, [auth]);

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
    if (!formData.password) {
      delete updatedData.password;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(Global.url + `user/${auth.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Perfil actualizado correctamente");

        // Actualizar localStorage y contexto
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuth(data.user); // ← actualiza el contexto
      } else {
        setError(data.message || "Error al actualizar");
        toast.error(data.message || "Error al actualizar");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <section className="register">
        <h3 className="content__title">Modificar Perfil</h3>
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

            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
          </Form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default UpdateAdmin;
