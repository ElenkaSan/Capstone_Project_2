CREATE TABLE "users" (
  "id" SERIAL,
  "username" varchar(25) NOT NULL,
  "password" text NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "email" text NOT NULL,
  "note" text,
  PRIMARY KEY ("id", "username")
);

CREATE TABLE "trips" (
  "id" int PRIMARY KEY,
  "user_id" varchar UNIQUE NOT NULL,
  "flightReservation_id" int UNIQUE NOT NULL,
  "hotelReservation_id" int UNIQUE NOT NULL,
  "carRental_id" int UNIQUE NOT NULL
);

CREATE TABLE "flightReservations" (
  "id" int PRIMARY KEY,
  "numberOfPassengers" numeric NOT NULL,
  "type" text NOT NULL,
  "class_type" text NOT NULL,
  "location_departure" text NOT NULL,
  "location_arrival" text NOT NULL,
  "date_departure" date NOT NULL,
  "date_arrival" date NOT NULL,
  "price" integer NOT NULL,
);

CREATE TABLE "hotelReservations" (
  "id" int PRIMARY KEY,
  "hotelName" text NOT NULL,
  "checkin" date NOT NULL,
  "checkout" date NOT NULL,
  "reviews" numeric,
  "numberOfGuests" numeric,
  "roomNumber" numeric,
  "description" text,
  "price" integer NOT NULL,
  "imgUrl" text
);

CREATE TABLE "carRentals" (
  "id" int PRIMARY KEY,
  "carName" text NOT NULL,
  "location_pickup" text NOT NULL,
  "location_return" text NOT NULL,
  "date_time_pickup" date NOT NULL,
  "date_time_return" date NOT NULL,
  "description" text,
  "price" integer NOT NULL,
  "imgUrl" text
);

COMMENT ON COLUMN "users"."email" IS 'check (position(@ IN email) > 1)';

COMMENT ON COLUMN "flightReservations"."type" IS 'ONE_WAY, ROUND_TRIP';

ALTER TABLE "mytrips" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "mytrips" ADD FOREIGN KEY ("flightReservation_id") REFERENCES "flightReservations" ("id");

ALTER TABLE "mytrips" ADD FOREIGN KEY ("hotelReservation_id") REFERENCES "hotelReservations" ("id");

ALTER TABLE "mytrips" ADD FOREIGN KEY ("carRental_id") REFERENCES "carRentals" ("id");
