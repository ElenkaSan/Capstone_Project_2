import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import UserContext from "../auth/UserContext";
import moment from 'moment';

const FlightSearchOneway = props => {
  const { hasAppliedTrip, applyToTrip, unApplyToTrip } = useContext(UserContext);
  const [applied, setApplied] = useState(true);

  const apply = async () => {
    if (hasAppliedTrip(props.flightId)) return;
    {
      applyToTrip(props.flightId);
      setApplied(true);
      console.log("hotel added", props.flightId);
    }
  };

  useEffect(() => {
    if (hasAppliedTrip) {
      setApplied(hasAppliedTrip(props.flightId));
    }
  }, [props.flightId, hasAppliedTrip]);

  const unapplied = async () => {
    unApplyToTrip(props.flightId);
    setApplied(false);
    console.log("hotel removed", props.flightId);
  };
  const unappliedButton = (
    <button
      onClick={unapplied}
      className="btn btn-outline-info font-weight-bold text-uppercase float-right"
    >
      Remove Flight{" "}
    </button>
  );

  const applyButton = (
    <button
      onClick={apply}
      className="btn btn-warning font-weight-bold text-uppercase float-right"
    >
     Save this Flight{" "}
    </button>
  );

  return (
    <section className="has-icons-left"
    style={{ margin: '10px'}} >
        <Card className="J card col-md-8 offset-md-2">
        {applied}
          <CardHeader className="T font-weight-bold text-light text-center">
            <h5>Airline:{" "}
            {props.flight.itineraries[0].segments[0].carrierCode}. Go to  {props.flight.itineraries[0].segments[0].arrival.iataCode}</h5>
           </CardHeader>
          <CardBody>
          <CardText className="card bg-secondary p-3">
            <p>Departure:  {props.flight.itineraries[0].segments[0].departure.iataCode} at {moment(props.flight.itineraries[0].segments[0].departure.at, "YYYY-MM-DD").format("MM/DD/YYYY")}  from  terminal  {props.flight.itineraries[0].segments[0].departure.terminal}
            </p>
            <p>Arrival: {props.flight.itineraries[0].segments[0].arrival.iataCode} at {moment(props.flight.itineraries[0].segments[0].arrival.at, "YYYY-MM-DD").format("MM/DD/YYYY")}</p>
            {/* <p className="T font-weight-bold text-light">Return flight: </p>
            <p> Departure:  {props.flight ? props.flight.itineraries[1].segments[0].departure.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].departure.at, "YYYY-MM-DD").format("MM/DD/YYYY")}
            </p>
            <p>Arrival:  {props.flight ? props.flight.itineraries[1].segments[0].arrival.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].arrival.at, "YYYY-MM-DD").format("MM/DD/YYYY")}
            </p> */}
            <p>
              {/* Price: ${props.flight.price.total} */}
            Price:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: props.flight.price.total.currency || "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(props.flight.price.total)}{" "}
          </p>
          {/* <p>for &nbsp;
          {props.flight.ptravelerPricings ? `${props.flight.ptravelerPricings.travelerType}` : "N/A"}  &nbsp;
            {props.flight.ptravelerPricings.travelerId}
 </p> */}
 </CardText>
           {applied ? unappliedButton : applyButton}
          </CardBody>
        </Card>
      </section>
  );
};

export default FlightSearchOneway;