const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/router.js');
const auth = require('./routes/auth');
const passport = require('passport');
require('dotenv').config();
require('./routes/passport');

const app = express();
app.use(express.json());
const url = process.env.DB_URL;
const port = process.env.PORT || 3000;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){

    if (err) initFail();
    if (!err) init();
});

app.use('/auth', auth);

app.use('/router', route);

async function init () {
    await sleep(2000);
    console.log('Initializing connection...');
    await sleep(2000);
    console.log('Connected to DataBase');
}

async function initFail () {
    await sleep(2000);
    console.log('Initializing connection...');
    await sleep(2000);
    console.log('Failed to connect..');
}

app.listen(port, () => {console.log(`Listening on port : http://localhost:${port}`)}); 


