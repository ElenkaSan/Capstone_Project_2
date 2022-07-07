import React from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
// import './WeatherSearchBar.css';

const WeatherDayCard = (props) => {
 // console.log(props);
  return (
    // <Col>
       <div className="justify-content-center align-items-center p-2 col-3 col-6 col-md-3">
      <Card className='J T text-light mt-2 text-center'>
        <CardHeader className='weather-header'>{props.day}</CardHeader>
        <CardBody>
          <p className='current-weather'>{props.current}°</p>
          <img
            src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`}
            alt={props.description}
          />
          <p className='high'>High: {props.high}°</p>
          <p className='low'>Low: {props.low}°</p>
        </CardBody>
      </Card>
       </div>
    //  </Col>
  );
};

export default WeatherDayCard;