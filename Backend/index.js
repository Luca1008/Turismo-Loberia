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
});

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
    let query = 'SELECT * FROM Card';
    const params = [];

    if (city) {
      params.push(city);
      query += ` WHERE "CardCity" = $${params.length}`;
    }

    if (category) {
      params.push(category);
      query += params.length === 1 ? ` WHERE "CardCategory" = $${params.length}` : ` AND "CardCategory" = $${params.length}`;
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
    const result = await db.query('SELECT * FROM Card WHERE "ID" = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card no encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener la card:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ==== Wheather ====
app.get("/api/forecast", async (req, res) => {
  const { city } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},AR&units=metric&lang=es&appid=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const hoy = new Date().getDate();
    const dias = {};

    for (const item of response.data.list) {
      const fecha = new Date(item.dt_txt);
      const dia = fecha.getDate();
      if (dia === hoy) continue;

      if (!dias[dia]) {
        dias[dia] = {
          dt: item.dt,
          tempMax: item.main.temp_max,
          tempMin: item.main.temp_min,
          icon: item.weather[0].icon,
          descripcion: item.weather[0].description,
          icon12: null,
          desc12: null,
          dt12: null,
        };
      } else {
        dias[dia].tempMax = Math.max(dias[dia].tempMax, item.main.temp_max);
        dias[dia].tempMin = Math.min(dias[dia].tempMin, item.main.temp_min);
      }

      // Guardar icono y descripción de las 12:00 si existe
      if (fecha.getHours() === 12) {
        dias[dia].icon12 = item.weather[0].icon;
        dias[dia].desc12 = item.weather[0].description;
        dias[dia].dt12 = item.dt;
      }
    }

    // Convertir a array y tomar solo los primeros 5 días
    const diasUnicos = Object.values(dias)
      .map(d => ({
        dt: d.dt12 || d.dt,
        tempMax: d.tempMax,
        tempMin: d.tempMin,
        icon: d.icon12 || d.icon,
        descripcion: d.desc12 || d.descripcion,
      }))
      .slice(0, 5);

    res.json(diasUnicos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pronóstico" });
  }
});

app.get("/api/weather", async (req, res) => {
  const { city, lat, lon } = req.query;
  let url;
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city},AR&units=metric&lang=es&appid=${API_KEY}`;
  } else {
    return res.status(400).json({ error: "Faltan parámetros" });
  }
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json({
      ciudad: data.name,
      temp: data.main.temp,
      descripcion: data.weather[0].description,
      icon: data.weather[0].icon,
      dt: data.dt,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el clima actual" });
  }
});


// ==== Servidor iniciado ====
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});