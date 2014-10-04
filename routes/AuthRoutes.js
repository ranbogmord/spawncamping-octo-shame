var express = require('express');
var router = express.Router();
var auth = require('./auth');
var bodyParser = require('body-parser');

router.get('/', [bodyParser(), auth], function (req, res) {
    
});

module.exports = router;