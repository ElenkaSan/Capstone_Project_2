# Vacation Time
### *Try the app [Vacation Time - not yet](https://blabla.herokuapp.com/)*
Ready for travel, let’s make the trip of your dreams. This website `Vacation Time` allows you to find the nice hotel, flight and car rental for you with the best price. When your make next travel destination then can do a record personalized notes for vacation planning after create an account.
When you search for any destination in the world, you will get recommendations for nice venues and places to visit in the area and detailed information about those places including pictures and maps. You can conveniently save your results along with any notes you've made in your personalized list.
This website allows users to create an account and save the result after that with create a list of their favorites. 

## App Information
## Back-end
### Data
For this CP database that takes trip-related information from the [Priceline API](https://rapidapi.com/tipsters/api/priceline-com-provider/)

```sh
DB schema: 
  ├── trips table (favorite trip) 
  │   └── users table
  │                 
  ├── flightReservations table
  ├── hotelReservations table
  └── carRentals table
 ```

<img width="1249" alt="Screen Shot 2022-06-12 at 12 39 33 PM" src="https://user-images.githubusercontent.com/75818489/173243653-85f497ea-a5f3-40c7-af9e-82319bb7d75e.png">

## Front-end
### Routes
|Path                 | Component         |  
|---------------------|-------------------|
| /                   | Homepage          |  
| /signup             | SignupForm        |   
| /login              | LoginForm         |  
| /hotels   	        | HotelsList        |
| /hotels/:handle     | HotelDetail       |
| /flights            | FlightsList       |
| /flights/:handle    | FlightDetail      |
| /carsrental         | CarsrentalList    |
| /carsrental/:handle | CarrentalDetail   |
| /profile            | ProfileForm       |
| /mytrip             | UserAccount       |

## Component Architecture
```sh
App
api
├── Routes-nav
│   ├── Navigation
│   └── Routes
│ 
├── Hotels
│   ├── HotelsCard
│   ├── HotelsList ── Search
│   └── HotelDetail 
│   
├── Flights
│   ├── FlightsCard
│   ├── FlightsList ── Search
│   └── FlightDetail 
│ 
├── Carsrental
│   ├── CarsrentalCard
│   ├── CarsrentalList ── Search
│   └── CarrentalDetail 
│ 
├── Homepage ── NoLoggedIn
│ 
├─┬ Auth
│ │ ├── LoginForm
│ │ ├── SignupForm
│ │ └── ProfileForm ── UserAccount (myTrip)
│ └── UserContext
│ 
├── Common
│   ├── LoadingSpinner 
│   ├── SearchForm
│   └── Alert
│ 
└── Hooks
    ├── useLocalStorage
    ├── useTimedMessage
    └── useToggle
```

### Functionality
The app's functionality includes:
  - User can search trip for every place on Earth
  - User can save favorite place results into thier favorites list after signup
  - User can record ideas and ruminations about the venue in your own personal note

### Technology Stack
- Front-End: HTML5 | CSS3 | JavaScript | React | React Bootstrap | Redux | RTL | JSON Schema | JSON Web Token
- Back-End: Node.js | Express.js | SuperTest | JWT Authentication | Bcrypt | PostgreSQL | Axios | RESTful API Endpoints | MongoDB 

### Hosting
Heroku

Feel free to improve or contribute. Pull requests are always welcome!
Author [Elena Nurullina](https://github.com/ElenkaSan/)
