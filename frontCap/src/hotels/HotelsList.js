import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../api";
import HotelCard from "./HotelCard";
import SearchHotels from "./SearchHotels";
import LoadingSpinner from "../common/LoadingSpinner";
import ReactPaginate from 'react-paginate';

const HotelsList = () => {

    const [hotels, setHotels] = useState([]);
    const [hotelsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0)

    const getData = (hotels) => {
        {console.log(hotels)}
        return (
          <div>
            {hotels.map((h) => (
                <Link to={`hotels/${h.id}`} key={h.id}>
                <HotelCard
                // key={f.id} 
                // id={f.id} 
                // numberOfPassengers={f.numberOfPassengers} 
                // type={f.type} 
                // classType={f.classType}
                // locationD ={f.locationD} 
                // locationA ={f.locationA}
                // dateD ={f.dateD}
                // dateA ={f.dateA}
                // priceMin ={f.priceMin}
                // priceMax ={f.priceMax}
                // sortOrder ={f.sortOrder}
                 />
                 </Link>
            ))}
          </div>
        )
      }

    useEffect(function () {
        async function getHotels() {
            try {
                let data = await Api.getHotels();
                setHotels(data);
            }
            catch (e) {
                console.log(e);
            }
        }
        getHotels();
    }, []);

    const findHotels = async (formData) => {
        try {
            let hotels = await Api.getFilteredHotels(formData);
            const slice = hotels.slice(offset - 1 , offset - 1 + hotelsPerPage)
            const data = getData(slice)
            setHotels(data);
            setPageCount(Math.ceil(hotels.length / hotelsPerPage))
        }
        catch (e) {
            console.log(e);
        }
    }

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
      };
      
      useEffect(() => {
        findHotels()
      }, [offset])

    const resetHotelsList = async () => {
        try {
            let data = await Api.getHotels();
            setHotels(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    if (!hotels) return <LoadingSpinner />;

    return (
        <div className="col-md-8 offset-md-2">
            <h1>Here your find Hotels</h1>
            <SearchHotels findHotels={findHotels} resetHotelsList={resetHotelsList} />
            {hotels.props.children.length ? (
      <div>
      {hotels}
      <div className="d-flex justify-content-center col-md-8 offset-md-2">
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
        <p className="bg-danger text-light lead font-weight-bold text-center">
          Sorry, no results were found!</p>
      )}
        </div>
    )
}

export default HotelsList;