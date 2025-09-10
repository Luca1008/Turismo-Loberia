import React from 'react';
import { FiDownload } from 'react-icons/fi';

/**
 * Componente `DownloadButton`
 *
 * Renderiza un botón que permite descargar un archivo específico.
 * Incluye un icono de descarga y un label opcional.
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.filePath="/downloads/name.pdf"] - Ruta del archivo a descargar.
 * @param {string} [props.fileName="name.pdf"] - Nombre con el que se descargará el archivo.
 * @param {string} [props.label="Descargar name"] - Texto que se muestra junto al icono.
 * @param {string} [props.className="button"] - Clase CSS para personalizar estilos del botón.
 *
 * @example
 * <DownloadButton
 *   filePath="/downloads/manual.pdf"
 *   fileName="manual.pdf"
 *   label="Descargar Manual"
 *   className="btn btn-primary"
 * />
 */
const DownloadButton = ({ 
  filePath = "/downloads/name.pdf",
  fileName = "name.pdf",
  label = "Descargar name",
  className = "button"
}) => {
  return (
    <a
      href={filePath}
      download={fileName}
      className={className}
    >
      <FiDownload />
      <span style={{ marginLeft: "0.5rem", color: "var(--primary-color)", fontWeight: "bold" }}>{label}</span>
    </a>
  );
};

export default DownloadButton;
