import React, { useState } from "react";
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
import Alert from 'react-bootstrap/Alert'
import { BsArrow90DegUp }  from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";


function LoginForm({ login }) {
  const INITIAL_STATE = {
    username: '',
    password: ''
}
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();
  const [hasLoginErrors, setHasLoginErrors] = useState(false);
  const [show, setShow] = useState(true);

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "hasLoginErrors", hasLoginErrors,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await login({ ...formData });
    if (response.message === "success") {
      history.push("/mytrip");
    }
    else {
      setHasLoginErrors(true);
    }
    setFormData(INITIAL_STATE);
  }

  return (
    <section className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <Card className="J">
        <CardBody>
            <CardTitle >
              <h4 className="font-weight-bold text-center text-light">User Login</h4>
            </CardTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                {hasLoginErrors
                  ?
                  ( <>
                    <Alert show={show} variant="danger"> 
                      <div className="alert alert-dismissible fade show">
                        <p>Oh, no! <br></br>Incorrect username or password.
                       </p>
                       <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}>
                          <span aria-hidden="true"> &times; </span> 
                        </button> 
                      </div>
                    </Alert>
                    {!show && <Button className="btn btn-sm btn-outline-danger float-right" onClick={() => setShow(true)} type="Show Alert">
                    <FiAlertCircle />
                    </Button>}
                  </> )
                  : null}
               <div className="form-group font-weight-bold font-italic text-warning">
                <Label htmlFor="username">Username </Label>
                <Input
                   id="username"
                   type="text"
                   name="username"
                   placeholder="Your username..."
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
                  placeholder="Your password..."
                  value={formData.password}
                  onChange={handleChange}
                  required
                 />
                </div>
                <Button to="/" className="btn btn-outline-info float-left" style={{ color: '#bfe64b' }} onSubmit={handleSubmit} type="Login"> 
                  <h4> <FaSignInAlt /></h4>
                </Button>
                <Link className="btn btn-outline-warning float-right" to='/' type="Go Back">
                  <h4> <BsArrow90DegUp /></h4>
                </Link>
                </FormGroup>
            </Form>
        </CardBody>
    </Card>
  </section>
);
}

export default LoginForm;
