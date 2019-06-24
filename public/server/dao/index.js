const dbconf = require('./database.json');
const Model = require('./model');
const dbError = require('./dbError');

function TruxDB(){
    this.db_version = dbconf.dbVersion;
    this.models = {};
}

TruxDB.prototype.model = function(modelName){
    if (! (modelName in this.models) ){
        this.models[modelName] = new Model(modelName);
    }
    return this.models[modelName];
}

const truxdb = module.exports = exports = new TruxDB();
module.exports.dbError = dbError;