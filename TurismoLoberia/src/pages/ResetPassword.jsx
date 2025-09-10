import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "../helpers/Global";

/**
 * Componente `ResetPassword`.
 *
 * Permite al usuario restablecer su contraseña usando un token recibido por email.
 * Valida que la nueva contraseña tenga al menos 8 caracteres y que coincidan los campos.
 * Muestra notificaciones con `react-toastify` y redirige al login al actualizar correctamente.
 *
 * @component
 * @example
 * <ResetPassword />
 *
 * @returns {JSX.Element} Formulario de restablecimiento de contraseña
 */
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  /**
   * Estado de la contraseña ingresada.
   * @type {string}
   */
  const [password, setPassword] = useState("");

  /**
   * Estado de confirmación de la contraseña.
   * @type {string}
   */
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Estado de carga durante el envío del formulario.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el envío del formulario para restablecer la contraseña.
   * Valida longitud y coincidencia de las contraseñas y realiza la llamada al backend.
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e Evento de envío del formulario
   */
  const handleReset = async (e) => {
    e.preventDefault();

    // Validación de longitud mínima
    if (!password || password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Validación de coincidencia
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${Global.url}user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Contraseña actualizada correctamente.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/Admin"), 2500);
      } else {
        toast.error(data.message || "Error al actualizar la contraseña.");
      }
    } catch (err) {
      console.error("Error al restablecer la contraseña:", err);
      toast.error("Error de red.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderiza el formulario de restablecimiento de contraseña.
   */
  return (
    <section className="reset-password">
      <ToastContainer />
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleReset} className="form-reset">
        <div className="mb-3">
          <label htmlFor="password">Nueva contraseña</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <button className="btn btn-success" type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Actualizar contraseña"}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
