var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserDB = require("../models/users");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
            scope: ['profile'],
            state: true
        },
        function verify(accessToken, refreshToken, profile, cb) {
            UserDB.findOne({ googleId: profile.id })
                .then(async function (user) {
                    if (user) return cb(null, user);
                    try {
                        user = await UserDB.create({
                            name: profile.displayName,
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            avatar: profile.photos[0].value
                        });
                        return cb(null, user);
                    } catch (err) {
                        return cb(err);
                    }
                })
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function (userId, cb) {
    UserDB.findById(userId).then(function (user) {
        cb(null, user);
    })
});