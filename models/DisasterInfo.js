const mongoose = require("mongoose");

const DisasterInfoSchema = new mongoose.Schema({
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
  },
  standard_location: {
    type: String
  }
}, {
  collection: "disasterInfo"
});

module.exports = DisasterInfo = mongoose.model("disasterInfo", DisasterInfoSchema);