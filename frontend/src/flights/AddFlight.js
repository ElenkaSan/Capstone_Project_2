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
import FlightsSearchResults from "./FlightsSearchResults";
import './flight.css'

// import FlightData from "../API/FlightData";
// import airports from "../airportData";
// import Box from "@mui/material/Box"
// import TextField from "@mui/material/TextField"
// import Autocomplete from "@mui/material/Autocomplete"

const AddFlight = () => {

    const [flights, setFlights] = useState([]);
    const [flightOneway, setFlightOneway]  = useState([]);

    const findFlights = async (formData) => {
        try {
            let flights = await AmadeusApi.getFlightAround(formData.originLocationCode,
                                                      formData.destinationLocationCode, 
                                                      formData.departureDate,
                                                      formData.returnDate,
                                                      formData.adults,
                                                    //   formData.travelClass,
                                                    //   formData.nonStop,
            );
            console.log({flights});
            // setFlights(flights.map(d => d));
            setFlights(flights);
        }
        catch (e) {
            console.log(e)
        }
    }

    const flightSearchOneway = async (formData) => {
        try {
            let flightOneway = await AmadeusApi.getFlightOneway(formData.originLocationCode,
            formData.destinationLocationCode, 
            formData.departureDate,
            formData.adults,
            );
            console.log({flightOneway});
            setFlightOneway(flightOneway)
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

    if (!flights || !flightOneway) return <LoadingSpinner />;
    return (
        <div className="p-4">
            <SearchFlights findFlights={findFlights} 
            flightSearchOneway={flightSearchOneway}
            />
            {/* <Card className="travel-card">
          <CardHeader className="travel-header">Search Flights</CardHeader>
          <CardBody className="travel-body">
            <Form className="travel-form">
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label className="travel-form-label" for="flightSearch">
                      Flying From
                    </Label>
                    <Autocomplete
                         id="air"
                         sx={{ width: 300 }}
                         options={airports}
                         autoHighlight
                         getOptionLabel={(option) => option.label}
                         renderOption={(props, option) => (
                           <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                             {option.label} ({option.id})
                           </Box>
                         )}
                         renderInput={(params) => (
                           <TextField
                             {...params}
                             label="Choose a Airport or City"
                            //  inputProps={{
                            //    ...params.inputProps,
                            //    autoComplete: 'new-password', // disable autocomplete and autofill
                            //  }}
                           />
                         )}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button className="travel-form-btn" onClick={this.handleSubmit}>
                Submit
              </Button>
              <br></br>
            </Form>
          </CardBody>
        </Card> */}
            {/* {flights.props.children.length ? ( */}
            {flights.length || flightOneway.length === 0 ? (
      <div className="card J text-light">
        {/* <h1 className="text-center">Here your find Flights</h1> */}
      {flights || flightOneway}
      {flights.map((flight, index) => (
            <FlightsSearchResults
              key={flight.id}
              flightNumber={index}
              flight={flight}
            //   updateDB={this.updateDB}
            //   getTripInfoFromButton={this.getTripInfoFromButton}
            //   trip={this.state.trip_id}
            />
         
                // <Link to={`flights/${f.id}`} key={f.id}>
        //         <FlightCard
        //         key={f.id} 
        //         id={f.id} 
        //         // flightNumber={index}
        //         origin={f.originLocationCode} 
        //         destination={f.destinationLocationCode} 
        //         startDate={f.departureDate}
        //         endDate ={f.returnDate} 
        //         adults ={f.adults}
        //         // oneWay ={f.oneWay}
        //         // nonStop ={f.nonStop}
        //          />
        //         //  </Link>
            ))} 
           <Row>
          || {flightOneway.map(flight => (
            <FlightSearchOneway key={flight.flight.id} flight={flight} />
          ))}
        </Row>
        </div>
      ) : (
        <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
          Sorry, no results were found!</p>
      )}
      <br/>
        </div>
    )
}

export default AddFlight;
