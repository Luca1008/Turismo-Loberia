import ReactGA from "react-ga4";

// 👉 Reemplaza con tu ID real de medición
const GA_MEASUREMENT_ID = "G-0QZ0Z47PL0";

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageview = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const trackEvent = ({ category, action, label }) => {
  ReactGA.event({ category, action, label });
};