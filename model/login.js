const mongoose = require('mongoose');

const model = new mongoose.Schema({
    email : 
    {
        type: String, require:true
    },
    password : 
    {
        type: String, require:true
    },
});

module.exports = mongoose.model('Login auth', model );
