import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';



i18n
  .use(HttpBackend)                  // 🔌 Carga los archivos .json por HTTP
  .use(LanguageDetector)            // 🌍 Detecta idioma del navegador
  .use(initReactI18next)            // 🔁 Integra con React
  .init({
    fallbackLng: 'es',              // 🌐 Idioma por defecto
    debug: true,                   // Cambiá a true para debuggear
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // 📂 Carga desde /public/locales
    },
    interpolation: {
      escapeValue: false            // ✅ No hace falta escape en React
    }
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
