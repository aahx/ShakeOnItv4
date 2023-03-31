var express = require('express');
var router = express.Router();
const CreateGameCtrl = require('../controllers/createGame');

// BASE_URL = localhost:3000/creategame
router.get("/", CreateGameCtrl.index);

// localhost:3000/creategame/newgame
router.post("/newgame", CreateGameCtrl.newGame);

module.exports = router;