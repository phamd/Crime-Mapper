var express = require('express'),
    router = express.Router(),
    url = require('url'),
    secrets = require('../../secrets.json'),
    crime_data = require('../crime_data');

module.exports = router;

//example query: http://localhost:3000/map?lat=43.646953&long=-79.65844&range=0.2
router.get('/map', function(req, res){
    var query = url.parse(req.url, true).query;
    var lat = query.lat;
    var long = query.long;
    var range = query.range;
    console.log("Requesting " + long+", " + lat+", " + range); 
   
    crime_data.getCrimes([lat, long], range, function(data){
      res.end(data);
    });
});

