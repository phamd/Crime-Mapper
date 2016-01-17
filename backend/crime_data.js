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
    },
    
    getStats: function(location, cb) {
        /*var numbeoConnectionString = 'https://api.import.io/store/data/' + 
			credentials.importio.token + '/_query?input/webpage/url=http%3A%2F%2Fwww.numbeo.com%2Fcost-of-living%2Fcity_result.jsp%3Fcountry%3D' +
			country + '%26city%3D' + 
			city + '%26displayCurrency=USD&_user=' + 
			credentials.importio.user + '&_apikey=' +
			credentials.importio.apikey;*/
        var url = 'https://api.import.io/store/connector/'
                    + secrets.importio.token
                    + "/_query?input=webpage/url:http%3A%2F%2Fwww.numbeo.com%2Fcrime%2Fcity_result.jsp%3Fcountry%3D"
                    + location.country
                    + "%26city%3D"
                    + location.city
                    + "&&_apikey="
                    + secrets.importio.apikey;
         
         request(url, function(err, result){
            if(!err) {
                cb(result);
            } 
            else {
                cb({"server error": "data not retrieved"});
            }
         });
    }
}