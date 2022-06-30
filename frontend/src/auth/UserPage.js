import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from 'reactstrap';
import UserContext from "../auth/UserContext";
// import Api from "../api";
// import ProfileForm from "../auth/ProfileForm"
import { 
  // BsArrow90DegUp,
   BsPencilSquare }  from "react-icons/bs";
import { BiHomeHeart } from "react-icons/bi";


// const axios = require("axios");

const UserPage = () => {
    const { isLoggedIn } = useContext(UserContext);
    const trip = isLoggedIn.trips;

    return (
        <section className="Home justify-content-center" style={{ margin: '10px'}}>
          <Card className="J card col-md-8 offset-md-2 text-center">
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
               <div className="col-7">  <h4 className="lead T text-warning font-weight-bold"> {`${isLoggedIn.firstName} ${isLoggedIn.lastName}`}</h4>
                 <h4 className="lead T text-light font-weight-bold">EMAIL: {`${isLoggedIn.email}`}</h4>
                 <h4 className="lead font-weight-bold">My Notes: </h4>
                 <p className="card font-italic p-2">{`${isLoggedIn.notes}`}</p> 
               </div>
               <div className="col">
                 <h4 className="lead text-right font-weight-bold">
                 {trip && trip.length ? 
                 (<Link className="text-warning" to="/mytrip" type="MyTrip"> 
                  Total Trips: {`${trip.length}`}
                 </Link> ) : ( <p className="card bg-warning font-weight-bold text-center p-2">
                 Sorry, you do not have any saved trips!</p>)}
                </h4>
               </div>
             </div>
            </CardBody>
          </Card>
        </section>
    )
}

export default UserPage;