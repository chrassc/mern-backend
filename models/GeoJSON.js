const mongoose = require("mongoose");

const GeoJSONSchema = new mongoose.Schema({
  features: {
    type: Array,
    required: true
  },
  _id: {
    type: String
  },
  totalCount: {
    type: Number
  }
}, {
  collection: "geoJSON"
});

module.exports = GeoJSON = mongoose.model("geoJSON", GeoJSONSchema);