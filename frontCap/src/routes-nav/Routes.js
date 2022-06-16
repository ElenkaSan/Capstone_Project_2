import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Homepage from "../homepage/Homepage"
// import CompanyList from "../companies/CompanyList";
// import JobCardList from "../jobs/JobCardList";
// import CompanyDetail from "../companies/CompanyDetail";
import FlightDetail from "../flights/FlightDetail"
import HotelDetail from "../hotels/HotelDetail"
import CarrentalDetail from "../carsrental/CarrentalDetail"
import FlightsList from "../flights/FlightsList"
import HotelsList from "../hotels/HotelsList"
import CarsrentalList from "../carsrental/CarsrentalList"

import SearchFlights from "../flights/SearchFlights"
import SearchHotels from "../hotels/SearchHotels"
import SearchCars from "../carsrental/SearchCars"
import LoginForm from "../auth/LoginForm"
import ProfileForm from "../auth/ProfileForm"
import MyTrip from "../auth/MyTrip"
import SignupForm from "../auth/SignupForm"
import UserContext from "../auth/UserContext"

// import Checkout from './Checkout'

const Routes = ({ login, signup }) => {
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
          {/* <Route exact path="/companies">
            <CompanyList />
          </Route> */}
          <Route exact path="/flights">
            {/* <FlightsList /> */}
            <SearchFlights />
          </Route>
          <Route exact path="/flights/:id">
            <FlightDetail />
          </Route>
          {/* 
          <Route exact path="/jobs">
            <JobCardList />
          </Route> */}
          <Route exact path="/hotels">
            {/* <HotelsList /> */}
            <SearchHotels />
          </Route>
          <Route exact path="/hotels/:id">
            <HotelDetail />
          </Route>
          {/* <Route exact path="/companies/:handle">
            <CompanyDetail />
          </Route> */}
          <Route exact path="/cars">
            {/* <CarsrentalList /> */}
            <SearchCars />
          </Route>
          <Route exact path="/cars/:id">
            <CarrentalDetail />
          </Route>

          <Route path="/profile">
            <ProfileForm />
          </Route>
         <Route path="/mytrip">
            <MyTrip />
          </Route> 

          {/* <Route path='/checkout'>
            <Checkout />
          </Route> */}
      
          <Redirect to="/" /> 

          </>) : (<>
          <Route exact path="/flights">
            <FlightsList />
          </Route>
          <Route exact path="/flight/:id">
            <FlightDetail />
          </Route>
          <Route exact path="/hotels">
            <HotelsList />
          </Route>
          <Route exact path="/hotel/:id">
            <HotelDetail />
          </Route>
          <Route exact path="/cars">
            <CarsrentalList />
          </Route>
          <Route exact path="/car/:id">
            <CarrentalDetail />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Redirect to="/" />
          </>)
            }
        </Switch>
      </div>
  );

  
}

export default Routes;
