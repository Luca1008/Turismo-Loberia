import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-ZYC3FGD412"; //"G-0QZ0Z47PL0"; 

// Inicializa Google Analytics
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

// Registra un pageview
export const trackPageview = (url) => {
  ReactGA.send({
    hitType: "pageview",
    page: url,
    title: document.title,
  });
};

// Registra un evento
export const trackEvent = ({ action, category, label, value }) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};
