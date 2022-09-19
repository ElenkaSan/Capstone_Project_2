import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import moment from "moment";


const SavedFlightHotel = props => {
  if (props.flight.segments) {
  }

  return (
    <div>
      <Card className="J px-4 text-center">
        <CardHeader className="T text-light font-weight-bold">
          Saved Flights and Hotels{"  "}
        </CardHeader>
        {
        props.flight.segments ? (
          <CardBody className="savedFlightHotel">
            <Row>
              <Col lg={12}>
                <h5 className="start-date-text">Saved Flight(s)</h5>
                {!props.flight.itineraries[0].segments.length ? (
                  <div></div>
                ) : (
                  <p>
                    Total Price:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(props.flight.price.$numberDecimal)}
                  </p>
                )}
              </Col>
              <Col lg={6}>
                <h5 className="start-date-text">Outgoing Flight</h5>
                {!props.flight.segments[0].length ? (
                  <p>There is not a saved flight.</p>
                ) : (
                  <div>
                    {props.flight.itineraries[0].segments[0].map(
                      (segment, index) => (
                        <div key={index}>
                          <p>
                            Departure:{" "}
                            {segment.itineraries[0].segments[0].departure.iataCode} at{" "}
                            {moment(segment.itineraries[0].segments[0].departure.at, [
                              "YYYY",
                              moment.ISO_8601
                            ]).format("MM/DD/YYYY h:mm a")}
                          </p>
                          <p>
                            Arrival: {segment.itineraries[0].segments[1].arrival.iataCode} at{" "}
                            {moment(segment.itineraries[0].segments[1].arrival.at, [
                              "YYYY",
                              moment.ISO_8601
                            ]).format("MM/DD/YYYY h:mm a")}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </Col>
              <Col lg={6}>
                <h5 className="start-date-text">Return Flight</h5>
                {!props.flight.itineraries[1].segments ||
                !props.flight.itineraries[1].segments.length ? (
                  <p>There is not a saved return flight.</p>
                ) : (
                  <div>
                    {props.flight.itineraries[1].segments[0].map(
                      (segment, index) => (
                        <div key={index}>
                          <p>
                            Departure:{" "}
                            {segment.itineraries[1].segments[0].departure.iataCode} at{" "}
                            {moment(segment.itineraries[1].segments[0].departure.at, [
                              "YYYY",
                              moment.ISO_8601
                            ]).format("MM/DD/YYYY h:mm a")}
                          </p>
                          <p>
                            Arrival: {segment.itineraries[1].segments[0].arrival.iataCode} at{" "}
                            {moment(segment.itineraries[1].segments[0].arrival.at, [
                              "YYYY",
                              moment.ISO_8601
                            ]).format("MM/DD/YYYY h:mm a")}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </Col>
              <Col lg={12}>
                <h5 className="countdown-text">Saved Hotel</h5>
                {!props.hotel ? (
                  <p>There is not a saved hotel.</p>
                ) : (
                  <div>
                    <p>Hotel: {props.hotel.hotel.name}</p>
                    {props.hotel.roomType ? (
                      <p>Room Type: {props.hotel.offers[0].room.typeEstimated.category}</p>
                    ) : (
                      <div></div>
                    )}
                    <p>
                      Dates:{" "}
                      {moment(props.hotel.offers[0].checkInDate, "YYYY-MM-DD").format(
                        "MM/DD/YYYY"
                      )}{" "}
                      to{" "}
                      {moment(props.hotel.offers[0].checkOutDate, "YYYY-MM-DD").format(
                        "MM/DD/YYYY"
                      )}
                    </p>
                    <p>
                      Price:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: props.hotel.offers[0].price.currency || "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }).format(props.hotel.price.$numberDecimal)}
                    </p>
                  </div>
                )}
              </Col>
            </Row>
          </CardBody>
        ) : (
          <div>
            
          </div>
        )}
      </Card>
    </div>
  );
};

export default SavedFlightHotel;