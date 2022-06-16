"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Hotel {
  /** Create a flight (from data), update db, return new flight data.
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO hotelReservations (hotelName,
                                          checkin,
                                          checkout,
                                          reviews,
                                          numberOfGuests,
                                          roomsNumber,
                                          description,
                                          price,
                                          imgUrl)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING
           id, 
           hotelName,
           checkin,
           checkout,
           reviews,
           numberOfGuests,
           roomsNumber,
           description,
           price,
           imgUrl`,
        [
          data.hotelName,
          data.checkin,
          data.checkout,
          data.reviews,
          data.numberOfGuests,
          data.roomsNumber,
          data.description,
          data.price,
          data.imgUrl
        ]);
    let hotel = result.rows[0];

    return hotel;
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

  static async findAll({ hotelName, checkin, checkout, roomsNumber, price } = {}) {
    let query = `SELECT h.id,
                        h.hotelName,
                        h.checkin,
                        h.checkout, 
                        h.roomsNumber,
                        h.price
                 FROM hotelReservations h`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (hotelName !== undefined) {
        queryValues.push(`%${hotelName}%`);
        whereExpressions.push(`hotelName ILIKE $${queryValues.length}`);
      }

    if (price !== undefined) {
      queryValues.push(price);
      whereExpressions.push(`price >= $${queryValues.length}`);
    }

    if (checkin !== undefined) {
        queryValues.push(`%${checkin}%`);
        whereExpressions.push(`checkin ILIKE $${queryValues.length}`);
      }

    if (checkout !== undefined) {
      queryValues.push(`%${checkout}%`);
      whereExpressions.push(`checkout ILIKE $${queryValues.length}`);
    }

    if (roomsNumber !== undefined) {
        queryValues.push(`%${roomsNumber}%`);
        whereExpressions.push(`roomsNumber ILIKE $${queryValues.length}`);
      }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY price";
    const hotelsRes = await db.query(query, queryValues);
    return hotelsRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const hotelsRes = await db.query(
     `SELECT id, 
             hotelName,
             checkin,
             checkout,
             reviews,
             numberOfGuests,
             roomsNumber,
             description,
             price,
             imgUrl
      FROM hotelReservations
      WHERE id = $1`, [id]);

    const hotel = hotelsRes.rows[0];

    if (!hotel) throw new NotFoundError(`No found hotel: ${id}`);

    return hotel;
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

    const querySql = `UPDATE hotelReservations
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING 
                      id, 
                      hotelName,
                      checkin,
                      checkout,
                      reviews,
                      numberOfGuests,
                      roomsNumber,
                      description,
                      price,
                      imgUrl`;
    const result = await db.query(querySql, [...values, id]);
    const hotel = result.rows[0];

    if (!hotel) throw new NotFoundError(`No found hotel: ${id}`);

    return hotel;
  }

//    Delete given hotels from database; returns undefined.
 

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM hotelReservations
           WHERE id = $1
           RETURNING id`, [id]);
    const hotel = result.rows[0];

    if (!hotel) throw new NotFoundError(`No found hotel: ${id}`);
  }


}

module.exports = Hotel;
