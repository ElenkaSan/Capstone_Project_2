// const axios = require("axios");

// // Search car rentals by filter. Indicate the location_id -> use Search locations api point

// const options = {
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search',
//   params: {
//     location_pickup: 'JFK',
//     date_time_return: '2022-11-16 13:00:00',
//     date_time_pickup: '2022-11-15 13:00:00',
//     location_return: '1365100023'
//   },
//   headers: {
//     'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
//     'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// // Search cars locations (Search locations by name)

// const axios = require("axios");

// const options1 = {
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations',
//   params: {name: 'London'},
//   headers: {
//     'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
//     'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
//   }
// };

// axios.request(options1).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';
import Calendar from '../common/TripCalendar';
import './car.css'

const SearchCars = (props) => {
    let history = useHistory();

    const [ destination, setDestination ] = useState("");
    const [ from, setFrom ] = useState("");
    const [ pickup, setPickup ] = useState("");
    const [ dropoff, setDropoff ] = useState("");


    const [checked, setChecked] = React.useState(false);
    

    const handleChange = () => {
      setChecked(!checked);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleClick(destination, from, pickup, dropoff);
        history.push("/results");
    }

    const hidden = checked ? '' : 'hidden';

    
    return (
      <section className="Home has-icons-left">
         <Card className="J card col-md-8 offset-md-2">
        <CardBody>
        <CardTitle className="font-weight-bold text-center text-light">
            <h3>Search Car Rental</h3>
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
        <div className="container p-6">   
        {/* <h1 className="text-light text-center"> Search Car Rental </h1> */}
        {/* <div className="input-group"> */}
           <div className="form-group">
            <Label htmlFor="from"> 
            <h5 className="font-weight-bold">Location Pickup</h5> 
            </Label> 
                   <Input 
                  //  className="input"
                       type="text"
                       value={ from }
                       onChange={event => 
                       setFrom(event.target.value)}
                       placeholder="City, Airport or Address"
                       required
                      //  style= {{ width: '300px'}}
                   />
                       {/* <span className="icon is-small is-left">
                           <i className="fas fa-search"></i>
                       </span> */}
              </div>
              <div className="form-group">
              <Label className="font-weight-bold">
                    <Input
                        // className="input"
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />  
                        Return car to a different location:
                </Label>
                <div className={ hidden }>
                <span className="input-group-btn" style={{width:'-20px'}}></span>
                <Label htmlFor="destination"> 
                {/* <h5 className="font-weight-bold">Location Dropoff</h5> */}
                </Label> 
                   <Input
                      //  className="d-flex float-center"
                       type="text"
                       value={ destination }
                       onChange={event => 
                       setDestination(event.target.value)}
                       placeholder="City, Airport or Address"
                      //  style= {{ width: '300px'}}
                   />
                       {/* <span className="icon is-small is-left">
                           <i className="fas fa-search"></i>
                       </span> */}
             </div>
             </div>
         
          {/* </div> */}
            <div className="input-group">
                {/* <span className="input-group-btn" style={{width:'20px'}}></span> */}
                <Label htmlFor="pickup"> Pick-up Time
                    <Input className="form-control mb-3 mp-3"
                        type="time"
                        value={ pickup }
                        onChange={event => 
                            setPickup(event.target.value)}
                            style= {{ width: '120px'}}
                    />
                </Label>
                <span className="input-group-btn" style={{width:'20px'}}></span>
                <Label htmlFor="dropoff"> Drop-off Time
                    <Input className="form-control"
                        type="time"
                        value={ dropoff }
                        onChange={event => 
                            setDropoff(event.target.value)}
                            style= {{ width: '120px'}}
                    />
                </Label>
                </div>
                {/* <div className="mb-3 float-start">
                    <Calendar className={['cal-style']} />
                </div> */}
                 <div className="mb-3">
                    <Calendar className={['cal-style']} />
            </div>
                    <useHistory to = "/results">
                        <Button className="btn btn-info" type="submit">
                          Find Your Car</Button>
                    </useHistory>
 
        </div>
        </FormGroup>
        </Form>
        </CardBody>
        </Card>
        </section>
    )
 }

export default SearchCars;