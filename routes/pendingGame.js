var express = require('express');
var router = express.Router();
const PendingGameCtrl = require('../controllers/pendingGame');

// BASE_URL = localhost:3000/pending
router.get("/", PendingGameCtrl.index);

// localhost:3000/accept/game._id
router.get("/accept/:id", PendingGameCtrl.accept);

// localhost:3000/decline/game._id
router.get("/decline/:id", PendingGameCtrl.decline);

module.exports = router;