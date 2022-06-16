"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Car = require("../models/car");

const carNewSchema = require("../schemas/carNew.json");
const carUpdateSchema = require("../schemas/carUpdate.json");
const carSearchSchema = require("../schemas/carSearch.json");

const router = new express.Router();
// const router = express.Router({ mergeParams: true });

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
      // const validator = jsonschema.validate(req.body);
      const validator = jsonschema.validate(req.body, carNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const car = await Car.create(req.body);
      return res.status(201).json({ car });
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
      const validator = jsonschema.validate(q, carSearchSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const cars = await Car.findAll(q);
      return res.json({ cars });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:id", async function (req, res, next) {
    try {
      const car = await Car.get(req.params.id);
      return res.json({ car });
    } catch (err) {
      return next(err);
    }
  });

  router.patch("/:id", ensureAdmin, async function (req, res, next) {
    try {
      // const validator = jsonschema.validate(req.body);
      const validator = jsonschema.validate(req.body, carUpdateSchema)
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const car = await Car.update(req.params.id, req.body);
      return res.json({ car });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
      await Car.remove(req.params.id);
      return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });
  
  module.exports = router;