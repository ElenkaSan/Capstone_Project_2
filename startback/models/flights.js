let flights = require('./flightsModel')

let users = require('./userModle')

var axios = require("axios")
const e = require('express')

exports.orderFlight =  async function (data){
    let options = {
      method: 'GET',
      url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/search',
           // params: {itinerary_type: data.itinerary_type,
           //          dclass_type: data.class_type, 
           //          location_arrival: data. location_arrival, 
           //          date_departure: data.date_departure,
           //          location_departure: data.location_departure,
            //         sort_order: data.sort_order,
            //         price_max: data.price_max,
            //         number_of_passengers: data. number_of_passengers,
            //         duration_max: data.duration_max,
            //         price_min: data.price_min,
            //         date_departure_return: data.date_departure_return,
           // },
      params: {
        itinerary_type: 'ROUND_TRIP',
        class_type: 'ECO',
        location_arrival: 'RIO',
        date_departure: '2022-11-15',
        location_departure: 'LIS',
        sort_order: 'PRICE',
        price_max: '20000',
        number_of_passengers: '1',
        duration_max: '2051',
        price_min: '100',
        date_departure_return: '2022-11-16'
    },
    headers: {
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
      }
    };

    let Details = await axios.request(options).then(function (response) {
        return response.data
      }).catch(function (error) {
        console.error(error.response)
         // Do something with response error
        // if (error.response.status === 401) {
        //     console.log('unauthorized, logging out ...');
        //     auth.logout();
        //     router.replace('/auth/login');
        // }
        // return Promise.reject(error.response);
      });
    
      return Details
    }    

    exports.saveUserInDb = async function(obj){
        return new Promise((resolve, reject) =>
        {
           let user = new users({
               username : obj.username,
               first_name : obj.first_name,
               last_name : obj.last_name,
               email : obj.email,
               password : obj.password,
               note : obj.note
           });
      
           user.save(function(err)
           {
               if(err)
               {
                   reject(err);
               }
               else
               {
                resolve("created")
               }
           })
        });
      }
      
        exports.saveDataInDb = async function(obj){
          return new Promise((resolve, reject) =>
          {
             let order = new flights({
                 flightType : obj.flightType,
                 classType : obj.classType,
                 arrival : obj.parrival,
                 dateDeparture : obj.dateDeparture,
                 departure : obj.departure,
                 sortOrder : obj.sortOrder,
                 stops : obj.stops,
                 priceMax : obj.priceMax,
                 passengers: obj.passengers,
                 durationMax: obj.durationMax,
                 priceMin: obj.priceMin,
                 dateDepartureBack: obj.dateDepartureBack,
                 fname : obj.detailsPerson.fname,
                 lname : obj.detailsPerson.lname,
                 email : obj.detailsPerson.email
             });
      
             order.save(function(err)
             {
                 if(err)
                 {
                     reject(err);
                 }
                 else
                 {
                  resolve(obj)
                 }
             })
          });
        }

 exports.getDataFlights =  async function (data){

    var options = {
        method: 'GET',
            url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/locations',
           params: {name: data.value},
         //   params: {name: 'Los'},
      headers: {
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
      }
    };

    let locations = await axios.request(options).then(function (response) {
           return response.data
    }).catch(function (err) {
      return err
    });
    let country = data.country
    // .toUpperCase()
    let location = locations
    // .find(x => country == x.country);

      if(location == undefined){
        return "error"
      }
      else {
        let location_id = location.cityID
        let query = {
             url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/search',
           // params: {itinerary_type: data.itinerary_type,
           //          dclass_type: data.class_type, 
           //          location_arrival: data. location_arrival, 
           //          date_departure: data.date_departure,
           //          location_departure: data.location_departure,
            //         sort_order: data.sort_order,
            //         price_max: data.price_max,
            //         number_of_passengers: data. number_of_passengers,
            //         duration_max: data.duration_max,
            //         price_min: data.price_min,
            //         date_departure_return: data.date_departure_return,
           // },
      params: {
        itinerary_type: 'ROUND_TRIP',
        class_type: 'ECO',
        location_arrival: 'RIO',
        date_departure: '2022-11-15',
        location_departure: 'LIS',
        sort_order: 'PRICE',
        price_max: '20000',
        number_of_passengers: '1',
        duration_max: '2051',
        price_min: '100',
        date_departure_return: '2022-11-16'
    },
    headers: {
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
      }
      }

      let flights = await axios.request(query).then(function (response) {
        return response.data 
       }).catch(function (error) {
       return error;
      });
      return flights
      
      }
    }

   exports.getDataUserByEmail =  function (email){
    return new Promise((resolve, reject) =>
      users.find({email : email }, function(err,data){
        if(err){
           reject(err)
        }
        else{
           resolve(data)
        }
     }) )
  }

  exports.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


   exports.checkExistingUser =  function (user){
    return new Promise((resolve, reject) =>
      users.find({email : user.email , password : user.password}, function(err,data){
        if(err){
           reject(err)
        }
        else{
           resolve(data)
        }
     }) )
  }


   exports.checkHotelsByUser =  function (user){
     console.log(user.email)
   return new Promise((resolve, reject) =>
    hotels.find({email : user.email}, function(err,data){
       if(err){
          reject(err)
       }
       else{
          resolve(data)
       }
    }) )
 }


// function searchCity(value){
//     const options = {
//       method: 'GET',
//       url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/locations',
//       params: {name: value},
//     //   params: {name: 'Los'},
//       headers: {
//         'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
//         'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
//       }
//     };
    
//     axios.request(options).then(function (response) {
//         return response.data;
//     }).catch(function (error) {
//         console.error(error);
//     });

// }

// async function searchFlight(){
//     const axios = require("axios");

// const options = {
//     method: 'GET',
//     url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/search',
//     params: {
//         itinerary_type: 'ROUND_TRIP',
//         class_type: 'ECO',
//         location_arrival: 'RIO',
//         date_departure: '2022-11-15',
//         location_departure: 'LIS',
//         sort_order: 'PRICE',
//         price_max: '20000',
//         number_of_passengers: '1',
//         duration_max: '2051',
//         price_min: '100',
//         date_departure_return: '2022-11-16'
//     },
//     headers: {
//         'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
//         'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
//       }
//     };

//     await axios.request(options).then( (response) => {
//         console.log(response.data)
//         return response.data
//     }).catch(function (error) {
//         console.error(error);
//     });
// }

// const flightData = {
//     searchCity,
//     searchFlight
// }

// export default flightData;