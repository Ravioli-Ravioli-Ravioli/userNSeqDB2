//Get libraries
const createError = require('http-errors');
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');

//Define paths
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const newseqRoutes = require('./routes/newseq-routes');

//Config and setups
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');

//Set view engine
app.set('view engine', 'pug');

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

//Create home
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
