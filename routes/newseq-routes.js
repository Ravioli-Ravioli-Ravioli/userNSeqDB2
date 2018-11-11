const router = require('express').Router();
const keys = require('../config/keys');
const User = require('../models/user-model');
const mongodb = require('mongodb');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};


router.get('/', authCheck, (req, res) => {
    res.render('newseq', { user: req.user });
});

router.get('/newseq', function(req, res){
	res.render('newseq', {title: 'Add Sequence'})
});

module.exports = router;
