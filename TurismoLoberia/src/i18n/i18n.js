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
      email: "Correo Electrónico",
      password: "Contraseña",
      placeholder_password: "contraseña",
      forgot_password: "¿Olvidaste tu contraseña?",
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
      fecha_evento: "Fecha del evento",
      contactanos: "Contactanos",
      nombre_apellido: "Nombre y Apellido",
      email2: "Email",
      asunto: "Asunto",
      mensaje: "Mensaje",
      placeholder_nombre: "Tu nombre completo",
      placeholder_email: "nombre@email.com",
      placeholder_asunto: "Motivo del mensaje",
      placeholder_mensaje: "Escribe tu mensaje aquí...",
      enviar: "Enviar",
      enviar_link: "Enviar link",
      enviando: "Enviando...",
      mensaje_exitoso: "¡Mensaje enviado exitosamente! Te responderemos a la brevedad.",
      registro: "Registro",
      nombre: "Nombre",
      apellido: "Apellido",
      correo_electronico: "Correo electrónico",
      contrasena: "Contraseña",
      registrarse: "Registrarse",
      error_contrasena_minima: "La contraseña debe tener al menos 8 caracteres.",
      error_usuario_existente: "El usuario ya existe en el sistema",
      usuario_registrado: "Usuario registrado correctamente",
      error_conexion2: "Error al conectar con el servidor",
      busqueda_contenido: "Búsqueda de contenido",
      buscar_por_nombre: "Buscar por nombre...",
      ciudad: "Ciudad",
      categoria: "Categoría",
      alojamiento: "Alojamiento",
      cultura: "Cultura",
      evento: "Evento",
      limpiar_filtros: "Limpiar filtros",
      suscribete_titulo: "Queremos conocerte",
      vivo_en: "Vivo en:",
      placeholder_ciudad: "Ciudad, Provincia, País",
      me_entere: "Me enteré de Lobería por...",
      conocidos: "Conocidos",
      radio: "Radio",
      television: "Televisión",
      redes_sociales: "Redes Sociales",
      nunca_escuche: "Nunca escuché",
      otros: "Otros",
      pienso_en_loberia: "Cuando pienso en Lobería pienso en",
      placeholder_palabra: "Escribe una sola palabra",
      quiero_en_loberia: "Cuando vaya a Lobería quiero:",
      placeholder_actividad: "Escribe una sola",
      me_gustaria_ir: "Me gustaría ir...",
      solo: "Solo/a",
      en_pareja: "En pareja",
      con_familia: "Con familia",
      con_amigos: "Con amigos",
      con_mascotas: "Con mis mascotas",
      iria_en: "Iría en...",
      micro_larga: "Micro de larga distancia",
      vehiculo_propio: "Vehículo propio",
      viajes_compartidos: "Viajes compartidos",
      motorhome: "Motorhome",
      tour_agencia: "Tour de Agencia de viajes",
      nombre_apellido2: "Nombre y Apellido:",
      email3: "Email:",
      telefono: "Teléfono / WhatsApp:",
      placeholder_telefono: "(cod) 12345",
      acepto_politicas: "Acepto recibir información por correo electrónico y las Políticas de Privacidad",
      campos_obligatorios: "Los campos marcados con un asterisco (*) son obligatorios.",
      mensaje_enviado: "¡Mensaje enviado exitosamente! Te responderemos a la brevedad.",
      consultar_clima: "Consultá el Clima",
      detalle_hoy: "Pronóstico detallado para el día de hoy:",
      pronostico_extendido: "Pronóstico Extendido",
      temp_actual: "Temp. Actual",
      sensacion: "Sensación",
      humedad: "Humedad",
      viento: "Viento",
      presion: "Presión",
      estado: "Estado",
      fecha: "Fecha",
      temp_max: "Temp. Máx",
      temp_min: "Temp. Mín",
      footer_contact: "Contactate con nosotros",
      footer_direccion: "Dirección de Turismo, Av. Campos 500",
      footer_newsletter: "Suscribite a los newsletter"
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
      fecha_evento: "Event Date",
      contactanos: "Contact Us",
      nombre_apellido: "Full Name",
      email2: "Email",
      asunto: "Subject",
      mensaje: "Message",
      placeholder_nombre: "Your full name",
      placeholder_email: "name@axample.com",
      placeholder_asunto: "Message subject",
      placeholder_mensaje: "Write your message here...",
      forgot_passowrd: "Forgot your password?",
      enviar: "Send",
      enviar_link: "Send link",
      enviando: "Sending...",
      mensaje_exitoso: "Message sent successfully! We’ll get back to you shortly.",
      registro: "Register",
      nombre: "Name",
      apellido: "Surname",
      correo_electronico: "Email",
      contrasena: "Password",
      registrarse: "Register",
      error_contrasena_minima: "Password must be at least 8 characters long.",
      error_usuario_existente: "User already exists in the system",
      usuario_registrado: "User successfully registered",
      error_conexion2: "Failed to connect to the server",
      busqueda_contenido: "Content Search",
      buscar_por_nombre: "Search by name...",
      ciudad: "City",
      categoria: "Category",
      alojamiento: "Accommodation",
      cultura: "Culture",
      evento: "Event",
      limpiar_filtros: "Clear filters",
      suscribete_titulo: "We want to get to know you",
      vivo_en: "I live in:",
      placeholder_ciudad: "City, Province, Country",
      me_entere: "I heard about Lobería through...",
      conocidos: "Friends",
      radio: "Radio",
      television: "Television",
      redes_sociales: "Social Media",
      nunca_escuche: "I never heard about it",
      otros: "Others",
      pienso_en_loberia: "When I think of Lobería I think of",
      placeholder_palabra: "Write one word",
      quiero_en_loberia: "When I visit Lobería I want to:",
      placeholder_actividad: "Write one activity",
      me_gustaria_ir: "I would like to go...",
      solo: "Alone",
      en_pareja: "With a partner",
      con_familia: "With family",
      con_amigos: "With friends",
      con_mascotas: "With my pets",
      iria_en: "I would go by...",
      micro_larga: "Long-distance bus",
      vehiculo_propio: "Own vehicle",
      viajes_compartidos: "Carpooling",
      motorhome: "Motorhome",
      tour_agencia: "Travel agency tour",
      nombre_apellido2: "Full Name:",
      email3: "Email:",
      telefono: "Phone / WhatsApp:",
      placeholder_telefono: "(code) 12345",
      acepto_politicas: "I accept to receive information by email and the Privacy Policy",
      campos_obligatorios: "Fields marked with an asterisk (*) are required.",
      mensaje_enviado: "Message sent successfully! We’ll get back to you soon.",
      consultar_clima: "Check the Weather",
      detalle_hoy: "Detailed forecast for today:",
      pronostico_extendido: "Extended Forecast",
      temp_actual: "Current Temp",
      sensacion: "Feels Like",
      humedad: "Humidity",
      viento: "Wind",
      presion: "Pressure",
      estado: "Condition",
      fecha: "Date",
      temp_max: "Max Temp",
      temp_min: "Min Temp",
      footer_contact: "Contact us",
      footer_direccion: "Tourism Office, Av. Campos 500",
      footer_newsletter: "Subscribe to our newsletter"
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
