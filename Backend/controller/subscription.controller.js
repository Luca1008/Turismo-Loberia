const db = require('../models/db');

/**
 * POST /subscriptions
 *
 * Crea una nueva suscripción en el sistema.
 *
 * @group Subscriptions - Operaciones sobre suscripciones
 * @param {string} direction.body - Dirección del suscriptor
 * @param {string} think.body - Opinión o comentario del suscriptor
 * @param {string} project.body - Proyecto asociado
 * @param {string} name.body.required - Nombre del suscriptor
 * @param {string} email.body.required - Email del suscriptor
 * @param {string} phone.body - Teléfono del suscriptor
 * @param {number} companions.body - Número de acompañantes
 * @param {string[]} transport.body - Medios de transporte seleccionados
 * @param {string[]} source.body - Cómo conoció el proyecto
 * @param {boolean} [accept.body=false] - Aceptación de términos
 * @returns {Object} 201 - { message, data }
 * @returns {Error} 500 - Error al guardar la suscripción
 */
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

/**
 * GET /subscriptions/all
 *
 * Obtiene todas las suscripciones (sin filtros, solo ordenadas por fecha).
 *
 * @group Subscriptions - Operaciones sobre suscripciones
 * @returns {Array<Object>} 200 - Lista de suscripciones
 * @returns {Error} 500 - Error al obtener las suscripciones
 */
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

/**
 * GET /subscriptions
 *
 * Obtiene suscripciones con paginación y búsqueda opcional.
 *
 * @group Subscriptions - Operaciones sobre suscripciones
 * @param {number} [page.query=1] - Número de página
 * @param {number} [limit.query=10] - Límite de elementos por página
 * @param {string} [search.query] - Texto a buscar (nombre o email)
 * @returns {Object} 200 - { page, totalPages, totalItems, data }
 * @returns {Error} 500 - Error al obtener las suscripciones
 */
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

/**
 * GET /subscriptions/stats
 *
 * Obtiene estadísticas de las suscripciones para el panel de administración.
 *
 * @group Subscriptions - Operaciones sobre suscripciones
 * @returns {Object} 200 - {
 *   total: number,
 *   transport: Array<{ transporte: string, count: number }>,
 *   source: Array<{ source_option: string, count: number }>,
 *   accept: Array<{ accept: boolean, count: number }>
 * }
 * @returns {Error} 500 - Error al obtener estadísticas
 */
exports.getStats = async (req, res) => {
  try {
    const total = await db.query(`SELECT COUNT(*) FROM turismo_prueba.subscriptions`);
    const transport = await db.query(`
      SELECT unnest(transport) AS transporte, COUNT(*) 
      FROM turismo_prueba.subscriptions
      GROUP BY transporte
      ORDER BY count DESC
    `);
    const source = await db.query(`
      SELECT unnest(source) AS source_option, COUNT(*) 
      FROM turismo_prueba.subscriptions
      GROUP BY source_option
      ORDER BY count DESC
    `);
    const accept = await db.query(`
      SELECT accept, COUNT(*) 
      FROM turismo_prueba.subscriptions
      GROUP BY accept
    `);

    res.json({
      total: parseInt(total.rows[0].count),
      transport: transport.rows,
      source: source.rows,
      accept: accept.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};
