'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
  createInfoSet : createInfoSet,
  getAllInfoSet : getAllInfoSet
};

function createInfoSet(req, res){
  var ID = req.body.name;
  console.log(ID);
  var fsname = ID + '.json';
  var body = req.body;
  var fspath='mock_data/'+fsname;
  var errMessage;
  fs.writeFile(fspath, JSON.stringify(body), {flag:'wx'}, function(err){
    if (err){
      if (err.code === 'EEXIST') {
        errMessage = 'Credential ' + fspath + " already exists";
      } else {
        errMessage = err;
      }
      res.status(400);
      return res.json({message: errMessage});
    }
    return res.json({success: true, message: fspath + " saved"});
  });
}

function getAllInfoSet(req, res){
  console.log("not implemented yet");
}