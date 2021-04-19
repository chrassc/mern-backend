const mongoose = require("mongoose");

const openAPISchema = new mongoose.Schema({
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
});

module.exports = openAPI = mongoose.model("openAPI", openAPISchema);