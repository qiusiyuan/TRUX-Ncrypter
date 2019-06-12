const dbconf = require('./database.json');
const utils = require('./utils');
const path = require('path');
const dbError = require('./dbError');
const fs = require('fs');

function Model(modelName){
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
            console.log(`[${this.model}]Db checkModel: new model [${this.model}] created`);
        }
        return;
    } catch (error) {
        console.error(`[${this.model}]Db checkModel: ${error}`);
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
        return this;
    } catch (error) {
        console.error(`[${this.model}]Db checkModel: ${error}`);
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
    let errmsg = `[${this.model}]Db getOne: uid not found: ${uid}`;
    return new dbError(404,  errmsg);
}

Model.prototype.updateOne = function(uid,  fieldName, value){
    let that = this;
    for (let datum of this.data){
        if(datum.uid == uid){
            datum[fieldName] = value
            let err = utils.write(that.modelPath, uid+dbconf.uidFileExt, datum)
            if(err) {
                let errmsg = `[${that.model}]Db update: ${err.message}`;
                return new dbError(err.code||500, errmsg);
            }
            that.load();
            return;
        };
    }
    let errmsg = `[${this.model}]Db update: uid not found: ${uid}`;
    return new dbError(404, errmsg);
}

Model.prototype.create = function(content){
    uid = utils.uid();
    let err = utils.write(this.modelPath, uid+dbconf.uidFileExt, content)
    if(err) {
        let errmsg = `[${this.model}]Db create: ${err.message}`;
        return new dbError(err.code||500, errmsg)
    };
    console.log(`[${this.model}]Db create: new uid file created: ${uid}`)
    this.load();
    return uid;
}
module.exports = Model;