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
      Clima: "Clima",
      buscar: "Buscar...",
      idioma: "Idioma",
      espanol: "Español",
      ingles: "Inglés",
      suscribirme: "Suscribirme",
      guia_servicios: "Guía de Servicios",
      Alojamientos: "Alojamientos",
      Gastronomia: "Gastronomía",
      lugares_interes: "Lugares de Interés",
      artesanos: "Artesanos",
      servicios_publicos: "Servicios Públicos",
      info_util: "Info Útil",
      descubri_loberia: "Descubrí Lobería",
      explora_loberia: "Explorá la naturaleza, historia y cultura de Lobería, Arenas Verdes y San Manuel.",
      proximos_eventos: "Próximos Eventos",
      eventos_intro: "No te pierdas todos los eventos que tenemos para vos!!!",
      actualidad: "Actualidad",
      admin_title: "Panel de Administración",
      email: "Correo electrónico",
      password: "Contraseña",
      placeholder_password: "contraseña",
      no_account: "¿No tienes cuenta? Regístrate aquí",
      loading: "Cargando...",
      login: "Logueate",
      error_password_min: "La contraseña debe tener al menos 8 caracteres.",
      error_login: "Error al iniciar sesión",
      error_conexion: "Error de conexión",
      base_campamentos: "Base de campamento",
      que_hacer2: "¿Qué hacer?",
      cargando: "Cargando...",
      ubicacion: "Ubicación",
      horarios: "Horarios",
      contactos: "Contactos",
      informacion: "Información",
      fecha_evento: "Fecha del evento"
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
      Clima: "Weather",
      buscar: "Search...",
      idioma: "Language",
      espanol: "Spanish",
      ingles: "English",
      suscribirme: "Subscribe",
      guia_servicios: "Service Guide",
      Alojamientos: "Accommodations",
      Gastronomia: "Gastronomy",
      lugares_interes: "Places of Interest",
      artesanos: "Artisans",
      servicios_publicos: "Public Services",
      info_util: "Useful Info",
      descubri_loberia: "Discover Lobería",
      explora_loberia: "Explore the nature, history and culture of Lobería, Arenas Verdes and San Manuel.",
      proximos_eventos: "Upcoming Events",
      eventos_intro: "Don't miss all the events we have for you!!!",
      actualidad: "News",
      admin_title: "Admin Panel",
      email: "Email",
      password: "Password",
      placeholder_password: "password",
      no_account: "Don't have an account? Register here",
      loading: "Loading...",
      login: "Login",
      error_password_min: "Password must be at least 8 characters.",
      error_login: "Login error",
      error_conexion: "Connection error",
      que_hacer2: "Things to Do",
      base_campamentos: "Camping Base",
      cargando: "Loading...",
      ubicacion: "Location",
      horarios: "Opening Hours",
      contactos: "Contacts",
      informacion: "Information",
      fecha_evento: "Event Date"
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
