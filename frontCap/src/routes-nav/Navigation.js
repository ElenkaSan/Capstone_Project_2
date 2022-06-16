import React, { useContext } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const DEFAULT = 'https://cdn-icons.flaticon.com/png/512/3020/premium/3020920.png?token=exp=1654718575~hmac=48c545a8cacfc31a4898621b5f094fad';
// 'https://cdn-icons-png.flaticon.com/512/201/201623.png';

const log = 'https://cdn-icons.flaticon.com/png/512/2050/premium/2050106.png?token=exp=1654719020~hmac=a8c8396f114968faa6b608ff5d6e9804';
const sign = 'https://cdn-icons-png.flaticon.com/512/295/295128.png';
const flighty = 'https://cdn-icons-png.flaticon.com/512/201/201623.png';
const car_i = 'https://cdn-icons.flaticon.com/png/512/2831/premium/2831972.png?token=exp=1654719241~hmac=62dcea7e5963796e79d14c3a446a3840';
const hotl = 'https://cdn-icons.flaticon.com/png/512/3009/premium/3009487.png?token=exp=1654719686~hmac=780aa8d8c28d06dc11037061a0f6e126';
// const trav = 'https://cdn-icons.flaticon.com/png/512/670/premium/670016.png?token=exp=1654743348~hmac=648dbac2bc2e28ad7228c4ea6cc7dd96';
const profily1 = 'https://cdn-icons-png.flaticon.com/512/7775/7775488.png';
const profily = 'https://cdn-icons.flaticon.com/png/512/2972/premium/2972857.png?token=exp=1655150919~hmac=04c901d34a0748e9bf99b29bbfd24438';
const logouty = 'https://cdn-icons-png.flaticon.com/512/1716/1716282.png';

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
                <h3> Travel <img src={DEFAULT} className="" style={{ height:'30px', width:'30px'}} />
                     </h3>
            </NavLink>
                <Nav className="ml-auto" navbar>
                    {isLoggedIn
                        ? (<>
                             <NavItem>
                                <NavLink to="/flights" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2"> 
                                {/* Flights */}
                                <h3>
                                <img src={flighty} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
                                </NavLink>
                            </NavItem>
                          <NavItem>
                                <NavLink to="/hotels" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2">
                                    {/* Hotels */}
                                    <h3>
                                <img src={hotl} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/cars" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2">
                                    {/* Rent a Car */}
                                    <h3>
                                    <img src={car_i} className="" style={{ height:'30px', width:'30px'}} />
                                     </h3>
                                    </NavLink>
                            </NavItem>
                             <NavItem>
                                <NavLink to="/profile" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2">
                                    {/* Profile */}
                                <h3> 
                                <img src={profily} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
                               </NavLink><span></span>
                            </NavItem>
                                 <NavItem>
                                <NavLink to="/mytrip" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2">
                                <h3> 
                                <img src={profily1} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
                               </NavLink><span></span>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink to="/mytrips">My Trips</NavLink>
                            </NavItem> */}
                            <NavItem>
                                <h3 className="btn nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2" onClick={handleClick} type="logout">
                                {/* <FaSignOutAlt /> Bye!  */}
                                <img src={logouty} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
                            </NavItem>
                          </>) : (<>
                      
                           {/* <DropdownButton className="navbar-toggler collapsed p-0" variant="warning" 
                            id="dropdown-warning-button" 
                           data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation"
        > 
        <h3>
                            <img src={trav} className="" style={{ height:'30px', width:'30px'}} />
                            </h3>
        <Dropdown.Item to="/flights">
        <h3>
                                <img src={flighty} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
        </Dropdown.Item>
        <Dropdown.Item href="#/hotels">
        <h3>
                                <img src={hotl} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
        </Dropdown.Item>
        <Dropdown.Item href="#/cars">
        <h3>
                                    <img src={car_i} className="" style={{ height:'30px', width:'30px'}} />
                                     </h3>
        </Dropdown.Item>
      </DropdownButton> */}
                           <NavItem>
                                <NavLink to="/flights" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2"> 
                                {/* Flights */}
                                <h3>
                                <img src={flighty} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
                                </NavLink>
                            </NavItem>
                          <NavItem>
                                <NavLink to="/hotels" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2">
                                    {/* Hotels */}
                                    <h3>
                                <img src={hotl} className="" style={{ height:'30px', width:'30px'}} />
                                </h3>
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/cars" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2">
                                    {/* Rent a Car */}
                                    <h3>
                                    <img src={car_i} className="" style={{ height:'30px', width:'30px'}} />
                                     </h3>
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/login" type="login" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2">
                                     <h3> 
                                     <img src={log} className="" style={{ height:'30px', width:'30px'}} />
                                        {/* <FaSignInAlt /> */}
                                    </h3> </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/signup" type="signup" className="nav col-sm-3 col-sm-3 col-sm-6 col-sm-8 mx-auto my-2"> 
                                <h3>
                                    <img src={sign} className="" style={{ height:'30px', width:'30px'}} />
                                    {/* <MdSwitchAccount />  */}
                                </h3> </NavLink>
                            </NavItem>
                        </>)
                    }
                </Nav>
        </Navbar>
    </div>
);
}

export default Navigation;
