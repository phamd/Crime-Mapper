var express = require('express'),
    router = express.Router(),
    request = require('request'),
    secrets = require('../secrets.json');

module.exports = {
    getCrimes: function(coords, range, cb) {
        var url = 'http://api.spotcrime.com/crimes.json?lat='
                        +coords[0]
                        +'&lon='
                        +coords[1]
                        +'&radius='
                        + range
                        + '0.2&callback=?&key='
                        +secrets.spotcrime_api_key;
        
        request(url, function(err, result){
            if(!err) {
                cb(result.body.substring(2, result.body.length-3));
            } 
            else {
                cb({"server error": "data not retrieved"});
            }
        });
    }
}