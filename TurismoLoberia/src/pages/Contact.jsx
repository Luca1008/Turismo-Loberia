import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { FaAsterisk } from "react-icons/fa";
import ButtonSubmit from "../components/common/ButtonSubmit";
import "../styles/contact.css";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../analytics"; // 👈 Importar función GA4

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const interactionTracked = useRef(false);

  // 📌 Evento: Vista de la página
  useEffect(() => {
    trackEvent({
      category: "Formulario",
      action: "Vista página contacto",
      label: "Página Contacto",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ Evento: interacción con formulario (solo la primera vez)
    if (!interactionTracked.current) {
      trackEvent({
        category: "Formulario",
        action: "Inicio interacción",
        label: "Contacto",
      });
      interactionTracked.current = true;
    }

    // ✅ Evento: usuario limpia un error
    if (status === "error") {
      trackEvent({
        category: "Formulario",
        action: "Corrige error",
        label: `Campo: ${name}`,
      });
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
        // ✅ Evento: envío exitoso
        trackEvent({
          category: "Formulario",
          action: "Envío exitoso",
          label: "Formulario de contacto",
        });
        setStatus("exitoso");
        setFormData({ name: "", email: "", subject: "", message: "" });
        interactionTracked.current = false;
      } else {
        // ❌ Evento: error de validación o backend
        trackEvent({
          category: "Formulario",
          action: "Error en envío",
          label: data.error || "Error desconocido",
        });
        setStatus("error");
        setErrorMessage(data.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error en enviado:", error);

      // ❌ Evento: error de conexión
      trackEvent({
        category: "Formulario",
        action: "Error técnico",
        label: "Fallo conexión backend",
      });
      setStatus("error");
      setErrorMessage(
        "No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:5000"
      );
    }
  };

  return (
    <div>
      <section className="contact" key={i18n.language}>
        <h2>{t("contactanos")}</h2>
        <Form onSubmit={handleSubmit} className="form-contact">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>
              {t("nombre_apellido")} <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t("placeholder_nombre")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>
              {t("email2")} <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t("placeholder_email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubject">
            <Form.Label>
              {t("asunto")} <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder={t("placeholder_asunto")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>
              {t("mensaje")} <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder={t("placeholder_mensaje")}
            />
          </Form.Group>

          <p className="required-info">
            {t("campos_obligatorios")} (
            <FaAsterisk className="requerided" />) son obligatorios.
          </p>

          <ButtonSubmit
            text={status === "enviando" ? t("enviando") : t("enviar")}
            disabled={status === "enviando"}
            className={`.btn-success${status === "enviando" ? " sending" : ""}`}
          />

          {status === "exitoso" && (
            <p className="success-message">{t("mensaje_exitoso")}</p>
          )}
          {status === "error" && (
            <p className="error-message">{errorMessage}</p>
          )}
        </Form>
      </section>
    </div>
  );
};

export default Contact;
