import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
	Button,
	// Form,
	FormGroup,
	Label,
	Input,
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert'
import { BsArrow90DegUp } from "react-icons/bs";
import { MdSwitchAccount } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";

//Signup component provides the form to register with the app.
//The data is sent to a parent function and awaits the response upon submission.
//If a response is successful, the user is logged in and sent to the home page.
//If response is unsuccessful, the errors are provided to the user so they can fix. 

function SignupForm({ signup }) {
  const history = useHistory();
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    notes: ''
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [hasErrors, setHasErrors] = useState([]); 
  const [show, setShow] = useState(true);
  
  //This handles the inputs as they are entered in by the user and saves to state. 
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
  };

  //This handles the submission by the user and will either be successful or not. 
  const handleSubmit = async (evt) => {
    evt.preventDefault(); 
    let response = await signup({ ...formData });
      if (response.messages === "success") {
        history.push("/profile");
        setFormData(INITIAL_STATE);
      }
      else {
        setHasErrors(response.error);
      }
  }
  
  
  return (
    <section className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
    <Card className="J" >
      <CardBody>
        <CardTitle>
          <h4 className="font-weight-bold text-center text-light">Sign Up</h4>
        </CardTitle>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
          {hasErrors.length 
          ?
               ( <>
               <Alert show={show} variant="danger"> 
                 <div className="alert alert-dismissible fade show">
              {hasErrors.map(error => (
                  <p className="mb-0 font-weight-light" key={error}>
                    {error}
                  </p>
              ))}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}>
              <span aria-hidden="true">&times;</span>
              </button>
                </div>
                 </Alert>
                  {!show && <Button className="btn btn-sm btn-outline-danger float-right" onClick={() => setShow(true)} type="Show Alert">
                    <FiAlertCircle />
                    </Button>}
                  </>
                 )
             : null}
            {/* {hasErrors.length > 0 && <div><Alert type = "danger" message={hasErrors} /></div>} */}
             {/* ? <Alert type = "danger" messages={hasErrors.length} />
            : null
            }  */}
           <div className="form-group font-weight-bold font-italic text-warning">
          <Label htmlFor="username">Username </Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Your nickname is..."
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group font-weight-bold font-italic text-warning">
          <Label htmlFor="password">Password </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your secret psw is..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group font-weight-bold font-italic text-warning">
          <Label htmlFor="firstName">First Name </Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Your name is..."
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group font-weight-bold font-italic text-warning">
          <Label htmlFor="lastName">Last Name </Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Your lastname is..."
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group font-weight-bold font-italic text-warning">
          <Label htmlFor="email">Email </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="How to reach you..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group font-weight-bold font-italic text-warning">
            <FloatingLabel htmlFor="notes"
              controlId="floatingTextarea" className="mb-3"
              > Your Trip Notes         
              </FloatingLabel>
              <Form.Control as="textarea"
                placeholder="Leave a comment here" 
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                />
          </div>
          <Button to="/" className="btn btn-outline-info float-left" style={{ color: '#bfe64b' }} type="submit" onSubmit={handleSubmit}>
            <h4><MdSwitchAccount /> </h4> 
          </Button>
          <Link className="btn btn-outline-warning float-right" to='/' type="Go Back">
            <h4> <BsArrow90DegUp /></h4>
          </Link>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
    <br></br>
  </section>
  );
}

export default SignupForm;