var express = require('express');
var router = express.Router();
const PendingGameCtrl = require('../controllers/pendingGame');

// BASE_URL = localhost:3000/pending
router.get("/", PendingGameCtrl.index);

module.exports = router;