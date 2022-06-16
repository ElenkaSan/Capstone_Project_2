// import React, { useState, useContext } from "react";
// import { useHistory, Link } from "react-router-dom";
// // import Api from "../api";
// import UserContext from "./UserContext";
// // import {
// // 	Button,
// // 	Form,
// // 	FormGroup,
// // 	Label,
// // 	Input,
// // 	Card,
// // 	CardBody,
// // 	CardTitle
// // } from 'reactstrap';
// // import { MdDeleteForever } from "react-icons/md";
// // import { FiSave } from "react-icons/fi";
// // import { BsArrow90DegUp }  from "react-icons/bs";


// const MyTrip = ({ updateUser}) => {

// }

// export default MyTrip;

import React, { useState, useEffect } from 'react';


function MyTrip() {

    
    const [places, setPlaces] = useState([]);
    
    useEffect(() => {
        fetch(('/mytrip'), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPlaces(data);
        })
    }, [])
    
   
    return (
        <div className="container p-fix">
            <h3 className = "bg-light card">My Trips</h3>
                    <div className="columns is-mobile is-multiline">
                        {places.map(place => (
                            <div className="column is-one-third">
                                <div className="card" style={{ height: '325px' }}>
                                    <div className="card-image">
                                    <figure className="image is-16by9">
                                        <img src={ place.photo ? place.photo : "https://placeimg.com/640/480/nature"} alt={ place.place } />
                                    </figure>
                                    </div>
                                    <div className="card-content">
                                    <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <img src={ place.photo ? place.photo : "https://placeimg.com/48/48/nature"} alt={ place.place } />
                                        </figure>
                                    </div>
                                    <div className="media-content has-text-left">
                                        <p className="title is-6">{place.place}</p>
                                        <p className="subtitle is-6"><a href={place.placeURL} target="_blank" rel="noreferrer">{place.place}</a></p>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    )
}

export default MyTrip;