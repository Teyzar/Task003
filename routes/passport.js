const passport = require('passport');
const users = require('../model/login');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bc = require('bcrypt');
const crypto = require('crypto');


const pass = process.env.DB_PASS;
const secret = process.env.SECRET_KEY;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
},

    async (token, done) => {

    users.findOneById(token.id)
        .then(user => {
            return done(null, token.user);
        })
        .catch(err => {
            return done(err);
        });
    }
));


passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done) => {    

        try {
            users.findOne({email}, (err, result) => {
                result ?  done(null, {message: "Email Already Exist!"}) : users.create({email, password}); done(null, {message: "Succesful"});
            })
        } catch (error) {
            done(error);
        }
    }
));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, 
async (email, password, done) => {    

    try {
        users.findOne({email}, (err, result) => {
            //const token = jwt.sign({email, pass}, secret);
            if (err) throw error;
            !result ?  done(null, {message: "User doesn't exist "}) : users.findOne({password} , (err, res) => {
                if (err) throw err;
                !res ? done(null, {message: "You entered Wrong password!"}) : done(null, {message: "Log in succesfuly! "});
            });
        })
    } catch (error) {
        done(error);
    }
}
));