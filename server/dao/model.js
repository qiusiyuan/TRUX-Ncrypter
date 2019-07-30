const dbconf = require('./database.json');
const utils = require('./utils');
const path = require('path');
const dbError = require('./dbError');
const fs = require('fs');
const { app } = require ('electron');

function Model(modelName){
    this.model = modelName;
    this.modelPath = path.join(app.getPath("userData"), dbconf.dbPath, this.model);
    this.checkModel();
    this.load();
    let that = this;
    setInterval(function () { 
      that.load();
    }, 10000);   
}

Model.prototype.checkModel = function(){
    try {
        fs.mkdirSync(path.join(app.getPath("userData"), dbconf.dbPath ));
        let files = fs.readdirSync( path.join(app.getPath("userData"), dbconf.dbPath ));
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
        let data = {};
        uidFiles.forEach(function(fileName){
            datum = utils.load(that.modelPath, fileName);
            let uid  = fileName.replace(dbconf.uidFileExt, '');
            data[uid] = datum;  
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
    if (uid in this.data){
        return this.data[uid];
    }
    let errmsg = `[${this.model}]Db getOne: uid not found: ${uid}`;
    return new dbError(404,  errmsg);
}

Model.prototype.updateOne = function(uid,  pairs){
    if (uid in this.data){
        let datum = this.data[uid];
        pairs.forEach((pair) => {
          datum[pair.fieldName] = pair.value;
        });
        let err = utils.write(this.modelPath, uid+dbconf.uidFileExt, datum);
        if(err) {
            let errmsg = `[${this.model}]Db update: ${err.message}`;
            return new dbError(err.code||500, errmsg);
        }
        console.log(`[${this.model}]Db updateOne: field updated for: ${uid}`);
        this.load();
        return;
    }
    let errmsg = `[${this.model}]Db updateOne: uid not found: ${uid}`;
    return new dbError(404, errmsg);
}

Model.prototype.create = function(content){
    uid = utils.uid();
    let err = utils.write(this.modelPath, uid+dbconf.uidFileExt, content)
    if(err) {
        let errmsg = `[${this.model}]Db create: ${err.message}`;
        return new dbError(err.code||500, errmsg)
    };
    console.log(`[${this.model}]Db create: new uid file created: ${uid}`);
    this.load();
    return uid;
}
module.exports = Model;