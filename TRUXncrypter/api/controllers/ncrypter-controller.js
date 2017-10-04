'use strict';
var config = require('../../config/config').getconfig();
var fs = require('fs');
var path = require('path');
var async = require('async');
var helper = require('../helpers/helper');

module.exports = {
  createInfoSet : createInfoSet,
  getAllInfoSet : getAllInfoSet
};

function createInfoSet(req, res){
  var ID = req.body.name;
  console.log("receive request to create");
  var fsname = ID + '.json';
  var body = req.body;
  var fspath= path.join(config.storage, fsname);
  var errMessage;
  fs.writeFile(fspath, JSON.stringify(body), {flag:'wx'}, function(err){
    if (err){
      if (err.code === 'EEXIST') {
        errMessage = 'infoset ' + fspath + " already exists";
        console.log('infoset ' + fspath + " already exists");
      } else {
        errMessage = err;
        console.log(err);
      }
      res.status(400);
      return res.json({success: false, message: errMessage});
    }
    console.log(fspath + " successfully created");
    return res.json({success: true, message: fspath + " saved"});
  });
}

function getAllInfoSet(req, res){
  console.log("receive request to view all info set");
  var fpath = config.storage;
  var result;
  fs.readdir(fpath, function(err, files) {
    if (err) {
      console.log(err);
      return res.json({success: false, message: err.message});
    }
    var regExp = new RegExp('\.*.json$');
    files = files.filter(function(file) {
      return regExp.test(file);
    });
    console.log("All files:");
    console.log(files);
    async.map(files, helper.readInfoSet, function(err, vals){
      if(err) {
        console.log(err);
        res.status(500);
        return res.json({success: false, message: err.message})
      }
      else{
        console.log("view all request successfully addressed");
        return res.json(vals)
      }
    });
  });
}
