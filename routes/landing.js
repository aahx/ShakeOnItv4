var express = require('express');
var router = express.Router();
const LandingCtrl = require('../controllers/landing');

// BASE_URL = localhost:3000/landing
router.get("/", LandingCtrl.index);


module.exports = router;