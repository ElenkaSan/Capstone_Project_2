const Amadeus = require("amadeus");
require("dotenv").config();
// const { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } = require("./config");

// AmadeusApi.clientId = process.env.AMADEUS_CLIENT_ID;
// AmadeusApi.clientSecret = process.env.AMADEUS_CLIENT_SECRET;
const amadeus = new Amadeus({
  // clientId: AMADEUS_CLIENT_ID,
  // clientSecret: AMADEUS_CLIENT_SECRET,
  // clientId: process.env.AMADEUS_CLIENT_ID,
  // clientSecret: process.env.AMADEUS_CLIENT_SECRET
  clientId: "56mG9WkqzcEq6mmMwm0OBCndfxTR7QDA",
  clientSecret: "ueJ8RAc9HiSyRHVO",
});

class AmadeusApi {
  // static clientId;
  // static clientSecret;

  // ========= Trip Search ==========
  // static async getTrip( originLocationCode, destinationLocationCode, departureDate, returneDate) {
  //   const result = await amadeus.travel.predictions.tripPurpose.get({
  //     originLocationCode,
  //     destinationLocationCode,
  //     departureDate,
  //     returneDate,
  //   });
  //   return result;
  // }
  
  static async getTrip( originLocationCode, destinationLocationCode, departureDate, returneDate) {
    const result = await amadeus.client.get(`/v1/travel/predictions/trip-purpose`,{
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returneDate,
    });
    return result;
  }

  //========= Airoport & City   ----------------------------------------
    //  https://developers.amadeus.com/blog/airport-autocomplete-app-with-the-mern-stack 

  // static async getAiportCity(keyword, subType, page) {
  //   const result = await amadeus.client.get({
  //     keyword,
  //     subType,
  //     page
  //   });
  //   return result;
  // }

  static async getAiportCity(keyword, subType, page) {
    const result = await amadeus.client.get(`/airport/v1/reference-data/locations`,{
      keyword,
      subType,
      page
    });
    return result;
  }
  // static async getAiportCity(keyword, page, subType) {
  //   const result = amadeus.referenceData.locations.get(`/airport/${keyword}&${page}&${subType}`);
  //   return result;
  // }

// ====== City search suggestions with Airport & City Search API   ----------------------------------------
  // static async getAirport(keyword, subType) {
  //   const result = await amadeus.referenceData.locations.get({
  //     keyword,
  //     subType,
  //   });
  //   return result;
  // }

  // static async getAirport(keyword, subType) {
  //   const result = await amadeus.referenceData.locations.get(`/airport/${keyword}&${subType}`
  //   // , subType
  //   );
  //   return result;
  // }

  static async getAiport(keyword, subType) {
    const result = await amadeus.client.get(`/airport/v1/reference-data/locations`,{
      keyword,
      subType
    });
    return result;
  }

  // app.get("/airport/:city", (req, res) => {
  //   amadeus.referenceData.locations
  //     .get({
  //       keyword: req.params.city,
  //       subType: Amadeus.location.any
  //     })

// ======== Flights ===== https://github.com/amadeus4dev/amadeus-node/blob/master/README.md
  static async getFlight (  originLocationCode, destinationLocationCode, departureDate, adults) {
    const result = amadeus.shopping.flightOffersSearch.get({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults
});
return result;
}

// = ==========  NonStop
  // static async flightDestinationsNonstop( origin, departureDate, nonStop) {
  //   const result = await amadeus.shopping.flightDestinations.get({
  //     origin,
  //     departureDate,
  //     nonStop,
  //   });
  //   return result;
  // }
  // static async flightDestinationsNonstop( origin, departureDate, nonStop) {
  //   const result = await amadeus.shopping.flightDestinations.get(`/flightDestinations/${origin}/${departureDate}/${nonStop}`);
  //   return result;
  // }

  static async flightDestinationsNonstop( origin, departureDate, nonStop) {
    const result = await amadeus.client.get(`/airport/v1/reference-data/locations`,{
      origin,
      departureDate,
      nonStop,
    });
    return result;
  }
  // app.get("/flightDestinations/:city/:date/:nonstop?", (req, res) => {
  //   amadeus.shopping.flightDestinations
  //     .get({
  //       origin: req.params.city,
  //       departureDate: req.params.date,
  //       nonStop: req.params.nonstop || false
  //     })

  static async cheapestFlightDate( origin, destination ) {
    const result = await amadeus.shopping.flightDates.get({
      origin,
      destination,
    });
    return result;
  }
  // static async cheapestFlightDate( origin, destination ) {
  //   const result = await amadeus.shopping.flightDates.get(`/cheapestDate/${origin}/${destination}`);
  //   return result;
  // }

  static async flightLowFare(  originLocationCode, destinationLocationCode, departureDate ) {
    const result = await amadeus.shopping.flightOffers.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
    });
    return result;
  }
  // static async flightLowFare(  originLocationCode, destinationLocationCode, departureDate ) {
  //   const result = await amadeus.shopping.flightOffers.get(`/lowFare/${originLocationCode}/${destinationLocationCode}/${departureDate}`);
  //   return result;
  // }


  static async flightOffersNonstop( origin, destination, departureDate, adults, max, nonStop ) {
    const result = await amadeus.shopping.flightOffers.get({
      origin,
      destination,
      departureDate,
      adults,
      max,
      nonStop,
    });
    return result;
  }

  static async flightPrediction( origin, destination, departureDate ) {
    const result = await amadeus.shopping.flightOffers.get({
      origin,
      destination,
      departureDate,
    }).then(function (response) {
      return amadeus.shopping.flightOffers.prediction.post(
        JSON.stringify(response.result)
      );
    })
    return result;
  }

  static async flightCheckin( airlineCode ) {
    const result = await amadeus.referenceData.urls.checkinLinks.get({
      airlineCode
    });
    return result;
  }

  // ======= Hotel
  static async getHotelByCity( cityCode, checkInDate, checkOutDate ) {
    const result = await amadeus.shopping.hotelOffers.get({
      cityCode,
      checkInDate,
      checkOutDate,
    });
    return result;
  }
  // static async getHotelByCity( cityCode, checkInDate, checkOutDate ) {
  //   const result = await amadeus.shopping.hotelOffers.get(`/hotels/${cityCode}/${checkInDate}/${checkOutDate}`);
  //   return result;
  // }

  static async hotelRating( hotelId ) {
    const result = await amadeus.eReputation.hotelSentiments.get({
          hotelId
        });
    return result;
  }
  // static async hotelRating( hotelId ) {
  //   const result = await amadeus.eReputation.hotelSentiments.get(`/hotelRating/${hotelId}`);
  //   return result;
  // }

// ========= City-Hotel =====================
  static async hotelOffer( cityCode ) {
    const result = await  amadeus.shopping.hotelOffer.get({
        cityCode
        });
    return result;
  }
  // static async hotelOffer( cityCode ) {
  //   const result = await  amadeus.shopping.hotelOffer.get(`/hotelOfferAvailability/${cityCode}`);
  //   return result;
  // }

  // ============== hotel-offers ================ 
  static async hotelList( hotelId ) {
    const result = await amadeus.shopping.hotelOffersByHotel.get({
      hotelId
    });
    return result;
  }
  // static async hotelList( hotelId ) {
  //   const result = await amadeus.shopping.hotelOffersByHotel.get(`/hotelOffers/${hotelId}`);
  //   return result;
  // }

  static async hotelPointsOfInterest( latitude, longitude) {
    const result = await  amadeus.shopping.hotelOffer.get({
       latitude,
       longitude,
        });
    return result;
  }
  // static async hotelPointsOfInterest( latitude, longitude) {
  //   const result = await  amadeus.shopping.hotelOffer.get(`/pointsOfInterest/${latitude}/${longitude}`);
  //   return result;
  // }

}

export default AmadeusApi;

// module.exports = function (app) {
//   const amadeus = new Amadeus({
//     clientId: "56mG9WkqzcEq6mmMwm0OBCndfxTR7QDA",
//     clientSecret: "ueJ8RAc9HiSyRHVO",
//   });



//   // Flight Inspiration Search
//   app.get("/airport/:city", (req, res) => {
//     amadeus.referenceData.locations
//       .get({
//         keyword: req.params.city,
//         subType: Amadeus.location.any,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });
//   // Flight Inspiration Search
//   app.get("/flightDestinations/:city/:date/:nonstop?", (req, res) => {
//     amadeus.shopping.flightDestinations
//       .get({
//         origin: req.params.city,
//         departureDate: req.params.date,
//         nonStop: req.params.nonstop || false,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });
//   // Flight Cheapest Date Search
//   app.get("/cheapestDate/:originCity/:destinationCity", (req, res) => {
//     amadeus.shopping.flightDates
//       .get({
//         origin: req.params.originCity,
//         destination: req.params.destinationCity,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });
//   // Flight Low-fare Search
//   app.get("/lowFare/:originCity/:destinationCity/:date", (req, res) => {
//     amadeus.shopping.flightOffers
//       .get({
//         originLocationCode: req.params.originCity,
//         destinationLocationCode: req.params.destinationCity,
//         departureDate: req.params.date,
//       })
//       .then(function (response) {
//         console.log(response.data);
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });
//   // Flight Offers Search
//   app.get(
//     "/flights/:originCity/:destinationCity/:date/:adults/:nonstop?/",
//     (req, res) => {
//       amadeus.shopping.flightOffers
//         .get({
//           origin: req.params.originCity,
//           destination: req.params.destinationCity,
//           departureDate: req.params.date,
//           adults: req.params.adults,
//           max: 50,
//           nonStop: req.params.nonstop || false,
//         })
//         .then(function (response) {
//           res.send({ data: response.data });
//         })
//         .catch(function (responseError) {
//           console.log(responseError.code);
//           console.log(responseError);
//         });
//     }
//   );

//   app.get(
//     "/flightsround/:originCity/:destinationCity/:date/:endDate/:adults/:nonstop?",
//     (req, res) => {
//       amadeus.shopping.flightOffers
//         .get({
//           origin: req.params.originCity,
//           destination: req.params.destinationCity,
//           departureDate: req.params.date,
//           returnDate: req.params.endDate,
//           adults: req.params.adults,
//           max: 50,
//           nonStop: req.params.nonstop || false,
//         })
//         .then(function (response) {
//           res.send({ data: response.data });
//         })
//         .catch(function (responseError) {
//           console.log(responseError.code);
//           console.log(responseError);
//         });
//     }
//   );

//   // Flight Choice Prediction
//   app.get(
//     "/flightPrediction/:originCity/:destinationCity/:date",
//     (req, res) => {
//       amadeus.shopping.flightOffers
//         .get({
//           origin: req.params.originCity,
//           destination: req.params.destinationCity,
//           departureDate: req.params.date,
//         })
//         .then(function (response) {
//           return amadeus.shopping.flightOffers.prediction.post(
//             JSON.stringify(response.result)
//           );
//         })
//         .then(function (response) {
//           console.log(response.data);
//         })
//         .catch(function (responseError) {
//           console.log(responseError);
//         });
//     }
//   );
//   // Flight Checkin Links
//   app.get("/checkin/:airline", (req, res) => {
//     amadeus.referenceData.urls.checkinLinks
//       .get({
//         airlineCode: req.params.airline,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });

//   // Get list of hotels by city code
//   app.get("/hotels/:city/:checkInDate?/:checkOutDate?", (req, res) => {
//     let today = new Date();
//     let dd = String(today.getDate()).padStart(2, "0");
//     let dd2 = String(today.getDate() + 1).padStart(2, "0");
//     let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//     let yyyy = today.getFullYear();
//     amadeus.shopping.hotelOffers
//       .get({
//         cityCode: req.params.city,
//         checkInDate: req.params.checkInDate || `${yyyy}-${mm}-${dd}`,
//         checkOutDate: req.params.checkOutDate || `${yyyy}-${mm}-${dd2}`,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });

//   // Get list of offers for a specific hotel
//   app.get("/hotelOffers/:hotelId", (req, res) => {
//     amadeus.shopping.hotelOffersByHotel
//       .get({
//         hotelId: req.params.hotelId,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });

//   // Confirm the availability of a specific offer id
//   app.get("/hotelOfferAvailability/:hotelOffer", (req, res) => {
//     amadeus.shopping
//       .hotelOffer(req.params.hotelOffer)
//       .get()
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });

//   // Hotel Ratings
//   app.get("/hotelRating/:hotelId", (req, res) => {
//     amadeus.eReputation.hotelSentiments
//       .get({
//         hotelIds: req.params.hotelId,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });

//   // Points of Interest
//   app.get("/pointsOfInterest/:latitude/:longitude", (req, res) => {
//     amadeus.referenceData.locations.pointsOfInterest
//       .get({
//         latitude: req.params.latitude,
//         longitude: req.params.longitude,
//       })
//       .then(function (response) {
//         res.send({ data: response.data });
//       })
//       .catch(function (responseError) {
//         console.log(responseError.code);
//       });
//   });
// };

// router.get(`/hotel-offer`, async (req, res) => {
//   try {
//     const { offerId } = req.query;
//     const response = await amadeus.shopping.hotelOffer(offerId).get();
//     res.json(JSON.parse(response.body));
//   } catch (err) {
//     res.json(err);
//   }
// });

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