module.exports = writeJson;
  
const path = require('path');
const fs = require('fs');

function writeJson(parDir, fileName, content){
    try {
        fs.writeFileSync(path.join(parDir, fileName), JSON.stringify(content));
        return;
    } catch (error) {
        return error;
    }
}
