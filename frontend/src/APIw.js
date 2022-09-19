import axios from 'axios';
require("dotenv").config();

const weatherApiUrl = "https://api.weatherbit.io/v2.0/forecast/daily?days=7&units=I";
const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;

export default {
  getWeather: function(city) {
    return axios.get(
      `${weatherApiUrl}&key=${weatherKey}&city=${city}`
    );
  },
};

// function getWeather(city) {
//   return axios.get(
//     `${weatherApiUrl}&key=${weatherKey}&city=${city}`
//   );
// }

// export default getWeather;