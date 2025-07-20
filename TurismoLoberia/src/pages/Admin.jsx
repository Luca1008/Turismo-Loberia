import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../components/common/ButtonSubmit"; // Ajusta la ruta si es necesario

const Admin = () => {
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

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status === 'success') {
        // Guarda el token JWT
        localStorage.setItem('token', data.token);
        alert('¡Login exitoso!');
        setLoading(false);
        window.location.href = "/PanelAdmin";
      } else {
        alert(data.message || 'Error al iniciar sesión');
        setLoading(false);
      }
    } catch (error) {
      alert('Error de conexión');
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <h2>Panel de Administración</h2>
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
        <div style={{ marginTop: '1rem' }}>
        <a href="/Register">¿No tienes cuenta? Regístrate aquí</a>
      </div>
        <ButtonSubmit
          type="submit"
          text={loading ? "Cargando..." : "Logueate"}
          className={`btn btn-success ${loading ? "loading" : ""}`}
          disabled={loading}
        />
      </Form>
    </section>
  );
};

export default Admin;
