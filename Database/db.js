require('dotenv').config();
require('dotenv').config()
const mongoose = require("mongoose");
// mongoose connection '
const url = process.env.MONGODB_URL;
const connectionparams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(url,connectionparams).then(() => {
    console.log("Database created!");
}).catch((err) => {
    console.log("Not connected to data");
});