// import axios from "axios";
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 */

class Api {
  // the token for interactive with the API will be stored here.
  static token;

  static trip;

  static async backendRequest(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${Api.token}`};
    const params = (method === "get")
        ? data
        : {};
    
    const trips = {Add: `${Api.trip}`};

    try {
      return (await axios({ url, method, data, params, headers, trips })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes:
  //USER ------------------------------------- backendRequest
  static async signup(data) {
    let res = await this.backendRequest(`auth/register`, data, "post");
    return res.token;
  }

   static async login(data) { 
    let res = await this.backendRequest(`auth/token`, data, "post");
    return res.token;
  }
  
  static async getUserProfile(username) {
    let res = await this.backendRequest(`users/${username}`);
    return res.user;
  }

  static async saveProfile(username, data) {
    let res = await this.backendRequest(`users/${username}`, data, "patch");
    return res.user;
  }

  static async deleteUser(username){
      let res = await this.backendRequest(`users/${username}`, {}, "delete");
      return res.data;
  }

  // TRIP --------------------------------backendRequest
  // static async findTrip(id) {
  //   let res = await this.backendRequest(`trip/${id}`);
  //   return res.trip;
  // }

  static async addTrip(username) {
    let res = await this.backendRequest(`profile/${username}`);
    return res.trip;
  }

  static async addToTrip(tripDetails) {
    let res = await this.backendRequest(`mytrip/`, tripDetails, "post");
    return res.trip;
  }

  // static async updateTrip(id, tripDetails) {
  //   let res = await this.backendRequest(`trip/${id}`, tripDetails, "patch");
  //   return res.trip;
  // }

  //   static async deleteTrip(id) {
  //   let res = await this.backendRequest(`trip/${id}`, {}, "delete");
  //   return res.message;
  // }

  //   static async getByIds(ids) {
  //   const requests = ids.map((id) => {
  //     return this.backendRequest(`trip/${id}`);
  //   });
  //   return await Promise.all(requests);
  // }
  // static async deleteTrip(id, username) {
  //   let res = await this.backendRequest(`trip/${id}`, {username}, "delete");
  //   return res.message;
  // }

  //adding trips
  // static async addingFlight(tripId, flightId) {
  //   await this.backendRequest(`trip/${tripId}/flights/${flightId}`, {}, "post");
  // }
  // static async addingHotel(tripId, hotelId) {
  //   await this.backendRequest(`trip/${tripId}/hotels/${hotelId}`, {}, "post");
  // }

  static async addingFlight(username, id) {
    let res = await this.backendRequest(`users/${username}/flights/${id}`, {}, "put");
    return res.trip;
  }

  
  static async addingHotel(username, hotelId) {
    let res = await this.backendRequest(`users/${username}/hotels/${hotelId}`, {}, "put");
    return res.trip;
  }

  // Remove 
  // static async removeFlight(tripId, flightId) {
  //   let res = await this.backendRequest(`trip/${tripId}/flights/${flightId}`, {}, "delete");
  //   return res.message;
  // }

  // static async removeHotel(tripId, hotelId) {
  //   let res = await this.backendRequest(`trip/${tripId}/hotels/${hotelId}`, {}, "delete");
  //   return res.message;
  // }

  static async removeFlight(username, id) {
    const res = await this.backendRequest(
      `users/${username}/flights/${id}`,
      {},
      "delete"
    );
    return res.message;
  }
  static async removeHotel(username, hotelId) {
    const res = await this.backendRequest(
      `users/${username}/hotels/${hotelId}`,
      {},
      "delete"
    );
    return res.message;
  }

  // static async removeCar(tripId, carId) {
  //   let res = await this.backendRequest(`trip/${tripId}/cars/${carId}`, {}, "delete");
  //   return res.message;
  // }


  static async getFlightsByIds(ids) {
    const requests = ids.map((id) => {
      return this.backendRequest(`flights/${id}`);
    });
    return await Promise.all(requests);
  }

  static async getHotelsByIds(ids) {
    const requests = ids.map((hotelId) => {
      // <HotelCard key={hotelId.toString()} value={hotelId} />
      return this.backendRequest(`flights/${hotelId}`);
    });
    return await Promise.all(requests);
  }

  // updateFlightById: function(req, res) {
  //   db.Trip.findOneAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         flight: {
  //           flight_id: req.body.flight.id,
  //           flightSegments: req.body.flight.offerItems[0].services[0],
  //           price: req.body.flight.offerItems[0].price.total
  //         },
  //         returnFlight: {
  //           flight_id: req.body.flight.id,
  //           flightSegments: req.body.flight.offerItems[0].services[1],
  //           price: req.body.flight.offerItems[0].price.total
  //         }
  //       }
  //     },
  //     req.body
  //   )
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // updateHotelById: function(req, res) {
  //   db.Trip.findOneAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         hotel: {
  //           hotel_id: req.body.hotel.id,
  //           name: req.body.hotel.name,
  //           roomType: req.body.hotel.roomType,
  //           price: req.body.hotel.price,
  //           checkInDate: req.body.hotel.checkInDate,
  //           checkOutDate: req.body.hotel.checkOutDate,
  //           currency: req.body.hotel.currency
  //         }
  //       }
  //     },
  //     req.body
  //   )
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // updateByTripId: function(req, res) {
  //   db.Trip.findOneAndUpdate(
  //     { _id: req.params.tripId },
  //     { $set: { trip: req.body.trip } },
  //     { new: true }
  //   )
  //     .then(dbModel => {
  //      // console.log(dbModel);
  //       res.json(dbModel);
  //     })
  //     .catch(err => res.status(422).json(err));
  // }


}

export default Api;
