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



// const SearchFlights = (props) => {
    const SearchFlights = ({findFlights, resetFlightsList}) => {
        const INITIAL_STATE = {
            numberOfPassengers: '',
            type: '',
            classType: '',
            locationD: '',
            locationA: '',
        }
        const [formData, setFormData] = useState(INITIAL_STATE);
           
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
    }

    let history = useHistory();

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
        <section className="Home has-icons-left">
         <Card className="J card col-md-8 offset-md-2">
        <CardBody>
        <CardTitle className="font-weight-bold text-center text-light">
            <h3 className='mb-4'>Search Flight</h3>
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
        <div className="container p-6">   
        {/* <h1 className="text-light text-center"> Search Flight </h1> */}
          
            <Label htmlFor="locationD"> 
                   <Input className="input mb-3"
                       id="locationD"
                       type="text"
                       name="locationD"
                       value={formData.locationD}
                       onChange={handleChange}
                    //    value={ from }
                    //    onChange={event => 
                    //    setDestination(event.target.value)}
                       placeholder="Departing from?"
                       required
                   />
               </Label>
               
            <Label htmlFor="locationA"> 
                    <Input className="input mb-3"
                        id="locationA"
                        type="text"
                        name="locationA"
                        value={formData.locationA}
                        onChange={handleChange}
                        // value={ destination }
                        // onChange={event => 
                        // setDestination(event.target.value)}
                        placeholder="Going to?"
                        required
                    />
                            
                </Label>
                <div className="form-group">
                <Label htmlFor="numberOfPassengers">
                    <Input className="input mb-3"
                        id="numberOfPassengers"
                        type="number"
                        name="numberOfPassengers"
                        // value={ numberOfPeople }
                        placeholder="How many people?"
                        min="0"
                        max="100"
                        value={formData.numberOfPassengers}
                        onChange={handleChange}
                        // onChange={event => 
                        //     setNumberOfPeople(event.target.value)}
                        // style= {{ width: '90px'}}
                    />

                </Label>
          
                <Label htmlFor="type">                   
                    <select className="input mb-3"
                        id="type"
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        // value={ type }
                        // onChange={event => 
                        //     type(event.target.value)}
                    >
                    <option value="one-way">Ony-Way</option>
                    <option value="round-trip">Round-Trip</option>
                        </select>
                
                </Label>

                <Label htmlFor="classType">                   
                    <select className="input mb-3"
                        id="classType"
                        type="text"
                        name="classType"
                        value={formData.classType}
                        onChange={handleChange}
                        // value={ classType }
                        // onChange={event => 
                        //     type(event.target.value)}
                    >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                        </select>
                </Label>
             </div>
                <div className="mb-3">
                    <Calendar className={['cal-style']} />
                </div>
                    <useHistory to = "/results">
                        <Button className="btn btn-info" type="submit">Find Your Flight</Button>
                    </useHistory>
                    <Button onClick={() => resetFlightsList()}>Clear Filter</Button>
        </div>
                </FormGroup>
                </Form>
                </CardBody>
                </Card>
                </section>
    )
 }

export default SearchFlights;