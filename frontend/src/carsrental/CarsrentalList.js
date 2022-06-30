import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Api from "../api";
import CarCard from "./CarCard";
import SearchCars from "./SearchCars";
import LoadingSpinner from "../common/LoadingSpinner";
import ReactPaginate from 'react-paginate';
import '../flights/flight.css'

const CarsrentalList = () => {

    const [cars, setCars] = useState([]);
    const [carsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [pageCount, setPageCount] = useState(0)

    const getData = (cars) => {
        // {console.log(cars)}
        return (
          <div>
            {cars.map((c) => (
                // <Link to={`cars/${c.id}`} key={c.id}>
                <CarCard
                key={c.id} 
                id={c.id} 
                carName={c.carName}
                locationP={c.locationP}
                locationR={c.locationR}
                dateTimeP={c.dateTimeP} 
                dateTimeR={c.dateTimeR}
                description ={c.description}
                price ={c.price}
                imgUrl ={c.imgUrl}
                 />
                //  </Link>
            ))}
          </div>
        )
      }

    useEffect(function () {
        async function getCars() {
            try {
                let data = await Api.getCars();
                setCars(data);
            }
            catch (e) {
                console.log(e);
            }
        }
        getCars();
    }, []);

    const findCars = async (formData) => {
        try {
            let cars = await Api.getFilteredCars(formData);
            const slice = cars.slice(offset - 1 , offset - 1 + carsPerPage)
            const data = getData(slice)
            setCars(data);
            setPageCount(Math.ceil(cars.length / carsPerPage))
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
        findCars()
      }, [offset])

    const resetCarsList = async () => {
        try {
            let data = await Api.getCars();
            setCars(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    if (!cars) return <LoadingSpinner />;

    return (
        <div>
            <SearchCars findCars={findCars} resetCarsList={resetCarsList} />
            {/* {cars.props.children.length ? ( */}
            {cars.length ? (
      <div>
      <h1 className="card bg-light text-center">Here your find Rental Cars</h1>
      {cars}
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
        <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
          Sorry, no results were found!</p>
      )} <br/>
        </div>
    )
}

export default CarsrentalList;