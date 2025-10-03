import axios from "axios";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { FaSearch } from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import ContentCard from "../components/cards/ContentCard";
import "../styles/Searcher.css";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../analytics";
import { Global } from "../helpers/Global";

/**
 * Componente `Searcher`.
 *
 * Permite buscar contenido filtrando por nombre, ciudad y categoría.
 * Muestra sugerencias dinámicas mientras se escribe, paginación, y resultados en tarjetas.
 * Permite edición y eliminación de tarjetas si el usuario es admin.
 *
 * @component
 * @param {Object} props
 * @param {boolean} [props.isAdmin=false] - Indica si el usuario tiene permisos de administrador.
 * @param {Function|null} [props.onEdit=null] - Función que se ejecuta al editar una tarjeta.
 * @example
 * <Searcher isAdmin={true} onEdit={(id) => console.log(id)} />
 *
 * @returns {JSX.Element} Componente de búsqueda con filtros y resultados.
 */
const Searcher = ({ isAdmin = false, onEdit = null }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  /** Estado de las tarjetas resultantes de la búsqueda */
  const [cards, setCards] = useState([]);

  /** Estado del texto buscado */
  const [search, setSearch] = useState("");

  /** Estado de la ciudad filtrada */
  const [city, setCity] = useState(location.state?.city || "");

  /** Estado de la categoría filtrada */
  const [category, setCategory] = useState(location.state?.category || "");

  /** Estado de la página actual para paginación */
  const [page, setPage] = useState(1);

  /** Estado del total de páginas */
  const [totalPages, setTotalPages] = useState(1);

  /** Estado de las sugerencias mientras se escribe */
  const [suggestions, setSuggestions] = useState([]);

  const limit = 6;

  /** Referencias para valores actuales de búsqueda y filtros */
  const searchRef = useRef(search);
  const cityRef = useRef(city);
  const categoryRef = useRef(category);
  const pageRef = useRef(page);

  useEffect(() => {
    searchRef.current = search;
    cityRef.current = city;
    categoryRef.current = category;
    pageRef.current = page;
  }, [search, city, category, page]);

  /** Categorías disponibles para búsqueda */
  const categoriasDisponibles = useMemo(
    () => [
      "Alojamiento",
      "Gastronomia",
      "Cultura",
      "Evento",
      "Interes",
      "Artesanos",
      "ServPublicos",
      "InfoUtil",
    ],
    []
  );

  /**
   * Convierte un buffer de imagen en Base64 para mostrarla.
   * @param {Object} buffer - Objeto con data de la imagen.
   * @returns {string|null} Cadena base64 de la imagen o null si no hay data.
   */
  const bufferToBase64 = useCallback((buffer) => {
    if (!buffer?.data) return null;
    const binary = buffer.data.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
  }, []);

  /**
   * Obtiene las tarjetas desde el backend según filtros y página actual.
   */
  const fetchCards = useCallback(async () => {
    try {
      const params = {
        ...(searchRef.current && { title: searchRef.current }),
        ...(cityRef.current && { city: cityRef.current }),
        ...(categoryRef.current && { category: categoryRef.current }),
        page: pageRef.current,
        limit,
      };

      const response = await axios.get(`${Global.url}cards`, { params });
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
  }, [limit, bufferToBase64]);

  /**
   * Obtiene sugerencias de títulos y categorías mientras el usuario escribe.
   * @param {string} texto - Texto ingresado en la barra de búsqueda.
   */
  const fetchSuggestions = useCallback(
    async (texto) => {
      try {
        const response = await axios.get(`${Global.url}cards`, {
          params: { title: texto, limit: 5 },
        });

        const titles =
          response.data.cards?.map((c) => ({
            type: "title",
            id: c.id,
            value: c.card_title,
          })) || [];

        const categories = categoriasDisponibles
          .filter((cat) => cat.toLowerCase().includes(texto.toLowerCase()))
          .map((cat) => ({ type: "category", value: cat }));

        setSuggestions([...titles, ...categories]);
      } catch (error) {
        console.error("Error al obtener sugerencias:", error);
        setSuggestions([]);
      }
    },
    [categoriasDisponibles]
  );

  /** Inicializa búsqueda desde URL y tracking de vista de página */
  useEffect(() => {
    const titleFromUrl = searchParams.get("title");
    if (titleFromUrl) setSearch(titleFromUrl);
    trackEvent({
      category: "Páginas",
      action: "Vista página",
      label: "Buscador",
    });
  }, [searchParams]);

  /** Ejecuta fetchCards al cambiar filtros o página */
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

  /** Maneja sugerencias mientras el usuario escribe */
  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetchSuggestions(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchSuggestions]);

  /**
   * Maneja la selección de una sugerencia.
   * @param {Object} s - Sugerencia seleccionada.
   */
  const handleSuggestionClick = (s) => {
    if (s.type === "title") {
      setSearch(s.value);
      setPage(1);
    } else if (s.type === "category") {
      setCategory(s.value);
      setSearch("");
      setPage(1);
    }
    setSuggestions([]);
  };

  /**
   * Elimina una tarjeta por ID si el usuario es admin.
   * @param {string|number} cardId - ID de la tarjeta a eliminar.
   */
  const handleDeleteCard = async (cardId) => {
    try {
      const response = await axios.delete(`${Global.url}cards/${cardId}`);
      if (response.status === 200) fetchCards();
    } catch (error) {
      console.error("Error al eliminar la card:", error);
    }
  };

  /**
   * Ejecuta la función de edición si el usuario es admin.
   * @param {string|number} cardId - ID de la tarjeta a editar.
   */
  const handleEditCard = (cardId) => {
    if (onEdit) onEdit(cardId);
  };

  /**
   * Resetea todos los filtros y búsqueda.
   */
  const handleReset = () => {
    setSearch("");
    setCity("");
    setCategory("");
    setPage(1);
    setSuggestions([]);
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

        {/* Barra de búsqueda y sugerencias */}
        <div className="search-bar">
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
            <button onClick={fetchCards}>
              <FaSearch />
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <span>{s.value}</span>
                  <span className="suggestion-type">
                    {s.type === "title" ? " (Título)" : " (Categoría)"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filtros */}
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

          <Button
            className="btn-reset"
            variant="outline-secondary"
            onClick={handleReset}
          >
            {t("limpiar_filtros")}
          </Button>
        </div>

        {/* Filtros activos */}
        {(search || city || category) && (
          <div className="active-filters">
            <strong>{t("filtros_activos")}: </strong>
            {search && (
              <span className="filter-tag">
                {t("busqueda")}: {search}
              </span>
            )}
            {city && (
              <span className="filter-tag">
                {t("ciudad")}: {city}
              </span>
            )}
            {category && (
              <strong className="filter-tag">
                {t("categoria")}: {category}
              </strong>
            )}
          </div>
        )}

        {/* Resultados */}
        <div className="results-grid">
          {cards.length > 0 ? (
            cards.map((card) => (
              <ContentCard
                key={card.id}
                id={card.id}
                title={card.card_title}
                description={card.card_description}
                city={card.card_city}
                img={card.card_img_portada}
                category={card.card_category}
                card_date={card.card_date}
                {...(isAdmin && {
                  onEdit: handleEditCard,
                  onDelete: handleDeleteCard,
                })}
              />
            ))
          ) : (
            <div className="no-results">
              <p>{t("no_se_encontraron_resultados")}</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <Pagination className="pagination-container">
            <Pagination.First
              onClick={() => setPage(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        )}
      </main>
    </div>
  );
};

export default Searcher;
