import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import "./Homepage.css";
import UserContext from "../auth/UserContext";
import NoLoggedIn from "./NoLoggedIn";
import { FaGithubAlt } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
// import { TiWeatherPartlySunny } from "react-icons/ti";
import weathers from '../img/weathers.png';
// import { BiHappyBeaming  } from "react-icons/bi";
import findH from '../img/findH.png';
import mount from '../img/mount.png';
import travelBudget from '../img/travelBudget.png'

// Home component is the splash page for the app. 
// It will render a login/signup elements if the user is not logged.
// It will render User profile page and Trip page elements if the user is logged id.
// This also the default for any redirects and broken links

const Homepage = () => {
  const { isLoggedIn } = useContext(UserContext);
  console.debug("Homepage", "isLoggedIn=", isLoggedIn);


return (
  <section className="container">
    <Card className="J card text-center">
      <CardBody className="text-center">
        {isLoggedIn
          ? (<>         
            <CardTitle>
              <h2 className="S text-info font-weight-bold"> {`Welcome ${isLoggedIn.username}!`} </h2>
              <hr />
            </CardTitle>
            <CardText>
              <div className="card bg-light p-2">
                <h5 className=""> 
                  Thank you for creating an account. Find the best vacation for yourself. 
                </h5>
                <h5 className="text-left">
                  Navigation: <br></br>You can search for flights, hotels and 
                  then by saving each one you will create a trip list. 
                  After that you can see it on the travel page.
                </h5>
                <h5>Here you can check the Weather Forecast: &nbsp;
                <Link className="" to="/weather" type="weather"> 
                <img src={weathers} alt="weather" style={{ height:'50px', width:'50px'}} />
                {/* <h4> <TiWeatherPartlySunny /> </h4>   */}
                </Link>
                </h5>
              </div>
            </CardText>
            <div className="row">
            <br></br>
              <div className="col-sm-6 p-2">
                <div className="card bg-light">
                  <img src={mount} className="card-img-top img-thumbnail" alt="Girl flight" />
                    <div className="card-body">
                      {/* <h5 className="card-title">Can rename trip or delete all trip.</h5> */}
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
                    <h5  className="card-title"> You have two seporate pages: personal account, where you can make some notes, check the weather and see  your save flights and hotels.
                     Second one is saved trips page with total price your flights and hotels.</h5>
                      <h5 className="card-text">For making a wish trip list, you just need to do 'Save' and 'Remove' flights, 
                      hotels.</h5>
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
