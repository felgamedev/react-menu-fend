const express = require('express')
const router = express.Router()
const Ingredient = require('../models/ingredient')

var prefix = '/ingredient'

router.route(prefix + '/')
  // READ ALL
  .get((req, res) => {
    Ingredient.find((err, ingredients) => {
      if(err) res.send(err)
      res.json(ingredients)
    })
  })
  // CREATE
  .post((req, res) => {
    var ingredient = new Ingredient()
    ingredient.name = req.body.name
    ingredient.brandName = req.body.brandName
    ingredient.allergens = req.body.allergens

    ingredient.save((err) => {
      if(err) res.send(err)
      res.json(ingredient)
    })
  });

router.route(prefix + '/:id')
  // READ a single record
  .get((req, res) => {
    Ingredient.find({_id: req.params.id}, (err, ingredient) => {
      if(err) res.send(err)
      res.json(ingredient)
    })
  })
  // UPDATE a single record
  .put((req, res) => {
    Ingredient.findById(req.params.id, (err, ingredient) => {
      if(err) res.send(err)
      ingredient.name = req.body.name ? req.body.name : ingredient.name
      ingredient.brandName = req.body.brandName ? req.body.brandName : ingredient.brandName
      ingredient.allergens = req.body.allergens ? req.body.allergens : ingredient.allergens

      ingredient.save((err, updatedObject) => {
        if(err) res.send(err)
        res.json(updatedObject)
      })
    })
  })
  .delete((req, res) => {
    Ingredient.deleteOne({_id:req.params.id}, (err)=>{
      if(err) res.send(err)
      res.json({message: "Ingredient Deleted"})
    })
  })

module.exports = router
