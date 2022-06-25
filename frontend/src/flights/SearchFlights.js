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
import mount from '../img/tripy.png';
import '../carsrental/car.css'


// const SearchFlights = (props) => {
    const SearchFlights = ({findFlights, resetFlightsList}) => {
        const INITIAL_STATE = {
            numberOfPassengers: '',
            type: '',
            classType: '',
            locationD: '',
            locationA: '',
            dateD: '',
            dateA: ''
        }
    const [formData, setFormData] = useState(INITIAL_STATE);

    const [checked, setChecked] = React.useState(false);

    const handleChangeCheck = () => {
       setChecked(!checked);
    };
    const hidden = checked ? '' : 'hidden';
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        findFlights({ ...formData });
        setFormData(INITIAL_STATE);
        // history.push("/results");
    }

    // const [ destination, setDestination ] = useState("");
    // const [ from, setFrom ] = useState("");
    // const [ type, setType ] = useState("");
    // const [ classType, setClassType ] = useState("");
    // const [ dates, setDates ] = useState("");
    // const [ numberOfPeople, setNumberOfPeople ] = useState("");

 

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.handleClick(destination, from, type, classType, dates, numberOfPeople);
    //     history.push("/results");
    // }



    return (
        <section className="Home has-icons-left"
        style={{ margin: '10px'}}
        >  
          <Card className="J card col-md-8 offset-md-2">
            <CardBody>
              <CardTitle className="font-weight-bold text-center text-light">
                 <h2 className='T mb-4'>Search Flight</h2>
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                 <FormGroup>
                   <div className="container p-6">   
        {/* <h1 className="text-light text-center"> Search Flight </h1> */}
                   <div className="input-group">
                     <Label htmlFor="locationD"> 
                     <Input className="input mb-3"
                       id="locationD"
                       type="text"
                       name="locationD"
                       value={formData.locationD}
                       onChange={handleChange}
                       placeholder="Departing from?"
                       required
                      />
                      </Label>
                      <span className="input-group-btn" style={{width:'10px'}}></span>
                      <Label htmlFor="locationA"> 
                      <Input className="input mb-3"
                        id="locationA"
                        type="text"
                        name="locationA"
                        value={formData.locationA}
                        onChange={handleChange}
                        placeholder="Going to?"
                        required
                      />          
                      </Label>
                      <span className="input-group-btn" style={{width:'10px'}}></span>
                      <Label htmlFor="numberOfPassengers">
                      <Input className="input mb-3"
                        id="numberOfPassengers"
                        type="number"
                        name="numberOfPassengers"
                        placeholder="ppl?"
                        min="0"
                        max="100"
                        value={formData.numberOfPassengers}
                        onChange={handleChange}
                        // style= {{ width: '90px'}}
                      />
                      </Label>
                    </div>
                    {/* <span className="input-group-btn" style={{width:'20px'}}></span> */}
                    <div className="input-group">
                   
                    <Label htmlFor="classType">      
                    <h5 className='card text-center text-light bg-secondary'>Cabin Class </h5>               
                      <select className="form-control mb-3 mp-3"
                        id="classType"
                        type="text"
                        name="classType"
                        value={formData.classType}
                        onChange={handleChange}
                        style= {{ height: '40px'}}
                      >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First</option>
                      </select>
                      </Label>
                      <span className="input-group-btn" style={{width:'20px'}}></span>
                    {/* <Label htmlFor="type">                   
                      <select className="form-control mb-3 mp-3"
                        id="type"
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style= {{ height: '40px'}}
                       >
                      <option value="one-way">Ony-Way</option>
                      <option value="round-trip">Round-Trip</option>
                      </select>
                      </Label> */}
                    {/* </div> */}
                   
                    {/* <div className='S input-group'> */}
                    <Label htmlFor="dateD"> 
                    <h5 className='card text-center text-light bg-secondary'>Depature Date </h5>   
                    <Input className="form-control mb-3 mp-3"
                       id="dateD"
                       type="date"
                       name="dateD"
                       value={formData.dateD}
                       onChange={handleChange}
                       style= {{ height: '40px'}}
                       required
                    />    
                    </Label>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    <div className={ hidden }>
                    <Label htmlFor="dateA">    
                    <h5 className='card text-center text-light bg-secondary'>Return Date </h5>
                    <Input className="form-control mb-3 mp-3"
                       id="dateA"
                       type="date"
                       name="dateA"
                       value={formData.dateA}
                       onChange={handleChange}
                       style= {{ height: '40px'}}
                    /> 
                    </Label>
                    </div>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    <Label className="card badge bg-info text-dark text-wrap text-uppercase" style={{height: "2em"}}> 
                    <Input 
                        id="type"
                        type="checkbox"
                        // type="text"
                        name="type"
                        value={formData.type}
                        checked={checked}
                        onChange={handleChangeCheck}
                        // style= {{ height: '40px'}}
                        // required
                      />  Round-Trip
                    </Label>
                      {/* <select 
                        id="type"
                        type="checkbox"
                        // type="text"
                        name="type"
                        value={formData.type}
                        checked={checked}
                        onChange={handleChangeCheck}
                        style= {{ height: '40px'}}
                        required
                      >  
                      <option value="one-way">Ony-Way</option>
                      <option value="round-trip">Round-Trip</option>
                    </select> */}
                    
                      <span className="input-group-btn" style={{width:'20px'}}></span>
                      
                    {/* <Label htmlFor="dateA">    
                    <h5 className='text-left'>Return Date </h5>
                    <Input className="form-control mb-3 mp-3"
                       id="dateA"
                       type="date"
                       name="dateA"
                       value={formData.dateA}
                       onChange={handleChange}
                       style= {{ height: '40px'}}
                    /> 
                    </Label> */}
                  </div>
                    {/* <div className="form-group"> */}
                    {/* <div className="mb-3">
                    <Calendar className={['cal-style']} >
                    <Label htmlFor="dateD">       
                    <Input className="input"
                       id="dateD"
                       name="dateD"
                       value={formData.dateD}
                       onChange={handleChange}
                       required
                    />    
                    </Label>
                    <Label htmlFor="dateA">    
                    <Input className="input"
                       id="dateA"
                       name="dateA"
                       value={formData.dateA}
                       onChange={handleChange}
                       required
                    /> 
                    </Label>
                      <Label htmlFor="type">                   
                      <select className="card input"
                        id="type"
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style= {{ height: '40px'}}
                       >
                      <option value="one-way">Ony-Way</option>
                      <option value="round-trip">Round-Trip</option>
                      </select>
                      </Label>
                    </Calendar> 
                    </div> */}
                    
                    {/* <useHistory to = "/results"> */}
                        <Button className="btn btn-info" type="submit">Find Your Flight</Button>
                    {/* </useHistory> */}
                    <Button className="float-right btn btn-danger" onClick={() => resetFlightsList()}>Clear Filter</Button>
                    </div>
                </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <br></br>
      </section>
   )
 }

export default SearchFlights;