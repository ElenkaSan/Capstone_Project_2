// import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// import Api from "../api";
// import FlightCard from "./FlightCard";
// import SearchFlights from "./SearchFlights";
// import LoadingSpinner from "../common/LoadingSpinner";
// import ReactPaginate from 'react-paginate';
// import './flight.css'
// // import FlightData from "../API/FlightData";

// const FlightsList = () => {

//     const [flights, setFlights] = useState([]);
//     const [flightsPerPage] = useState(5);
//     const [offset, setOffset] = useState(1);
//     const [pageCount, setPageCount] = useState(0)

//     const getData = (flights) => {
//         // {console.log(flights)}
//         return (
//           <div>
//             {flights.map((f) => (
//                 // <Link to={`flights/${f.id}`} key={f.id}>
//                 <FlightCard
//                 key={f.id} 
//                 id={f.id} 
//                 numberOfPassengers={f.numberOfPassengers} 
//                 type={f.type} 
//                 classType={f.classType}
//                 locationD ={f.locationD} 
//                 locationA ={f.locationA}
//                 dateD ={f.dateD}
//                 dateA ={f.dateA}
//                 priceMin ={f.priceMin}
//                 priceMax ={f.priceMax}
//                 sortOrder ={f.sortOrder}
//                  />
//                 //  </Link>
//             ))}
//           </div>
//         )
//       }

//     useEffect(function () {
//         async function getFlights() {
//             try {
//                 let data = await Api.getFlights();
//                 // let data = await FlightData.searchFlight();
//                 // console.log(data)
//                 setFlights(data);
//                 // setFlights(data.map(d => d));
//             }
//             catch (e) {
//                 console.log(e);
//             }
//         }
//         getFlights();
//     }, []);

//     const findFlights = async (formData) => {
//         try {
//             let flights = await Api.getFilteredFlights(formData);
//             // let flights = await FlightData.searchFlight(formData);
//             // let flights = await Api.getFlights(formData);
//             const slice = flights.slice(offset - 1 , offset - 1 + flightsPerPage)
//             const data = getData(slice)
//             // setFlights(data);
//             setFlights(data.map(d => d));
//             setPageCount(Math.ceil(flights.length / flightsPerPage))
//         }
//         catch (e) {
//             console.log(e);
//         }
//     }

//     const handlePageClick = (event) => {
//         const selectedPage = event.selected;
//         setOffset(selectedPage + 1)
//       };
      
//       useEffect(() => {
//         findFlights()
//       }, [offset])

//     const resetFlightsList = async () => {
//         try {
//             let data = await Api.getFlights();
//             // let data = await FlightData.searchFlight();
//             setFlights(data)
//             // setFlights(data.map(d => d));
//         }
//         catch (e) {
//             console.log(e);
//         }
//     }

//     if (!flights) return <LoadingSpinner />;
//     return (
//         <div>
//             <SearchFlights findFlights={findFlights} resetFlightsList={resetFlightsList} />
//             {/* {flights.props.children.length ? ( */}
//             {flights.length ? (
//       <div>
//         <h1 className="card bg-light text-center">Here your find Flights</h1>
//       {flights}
//       <div className="d-flex justify-content-center col-md-8 offset-md-2">
//         <ReactPaginate
//           previousLabel={"<"}
//           nextLabel={">"}
//           breakLabel={"..."}
//           breakClassName={"break-me"}
//           pageCount={pageCount}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           subContainerClassName={"pages pagination"}
//           activeClassName={"active"} />
//       </div>
//       </div>
//       ) : (
//         <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
//           Sorry, no results were found!</p>
//       )}
//       <br/>
//         </div>
//     )
// }

// export default FlightsList;