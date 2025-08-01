import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams(); // Captura el token desde la URL /recuperar-password/:token
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Contraseña actualizada correctamente.");
        localStorage.removeItem("token"); // Borra el token viejo
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

  return (
    <section className="reset-password">
      <ToastContainer />
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleReset} className="form-reset">
        <div className="mb-3">
          <label>Nueva contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div className="mb-3">
          <label>Confirmar nueva contraseña</label>
          <input
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
