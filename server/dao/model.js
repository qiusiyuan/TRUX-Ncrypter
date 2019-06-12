const dbconf = require('./database.json');
const utils = require('./utils');
const path = require('path');
const dbError = require('./dbError');
const fs = require('fs');

function Model(modelName){
    console.log(modelName);
    this.model = modelName;
    this.modelPath = path.join(__dirname, dbconf.dbPath ,this.model);
    this.checkModel();
    this.load();
}

Model.prototype.checkModel = function(){
    try {
        let files = fs.readdirSync(path.join(__dirname, dbconf.dbPath));
        if (! files.includes(this.model)){
            fs.mkdirSync(this.modelPath);
        }
        return;
    } catch (error) {
        console.error(error);
        return this;
    }
}

Model.prototype.load = function(){
    let that = this;
    try {
        let files = fs.readdirSync(this.modelPath);
        let uidFiles = files.filter(function(file){
            return path.extname(file) === dbconf.uidFileExt;
        });
        let data = []
        uidFiles.forEach(function(fileName){
            datum = utils.load(that.modelPath, fileName)
            datum.uid = fileName.replace(dbconf.uidFileExt, '');
            data.push(datum);  
        });
        this.data = data;
        return this
    } catch (error) {
        console.error(error);
        return this;
    }
}

Model.prototype.getAll = function(){
    return this.data;
}

Model.prototype.getOne = function(uid){
    for (let datum of this.data){
        if(datum.uid == uid) {
            return datum;
        }
    };
    return new dbError(404,  "Db getOne: uid not found: " + uid);
}

Model.prototype.updateOne = function(uid,  fieldName, value){
    let that = this;
    for (let datum of this.data){
        if(datum.uid == uid){
            datum[fieldName] = value
            let err = utils.write(that.modelPath, uid+dbconf.uidFileExt, datum)
            if(err) return new dbError(err.code||500, "Db update: " + err.message);
            that.load();
            return;
        };
    }
    return new dbError(404, "Db update: uid not found: " + uid);
}
module.exports = Model;