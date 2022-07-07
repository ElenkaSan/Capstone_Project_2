import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Form, FormGroup, Input, Button, Card } from 'reactstrap';
import './WeatherSearchBar.css';
import { BsArrow90DegUp } from "react-icons/bs";

const WeatherSearchBar = props => {
  return (
    <Card className="card J text-light p-4">
    <Form>
      <FormGroup>
        <Input
          className="weather-search"
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="City and State"
          value={props.searchTerm}
          onChange={props.handleInputChange}
        />
        <br></br>
        <Button className='btn btn-info float-right' onClick={props.handleFormSubmit}>Get Weather</Button>
        <Link className="btn btn-outline-warning float-left" to='/' type="Go Back">
             <BsArrow90DegUp />
          </Link>
      </FormGroup>
    </Form>
    </Card>
  );
};

export default WeatherSearchBar;