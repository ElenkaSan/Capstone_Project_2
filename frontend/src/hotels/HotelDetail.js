import React 
// { useContext, useEffect, useState } 
from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";
// import UserContext from "../auth/UserContext";

const DEFAULT_IMG = 'https://png.pngtree.com/svg/20170307/the_company_default_logo_574534.png';

function HotelDetail({
    name,
    cityName,
    stateCode,
    room,
    guests,
    price,
    currency,
    checkInDate,
    checkOutDate,
    rating,
    address,
    contact,
    description,
    amenities,
    imgUrl
}) {

//   const { hasAppliedTrip, applyFlight, unApplyFlight } = useContext(UserContext);
//   const [applied, setApplied] = useState(true);

//   const apply = async () => {
//     if (hasAppliedTrip(id)) return;
//     {
//       applyFlight(id);
//       setApplied(true);
//       console.log("hotel added", id);
//     }
//   };

//   useEffect(() => {
//     if (hasAppliedTrip) {
//       setApplied(hasAppliedTrip(id));
//     }
//   }, [id, hasAppliedTrip]);

//   const unapplied = async () => {
//     unApplyFlight(id);
//     setApplied(false);
//     console.log("hotel removed", id);
//   };

//   const unappliedButton = (
//     <button
//       onClick={unapplied}
//       className="HotelCard-button btn btn-outline-success font-weight-bold text-uppercase float-right"
//     >
//       Unapplied{" "}
//     </button>
//   );

//   const applyButton = (
//     <button
//       onClick={apply}
//       className="HotelCard-button btn btn-warning font-weight-bold text-uppercase float-right"
//     >
//       Apply{" "}
//     </button>
//   );

  return (
    <section>
      <Card className="Card">
        {" "}
        <CardBody className="body">
          <CardTitle className="font-weight-bold text-center">
            <h6 className="card-title">
              {/* {hotels}  */}
            </h6>
          </CardTitle>
          <CardSubtitle>
            <NavLink 
            // className="text-info" to={`/hotels/${id}`}
            >
              <h5> Hotel: {name}, {cityName}, {stateCode}</h5>
            </NavLink>
          </CardSubtitle>
          <CardText className="font-italic">
          <p>Room Type: {room} for {guests} ppl </p> 
          {/* {adults} */}
          <br></br>
          <p>Price:     {price}
             {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency || "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(price)} 
              for {checkInDate}  through{" "} {checkOutDate};</p>
              <p>Rating: {rating}</p>
              <p>Hotel address: {address}; Contact: {contact};</p>
              <p>Description {description};</p>
              <p>Amenities {amenities};</p>
          <div className="row">
          <img 
        //   style={{objectFit: "contain"}}
           className="col-2 float-right" src={DEFAULT_IMG || imgUrl} alt={name} />
            </div>
          </CardText>
          {/* {applied ? unappliedButton : applyButton} */}
        </CardBody>
      </Card>
    </section>
  );
}

export default HotelDetail;
