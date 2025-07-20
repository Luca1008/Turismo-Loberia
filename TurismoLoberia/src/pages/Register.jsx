import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../helpers/Global";

export const Register = () => {
  const [error, setError] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    setError(null);

    // Recoger datos del formulario
    let userData = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };


    // Validar contraseña
    if (userData.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return; // Detiene la ejecución si la validación falla
    }

    try {
      // Enviar datos como JSON
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!request.ok) {
        throw new Error(`Error del servidor: ${request.status}`);
      }

      const data = await request.json();
      console.log("Respuesta del servidor:", data);

      if (data.status === "success") {
        if (data.message && data.message.includes("ya existe")) {
          setError("El usuario ya existe en el sistema");
          toast.error("El usuario ya existe en el sistema");
        } else {
          toast.success("Usuario registrado correctamente");
          setTimeout(() => {
            window.location.href = "/Admin";
          }, 1500); // Espera 1.5 segundos para mostrar el toast
        }
      } else {
        setError(data.message || "Error al registrar usuario");
        toast.error(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <section className="register">
        <h2 className="content__title">Registro</h2>
        <div className="content__posts">
          <Form
            className="register-form"
            onSubmit={registerUser}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" placeholder="Nombre" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerSurname">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="surname" placeholder="Apellido" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" name="email" placeholder="Correo electrónico" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" placeholder="Contraseña" required />
            </Form.Group>
            <button type="submit" className="btn btn-success">
              Registrarse
            </button>
          </Form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};
