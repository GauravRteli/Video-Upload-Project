require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;


require("./Database/db");

app.use(cors());
app.use(express.json());
app.use(require("./routes/FileRoutes"))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
