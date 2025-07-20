import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../components/common/ButtonSubmit"; // Ajusta la ruta si es necesario

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación simple
    if (!formData.password || formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

    // Aquí iría tu lógica de login real
    // Por ahora solo simula éxito
    setTimeout(() => {
      alert("¡Login exitoso!");
      setLoading(false);
      window.location.href = "/Admin";
    }, 1000);
  };

  return (
    <div>
      <h1>Panel de Administración</h1>
      <h3>Login</h3>
      <Form onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="contraseña"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Group>
        <ButtonSubmit
          type="submit"
          text={loading ? "Cargando..." : "Logueate"}
          className={`btn btn-success ${loading ? "loading" : ""}`}
          disabled={loading}
        />
      </Form>
      <div style={{ marginTop: '1rem' }}>
        <a href="/Register">¿No tienes cuenta? Regístrate aquí</a>
      </div>
    </div>
  );
};

export default Login;
