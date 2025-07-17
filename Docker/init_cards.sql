CREATE SCHEMA IF NOT EXISTS turismo_prueba;

CREATE TABLE IF NOT EXISTS turismo_prueba."card" (
    id SERIAL PRIMARY KEY,
    card_title VARCHAR(100),
    card_description TEXT,
    card_city VARCHAR(50),
    card_img_portada VARCHAR(255)
);

INSERT INTO turismo_prueba."card" (card_title, card_description, card_city, card_img_portada) VALUES
('Plaza Central', 'La plaza principal de la ciudad, ideal para paseos y eventos.', 'Lobería', 'https://via.placeholder.com/300x200?text=Plaza+Central'),
('Museo Histórico', 'Museo con exposiciones sobre la historia local.', 'Lobería', 'https://via.placeholder.com/300x200?text=Museo+Histórico'),
('Playa Arenas Verdes', 'Hermosa playa para disfrutar en familia.', 'Arenas Verdes', 'https://via.placeholder.com/300x200?text=Playa+Arenas+Verdes'),
('Parque San Manuel', 'Espacio verde con juegos y actividades al aire libre.', 'San Manuel', 'https://via.placeholder.com/300x200?text=Parque+San+Manuel');