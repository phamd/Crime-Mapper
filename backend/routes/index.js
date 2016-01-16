var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/map', function(req, res){
   console.log('Map page'); 
});