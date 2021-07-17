const model = require('../model/models.js');
const express = require('express');
const users = require('../model/login');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bc = require('bcrypt');
const crypto = require('crypto');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const secret = process.env.SECRET_KEY;

var token = jwt.sign({ user , secret}, 'TOP_SECRET');
var md5 = crypto.createHash('md5').update(token).digest('hex');

router.use(express.json());

router.get('/get' , async (req,res) => {
    if (req.body.token === md5) {
    const phonedoc = await model.find();
    res.json({phonedoc, token: md5});
    } else {
        res.json(400, {
            error: 1,
            msg: "Requires token for Authorization to Access API",
            token : " ? "
        });
    }
});

router.get('/get/:firstname', async (req, res) => {
    if (req.body.token === md5) {
        const phonedocs = await model.find({firstname : req.params.firstname}).then(function(phonedocs) {
            res.json(phonedocs);
        });
    } else {
        res.json(400, {
            error: 1,
            msg: "Requires token for Authorization to Access API",
            token : " ? "
        });
    }
})
router.get('/get/:lastname', async (req, res) => {
    if (req.body.token === md5) {
        const phonedocs = await model.find({lastname : req.params.lastname}).then(function(phonedocs) {
            res.json(phonedocs);
        });
    } else {
        res.json(400, {
            error: 1,
            msg: "Requires token for Authorization to Access API",
            token : " ? "
        });
    }
})

router.post('/create', async(req, res) => {

    const Phonebook = new model(
    {
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        phonenumbers : req.body.phonenumbers
    });
    if (req.body.token == md5) {
        Phonebook.save().then(data => {
            res.json(data);
        }) 
        .catch(err => {
            res.json({message : err})
        });
    } else {
        res.json(400, {
            error: 1,
            msg: "Requires token for Authorization to Access API",
            token : " ? "
        });
    }
});


router.put('/update/:id', async (req,res) => {
    if (req.body.token === md5) {
        const doc = await model.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
            model.findOne({_id: req.params.id}).then(function(doc){
                res.json(doc);
            })
        });
    } else {
        res.json(400, {
            error: 1,
            msg: "Requires token for Authorization to Access API",
            token : " ? "
        });
    }
});

router.delete('/delete/:id', async(req,res) => {
    if (req.body.token === md5) {
        const doc = await model.findByIdAndDelete({_id:req.params.id}).then(function(doc) {
        res.json(doc);
        });
    } else {
        res.json(400, {
            error: 1,
            msg: "Requires token for Authorization to Access API",
            token : " ? "
        });
    }
})


router.post('/login', async(req, res) => {
    const account = new users(
        {
            username : req.body.username,
            password : req.body.password,
            token : req.body.token,
        });
    if (account.username === user && account.password === pass) {
        
        res.json({message : "Succesfully login" , token : md5});

    } else {
            res.json(400, {
            error: 1,
            msg: "Invalid credentials"
        });
    }
});

module.exports = router;