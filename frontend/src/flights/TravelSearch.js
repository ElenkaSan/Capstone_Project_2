import React, { Component } from "react";
import { Container, Row, Card, CardHeader, Col } from "reactstrap";
import TravelSearchForm from "./TravelSearchForm";
import TravelSearchResults from "./TravelSearchResults";
import TravelSearchAnyResults from "./TravelSearchAnyResults";
import axios from "axios";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
//import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";

class TravelSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      flightsAny: [],
      trip: "",
      user: "",
      search: false,
      isLoading: false
    };
    //this.setState = this.setState.bind(this);
    this.getTripInfoFromButton = this.getTripInfoFromButton.bind(this);
  }

  db = async (requestOptions, trip_id) => {
    const response = await axios.put(`/saveflight/${trip_id}`, requestOptions);
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
      toast.notify("Your flight has been saved.", {
        position: "bottom", // top-left, top, top-right, bottom-left, bottom, bottom-right
        duration: 2000 // This notification will not automatically close
      });
    }
    return body;
  };
  updateDB = (trip_id, flightInfo) => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      flight: flightInfo
    };
    this.db(requestOptions, trip_id).then(data => console.log(data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
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

  deleteItem = id => {
    const flights = this.state.flights.filter(flight => {
      return flight.id !== id;
    });
    this.setState({ flights });
  };

  flightSearch = flightSearch => {
    this.setState({
      search: true,
      isLoading: true
    });
    this.callApi(
      flightSearch.origin,
      flightSearch.destination,
      flightSearch.startDate,
      flightSearch.endDate,
      flightSearch.numAdults,
      flightSearch.oneWay,
      flightSearch.nonStop
    )
      .then(res => this.setState({ flights: res.data, isLoading: false }))
      .then(res2 => console.log(this.state.flights))
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  flightSearchAny = flightSearch => {
    this.callApiAny(
      flightSearch.origin,
      flightSearch.startDate,
      flightSearch.numAdults
    )
      .then(res => this.setState({ flightsAny: res.data }))
      .catch(err => {
        console.log(err);
      });
  };

  callApi = async (
    origin,
    destination,
    startDate,
    endDate,
    adults,
    oneWay,
    nonStop
  ) => {
    const response = await fetch(
      oneWay
        ? `/flights/${origin}/${destination}/${startDate}/${adults}/${nonStop}`
        : `/flightsround/${origin}/${destination}/${startDate}/${endDate}/${adults}/${nonStop}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  callApiAny = async (origin, date, adults) => {
    const response = await fetch(`/flightDestinations/${origin}/${date}/true`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getTripInfoFromButton(tripObject) {
    if (!this.state.trip) {
      toast.notify(
        "Please create an account before attempting to save a trip.",
        {
          position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
          duration: 10000 // This notification will not automatically close
        }
      );
    } else {
      this.updateDB(this.state.trip, this.state.flights[tripObject.key]);
      console.log("trip is updated");
    }
  }

  render() {
    return (
      <Container>
        <TravelSearchForm
          className="travel-search-form"
          flightSearch={this.flightSearch}
          flightSearchAny={this.flightSearchAny}
        />

        {/* <ClipLoader size={150} color={"white"} loading={this.state.isLoading} /> */}
        <Row>
          {!this.state.flights.length &&
          this.state.search &&
          !this.state.isLoading ? (
            <Col>
              <Card className="travelCard">
                <CardHeader>There are no flight results.</CardHeader>
              </Card>
            </Col>
          ) : (
            this.state.flights.map((flight, index) => (
              <TravelSearchResults
                key={flight.id}
                flightNumber={index}
                flight={flight}
                updateDB={this.updateDB}
                getTripInfoFromButton={this.getTripInfoFromButton}
                trip={this.state.trip_id}
              />
            ))
          )}
        </Row>

        <Row>
          {this.state.flightsAny.map(flight => (
            <TravelSearchAnyResults key={flight.flight.id} flight={flight} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default TravelSearch;