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
  var infoSetName = req.swagger.params.infoSetName.value + '.json';
  console.log("receive request to delete " + infoSetName);
  var fpath = helper.composePath(infoSetName);
  fs.unlink(fpath, function (err) {
    if (err){
      console.log(err);
      if(err.code === 'ENOENT'){
        res.status(400);
        return res.json({message: infoSetName + " not exists"});
      }
      else{
        return res.json({message:err});
      }
    }
    console.log(fpath + " successfully deleted")
    return res.json({success: true , message: infoSetName + ' deleted'});
  });
  
}

function getInfoSet(req, res){
  var infoSetName = req.swagger.params.infoSetName.value + '.json';
  console.log("receive request to view infoSet: " + infoSetName);
  helper.readInfoSet(infoSetName,function(err, vals){
    if(err) {
      console.log(err);
      if(err.code === 'ENOENT'){
        res.status(404);
        return res.json({message: infoSetName + ' not exist'});
      }
      else{
        res.status(400);
        return res.json({message: err});
      }
    }
    console.log("view " + infoSetName + " request successfully addressed");
    return res.json(vals);
  });
}
