// import axios from "axios";
const axios = require("axios");

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// const CallKey = {
//   'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
//   // 'X-RapidAPI-Key': 'cd19130386msh64824a8945ce343p19eec8jsnf80a71237cdd'
//   // 'X-RapidAPI-Key': 'bb914ba11cmsha0c53dcc9e507bep1ae37bjsn71fe5461a057'
//   //  'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
// }

// const BASE_API_URL = 'https://priceline-com-provider.p.rapidapi.com/v1';
const BASE_API_URL = 'https://travel-advisor.p.rapidapi.com';
const CallKey = {
  // 'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52',
  // 'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
}

const Amadeus_url = 'test.api.amadeus.com/v1';
const AmadKey = {
  'API-Key': '56mG9WkqzcEq6mmMwm0OBCndfxTR7QDA',
  'API-Secret': 'ueJ8RAc9HiSyRHVO'
}


class Api {
  // the token for interactive with the API will be stored here.
  static token;

  static async backendRequest(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${Api.token}`};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async frontendRequest(endpoint, data = {}) {
    const url = `${BASE_API_URL}/${endpoint}`;
    try {
      return (
        await axios({
        method: "get",
        url,
        params: data,
        headers: CallKey,
      })
    ).data;
  } catch (err) {
    console.error("API Error:", err.response);
    let message = err.response.data.error.message;
    throw Array.isArray(message) ? message : [message];
  }
}


static async AmadeusRequest(endpoint, data = {}) {
  const url = `${Amadeus_url}/${endpoint}`;
  try {
    return (
      await axios({
      method: "get",
      url,
      params: data,
      headers: AmadKey,
    })
  ).data;
} catch (err) {
  console.error("API Error:", err.response);
  let message = err.response.data.error.message;
  throw Array.isArray(message) ? message : [message];
}
}

// GET /travel​/predictions​/trip-purpose Returns the forecast purpose of a trip
// https://developers.amadeus.com/self-service/category/trip/api-doc/trip-purpose-prediction/api-reference
static async getTripPurpose() {
  let res = await this.AmadeusRequest(`travel​/predictions​/trip-purpose`);
  return res.flights;
}


  // API routes:
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
  static async getTrip(tripId) {
    let res = await this.backendRequest(`trip/${tripId}`);
    return res.trip;
  }

  static async addTrip(tripDetails) {
    let res = await this.backendRequest(`trip/`, tripDetails, "post");
    return res.trip;
  }

  static async updateTrip(tripId, tripDetails) {
    let res = await this.backendRequest(`trip/${tripId}`, tripDetails, "patch");
    return res.trip;
  }

    static async deleteTrip(tripId) {
    let res = await this.backendRequest(`trip/${tripId}`, {}, "delete");
    return res.message;
  }
  // static async deleteTrip(id, username) {
  //   let res = await this.backendRequest(`trip/${id}`, {username}, "delete");
  //   return res.message;
  // }

  //add 
  static async addingFlight(tripId, flightId) {
    await this.backendRequest(`trip/${tripId}/flights/${flightId}`, {}, "post");
  }
  static async addingHotel(tripId, hotelId) {
    await this.backendRequest(`trip/${tripId}/hotels/${hotelId}`, {}, "post");
  }

  static async addingCar(tripId, carId) {
    await this.backendRequest(`trip/${tripId}/cars/${carId}}`, {}, "post");
  }

  // Remove 
  static async removeFlight(tripId, flightId) {
    let res = await this.backendRequest(`trip/${tripId}/flights/${flightId}`, {}, "delete");
    return res.message;
  }

  static async removeHotel(tripId, hotelId) {
    let res = await this.backendRequest(`trip/${tripId}/hotels/${hotelId}`, {}, "delete");
    return res.message;
  }

  static async removeCar(tripId, carId) {
    let res = await this.backendRequest(`trip/${tripId}/cars/${carId}`, {}, "delete");
    return res.message;
  }


  // static async getJobsByIds(ids) {
  //   const requests = ids.map((id) => {
  //     return this.request(`jobs/${id}`);
  //   });

  //   return await Promise.all(requests);
  // }


//API Priceline
static async getFlights() {
  let res = await this.frontendRequest(`flights/locations`);
  return res.flights;
}

static async getFilteredFlights(formData) {
  let res = await this.frontendRequest(`flights/search`, { formData });
  return res.flights;
}

static async orderFlight(flight_id) {
  let res = await this.frontendRequest(`flights/search/${flight_id}`);
  return res.flight_id;
}

static async getFlightsByIds(ids) {
  const requests = ids.map((id) => {
    return this.frontendRequest(`flights/${id}`);
  });
  return await Promise.all(requests);
}
  // static async getFlights(id) {
  //   try {
  //     const result = await axios.request(`${BASE_API_URL}/flights/locations`, { id }).then(function (response) {
  //       return response.data
  //   }).catch(function (err) {
  //     return err
  //   });
  //     console.log(result.data);
  //     // return result.flights;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
    // let result = await this.request("flights", { id });
    // return result.flights;
  // }

  // static async getFilteredFlights(id) {
  //   try {
  //     const result = await axios.request(`${BASE_API_URL}/flights/search`, { id }).then(function (response) {
  //       return response.data
  //   }).catch(function (err) {
  //     return err
  //   });
  //     console.log(result.data);
  //     // return result.flights;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // static async orderFlight(flight_id) {
  //   let res = await axios.request(`${BASE_API_URL}/flights/search/${flight_id}`);
  //   return res.flight_id;
  // }

  static async getHotels(id) {
    let res = await this.frontendRequest(`hotels/locations`, { id });
    return res.hotels;
  }
  
  static async getFilteredHotels(id) {
    let res = await this.frontendRequest(`hotels/search`, { id });
    return res.hotels;
  }
  
  static async orderHotel(hotel_id) {
    let res = await this.frontendRequest(`hotels/search/${hotel_id}`);
    return res.hotel_id;
  }

  static async bookInofoHotel(hotelName) {
    let res = await axios.frontendRequest(`hotels/booking-details/`, {hotelName});
    return res.hotel;
  }

  static async infoHotel(hotel_id) {
    let res = await axios.frontendRequest(`hotels/details/${hotel_id}`);
    return res.hotel_id;
  }
  
  static async getHotelsByIds(ids) {
    const requests = ids.map((id) => {
      return this.frontendRequest(`hotels/${id}`);
    });
    return await Promise.all(requests);
  }

  // static async getHotels(id) {
  //   try {
  //     const result = await axios.request(`${BASE_API_URL}/hotels/locations`, { id }).then(function (response) {
  //       return response.data
  //   }).catch(function (err) {
  //     return err
  //   });
  //     console.log(result.data);
  //     // return result.flights;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // static async getFilteredHotels(id) {
  //   try {
  //     const result = await axios.request(`${BASE_API_URL}/hotels/search`, { id }).then(function (response) {
  //       return response.data
  //   }).catch(function (err) {
  //     return err
  //   });
  //     console.log(result.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  // static async orderHotel(hotelName) {
  //   let res = await axios.request(`${BASE_API_URL}/hotels/booking-details/`, {hotelName});
  //   return res.hotel_id;
  // }

  // static async infoHotel(hotel_id) {
  //   let res = await axios.request(`${BASE_API_URL}/hotels/details/${hotel_id}`);
  //   return res.hotel_id;
  // }

  static async getCars(id) {
    let res = await this.frontendRequest(`cars-rentals/locations`, { id });
    return res.cars;
  }
  
  static async getFilteredCars(id) {
    let res = await this.frontendRequest(`cars-rentals/search`, { id });
    return res.flights;
  }
  
  static async orderCar(car_id) {
    let res = await this.frontendRequest(`cars-rentals/search/${car_id}`);
    return res.car_id;
  }
  
  static async getCarsByIds(ids) {
    const requests = ids.map((id) => {
      return this.frontendRequest(`cars/${id}`);
    });
    return await Promise.all(requests);
  }

  // static async getCars(id) {
  //   try {
  //     const result = await axios.request(`${BASE_API_URL}/cars-rentals/locations`, { id }).then(function (response) {
  //       return response.data
  //   }).catch(function (err) {
  //     return err
  //   });
  //     console.log(result.data);
  //     // return result.flights;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // static async getFilteredCars(id) {
  //   try {
  //     const result = await axios.request(`${BASE_API_URL}/cars-rentals/search`, { id }).then(function (response) {
  //       return response.data
  //   }).catch(function (err) {
  //     return err
  //   });
  //     console.log(result.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


}

export default Api;
