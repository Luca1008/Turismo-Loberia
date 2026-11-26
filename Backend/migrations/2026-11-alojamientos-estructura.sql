-- =====================================================================
-- Migración: alojamientos editables desde la sección Alojamientos
-- =====================================================================
-- Qué hace (no borra ni modifica datos existentes):
--   1. Agrega la columna opcional `card_tipo` (grupo del alojamiento:
--      hotel, particular, cabana, apart, hostal, camping). Las cards
--      existentes quedan con NULL. En PostgreSQL agregar una columna
--      nullable sin valor por defecto es instantáneo (no reescribe la tabla).
--   2. Asegura que `card_contacto` sea TEXT (en algunas instalaciones es
--      VARCHAR(100) y no alcanza para varios teléfonos/redes). Pasar de
--      VARCHAR a TEXT tampoco reescribe la tabla.
--
-- Es idempotente: se puede correr más de una vez sin problema.
--
-- Antes de correrla en producción, hacer backup:
--   pg_dump -h <host> -U <user> -d <db> -n turismo_prueba -F c -f backup_$(date +%F).dump
--
-- Cómo correrla:
--   psql -h <host> -U <user> -d <db> -f 2026-11-alojamientos-estructura.sql
--
-- Cómo deshacerla (si hiciera falta):
--   ALTER TABLE turismo_prueba."card" DROP COLUMN IF EXISTS card_tipo;
-- =====================================================================

BEGIN;

ALTER TABLE turismo_prueba."card" ADD COLUMN IF NOT EXISTS card_tipo TEXT;
ALTER TABLE turismo_prueba."card" ALTER COLUMN card_contacto TYPE TEXT;

COMMIT;
