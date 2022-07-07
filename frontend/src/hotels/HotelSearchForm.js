import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Row, Col } from "reactstrap";
import DatePicker from "../common/DatePicker";
// import TripCalendar from "../common/TripCalendar";
import "./Hotel.css";
import moment from "moment";
import Autosuggest from "react-autosuggest";

let cities = [];
let lastValue = "";

function getMatchingCities(value) {
  if (value === "") {
    return [];
  }

  return cities.filter(city => city.name);
}

function getSuggestions(value) {
  if (value === "") {
    return [];
  }

  if (value !== lastValue || !value.substring("(")) {
    cities = [];
    lastValue = value;
    callApi(value)
      .then(res => {
        res.data.map(city =>
          cities.push({ name: `${city.name} (${city.iataCode})` })
        );
      })
      .catch(err => console.log(err));
  } else if (value.substring("(")) {
  }
  return cities.filter(city => city.name);
}

async function callApi(city) {
  const response = await fetch(`/airport/${city}`);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

class HotelSearchForm extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      valueDest: "",
      suggestions: [],
      suggestionsDestination: [],
      isLoading: false,
      city: "",
      checkInDate: "",
      checkOutDate: "",
      numAdults: 1,
      nonStop: false,
    };
    this.lastRequestId = null;
  }

  loadSuggestions(value) {
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState({
      isLoading: true
    });

    // Fake request
    this.lastRequestId = setTimeout(() => {
      this.setState({
        isLoading: false,
        suggestions: getMatchingCities(value)
      });
    }, 1000);
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    if (newValue.substring("(")) {
      var city = newValue.substring(newValue.length - 4, newValue.length - 1);
      this.setState({
        city: city
      });
    }
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  onSuggestionsFetchRequested = ({ value, reason }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });

    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      suggestionsDestination: []
    });
    cities = [];
  };
  setDate = (startDate, endDate) => {
    console.log("dates should be saving");
    console.log(startDate, endDate);
    let checkInDate =
      startDate === null
        ? ""
        : moment(startDate).format("YYYY-MM-DD");
    let checkOutDate =
      endDate === null
        ? ""
        : moment(endDate).format("YYYY-MM-DD");
    this.setState({
      checkInDate: checkInDate,
      checkOutDate: checkOutDate
    });
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
    console.log(name, value);
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.hotelSearch(this.state);
    this.setState({
      origin: "",
      destination: "",
      date: ""
    });
  };

  render() {
    const {
      value,
      suggestions,
    } = this.state;
    const inputProps = {
      placeholder: "Hotel City",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Form className="hotel-form">
          <Row>
            <Col md={12}>
              <FormGroup className="hotel-form-group">
                <Label className="hotel-form-label" for="hotelSearch">
                  Staying In
                </Label>
                <Autosuggest
                      id="hotelSearchInput"
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps}
                      name="city"
                      value={this.state.city}
                      alwaysRenderSuggestions={false}
                    />
                {/* <Input
                  type="text"
                  name="city"
                  id="hotelSearchInput"
                  placeholder="Destination City"
                  onInput={this.hotelSearch}
                  onChange={this.handleInputChange}
                  value={this.state.city}
                /> */}
              </FormGroup>
            </Col>
          </Row>

          <br></br>

          <p className="hotel-form-label">Check In / Check Out</p>
          <DatePicker onEvent={this.setDate} />
          {/* <TripCalendar 
          onEvent={this.setDate} 
          /> */}

          <br></br>
          <br></br>
        </Form>
        <Button className="hotel-form-btn" onClick={this.handleSubmit}>
          Search
        </Button>
        <br></br>
      </div>
    );
  }
}

export default HotelSearchForm;