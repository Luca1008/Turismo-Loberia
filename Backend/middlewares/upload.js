// ✅ Almacenamiento en memoria (para guardar imagen como BYTEA en PostgreSQL)
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;