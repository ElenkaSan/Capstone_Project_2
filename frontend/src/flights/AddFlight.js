import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";
import FlightCard from "./FlightCard";
import SearchFlights from "./SearchFlights";
import LoadingSpinner from "../common/LoadingSpinner";
import './flight.css'
// import FlightData from "../API/FlightData";

const AddFlight = () => {

    const [flights, setFlights] = useState([]);

    const findFlights = async (formData) => {
        try {
            let airport1 = await AmadeusApi.getAirport(formData.origin, "AIRPORT, CITY");
            let airport2 = await AmadeusApi.getAirport(formData.destination, "AIRPORT, CITY");
            console.log({ airport1, airport2 })
            // let oneway = await AmadeusApi.flightOffersOneWay(formData);
            // let around = await AmadeusApi.flightOffersNonstopAround(formData);
            // setFlights(oneway.map(d => d) || around.map(d => d));
        }
        catch (e) {
            console.log(e)
        }
    }

    // const flightSearchAny = async (shortData) => {
    //     try {
    //        let data = await AmadeusApi.flightDestinationsNonstop(
    //         shortData.origin, "AIRPORT, CITY",
    //         shortData.startDate, "mm/dd/yyyy",
    //         // `${yyyy}-${mm}-${dd}`
    //         shortData.adults
    //        );
    //         setFlights(data.map(d => d));
    //     }
    //     catch (e) {
    //        console.log(e);
    //     }
    // }

    if (!flights) return <LoadingSpinner />;
    return (
        <div className="p-4">
            <SearchFlights findFlights={findFlights} />
            {/* {flights.props.children.length ? ( */}
            {flights.length === 0 ? (
      <div className="card J text-light">
        {/* <h1 className="text-center">Here your find Flights</h1> */}
      {flights}
      {flights.map((f) => (
                // <Link to={`flights/${f.id}`} key={f.id}>
                <FlightCard
                key={f.id} 
                id={f.id} 
                origin={f.origin} 
                destination={f.destination} 
                startDate={f.startDate}
                endDate ={f.endDate} 
                adults ={f.adults}
                oneWay ={f.oneWay}
                nonStop ={f.nonStop}
                 />
                //  </Link>
            ))}
        </div>
      ) : (
        <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
          Sorry, no results were found!</p>
      )}
      <br/>
        </div>
    )
}

export default AddFlight;
