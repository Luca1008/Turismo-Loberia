const db = require("../models/db");
const nodemailer = require("nodemailer");
const path = require("path");

exports.sendToSubscribers = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const file = req.file; // <-- archivo subido

    const result = await db.query(`SELECT email, name FROM turismo_prueba.subscriptions`);
    const subscribers = result.rows;

    if (subscribers.length === 0) {
      return res.status(400).json({ message: "No hay suscriptores registrados" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (let sub of subscribers) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: sub.email,
        subject: subject,
        html: `<p>Hola ${sub.name},</p><p>${message}</p>`,
      };

      if (file) {
        mailOptions.attachments = [
          {
            filename: file.originalname,
            path: path.join(__dirname, "../public/uploads", file.filename),
          },
        ];
      }

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: "Contenido enviado a todos los suscriptores" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error enviando contenido", error: error.message });
  }
};
