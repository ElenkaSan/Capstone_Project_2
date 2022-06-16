const express = require('express')
const hotelsRouter = require('./routes/hotelsRouter');
const carsRouter = require('./routes/carsRouter');
const flightsRouter = require('./routes/flightsRouter');
const cors = require('cors');

let app = express();
//Allowing get POST and PUT request
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : false}));

const morgan = require("morgan");
app.use(morgan("tiny"));
// app.use(authenticateJWT);

require('./configs/database')


app.use('/', hotelsRouter);
app.use('/', carsRouter);
app.use('/', flightsRouter);

app.listen(8000);  //listens on port 3000 -> http://localhost:3000/

