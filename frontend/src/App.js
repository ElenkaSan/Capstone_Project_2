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
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  

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

  const login = async (loginData) => {
    try {
      let token = await Api.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      return [false, err.message];
    }
  };

  const logout = () => {
    setIsLoggedIn(null);
    setToken(null);
  };

  const hasAppliedTrip = (id) => {
    return applicationIds.has(id);
  };

  const applyToTrip = async (id) => {
    if (hasAppliedTrip(id)) return;
    try {
      Api.addingFlight(id, isLoggedIn.username);
      Api.addingHotel(id, isLoggedIn.username);
      setApplicationIds(new Set([...applicationIds, id]));
    } catch (err) {
      console.error(err.message);
    }
  };

  const unApplyToTrip = async (id) => {
    if (!hasAppliedTrip(id)) return;
    try {
      await Api.removeFlight(id, isLoggedIn.username);
      await Api.removeHotel(id, isLoggedIn.username);
      const newApplicationIds = [...applicationIds].filter(
        (appId) => appId !== id
      );
      setApplicationIds(new Set(newApplicationIds));
    } catch (err) {
      console.error(err.message);
    }
  };

  async function updateCurrentUser() {
    try {
      let token = await Api.getUserProfile(isLoggedIn.username);
      setApplicationIds(new Set(isLoggedIn.applications));
      updateUser(token);
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
          hasAppliedTrip,
          applyToTrip,
          unApplyToTrip,
          updateCurrentUser,
          applicationIds,
        }}
      >
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;