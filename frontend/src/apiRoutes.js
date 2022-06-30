require(`dotenv`).config();
const Amadeus = require('amadeus');
const axios = require("axios");

//AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET

module.exports = function(app) {
  const amadeus = new Amadeus({
    clientId: '56mG9WkqzcEq6mmMwm0OBCndfxTR7QDA',
    clientSecret: 'travel-advisor.p.rapidapi.com'
  });

  // Flight Inspiration Search
  app.get("/airport/:city", (req, res) => {
    amadeus.referenceData.locations
      .get({
        keyword: req.params.city,
        subType: Amadeus.location.any
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Flight Inspiration Search
  app.get("/flightDestinations/:city/:date/:nonstop?", (req, res) => {
    amadeus.shopping.flightDestinations
      .get({
        origin: req.params.city,
        departureDate: req.params.date,
        nonStop: req.params.nonstop || false
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Flight Cheapest Date Search
  app.get("/cheapestDate/:originCity/:destinationCity", (req, res) => {
    amadeus.shopping.flightDates
      .get({
        origin: req.params.originCity,
        destination: req.params.destinationCity
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Flight Low-fare Search
  app.get("/lowFare/:originCity/:destinationCity/:date", (req, res) => {
    amadeus.shopping.flightOffers
      .get({
        originLocationCode: req.params.originCity,
        destinationLocationCode: req.params.destinationCity,
        departureDate: req.params.date
      })
      .then(function(response) {
        console.log(response.data);
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Flight Offers Search
  app.get(
    "/flights/:originCity/:destinationCity/:date/:adults/:nonstop?/",
    (req, res) => {
      amadeus.shopping.flightOffers
        .get({
          origin: req.params.originCity,
          destination: req.params.destinationCity,
          departureDate: req.params.date,
          adults: req.params.adults,
          max: 50,
          nonStop: req.params.nonstop || false
        })
        .then(function(response) {
          res.send({ data: response.data });
        })
        .catch(function(responseError) {
          console.log(responseError.code);
          console.log(responseError);
        });
    }
  );

  app.get(
    "/flightsround/:originCity/:destinationCity/:date/:endDate/:adults/:nonstop?",
    (req, res) => {
      amadeus.shopping.flightOffers
        .get({
          origin: req.params.originCity,
          destination: req.params.destinationCity,
          departureDate: req.params.date,
          returnDate: req.params.endDate,
          adults: req.params.adults,
          max: 50,
          nonStop: req.params.nonstop || false
        })
        .then(function(response) {
          res.send({ data: response.data });
        })
        .catch(function(responseError) {
          console.log(responseError.code);
          console.log(responseError);
        });
    }
  );

  // Flight Choice Prediction
  app.get(
    "/flightPrediction/:originCity/:destinationCity/:date",
    (req, res) => {
      amadeus.shopping.flightOffers
        .get({
          origin: req.params.originCity,
          destination: req.params.destinationCity,
          departureDate: req.params.date
        })
        .then(function(response) {
          return amadeus.shopping.flightOffers.prediction.post(
            JSON.stringify(response.result)
          );
        })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(responseError) {
          console.log(responseError);
        });
    }
  );

  // Flight Checkin Links
  app.get("/checkin/:airline", (req, res) => {
    amadeus.referenceData.urls.checkinLinks
      .get({
        airlineCode: req.params.airline
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Get list of hotels by city code
  app.get("/hotels/:city/:checkInDate?/:checkOutDate?", (req, res) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let dd2 = String(today.getDate() + 1).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    amadeus.shopping.hotelOffers
      .get({
        cityCode: req.params.city,
        checkInDate: req.params.checkInDate || `${yyyy}-${mm}-${dd}`,
        checkOutDate: req.params.checkOutDate || `${yyyy}-${mm}-${dd2}`
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Get list of offers for a specific hotel
  app.get("/hotelOffers/:hotelId", (req, res) => {
    amadeus.shopping.hotelOffersByHotel
      .get({
        hotelId: req.params.hotelId
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Confirm the availability of a specific offer id
  app.get("/hotelOfferAvailability/:hotelOffer", (req, res) => {
    amadeus.shopping
      .hotelOffer(req.params.hotelOffer)
      .get()
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Hotel Ratings
  app.get("/hotelRating/:hotelId", (req, res) => {
    amadeus.eReputation.hotelSentiments
      .get({
        hotelIds: req.params.hotelId
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });

  // Points of Interest
  app.get("/pointsOfInterest/:latitude/:longitude", (req, res) => {
    amadeus.referenceData.locations.pointsOfInterest
      .get({
        latitude: req.params.latitude,
        longitude: req.params.longitude
      })
      .then(function(response) {
        res.send({ data: response.data });
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  });
};

// const axios = require("axios");

// function makingOut (results) {
// 	return results.map(res => ({
// 		bio: res.data.bio,
// 		name: res.data.name,
// 	}));
// }
// module.exports = { 
//      makingOut 
// };
// const { makingOut } = require("./helper");
// app.post('/', async (req, res, next) => {
// 	try {
// 	// get developer promises from the url and save in array
//   let requests = req.body.developers.map(async (devs) => {
//     return await axios.get(`https://api.github.com/users/${devs}`)
//   })
//     const results = await Promise.all(requests)
//     return res.json(makingOut (results));
// 	} catch (err) {
// 		next(err);
// 	}
// });
