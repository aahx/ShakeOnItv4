var express = require('express');
var router = express.Router();
var passport = require('passport');

// BASE_URL = localhost:3000/auth
// localhost:3000/auth/google
router.get('/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

// localhost:3000/auth/google/oauth2callback
router.get('/google/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/landing',
        failureRedirect: '/error'
    }
));

// localhost:3000/auth/logout
router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
});

module.exports = router;