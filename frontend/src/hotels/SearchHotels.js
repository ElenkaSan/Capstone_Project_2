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
import Api from '../api';

// const SearchHotels = (props) => {
    const SearchHotels = ({ findHotels, resetHotelsList }) => {
    // let history = useHistory();
    const INITIAL_STATE = {
        hotelName: '',
        roomNumber: '',
        numberOfGuests: '',
        checkin: '',
        checkout: '',
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
        findHotels({ ...formData });
        setFormData(INITIAL_STATE);
        // history.push("/results");
    }


    // const [ destination, setDestination ] = useState("");
    // const [ from, setFrom ] = useState("");
    // const [ type, setType ] = useState("");
    // const [ dates, setDates ] = useState("");
    // const [ numberOfPeople, setNumberOfPeople ] = useState("");


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.handleClick(destination, from, type, dates, numberOfPeople);
    //     history.push("/results");
    // }

    return (
        <section className="Home has-icons-left"
        style={{ margin: '10px'}} >
          <Card className="J card col-md-8 offset-md-2">
            <CardBody>
              <CardTitle className="T font-weight-bold text-center text-light">
                <h2>Search Hotel</h2>
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <div className="container p-6">   
                    <Label htmlFor="hotelName" className="control has-icons-left">     
                    </Label>
                    <Input className="input mb-3"
                        id="hotelName"
                        type="text"
                        name="hotelName"
                        value={formData.hotelName}
                        onChange={handleChange}
                        placeholder="Where to go?"
                        required
                    />
                    <div className="input-group">
                    <Label htmlFor="numberOfGuests" className="has-icons-left">  
                    <h5 className='card text-center text-light bg-secondary'>How many ppl?</h5>  
                    <Input className="input mb-3"
                        id="numberOfGuests"
                        type="number"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        placeholder="N of guests?" 
                        min="0"
                        max="100"
                        required
                        // style= {{ width: '100px'}}
                    /> </Label>
                         <span className="input-group-btn" style={{width:'30px'}}></span>
                    <Label htmlFor="roomNumber" className="has-icons-left"> 
                    <h5 className='card text-center text-light bg-secondary'>How many rooms?</h5>  
                    <Input className="input mb-3"
                        id="roomNumber"
                        type="number"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        placeholder="N of rooms?" 
                        min="0"
                        max="100"
                        required
                        // style= {{ width: '100px'}}
                    />   </Label>
                    {/* <div className="mb-3">  */}
                    <span className="input-group-btn" style={{width:'30px'}}></span>
                    {/* <h3 className='L'>Check-in and Check-out</h3> */}
                    <Label htmlFor="checkin"> 
                      <h5 className='card text-center text-light bg-secondary'>Check-in</h5>  
                    <Input className="form-control mb-3"
                       id="checkin"
                       type="date"
                       name="checkin"
                       value={formData.checkin}
                       onChange={handleChange}
                       required
                   /> </Label>
                        <span className="input-group-btn" style={{width:'30px'}}></span>
                     <Label htmlFor="checkout">    
                       <h5 className='card text-center text-light bg-secondary'>Check-out</h5>    
                    <Input className="form-control mb-3"
                       id="checkout"
                       type="date"
                       name="checkout"
                       value={formData.checkout}
                       onChange={handleChange}
                       required
                   /> </Label>
                    {/* <Calendar className={['cal-style']} >   
                    <Label htmlFor="checkin">          
                    <Input className="input mb-3"
                       id="checkin"
                       name="checkin"
                       value={formData.checkin}
                       onChange={handleChange}
                       required
                   /> </Label>
                     <Label htmlFor="checkout">       
                    <Input className="input mb-3"
                       id="checkout"
                       name="checkout"
                       value={formData.checkout}
                       onChange={handleChange}
                       required
                   /> </Label>
                   </Calendar>  */}
                </div>
                    {/* <useHistory to = "/results"> */}
                        <Button className="btn btn-info" type="submit">Find Your Hotel</Button>
                    {/* </useHistory> */}
                    <Button className="float-right btn btn-danger" onClick={() => resetHotelsList()}>Clear Filter</Button>
              </div>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      <br></br>
    </section>
   )
 }

export default SearchHotels;