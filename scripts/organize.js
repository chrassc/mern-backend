//organize.js
//takes in json obj with query + disasterInfo + geoJSON objects
"use strict";

//json of array of MOPAS determined location names and id's (see locationConvert())
const locationConversion = require("./data/locationConversion.json");

//json of array of keywords paired with search params (see queryKeys())
const queryKeywords = require("./data/queryKeywords.json");

//developer use.. ignore
var unsorted = [];

//returns an array with all keyword strings to find from query
function queryKeys(queryDisasterType) {
  let keywords = [];
  queryDisasterType.forEach(type => {
    queryKeywords[type].forEach(keyword => {
      keywords.push(keyword);
    });
  });
  return keywords
}

//returns disasterInfo with only messages within query dates
function withinDateRange(query, disasterData) {
  let dataWithinDates = [];
  let startDate = new Date(query.date_start);
  let endDate = new Date(query.date_end + " 23:59:59 UTC");
  disasterData.forEach(i => {
    let date = new Date(i.create_date + " UTC");
    if (startDate < date && date < endDate) {
      dataWithinDates.push(i);
    };
  });
  return dataWithinDates;
}

//returns disasterInfo with only messages that contain keywords from query
function withinQuery(keywords, disasterData) {
  let dataMatchingQuery = [];
  disasterData.forEach(message => {
    if (keywords.some(keyword => message.msg.includes(keyword))) { //if message includes any keyword from keywords arr
      dataMatchingQuery.push(message);
    }
    else if (!keywords.some(keyword => message.msg.includes(keyword))){
      unsorted.push(message);
    }
  });
  return dataMatchingQuery;
}

//duplicates and splits messages with multiple locations
function commaDuplicate(disasterData) {
  let withoutCommas = [];
  disasterData.forEach(i => {
    if (i.location_name.includes(",")) { //has to duplicate messages with commas in location
      let tempCopy = JSON.parse(JSON.stringify(i)); //deep clone to prevent changing mutating original key-value
      let splitted = tempCopy.location_name.split(",");
      let splittedId = tempCopy.location_id.split(",");
      for (let index = 0; index < splitted.length; index++) {
        let tempData = JSON.parse(JSON.stringify(i)); //see above
        tempData.location_name = splitted[index];
        tempData.location_id = splittedId[index];
        withoutCommas.push(tempData);
      }
    } else {
      withoutCommas.push(i); //if no commas then simply push message
    }
  });
  return withoutCommas;
}

//returns a standardized district name to be used in couting messages per district with geoJSON data
//also segments any message with location_name that includes "전체" (entire division with multiple districts)
function locationConvert(disasterData) {
  let locationConverted = [];
  disasterData.forEach(message => {
    locationConversion.forEach(location => {
      if (message.location_id == location.LOCATION_ID && location["법정동(시군구)"]) {
        message.standard_location = location["법정동(시군구)"];
        locationConverted.push(message);
      } else if (message.location_name.includes(location["법정동(시도)"]) && message.location_name.includes(" 전체") && location["법정동(시군구)"]) {
        let tempCopy = JSON.parse(JSON.stringify(message));
        tempCopy.standard_location = location["법정동(시군구)"];
        locationConverted.push(tempCopy);
      }
    })
  })
  return locationConverted;
}

//returns geoJSON with features.properties.count added for each district
//shows total counts of cell broadcasts within query params
//BELOW EXCEPTIONAL MODIFICATIONS NEEDED
//인천광역시 중구, 울산특별시 중구, 서울특별시 중구
//포항시북구/남구 포항시 북구/남구
function countMessages(geoJSON, disasterData) {
  let updatedGeoJSON = geoJSON;
  let totalCount = 0;
  geoJSON.features.map(location => {
    location.properties.count = 0;
    disasterData.forEach(message => {
      if (location.properties.name == message.standard_location) {
        location.properties.count++;
        totalCount++;
      }
    })
  })
  updatedGeoJSON.totalCount = totalCount;
  return updatedGeoJSON;
}

//main function exported
function organize(jsonObj) {
  let organized = {};
  let keywords = queryKeys(jsonObj.query.disaster_type);
  console.log("Total Database Entries: " + Object.keys(jsonObj.disasterInfo).length)
  let listWithinDates = withinDateRange(jsonObj.query, jsonObj.disasterInfo);
  console.log("Within Dates: " + Object.keys(listWithinDates).length);
  let listWithKeywords = withinQuery(keywords, listWithinDates);
  console.log("With Keywords: " + Object.keys(listWithKeywords).length);
  let listWithoutCommas = commaDuplicate(listWithKeywords);
  console.log("After Comma Duplication: " + Object.keys(listWithoutCommas).length);
  let listWithStdLocation = locationConvert(listWithoutCommas);
  console.log(`After "전체" Segmentation: ` + Object.keys(listWithStdLocation).length);


  organized.disasterInfo = listWithStdLocation;
  organized.geoJSON = countMessages(jsonObj.geoJSON, listWithStdLocation);
  organized.geoJSON._id = Date.now().toString(); //to be used with key in React to update render()
  console.log(unsorted); //use to determine what hasn't been sorted
  return organized;
}

module.exports = organize;
