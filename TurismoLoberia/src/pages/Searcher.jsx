import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";
import "../styles/searcher.css";

const Searcher = () => {
  const [cards, setCards] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTitle) params.title = searchTitle;
      if (cityFilter) params.city = cityFilter;
      if (categoryFilter) params.category = categoryFilter;

      const response = await axios.get("http://localhost:5000/api/cards", {
        params,
      });
      setCards(response.data);
    } catch (error) {
      console.error("Error al obtener cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCards();
  };

  return (
    <div className="search-page">
      <main className="search-main">
        <h1 className="search-title">Búsqueda de contenido</h1>

        {/* 🔍 Barra de búsqueda */}
        <form onSubmit={handleSearch} className="search-input-group">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {/* 🎯 Filtros */}
        <div className="search-filters">
          <Form.Select
            className="filter-select"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">Ciudad</option>
            <option value="Lobería">Lobería</option>
            <option value="Arenas Verdes">Arenas Verdes</option>
            <option value="San Manuel">San Manuel</option>
          </Form.Select>

          <Form.Select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Categoría</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Alojamiento">Alojamiento</option>
            <option value="Espacios públicos">Espacios públicos</option>
          </Form.Select>

          <Button onClick={handleSearch} className="filter-btn">
            Filtrar
          </Button>
        </div>

        {/* 🧩 Resultados */}
        <div className="results-grid">
          {loading ? (
            <Spinner animation="border" />
          ) : cards.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            cards.map((card) => (
              <div className="place-card" key={card.id}>
                <img
                  src={card.card_img_portada || "/placeholder.jpg"}
                  alt={card.card_title}
                  className="place-card__img"
                />
                <div className="place-card__body">
                  <h5 className="place-card__title">{card.card_title}</h5>
                  <p className="place-card__desc">
                    {card.card_description?.slice(0, 90)}...
                  </p>
                  <Button variant="link">Ver más</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Searcher;

