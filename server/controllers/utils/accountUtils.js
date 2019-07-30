const db = require('../../dao').model("accounts");
const utils = require('../../utils');

module.exports = {
  list: list,
  get: get,
  edit: edit,
  create: create,
};

function list(options){
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
  })
  return allAccounts;
}

function get(options){
  let uid = options.uid;
  let account = db.getOne(uid);
  return account;
}

function edit(options){
  let uid = options.uid;
  let content = options.content;
  let err = db.updateOne(uid, content);
  return err;
}

function create(options){
  let content = options.content;
  let uid = db.create(content);
  return uid;
}
