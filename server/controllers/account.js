const fs = require('fs');
const config = require('./config');
const path = require('path');
const db = require('../dao').model("accounts");
 

module.exports = {
    list: list,
    get: get,
    edit: edit,
    create: create,
};

function list(req, res, next){
    fs.readdir(config.dataDir, (err, files) => {
        if (err){
            return next(err);
        }
        let uidFiles = files.filter(function(file){
            return path.extname(file) === config.accountFileExt;
        });
        res.status(200);
        return res.json({
            success: true
        });
    });    
}

function get(req, res, next){
    fs.readdir(config.dataDir, (err, files) => {
        if (err){
            return next(err);
        }
        let uidFiles = files.filter(function(file){
            return path.extname(file) === config.accountFileExt;
        });
        res.status(200);
        return res.json({
            success: true
        });
    });    
}

function edit(req, res, next){
    fs.readdir(config.dataDir, (err, files) => {
        if (err){
            return next(err);
        }
        let uidFiles = files.filter(function(file){
            return path.extname(file) === config.accountFileExt;
        });
        res.status(200);
        return res.json({
            success: true
        });
    });    
}

function create(req, res, next){
    fs.readdir(config.dataDir, (err, files) => {
        if (err){
            return next(err);
        }
        let uidFiles = files.filter(function(file){
            return path.extname(file) === config.accountFileExt;
        });
        res.status(200);
        return res.json({
            success: true
        });
    });    
}
