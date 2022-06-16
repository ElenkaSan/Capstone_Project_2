"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Car {
  /** Create a flight (from data), update db, return new flight data.
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO carRentals (carName,
                                   location_pickup,
                                   location_return,
                                   date_time_pickup, 
                                   date_time_return, 
                                   description,
                                   price,
                                   imgUrl)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id, 
                    carName,
                    location_pickup AS "locationP",
                    location_return AS "locationR",
                    date_time_pickup AS "dateTimeP",  
                    date_time_return AS "dateTimeR", 
                    description,
                    price,
                    imgUrl`,
        [
          data.carName,
          data.locationP,
          data.locationR,
          data.dateTimeP,
          data.dateTimeR,
          data.description,
          data.price,
          data.imgUrl
        ]);
    let car = result.rows[0];

    return car;
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

  static async findAll({ locationP, locationR, dateTimeP, dateTimeR, price } = {}) {
    let query = `SELECT c.id,
                        c.location_pickup AS "locationP",
                        c.location_return AS "locationR",
                        c.date_time_pickup AS "dateTimeP", 
                        c.date_time_return AS "dateTimeR",
                        c.price
                 FROM carRentals c`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL


    if (locationP !== undefined) {
        queryValues.push(`%${locationP}%`);
        whereExpressions.push(`locationP ILIKE $${queryValues.length}`);
      }

    if (locationR !== undefined) {
        queryValues.push(`%${locationR}%`);
        whereExpressions.push(`locationR ILIKE $${queryValues.length}`);
      }

    
    if (dateTimeP !== undefined) {
        queryValues.push(`%${dateTimeP}%`);
        whereExpressions.push(`dateTimeP ILIKE $${queryValues.length}`);
      }


    if (dateTimeR !== undefined) {
        queryValues.push(`%${dateTimeR}%`);
        whereExpressions.push(`dateTimeR ILIKE $${queryValues.length}`);
      }

    if (price !== undefined) {
      queryValues.push(price);
      whereExpressions.push(`price >= $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY price";
    const carsRes = await db.query(query, queryValues);
    return carsRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const carsRes = await db.query(
     `SELECT id, 
             carName,
             location_pickup AS "locationP",
             location_return AS "locationR",
             date_time_pickup AS "dateTimeP",  
             date_time_return AS "dateTimeR", 
             description,
             price,
             imgUrl
        FROM carRentals
        WHERE id = $1`, [id]);

    const car = carsRes.rows[0];

    if (!car) throw new NotFoundError(`No found car: ${id}`);

    return car;
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

    const querySql = `UPDATE carRentals
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING  id, 
                      carName,
                      location_pickup AS "locationP",
                      location_return AS "locationR",
                      date_time_pickup AS "dateTimeP",  
                      date_time_return AS "dateTimeR", 
                      description,
                      price,
                      imgUrl`;
    const result = await db.query(querySql, [...values, id]);
    const car = result.rows[0];

    if (!car) throw new NotFoundError(`No found car: ${id}`);

    return car;
  }

//    Delete given cars from database; returns undefined.
 

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM carRentals
           WHERE id = $1
           RETURNING id`, [id]);
    const car = result.rows[0];

    if (!car) throw new NotFoundError(`No found car: ${id}`);
  }


}

module.exports = Car;
