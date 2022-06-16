"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Hotel = require("../models/hotel");

const hotelNewSchema = require("../schemas/hotelNew.json");
const hotelUpdateSchema = require("../schemas/hotelUpdate.json");
const hotelSearchSchema = require("../schemas/hotelSearch.json");

const router = new express.Router();
// const router = express.Router({ mergeParams: true });

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
      // const validator = jsonschema.validate(req.body);
      const validator = jsonschema.validate(req.body, hotelNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const hotel = await Hotel.create(req.body);
      return res.status(201).json({ hotel });
    } catch (err) {
      return next(err);
    }
  });
  

  router.get("/", async function (req, res, next) {
    const q = req.query;
    // arrive as strings from querystring, but we want as int/bool
    // if (q.checkin !== undefined) q.checkin = +q.checkin;
    // if (q.checkout !== undefined) q.checkout = +q.checkout;
  
    try {
      // const validator = jsonschema.validate(q);
      const validator = jsonschema.validate(q, hotelSearchSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const hotels = await Hotel.findAll(q);
      return res.json({ hotels });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:id", async function (req, res, next) {
    try {
      const hotel = await Hotel.get(req.params.id);
      return res.json({ hotel });
    } catch (err) {
      return next(err);
    }
  });

  router.patch("/:id", ensureAdmin, async function (req, res, next) {
    try {
      // const validator = jsonschema.validate(req.body);
      const validator = jsonschema.validate(req.body, hotelUpdateSchema)
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const hotel = await Hotel.update(req.params.id, req.body);
      return res.json({ hotel });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
      await Hotel.remove(req.params.id);
      return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });  
  
  module.exports = router;