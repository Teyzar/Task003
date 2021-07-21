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
        type: String, require:true
    },
});


module.exports = mongoose.model('Phonebook', model );



