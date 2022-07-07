import React, { Component } from "react";
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
import DatePicker from "../common/DatePicker";
import moment from "moment";
import Autosuggest from "react-autosuggest";
import "./TravelSearchForm.css";

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

function getSuggestionValueDest(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

function renderSuggestionDest(suggestion) {
  return <span>{suggestion.name}</span>;
}

class TravelSearchForm extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      valueDest: "",
      suggestions: [],
      suggestionsDestination: [],
      isLoading: false,
      origin: "",
      destination: "",
      date: "2020-04-02",
      numAdults: 1,
      nonStop: false,
      startDate: "",
      endDate: "",
      anyDestination: false,
      oneWay: false
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

  loadSuggestionsDest(value) {
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
        suggestionsDestination: getMatchingCities(value)
      });
    }, 1000);
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    if (newValue.substring("(")) {
      var origin = newValue.substring(newValue.length - 4, newValue.length - 1);
      this.setState({
        origin: origin
      });
    }
  };

  onChangeDestination = (event, { newValue, method }) => {
    this.setState({
      valueDest: newValue
    });
    if (newValue.substring("(")) {
      var destination = newValue.substring(
        newValue.length - 4,
        newValue.length - 1
      );
      this.setState({
        destination: destination
      });
    }
  };

  onSuggestionsFetchRequested = ({ value, reason }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });

    this.loadSuggestions(value);
  };

  onSuggestionsFetchRequestedDest = ({ value, reason }) => {
    this.setState({
      suggestionsDestination: getSuggestions(value)
    });

    this.loadSuggestionsDest(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      suggestionsDestination: []
    });
    cities = [];
  };

  setDate = (startDate, endDate) => {
    let start =
      startDate === null ? "" : moment(startDate).format("YYYY-MM-DD");
    let end = endDate === null ? "" : moment(endDate).format("YYYY-MM-DD");
    this.setState({
      startDate: start,
      endDate: end
    });
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleCheckbox = event => {
    // Getting the value and name of the input which triggered the change
    this.setState({ anyDestination: event.target.checked });
  };

  handleCheckboxOneWay = event => {
    // Getting the value and name of the input which triggered the change
    this.setState({ oneWay: event.target.checked });
  };

  handleCheckboxNonStop = event => {
    // Getting the value and name of the input which triggered the change
    this.setState({ nonStop: event.target.checked });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.state.anyDestination
      ? this.props.flightSearchAny(this.state)
      : this.props.flightSearch(this.state);
  };
  render() {
    const {
      value,
      valueDest,
      suggestions,
      suggestionsDestination
    } = this.state;
    const inputProps = {
      placeholder: "Flying From",
      value,
      onChange: this.onChange
    };
    const inputPropsEnding = {
      placeholder: "Flying To",
      value: valueDest,
      onChange: this.onChangeDestination
    };
    return (
      <Container>
        <Card className="travel-card">
          <CardHeader className="travel-header">Search Flights</CardHeader>
          <CardBody className="travel-body">
            <Form className="travel-form">
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label className="travel-form-label" for="flightSearch">
                      Flying From
                    </Label>
                    <Autosuggest
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
                      name="origin"
                      value={this.state.origin}
                      alwaysRenderSuggestions={false}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={12}>
                  {/* {this.state.anyDestination ? (
                    <FormGroup>
                      <Label className="travel-form-label" for="flightSearch">
                      Take Me Anywhere
                    </Label>
                    </FormGroup>
                  ) : ( */}
                  <FormGroup>
                    <Label className="travel-form-label" for="flightSearch">
                      Flying To
                    </Label>
                    <Autosuggest
                      suggestions={suggestionsDestination}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequestedDest
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={getSuggestionValueDest}
                      renderSuggestion={renderSuggestionDest}
                      inputProps={inputPropsEnding}
                      name="destination"
                      value={this.state.destination}
                      alwaysRenderSuggestions={false}
                    />
                  </FormGroup>
                  {/* )} */}

                  {/* <FormGroup check>
                    <Label check>
                      <Input 
                      type="checkbox" 
                      id="anyDestination" 
                      name="anyDestination"
                      onChange={this.handleCheckbox}
                      //value={this.state.anyDestination}
                      checked={this.state.anyDestination}
                      /> Give me any
                      destination
                    </Label>
                  </FormGroup> */}
                </Col>
              </Row>

              <br></br>
              {this.state.anyDestination ? (
                <Row></Row>
              ) : (
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label className="travel-form-label" for="numOfTravelers">
                        Number of Traveling Adults
                      </Label>
                      <Input
                        type="text"
                        name="numAdults"
                        id="numOfTravelersInput"
                        placeholder="2"
                        onChange={this.handleInputChange}
                        value={this.state.numAdults}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )}

              <br></br>

              <p className="travel-form-label">Depart / Return</p>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="oneWay"
                    name="oneWay"
                    onChange={this.handleCheckboxOneWay}
                    //value={this.state.anyDestination}
                    checked={this.state.oneWay}
                  />{" "}
                  One-Way
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="nonStop"
                    name="nonStop"
                    onChange={this.handleCheckboxNonStop}
                    //value={this.state.anyDestination}
                    checked={this.state.nonStop}
                  />{" "}
                  Non-Stop Flights Only
                </Label>
              </FormGroup>
              <br></br>
              <DatePicker onEvent={this.setDate} />

              <br></br>
              <br></br>

              <Button className="travel-form-btn" onClick={this.handleSubmit}>
                Submit
              </Button>
              <br></br>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default TravelSearchForm;