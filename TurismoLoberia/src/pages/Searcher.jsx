import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { FaSearch } from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import ContentCard from "../components/cards/ContentCard";
import "../styles/searcher.css";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../analytics";

const Searcher = ({ isAdmin = false, onEdit = null }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  // Estados
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(location.state?.city || "");
  const [category, setCategory] = useState(location.state?.category || "");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  // Función para convertir buffer a base64
  const bufferToBase64 = useCallback((buffer) => {
    if (!buffer?.data) return null;
    const binary = buffer.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
  }, []);

  // fetchCards memoizada con useCallback
  const fetchCards = useCallback(async () => {
    try {
      const params = {
        ...(search && { title: search }),
        ...(city && { city }),
        ...(category && { category }),
        page,
        limit,
      };

      const response = await axios.get("http://localhost:5000/api/cards", { params });
      const cardsDB = response.data.cards || response.data;
      const total = response.data.total || cardsDB.length;

      const parsed = cardsDB.map((card) => {
        trackEvent({
          category: "Resultados",
          action: "Card vista",
          label: card.card_title,
        });
        return {
          ...card,
          img: bufferToBase64(card.card_img_portada),
        };
      });

      setCards(parsed);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error("Error al obtener las cards:", error);
      setCards([]);
    }
  }, [search, city, category, page, limit, bufferToBase64]);

  // Efecto para manejar parámetros iniciales de URL
  useEffect(() => {
    const titleFromUrl = searchParams.get("title");
    if (titleFromUrl) {
      setSearch(titleFromUrl);
    }
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Buscador",
    });
  }, [searchParams]);

  // Efecto principal con debounce para búsquedas
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCards();
      trackEvent({
        category: "Búsqueda",
        action: "Filtros cambiados",
        label: `Página: ${page}, Búsqueda: ${search}, Ciudad: ${city}, Categoría: ${category}`,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchCards, page, search, city, category]);

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/cards/${cardId}`);
      if (response.status === 200) fetchCards();
    } catch (error) {
      console.error("Error al eliminar la card:", error);
    }
  };

  const handleEditCard = (cardId) => {
    if (onEdit) onEdit(cardId);
  };

  const handleReset = () => {
    setSearch("");
    setCity("");
    setCategory("");
    setPage(1);
    // ✅ Evento: limpiar filtros
    trackEvent({
      category: "Botón",
      action: "Limpiar filtros",
      label: "Buscador",
    });
  };

  return (
    <div className="search-page" key={i18n.language}>
      <main className="search-main">
        <h1 className="search-title">{t("busqueda_contenido")}</h1>

        {/* 🔍 Buscador por título */}
        <div className="search-input-group">
          <input
            type="text"
            placeholder={t("buscar_por_nombre")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
              trackEvent({
                category: "Buscador",
                action: "Búsqueda por nombre",
                label: e.target.value,
              });
            }}
          />
          <button onClick={fetchCards}><FaSearch /></button>
        </div>

        {/* 🎯 Filtros */}
        <div className="search-filters">
          <Form.Select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setPage(1);
              trackEvent({
                category: "Filtro",
                action: "Ciudad seleccionada",
                label: e.target.value || "Todas",
              });
            }}
          >
            <option value="">{t("ciudad")}</option>
            <option value="Lobería">{t("ciudad_loberia")}</option>
            <option value="Arenas Verdes">{t("arenas_verdes")}</option>
            <option value="San Manuel">{t("san_manuel")}</option>
          </Form.Select>

          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
              trackEvent({
                category: "Filtro",
                action: "Categoría seleccionada",
                label: e.target.value || "Todas",
              });
            }}
          >
            <option value="">{t("categoria")}</option>
            <option value="Alojamiento">{t("alojamiento")}</option>
            <option value="Gastronomia">{t("gastronomia")}</option>
            <option value="Cultura">{t("cultura")}</option>
            <option value="Evento">{t("evento")}</option>
            <option value="Interes">{t("lugares_interes")}</option>
            <option value="Artesanos">{t("artesanos")}</option>
            <option value="ServPublicos">{t("servicios_publicos")}</option>
            <option value="InfoUtil">{t("info_util")}</option>
          </Form.Select>

          <Button className="btn-reset" variant="outline-secondary" onClick={handleReset}>
            {t("limpiar_filtros")}
          </Button>
        </div>

        {/* 🗂️ Resultados */}
        <div className="results-grid">
          {cards.map((card) => (
            <ContentCard
              key={card.id}
              id={card.id}
              title={card.card_title}
              description={card.card_description}
              city={card.card_city}
              img={card.card_img_portada}
              category={card.card_category}
              card_date={card.card_date}
              {...(isAdmin && { onEdit: handleEditCard, onDelete: handleDeleteCard })}
            />
          ))}
        </div>

        {/* 📄 Paginación */}
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
