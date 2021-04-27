const express = require("express");
const router = express.Router();

//load geoJSON model
const GeoJSON = require("../../models/GeoJSON");

//@route GET api/geoJSON
//@description GET all geoJSON data
//@access Public

router.get("/", (req, res) => {
  console.log('[' + Date(Date.now().toString()).slice(4,29) + "7 (PDT)] from [" + req.ip.slice(7) + "] - geoJSON GET requested");
  GeoJSON.find()
    .then(data => res.json(data[0])) //depending on format of geoJSON may have to use 0 index of arr
    .catch(err => res.status(404).json({noDataFound: "No Data"}));
});

//@route create api/geoJSON
//@description create new geoJSON data
//@access public
// router.post("/", (req, res) => {
//   console.log("geoJSON POST requested");
//   console.log(JSON.stringify(req.body));
//   GeoJSON.create(req.body)
//     .then(data => res.json({ msg: "data added successfully" }))
//     .catch(err => res.status(400).json({error: "unable to add data"}));
// });


module.exports = router;