import React from "react";
import { FaSearch } from "react-icons/fa";
import PlaceCard from "../components/cards/PlaceCard";
import AdvancedExample from "../components/common/Pagination";
import "../styles/Searcher.css";

export const Buscador = () => {
  return (
    <div className="search-page">
      <main className="search-main">
        <h1 className="search-title">Buscador</h1>

        {/* Input principal */}
        <div className="search-input-group">
          <input type="text" placeholder="Buscar..." />
          <button><FaSearch /></button>
        </div>

        {/* Filtros */}
        <div className="search-filters">
          <select className="filter-select">
            <option value="">Ciudad</option>
            <option value="loberia">Lobería</option>
            <option value="sanmanuel">San Manuel</option>
          </select>

          <select className="filter-select">
            <option value="">Categoría</option>
            <option value="turismo">Turismo</option>
            <option value="gastronomia">Gastronomía</option>
          </select>
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

