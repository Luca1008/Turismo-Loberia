const db = require("../models/db");
const nodemailer = require("nodemailer");
const path = require("path");
const jwt = require("jwt-simple");

const SECRET_KEY = process.env.JWT_SECRET || "SecretClaveProjectLoberia_2025";

// Enviar contenido
exports.sendToSubscribers = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const file = req.file;

    const result = await db.query(`
      SELECT id, email, name 
      FROM turismo_prueba.subscriptions 
      WHERE accept = true
    `);
    const subscribers = result.rows;

    if (!subscribers.length) {
      return res.status(400).json({ message: "No hay suscriptores activos" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const sub of subscribers) {
      // Expiración manual (1 año desde ahora)
      const payload = {
        id: sub.id,
        exp: Date.now() + 365 * 24 * 60 * 60 * 1000
      };
      const token = jwt.encode(payload, SECRET_KEY);

      const unsubscribeLink = `${process.env.BASE_URL}/unsubscribe/${token}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: sub.email,
        subject,
        html: `
          <p>Hola ${sub.name || "suscriptor"},</p>
          <p>${message}</p>
          <hr/>
          <p style="font-size: 12px; color: gray;">
            Si no querés recibir más correos, 
            <a href="${unsubscribeLink}" target="_blank">desuscribite aquí</a>.
          </p>
        `,
      };

      if (file) {
        mailOptions.attachments = [{
          filename: file.originalname,
          path: path.join(__dirname, "../public/uploads", file.filename),
        }];
      }

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: "Contenido enviado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error enviando contenido", error: error.message });
  }
};

// Alta suscriptor / Re-suscripción
exports.addSubscriber = async (req, res) => {
  const { name, email, accept } = req.body;

  try {
    // Buscamos si existe el email (case-insensitive)
    const check = await db.query(
      `SELECT id, accept FROM turismo_prueba.subscriptions WHERE LOWER(email) = LOWER($1)`,
      [email]
    );

    if (check.rowCount > 0) {
      const existing = check.rows[0];
      if (existing.accept) {
        // Ya estaba suscripto
        return res.status(400).json({ message: "Este email ya está suscrito." });
      } else {
        // Estaba desuscripto → actualizamos para volver a suscribir
        await db.query(
          `UPDATE turismo_prueba.subscriptions 
           SET accept = true, name = $1 
           WHERE id = $2`,
          [name, existing.id]
        );
        return res.status(200).json({ message: "Te has vuelto a suscribir correctamente." });
      }
    }

    // No existe → insertamos nuevo
    await db.query(
      `INSERT INTO turismo_prueba.subscriptions (name, email, accept) VALUES ($1, $2, $3)`,
      [name, email, accept ?? true]
    );

    res.status(201).json({ message: "Suscripción exitosa" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en la suscripción" });
  }
};


// Desuscripción
exports.unsubscribe = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.decode(token, SECRET_KEY);

    // Verificar expiración manualmente
    if (decoded.exp && Date.now() > decoded.exp) {
      return res.status(400).send("Enlace de desuscripción vencido.");
    }

    const subscriberId = decoded.id;

    const result = await db.query(
      `UPDATE turismo_prueba.subscriptions 
       SET accept = false 
       WHERE id = $1 RETURNING *`,
      [subscriberId]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Suscriptor no encontrado.");
    }

    res.send(`
      Te has desuscrito correctamente
      Siempre podés volver a suscribirte en nuestro sitio.
    `);
  } catch (error) {
    console.error(error);
    res.status(400).send("Enlace inválido.");
  }
};
