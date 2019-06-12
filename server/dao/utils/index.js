const crypto = require("crypto");

module.exports.load = require('./load');
module.exports.write = require('./write');

module.exports.uid = function(){
    const id = crypto.randomBytes(12).toString("base64");
    return id;
}