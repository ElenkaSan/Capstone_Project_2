import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import DateInput from "./DateInput";
import "./CountDown.css";
import Axios from "axios";

// import Countdown from 'react-countdown';

const CountDown = (props, findTripByUser) => {
  const [date, setDate] = useState("");
  const [delay, setDelay] = useState(1000);
  const [count, setCount] = useState(0);
  // const [date, setDate] = React.useState(localStorage.getItem('date'+distance))
  // const [showBanner, setShowBanner] = useState(true);

  React.useEffect((count) => {
    const parsedCount = Number(localStorage.getItem('date'+count) || 0)
    setCount(parsedCount)
  }, [])
  localStorage.getItem(`date ${count}`, date)

  const dateCountDown = date;

  const handleInputChange = event => {
    setDate(event);
    setDelay(event);
  };

  // useEffect(() => {
  //   const data = window.localStorage.getItem('Date');
  //   if ( data !== null ) setShowBanner(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('MY_APP_STATE', JSON.stringify(showBanner));
  // }, [showBanner]);

  useEffect(() => {
    if(props.tripId){
      Axios.get(`profile/getdate/${props.tripId}`).then(res => {
        setDate(res.data.date);
      });
      // window.localStorage.setItem('Date', JSON.stringify(props.tripId));
    }

    const x = setInterval(
      function() {
        const now = new Date().getTime();
        const tripDate = Date.parse(dateCountDown);
        const distance = tripDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (!distance) {
          document.getElementById("countdown-num").innerHTML = "0d 0h 0m 0s";
        } else if (document.getElementById("countdown-num") !== null) {
          document.getElementById("countdown-num").innerHTML =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

          if (distance < 0) {

            localStorage.setItem('timeLeft', distance);

            clearInterval(x);
            document.getElementById("countdown-num").innerHTML =
            "Hooray! It's vacation time!";
          }
        }

        // localStorage.setItem('timeLeft', distance);
        // distance-- || (clearInterval(x), setDate());

      },
      1000,
      delay
    );
    return () => clearInterval(x);
  });

  // window.onload = function () {
  //   let timeInterval = 100;
  //   //check if you have the last counter value
  //   let timeLeft = localStorage.getItem('timeLeft');
  //   if (isNaN(timeLeft)) {
  //       //save the current interval
  //       localStorage.setItem('timeLeft', timeInterval);
  //   } else if (timeLeft === 0) {
  //       //save the current interval
  //       localStorage.setItem('timeLeft', timeInterval);
  //   } else {
  //       // take the last saved value
  //       timeInterval = timeLeft;
  //   }}

  // const CountdownWrapper = () => <Countdown date={date} handleInputChange={handleInputChange} tripId={props.tripId}/>;
  // const MemoCountdown = React.memo(CountdownWrapper);

  return (
    <div>
      <Card className="T countdown-card bg-transparent border-info text-warning">
        <CardHeader className="countdown-header border-info">Count Down Your Trip</CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <h5 className="start-date-text">Vacation Start Date:</h5> 
              {/* <p className="card date-change-input"> <MemoCountdown  tripId={props.tripId} /> </p> */}
              <DateInput 
                // setCount={count}
                tripId={props.tripId}
                handleInputChange={handleInputChange}
                date={date}
              />
            </Col>
            <Col lg={6}>
              <h5 className="countdown-text">Days Until Trip:</h5>
              <p id="countdown-num"></p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default CountDown;