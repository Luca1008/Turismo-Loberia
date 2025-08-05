import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-0QZ0Z47PL0"; // tu ID real

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageview = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const trackEvent = (eventName, options = {}) => {
  ReactGA.event(eventName, options);
};
