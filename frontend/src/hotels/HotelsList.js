import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";

import HotelDetail from "./HotelDetail";
import HotelCard from "./HotelCard";
import SearchHotels from "./SearchHotels";
import LoadingSpinner from "../common/LoadingSpinner";
import moment from 'moment';
import '../flights/flight.css'
import {
  CircularProgress
} from "@material-ui/core";

const HotelsList = () => {
    const [hotels, setHotels] = useState([]);

    const findHotels = async (formData) => {
        try {
            let hotels = await AmadeusApi.getHotelByCity(formData.cityCode, 
                                                         formData.checkInDate,
                                                         formData.checkOutDate
                                                         );
            // console.log(hotels)
            // const data = hotelData(hotels)
            // setHotels(data)
            setHotels(hotels);
          }
         catch (e) {
          console.error(e);
        }
    }

    const hotelData = (hotels) => {
      console.log("HOTELS",hotels);
      return (
        <div className="text-light">
           {hotels.data.map(hotel => (
              <HotelCard
              key= {hotel.id} 
              hotel={hotel}
            />
            ))}
         </div>
       )
     }

    if (!hotels) return <LoadingSpinner />;

    // if (hotels.length === 0) {
    //   return <span>
    // <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2"> 
    // Sorry, no results were found!</p></span>;
    // }

    return (
     
      <div className="p-4">
         {/* {console.log(hotels.data)} */}
            <SearchHotels findHotels={findHotels} />
           {/* {hotels.length ? ( 
            {hotels}
            ) : ( 
          <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
            Sorry, no results were found!</p>
        )} */}

           {/* {hotels.length ? ( */}
          {Array.isArray(hotels.data) ? (
        <div className='text-light'> 
        {hotels.data.map((hotel) => (
          // <HotelDetail
          <HotelCard key= {hotel.id} hotel={hotel}
          />
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

export default HotelsList;