var express = require('express'),
    router = express.Router(),
    url = require('url'),
    secrets = require('../../secrets.json'),
    crime_data = require('../crime_data');

module.exports = router;

//example query: http://localhost:3000/map?lat1=43.646953&long1=-79.65844&lat2=43.2523536&long2=-79.9355499
router.get('/map', function(req, res){
    var query = url.parse(req.url, true).query;
    var lat1 = query.lat1;
    var long1 = query.long1;
    var lat2 = query.lat2;
    var long2 = query.long2;
   
    crime_data.getCrimes([lat1, long1], [lat2, long2], function(data){
      res.end(data);
    });
});

