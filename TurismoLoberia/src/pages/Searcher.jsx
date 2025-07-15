import React from "react";
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import PlaceCard from "../components/cards/PlaceCard";
import AdvancedExample from "../components/common/Pagination";
import "../styles/searcher.css";

export const Buscador = () => {
  return (
    <div className="search-page">
      <main className="search-main">
        <h1 className="search-title">Busqueda de contenido</h1>

        {/* Input principal */}
        <div className="search-input-group">
          <input type="text" placeholder="Buscar por nombre..." />
          <button><FaSearch /></button>
        </div>

        {/* Filtros */}
        <div className="search-filters">
          <Form.Select className="filter-select select-label-primary"> 
            <option value="">Ciudad</option>
            <option value="loberia">Lobería</option>
            <option value="sanmanuel">Arenas Verdes</option>
            <option value="sanmanuel">San Manuel</option>
          </Form.Select>

          <Form.Select className="filter-select select-label-primary">
            <option value="">Categoría</option>
            <option value="alojamiento">Alojamiento</option>
            <option value="gastronomia">Gastronomía</option>
          </Form.Select>
        </div>

        {/* Tarjetas de lugares */}
        <div className="results-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <PlaceCard key={i} />
          ))}
        </div>

        {/* Paginación de Bootstrap */}
        <div className="pagination-container">
          <AdvancedExample />
        </div>
      </main>
    </div>
  );
};

export default Buscador;

