const express = require("express");
const router = express.Router();

//load disasterInfo model
const DisasterInfo = require("../../models/DisasterInfo");

//@route GET api/disasterInfo
router.get("/", (req, res) => {
  console.log('[' + Date(Date.now().toString()).slice(4,29) + "7 (PDT)] from [" + req.ip.slice(7) + "] - disasterInfo GET requested");
  DisasterInfo.find()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({noDataFound: "No Data"}));
});


module.exports = router;