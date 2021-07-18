const express = require('express');
const router  = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('./passport');
const pass = process.env.DB_PASS;
const secret = process.env.SECRET_KEY;

router.post('/signup', passport.authenticate ('signup', {session: false}) , async (req,res,next) => {
    res.json(req.user);
});

router.post('/login', function (req, res, next) {    

    passport.authenticate('login', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }      
        req.login(user, {session: false}, (err, result) => {     
            const token = jwt.sign({user}, secret); 
            res.json({user, token});
        });
    })(req, res, next);
});

module.exports = router;