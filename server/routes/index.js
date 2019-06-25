let router = require('express').Router();

router.use('/api', require('./api'));

// router.get('/', require('./views'));

module.exports = router;
