import React, { useState } from 'react';
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
// import Calendar from '../common/TripCalendar';
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
        <section className="Home has-icons-left"
        style={{ margin: '10px'}} >
          <Card className="J card col-md-8 offset-md-2">
            <CardBody>
              <CardTitle className="T font-weight-bold text-center text-light">
                <h3>Search Car Rental</h3>
              </CardTitle> <hr/>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <div className="container p-6">   
        {/* <h1 className="text-light text-center"> Search Car Rental </h1> */}
        {/* <div className="input-group"> */}
                    {/* <div className="form-group"> */}
                    <Label htmlFor="locationP"> 
                    <h5 className="T text-light">Location Pickup</h5> 
                    </Label> 
                      <Input className="form-control mb-3 mp-3"
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
                    {/* </div> */}
                    <div className="form-group">
                    <Label className="font-weight-bold badge bg-info text-dark text-wrap text-uppercase" style={{height: "2em"}}> 
                      <Input 
                        type="checkbox"
                        checked={checked}
                        onChange={handleChangeCheck}
                      />  
                        Return car to a different location:
                    </Label>
                    <div className={ hidden }>
                    <Label htmlFor="locationR"> 
                    <h5 className='T text-light'>Location Dropoff</h5>
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
                    <br></br>
                 {/* <span className="input-group-btn" style={{width:'20px'}}></span> */}
                    <div className="input-group">
                    <Label htmlFor="dateTimeP"> 
                    <h5 className='T text-light'>Pick-up Time</h5>
                      <Input className="form-control mb-3 mp-3"
                          id="dateTimeP"
                          type="time"
                          name="dateTimeP"
                          value={formData.dateTimeP}
                          onChange={handleChange}
                        //   required
                            // style= {{ width: '120px'}}
                      />
                    </Label>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                   <Label htmlFor="dateTimeR"> 
                   <h5 className='T text-light'> Drop-off Time</h5>
                      <Input className="form-control"
                          id="dateTimeR"
                          type="time"
                          name="dateTimeR"
                          value={formData.dateTimeR}
                          onChange={handleChange}
                       //   required
                          //  style= {{ width: '120px'}}
                      />
                    </Label>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    {/* </div> */}
                    {/* <div className="input-group"> */}
                    <Label htmlFor="dateTimeP">     
                    <h5 className='T text-light'>Pick-up Date </h5>
                      <Input className="form-control"
                        id="dateTimeP"
                        type="date"
                        name="dateTimeP"
                        value={formData.dateTimeP}
                        onChange={handleChange}
                        required
                      />    
                      </Label>
                      <span className="input-group-btn" style={{width:'20px'}}></span>
                      <Label htmlFor="dateTimeR">    
                      <h5 className='T text-light'>Drop-off Date </h5>
                      <Input className="form-control"
                        id="dateTimeR"
                        type="date"
                        name="dateTimeR"
                        value={formData.dateTimeR}
                        onChange={handleChange}
                        required
                      /> 
                      </Label>
                    </div>
                    </div>
                    {/* <div className="mb-3">
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
                    </div> */}
                    <Button className="btn btn-info" type="submit">
                      Find Your Car</Button>
                    <Button className="float-right btn btn-outline-danger" onClick={() => resetCarsList()}>Clear Filter</Button>
                 </div>
               </FormGroup>
             </Form>
           </CardBody>
        </Card>
        <br></br>
      </section>
    )
 }

export default SearchCars;