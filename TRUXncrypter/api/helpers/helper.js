'use strict';
var config = require('../../config/config').getconfig();
var path = require("path");


exports.composePath = function composePath(file, callback){
  var home = config.storage;
  return callback(null, path.join(home, file));
}