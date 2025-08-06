CREATE SCHEMA IF NOT EXISTS turismo_prueba;

CREATE TABLE IF NOT EXISTS turismo_prueba."card" (
    id SERIAL PRIMARY KEY,
    card_title VARCHAR(100),
    card_description TEXT,
    card_ubicacion VARCHAR(255),
    card_link_ubicacion VARCHAR(500),
    card_lat DOUBLE PRECISION,      -- Latitud
    card_lon DOUBLE PRECISION,      -- Longitud
    card_horario VARCHAR(100),
    card_contacto VARCHAR(100),
    card_info TEXT,
    card_city VARCHAR(50),
    card_category VARCHAR(50),
    card_img_portada BYTEA,
    card_img BYTEA,
    card_date DATE
);


-- Alojamientos
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Hostería El Descanso',
    'Alojamiento familiar en el centro de Lobería con desayuno incluido.',
    'Calle San Martín 456',
    'https://www.openstreetmap.org/?mlat=-38.2601&mlon=-58.7685#map=18/-38.2601/-58.7685',
    -38.2601,
    -58.7685,
    'Check-in: 13hs, Check-out: 10hs',
    '02261-432198',
    'WiFi, cochera, aire acondicionado',
    'Lobería',
    'Alojamiento',
    NULL
),
(
    'Cabañas Aires del Campo',
    'Cabañas rústicas rodeadas de naturaleza en las afueras de San Manuel.',
    'Ruta 227 km 45',
    'https://www.openstreetmap.org/?mlat=-38.3452&mlon=-58.9651#map=18/-38.3452/-58.9651',
    -38.3452,
    -58.9651,
    'Check-in: 14hs, Check-out: 11hs',
    '02261-477321',
    'Parrilla, pileta, espacio para niños',
    'San Manuel',
    'Alojamiento',
    NULL
),
(
    'Camping Arenas Verdes',
    'Camping con parcelas frente al mar, ideal para familias y mochileros.',
    'Acceso Principal s/n',
    'https://www.openstreetmap.org/?mlat=-38.2489&mlon=-58.7452#map=18/-38.2489/-58.7452',
    -38.2489,
    -58.7452,
    'Recepción de 08 a 20hs',
    '02261-481234',
    'Duchas, proveeduría, fogones, energía solar',
    'Arenas Verdes',
    'Alojamiento',
    NULL
),
(
    'Cabañas El Bosque',
    'Complejo de cabañas con entorno arbolado y acceso directo a la playa.',
    'Av. de los Pinos 789',
    'https://www.openstreetmap.org/?mlat=-38.2515&mlon=-58.7437#map=18/-38.2515/-58.7437',
    -38.2515,
    -58.7437,
    'Check-in: 15hs, Check-out: 10hs',
    '02261-489456',
    'Estacionamiento, cocina equipada, bicicletas',
    'Arenas Verdes',
    'Alojamiento',
    NULL
),
(
    'Posada San Manuel',
    'Pequeña posada con atención personalizada en pleno centro de San Manuel.',
    'Calle Mitre 123',
    'https://www.openstreetmap.org/?mlat=-38.3421&mlon=-58.9603#map=18/-38.3421/-58.9603',
    -38.3421,
    -58.9603,
    'Check-in: 12hs, Check-out: 10hs',
    '02261-423678',
    'Desayuno casero, TV por cable, calefacción',
    'San Manuel',
    'Alojamiento',
    NULL
);

-- Gastronomia
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Restaurante El Buen Sabor',
    'Cocina casera con especialidades locales y menú diario económico.',
    'Av. San Martín 320',
    'https://www.openstreetmap.org/?mlat=-38.2609&mlon=-58.7672#map=18/-38.2609/-58.7672',
    -38.2609,
    -58.7672,
    'Lun-Dom 12 a 15hs y 20 a 23hs',
    '02261-421123',
    'Menú vegetariano, platos típicos, delivery',
    'Lobería',
    'Gastronomia',
    NULL
),
(
    'La Trattoria de San Manuel',
    'Pizzería artesanal y pastas caseras en un ambiente familiar.',
    'Calle Belgrano 202',
    'https://www.openstreetmap.org/?mlat=-38.3425&mlon=-58.9600#map=18/-38.3425/-58.9600',
    -38.3425,
    -58.9600,
    'Jue-Dom 20 a 00hs',
    '02261-423456',
    'Horno a leña, empanadas, pastas caseras',
    'San Manuel',
    'Gastronomia',
    NULL
),
(
    'Café del Mar',
    'Cafetería y pastelería con vista al mar, ideal para desayunos y meriendas.',
    'Costanera y Calle 1',
    'https://www.openstreetmap.org/?mlat=-38.2475&mlon=-58.7445#map=18/-38.2475/-58.7445',
    -38.2475,
    -58.7445,
    'Todos los días 8 a 20hs',
    '02261-487654',
    'Tortas caseras, café orgánico, jugos naturales',
    'Arenas Verdes',
    'Gastronomia',
    NULL
),
(
    'Parrilla El Fogón',
    'Parrilla tradicional con carnes de la región y ambiente campestre.',
    'Ruta 88 km 10',
    'https://www.openstreetmap.org/?mlat=-38.2750&mlon=-58.7800#map=18/-38.2750/-58.7800',
    -38.2750,
    -58.7800,
    'Vie-Dom 12 a 15hs y 20 a 23hs',
    '02261-422789',
    'Parrilla libre, postres caseros, vino artesanal',
    'Lobería',
    'Gastronomia',
    NULL
),
(
    'Heladería Las Delicias',
    'Heladería artesanal con sabores regionales y productos sin TACC.',
    'Calle Mitre 199',
    'https://www.openstreetmap.org/?mlat=-38.2607&mlon=-58.7680#map=18/-38.2607/-58.7680',
    -38.2607,
    -58.7680,
    'Todos los días 14 a 23hs',
    '02261-431111',
    'Helados artesanales, sin azúcar, sin TACC',
    'Lobería',
    'Gastronomia',
    NULL
);


-- Cultura
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Museo Histórico de Lobería',
    'Espacio cultural dedicado a preservar la historia local y regional.',
    'Calle Italia 150',
    'https://www.openstreetmap.org/?mlat=-38.2615&mlon=-58.7690#map=18/-38.2615/-58.7690',
    -38.2615,
    -58.7690,
    'Mar-Dom 10 a 18hs',
    '02261-432500',
    'Entrada libre, visitas guiadas, archivo fotográfico',
    'Lobería',
    'Cultura',
    NULL
),
(
    'Centro Cultural San Manuel',
    'Espacio comunitario con talleres de arte, música y teatro.',
    'Av. Principal 210',
    'https://www.openstreetmap.org/?mlat=-38.3435&mlon=-58.9607#map=18/-38.3435/-58.9607',
    -38.3435,
    -58.9607,
    'Lun-Vie 14 a 20hs',
    '02261-411002',
    'Talleres gratuitos, ferias artesanales, biblioteca popular',
    'San Manuel',
    'Cultura',
    NULL
),
(
    'Anfiteatro Municipal',
    'Escenario al aire libre donde se realizan espectáculos y eventos culturales.',
    'Parque Municipal Narciso del Valle',
    'https://www.openstreetmap.org/?mlat=-38.2590&mlon=-58.7702#map=18/-38.2590/-58.7702',
    -38.2590,
    -58.7702,
    'Según programación',
    '02261-400123',
    'Festival de jazz, teatro, cine bajo las estrellas',
    'Lobería',
    'Cultura',
    NULL
),
(
    'Biblioteca Popular Arenas Verdes',
    'Pequeña biblioteca comunitaria con actividades para todas las edades.',
    'Calle de los Álamos s/n',
    'https://www.openstreetmap.org/?mlat=-38.2502&mlon=-58.7430#map=18/-38.2502/-58.7430',
    -38.2502,
    -58.7430,
    'Lun-Vie 10 a 13hs y 16 a 19hs',
    '02261-489321',
    'Préstamo de libros, talleres infantiles, cineclub',
    'Arenas Verdes',
    'Cultura',
    NULL
),
(
    'Casa de la Cultura',
    'Centro cultural de Lobería con exposiciones temporales y talleres artísticos.',
    'Calle Mitre 499',
    'https://www.openstreetmap.org/?mlat=-38.2603&mlon=-58.7681#map=18/-38.2603/-58.7681',
    -38.2603,
    -58.7681,
    'Mar-Sáb 9 a 13hs y 17 a 21hs',
    '02261-430890',
    'Clases de pintura, muestras fotográficas, música en vivo',
    'Lobería',
    'Cultura',
    NULL
);

--Eventos
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Festival de Jazz de Lobería',
    'Edición anual del festival con artistas nacionales e internacionales.',
    'Anfiteatro Municipal',
    'https://www.openstreetmap.org/?mlat=-38.2590&mlon=-58.7702#map=18/-38.2590/-58.7702',
    -38.2590,
    -58.7702,
    '20:00 a 02:00 hs',
    '02261-400321',
    'Entrada gratuita. Puestos gastronómicos y feria de artesanos',
    'Lobería',
    'Evento',
    '2025-01-17'
),
(
    'Fiesta del Agricultor',
    'Evento tradicional de San Manuel con desfiles, música y comidas típicas.',
    'Plaza Principal',
    'https://www.openstreetmap.org/?mlat=-38.3430&mlon=-58.9615#map=18/-38.3430/-58.9615',
    -38.3430,
    -58.9615,
    '10:00 a 23:00 hs',
    '02261-414159',
    'Desfile de maquinarias, espectáculos folclóricos, concurso de tortas',
    'San Manuel',
    'Evento',
    '2025-09-07'
),
(
    'Verano Cultural en Arenas Verdes',
    'Ciclo de actividades culturales en la playa durante todo enero.',
    'Playa Principal',
    'https://www.openstreetmap.org/?mlat=-38.2485&mlon=-58.7440#map=18/-38.2485/-58.7440',
    -38.2485,
    -58.7440,
    'Todos los sábados de enero 18:00 a 23:00 hs',
    '02261-481500',
    'Bandas en vivo, cine al aire libre, talleres para niños',
    'Arenas Verdes',
    'Evento',
    '2025-01-04'
),
(
    'Encuentro Coral de Lobería',
    'Concierto con coros de distintas localidades y repertorio variado.',
    'Iglesia Nuestra Señora del Carmen',
    'https://www.openstreetmap.org/?mlat=-38.2605&mlon=-58.7684#map=18/-38.2605/-58.7684',
    -38.2605,
    -58.7684,
    '19:30 a 22:00 hs',
    '02261-432800',
    'Entrada libre y gratuita',
    'Lobería',
    'Evento',
    '2025-08-23'
),
(
    'Feria de Sabores Regionales',
    'Evento gastronómico con productos locales, foodtrucks y música.',
    'Parque Narciso del Valle',
    'https://www.openstreetmap.org/?mlat=-38.2592&mlon=-58.7700#map=18/-38.2592/-58.7700',
    -38.2592,
    -58.7700,
    '11:00 a 20:00 hs',
    '02261-430900',
    'Degustaciones, productores locales, patio cervecero',
    'Lobería',
    'Evento',
    '2025-10-12'
);

-- Interes
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Parque Narciso del Valle',
    'Espacio verde central de Lobería ideal para caminatas, picnic y descanso.',
    'Av. Mitre y Av. Campos',
    'https://www.openstreetmap.org/?mlat=-38.2593&mlon=-58.7703#map=18/-38.2593/-58.7703',
    -38.2593,
    -58.7703,
    'Abierto todo el día',
    NULL,
    'Juegos infantiles, laguna, anfiteatro, bicisenda',
    'Lobería',
    'Interes',
    NULL
),
(
    'Playa Arenas Verdes',
    'Extensión de costa tranquila, rodeada de naturaleza y dunas.',
    'Acceso Arenas Verdes',
    'https://www.openstreetmap.org/?mlat=-38.2483&mlon=-58.7435#map=18/-38.2483/-58.7435',
    -38.2483,
    -58.7435,
    'Acceso libre',
    NULL,
    'Ideal para caminatas, pesca y descanso sin aglomeraciones',
    'Arenas Verdes',
    'Interes',
    NULL
),
(
    'Capilla San Manuel',
    'Ícono histórico del pueblo, construida a fines del siglo XIX.',
    'Calle Principal y Belgrano',
    'https://www.openstreetmap.org/?mlat=-38.3428&mlon=-58.9613#map=18/-38.3428/-58.9613',
    -38.3428,
    -58.9613,
    'Consultar horarios de misa',
    '02261-411111',
    'Arquitectura colonial, centro religioso de la comunidad',
    'San Manuel',
    'Interes',
    NULL
),
(
    'Mirador del Bosque',
    'Punto panorámico natural sobre las dunas y pinos en Arenas Verdes.',
    'Sendero de los Eucaliptos',
    'https://www.openstreetmap.org/?mlat=-38.2510&mlon=-58.7450#map=18/-38.2510/-58.7450',
    -38.2510,
    -58.7450,
    'Libre acceso',
    NULL,
    'Vista al mar y al bosque, ideal para fotos al atardecer',
    'Arenas Verdes',
    'Interes',
    NULL
),
(
    'Plazoleta del Bicentenario',
    'Espacio conmemorativo con arte urbano y esculturas en Lobería.',
    'Esquina Rivadavia y Alem',
    'https://www.openstreetmap.org/?mlat=-38.2620&mlon=-58.7687#map=18/-38.2620/-58.7687',
    -38.2620,
    -58.7687,
    'Abierto 24 hs',
    NULL,
    'Esculturas, murales, bancos y sectores para descanso',
    'Lobería',
    'Interes',
    NULL
);

-- Artesanos
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Feria de Artesanos de Lobería',
    'Espacio permanente donde artesanos locales exponen y venden sus productos.',
    'Plaza Mitre',
    'https://www.openstreetmap.org/?mlat=-38.2604&mlon=-58.7686#map=18/-38.2604/-58.7686',
    -38.2604,
    -58.7686,
    'Sábados y feriados de 10 a 19hs',
    '02261-430210',
    'Cuero, cerámica, tejidos, bijouterie artesanal',
    'Lobería',
    'Artesanos',
    NULL
),
(
    'Taller El Sauce',
    'Emprendimiento familiar dedicado a la carpintería artesanal con maderas recicladas.',
    'Calle Alsina 780',
    'https://www.openstreetmap.org/?mlat=-38.2618&mlon=-58.7701#map=18/-38.2618/-58.7701',
    -38.2618,
    -58.7701,
    'Lun-Vie 9 a 17hs',
    '02261-400879',
    'Muebles rústicos, objetos decorativos, restauraciones',
    'Lobería',
    'Artesanos',
    NULL
),
(
    'Artesanías del Campo',
    'Productores rurales de San Manuel que elaboran tejidos y dulces artesanales.',
    'Predio del ferrocarril',
    'https://www.openstreetmap.org/?mlat=-38.3445&mlon=-58.9622#map=18/-38.3445/-58.9622',
    -38.3445,
    -58.9622,
    'Domingos de 10 a 14hs',
    '02261-412300',
    'Ponchos, dulces caseros, cuchillería criolla',
    'San Manuel',
    'Artesanos',
    NULL
),
(
    'Feria de Verano Arenas Verdes',
    'Feria estacional con puestos de artesanos, diseño y productos locales.',
    'Paseo de los Artesanos',
    'https://www.openstreetmap.org/?mlat=-38.2490&mlon=-58.7441#map=18/-38.2490/-58.7441',
    -38.2490,
    -58.7441,
    'Todos los días (enero y febrero) de 18 a 23hs',
    '02261-481700',
    'Souvenirs, joyería artesanal, arte reciclado',
    'Arenas Verdes',
    'Artesanos',
    NULL
),
(
    'Taller de Cerámica María Paz',
    'Taller artesanal que realiza piezas únicas de cerámica inspiradas en la naturaleza local.',
    'Calle Jujuy 1120',
    'https://www.openstreetmap.org/?mlat=-38.2609&mlon=-58.7712#map=18/-38.2609/-58.7712',
    -38.2609,
    -58.7712,
    'Con cita previa',
    '02261-409321',
    'Venta de piezas únicas, talleres para turistas',
    'Lobería',
    'Artesanos',
    NULL
);

-- Serv Publicos
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Hospital Municipal Gaspar Campos',
    'Centro de salud pública de referencia para toda la región.',
    'Av. Mitre 950',
    'https://www.openstreetmap.org/?mlat=-38.2617&mlon=-58.7705#map=18/-38.2617/-58.7705',
    -38.2617,
    -58.7705,
    'Atención 24 hs',
    '02261-432100',
    'Guardia médica, atención general, laboratorio, ambulancias',
    'Lobería',
    'ServPublicos',
    NULL
),
(
    'Comisaría de Lobería',
    'Dependencia policial local para atención de emergencias y trámites.',
    'Av. San Martín 625',
    'https://www.openstreetmap.org/?mlat=-38.2610&mlon=-58.7692#map=18/-38.2610/-58.7692',
    -38.2610,
    -58.7692,
    'Guardia 24 hs',
    '02261-430911',
    'Emergencias, denuncias, seguridad ciudadana',
    'Lobería',
    'ServPublicos',
    NULL
),
(
    'Delegación Municipal San Manuel',
    'Oficina de atención municipal para trámites y consultas vecinales.',
    'Calle Principal 450',
    'https://www.openstreetmap.org/?mlat=-38.3439&mlon=-58.9618#map=18/-38.3439/-58.9618',
    -38.3439,
    -58.9618,
    'Lun-Vie 8 a 14hs',
    '02261-411100',
    'Atención al vecino, servicios públicos, reclamos',
    'San Manuel',
    'ServPublicos',
    NULL
),
(
    'Unidad Sanitaria Arenas Verdes',
    'Centro de atención primaria para residentes y turistas.',
    'Calle Principal s/n',
    'https://www.openstreetmap.org/?mlat=-38.2487&mlon=-58.7433#map=18/-38.2487/-58.7433',
    -38.2487,
    -58.7433,
    'Lun-Sáb 8 a 18hs',
    '02261-481300',
    'Consultas generales, primeros auxilios, enfermería',
    'Arenas Verdes',
    'ServPublicos',
    NULL
),
(
    'Oficina de Turismo Lobería',
    'Centro de información para visitantes, con mapas y recomendaciones.',
    'Av. Campos 401',
    'https://www.openstreetmap.org/?mlat=-38.2606&mlon=-58.7684#map=18/-38.2606/-58.7684',
    -38.2606,
    -58.7684,
    'Todos los días 9 a 17hs',
    '02261-430800',
    'Folletos, guías turísticas, asistencia en viajes',
    'Lobería',
    'ServPublicos',
    NULL
);


-- Info Util
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_lat, card_lon, card_horario, card_contacto, card_info,
    card_city, card_category, card_date
) VALUES
(
    'Estación de Servicio YPF Lobería',
    'Estación de servicio con combustibles, tienda y aire para neumáticos.',
    'Ruta 88 km 55',
    'https://www.openstreetmap.org/?mlat=-38.2600&mlon=-58.7700#map=18/-38.2600/-58.7700',
    -38.2600,
    -58.7700,
    'Abierto 24 horas',
    '02261-430500',
    'Combustibles, tienda, lavado de autos',
    'Lobería',
    'InfoUtil',
    NULL
),
(
    'Banco Nación Lobería',
    'Sucursal bancaria con atención al público y cajeros automáticos.',
    'Av. Campos 512',
    'https://www.openstreetmap.org/?mlat=-38.2612&mlon=-58.7698#map=18/-38.2612/-58.7698',
    -38.2612,
    -58.7698,
    'Lun-Vie 9 a 15 hs',
    '02261-430600',
    'Cajeros automáticos, caja, atención personalizada',
    'Lobería',
    'InfoUtil',
    NULL
),
(
    'Farmacia Central San Manuel',
    'Farmacia con atención y delivery de medicamentos.',
    'Calle Belgrano 250',
    'https://www.openstreetmap.org/?mlat=-38.3425&mlon=-58.9610#map=18/-38.3425/-58.9610',
    -38.3425,
    -58.9610,
    'Lun-Dom 8 a 22 hs',
    '02261-411555',
    'Medicamentos, productos de cuidado personal, delivery',
    'San Manuel',
    'InfoUtil',
    NULL
),
(
    'Cajero Automático Banco Provincia Arenas Verdes',
    'Cajero automático ubicado en el centro comercial de Arenas Verdes.',
    'Plaza Central',
    'https://www.openstreetmap.org/?mlat=-38.2487&mlon=-58.7439#map=18/-38.2487/-58.7439',
    -38.2487,
    -58.7439,
    'Disponible 24 horas',
    NULL,
    'Operaciones bancarias básicas, extracción de efectivo',
    'Arenas Verdes',
    'InfoUtil',
    NULL
),
(
    'Terminal de Ómnibus Lobería',
    'Terminal con servicios de transporte interurbano y atención al pasajero.',
    'Av. San Martín 800',
    'https://www.openstreetmap.org/?mlat=-38.2617&mlon=-58.7687#map=18/-38.2617/-58.7687',
    -38.2617,
    -58.7687,
    'Lun-Dom 5 a 23 hs',
    '02261-430777',
    'Venta de pasajes, sala de espera, sanitarios',
    'Lobería',
    'InfoUtil',
    NULL
);


-- Tabla "users"
CREATE TABLE IF NOT EXISTS turismo_prueba.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    reset_token TEXT,
    reset_token_expires BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_role CHECK (role IN ('superadmin', 'admin'))
);

-- Usuarios de ejemplo con password: loberia1234
INSERT INTO turismo_prueba.users (name, surname, email, password, role) VALUES
('loberia', 'loberia', 'loberiaturismo@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'superadmin'),
('Ana', 'Martínez', 'ana.martinez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin'),
('Carlos', 'Pérez', 'carlos.perez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin'),
('Laura', 'González', 'laura.gonzalez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin'),
('Javier', 'Rodríguez', 'javier.rodriguez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin');