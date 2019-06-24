class dbError{
    constructor(code, msg){
        this.statusCode = code;
        this.message = msg;
        console.error(this.message);
    }
}

module.exports = dbError;