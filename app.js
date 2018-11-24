//Get libraries
const createError = require('http-errors');
const express = require('express');
const app = express();
const router = require('express').Router(); //
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const http = require('http');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Define paths
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const uploadRoutes = require('./routes/upload-routes');
const newseqRoutes = require('./routes/newseq-routes');
const indexRoutes = require('./routes/index-routes');

//Config and setups
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');

app.set('view engine', 'pug');
//app.use(express.bodyParser());

//Set session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Connect to mongo database
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

//Use routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/newseq', newseqRoutes);
app.use('/', indexRoutes);
//app.use('/homeOut', indexRoutes);
app.use('/homeIn', indexRoutes);
app.use('/upload', uploadRoutes);

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
