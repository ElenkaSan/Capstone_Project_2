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
// import mount from '../img/tripy.png';
// import Autosuggest from "react-autosuggest";
import '../carsrental/car.css'

import airports from "../airportData";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

// const SearchFlights = (props) => {
    const SearchFlights = ({ 
      flightSearchAround,
      flightSearchOneway 
      // findFlights
       }) => {
        const INITIAL_STATE = {
          originLocationCode: '',
          destinationLocationCode: '',
          departureDate: '',
          returnDate: '',
          adults: '',
          // travelClass:'',
          nonStop: false,
          oneWay: false,
        }
        // const INITIAL_oneWay = {
        //   originLocationCode: '',
        //   destinationLocationCode: '',
        //   departureDate: '',
        //   adults: ''
        // }

    const [formData, setFormData] = useState(INITIAL_STATE);
    // const [onewayData, setOnewayData] = useState(INITIAL_oneWay);
    const [checked, setChecked] = React.useState(false);
    // const [checkedWay, setCheckedWay] = React.useState(false);

    const handleChangeCheck = () => {
       setChecked(!checked);
    };

    const hidden = checked ? '' : 'hidden'; 
    
    const handleChange = (e) => {
        // const { name, value, checkedWay } = e.target;
        const { name, value } = e.target;
        // console.log(`${value} is ${checkedWay}`)
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
        // setOnewayData(shortData => ({
        //   ...shortData,
        //   [name]: value
        // }))
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // findFlights({ ...formData })
        flightSearchAround({ ...formData })
        flightSearchOneway({ ...formData })
        setFormData(INITIAL_STATE)
        // setOnewayData(INITIAL_second_state)
        // history.push("/results");
    }
  

  //  const handleCheckboxOneWay = (e) => {
  //     // Getting the value and name of the input which triggered the change
  //     const { name } = e.target;
  //     console.log(`${name} is ${checkedWay}`)
  //     setCheckedWay({ oneWay: e.target.checkedWay });
  //   };
  
  //   const handleCheckboxNonStop = (e) => {
  //     // Getting the value and name of the input which triggered the change
  //     setChecked({ nonStop: e.target.checked });
  //   };


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.handleClick(destination, from, type, classType, dates, numberOfPeople);
    //     history.push("/results");
    // }

    const flightType = formData.returnDate ? "ROUND-TRIP" : formData.oneWay ? "ONE-WAY" : "";

    return (
        <section className="Home has-icons-left"
        style={{ margin: '10px'}}
        >  
          <Card className="J card col-md-8 offset-md-2">
            <CardBody>
              <CardTitle className="font-weight-bold text-center text-light">
                 <h2 className='T mb-4'>Search Flight</h2>
              </CardTitle>  <hr/>
              <Form onSubmit={handleSubmit}>
                 <FormGroup>
                   <div className="container p-6">   
        {/* <h1 className="text-light text-center"> Search Flight </h1> */}
                   <div className="input-group">
                     <Label htmlFor="originLocationCode"> 
                     {/* <Input className="input mb-3"
                       id="originLocationCode"
                       type="text"
                       name="originLocationCode"
                       value={formData.originLocationCode}
                      //  value={shortData.origin}
                       onChange={handleChange}
                       placeholder="Flying From"
                       required
                      /> */}
                      <Autocomplete className="card input mb-3 bg-light"
                         id="originLocationCode"
                         sx={{ width: 200 }}
                         name="originLocationCode"
                        //  value={formData.originLocationCode}
                         options={airports}
                         placeholder="Flying From"
                         required
                         onChange={handleChange}
                         autoHighlight
                         getOptionLabel={(originLocationCode) => originLocationCode.id}
                        // getOptionLabel={(option) => option.id}
                         renderOption={(props, originLocationCode) => (
                          // renderOption={(props, option) => (
                           <Box component="li" {...props}>
                             {/* {option.id} ({option.label})  */}
                             {originLocationCode.id} ({originLocationCode.label})
                           </Box>
                         )}
                         renderInput={(formData) => (
                           <TextField
                             {...formData}
                             name="originLocationCode"
                             id="originLocationCode"
                             label="Flying From"
                             value={formData.originLocationCode}
                             onChange={handleChange}
                             inputProps={{
                              ...formData.inputProps,
                              value: formData.originLocationCode
                            }}
                           />
                         )}
                      />
                      </Label>
                      <span className="input-group-btn" style={{width:'10px'}}></span>
                      <Label htmlFor="destinationLocationCode"> 
                      {/* <Input className="input mb-3"
                        id="destinationLocationCode"
                        type="text"
                        name="destinationLocationCode"
                        value={formData.destinationLocationCode}
                        onChange={handleChange}
                        placeholder="Flying To"
                        required
                      />           */}
                      <Autocomplete className="card input mb-3 bg-light"
                         id="destinationLocationCode"
                         sx={{ width: 200 }}
                         name="destination"
                        //  value={formData.destinationLocationCode}
                         options={airports}
                         placeholder="Flying To"
                         required
                         onChange={handleChange}
                         autoHighlight
                        //  getOptionLabel={(option) => option.id}
                         getOptionLabel={(destinationLocationCode => destinationLocationCode.id)}
                        //  renderOption={(props, option) => (
                          renderOption={(props, destinationLocationCode) => (
                           <Box component="li" {...props}>
                              {destinationLocationCode.id} ({destinationLocationCode.label}) 
                              {/* {(option.label)} {option.id} */}
                           </Box>
                         )}
                         renderInput={(formData) => (
                           <TextField
                             {...formData}
                             name="destinationLocationCode"
                             id="destinationLocationCode"
                             label="Flying To"
                             value={formData.destinationLocationCode}
                             onChange={handleChange}
                             inputProps={{
                              ...formData.inputProps,
                              value: formData.destinationLocationCode
                            }}
                           />
                         )}
                      />
                      </Label>
                    </div>
                    {/* <span className="input-group-btn" style={{width:'20px'}}></span> */}
                    <div className="input-group">
                    <span className="input-group-btn" style={{width:'10px'}}></span>
                      <Label htmlFor="adults"> 
                      <h5 className='T text-light'> Number of Traveling </h5>   
                      <Input className="input mb-3"
                        id="adults"
                        type="number"
                        // type="text"
                        name="adults"
                        placeholder="How many people?"
                        min="0"
                        max="100"
                        value={formData.adults}
                        // value={shortData.adults}
                        onChange={handleChange}
                        required
                      />
                      </Label>
                      <span className="input-group-btn" style={{width:'20px'}}></span>
                    <Label htmlFor="departureDate"> 
                    <h5 className='T text-light'>Depature Date </h5>   
                    <Input className="form-control mb-3 mp-3"
                       id="departureDate"
                       type="date"
                       name="departureDate"
                       value={formData.departureDate}
                      //  value={shortData.startDate}
                       onChange={handleChange}
                       style= {{ height: '40px'}}
                       required
                    />    
                    </Label>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    {/* <FormGroup check>
                    <Label className="card badge bg-info text-dark text-wrap text-uppercase" style={{height: "2em"}} > 
                    <Input 
                        label={flightType}
                        id="oneWay"
                        type="checkbox"
                        // type="text"
                        name="oneWay"
                        value={checkedWay}
                        checked={checked.oneWay}
                        onChange={handleCheckboxOneWay}
                      />  One Way
                    </Label>
                    </FormGroup> */}
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    <div className={ hidden }>
                    <Label htmlFor="returnDate">    
                    <h5 className='T text-light'>Return Date </h5>
                    <Input className="form-control mb-3 mp-3"
                       label={flightType}
                       id="returnDate"
                       type="date"
                       name="returnDate"
                       value={formData.returnDate}
                       onChange={handleChange}
                       style= {{ height: '40px'}}
                    /> 
                    </Label>
                    </div>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    <FormGroup check>
                    <Label className="card badge bg-info text-dark text-wrap text-uppercase" style={{height: "2em"}} check> 
                    <Input 
                        label={flightType}
                        id="type"
                        type="checkbox"
                        // type="text"
                        name="type"
                        // value={formData.type}
                        checked={checked.returnDate}
                        onChange={handleChangeCheck}
                      />  Round-Trip
                    </Label>
                    </FormGroup>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    {/* <FormGroup>
                    <Label htmlFor="travelClass"> 
                    <h5 className='T text-light'> Travel Class </h5>   
                    <Input
                        id="travelClass"
                        type="select"
                        name="travelClass"
                        value={formData.travelClass}
                        onChange={handleChangeCheck} >                 
                        <option value="ECONOMY">ECONOMY</option>
                        <option value="PREMIUM_ECONOMY">PREMIUM_ECONOMY</option>
                        <option value="BUSINESS">BUSINESS</option>
                        <option value="FIRST">FIRST</option>
                      </Input>  
                    </Label>
                    </FormGroup>
                    <span className="input-group-btn" style={{width:'20px'}}></span> */}
                    {/* <FormGroup check>
                    <Label htmlFor="oneWay" className="card badge bg-info text-dark text-wrap text-uppercase" check>
                      <Input className="form-control mb-3 mp-3"
                        label={flightType}
                        id="oneWay"
                        type="checkbox"
                        name="oneWay"
                        value={formData.oneWay}
                        // onChange={handleChange}
                        // onChange={handleCheckboxOneWay}
                        checked={checked.oneWay}
                        onChange={(e) => {
                          if (e.target.checked)
                            this.setState((oneWay) => ({checkboxValid: true}))
                          else {
                            this.setState({checkboxValid: false})
                          }
                        }}
                       />{" "}
                       One-Way
                      </Label>
                      </FormGroup> */}
                    
                      {/* <FormGroup check>
                      <Label htmlFor="nonStop" className="card badge bg-info text-dark text-wrap text-uppercase" check>
                      <Input className="form-control mb-3 mp-3"
                        id="nonStop"
                        type="checkbox"
                        name="nonStop"
                        value={formData.nonStop}
                        onChange={handleChange}
                        checked={checked.nonStop}
                       />
                       Non-Stop Flights Only
                      </Label>
                      </FormGroup> */}
                    
                      <span className="input-group-btn" style={{width:'20px'}}></span>
                  </div>
             
                    <br></br>
                    <Button className="btn btn-info" type="submit">Find Your Flight</Button>
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