var express = require('express'),
    router = express.Router(),
    url = require('url'),
    secrets = require('../../secrets.json'),
    crime_data = require('../crime_data');

module.exports = router;

router.get('/map', function(req, res){
    var query = url.parse(req.url, true).query;
    var lat = query.lat;
    var long = query.long;
    console.log("Requesting " + long+", " + lat); 
   
    crime_data.getCrimes([lat, long], function(data){
      res.end(data);
    });
});

