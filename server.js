var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ncrypterRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Ncrypter RESTful API server started on: ' + port);