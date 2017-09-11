var http = require('http');
var url = require('url');

//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});//The first argument of the res.writeHead() method is the status code, 200 means that all is OK, the second argument is an object containing the response headers.
  res.write('Hello World!'); //write a response to the client
  res.write(req.url); // req has a property called "url" which holds the part of the url that comes after the domain name
  var q = url.parse(req.url, true).query; // split query string into readable parts
  var txt = q.year + " " + q.month;
  res.end(txt); //end the response
}).listen(8080); //the server object listens on port 

//req represents the request from the client, as an object (http.IncomingMessage object).