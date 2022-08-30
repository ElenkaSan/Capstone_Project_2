import React, { useState, useEffect } from "react";
import {
    Form,
    Button,
    Input,
    Row,
    Col,
    FormGroup,
    Label,
    Card,
    CardHeader,
    CardBody,
    Container
  } from "reactstrap";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";
import FlightCard from "./FlightCard";
import SearchFlights from "./SearchFlights";
import LoadingSpinner from "../common/LoadingSpinner";
import FlightSearchOneway from "./FlightSearchOneway";
import FlightsSearchResults from "./extraSafe";
import './flight.css'
// import FlightDetail from "./FlightDetail";
import FlightDetailAround from "./FlightDetailAround";
import { MdOutlineFormatAlignRight } from "react-icons/md";

// import FlightData from "../API/FlightData";
// import airports from "../airportData";
// import Box from "@mui/material/Box"
// import TextField from "@mui/material/TextField"
// import Autocomplete from "@mui/material/Autocomplete"

const AddFlight = () => {

    const [flights, setFlights] = useState([]);
    const [flightOneway, setFlightOneway]  = useState([]);

    const  flightSearchAround = async (formData) => {
        try {
            let flightTwoWay = await AmadeusApi.getFlightAround(formData.originLocationCode,
                                                      formData.destinationLocationCode, 
                                                      formData.departureDate,
                                                      formData.returnDate,
                                                      formData.adults,
                                                    //   formData.travelClass,
                                                    //   formData.nonStop,
            );
            console.log("FLIGHTsAround",flightTwoWay);
            // setFlights(flights.map(d => d));
            setFlights(flightTwoWay);
        }
        catch (e) {
            console.log(e)
        }
    }

    const flightSearchOneway = async (formData) => {
        try {
            let flightOneWay = await AmadeusApi.getFlightOneway(formData.originLocationCode,
                                                                formData.destinationLocationCode, 
                                                                formData.departureDate,
                                                                formData.adults
            );
            console.log("FLIGHTsONEway",flightOneWay);
            // setFlights(flightOneway)
            setFlightOneway(flightOneWay)
            }
        catch (e) {
            console.log(e)
        }
    }

    // deleteItem = id => {
    //     const flights = this.state.flights.filter(flight => {
    //       return flight.id !== id;
    //     });
    //     this.setState({ flights });
    //   };


    // const flightType = flightTwoWay ? "ROUND-TRIP" : flightOneway ? "ONE-WAY" : "";


    if (!flights) return <LoadingSpinner />;
    // if (!flightTwoWay || !flightOneway) return <LoadingSpinner />;
    return (
        <div className="p-4">
          {/* {console.log(flights.data)} */}
          {/* {console.log(flightOneway.data)} */}
            <SearchFlights 
            // findFlights={findFlights} 
            flightSearchOneway={flightSearchOneway}
            flightSearchAround={flightSearchAround}
            />
            {/* {flights.props.children.length ? ( */}
            {/* {flights.length && flightOneway.length === 0 ? ( */}
       {Array.isArray(flights.data ) ? ( 
        <div className="text-light">
          {flights.data.map(flight => (
              <FlightDetailAround key={flight.id} flight={flight} />
            ))}
             </div>  ) : ( <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
      Sorry, no results were found!</p>)
      }

      {Array.isArray(flightOneway.data) ? (
        <div className="text-light"> 
      {flightOneway.data.map(flight => (
              <FlightSearchOneway key={flight.id} flight={flight} />
            ))}
            
         </div>
      ) : ( <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
      Sorry, no results were found!</p>)
      }
      <br/>
        </div>
    )
}

export default AddFlight;

// import React, { useState, useEffect } from "react";
// import {
//     Form,
//     Button,
//     Input,
//     Row,
//     Col,
//     FormGroup,
//     Label,
//     Card,
//     CardHeader,
//     CardBody,
//     Container
//   } from "reactstrap";
// // import { Link } from "react-router-dom";
// // import Api from "../api";
// import AmadeusApi from "../amadeusApi";
// import FlightCard from "./FlightCard";
// import SearchFlights from "./SearchFlights";
// import LoadingSpinner from "../common/LoadingSpinner";
// import FlightSearchOneway from "./FlightSearchOneway";
// import FlightsSearchResults from "./FlightsSearchResults";
// import './flight.css'
// // import FlightDetail from "./FlightDetail";
// import FlightDetailAround from "./FlightDetailAround";
// import { MdOutlineFormatAlignRight } from "react-icons/md";

// // import FlightData from "../API/FlightData";
// // import airports from "../airportData";
// // import Box from "@mui/material/Box"
// // import TextField from "@mui/material/TextField"
// // import Autocomplete from "@mui/material/Autocomplete"

// const AddFlight = () => {

//     const [flights, setFlights] = useState([]);
//     // const [flightOneway, setFlightOneway]  = useState([]);
    
//     // const findFlights = async (formData) => {
//     //   try {
//     //       const response = await fetch(
//     //         flights
//     //         ? `/flights/${formData.originLocationCode}/${formData.destinationLocationCode}/${formData.departureDate}/${formData.adults}`
//     //         : `/flightsround/${formData.departureDate}/${formData.destinationLocationCode}/${formData.departureDate}/${formData.returnDate}/${formData.adults}`
//     //       )
//     //       console.log("FLIGHTS",response);
//     //         // setFlights(flights.map(d => d));
//     //         setFlights(response);
//     //     }
//     //     catch (e) {
//     //         console.log(e)
//     //     }
//     // }

//     const  flightSearchAround = async (formData) => {
//         try {
//             let flightTwoWay = await AmadeusApi.getFlightAround(formData.originLocationCode,
//                                                       formData.destinationLocationCode, 
//                                                       formData.departureDate,
//                                                       formData.returnDate,
//                                                       formData.adults,
//                                                     //   formData.travelClass,
//                                                     //   formData.nonStop,
//             );
//             console.log("FLIGHTsAround",flightTwoWay);
//             // setFlights(flights.map(d => d));
//             setFlights(flightTwoWay);
//         }
//         catch (e) {
//             console.log(e)
//         }
//     }

//     // const flightSearchOneway = async (formData) => {
//     //     try {
//     //         let flightOneway = await AmadeusApi.getFlightOneway(formData.originLocationCode,
//     //                                                             formData.destinationLocationCode, 
//     //                                                             formData.departureDate,
//     //                                                             formData.adults
//     //         );
//     //         console.log("FLIGHTsONEway",flightOneway);
//     //         setFlights(flightOneway)
//     //         // setFlightOneway(flightOneway)
//     //         }
//     //     catch (e) {
//     //         console.log(e)
//     //     }
//     // }

//     // deleteItem = id => {
//     //     const flights = this.state.flights.filter(flight => {
//     //       return flight.id !== id;
//     //     });
//     //     this.setState({ flights });
//     //   };


//     // const flightType = flightTwoWay ? "ROUND-TRIP" : flightOneway ? "ONE-WAY" : "";


//     if (!flights) return <LoadingSpinner />;
//     // if (!flightTwoWay || !flightOneway) return <LoadingSpinner />;
//     return (
//         <div className="p-4">
//           {console.log(flights.data)}
//           {/* {console.log(flightOneway.data)} */}
//             <SearchFlights 
//             // findFlights={findFlights} 
//             // flightSearchOneway={flightSearchOneway}
//             flightSearchAround={flightSearchAround}
//             />
//             {/* {flights.props.children.length ? ( */}
//             {/* {flights.length && flightOneway.length === 0 ? ( */}
//             {/* {Array.isArray(flights.data && flightOneway.data) ? ( */}
//             {Array.isArray(flights.data) ? (
//       <div className="text-light">
//         {/* <h1 className="text-center">Here your find Flights</h1> */}
//       {/* {flights || flightOneway} */}
//       {console.log(flights.data)}
//        {/* || <div className="card J text-light"> */}
//              {flights.data.map(flight => (
//               <FlightSearchOneway key={flight.id} flight={flight} />
//             ))}
//          </div>
//       ) : ( <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
//       Sorry, no results were found!</p>)
//       //  ? ( <div className="card J text-light">
//       //        {flightOneway.data.map(flight => (
//       //         <FlightSearchOneway key={flight.flight.id} flight={flight} />
//       //       ))}
//       //    </div>
//       //   ) : ( <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
//       // Sorry, no results were found!</p>)  
//       }
      
//       <br/>
//         </div>
//     )
// }

// export default AddFlight;