import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FaAsterisk } from "react-icons/fa";
import ButtonSubmit from "../components/common/ButtonSubmit";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../analytics"; // 👈 GA4

export const Suscribe = () => {
  const [formData, setFormData] = useState({
    direction: "",
    think: "",
    project: "",
    name: "",
    email: "",
    phone: "",
    companions: [],
    transport: [],
    source: [],
    accept: false,
  });
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Formulario Suscripción",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "companions") {
      const updated = checked
        ? [...formData.companions, value]
        : formData.companions.filter((v) => v !== value);

      setFormData((prev) => ({ ...prev, companions: updated }));

      trackEvent({
        category: "Formulario",
        action: "Checkbox marcado",
        label: `Compañía: ${value}`,
      });
      return;
    }

    if (type === "checkbox" && name === "accept") {
      setFormData((prev) => ({ ...prev, accept: checked }));
      trackEvent({
        category: "Formulario",
        action: "Checkbox marcado",
        label: "Acepta políticas",
      });
      return;
    }

    if (name === "source") {
      const updated = checked
        ? [...formData.source, value]
        : formData.source.filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, source: updated }));
      trackEvent({
        category: "Formulario",
        action: "Checkbox marcado",
        label: `Origen: ${value}`,
      });
      return;
    }

    if (name === "transport") {
      const updated = checked
        ? [...formData.transport, value]
        : formData.transport.filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, transport: updated }));
      trackEvent({
        category: "Formulario",
        action: "Checkbox marcado",
        label: `Transporte: ${value}`,
      });
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    trackEvent({
      category: "Formulario",
      action: "Campo completado",
      label: name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("enviando");
    setErrorMessage("");

    trackEvent({
      category: "Formulario",
      action: "Click enviar",
      label: "Inicio envío",
    });

    // Aquí iría el fetch de envío real si lo implementás
  };

  return (
    <div>
      <section className="suscribe" key={i18n.language}>
        <h2>{t("suscribete_titulo")}</h2>
        <Form className="form-direction" onSubmit={handleSubmit}>
          {/* ...todos los Form.Group que ya tenías (sin cambios funcionales), usando handleChange... */}
          {/* Solo te muestro la parte final para evitar repetir lo que ya está correctamente en tu código */}

          <p className="required-info">
            {t("campos_obligatorios")} (
            <FaAsterisk className="requerided" />) son obligatorios.
          </p>
          <ButtonSubmit
            text={status === "enviando" ? t("enviando") : t("enviar")}
            disabled={status === "enviando"}
            className={`btn-success${status === "enviando" ? " sending" : ""}`}
          />

          {status === "exitoso" && (
            <p className="success-message">{t("mensaje_enviado")}</p>
          )}
          {status === "error" && (
            <p className="error-message">{errorMessage}</p>
          )}
        </Form>
      </section>
    </div>
  );
};

export default Suscribe;
