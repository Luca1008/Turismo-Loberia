const db = require('../models/db');

/**
 * Convierte los buffers de imagen de una card en base64 para el frontend
 *
 * @param {Object} card - Objeto card de la base de datos
 * @returns {Object} Card con imágenes formateadas en base64
 */
const formatCardWithImages = (card) => {
  return {
    ...card,
    card_img_portada: card.card_img_portada
      ? `data:image/jpeg;base64,${card.card_img_portada.toString('base64')}`
      : null,
    card_img: card.card_img
      ? `data:image/jpeg;base64,${card.card_img.toString('base64')}`
      : null
  };
};

/**
 * GET /cards/raw
 * 
 * Obtiene todas las cards sin filtros.
 *
 * @group Cards - Operaciones sobre cards
 * @returns {Array<Object>} 200 - Lista de cards
 * @returns {Error} 500 - Error al obtener las cards
 */
exports.getAllCardsRaw = async (req, res) => {
  try {
    const query = 'SELECT * FROM turismo_prueba."card"';
    const result = await db.query(query);
    const formatted = result.rows.map(formatCardWithImages);
    res.json(formatted);
  } catch (error) {
    console.error('Error al obtener todas las cards sin filtros:', error.message);
    res.status(500).json({ error: 'Error al obtener las cards.' });
  }
};

/**
 * GET /cards
 * 
 * Obtiene todas las cards con filtros dinámicos (paginación incluida).
 *
 * @group Cards - Operaciones sobre cards
 * @param {string} [city] - Ciudad de la card
 * @param {string} [category] - Categoría (Ej: Evento, Atractivo)
 * @param {string} [title] - Búsqueda por título (ILIKE)
 * @param {number} [page=1] - Página actual
 * @param {number} [limit=6] - Límite de resultados por página
 * @returns {Object} 200 - { total, cards }
 * @returns {Error} 500 - Error al obtener cards
 *//**
 * GET /cards
 * 
 * Obtiene todas las cards con filtros dinámicos (paginación incluida).
 *
 * @group Cards - Operaciones sobre cards
 * @param {string} [city] - Ciudad de la card
 * @param {string} [category] - Categoría (Ej: Evento, Atractivo)
 * @param {string} [title] - Búsqueda por título (ILIKE)
 * @param {number} [page=1] - Página actual
 * @param {number} [limit=6] - Límite de resultados por página
 * @returns {Object} 200 - { total, cards }
 * @returns {Error} 500 - Error al obtener cards
 */
exports.getAllCards = async (req, res) => {
  const { city, category, title, page = 1, limit = 6 } = req.query;
  const isAdmin = req.user?.role === "admin";
  try {
    let query = 'SELECT * FROM turismo_prueba."card"';
    let countQuery = 'SELECT COUNT(*) FROM turismo_prueba."card"';
    const params = [];
    const conditions = [];

    if (title) {
      params.push(`%${title}%`);
      conditions.push(`"card_title" ILIKE $${params.length}`);
    }
    if (city) {
      params.push(city);
      conditions.push(`"card_city" = $${params.length}`);
    }
    if (category) {
      params.push(category);
      conditions.push(`"card_category" = $${params.length}`);
      if (category === 'Evento' && !isAdmin) {
        params.push(new Date());
        conditions.push(`"card_date" >= $${params.length}`);
      }
    }

    if (conditions.length > 0) {
      const whereClause = ' WHERE ' + conditions.join(' AND ');
      query += whereClause;
      countQuery += whereClause;
    }

     const countResult = await db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`;

    const result = await db.query(query, params);
    const formatted = result.rows.map(formatCardWithImages);
    res.json({
      total,
      cards: formatted
    });
  } catch (error) {
    console.error('Error al obtener cards:', error.message);
    res.status(500).json({ error: 'Error al obtener los datos.' });
  }
};

/**
 * GET /cards/:id
 * 
 * Obtiene una card por su ID.
 *
 * @group Cards - Operaciones sobre cards
 * @param {number} id.path.required - ID de la card
 * @returns {Object} 200 - Card encontrada
 * @returns {Error} 404 - Card no encontrada
 */
exports.getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM turismo_prueba."card" WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card no encontrada.' });
    }
    res.json(formatCardWithImages(result.rows[0]));
  } catch (error) {
    console.error('Error al obtener la card:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

/**
 * POST /cards
 * 
 * Crea una nueva card con imágenes opcionales.
 *
 * @group Cards - Operaciones sobre cards
 * @param {string} card_title.body.required - Título
 * @param {string} card_description.body - Descripción
 * @param {string} card_city.body - Ciudad
 * @param {string} card_category.body - Categoría
 * @param {file} card_img_portada.formData - Imagen portada (opcional)
 * @param {file} card_img.formData - Imagen secundaria (opcional)
 * @returns {Object} 201 - Card creada correctamente
 * @returns {Error} 500 - Error al crear la card
 */
exports.createCard = async (req, res) => {
  try {
    const {
      card_title, card_description, card_ubicacion, card_link_ubicacion,
      card_horario, card_contacto, card_info, card_city, card_category, card_date,
      card_lat, card_lon
    } = req.body;

    const imgPortada = req.files?.card_img_portada?.[0]?.buffer || null;
    const imgExtra = req.files?.card_img?.[0]?.buffer || null;

    const result = await db.query(
      `INSERT INTO turismo_prueba."card" (
        card_title, card_description, card_ubicacion, card_link_ubicacion,
        card_horario, card_contacto, card_info, card_city, card_category,
        card_lat, card_lon,
        card_img_portada, card_img, card_date
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [
        card_title, card_description, card_ubicacion, card_link_ubicacion,
        card_horario, card_contacto, card_info, card_city, card_category,
        card_lat || null, card_lon || null,
        imgPortada, imgExtra, card_date || null
      ]
    );

    res.status(201).json({ message: 'Card creada correctamente', card: formatCardWithImages(result.rows[0]) });
  } catch (error) {
    console.error('Error al crear card con imagen:', error.message);
    res.status(500).json({ error: 'Error al crear la card con imagen.' });
  }
};


/**
 * PUT /cards/:id
 * 
 * Actualiza una card existente.
 *
 * @group Cards - Operaciones sobre cards
 * @param {number} id.path.required - ID de la card
 * @param {string} [card_title.body] - Título
 * @param {string} [card_description.body] - Descripción
 * @param {file} [card_img_portada.formData] - Imagen portada
 * @param {file} [card_img.formData] - Imagen secundaria
 * @returns {Object} 200 - Card actualizada
 * @returns {Error} 404 - Card no encontrada
 */
exports.updateCard = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      card_title, card_description, card_ubicacion, card_link_ubicacion,
      card_horario, card_contacto, card_info, card_city, card_category, card_date,
      card_lat, card_lon
    } = req.body;

    const imgPortada = req.files?.card_img_portada?.[0]?.buffer || null;
    const imgExtra = req.files?.card_img?.[0]?.buffer || null;

    const result = await db.query(
      `UPDATE turismo_prueba."card" SET
        card_title=$1, card_description=$2, card_ubicacion=$3, card_link_ubicacion=$4,
        card_horario=$5, card_contacto=$6, card_info=$7, card_city=$8, card_category=$9,
        card_lat=$10, card_lon=$11,
        card_img_portada=$12, card_img=$13, card_date=$14
      WHERE id = $15 RETURNING *`,
      [
        card_title, card_description, card_ubicacion, card_link_ubicacion,
        card_horario, card_contacto, card_info, card_city, card_category,
        card_lat || null, card_lon || null,
        imgPortada, imgExtra, card_date || null, id
      ]
    );

    if (result.rowCount === 0) return res.status(404).json({ error: 'Card no encontrada para actualizar.' });
    res.json({ message: 'Card actualizada correctamente', card: formatCardWithImages(result.rows[0]) });
  } catch (error) {
    console.error('Error al actualizar card:', error.message);
    res.status(500).json({ error: 'Error al actualizar la card.' });
  }
};

/**
 * DELETE /cards/:id
 * 
 * Elimina una card existente.
 *
 * @group Cards - Operaciones sobre cards
 * @param {number} id.path.required - ID de la card
 * @returns {Object} 200 - Card eliminada
 * @returns {Error} 404 - Card no encontrada
 */
exports.deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM turismo_prueba."card" WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card no encontrada para eliminar.' });
    }
    res.json({ message: 'Card eliminada', card: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar card:', error.message);
    res.status(500).json({ error: 'Error al eliminar la card.' });
  }
};