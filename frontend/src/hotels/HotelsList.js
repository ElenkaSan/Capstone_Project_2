import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";
// import HotelCard from "./HotelCard";
import HotelDetail from "./HotelDetail";
import SearchHotels from "./SearchHotels";
import LoadingSpinner from "../common/LoadingSpinner";
import '../flights/flight.css'

const HotelsList = () => {

    const [hotels, setHotels] = useState([]);

    const findHotels = async (formData) => {
    // const findHotels = async (city, checkInDate, checkOutDate) => {
        try {
            let data = await AmadeusApi.getHotelByCity(formData);
            // let data = await AmadeusApi.getHotelByCity({city, checkInDate, checkOutDate});
            // let hotels = await Api.getHotels(formData);
            setHotels(data);
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
        <div className='card J text-light'> 
        {/* <h1 className="card bg-light text-center">Here your find Hotels</h1> */}
        {hotels}
        {hotels.map((h) => (
          <HotelDetail
          key={h.id} 
          id={h.id} 
          hotelname={h.hotelname}
          roomcategory={h.roomcategory}
          price={h.price}
          currency={h.currency}
          checkindate={h.checkindate}
          checkoutdate={h.checkoutdate}
          rating={h.rating}
          imgUrl ={h.imgUrl}
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