import React, { useState, useEffect } from 'react';
// import { useHistory, Link } from "react-router-dom";
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
import AmadeusApi from "../amadeusApi";
import LoadingSpinner from "../common/LoadingSpinner";
import TripDetail from './TripDetail';

// const SearchCars = (props) => {
const SearchTrip = ( ) =>  {
    const INITIAL_STATE = {
      originLocationCode: '',
      destinationLocationCode: '',
      departureDate: '',
      returnDate: ''
    }
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [trips, setTrips] = useState([]);

    const findTripPurpose = async (formData) => {
        try {
            let data = await AmadeusApi.getTrip(formData);
            setTrips(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    if (!trips) return <LoadingSpinner />;

    const handleChange = (e) => {
       const { name, value } = e.target;
        setFormData(formData => ({
           ...formData,
           [name]: value
        }))
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       findTripPurpose({ ...formData });
       setFormData(INITIAL_STATE);
    }

    
    return (
        <section className="Home has-icons-left"
        style={{ margin: '10px'}} >
          <Card className="J card col-md-8 offset-md-2">
            <CardBody>
              <CardTitle className="T font-weight-bold text-center text-light">
                <h3>Search Trip</h3>
              </CardTitle> <hr/>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                 <div className="input-group"> 
                    <Label htmlFor="originLocationCode"> 
                    <h5 className="T text-light">City From</h5> 
                 
                      <Input className="form-control mb-3 mp-3"
                    //  className="input"
                       id="originLocationCode"
                       type="text"
                       name="originLocationCode"
                       value={formData.originLocationCode}
                       onChange={handleChange}
                       placeholder="City"
                       required
                      //  style= {{ width: '300px'}}
                      />    </Label> 
                <span className="input-group-btn" style={{width:'20px'}}></span>
                    <Label htmlFor="destinationLocationCode"> 
                    <h5 className='T text-light'>City To</h5>
                
                      <Input
                      //  className="d-flex float-center"
                        id="destinationLocationCode"
                        type="text"
                        name="destinationLocationCode"
                        value={formData.destinationLocationCode}
                        onChange={handleChange}
                        placeholder="City"
                        // required
                       //  style= {{ width: '300px'}}
                      />    </Label> 
              
              <span className="input-group-btn" style={{width:'20px'}}></span>
                    <Label htmlFor="departureDate">     
                    <h5 className='T text-light'> Departure Date </h5>
                      <Input className="form-control"
                        id="departureDate"
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        required
                      />    
                      </Label>
                      <span className="input-group-btn" style={{width:'20px'}}></span>
                      <Label htmlFor="returnDate">    
                      <h5 className='T text-light'> Return Date </h5>
                      <Input className="form-control"
                        id="returnDate"
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        required
                      /> 
                      </Label>
                    </div>
                    <Button className="btn btn-info" type="submit">
                      Find Your TRIP</Button>
                    {/* <Button className="float-right btn btn-outline-danger" onClick={() => resetCarsList()}>Clear Filter</Button> */}
               </FormGroup>
             </Form>
           </CardBody>
        </Card>
        <br></br>
        <div className="p-4">
        {trips.length === 0 ? (
          <div className='card J text-light'> 
             {trips}
         {trips.map((f) => (
         <TripDetail key={f.id} 
          id={f.id} />
          ))} 
          </div>
           ) : (
            <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
              Sorry, no results were found!</p>
          )} 
          </div>
      </section>
    )
 }

export default SearchTrip;