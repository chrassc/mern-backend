// app.js
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const openAPI = require("./routes/api/openAPI");
const geoJSON = require("./routes/api/geoJSON");

connectDB();

const app = express();
app.get("/", (req, res) => res.send("Hello world!!!!"));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
//app.use(bodyParser.json());

app.use('/api/openAPI', openAPI);
app.use('/api/geoJSON', geoJSON);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log('[' + Date(Date.now().toString()).slice(4,29) + `7 (PDT)] Server running on port ${port}`));
