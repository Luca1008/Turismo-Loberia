const nodemailer = require('nodemailer');
const axios = require('axios');

exports.sendEmail = async (req, res) => {
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
      text: `(Mensaje enviado desde la página de turismo de Lobería)\nNombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje:\n${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
};

exports.getForecast = async (req, res) => {
  let { city, lat, lon } = req.query;
  if (city && city.trim().toLowerCase() === 'arenas verdes') city = 'Forest';

  let url;
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},AR&units=metric&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

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
          humedadSum: item.main.humidity,
          presionSum: item.main.pressure,
          vientoSum: item.wind ? item.wind.speed : 0,
          count: 1,
          icon12: null,
          desc12: null,
          dt12: null,
        };
      } else {
        dias[dia].tempMax = Math.max(dias[dia].tempMax, item.main.temp_max);
        dias[dia].tempMin = Math.min(dias[dia].tempMin, item.main.temp_min);
        dias[dia].humedadSum += item.main.humidity;
        dias[dia].presionSum += item.main.pressure;
        dias[dia].vientoSum += item.wind ? item.wind.speed : 0;
        dias[dia].count += 1;
      }

      if (fecha.getHours() === 12) {
        dias[dia].icon12 = item.weather[0].icon;
        dias[dia].desc12 = item.weather[0].description;
        dias[dia].dt12 = item.dt;
      }
    }

    const diasUnicos = Object.values(dias)
      .map(d => ({
        dt: d.dt12 || d.dt,
        tempMax: d.tempMax,
        tempMin: d.tempMin,
        icon: d.icon12 || d.icon,
        descripcion: d.desc12 || d.descripcion,
        humedad: Math.round(d.humedadSum / d.count),
        presion: Math.round(d.presionSum / d.count),
        viento: Math.round((d.vientoSum / d.count) * 10) / 10, // 1 decimal
      }))
      .slice(0, 5);

    res.json(diasUnicos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pronóstico' });
  }
};

exports.getWeather = async (req, res) => {
  const { city, lat, lon } = req.query;
  let url;
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city},AR&units=metric&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    const response = await axios.get(url);
    const data = response.data;
    // Procesar viento
    let viento = "-";
    if (data.wind) {
      const dir = data.wind.deg !== undefined ? gradosADireccion(data.wind.deg) : "";
      viento = `${Math.round(data.wind.speed)} km/h${dir ? ' ' + dir : ''}`;
    }
    // Función auxiliar para dirección cardinal
    function gradosADireccion(grados) {
      const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
      return dirs[Math.round(grados / 22.5) % 16];
    }
    res.json({
      ciudad: data.name,
      temp: data.main.temp,
      descripcion: data.weather[0].description,
      icon: data.weather[0].icon,
      dt: data.dt,
      humedad: data.main.humidity,
      presion: data.main.pressure,
      viento
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el clima actual' });
  }
};