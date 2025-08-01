const db = require('../models/db');

// 🧠 Función utilitaria para convertir buffer en base64 para el frontend
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

// GET sin filtros
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

// GET con filtros dinámicos
exports.getAllCards = async (req, res) => {
  const { city, category, title, page = 1, limit = 6 } = req.query;
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

// GET por ID
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

// POST (crear nueva card)
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


// PUT (actualizar una card)
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

// DELETE
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