const {ipcMain} = require('electron')
const accountUtils = require('./server/controllers/utils/accountUtils');
const dbError = require("./server/dao").dbError;

ipcMain.on('accounts', (event, arg) => {
    let allAccounts = accountUtils.list(arg);
    let args = {
        success: true,
        accounts: allAccounts
    }
    event.sender.send("accounts-reply", args);
});

ipcMain.on('accountOne', (event, arg) => {
    let options = {};
    options.uid = arg.uid;
    let account = accountUtils.get(options);
    let args;
    if (account instanceof dbError){
        args = account;
    }else{
        args = {
            success: true,
            account: account
        }
    }
    event.sender.send("accountOne-reply", args);
});

ipcMain.on('edit', (event, arg) => {
    let options = {};
    options.uid = arg.uid;
    options.content = arg.content;
    let err = accountUtils.edit(options);
    let args;
    if (err && err instanceof dbError){
        args = err;
    } else{
        args = {
            success: true,
            message: "Successfully updated."
        }
    }
    event.sender.send("edit-reply", args);
});

ipcMain.on('create', (event, arg) => {
    let options = {};
    options.content = arg.content;
    let uid = accountUtils.create(options);
    let args;
    if (uid instanceof dbError){
        args = uid;
    } else {
        args = {
            success: true,
            new_uid: uid
        }
    }
    event.sender.send("create-reply", args);
});