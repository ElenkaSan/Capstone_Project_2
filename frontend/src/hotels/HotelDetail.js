// import React 
// // { useContext, useEffect, useState } 
// from "react";
// import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";
// import { NavLink } from "react-router-dom";
// import UserContext from "../auth/UserContext";


import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import moment from 'moment';
import "../routes-nav/Navigation.css";

// const DEFAULT_IMG = 'https://png.pngtree.com/svg/20170307/the_company_default_logo_574534.png';

class HotelDetail extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     saveFlightId: "",
  //     saveFlightOrigin: "",
  //     saveFlightDest: "",
  //     saveFlightDep: "",
  //     saveFlightArr: "",
  //     saveFlightPrice: ""
  //   };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  // }

  // handleChange(evt) {
  //   this.setState({
  //     [evt.target.name]: evt.target.value
  //   });
  // }

  // handleSubmit(evt) {
  //   evt.prevtDefault();
  //   console.log("handleSubmit");
  //   console.log(evt.currentTarget);
  //   console.log(evt.currentTarget.dataset);
  //   console.log(this.props);
  //   this.props.getHotelInfoFromButton({
  //     id: evt.currentTarget.id,
  //     name: evt.currentTarget.dataset.hotelname,
  //     roomType: evt.currentTarget.dataset.room,
  //     price: evt.currentTarget.dataset.price,
  //     checkInDate: evt.currentTarget.dataset.checkindate,
  //     checkOutDate: evt.currentTarget.dataset.checkoutdate,
  //     currency: evt.currentTarget.dataset.currency
  //   });
  // }

  render() {
    return (
      <section className="has-icons-left"
        style={{ margin: '10px'}} >
        <Card className="J card col-md-8 offset-md-2">
          <CardHeader className="T font-weight-bold text-light">
            <h5>Hotel: {this.props.hotel.hotel.name} {this.props.hotel.hotel.type}, {this.props.hotel.hotel.address.cityName}</h5> 
          </CardHeader>
          <CardBody className="card bg-secondary">
            <p>
              Room Type:{" "}
              {this.props.hotel.offers[0].room.typeEstimated.category}
            </p>
            <p>
              Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: this.props.hotel.offers[0].price.currency || "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(this.props.hotel.offers[0].price.total)}{" "}
              for{" "}
              {moment(
                this.props.hotel.offers[0].checkInDate,
                "YYYY-MM-DD"
              ).format("MM/DD/YYYY")}{" "}
              through{" "}
              {moment(
                this.props.hotel.offers[0].checkOutDate,
                "YYYY-MM-DD"
              ).format("MM/DD/YYYY")}
            </p>
            <p>Rating: {this.props.hotel.hotel.rating}</p>
            <p>Hotel address: {this.props.hotel.hotel.address.lines}, &nbsp;
             {this.props.hotel.hotel.address.postalCode},  &nbsp;
             {this.props.hotel.hotel.address.cityName},  &nbsp;
             {this.props.hotel.hotel.address.countryCode},  &nbsp;
             {this.props.hotel.hotel.address.stateCode} 
              {/* {this.props.hotel.hotel.address};  */} </p>
              <p> Contact: {this.props.hotel.hotel.contact.phone}, &nbsp;
              {this.props.hotel.hotel.contact.email};</p>
            {/* <p>Description: {this.props.hotel.hotel.description.text || NaN};</p> */}
            {/* <p>Amenities {this.props.hotel.hotel.amenities};</p> */}
            {/* <div className="row">
            <img 
        //   style={{objectFit: "contain"}}
           className="col-2 float-right" src={DEFAULT_IMG || this.props.hotel.hotel.media[0].uri} alt={this.props.hotel.hotel.name} />
            </div> */}
            {/* <Button
              className="btn btn-warning"
              id={this.props.hotel.hotel.hotelId}
              data-hotelname={this.props.hotel.hotel.name}
              data-room={this.props.hotel.offers[0].room.typeEstimated.category}
              data-price={this.props.hotel.offers[0].price.total}
              data-currency={this.props.hotel.offers[0].price.currency}
              data-checkindate={this.props.hotel.offers[0].checkInDate}
              data-checkoutdate={this.props.hotel.offers[0].checkOutDate}
              onClick={this.handleSubmit}
              type="submit"
            >
              Save this Hotel
            </Button> */}
          </CardBody>
        </Card>
        </section>
    );
  }
}

// function HotelDetail({
//   hotel,
//   // offers,
//   // id = hotel.hotelId,
//   // name = hotel.name,
//   // rating = hotel.rating, 
//   // address = hotel.address,
//   // contact = hotel.contact, 
//   // description = hotel.description, 
//   // amenities = hotel.amenities,
//   // imgUrl = hotel.imgUrl,
//   // room = offers.room,
//   // guests = offers.guests,
//   // price = offers.price,
//   // checkInDate = offers.checkInDate,
//   // checkOutDate = offers.checkOutDate
//     // hotelId,
//     // name,
//     // // cityName,
//     // // stateCode,
//     // room,
//     // guests,
//     // price,
//     // currency,
//     // checkInDate,
//     // checkOutDate,
//     // rating,
//     // address,
//     // contact,
//     // description,
//     // amenities,
//     // imgUrl
// }) {

// //   const { hasAppliedTrip, applyFlight, unApplyFlight } = useContext(UserContext);
// //   const [applied, setApplied] = useState(true);

// //   const apply = async () => {
// //     if (hasAppliedTrip(id)) return;
// //     {
// //       applyFlight(id);
// //       setApplied(true);
// //       console.log("hotel added", id);
// //     }
// //   };

// //   useEffect(() => {
// //     if (hasAppliedTrip) {
// //       setApplied(hasAppliedTrip(id));
// //     }
// //   }, [id, hasAppliedTrip]);

// //   const unapplied = async () => {
// //     unApplyFlight(id);
// //     setApplied(false);
// //     console.log("hotel removed", id);
// //   };

// //   const unappliedButton = (
// //     <button
// //       onClick={unapplied}
// //       className="HotelCard-button btn btn-outline-success font-weight-bold text-uppercase float-right"
// //     >
// //       Unapplied{" "}
// //     </button>
// //   );

// //   const applyButton = (
// //     <button
// //       onClick={apply}
// //       className="HotelCard-button btn btn-warning font-weight-bold text-uppercase float-right"
// //     >
// //       Apply{" "}
// //     </button>
// //   );

//   return (
//     <section>
//       <Card className="Card">
//         {" "}
//         <CardBody className="body">
//           <CardTitle className="font-weight-bold text-center">
//             <h6 className="card-title">
//               {/* {hotels}  */}
//             </h6>
//           </CardTitle>
//           <CardSubtitle>
//             <NavLink 
//             // className="text-info" to={`/hotels/${id}`}
//             >
//               <h5> Hotel: {name} {hotelId}
//                {/* {cityName}, {stateCode} */}
//                </h5>
//             </NavLink>
//           </CardSubtitle>
//           <CardText className="font-italic">
//           <p>Room Type: {room} for {guests} ppl </p> 
//           {/* {adults} */}
//           <br></br>
//           <p>Price:     {price}
//              {new Intl.NumberFormat("en-US", {
//                 style: "currency",
//                 currency: currency || "USD",
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2
//               }).format(price)} 
//               for {checkInDate}  through{" "} {checkOutDate};</p>
//               <p>Rating: {rating}</p>
//               <p>Hotel address: {address}; Contact: {contact};</p>
//               <p>Description {description};</p>
//               <p>Amenities {amenities};</p>
//           <div className="row">
//           <img 
//         //   style={{objectFit: "contain"}}
//            className="col-2 float-right" src={DEFAULT_IMG || imgUrl} alt={name} />
//             </div>
//           </CardText>
//           {/* {applied ? unappliedButton : applyButton} */}
//         </CardBody>
//       </Card>
//     </section>
//   );
// }

export default HotelDetail;
