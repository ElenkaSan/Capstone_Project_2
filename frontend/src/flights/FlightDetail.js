import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../api";
import FlightCard from "./FlightCard";

// import FlightData from "../API/FlightData";

// const axios = require("axios");

const FlightDetail = () => {

    const { id } = useParams();

    const [flight, setFlight] = useState({});
    const [seeFlight, setSeeFlight] = useState([]);
    const [hasFlight, setHasFlight] = useState(false);

    useEffect(function () {
        async function getFlightDetail() {
            try {
                let data = await Api.getFlight(id);
                // let data = await FlightData.searchFlight(id);
                setFlight(data);
                setSeeFlight(data.flights);
                if (seeFlight) {
                    setHasFlight(true);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        getFlightDetail();
    }, [hasFlight, id]);

    return (
        <div>
            <h2>{flight.classType}</h2>
            <h3>{flight.type}</h3>
            <h3>From: {flight.locationD} Date: {flight.dateD} </h3>
            <h3>To: {flight.locationA} Date: {flight.dateA} </h3>
            {hasFlight
                ? <h2>Current Flight</h2>
                : null
            }
            {seeFlight.map(f =>
            (
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
                )
              )
            }
        </div>
    )
}

export default FlightDetail;
