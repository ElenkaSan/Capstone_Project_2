import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import moment from "moment";
import FlightSegments from "./FlightSegments";

class TravelSearchResults extends Component {
  constructor() {
    super();
    this.state = {
      saveFlightId: "",
      saveFlightOrigin: "",
      saveFlightDest: "",
      saveFlightDep: "",
      saveFlightArr: "",
      saveFlightPrice: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Set state to a user's username and password
  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");
    this.props.getTripInfoFromButton({
      id: event.currentTarget.id,
      origin: event.currentTarget.dataset.origin,
      destination: event.currentTarget.dataset.destination,
      departure: event.currentTarget.dataset.departure,
      arrival: event.currentTarget.dataset.arrival,
      price: event.currentTarget.dataset.price,
      key: event.currentTarget.dataset.key
    });
  }

  timeTraveled(index) {
    let leaveTime = moment(
      this.props.flight.offerItems[0].services[index].segments[0].flightSegment
        .departure.at,
      ["YYYY", moment.ISO_8601]
    );
    let arriveTime = moment(
      this.props.flight.offerItems[0].services[index].segments[
        this.props.flight.offerItems[0].services[index].segments.length - 1
      ].flightSegment.arrival.at,
      ["YYYY", moment.ISO_8601]
    );
    let diff = arriveTime.diff(leaveTime, "minutes");
    return `${Math.floor(diff / 60)} hours, ${diff % 60} minutes`;
  }

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    // departingTime = this.timeTraveled(0);
    // returningTime = this.timeTraveled(1);
    return (
      <Card className="travelCard">
        <CardHeader className="flight-results-header">
          Airline:{" "}
          {
            this.props.flight.offerItems[0].services[0].segments[0]
              .flightSegment.carrierCode
          }
        </CardHeader>
        <CardBody className="flight-details">
          <h5>
            <strong>
              Departing Flights{" "}
              {this.props.flight.offerItems[0].services[0].segments.length -
                1 ===
              0
                ? "(Nonstop)"
                : this.props.flight.offerItems[0].services[0].segments.length -
                    1 ===
                  1
                ? `(${this.props.flight.offerItems[0].services[0].segments
                    .length - 1} Stop)`
                : `(${this.props.flight.offerItems[0].services[0].segments
                    .length - 1} Stops)`}
            </strong>
          </h5>
          {this.props.flight.offerItems[0].services[0].segments.map(
            (segment, index) => (
              <FlightSegments key={index} segment={segment} />
            )
          )}
          <p>Total Flight Time: {this.timeTraveled(0)}</p>
          <hr></hr>
          {this.props.flight.offerItems[0].services[1] ? (
            <div>
              <h5>
                <strong>
                  Returning Flights{" "}
                  {this.props.flight.offerItems[0].services[1].segments.length -
                    1 ===
                  0
                    ? "(Nonstop)"
                    : this.props.flight.offerItems[0].services[1].segments
                        .length -
                        1 ===
                      1
                    ? `(${this.props.flight.offerItems[0].services[1].segments
                        .length - 1} Stop)`
                    : `(${this.props.flight.offerItems[0].services[1].segments
                        .length - 1} Stops)`}
                </strong>
              </h5>
              {this.props.flight.offerItems[0].services[1].segments.map(
                (segment, index) => (
                  <FlightSegments key={index} segment={segment} />
                )
              )}
              <p>Total Flight Time: {this.timeTraveled(1)}</p>
              <hr></hr>
              <h5>Price:</h5>{" "}
              <p className="flight-details">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(this.props.flight.offerItems[0].price.total)}
              </p>
            </div>
          ) : (
            <div></div>
          )}

          <br></br>
          <Button
            className="flight-results-btn"
            id={this.props.flight.id}
            data-origin={
              this.props.flight.offerItems[0].services[0].segments[0]
                .flightSegment.departure.iataCode
            }
            data-destination={
              this.props.flight.offerItems[0].services[0].segments[0]
                .flightSegment.arrival.iataCode
            }
            data-departure={moment(
              this.props.flight.offerItems[0].services[0].segments[0]
                .flightSegment.departure.at,
              ["YYYY", moment.ISO_8601]
            ).format("MM/DD/YYYY h:mm a")}
            data-arrival={moment(
              this.props.flight.offerItems[0].services[0].segments[0]
                .flightSegment.arrival.at,
              ["YYYY", moment.ISO_8601]
            ).format("MM/DD/YYYY h:mm a")}
            data-price={this.props.flight.offerItems[0].price.total}
            data-key={this.props.flightNumber}
            onClick={this.handleSubmit}
            type="submit"
          >
            Save Flight
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default TravelSearchResults;