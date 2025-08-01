import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FaAsterisk } from "react-icons/fa";
import ButtonSubmit from "../components/common/ButtonSubmit";
import { useTranslation } from "react-i18next";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        companions: checked
          ? [...prev.companions, value]
          : prev.companions.filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Aquí deberías agregar tu handleSubmit si quieres enviar los datos

  return (
    <div>
      <section className="suscribe" key={i18n.language}>
        <h2>{t("suscribete_titulo")}</h2>
        <Form className="form-direction">
          <Form.Group className="mb-3" controlId="formDirection">
            <Form.Label>
              {t("vivo_en")} <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              required
              placeholder={t("placeholder_ciudad")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSource">
            <Form.Label>
              {t("me_entere")} <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label={t("conocidos")}
                name="source"
                value="Conocidos"
                checked={formData.source.includes("Conocidos")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("radio")}
                name="source"
                value="Radio"
                checked={formData.source.includes("Radio")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("television")}
                name="source"
                value="Televisión"
                checked={formData.source.includes("Televisión")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("television")}
                name="source"
                value="Redes Sociales"
                checked={formData.source.includes("Redes Sociales")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("nunca_escuche")}
                name="source"
                value="Nunca escuché"
                checked={formData.source.includes("Nunca escuché")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("otros")}
                name="source"
                value="Otros"
                checked={formData.source.includes("Otros")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    source: checked
                      ? [...prev.source, value]
                      : prev.source.filter((v) => v !== value),
                  }));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formThink">
            <Form.Label>{t("pienso_en_loberia")}</Form.Label>
            <Form.Control
              type="text"
              name="think"
              value={formData.think}
              onChange={handleChange}
              placeholder={t("placeholder_palabra")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProject">
            <Form.Label>
              {t("quiero_en_loberia")} <FaAsterisk className="requerided" />
            </Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              placeholder={t("placeholder_actividad")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCompanions">
            <Form.Label>
              {t("me_gustaria_ir")} <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label={t("solo")}
                name="companions"
                value="Solo/a"
                checked={formData.companions.includes("Solo/a")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label={t("en_pareja")}
                name="companions"
                value="En pareja"
                checked={formData.companions.includes("En pareja")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label={t("con_familia")}
                name="companions"
                value="Con familia"
                checked={formData.companions.includes("Con familia")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label={t("con_amigos")}
                name="companions"
                value="Con amigos"
                checked={formData.companions.includes("Con amigos")}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label={t("con_mascotas")}
                name="companions"
                value="Con mis mascotas"
                checked={formData.companions.includes("Con mis mascotas")}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTransport">
            <Form.Label>
              {t("iria_en")} <FaAsterisk className="requerided" />
            </Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label={t("micro_larga")}
                name="transport"
                value="Micro de larga distancia"
                checked={formData.transport?.includes(
                  "Micro de larga distancia"
                )}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("vehiculo_propio")}
                name="transport"
                value="Vehículo propio"
                checked={formData.transport?.includes("Vehículo propio")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("viajes_compartidos")}
                name="transport"
                value="Viajes compartidos"
                checked={formData.transport?.includes("Viajes compartidos")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("motorhome")}
                name="transport"
                value="Motorhome"
                checked={formData.transport?.includes("Motorhome")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("tour_agencia")}
                name="transport"
                value="Tour de Agencia de viajes"
                checked={formData.transport?.includes(
                  "Tour de Agencia de viajes"
                )}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label={t("otros")}
                name="transport"
                value="Otros"
                checked={formData.transport?.includes("Otros")}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    transport: checked
                      ? [...(prev.transport || []), value]
                      : (prev.transport || []).filter((v) => v !== value),
                  }));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>
              {t("nombre_apellido2")} <FaAsterisk className="requerided" />
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
              {t("email3")} <FaAsterisk className="requerided" />
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

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>
              {t("telefono")} <FaAsterisk className="requerided" />
            </Form.Label>
            <p style={{ fontSize: "0.9em", color: "#888" }}>
              Ingrese su número sin el 15 si es celular. Para líneas fijas,
              incluya el código de área. Si es del exterior, agregue +54.
            </p>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder={t("placeholder_telefono")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAccept">
            <Form.Check
              type="checkbox"
              label={t("acepto_politicas")}
              name="accept"
              checked={formData.accept}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, accept: e.target.checked }))
              }
              required
            />
          </Form.Group>
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
