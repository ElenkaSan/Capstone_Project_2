import React, { Component } from "react";
import { Card, CardHeader, CardBody, Container, Col } from "reactstrap";
import HotelSearchForm from "./HotelSearchForm";
import HotelSearchResults from "./HotelSearchResults";
import "./HotelSearchPage.css";
import axios from "axios";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";


class HotelSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      trip: "",
      user: "",
      search: false,
      isLoading: false
    };
    //this.setState = this.setState.bind(this);
    this.getHotelInfoFromButton = this.getHotelInfoFromButton.bind(this);
  }

  deleteItem = id => {
    const hotels = this.state.hotels.filter(hotel => {
      return hotel.id !== id;
    });
    this.setState({ hotels });
  };

  componentDidMount() {
    this.setState(
      {
        trip: this.props.trip,
        user: this.props.user
      },
      () => console.log(this.state)
    );
  }

  hotelSearch = hotelSearch => {
    this.setState({
      search: true,
      isLoading: true
    });
    this.callApi(
      hotelSearch.city,
      hotelSearch.checkInDate,
      hotelSearch.checkOutDate
    )
      .then(res => this.setState({ hotels: res.data, isLoading: false }))
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  callApi = async (city, checkInDate, checkOutDate) => {
    const response = await fetch(
      `/hotels/${city}/${checkInDate}/${checkOutDate}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getHotelInfoFromButton(hotelObject) {
    if (!this.state.trip) {
      toast.notify(
        "Please create an account before attempting to save a trip.",
        {
          position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
          duration: 10000 // This notification will not automatically close
        }
      );
    } else {
      this.updateDB(this.state.trip, hotelObject);
      console.log("hotel is updated");
    }
  }

  db = async (requestOptions, trip_id) => {
    const response = await axios.put(`/savehotel/${trip_id}`, requestOptions);
    const body = await response;
    if (response.status !== 200) {
      toast.notify(
        "We are having a little trouble saving your information - please try again.",
        {
          position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
          duration: 5000 // This notification will not automatically close
        }
      );
      throw Error(body.message);
    } else {
      toast.notify("Your hotel has been saved.", {
        position: "bottom", // top-left, top, top-right, bottom-left, bottom, bottom-right
        duration: 2000 // This notification will not automatically close
      });
    }
    return body;
  };
  updateDB = (trip_id, hotelInfo) => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      hotel: hotelInfo
    };
    this.db(requestOptions, trip_id).then(data => console.log(data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  };

  render() {
    return (
      <div>
        <Container>
          <Card className="hotel-card">
            <CardHeader className="hotel-header">Search Hotels</CardHeader>
            <CardBody className="hotel-body">
              <HotelSearchForm hotelSearch={this.hotelSearch} />
            </CardBody>
          </Card>

          {!this.state.hotels.length &&
          this.state.search &&
          !this.state.isLoading ? (
            <Col>
              <Card className="travelCard">
                <CardHeader>There are no hotel results.</CardHeader>
              </Card>
            </Col>
          ) : (
            this.state.hotels.map(hotel => (
              <HotelSearchResults
                key={hotel.hotel.hotelId}
                hotel={hotel}
                getHotelInfoFromButton={this.getHotelInfoFromButton}
              />
            ))
          )}
        </Container>
      </div>
    );
  }
}

export default HotelSearchPage;