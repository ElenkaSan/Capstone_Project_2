import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import moment from 'moment';
// import useLocalStorage from "./hooks/useLocalStorage";
import './Hotel.css'

//HotelDetail component is used on AddHotel Component.
//It shows the information about the hotels. 
//It will also render a button if the user can save.
//IT will show the remove button, if the user has saved to the hotel previously.

function HotelDetail(props) {
  // console.debug("HotelDetail");
  const { hasAppliedHotel, applyToHotel, unApplyToHotel } = useContext(UserContext);
  const [applied, setApplied] = useState(true);
  // const [trip, setTrip] = useLocalStorage(true);
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);

  // const handleChange =(event)=> {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("handleSubmit");
  //   console.log(event.currentTarget);
  //   console.log(event.currentTarget.dataset);
  //   console.log(props);
  //   props.getHotelInfoFromButton({
  //     id: event.currentTarget.id,
  //     name: event.currentTarget.dataset.hotelname,
  //     roomType: event.currentTarget.dataset.room,
  //     price: event.currentTarget.dataset.price,
  //     checkInDate: event.currentTarget.dataset.checkindate,
  //     checkOutDate: event.currentTarget.dataset.checkoutdate,
  //     currency: event.currentTarget.dataset.currency
  //   });
  // }


  const apply = async () => {
    if (hasAppliedHotel(props.hotel.hotel.hotelId)) return;
    
      // window.localStorage.setItem('ADDed_HOTEL', JSON.stringify(applied));
      history.push("/hotels");
      applyToHotel(props.hotel.hotel.hotelId);
      setApplied(true);
      console.log("Hotel added", props.hotel.hotel.hotelId);
    
  };


  useEffect(() => {
    const data = window.localStorage.getItem('ADDed_HOTEL');
    if ( data !== null ) setApplied(JSON.parse(data));
  }, []);

  useEffect(() => {
    // console.log('ADDed Hotel', applied)
    window.localStorage.setItem('ADDed_HOTEL', JSON.stringify(applied));
    if (hasAppliedHotel) {
      setApplied(hasAppliedHotel(props.hotel.hotel.hotelId));
    }
  }, [props.hotel.hotel.hotelId, hasAppliedHotel, applied]);

  const unapplied = async () => {
    unApplyToHotel(props.hotel.hotel.hotelId);
    setApplied(false);
    console.log("Hotel removed", props.hotel.hotel.hotelId);
  };

  const unappliedButton = (
    <button onClick={unapplied} setApplied={false}
      className="btn btn-outline-info font-weight-bold text-uppercase float-right"
    >
      Remove Hotel{" "}
    </button>
  );

  const applyButton = (
    <button onClick={apply}
      className="btn btn-warning font-weight-bold text-uppercase float-right"
    >
     Save Hotel{" "}
    </button>
  );

  return (
    <section className="has-icons-left"
    style={{ margin: '10px'}} >
    <Card className="J card col-md-8 offset-md-2">
    {/* {applied} */}
      <CardHeader className="T font-weight-bold text-light p-3">
        <h5> 
          Hotel: {props.hotel.hotel.name} {props.hotel.hotel.type}, {props.hotel.hotel.address.cityName}; Hotel ID: {props.hotel.hotel.hotelId} {" "} 
        </h5> 
        <h5 className="T font-weight-bold text-warning text-right">
          Price:{" "} 
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: props.hotel.offers[0].price.currency || "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(props.hotel.offers[0].price.total)}{" "}
          </h5>
      </CardHeader>
      <CardBody>
        <CardText className="card details p-3 text-dark font-weight-bold">
        <p className="text-decoration-underline"> Rating: {props.hotel.hotel.rating}</p>
        <p>
        Stay Dates: from{" "}
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
        <p>
          Room Type:{" "}
          {props.hotel.offers[0].room.typeEstimated.category ? props.hotel.offers[0].room.typeEstimated.category : "N/A" } 
        </p>
        <p> Hotel address: {props.hotel.hotel.address.lines}, &nbsp;
          {props.hotel.hotel.address.postalCode},  &nbsp;
          {props.hotel.hotel.address.cityName},  &nbsp;
          {props.hotel.hotel.address.countryCode},  &nbsp;
          {props.hotel.hotel.address.stateCode} 
        </p>
        <p> Contact:  &nbsp;
          {props.hotel.hotel.contact ? props.hotel.hotel.contact.phone : "N/A"}  &nbsp;
          E-mail:  &nbsp;
          {props.hotel.hotel.contact ? props.hotel.hotel.contact.email : "N/A"}  &nbsp;
        </p>
        <p className="text-center">Description: </p>
          {props.hotel.hotel.description ? `${props.hotel.hotel.description.text}` : "N/A"};
              <br></br>
            {/* <p> Amenities: &nbsp;
              {props.hotel.hotel.amenities};</p> */}
            {" "} 
            <br></br>
            <p className="text-center">About Room:</p> {props.hotel.offers[0].room.description.text}
          </CardText>
          { isLoggedIn ? 
             ((applied) ? unappliedButton : applyButton) : null
            }
          {/* <Button
              className="hotel-results-btn"
              id={props.hotel.hotel.hotelId}
              data-hotelname={props.hotel.hotel.name}
              data-room={props.hotel.offers[0].room.typeEstimated.category}
              data-price={props.hotel.offers[0].price.total}
              data-currency={props.hotel.offers[0].price.currency}
              data-checkindate={props.hotel.offers[0].checkInDate}
              data-checkoutdate={props.hotel.offers[0].checkOutDate}
              onClick={handleSubmit}
              type="submit"
            >
              Save this Hotel
            </Button> */}
        </CardBody>
      </Card>
    </section>
  );
}

export default HotelDetail;