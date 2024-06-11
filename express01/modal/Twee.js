const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    twee:{
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;