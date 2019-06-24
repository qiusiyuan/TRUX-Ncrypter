let router = require('express').Router();
let account = require('../../controllers/account');
let middleware = require("../../middleware").account;


router.get('/', account.list);

router.get('/:uid', account.get);

router.post('/:uid/edit', middleware.editCheck, account.edit);

router.post('/new', middleware.createCheck, account.create);

module.exports = router;
