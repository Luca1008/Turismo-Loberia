import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../../../helpers/Global";
import "../../../styles/panelAdmin.css";

/**
 * Componente `CreateAdmin`
 *
 * Formulario para crear un nuevo usuario administrador.
 * Permite ingresar nombre, apellido, correo electrónico y contraseña.
 * Realiza validación de contraseña mínima (8 caracteres) y muestra
 * notificaciones con `react-toastify` en caso de éxito o error.
 *
 * @component
 *
 * @returns {JSX.Element} Formulario de creación de administrador.
 *
 * @example
 * <CreateAdmin />
 */
const CreateAdmin = () => {
  const [error, setError] = useState(null);

  /**
   * Maneja el envío del formulario de registro.
   * Valida la contraseña y realiza una petición POST al endpoint
   * `${Global.url}user/register`.
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento de envío del formulario.
   */
  const registerUser = async (e) => {
    e.preventDefault();
    setError(null);

    const userData = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (userData.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!request.ok) {
        throw new Error(`Error del servidor: ${request.status}`);
      }

      const data = await request.json();

      if (data.status === "success") {
        if (data.message && data.message.includes("ya existe")) {
          setError("El usuario ya existe en el sistema");
          toast.error("El usuario ya existe en el sistema");
        } else {
          toast.success("Usuario registrado correctamente");
          setTimeout(() => {}, 1500);
        }
      } else {
        setError(data.message || "Error al registrar usuario");
        toast.error(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      toast.error("Error al conectar con el servidor");
      console.error(error);
    }
  };

  return (
    <>
      <section className="register">
        <h3 className="content__title">Crear Admin</h3>
        <div className="content__posts">
          <Form
            className="register-form"
            onSubmit={registerUser}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerSurname">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder="Apellido"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                required
              />
            </Form.Group>
            <button type="submit" className="btn btn-success">
              Crear
            </button>
          </Form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default CreateAdmin;
