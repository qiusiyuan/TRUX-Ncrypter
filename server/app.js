const express = require('express');
let app = express();
let http = require('http').Server(app);
const path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(express.urlencoded());
app.use('/', express.static(path.join(__dirname, '../build')))
app.use(require('./routes'));
app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, "../build/index.html"))
});

// handle error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: err
  }});
});

http.listen(3001, function(){
  console.log('listening on *: 3001');
});

module.exports = app;
