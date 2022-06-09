let hotels = require('./hotelsModle')

let users = require('./userModle')

var axios = require("axios")
const e = require('express')



exports.orderHotel =  async function (data){
  let options = {
    method: 'GET',
    url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/booking-details',
    // params: {date_checkout: data.checkout,
    //          date_checkin: data.checkin, 
    //          hotel_id: data.id, 
    //          rooms_number: data.rooms_number},
     params: {
      date_checkout: '2022-11-16',
      date_checkin: '2022-11-15',
      hotel_id: '6733503',
      rooms_number: '1'
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
       let order = new hotels({
           hotelName : obj.name,
           checkin : obj.checkin,
           numberOfGuests : obj.numberOfGuests,
           checkout : obj.checkout,
           price : obj.totalprice,
           description : obj. description,
           reviews : obj.star_rating_ids,
           logo_url : obj.photo,
           roomcount : obj.roomcount,
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




   exports.getDataHotels =  async function (data){

    var options = {
        method: 'GET',
        url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations',
        params: {name: data.city , search_type: 'ALL'},
        // params: {name: 'Berlin', search_type: 'ALL'},
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
           method: 'GET',
           url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
          //  params: {
          //    date_checkin: data.checkin,
          //    date_checkout: data.checkout,
          //    location_id: data.location_id,
          //    sort_order : "HDR",
          //    star_rating_ids: data.star_rating_ids,
          //    rooms_number: data.rooms_number,
          //    amenities_ids: data.amenities_ids
          //  },
          params: {
            sort_order: 'HDR',
            location_id: '3000035821',
            date_checkout: '2022-11-16',
            date_checkin: '2022-11-15',
            star_rating_ids: '3.0,3.5,4.0,4.5,5.0',
            rooms_number: '1',
            amenities_ids: 'FINTRNT,FBRKFST'
          },
           headers: {
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
            'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
          }
      }
      let hotels = await axios.request(query).then(function (response) {
        return response.data 
       }).catch(function (error) {
       return error;
      });
      return hotels
      
      }
    }

    // const options2 = {
    //     method: 'GET',
    //     url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations-by-geo',
    //     params: {longitude: '14.418540', latitude: '50.073658'},
    //     headers: {
    //       'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
    //       'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
    //     }
    //   };
      
    //   axios.request(options2).then(function (response) {
    //       console.log(response.data);
    //   }).catch(function (error) {
    //       console.error(error);
    //   });

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


// let hotels = require('./hotelsModle')

// let users = require('./userModle')

// var axios = require("axios")
// const e = require('express')

// exports.orderHotel =  async function (data){
//   var options = {
//     method: 'GET',
//     url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/booking-details',
//     params: {date_checkout: data.checkout, date_checkin: data.checkin ,hotel_id: data.id},
//     headers: {
//       'x-rapidapi-host': 'priceline-com-provider.p.rapidapi.com',
//       'x-rapidapi-key': '961cc71ab4msh1b30d248549dd7fp1c06fajsn4ee0aa5cfc23'
//     }
//   };
  
//   let Details = await axios.request(options).then(function (response) {
//     return response.data
//   }).catch(function (error) {
//     console.error(error);
//   });

//   return Details

// }

// exports.saveUserInDb = async function(obj){
//   return new Promise((resolve, reject) =>
//   {
//      let user = new users({
//          fname : obj.fname,
//          lname : obj.lname,
//          email : obj.email,
//          password : obj.password
//      });

//      user.save(function(err)
//      {
//          if(err)
//          {
//              reject(err);
//          }
//          else
//          {
//           resolve("created")
//          }
//      })
//   });
// }

//   exports.saveDataInDb = async function(obj){
//     return new Promise((resolve, reject) =>
//     {
//        let order = new hotels({
//            hotelName : obj.name,
//            checkin : obj.checkin,
//            numberOfGuests : obj.numberOfGuests,
//            checkout : obj.checkout,
//            price : obj.totalprice,
//            roomcount : obj.roomcount,
//            fname : obj.detailsPerson.fname,
//            lname : obj.detailsPerson.lname,
//            email : obj.detailsPerson.email
//        });

//        order.save(function(err)
//        {
//            if(err)
//            {
//                reject(err);
//            }
//            else
//            {
//             resolve(obj)
//            }
//        })
//     });
//   }




//    exports.getDataHotels =  async function (data){

//     var options = {
//         method: 'GET',
//         url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations',
//         params: {name: data.city , search_type: 'ALL'},
//         headers: {
//           'x-rapidapi-host': 'priceline-com-provider.p.rapidapi.com',
//           'x-rapidapi-key': '961cc71ab4msh1b30d248549dd7fp1c06fajsn4ee0aa5cfc23'
//         }
//       };

//     let locations = await axios.request(options).then(function (response) {
//            return response.data
//     }).catch(function (err) {
//       return err
//     });
//     let country = data.country
//     // .toUpperCase()
//     let location = locations
//     // .find(x => country == x.country);

//       if(location == undefined){
//         return "error"
//       }
//       else {
//         let location_id = location.cityID
//         let query = {
//            method: 'GET',
//            url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
//            params: {
//              date_checkin:data.checkin ,
//              date_checkout :data.checkout ,
//              location_id: location_id,
//              sort_order : "HDR"
//            },
//            headers: {
//              'x-rapidapi-host': 'priceline-com-provider.p.rapidapi.com',
//              'x-rapidapi-key': '961cc71ab4msh1b30d248549dd7fp1c06fajsn4ee0aa5cfc23'
//            }
//       }
//       let hotels = await axios.request(query).then(function (response) {
//         return response.data 
//        }).catch(function (error) {
//        return error;
//       });
//       return hotels
      
//       }
     
 
//    }

//    exports.getDataUserByEmail =  function (email){
//     return new Promise((resolve, reject) =>
//       users.find({email : email }, function(err,data){
//         if(err){
//            reject(err)
//         }
//         else{
//            resolve(data)
//         }
//      }) )
//   }

//   exports.capitalizeFirstLetter = function(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }


//    exports.checkExistingUser =  function (user){
//     return new Promise((resolve, reject) =>
//       users.find({email : user.email , password : user.password}, function(err,data){
//         if(err){
//            reject(err)
//         }
//         else{
//            resolve(data)
//         }
//      }) )
//   }


//    exports.checkHotelsByUser =  function (user){
//      console.log(user.email)
//    return new Promise((resolve, reject) =>
//     hotels.find({email : user.email}, function(err,data){
//        if(err){
//           reject(err)
//        }
//        else{
//           resolve(data)
//        }
//     }) )
//  }

