'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
  createInfoSet : createInfoSet,
  getAllInfoSet : getAllInfoSet
};

function createInfoSet(req, res){
  var fsname = req.swagger.params.name.value + '.json';
  var body = req.body;
  var fspath='../../mock_data/'+fsname;
  var errMessage;
  fs.writeFile(fspath, body, {falg:'wx'}, function(err){
    if (err){
      if (err.code === 'EEXIST') {
        errMessage = 'Credential ' + req.swagger.params.name.value + "already exists";
      } else {
        errMessage = err;
      }
      res.status(400);
      return res.json({message: errMessage});
    }
    return res.json({success: true, message:  + req.swagger.params.name.value + "saved"});
  });
}