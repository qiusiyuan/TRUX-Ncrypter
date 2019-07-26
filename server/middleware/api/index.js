let router = require('express').Router();

router.use('/account', require('./accountMiddleware'));

module.exports = router;