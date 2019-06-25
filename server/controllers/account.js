const db = require('../dao').model("accounts");
const dbError = require("../dao").dbError;

module.exports = {
    list: list,
    get: get,
    edit: edit,
    create: create,
};

function list(req, res, next){
    let allAccounts = db.getAll();
    res.status = 200;
    res.json({
        success: true,
        accounts: allAccounts
    });
    return next();
}

function get(req, res, next){
    let uid = req.params.uid;
    let account = db.getOne(uid);
    if (account instanceof dbError){
        res.status(account.statusCode);
        res.json(account);
    }else{
        res.status(200);
        res.json({
            success: true,
            account: account
        });
    }
    return next();
}

function edit(req, res, next){
    let uid = req.params.uid;
    let fieldName = req.body.fieldName;
    let value = req.body.value;
    let err = db.updateOne(uid, fieldName, value);
    if (err && err instanceof dbError){
        res.status(err.statusCode);
        res.json(err);
    }else{
        res.status(200);
        res.json({
            success: true,
            message: "Successfully updated."
        })
    }
    return next();
}

function create(req, res, next){
    let content = req.body.content;
    let uid = db.create(content);
    if (uid instanceof dbError){
        res.status(uid.statusCode);
        res.json(uid);
    }else{
        res.status(200);
        res.json({
            success: true,
            new_uid: uid
        });
    }
    return next();
}
