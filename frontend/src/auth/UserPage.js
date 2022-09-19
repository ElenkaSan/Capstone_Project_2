import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from 'reactstrap';
import UserContext from "../auth/UserContext";
// import Api from "../api";
// import ProfileForm from "../auth/ProfileForm"
import { 
  // BsArrow90DegUp,
   BsPencilSquare }  from "react-icons/bs";
import { BiHomeHeart } from "react-icons/bi";
import WeatherPage from "../WeatherPage/WeatherPage";
import CountDown from "../tripPage/CountDown";
import Api from "../api";
import FlightDetail from "../flights/FlightDetail";
import useToggle from "../hooks/useToggle";
import ProfileForm from "./ProfileForm";
import HotelDetail from "../hotels/HotelDetail";
// import './UserPage.css';
// import Axios from "axios";
// const axios = require("axios");


//Profile UserPage shows the user's information that is saved in the backend.
//It also shows the flights / hotels that they have saved to if any. 
//The data is updated upon new flights / hotels being added throughout the app. 
//The user can also choose to update their profile here.


// const UserPage = (props) => {
  const UserPage = (props, updateUser, flights, hotels) => {
    const { isLoggedIn,  applicationIds } = useContext(UserContext);
    const [fly, setFly] = useState([]);
    const [hot, setHot] = useState([]);
    const [profile, setProfile] = useState({});
    const [isUpdate, setIsUpdate] = useToggle(false);

    const [tripId, setTripId] = useState(props.trip);
    
    // const [trips, setTrip] = useState([]);
    // const trip = props.flight.id;
    // const [tripId, setTripId] = useState(true);

    // useEffect(() => {
    //   setTripId(props.flight.id);
    //   setTripId(props.hotel.hotelId)
    // }, [props.trip, tripId]);  

    //upon load, the app will get the flights / hotels on the user global profile and add the flight / hotel information to display.
    useEffect(
      function () {
        async function getProfile() {
            try {
                let data = await Api.getUserProfile(isLoggedIn.username)
                setProfile(data);
                // setTripId(tripId)
                const flights = [...applicationIds];
                console.log(flights);
                if (flights.length > 0) { 
                  const flightDetails = (await Api.getFlightsByIds(flights)).map((f) => f.flight);
                  // const flightDetails = await (Api.addingFlight(flights)).map((f) => f.flight);
                  setFly(() => flightDetails);
                  // setProfile(flightDetails.map(a => a));
                } 
                // else {
                //   setFly([]);
                // } 
                const hotels = [...applicationIds];
                console.log(hotels);
                if (hotels.length > 0) { 
                  const hotelDetails = (await Api.getHotelsByIds(hotels)).map((h) => h.hotel);
                  // const hotelDetails = await (Api.addingHotel(hotels)).map((h) => h.hotel);
                  setHot(() => hotelDetails);
                  // setProfile(hotelDetails.map(a => a));
                } 
                else {
                  setFly([]);
                  setHot([]);
                }       
              } catch (e) {
                console.log(e);
            } 
        }
        getProfile();
  }, [isLoggedIn, applicationIds, tripId]);

  // useEffect(() => {
  //   setTripId(props.trip);

  //   if (props.trip) {
  //     Axios.get(`/getdate/${props.trip}`).then(res => {
  //       let tripdata = [];
  //       if (res.data.trip) {
  //         res.data.trip.forEach(() => {
  //           tripdata = tripdata.concat(res.data.trip);
  //         });
  //       }
  //     });
  //   }
  // }, [props.trip, tripId]);

    return (
      <section className="container">
         {/* <section className="Home justify-content-center" style={{ margin: '10px'}}> */}
          {/* <Card className="J card col-md-8 offset-md-2 text-center"> */}
          <Card className="J card text-center">
            <CardBody className="text-left">
              <div className="row">
                <div className="d-inline">
                  <h2 className="T display-6 font-weight-bold text-warning"> {`${isLoggedIn.username}`} </h2>
                  <div className="m-0">
                  <Link to="/update" type="ProfileForm"> 
                    <Button className="btn btn-lg btn-outline-info"> <BsPencilSquare /> 
                       {/* Update Profile  */}
                    </Button>
                  </Link>
                  <Link to='/' type="Home">
                    <Button className="btn btn-lg btn-outline-warning float-right"> <BiHomeHeart />
                    </Button>
                  </Link>
                  </div> 
                </div>
              </div>
              <hr/>
              <div className="Home row text-left">
               <div className="col-7">  <h4 className="lead T text-warning font-weight-bold"> Full name: {`${isLoggedIn.firstName} ${isLoggedIn.lastName}`}</h4>
                 <h4 className="lead T text-light font-weight-bold">EMAIL: {`${isLoggedIn.email}`}</h4>
                 <h4 className="lead T text-warning font-weight-bold">My travel notes: </h4>
                 <p className="card font-italic p-2">{`${isLoggedIn.notes}`}</p> 
                 <CountDown 
                //  findTripByUser={findTripByUser}
                 tripId={tripId}
                  />
                  {/* <CdTimerComp /> */}
                 </div>
              
                  {isUpdate
                ? <ProfileForm 
                updateUser={updateUser} 
                setProfile={setProfile} 
                setIsUpdate={setIsUpdate}
                />
                : (<>
               <div className="col">
                 <h4 className="lead text-right font-weight-bold">
                 {/* { false */}
                 {fly && fly.length
                     ? (
                      <p className="card bg-warning font-weight-bold text-center p-2">
                 Sorry, you do not have any saved trips!</p>
                      //  "" 
                    ) : ((
                      <section> 
                      <h5 className="text-dark">
                      {fly.map((flight) => 
                  (<FlightDetail 
                      key={flight.id} flight={flight} 
                      // resetFlight={resetFlight}
                    />
                    ) && (<Link className="text-warning" to="/mytrip" type="MyTrip"> 
                    Total Flights: {`${fly.length}`}
                   </Link> ))
                  } </h5>
                  </section>
                  ) && 
                  ( <section> 
                    <h5 className="text-dark">
                    {hot.map((hotel) => 
                (<HotelDetail
                  // HotelCard 
                  key={hotel.hotel.hotelId} hotel={hotel} 
                  />) && (<Link className="text-warning" to="/mytrip" type="MyTrip"> 
                  Total Hotels: {`${hot.length}`}
                 </Link> ))
                } </h5>
                </section>
                )
                  )
                  } 
                  </h4>
                  ({hot.length && fly.length ? 
                 (<Link className="text-warning" to="/mytrip" type="MyTrip"> 
                  Total Trips: {`${fly.length}`} {`${hot.length}`}
                 </Link> ) : ( <p className="card bg-warning font-weight-bold text-center p-2">
                 Sorry, you do not have any saved trips!</p>)})
                 </div>
                 </>) }
             </div>
            </CardBody>
          </Card>
        <br></br>
      <hr></hr>
      <br></br>
      <WeatherPage />
      <br></br>
        </section>
    )
}

export default UserPage;