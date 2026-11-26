import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global, resolveApiUrl } from "../../../helpers/Global";
import { EDITABLE_SECTIONS } from "../../../helpers/editableSections";
import "../../../styles/panelAdmin.css";

/**
 * Componente `EditarSecciones`
 *
 * Permite al superadmin reemplazar la imagen de portada de una sección de
 * ciudad (ej. "Cómo llegar" de Partido de Lobería), o restablecerla al
 * contenido original del sitio.
 *
 * Por ahora solo la imagen es editable acá (la edición de texto quedó
 * deshabilitada en el formulario, aunque el backend y el hook público la
 * siguen soportando por si se retoma más adelante).
 *
 * El contenido original nunca se pierde: mientras no se cargue un override,
 * las páginas públicas siguen mostrando la imagen que ya tenían.
 *
 * @component
 * @returns {JSX.Element}
 */
const EditarSecciones = () => {
  const { t } = useTranslation();
  const cityIds = Object.keys(EDITABLE_SECTIONS);

  const [selectedCity, setSelectedCity] = useState(cityIds[0]);
  const [selectedSection, setSelectedSection] = useState(
    EDITABLE_SECTIONS[cityIds[0]][0]
  );

  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);

  const [loading, setLoading] = useState(false);

  /** Trae la imagen actual (si hay override) al elegir ciudad/sección */
  useEffect(() => {
    let cancelled = false;
    setNewImage(null);
    setUseDefaultImage(false);

    fetch(`${Global.url}sections/${selectedCity}/${selectedSection}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setCurrentImageUrl(resolveApiUrl(data.imageUrl));
      })
      .catch(() => {
        if (cancelled) return;
        setCurrentImageUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCity, selectedSection]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedSection(EDITABLE_SECTIONS[city][0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (useDefaultImage) {
        formData.append("resetImage", "true");
      } else if (newImage) {
        formData.append("image", newImage);
      } else {
        toast.error("Selecciona una imagen o marca 'Usar imagen default'.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${Global.url}sections/${selectedCity}/${selectedSection}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Error al guardar los cambios.");
      }

      const data = await response.json();
      setCurrentImageUrl(resolveApiUrl(data.imageUrl));
      setNewImage(null);
      setUseDefaultImage(false);
      toast.success("Imagen actualizada correctamente.");
    } catch (error) {
      toast.error(error.message || "Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="editar-secciones">
      <h3 className="content__title">Editar secciones</h3>
      <p className="text-muted">
        Elegí una ciudad y una sección para reemplazar su imagen de portada.
        Mientras no cargues una imagen, la sección sigue mostrando la
        original del sitio.
      </p>

      <Form onSubmit={handleSubmit} className="register-form">
        <Form.Group className="mb-3" controlId="editarSeccionesCiudad">
          <Form.Label>Ciudad</Form.Label>
          <Form.Select value={selectedCity} onChange={handleCityChange}>
            {cityIds.map((city) => (
              <option key={city} value={city}>
                {t(city)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="editarSeccionesSeccion">
          <Form.Label>Sección</Form.Label>
          <Form.Select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            {EDITABLE_SECTIONS[selectedCity].map((section) => (
              <option key={section} value={section}>
                {t(section)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="editarSeccionesImagen">
          <Form.Label>Imagen de portada</Form.Label>
          {currentImageUrl && !useDefaultImage && (
            <div style={{ marginBottom: "1rem" }}>
              <img
                src={currentImageUrl}
                alt="Imagen actual de la sección"
                style={{ maxWidth: "100%", maxHeight: "180px", borderRadius: "8px" }}
              />
              <div style={{ fontSize: "0.9rem", color: "#888" }}>
                Imagen personalizada actual
              </div>
            </div>
          )}
          {!currentImageUrl && (
            <div style={{ fontSize: "0.9rem", color: "#888", marginBottom: "0.5rem" }}>
              Actualmente se muestra la imagen por defecto del sitio.
            </div>
          )}
          <Form.Control
            type="file"
            accept="image/*"
            disabled={useDefaultImage}
            onChange={(e) => setNewImage(e.target.files[0])}
            key={selectedCity + selectedSection + (useDefaultImage ? "-default" : "-custom")}
          />
          <Form.Check
            className="mt-2"
            type="checkbox"
            id="editarSeccionesUsarDefault"
            label="Usar imagen default"
            checked={useDefaultImage}
            onChange={(e) => setUseDefaultImage(e.target.checked)}
          />
        </Form.Group>

        <Button variant="success" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Form>
      <ToastContainer />
    </section>
  );
};

export default EditarSecciones;
