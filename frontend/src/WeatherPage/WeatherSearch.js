import React from 'react';
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button, Card } from 'reactstrap';
import './WeatherSearch.css';
import { BsArrow90DegUp } from "react-icons/bs";
import { IoCloudyNightSharp } from "react-icons/io5";

const WeatherSearchBar = props => {
  return (
    <Card className="card J p-4">
    <Form>
      <FormGroup>
        <Input
          className="num"
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="City and State"
          value={props.searchTerm}
          onChange={props.handleInputChange}
        />
        <br></br>
        <Button className='btn btn-info btn-lg float-right' onClick={props.handleFormSubmit}> <IoCloudyNightSharp/></Button>
        <Link className="btn btn-outline-warning btn-lg float-left" to='/' type="Go Back">
             <BsArrow90DegUp />
          </Link>
      </FormGroup>
    </Form>
    </Card>
  );
};

export default WeatherSearchBar;