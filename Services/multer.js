const multer = require("multer");

// Setup multer for file uploads
const storage = multer.memoryStorage();
const fileUpload = multer({ storage });

module.exports = fileUpload;
