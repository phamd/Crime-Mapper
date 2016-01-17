var express = require('express'),
    router = express.Router(),
    request = require('request'),
    secrets = require('../secrets.json');

module.exports = {
    getCrimes: function(originCoords, destinationCoords, cb) {
        var url = 'http://api.spotcrime.com/crimes.json?lat='
                        +(parseFloat(originCoords[0])+parseFloat(destinationCoords[0]))/2
                        +'&lon='
                        +(parseFloat(originCoords[1])+parseFloat(destinationCoords[1]))/2
                        +'&radius='
                        + '0.2&callback=?&key='
                        +secrets.spotcrime_api_key;
        console.log((parseFloat(originCoords[0])+parseFloat(destinationCoords[0]))/2);
        console.log((parseFloat(originCoords[1])+parseFloat(destinationCoords[1]))/2);
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