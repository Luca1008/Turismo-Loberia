const multer = require('multer');

const storage = multer.memoryStorage(); // o usá diskStorage si preferís
const upload = multer({ storage });

module.exports = upload;
