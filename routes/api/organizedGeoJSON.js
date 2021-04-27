const express = require("express");
const router = express.Router();

const GeoJSON = require("../../models/GeoJSON");
const DisasterInfo = require("../../models/DisasterInfo");


const organize = require("../../scripts/organize");


//import {PythonShell} from "python-shell";
//const 
//npm install python-shell     <-------- RUN THIS PRIOR TO RUNNING WITH SAM'S CODE

//takes the GET request with query info (uriencoded), inserts to jsonObj. respective dbs are inserted to jsonObj for processing
router.get("/", async (req, res) => {
  let startTime = new Date;
  console.log('[' + Date(Date.now().toString()).slice(4, 29) + "7 (PDT)] from [" + req.ip.slice(7) + "] - organizedGeoJSON GET requested");
  console.log("Client query: " + req.query.query);
  let jsonObj = {
    query: JSON.parse(req.query.query)
  };

  GeoJSON.find()
    .then(data => {
      jsonObj.geoJSON = data[0]; // index 0 to remove layer of array
      DisasterInfo.find()
        .then(data => {
          jsonObj.disasterInfo = data;
          /* 
          organize(jsonObj); //testing chris's script
         */
          // //sam's code
          // PythonShell.run("sam_script.py", params, function (err, result){
          //   if (err) throw err;
          //   console.log(result);
          //   res.json(result)
          // })
          // //sam's code

          //remove once sam's code added
          res.json(organize(jsonObj));
          console.log("Elapsed Time: " + (new Date - startTime) + " ms"); 
        })
    });
});

module.exports = router;