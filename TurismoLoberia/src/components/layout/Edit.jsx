import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../common/ButtonSubmit";
import Button from "react-bootstrap/Button";
import NominatimAutocomplete from "../common/NominatimAutocomplete";

const Edit = ({ cardId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    linkUbicacion: "",
    lat: "",
    lon: "",
    horario: "",
    contacto: "",
    informacion: "",
    ciudad: "",
    categoria: "",
    fecha: "",
  });
  const [imagen, setImagen] = useState(null);
  const [imagenActual, setImagenActual] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Cargar datos de la card al montar el componente
  useEffect(() => {
    if (cardId) {
      fetchCardData();
    }
  }, [cardId]);

  const fetchCardData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cards/${cardId}`);
      if (response.ok) {
        const card = await response.json();
        setFormData({
          titulo: card.card_title || "",
          descripcion: card.card_description || "",
          ubicacion: card.card_ubicacion || "",
          linkUbicacion: card.card_link_ubicacion || "",
          lat: card.card_lat || "",
          lon: card.card_lon || "",
          horario: card.card_horario || "",
          contacto: card.card_contacto || "",
          informacion: card.card_info || "",
          ciudad: card.card_city || "",
          categoria: card.card_category || "",
          fecha: card.card_date ? card.card_date.substring(0, 10) : "",
        });
        setImagenActual(card.card_img_portada || "");
      } else {
        setError("Error al cargar los datos de la card.");
      }
    } catch (err) {
      setError("Error de conexión al cargar los datos.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setError("");

    try {
      const data = new FormData();
      data.append("card_title", formData.titulo);
      data.append("card_description", formData.descripcion);
      data.append("card_ubicacion", formData.ubicacion);
      data.append("card_link_ubicacion", formData.linkUbicacion);
      data.append("card_lat", formData.lat);
      data.append("card_lon", formData.lon);
      data.append("card_horario", formData.horario);
      data.append("card_contacto", formData.contacto);
      data.append("card_info", formData.informacion);
      data.append("card_city", formData.ciudad);
      data.append("card_category", formData.categoria);
      if (formData.categoria === "Evento") {
        data.append("card_date", formData.fecha);
      }
      if (imagen) {
        data.append("card_img_portada", imagen);
      }

      const response = await fetch(`http://localhost:5000/api/cards/${cardId}`, {
        method: "PUT",
        body: data,
      });

      if (response.ok) {
        setMensaje("¡Card actualizada exitosamente!");
        setTimeout(() => {
          if (onClose) onClose();
          if (onUpdate) onUpdate();
          // window.location.reload(); // opcional, mejor no recargar toda la página
        }, 1200);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al actualizar la card.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return (
    <div className="edit-card-modal">
      <div className="modal-header">
        <h3>Editar Card</h3>
        <button
          type="button"
          className="btn-close"
          onClick={handleCancel}
          aria-label="Cerrar"
        ></button>
      </div>

      <Form
        className="form-edit-card"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3" controlId="titulo">
          <Form.Label>Título del lugar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ubicacion">
          <Form.Label>Ubicación</Form.Label>
          <NominatimAutocomplete
            onSelect={(place) => {
              const ubicacion = place.display_name;
              const linkUbicacion = `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=18/${place.lat}/${place.lon}`;
              setFormData((prev) => ({
                ...prev,
                ubicacion,
                linkUbicacion,
                lat: place.lat,
                lon: place.lon,
              }));
            }}
          />
        </Form.Group>
        {formData.linkUbicacion && (
          <Form.Group className="mb-3" controlId="linkUbicacion">
            <Form.Label>Vista previa en OpenStreetMap</Form.Label>
            <div>
              <a
                href={formData.linkUbicacion}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.linkUbicacion}
              </a>
            </div>
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="horario">
          <Form.Label>Horario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Horario"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contacto">
          <Form.Label>Contacto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Teléfono, email, etc."
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="informacion">
          <Form.Label>Información</Form.Label>
          <Form.Control
            type="text"
            placeholder="Información"
            name="informacion"
            value={formData.informacion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ciudad">
          <Form.Label>Ciudad</Form.Label>
          <Form.Select
            aria-label="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una ciudad</option>
            <option value="Lobería">Lobería</option>
            <option value="Arenas Verdes">Arenas Verdes</option>
            <option value="San Manuel">San Manuel</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="categoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            aria-label="Categoría"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Alojamiento">Alojamiento</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Cultura">Cultura</option>
            <option value="Evento">Evento</option>
          </Form.Select>
        </Form.Group>

        {formData.categoria === "Evento" && (
          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha del evento</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formFile">
          {imagenActual && !imagen && (
            <div style={{ marginBottom: "1rem" }}>
              <img
                src={imagenActual}
                alt="Imagen actual"
                style={{ maxWidth: "100%", maxHeight: "180px", borderRadius: "8px" }}
              />
              <div style={{ fontSize: "0.9rem", color: "#888" }}>Imagen actual</div>
            </div>
          )}
          <Form.Label>Imagen de Portada</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          <Form.Text className="text-muted">Deja vacío para mantener la imagen actual</Form.Text>
        </Form.Group>

        {mensaje && <div className="alert alert-success mt-2">{mensaje}</div>}
        {error && <div className="alert alert-danger mt-2">{error}</div>}

        <div className="modal-footer">
          <Button
            variant="secondary"
            type="button"
            className="me-2"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <ButtonSubmit
            type="submit"
            text={loading ? "Actualizando..." : "Actualizar"}
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          />
        </div>
      </Form>
    </div>
  );
};

export default Edit;
