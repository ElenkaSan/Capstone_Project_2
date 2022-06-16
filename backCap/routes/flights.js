"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Flight = require("../models/flight");

const flightNewSchema = require("../schemas/flightNew.json");
const flightUpdateSchema = require("../schemas/flightUpdate.json");
const flightSearchSchema = require("../schemas/flightSearch.json");

const router = new express.Router();
// const router = express.Router({ mergeParams: true });

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
      // const validator = jsonschema.validate(req.body);
      const validator = jsonschema.validate(req.body, flightNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const flight = await Flight.create(req.body);
      return res.status(201).json({ flight });
    } catch (err) {
      return next(err);
    }
  });
  

  router.get("/", async function (req, res, next) {
    const q = req.query;
    // arrive as strings from querystring, but we want as int/bool
    // if (q.type !== undefined) q.type = +q.type;
    // q.class_type = q.class_type=== "true";
  
    try {
      // const validator = jsonschema.validate(q);
      const validator = jsonschema.validate(q, flightSearchSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const flights = await Flight.findAll(q);
      return res.json({ flights });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:id", async function (req, res, next) {
    try {
      const flight = await Flight.get(req.params.id);
      return res.json({ flight });
    } catch (err) {
      return next(err);
    }
  });

  router.patch("/:id", ensureAdmin, async function (req, res, next) {
    try {
      // const validator = jsonschema.validate(req.body);
      const validator = jsonschema.validate(req.body, flightUpdateSchema)
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const flight = await Flight.update(req.params.id, req.body);
      return res.json({ flight });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
      await Flight.remove(req.params.id);
      return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });  
  
  module.exports = router;