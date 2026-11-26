-- =====================================================================
-- Carga inicial de alojamientos (Ciudad de Lobería y Arenas Verdes)
-- =====================================================================
-- Generado a partir de TurismoLoberia/src/helpers/alojamientos.js
-- (folletos "Alojamientos en Lobería — Marzo 2026" y "Alojamientos en
-- Arenas Verdes").
--
-- Requiere haber corrido antes 2026-11-alojamientos-estructura.sql.
--
-- Para cada alojamiento:
--   - si ya existe una card de "Alojamiento" de esa ciudad con el mismo
--     nombre (sin distinguir mayúsculas) y todavía sin tipo, se actualiza
--     con los datos del folleto y se le asigna el tipo (conserva su id e
--     imágenes; ej. las cards viejas "Hotel el ciervo" / "Hotel el único");
--   - si no existe, se crea.
-- Es idempotente: correrlo dos veces no duplica alojamientos.
--
-- Cómo correrlo:
--   psql -h <host> -U <user> -d <db> -f 2026-11-alojamientos-datos.sql
-- =====================================================================

BEGIN;


-- ---------------- Lobería (23) ----------------
UPDATE turismo_prueba."card" SET card_tipo = 'hotel', card_title = 'Hotel El Único', card_description = NULL, card_ubicacion = 'Av. Campos N°382', card_contacto = '2262 585832', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Hotel El Único') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'hotel', 'Hotel El Único', NULL, 'Av. Campos N°382', '2262 585832', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Hotel El Único'));
UPDATE turismo_prueba."card" SET card_tipo = 'hotel', card_title = 'Hotel El Ciervo', card_description = NULL, card_ubicacion = 'Belgrano N°110', card_contacto = '02261 44 3100', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Hotel El Ciervo') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'hotel', 'Hotel El Ciervo', NULL, 'Belgrano N°110', '02261 44 3100', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Hotel El Ciervo'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Susana Jiménez', card_description = '6 plazas', card_ubicacion = 'Roque Sáenz Peña N°410', card_contacto = '2261-443517', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Susana Jiménez') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Susana Jiménez', '6 plazas', 'Roque Sáenz Peña N°410', '2261-443517', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Susana Jiménez'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Mariana Vidal', card_description = '4 plazas (cuchetas)', card_ubicacion = 'Las Heras N°191', card_contacto = '2262-358647', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Mariana Vidal') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Mariana Vidal', '4 plazas (cuchetas)', 'Las Heras N°191', '2262-358647', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Mariana Vidal'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Quique Vidal y Laura Iriart', card_description = '6 plazas', card_ubicacion = 'Moreno N°200', card_contacto = '2262-406010', card_info = 'Emite Factura A'
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Quique Vidal y Laura Iriart') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Quique Vidal y Laura Iriart', '6 plazas', 'Moreno N°200', '2262-406010', 'Emite Factura A', 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Quique Vidal y Laura Iriart'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Los Estribos', card_description = '5 plazas', card_ubicacion = 'Rivadavia N°49', card_contacto = '2262-638626', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Los Estribos') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Los Estribos', '5 plazas', 'Rivadavia N°49', '2262-638626', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Los Estribos'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Jorge Gastiarena', card_description = 'Casa', card_ubicacion = 'Lisandro de la Torre N°255', card_contacto = '2262-563756', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Jorge Gastiarena') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Jorge Gastiarena', 'Casa', 'Lisandro de la Torre N°255', '2262-563756', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Jorge Gastiarena'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Omar Maidana', card_description = 'Casa con 6 plazas', card_ubicacion = 'Pieres N°658', card_contacto = '2262-316748', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Omar Maidana') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Omar Maidana', 'Casa con 6 plazas', 'Pieres N°658', '2262-316748', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Omar Maidana'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Lorena Perez', card_description = 'Contenedor de 4 plazas y dpto. de 4 plazas', card_ubicacion = '1° de Mayo N°126', card_contacto = '2262-417796', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Lorena Perez') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Lorena Perez', 'Contenedor de 4 plazas y dpto. de 4 plazas', '1° de Mayo N°126', '2262-417796', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Lorena Perez'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Ana María Vidal', card_description = 'Hasta 5 personas', card_ubicacion = 'Francisco López N°262', card_contacto = '2262-638626', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Ana María Vidal') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Ana María Vidal', 'Hasta 5 personas', 'Francisco López N°262', '2262-638626', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Ana María Vidal'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Vanesa Ituarte', card_description = '2 plazas', card_ubicacion = 'Alberdi N°540', card_contacto = '2262-309967', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Vanesa Ituarte') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Vanesa Ituarte', '2 plazas', 'Alberdi N°540', '2262-309967', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Vanesa Ituarte'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Ana Geraldine Fuentes Medina', card_description = 'Dpto. de 4 plazas', card_ubicacion = 'España N°1080', card_contacto = '2262-517228', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Ana Geraldine Fuentes Medina') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Ana Geraldine Fuentes Medina', 'Dpto. de 4 plazas', 'España N°1080', '2262-517228', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Ana Geraldine Fuentes Medina'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Claudia Oviedo', card_description = 'Dpto. tipo loft para 4 personas', card_ubicacion = NULL, card_contacto = '2262-485710', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Claudia Oviedo') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Claudia Oviedo', 'Dpto. tipo loft para 4 personas', NULL, '2262-485710', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Claudia Oviedo'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Mariela García', card_description = '4 dptos.', card_ubicacion = 'Rivadavia N°175', card_contacto = '2262-645744', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Mariela García') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Mariela García', '4 dptos.', 'Rivadavia N°175', '2262-645744', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Mariela García'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Walter Medel', card_description = 'Dpto. de 3 ambientes', card_ubicacion = 'Latuler N°148', card_contacto = '2262-568392', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Walter Medel') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Walter Medel', 'Dpto. de 3 ambientes', 'Latuler N°148', '2262-568392', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Walter Medel'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Miguel Liberati', card_description = 'Casona de 10 plazas', card_ubicacion = 'Belgrano N°40', card_contacto = '2262-352594', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Miguel Liberati') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Miguel Liberati', 'Casona de 10 plazas', 'Belgrano N°40', '2262-352594', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Miguel Liberati'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Silvana Capelli', card_description = 'Dpto. de 6 plazas', card_ubicacion = 'Mitre y Las Heras', card_contacto = '2262-303668', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Silvana Capelli') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Silvana Capelli', 'Dpto. de 6 plazas', 'Mitre y Las Heras', '2262-303668', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Silvana Capelli'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Melisa Marcos', card_description = 'Casa de 5 plazas', card_ubicacion = 'Arce N°540', card_contacto = '2262-474974', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Melisa Marcos') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Melisa Marcos', 'Casa de 5 plazas', 'Arce N°540', '2262-474974', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Melisa Marcos'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Elsa Riquito', card_description = 'Casa de 10 plazas', card_ubicacion = 'Aristóbulo del Valle N°351', card_contacto = '2262-475604', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Elsa Riquito') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Elsa Riquito', 'Casa de 10 plazas', 'Aristóbulo del Valle N°351', '2262-475604', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Elsa Riquito'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Rosa Retta', card_description = 'Casa con 2 dormitorios para 4 personas', card_ubicacion = 'Juan B. Justo N°345', card_contacto = '2262-631962', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Rosa Retta') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Rosa Retta', 'Casa con 2 dormitorios para 4 personas', 'Juan B. Justo N°345', '2262-631962', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Rosa Retta'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Anibal Sanchez y Carlos Díaz', card_description = 'Casa de 4 plazas', card_ubicacion = 'Güemes N°642', card_contacto = '2262-511541', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Anibal Sanchez y Carlos Díaz') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Anibal Sanchez y Carlos Díaz', 'Casa de 4 plazas', 'Güemes N°642', '2262-511541', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Anibal Sanchez y Carlos Díaz'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Lucila Belén Baisi', card_description = 'Monoambiente de 2 a 4 plazas', card_ubicacion = 'Maison N°561', card_contacto = '2262-483220', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Lucila Belén Baisi') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Lucila Belén Baisi', 'Monoambiente de 2 a 4 plazas', 'Maison N°561', '2262-483220', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Lucila Belén Baisi'));
UPDATE turismo_prueba."card" SET card_tipo = 'particular', card_title = 'Paola Pisani', card_description = '3 dptos. (2 de 6 plazas y 1 de 8 plazas)', card_ubicacion = 'Alberdi N°780', card_contacto = '2262-473236', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Paola Pisani') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'particular', 'Paola Pisani', '3 dptos. (2 de 6 plazas y 1 de 8 plazas)', 'Alberdi N°780', '2262-473236', NULL, 'Lobería', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Lobería' AND lower(card_title) = lower('Paola Pisani'));

-- ---------------- Arenas Verdes (15) ----------------
UPDATE turismo_prueba."card" SET card_tipo = 'cabana', card_title = 'Moradas de Mar', card_description = 'Cabaña para 4 personas. Cama matrimonial y 2 camas de una plaza con ropa de cama. Cocina y baño equipados (no proveen toallas). Living comedor, deck terraza, parrilla, cochera semicubierta y wifi. No tiene TV.', card_ubicacion = NULL, card_contacto = '0223 15 6893167
Facebook: moradasdemar', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Moradas de Mar') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'cabana', 'Moradas de Mar', 'Cabaña para 4 personas. Cama matrimonial y 2 camas de una plaza con ropa de cama. Cocina y baño equipados (no proveen toallas). Living comedor, deck terraza, parrilla, cochera semicubierta y wifi. No tiene TV.', NULL, '0223 15 6893167
Facebook: moradasdemar', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Moradas de Mar'));
UPDATE turismo_prueba."card" SET card_tipo = 'cabana', card_title = 'Los Pericos', card_description = 'Aire acondicionado en habitación, ventilador de pie, microondas, cafetera, pava eléctrica, tostadora, tender, elementos de limpieza y blanquería (solicitar).', card_ubicacion = NULL, card_contacto = '+54 9 2262 64-5302', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Los Pericos') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'cabana', 'Los Pericos', 'Aire acondicionado en habitación, ventilador de pie, microondas, cafetera, pava eléctrica, tostadora, tender, elementos de limpieza y blanquería (solicitar).', NULL, '+54 9 2262 64-5302', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Los Pericos'));
UPDATE turismo_prueba."card" SET card_tipo = 'cabana', card_title = 'Bisonte Cabañas de Mar', card_description = 'Cabañas para 1, 2, 3, 4, 5 o 6 personas, todas con vista al mar. Equipadas con cocina con vajilla, baño con agua caliente, heladera, DirecTV, wifi, ropa de cama y ropa blanca.', card_ubicacion = NULL, card_contacto = '2261415031
@cabanasdemar', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Bisonte Cabañas de Mar') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'cabana', 'Bisonte Cabañas de Mar', 'Cabañas para 1, 2, 3, 4, 5 o 6 personas, todas con vista al mar. Equipadas con cocina con vajilla, baño con agua caliente, heladera, DirecTV, wifi, ropa de cama y ropa blanca.', NULL, '2261415031
@cabanasdemar', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Bisonte Cabañas de Mar'));
UPDATE turismo_prueba."card" SET card_tipo = 'cabana', card_title = 'Complejo de Cabañas "La Posada de Miguel"', card_description = 'Cabañas para 2, 4 y 6 personas, totalmente equipadas. Sommier matrimonial, cocina con vajilla completa y heladera con freezer. Wifi y parrilla.', card_ubicacion = NULL, card_contacto = '1158923187
@laposadademiguel
Facebook: laposadademiguel', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Complejo de Cabañas "La Posada de Miguel"') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'cabana', 'Complejo de Cabañas "La Posada de Miguel"', 'Cabañas para 2, 4 y 6 personas, totalmente equipadas. Sommier matrimonial, cocina con vajilla completa y heladera con freezer. Wifi y parrilla.', NULL, '1158923187
@laposadademiguel
Facebook: laposadademiguel', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Complejo de Cabañas "La Posada de Miguel"'));
UPDATE turismo_prueba."card" SET card_tipo = 'cabana', card_title = 'Los Altos del Chiquín', card_description = 'Apart con habitaciones totalmente equipadas con anafe, microondas, pava eléctrica, heladera, baño amplio, TV, ropa blanca y desayuno continental. El complejo cuenta con pileta.', card_ubicacion = NULL, card_contacto = '02261-440037
0249 15 455396
www.arenasverdes.com', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Los Altos del Chiquín') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'cabana', 'Los Altos del Chiquín', 'Apart con habitaciones totalmente equipadas con anafe, microondas, pava eléctrica, heladera, baño amplio, TV, ropa blanca y desayuno continental. El complejo cuenta con pileta.', NULL, '02261-440037
0249 15 455396
www.arenasverdes.com', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Los Altos del Chiquín'));
UPDATE turismo_prueba."card" SET card_tipo = 'cabana', card_title = 'Refugio de Mar', card_description = 'Cabaña Ignacio (4 personas): cocina comedor, living con futón de 2 plazas, baño, habitación con cama matrimonial de sommier, amplio deck, parrilla y ducha exterior, estacionamiento dentro del predio. Cabaña Mercedes (5/6 personas): cocina comedor, living con futón de 2 plazas más cama de 1 plaza y carro con cama de 1 plaza, baño, habitación con cama matrimonial, amplio deck, parrilla y ducha exterior.', card_ubicacion = NULL, card_contacto = '@refugiodemararenas', card_info = 'No cuentan con servicio de ropa blanca (sí abrigos de cama, mantas polar y cubrecamas): traer sábanas y toallas.'
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Refugio de Mar') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'cabana', 'Refugio de Mar', 'Cabaña Ignacio (4 personas): cocina comedor, living con futón de 2 plazas, baño, habitación con cama matrimonial de sommier, amplio deck, parrilla y ducha exterior, estacionamiento dentro del predio. Cabaña Mercedes (5/6 personas): cocina comedor, living con futón de 2 plazas más cama de 1 plaza y carro con cama de 1 plaza, baño, habitación con cama matrimonial, amplio deck, parrilla y ducha exterior.', NULL, '@refugiodemararenas', 'No cuentan con servicio de ropa blanca (sí abrigos de cama, mantas polar y cubrecamas): traer sábanas y toallas.', 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Refugio de Mar'));
UPDATE turismo_prueba."card" SET card_tipo = 'apart', card_title = 'Mar de Oro Eco Apart', card_description = '3 aparts de diseño moderno: dos en planta alta para 5 huéspedes cada uno y uno en planta baja, el más amplio, con 3 cuartos y dos baños para 7 huéspedes. Parrilla, parque, hamacas, piscina y quincho de paja. Ropa de cama y ropa blanca, TV, wifi, heladera con freezer, cocina completa y living comedor.', card_ubicacion = NULL, card_contacto = '2262-410987
@mardeoro_arenasverdes', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Mar de Oro Eco Apart') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'apart', 'Mar de Oro Eco Apart', '3 aparts de diseño moderno: dos en planta alta para 5 huéspedes cada uno y uno en planta baja, el más amplio, con 3 cuartos y dos baños para 7 huéspedes. Parrilla, parque, hamacas, piscina y quincho de paja. Ropa de cama y ropa blanca, TV, wifi, heladera con freezer, cocina completa y living comedor.', NULL, '2262-410987
@mardeoro_arenasverdes', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Mar de Oro Eco Apart'));
UPDATE turismo_prueba."card" SET card_tipo = 'apart', card_title = 'La Escondida Eco Apart', card_description = '2 aparts para 2 personas, con pileta y parrilla. Equipados con TV, cocina, calefacción y wifi.', card_ubicacion = NULL, card_contacto = '219-4066991
@laescondida_arenasverdes', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('La Escondida Eco Apart') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'apart', 'La Escondida Eco Apart', '2 aparts para 2 personas, con pileta y parrilla. Equipados con TV, cocina, calefacción y wifi.', NULL, '219-4066991
@laescondida_arenasverdes', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('La Escondida Eco Apart'));
UPDATE turismo_prueba."card" SET card_tipo = 'apart', card_title = 'Mar de Oro Villa Oceánica', card_description = 'A metros de la plaza y a 500 m del mar. 8 aparts de hasta 4 huéspedes en planta baja y 4 aparts de hasta 8 huéspedes en planta alta, todos con un divertido diseño temático. Parrillas, amplio parque, piscina, ropa de cama y ropa blanca, heladera con freezer, TV, wifi, cocina completa y living comedor.', card_ubicacion = NULL, card_contacto = '2262-410987
@mardeoro_arenasverdes', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Mar de Oro Villa Oceánica') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'apart', 'Mar de Oro Villa Oceánica', 'A metros de la plaza y a 500 m del mar. 8 aparts de hasta 4 huéspedes en planta baja y 4 aparts de hasta 8 huéspedes en planta alta, todos con un divertido diseño temático. Parrillas, amplio parque, piscina, ropa de cama y ropa blanca, heladera con freezer, TV, wifi, cocina completa y living comedor.', NULL, '2262-410987
@mardeoro_arenasverdes', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Mar de Oro Villa Oceánica'));
UPDATE turismo_prueba."card" SET card_tipo = 'apart', card_title = 'Buddha Beach Complejo Frente al Mar', card_description = 'Habitaciones equipadas con wifi, cocina, heladera y smart TV. Pileta, ropa blanca, parrillas y vista al mar. Clases de yoga opcionales.', card_ubicacion = NULL, card_contacto = '2262 32-4594
@complejobuddha', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Buddha Beach Complejo Frente al Mar') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'apart', 'Buddha Beach Complejo Frente al Mar', 'Habitaciones equipadas con wifi, cocina, heladera y smart TV. Pileta, ropa blanca, parrillas y vista al mar. Clases de yoga opcionales.', NULL, '2262 32-4594
@complejobuddha', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Buddha Beach Complejo Frente al Mar'));
UPDATE turismo_prueba."card" SET card_tipo = 'hostal', card_title = 'Frente al Mar Departamentos', card_description = 'Cabañas y departamentos para 2 a 5 personas, a 50 m de la playa y con hermosas vistas. Totalmente equipados: baño y ducha privados, parrilla en deck individual, vajilla completa, heladera con freezer, TV y wifi.', card_ubicacion = NULL, card_contacto = '116-117-9060
Instagram: Frente al mar-departamentos', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Frente al Mar Departamentos') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'hostal', 'Frente al Mar Departamentos', 'Cabañas y departamentos para 2 a 5 personas, a 50 m de la playa y con hermosas vistas. Totalmente equipados: baño y ducha privados, parrilla en deck individual, vajilla completa, heladera con freezer, TV y wifi.', NULL, '116-117-9060
Instagram: Frente al mar-departamentos', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Frente al Mar Departamentos'));
UPDATE turismo_prueba."card" SET card_tipo = 'hostal', card_title = 'Complejo Sol a Sol', card_description = 'Hospedaje, gastronomía y balneario en la playa.', card_ubicacion = NULL, card_contacto = '236-154-573083
complejosolasol@gmail.com
www.complejosolasol.com.ar
Facebook: Complejo Sol a Sol
@complejosolasol', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Complejo Sol a Sol') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'hostal', 'Complejo Sol a Sol', 'Hospedaje, gastronomía y balneario en la playa.', NULL, '236-154-573083
complejosolasol@gmail.com
www.complejosolasol.com.ar
Facebook: Complejo Sol a Sol
@complejosolasol', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Complejo Sol a Sol'));
UPDATE turismo_prueba."card" SET card_tipo = 'hostal', card_title = 'Gozándola Hostel Surfero', card_description = 'A 80 m del mar. Habitación privada chica (cama matrimonial), habitación privada grande (cama matrimonial más cucheta, 4 plazas) y habitaciones compartidas para hombres y para mujeres (5 plazas individuales cada una), todas con baño privado. Incluye ropa de cama, cocina compartida súper equipada, espacios compartidos, wifi y patio interno con fogonero.', card_ubicacion = NULL, card_contacto = '+54 9 381 332-3007
@gozandolahostel', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Gozándola Hostel Surfero') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'hostal', 'Gozándola Hostel Surfero', 'A 80 m del mar. Habitación privada chica (cama matrimonial), habitación privada grande (cama matrimonial más cucheta, 4 plazas) y habitaciones compartidas para hombres y para mujeres (5 plazas individuales cada una), todas con baño privado. Incluye ropa de cama, cocina compartida súper equipada, espacios compartidos, wifi y patio interno con fogonero.', NULL, '+54 9 381 332-3007
@gozandolahostel', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Gozándola Hostel Surfero'));
UPDATE turismo_prueba."card" SET card_tipo = 'camping', card_title = 'Base de Campamento Municipal', card_description = 'Con acceso desde la avenida principal. Electricidad y agua, fogón y parrilla, sanitarios, vestuarios y duchas, comedor, cocina, zona de depósito, lavadero y sector para casillas y vehículos.', card_ubicacion = 'Avenida B y calle 12', card_contacto = 'Arenas Verdes: 2262-301388
Lobería: 02261-442126 int. 100 (de 07:00 a 13:00 hs)
basedecampamentoarenasverdes@gmail.com', card_info = NULL
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Base de Campamento Municipal') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'camping', 'Base de Campamento Municipal', 'Con acceso desde la avenida principal. Electricidad y agua, fogón y parrilla, sanitarios, vestuarios y duchas, comedor, cocina, zona de depósito, lavadero y sector para casillas y vehículos.', 'Avenida B y calle 12', 'Arenas Verdes: 2262-301388
Lobería: 02261-442126 int. 100 (de 07:00 a 13:00 hs)
basedecampamentoarenasverdes@gmail.com', NULL, 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Base de Campamento Municipal'));
UPDATE turismo_prueba."card" SET card_tipo = 'camping', card_title = 'Complejo de Mar y Camping', card_description = 'Camping renovado con casi 3 ha para disfrutar de sus árboles y servicios. Cuenta con dormis/bungalows y otros servicios.', card_ubicacion = NULL, card_contacto = '2262-301108
@arenas.verdes', card_info = 'Durante muchos años fue conocido como "Aldea de Mar".'
  WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Complejo de Mar y Camping') AND card_tipo IS NULL;
INSERT INTO turismo_prueba."card" (card_tipo, card_title, card_description, card_ubicacion, card_contacto, card_info, card_city, card_category)
  SELECT 'camping', 'Complejo de Mar y Camping', 'Camping renovado con casi 3 ha para disfrutar de sus árboles y servicios. Cuenta con dormis/bungalows y otros servicios.', NULL, '2262-301108
@arenas.verdes', 'Durante muchos años fue conocido como "Aldea de Mar".', 'Arenas Verdes', 'Alojamiento'
  WHERE NOT EXISTS (SELECT 1 FROM turismo_prueba."card" WHERE card_category = 'Alojamiento' AND card_city = 'Arenas Verdes' AND lower(card_title) = lower('Complejo de Mar y Camping'));

COMMIT;
