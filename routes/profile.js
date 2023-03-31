var express = require('express');
var router = express.Router();
const ProfileCtrl = require('../controllers/profile');

// BASE_URL = localhost:3000/profile/
router.get("/", ProfileCtrl.index);

// localhost:3000/profile/checkgamertag
router.get("/checkgamertag", ProfileCtrl.checkGamertag); // checking gamertag serverside

// localhost:3000/profile/updategamertag
router.put("/updategamertag", ProfileCtrl.updateGamertag);

module.exports = router;