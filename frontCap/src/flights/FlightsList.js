import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../api";
import FlightCard from "./FlightCard";
import SearchFlights from "./SearchFlights";
import LoadingSpinner from "../common/LoadingSpinner";
import ReactPaginate from 'react-paginate';
import FlightData from "../API/FlightData";

const FlightsList = () => {

    const [flights, setFlights] = useState([]);
    const [flightsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0)

    const getData = (flights) => {
        {console.log(flights)}
        return (
          <div>
            {flights.map((f) => (
                <Link to={`flights/${f.id}`} key={f.id}>
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
                 </Link>
            ))}
          </div>
        )
      }

    useEffect(function () {
        async function getFlights() {
            try {
                let data = await Api.getFlights();
                let flights = await FlightData.searchFlight();
                console.log(flights)
                setFlights(data);
            }
            catch (e) {
                console.log(e);
            }
        }
        getFlights();
    }, []);

    const findFlights = async (formData) => {
        try {
            // let flights = await Api.getFilteredFlights(formData);
            let flights = await FlightData.searchFlight(formData);
            // let flights = await Api.getFlights(formData);
            const slice = flights.slice(offset - 1 , offset - 1 + flightsPerPage)
            const data = getData(slice)
            setFlights(data);
            setPageCount(Math.ceil(flights.length / flightsPerPage))
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
        findFlights()
      }, [offset])

    const resetFlightsList = async () => {
        try {
            let data = await Api.getFlights();
            setFlights(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    if (!flights) return <LoadingSpinner />;
    return (
        <div className="col-md-8 offset-md-2">
            <h1>Here your find Flights</h1>
            <SearchFlights findFlights={findFlights} resetFlightsList={resetFlightsList} />
            {flights.props.children.length ? (
      <div>
      {flights}
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

export default FlightsList;