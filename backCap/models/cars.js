let cars = require('./carsModel')

let users = require('./userModle')

var axios = require("axios")
const e = require('express')

exports.orderCar =  async function (data){
  let options = {
    method: 'GET',
    url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search',
      // params: {location_pickup: data.location_pickup,
    //          date_time_return: data.date_time_return, 
    //          date_time_pickup: data.date_time_pickup, 
    //          location_return: data.location_return},
    params: {
      location_pickup: 'JFK',
      date_time_return: '2022-11-16 13:00:00',
      date_time_pickup: '2022-11-15 13:00:00',
      location_return: '1365100023'
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
       let order = new cars({
           description : obj.description,
           vehicleExample : obj.vehicleExample,
           peopleCapacity : obj.peopleCapacity,
           bagCapacity : obj.bagCapacity,
           airportName : obj.airportName,
           ratePlan : obj.ratePlan,
           dailyPrice : obj.dailyPrice,
           totalPrice : obj.totalPrice,
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




   exports.getDataCars =  async function (data){

    var options = {
        method: 'GET',
        url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations',
        params: {name: data.city},
        // params: {name: 'London'},
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
            url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search',
            // params: {location_pickup: data.location_pickup,
          //          date_time_return: data.date_time_return, 
          //          date_time_pickup: data.date_time_pickup, 
          //          location_return: data.location_return},
          params: {
            location_pickup: 'JFK',
            date_time_return: '2022-11-16 13:00:00',
            date_time_pickup: '2022-11-15 13:00:00',
            location_return: '1365100023'
          },
          headers: {
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
            'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
          }
      }
      let cars = await axios.request(query).then(function (response) {
        return response.data 
       }).catch(function (error) {
       return error;
      });
      return cars
      
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
