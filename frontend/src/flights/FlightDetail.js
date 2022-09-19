import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import moment from 'moment';
import './flight.css'

//FlightDetail component is used on AddFlight Component.
//It shows the information about the flights. 
//It will also render a button if the user can save.
//IT will show the remove button, if the user has saved to the hotel previously.

function FlightDetail(props) {
    // console.debug("FlightDetail");
    const { hasAppliedFlight, applyToFlight, unApplyToFlight } = useContext(UserContext);
    const [applied, setApplied] = useState(true);
    const history = useHistory();
      const { isLoggedIn } = useContext(UserContext);

    const apply = async () => {
      if (hasAppliedFlight(props.flight.id)) return;
      
        // window.localStorage.setItem('ADDed_FLIGHT', JSON.stringify(applied));
        history.push("/flights");
        applyToFlight(props.flight.id);
        setApplied(true);
        console.log("Flight added", props.flight.id);
      
    };

    useEffect(() => {
      const data = window.localStorage.getItem('ADDed_FLIGHT');
      if ( data !== null ) setApplied(JSON.parse(data));
    }, []);
  
    useEffect(() => {
        // console.log('ADDed Hotel', applied)
      window.localStorage.setItem('ADDed_FLIGHT', JSON.stringify(applied));
      if (hasAppliedFlight) {
        setApplied(hasAppliedFlight(props.flight.id));
      }
    }, [props.flight.id, hasAppliedFlight, applied]);
  
    const unapplied = async () => {
      unApplyToFlight(props.flight.id);
      setApplied(false);
      // resetFlight();
      console.log("Flight removed", props.flight.id);
    };
  
    const unappliedButton = (
      <button onClick={unapplied}
        className="btn btn-outline-info font-weight-bold text-uppercase float-right"
      >
        Remove Flight{" "}
      </button>
    );
  
    const applyButton = (
      <button onClick={apply}
        className="btn btn-warning font-weight-bold text-uppercase float-right"
      >
       Save Flight{" "}
      </button>
    );

    const timeTraveled = () => {
      let leaveTime = moment(
        props.flight.itineraries[0].segments[0].departure.at,
        ["YYYY", moment.ISO_8601]
      );
      let arriveTime = moment(
        props.flight.itineraries[0].segments[
        props.flight.itineraries[0].segments.length - 1].arrival.at,
        ["YYYY", moment.ISO_8601]
      );
      let diff = arriveTime.diff(leaveTime, "minutes");
      return `${Math.floor(diff / 60)} hours, ${diff % 60} minutes`;
    }

    const timeTraveledR = () => {
      let leaveTime = moment(
        props.flight.itineraries[1].segments[0].departure.at,
        ["YYYY", moment.ISO_8601]
      );
      let arriveTime = moment(
        props.flight.itineraries[1].segments[
        props.flight.itineraries[1].segments.length - 1].arrival.at,
        ["YYYY", moment.ISO_8601]
      );
      let diff = arriveTime.diff(leaveTime, "minutes");
      return `${Math.floor(diff / 60)} hours, ${diff % 60} minutes`;
    }
    
    return (
      <section className="has-icons-left"
      style={{ margin: '10px'}} >
          <Card className="J card col-md-8 offset-md-2">
          {applied}
            <CardHeader className="T font-weight-bold text-light text-center">
              <h5>
                {/* Go to  {props.flight.itineraries[0].segments[0].arrival.iataCode}  {" "} */}
              {props.flight.itineraries[0].segments.length -  1 === 0
               ?
               (<><p>Go to: {props.flight.itineraries[0].segments[0].arrival.iataCode}</p></>) 
               : props.flight.itineraries[0].segments.length - 1 === 1 
               ?
               (<><p>1 stop: {props.flight.itineraries[0].segments[0].departure.iataCode} - {props.flight.itineraries[0].segments[0].arrival.iataCode} then {" "}
                {props.flight.itineraries[0].segments[1].departure.iataCode} - {props.flight.itineraries[0].segments[1].arrival.iataCode}</p></>)
               :
               (<><p>1 stop: {props.flight.itineraries[0].segments[0].departure.iataCode} - {props.flight.itineraries[0].segments[0].arrival.iataCode} <br></br> 2 stop: {" "}
               {props.flight.itineraries[0].segments[1].departure.iataCode} - {props.flight.itineraries[0].segments[1].arrival.iataCode} then {" "}
               {props.flight.itineraries[0].segments[2].departure.iataCode} - {props.flight.itineraries[0].segments[2].arrival.iataCode} </p></>)
               } {" "}
               | 
                  Airline: {props.flight.itineraries[0].segments[0].carrierCode} | Flight ID: {props.flight.id} </h5>
             </CardHeader>
            <CardBody>
              
            <CardText className="card details p-3 text-dark font-weight-bold">
               <p> Class: {props.flight.travelerPricings[0].fareDetailsBySegment[0].cabin } {" "}
               for {" "} {props.flight.travelerPricings.length === 1 ? props.flight.travelerPricings.length : props.flight.travelerPricings.length } adult(s)
               </p>
                <p className="T font-weight-bold J text-light card text-center p-1">
              Departing Flights{" "}
              {props.flight.itineraries[0].segments.length - 1 === 0
                ? "(Nonstop)"
                : props.flight.itineraries[0].segments.length - 1 === 1
                ? `(${props.flight.itineraries[0].segments.length - 1} Stop)`
                : `(${props.flight.itineraries[0].segments.length - 1} Stops)`}
            </p>
              {/* <p>Departure:  {props.flight.itineraries[0].segments[0].departure.iataCode} at {moment(props.flight.itineraries[0].segments[0].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}  from  Terminal  {props.flight.itineraries[0].segments[0].departure.terminal}
              </p>
              <p>Arrival: {props.flight.itineraries[0].segments[0].arrival.iataCode} at {moment(props.flight.itineraries[0].segments[0].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}</p> */}
              {/* <hr></hr> */}
              {props.flight.itineraries[0].segments.length -  1 === 0 
              ? 
              (<>
              <p>Departure:  {props.flight.itineraries[0].segments[0].departure.iataCode} at {moment(props.flight.itineraries[0].segments[0].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}  from  Terminal  {props.flight.itineraries[0].segments[0].departure.terminal}
              </p>
              <p>Arrival: {props.flight.itineraries[0].segments[0].arrival.iataCode} at {moment(props.flight.itineraries[0].segments[0].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}</p>
              </>) 
              : props.flight.itineraries[0].segments.length - 1 === 1 
              ?
              (<>
              <p className="text-decoration-underline">First flight:</p>
               <p>Departure:  {props.flight.itineraries[0].segments[0].departure.iataCode} at {moment(props.flight.itineraries[0].segments[0].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}  from  Terminal  {props.flight.itineraries[0].segments[0].departure.terminal}
              </p>
              <p>Arrival: {props.flight.itineraries[0].segments[0].arrival.iataCode} at {moment(props.flight.itineraries[0].segments[0].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}</p>
              <p className="text-decoration-underline">Second flight:</p>
              <p>Departure: {props.flight ? props.flight.itineraries[0].segments[1].departure.iataCode : null}  at {moment(props.flight.itineraries[0].segments[1].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p><p>Arrival: {props.flight ? props.flight.itineraries[0].segments[1].arrival.iataCode : null}  at {moment(props.flight.itineraries[0].segments[1].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p>
              </>) 
              : 
              (<>
              <p className="text-decoration-underline">First flight:</p>
               <p>Departure:  {props.flight.itineraries[0].segments[0].departure.iataCode} at {moment(props.flight.itineraries[0].segments[0].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}  from  Terminal  {props.flight.itineraries[0].segments[0].departure.terminal}
              </p>
              <p>Arrival: {props.flight.itineraries[0].segments[0].arrival.iataCode} at {moment(props.flight.itineraries[0].segments[0].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}</p>
              <p className="text-decoration-underline">Second flight:</p>
              <p>Departure: {props.flight ? props.flight.itineraries[0].segments[1].departure.iataCode : null}  at {moment(props.flight.itineraries[0].segments[1].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p><p>Arrival: {props.flight ? props.flight.itineraries[0].segments[1].arrival.iataCode : null}  at {moment(props.flight.itineraries[0].segments[1].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p>
                 <p className="text-decoration-underline">Third flight:</p>
              <p>Departure: {props.flight ? props.flight.itineraries[0].segments[2].departure.iataCode : null}  at {moment(props.flight.itineraries[0].segments[2].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p><p>Arrival: {props.flight ? props.flight.itineraries[0].segments[2].arrival.iataCode : null}  at {moment(props.flight.itineraries[0].segments[2].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p>
              </>)
              }
              <p className="text-right">Total Flight Time: {timeTraveled(0)}</p>

          {props.flight.itineraries[1] ? (
            <div>
              <p className="T font-weight-bold J text-light card text-center p-1">
                  Returning Flights{" "}
                  {props.flight.itineraries[1].segments.length -
                    1 === 0
                    ? "(Nonstop)"
                    : props.flight.itineraries[1].segments.length -
                        1 === 1
                    ? `(${props.flight.itineraries[1].segments.length - 1} Stop)`
                    : `(${props.flight.itineraries[1].segments.length - 1} Stops)`}
                </p>
              {/* <p>Departure:  {props.flight ? props.flight.itineraries[1].segments[0].departure.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
              </p>
              <p>Arrival:  {props.flight ? props.flight.itineraries[1].segments[0].arrival.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
              </p> */}
              {/* <hr></hr> */}
              {props.flight.itineraries[1].segments.length -  1 === 0 
              ? 
              // `(${props.flight.itineraries[1].segments.length - 1} Stop)` 
              (<>
              <p>Departure:  {props.flight ? props.flight.itineraries[1].segments[0].departure.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
              </p>
              <p>Arrival:  {props.flight ? props.flight.itineraries[1].segments[0].arrival.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
              </p>
              </>)
              :
              (<>
               <p className="text-decoration-underline">First flight:</p>
              <p>Departure:  {props.flight ? props.flight.itineraries[1].segments[0].departure.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
              </p>
              <p>Arrival:  {props.flight ? props.flight.itineraries[1].segments[0].arrival.iataCode : null}  at {moment(props.flight.itineraries[1].segments[0].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
              </p>
              <p className="text-decoration-underline">Second flight:</p>
              <p>Departure: {props.flight ? props.flight.itineraries[1].segments[1].departure.iataCode : null}  at {moment(props.flight.itineraries[1].segments[1].departure.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p><p>Arrival: {props.flight ? props.flight.itineraries[1].segments[1].arrival.iataCode : null}  at {moment(props.flight.itineraries[1].segments[1].arrival.at, "YYYY-MM-DD h:mm a").format("MM/DD/YYYY h:mm a")}
                 </p>
              </>)
              }
              <p className="text-right">Total Flight Time: {timeTraveledR(0)}</p>
              <h5 className="T font-weight-bold text-warning">
                {/* Price: ${props.flight.price.total} */}
              Price:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: props.flight.price.total.currency || "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(props.flight.price.total)}{" "}
            </h5>
            </div>
            ):(
              <div>
               <h5 className="T font-weight-bold text-warning">
                {/* Price: ${props.flight.price.total} */}
              Price:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: props.flight.price.total.currency || "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(props.flight.price.total)}{" "}
            </h5>
              </div>
            )}
            </CardText>
            { isLoggedIn ? 
             ((applied) ? unappliedButton : applyButton) : null
            }
            </CardBody>
          </Card>
        </section>
    );
}

export default FlightDetail;
