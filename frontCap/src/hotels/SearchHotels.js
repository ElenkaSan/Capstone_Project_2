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
import { BsFillPersonPlusFill } from "react-icons/bs";


const SearchHotels = (props) => {
    let history = useHistory();

    const [ destination, setDestination ] = useState("");
    const [ from, setFrom ] = useState("");
    const [ type, setType ] = useState("");
    const [ dates, setDates ] = useState("");
    const [ numberOfPeople, setNumberOfPeople ] = useState("");

    //James - this is what I added 

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleClick(destination, from, type, dates, numberOfPeople);
        history.push("/results");
    }

    return (
     <section className="Home has-icons-left">
         <Card className="J card col-md-8 offset-md-2">
        <CardBody>
        <CardTitle className="font-weight-bold text-center text-light">
            <h3>Search Hotel</h3>
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
        <div className="container p-6">   

          
            <Label className="control has-icons-left">     </Label>
                    <Input  htmlFor="text" className="input mb-3"
                        type="text"
                        value={ destination }
                        onChange={event => 
                        setDestination(event.target.value)}
                        placeholder="Where to go?"
                        required
                    />
        
                               
                {/* <label className="control has-icons-left">
                    <input className="input mb-3"
                        type="date"
                        value={ dates }
                        onChange={event => 
                        setDates(event.target.value)}
                    />
                    <span className="icon is-small is-left">
                            <i className="fas fa-calendar"></i>
                        </span>
                </label>  */}
                  <Label className="has-icons-left">  </Label>
                    <Input htmlFor="number" className="mb-3"
                        type="number"
                        value={ numberOfPeople }
                        placeholder="How many rooms?" 
                        min="0"
                        max="100"
                        onChange={event => 
                            setNumberOfPeople(event.target.value)}
                        // style= {{ width: '100px'}}
                    /> 
            
                <div className="mb-3"> 
                <h3>Check-in and Check-out</h3>
                    <Calendar className={['cal-style']} />
                </div>
                    <useHistory to = "/results">
                        <Button className="btn btn-info" type="submit">Find Your Hotel</Button>
                    </useHistory>
        </div>
        </FormGroup>
        </Form>
        </CardBody>
        </Card>
        </section>
    )
 }

export default SearchHotels;

// const axios = require("axios");

// // Hotel search (Get available hotels by the filter. Indicate the location_id -> use Search locations, check-in and check-out date)

// const options = {
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
//   params: {
//     sort_order: 'HDR',
//     location_id: '3000035821',
//     date_checkout: '2022-11-16',
//     date_checkin: '2022-11-15',
//     star_rating_ids: '3.0,3.5,4.0,4.5,5.0',
//     rooms_number: '1',
//     amenities_ids: 'FINTRNT,FBRKFST'
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

// //Search hotels locations (Search locations by name and search_type)

// const options1 = {
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations',
//   params: {name: 'Berlin', search_type: 'ALL'},
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

// // Search locations by coordinates (Search hotels locations by geolocation). Set coordinates latitude and longitude

// const options2 = {
//   method: 'GET',
//   url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations-by-geo',
//   params: {longitude: '14.418540', latitude: '50.073658'},
//   headers: {
//     'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
//     'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
//   }
// };

// axios.request(options2).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });