var http = require('http'),
    routes = require('./routes/index'),
    bodyParser = require('body-parser'),
    path = require('path'),
    express = require('express');


var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/',function(req,res){
    console.log("main page");
});
app.use('/', routes);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Listening on ' + app.get('port'));
});
