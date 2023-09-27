const multer = require("multer");
// Configuring Multer for handling multiple file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the destination folder here
      cb(null, "/uploads/"); // Make sure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
      // Specify the file name logic here
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage: storage });
module.exports = upload;