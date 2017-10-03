'use strict';
var fs = require('fs');
var path = require('path');
var helper = require('../helpers/helper');

module.exports = {
  updateInfoSet : updateInfoSet,
  deleteInfoSet : deleteInfoSet,
  getInfoSet : getInfoSet
};

function updateInfoSet(req, res){
  console.log("not implemented yet")
}

function deleteInfoSet(req, res){
  console.log("not implemented yet")
}

function getInfoSet(req, res){
  var infoSetName = req.swagger.params.infoSetName.value + '.json';
  helper.readInfoSet(infoSetName,function(err, vals){
    if(err) {
      if(err.code === 'ENOENT'){
        res.status(404);
        return res.json({message: infoSetName + ' not exist'});
      }
      else{
        res.status(400);
        return res.json({message: err});
      }
    }
    return res.json(vals);
  });
}
