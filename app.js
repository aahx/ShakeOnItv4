var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');

// Loading env, db, passport
require('dotenv').config();
require('./config/database');
require('./config/passport');

// Defining routes
var indexRouter = require('./routes/index');
var passportRouter = require("./routes/passport");
var landingRouter = require("./routes/landing");
var profileRouter = require("./routes/profile");
var friendsRouter = require('./routes/friends');
var createGameRouter = require('./routes/createGame');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares default
app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/', indexRouter);
app.use("/auth", passportRouter);
app.use("/landing", landingRouter);
app.use('/profile', profileRouter);
app.use('/friends', friendsRouter);
app.use('/creategame', createGameRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;