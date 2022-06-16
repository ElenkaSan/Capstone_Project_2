const e = require('express');
const express = require('express');


const carsBL = require('../models/cars');

const router = express.Router();

// router.get("/", (req, res) => {
//   return res.status(200).send("Hello World");
// });

router.route("/get-cars")
  .get(async function(req,res) {
  try {
    res
      .status(200)
      .set("Content-Type", "application/javascript")
      .json({description: "Elantra"});
  } catch (e) {
    console.error(e);
  }
});

router.route('/cars')
    .get(async function(req,resp)
    {
        let data = req.query
        result = await carsBL.getDataCars(data); 
          return resp.json(result)
           
    })


router.route('/ordercar')
   .get(async function(req,resp)
   {
    let data = req.query
    console.log("2")
    result = await carsBL.orderCar(data);
    return resp.json(result)
})

 router.route('/getFullDetailsByEmail/:email')
    .get(async function(req,resp)
    {
        
        let email = req.params.email
        let User = await carsBL.getDataUserByEmail(email)
        return resp.json(User[0])
    })

    router.route('/saveorder')
    .post(async function(req,resp)
    {
        let data = req.body
        console.log(data)
        result = await carsBL.saveDataInDb(data);
        return resp.json(result)
    })


    router.route('/createUser')
    .post(async function(req,resp)
    {
      let data = req.body
      let UserExist = await carsBL.getDataUserByEmail(data.email)
      if(UserExist.length == 0){
        result = await hotelsBL.saveUserInDb(data);
        return resp.json(result)
      }
      else{
        return resp.json("user email already exist")
      }
    })

    router.route('/getOrdersByEmail/:email')
    .get(async function(req,resp){
       OrdersByUser = await carsBL.checkHotelsByUser(req.params);
      if(OrdersByUser.length > 0){
        return resp.json(OrdersByUser)
      }
    })


    router.route('/UserExistInDb')
    .post(async function(req,resp)
    {
        let data = req.body
        resultUser = await carsBL.checkExistingUser(data);
        if(resultUser.length > 0){
          console.log(resultUser)
            resultHotels = await carsBL.checkHotelsByUser(resultUser[0]);
            console.log(resultHotels)
              if(resultHotels.length > 0){
                return resp.json(resultHotels)
              }
              else{
                return resp.json("not existing orders for this user")
              }
            }
            else{
            return resp.json("user not exist")
            }
    })

module.exports = router;