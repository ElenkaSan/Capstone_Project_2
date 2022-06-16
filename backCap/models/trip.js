"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Trip {
  /** Create a flight (from data), update db, return new flight data.
   **/

  static async create(data) {
    const result = await db.query(
      `INSERT INTO trips (trip_name,
                              trip_date,
                              username,
                              flightReservation_id,
                              hotelReservation_id,
                              carRental_id)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING
                    id,
                    trip_name AS "tripName",
                    trip_date AS "tripDate",
                    username,
                    flightReservation_id AS "flightReservationId",
                    hotelReservation_id AS "hotelReservationId",
                    carRental_id AS "carRentalId"`,
      [
        data.tripName,
        data.tripData,
        data.username,
        data.flightReservationId,
        data.hotelReservationId,
        data.carRentalId,
      ]
    );
    let trip = result.rows[0];

    return trip;
  }

  /** Find all flights (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - type
   * - classType
   * - location_arrival
   * - date_departure
   * - location_departure
   * -? sort_order
   * */

  static async findAll({
    username,
    flightReservationId,
    hotelReservationId,
    carRentalId,
    tripName,
  } = {}) {
    let query = `SELECT t.id,
                        t.username,
                        t.flightReservation_id AS "flightReservationId",
                        t.hotelReservation_id AS "hotelReservationId", 
                        t.carRental_id AS "carRentalId",
                        t.tripName
                 FROM trips t`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (username !== undefined) {
      queryValues.push(`%${username}%`);
      whereExpressions.push(`username ILIKE $${queryValues.length}`);
    }

    if (flightReservationId !== undefined) {
      queryValues.push(`%${flightReservationId}%`);
      whereExpressions.push(`flightReservationId ILIKE $${queryValues.length}`);
    }

    if (hotelReservationId !== undefined) {
      queryValues.push(`%${hotelReservationId}%`);
      whereExpressions.push(`hotelReservationId ILIKE $${queryValues.length}`);
    }

    if (carRentalId !== undefined) {
      queryValues.push(`%${carRentalId}%`);
      whereExpressions.push(`carRentalId ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY tripName";
    const tripsRes = await db.query(query, queryValues);
    return tripsRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const tripsRes = await db.query(
      `SELECT id, 
             tripName,
             tripDate, 
             username,
             flightReservation_id AS "flightReservationId",
             hotelReservation_id AS "hotelReservationId",
             carRental_id AS "carRentalId"
      FROM trips
      WHERE id = $1`,
      [id]
    );

    const trip = tripsRes.rows[0];

    if (!trip) throw new NotFoundError(`No found trip: ${id}`);

    return trip;
  }

  /** Update flight data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      tripName: "trip_name",
      tripDate: "trip_date",
    });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE trips
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING 
                      id, 
                      tripName,
                      tripDate, 
                      username,
                      flightReservation_id AS "flightReservationId",
                      hotelReservation_id AS "hotelReservationId",
                      carRental_id AS "carRentalId"`;
    const result = await db.query(querySql, [...values, id]);
    const trip = result.rows[0];

    if (!trip) throw new NotFoundError(`No found trip: ${id}`);

    return trip;
  }

  //    Delete trip from database; returns undefined.

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM trips
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const trip = result.rows[0];

    if (!trip) throw new NotFoundError(`No found trip: ${id}`);
  }
}

module.exports = Trip;
