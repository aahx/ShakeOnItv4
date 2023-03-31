var express = require('express');
var router = express.Router();
const FriendsCtrl = require('../controllers/friends');

// BASE_URL = localhost:3000/friends
router.get("/", FriendsCtrl.index);

// localhost:3000/friends/addfriend
router.post("/addfriend", FriendsCtrl.validate);

module.exports = router;