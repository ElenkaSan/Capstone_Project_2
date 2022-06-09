const mongoose = require('mongoose');

let HotelSchema = new mongoose.Schema({
    hotelName : String,
    checkin : Date,
    checkout : Date,
    price : String,
    description : String,
    reviews : Number,
    logo_url : String,
    numberOfGuests: Number,
    roomcount : [{
        RoomName : String,
        count : Number
         }],
    first_name : String,
    last_name : String,
    email : String     
});

module.exports = mongoose.model('hotels', HotelSchema);