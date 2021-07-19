const model = require('../model/models.js');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');


require('./passport');


router.use(express.json());


router.get('/get', async (req,res) => {
    const phonedoc = await model.find();
    res.json(phonedoc);
});

router.get('/get/:firstname', async (req, res) => {
    const phonedocs = await model.find({firstname : req.params.firstname}).then(function(phonedocs) {
        res.json(phonedocs);
    });
});

router.get('/get/:lastname', async (req, res) => {
    const phonedocs = await model.find({lastname : req.params.lastname}).then(function(phonedocs) {
        res.json(phonedocs);
    });
});

router.post('/create', async(req, res) => {

    const Phonebook = new model(
    {
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        phonenumbers : req.body.phonenumbers,
        token : req.body.token
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
});

router.post('/post', verifyToken, (req, res) => {
    jwt.verify(req.token, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "post", authData
            });
        }
    });
});

function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
router.get('/profile', (req, res, next) => {
    res.json(req.user);
});


module.exports = router;