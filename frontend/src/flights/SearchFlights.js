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


// const SearchFlights = (props) => {
    const SearchFlights = ({findFlights}) => {
        const INITIAL_STATE = {
          origin: '',
          destination: '',
          startDate: '',
          endDate: '',
          adults: '',
          oneWay: '',
          nonStop: ''
        }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const [checked, setChecked] = React.useState(false);

    const handleChangeCheck = () => {
       setChecked(!checked);
    };
    const hidden = checked ? '' : 'hidden'; 
    
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        console.log(`${value} is ${checked}`)
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

  //  const handleCheckboxOneWay = (e) => {
  //     // Getting the value and name of the input which triggered the change
  //     setChecked({ oneWay: e.target.checked });
  //   };
  
  //   const handleCheckboxNonStop = (e) => {
  //     // Getting the value and name of the input which triggered the change
  //     setChecked({ nonStop: e.target.checked });
  //   };


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
              </CardTitle>  <hr/>
              <Form onSubmit={handleSubmit}>
                 <FormGroup>
                   <div className="container p-6">   
        {/* <h1 className="text-light text-center"> Search Flight </h1> */}
                   <div className="input-group">
                     <Label htmlFor="origin"> 
                     <Input className="input mb-3"
                       id="origin"
                       type="text"
                       name="origin"
                       value={formData.origin}
                       onChange={handleChange}
                       placeholder="Flying From"
                       required
                      />
                      </Label>
                      <span className="input-group-btn" style={{width:'10px'}}></span>
                      <Label htmlFor="destination"> 
                      <Input className="input mb-3"
                        id="destination"
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Flying To"
                        required
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
                        onChange={handleChange}
                        // style= {{ width: '90px'}}
                      />
                      </Label>
                      <span className="input-group-btn" style={{width:'20px'}}></span>
                    <Label htmlFor="startDate"> 
                    <h5 className='T text-light'>Depature Date </h5>   
                    <Input className="form-control mb-3 mp-3"
                       id="startDate"
                       type="date"
                       name="startDate"
                       value={formData.startDate}
                       onChange={handleChange}
                       style= {{ height: '40px'}}
                       required
                    />    
                    </Label>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    <div className={ hidden }>
                    <Label htmlFor="endDate">    
                    <h5 className='T text-light'>Return Date </h5>
                    <Input className="form-control mb-3 mp-3"
                       id="endDate"
                       type="date"
                       name="endDate"
                       value={formData.endDate}
                       onChange={handleChange}
                       style= {{ height: '40px'}}
                    /> 
                    </Label>
                    </div>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    <FormGroup check>
                    <Label className="card badge bg-info text-dark text-wrap text-uppercase" style={{height: "2em"}} check> 
                    <Input 
                        id="type"
                        type="checkbox"
                        // type="text"
                        name="type"
                        // value={formData.type}
                        checked={checked.endDate}
                        onChange={handleChangeCheck}
                        // style= {{ height: '40px'}}
                        // required
                      />  Round-Trip
                    </Label>
                    </FormGroup>
                    <span className="input-group-btn" style={{width:'20px'}}></span>
                    {/* <Label htmlFor="oneWay">   */}
                    <FormGroup check>
                    <Label className="card badge bg-info text-dark text-wrap text-uppercase" check>
                      <Input className="form-control mb-3 mp-3"
                        id="oneWay"
                        type="checkbox"
                        name="oneWay"
                        value={formData.oneWay}
                        onChange={handleChange}
                        // onChange={handleCheckboxOneWay}
                        // style= {{ height: '40px'}}
                        checked={checked.oneWay}
                       />{" "}
                       One-Way
                      </Label>
                      </FormGroup>
                      {/* <Label htmlFor="nonStop">  */}
                      <FormGroup check>
                      <Label className="card badge bg-info text-dark text-wrap text-uppercase" check>
                      <Input className="form-control mb-3 mp-3"
                        id="nonStop"
                        type="checkbox"
                        name="nonStop"
                        value={formData.nonStop}
                        onChange={handleChange}
                        // onChange={handleCheckboxNonStop}
                        // style= {{ height: '40px'}}
                        checked={checked.nonStop}
                       />{" "}
                       Non-Stop Flights Only
                      </Label>
                      </FormGroup>
                    
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