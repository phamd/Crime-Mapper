var express = require('express'),
    router = express.Router(),
    secrets = require('../../secrets.json'),
    crime_data = require('../crime_data');

module.exports = router;

router.get('/map', function(req, res){
   console.log('Map page'); 
   
   crime_data.getCrimes([43.657799, -79.71153], function(data){
     res.end(data);
   });
});

