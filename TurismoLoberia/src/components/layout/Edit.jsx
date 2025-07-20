import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSubmit from "../common/ButtonSubmit";

const Edit = ({ cardId, onClose }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    horario: "",
    informacion: "",
    ciudad: "",
    categoria: "",
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
          titulo: card.titulo || "",
          descripcion: card.descripcion || "",
          ubicacion: card.ubicacion || "",
          horario: card.horario || "",
          informacion: card.informacion || "",
          ciudad: card.ciudad || "",
          categoria: card.categoria || "",
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
    setFormData({ ...formData, [name]: value });
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
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
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
        }, 2000);
      } else {
        setError("Error al actualizar la card.");
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
      
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <Form.Control
            type="text"
            placeholder="Ubicación"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
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
          >
            <option value="">Selecciona una categoría</option>
            <option value="Alojamiento">Alojamiento</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Cultura">Cultura</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Imagen de Portada</Form.Label>
          {imagenActual && (
            <div className="mb-2">
              <small className="text-muted">Imagen actual:</small>
              <img 
                src={`http://localhost:5000/uploads/${imagenActual}`} 
                alt="Imagen actual" 
                style={{ width: "100px", height: "60px", objectFit: "cover", display: "block", marginTop: "5px" }}
              />
            </div>
          )}
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Form.Text className="text-muted">
            Deja vacío para mantener la imagen actual
          </Form.Text>
        </Form.Group>
        
        {mensaje && <div className="alert alert-success mt-2">{mensaje}</div>}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        
        <div className="modal-footer">
          <ButtonSubmit
            type="button"
            text="Cancelar"
            className="btn btn-secondary me-2"
            onClick={handleCancel}
          />
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