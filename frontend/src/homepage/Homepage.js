import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, 
Button } from 'reactstrap';

import "./Homepage.css";
import UserContext from "../auth/UserContext";
import NoLoggedIn from "./NoLoggedIn";
import useToggle from "../hooks/useToggle";
import { FaGithubAlt } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import ProfileForm from "../auth/ProfileForm";
import { BiHappyBeaming  } from "react-icons/bi";
import findH from '../img/findH.png';
import mount from '../img/mount.png';
import travelBudget from '../img/travelBudget.png'

const Homepage = () => {
  const { isLoggedIn } = useContext(UserContext);
  console.debug("Homepage", "isLoggedIn=", isLoggedIn);


return (
  <section className="Home justify-content-center" style={{ margin: '10px'}}>
    <Card className="J card col-md-8 offset-md-2 text-center">
      <CardBody className="text-center">
        {isLoggedIn
          ? (<>         
            <CardTitle>
              <h2 className="L font-weight-bold"> {`Welcome ${isLoggedIn.username}!`} </h2>
              <hr />
            </CardTitle>
            <CardText>
              <div className="card bg-light p-2">
                <h5 className=""> 
                  Thank you for create account. Find the best vacation for yourself. 
                </h5>
                <h5 className="text-left">
                  Navigation: You can search for flights, hotels and car rentals and 
                  then by saving each one you will create a trip list. 
                  After that you can see it on the travel page and even print it out.
                </h5>
              </div>
            </CardText>
            <div className="row">
            <br></br>
              <div className="col-sm-6 p-2">
                <div className="card bg-light">
                  <img src={mount} className="float-end img-thumbnail" alt="Girl flight" />
                    <div className="card-body">
                      <h5 className="card-title">Can rename trip or delete all trip.</h5>
                        <Link className="btn btn-info float-left" to="/profile" type="profile"> Profile
                        </Link>
                        <Link className="btn btn-info float-right" to="/mytrip" type="mytrips"> My Trip
                        </Link>
                    </div>
                </div>
              </div>
              <div  className="col-sm-6 p-2 text-left">
                <div  className="card bg-light">
                  <div  className="card-body">
                    <h5  className="card-title"> You have two seporate personal page account and saved trips page.</h5>
                      <h5 className="card-text">For making a wish trip list, you just need to do 'like' and 'unlike' flights, 
                      hotels and cars.</h5>
                  </div>
                  <img src={findH} className="card-img-top img-thumbnail bg-info" alt="Girl flight" />
                </div>
              </div>
            </div>
          </>) : (<> 
            <CardTitle>
              <h2 className="T font-weight-bold font-italic text-light">
                Welcome to Vacation Time!
              </h2>
              <h3 className="T font-weight-bold text-light"> 
              Finally you have your vacation and ready to travel, so you are in the right place.</h3>
            </CardTitle>
            <hr />
            <div  className="col-m-10">
              <div  className="card bg-secondary"> 
                <img src={travelBudget} className="card-img-top img-thumbnail bg-info" alt="Girl flight" />
                  <div  className="card-body">
                    <h5  className="card-title font-weight-bold">How to Travel on a Budget</h5>
                      <p  className="card-text text-left text-light">
                        To create a travel budget, start by adding up your usual expenses, like rent and food, 
                        to see how much you have left over to spend on a trip. Once you have a dollar amount in mind,
                        budget for important details first, like tickets to your destination,
                        and lodging costs once your there, and set that money aside. <br></br> 
                        Flight is usually cheaper with a round-trip and buying from Wednesday to Thursday. <br></br>
                        Hotels can give a nice price with last minutes and the same can be for rent a car. <br></br>
                        The same idea when you planning your trip earlier with booking flights, hotel and rental-car two or three months before travel.
                      </p>
                      <CardText>
                        <p className="fw-semibold">
                        Enjoy your travel hunting and please login or sign up if you wish to create your trip list!</p>
                        <NoLoggedIn />
                      </CardText>
                  </div>
              </div>
            </div>
            </>) } 
      </CardBody>
    </Card>
    <div className="footer">
       <a className="flux" href="https://www.linkedin.com/in/elena-nurullina"> 
       <h2> <AiFillLinkedin /></h2> </a>
       <a className="flux" href="https://github.com/ElenkaSan/React-Jobly"> 
       <h2><FaGithubAlt /> </h2></a>
    </div>
  </section>
)
}

export default Homepage;
