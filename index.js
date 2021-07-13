const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/router.js');
require('dotenv').config();

const app = express();
const url = process.env.DB_URL;

const PORT = process.env.PORT || 3000;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if (err) console.log(err);
    if (!err) console.log(`Connected to DataBase`);
});

app.use('/router', route);

// app.listen(port, () => console.log(`Listening on port : http://localhost:${port}`));

app.listen(port, () => {console.log(`Listening on port : http://localhost:${port}`)});
