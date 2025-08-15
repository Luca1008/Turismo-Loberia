const db = require('../models/db');

// Crear nueva suscripción
exports.createSubscription = async (req, res) => {
  try {
    const {
      direction, think, project, name, email, phone,
      companions, transport, source, accept
    } = req.body;

    const query = `
      INSERT INTO turismo_prueba.subscriptions
      (direction, think, project, name, email, phone, companions, transport, source, accept)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      direction,
      think,
      project,
      name,
      email,
      phone || null,
      companions || null,
      transport || null,
      source || null,
      accept || false
    ];

    const result = await db.query(query, values);

    res.status(201).json({
      message: "Subscription saved successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving subscription", error: error.message });
  }
};

// Obtener todas las suscripciones
exports.getAllSubscriptions = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM turismo_prueba.subscriptions
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching subscriptions", error: error.message });
  }
};

// Obtener suscripciones con paginación y búsqueda
exports.getSubscriptions = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    let whereClause = '';
    let values = [];
    if (search) {
      whereClause = `WHERE name ILIKE $1 OR email ILIKE $2`;
      values = [`%${search}%`, `%${search}%`];
    }

    const countQuery = `SELECT COUNT(*) FROM turismo_prueba.subscriptions ${whereClause}`;
    const countResult = await db.query(countQuery, values);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    const dataQuery = `
      SELECT * FROM turismo_prueba.subscriptions
      ${whereClause}
      ORDER BY fecha DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    const dataValues = [...values, limit, offset];
    const dataResult = await db.query(dataQuery, dataValues);

    res.json({
      page,
      totalPages,
      totalItems,
      data: dataResult.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching subscriptions", error: error.message });
  }
};
