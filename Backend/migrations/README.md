# Migraciones

Se corren a mano, en orden, con `psql`. Todas son idempotentes (se pueden
correr más de una vez sin duplicar ni romper nada).

## 2026-11 — Alojamientos editables

1. **Backup** de la base de producción:
   ```bash
   pg_dump -h <host> -U <user> -d <db> -n turismo_prueba -F c \
     -f /var/backups/turismo/backup_turismo_$(date +%F).dump
   ```
2. **Estructura** (agrega `card_tipo`, asegura `card_contacto` TEXT; no
   modifica datos):
   ```bash
   psql -h <host> -U <user> -d <db> -v ON_ERROR_STOP=1 -f 2026-11-alojamientos-estructura.sql
   ```
3. **Publicar el backend** (`make deploy` + `sudo systemctl restart turismo_backend`).
   El backend nuevo funciona aunque el paso 2 no se haya corrido (ignora el tipo).
4. **Datos** (38 alojamientos: 23 de Ciudad de Lobería y 15 de Arenas Verdes;
   si ya existe una card de Alojamiento con el mismo nombre en esa ciudad, la
   actualiza en vez de duplicarla):
   ```bash
   psql -h <host> -U <user> -d <db> -v ON_ERROR_STOP=1 -f 2026-11-alojamientos-datos.sql
   ```
5. **Publicar el frontend.** Mientras no estén cargados los datos, la sección
   muestra el listado del folleto (solo lectura).

Para deshacer el paso 2: `ALTER TABLE turismo_prueba."card" DROP COLUMN IF EXISTS card_tipo;`
