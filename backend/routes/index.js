var express = require('express'),
    router = express.Router(),
    request = require('request'),
    cheerio = require('cheerio'),
    secrets = require('../../secrets.json'),
    crime_data = require('../crime_data');

module.exports = router;

router.get('/map', function(req, res){
   console.log('Map page'); 
   
   var url = 'http://api.spotcrime.com/crimes.json?lat=43.657799&lon=-79.71153&radius=0.2&callback=?&key='+secrets.spotcrime_api_key;
   
   request(url, function(err, result){
      if(!err) {
          crime_data.getCrimes([43.657799, -79.71153], function(data){
              res.end(data);
          });
      } 
      else {
        res.end({"server error": "data not retrieved"});
      }
   });
});

