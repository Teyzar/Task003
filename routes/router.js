const model = require('../model/models.js');
const express = require('express');
const users = require('../model/login');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

router.use(express.json());

router.get('/get' , async (req,res) => {
    const phonedoc = await model.find();
    res.json(phonedoc);
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


router.post('/login', async(req, res) => {
    const account = new users(
        {
            username : req.body.username,
            password : req.body.password,
        });
        if (account.username != user && account.password != pass) {
            res.json(400, {
                error: 1,
                msg: "Invalid credentials"
            });
        } else {
            res.json({message: "Succesfuly logged in"});

            const token = jwt.sign(
                { username: req.body.username },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
              res.status(200).json({
                username: req.body.username,
                password: req.body.password,
                token: token
              });
        }
});

module.exports = router;