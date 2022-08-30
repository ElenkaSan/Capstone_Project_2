import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, CardText, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import moment from 'moment';

// const DEFAULT_IMG = 'https://png.pngtree.com/svg/20170307/the_company_default_logo_574534.png';

function HotelCard(props) {
  console.debug("HotelCard");

  const { hasAppliedTrip, applyToTrip, unApplyToTrip } = useContext(UserContext);
  const [applied, setApplied] = useState(true);

  const apply = async () => {
    if (hasAppliedTrip(props.hotelId)) return;
    {
      applyToTrip(props.hotelId);
      setApplied(true);
      console.log("hotel added", props.hotelId);
    }
  };

  useEffect(() => {
    if (hasAppliedTrip) {
      setApplied(hasAppliedTrip(props.hotelId));
    }
  }, [props.hotelId, hasAppliedTrip]);

  const unapplied = async () => {
    unApplyToTrip(props.hotelId);
    setApplied(false);
    console.log("hotel removed", props.hotelId);
  };

  const unappliedButton = (
    <button
      onClick={unapplied}
      className="btn btn-outline-info font-weight-bold text-uppercase float-right"
    >
      Remove Hotel{" "}
    </button>
  );

  const applyButton = (
    <button
      onClick={apply}
      className="btn btn-warning font-weight-bold text-uppercase float-right"
    >
     Save Hotel{" "}
    </button>
  );

  return (
    <section className="has-icons-left"
    style={{ margin: '10px'}} >
    <Card className="J card col-md-8 offset-md-2">
    {" "}
        {applied}
      <CardHeader className="T font-weight-bold text-light">
        <h5>Hotel: {props.hotel.hotel.name} {props.hotel.hotel.type}, {props.hotel.hotel.address.cityName}</h5> 
      </CardHeader>
      <CardBody>
        <CardText className="card bg-secondary p-3">
        <p>
          Room Type:{" "}
          {props.hotel.offers[0].room.typeEstimated ? `${props.hotel.offers[0].room.typeEstimated.category}` : "N/A"} 
        </p>
        <p>
          Price:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: props.hotel.offers[0].price.currency || "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(props.hotel.offers[0].price.total)}{" "}
          for{" "}
          {moment(
            props.hotel.offers[0].checkInDate,
            "YYYY-MM-DD"
          ).format("MM/DD/YYYY")}{" "}
          through{" "}
          {moment(
            props.hotel.offers[0].checkOutDate,
            "YYYY-MM-DD"
          ).format("MM/DD/YYYY")}
        </p>
        <p>Rating: {props.hotel.hotel.rating}</p>
        <p>Hotel address: {props.hotel.hotel.address.lines}, &nbsp;
         {props.hotel.hotel.address.postalCode},  &nbsp;
         {props.hotel.hotel.address.cityName},  &nbsp;
         {props.hotel.hotel.address.countryCode},  &nbsp;
         {props.hotel.hotel.address.stateCode} 
          {/* {.hotel.hotel.address};  */} </p>
          {/* <p> Contact:
             {props.hotel.hotel.contact.phone}, &nbsp;
          {props.hotel.hotel.contact.email};</p> */}
          <p>  Contact:  &nbsp;
          {props.hotel.hotel.contact ? `${props.hotel.hotel.contact.phone}` : "N/A"}  &nbsp;
          E-mail:  &nbsp;
          {props.hotel.hotel.contact ? `${props.hotel.hotel.contact.email}` : "N/A"}  &nbsp;
          </p>
            <p>Description: &nbsp;
              {props.hotel.hotel.description ? `${props.hotel.hotel.description.text}` : "N/A"};</p>
            {/* <p> Amenities: &nbsp;
              {props.hotel.hotel.amenities};</p> */}
          </CardText>
          {applied ? unappliedButton : applyButton}
        </CardBody>
      </Card>
    </section>
  );
}

export default HotelCard;
