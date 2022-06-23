import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../api";
import FlightCard from "./FlightCard";

const axios = require("axios");

const FlightDetail = () => {

    const { id } = useParams();

    const [flight, setFlight] = useState({});
    const [seeFlight, setSeeFlight] = useState([]);
    const [hasFlight, setHasFlight] = useState(false);

    useEffect(function () {
        async function getFlightDetail() {
            try {
                let data = await Api.getFlight(id);
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
    }, [hasFlight]);

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


// const options = {
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/search',
//   params: {
//     itinerary_type: 'ONE_WAY',
//     class_type: 'ECO',
//     location_arrival: 'NYC',
//     date_departure: '2022-11-15',
//     location_departure: 'MOW',
//     sort_order: 'PRICE',
//     number_of_stops: '1',
//     price_max: '20000',
//     number_of_passengers: '1',
//     duration_max: '2051',
//     price_min: '100',
//     date_departure_return: '2022-11-16'
//   },
//   headers: {
//     'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
//     'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
