import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../components/common/ButtonSubmit";
import "../styles/admin.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { Global } from "../helpers/Global"

/**
 * Componente `Admin`
 *
 * Este componente renderiza el formulario de login para el panel de administración.
 * Permite al usuario ingresar su correo electrónico y contraseña, valida los datos,
 * realiza la solicitud de login al servidor y maneja la autenticación.
 *
 * Hooks usados:
 * - useState: Para manejar estado del formulario, errores y loading.
 * - useAuth: Para actualizar el estado global de autenticación.
 * - useNavigate: Para redirigir al panel de administración tras login exitoso.
 * - useTranslation: Para internacionalización de textos.
 *
 * Funciones principales:
 * - validateForm(): Valida que el email sea correcto y que la contraseña tenga al menos 8 caracteres.
 * - loginUser(e): Maneja el envío del formulario, realiza la petición POST al servidor y actualiza el estado global de auth.
 *
 * Contiene:
 * - Validación de formulario y manejo de errores.
 * - Notificaciones de éxito o error usando `react-toastify`.
 * - Redirección al Panel de Administración tras login exitoso.
 *
 * @component
 * @returns {JSX.Element} Formulario de login para administración
 */
const Admin = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  /**
   * Valida los campos del formulario
   *
   * @returns {boolean} true si el formulario es válido, false si hay errores
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor ingrese un email válido";
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario de login
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento del formulario
   * @returns {Promise<void>}
   */
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Global.url}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.status === "success") {
        toast.success("Inicio de sesión exitoso");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuth(data.user);
        setTimeout(() => navigate("/PanelAdmin"), 1500);
      } else {
        toast.error(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login" key={i18n.language}>
      {/* ToastContainer para notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2>Panel de Administración</h2>
      <Form onSubmit={loginUser} className="form-login" noValidate>
        {/* Campo Email */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>{t("email")}</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Password */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("placeholder_password")}
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Link de recuperación de contraseña */}
        <div style={{ marginTop: "1rem" }}>
          <a href="/recuperar-password">
            <strong>{t("forgot_password")}</strong>
          </a>
        </div>

        {/* Botón de submit */}
        <ButtonSubmit
          type="submit"
          text={loading ? t("loading") : t("login")}
          className={`btn btn-success ${loading ? "loading" : ""}`}
          disabled={loading}
        />
      </Form>
    </section>
  );
};

export default Admin;
