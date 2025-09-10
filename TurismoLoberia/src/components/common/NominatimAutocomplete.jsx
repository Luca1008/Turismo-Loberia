import React, { useState, useEffect } from "react";

const NominatimAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length < 3) return;

    const timeoutId = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setResults([]);
    onSelect(place);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Buscar ubicación</label>
      <input
        type="text"
        className="form-control"
        placeholder="Ej. Plaza San Martín"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="list-group position-absolute zindex-dropdown">
          {results.map((place) => (
            <li
              key={place.place_id}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(place)}
              style={{ cursor: "pointer" }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NominatimAutocomplete;
