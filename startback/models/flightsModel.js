const mongoose = require('mongoose');

let FlightSchema = new mongoose.Schema({
    flightType: String,
    classType: String,
    arrival: String,
    dateDeparture: Date,
    departure: String,
    sortOrder: String,
    stops: Number,
    priceMax: Number,
    passengers: Number,
    durationMax: Number,
    priceMin: Number,
    dateDepartureBack: Date,
    first_name : String,
    last_name : String,
    email : String     
});

module.exports = mongoose.model('flights', FlightSchema);