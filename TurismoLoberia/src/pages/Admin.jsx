import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../components/common/ButtonSubmit";
import "../styles/admin.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
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
      toast.error("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
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
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="contraseña"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <div style={{ marginTop: "1rem" }}>
          <a href="/Register">¿No tienes cuenta? Regístrate aquí</a>
        </div>

        <ButtonSubmit
          type="submit"
          text={loading ? "Cargando..." : "Iniciar sesión"}
          className={`btn btn-success ${loading ? "loading" : ""}`}
          disabled={loading}
        />
      </Form>
    </section>
  );
};

export default Admin;