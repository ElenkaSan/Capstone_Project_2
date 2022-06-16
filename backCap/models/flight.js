"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Flight {
  /** Create a flight (from data), update db, return new flight data.
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO flightReservations (numberOfPassengers,
                                           type,
                                           classType,
                                           location_departure,
                                           location_arrival,
                                           date_departure,
                                           date_arrival,
                                           priceMin,
                                           priceMax,
                                           sortOrder)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           RETURNING id, 
                     numberOfPassengers,
                     type,
                     classType,
                     location_departure AS "locationD",
                     location_arrival AS "locationA",
                     date_departure AS "dateD",
                     date_arrival AS "dateA",
                     priceMin,
                     priceMax,
                     sortOrder`
        [
          data.numberOfPassengers,
          data.type,
          data.classType,
          data.locationD,
          data.locationA,
          data.dateD,
          data.dateA,
          data.priceMin,
          data.priceMax,
          data.sortOrder
        ]);
    let flight = result.rows[0];

    return flight;
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

  static async findAll({ numberOfPassengers, type, classType, locationA, dateD, locationD, priceMin } = {}) {
    let query = `SELECT f.id,
                        f.numberOfPassengers,
                        f.type,
                        f.classType,
                        f.location_arrival AS "locationA", 
                        f.date_departure AS "dateD",
                        f.location_departure AS "locationD",
                        f.priceMin
                 FROM flightReservations f`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (numberOfPassengers !== undefined) {
        queryValues.push(`%${numberOfPassengers}%`);
        whereExpressions.push(`numberOfPassengers ILIKE $${queryValues.length}`);
      }

    if (type !== undefined) {
        queryValues.push(`%${type}%`);
        whereExpressions.push(`type ILIKE $${queryValues.length}`);
      }

    if (priceMin !== undefined) {
      queryValues.push(priceMin);
      whereExpressions.push(`priceMin >= $${queryValues.length}`);
    }

    if (classType !== undefined) {
        queryValues.push(`%${classType}%`);
        whereExpressions.push(`classType ILIKE $${queryValues.length}`);
      }

    if (locationA !== undefined) {
      queryValues.push(`%${locationA}%`);
      whereExpressions.push(`locationA ILIKE $${queryValues.length}`);
    }

    if (dateD !== undefined) {
        queryValues.push(`%${dateD}%`);
        whereExpressions.push(`dateD ILIKE $${queryValues.length}`);
      }

    if (locationD !== undefined) {
        queryValues.push(`%${locationD}%`);
        whereExpressions.push(`locationD ILIKE $${queryValues.length}`);
      }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY priceMin";
    const flightsRes = await db.query(query, queryValues);
    return flightsRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const flightsRes = await db.query(
             `SELECT id, 
                     numberOfPassengers,
                     type,
                     classType,
                     location_departure AS "locationD",
                     location_arrival AS "locationA",
                     date_departure AS "dateD",
                     date_arrival AS "dateA",
                     priceMin,
                     priceMax,
                     sortOrder
           FROM flightReservations
           WHERE id = $1`, [id]);

    const flight = flightsRes.rows[0];

    if (!flight) throw new NotFoundError(`No found flight: ${id}`);

    return flight;
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
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE flightReservations
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING  id, 
                      numberOfPassengers,
                      type,
                      classType,
                      location_departure AS "locationD",
                      location_arrival AS "locationA",
                      date_departure AS "dateD",
                      date_arrival AS "dateA",
                      priceMin,
                      priceMax,
                      sortOrder`;
    const result = await db.query(querySql, [...values, id]);
    const flight = result.rows[0];

    if (!flight) throw new NotFoundError(`No found flight: ${id}`);

    return flight;
  }

//    Delete given flights from database; returns undefined.
 

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM flightReservations
           WHERE id = $1
           RETURNING id`, [id]);
    const flight = result.rows[0];

    if (!flight) throw new NotFoundError(`No found flight: ${id}`);
  }


}

module.exports = Flight;
