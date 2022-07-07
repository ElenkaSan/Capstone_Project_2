import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Api from "../api";
import FlightCard from "./FlightCard";
import SearchFlights from "./SearchFlights";
import LoadingSpinner from "../common/LoadingSpinner";
import './flight.css'
// import FlightData from "../API/FlightData";

const AddFlight = () => {

    const [flights, setFlights] = useState([]);

    const findFlights = async (formData) => {
        try {
            let data = await Api.getFilteredFlights(formData);
            setFlights(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    const resetFlightsList = async () => {
        try {
            let data = await Api.getFlights();
            setFlights(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    if (!flights) return <LoadingSpinner />;
    return (
        <div>
            <SearchFlights findFlights={findFlights} resetFlightsList={resetFlightsList} />
            {/* {flights.props.children.length ? ( */}
            {flights.length ? (
      <div>
        <h1 className="card bg-light text-center">Here your find Flights</h1>
      {flights}
      {flights.map((f) => (
                // <Link to={`flights/${f.id}`} key={f.id}>
                <FlightCard
                key={f.id} 
                id={f.id} 
                numberOfPassengers={f.numberOfPassengers} 
                type={f.type} 
                classType={f.classType}
                locationD ={f.locationD} 
                locationA ={f.locationA}
                dateD ={f.dateD}
                dateA ={f.dateA}
                priceMin ={f.priceMin}
                priceMax ={f.priceMax}
                sortOrder ={f.sortOrder}
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