CREATE SCHEMA IF NOT EXISTS turismo_prueba;

CREATE TABLE IF NOT EXISTS turismo_prueba."card" (
    id SERIAL PRIMARY KEY,
    card_title VARCHAR(100),
    card_description TEXT,
    card_ubicacion VARCHAR(255),
    card_link_ubicacion VARCHAR(500),
    card_horario VARCHAR(100),
    card_contacto VARCHAR(100),
    card_info TEXT,
    card_city VARCHAR(50),
    card_category VARCHAR(50),
    card_img_portada BYTEA,
    card_img BYTEA
);

INSERT INTO turismo_prueba."card" (card_title, card_description, card_ubicacion, card_link_ubicacion, card_horario, card_contacto, card_info, card_city, card_category) VALUES
('Plaza Central', 'La plaza principal de la ciudad, ideal para paseos y eventos.', 'Centro de Lobería', 'https://maps.google.com', '24/7', '0221-123456', 'Información adicional sobre la plaza', 'Lobería', 'Cultura'),
('Museo Histórico', 'Museo con exposiciones sobre la historia local.', 'Av. Principal 123', 'https://maps.google.com', 'Lun-Vie 9-18hs', '0221-654321', 'Visitas guiadas disponibles', 'Lobería', 'Cultura'),
('Playa Arenas Verdes', 'Hermosa playa para disfrutar en familia.', 'Ruta 11 km 45', 'https://maps.google.com', 'Todo el día', '0221-789012', 'Balneario con servicios', 'Arenas Verdes', 'Cultura'),
('Parque San Manuel', 'Espacio verde con juegos y actividades al aire libre.', 'San Manuel Centro', 'https://maps.google.com', '8-20hs', '0221-345678', 'Parque recreativo familiar', 'San Manuel', 'Cultura');

CREATE TABLE IF NOT EXISTS turismo_prueba.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuarios de ejemplo
INSERT INTO turismo_prueba.users (name, surname, email, password) VALUES
('Felicitas', 'Aguerralde', 'felicitas.aguerralde@gmail.com', 'Feluchi89');