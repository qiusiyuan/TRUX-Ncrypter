const db = require('../dao').model("accounts");
const dbError = require("../dao").dbError;
const utils = require('../utils');

module.exports = {
    list: list,
    get: get,
    edit: edit,
    create: create,
};

function list(req, res, next){
    let allAccounts = db.getAll();
    Object.keys(allAccounts).forEach(id => {
      let account= allAccounts[id];
      account.alias = [];
      if (!utils.isEmpty(account.title)){
        account.alias.push(utils.toPinyin(account.title));
      }
      if (!utils.isEmpty(account.username)){
        account.alias.push(utils.toPinyin(account.username))
      }
      if (!utils.isEmpty(account.password)){
        account.alias.push(utils.toPinyin(account.password))
      }
    });
    res.status = 200;
    res.json({
        success: true,
        accounts: allAccounts
    });
    return;
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
    return;
}

function edit(req, res, next){
    let uid = req.params.uid;
    let content = req.body.content;
    let err = db.updateOne(uid, content);
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
    return;
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
    return;
}
