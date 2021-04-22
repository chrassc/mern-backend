const mongoose = require("mongoose");

const GeoJSONSchema = new mongoose.Schema({
  features: {
    type: Array,
    required: true
  }
}, {
  collection: "geoJSON"
});

module.exports = GeoJSON = mongoose.model("geoJSON", GeoJSONSchema);