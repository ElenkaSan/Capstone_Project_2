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

// const SearchCars = (props) => {
const SearchCars = ({findCars, resetCarsList}) =>  {
    const INITIAL_STATE = {
        locationP: '',
        locationR: '',
        dateTimeP: '',
        dateTimeR: ''
    }
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [checked, setChecked] = React.useState(false);

    const handleChangeCheck = () => {
       setChecked(!checked);
    };
    const hidden = checked ? '' : 'hidden';

    // let history = useHistory();


    const handleChange = (e) => {
       const { name, value } = e.target;
        setFormData(formData => ({
           ...formData,
           [name]: value
        }))
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       findCars({ ...formData });
       setFormData(INITIAL_STATE);
    //    history.push("/results");
    }

    
    return (
        <section className="Home has-icons-left">
          <Card className="J card col-md-8 offset-md-2">
            <CardBody>
              <CardTitle className="T font-weight-bold text-center text-light">
                <h3>Search Car Rental</h3>
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <div className="container p-6">   
        {/* <h1 className="text-light text-center"> Search Car Rental </h1> */}
        {/* <div className="input-group"> */}
                    <div className="form-group">
                    <Label htmlFor="locationP"> 
                    <h5 className="S font-weight-bold">Location Pickup</h5> 
                    </Label> 
                      <Input
                    //  className="input"
                       id="locationP"
                       type="text"
                       name="locationP"
                       value={formData.locationP}
                       onChange={handleChange}
                       placeholder="City, Airport or Address"
                       required
                      //  style= {{ width: '300px'}}
                      />
                    </div>
                    <div className="form-group">
                    <Label className="S font-weight-bold">
                      <Input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChangeCheck}
                      />  
                        Return car to a different location:
                    </Label>
                    <div className={ hidden }>
                    <span className="input-group-btn" style={{width:'-20px'}}></span>
                    <Label htmlFor="locationR"> 
                    {/* <h5 className="font-weight-bold">Location Dropoff</h5> */}
                    </Label> 
                      <Input
                      //  className="d-flex float-center"
                        id="locationR"
                        type="text"
                        name="locationR"
                        value={formData.locationR}
                        onChange={handleChange}
                        placeholder="City, Airport or Address"
                        // required
                       //  style= {{ width: '300px'}}
                      />
                    </div>
                    </div>
                    <div className="S input-group">
                {/* <span className="input-group-btn" style={{width:'20px'}}></span> */}
                    <Label htmlFor="dateTimeP"> Pick-up Time
                      <Input className="form-control mb-3 mp-3"
                          id="dateTimeP"
                          type="time"
                          name="dateTimeP"
                          value={formData.dateTimeP}
                          onChange={handleChange}
                        //   required
                            style= {{ width: '120px'}}
                      />
                    </Label>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                   <Label htmlFor="dateTimeR"> Drop-off Time
                      <Input className="form-control"
                          id="dateTimeR"
                          type="time"
                          name="dateTimeR"
                          value={formData.dateTimeR}
                          onChange={handleChange}
                       //   required
                           style= {{ width: '120px'}}
                      />
                    </Label>
                    </div>
                    <div className="mb-3">
                      <Calendar className={['cal-style']} >
                      <Label htmlFor="dateTimeP">       
                      <Input className="input"
                        id="dateTimeP"
                        name="dateTimeP"
                        value={formData.dateTimeP}
                        onChange={handleChange}
                        required
                      />    
                      </Label>
                      <Label htmlFor="dateTimeR">    
                      <Input className="input"
                        id="dateTimeR"
                        name="dateTimeR"
                        value={formData.dateTimeR}
                        onChange={handleChange}
                        required
                      /> 
                      </Label>
                      </Calendar> 
                    </div>
                    {/* <useHistory to = "/results"> */}
                        <Button className="btn btn-info" type="submit">
                          Find Your Car</Button>
                    {/* </useHistory> */}
                    <Button className="float-right btn btn-danger" onClick={() => resetCarsList()}>Clear Filter</Button>
                 </div>
               </FormGroup>
             </Form>
           </CardBody>
        </Card>
      </section>
    )
 }

export default SearchCars;