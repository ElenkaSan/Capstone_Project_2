import React from 'react';
import { Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import moment from 'moment';

const TravelSearchResults = props => {
  return (
      <Col>
        <Card className="travelCard">
          <CardHeader>Go to {props.flight.destination}</CardHeader>
          <CardBody>
            <p>Departure: {props.flight.origin} at {moment(props.flight.departureDate, "YYYY-MM-DD").format("MM/DD/YYYY")}</p>
            <p>Arrival: {props.flight.destination} at {moment(props.flight.returnDate, "YYYY-MM-DD").format("MM/DD/YYYY")}</p>
            <p>Price: ${props.flight.price.total}</p>
            <Button>Search this Flight</Button>
          </CardBody>
        </Card>
      </Col>
  );
};

export default TravelSearchResults;