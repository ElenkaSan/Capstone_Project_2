import React,  { useState }  from 'react';
import { useHistory} from "react-router-dom";
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
import { IoBusiness } from 'react-icons/io5';
import "./Hotel.css";

//SearchHotels component provides a form that a user can filter hotels on. 
//The filters will be sent to the Amadeus API backend. 
//If hotels are found with those filters, those will be shown here. 
//If not found will show that Alert component used in AddHotel component "Sorry, no results were found!"

// const SearchHotels = (props) => {
    const SearchHotels = ({ findHotels }) => {
      const INITIAL_STATE = {
         cityCode: '',
         checkInDate: '',
         checkOutDate: ''
      } 

    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();
    
     //This handles the inputs as they are entered in by the user and saves to state. 
    const handleChange = (e) => {
        const { name, value } =  e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))
    };

    //This handles the submission by the user and will either be successful or not. 
    const handleSubmit = (e) => {
        e.preventDefault();
        findHotels({ ...formData });
        setFormData(INITIAL_STATE);
        history.push("/hotels");
    }

    return (
        <section className="Home text-right"
        style={{ margin: '10px'}} >
          <Card className="J card col-md-8 offset-md-2 p-2">
            <CardBody>
              <CardTitle className="T font-weight-bold text-center text-light">
                <h2>Search Hotel</h2>
              </CardTitle>  <hr/>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                <div className="text-left text-warning"> 
                    <Label htmlFor="cityCode" 
                    className="control has-icons-left">    
                    <h5 className='T text-warning'>Staying In</h5>   
                    </Label>
                    <Autocomplete className="card input mb-3 date-num"
                        name="cityCode"
                         disablePortal
                         id="cityCode"
                         options={airports}
                         onChange={handleChange}
                         autoHighlight
                         getOptionLabel={(cityCode) => cityCode.id}
                        //  onChange={(e, value) => value ? setSearch(value.id) : setSearch(e.target.value)}
                         renderOption={(props, cityCode) => (
                           <Box component="li" {...props}>
                             {cityCode.id} ({cityCode.label})
                           </Box>
                         )}
                         renderInput={(formData) => (
                           <TextField 
                             {...formData}
                             name="cityCode"
                             id="cityCode"
                             placeholder="Choose location"
                             label="Choose location"
                             value={formData.cityCode}
                             onChange={handleChange}
                             required
                            //  inputProps={{
                            //   ...formData.inputProps,
                            //   value: formData.cityCode
                            // }}
                           />
                         )}
                      />
                    <div className="input-group"> 
                    <Label htmlFor="checkInDate"> 
                      <h5 className='T text-warning'>Check-in</h5>  
                    <Input className="T form-control mb-3 date-num text-light"
                       id="checkInDate"
                       type="date"
                       name="checkInDate"
                       value={formData.checkInDate}
                       onChange={handleChange}
                       required
                   /> </Label>
                      <span className="input-group-btn me-5"></span>
                     <Label htmlFor="checkOutDate">    
                       <h5 className='T text-warning'>Check-out</h5>    
                    <Input className="T form-control mb-3 date-num text-light"
                       id="checkOutDate"
                       type="date"
                       name="checkOutDate"
                       value={formData.checkOutDate}
                       onChange={handleChange}
                       required
                   /> </Label>
                  </div>
                  </div>
                <Button className="btn btn-info btn-lg" type="submit">Search <IoBusiness/></Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      <br></br>
    </section>
   )
 }

export default SearchHotels;