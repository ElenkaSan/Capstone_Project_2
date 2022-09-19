import React, { useContext, useState, useEffect } from 'react';
import {
  // Row,
  CardHeader,
  Card,
  Table,
  CardBody,
  Button
} from "reactstrap";
import Api from "../api";
import UserContext from "../auth/UserContext";
import { useHistory, Link } from 'react-router-dom';
import useToggle from "../hooks/useToggle";
import HotelDetail from '../hotels/HotelDetail';
import FlightDetail from "../flights/FlightDetail";

import ProfileForm from "../auth/ProfileForm";
// import { BiHappyBeaming  } from "react-icons/bi";
import { FcPrint }  from "react-icons/fc";
import { BiHomeHeart } from "react-icons/bi";
import BudgetCard from "./BudgetCard";
import Trip from "./Trip";
// import SavedFlightHotel from "./SavedFlightHotel";
// import Alert from 'react-bootstrap/Alert'
import "./style.css";

// import Axios from "axios";

// const AddTripForm = ({ addNewTrip }) => {
//   // const [title, setTitle] = useState("");
//   // const [date, setDate] = useState("");
//   const INITIAL_STATE = {
//     title: '',
//     date: ''
//   }
//   const [formData, setFormData] = useState(INITIAL_STATE);
//   const [hasErrors, setHasErrors] = useState([]); 
//   const [show, setShow] = useState(true);

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   let response = await addNewTrip(title, date);
//   //   setTitle("");
//   //   setDate("")
//   //   if (response.messages === "success") {
//   //     setTitle("");
//   //     setDate("");
//   //   }
//   //   else {
//   //     setHasErrors(response.error);
//   //   }
//   // };

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;
//     setFormData(formData => ({
//         ...formData,
//         [name]: value
//     }))
//   };

//   const handleSubmit = async (evt) => {
//     evt.preventDefault(); 
//     let response = await addNewTrip({ ...formData });
//       if (response.messages === "success") {
//         // history.push("/mytrip");
//         setFormData(INITIAL_STATE);
//       }
//       else {
//         setHasErrors(response.error);
//       }
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormGroup>
//     {hasErrors.length > 0 && <div><Alert type = "danger" message={hasErrors} /></div>}
//              {/* ? <Alert type = "danger" messages={hasErrors.length} />
//             : null
//             }  */}
//       <div className="container col-md-6 col-lg-4 offset-md-3 offset-lg-4">  
//       <Input
//         className='date-num T text-light'
//         id="title"
//         type="text"
//         name="title"
//         placeholder="Trip Name"
//         value={formData.title}
//         onChange={handleChange}
//       />
//       <br></br>
//       <Input
//         className='date-num T text-light'
//         id="date"
//         type="date"
//         name="date"
//         placeholder="date"
//         value={formData.date}
//         onChange={handleChange}
//       />
//       <br></br>
//       <Button className="btn btn-lg bg-warning text-dark" onClick={handleSubmit}>
//         Add Trip
//       </Button>
//       </div>
//       </FormGroup>
//     </Form>
//   );
// };


function MyTrip({ updateUser, props, trip, addNewTrip }) {
   const { isLoggedIn,  applicationIds } = useContext(UserContext);
//   console.debug("Homepage", "isLoggedIn=", isLoggedIn);
   const [profileTrips, setProfileTrips] = useState([]);
   const [profile, setProfile] = useState({});
   const [isUpdate, setIsUpdate] = useToggle(false);
   const [hasErrors, setHasErrors] = useState([]);
   const [saveConfirmed, setSaveConfirmed] = useState(false);
   const history = useHistory();
 
// --------
  // const trip = isLoggedIn.trips;
  const [trips, setTrip] = useState([]);
  const [tripId, setTripId] = useState(trip);

  // const [savedFlights, setSavedFlights] = useState([]);
  // const [savedReturnFlights, setSavedReturnFlights] = useState([]);
  // const [savedHotel, setSavedHotel] = useState([]);
  const [flightTrip, setFlightTrip] = useState({
    title: "Flight(s)",
    amount: 0
  });
  const [hotelTrip, setHotelTrip] = useState({
    title: "Hotel",
    amount: 0
  });

  useEffect(() => {
    setTripId(trip);
}, [trip, tripId]);

  function renderFlightRow() {
    if (flightTrip.amount !== 0) {
      return <Trip key={101} index={101} trip={flightTrip} remove={false} />;
    }
  }

  function renderHotelRow() {
    if (hotelTrip.amount !== 0) {
      return <Trip key={100} index={100} trip={hotelTrip} remove={false} />;
    }
  }

  // --------
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
                 
                  setProfileTrips(() => flightDetails, hotelDetails);
                } else {
                  setProfileTrips([]);
                }      
              } catch (e) {
                console.log(e);
            } 
        }
        getProfile();
  }, [isLoggedIn, applicationIds]);

  // const handleDelete = (evt) => {
  const removeTrip = (evt) => {
    evt.preventDefault();
    const delTrip = trips.profile;
    // newTrip.splice(index, 1);
    // let trip = profile;
    try {
      Api.deleteTrip(delTrip);
      if (profile == null) {
        history.push("/mytrip");
      }
    } catch (err) {
        setHasErrors(err);
        return;
      }
    setHasErrors([]);
    setSaveConfirmed(true);
    setTrip(delTrip)
  }

  // const removeTrip = index => {
  //   const newTrip = [...trips];
  //   newTrip.splice(index, 1);

  //   Axios.put(`/mytrip/${trip}`, {
  //     trip: newTrip
  //   }).then(res => {
  //     setTrip(res.data.trip);
  //   });
  // };

   
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
                          ?  ( <div className="J card px-4  text-center p-3">
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
                            {/* <Button className="btn btn-outline-danger" onClick={handleDelete} >
                              Delete Trip
                            </Button> */}
                            <h5 className="text-dark"> 
                           {profileTrips.map((place) =>
                           ( 
                            (<FlightDetail 
                              key={place.id} 
                              flight={place} 
                               />)
                            (<HotelDetail
                            // <HotelCard
                              // key= {props.hotel.hotelId} 
                              // hotel={props.hotel}
                              key={place.id} 
                              id={place.id} 
                             />)
          
                           ))
                           } </h5>
                       </section>)}
         <br></br>
         {/* <Row>
          <SavedFlightHotel
            flight={savedFlights}
            returnFlight={savedReturnFlights}
            hotel={savedHotel}
           ></SavedFlightHotel>
         </Row> */}
            <Card className="J card px-4 text-center">
            <CardHeader className="T text-light font-weight-bold">
              Saved Flights and Hotels
              </CardHeader>
            <CardBody className="trip-body">
              <Table striped className="T text-light">
                <thead>
                  <tr>
                    <th>Trip</th>
                    <th>Cost</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                {renderFlightRow()}
                {renderHotelRow()}
                {trips.map((trip, index) => {
                  return (
                    <Trip
                      key={index}
                      index={index}
                      trip={trip}
                      removeTrip={removeTrip}
                      remove={true}
                    />
                  );
                })}
              </Table>
              <hr></hr>
              {/* <CardHeader className="T text-light">Create your Trip Name</CardHeader>
              <AddTripForm addTrip={addTrip} /> */}
            </CardBody>
          </Card>
                   <BudgetCard
                    trip={trips}
                    flightTrip={flightTrip}
                    hotelTrip={hotelTrip}
                    tripId={tripId}
                     />
                  <br></br>
                       </> 
                       )}
                       </>) 
                        : (<> 
                       <h3>Error 404!</h3>
                        </>) 
                        } 
                   </h3>
                </div>
                {/* <button id="print" className="btn btn-info btn-lg m-2">print
                </button> */}
                {/* <AirportCity /> */}

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