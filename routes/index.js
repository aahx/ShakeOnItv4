var express = require('express');
var router = express.Router();
var IndexCtrl = require('../controllers/index');

// BASE_URL = localhost:3000
router.get('/', IndexCtrl.index);

module.exports = router;