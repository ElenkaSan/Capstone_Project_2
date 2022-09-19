import React, { useState } from "react";
import AmadeusApi from "../amadeusApi";
import SearchFlights from "./SearchFlights";
import FlightDetail from "./FlightDetail";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from 'react-bootstrap/Alert'
import './flight.css'

//AddFlight component renders all flights that are in the Api Amadeus.
//  app backend database. 
//A user can filter using the inputs in the child component "SearchFlights".
//A user can also click on a button to safe hotel such as remove this hotel.
//If a user has saved, the hotel info card will show it has been saved to and will show the remove button.

const AddFlight = () => {

    const [flights, setFlights] = useState([]);
    const [show, setShow] = useState(true);
    const [hasErrors, setHasErrors] = useState(false);

    //upon intial render, get all around flights 
    const  flightSearchAround = async (formData) => {
        try {
            let flightTwoWay = await AmadeusApi.getFlightAround(formData.originLocationCode,
                                                      formData.destinationLocationCode, 
                                                      formData.departureDate,
                                                      formData.returnDate,
                                                      formData.adults,
                                                    //   formData.travelClass,
                                                    //   formData.nonStop,
            );
            console.log("FLIGHTsAround",flightTwoWay);
            if (flightTwoWay.message === "success") {
              return flightTwoWay.json();
            }
            else {
              setHasErrors(true);
            }
            setFlights(flightTwoWay);
        }
        catch (e) {
            console.log(e.message);
            setShow(true);
            setHasErrors(true);
        }
    }

     //upon intial render, get all one way flights 
    const flightSearchOneway = async (formData) => {
        try {
            let flightOneWay = await AmadeusApi.getFlightOneway(formData.originLocationCode,
                                                                formData.destinationLocationCode, 
                                                                formData.departureDate,
                                                                formData.adults
            );
            console.log("FLIGHTsONEway",flightOneWay);
            if (flightOneWay.message === "success") {
              return flightOneWay.json();
            }
            else {
              setHasErrors(true);
            }
            setFlights(flightOneWay);
            }
        catch (e) {
            console.log(e.message);
            setShow(true);
            setHasErrors(true);
        }
    }

    // deleteItem = id => {
    //     const flights = flights.filter(flight => {
    //       return flight.id !== id;
    //     });
    //     setState({ flights });
    //   };


    // const flightType = roundTripData ? goOneWayData : null;

    if (!flights) return <LoadingSpinner />;

    return (
        <div className="p-4">
            <SearchFlights 
            flightSearchOneway={flightSearchOneway}
            flightSearchAround={flightSearchAround}
            />
            {flights.data ? ( 
            <div className="text-light">
               {flights.data.length === 0 ? ( <p className="card p-2 bg-danger lead font-weight-bold col-md-8 offset-md-2 text-center">
                Sorry, there are {flights.data.length} flight results! </p>) : ''}
                {flights.data.map(flight => (
                <FlightDetail key={flight.id} flight={flight} />
                ))}
            </div> 
            ) : ( 
              <>
              {hasErrors
                       ?
                       ( <>
                         <Alert show={show} variant="dark" className="bg-danger lead font-weight-bold text-center col-md-8 offset-md-2 p-2"> 
                           <div className="fade show">
                           <p> 
                           Sorry, no results were found!</p>
                           </div>
                         </Alert>
                       </> )
                       : null}
                       </>
              )}
           <br/>
       </div>
    )
}

export default AddFlight;