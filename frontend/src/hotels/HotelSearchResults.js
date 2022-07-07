import React, { Component } from "react";
import { Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import moment from "moment";

class HotelSearchResults extends Component {
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

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");
    console.log(event.currentTarget);
    console.log(event.currentTarget.dataset);
    console.log(this.props);
    this.props.getHotelInfoFromButton({
      id: event.currentTarget.id,
      name: event.currentTarget.dataset.hotelname,
      roomType: event.currentTarget.dataset.room,
      price: event.currentTarget.dataset.price,
      checkInDate: event.currentTarget.dataset.checkindate,
      checkOutDate: event.currentTarget.dataset.checkoutdate,
      currency: event.currentTarget.dataset.currency
    });
  }

  render() {
    return (
      <Col>
        <Card className="travelCard">
          <CardHeader className="hotel-results-header">
            Hotel: {this.props.hotel.hotel.name}
          </CardHeader>
          <CardBody className="hotel-details">
            <p>
              Room Type:{" "}
              {this.props.hotel.offers[0].room.typeEstimated.category}
            </p>
            <p>
              Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: this.props.hotel.offers[0].price.currency || "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(this.props.hotel.offers[0].price.total)}{" "}
              for{" "}
              {moment(
                this.props.hotel.offers[0].checkInDate,
                "YYYY-MM-DD"
              ).format("MM/DD/YYYY")}{" "}
              through{" "}
              {moment(
                this.props.hotel.offers[0].checkOutDate,
                "YYYY-MM-DD"
              ).format("MM/DD/YYYY")}
            </p>
            <p>Rating: {this.props.hotel.hotel.rating}</p>
            <Button
              className="hotel-results-btn"
              id={this.props.hotel.hotel.hotelId}
              data-hotelname={this.props.hotel.hotel.name}
              data-room={this.props.hotel.offers[0].room.typeEstimated.category}
              data-price={this.props.hotel.offers[0].price.total}
              data-currency={this.props.hotel.offers[0].price.currency}
              data-checkindate={this.props.hotel.offers[0].checkInDate}
              data-checkoutdate={this.props.hotel.offers[0].checkOutDate}
              onClick={this.handleSubmit}
              type="submit"
            >
              Save this Hotel
            </Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default HotelSearchResults;