import React, { useContext } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import {TbHaze} from "react-icons/tb"
// import {FaSignOutAlt} from "react-icons/fa"

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
// import car_i from '../img/travel.png';
import flighty from '../img/flight.png';
import hotl from '../img/hotel.png';
import profily from '../img/user.png';
import findTrip from '../img/mytrip.png';
import DEFAULT  from '../img/trip.png';
import sign from '../img/signup.png';
import logouty from '../img/logout.png';
import log from '../img/login.png';
import profily1 from '../img/findTrip.png';


function Navigation({ logout }) {
  const { isLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const handleClick = () => {
      logout();
      history.push("/");
  }

  return (
    <div>
        <Navbar expand="md">
            <NavLink exact to="/" className="nav p-2">
                <h3> Travel <img src={DEFAULT} alt="trip" style={{ height:'30px', width:'30px'}}/> </h3>
            </NavLink>
            <Nav className="ml-auto" navbar>
                {isLoggedIn
                ? (<>
                    <DropdownButton className="navbar-toggler" variant="warning" // id="dropdown-warning-button" 
                    data-toggle="collapse" title={ <h4><TbHaze/></h4> } data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" > 
                        <Dropdown.Item>
                          <NavLink to="/flights" type="Flights">   
                            <h3> <img src={flighty} alt="flight" style={{ height:'30px', width:'30px'}} /> </h3>
                          </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item > */}
                          <NavLink to="/hotels" type="Hotels"> 
                            <h3> <img src={hotl} alt="hotel" style={{ height:'30px', width:'30px'}} /> </h3>
                          </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item> */}
                          {/* <NavLink to="/cars" type="RentCar">  
                            <h3> <img src={car_i} alt="car rent" style={{ height:'30px', width:'30px'}} /> </h3>
                          </NavLink> */}
                          <NavLink to="/searchTrip" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="RentCar">  
                                <h3> 
                                <img src={findTrip} alt="car rent" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item> */}
                          <NavLink to="/profile" type="Profile">  
                            <h3> <img src={profily} alt="profile"style={{ height:'30px', width:'30px'}} /> </h3>
                          </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item> */}
                          <NavLink to="/mytrip" type="MyTrip"> 
                            <h3> <img src={profily1} alt="trip page" style={{ height:'30px', width:'30px'}} /> </h3>
                          </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item> */}
                          <NavItem>
                            <h3 className="btn nav mx-auto my-2" onClick={handleClick} type="logout">  {/* <FaSignOutAlt /> Bye!  */}
                              <img src={logouty} alt="logout" style={{ height:'30px', width:'30px'}} />
                            </h3>
                          </NavItem>
                        </Dropdown.Item>
                    </DropdownButton>
                    <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                        <NavItem>
                            <NavLink to="/flights"
                            // to="/flights" 
                            className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="Flights"> 
                                <h3>
                                <img src={flighty} alt="flight" style={{ height:'30px', width:'30px'}} />
                                </h3>
                                </NavLink>
                            </NavItem>
                        <NavItem>
                           <NavLink 
                          //  to="/hotelSearchPage"
                           to="/hotels"
                            className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="Hotels"> 
                                <h3>
                                <img src={hotl} alt="hotel" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink to="/cars" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="RentCar">  
                                <h3>
                                <img src={car_i} alt="car rent" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink>
                        </NavItem> */}
                        <NavItem>
                            <NavLink to="/searchTrip" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="RentCar">  
                                <h3> 
                                <img src={findTrip} alt="car rent" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/profile" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="Profile">  
                                <h3> 
                                <img src={profily} alt="profile" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink><span></span>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/mytrip" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="myTrip"> 
                                <h3> 
                                <img src={profily1} alt="trip page" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink><span></span>
                        </NavItem>
                        <NavItem>
                            <h3 className="btn nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" onClick={handleClick} type="logout">
                                {/* <FaSignOutAlt /> Bye!  */}
                            <img src={logouty} alt="logout" style={{ height:'30px', width:'30px'}} />
                            </h3>
                        </NavItem>
                    </div>
                    </>) : (<>
                    <DropdownButton className="navbar-toggler" variant="warning" // id="dropdown-warning-button" 
                    data-toggle="collapse" title={ <h4><TbHaze/></h4> } data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" > 
                        <Dropdown.Item>
                          <NavLink to="/flights" type="Flights">
                            <h3> <img src={flighty} alt="flight" style={{ height:'30px', width:'30px'}} /> </h3>
                           </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item > */}
                          <NavLink to="/hotels" type="Hotels">  
                            <h3> <img src={hotl} alt="hotel" style={{ height:'30px', width:'30px'}} /> </h3>
                          </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item> */}
                          {/* <NavLink to="/cars" type="RentCar"> 
                            <h3> <img src={car_i} alt="car rent" style={{ height:'30px', width:'30px'}} />  </h3>
                          </NavLink> */}
                            <NavLink to="/searchTrip" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="RentCar">  
                                <h3> 
                                <img src={findTrip} alt="car rent" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item> */}
                          <NavLink to="/login" type="login"> 
                            <h3> <img src={log}alt="login" style={{ height:'30px', width:'30px'}} />  {/* <FaSignInAlt /> */}
                            </h3>
                          </NavLink>
                        {/* </Dropdown.Item>
                        <Dropdown.Item> */}
                          <NavLink to="/signup" type="signup"> 
                            <h3> <img src={sign} alt="signup" style={{ height:'30px', width:'30px'}} />  {/* <MdSwitchAccount />  */}
                            </h3> 
                          </NavLink>
                        </Dropdown.Item>
                    </DropdownButton>
                    <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                        <NavItem>
                            <NavLink to="/flights" type="Flights">   
                                <h3> <img src={flighty} alt="flight" style={{ height:'30px', width:'30px'}} />  </h3>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/hotels" type="Hotels"> 
                                <h3> <img src={hotl} alt="hotel" style={{ height:'30px', width:'30px'}} /> </h3>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            {/* <NavLink to="/cars" type="RentCar"> 
                                <h3> <img src={car_i} alt="car rent" style={{ height:'30px', width:'30px'}} />  </h3>
                            </NavLink> */}
                            <NavLink to="/searchTrip" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" type="RentCar">  
                                <h3> 
                                <img src={findTrip} alt="car rent" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/login" type="login" >
                                <h3> <img src={log} alt="login" style={{ height:'30px', width:'30px'}} />  {/* <FaSignInAlt /> */}
                                </h3> 
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/signup" type="signup"> 
                                <h3> <img src={sign} alt="signup" style={{ height:'30px', width:'30px'}} />  {/* <MdSwitchAccount />  */}
                                </h3> 
                            </NavLink>
                        </NavItem>
                    </div>
                </>)
                }
            </Nav>
        </Navbar>
    </div>
);
}

export default Navigation;
