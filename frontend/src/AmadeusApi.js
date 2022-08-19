const Amadeus = require("amadeus");
require("dotenv").config();
// const { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } = require("dotenv").config();

const amadeus = new Amadeus({
  // clientId: AMADEUS_CLIENT_ID,
  // clientSecret: AMADEUS_CLIENT_SECRET,
  // clientId: process.env.AMADEUS_CLIENT_ID,
  // clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

class AmadeusApi {
  // static clientId = process.env.AMADEUS_CLIENT_ID;
  // static clientSecret = process.env.AMADEUS_CLIENT_SECRET;
  

  // ========= Trip Search ==========
  static async getTrip( originLocationCode, destinationLocationCode, departureDate, returnDate) {
    const result = await amadeus.travel.predictions.tripPurpose.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
    });
    return result;
  }
  
  // Flight Cheapest Date Search
  static async getFlightCheapestDate(origin, destination) {
    const result = amadeus.shopping.flightDates.get({
     origin,
     destination
     });
     return result;
   }

  //========= Airoport & City  the same below ----------------------------------------
    //  https://developers.amadeus.com/blog/airport-autocomplete-app-with-the-mern-stack 

  static async getAiportCity(keyword, subType, page) {
    // const result = await amadeus.client.get({
      const result = await amadeus.referenceData.locations.get({
      keyword,
      subType,
      page
    });
    return result;
  }

// ====== City search suggestions with Airport & City Search API   ----------------------------------------
// Flight Inspiration Search //citySearch
  static async getAirport(keyword, subType) {
    const result = await amadeus.referenceData.locations.get({
      keyword,
      subType,
    });
    return result;
  }

// ======== Flights ===== https://github.com/amadeus4dev/amadeus-node/blob/master/README.md
  static async getFlightAround( originLocationCode,
     destinationLocationCode, 
     departureDate, 
     returnDate, 
     adults,
    //  travelClass,
    //  nonStop,
     ) {
    const result = amadeus.shopping.flightOffersSearch.get({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    // travelClass,
    // nonStop,
   });
return result;
}

static async getFlightOneway( originLocationCode, destinationLocationCode, departureDate, adults) {
  const result = amadeus.shopping.flightOffersSearch.get({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults
});
return result;
}



  // Flight Cheapest Date Search
  static async cheapestFlightDate( origin, destination ) {
    const result = await amadeus.shopping.flightDates.get({
      origin,
      destination,
    });
    return result;
  }

  // Flight Low-fare Search
  static async flightLowFare( origin, destination, departureDate ) {
    const result = await amadeus.shopping.flightOffers.get({
      origin,
      destination,
      departureDate,
    });
    return result;
  }


 // Flight Choice Prediction
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

   // Flight Checkin Links
  static async flightCheckin( airlineCode ) {
    const result = await amadeus.referenceData.urls.checkinLinks.get({
      airlineCode
    });
    return result;
  }

  // ======= Hotel
  // Get list of hotels by city code ==== MIA
  static async getHotelByCity( cityCode, checkInDate, checkOutDate ) {
    const result = await amadeus.shopping.hotelOffers.get({
      cityCode,
      checkInDate,
      checkOutDate,
    });
    return result;
  }

  // Hotel Ratings
  static async hotelRating( hotelId ) {
    const result = await amadeus.eReputation.hotelSentiments.get({
          hotelId
        });
    return result;
  }

// ========= City-Hotel =====================
// Get list of offers for a specific hotel
  static async getOffers( cityCode ) {
    const result = await  amadeus.shopping.hotelOffer.get({
        cityCode
        });
    return result;
  }

  // ============== hotel-offers ================  
  // Get list of offers for a specific hotel
  static async hotelList( hotelId ) {
    const result = await amadeus.shopping.hotelOffersByHotel.get({
      hotelId
    });
    return result;
  }

  // Confirm the availability of a specific offer id
    static async hotelOffer( hotelOffer ) {
      const result = await  amadeus.shopping.hotelOffer.get({
          hotelOffer
          });
      return result;
    }
  // Points of Interest
  static async hotelPointsOfInterest( latitude, longitude) {
    const result = await  amadeus.shopping.hotelOffer.get({
       latitude,
       longitude,
        });
    return result;
  }

}

export default AmadeusApi;
