const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('upload', { user: req.user });
});

router.get('/upload', function(req, res){
	res.render('upload', {title: 'Add Sequence'})
});

module.exports = router;
