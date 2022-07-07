import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Homepage from "../homepage/Homepage"

import FlightDetail from "../flights/FlightDetail"
// import HotelDetail from "../hotels/HotelDetail"
import HotelCard from "../hotels/HotelCard"
// // import CarrentalDetail from "../carsrental/CarrentalDetail"
// import CarCard from "../carsrental/CarCard"

// import FlightsList from "../flights/FlightsList"
// import HotelsList from "../hotels/HotelsList"
import AddHotel from "../hotels/AddHotel"
import AddFlight from "../flights/AddFlight"
// import CarsrentalList from "../carsrental/CarsrentalList"

import SearchTrip from "../trip/SearchTrip"

// import SearchFlights from "../flights/SearchFlights"
// import SearchHotels from "../hotels/SearchHotels"
// import SearchCars from "../carsrental/SearchCars"

import SignupForm from "../auth/SignupForm"
import LoginForm from "../auth/LoginForm"
import ProfileForm from "../auth/ProfileForm"
import MyTrip from "../auth/MyTrip"
import UserPage from "../auth/UserPage"

import UserContext from "../auth/UserContext"
import WeatherPage from "../WeatherPage/WeatherPage";


import TravelSearch from "../flights/TravelSearch";
import HotelSearchPage from "../hotels/HotelSearchPage";

const Routes = ({ login, signup, updateUser }) => {
  const { isLoggedIn } = useContext(UserContext);

  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Switch>
        {isLoggedIn
                ? (<>
          <Route exact path="/">
            <Homepage />
          </Route>
          {/* <Route exact path="/flights"> */}
            {/* < AddFlight /> */}
            {/* <FlightsList /> */}
            {/* <SearchFlights /> */}
            <Route
              path="/flightSearchPage"
              render={() => (
                <TravelSearch
                  // user={this.state.userId}
                  // trip={this.state.tripID}
                />
              )}>
          </Route>
          <Route exact path="/flights/:id">
            <FlightDetail />
          </Route>
          {/* <Route exact path="/hotels">
            <AddHotel /> */}
            {/* <HotelsList /> */}
            {/* <SearchHotels /> */}
            <Route
              path="/hotelSearchPage"
              render={() => (
                <HotelSearchPage
                  user={this.state.userId}
                  trip={this.state.tripID}
                />
              )}>
          </Route>
          <Route exact path="/hotels/:id">
            {/* <HotelDetail /> */}
            <HotelCard />
          </Route>
          {/* <Route exact path="/cars">
            <CarsrentalList /> 
           <SearchCars /> 
          </Route> */}
          {/* <Route exact path="/cars/:id">
            <CarrentalDetail /> 
             <CarCard /> 
           </Route> */}
          <Route exact path="/searchTrip">
            <SearchTrip />
          </Route>
          <Route path="/profile">
            <UserPage />
          </Route>
          <Route path="/update">
              <ProfileForm updateUser={updateUser} />
            </Route>
         <Route path="/mytrip">
            <MyTrip />
          </Route> 
          <Route path="/weather" component={WeatherPage} />
          <Redirect to="/" /> 

          </>) : (<>

          <Route exact path="/flights">
            {/* <FlightsList /> */}
            < AddFlight />
          </Route>
          <Route exact path="/flight/:id">
            <FlightDetail />
          </Route>
          <Route exact path="/hotels">
            <AddHotel />
            {/* <HotelsList /> */}
          </Route>
          <Route exact path="/hotel/:id">
            {/* <HotelDetail /> */}
            <HotelCard />
          </Route>
          <Route exact path="/searchTrip">
            <SearchTrip />
          </Route>
          {/* <Route exact path="/cars">
            <CarsrentalList />
          </Route> */}
          {/*  <Route exact path="/car/:id">
             <CarrentalDetail /> 
            <CarCard />
          </Route> */}
          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/weather" component={WeatherPage} />
          <Redirect to="/" />
          </>)
            }
        </Switch>
      </div>
  );
}

export default Routes;
