import axios from "axios";
import React, {
Component
} from  "react"

class flightApi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOfPassengers: '',
            type: '',
            classType: '',
            locationD: '',
            locationA: '',
            dateD: '',
            dateA: '',
            priceMin: '',
            priceMax: '',
            sortOrder: ''
        };
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
  componentDidMount() {
    // get all entities - GET
    axios.get("https://priceline-com-provider.p.rapidapi.com/v1/flights/search", {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        // 'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        numberOfPassengers: response,
        type: response,
        classType: response,
        locationD: response,
        locationA: response,
        dateD: response,
        dateA: response,
        priceMin: response,
        priceMax: response,
        sortOrder: response
      })
    })
    .catch(err => { console.log(err); 
    });
  }


      create(e) {
        // add entity - POST
        e.preventDefault();
        // creates entity
        fetch("https://priceline-com-provider.p.rapidapi.com/v1/flights", {
          "method": "POST",
          "headers": {
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
            // 'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52',
            "content-type": "application/json",
            "accept": "application/json"
          },
          "body": JSON.stringify({
            numberOfPassengers: this.state.numberOfPassengers,
            type: this.state.type,
            classType: this.state.classType,
            locationD: this.state.locationD,
            locationA: this.state.locationA,
            dateD: this.state.dateD,
            dateA: this.state.dateA,
            priceMin: this.state.priceMin,
            priceMax: this.state.priceMax,
            sortOrder: this.state.sortOrder
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
      }
      update(e) {
        // update entity - PUT
        e.preventDefault();
        // this will update entries with PUT
        fetch("https://priceline-com-provider.p.rapidapi.com/v1/flights", {
            "method": "PUT",
            "headers": {
                'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
                // 'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52',
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                _id: this.state.id,
                numberOfPassengers: this.state.numberOfPassengers,
                type: this.state.type,
                classType: this.state.classType,
                locationD: this.state.locationD,
                locationA: this.state.locationA,
                dateD: this.state.dateD,
                dateA: this.state.dateA,
                priceMin: this.state.priceMin,
                priceMax: this.state.priceMax,
                sortOrder: this.state.sortOrder
            })
            })
            .then(response => response.json())
            .then(response => { console.log(response);
            })
            .catch(err => { console.log(err); });
      }
      delete(e) {
        // delete entity - DELETE
        e.preventDefault();
        // deletes entities
        fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/_id/${this.state.id}`, {
          "method": "DELETE",
          "headers": {
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
            // 'X-RapidAPI-Key': '71b01bbe41mshb853aa4f7d6b39dp12ab35jsn9359b9b35b52'
          }
        })
        .then(response => response.json())
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
      }
      
}

export default flightApi