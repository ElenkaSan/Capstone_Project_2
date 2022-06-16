const axios = require("axios");

//Get all reviews and images of the hotel by hotel_id (and offset_of_reviews)

const options = {
  method: 'GET',
  url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/details',
  params: {hotel_id: '6733503'},
  headers: {
    'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
    'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});