import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Api from "../api";
import UserContext from "./UserContext";
import {
	Button,
	FormGroup,
	Label,
	Input,
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { MdDeleteForever } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { BsArrow90DegUp }  from "react-icons/bs";

//Profile Form for Update is the component where the user can update their profile information.
//If data does not meet the conditions of the backend, they will be informed of the errors. 
//Data is populated based on the profile to ensure with the exception of the password field.
//If successful, the profile is updated and they will be redirected to the profile home page.

const ProfileForm = ({ updateUser}) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const INITIAL_STATE = {
    firstName: isLoggedIn.firstName,
    lastName: isLoggedIn.lastName,
    email: isLoggedIn.email,
    username: isLoggedIn.username,
    password: '',
    notes: isLoggedIn.notes
  }
const [formData, setFormData] = useState(INITIAL_STATE);
const [hasErrors, setHasErrors] = useState([]);
const [saveConfirmed, setSaveConfirmed] = useState(false);
const history = useHistory();

  console.debug(
      "ProfileForm",
      "isLoggedIn=", isLoggedIn,
      "formData=", formData,
      "hasErrors=", hasErrors,
      "saveConfirmed=", saveConfirmed,
  );
  
   //This handles the submission by the user and will either be successful or not. 
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      notes: formData.notes
    };

    let username = formData.username;
    try {
      updateUser = await Api.saveProfile(username, user);
    } catch (errors) {
      setHasErrors(errors);
      return;
    }
    setFormData(f => ({ ...f, password: "" }));
    setHasErrors([]);
    setSaveConfirmed(true);
    setIsLoggedIn(updateUser);
  }

  //This handles the inputs as they are entered in by the user and saves to state. 
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
  }));
  setHasErrors([]);
  }
  
  const handleDelete = (evt) => {
    evt.preventDefault();
    let username = formData.username;
    try {
      Api.deleteUser(username);
      if (isLoggedIn.username == null) {
        history.push("/");
      }
    } catch (err) {
        setHasErrors(err);
        return;
      }
    setHasErrors([]);
    setSaveConfirmed(true);
    setIsLoggedIn(false);
  }

  return (
    <section className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <Card className="J" >
        <CardBody>
          <CardTitle className="T font-weight-bold text-center text-info">
            <h3>Update Profile</h3>
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
            {hasErrors.length
                  ? 
                  (<p className="card bg-warning text-danger text-center" >Password should be min 5 length.
                  </p>)
                  : null}
                 {saveConfirmed
                  ?
                  (<p className="card bg-warning text-success text-center" >Updated successfully.
                  </p>)
                  : null}
                   <div className="T font-italic text-warning display-6">
                    <Label htmlFor="username">Username:   {formData.username}
                    {/* <p className="T form-control-plaintext text-warning font-weight-bold text-uppercase">
                      {formData.username}
                    </p> */}
                    </Label>
                  </div>
                  <div className="T form-group font-weight-bold font-italic text-warning">
                  <Label htmlFor="firstName">First Name </Label>
                    <Input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                     />
                  </div>
                  <div className="T form-group font-weight-bold font-italic text-warning">
                  <Label htmlFor="lastName">Last Name </Label>
                  <Input
                     id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                   />
                  </div>
                  <div className="T form-group font-weight-bold font-italic text-warning">
                  <Label htmlFor="email">Email </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                   />
                  </div>
                  <div className="T form-group font-weight-bold font-italic text-warning">
                  <Label htmlFor="password">Password </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Your old Password or Make new one... "
                    value={formData.password}
                    onChange={handleChange}
                  />
                  </div>
                  <div className="T form-group font-weight-bold font-italic text-warning">
                  <FloatingLabel
                      htmlFor="notes"
                      controlId="floatingTextarea"
                      className="mb-3"
                     > Your Trip Notes         
                    </FloatingLabel>
                    <Form.Control as="textarea" placeholder="Leave a comment here" 
                     name="notes"
                     id="notes"
                     value={formData.notes}
                     onChange={handleChange}
                     />
                  </div>
                  <Button  
                  className="btn btn-outline-info float-lefts" style={{ color: '#bfe64b' }} 
                  onClick={handleSubmit}>
                    <FiSave /> Changes
                  </Button>
                  <span className="input-group-btn me-2"></span>
                  <Button  
                  className="btn btn-outline-danger"
                  onClick={handleDelete} >
                    <MdDeleteForever /> Profile
                  </Button>
                  <Link className="btn btn-outline-warning float-right" 
                   to="/profile" type="Profile">
                     <BsArrow90DegUp />
                  </Link>
            </FormGroup>
          </Form>
     </CardBody>
    </Card>
    <br></br>
   </section>
 );
}

export default ProfileForm;
