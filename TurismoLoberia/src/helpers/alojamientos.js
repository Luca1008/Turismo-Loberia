/**
 * Alojamientos por ciudad: configuración de grupos y datos de respaldo.
 *
 * Los alojamientos se administran como cards (categoría "Alojamiento") desde
 * la propia sección Alojamientos de cada ciudad (botones de admin). Los datos
 * de acá se usan:
 *  - como respaldo de solo lectura si la API todavía no devuelve alojamientos
 *    con tipo (ej. antes de correr las migraciones en producción), y
 *  - como fuente del SQL de carga inicial
 *    (Backend/migrations/2026-11-alojamientos-datos.sql).
 *
 * Fuentes: folletos de la Dirección de Turismo "Alojamientos en Lobería —
 * Marzo 2026" y "Alojamientos en Arenas Verdes". Nombres, teléfonos y redes
 * se transcriben tal cual; en calles solo se corrigieron tildes.
 *
 * Forma de cada alojamiento (mismos nombres que las columnas de la card):
 *   card_tipo        clave del grupo (ver ACCOMMODATION_GROUPS)
 *   card_title       nombre
 *   card_description capacidad / descripción (opcional)
 *   card_ubicacion   dirección (opcional)
 *   card_contacto    contactos, uno por línea: teléfonos, @instagram, email,
 *                    web o texto libre (ej. "Facebook: ...")
 *   card_info        nota (opcional)
 */

/** Nombre de ciudad tal como se guarda en `card_city`. */
export const ACCOMMODATION_CITY = {
  loberia: "Lobería",
  arenas_verdes: "Arenas Verdes",
};

/**
 * Grupos de cada ciudad, en el orden en que se muestran. `icon` es el
 * nombre de un ícono de react-icons/lu (ver AccommodationDirectory.jsx);
 * `label` es la key de traducción del título del grupo.
 */
export const ACCOMMODATION_GROUPS = {
  loberia: [
    { tipo: "hotel", icon: "hotel", label: "alojamientos_listado.grupos.hotel" },
    { tipo: "particular", icon: "house", label: "alojamientos_listado.grupos.particular" },
  ],
  arenas_verdes: [
    { tipo: "cabana", icon: "trees", label: "alojamientos_listado.grupos.cabana" },
    { tipo: "apart", icon: "building", label: "alojamientos_listado.grupos.apart" },
    { tipo: "hostal", icon: "bed", label: "alojamientos_listado.grupos.hostal" },
    { tipo: "camping", icon: "tent", label: "alojamientos_listado.grupos.camping" },
  ],
};

/** Fecha del folleto de origen (se muestra al pie del listado; null si el
 * folleto no tiene fecha). */
export const ACCOMMODATION_UPDATED = {
  loberia: "marzo de 2026",
  arenas_verdes: null,
};

const tel = (...lines) => lines.join("\n");

export const ACCOMMODATION_FALLBACK = {
  loberia: [
    { card_tipo: "hotel", card_title: "Hotel El Único", card_ubicacion: "Av. Campos N°382", card_contacto: "2262 585832" },
    { card_tipo: "hotel", card_title: "Hotel El Ciervo", card_ubicacion: "Belgrano N°110", card_contacto: "02261 44 3100" },

    { card_tipo: "particular", card_title: "Susana Jiménez", card_description: "6 plazas", card_ubicacion: "Roque Sáenz Peña N°410", card_contacto: "2261-443517" },
    { card_tipo: "particular", card_title: "Mariana Vidal", card_description: "4 plazas (cuchetas)", card_ubicacion: "Las Heras N°191", card_contacto: "2262-358647" },
    { card_tipo: "particular", card_title: "Quique Vidal y Laura Iriart", card_description: "6 plazas", card_ubicacion: "Moreno N°200", card_contacto: "2262-406010", card_info: "Emite Factura A" },
    { card_tipo: "particular", card_title: "Los Estribos", card_description: "5 plazas", card_ubicacion: "Rivadavia N°49", card_contacto: "2262-638626" },
    { card_tipo: "particular", card_title: "Jorge Gastiarena", card_description: "Casa", card_ubicacion: "Lisandro de la Torre N°255", card_contacto: "2262-563756" },
    { card_tipo: "particular", card_title: "Omar Maidana", card_description: "Casa con 6 plazas", card_ubicacion: "Pieres N°658", card_contacto: "2262-316748" },
    { card_tipo: "particular", card_title: "Lorena Perez", card_description: "Contenedor de 4 plazas y dpto. de 4 plazas", card_ubicacion: "1° de Mayo N°126", card_contacto: "2262-417796" },
    { card_tipo: "particular", card_title: "Ana María Vidal", card_description: "Hasta 5 personas", card_ubicacion: "Francisco López N°262", card_contacto: "2262-638626" },
    { card_tipo: "particular", card_title: "Vanesa Ituarte", card_description: "2 plazas", card_ubicacion: "Alberdi N°540", card_contacto: "2262-309967" },
    { card_tipo: "particular", card_title: "Ana Geraldine Fuentes Medina", card_description: "Dpto. de 4 plazas", card_ubicacion: "España N°1080", card_contacto: "2262-517228" },
    { card_tipo: "particular", card_title: "Claudia Oviedo", card_description: "Dpto. tipo loft para 4 personas", card_contacto: "2262-485710" },
    { card_tipo: "particular", card_title: "Mariela García", card_description: "4 dptos.", card_ubicacion: "Rivadavia N°175", card_contacto: "2262-645744" },
    { card_tipo: "particular", card_title: "Walter Medel", card_description: "Dpto. de 3 ambientes", card_ubicacion: "Latuler N°148", card_contacto: "2262-568392" },
    { card_tipo: "particular", card_title: "Miguel Liberati", card_description: "Casona de 10 plazas", card_ubicacion: "Belgrano N°40", card_contacto: "2262-352594" },
    { card_tipo: "particular", card_title: "Silvana Capelli", card_description: "Dpto. de 6 plazas", card_ubicacion: "Mitre y Las Heras", card_contacto: "2262-303668" },
    { card_tipo: "particular", card_title: "Melisa Marcos", card_description: "Casa de 5 plazas", card_ubicacion: "Arce N°540", card_contacto: "2262-474974" },
    { card_tipo: "particular", card_title: "Elsa Riquito", card_description: "Casa de 10 plazas", card_ubicacion: "Aristóbulo del Valle N°351", card_contacto: "2262-475604" },
    { card_tipo: "particular", card_title: "Rosa Retta", card_description: "Casa con 2 dormitorios para 4 personas", card_ubicacion: "Juan B. Justo N°345", card_contacto: "2262-631962" },
    { card_tipo: "particular", card_title: "Anibal Sanchez y Carlos Díaz", card_description: "Casa de 4 plazas", card_ubicacion: "Güemes N°642", card_contacto: "2262-511541" },
    { card_tipo: "particular", card_title: "Lucila Belén Baisi", card_description: "Monoambiente de 2 a 4 plazas", card_ubicacion: "Maison N°561", card_contacto: "2262-483220" },
    { card_tipo: "particular", card_title: "Paola Pisani", card_description: "3 dptos. (2 de 6 plazas y 1 de 8 plazas)", card_ubicacion: "Alberdi N°780", card_contacto: "2262-473236" },
  ],

  arenas_verdes: [
    // ---------------- Cabañas ----------------
    {
      card_tipo: "cabana",
      card_title: "Moradas de Mar",
      card_description:
        "Cabaña para 4 personas. Cama matrimonial y 2 camas de una plaza con ropa de cama. Cocina y baño equipados (no proveen toallas). Living comedor, deck terraza, parrilla, cochera semicubierta y wifi. No tiene TV.",
      card_contacto: tel("0223 15 6893167", "Facebook: moradasdemar"),
    },
    {
      card_tipo: "cabana",
      card_title: "Los Pericos",
      card_description:
        "Aire acondicionado en habitación, ventilador de pie, microondas, cafetera, pava eléctrica, tostadora, tender, elementos de limpieza y blanquería (solicitar).",
      card_contacto: "+54 9 2262 64-5302",
    },
    {
      card_tipo: "cabana",
      card_title: "Bisonte Cabañas de Mar",
      card_description:
        "Cabañas para 1, 2, 3, 4, 5 o 6 personas, todas con vista al mar. Equipadas con cocina con vajilla, baño con agua caliente, heladera, DirecTV, wifi, ropa de cama y ropa blanca.",
      card_contacto: tel("2261415031", "@cabanasdemar"),
    },
    {
      card_tipo: "cabana",
      card_title: "Complejo de Cabañas \"La Posada de Miguel\"",
      card_description:
        "Cabañas para 2, 4 y 6 personas, totalmente equipadas. Sommier matrimonial, cocina con vajilla completa y heladera con freezer. Wifi y parrilla.",
      card_contacto: tel("1158923187", "@laposadademiguel", "Facebook: laposadademiguel"),
    },
    {
      card_tipo: "cabana",
      card_title: "Los Altos del Chiquín",
      card_description:
        "Apart con habitaciones totalmente equipadas con anafe, microondas, pava eléctrica, heladera, baño amplio, TV, ropa blanca y desayuno continental. El complejo cuenta con pileta.",
      card_contacto: tel("02261-440037", "0249 15 455396", "www.arenasverdes.com"),
    },
    {
      card_tipo: "cabana",
      card_title: "Refugio de Mar",
      card_description:
        "Cabaña Ignacio (4 personas): cocina comedor, living con futón de 2 plazas, baño, habitación con cama matrimonial de sommier, amplio deck, parrilla y ducha exterior, estacionamiento dentro del predio. Cabaña Mercedes (5/6 personas): cocina comedor, living con futón de 2 plazas más cama de 1 plaza y carro con cama de 1 plaza, baño, habitación con cama matrimonial, amplio deck, parrilla y ducha exterior.",
      card_contacto: "@refugiodemararenas",
      card_info:
        "No cuentan con servicio de ropa blanca (sí abrigos de cama, mantas polar y cubrecamas): traer sábanas y toallas.",
    },

    // ---------------- Apart ----------------
    {
      card_tipo: "apart",
      card_title: "Mar de Oro Eco Apart",
      card_description:
        "3 aparts de diseño moderno: dos en planta alta para 5 huéspedes cada uno y uno en planta baja, el más amplio, con 3 cuartos y dos baños para 7 huéspedes. Parrilla, parque, hamacas, piscina y quincho de paja. Ropa de cama y ropa blanca, TV, wifi, heladera con freezer, cocina completa y living comedor.",
      card_contacto: tel("2262-410987", "@mardeoro_arenasverdes"),
    },
    {
      card_tipo: "apart",
      card_title: "La Escondida Eco Apart",
      card_description:
        "2 aparts para 2 personas, con pileta y parrilla. Equipados con TV, cocina, calefacción y wifi.",
      card_contacto: tel("219-4066991", "@laescondida_arenasverdes"),
    },
    {
      card_tipo: "apart",
      card_title: "Mar de Oro Villa Oceánica",
      card_description:
        "A metros de la plaza y a 500 m del mar. 8 aparts de hasta 4 huéspedes en planta baja y 4 aparts de hasta 8 huéspedes en planta alta, todos con un divertido diseño temático. Parrillas, amplio parque, piscina, ropa de cama y ropa blanca, heladera con freezer, TV, wifi, cocina completa y living comedor.",
      card_contacto: tel("2262-410987", "@mardeoro_arenasverdes"),
    },
    {
      card_tipo: "apart",
      card_title: "Buddha Beach Complejo Frente al Mar",
      card_description:
        "Habitaciones equipadas con wifi, cocina, heladera y smart TV. Pileta, ropa blanca, parrillas y vista al mar. Clases de yoga opcionales.",
      card_contacto: tel("2262 32-4594", "@complejobuddha"),
    },

    // ---------------- Hostal, departamentos y bungalows ----------------
    {
      card_tipo: "hostal",
      card_title: "Frente al Mar Departamentos",
      card_description:
        "Cabañas y departamentos para 2 a 5 personas, a 50 m de la playa y con hermosas vistas. Totalmente equipados: baño y ducha privados, parrilla en deck individual, vajilla completa, heladera con freezer, TV y wifi.",
      card_contacto: tel("116-117-9060", "Instagram: Frente al mar-departamentos"),
    },
    {
      card_tipo: "hostal",
      card_title: "Complejo Sol a Sol",
      card_description: "Hospedaje, gastronomía y balneario en la playa.",
      card_contacto: tel(
        "236-154-573083",
        "complejosolasol@gmail.com",
        "www.complejosolasol.com.ar",
        "Facebook: Complejo Sol a Sol",
        "@complejosolasol"
      ),
    },
    {
      card_tipo: "hostal",
      card_title: "Gozándola Hostel Surfero",
      card_description:
        "A 80 m del mar. Habitación privada chica (cama matrimonial), habitación privada grande (cama matrimonial más cucheta, 4 plazas) y habitaciones compartidas para hombres y para mujeres (5 plazas individuales cada una), todas con baño privado. Incluye ropa de cama, cocina compartida súper equipada, espacios compartidos, wifi y patio interno con fogonero.",
      card_contacto: tel("+54 9 381 332-3007", "@gozandolahostel"),
    },

    // ---------------- Campings ----------------
    {
      card_tipo: "camping",
      card_title: "Base de Campamento Municipal",
      card_description:
        "Con acceso desde la avenida principal. Electricidad y agua, fogón y parrilla, sanitarios, vestuarios y duchas, comedor, cocina, zona de depósito, lavadero y sector para casillas y vehículos.",
      card_ubicacion: "Avenida B y calle 12",
      card_contacto: tel(
        "Arenas Verdes: 2262-301388",
        "Lobería: 02261-442126 int. 100 (de 07:00 a 13:00 hs)",
        "basedecampamentoarenasverdes@gmail.com"
      ),
    },
    {
      card_tipo: "camping",
      card_title: "Complejo de Mar y Camping",
      card_description:
        "Camping renovado con casi 3 ha para disfrutar de sus árboles y servicios. Cuenta con dormis/bungalows y otros servicios.",
      card_contacto: tel("2262-301108", "@arenas.verdes"),
      card_info: "Durante muchos años fue conocido como \"Aldea de Mar\".",
    },
  ],
};
