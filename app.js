// app.js
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const disasterInfo = require("./routes/api/disasterInfo");
const geoJSON = require("./routes/api/geoJSON");
const organizedGeoJSON = require("./routes/api/organizedGeoJSON");

connectDB();

const app = express();
app.get("/", (req, res) => res.send("Hello world!!!!"));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
//app.use(bodyParser.json());

app.use('/api/disasterInfo', disasterInfo);
app.use('/api/geoJSON', geoJSON);
app.use('/api/organizedGeoJSON', organizedGeoJSON);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log('[' + Date(Date.now().toString()).slice(4,29) + `7 (PDT)] Server running on port ${port}`));
