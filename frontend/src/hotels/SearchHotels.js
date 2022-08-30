import React,  { useEffect, useState }  from 'react';
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
import airports from "../airportData";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
// import Calendar from '../common/TripCalendar';
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import Api from '../api';
// import { Autocomplete } from "@material-ui/lab";
// import {
//   LocationOn as PinIcon,
//   Search as MagnifierIcon,
// } from "@material-ui/icons";
// import {
//   Grid,
//   InputAdornment,
//   makeStyles,
//   TextField,
//   Typography,
// } from "@material-ui/core";
// import clsx from "clsx";
// import { search } from "../ApiAm";

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
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        findHotels({ ...formData });
        setFormData(INITIAL_STATE);
        // history.push("/hotels");
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
                    {/* <Input className="input mb-3"
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
                    /> */}
                    <Autocomplete className="card input mb-3 bg-light"
                         id="cityCode"
                         sx={{ width: 400 }}
                         name="cityCode"
                        //  value={formData.originLocationCode}
                         options={airports}
                         placeholder="Staying In"
                         required
                         onChange={handleChange}
                         autoHighlight
                         getOptionLabel={(cityCode) => cityCode.id}
                        // getOptionLabel={(option) => option.id}
                         renderOption={(props, cityCode) => (
                          // renderOption={(props, option) => (
                           <Box component="li" {...props}>
                             {/* {option.id} ({option.label})  */}
                             {cityCode.id} ({cityCode.label})
                           </Box>
                         )}
                         renderInput={(formData) => (
                           <TextField
                             {...formData}
                             name="cityCode"
                             id="cityCode"
                             label="Staying In"
                             value={formData.cityCode}
                             onChange={handleChange}
                             inputProps={{
                              ...formData.inputProps,
                              value: formData.cityCode
                            }}
                           />
                         )}
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