require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // Configuración del transporte de Nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Opciones del correo
    let mailOptions = {
      from: `"Turismo Lobería" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Puedes cambiarlo por otro destinatario si quieres
      subject: 'Nuevo mensaje de contacto',
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      replyTo: email,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
}); 