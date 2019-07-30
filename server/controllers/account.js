const db = require('../dao').model("accounts");
const dbError = require("../dao").dbError;
const utils = require('../utils');
const accountUtils = require('./utils/accountUtils');

module.exports = {
  list: list,
  get: get,
  edit: edit,
  create: create,
};

function list(req, res, next){
  let options = {};
  let allAccounts = accountUtils.list(options);
  res.status = 200;
  res.json({
    success: true,
    accounts: allAccounts
  });
  return;
}

function get(req, res, next){
  let options = {}
  options.uid = req.params.uid;
  let account = accountUtils.get(options);
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
  let options = {};
  options.uid = req.params.uid;
  options.content = req.body.content;
  let err = accountUtils.edit(options);
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
  let options = {};
  options.content = req.body.content;
  let uid = accountUtils.create(options);
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
