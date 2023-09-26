require('dotenv').config();
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.API_SCERET,
  });

module.exports = cloudinary;