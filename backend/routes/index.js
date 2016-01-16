var express = require('express'),
    router = express.Router(),
    request = require('request'),
    cheerio = require('cheerio'),
    secrets = require('../../secrets.json');

module.exports = router;

router.get('/map', function(req, res){
   console.log('Map page'); 
   
   var url = 'http://api.spotcrime.com/crimes.json?lat=43.657799&lon=-79.71153&radius=0.2&callback=?&key='+secrets.spotcrime_api_key;
   
   request(url, function(err, result){
      if(!err) {
          res.end(result.body.substring(2, result.body.length-3));
      } 
      else {
        res.end({"server error": "data not retrieved"});
      }
   });
   
});

