module.exports = readJson;
  
const path = require('path');

function readJson(parDir, fileName){
    return require(path.join(parDir, fileName));
}
