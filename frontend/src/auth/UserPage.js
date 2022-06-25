import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link, NavLink, Route  } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, 
    Button } from 'reactstrap';
import UserContext from "../auth/UserContext";
import Api from "../api";
import ProfileForm from "../auth/ProfileForm"
import { BsArrow90DegUp, BsPencilSquare }  from "react-icons/bs";
import { BiHomeHeart } from "react-icons/bi";


const axios = require("axios");

const UserPage = () => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <section className="Home justify-content-center" style={{ margin: '10px'}}>
          <Card className="J card col-md-8 offset-md-2 text-center">
            <CardBody className="text-left">
              <div className="row">
                <div className="d-inline">
                  <h2 className="T display-6 font-weight-bold text-warning"> {`${isLoggedIn.username}`} </h2>
                  <div class="m-0">
                  <Link to="/update"> 
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
               <div className="col-7">
                 <h4 className="lead T text-light font-weight-bold">EMAIL: {`${isLoggedIn.email}`}</h4>
                 <h4 className="lead font-weight-bold">My Notes: </h4>
                 <p className="card font-italic p-2">{`${isLoggedIn.notes}`}</p> 
               </div>
               <div className="col">
                 <h4 className="lead text-right font-weight-bold">
                 <Link className="text-warning" to="/mytrip"> Total Trips: 
                   {`${isLoggedIn.trips.length}`} </Link> 
                </h4>
               </div>
             </div>
            </CardBody>
          </Card>
        </section>
    )
}

export default UserPage;