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
  var ID = req.swagger.params.infoSetName.value;
  console.log("receive request to update " + ID);
  var fsname = ID + '.json';
  var body = req.body;
  if(body.name !== ID){
    console.log( "Rejected: body.name: " + body.name + " doesn't match path name " + ID );
    res.status(400)
    return res.json({success: false, message: "body.name: " + body.name + " doesn't match path name " + ID});
  }
  var fspath= helper.composePath(fsname);
  var errMessage;
  fs.writeFile(fspath, JSON.stringify(body), {flag:'w'}, function(err){
    if(err){
      console.log(err);
      res.status(400);
      return res.json({success: false, message: err.message});
    }
    else{
      console.log(ID + " updated");
      return res.json({success: true, message: ID + " updated"});
    }
  });
}

function deleteInfoSet(req, res){
  var infoSetName = req.swagger.params.infoSetName.value + '.json';
  console.log("receive request to delete " + infoSetName);
  var fpath = helper.composePath(infoSetName);
  fs.unlink(fpath, function (err) {
    if (err){
      console.log(err);
      if(err.code === 'ENOENT'){
        res.status(404);
        return res.json({success: false, message: infoSetName + " not exists"});
      }
      else{
        res.status(400);
        return res.json({success: false, message: err.message});
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
        return res.json({success: false, message: infoSetName + ' not exist'});
      }
      else{
        res.status(400);
        return res.json({success: false, message: err.message});
      }
    }
    console.log("view " + infoSetName + " request successfully addressed");
    return res.json(vals);
  });
}
