import i18n from "i18next";
import { initReactI18next } from "react-i18next";
/* import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'; */

// 🧠 Traducciones en memoria
const resources = {
  es: {
    translation: {
      // Header logo text
      patrimonio: "Patrimonio Vivo",
      cultura: "Cultura",
      historia: "Historia",
      naturaleza: "Naturaleza",
      tradicion: "Tradición",

      // Intro Loberia Actualizado
      intro_loberia_index:
        "En el corazón de la provincia de Buenos Aires, Lobería te espera con paisajes encantadores, historia viva y la calidez que solo conservan los pueblos auténticos. Ubicada entre suaves colinas, campos dorados y una costa agreste que se encuentra con el Océano Atlántico, esta joya escondida es perfecta para quienes buscan desconectarse y redescubrir la paz. Explorá sus playas vírgenes como Arenas Verdes, recorré senderos rurales, saboreá sabores caseros y maravillate con su rico patrimonio arquitectónico y natural. Lobería no es solo un destino — es una experiencia que te reconecta con la simpleza, la autenticidad y la esencia de la Argentina. Lobería — donde la naturaleza, la historia y el descanso se encuentran.",
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

          mar: "<p><strong>Disfruta del mar y la arena:</strong><br/>Camina por la extensa playa, siente la brisa marina y sumérgete en el océano. Es un lugar ideal para la práctica del <strong>surf</strong>, gracias a sus excelentes olas.</p>",

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
      reserva_natural: "Reserva Natural",
      intro_reserva_natural: {
        nombre: "Reserva Natural Municipal de Objetivos Mixtos",
        ordenanza: "Ordenanza Municipal N° 2.981-25",
        ordenanza_descarga: "Descargá la Ordenanza completa aquí",
        cita: "Viví uno de los grandes espectáculos naturales.",
        intro:
          "En el Partido de Lobería, las aves viajeras encuentran descanso, vos encontrás naturaleza en estado puro.",
        unico_titulo: "¿Por qué este lugar es único?",
        unico_texto:
          "En nuestras costas convergen playas, dunas y pastizales que brindan refugio a cientos de especies. Algunas llegan desde el Ártico luego de recorrer más de 12.000 kilómetros.",
        mirador: "Mirador de Aves",
        experiencias_titulo: "Elegí tu experiencia durante todo el año",
        experiencias: {
          aves: {
            titulo: "Observar aves",
            texto_1:
              "Descubrí uno de los mejores lugares de la costa bonaerense para la observación de aves.",
            texto_2:
              "La Reserva Natural Municipal de Objetivos Mixtos protege playas, dunas y pastizales donde conviven aves residentes y migratorias de importancia internacional. Durante todo el año es posible observar especies características de la costa atlántica, mientras que en distintas épocas llegan aves que recorren miles de kilómetros.",
          },
          fotografia: {
            titulo: "Fotografía",
            texto_1:
              "Un escenario único para los amantes de la fotografía de naturaleza.",
            texto_2:
              "La combinación de playas abiertas, dunas, amaneceres, atardeceres y una extraordinaria diversidad de aves convierte a la reserva en un lugar ideal para registrar imágenes de fauna silvestre. Cada estación ofrece paisajes y comportamientos diferentes.",
          },
          senderismo: {
            titulo: "Senderismo",
            texto_1: "Caminá la reserva a tu propio ritmo.",
            texto_2:
              "Recorrer la reserva caminando por el sendero permite descubrir ambientes naturales prácticamente intactos y disfrutar del paisaje costero en silencio. El sendero conduce hacia el Mirador de Aves Playeras, desde donde es posible observar aves, flora nativa y amplias vistas del océano.",
          },
          naturaleza: {
            titulo: "Naturaleza",
            texto_1: "Mucho más que aves.",
            texto_2:
              "La reserva protege uno de los ambientes costeros más representativos del sudeste bonaerense. Playas, dunas y pastizales albergan una rica biodiversidad de plantas, mamíferos, reptiles, insectos y aves que forman un ecosistema de enorme valor para la conservación. Cada visita permite descubrir nuevos paisajes y comprender la importancia de preservar este patrimonio natural.",
          },
        },
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
      alojamientos_loberia_descripcion:
        "En nuestro destino, encontrarás una amplia variedad de opciones de alojamiento pensadas para cada tipo de viajero. Ya sea que busques la comodidad de un hotel o la calidez de un hospedaje familiar.",
      gastronomia_loberia_descripcion:
        "<p>En nuestro destino, la gastronomía es sencilla y deliciosa. Te invitamos a descubrir los sabores de nuestra comunidad a través de una oferta variada y accesible.</p><br /><br /><p>Podrás disfrutar de una buena <strong>parrilla</strong> con cortes de carne local, probar una auténtica <strong>pizza</strong> en sus distintos estilos, o sentarte en un <strong>restaurante</strong> para degustar platos caseros. </p><p>Si buscas algo rápido o simplemente un café, encontrarás opciones en nuestras <strong>estaciones de servicio</strong> y <strong>confiterías</strong>, perfectas para hacer una pausa.</p><br /><br /><p>¡Prepárate para saborear nuestra cocina más auténtica!</p>",
      transporte_loberia_descripcion:
        "<p>Para que te desplaces con comodidad y sin preocupaciones durante tu visita, te informamos que en la ciudad contamos con servicios de transporte privado.</p><p>Si necesitas trasladarte a tu alojamiento, a un restaurante o a cualquier punto de interés, puedes contar con los servicios de <strong>remises</strong> disponibles. Estos vehículos te ofrecen una opción flexible y segura para moverte a tu propio ritmo.</p>",
      agenda_loberia_descripcion:
        "Aquí tienes toda la información sobre fiestas y actividades de Lobería, agrupada y organizada para su fácil uso en la web de turismo.",
      agenda_loberia: "Agenda de Fiestas y Actividades en Lobería",
      que_hacer_loberia:
        "Lobería: Un destino para conectar con la naturaleza y la historia",
      fiestas_loberia_descripcion:
        "<p>Lobería es un destino que vibra con la energía de sus fiestas y tradiciones a lo largo de todo el año. Te invitamos a planificar tu visita y ser parte de nuestra agenda cultural y comunitaria</p><p><h2>Verano (Enero - Marzo)</h2></p> <ul><li><h3>Carnavales Lobería:</h3> El verano se despide a puro ritmo con los tradicionales carnavales. Las noches se llenan de color, música y alegría con el desfile de comparsas, murgas y carrozas, un espectáculo que convoca a toda la comunidad y sus visitantes.</li><br/><li><h3>Fiesta del Aniversario y Loberfest:</h3> El 31 de enero, Lobería celebra un nuevo aniversario de su fundación. Las celebraciones incluyen espectáculos artísticos, feria de artesanos y una gran fiesta de la cerveza artesanal conocida como la Loberfest, con food trucks y música en vivo en un ambiente festivo.</li><br/><li><h3>Fiesta Popular del Pago:</h3> Nacida como un encuentro de amigos, esta fiesta popular se ha consolidado como un evento imperdible. Es una oportunidad única para vivir el folklore y las tradiciones locales a través de la música en vivo, asado a la parrilla y un ambiente de camaradería.</li></ul><p><h2>Primavera (Septiembre - Diciembre)</h2></p></br><ul><h3>Fiesta de la Primavera y del Estudiante:</h3> En septiembre, Lobería le da la bienvenida a la primavera con una gran celebración llena de color y energía. Con actividades recreativas y música en vivo, la jornada se vive en la plaza principal, invitando a jóvenes y familias a disfrutar.</li><br/><br/><li><h3>Exposiciones Rurales y Encuentros Tradicionales:</h3> La ciudad mantiene viva la conexión con el campo a través de la Expo Lobería, organizada por la Sociedad Rural, un evento que muestra lo mejor de la producción agropecuaria, y la Fiesta de Asadores, donde el aroma del asado se convierte en el gran protagonista.</li><br/><li><h3>Fiesta de las Colectividades:</h3> Lobería celebra su herencia multicultural en este evento que rinde homenaje a las raíces de la comunidad. Disfruta de la música, las danzas típicas y los sabores de las distintas colectividades que conviven en el partido.</li></ul><h2>Actividades a lo Largo del Año</h2><ul><li><h3>Eventos Deportivos:</h3> Carreras, torneos y otras competencias locales.</li><br/><li><h3>Ferias de Emprendedores:</h3> Muestras de productos locales y artesanías.</li><br/><li><h3>Festivales de Música:</h3> Oportunidades para disfrutar de artistas locales y regionales.</li><br/><li><h3>Exposiciones Artísticas:</h3> Muestras en el Centro Cultural y otros espacios de la ciudad.</li></ul><>¡Lobería te espera en cualquier momento del año para que vivas una experiencia auténtica y memorable!",
      que_hacer_loberia_descripcion:
        "<p>Lobería te invita a descubrir un entorno único donde se fusionan la ciudad, las localidades del interior, el campo, las sierras y el mar.<br /><br /><h3>Naturaleza y Aventura:</h3> Explora la belleza de <span>Arenas Verdes</span>, nuestra playa agreste ideal para disfrutar del mar y los médanos, y también el <span>Río Quequén</span> en el Paraje Las Cascadas, que te ofrecen un escenario perfecto para la pesca y el kayak.<br /><br /><h3>Cultura e Historia:</h3> Sumérgete en el pasado de la región visitando el <span>Museo de Ciencias Naturales</span> y los <span>Museos Históricos de la Ciudad de Lobería y de la localidad de San Manuel</span>.<br /><br />Para los amantes del automovilismo, es imperdible visitar el <span>Centro Cultural Villa Ercilia</span>, a partir del cual se está construyendo el Museo del Automovilismo.<br /><br /><h3>Tradición y Relax:</h3> Simplemente, recorre nuestras calles, conoce los monumentos locales y disfruta del ritmo apacible de la vida en Lobería, ideal para desconectar y recargar energías.</p>",

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
      alojamientos_san_manuel:
        "<h2>Alojamiento en San Manuel: Tu Lugar para el Descanso</h2>",
      alojamientos_san_manuel_descripcion:
        "Si buscas un lugar tranquilo para desconectar y disfrutar de la paz del campo, San Manuel te ofrece un alojamiento para que puedas concretar tu estadía en la localidad.",
      agenda_san_manuel:
        "<h2>Fiestas y Tradiciones en San Manuel: Un Reencuentro con la Fe y la Comunidad</h2><p>La localidad de San Manuel celebra su identidad y su historia a través de una serie de festividades que marcan el calendario y atraen a vecinos y visitantes.</p><p> Son oportunidades únicas para conectar con la esencia de este pueblo.</p> <ul><li><h3>Aniversario de la localidad:</h3><p>Cada 25 de marzo, San Manuel se viste de fiesta para celebrar su fundación. El evento congrega a la comunidad en un festejo que incluye espectáculos artísticos, feria de emprendedores y un ambiente de alegría que celebra el arraigo y la historia del pueblo.</p></li><li><h3>Celebración de la Virgen de Fátima:</h3><p>La fe es un pilar fundamental en San Manuel.</p><p>En el mes de mayo, la <strong>Parroquia Nuestra Señora de Fátima</strong> se convierte en el epicentro de una gran celebración religiosa. Los fieles participan en misas, procesiones y diversas actividades en honor a su patrona, en un acto de devoción que une a toda la comunidad.</p></li><li><h3>Semana Santa y Vía Crucis del Cerro El Toro:</h3><p>La espiritualidad se vive de una manera muy especial en la localidad. Durante la Semana Santa, los actos religiosos culminan con la emotiva representación del <strong>Vía Crucis en el Cerro El Toro:</strong></p><p>Los participantes recorren las estaciones en un ascenso simbólico, uniendo la devoción con el imponente paisaje natural, en una experiencia de profunda reflexión.</p></li></ul><p>San Manuel te invita a ser parte de estas tradiciones que definen su espíritu y su identidad.</p>",
      que_hacer_san_manuel:
        "San Manuel: Un rincón de Historia y Fe en el Corazón de la Pampa",
      que_hacer_san_manuel_descripcion:
        "<p>San Manuel te espera para ofrecerte una experiencia de tranquilidad y arraigo a las tradiciones locales. Si buscas un destino para una escapada apacible, aquí encontrarás la oportunidad de conectar con la historia y la naturaleza.</p><ul><li><h3>Fe y Espiritualidad:</h3><p>No te pierdas la visita al <strong>Cerro El Toro</strong>, donde se encuentra un emotivo Vía Crucis. Recorrer sus estaciones es una oportunidad única para la reflexión, mientras disfrutas de una vista panorámica del paisaje.</p></li><li><h3>Viaje al Pasado:</h3><p>Conoce la historia de la localidad en el <strong>Museo Histórico</strong>, ubicado en la antigua estación de tren del Ferrocarril. Este lugar resguarda el legado de los pioneros y el desarrollo del pueblo.</p></li><li><h3>Patrimonio Local:</h3><p>Tómate un momento para apreciar la arquitectura y la paz que transmite la <strong>Parroquia Nuestra Señora de Fátima</strong>, un punto de referencia en San Manuel que se erige frente a la plaza principal, invitándote a una pausa en tu recorrido.</p></li></ul><p>San Manuel es el lugar perfecto para quienes valoran la sencillez, la historia y la calma del entorno rural entre sierras, cuenta también con un parque y pileta municipal ideal para compartir momentos con amigos y familia.</p>",

      gastronomia_sanManuel:
        "San Manuel ofrece una propuesta gastronómica sencilla y deliciosa. Podrás disfrutar de una buena parrilla con cortes de carne local, probar una auténtica pizza en sus distintos estilos, o sentarte en un restaurante para degustar platos caseros. Si buscas algo rápido o simplemente un café, encontrarás opciones en nuestras estaciones de servicio y confiterías, perfectas para hacer una pausa. ¡Prepárate para saborear nuestra cocina más auténtica!",
      transport_sanManuel:
        "San Manuel cuenta con servicios de transporte privado. Si necesitas trasladarte a tu alojamiento, a un restaurante o a cualquier punto de interés, puedes contar con los servicios de remises disponibles. Estos vehículos te ofrecen una opción flexible y segura para moverte a tu propio ritmo.",
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
          "<p>Situado a pocos kilómetros de Lobería, <strong>Arenas Verdes</strong> es un balneario natural que cautiva por su belleza agreste y su tranquilidad. Este rincón único combina un extenso <strong>bosque de pinos y eucaliptos</strong>, imponentes <strong>médanos</strong> y una amplia <strong>playa</strong> bañada por el Atlántico, creando un escenario perfecto para desconectar y conectar con la naturaleza.</p>",
        mar: "<h3>Disfruta del Mar y la Arena:</h3> <p> Camina por la extensa playa, siente la brisa marina y sumérgete en el océano. Es un lugar ideal para la práctica del <strong>surf</strong>, gracias a sus excelentes olas.</p>",
        aire_libre:
          "<h3>Vive la naturaleza:</h3><p>La nueva <strong>Reserva Natural</strong> te invita a explorar su flora y fauna, y a capturar en imágenes la belleza de este ecosistema.</p>",
        magico:
          "<h3>Momentos mágicos:</h3><p>No te pierdas los espectaculares <strong>amaneceres y atardeceres</strong> que tiñen el cielo de colores. Y al caer la noche, prepárate para un show único: un cielo completamente despejado, ideal para observar las <strong>estrellas</strong>.<7p>",
        relax:
          "<h3>Relax y ocio:</h3><p>Disfruta de la tranquilidad del lugar, visita sus <strong>comercios de artesanías y balnearios</strong>, y pasa tiempo de calidad con la familia, permitiendo que los <strong>niños</strong> jueguen libremente en un entorno seguro y natural.</p>",
        experiencia:
          "<p>Arenas Verdes es más que una playa, es una experiencia para todos los sentidos.</p>",
        alojamiento:
          "<p>En Arenas Verdes, te invitamos a encontrar el alojamiento perfecto para disfrutar tus vacaciones o momentos especiales durante el resto del año. Nuestra oferta se adapta a todos los gustos, ya sea que prefieras la cercanía al mar o la tranquilidad del bosque.</p>",
        gastronomia:
          "<p>En Arenas Verdes, la experiencia culinaria es tan relajada como su entorno. Aquí encontrarás opciones gastronómicas que combinan lo tradicional con el encanto del mar, perfectas para cualquier momento del día.</p><p>Desde los clásicos y acogedores <strong>restaurantes</strong> locales con platos caseros, hasta las propuestas más sofisticadas de los <strong>balnearios</strong>, donde podrás disfrutar de un almuerzo o cena con una vista inigualable del océano.</p><p>Además, si buscas un sabor más arraigado a nuestras tradiciones, no dejes de probar las ricas <strong>empanadas</strong> y las auténticas <strong>pastas caseras</strong> que se preparan en uno de los lugares pioneros de Arenas Verdes.</p><p>Cada opción es una invitación a sentarse, disfrutar y deleitarse con buena compañía.</p>",
      },
      alojamientos_arenas_verdes:
        "Alojamiento en Arenas Verdes: Tu lugar ideal para descansar",
      alojamientos_arenas_verdes_descripcion:
        "<h2>Para todos los estilos de viaje:</h2><ul><li><h3>Para los Amantes de la Naturaleza:</h3><p>Si buscas una experiencia auténtica, puedes elegir entre un <strong>camping</strong> bajo las estrellas o la intimidad de <strong>cabañas</strong> y <strong>dormis</strong>, algunos de ellos inmersos en el bosque.</p></li><li><br/><h3>Para Mayor Comodidad:</h3><p>Si viajas en familia o con amigos, tienes a tu disposición <strong>casas</strong>, <strong>apart</strong> y <strong>bungalows</strong> totalmente equipados, muchos de ellos con vistas privilegiadas.</p></li></ul><p>Tanto en la zona del bosque como cerca de la playa, cada opción te permitirá vivir una experiencia única, despertando con el sonido del mar o rodeado de la paz de los pinos.</p><p>Prepárate para disfrutar de una <strong>estadia</strong> inolvidable.</p>",
      gastronomia_arenas_verdes:
        "Sabores con Vista al Mar: Gastronomía en Arenas Verdes",
      transporte_arenas_verdes:
        "Arenas Verdes se encuentra en el partido de Loberia, y se accede de dos maneras. Una es por el camino costero desde Costa Bonita y la otra es por un camino mejorado de 7 km. Que se encuentra a la altura de km. 108.5 de la ruta provincial 88.",
      que_hacer_arenas_verdes:
        "Arenas Verdes: Un paraíso entre dunas, mar y bosque",
      actividades_arenas_verdes: "¿Qué hacer en Arenas Verdes?",

      // General
      informacion_general: "Información General",
      producciones: "Producciones",
      alojamientos: "Alojamientos",
      gastronomia: "Gastronomía",
      transporte: "Transporte",
      agenda: "Agenda",
      que_hacer: "Qué Hacer",
      descargas: "Descargas",
      secciones_pagina: "Secciones de esta página",
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
      busqueda: "Busqueda",
      no_se_encontraron_resultados: "No se encontraron resultados",
      busqueda_contenido: "Búsqueda de Contenido",
      buscar_por_nombre: "Buscar por nombre...",
      ciudad_provincia_pais: "Ciudad, Provincia, País",
      pais: "País",
      provincia: "Provincia",
      ciudad: "Ciudad",
      categoria: "Categoría",
      alojamiento: "Alojamiento",
      filtros_activos: "Filtros Activos",
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
      pienso_en_loberia: "Cuando pienso en Lobería pienso en...",
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
      footer_contact: "Contactate con Nosotros",
      footer_direccion: "Dirección de Turismo, Av. Campos 500",
      footer_newsletter: "Suscribite a los Newsletter",

      // Suscribirse
      Vivo_en: "Vivo en",
      Me_enteré_de_Lobería_por: "Me enteré de Lobería por...",
      Cuando_pienso_en_Lobería_pienso_en:
        "Cuando pienso en Lobería pienso en...",
      Cuando_vaya_a_Lobería_quiero: "Cuando vaya a Lobería quiero...",
      Me_gustaría_ir: "Me gustaría ir...",
      Iría_en: "Iría en...",
      Nombre_y_Apellido: "Nombre y Apellido:",
      Mi_correo_electrónico_es: "Mi correo electrónico es:",
      Mi_teléfono_WhatsApp_es: "Mi teléfono/WhatsApp es:",
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

      // Loberia te invita
      titulo_invites: "Lobería te invita",
      p1_invites:
        "En tu visita a nuestra ciudad, queremos que disfrutes mucho más.",
      p2_invites:
        "Con el programa “Lobería Te Invita” accedés a descuentos exclusivos y beneficios especiales en alojamientos, gastronomía, comercios y experiencias locales.",
      p3_invites:
        "Solicitá ahora el listado completo y empezá a planear tu viaje con ventajas que harán de tu estadía una experiencia inolvidable. ¡Lobería te espera con los brazos abiertos y muchas sorpresas!",
      link_invites: "Pedilo completando un breve formulario haciendo ",
      link_aqui: "click aquí",
      ver_en_openstreetmap: "Ver en OpenStreetMap",
      page_not_found: "Página No Encontrada.",
      sorry_not_found: "Lo sentimos, la página que estás buscando no existe.",
      back_index: "Volver al Inicio",
      p1_alojamiento:"Queremos que vengas a conocernos y disfrutar de tu estadía!!!",
      p2_alojamiento:"Déjate sorprender por nuestros paisajes, nuestra gente y la tranquilidad que solo Lobería puede ofrecerte.",
      p3_alojamiento: "Viví una experiencia única entre mar, sierras y naturaleza. ¡Te esperamos!"
    },
  },
  en: {
    translation: {
      // Header logo text
      patrimonio: "Living Heritage",
      cultura: "Culture",
      historia: "History",
      naturaleza: "Nature",
      tradicion: "Tradition",

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
      reserva_natural: "Natural Reserve",
      intro_reserva_natural: {
        nombre: "Municipal Natural Reserve of Mixed Objectives",
        ordenanza: "Municipal Ordinance No. 2,981-25",
        ordenanza_descarga: "Download the full Ordinance here",
        cita: "Experience one of nature's great spectacles.",
        intro:
          "In the Partido de Lobería, traveling birds find rest, and you find nature in its purest state.",
        unico_titulo: "Why is this place unique?",
        unico_texto:
          "Beaches, dunes, and grasslands converge along our coast, giving shelter to hundreds of species. Some arrive from the Arctic after traveling more than 12,000 kilometers.",
        mirador: "Bird Lookout",
        experiencias_titulo: "Choose your experience, all year round",
        experiencias: {
          aves: {
            titulo: "Bird watching",
            texto_1:
              "Discover one of the best spots on the Buenos Aires coast for birdwatching.",
            texto_2:
              "The Municipal Natural Reserve of Mixed Objectives protects beaches, dunes, and grasslands where resident and migratory birds of international importance coexist. Coastal species can be spotted year-round, while at different times of year birds that travel thousands of kilometers arrive.",
          },
          fotografia: {
            titulo: "Photography",
            texto_1: "A unique setting for nature photography lovers.",
            texto_2:
              "The combination of open beaches, dunes, sunrises, sunsets, and an extraordinary diversity of birds makes the reserve an ideal place to capture wildlife images. Each season offers different landscapes and behavior.",
          },
          senderismo: {
            titulo: "Hiking",
            texto_1: "Walk the reserve at your own pace.",
            texto_2:
              "Walking the reserve's trail reveals nearly untouched natural environments and lets you enjoy the coastal landscape in silence. The trail leads to the Shorebird Lookout, where you can observe birds, native flora, and wide views of the ocean.",
          },
          naturaleza: {
            titulo: "Nature",
            texto_1: "Much more than birds.",
            texto_2:
              "The reserve protects one of the most representative coastal environments of southeastern Buenos Aires province. Beaches, dunes, and grasslands are home to a rich biodiversity of plants, mammals, reptiles, insects, and birds that form an ecosystem of enormous conservation value. Every visit reveals new landscapes and the importance of preserving this natural heritage.",
          },
        },
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
      alojamientos_loberia_descripcion:
        "In our destination, you will find a wide variety of accommodation options designed for every type of traveler. Whether you seek the comfort of a hotel or the warmth of a family-run lodging.",
      gastronomia_loberia_descripcion:
        "<p>In our destination, the gastronomy is simple and delicious. We invite you to discover the flavors of our community through a varied and affordable offer.</p><br /><br /><p>You can enjoy a good <strong>grill</strong> with local meat cuts, try an authentic <strong>pizza</strong> in its different styles, or sit down at a <strong>restaurant</strong> to savor homemade dishes. </p><p>If you're looking for something quick or just a coffee, you'll find options at our <strong>service stations</strong> and <strong>cafeterias</strong>, perfect for taking a break.</p><br /><br /><p>Get ready to savor our most authentic cuisine!</p>",
      transporte_loberia_descripcion:
        "<p>To move around comfortably and without worries during your visit, we inform you that the city offers private transportation services.</p><p>If you need to get to your accommodation, a restaurant or any point of interest, you can rely on the available <strong>taxi services</strong>. These vehicles offer you a flexible and safe option to move at your own pace.</p>",
      agenda_loberia: "Lobería's Festival and Activity Schedule",
      agenda_loberia_descripcion:
        "Here you have all the information about Lobería's festivals and activities, grouped and organized for easy use on the tourism website.",
      que_hacer_loberia:
        "Lobería: A destination to connect with nature and history",
      fiestas_loberia_descripcion:
        "<p>Lobería is a destination that vibrates with the energy of its festivals and traditions throughout the year. We invite you to plan your visit and be part of our cultural and community calendar.</p><p><h2>Summer (January - March)</h2></p> <ul><li><h3>Lobería Carnivals:</h3> Summer bids farewell in full swing with the traditional carnivals. The nights fill with color, music, and joy with the parade of comparsas, murgas, and floats, a spectacle that brings together the entire community and its visitors.</li><br/><li><h3>Anniversary Celebration and Loberfest:</h3> On January 31st, Lobería celebrates another anniversary of its founding. The festivities include artistic performances, a craft fair, and the great craft beer festival known as Loberfest, with food trucks and live music in a festive atmosphere.</li><br/><li><h3>Fiesta Popular del Pago:</h3> Born as a gathering of friends, this popular festival has become an unmissable event. It’s a unique opportunity to experience folklore and local traditions through live music, grilled barbecue, and a spirit of camaraderie.</li></ul><p><h2>Spring (September - December)</h2></p></br><ul><li><h3>Spring and Student Festival:</h3> In September, Lobería welcomes spring with a big celebration full of color and energy. With recreational activities and live music, the day takes place in the main square, inviting young people and families to enjoy together.</li><br/><br/><li><h3>Rural Exhibitions and Traditional Gatherings:</h3> The city keeps its bond with the countryside alive through Expo Lobería, organized by the Rural Society, an event that showcases the best of agricultural production, and the Asadores Festival, where the aroma of barbecue becomes the main attraction.</li><br/><li><h3>Festival of Communities:</h3> Lobería celebrates its multicultural heritage in this event that pays tribute to the community’s roots. Enjoy music, traditional dances, and the flavors of the different cultures that coexist in the district.</li></ul><h2>Activities Throughout the Year</h2><ul><li><h3>Sports Events:</h3> Races, tournaments, and other local competitions.</li><br/><li><h3>Entrepreneurs’ Fairs:</h3> Exhibitions of local products and crafts.</li><br/><li><h3>Music Festivals:</h3> Opportunities to enjoy performances by local and regional artists.</li><br/><li><h3>Art Exhibitions:</h3> Shows at the Cultural Center and other venues in the city.</li></ul><>Lobería awaits you at any time of the year so you can enjoy an authentic and memorable experience!",
      que_hacer_loberia_descripcion:
        "<p><h2>Lobería: A destination to connect with nature and history</h2><br /><br />Lobería invites you to discover a unique environment where the city, the inland towns, the countryside, the hills, and the sea come together.<br /><br /><h3>Nature and Adventure:</h3> Explore the beauty of <span>Arenas Verdes</span>, our unspoiled beach ideal for enjoying the sea and the dunes, and also the <span>Quequén River</span> in the Las Cascadas area, offering the perfect setting for fishing and kayaking.<br /><br /><h3>Culture and History:</h3> Immerse yourself in the past of the region by visiting the <span>Museum of Natural Sciences</span> and the <span>Historical Museums of the City of Lobería and the town of San Manuel</span>.<br /><br />For motorsport enthusiasts, a must-see is the <span>Villa Ercilia Cultural Center</span>, from which the Automobile Museum is being developed.<br /><br /><h3>Tradition and Relaxation:</h3> Simply stroll through our streets, discover local monuments, and enjoy the peaceful rhythm of life in Lobería — perfect for disconnecting and recharging your energy.</p>",

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
      alojamientos_san_manuel:
        "<h2>Accommodation in San Manuel: Your Place to Rest</h2>",
      alojamientos_san_manuel_descripcion:
        "If you're looking for a quiet place to disconnect and enjoy the peace of the countryside, San Manuel offers accommodations where you can plan your stay in the town.",
      agenda_san_manuel:
        "<h2>Festivals and Traditions in San Manuel: A Reunion with Faith and Community</h2><p>The town of San Manuel celebrates its identity and history through a series of festivities that mark the calendar and attract both locals and visitors.</p><p>These are unique opportunities to connect with the essence of this town.</p><ul><li><h3>Town Anniversary:</h3><p>Every March 25, San Manuel dresses up to celebrate its founding. The event brings the community together in a celebration that includes artistic performances, an artisan fair, and a joyful atmosphere that honors the town's heritage and history.</p></li><li><h3>Celebration of the Virgin of Fátima:</h3><p>Faith is a fundamental pillar in San Manuel.</p><p>In May, the <strong>Our Lady of Fátima Parish</strong> becomes the epicenter of a major religious celebration. The faithful participate in masses, processions, and various activities in honor of their patroness, in an act of devotion that unites the entire community.</p></li><li><h3>Holy Week and the Way of the Cross on Cerro El Toro:</h3><p>Spirituality is experienced in a very special way in the town. During Holy Week, the religious events culminate with the moving representation of the <strong>Way of the Cross on Cerro El Toro:</strong></p><p>Participants walk through the stations in a symbolic ascent, combining devotion with the stunning natural landscape, in an experience of deep reflection.</p></li></ul><p>San Manuel invites you to be part of these traditions that define its spirit and identity.</p>",
      que_hacer_san_manuel:
        "San Manuel: A Corner of History and Faith in the Heart of the Pampas",
      que_hacer_san_manuel_descripcion:
        "<p>San Manuel awaits you to offer an experience of tranquility and deep connection to local traditions. If you are looking for a destination for a peaceful escape, here you will find the opportunity to connect with history and nature.</p><ul><li><h3>Faith and Spirituality:</h3><p>Do not miss the visit to <strong>Cerro El Toro</strong>, home to a moving Via Crucis. Walking its stations is a unique opportunity for reflection, while you enjoy a panoramic view of the landscape.</p></li><li><h3>Journey to the Past:</h3><p>Discover the history of the town at the <strong>Historical Museum</strong>, located in the old train station of the Railway. This place safeguards the legacy of the pioneers and the development of the town.</p></li><li><h3>Local Heritage:</h3><p>Take a moment to appreciate the architecture and peace emanating from the <strong>Parish of Our Lady of Fátima</strong>, a landmark in San Manuel that stands in front of the main square, inviting you to a pause in your tour.</p></li></ul><p>San Manuel is the perfect place for those who value simplicity, history, and the calm of the rural setting among the sierras; it also features a municipal park and pool ideal for sharing moments with friends and family.</p>",
      gastronomia_sanManuel:
        "In San Manuel, the gastronomy is characterized by its simplicity and authenticity. The town offers a variety of dining options where you can savor traditional flavors in a warm and welcoming atmosphere. You can enjoy a hearty meal at local restaurants that serve homemade dishes, or opt for a quick bite at cafes and bakeries that offer delicious pastries and snacks. Don’t miss the opportunity to try local specialties, such as grilled meats, empanadas, and homemade pasta, which reflect the culinary traditions of the region. Whether you’re looking for a full dining experience or just a coffee break, San Manuel has something to satisfy every palate.",
      transport_sanManuel:"To move around comfortably and without worries during your visit, we inform you that the town offers private transportation services. If you need to get to your accommodation, a restaurant or any point of interest, you can rely on the available taxi services. These vehicles offer you a flexible and safe option to move at your own pace.",
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
          "<p>Located just a few kilometers from Lobería, <strong>Arenas Verdes</strong> is a natural seaside resort that captivates with its rugged beauty and tranquility. This unique spot combines an extensive <strong>forest of pines and eucalyptuses</strong>, imposing <strong>dunes</strong>, and a wide <strong>beach</strong> bathed by the Atlantic, creating the perfect setting to disconnect and reconnect with nature.</p",
        mar: "<h3>Enjoy the Sea and the Sand:</h3><p>Walk along the extensive beach, feel the sea breeze, and immerse yourself in the ocean. It is an ideal place for <strong>surfing</strong>, thanks to its excellent waves.</p>",
        entorno:
          "<p><h3>Explore the surroundings:</h3> Stroll along the sandy streets, ride a <strong>bicycle</strong>, and get lost among the forest trails. The combination of pine and sea salt aromas is an unparalleled experience.</p>",
        aire_libre:
          "<h3>Experience nature:</h3> The new <strong>Natural Reserve</strong> invites you to explore its flora and fauna, and capture the beauty of this ecosystem in images.",
        magico:
          "<h3>Magical moments:</h3> Don’t miss the spectacular <strong>sunsets and sunrises</strong> that paint the sky with colors. And when night falls, get ready for a unique show: a completely clear sky, ideal for observing the <strong>stars.</strong>",
        relax:
          "<h3>Relaxation and leisure:</h3> Enjoy the tranquility of the place, visit its <strong>craft shops and seaside resorts</strong>, and spend quality time with family, allowing <strong>children</strong> to play freely in a safe and natural environment.",
        experiencia:
          "<p>Arenas Verdes is more than a beach—it is an experience for all the senses.</p>",
        alojamiento:
          "<p>In Arenas Verdes, we invite you to find the perfect accommodation to enjoy your vacation or special moments throughout the rest of the year. Our offerings cater to all tastes, whether you prefer being close to the sea or the tranquility of the forest.</p>",
        gastronomia:
          "<p>In Arenas Verdes, the culinary experience is as relaxed as its surroundings. Here you will find dining options that blend traditional flavors with seaside charm, perfect for any time of day.</p><p>From classic, cozy local <strong>restaurants</strong> serving homemade dishes to the more sophisticated offerings at beachfront resorts where you can enjoy lunch or dinner with an unparalleled ocean view.</p><p>Additionally, if you’re looking for flavors deeply rooted in our traditions, be sure to try the delicious <strong>empanadas</strong> and authentic <strong>homemade pasta</strong> prepared at one of Arenas Verdes' pioneering establishments.</p><p>Each option is an invitation to sit back, enjoy, and savor the moment with good company.</p>",
      },
      alojamientos_arenas_verdes:
        "Accommodation in Arenas Verdes: Your Ideal Place to Rest",
      alojamientos_arenas_verdes_descripcion:
        "<p><h2>For all travel styles:</h2></p><ul><li><h3>For Nature Lovers:</h3><p>If you seek an authentic experience, you can choose between <strong>camping</strong> under the stars or the privacy of <strong>cabins</strong> and <strong>dormis</strong>, some nestled in the forest.</p></li><li><br/><h3>For Greater Comfort:</h3><p>If traveling with family or friends, you have at your disposal fully equipped <strong>houses</strong>, <strong>apartments</strong>, and <strong>bungalows</strong>, many with privileged views.</p></li></ul><p>Both in the forest area and near the beach, each option will allow you to live a unique experience, waking up to the sound of the sea or surrounded by the peace of the pine trees.</p><p>Get ready to enjoy an unforgettable <strong>stay</strong>.</p>",
      gastronomia_arenas_verdes:
        "Flavors with a Sea View: Gastronomy in Arenas Verdes",
      transporte_arenas_verdes:
        "Arenas Verdes is located in the district of Lobería and can be accessed in two ways: one is via the coastal road from Costa Bonita, and the other is via a 7 km improved road located at km 108.5 of Provincial Route 88.",
      que_hacer_arenas_verdes:
        "Arenas Verdes: A paradise among dunes, sea, and forest",
      actividades_arenas_verdes: "What to do in Arenas Verdes?",

      //General
      informacion_general: "General Info",
      producciones: "Productions",
      alojamientos: "Accommodations",
      gastronomia: "Gastronomy",
      transporte: "Transportation",
      agenda: "Agenda",
      que_hacer: "Things to Do",
      descargas: "Downloads",
      secciones_pagina: "Sections on this page",
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
      busqueda: "Search",
      no_se_encontraron_resultados: "No results found",
      busqueda_contenido: "Content Search",
      buscar_por_nombre: "Search by name...",
      ciudad_provincia_pais: "City, Province, Country",
      ciudad: "City",
      categoria: "Category",
      filtros_activos: "Active Filters",
      alojamiento: "Accommodation",
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

      //Loberia te invita
      titulo_invites: "Lobería invites you",
      p1_invites:
        "During your visit to our city, we want you to enjoy even more.",
      p2_invites:
        "With the program 'Lobería Invites You', you get exclusive discounts and special benefits on accommodations, gastronomy, shops, and local experiences.",
      p3_invites:
        "Request the complete list now and start planning your trip with advantages that will make your stay unforgettable. Lobería awaits you with open arms and many surprises!",
      link_invites: "Request it by filling out a short form by ",
      link_aqui: "clicking here",
      ver_en_openstreetmap: "View in OpenStreetMap",
      page_not_found: "Page Not Found.",
      sorry_not_found: "Sorry, the page you're looking for doesn't exist.",
      back_index: "Return",
      p1_alojamiento:"Plan your stay with us and enjoy an unforgettable experience!",
      p2_alojamiento:"Discover a variety of accommodations that suit your style and needs.",
      p3_alojamiento:"From luxurious suites to cozy cottages, we have something for everyone.",
    },
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
