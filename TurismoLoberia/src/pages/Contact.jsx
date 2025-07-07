import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FaAsterisk } from "react-icons/fa";
import ButtonSubmit from "../components/common/ButtonSubmit";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import "../styles/contact.css";
import Breadcrumb from "../components/common/Breadcrumb";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (status === "error") {
      setStatus("");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("enviando");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("exitoso");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:5000"
      );
    }
  };
  return (
    <div>
      <Header />
      <Breadcrumb />
      <section className="contact">
        <h2>Contactanos</h2>
        <Form onSubmit={handleSubmit} className="form-contact">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>
              Nombre y Apellido: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>
              Email: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubject">
            <Form.Label>
              Asunto: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Motivo del mensaje"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>
              Mensaje: <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Escribe tu mensaje aquí..."
            />
          </Form.Group>
          <p className="required-info">
            Los campos marcados con un asterisco (
            <FaAsterisk className="requerided" />) son obligatorios.
          </p>
          <ButtonSubmit
            text={status === "enviando" ? "Enviando..." : "Enviar"}
            disabled={status === "enviando"}
            className={`.btn-success${status === "enviando" ? " sending" : ""}`}
          />

          {status === "exitoso" && (
            <p className="success-message">
              ¡Mensaje enviado exitosamente! Te responderemos a la brevedad.
            </p>
          )}
          {status === "error" && (
            <p className="error-message">{errorMessage}</p>
          )}
        </Form>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
