const model = require('../model/models.js');
const express = require('express');
const users = require('../model/login');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bc = require('bcrypt');
const crypto = require('crypto');

const user = process.env.DB_USER;
const secret = process.env.SECRET_KEY;

router.use(express.json());

var md5 = crypto.createHash('md5').update(user + secret).digest('hex');

router.get('/get' , async (req,res) => {
    if (req.body.token === md5) {
    const phonedoc = await model.find();
    res.json(phonedoc);
    } else {
        res.json(400, {
            error: 1,
            msg: "invalid token"
        });
    }
});

router.post('/create', async(req, res) => {
    const Phonebook = new model(
    {
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        phonenumbers : req.body.phonenumbers
    });
    Phonebook.save().then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message : err})
    });
});


router.put('/update/:id', async (req,res) => {
    const doc = await model.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        model.findOne({_id: req.params.id}).then(function(doc){
            res.json(doc);
        })
    });
});

router.delete('/delete/:id', async(req,res) => {
    const doc = await model.findByIdAndDelete({_id:req.params.id}).then(function(doc) {
    res.json(doc);
    });
})


// router.post('/login', async(req, res) => {
//     const account = new users(
//         {
//             username : req.body.username,
//             password : req.body.password,
//             token : req.body.token,
//         });
//        var md5 = crypto.createHash('md5').update(user + secret).digest('hex');

//     //    if(req.body.token === md5){
//     //     res.json(400, {
//     //         error: 1,
//     //         msg: "Invalid credentials"
//     //     });
//     //    }

//         if (account.username === user && account.password === pass) {
//             // const token = jwt.sign(
//             //     { username: req.body.username},
//             //     'TOKEN_SECRET',
//             //     { expiresIn: '24h' });
//             //   res.status(200).json({
//             //     username: req.body.username,
//             //     password: req.body.password,
//             //     token: token
//             //   });
//             //   res.json({message: "Succesfuly logged in", token: md5});

//             //res.json({token : req.body.token });
//             res.json(md5);

//         } else {
//               res.json(400, {
//                 error: 1,
//                 msg: "Invalid credentials"
//             });
//         }
// });

module.exports = router;