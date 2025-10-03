const jwt = require ("jwt-simple");
const moment = require("moment");

/**
 * Clave secreta para firmar tokens JWT
 * @type {string}
 */
const secret = process.env.JWT_SECRET || "SecretClaveProjectLoberia_2025";

/**
 * Genera un token JWT para un usuario
 * @param {Object} user - Objeto usuario
 * @param {number} user.id - ID del usuario
 * @param {string} user.name - Nombre del usuario
 * @param {string} user.surname - Apellido del usuario
 * @param {string} user.email - Email del usuario
 * @param {string} user.role - Rol del usuario
 * @returns {string} Token JWT codificado
 */
const createToken = (user) =>{
    const payload ={
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

//Devolver jwt codificado
return jwt.encode(payload, secret);
}

module.exports= {
    secret,
    createToken
};
