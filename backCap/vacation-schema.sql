CREATE TABLE users (
  -- id SERIAL PRIMARY KEY,
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  notes TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE flightReservations (
  id SERIAL PRIMARY KEY,
  numberOfPassengers NUMERIC NOT NULL,  -- direction STRING,
  type TEXT NOT NULL, -- note: 'ONE_WAY, ROUND_TRIP'
  classType TEXT NOT NULL,
  location_departure TEXT NOT NULL,
  location_arrival TEXT NOT NULL,
  date_departure DATE NOT NULL,
  date_arrival DATE NOT NULL,
  priceMin INTEGER NOT NULL,
  priceMax INTEGER NOT NULL,
  sortOrder TEXT NOT NULL
);

CREATE TABLE hotelReservations (
  id SERIAL PRIMARY KEY,
  hotelName TEXT NOT NULL,
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  reviews NUMERIC,
  numberOfGuests NUMERIC,  
  roomsNumber NUMERIC,
  description TEXT,
  price INTEGER NOT NULL,
  imgUrl TEXT
);

CREATE TABLE carRentals (
  id SERIAL PRIMARY KEY,
  carName TEXT NOT NULL,
  location_pickup TEXT NOT NULL,
  location_return TEXT NOT NULL,
  date_time_pickup DATE NOT NULL, 
  date_time_return DATE NOT NULL, 
  description TEXT,
  price INTEGER NOT NULL,
  imgUrl TEXT
);

CREATE TABLE trips (
  -- id SERIAL PRIMARY KEY,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  flightReservation_id INTEGER
    REFERENCES flightReservations ON DELETE CASCADE,
  hotelReservation_id INTEGER
    REFERENCES hotelReservations ON DELETE CASCADE,
  carRental_id INTEGER
    REFERENCES carRentals ON DELETE CASCADE,
  PRIMARY KEY (username, flightReservation_id, hotelReservation_id, carRental_id)
);

