// Utilidad para manejar links externos con confirmación
export default function handleExternalLink(e, url) {
    const confirmed = window.confirm("¿Está seguro de abandonar la página?");
    if (!confirmed) {
      e.preventDefault();
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
      e.preventDefault();
    }
}