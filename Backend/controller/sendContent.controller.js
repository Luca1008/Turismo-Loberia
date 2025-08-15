const db = require("../models/db");
const nodemailer = require("nodemailer");

exports.sendToSubscribers = async (req, res) => {
  try {
    const { subject, message } = req.body;

    // Obtener emails de los suscriptores
    const result = await db.query(`SELECT email, name FROM turismo_prueba.subscriptions`);
    const subscribers = result.rows;

    // Configuración nodemailer (ejemplo con Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar a cada suscriptor
    for (let sub of subscribers) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sub.email,
        subject: subject,
        html: `<p>Hola ${sub.name},</p><p>${message}</p>`,
      });
    }

    res.status(200).json({ message: "Contenido enviado a todos los suscriptores" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error enviando contenido", error: error.message });
  }
};
