import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, Button } from 'reactstrap';
import { FaSignInAlt } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";

function NoLoggedIn() {
    let history = useHistory();
    return (
        <ButtonGroup>
            <Button className='btn btn-info btn-m' style={{ margin: '2rem', color: '#bfe64b' }}onClick={evt => {history.push('/signup')}} type="Signup">
                <h3><MdSwitchAccount /> </h3> 
                 </Button>
            <Button className='btn btn-warning btn-m' style={{ margin: '2rem', color: '#367f9e' }} onClick={evt => {history.push('/login')}} type="Login"> 
            <h3> <FaSignInAlt /></h3> 
            </Button>
        </ButtonGroup>
    )
}

export default NoLoggedIn;