const axios = require("axios");


function searchCity(data){
    const options = {
      method: 'GET',
      url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/locations',
      params: {name: data.value},
      headers: {
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        //  'X-RapidAPI-Key': 'cd19130386msh64824a8945ce343p19eec8jsnf80a71237cdd'
        // 'X-RapidAPI-Key': '0087d3d501msh152502ca407638ep178c7fjsnda0c08b1a3c2'
        // 'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
      }
    };
    
    axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });

}

async function searchFlight(data){
    const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/search',
    params: {
            numberOfPassengers: data.number_of_passengers,
            type: data.itinerary_type,
            classType: data.class_type,
            locationD: data.location_departure,
            locationA: data.location_arrival,
            dateD:  data.date_departure,
            dateA:  data.date_arrival
    },
    headers: {
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        // 'X-RapidAPI-Key': 'cd19130386msh64824a8945ce343p19eec8jsnf80a71237cdd'
        // 'X-RapidAPI-Key': '0087d3d501msh152502ca407638ep178c7fjsnda0c08b1a3c2'
        // 'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
    }
    };

    await axios.request(options).then( (response) => {
        console.log(response.data)
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
}

const FlightData = {
    searchCity,
    searchFlight
}

export default FlightData;