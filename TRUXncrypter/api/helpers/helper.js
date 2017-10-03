'use strict';
var config = require('../../config/config').getconfig();
var path = require("path");
var fs = require("fs");

exports.composePath = function composePath(file){
  var home = config.storage;
  return path.join(home, file);
}

exports.readInfoSet = function readInfoSet(file, callback){
  var home = config.storage;
  var fpath = path.join(home, file);
  fs.readFile(fpath, function(err, data) {
    //graceful fail in the case that a directory is named *.json
    //this way, we still return all datasource json files
    if (err && err.code === 'EISDIR') {
      return callback(err);
    }
    if (err) {
      return callback(err);
    }
    try {
      var retVal = JSON.parse(data);
      //replaces the last .json
      return callback(null, retVal);
    } catch (exce) {
      return callback(new Error('Cannot parse JSON for ' + path.join(options.proj, datasourcePath, dsfName)));
    }
  });
}