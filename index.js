const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes/router.js');
const auth = require('./routes/auth');
const passport = require('passport');
require('dotenv').config();
require('./routes/passport');

//app.use(cors());
const app = express();
app.use(express.json());

const url = process.env.DB_URL;

const port = process.env.PORT || 3000;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if (err) console.log(err);
    if (!err) console.log(`Connected to DataBase`);
});

// app.use('/router', route);
app.use('/auth', auth);
app.use('/router', passport.authenticate('jwt', {session: false}), route);




// app.listen(port, () => console.log(`Listening on port : http://localhost:${port}`));

app.listen(port, () => {console.log(`Listening on port : http://localhost:${port}`)});

