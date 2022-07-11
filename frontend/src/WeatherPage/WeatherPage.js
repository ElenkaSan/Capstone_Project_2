import React, { useState, useEffect } from 'react';
import {  Row, Col } from 'reactstrap';
import moment from 'moment';
import WeatherSearch from './WeatherSearch';
import WeatherCard from './WeatherCard';
import APIw from '../APIw';
import './WeatherPage.css';

const WeatherPage = (props) => {
  const [data, setData] = useState({
    days: [],
    location: '',
    searchTerm: ''
  });

  // destructure state object to make it easier to use
  const { days, location, searchTerm } = data;

  // useEffect replaces componentDidMount. Denver will show until the user types a search.
  useEffect(() => {

    getWeather(props.destination);
  }, [props]);

  const handleInputChange = event => {
    // when using hooks use spread to make a copy of key value pairs. Copies in exsiting state so we don't loose it and add change on top.
    setData({
      ...data,
      searchTerm: event.target.value
    });
  };

  const getWeather = city => {
    if(city){
      APIw.getWeather(city)
      .then(res => {
        setData({
          searchTerm: '',
          days: res.data.data,
          location: res.data.city_name + ', ' + res.data.state_code
        });
      })
      .catch(err => console.log(err));
    }
    
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (searchTerm) {
      getWeather(searchTerm);
    } else {
      alert('You must type a city to search');
    }
  };

  return (
    <section className="container">
    <div>
      <Row>
        <Col lg={8}>
          <h3 className='weather-for card J T text-warning p-2'>Weather Forecast {location}</h3>
        </Col>
        <Col lg={4}>
          <WeatherSearch
            searchTerm={searchTerm}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </Col>
      </Row>
      <br></br>
      <Row>
    
        {days.map(day => (
          <WeatherCard
            key={day.ts}
            id={day.ts}
            day={moment(day.valid_date, 'YYYY-MM-DD').format('dddd')}
            current={day.temp}
            high={day.max_temp}
            low={day.min_temp}
            icon={day.weather.icon}
            description={day.weather.description}
          />
        ))}
        
      </Row>
    </div>
    </section>
  );
};

export default WeatherPage;