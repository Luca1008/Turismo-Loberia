import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
/* import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'; */


// 🧠 Traducciones en memoria
const resources = {
  es: {
    translation: {
      partido_loberia: "Partido de Lobería",
      ciudad_loberia: "Ciudad de Lobería",
      san_manuel: "San Manuel",
      arenas_verdes: "Arenas Verdes",
      informacion_general: "Información General",
      historia: "Historia",
      naturaleza: "Naturaleza",
      producciones: "Producciones",
      como_llegar: "Cómo Llegar",
      alojamientos: "Alojamientos",
      gastronomia: "Gastronomía",
      transporte: "Transporte",
      agenda: "Agenda",
      que_hacer: "Qué Hacer",
      descargas: "Descargas",
      clima: "Clima",
      buscar: "Buscar...",
      idioma: "Idioma",
      espanol: "Español",
      ingles: "Inglés",
      suscribirme: "Suscribirme"
    },
  },
  en: {
    translation: {
      partido_loberia: "Lobería District",
      ciudad_loberia: "Lobería City",
      san_manuel: "San Manuel",
      arenas_verdes: "Green Sands",
      informacion_general: "General Info",
      historia: "History",
      naturaleza: "Nature",
      producciones: "Productions",
      como_llegar: "How to Get There",
      alojamientos: "Accommodations",
      gastronomia: "Gastronomy",
      transporte: "Transportation",
      agenda: "Agenda",
      que_hacer: "Things to Do",
      descargas: "Downloads",
      clima: "Weather",
      buscar: "Search...",
      idioma: "Language",
      espanol: "Spanish",
      ingles: "English",
      suscribirme: "Subscribe"
    },
  },
};


i18n
/*   .use(HttpBackend)                  // 🔌 Carga los archivos .json por HTTP
  .use(LanguageDetector)            // 🌍 Detecta idioma del navegador */
  .use(initReactI18next)            // 🔁 Integra con React
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });
/*     fallbackLng: 'es',              // 🌐 Idioma por defecto
    debug: true,                   // Cambiá a true para debuggear
    backend: {
      loadPath: '/public/locales/{{lng}}/{{ns}}.json' // 📂 Carga desde /public/locales
    },
    interpolation: {
      escapeValue: false            // ✅ No hace falta escape en React
    }
  }); */
  

export default i18n;

































/* import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: false,
    backend: {
      backends: [
        // 1️⃣ Archivos locales
        HttpBackend,
        // 2️⃣ Fallback a LibreTranslate
        class {
          static type = 'backend';
          init() {}

          read(language, namespace, callback) {
            fetch('https://libretranslate.de/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                q: namespace,
                source: 'es',
                target: language,
                format: 'text',
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                callback(null, { [namespace]: data.translatedText });
              })
              .catch((err) => callback(err, false));
          }
        },
      ],
      backendOptions: [
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        {}, // no options for libretranslate
      ],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; */
