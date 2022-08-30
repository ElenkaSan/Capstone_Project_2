import React, { useState, useEffect } from "react";
import {
    Form,
    Button,
    Input,
    Row,
    Col,
    FormGroup,
    Label,
    Card,
    CardHeader,
    CardBody,
    Container
  } from "reactstrap";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";
import FlightCard from "./FlightCard";
import SearchFlights from "./SearchFlights";
import LoadingSpinner from "../common/LoadingSpinner";
import FlightSearchOneway from "./FlightSearchOneway";
import FlightsSearchResults from "./extraSafe";
import './flight.css'
// import FlightDetail from "./FlightDetail";
import FlightDetailAround from "./FlightDetailAround";
import { MdOutlineFormatAlignRight } from "react-icons/md";

// import FlightData from "../API/FlightData";
// import airports from "../airportData";
// import Box from "@mui/material/Box"
// import TextField from "@mui/material/TextField"
// import Autocomplete from "@mui/material/Autocomplete"

const AddFlight = () => {

    const [flights, setFlights] = useState([]);
    const [flightOneway, setFlightOneway]  = useState([]);

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
            // console.log("FLIGHTsAround",flightTwoWay);
            // setFlights(flightTwoWay);
            const data = roundTripData(flightTwoWay);
            setFlights(data);
        }
        catch (e) {
            console.log(e)
        }
    }

    const flightSearchOneway = async (formData) => {
        try {
            let flightOneWay = await AmadeusApi.getFlightOneway(formData.originLocationCode,
                                                                formData.destinationLocationCode, 
                                                                formData.departureDate,
                                                                formData.adults
            );
            // console.log("FLIGHTsONEway",flightOneWay);
            // setFlights(flightOneway)
            const data =  goOneWayData(flightOneWay)
            setFlightOneway(data)
            }
        catch (e) {
            console.log(e)
        }
    }

    // onewayData (data) {
    //   return data.map(element => <componName data={data} />);
    //   }
    
    const roundTripData = (flights) => {
      console.log("FLIGHTsAround",flights);
      return (
        <div className="text-light">
           {flights.data.map(flight => (
              <FlightDetailAround key={flight.id} flight={flight} />
            ))}
         </div>
       )
     }

     const goOneWayData = (flightOneway) => {
      console.log("FLIGHTsONEway",flightOneway);
      return (
        <div className="text-light">
           {flightOneway.data.map(flight => (
              <FlightSearchOneway key={flight.id} flight={flight} />
            ))}
         </div>
       )
     }

    // deleteItem = id => {
    //     const flights = flights.filter(flight => {
    //       return flight.id !== id;
    //     });
    //     setState({ flights });
    //   };


    const flightType = roundTripData ? goOneWayData : null;

    if (!flights && !flightOneway) return <LoadingSpinner />;
    // if (!flightTwoWay || !flightOneWay) return <LoadingSpinner />;
    return (
        <div className="p-4">
          {/* {console.log(flights.data)} */}
          {/* {console.log(flightOneway.data)} */}
            <SearchFlights 
            flightSearchOneway={flightSearchOneway}
            flightSearchAround={flightSearchAround}
            // roundTripData={roundTripData}
            // goOneWayData={goOneWayData}
            flightType={flightType}
            />
            {(flights.length === 0 && flightOneway.length === 0) ? (
              roundTripData ? goOneWayData : NaN
              // flightType
            ) : (
              <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
              Sorry, no results were found!</p>
            )}
       {/* {Array.isArray(flights.data ) ? ( 
        <div className="text-light">
          {flights.data.map(flight => (
              <FlightDetailAround key={flight.id} flight={flight} />
            ))}
             </div>  ) : ( <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
      Sorry, no results were found!</p>)
      }

      {Array.isArray(flightOneway.data) ? (
        <div className="text-light"> 
      {flightOneway.data.map(flight => (
              <FlightSearchOneway key={flight.id} flight={flight} />
            ))}
            
         </div>
      ) : ( <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
      Sorry, no results were found!</p>)
      } */}
      <br/>
        </div>
    )
}

export default AddFlight;