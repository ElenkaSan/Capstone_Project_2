import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";
import ReactPaginate from 'react-paginate';
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
    const [hotelsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0)

    const getData = (hotels) => {
      console.log(hotels)
      return (
         <div>
           {hotels.data.map((hotel) => (
          // console.log(hotel)
          <HotelCard
                key= {hotel.hotelId} 
                hotel={hotel}
          />
          ))} 
         </div>
       )
     }

    //hotel offer Mia 
    const findHotels = async (formData) => {
        try {
            let hotelss = await AmadeusApi.getHotelByCity(formData.cityCode, 
                                                         formData.checkInDate,
                                                         formData.checkOutDate
                                                         );
            console.log(hotelss)
            const slice = hotelss.slice(offset - 1 , offset - 1 + hotelsPerPage)
            // For displaying Data
            const postData = getData(slice)
            // Using Hooks to set value
            setHotels(postData)
            setPageCount(Math.ceil(hotelss.length / hotelsPerPage))
          }
         catch (e) {
          console.error(e);
        }
    }

    const handlePageClick = (event) => {
      const selectedPage = event.selected;
      setOffset(selectedPage + 1)
    }

    if (!hotels) return <LoadingSpinner />;

    return (
     
      <div className="p-4">
         {/* {console.log(hotels.data)} */}
            <SearchHotels findHotels={findHotels} />
           {/* {hotels.length === 0 ? ( */}
           {/* {hotels.length ? ( */}
          {Array.isArray(hotels.data) ? (
        <div className='text-light'> 
        {hotels.data}
        <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
        </div>
      ) : ( 
          <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
            Sorry, no results were found!</p>
        )} <br/> 
        </div>
    )
}

export default HotelsList;