const mongoose = require('mongoose');
// const MONGO_URI = 'mongodb+srv://<DB_NAME>:<DB_PASSWORD>@<DB_NAME>.qfda0.mongodb.net/starwars?retryWrites=true&w=majority';

// mongoose.connect(MONGO_URI, {
//   // options for the connect method to parse the URI
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // sets the name of the DB that our collections are part of
//   dbName:'<DB_NAME>'
// })
//   .then(() => console.log('Connected to Mongo DB.'))
//   .catch(err => console.error(err));

const Schema = mongoose.Schema;

const carSchema = new Schema({
  description: { type: String, required: true },
  vehicleExample: { type: String, required: true },
  peopleCapacity: { type: Number, required: true },
  bagCapacity: { type: Number, required: true },
  airportName: { type: String, required: false },
  ratePlan: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});
// const Car = mongoose.model('car', carSchema);
// module.exports = Car;

module.exports = mongoose.model('cars', carSchema);