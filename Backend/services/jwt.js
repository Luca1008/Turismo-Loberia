// Importar dependencias
const jwt = require ("jwt-simple");
const moment = require("moment");

// Clave secreta
const secret = "SecretClaveProjectLoberia_2025";

//Crear una funcion para generar tokens
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