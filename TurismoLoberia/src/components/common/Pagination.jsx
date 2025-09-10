import React from "react";
import Pagination from "react-bootstrap/Pagination";

/**
 * Componente `AdvancedExample`
 *
 * Ejemplo avanzado de paginación usando `react-bootstrap`.
 * Incluye botones de primera página, anterior, siguiente, última página,
 * items de página, y elementos de elipsis para representar saltos de páginas.
 *
 * @component
 *
 * @returns {JSX.Element} Componente de paginación completo.
 *
 * @example
 * <AdvancedExample />
 */
function AdvancedExample() {
  return (
    <Pagination className="pagination">
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default AdvancedExample;
