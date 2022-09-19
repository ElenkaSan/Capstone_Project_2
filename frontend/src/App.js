import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";

import LoadingSpinner from "./common/LoadingSpinner";
import Api from "./api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import AmadeusApi from "./amadeusApi";
require("dotenv").config();


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "vacation-token";

// App script provides the initial rendering of children components. 
// Uopon initial rendering, we check to see if the user has a token in the browser session.
// We decrypt the token and use the data to rerender the user's session.
// If not, we ask the user to login or signup and cannot proceed until one of these actions is completed. 
// Upon successful login/signup, user data will be saved to global variable of "USER"
// If not successful, we will send back the errors for it to be displayed on child component.

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [trip, setTrip] = useLocalStorage(true);


  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "isLoggedIn=",
    isLoggedIn,
    "token=",
    token
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  //On load: if token exists in local storage, persist on site.
  //--get token, decrypt it, and then save data to USER state.
  // If error, send back errors to the console..

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);
      AmadeusApi.clientId = process.env.AMADEUS_CLIENT_ID;
      AmadeusApi.clientSecret = process.env.AMADEUS_CLIENT_SECRET;

      async function getUserProfile() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            Api.token = token;
            let isLoggedIn = await Api.getUserProfile(username);
            setIsLoggedIn(isLoggedIn);
            setApplicationIds(new Set(isLoggedIn.applications));
          } catch (err) {
            console.error(err);
            setIsLoggedIn(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getUserProfile();
    },
    [token]
  );

   //We register users with this function to Api, which posts to the backend.
  //If successful, save USER with data, save new token, and return success message. 
  //IF unsucessful, return errors. 

  const signup = async (signupData) => {
    try {
      let token = await Api.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  };

   //Login User gives the user the ability to login. Data is checked on APi to the backend.
  //If successful, save USER with data, save new token, and return success message. 
  //IF unsucessful, return errors. 

  const login = async (loginData) => {
    try {
      let token = await Api.login(loginData);
      setToken(token);
      console.error(token);
      return [true, token.message ];
    } catch (err)
     {
      console.error(err);
      return [false, err.message];
    }
  };


  //Logout will reset the session token to null for the user and will remove their data from the app instance.

  const logout = () => {
    setIsLoggedIn(null);
    setToken(null);
  };



  // const addNewTrip = async (tripDetails) => {
  //   try {
  //     let tripID = await Api.addTrip(tripDetails);
  //     setTripID(tripID);
  //     return { success: true };
  //   } catch (err) {
  //     console.error(err);
  //     return { success: false, error: err };
  //   }
  // };

//  const addNewTrip = async () => {
//   const tripDetails = {
//     username: userId,
//   }
//   await Api.addTrip(tripDetails).then(data => 
//     setTripID(data._id)
//     )
// }
  // const findTripByUser = async username => {
  //   await Api.findTrip(username).then(data => {
  //     if (!data) {
  //        Api.addTrip();
  //     } else {
  //       setTrip(data._id)
  //     }
  //   });
  // };

  const hasAppliedFlight = (id) => {
    return applicationIds.has(id);
  };

  const hasAppliedHotel = (hotelId) => {
    return applicationIds.has(hotelId);
  };

  // useEffect(() => {
  //   const data = window.localStorage.getItem('ADDed_trip');
  //   if ( data !== null ) setTrip(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('ADDed_trip', JSON.stringify(trip));
  // }, [trip]);

  const applyToFlight = async (id) => {
    if (hasAppliedFlight(id)) return;
    try {
        let trip = Api.addingFlight(isLoggedIn.username, id);
        setTrip(trip);
        setApplicationIds(new Set([...applicationIds, id]));
    } catch (err) {
      console.error(err.message);
    }
  };

  const unApplyToFlight = async (id) => {
    if (!hasAppliedFlight(id)) return;
    try {
       await Api.removeFlight(isLoggedIn.username, id);
      
       const newApplicationIds = [...applicationIds].filter(
        (appId) => appId !== id
      );
      setApplicationIds(new Set(newApplicationIds));
      setTrip(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const applyToHotel = async (hotelId) => {
    if (hasAppliedHotel(hotelId)) return;
    try {
        let trip = Api.addingHotel(isLoggedIn.username, hotelId); 
        setTrip(trip);
        setApplicationIds(new Set([...applicationIds, hotelId]));
    } catch (err) {
      console.error(err.message);
    }
  };

  const unApplyToHotel = async (hotelId) => {
    if (!hasAppliedHotel(hotelId)) return;
    try {
       await Api.removeHotel(isLoggedIn.username, hotelId);
    
      const newApplicationIds = [...applicationIds].filter(
        (appId) => appId !== hotelId
      );
      setApplicationIds(new Set(newApplicationIds));
      setTrip(null);
    } catch (err) {
      console.error(err.message);
    }
  };

 //Users can update their profile with this function, which posts to the back end on Api call.
  //If successful, save USER with data and return success message. 
  //IF unsucessful, return errors. 
  async function updateCurrentUser() {
    try {
      let token = await Api.getUserProfile(isLoggedIn.username);
      setApplicationIds(new Set(isLoggedIn.applications));
      updateUser(token);
      // findTripByUser(isLoggedIn.username)
      return { success: true };
    } catch (err) {
      console.error(err);
      setIsLoggedIn(null);
      return [false, err.message];
    }
  }

  const updateUser = (newUser) => {
    setIsLoggedIn(newUser);
  };

  // findTrip = async user_id => {
  //   const response = await fetch(`/findtrip/${user_id}`);
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };

  // findTripByUser = async user_id => {
  //   this.findTrip(user_id).then(data => {
  //     if (!data) {
  //       this.addNewTrip();
  //     } else {
  //       this.setState({
  //         tripID: data._id
  //       });
  //     }
  //   });
  // };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          isLoggedIn,
          updateUser,
          setIsLoggedIn,
          hasAppliedFlight,
          applyToFlight,
          unApplyToFlight,
          hasAppliedHotel,
          applyToHotel,
          unApplyToHotel,
          updateCurrentUser,
          applicationIds,
          // findTripByUser,
          // addNewTrip
        }}
      >
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} 
          // updateUser={updateUser} 
          // addNewTrip={addNewTrip}
          />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;