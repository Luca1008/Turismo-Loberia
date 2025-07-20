// Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

// Importar clave secreta
const libjwt = require("../services/jwt");
const secret = libjwt.secret;

// MIDDLEWARE: Funcion de autenticacion
const auth = (req, res, next) => {
  // Debug: Mostrar todos los headers
  //console.log("Headers recibidos:", req.headers);
  //console.log("Authorization header:", req.headers.authorization);

  // Comprobar si me llega la cabecera de auth
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "error",
      message: "No hay token de autenticación",
      debug: {
        headers: req.headers,
        authHeader: req.headers.authorization
      }
    });
  }

  // Limpiar el token
  let token = req.headers.authorization.replace(/['"]+/g, "");
  //console.log("Token limpio:", token);

  //Decodificar el token
  try {
    let payload = jwt.decode(token, secret);
    //console.log("Payload decodificado:", payload);

    // Comprobar expiracion del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "Token expirado",
      });
    }
    // Agregar datos de usuario a request
    req.user = payload;

    // Pasar a ejecución de acción
    next();
  } catch (error) {
    //console.error("Error decodificando token:", error);
    return res.status(401).send({
      status: "error",
      message: "Token inválido",
      error: error.message,
      debug: {
        token: token,
        error: error.toString()
      }
    });
  }
};

module.exports = auth;
