import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const CallKey = {
  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
  'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
}

// const Base_URL =  process.env.REACT_APP_BASE_URL || 'https://priceline-com-provider.p.rapidapi.com/v1'
const Base_URL = {
  method: 'GET',
     url: 'https://priceline-com-provider.p.rapidapi.com/v1',
     params: {},
     headers: CallKey
};

// const Base_Flight_URL = {
//   method: 'GET',
//      url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights',
//      params: {},
//      headers: Call
// };
// const Base_Hotel_URL = {
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels',
//   params: {},
//   headers: Call
// }
// const Base_Car_URL  ={
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals',
//   params: {},
//   headers: Call
// }

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class Api {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    
    const url = `${BASE_URL}/${endpoint}`;
    // const url1 = `${Base_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${Api.token}` };
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

  // API routes:

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

   static async login(data) { 
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }
  
  static async getUserProfile(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async deleteUser(username){
      let res = await this.request(`users/${username}`, {}, "delete");
      return res.data;
  }

  static async getFlights(id) {
    try {
      const result = await axios.request(`${Base_URL}/flights/locations`, { id }).then(function (response) {
        return response.data
    }).catch(function (err) {
      return err
    });
      console.log(result.data);
      // return result.flights;
    } catch (error) {
      console.error(error);
    }
  }
    // let result = await this.request("flights", { id });
    // return result.flights;
  // }

  static async getFilteredFlights(id) {
    try {
      const result = await axios.request(`${Base_URL}/flights/search`, { id }).then(function (response) {
        return response.data
    }).catch(function (err) {
      return err
    });
      console.log(result.data);
      // return result.flights;
    } catch (error) {
      console.error(error);
    }
  }

  static async orderFlight(flight_id) {
    let res = await axios.request(`${Base_URL}/flights/search/${flight_id}`);
    return res.flight_id;
  }

  static async getHotels(id) {
    try {
      const result = await axios.request(`${Base_URL}/hotels/locations`, { id }).then(function (response) {
        return response.data
    }).catch(function (err) {
      return err
    });
      console.log(result.data);
      // return result.flights;
    } catch (error) {
      console.error(error);
    }
  }

  static async getFilteredHotels(id) {
    try {
      const result = await axios.request(`${Base_URL}/hotels/search`, { id }).then(function (response) {
        return response.data
    }).catch(function (err) {
      return err
    });
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  static async orderHotel(hotelName) {
    let res = await axios.request(`${Base_URL}/hotels/booking-details/`, {hotelName});
    return res.hotel_id;
  }

  static async infoHotel(hotel_id) {
    let res = await axios.request(`${Base_URL}/hotels/details/${hotel_id}`);
    return res.hotel_id;
  }

  static async getCars(id) {
    try {
      const result = await axios.request(`${Base_URL}/cars-rentals/locations`, { id }).then(function (response) {
        return response.data
    }).catch(function (err) {
      return err
    });
      console.log(result.data);
      // return result.flights;
    } catch (error) {
      console.error(error);
    }
  }

  static async getFilteredCars(id) {
    try {
      const result = await axios.request(`${Base_URL}/cars-rentals/search`, { id }).then(function (response) {
        return response.data
    }).catch(function (err) {
      return err
    });
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getTrip(tripName) {
    let res = await this.request("trip/", { tripName });
    return res.jobs;
  }

    static async deleteTrip(id, username) {
    let res = await this.request(`trip/${id}`, {username}, "delete");
    return res.message;
  }

  static async addingFlight(trip_id, id) {
    await this.request(`trip/${trip_id}/flights/${id}`, {}, "post");
  }
  static async addingHotel(trip_id, id) {
    await this.request(`trip/${trip_id}/hotels/${id}`, {}, "post");
  }

  static async addingCar(trip_id, id) {
    await this.request(`trip/${trip_id}/cars/${id}`, {}, "post");
  }


  static async removeFlight(trip_id, id) {
    let res = await this.request(`trip/${trip_id}/flights/${id}`, {}, "post");
    return res.message;
  }

  static async removeHotel(hotel_id, id) {
    let res = await this.request(`trip/${hotel_id}/flights/${id}`, {}, "post");
    return res.message;
  }

  static async removeCar(car_id, id) {
    let res = await this.request(`trip/${car_id}/flights/${id}`, {}, "post");
    return res.message;
  }


  // static async getJobsByIds(ids) {
  //   const requests = ids.map((id) => {
  //     return this.request(`jobs/${id}`);
  //   });

  //   return await Promise.all(requests);
  // }



}

export default Api;
