const express = require('express');
let app = express();
let http = require('http').Server(app);


app.use(function(req, res, next) {
  next();
});

app.use(express.json());
app.use(express.urlencoded());

app.use(require('./routes'));

// handle error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: err
  }});
});

http.listen(3000, function(){
  console.log('listening on *: 3000');
});

module.exports = app;
