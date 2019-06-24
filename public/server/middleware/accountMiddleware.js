module.exports = {
    editCheck: editCheck,
    createCheck: createCheck,
};

function editCheck(req, res, next){
    let fieldName = req.body.fieldName;
    let value = req.body.value;
    let missingField = "";
    if (fieldName === undefined){
        missingField += "fieldName ";
    }
    if (value === undefined){
        missingField += "value ";
    }
    if (missingField != ""){
        res.status(422);
        res.json({
            success: false,
            missingField: missingField
        });
        return;
    }
    return next();
}

function createCheck(req, res, next){
    let content = req.body.content;
    let missingField = "";
    if (content === undefined){
        missingField += "content ";
    }
    if (missingField != ""){
        res.status(422);
        res.json({
            success: false,
            missingField: missingField
        });
        return;
    }
    return next();
}