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
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import Api from '../api';

// const SearchHotels = (props) => {
    const SearchHotels = ({ findHotels }) => {
    // let history = useHistory();
    const INITIAL_STATE = {
        cityCode: '',
        checkInDate: '',
        checkOutDate: ''
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
              </CardTitle>  <hr/>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <div className="container p-6">   
                    <Label htmlFor="cityCode" 
                    // htmlFor="hotelName" 
                    className="control has-icons-left">    
                    <h5 className='T text-light'>Staying In</h5>   
                    </Label>
                    <Input className="input mb-3"
                        // id="hotelName"
                        id="cityCode"
                        type="text"
                        // name="hotelName"
                        name="cityCode"
                        // value={formData.hotelName}
                        value={formData.cityCode}
                        onChange={handleChange}
                        placeholder="Hotel City"
                        required
                    />
                    <div className="input-group">
                    <span className="input-group-btn" style={{width:'30px'}}></span>
                    {/* <h3 className='L'>Check-in and Check-out</h3> */}
                    <Label htmlFor="checkInDate"> 
                      <h5 className='T text-light'>Check-in</h5>  
                    <Input className="form-control mb-3"
                       id="checkInDate"
                       type="date"
                       name="checkInDate"
                       value={formData.checkInDate}
                       onChange={handleChange}
                       required
                   /> </Label>
                        <span className="input-group-btn" style={{width:'30px'}}></span>
                     <Label htmlFor="checkOutDate">    
                       <h5 className='T text-light'>Check-out</h5>    
                    <Input className="form-control mb-3"
                       id="checkOutDate"
                       type="date"
                       name="checkOutDate"
                       value={formData.checkOutDate}
                       onChange={handleChange}
                       required
                   /> </Label>
                  </div>
                <Button className="btn btn-info" type="submit">Find Your Hotel</Button>
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
