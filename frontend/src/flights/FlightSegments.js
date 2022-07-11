import React from "react";
//import { Card, CardHeader, CardBody, Button } from "reactstrap";
import moment from "moment";

const FlightSegments = props => {
  return (
    <div className="flight-details">
      <p className="flight-details">
        Departure: {props.segment.flightSegment.departure.iataCode} at{" "}
        {moment(props.segment.flightSegment.departure.at, [
          "YYYY",
          moment.ISO_8601
        ]).format("MM/DD/YYYY h:mm a")}
      </p>
      <p className="flight-details">
        Arrival: {props.segment.flightSegment.arrival.iataCode} at{" "}
        {moment(props.segment.flightSegment.arrival.at, [
          "YYYY",
          moment.ISO_8601
        ]).format("MM/DD/YYYY h:mm a")}
      </p>
      <hr></hr>
      {/* <br></br> */}
    </div>
  );
};

export default FlightSegments;