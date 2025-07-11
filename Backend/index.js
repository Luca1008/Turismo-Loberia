// ==== Imports y configuración ====
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ==== Middlewares ====
app.use(cors());
app.use(express.json());

// ==== Conexión a PostgreSQL ====
const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  search_path: ['turismo_prueba', 'public'],
});


// ==== Verificación de conexión a la base de datos ====
db.connect()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('❌ Error al conectar a PostgreSQL:', err));


// ==== Rutas: Envío de correos ====
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `<${email}>`,
      to: process.env.EMAIL_USER,
      subject: `${subject} - (De: ${name} <${email}>)`,
      text: `(Mensaje enviado desde la página de turismo de Lobería)\nNombre y Apellido: ${name}\nEmail: ${email}\nAsunto: ${subject} \nMensaje:\n ${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
});

// ==== Rutas: Cards (lugares) ====

/* GET todas las cards */
app.get('/api/cards', async (req, res) => {
  const { city, category } = req.query;

  try {
    let query = 'SELECT * FROM turismo_prueba."card"';
    const params = [];

    if (city) {
      params.push(city);
      query += ` WHERE "card_city" = $${params.length}`;
    }

    if (category) {
      params.push(category);
      query += params.length === 1 ? ` WHERE "card_category" = $${params.length}` : ` AND "card_category" = $${params.length}`;
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener cards:', error);
    res.status(500).json({ error: 'Error al obtener los datos.' });
  }
});

/* GET una card por ID */
app.get('/api/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM turismo_prueba."card" WHERE "id" = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card no encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener la card:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ==== Servidor iniciado ====
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});