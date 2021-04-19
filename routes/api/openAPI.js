//incomplete

const express = require("express");
const router = express.Router();

//load openAPI model
const OpenAPI = require("../../models/OpenAPI");

//@route GET api/openAPI
//@description GET all openAPI data
//@access Public
router.get("/", (req, res) => {
  console.log("GET requested");
  OpenAPI.find()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({noDataFound: "No Data"}));
});

//@route create api/openAPI
//@description create new openAPI data
//@access public
router.post("/", (req, res) => {
  console.log("POST requested");
  console.log(req.body);
  OpenAPI.create(req.body)
    .then(data => res.json({ msg: "data added successfully" }))
    .catch(err => res.status(400).json({error: "unable to add data"}));
});


module.exports = router;