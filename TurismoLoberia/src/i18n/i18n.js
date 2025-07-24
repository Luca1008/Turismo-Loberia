import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // ✅ Solo cargamos desde archivos locales

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es', // Idioma por defecto si no se encuentra otro
    debug: false, // Activá true si querés ver logs de i18next

    backend: {
      // 🔹 Ruta donde buscará los archivos JSON de traducción
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false,
    },
  });

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
