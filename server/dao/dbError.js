class dbError{
    constructor(code, msg){
        this.statusCode = code;
        this.message = msg;
    }
}

module.exports = dbError;