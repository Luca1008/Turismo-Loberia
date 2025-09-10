/**
 * Maneja la apertura de un enlace externo mostrando una confirmación al usuario.
 *
 * Muestra un diálogo de confirmación antes de abandonar la página. 
 * Si el usuario acepta, abre la URL en una nueva pestaña con `noopener` y `noreferrer`.
 *
 * @param {Event} e - Evento del enlace (por ejemplo, onClick de un <a>).
 * @param {string} url - URL externa que se desea abrir.
 *
 * @example
 * <a href="https://example.com" onClick={(e) => handleExternalLink(e, "https://example.com")}>
 *   Ir a Example
 * </a>
 */
export default function handleExternalLink(e, url) {
  const confirmed = window.confirm("¿Está seguro de abandonar la página?");
  if (!confirmed) {
    e.preventDefault();
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
    e.preventDefault();
  }
}
