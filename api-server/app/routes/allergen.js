const express = require('express')
const router = express.Router()
const Allergen = require('../models/allergen')

const prefix = "/allergen"

router.route(prefix + '/')
  // READ ALL
  .get((req, res) => {
    Allergen.find((err, allergens) => {
      if(err) res.send(err)
      res.json(allergens)
    })
  })
  // CREATE
  .post((req, res) => {
    var allergen = new Allergen()
    console.log(req.body);
    allergen.name = req.body.name
    allergen.acronym = req.body.acronym

    allergen.save((err) => {
      if(err) res.send(err)
      res.json({ "message": "Added allergen" });
    })
  })

router.route(prefix + "/:id")
  // READ a single record
  .get((req, res) => {
    Allergen.find({_id: req.params.id}, (err, allergen) =>{
      if(err) res.send(err)
      res.json(allergen)
    })
  })
  // UPDATE a single record
  .put((req, res) => {
    Allergen.findById(req.params.id, (err, allergen) => {
      if(err) res.send(err)
      allergen.name = req.body.name ? req.body.name : allergen.name
      allergen.save((err, updatedObject) => {
        if(err) res.send(err)
        res.json(updatedObject)
      })
    })
  })
  // DELETE a single record
  .delete((req, res) => {
    Allergen.deleteOne({_id:req.params.id}, (err) => {
      if(err) res.send(err)
      res.json({message: "AllergenDeleted"})
    })
  })

module.exports =  router
