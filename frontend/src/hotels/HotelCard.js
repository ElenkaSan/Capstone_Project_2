import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

const DEFAULT_IMG = 'https://png.pngtree.com/svg/20170307/the_company_default_logo_574534.png';

function HotelCard({
  id,
  hotelName,
  checkin,
  checkout,
  reviews,
  numberOfGuests,
  roomNumber,
  description,
  price,
  imgUrl
}) {
  console.debug("HotelCard");
  const { hasAppliedTrip, applyFlight, unApplyFlight } = useContext(UserContext);
  const [applied, setApplied] = useState(true);

  const apply = async () => {
    if (hasAppliedTrip(id)) return;
    {
      applyFlight(id);
      setApplied(true);
      console.log("hotel added", id);
    }
  };

  useEffect(() => {
    if (hasAppliedTrip) {
      setApplied(hasAppliedTrip(id));
    }
  }, [id, hasAppliedTrip]);

  const unapplied = async () => {
    unApplyFlight(id);
    setApplied(false);
    console.log("hotel removed", id);
  };

  const unappliedButton = (
    <button
      onClick={unapplied}
      className="HotelCard-button btn btn-outline-success font-weight-bold text-uppercase float-right"
    >
      Unapplied{" "}
    </button>
  );

  const applyButton = (
    <button
      onClick={apply}
      className="HotelCard-button btn btn-warning font-weight-bold text-uppercase float-right"
    >
      Apply{" "}
    </button>
  );

  return (
    <section>
      <Card className="Card">
        {" "}
        {applied}
        <CardBody className="body">
          <CardTitle className="font-weight-bold text-center">
            <h6 className="card-title">
              {hotelName} (Hotel id: {id})
            </h6>
          </CardTitle>
          <CardSubtitle>
            <NavLink className="text-info" to={`/hotels/${id}`}>
              <h5> {hotelName} </h5>
            </NavLink>
          </CardSubtitle>
          <CardText className="font-italic">
          Room {price} for {numberOfGuests} {roomNumber}. Checkin: {checkin} and Checkout: {checkout}. 
          <br></br>
          Hotel reviews {reviews ? `$ ${reviews}` : "N/A"}. 
          <br></br>
          Description: { description}
          <div className="row">
          <img 
        //   style={{objectFit: "contain"}}
           className="col-2 float-right" src={imgUrl || DEFAULT_IMG} alt={hotelName} />
            </div>
          </CardText>
          {applied ? unappliedButton : applyButton}
        </CardBody>
      </Card>
    </section>
  );
}

export default HotelCard;
