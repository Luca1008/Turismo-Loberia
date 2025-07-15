const db = require('../models/db');

console.log('📂 cards.routes.js CARGADO');


// Obtener todas las cards sin filtros (admin o debug)
exports.getAllCardsRaw = async (req, res) => {
  try {
    let query = 'SELECT * FROM turismo_prueba."card"';
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener todas las cards sin filtros:', error.message);
    res.status(500).json({ error: 'Error al obtener las cards.' });
  }
};

// Obtener todas las cards (por título, ciudad o categoría — tipo buscador)
exports.getAllCards = async (req, res) => {
  const { city, category, title } = req.query;
  try {
    let query = 'SELECT * FROM turismo_prueba."card"';
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
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener cards:', error.message);
    res.status(500).json({ error: 'Error al obtener los datos.' });
  }
};

// Obtener una card por ID
exports.getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM turismo_prueba."card" WHERE "id" = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card no encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener la card:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Crear nueva card
exports.createCard = async (req, res) => {
  const {
    card_title,
    card_description,
    card_ubicacion,
    card_linkubic,
    card_horario,
    card_contacto,
    card_info,
    card_city,
    card_category
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO turismo_prueba."card" (
        card_title, card_description, card_ubicacion, card_linkubic,
        card_horario, card_contacto, card_info, card_city, card_category
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        card_title,
        card_description,
        card_ubicacion,
        card_linkubic,
        card_horario,
        card_contacto,
        card_info,
        card_city,
        card_category
      ]
    );
    res.status(201).json({ message: 'Card creada correctamente', card: result.rows[0] });
  } catch (error) {
    console.error('Error al crear card:', error.message);
    res.status(500).json({ error: 'Error al crear la card.' });
  }
};

// Actualizar una card por ID
exports.updateCard = async (req, res) => {
  const { id } = req.params;
  const {
    card_title,
    card_description,
    card_ubicacion,
    card_linkubic,
    card_horario,
    card_contacto,
    card_info,
    card_city,
    card_category
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE turismo_prueba."card" SET
        card_title = $1,
        card_description = $2,
        card_ubicacion = $3,
        card_linkubic = $4,
        card_horario = $5,
        card_contacto = $6,
        card_info = $7,
        card_city = $8,
        card_category = $9
      WHERE id = $10 RETURNING *`,
      [
        card_title,
        card_description,
        card_ubicacion,
        card_linkubic,
        card_horario,
        card_contacto,
        card_info,
        card_city,
        card_category,
        id
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card no encontrada para actualizar.' });
    }
    res.json({ message: 'Card actualizada', card: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar card:', error.message);
    res.status(500).json({ error: 'Error al actualizar la card.' });
  }
};


// Eliminar una card por ID
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