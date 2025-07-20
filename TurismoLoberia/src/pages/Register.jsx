import React, { useState } from "react";
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
      nick: e.target.nick.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // Validar contraseña
    if (userData.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return; // Detiene la ejecución si la validación falla
    }

    try {
      // Petición al servidor
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      <header className="content__header">
        <h1 className="content__title">Registro</h1>
      </header>

      <div className="content__posts">
        <form className="register-form" onSubmit={registerUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" className="form-control" required />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input
              type="text"
              name="surname"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" className="form-control" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>

          <input
            type="submit"
            value="Registrarse"
            className="btn btn-success"
          />
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
