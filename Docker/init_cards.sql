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
    card_img BYTEA,
    card_date DATE
);

-- Alojamientos
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_horario, card_contacto, card_info, card_city, card_category
) VALUES
('Hotel Costa Azul', 'Hotel frente al mar con todas las comodidades.', 'Av. Costanera 1200', 'https://maps.google.com', 
'Check-in: 14hs, Check-out: 10hs', '0221-478596', 'WiFi gratuito, piscina, estacionamiento', 'Arenas Verdes', 'Alojamiento'),
('Cabañas del Bosque', 'Cabañas rústicas en medio de la naturaleza.', 'Ruta 226 km 12', 'https://maps.google.com', 
'Flexible', '0221-362514', 'Cabañas para 2-6 personas, parrillas', 'Lobería', 'Alojamiento'),
('Posada Don Juan', 'Encantadora posada con estilo colonial.', 'Calle San Martín 450', 'https://maps.google.com', 
'Check-in: 15hs, Check-out: 11hs', '0221-785412', 'Desayuno incluido, jardín', 'San Manuel', 'Alojamiento');

-- Eventos
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_horario, card_contacto, card_info, card_city, card_category, card_date
) VALUES
('Festival de Jazz', 'Tercera edición del festival internacional de jazz.', 'Anfiteatro Municipal', 'https://maps.google.com', 
'20-02hs', '0221-963258', 'Venta de entradas en boletería', 'Lobería', 'Evento', '2024-11-15'),
('Feria Artesanal', 'Productos regionales y artesanías locales.', 'Plaza San Martín', 'https://maps.google.com', 
'Sáb y Dom 10-20hs', '0221-741852', 'Más de 50 expositores', 'San Manuel', 'Evento', '2024-10-05'),
('Maratón Costera', 'Carrera de 10k por la costa con premios.', 'Balneario Municipal', 'https://maps.google.com', 
'08-12hs', '0221-852963', 'Inscripciones online', 'Arenas Verdes', 'Evento', '2024-12-08');

-- Cultura
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_horario, card_contacto, card_info, card_city, card_category
) VALUES
('Teatro Municipal', 'Edificio histórico con programación cultural variada.', 'Av. Belgrano 350', 'https://maps.google.com', 
'Mié-Dom 18-23hs', '0221-369852', 'Cartelera en página web', 'Lobería', 'Cultura'),
('Biblioteca Popular', 'Más de 20,000 ejemplares y sala de lectura.', 'Calle Rivadavia 200', 'https://maps.google.com', 
'Lun-Vie 8-20hs, Sáb 9-13hs', '0221-456123', 'Acceso gratuito', 'San Manuel', 'Cultura'),
('Centro Cultural', 'Exposiciones de arte y talleres culturales.', 'Calle 3 entre 10 y 11', 'https://maps.google.com', 
'Mar-Dom 10-22hs', '0221-987654', 'Programación mensual', 'Arenas Verdes', 'Cultura');

-- Gastronomía
INSERT INTO turismo_prueba."card" (
    card_title, card_description, card_ubicacion, card_link_ubicacion,
    card_horario, card_contacto, card_info, card_city, card_category
) VALUES
('La Parrilla de Pepe', 'Carnes asadas y especialidades regionales.', 'Ruta 11 km 42', 'https://maps.google.com', 
'12-15hs y 20-24hs', '0221-321654', 'Reservas recomendadas', 'Arenas Verdes', 'Gastronomia'),
('El Viejo Almacén', 'Comida casera y postres tradicionales.', 'Calle 5 N° 1234', 'https://maps.google.com', 
'08-23hs', '0221-654987', 'Menú ejecutivo de lunes a viernes', 'Lobería', 'Gastronomia'),
('Sushi Mar', 'Sushi y cocina japonesa con vista al mar.', 'Av. Costanera 1500', 'https://maps.google.com', 
'19-01hs', '0221-789456', 'Take away disponible', 'Arenas Verdes', 'Gastronomia'),
('Café Literario', 'Cafetería temática con libros y ambiente bohemio.', 'Calle San Martín 600', 'https://maps.google.com', 
'08-22hs', '0221-147258', 'Eventos culturales semanales', 'San Manuel', 'Gastronomia');

CREATE TABLE IF NOT EXISTS turismo_prueba.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_role CHECK (role IN ('superadmin', 'admin'))
);

-- Usuarios de ejemplo password: loberia1234
INSERT INTO turismo_prueba.users (name, surname, email, password, role) VALUES
('loberia', 'loberia', 'loberia@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'superadmin'),
('Ana', 'Martínez', 'ana.martinez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin'),
('Carlos', 'Pérez', 'carlos.perez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin'),
('Laura', 'González', 'laura.gonzalez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin'),
('Javier', 'Rodríguez', 'javier.rodriguez@gmail.com', '$2b$10$e/OaIzd87RlIkA7hkR6YnOMiai4X9Mcwh4.RU6yi78EkxqqpkbKNG', 'admin');