import { useCallback, useEffect, useState } from "react";
import { Global } from "../helpers/Global";
import {
  ACCOMMODATION_CITY,
  ACCOMMODATION_FALLBACK,
} from "../helpers/alojamientos";

/** Error con el status HTTP, para distinguir sesión vencida (401). */
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const request = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new ApiError(`HTTP ${res.status}`, res.status);
  return res.json();
};

/**
 * Hook `useAccommodations`
 *
 * Carga los alojamientos de una ciudad (cards de categoría "Alojamiento"
 * con `card_tipo`) y expone funciones para crearlos, editarlos y borrarlos
 * (requieren sesión de admin).
 *
 * Si la API falla o todavía no devuelve alojamientos con tipo (ej. antes de
 * correr las migraciones), usa los datos de respaldo de
 * helpers/alojamientos.js en modo solo lectura (`source: "fallback"`).
 *
 * @param {"loberia"|"arenas_verdes"} cityKey
 */
const useAccommodations = (cityKey) => {
  const city = ACCOMMODATION_CITY[cityKey];
  const [state, setState] = useState({ items: [], source: null, loading: true });

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams({ category: "Alojamiento", city, limit: "200" });
      const data = await request(`${Global.url}cards?${params}`);
      const typed = (data.cards || []).filter((c) => c.card_tipo);
      if (typed.length > 0) {
        setState({ items: typed, source: "api", loading: false });
        return;
      }
    } catch (err) {
      console.error("No se pudieron cargar los alojamientos:", err);
    }
    setState({ items: ACCOMMODATION_FALLBACK[cityKey] || [], source: "fallback", loading: false });
  }, [city, cityKey]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Crea (sin `id`) o actualiza (con `id`) un alojamiento.
   * Al editar se reenvían los campos que el formulario no muestra
   * (link de ubicación, horario, coordenadas, fecha): el backend actualiza
   * todas las columnas y sin esto los dejaría vacíos.
   */
  const save = useCallback(
    async (fields, original) => {
      const body = {
        card_link_ubicacion: original?.card_link_ubicacion ?? null,
        card_horario: original?.card_horario ?? null,
        card_lat: original?.card_lat ?? null,
        card_lon: original?.card_lon ?? null,
        card_date: original?.card_date ?? null,
        ...fields,
        card_city: city,
        card_category: "Alojamiento",
      };
      const url = original?.id ? `${Global.url}cards/${original.id}` : `${Global.url}cards`;
      await request(url, {
        method: original?.id ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      await load();
    },
    [city, load]
  );

  const remove = useCallback(
    async (id) => {
      await request(`${Global.url}cards/${id}`, { method: "DELETE", headers: authHeaders() });
      await load();
    },
    [load]
  );

  return { ...state, city, save, remove };
};

export default useAccommodations;
