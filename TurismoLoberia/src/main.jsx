import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import './styles/style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n/i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);