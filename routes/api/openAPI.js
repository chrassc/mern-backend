//incomplete

const express = require('express');
const router = express.Router();

//load openAPI model
const openAPI = require("../../models/openAPI");

//@route GET api/openAPI/test
//@description tests openAPI route
//@access Public
router.get("/test", (req, res) => res.send("openAPI route testing!"));

//@route GET api/openAPI
//@description GET all openAPI data
//@access Public
router.get("/", (req, res) => {
  openAPI.find()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({noDataFound: "No Data"}));
});

//@route GET api/openAPI/:date


module.exports = router;