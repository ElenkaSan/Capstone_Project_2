import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Api from "../api";
import HotelCard from "./HotelCard";
import SearchHotels from "./SearchHotels";
import LoadingSpinner from "../common/LoadingSpinner";
import '../flights/flight.css'

const AddHotel = () => {

    const [hotels, setHotels] = useState([]);

    const findHotels = async (formData) => {
        try {
            // let hotels = await Api.getFilteredHotels(formData);
            let hotels = await await Api.getHotels(formData);
            setHotels(hotels);
            // setHotels(hotels.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    // useEffect(() => {
    //     findHotels()
    //   }, [])


    if (!hotels) return <LoadingSpinner />;
    return (
        <div>
            <SearchHotels findHotels={findHotels} />
            {/* {hotels.props.children.length ? ( */}
            {hotels.length ? (
      <div>
      <h1 className="card bg-light text-center">Here your find Hotels</h1>
      {hotels}
      <div>
            {hotels.map((h) => (
                // <Link to={`hotels/${h.id}`} key={h.id}>
                <HotelCard
                key= {h.id} 
                id= {h.id} 
                location_id= {h.location_id}
                adults= {h.numberOfGuests}
                rooms= {h.roomNumber}
                nights= {h.nights}
                // hotelName={h.hotelName} 
                checkin={h.checkin} 
                // checkout={h.checkout}
                // reviews ={h.reviews} 
                // numberOfGuests ={h.numberOfGuests}
                // roomNumber ={h.roomNumber}
                // description ={h.description}
                // price ={h.price}
                imgUrl ={h.imgUrl}
                 />
                //  </Link>
            ))}
          </div>
      </div>
      ) : (
        <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
          Sorry, no results were found!</p>
      )} <br/>
        </div>
    )
}

export default AddHotel;