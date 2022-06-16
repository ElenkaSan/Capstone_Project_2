const axios = require("axios");

//Get hotel descriptions, prices and available booking options. Indicate the hotel_id, check-in and check-out date
// (rooms_number)

const options = {
  method: 'GET',
  url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/booking-details',
  params: {
    date_checkout: '2022-11-16',
    date_checkin: '2022-11-15',
    hotel_id: '6733503',
    rooms_number: '1'
  },
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