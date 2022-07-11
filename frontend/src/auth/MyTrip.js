import React, { useContext, useState, useEffect } from 'react';
import Api from "../api";
import UserContext from "../auth/UserContext";
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import useToggle from "../hooks/useToggle";
import HotelCard from "../hotels/HotelCard";
import FlightCard from "../flights/FlightCard";
import TripDetail from "../trip/TripDetail"
// import CarCard from '../carsrental/CarCard';
import ProfileForm from "../auth/ProfileForm";
// import { BiHappyBeaming  } from "react-icons/bi";
import { FcPrint }  from "react-icons/fc";
import { BiHomeHeart } from "react-icons/bi";


import AirportCity from "./AirportCity";



function MyTrip({ updateUser }) {
   const { isLoggedIn,  applicationIds } = useContext(UserContext);
//   console.debug("Homepage", "isLoggedIn=", isLoggedIn);
   const [profileTrips, setProfileTrips] = useState([]);
   const [profile, setProfile] = useState({});
   const [isUpdate, setIsUpdate] = useToggle(false);
   const [hasErrors, setHasErrors] = useState([]);
   const [saveConfirmed, setSaveConfirmed] = useState(false);
   const history = useHistory();

    useEffect(
      function () {
        async function getProfile() {
            try {
                let data = await Api.getUserProfile(isLoggedIn.username)
                setProfile(data);
                const trips = [...applicationIds];
                console.log(trips);
                if (trips.length > 0) { 
                  const flightDetails = (await Api.getFlightsByIds(trips)).map((t) => t.trip);
                  const hotelDetails = (await Api.getHotelsByIds(trips)).map((t) => t.trip);
                  const carDetails = (await Api.getCarsByIds(trips)).map((t) => t.trip);
                  setProfileTrips(() => flightDetails, hotelDetails, carDetails);
                } else {
                  setProfileTrips([]);
                }      
              } catch (e) {
                console.log(e);
            } 
        }
        getProfile();
  }, [isLoggedIn, applicationIds]);

  const handleDelete = (evt) => {
    evt.preventDefault();
    let tripName = profile;
    try {
      Api.deleteTrip(tripName);
      if (profile == null) {
        history.push("/mytrip");
      }
    } catch (err) {
        setHasErrors(err);
        return;
      }
    setHasErrors([]);
    setSaveConfirmed(true);
  }
   
    return (
        <div className="container p-fix">
          {/* <h3 className = "bg-light card">My Trips</h3> */}
            <div className="columns is-mobile is-multiline">
               <h3> 
                 {isLoggedIn
                 ? (<>  
                   {/* <h3 className="text-warning bg-secondary card p-2">{`Dear user, ${isLoggedIn.username}, 
                   on this page you will see your saved flights, hotels and rent cars with the name a Trip List`}</h3> */}
                   {isUpdate
                     ? <ProfileForm 
                     updateUser={updateUser} 
                     setProfile={setProfile} 
                     setIsUpdate={setIsUpdate}
                     />
                     : (<>

                     {/* {profile ? (
                        ''
                     ) : (  
                           <h1 className="display-4 text-danger text-center"> 
                           Sorry, you do not have any saved trips! </h1>
                           )  
                          } */}
                     {/* { false */}
                     {profileTrips.length === 0
                          ?  ( <div className="J card px-4  text-center">
                               <h1 className="T display-6 text-light font-weight-bold"> 
                               Sorry, you do not have any saved trips! 
                               </h1>
                               <Link to='/' type="Home">
                                 <Button className="btn btn-lg btn-outline-warning"> <BiHomeHeart />
                                 </Button>
                               </Link>
                               </div>
                          ) : 
                          (<section> 
                            <h2 className="bg-secondary card font-italic text-info p-2">Your Trips:</h2>
                            <h2 className='text-warning'> {`${isLoggedIn.tripName}`} (rename)  and   {`${isLoggedIn.tripDate}`} (change date): </h2>
                            <button id="print" className="btn btn-secondary btn-lg m-2">
                              <FcPrint />
                            </button>
                            <Button className="btn btn-outline-danger" onClick={handleDelete} >
                              Delete Trip
                            </Button>
                            <h5 className="text-dark"> 
                           {profileTrips.map((place) =>
                           ( 
                            (<FlightCard
                              // key={place.id} 
                              // id={place.id} 
                              // numberOfPassengers={place.numberOfPassengers} 
                              // type={place.type} 
                              // classType={place.classType}
                              // locationD ={place.locationD}         
                              // locationA ={place.locationA}
                              // dateD ={place.dateD}
                              // dateA ={place.dateA}
                              // priceMin ={place.priceMin}
                              // priceMax ={place.priceMax}
                              // sortOrder ={place.sortOrder}
                            />)
                            (<HotelCard
                              // key={place.id} 
                              // id={place.id} 
                              // hotelName={place.hotelName} 
                              // checkin={place.checkin} 
                              // checkout={place.checkout}
                              // reviews ={place.reviews} 
                              // numberOfGuests ={place.numberOfGuests}
                              // roomNumber ={place.roomNumber}
                              // description ={place.description}
                              // price ={place.price}
                              // imgUrl ={place.imgUrl}
                             />)
                             (<TripDetail
                              // key={place.id} 
                              // id={place.id} 
                              // carName={place.carName}
                              // locationP={place.locationP}
                              // locationR={place.locationR}
                              // dateTimeP={place.dateTimeP} 
                              // dateTimeR={place.dateTimeR}
                              // description ={place.description}
                              // price ={place.price}
                              // imgUrl ={place.imgUrl}
                              />)
                            // (<CarCard
                            //   key={place.id} 
                            //   id={place.id} 
                            //   carName={place.carName}
                            //   locationP={place.locationP}
                            //   locationR={place.locationR}
                            //   dateTimeP={place.dateTimeP} 
                            //   dateTimeR={place.dateTimeR}
                            //   description ={place.description}
                            //   price ={place.price}
                            //   imgUrl ={place.imgUrl}
                            //   />)
                           ))
                           } </h5>
                       </section>)}
                       </>)}
                       </>) 
                        : (<> 
                       <h3>Error 404!</h3>
                        </>) 
                        } 
                   </h3>
                </div>

                <AirportCity />

            </div>
        )
    }

//         <div className="container p-fix">
//             <h3 className = "bg-light card">My Trips</h3>
//                     <div className="columns is-mobile is-multiline">
//                         {places.map(place => (
//                             <div className="column is-one-third">
//                                 <div className="card" style={{ height: '325px' }}>
//                                     <div className="card-image">
//                                     <figure className="image is-16by9">
//                                         <img src={ place.photo ? place.photo : "https://placeimg.com/640/480/nature"} alt={ place.place } />
//                                     </figure>
//                                     </div>
//                                     <div className="card-content">
//                                     <div className="media">
//                                     <div className="media-left">
//                                         <figure className="image is-48x48">
//                                             <img src={ place.photo ? place.photo : "https://placeimg.com/48/48/nature"} alt={ place.place } />
//                                         </figure>
//                                     </div>
//                                     <div className="media-content has-text-left">
//                                         <p className="title is-6">{place.place}</p>
//                                         <p className="subtitle is-6"><a href={place.placeURL} target="_blank" rel="noreferrer">{place.place}</a></p>
//                                     </div>
//                                     </div>
//                                     </div>
//                                     <div>
//                                         <p>Flight:</p> 
//                                         <FlightCard
//                                           key={place.id} 
//                                           id={place.id} 
//                                           numberOfPassengers={place.numberOfPassengers} 
//                                           type={place.type} 
//                                           classType={place.classType}
//                                           locationD ={place.locationD}         
//                                           locationA ={place.locationA}
//                                           dateD ={place.dateD}
//                                           dateA ={place.dateA}
//                                           priceMin ={place.priceMin}
//                                           priceMax ={place.priceMax}
//                                           sortOrder ={place.sortOrder}
//                                         />
//                                     </div>
//                                     <div>
//                                         <p>Hotel:</p> 
//                                         <HotelCard
//                                           key={place.id} 
//                                           id={place.id} 
//                                           hotelName={place.hotelName} 
//                                           checkin={place.checkin} 
//                                           checkout={place.checkout}
//                                           reviews ={place.reviews} 
//                                           numberOfGuests ={place.numberOfGuests}
//                                           roomNumber ={place.roomNumber}
//                                           description ={place.description}
//                                           price ={place.price}
//                                           imgUrl ={place.imgUrl}
//                                          />
//                                     </div>
//                                     <div> 
//                                         <p>Car:</p>
//                                         <CarCard
//                                           key={place.id} 
//                                           id={place.id} 
//                                           carName={place.carName}
//                                           locationP={place.locationP}
//                                           locationR={place.locationR}
//                                           dateTimeP={place.dateTimeP} 
//                                           dateTimeR={place.dateTimeR}
//                                           description ={place.description}
//                                           price ={place.price}
//                                           imgUrl ={place.imgUrl}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//     )
// }

export default MyTrip;