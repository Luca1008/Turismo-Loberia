import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { FaSearch } from "react-icons/fa";

import PlaceCard from "../components/cards/PlaceCard";
import "../styles/searcher.css";

export const Searcher = () => {
  // --- Estados principales
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [noResults, setNoResults] = useState(false);

  // --- Estados para paginación
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  // === Utilidad: convertir Bytea (imagen) a base64
  const bufferToBase64 = (buffer) => {
    if (!buffer?.data) return null;
    const binary = buffer.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
  };

  // === Llamada al backend para traer las cards con filtros
  const fetchCards = async () => {
    try {
      const params = {
        ...(search && { title: search }),
        ...(city && { city }),
        ...(category && { category }),
        page,
        limit,
      };

      const response = await axios.get("http://localhost:5000/api/cards", { params });

      const cardsDB = response.data.cards || response.data; // fallback
      const total = response.data.total || cardsDB.length;

      const parsed = cardsDB.map((card) => ({
        ...card,
        img: bufferToBase64(card.card_img_portada),
      }));

      setCards(parsed);
      setTotalPages(Math.ceil(total / limit));
      setNoResults(parsed.length === 0);
    } catch (error) {
      console.error("Error al obtener las cards:", error);
      setCards([]);
      setNoResults(true);
    }
  };

  // === Ejecutar cada vez que cambien filtros o página
  useEffect(() => {
    fetchCards();
  }, [search, city, category, page]);

  return (
    <div className="search-page">
      <main className="search-main">
        <h1 className="search-title">Búsqueda de contenido</h1>

        {/* 🔍 Buscador por título */}
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <button onClick={fetchCards}><FaSearch /></button>
        </div>

        {/* 🎯 Filtros de ciudad y categoría */}
        <div className="search-filters">
          <Form.Select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Ciudad</option>
            <option value="Lobería">Lobería</option>
            <option value="Arenas Verdes">Arenas Verdes</option>
            <option value="San Manuel">San Manuel</option>
          </Form.Select>

          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Categoría</option>
            <option value="Alojamiento">Alojamiento</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Cultura">Cultura</option>
          </Form.Select>
        </div>

        {/* 🗂️ Resultados */}
        <div className="results-grid">
          {cards.length > 0 ? (
            cards.map((card) => (
              <PlaceCard
                key={card.id}
                title={card.card_title}
                description={card.card_description}
                city={card.card_city}
                img={card.img}
              />
            ))
          ) : (
            noResults && <p className="no-results-msg">No se encontraron resultados 🧐</p>
          )}
        </div>

        {/* 📄 Paginación con Bootstrap */}
        {totalPages > 1 && (
          <Pagination className="pagination-container">
            <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
            <Pagination.Prev onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item key={i} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} />
            <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
          </Pagination>
        )}
      </main>
    </div>
  );
};

export default Searcher;

