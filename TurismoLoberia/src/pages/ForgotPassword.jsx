import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../components/common/ButtonSubmit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { Global } from "../helpers/Global";

/**
 * Componente `ForgotPassword`
 *
 * Este componente renderiza un formulario para recuperar la contraseña de un usuario.
 * Funcionalidades:
 * - Permite ingresar el email registrado
 * - Envía una solicitud POST a la API (`/user/recuperar-password`)
 * - Muestra notificaciones de éxito o error usando `react-toastify`
 * - Maneja estado de carga (`loading`)
 *
 * Hooks usados:
 * - `useState` para manejar el email y el estado de carga
 * - `useTranslation` para traducción de textos
 *
 * Componentes usados:
 * - `Form` y `Form.Group` de React-Bootstrap
 * - `ButtonSubmit` para el botón de envío
 * - `ToastContainer` de `react-toastify` para notificaciones
 *
 * @component
 * @returns {JSX.Element} Formulario de recuperación de contraseña
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  /**
   * Envía la solicitud de recuperación de contraseña al backend
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${Global.url}user/recuperar-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Enviado link reset");
      } else {
        toast.error(data.message || "Error al enviar el email");
      }
    } catch (error) {
      toast.error("Error de service");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgot-password" key={i18n.language}>
      <h2>Recuperar Contraseña</h2>
      <Form onSubmit={handleSubmit} className="form-forgot">
        <Form.Group controlId="formEmail">
          <Form.Label>{t("email")}</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ marginTop: "1rem" }}>
          <ButtonSubmit
            type="submit"
            text={loading ? "Enviando..." : "Enviar Link"}
            disabled={loading}
            className="btn btn-primary"
          />
        </div>
      </Form>
      <ToastContainer />
    </section>
  );
};

export default ForgotPassword;
