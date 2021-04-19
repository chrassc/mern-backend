// app.js
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const openAPI = require("./routes/api/openAPI");
const cors = require("cors");

connectDB();

const app = express();
app.get("/", (req, res) => res.send("Hello world!!!!"));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
//app.use(bodyParser.json());

app.use('/api/openAPI', openAPI);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));