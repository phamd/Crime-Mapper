var express = require('express'),
    router = express.Router(),
    url = require('url'),
    secrets = require('../../secrets.json'),
    crime_data = require('../crime_data'),
    map = require('../maps.js');

module.exports = router;

//example query hamilton: http://localhost:3000/map?lat1=43.646953&long1=-79.65844&lat2=43.2523536&long2=-79.9355499
//example query detroit: http://localhost:3000/map?lat1=42.3650141&long1=-83.0684108&lat2=42.3887468&long2=-83.0432116
router.get('/map', function(req, res){
    var query = url.parse(req.url, true).query;
    var lat1 = query.lat1;
    var long1 = query.long1;
    var lat2 = query.lat2;
    var long2 = query.long2;
    var heatmap = query.heatmap;
    var crimeData;
   
    crime_data.getCrimes([lat1, long1], [lat2, long2], function(data){
       crimeData = data;
       console.log(crimeData)
       
    });
    //TODO: Add mapping function here
    map.getMap(lat1,long1,lat2,long2,crimeData,heatmap,function(data){
        //map = data;
        console.log('ok');
        res.end(data);
    });
});

