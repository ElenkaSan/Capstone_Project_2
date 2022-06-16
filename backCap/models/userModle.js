const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username : String,
    first_name : String,
    last_name : String,
    email : String,
    password : String,
    note : String
});

module.exports = mongoose.model('UsersHotels',UserSchema );