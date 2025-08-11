import i18n from "i18next";
import { initReactI18next } from "react-i18next";
/* import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'; */

// 🧠 Traducciones en memoria
const resources = {
  es: {
    translation: {
      intro_loberia_index: "En el corazón de la provincia de Buenos Aires, Lobería te espera con paisajes encantadores, historia viva y la calidez que solo conservan los pueblos auténticos. Ubicada entre suaves colinas, campos dorados y una costa agreste que se encuentra con el Océano Atlántico, esta joya escondida es perfecta para quienes buscan desconectarse y redescubrir la paz. Explorá sus playas vírgenes como Arenas Verdes, recorré senderos rurales, saboreá sabores caseros y maravillate con su rico patrimonio arquitectónico y natural. Lobería no es solo un destino — es una experiencia que te reconecta con la simpleza, la autenticidad y la esencia de la Argentina. Lobería — donde la naturaleza, la historia y el descanso se encuentran.",
      // Partido de Lobería Actualizado
      partido_loberia: "Partido de Lobería",
      intro_partido_loberia: {
        presentacion:
          "<p>Ubicado en el sudeste de la Provincia de Buenos Aires, el partido de Lobería es un destino ideal para quienes buscan conectar con la naturaleza en un entorno sereno, con paisajes diversos y propuestas para disfrutar de aventuras inolvidables.</p>",

        caracteristicas:
          "<p>Las principales características que distinguen a Lobería son su <strong>diversidad natural</strong>, su <strong>rica vida cultural</strong> y su <strong>potente perfil productivo</strong>, principalmente en el sector agropecuario.</p>",

        paisaje: {
          titulo:
            "<h3>Lobería se destaca por su paisaje excepcionalmente diverso, que combina en un mismo territorio:</h3>",

          mar: "<p><strong>Mar y costa agreste:</strong><br/> En la localidad de Arenas Verdes, con sus médanos y bosques, ideal para el turismo de naturaleza y actividades deportivas.</p>",

          sierras:
            "<p><strong>Sierras:</strong><br/> En San Manuel, un área que invita al descanso y al contacto con la naturaleza serrana.</p>",

          campo:
            "<p><strong>Campo y río:</strong><br/> Amplias zonas rurales con producción agrícola y ganadera, atravesadas por arroyos y paisajes de campo.</p>",

          cierre:
            "<p>Esta combinación de entornos —mar, sierras, campo y río— lo convierte en un destino único en la provincia de Buenos Aires.</p>",
        },

        cultura: {
          titulo: "<h3>La vida cultural del partido se manifiesta en:</h3>",

          identidad:
            "<p><strong>Identidad arraigada:</strong><br/> La ciudad cabecera alberga museos importantes y celebra fiestas populares que expresan con fuerza la identidad local.</p>",

          historia:
            "<p><strong>Historia y tradición:</strong><br/> Localidades como Tamangueyú mantienen viva la historia vinculada al ferrocarril, reflejada en su centro cultural.</p>",

          talento:
            '<p><strong>Talento local:</strong><br/> El municipio ha dado figuras destacadas en la cultura, la ciencia y el deporte a nivel nacional, como el reconocido piloto de Turismo Carretera, Oscar "Pincho" Castellano.</p>',
        },

        economia: {
          intro:
            "<p>El motor económico de Lobería es su sector agropecuario, lo que lo posiciona como uno de los principales municipios productores de la provincia.</p>",

          produccion:
            "<p><strong>Producción agrícola-ganadera:</strong><br/> Lobería es reconocida por su sistema productivo mixto de agricultura y ganadería, siendo un importante polo de producción en la región.</p>",

          productos:
            "<p><strong>Productos locales:</strong><br/> Entre las producciones se destacan las quintas de verduras, criaderos de aves y la miel, votada como el producto alimenticio representativo del municipio.</p>",
        },

        cierre:
          "<p><strong>Vení a Lobería, te esperamos para que descubras un destino que conecta el pasado con el presente y proyecta un futuro lleno de naturaleza y cultura.</strong></p>",
      },
      intro_como_llegar_partido_loberia:
        "Las principales rutas de acceso a Lobería son:",
      como_llegar: "Cómo Llegar",
      como_llegar_partido_loberia: {
        desde_ciudad_buenos_aires: {
          descripcion: "Ciudad de Buenos Aires",
          rutas: [
            "Ruta Nacional 226 (conecta con otras rutas como la RP 29)",
            "Autopista Buenos Aires-La Plata",
            "Ruta Provincial 2",
          ],
        },
        desde_mar_del_plata_y_balcarce: {
          descripcion: "Mar del Plata y Balcarce",
          rutas: ["Ruta Nacional 226", "Ruta Provincial 55"],
        },
        desde_necochea: {
          descripcion: "Necochea",
          rutas: ["Ruta Provincial 227"],
        },
        desde_tandil: {
          descripcion: "Tandil",
          rutas: [
            "El trayecto es de 115 km y tiene una duración aproximada de 1 hora y 27 minutos. La ruta principal es la RN 226, que luego se conecta con la RP 227.",
          ],
        },
        desde_azul: {
          descripcion: "Azul",
          rutas: [
            "La distancia es de 212 km, con un tiempo de viaje estimado de 2 horas y 32 minutos. El camino más directo es por la RN 226, que también se une a la RP 227. ",
          ],
        },
        desde_olavarria: {
          descripcion: "Olavarría",
          rutas: [
            "El recorrido es de 247 km y se tarda aproximadamente 2 horas y 59 minutos. Al igual que en las rutas anteriores, el trayecto se realiza por la RN 226 y la RP 227.",
          ],
        },
      },
      intro_2_como_llegar_partido_loberia:
        "Estas rutas conectan a Lobería con otras ciudades importantes de la provincia de Buenos Aires, como Tandil y Balcarce.<br /> Para llegar a Lobería, puedes elegir entre varias opciones de transporte, dependiendo de tu punto de partida.<br />",
      en_auto: "En auto desde...",
      en_micro: "En micro",
      descripcion_en_micro:
        "Hay servicios de autobús de larga distancia que conectan Lobería con varias ciudades importantes. La empresa Plusmar ofrece rutas desde Buenos Aires y Mar del Plata.<br />",
      opcion_desde_buenos_aires:
        "<strong> Desde Buenos Aires:</strong> El viaje dura aproximadamente 6 a 7 horas.",
      opcion_desde_mar_del_plata:
        "<strong> Desde Mar del Plata:</strong> El viaje dura aproximadamente 3 horas.",
      cierre_como_llegar_partido_loberia:
        "Para obtener información detallada sobre horarios, precios y empresas de transporte, puedes consultar los sitios web de las compañías de autobuses o plataformas de venta de pasajes en línea.",

      // Ciudad de Loberia Actualizado
      ciudad_loberia: "Ciudad de Lobería",
      descripcion_ciudad_loberia: {
        introduccion:
          "<p>La ciudad de Lobería te invita a descubrir una combinación perfecta de serenidad, cultura e historia, enmarcada por un entorno natural que enamora.</p>",
        calles:
          "<p>Al recorrer sus calles, te sorprenderá el <strong class='font-semibold'>colorido de sus avenidas y sus extensos espacios verdes</strong>, que dan a la ciudad un ambiente fresco y acogedor.</p>",
        parque:
          "<p>El <strong class='font-semibold'>Parque Municipal Narciso del Valle</strong> es el corazón verde de Lobería, un lugar ideal para el descanso y el esparcimiento en familia, que se complementa con las bicisendas que invitan a explorar la ciudad de manera activa y segura.</p>",
        camino_sirga:
          "<p>Para quienes buscan una conexión más profunda con la naturaleza, el <strong class='font-semibold'>Camino de Sirga</strong> a lo largo del arroyo ofrece un sendero pintoresco y tranquilo, perfecto para caminar o andar en bicicleta mientras disfrutas de la flora y fauna local.</p>",
        vida_cultural_intro:
          "<p>La vida cultural de la ciudad es rica y se puede explorar a través de sus museos:</p>",
        museo_historia_natural:
          "<p>El <strong class='font-semibold'>Museo de Historia Natural</strong> te brinda una perspectiva completa de la flora y fauna de Lobería. El Museo de Historia Natural te transportará al pasado de la región, exhibiendo la diversidad de su fauna y flora.</p>",
        museo_historico:
          '<p>El <strong class="font-semibold">Museo Histórico "La Lobería Grande"</strong> es una obra de arte que refleja la historia y la identidad del municipio. El Museo Histórico "La Lobería Grande" preserva la memoria y la identidad del municipio, contando la historia de sus orígenes y personajes ilustres.</p>',
        fiestas_populares:
          "<p>Lobería también se distingue por sus <strong class='font-semibold'>fiestas populares</strong>, que celebran las tradiciones y la vida comunitaria con música, gastronomía y artesanías.</p>",
        automovilismo:
          "<p>Además, la ciudad tiene una fuerte pasión por el automovilismo zonal, que se vive intensamente en las emocionantes <strong class='font-semibold'>carreras</strong> que se realizan en el circuito local.</p>",
        cierre:
          "<p>Con su combinación de actividades al aire libre, riqueza cultural e histórica y la calidez de su gente, Lobería se presenta como un destino turístico completo y diferente.</p>",
      },

      //San Manuel Actualizado
      san_manuel: "San Manuel",
      descripcion_san_manuel:
        "<p>San Manuel es una localidad centenaria del partido de Lobería, conocida por su ambiente tranquilo y su cercanía a las sierras, la convierte en el lugar ideal para el descanso y el contacto con la naturaleza. Posee un rico patrimonio cultural y religioso, y es famosa por sus fiestas populares como la fiesta del aniversario y las celebraciones del ViaCrucis, que son una excelente oportunidad para sumergirse en las tradiciones locales.</p>",
      como_llegar_san_manuel: {
        titulo:
          "<p>Aquí tienes las indicaciones para llegar a San Manuel en automóvil desde algunas ciudades cercanas desde:</p>",
        desde_loberia:
          "<p><strong>Lobería:</strong> El recorrido es de 68,5 km y toma aproximadamente 40 minutos por la RP 227.</p>",
        desde_tandil:
          "<p><strong>Tandil:</strong> La distancia es de 78,6 km, y el viaje dura alrededor de 1 hora y 5 minutos. La ruta principal es la RN 226.</p>",
        desde_necochea:
          "<p><strong>Necochea:</strong> El trayecto es de 160 km, con un tiempo estimado de 1 hora y 31 minutos, utilizando principalmente la RP 227.</p>",
      },

      //Arenas Verdes Actualizado
      arenas_verdes: "Arenas Verdes",
      descripcion_arenas_verdes: {
        descripcion_1:
          "<p>Arenas Verdes es el lugar ideal para quienes buscan desconectarse y disfrutar de la naturaleza en su estado más puro. Se encuentra a la altura del km 108,5 de la ruta provincial Nro 88.</p>",
        descripcion_2:
          "<p>Este balneario, parte del partido de Lobería, se caracteriza por su paisaje agreste, con amplios bosques, extensos médanos y una playa de gran belleza. Es el destino perfecto para quienes desean descansar, caminar, practicar deportes al aire libre y disfrutar del mar en un entorno tranquilo y natural.</p>",
        como_llegar_intro:
          "<p>Aquí te detallamos las rutas para llegar en automóvil desde los principales puntos cercanos:</p>",
        desde_loberia:
          "<p><strong>Lobería:</strong> El recorrido es de 64,3 km y dura aproximadamente 1 hora y 1 minuto, tomando la RP 227.</p>",
        desde_necochea:
          "<p><strong>Necochea:</strong> Esta es la ruta más cercana, con una distancia de 24,7 km y un tiempo de viaje de unos 33 minutos por la RP 88.</p>",
        desde_mar_del_plata:
          "<p><strong>Mar del Plata:</strong> La distancia es de 125 km, con un tiempo de viaje estimado de 1 hora y 50 minutos por la RP 88.</p>",
        actividades_intro:
          "<p>En el Balneario Arenas Verdes, puedes disfrutar de una variedad de actividades que se centran en su entorno natural único de playa, dunas y bosques.</p>",
        relax_naturaleza:
          "<p><strong>Relax y naturaleza:</strong> Es un lugar perfecto para descansar y desconectarse. Puedes caminar por sus playas solitarias, disfrutar del sonido del mar y explorar sus médanos y bosques de pinos. Además, podés conocer la nueva reserva municipal de objetivos mixtos con flora y fauna protegida.</p>",
        deportes_acuaticos:
          "<p><strong>Deportes acuáticos:</strong> Sus playas son ideales para practicar actividades como surf y kayak.</p>",
        aire_libre:
          "<p><strong>Actividades al aire libre:</strong> El entorno natural es propicio para el trekking, caminatas y la fotografía de paisajes, incluyendo la posibilidad de avistar ballenas en temporada.</p>",
        alojamiento:
          "<p>El balneario cuenta con opciones de alojamiento como aparts, cabañas, hosterías y dos áreas de camping: la Base Municipal de Campamento y el Complejo de Mar y Camping.</p>",
        gastronomia:
          "<p>Hay lugares para disfrutar de la gastronomía local, como la histórica fonda de Guillermina y los nuevos paradores en la playa.</p>",
      },
      informacion_general: "Información General",
      historia: "Historia",
      naturaleza: "Naturaleza",
      producciones: "Producciones",
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
      lugares_interes: "Interés",
      artesanos: "Artesanos",
      servicios_publicos: "Serv. Públicos",
      info_util: "Info. Útil",
      descubri_loberia: "Descubrí Lobería",
      intro_loberia:
        "En el corazón de la provincia de Buenos Aires, Lobería te espera con paisajes encantadores, historia viva y una calidez que sólo los pueblos auténticos conservan.<br/><br/>Entre sierras suaves, campos dorados y un litoral agreste que acaricia el Atlántico, este rincón bonaerense es perfecto para quienes buscan desconectar y redescubrir la tranquilidad.<br/><br/>Explorá sus playas vírgenes como Arenas Verdes, caminá por senderos rurales, degustá sabores caseros, y maravillate con su patrimonio arquitectónico y natural.<br/><br/><strong>Lobería, donde la naturaleza, la historia y el descanso se encuentran.</strong>",
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
      base_campamentos: "Base Campamento",
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
      mensaje_exitoso:
        "¡Mensaje enviado exitosamente! Te responderemos a la brevedad.",
      registro: "Registro",
      nombre: "Nombre",
      apellido: "Apellido",
      correo_electronico: "Correo electrónico",
      contrasena: "Contraseña",
      registrarse: "Registrarse",
      error_contrasena_minima:
        "La contraseña debe tener al menos 8 caracteres.",
      error_usuario_existente: "El usuario ya existe en el sistema",
      usuario_registrado: "Usuario registrado correctamente",
      error_conexion2: "Error al conectar con el servidor",
      busqueda_contenido: "Búsqueda de contenido",
      buscar_por_nombre: "Buscar por nombre...",
      ciudad_provincia_pais: "Ciudad, Provincia, País",
      pais: "País",
      provincia: "Provincia",
      categoria: "Categoría",
      alojamiento: "Alojamiento",
      cultura: "Cultura",
      evento: "Evento",
      limpiar_filtros: "Limpiar filtros",
      suscribete_titulo: "Queremos Conocerte",
      vivo_en: "Vivo en:",
      iria_en: "Iría en...",
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
      micro_larga: "Micro de larga distancia",
      vehiculo_propio: "Vehículo propio",
      viajes_compartidos: "Viajes compartidos",
      motorhome: "Motorhome",
      tour_agencia: "Tour de Agencia de viajes",
      nombre_apellido2: "Nombre y Apellido:",
      email3: "Email:",
      telefono: "Teléfono / WhatsApp:",
      placeholder_telefono: "(cod) 12345",
      acepto_politicas:
        "Acepto recibir información por correo electrónico y las Políticas de Privacidad",
      campos_obligatorios: "Los campos marcados con un asterisco (",
      son_obligatorios: ") son obligatorios.",
      mensaje_enviado:
        "¡Mensaje enviado exitosamente! Te responderemos a la brevedad.",
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
      footer_newsletter: "Suscribite a los newsletter",

      // Suscribirse
      Vivo_en: "Vivo en",
      Me_enteré_de_Lobería_por: "Me enteré de Lobería por...",
      Cuando_pienso_en_Lobería_pienso_en:
        "Cuando pienso en Lobería pienso en...",
      Cuando_vaya_a_Lobería_quiero: "Cuando vaya a Lobería quiero...",
      Me_gustaría_ir: "Me gustaría ir...",
      Iría_en: "Iría en...",
      Nombre_y_Apellido: "Nombre y Apellido:",
      Mi_correo_electrónico_es: "Mi correo electrónico es",
      Mi_teléfono_WhatsApp_es: "Mi teléfono/WhatsApp es",
      Conocidos: "Conocidos",
      Radio: "Radio",
      Televisión: "Televisión",
      Redes_Sociales: "Redes Sociales",
      Nunca_escuché: "Nunca escuché",
      Sólo_a: "Sólo/a",
      En_pareja: "En pareja",
      Con_familia: "Con familia",
      Con_amigos: "Con amigos",
      Con_mis_mascotas: "Con mis mascotas",
      Micro_de_larga_distancia: "Micro de larga distancia",
      Vehículo_propio: "Vehículo propio",
      Viajes_compartidos: "Viajes compartidos",
      Motorhome: "Motorhome",
      Tour_de_Agencia_de_viajes: "Tour de Agencia de viajes",
      Otros: "Otros",
      Acepto_politicas: "Acepto recibir información por correo electrónico",
      Políticas_de_Privacidad: "Políticas de Privacidad",
    },
  },
  en: {
    translation: {
      // Partido de Lobería
      partido_loberia: "Lobería District",
      intro_partido_loberia: {
        presentacion:
          "<p>Located in the southeast of the Province of Buenos Aires, the partido of Lobería is an ideal destination for those looking to connect with nature in a serene environment, offering diverse landscapes and unforgettable adventures.</p>",

        caracteristicas:
          "<p>The main features that set Lobería apart are its <strong>natural diversity</strong>, its <strong>rich cultural life</strong>, and its <strong>strong productive profile</strong>, mainly in the agricultural sector.</p>",

        paisaje: {
          titulo:
            "<h3>Lobería stands out for its exceptionally diverse landscape, which combines in one territory:</h3>",

          mar: "<p><strong>Sea and wild coast:</strong><br/> In the locality of Arenas Verdes, with its dunes and forests — ideal for nature tourism and outdoor sports.</p>",

          sierras:
            "<p><strong>Sierras (hills):</strong><br/> In San Manuel, an area that invites relaxation and immersion in the hilly natural environment.</p>",

          campo:
            "<p><strong>Countryside and rivers:</strong><br/> Wide Vast rural areas dedicated to agriculture and livestock, crossed by streams and rich in rural charm.</p>",

          cierre:
            "<p>This combination of sea, sierras, countryside, and rivers makes Lobería a truly unique destination in the province of Buenos Aires.</p>",
        },

        cultura: {
          titulo: "<h3>The cultural life of the partido is reflected in:</h3>",

          identidad:
            "<p><strong>Deep-rooted identity:</strong><br/> The main city is home to important museums and hosts popular festivals that proudly express local traditions.</p>",

          historia:
            "<p><strong>History and tradition:</strong><br/> Towns like Tamangueyú preserve railway heritage, which is showcased in their community cultural centers.</p>",

          talento:
            '<p><strong>Local talent:</strong><br/> The municipality has produced notable figures in culture, science, and sports — including the renowned Turismo Carretera driver, Oscar "Pincho" Castellano.</p>',
        },

        economia: {
          intro:
            "<p>The driving force of Lobería’s economy is its agricultural sector, positioning it as one of the leading productive municipalities in the province.</p>",

          produccion:
            "<p><strong>Agricultural and livestock production:</strong><br/> Lobería is known for its mixed farming system, making it a key production hub in the region.</p>",

          productos:
            "<p><strong>Local products:</strong><br/> Among its highlights are vegetable farms, poultry breeding, and honey — the latter being voted the municipality’s signature food product.</p>",
        },

        cierre:
          "<p><strong>Come to Lobería — we’re waiting for you to discover a destination that connects the past with the present and projects a future full of nature and culture.</strong></p>",
      },
      opciones_como_llegar: "The main access routes to Lobería are:",
      intro_como_llegar_partido_loberia:
        "The main access routes to Lobería are:",
      como_llegar: "How to Get There",

      como_llegar_partido_loberia: {
        desde_ciudad_buenos_aires: {
          descripcion: "Buenos Aires City",
          rutas: [
            "National Route 226 (connects with other routes such as RP 29)",
            "Buenos Aires–La Plata Highway",
            "Provincial Route 2",
          ],
        },
        desde_mar_del_plata_y_balcarce: {
          descripcion: "Mar del Plata and Balcarce",
          rutas: ["National Route 226", "Provincial Route 55"],
        },
        desde_necochea: {
          descripcion: "Necochea",
          rutas: ["Provincial Route 227"],
        },
        desde_tandil: {
          descripcion: "Tandil",
          rutas: [
            "The route is 115 km and takes approximately 1 hour and 27 minutes. The main route is RN 226, which then connects to RP 227.",
          ],
        },
        desde_azul: {
          descripcion: "Azul",
          rutas: [
            "The distance is 212 km, with an estimated travel time of 2 hours and 32 minutes. The direct route is RN 226, which also connects to RP 227.",
          ],
        },
        desde_olavarria: {
          descripcion: "Olavarría",
          rutas:
            "The route is 247 km and takes approximately 2 hours and 59 minutes. As in the previous routes, the route is RN 226 and RP 227.",
        },
      },
      intro_2_como_llegar_partido_loberia:
        "These routes connect Lobería with other important cities in the province of Buenos Aires, such as Tandil and Balcarce.<br />To get to Lobería, you can choose from several transportation options depending on your starting point. <br />",
      en_auto: "By car from...",
      en_micro: "By bus",
      descripcion_en_micro:
        "There are long-distance bus services connecting Lobería with several major cities. The Plusmar company offers routes from Buenos Aires and Mar del Plata.<br />",
      opcion_desde_buenos_aires:
        "<strong> From Buenos Aires:</strong>The trip takes approximately 6-7 hours.",
      opcion_desde_mar_del_plata:
        "<strong>From Mar del Plata:</strong>The trip takes approximately 3 hours.",
      cierre_como_llegar_partido_loberia:
        "For detailed information on schedules, prices, and transportation companies, you can check the websites of bus companies or online ticket sales platforms.",

      // Ciudad de Loberia Actualizado
      ciudad_loberia: "Lobería City",
      descripcion_ciudad_loberia: {
        introduccion:
          "<p>The city of Lobería invites you to discover a perfect combination of serenity, culture, and history, set within a natural environment that enchants.</p>",
        calles:
          "<p>As you walk through its streets, you will be surprised by <strong class='font-semibold'>the vibrant atmosphere</strong> of the colorful avenues and extensive green spaces, giving the city a fresh and welcoming atmosphere.</p>",
        parque:
          "<p><strong class='font-semibold'>The Narciso del Valle Municipal Park is Lobería’s</strong> heart green heart, an ideal place for rest and family recreation, complemented by bike paths that invite active and safe exploration of the city.</p>",
        camino_sirga:
          "<p>For those seeking a deeper connection with nature, the <strong class='font-semibold'>Camino de Sirga</strong> is a stunning trail that leads you through the forest, offering a peaceful and tranquil experience. Camino de Sirga along the stream offers a picturesque and peaceful trail, perfect for walking or cycling while enjoying the local flora and fauna.</p>",
        vida_cultural_intro:
          "<p>The city’s cultural life is rich and can be explored through its museums:</p>",
        museo_historia_natural:
          "<p><strong class='font-semibold'>The Natural History Museum</strong> provides a comprehensive perspective of the flora and fauna of Lobería. The Natural History Museum will transport you to the region’s past, showcasing the diversity of its fauna and flora.</p>",
        museo_historico:
          '<p><strong class="font-semibold">The Historical Museum "La Lobería Grande"</strong> preserves the municipality’s memory and identity, telling the story of its origins and notable figures.</p>',
        fiestas_populares:
          "<p>Lobería is also known for its popular festivals, which celebrate traditions and community life with music, gastronomy, and crafts.</p>",
        automovilismo:
          "<p>Additionally, the city has a strong passion for regional motorsports, experienced intensely in the exciting races held at the local circuit.</p>",
        cierre:
          "<p>With its combination of outdoor activities, cultural and historical richness, and the warmth of its people, Lobería presents itself as a complete and unique tourist destination.</p>",
      },

      //San Manuel Actualizado
      san_manuel: "San Manuel",
      descripcion_san_manuel:
        "<p>San Manuel is a century-old town in the Partido de Lobería, known for its peaceful atmosphere and proximity to the hills, making it an ideal place for rest and connection with nature.</p><p>It has a rich cultural and religious heritage, and is famous for its popular festivals such as the anniversary celebration and the Via Crucis events, which are excellent opportunities to immerse yourself in local traditions.</p>",
      como_llegar_san_manuel: {
        titulo: "Directions to San Manuel by car from nearby cities",
        desde_loberia:
          "<p><strong>Lobería:</strong> The distance is 68.5 km and takes approximately 40 minutes via RP 227.</p>",
        desde_tandil:
          "<p><strong>Tandil:</strong> The distance is 78.6 km, and the trip lasts around 1 hour and 5 minutes. The main route is RN 226.</p>",
        desde_necochea:
          "<p><strong>Necochea:</strong> The route is 160 km, with an estimated time of 1 hour and 31 minutes, mainly using RP 227.</p>",
      },

      //Arenas Verdes Actualizado
      arenas_verdes: "Green Sands",
      descripcion_arenas_verdes: {
        descripcion_1:
          "<p>Arenas Verdes is the ideal place for those seeking to disconnect and enjoy nature in its purest form. It is located at km 108.5 of Provincial Route 88.</p>",
        descripcion_2:
          "<p>This beach resort, part of the Lobería district, is known for its wild landscape, with large forests, vast sand dunes, and a beautiful beach. It's the perfect destination for those looking to relax, walk, enjoy outdoor sports, and experience the sea in a peaceful and natural setting.</p>",
        como_llegar_intro:
          "<p>Here are the driving routes from major nearby locations:</p>",
        desde_loberia:
          "<p><strong>Lobería:</strong> The route is 64.3 km and takes approximately 1 hour and 1 minute via RP 227.</p>",
        desde_necochea:
          "<p><strong>Necochea:</strong> This is the closest route, with a distance of 24.7 km and an estimated travel time of 33 minutes via RP 88.</p>",
        desde_mar_del_plata:
          "<p><strong>Mar del Plata:</strong> The distance is 125 km, with an estimated travel time of 1 hour and 50 minutes via RP 88.</p>",
        actividades_intro:
          "<p>In Arenas Verdes, you can enjoy a variety of activities focused on its unique natural environment of beach, dunes, and forests.</p>",
        relax_naturaleza:
          "<p><strong>Relaxation and nature:</strong> It's a perfect place to unwind and disconnect. You can walk along its quiet beaches, enjoy the sound of the sea, and explore the dunes and pine forests. You can also visit the new municipal reserve with protected flora and fauna.</p>",
        deportes_acuaticos:
          "<p><strong>Water sports:</strong> Its beaches are ideal for activities such as surfing and kayaking.</p>",
        aire_libre:
          "<p><strong>Outdoor activities:</strong> The natural setting is perfect for trekking, walking, and landscape photography, including whale watching during the season.</p>",
        alojamiento:
          "<p>The resort offers accommodation options such as apartments, cabins, inns, and two camping areas: the Municipal Camping Base and the Sea and Camping Complex.</p>",
        gastronomia:
          "<p>There are places to enjoy local cuisine, such as the historic Guillermina inn and the new beachside food stands.</p>",
      },
      informacion_general: "General Info",
      historia: "History",
      naturaleza: "Nature",
      producciones: "Productions",
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
      Alojamientos: "Accom.",
      Gastronomia: "Gastronomy",
      lugares_interes: "Interest",
      artesanos: "Artisans",
      servicios_publicos: "Pub. Services",
      info_util: "Useful Info",
      descubri_loberia: "Discover Lobería",
      intro_loberia_index:
        "In the heart of Buenos Aires Province, Lobería awaits you with charming landscapes, living history, and the warmth only authentic towns preserve. Nestled among gentle hills, golden fields, and a rugged coastline that meets the Atlantic Ocean, this hidden gem is perfect for those seeking to unplug and rediscover peace. Explore its unspoiled beaches like Arenas Verdes, walk through rural trails, savor homemade flavors, and marvel at its rich architectural and natural heritage. Lobería isn’t just a destination — it’s an experience that reconnects you with simplicity, authenticity, and the essence of Argentina. Lobería — where nature, history, and relaxation meet.",
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
      mensaje_exitoso:
        "Message sent successfully! We’ll get back to you shortly.",
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
      ciudad_provincia_pais: "City, Province, Country",
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
      Micro_de_larga_distancia: "Long distance bus",
      vehiculo_propio: "Own vehicle",
      viajes_compartidos: "Carpooling",
      motorhome: "Motorhome",
      tour_agencia: "Travel agency tour",
      nombre_apellido2: "Full Name:",
      email3: "Email:",
      telefono: "Phone / WhatsApp:",
      placeholder_telefono: "(code) 12345",
      Acepto_politicas:
        "I accept to receive information by email and the Privacy Policy",
      campos_obligatorios: "Fields marked with an asterisk (",
      son_obligatorios: ") are required.",
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
      footer_newsletter: "Subscribe to our newsletter",

      // Suscribirse

      Vivo_en: "I live in",
      Me_enteré_de_Lobería_por: "I heard about Lobería through..",
      Cuando_pienso_en_Lobería_pienso_en: "When I think of Lobería I think of",
      Cuando_vaya_a_Lobería_quiero: "When I go to Lobería I want to",
      Me_gustaría_i: "I would like to go..",
      Nombre_y_Apellido: "Full Name:",
      Mi_correo_electrónico_es: "My email address is",
      Mi_teléfono_WhatsApp_es: "My phone/WhatsApp number is",
      Conocidos: "Friends/Family",
      Radio: "Radio",
      Televisión: "TV",
      Redes_Sociales: "Social Media",
      Nunca_escuché: "Never heard of it",
      Sólo_a: "Alone",
      En_pareja: "With partner",
      Con_familia: "With family",
      Con_amigos: "With friends",
      Con_mis_mascotas: "With my pets",
      Vehículo_propio: "Own vehicle",
      Viajes_compartidos: "Rideshare",
      Motohome: "Motorhome",
      Tour_de_Agencia_de_viajes: "Travel agency tour",
      Otros: "Other",
      Acepto_recibir_información_por_correo_electrónico_y_los:
        "I agree to receive information by email and accept the",
      Políticas_de_Privacidad: "Privacy Policy",
    },
  },
};

i18n
  /*   .use(HttpBackend)                  // 🔌 Carga los archivos .json por HTTP
  .use(LanguageDetector)            // 🌍 Detecta idioma del navegador */
  .use(initReactI18next) // 🔁 Integra con React
  .init({
    resources,
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
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
