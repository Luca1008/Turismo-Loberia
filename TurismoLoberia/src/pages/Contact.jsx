import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../components/common/ButtonSubmit";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import '../styles/contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    //console.log('Enviando datos:', formData);

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      //console.log('Respuesta del servidor:', response.status);

      const data = await response.json();
      //console.log('Datos recibidos:', data);

      if (response.ok) {
        setStatus("exitoso");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      //console.error('Error completo:', error);
      setStatus("error");
      setErrorMessage(
        "No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:5000"
      );
    }
  };
  return (
    <div>
      <Header />
      <section className="contact">
        <h2>Contacto</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre y Apellido</Form.Label>
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Mensaje</Form.Label>
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

          <ButtonSubmit
            text={status === "enviando" ? "Enviando..." : "Enviar"}
            disabled={status === "enviando"}
            className={`btn-view-more${status === "enviando" ? " sending" : ""}`}
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
