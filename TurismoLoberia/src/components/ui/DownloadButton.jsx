import React from 'react';
import { FiDownload } from 'react-icons/fi';

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