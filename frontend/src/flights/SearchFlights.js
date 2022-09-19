import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
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
import './flight.css'
import airports from "../airportData";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { IoAirplane } from 'react-icons/io5';


//SearchFlights component provides a form that a user can filter flights on. 
// In filter user can choose on way or around flight and will show direct flights or will have the stops. 
//The filters will be sent to the Amadeus API backend. 
//If flights are found with those filters, those will be shown here. 
//If not found will show that Alert component used in AddFlight component "Sorry, no results were found!"

// const SearchFlights = (props) => {
    const SearchFlights = ({ flightSearchAround,
                             flightSearchOneway }) => {
        const INITIAL_STATE = {
          originLocationCode: '',
          destinationLocationCode: '',
          departureDate: '',
          returnDate: '',
          adults: '',
          oneWay: false,
        }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [checked, setChecked] = React.useState(false);
    
    const history = useHistory();

    const handleChangeCheck = () => {
       setChecked(!checked);
    };

    const hidden = checked ? '' : 'hidden'; 
    
     //This handles the inputs as they are entered in by the user and saves to state. 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    //This handles the submission by the user and will either be successful or not. 
    const handleSubmit = (e) => {
        e.preventDefault();
        flightSearchAround({ ...formData });
        flightSearchOneway({ ...formData });
        setFormData(INITIAL_STATE);
        history.push("/flights");
    }

    const flightType = formData.returnDate ? "ROUND-TRIP" : formData.oneWay ? "ONE-WAY" : "";

    return (
        <section className="Home text-right"
        style={{ margin: '10px'}}
        >  
          <Card className="J card col-md-8 offset-md-2 p-2">
            <CardBody>
              <CardTitle className="font-weight-bold text-center text-light">
                 <h2 className='T mb-4'>Search Flight</h2>
              </CardTitle>  <hr/>
              <Form onSubmit={handleSubmit}>
                 <FormGroup>
                  <div className="text-left">   
                     <Label htmlFor="originLocationCode" 
                     className="control has-icons-left">    
                    <h5 className='T text-warning'>Flight from Airport</h5>  
                     </Label>
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
                      <Autocomplete className="card input mb-3 date-num"
                         id="originLocationCode"
                         name="originLocationCode"
                        //  value={formData.originLocationCode}
                         options={airports}
                         placeholder="Flying From"
                        //  required
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
                             required
                            //  inputProps={{
                            //   ...formData.inputProps,
                            //   value: formData.originLocationCode
                            // }}
                           />
                         )}
                      />
                      <span className="input-group-btn" style={{width:'10px'}}></span>
                      <Label htmlFor="destinationLocationCode"
                      className="control has-icons-left">    
                      <h5 className='T text-warning'>Flight to Airport</h5>   
                      </Label>
                      {/* <Input className="input mb-3"
                        id="destinationLocationCode"
                        type="text"
                        name="destinationLocationCode"
                        value={formData.destinationLocationCode}
                        onChange={handleChange}
                        placeholder="Flying To"
                        required
                      />           */}
                      <Autocomplete className="card input mb-3 date-num"
                         id="destinationLocationCode"
                         name="destination"
                        //  value={formData.destinationLocationCode}
                         options={airports}
                         placeholder="Flying To"
                        //  required 
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
                             required
                            //  inputProps={{
                            //   ...formData.inputProps,
                            //   value: formData.destinationLocationCode
                            // }}
                           />
                         )}
                      />
                    <div className="input-group">
                      <Label htmlFor="adults"> 
                      <h5 className='T text-warning'> Travelers </h5>   
                      <Input className="T input mb-3 date-num text-light"
                        id="adults"
                        type="number"
                        name="adults"
                        min="0"
                        max="100"
                        value={formData.adults}
                        onChange={handleChange}
                        required
                      />
                      </Label>
                      <span className="input-group-btn me-5"></span>
                    <Label htmlFor="departureDate"> 
                    <h5 className='T text-warning'>Depature Date </h5>   
                    <Input className="T form-control mb-3 date-num text-light"
                       id="departureDate"
                       type="date"
                       name="departureDate"
                       value={formData.departureDate}
                       onChange={handleChange}
                       required
                    />    
                    </Label>
                    <span className="input-group-btn me-5"></span>
                    <div className={ hidden }>
                    <Label htmlFor="returnDate">    
                    <h5 className='T text-warning'>Return Date </h5>
                    <Input className="T form-control mb-3 date-num text-light"
                       label={flightType}
                       id="returnDate"
                       type="date"
                       name="returnDate"
                       value={formData.returnDate}
                       onChange={handleChange}
                    /> 
                    </Label>
                    </div>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    <FormGroup check>
                    <Label className="card badge bg-info text-dark text-wrap text-uppercase " style={{height: "2em"}} check> 
                    <Input className='date-num'
                        label={flightType}
                        id="type"
                        type="checkbox"
                        name="type"
                        checked={checked.returnDate}
                        onChange={handleChangeCheck}
                      />  Round-Trip
                    </Label>
                    </FormGroup>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                  </div>
                  </div>
                    <br></br>
                    <Button className="btn btn-info btn-lg" type="submit">
                      Search <IoAirplane /></Button>
                </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <br></br>
      </section>
   )
 }

export default SearchFlights;