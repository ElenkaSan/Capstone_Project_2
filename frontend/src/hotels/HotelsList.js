import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";
// import HotelCard from "./HotelCard";
import HotelDetail from "./HotelDetail";
import SearchHotels from "./SearchHotels";
import LoadingSpinner from "../common/LoadingSpinner";
import moment from 'moment';
import '../flights/flight.css'

const HotelsList = () => {

    const [hotels, setHotels] = useState([]);
    
    //hotel offer Mia 
    const findHotels = async (formData) => {
    // const findHotels = async (city, checkInDate, checkOutDate) => {
        try {
            let hotels = await AmadeusApi.getHotelByCity(formData.cityCode, 
                                                         formData.checkInDate,
                                                         formData.checkOutDate);
            console.log(hotels)
            setHotels(hotels);
            // setHotels(hotels.map(d => d));
          }
        catch (e) {
            console.log(e);
        }
    }

    if (!hotels) return <LoadingSpinner />;

    return (
      <div className="p-4">
            <SearchHotels findHotels={findHotels} />
            {hotels.length === 0 ? (
              // {hotels.length ? (
        <div className='card J text-light'> 
        {/* <h1 className="card bg-light text-center">Here your find Hotels</h1> */}
        {hotels &&
        hotels.map((h) => (
          <HotelDetail
                key= {h.hotel.id} 
                id= {h.id} 
                name= {h.name}
                cityName= {h.cityName}
                stateCode= {h.stateCode}
                room= {h.room}
                guests= {h.guests}
                price={h.price}
                currency={h.currency}
                checkInDate= {h.checkInDate}
                checkOutDate= {h.checkOutDate}
                rating= {h.rating}
                address= {h.address}
                contact={h.contact}
                description= {h.description}
                amenities= {h.amenities}
                imgUrl= {h.imgUrl}
          />
          ))} 
        </div>
        ) : (
          <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
            Sorry, no results were found!</p>
        )} <br/>
        </div>
    )
}

export default HotelsList;
