const mongoose = require("mongoose");

const OpenAPISchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  create_date: {
    type: String,
    required: true
  },
  location_id: {
    type: String,
    required: true
  },
  location_name: {
    type: String,
    required: true
  },
  md101_sn: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
  send_platform: {
    type: String,
    required: true
  }
}, {
  collection: "openAPI"
});

module.exports = OpenAPI = mongoose.model("openAPI", OpenAPISchema);