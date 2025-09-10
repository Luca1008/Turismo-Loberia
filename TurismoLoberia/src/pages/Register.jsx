import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../helpers/Global";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const registerUser = async (e) => {
    e.preventDefault();
    setError(null);

    let userData = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (userData.password.length < 8) {
      toast.error(t("error_contrasena_minima"));
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
      console.log("Respuesta del servidor:", data);

      if (data.status === "success") {
        if (data.message && data.message.includes("ya existe")) {
          setError(t("error_usuario_existente"));
          toast.error(t("error_usuario_existente"));
        } else {
          toast.success(t("usuario_registrado"));
          setTimeout(() => {
            window.location.href = "/Admin";
          }, 1500);
        }
      } else {
        setError(data.message || "Error al registrar usuario");
        toast.error(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error en Registrar:", error);
      setError(t("error_conexion2"));
      toast.error(t("error_conexion2"));
    }
  };

  return (
    <>
      <section className="register" key={i18n.language}>
        <h2 className="content__title">{t("registro")}</h2>
        <div className="content__posts">
          <Form
            className="register-form"
            onSubmit={registerUser}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>{t("nombre")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={t("nombre")}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerSurname">
              <Form.Label>{t("apellido")}</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder={t("apellido")}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>{t("correo_electronico")}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={t("correo_electronico")}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>{t("contrasena")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t("contrasena")}
                required
              />
            </Form.Group>
            <button type="submit" className="btn btn-success">
              {t("registrarse")}
            </button>
          </Form>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
        <ToastContainer />
      </section>
    </>
  );
};
