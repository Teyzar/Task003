const mongoose = require('mongoose');

const model = mongoose.Schema({
    lastname : 
    {
        type: String, require:true
    },
    firstname : 
    {
        type: String, require:true
    },
    phonenumbers: 
    {
        type: Number, require:true
    },
});


module.exports = mongoose.model('Phonebook', model );



