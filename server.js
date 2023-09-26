require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001 || process.env.PORT;

const mongoose = require("mongoose");
// mongoose connection '
const url = process.env.MONGODB_URL;
const connectionparams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const corsparameters = {
  "Access-Control-Allow-Origin" : "*",

}
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(require("./routes/FileRoutes"));
app.use(bodyParser.json({ limit: "10000kb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));
const connectionDB = async () => {
  try{
    const conn = await mongoose.connect(url, connectionparams);
    console.log("Mongo DB database connected");
  }catch(error){
    console.log("error occured");
    process.exit(1);
  }
}

connectionDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})