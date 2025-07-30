import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../components/common/ButtonSubmit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/user/recuperar-password", {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgot-password">
      <h2>Recuperar contraseña</h2>
      <Form onSubmit={handleSubmit} className="form-forgot">
        <Form.Group controlId="formEmail">
          <Form.Label>{"email"}</Form.Label>
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
            text={loading ? "sending" : "Enviar link"}
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
