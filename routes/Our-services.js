var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('layout', { title: 'OUR SERVICES' });
    next();
});

module.exports = router;